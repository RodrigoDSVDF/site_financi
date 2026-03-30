import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Configuração da Engine ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 6, 22);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    containerRef.current.appendChild(renderer.domElement);

    // --- Pós-Processamento (Brilho Neon) ---
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight), 
      1.2, // Força do brilho
      0.4, 
      0.85
    );
    bloomPass.threshold = 0.15;
    composer.addPass(bloomPass);
    composer.addPass(new OutputPass());

    // --- Objetos: Solo e Feixe de Luz ---
    const floorGeo = new THREE.PlaneGeometry(200, 200);
    const floorMat = new THREE.MeshStandardMaterial({ color: 0x010101, roughness: 0.35, metalness: 0.6 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -3;
    scene.add(floor);

    const beamGroup = new THREE.Group();
    scene.add(beamGroup);

    const core = new THREE.Mesh(
      new THREE.CylinderGeometry(0.008, 0.02, 60, 8), 
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    core.position.y = 30;
    beamGroup.add(core);

    const aura = new THREE.Mesh(
      new THREE.CylinderGeometry(0.03, 0.12, 60, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ffaa, transparent: true, opacity: 0.12, blending: THREE.AdditiveBlending })
    );
    core.add(aura);

    // --- Sistema de Partículas (Areia) ---
    const particleCount = 6000;
    const createSandTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32; canvas.height = 32;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'white');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
      return new THREE.CanvasTexture(canvas);
    };

    const pGeo = new THREE.PlaneGeometry(0.07, 0.07);
    const pMat = new THREE.MeshBasicMaterial({
      map: createSandTexture(),
      color: 0x00ffaa,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.7
    });

    const instancedSand = new THREE.InstancedMesh(pGeo, pMat, particleCount);
    const dummy = new THREE.Object3D();
    const particlesData = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -3, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 2.5 + Math.random() * 2.5,
      scale: 0.15 + Math.random() * 0.6
    }));
    scene.add(instancedSand);

    const impactLight = new THREE.PointLight(0x00ffaa, 0, 25, 1.8);
    impactLight.position.set(0, -2.2, 0);
    scene.add(impactLight);

    // --- Lógica de Animação ---
    let clock = new THREE.Clock();
    let state = "falling"; 
    let timer = 0;

    const triggerImpact = () => {
      state = "impact";
      timer = 0;
      impactLight.intensity = 60;
      particlesData.forEach(p => {
        p.pos.set(0, -3, 0);
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.08 + Math.random() * 0.25;
        p.vel.set(Math.cos(angle) * speed, Math.random() * 0.12, Math.sin(angle) * speed);
        p.life = p.maxLife;
      });
    };

    const animate = () => {
      const delta = clock.getDelta();
      timer += delta;

      if (state === "falling") {
        core.position.y -= 45 * delta;
        if (core.position.y - 30 <= -3.1) triggerImpact();
      } else if (state === "impact") {
        impactLight.intensity *= 0.94;
        if (timer > 0.4) state = "reset";
      } else if (state === "reset") {
        core.scale.lerp(new THREE.Vector3(0, 1, 0), 0.12);
        if (timer > 7) {
          state = "falling";
          timer = 0;
          core.position.y = 50;
          core.scale.set(1, 1, 1);
        }
      }

      // Atualizar Partículas
      particlesData.forEach((p, i) => {
        if (p.life > 0) {
          p.pos.add(p.vel);
          p.vel.y -= 0.005; 
          if (p.pos.y < -3) { p.pos.y = -3; p.vel.y *= -0.15; }
          p.life -= delta;
          dummy.position.copy(p.pos);
          const s = p.scale * Math.pow(p.life / p.maxLife, 0.5);
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

      camera.position.x = Math.sin(clock.getElapsedTime() * 0.08) * 2;
      camera.lookAt(0, 0, 0);
      composer.render();
      requestAnimationFrame(animate);
    };

    animate();

    // --- Limpeza ---
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

2. Por que isso é melhor para o seu site?
 * Vite Compatibility: No código que você enviou, os imports vinham de URLs (https://...). No React/Vite, usamos a pasta node_modules. O código acima já está configurado para o padrão correto (three/examples/jsm/...).
 * Gerenciamento de Memória: O React precisa "limpar" o Three.js quando você muda de página, caso contrário o site começa a ficar lento. Adicionei o return () => { renderer.dispose(); } para evitar isso.
 * Z-Index: Configurei o div para ficar no z-0 e com pointer-events-none. Isso garante que o efeito fique atrás dos seus textos e que os botões continuem funcionando.
3. Opcional: O Cursor Brilhante
O código original tinha um cursor neon. Se você quiser ele também, adicione este pequeno bloco de CSS no seu arquivo global de estilos (index.css ou similar):
.glow-cursor {
    position: fixed;
    width: 8px;
    height: 8px;
    background: #00ffaa;
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    box-shadow: 0 0 15px #00ffaa;
    mix-blend-mode: screen;
}


