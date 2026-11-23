(() => {
  const form = document.querySelector('[data-gallery-search]');
  if (!form) return;
  const input = form.querySelector('input[name="q"]');
  const albums = [...document.querySelectorAll('[data-search-event]')];
  const results = document.querySelector('[data-gallery-search-results]');
  const empty = document.querySelector('[data-gallery-search-empty]');
  if (!input || !results) return;
  const filter = () => {
    const query = input.value.trim();
    const terms = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const matches = text => terms.every(term => text.toLocaleLowerCase().includes(term));
    let photos = 0;
    let events = 0;
    albums.forEach(album => {
      const eventMatches = matches(album.dataset.searchEvent || '');
      let visible = 0;
      album.querySelectorAll('[data-search-photo]').forEach(photo => {
        photo.hidden = !(eventMatches || matches(photo.dataset.searchPhoto || ''));
        if (!photo.hidden) visible++;
      });
      album.hidden = visible === 0;
      photos += visible;
      if (visible) events++;
    });
    results.textContent = `${photos} photos in ${events} events${query ? ` matching “${query}”` : ''}.`;
    if (empty) empty.hidden = photos > 0;
    const url = new URL(location.href);
    if (query) url.searchParams.set('q', query); else url.searchParams.delete('q');
    history.replaceState(null, '', url);
  };
  input.addEventListener('input', filter);
  form.addEventListener('submit', event => { event.preventDefault(); filter(); });
  form.querySelector('[data-gallery-search-clear]')?.addEventListener('click', event => {
    event.preventDefault(); input.value = ''; filter(); input.focus();
  });
  window.addEventListener('popstate', () => { input.value = new URL(location.href).searchParams.get('q') || ''; filter(); });
})();
