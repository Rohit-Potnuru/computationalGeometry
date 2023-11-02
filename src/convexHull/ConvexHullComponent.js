import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';

const ConvexHullComponent = () => {
  const canvasRef = useRef(null);

  function getSphere(radius, color) {
    const geometry = new THREE.SphereGeometry(radius, 64, 64);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2
    });
    return new THREE.Mesh(geometry, material);
}

  useEffect(() => {
    let sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    }

    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 1000);
    camera.position.z = 5;

    //Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setPixelRatio(2);
    renderer.setSize(sizes.width, sizes.height);

    // Resize Function
    const handleResize = () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;

        renderer.setSize(sizes.width, sizes.height);
    }
    window.addEventListener("resize", handleResize);

    // Add light
    const light = new THREE.PointLight(0xffffff, 1000, 1000);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Add points for the convex hull
    const points = [
      new THREE.Vector3(10, 10, 10),
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(1, 1, 0),
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(0, 0, 1),
      new THREE.Vector3(1, 0, 1),
      new THREE.Vector3(1, 1, 1),
      new THREE.Vector3(0, 1, 1),
    ];

    // Create convex hull
    const convexGeometry = new ConvexGeometry(points);
    const material = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: false, opacity: 0.5 });
    const convexMesh = new THREE.Mesh(convexGeometry, material);
    scene.add(convexMesh);

    // Animation loop
    const animationFrameId = window.requestAnimationFrame(loop);
    function loop() {
        renderer.render(scene, camera);
        window.requestAnimationFrame(loop);
    }

    // Cleanup
    return () => {
        window.removeEventListener("resize", handleResize);
        window.cancelAnimationFrame(animationFrameId); // Cancel the animation frame on unmount
    };
  }, []);

  return (
    <div className="ConvexHullComponent">
        <canvas ref={canvasRef} className="webgl"></canvas>
    </div>
  );
};

export default ConvexHullComponent;
