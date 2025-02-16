document.addEventListener("DOMContentLoaded", function () {
  AOS.init();

  const text = "Protecting the Future of Cyber Security...";
  let i = 0;
  function typeEffect() {
    if (i < text.length) {
      document.getElementById("typing-effect").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeEffect, 100);
    }
  }
  typeEffect();

  // زر العودة للأعلى
  const scrollToTopBtn = document.getElementById("scrollToTopBtn");
  window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
      scrollToTopBtn.style.display = "block";
    } else {
      scrollToTopBtn.style.display = "none";
    }
  };
  scrollToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
