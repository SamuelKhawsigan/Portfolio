const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-card]')];
const dialog = document.querySelector('[data-dialog]');
const image = dialog?.querySelector('[data-image]');
const title = dialog?.querySelector('[data-title]');
const issuer = dialog?.querySelector('[data-issuer]');
const date = dialog?.querySelector('[data-date]');
const alt = dialog?.querySelector('[data-alt]');

const closeReceipt = () => {
  if (!dialog) return;
  dialog.hidden = true;
  if (image) {
    image.hidden = true;
    image.style.display = 'none';
    image.removeAttribute('src');
    image.alt = '';
  }
};

filters.forEach((filter) => filter.addEventListener('click', () => {
  const selected = filter.dataset.filter || 'all';
  filters.forEach((item) => item.classList.toggle('is-active', item === filter));
  cards.forEach((card) => { card.hidden = selected !== 'all' && card.dataset.category !== selected; });
}));

document.querySelectorAll('[data-open]').forEach((button) => button.addEventListener('click', () => {
  if (!dialog || !image || !title || !issuer || !date || !alt) return;
  image.hidden = false;
  image.style.display = 'block';
  image.src = button.dataset.src || '';
  image.alt = button.dataset.alt || '';
  title.textContent = button.dataset.title || '';
  issuer.textContent = button.dataset.issuer || '';
  date.textContent = button.dataset.date || '';
  alt.textContent = button.dataset.alt || '';
  dialog.hidden = false;
}));

image?.addEventListener('error', () => {
  image.hidden = true;
  image.style.display = 'none';
});
document.querySelector('[data-close]')?.addEventListener('click', closeReceipt);
dialog?.addEventListener('click', (event) => { if (event.target === dialog) closeReceipt(); });
window.addEventListener('keydown', (event) => { if (event.key === 'Escape' && !dialog?.hidden) closeReceipt(); });
