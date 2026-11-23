(() => {
  document.querySelectorAll('[data-delete-form]').forEach((form) => {
    let isSubmitting = false;

    form.addEventListener('submit', (event) => {
      if (isSubmitting) {
        event.preventDefault();
        return;
      }

      const itemName = form.dataset.itemName || 'this item';
      const message = form.dataset.deleteMessage || `Delete ${itemName}? This cannot be undone.`;
      if (!window.confirm(message)) {
        event.preventDefault();
        return;
      }

      isSubmitting = true;
      const button = form.querySelector('[data-delete-button]');
      if (button instanceof HTMLButtonElement) {
        button.disabled = true;
        button.textContent = 'Deleting…';
      }
    });
  });
})();
