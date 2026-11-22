import { createClient } from '@supabase/supabase-js';

const root = document.querySelector<HTMLElement>('#reset');
const form = document.querySelector<HTMLFormElement>('#password-form');
const message = document.querySelector<HTMLElement>('#message');
const password = document.querySelector<HTMLInputElement>('#password');
const confirm = document.querySelector<HTMLInputElement>('#confirm');

if (root && form && message && password && confirm) {
  const url = root.dataset.url;
  const key = root.dataset.key;
  const owner = root.dataset.owner;
  const params = new URLSearchParams(window.location.hash.slice(1));
  const isRecovery = params.get('type') === 'recovery' || new URLSearchParams(location.search).has('code');

  if (!url || !key || !isRecovery) {
    message.textContent = 'This reset link is missing or invalid. Request a new one.';
  } else {
    const client = createClient(url, key, {
      auth: { detectSessionInUrl: true, persistSession: false, autoRefreshToken: false },
    });
    client.auth.getSession().then(({ data, error }) => {
      if (error || !data.session || data.session.user.id !== owner) {
        message.textContent = 'This reset link is invalid or expired. Request a new one.';
        return;
      }
      message.textContent = 'Use at least 12 characters. Keep this password private.';
      form.hidden = false;
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        if (password.value !== confirm.value) {
          message.textContent = 'The passwords do not match.';
          return;
        }
        const button = form.querySelector<HTMLButtonElement>('button');
        if (button) button.disabled = true;
        const result = await client.auth.updateUser({ password: password.value });
        if (result.error) {
          message.textContent = 'Could not save the password. Request a new reset link.';
          if (button) button.disabled = false;
          return;
        }
        await client.auth.signOut();
        history.replaceState(null, '', '/admin/reset-password/');
        form.hidden = true;
        message.textContent = 'Password changed. You can sign in now.';
      });
    }).catch(() => {
      message.textContent = 'Could not check the reset link. Try opening it again.';
    });
  }
}
