(() => {
  document.querySelectorAll('[data-portrait-carousel]').forEach(carousel => {
    const slides = [...carousel.querySelectorAll('[data-portrait-slide]')];
    const dots = [...carousel.querySelectorAll('[data-portrait-dot]')];
    const caption = carousel.querySelector('[data-portrait-caption]');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (slides.length < 2) return;
    let active = 0;
    let timer;
    let hovered = false;
    const stop = () => { window.clearInterval(timer); timer = undefined; };
    const show = next => {
      active = (next + slides.length) % slides.length;
      slides.forEach((slide, index) => {
        slide.classList.toggle('is-active', index === active);
        slide.setAttribute('aria-hidden', String(index !== active));
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle('is-active', index === active);
        dot.setAttribute('aria-current', String(index === active));
      });
      if (caption) caption.textContent = slides[active].dataset.caption || '';
    };
    const restart = () => {
      stop();
      if (!motion.matches && !document.hidden && !hovered && !carousel.contains(document.activeElement)) {
        timer = window.setInterval(() => show(active + 1), 5200);
      }
    };
    carousel.querySelector('[data-portrait-prev]')?.addEventListener('click', () => { show(active - 1); restart(); });
    carousel.querySelector('[data-portrait-next]')?.addEventListener('click', () => { show(active + 1); restart(); });
    dots.forEach((dot, index) => dot.addEventListener('click', () => { show(index); restart(); }));
    carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
    carousel.addEventListener('mouseleave', () => { hovered = false; restart(); });
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', () => window.setTimeout(restart, 0));
    document.addEventListener('visibilitychange', restart);
    motion.addEventListener('change', restart);
    show(0);
    restart();
  });
})();
