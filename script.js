/* Lineside Electrical Limited — interactions */
(function () {
  "use strict";

  // Year
  var yr = document.getElementById("yr");
  if (yr) yr.textContent = new Date().getFullYear();

  // Sticky nav state
  var nav = document.getElementById("nav");
  if (nav) {
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("scrolled");
      else nav.classList.remove("scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Reveal on scroll
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  // Rolling hero
  var slidesWrap = document.getElementById("slides");
  if (!slidesWrap) return;
  var slides = Array.prototype.slice.call(slidesWrap.querySelectorAll(".hero-slide"));
  if (slides.length < 2) return;

  // Lazy-load non-first slides
  slides.forEach(function (s) {
    var src = s.getAttribute("data-src");
    if (src) {
      var img = new Image();
      img.onload = function () { s.style.backgroundImage = "url('" + src + "')"; };
      img.src = src;
    }
  });

  // Dots
  var dotsWrap = document.getElementById("dots");
  var dots = [];
  slides.forEach(function (_, i) {
    var b = document.createElement("button");
    b.setAttribute("aria-label", "Show slide " + (i + 1));
    if (i === 0) b.classList.add("active");
    b.addEventListener("click", function () { go(i); });
    dotsWrap.appendChild(b);
    dots.push(b);
  });

  var idx = 0, timer = null;
  function show(i) {
    slides[idx].classList.remove("active");
    dots[idx].classList.remove("active");
    idx = (i + slides.length) % slides.length;
    slides[idx].classList.add("active");
    dots[idx].classList.add("active");
  }
  function go(i) { show(i); restart(); }
  function next() { show(idx + 1); }
  function restart() { if (timer) clearInterval(timer); if (!reduce) timer = setInterval(next, 6000); }

  if (!reduce) restart();
})();
