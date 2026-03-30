import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Componente de Fundo 3D para a Seção Hero
 * Recria o efeito de cubo de dados com dissipação de partículas (Digital Core)
 */
const HeroBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // --- CONFIGURAÇÃO INICIAL ---
    let scene: THREE.Scene, 
        camera: THREE.PerspectiveCamera, 
        renderer: THREE.WebGLRenderer, 
        particles: THREE.Points, 
        cubeLines: THREE.LineSegments;

    const particleCount = 10000;
    const container = containerRef.current;

    const init = () => {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera(
        45, 
        container.clientWidth / container.clientHeight, 
        0.1, 
        1000
      );
      camera.position.set(0, 2, 8);

      renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
      });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // --- OBJETO: CUBO WIREFRAME ---
      const cubeSize = 2.2;
      const cubeGeom = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      const edges = new THREE.EdgesGeometry(cubeGeom);
      const lineMat = new THREE.LineBasicMaterial({ 
        color: 0x0066ff, 
        transparent: true, 
        opacity: 0.2 
      });
      cubeLines = new THREE.LineSegments(edges, lineMat);
      scene.add(cubeLines);

      // --- OBJETO: PARTÍCULAS DENSAS ---
      const pGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const vels: { x: number; y: number; z: number }[] = [];

      for (let i = 0; i < particleCount; i++) {
        // Posicionamento inicial dentro/em volta do cubo
        positions[i * 3] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

        // Gradiente de cores (Azul/Ciano/Branco)
        const mix = Math.random();
        colors[i * 3] = 0.1 * mix;      // R
        colors[i * 3 + 1] = 0.4 + (mix * 0.4); // G
        colors[i * 3 + 2] = 0.8 + (mix * 0.2); // B

        vels.push({
          x: Math.random() * 0.02 + 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005
        });
      }

      pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

      const pMaterial = new THREE.PointsMaterial({
        size: 0.025,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      particles = new THREE.Points(pGeometry, pMaterial);
      scene.add(particles);

      // --- ILUMINAÇÃO ---
      const pLight = new THREE.PointLight(0x0066ff, 5, 15);
      pLight.position.set(0, 0, 2);
      scene.add(pLight);
      scene.add(new THREE.AmbientLight(0x101020));

      // --- CHÃO REFLEXIVO (Sutil) ---
      const floorGeom = new THREE.PlaneGeometry(50, 50);
      const floorMat = new THREE.MeshStandardMaterial({ 
        color: 0x020205, 
        roughness: 0.2, 
        metalness: 0.8 
      });
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2.5;
      scene.add(floor);

      animate(vels);
    };

    const animate = (velocities: any[]) => {
      const frameId = requestAnimationFrame(() => animate(velocities));

      cubeLines.rotation.y += 0.001;
      cubeLines.rotation.x += 0.0005;

      const posArr = particles.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        posArr[i * 3] += velocities[i].x;
        posArr[i * 3 + 1] += velocities[i].y;
        posArr[i * 3 + 2] += velocities[i].z;

        // Loop das partículas quando saem da tela à direita
        if (posArr[i * 3] > 5) {
          posArr[i * 3] = (Math.random() - 0.5) * 1.5;
          posArr[i * 3 + 1] = (Math.random() - 0.5) * 2;
          posArr[i * 3 + 2] = (Math.random() - 0.5) * 2;
        }
      }
      particles.geometry.attributes.position.needsUpdate = true;
      
      // Movimento suave da câmera com o tempo
      const time = Date.now() * 0.0002;
      camera.position.x = Math.sin(time) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);

      // Guardar ID para limpeza
      (container as any)._frameId = frameId;
    };

    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    init();
    window.addEventListener('resize', handleResize);

    // Limpeza ao desmontar o componente (Importante para React!)
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame((container as any)._frameId);
      if (renderer) {
        renderer.dispose();
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 w-full h-full z-0 bg-[#020205]"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default HeroBackground3D;

