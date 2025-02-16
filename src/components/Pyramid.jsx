import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const Pyramid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.ConeGeometry(5, 10, 4);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const pyramid = new THREE.Mesh(geometry, material);
    scene.add(pyramid);

    camera.position.z = 15;

    const animate = () => {
      requestAnimationFrame(animate);
      pyramid.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => mountRef.current.removeChild(renderer.domElement);
  }, []);

  return <div ref={mountRef}></div>;
};

export default Pyramid;
