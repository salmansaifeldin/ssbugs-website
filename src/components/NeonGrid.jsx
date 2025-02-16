import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const NeonGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(20, 20, 20, 20);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ffff, wireframe: true });
    const grid = new THREE.Mesh(geometry, material);
    scene.add(grid);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      grid.rotation.x += 0.01;
      grid.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

export default NeonGrid;
