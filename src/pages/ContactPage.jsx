import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Departments, Subscribe } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';
import { STATION } from '../data/station.js';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', to: STATION.emails.general, message: '' });
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${form.to}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <>
      <PageHeader eyebrow="Contact" title="Contact us">
        <address className="muted">
          {STATION.address} · Studio <a href={`tel:${STATION.phone.replace(/\D/g, '')}`}>{STATION.phone}</a>
        </address>
      </PageHeader>
      <section className="section section--tight-top">
        <div className="container split split--top">
          <form className="card panel stack-14 split__main" onSubmit={submit}>
            <span className="eyebrow">EMAIL US</span>
            <label className="field">Name<input required value={form.name} onChange={set('name')} /></label>
            <label className="field">Email<input type="email" required value={form.email} onChange={set('email')} /></label>
            <label className="field">Department
              <select value={form.to} onChange={set('to')}>
                <option value={STATION.emails.general}>General inquiries</option>
                <option value={STATION.emails.sales}>Sales</option>
                <option value={STATION.emails.news}>News / Sports / Events</option>
              </select>
            </label>
            <label className="field">Message<textarea required rows="5" value={form.message} onChange={set('message')} /></label>
            <button type="submit" className="btn btn--gradient btn--lg align-start">Send message</button>
            {sent && <p className="subscribe__done" role="status">Your email app should have opened — send the message there to finish.</p>}
          </form>
          <div className="split__side stack-28">
            <div className="stack-14">
              <span className="eyebrow">CONTACT A DEPARTMENT</span>
              <Departments />
            </div>
            <div className="panel panel--gradient stack-14">
              <span className="eyebrow eyebrow--cream">SUBSCRIBE</span>
              <Subscribe />
            </div>
            <Link to="/privacy-policy" className="small muted">Read our privacy policy</Link>
          </div>
        </div>
      </section>
    </>
  );
}
