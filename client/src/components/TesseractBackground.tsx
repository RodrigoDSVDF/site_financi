import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface TesseractProps {
  children?: React.ReactNode;
  className?: string;
}

const TesseractBackground: React.FC<TesseractProps> = ({ children, className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(
      50, 
      container.clientWidth / container.clientHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const worldGroup = new THREE.Group();
    const tesseractGroup = new THREE.Group();
    scene.add(worldGroup);
    worldGroup.add(tesseractGroup);

    const createCube = (size: number, opacity: number, color = 0x00d9ff) => {
      const geom = new THREE.BoxGeometry(size, size, size);
      const edges = new THREE.EdgesGeometry(geom);
      const mat = new THREE.LineBasicMaterial({ 
        color: color, 
        transparent: true, 
        opacity: opacity,
        blending: THREE.AdditiveBlending
      });
      return new THREE.LineSegments(edges, mat);
    };

    const outerCube = createCube(4, 0.08); 
    const innerCube = createCube(2, 0.15, 0x00ffff);
    tesseractGroup.add(outerCube, innerCube);

    const connectMat = new THREE.LineBasicMaterial({ 
      color: 0x00ffff, 
      transparent: true, 
      opacity: 0.05,
      blending: THREE.AdditiveBlending
    });
    
    const connectGeom = new THREE.BufferGeometry();
    const connectVertices: number[] = [];
    const basePoints = [-1, -1, -1,  1, -1, -1,  1,  1, -1, -1,  1, -1, -1, -1,  1,  1, -1,  1,  1,  1,  1, -1,  1,  1];
    
    for (let i = 0; i < 8; i++) {
        connectVertices.push(basePoints[i*3], basePoints[i*3+1], basePoints[i*3+2]);
        connectVertices.push(basePoints[i*3]*2, basePoints[i*3+1]*2, basePoints[i*3+2]*2);
    }
    connectGeom.setAttribute('position', new THREE.Float32BufferAttribute(connectVertices, 3));
    const connections = new THREE.LineSegments(connectGeom, connectMat);
    tesseractGroup.add(connections);

    const particleCount = 18000;
    const pGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData: {angle: number, radius: number, speed: number, ySub: number}[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 4.2;
      const x = Math.cos(angle) * radius;
      const y = (Math.random() - 0.5) * 12;
      const z = Math.sin(angle) * radius;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const color = new THREE.Color();
      color.setHSL(0.52 + Math.random() * 0.08, 0.9, 0.5 + Math.random() * 0.3);
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      particleData.push({
        angle: angle,
        radius: radius,
        speed: 0.002 + Math.random() * 0.005,
        ySub: 0.006 + Math.random() * 0.015,
      });
    }

    pGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const canvas = document.createElement('canvas');
    canvas.width = 32; canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.4, 'rgba(0,255,255,0.6)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    const particleTex = new THREE.CanvasTexture(canvas);

    const pMaterial = new THREE.PointsMaterial({
      size: 0.08,
      map: particleTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(pGeometry, pMaterial);
    worldGroup.add(particles);

    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      tesseractGroup.rotation.y = time * 0.12;
      tesseractGroup.rotation.z = time * 0.06;
      
      const scale = 1 + Math.sin(time * 0.8) * 0.04;
      innerCube.scale.set(scale, scale, scale);

      const posArr = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const d = particleData[i];
        d.angle += d.speed;
        
        posArr[i * 3] = Math.cos(d.angle) * d.radius;
        posArr[i * 3 + 2] = Math.sin(d.angle) * d.radius;
        
        posArr[i * 3 + 1] -= d.ySub;
        if (posArr[i * 3 + 1] < -7) posArr[i * 3 + 1] = 7;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseRef.current.x * 2.5 - camera.position.x) * 0.02;
      camera.position.y += (mouseRef.current.y * 2.5 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      pGeometry.dispose();
      pMaterial.dispose();
      particleTex.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Background Gradient */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_#000c1f_0%,_#000103_100%)]" />
      {/* Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 z-10" />
      {/* Overlay Shadow */}
      <div className="absolute inset-0 z-20 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]" />
      {/* Content */}
      <div className="relative z-30 w-full h-full">
        {children}
      </div>
    </div>
  );
};

export default TesseractBackground;

