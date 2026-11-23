(() => {
  document.querySelectorAll('input[type="file"][accept*="image"]').forEach(input => {
    let reader;
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;
      if (reader?.readyState === FileReader.LOADING) reader.abort();
      const area = input.closest('.form-sidebar, .media-section, .editor-section') || input.parentElement;
      let preview = area.querySelector('[data-image-preview]');
      if (!preview) {
        preview = document.createElement('img');
        preview.className = 'image-preview';
        preview.dataset.imagePreview = '';
        area.prepend(preview);
      }
      const label = input.closest('.dropzone')?.querySelector('strong');
      if (label) label.textContent = file.name;
      // The site's image policy allows data URLs, so previews use FileReader
      // instead of blob URLs that the browser blocks in production.
      reader = new FileReader();
      reader.addEventListener('load', () => {
        if (input.files?.[0] !== file) return;
        preview.src = String(reader.result);
        preview.alt = `Selected image: ${file.name}`;
        preview.hidden = false;
      });
      reader.addEventListener('error', () => {
        if (label) label.textContent = 'Could not preview this file. Choose another image.';
      });
      reader.readAsDataURL(file);
    });
  });
})();
