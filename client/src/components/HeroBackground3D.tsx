import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader.js';

const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuração da Cena ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 22);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; // Aumenta a exposição para mais brilho
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento (O Glamour do Brilho) ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Bloom Pass com força total (1.5) para aquele efeito neon
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      1.5, 
      0.5, 
      0.85
    );
    bloomPass.threshold = 0.1; 
    composer.addPass(bloomPass);

    // Substituímos o OutputPass problemático pelo CopyShader (mais estável no build)
    const finalPass = new ShaderPass(CopyShader);
    finalPass.renderToScreen = true;
    composer.addPass(finalPass);

    // --- Chão Reflexivo ---
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x020205, roughness: 0.2, metalness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    // --- O Feixe de Energia (Core) ---
    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.03, 60, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    core.position.y = 30;
    beamGroup.add(core);

    const aura = new THREE.Mesh(
      new THREE.CylinderGeometry(0.05, 0.15, 60, 8),
      new THREE.MeshBasicMaterial({ 
        color: 0x00ffaa, 
        transparent: true, 
        opacity: 0.2, 
        blending: THREE.AdditiveBlending 
      })
    );
    core.add(aura);

    // --- Areia de Alta Densidade (6000 Partículas) ---
    const particleCount = 6000;
    const createSandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(0, 255, 170, 0.8)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const pGeo = new THREE.PlaneGeometry(0.12, 0.12);
    const pMat = new THREE.MeshBasicMaterial({
      map: createSandTexture(),
      color: 0x00ffaa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.8
    });

    const instancedSand = new THREE.InstancedMesh(pGeo, pMat, particleCount);
    const dummy = new THREE.Object3D();
    const particlesData = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -3, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 3 + Math.random() * 2,
      scale: 0.2 + Math.random() * 0.8
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 30, 2);
    impactLight.position.set(0, -2, 0);
    scene.add(impactLight);

    // --- Loop de Animação ---
    let clock = new THREE.Clock();
    let state = "falling"; 
    let timer = 0;

    const triggerImpact = () => {
      state = "impact";
      timer = 0;
      impactLight.intensity = 80;
      particlesData.forEach(p => {
        p.pos.set(0, -3, 0);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.3;
        p.vel.set(
            Math.cos(angle) * speed, 
            Math.random() * 0.15, 
            Math.sin(angle) * speed
        );
        p.life = p.maxLife;
      });
    };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      timer += delta;

      if (state === "falling") {
        core.position.y -= 50 * delta;
        if (core.position.y - 30 <= -3.1) triggerImpact();
      } else if (state === "impact") {
        impactLight.intensity *= 0.95;
        if (timer > 0.5) state = "reset";
      } else if (state === "reset") {
        core.scale.lerp(new THREE.Vector3(0, 1, 0), 0.1);
        if (timer > 6) {
          state = "falling";
          timer = 0;
          core.position.y = 50;
          core.scale.set(1, 1, 1);
        }
      }

      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.006; // Gravidade
          p.vel.x *= 0.99;  // Atrito
          p.vel.z *= 0.99;
          
          if (p.pos.y < -3) { 
            p.pos.y = -3; 
            p.vel.y *= -0.2; 
          }
          
          p.life -= delta;
          dummy.position.copy(p.pos);
          const s = p.scale * Math.pow(p.life / p.maxLife, 0.6);
          dummy.scale.set(s, s, s);
          dummy.quaternion.copy(camera.quaternion);
          dummy.updateMatrix();
          instancedSand.setMatrixAt(i, dummy.matrix);
        } else {
          dummy.scale.set(0, 0, 0);
          dummy.updateMatrix();
          instancedSand.setMatrixAt(i, dummy.matrix);
        }
      });
      instancedSand.instanceMatrix.needsUpdate = true;

      camera.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 1.5;
      camera.lookAt(0, 0, 0);
      
      composer.render();
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none" 
      style={{ background: '#000' }}
    />
  );
};

export default HeroBackground3D;

