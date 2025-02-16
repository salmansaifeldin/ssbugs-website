import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';

document.addEventListener("DOMContentLoaded", () => {
    AOS.init({ duration: 1000, easing: "ease-in-out", once: true });

    const text = "Welcome to Cyber Security World!";
    const typingEffect = document.getElementById("typing-effect");
    let index = 0;
    function typeText() {
        if (index < text.length) {
            typingEffect.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        } else {
            setTimeout(() => { typingEffect.textContent = ""; index = 0; typeText(); }, 3000);
        }
    }
    typeText();

    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
        scrollToTopBtn.classList.toggle("show", window.scrollY > 300);
    });
    scrollToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const pyramidGeometry = new THREE.ConeGeometry(5, 10, 4);
const pyramidMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00, wireframe: true });
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
pyramid.position.y = 5;
scene.add(pyramid);

const gridHelper = new THREE.GridHelper(200, 50, 0x00ffff, 0x222222);
scene.add(gridHelper);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0x00ffff, 5, 50);
pointLight.position.set(0, 10, 10);
scene.add(pointLight);

camera.position.z = 20;

const cloudTexture = new THREE.TextureLoader().load('assets/cloud.png');
const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, opacity: 0.8, transparent: true });
const clouds = [];
for (let i = 0; i < 5; i++) {
    const cloud = new THREE.Sprite(cloudMaterial);
    cloud.position.set(Math.random() * 20 - 10, Math.random() * 10 + 8, Math.random() * 20 - 10);
    cloud.scale.set(5, 3, 1);
    scene.add(cloud);
    clouds.push(cloud);
}
function animateClouds() {
    clouds.forEach(cloud => {
        cloud.position.x += 0.02 * (Math.random() > 0.5 ? 1 : -1);
        cloud.position.z += 0.02 * (Math.random() > 0.5 ? 1 : -1);
    });
}

const particleCount = 100;
const particleGeometry = new THREE.BufferGeometry();
const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
}
particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleMaterial = new THREE.PointsMaterial({ color: 0x00ffff, size: 0.2, transparent: true });
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);
function animateParticles() {
    const elapsedTime = clock.getElapsedTime();
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i + 1] += Math.sin(elapsedTime + i) * 0.02;
    }
    particles.geometry.attributes.position.needsUpdate = true;
}

const loader = new GLTFLoader();
let drones = [];
loader.load('assets/drone.glb', function (gltf) {
    for (let i = 0; i < 3; i++) {
        const drone = gltf.scene.clone();
        drone.position.set(Math.random() * 10 - 5, 5, Math.random() * 10 - 5);
        drone.scale.set(0.5, 0.5, 0.5);
        scene.add(drone);
        drones.push(drone);
    }
});
function animateDrones() {
    const elapsedTime = clock.getElapsedTime();
    drones.forEach((drone, index) => {
        const angle = elapsedTime + index;
        drone.position.x = Math.cos(angle) * 8;
        drone.position.z = Math.sin(angle) * 8;
        drone.rotation.y += 0.05;
    });
}

function animate() {
    requestAnimationFrame(animate);
    pyramid.rotation.y += 0.01;
    animateClouds();
    animateParticles();
    animateDrones();
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});
