// =====================
// LENIS (UNA SOLA VEZ)
// =====================
const lenis = new Lenis({
  smooth: true,
  lerp: 0.05,
  duration: 1.2,
  smoothTouch: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// =====================
// GSAP SETUP
// =====================
gsap.registerPlugin(ScrollTrigger);

// IMPORTANTE: sincronizar ScrollTrigger con Lenis
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add(time => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// =====================
// TEXT DROP (AVANZADO)
// =====================
window.addEventListener("DOMContentLoaded", () => {
  const lines = gsap.utils.toArray(".text-drop__line");
  const images = gsap.utils.toArray(".text-drop__img-box");
  const prlxElements = gsap.utils.toArray(".has-prlx");

  lines.forEach((line, index) => {
    // Texto 3D drop
    gsap.fromTo(
      line,
      { rotateX: -120 },
      {
        rotateX: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true
        }
      }
    );

    // Reveal imágenes
    if (images[index]) {
      const opacity = images[index].dataset.opacity || 1;

      gsap.to(images[index], {
        opacity,
        ease: "power2.out",
        scrollTrigger: {
          trigger: line,
          start: "bottom bottom-=400",
          end: "bottom top",
          scrub: true
        }
      });
    }
  });

  // Parallax imágenes
  prlxElements.forEach(el => {
    const speed = parseFloat(el.dataset.speed) || 0.5;

    gsap.to(el, {
      y: () => -(1 - speed) * 150,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });
  });

  ScrollTrigger.refresh();
});

// =====================
// SWIPER (SE MANTIENE)
// =====================
new Swiper(".horizontal-ticker__slider", {
  slidesPerView: "auto",
  loop: true,
  autoplay: {
    delay: 1,
    disableOnInteraction: false
  },
  speed: 4000,
  allowTouchMove: false
});





gsap.from(".portfolio-card", {
  scrollTrigger: {
    trigger: ".portfolio-grid",
    start: "top 80%",
  },
  opacity: 0,
  y: 40,
  duration: 1.2,
  ease: "power3.out",
  stagger: 0.15
});
