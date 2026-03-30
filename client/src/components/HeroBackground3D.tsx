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
    scene.background = new THREE.Color(0x020205); // Fundo escuro profundo

    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 25);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      powerPreference: "high-performance",
      alpha: false 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento ---
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.6, // Força do brilho (Glamour total)
      0.5, 
      0.1
    );
    bloomPass.renderToScreen = true;
    composer.addPass(bloomPass);

    // --- Elementos de Cena ---
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x010101, roughness: 0.2, metalness: 0.8 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.01, 0.02, 60, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    core.position.y = 30;
    scene.add(core);

    const particleCount = 10000;
    const createSandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64; canvas.height = 64;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'white');
      grad.addColorStop(0.3, 'rgba(0, 255, 170, 0.8)');
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
      depthWrite: false
    });

    const instancedSand = new THREE.InstancedMesh(new THREE.PlaneGeometry(0.1, 0.1), pMat, particleCount);
    const dummy = new THREE.Object3D();
    const particlesData = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -3, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 2 + Math.random() * 4,
      scale: 0.2 + Math.random() * 0.8
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 40, 2);
    impactLight.position.set(0, -2.5, 0);
    scene.add(impactLight);

    // --- Loop ---
    let state = "falling";
    let timer = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      timer += delta;

      if (state === "falling") {
        core.position.y -= 50 * delta;
        if (core.position.y < 27) {
          state = "impact";
          timer = 0;
          impactLight.intensity = 100;
          particlesData.forEach(p => {
            p.pos.set(0, -3, 0);
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.1 + Math.random() * 0.4;
            p.vel.set(Math.cos(angle) * speed, Math.random() * 0.2, Math.sin(angle) * speed);
            p.life = p.maxLife;
          });
        }
      } else if (state === "impact") {
        impactLight.intensity *= 0.94;
        if (timer > 0.5) state = "reset";
      } else if (state === "reset" && timer > 7) {
        state = "falling";
        core.position.y = 60;
      }

      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.007;
          if (p.pos.y < -3) { p.pos.y = -3; p.vel.y *= -0.2; }
          p.life -= delta;
          dummy.position.copy(p.pos);
          const s = p.scale * (p.life / p.maxLife);
          dummy.scale.set(s, s, s);
          dummy.quaternion.copy(camera.quaternion);
          dummy.updateMatrix();
          instancedSand.setMatrixAt(i, dummy.matrix);
        } else {
          dummy.scale.set(0,0,0);
          dummy.updateMatrix();
          instancedSand.setMatrixAt(i, dummy.matrix);
        }
      });
      instancedSand.instanceMatrix.needsUpdate = true;

      composer.render();
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
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
        backgroundColor: '#020205' 
      }} 
    />
  );
};

export default HeroBackground3D;

