<!DOCTYPE html>
<html lang="pt-pt">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Energy Genesis - Massive Sand Edition</title>
    <style>
        :root { --accent: #00ffaa; }
        body { margin: 0; overflow: hidden; background-color: #000; cursor: none; }
        #canvas-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; }
        
        .glow-cursor {
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--accent);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 999;
            box-shadow: 0 0 10px var(--accent);
            opacity: 0.6;
        }
    </style>
</head>
<body>

    <div id="canvas-container"></div>
    <div class="glow-cursor" id="cursor"></div>

    <script type="importmap">
        {
            "imports": {
                "three": "https://cdnjs.cloudflare.com/ajax/libs/three.js/0.170.0/three.module.js",
                "three/addons/": "https://cdn.jsdelivr.net/npm/three@0.170.0/examples/jsm/"
            }
        }
    </script>

    <script type="module">
        import * as THREE from 'three';
        import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
        import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
        import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
        import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

        // --- Engine Setup ---
        const container = document.getElementById('canvas-container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 6, 25); // Afastado para ver o volume total

        const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        container.appendChild(renderer.domElement);

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));

        // Bloom sutil para não ofuscar a granulação da areia
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.0, 0.4, 0.85);
        bloomPass.threshold = 0.15;
        bloomPass.strength = 1.3;
        bloomPass.radius = 0.5;
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());

        // --- Objetos ---
        
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

        // --- Sistema de Areia Ultra Volumétrico (12.000 partículas) ---
        const particleCount = 12000;
        
        const createSandTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 32;
            canvas.height = 32;
            const ctx = canvas.getContext('2d');
            const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
            grad.addColorStop(0, 'white');
            grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.7)');
            grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = grad;
            ctx.fillRect(0, 0, 32, 32);
            return new THREE.CanvasTexture(canvas);
        };

        const sandTexture = createSandTexture();
        const pGeo = new THREE.PlaneGeometry(0.06, 0.06); // Grãos menores e mais nítidos
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

        // --- Animação ---
        let clock = new THREE.Clock();
        let state = "falling"; 
        let timer = 0;

        function triggerImpact() {
            state = "impact";
            timer = 0;
            impactLight.intensity = 80;
            
            particlesData.forEach(p => {
                p.pos.set(0, -3, 0);
                const angle = Math.random() * Math.PI * 2;
                // Dispersão com maior variação de energia
                const speed = 0.05 + Math.random() * 0.35;
                const upwardForce = Math.random() * 0.15;
                
                p.vel.set(
                    Math.cos(angle) * speed, 
                    upwardForce, 
                    Math.sin(angle) * speed
                );
                p.life = p.maxLife;
            });
        }

        function updateSand(delta) {
            particlesData.forEach((p, i) => {
                if(p.life > 0) {
                    p.pos.add(p.vel);
                    
                    // Gravidade e atrito individual
                    p.vel.y -= 0.0055; 
                    p.vel.x *= p.friction;
                    p.vel.z *= p.friction;
                    
                    // Colisão e deslizamento na areia
                    if(p.pos.y < -3) {
                        p.pos.y = -3;
                        p.vel.y *= -0.1; // Salto mínimo
                        p.vel.multiplyScalar(0.85); // Atrito forte no solo
                    }
                    
                    p.life -= delta;
                    const progress = p.life / p.maxLife;
                    
                    dummy.position.copy(p.pos);
                    // Escala diminui levemente conforme a areia "esfria"
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
        }

        function animate() {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            timer += delta;

            if(state === "falling") {
                core.position.y -= 50 * delta;
                if(core.position.y - 30 <= -3.2) triggerImpact();
            } else if (state === "impact") {
                impactLight.intensity *= 0.92;
                // Tremor visual do raio
                core.scale.x = 1 + Math.sin(timer * 70) * 0.3;
                core.scale.z = core.scale.x;
                if(timer > 0.4) state = "reset";
            } else if (state === "reset") {
                core.scale.lerp(new THREE.Vector3(0, 1, 0), 0.15);
                impactLight.intensity *= 0.8;
                if(timer > 8) {
                    state = "falling";
                    timer = 0;
                    core.position.y = 50;
                    core.scale.set(1, 1, 1);
                }
            }

            updateSand(delta);

            const t = clock.getElapsedTime();
            camera.position.x = Math.sin(t * 0.05) * 3;
            camera.lookAt(0, 0, 0);

            composer.render();
        }

        const cursor = document.getElementById('cursor');
        window.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    </script>
</body>
</html>

