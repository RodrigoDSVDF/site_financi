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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 25);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance", 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Garante cores corretas sem OutputPass
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento ---
    const composer = new EffectComposer(renderer);
    
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.3, // força do brilho
      0.5, // raio
      0.15 // threshold
    );
    // Definimos como true para que ele seja o último pass a renderizar no canvas
    bloomPass.renderToScreen = true; 
    composer.addPass(bloomPass);

    // --- Objetos de Cena ---
    const floorGeo = new THREE.PlaneGeometry(200, 200);
    const floorMat = new THREE.MeshStandardMaterial({ 
      color: 0x010101, 
      roughness: 0.4, 
      metalness: 0.7 
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const coreMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const core = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.02, 60, 8), coreMat);
    core.position.y = 30;
    beamGroup.add(core);

    const auraMat = new THREE.MeshBasicMaterial({ 
      color: 0x00ffaa, 
      transparent: true, 
      opacity: 0.15,
      blending: THREE.AdditiveBlending 
    });
    const aura = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.15, 60, 8), auraMat);
    core.add(aura);

    // --- Sistema de Areia ---
    const particleCount = 12000;
    const createSandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'white');
        grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const sandTexture = createSandTexture();
    const pGeo = new THREE.PlaneGeometry(0.06, 0.06);
    const pMat = new THREE.MeshBasicMaterial({
      map: sandTexture,
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
      maxLife: 3.0 + Math.random() * 3.0,
      scale: 0.1 + Math.random() * 0.5,
      friction: 0.96 + Math.random() * 0.03
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 30, 1.5);
    impactLight.position.set(0, -2.5, 0);
    scene.add(impactLight);

    // --- Lógica de Animação ---
    let state = "falling"; 
    let animTimer = 0;
    const clock = new THREE.Clock();

    const triggerImpact = () => {
      state = "impact";
      animTimer = 0;
      impactLight.intensity = 80;
      particlesData.forEach(p => {
        p.pos.set(0, -3, 0);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.05 + Math.random() * 0.35;
        p.vel.set(Math.cos(angle) * speed, Math.random() * 0.15, Math.sin(angle) * speed);
        p.life = p.maxLife;
      });
    };

    let animationId: number;

    const animate = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      animTimer += delta;

      if (state === "falling") {
        core.position.y -= 50 * delta;
        if (core.position.y - 30 <= -3.2) triggerImpact();
      } else if (state === "impact") {
        impactLight.intensity *= 0.92;
        core.scale.x = 1 + Math.sin(animTimer * 70) * 0.3;
        core.scale.z = core.scale.x;
        if (animTimer > 0.4) state = "reset";
      } else if (state === "reset") {
        core.scale.lerp(new THREE.Vector3(0, 1, 0), 0.15);
        impactLight.intensity *= 0.8;
        if (animTimer > 8) {
          state = "falling";
          animTimer = 0;
          core.position.y = 50;
          core.scale.set(1, 1, 1);
        }
      }

      // Update Particles
      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.0055; 
          p.vel.x *= p.friction;
          p.vel.z *= p.friction;
          if (p.pos.y < -3) {
            p.pos.y = -3;
            p.vel.y *= -0.1; 
            p.vel.multiplyScalar(0.85); 
          }
          p.life -= delta;
          const progress = Math.max(0, p.life / p.maxLife);
          dummy.position.copy(p.pos);
          const s = p.scale * Math.pow(progress, 0.4);
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

      camera.position.x = Math.sin(elapsed * 0.05) * 3;
      camera.lookAt(0, 0, 0);

      composer.render();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1, 
        background: '#000' 
      }} 
    />
  );
};

export default HeroBackground3D;

