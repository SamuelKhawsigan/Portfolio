(() => {
  document.querySelectorAll('input[type="file"][accept*="image"]').forEach(input => {
    let objectUrl;
    input.addEventListener('change', () => {
      const file = input.files?.[0];
      if (!file) return;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      objectUrl = URL.createObjectURL(file);
      const area = input.closest('.form-sidebar, .media-section, .editor-section') || input.parentElement;
      let preview = area.querySelector('[data-image-preview]');
      if (!preview) {
        preview = document.createElement('img');
        preview.className = 'image-preview';
        preview.dataset.imagePreview = '';
        area.prepend(preview);
      }
      preview.src = objectUrl;
      preview.alt = `Selected image: ${file.name}`;
      preview.hidden = false;
      const label = input.closest('.dropzone')?.querySelector('strong');
      if (label) label.textContent = file.name;
    });
  });
})();
