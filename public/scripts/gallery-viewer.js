(() => {
  const dialog = document.querySelector('[data-gallery-dialog]');
  const rail = document.querySelector('[data-gallery-stream]');
  const items = [...document.querySelectorAll('[data-gallery-open]')];
  if (!dialog || !rail || !items.length) return;
  const image = dialog.querySelector('[data-dialog-image]');
  const title = dialog.querySelector('[data-dialog-title]');
  const summary = dialog.querySelector('[data-dialog-summary]');
  const eventLink = dialog.querySelector('[data-dialog-event]');
  const counter = dialog.querySelector('[data-dialog-index]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduceMotion ? 0 : Math.max(120, Math.min(1600, Number(rail.dataset.scrollDuration) || 420));
  let active = 0;
  let opener;
  let animation;
  const scrollRail = direction => {
    cancelAnimationFrame(animation);
    const start = rail.scrollLeft;
    const distance = Math.min(rail.clientWidth * .78, 520) * direction;
    if (!duration) { rail.scrollLeft += distance; return; }
    const started = performance.now();
    const tick = now => {
      const progress = Math.min(1, (now - started) / duration);
      rail.scrollLeft = start + distance * (1 - Math.pow(1 - progress, 3));
      if (progress < 1) animation = requestAnimationFrame(tick);
    };
    animation = requestAnimationFrame(tick);
  };
  const show = (position, open = false) => {
    active = (position + items.length) % items.length;
    const item = items[active];
    image.src = item.dataset.src || '';
    image.alt = item.dataset.alt || '';
    title.textContent = item.dataset.title || '';
    summary.textContent = item.dataset.summary || '';
    counter.textContent = `Gallery / ${active + 1} of ${items.length}`;
    eventLink.href = item.dataset.eventHref || '/events/';
    eventLink.textContent = 'Read more about this event →';
    eventLink.setAttribute('aria-label', `Read more about ${item.dataset.eventTitle || 'this event'}`);
    if (open && !dialog.open) { opener = item; dialog.showModal(); }
  };
  items.forEach((button, position) => button.addEventListener('click', () => show(position, true)));
  dialog.querySelector('[data-gallery-prev]')?.addEventListener('click', () => show(active - 1));
  dialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => show(active + 1));
  document.querySelector('[data-rail-prev]')?.addEventListener('click', () => scrollRail(-1));
  document.querySelector('[data-rail-next]')?.addEventListener('click', () => scrollRail(1));
  window.addEventListener('keydown', event => {
    if (event.metaKey || event.ctrlKey || event.altKey || document.activeElement?.matches('input,textarea,select,[contenteditable="true"]')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    const direction = event.key === 'ArrowLeft' ? -1 : 1;
    if (dialog.open) show(active + direction); else scrollRail(direction);
  });
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => { image.removeAttribute('src'); opener?.focus({ preventScroll: true }); });
})();
