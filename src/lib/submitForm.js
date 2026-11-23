import { STATION } from '../data/station.js';

/* Sends a form. If VITE_FORM_URL is set the data is POSTed there as JSON (Formspree, Netlify, your own API...).
   Otherwise the visitor's email app opens with the details pre-filled for `to`. */
export async function submitForm({ subject, to = STATION.emails.sales, data }) {
  const url = import.meta.env.VITE_FORM_URL;
  if (url) {
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ subject, ...data, sentAt: new Date().toISOString() }),
    });
    if (!r.ok) throw new Error(`Request failed (${r.status})`);
    return 'sent';
  }
  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`)
    .join('\n');
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return 'mailto';
}
