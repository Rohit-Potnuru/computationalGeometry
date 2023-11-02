import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

function getSphere(radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2
    });
    return new THREE.Mesh(geometry, material);
}

function Circle() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const scene = new THREE.Scene();

        // Sizes 
        let sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        // Sphere
        const spheres = [[3, "green", 0],
                        //  [1, "yellow", 10], 
                        //  [2, "#c18f17", 20], 
                        //  [4, "blue", 30], 
                        //  [3, "red", 40], 
                        //  [10, "brown", 60],
                        //  [1, "grey", [80, 20]]
                    ];
        const spheresMesh = spheres.map((sphere) => {
            const radius = sphere[0];
            const color = sphere[1];
            const sphereMesh = getSphere(radius, color);
            if(typeof(sphere[2]) == "object") {
                sphereMesh.position.x = sphere[2][0];
                sphereMesh.position.y = sphere[2][1];
            }
            else {
                sphereMesh.position.x = sphere[2];
            }
            scene.add(sphereMesh);
            return sphereMesh;
        })

        // Light
        const light = new THREE.PointLight(0xffffff, 1000, 1000);
        light.position.set(0, 10, 10);
        scene.add(light);

        // Camera
        const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
        camera.position.z = 20;

        // Controls
        const controls = new OrbitControls(camera, canvasRef.current);
        controls.enableDamping = true;
        controls.enablePan = false;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setPixelRatio(2);
        renderer.setSize(sizes.width, sizes.height);

        // Resize Function
        const handleResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;

            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();

            renderer.setSize(sizes.width, sizes.height);
        }
        window.addEventListener("resize", handleResize);

        // Animation Loop
        const animationFrameId = window.requestAnimationFrame(loop);
        function loop() {
            renderer.render(scene, camera);
            controls.update(); // If you want controls to update every frame
            window.requestAnimationFrame(loop);
        }

        return () => {
            window.removeEventListener("resize", handleResize);
            window.cancelAnimationFrame(animationFrameId); // Cancel the animation frame on unmount
        };

    }, []);

    return (
        <div className="Circle">
            <canvas ref={canvasRef} className="webgl"></canvas>
        </div>
    );
}

export default Circle;
