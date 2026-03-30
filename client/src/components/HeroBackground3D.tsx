import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuração da Cena ---
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x010103);

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 7, 28);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: false 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5; 
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      2.5,  // Brilho intenso para compensar o sumiço do feixe
      0.4,
      0.02
    );
    bloomPass.renderToScreen = true;
    composer.addPass(bloomPass);

    // --- Elementos de Cena ---
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(400, 400),
      new THREE.MeshStandardMaterial({ 
        color: 0x010101, 
        roughness: 0.1, 
        metalness: 0.9 
      })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3.5;
    scene.add(floor);

    // Feixe central
    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.04, 80, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    beamGroup.add(core);

    const aura = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.3, 80, 8),
      new THREE.MeshBasicMaterial({ 
        color: 0x00ffaa, 
        transparent: true, 
        opacity: 0.4,
        blending: THREE.AdditiveBlending 
      })
    );
    core.add(aura);

    // --- Sistema de Partículas (20.000) ---
    const particleCount = 20000;
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'white');
      grad.addColorStop(0.2, 'rgba(0, 255, 170, 0.9)');
      grad.addColorStop(0.6, 'rgba(0, 50, 30, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(canvas);
    };

    const pMat = new THREE.MeshBasicMaterial({
      map: createParticleTexture(),
      color: 0x00ffaa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.9
    });

    const instancedSand = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.14, 0.14), pMat, particleCount);
    const dummy = new THREE.Object3D();
    const particlesData = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -10, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 3 + Math.random() * 5,
      scale: 0.2 + Math.random() * 1.0,
      friction: 0.97 + Math.random() * 0.02
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 60, 1.8);
    impactLight.position.set(0, -2, 0);
    scene.add(impactLight);

    // --- Lógica de Animação ---
    let state = "falling";
    let animTimer = 0;
    const clock = new THREE.Clock();

    const triggerImpact = () => {
      state = "impact";
      animTimer = 0;
      impactLight.intensity = 180;
      
      // O feixe some no impacto
      beamGroup.visible = false; 

      particlesData.forEach(p => {
        p.pos.set(0, -3.5, 0);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.5;
        p.vel.set(
          Math.cos(angle) * speed, 
          0.08 + Math.random() * 0.25, 
          Math.sin(angle) * speed
        );
        p.life = p.maxLife;
      });
    };

    const animate = () => {
      const delta = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();
      animTimer += delta;

      if (state === "falling") {
        beamGroup.visible = true;
        core.position.y -= 70 * delta; // Mais rápido
        if (core.position.y < 31) triggerImpact();
      } else if (state === "impact") {
        impactLight.intensity *= 0.9;
        if (animTimer > 0.8) state = "reset";
      } else if (state === "reset" && animTimer > 9) {
        state = "falling";
        animTimer = 0;
        core.position.y = 80; // Reinicia bem do alto
      }

      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.007; // Gravidade
          p.vel.x *= p.friction;
          p.vel.z *= p.friction;
          
          if (p.pos.y < -3.5) { 
            p.pos.y = -3.5; 
            p.vel.y *= -0.1; // Quique sutil
          }
          
          p.life -= delta;
          const progress = p.life / p.maxLife;
          dummy.position.copy(p.pos);
          const s = p.scale * Math.pow(progress, 0.5);
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
      camera.lookAt(0, 2, 0);

      composer.render();
      requestAnimationFrame(animate);
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
      renderer.dispose();
      pMat.dispose();
      instancedSand.geometry.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none"
      style={{ 
        zIndex: 0, 
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#010103' 
      }} 
    />
  );
};

export default HeroBackground3D;

