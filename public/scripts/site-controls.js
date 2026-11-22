const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeLabel = document.querySelector('[data-theme-label]');
const searchToggle = document.querySelector('[data-search-toggle]');
const searchPanel = document.querySelector('[data-search-panel]');
const searchInput = document.querySelector('#site-post-query');

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  const light = theme === 'light';
  themeToggle?.setAttribute('aria-pressed', String(light));
  themeToggle?.setAttribute('aria-label', `Switch to ${light ? 'dark' : 'light'} theme`);
  if (themeLabel) themeLabel.textContent = light ? 'Dark mode' : 'Light mode';
};

const savedTheme = localStorage.getItem('portfolio-theme');
applyTheme(savedTheme === 'light' ? 'light' : 'dark');

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  localStorage.setItem('portfolio-theme', next);
  applyTheme(next);
});

searchToggle?.addEventListener('click', () => {
  if (!searchPanel) return;
  const opening = searchPanel.hidden;
  searchPanel.hidden = !opening;
  searchToggle.setAttribute('aria-expanded', String(opening));
  if (opening) searchInput?.focus();
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && searchPanel && !searchPanel.hidden) {
    searchPanel.hidden = true;
    searchToggle?.setAttribute('aria-expanded', 'false');
    searchToggle?.focus();
  }
});
