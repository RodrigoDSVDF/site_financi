import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuração da Engine ---
    // Habilita gerenciamento de cores moderno para brilho máximo
    THREE.ColorManagement.enabled = true;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 25);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance", 
      alpha: false // Preto sólido ajuda no contraste do brilho
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Configurações de cores para o "Glamour"
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento (O segredo do brilho) ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5,  // Força (Aumentado para mais glamour)
      0.6,  // Raio
      0.1   // Threshold (Mais sensível ao brilho)
    );
    
    // IMPORTANTE: Faz o bloom renderizar direto na tela para evitar erros de importação
    bloomPass.renderToScreen = true; 
    composer.addPass(bloomPass);

    // --- Objetos de Cena ---
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x010101, roughness: 0.3, metalness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.02, 60, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    core.position.y = 30;
    beamGroup.add(core);

    const aura = new THREE.Mesh(
      new THREE.CylinderGeometry(0.04, 0.2, 60, 8),
      new THREE.MeshBasicMaterial({ 
        color: 0x00ffaa, 
        transparent: true, 
        opacity: 0.2,
        blending: THREE.AdditiveBlending 
      })
    );
    core.add(aura);

    // --- Sistema de Areia Ultra Denso (12.000 partículas) ---
    const particleCount = 12000;
    const createSandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'white');
      grad.addColorStop(0.2, 'rgba(0, 255, 170, 0.9)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const pMat = new THREE.MeshBasicMaterial({
      map: createSandTexture(),
      color: 0x00ffaa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9
    });

    const instancedSand = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.08, 0.08), pMat, particleCount);
    const dummy = new THREE.Object3D();
    const particlesData = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -3, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 2.5 + Math.random() * 3.5,
      scale: 0.1 + Math.random() * 0.6,
      friction: 0.95 + Math.random() * 0.03
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 35, 2);
    impactLight.position.set(0, -2.5, 0);
    scene.add(impactLight);

    // --- Animação ---
    let state = "falling"; 
    let animTimer = 0;
    const clock = new THREE.Clock();
    let animationId: number;

    const triggerImpact = () => {
      state = "impact";
      animTimer = 0;
      impactLight.intensity = 100; // Explosão de luz
      particlesData.forEach(p => {
        p.pos.set(0, -3, 0);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.4;
        p.vel.set(Math.cos(angle) * speed, Math.random() * 0.18, Math.sin(angle) * speed);
        p.life = p.maxLife;
      });
    };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      animTimer += delta;

      if (state === "falling") {
        core.position.y -= 55 * delta;
        if (core.position.y - 30 <= -3.2) triggerImpact();
      } else if (state === "impact") {
        impactLight.intensity *= 0.93;
        core.scale.x = 1 + Math.sin(animTimer * 60) * 0.4;
        core.scale.z = core.scale.x;
        if (animTimer > 0.4) state = "reset";
      } else if (state === "reset") {
        core.scale.lerp(new THREE.Vector3(0, 1, 0), 0.1);
        impactLight.intensity *= 0.85;
        if (animTimer > 8) {
          state = "falling";
          animTimer = 0;
          core.position.y = 50;
          core.scale.set(1, 1, 1);
        }
      }

      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.006; 
          p.vel.x *= p.friction;
          p.vel.z *= p.friction;
          if (p.pos.y < -3) {
            p.pos.y = -3;
            p.vel.y *= -0.12; 
            p.vel.multiplyScalar(0.8); 
          }
          p.life -= delta;
          dummy.position.copy(p.pos);
          const s = p.scale * Math.pow(Math.max(0, p.life / p.maxLife), 0.5);
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

      camera.position.x = Math.sin(elapsed * 0.1) * 2;
      camera.lookAt(0, 0, 0);

      composer.render();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      pMat.dispose();
      instancedSand.geometry.dispose();
      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1, background: '#000' }} 
    />
  );
};

export default HeroBackground3D;

