import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdMap from '../components/AdMap.jsx';
import { AD_BUDGETS, AD_OPTIONS, AD_PACKAGES, AD_STEPS, AD_WHY } from '../data/advertise.js';
import { STATION } from '../data/station.js';
import { submitForm } from '../lib/submitForm.js';

const tel = `tel:${STATION.phone.replace(/\D/g, '')}`;

/* Small browser + phone mock-up marking the A / B / C banner spots */
function Diagram() {
  return (
    <figure className="adv-diagram" role="img" aria-label="Where website ads appear: leaderboard at the top (A), sidebar beside the news (B), banner on mobile (C)">
      <div className="mock-browser">
        <div className="mock-bar"><i /><i /><i /></div>
        <div className="mock-body">
          <div className="mock-line" style={{ width: '40%' }} />
          <div className="mock-slot mock-a"><b>A</b>Leaderboard</div>
          <div className="mock-hero" />
          <div className="mock-cols">
            <div className="mock-text">{[100, 85, 70, 80].map((w, i) => <div key={i} className="mock-line" style={{ width: `${w}%` }} />)}</div>
            <div className="mock-slot mock-b"><b>B</b>Sidebar</div>
          </div>
        </div>
      </div>
      <div className="mock-phone">
        <div className="mock-dark" style={{ height: 40 }} />
        <div className="mock-dark-line" />
        <div className="mock-slot mock-c"><b>C</b>Mobile</div>
        <div className="mock-dark-line" />
        <div className="mock-dark" style={{ height: 28 }} />
      </div>
    </figure>
  );
}

