/* Lineside Electrical Limited — interactions */
(function () {
  "use strict";

  // Intro overlay
  window.addEventListener("load", function () {
    var intro = document.getElementById("intro");
    if (intro) setTimeout(function () { intro.classList.add("gone"); }, 1300);
  });

  // Nav scroll state
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add("nav--scrolled");
    else nav.classList.remove("nav--scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Mobile nav toggle
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var links = document.querySelector(".nav-links");
      if (!links) return;
      var open = links.style.display === "flex";
      links.style.display = open ? "" : "flex";
      links.style.flexDirection = "column";
      links.style.position = "fixed";
      links.style.top = "62px";
      links.style.right = "16px";
      links.style.background = "#1d2026";
      links.style.padding = "18px 22px";
      links.style.borderRadius = "8px";
      links.style.boxShadow = "0 20px 40px -20px rgba(0,0,0,.7)";
    });
  }

  // Rolling hero
  var slides = document.querySelectorAll(".hero-slide");
  if (slides.length > 1) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce) {
      var i = 0;
      setInterval(function () {
        slides[i].classList.remove("active");
        i = (i + 1) % slides.length;
        slides[i].classList.add("active");
      }, 6000);
    }
  }

  // Scroll reveal
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });

  // Year
  var y = document.getElementById("yr");
  if (y) y.textContent = new Date().getFullYear();
})();
