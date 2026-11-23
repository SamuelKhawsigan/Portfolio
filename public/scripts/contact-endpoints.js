(() => {
  const copyWithFallback = (value) => {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(value);
    const textarea = document.createElement('textarea');
    textarea.value = value;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.append(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied ? Promise.resolve() : Promise.reject(new Error('Copy unavailable'));
  };
  document.querySelectorAll('[data-copy-value]').forEach((button) => {
    let resetTimer;
    button.addEventListener('click', async () => {
      const value = button.dataset.copyValue;
      const text = button.querySelector('[data-copy-text]');
      if (!value || !text) return;
      try {
        await copyWithFallback(value);
        window.clearTimeout(resetTimer);
        button.classList.add('is-copied');
        text.textContent = 'Copied';
        resetTimer = window.setTimeout(() => { button.classList.remove('is-copied'); text.textContent = button.dataset.copyDefault || 'Copy'; }, 2000);
      } catch {
        text.textContent = 'Try again';
        window.setTimeout(() => { text.textContent = button.dataset.copyDefault || 'Copy'; }, 2000);
      }
    });
  });
})();