function QuoteForm({ picked, toggle }) {
  const [state, setState] = useState('idle');

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = Object.fromEntries(new FormData(e.currentTarget));
    setState('sending');
    try {
      const interests = AD_OPTIONS.filter((o) => picked.has(o.id)).map((o) => o.chip);
      await submitForm({
        subject: `Advertising quote request — ${fd.business}`,
        data: { ...fd, mediaKit: fd.mediaKit ? 'Yes' : 'No', interests },
      });
      setState('sent');
    } catch {
      setState('error');
    }
  };

  return (
    <section id="start" className="quote band-dark">
      <div className="band-dark__glow" aria-hidden="true" />
      <div className="container quote__inner">
        <div className="quote__copy stack-20">
          <span className="eyebrow eyebrow--gold">START A CAMPAIGN</span>
          <h2 className="h2 h2--xl">Let’s get your business on the air.</h2>
          <p className="on-dark">Tell us a little about what you need and we’ll reply with a free quote and the media kit.</p>
          <div className="quote__contacts">
            <a href={tel}>📞 Sales Manager · {STATION.phone}</a>
            <a href={`mailto:${STATION.emails.sales}`}>✉️ {STATION.emails.sales}</a>
            <a href={`sms:${STATION.phone.replace(/\D/g, '')}`}>💬 Studio (call or text) · {STATION.phone}</a>
          </div>
          <div className="hiring">
            <span className="eyebrow eyebrow--gold">WE’RE HIRING</span>
            <p className="small on-dark">
              Love radio and sales? Join the team as a Sales Team Member. Send your résumé to{' '}
              <a href={`mailto:${STATION.emails.sales}`}>{STATION.emails.sales}</a>, or see <Link to="/careers">Careers</Link>.
            </p>
          </div>
        </div>

        <div className="quote__card card">
          {state === 'sent' ? (
            <div role="status" className="stack-14">
              <h3 className="h3">Thanks — we’ll be in touch.</h3>
              <p className="muted">Our sales team will reply with a quote. Prefer to talk now? Call {STATION.phone}.</p>
              <button type="button" className="btn btn--ghost" onClick={() => setState('idle')}>Send another inquiry</button>
            </div>
          ) : (
            <form className="stack-14" onSubmit={onSubmit}>
              <fieldset className="fieldset">
                <legend>I’m interested in</legend>
                <div className="chips">
                  {AD_OPTIONS.map((o) => (
                    <button key={o.id} type="button" className={`chip-btn ${picked.has(o.id) ? 'is-active' : ''}`} aria-pressed={picked.has(o.id)} onClick={() => toggle(o.id)}>
                      {o.chip}
                    </button>
                  ))}
                </div>
              </fieldset>
              <div className="field-row">
                <label className="field">Your name<input name="name" required autoComplete="name" /></label>
                <label className="field">Business<input name="business" required autoComplete="organization" /></label>
              </div>
              <div className="field-row">
                <label className="field">Email<input name="email" type="email" required autoComplete="email" /></label>
                <label className="field">Phone<input name="phone" type="tel" autoComplete="tel" /></label>
              </div>
              <label className="field">Monthly budget
                <select name="budget">{AD_BUDGETS.map((b) => <option key={b}>{b}</option>)}</select>
              </label>
              <label className="field">Anything else? (optional)
                <textarea name="message" rows="3" placeholder="Dates, a show you love, a sale you’re promoting…" />
              </label>
              <label className="check"><input type="checkbox" name="mediaKit" defaultChecked /> Email me the media kit too</label>
              {state === 'error' && <p className="delta-bad" role="alert">Couldn’t send that. Please call {STATION.phone}.</p>}
              <button className="btn btn--gradient btn--lg" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : 'Get my free quote'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default function AdvertisePage() {
  const [picked, setPicked] = useState(new Set(['web']));
  const toggle = (id) =>
    setPicked((s) => {
      const n = new Set(s);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  return (
    <>
      <section className="container adv-hero">
        <div className="stack-20 adv-hero__copy">
          <span className="eyebrow">ADVERTISE WITH {STATION.name.toUpperCase()}</span>
          <h1 className="page-header__title">
            Get your business <span className="gradient-text">heard</span> — and seen — across Niagara.
          </h1>
          <p className="muted">
            Radio spots, website banners and sponsorships on the station that’s all about this town. Reach St. Catharines,
            Thorold and the Niagara Region with a campaign built around your budget and your customers.
          </p>
          <div className="row-wrap">
            <a href="#start" className="btn btn--gradient btn--lg">Get a free quote →</a>
            <a href="#start" className="btn btn--ghost btn--lg">⬇ Request the media kit</a>
          </div>
        </div>
        <Diagram />
      </section>

      <section className="section section--tight-top">
        <div className="container"><AdMap /></div>
      </section>

      <section className="band-dark">
        <div className="band-dark__glow" aria-hidden="true" />
        <div className="container stack-28 why">
          <h2 className="h2 h2--xl">Why local businesses choose Classic 1220</h2>
          <div className="grid grid--auto">
            {AD_WHY.map((w) => (
              <div key={w.title} className="why__item stack-10">
                <div className="why__stat">{w.stat ?? w.icon}</div>
                <strong>{w.title}</strong>
                <p className="on-dark small">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="options" className="section">
        <div className="container stack-28">
          <div className="stack-8">
            <span className="eyebrow">ADVERTISING OPTIONS</span>
            <h2 className="h2">Mix and match what works for you</h2>
          </div>
          <div className="grid grid--auto">
            {AD_OPTIONS.map((o) => {
              const on = picked.has(o.id);
              return (
                <article key={o.id} className={`card lift option ${on ? 'is-on' : ''}`}>
                  <div className="option__top">
                    <span className={`tag ${o.onAir ? 'tag--ink' : 'tag--yellow'}`}>{o.tag}</span>
                    <span className="muted small">{o.spec}</span>
                  </div>
                  <h3 className="h3">{o.title}</h3>
                  <p className="muted small">{o.blurb}</p>
                  <div className="option__foot">
                    <strong>Ask for pricing</strong>
                    <button type="button" aria-pressed={on} className={`chip-btn ${on ? 'is-active' : ''}`} onClick={() => toggle(o.id)}>
                      {on ? 'Added ✓' : 'Ask about this'}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band-soft section">
        <div className="container stack-28">
          <div className="stack-8 center">
            <span className="eyebrow">PACKAGES</span>
            <h2 className="h2">Simple bundles, local prices</h2>
          </div>
          <div className="grid grid--auto">
            {AD_PACKAGES.map((p) => (
              <div key={p.name} className={`card lift package ${p.featured ? 'package--featured' : ''}`}>
                <div className="option__top">
                  <h3 className="h3">{p.name}</h3>
                  {p.featured && <span className="tag tag--yellow">RECOMMENDED</span>}
                </div>
                <p className="muted small">{p.pitch}</p>
                <div className="package__price">{p.price ?? 'Custom quote'}</div>
                <ul className="package__list">
                  {p.items.map((i) => <li key={i}>✓ {i}</li>)}
                </ul>
                <a href="#start" className={`btn ${p.featured ? 'btn--gradient' : 'btn--ghost'}`}>Choose {p.short}</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stack-28">
          <h2 className="h2">On air in three steps</h2>
          <div className="grid grid--auto">
            {AD_STEPS.map((s, i) => (
              <div key={s.title} className="step stack-10">
                <span className="step__n">{i + 1}</span>
                <strong>{s.title}</strong>
                <p className="muted small">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteForm picked={picked} toggle={toggle} />

      <section className="section section--tight-top">
        <div className="container">
          <div className="card panel row-wrap cta-band">
            <div className="stack-8">
              <span className="eyebrow">YOUR LOGO HERE</span>
              <h2 className="h3">Join the local businesses already on Classic 1220.</h2>
              <p className="muted small">Our partners’ logos appear at the bottom of every page. Yours could be next.</p>
            </div>
            <a href="#start" className="btn btn--gradient btn--lg">Get a free quote →</a>
          </div>
        </div>
      </section>
    </>
  );
}
