// تفعيل AOS عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true
    });
    
    // تفعيل تأثير الكتابة المتحركة
    const text = "Welcome to Cyber Security World!";
    const typingEffect = document.getElementById("typing-effect");
    let index = 0;
    function typeText() {
      if (index < text.length) {
        typingEffect.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      } else {
        setTimeout(() => {
          typingEffect.textContent = "";
          index = 0;
          typeText();
        }, 3000);
      }
    }
    typeText();
    
    // تفعيل زر العودة للأعلى
    const scrollToTopBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    });
    scrollToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
  
  /* =============================
     THREE.JS - إعداد المشهد ثلاثي الأبعاد
     ============================= */
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // خلفية شفافة لتظهر خلفية CSS
  document.body.appendChild(renderer.domElement);
  
  // إنشاء هرم ثلاثي الأبعاد (باستخدام ConeGeometry بأربعة جوانب)
  const pyramidGeometry = new THREE.ConeGeometry(5, 10, 4);
  const pyramidMaterial = new THREE.MeshStandardMaterial({
    color: 0xffcc00,
    wireframe: true
  });
  const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
  pyramid.position.y = 5;
  scene.add(pyramid);
  
  // إضافة شبكة أرضية لمحاكاة بيئة رقمية
  const gridHelper = new THREE.GridHelper(200, 50, 0x00ffff, 0x222222);
  scene.add(gridHelper);
  
  // إضافة إضاءة
  const ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0x00ffff, 5, 50);
  pointLight.position.set(0, 10, 10);
  scene.add(pointLight);
  
  // إعداد الكاميرا
  camera.position.z = 20;
  
  /* =============================
     تأثير السحب المتحركة باستخدام Sprites
     ============================= */
  const cloudTexture = new THREE.TextureLoader().load('assets/cloud.png');
  const cloudMaterial = new THREE.SpriteMaterial({ map: cloudTexture, opacity: 0.8, transparent: true });
  const clouds = [];
  for (let i = 0; i < 5; i++) {
    const cloud = new THREE.Sprite(cloudMaterial);
    cloud.position.set(
      Math.random() * 20 - 10,
      Math.random() * 10 + 8,
      Math.random() * 20 - 10
    );
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
  
  /* =============================
     تأثير الجسيمات (Particles) لمحاكاة الشرارات
     ============================= */
  const particleCount = 100;
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 20;
  }
  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMaterial = new THREE.PointsMaterial({
    color: 0x00ffff,
    size: 0.2,
    transparent: true
  });
  const particles = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particles);
  function animateParticles() {
    const positions = particles.geometry.attributes.position.array;
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.02;
    }
    particles.geometry.attributes.position.needsUpdate = true;
  }
  
  /* =============================
     تحميل نموذج الطائرة السيبرانية وتحريكها
     ============================= */
  const loader = new THREE.GLTFLoader();
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
    drones.forEach((drone, index) => {
      const angle = Date.now() * 0.0005 + index;
      drone.position.x = Math.cos(angle) * 8;
      drone.position.z = Math.sin(angle) * 8;
      drone.rotation.y += 0.05;
    });
  }
  
  /* =============================
     حلقة التحريك الرئيسية
     ============================= */
  function animate() {
    requestAnimationFrame(animate);
    pyramid.rotation.y += 0.01;
    animateClouds();
    animateParticles();
    animateDrones();
    renderer.render(scene, camera);
  }
  animate();
  
  // تحديث حجم العرض عند تغيير حجم النافذة
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
