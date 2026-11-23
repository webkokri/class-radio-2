import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AD_POINTS, CAREERS, GRADIENTS, HOSTS, HOST_SHOW_SLUG, SHOWS, SPONSORS, STATION, STORY, TRAFFIC, TRIBUTE,
} from '../data/station.js';
import { SectionHead, SmartImage, Sponsors } from './ui.jsx';

const telHref = () => `tel:${STATION.phone.replace(/\D/g, '')}`;

/* ---------- Show card (links to the show's own page) ---------- */
export function ShowCard({ show, index = 0 }) {
  return (
    <Link to={`/on-air/${show.slug}`} className="show card lift show--link">
      <div className="show__art" style={{ background: GRADIENTS[index % GRADIENTS.length] }}>
        <SmartImage src={show.image} alt={`${show.name} with ${show.host}`} className="cover" />
        <span className="show__time">{show.time}</span>
      </div>
      <div className="show__body">
        <h3 className="show__name">{show.name}</h3>
        <span className="show__host">{show.host}</span>
        <p className="muted small">{show.blurb}</p>
        <span className="show__more">Show details →</span>
      </div>
    </Link>
  );
}

/* ---------- On Air (tabbed schedule) ---------- */
export function Shows({ withHeading = true }) {
  const [tab, setTab] = useState('weekdays');
  const list = SHOWS[tab];
  const offset = tab === 'weekends' ? 3 : 0;

  return (
    <section id="onair" className="section section--tight-top section--solid">
      <div className="container stack-28">
        <SectionHead eyebrow="ON AIR @ CLASSIC 1220" title={withHeading ? 'Our shows' : 'Schedule'}>
          <div role="tablist" aria-label="Schedule" className="segmented card">
            {[
              ['weekdays', 'Weekdays'],
              ['weekends', 'Weekends'],
            ].map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                className={`segmented__btn ${tab === key ? 'is-active' : ''}`}
                onClick={() => setTab(key)}
              >
                {label}
              </button>
            ))}
          </div>
        </SectionHead>

        <div className="grid grid--shows">
          {list.map((s, i) => (
            <ShowCard key={s.slug} show={s} index={i + offset} />
          ))}
        </div>

        <div className="notice">
          <span className="tag tag--yellow">RETURNS SOON</span>
          <Link to="/on-air/ella-mack"><strong>{SHOWS.comingSoon}</strong></Link>
          <span className="muted">is coming back to the Classic 1220 line-up.</span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Welcome / story (dark gradient band) ---------- */
export function About({ full = false }) {
  return (
    <section id="about" className="band-dark">
      <div className="band-dark__glow" aria-hidden="true" />
      <div className="container split">
        <div className="split__side stack-20">
          <span className="eyebrow eyebrow--gold">WELCOME TO CLASSIC 1220</span>
          <h2 className="h2 h2--xl">
            Your
            <br />
            <span className="gradient-text gradient-text--soft">hometown radio.</span>
          </h2>
          <p className="on-dark">
            Serving St. Catharines, Thorold and the surrounding area in the beautiful Niagara Region — capturing the
            news, sports and events that affect your daily life here and around the Golden Horseshoe.
          </p>
          <p className="on-dark">
            Thank you for making Classic 1220 your hometown station. After all, we're{' '}
            <strong>All About This Town</strong>.
          </p>
          <span className="on-dark--dim small">{STATION.owner}</span>
          {!full && (
            <Link className="btn btn--gradient btn--lg align-start" to="/about-us">
              Read our full story →
            </Link>
          )}
        </div>

        <div className="split__main stack-14">
          <span className="eyebrow eyebrow--gold">OUR STORY</span>
          {STORY.map((s) => (
            <div key={s.year} className="timeline-item">
              <span className="timeline-item__year">{s.year}</span>
              <div className="stack-6">
                <span className="timeline-item__title">{s.title}</span>
                <span className="on-dark small">{s.text}</span>
              </div>
            </div>
          ))}
          <div className="tribute">
            <span className="eyebrow eyebrow--gold">IN MEMORY</span>
            <span className="tribute__name">{TRIBUTE.name}</span>
            <span className="small">{TRIBUTE.text}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Hosts ---------- */
export function Hosts({ withHeading = true }) {
  return (
    <section id="hosts" className="section band-soft">
      <div className="container stack-40">
        {withHeading && <SectionHead eyebrow="THE VOICES OF CLASSIC 1220" title="Meet the hosts" center />}
        <div className="grid grid--hosts">
          {HOSTS.map((h, i) => (
            <Link key={h.name} to={`/on-air/${HOST_SHOW_SLUG[h.name]}`} className="host card lift">
              <div className="host__ring" style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
                <div className="host__photo">
                  <SmartImage src={h.image} alt={h.name} className="cover" />
                  <span className="host__initials" aria-hidden="true">
                    {h.name
                      .split(' ')
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join('')}
                  </span>
                </div>
              </div>
              <h3 className="host__name">{h.name}</h3>
              <span className="muted small">{h.show}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Advertise ---------- */
export function Advertise({ full = false }) {
  return (
    <section id="advertise" className="section band-soft">
      <div className="container split split--top">
        <div className="split__side stack-18">
          <span className="eyebrow">ADVERTISE WITH US</span>
          <h2 className="h2">Grow your business on Classic 1220.</h2>
          <p className="muted">
            Our sales team builds a customized advertising strategy around your business, your budget and your core
            audience in Niagara.
          </p>
          <div className="row-wrap">
            <Link className="btn btn--gradient btn--lg" to="/advertise#start">
              Request a media kit
            </Link>
            <a className="btn btn--ghost btn--lg" href={telHref()}>
              {STATION.phone}
            </a>
            {!full && (
              <Link className="btn btn--ghost btn--lg" to="/advertise">
                Learn more
              </Link>
            )}
          </div>
        </div>
        <div className="split__main grid grid--ads">
          {AD_POINTS.map((p, i) => (
            <div key={p.title} className="card ad-point">
              <span className="ad-point__num" style={{ background: GRADIENTS[i % GRADIENTS.length] }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="ad-point__title">{p.title}</h3>
              <p className="muted small">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Newsletter (opens the visitor's email app, addressed to the station) ---------- */
export function Subscribe() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const subscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    const subject = encodeURIComponent('Subscribe to Classic 1220 AM');
    const body = encodeURIComponent(`Please add ${email} to the Classic 1220 AM contests & special offers list.`);
    window.location.href = `mailto:${STATION.emails.general}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <p className="subscribe__done" role="status">
        Almost done — send the email that just opened to finish subscribing. Thanks for listening!
      </p>
    );
  }
  return (
    <form className="subscribe" onSubmit={subscribe}>
      <label htmlFor="email">Subscribe to Classic 1220 AM</label>
      <div className="subscribe__row">
        <input id="email" type="email" required placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="submit" className="btn btn--dark btn--lg">
          Subscribe
        </button>
      </div>
      <span className="small on-dark">Contests &amp; special offers. We don't spam — see our <Link to="/privacy-policy">privacy policy</Link>.</span>
    </form>
  );
}

/* ---------- Careers + Listen ---------- */
export function CareersListen() {
  return (
    <section id="careers" className="section section--tight-bottom section--solid">
      <div className="container row-wrap row-wrap--cards">
        <div className="card panel stack-14">
          <span className="eyebrow">CAREERS</span>
          <h2 className="h3">Your future in radio starts here.</h2>
          {CAREERS.map((job) => (
            <div key={job.title} className="job">
              <span className="job__title">{job.title}</span>
              <span className="muted small">{job.text}</span>
            </div>
          ))}
          <Link className="btn btn--ghost btn--lg align-start" to="/careers">
            View careers →
          </Link>
        </div>

        <div id="listen" className="panel panel--gradient stack-14">
          <div className="panel__ring" aria-hidden="true" />
          <span className="eyebrow eyebrow--cream">LISTEN ANYWHERE</span>
          <h2 className="h3">On the dial, online and on TuneIn.</h2>
          <Subscribe />
        </div>
      </div>
    </section>
  );
}

/* ---------- Local traffic (bridge status images) ---------- */
export function Traffic() {
  return (
    <section className="section section--tight-top">
      <div className="container stack-28">
        <SectionHead eyebrow="LOCAL TRAFFIC" title="Bridge status & traffic" />
        <div className="grid grid--traffic">
          {TRAFFIC.map((t) => (
            <a key={t.title} href={t.href} target="_blank" rel="noopener noreferrer" className="card lift traffic">
              <img src={t.image} alt={t.title} loading="lazy" />
              <span className="traffic__title">{t.title} ↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact departments ---------- */
export function Departments() {
  const { emails } = STATION;
  const rows = [
    ['GENERAL INQUIRIES', emails.general],
    ['SALES', emails.sales],
    ['NEWS · SPORTS · EVENTS', emails.news],
  ];
  return (
    <div className="grid grid--depts">
      {rows.map(([label, mail]) => (
        <div key={label} className="card ad-point stack-8">
          <span className="eyebrow">{label}</span>
          <a href={`mailto:${mail}`}>{mail}</a>
        </div>
      ))}
    </div>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  const { emails } = STATION;
  return (
    <footer className="footer">
      <div className="container stack-40">
        <Sponsors items={SPONSORS} />
        <div className="footer__top">
          <div className="stack-10 footer__brand">
            <span className="footer__name">
              {STATION.name} {STATION.callSign}
            </span>
            <address className="muted small">
              {STATION.owner}
              <br />
              {STATION.address}
              <br />
              Studio: <a href={telHref()}>{STATION.phone}</a>
            </address>
          </div>
          <div className="footer__cols">
            {[
              ['GENERAL INQUIRIES', emails.general],
              ['SALES', emails.sales],
              ['NEWS · SPORTS · EVENTS', emails.news],
            ].map(([label, mail]) => (
              <div key={label} className="stack-8">
                <span className="eyebrow">{label}</span>
                <a href={`mailto:${mail}`}>{mail}</a>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__bottom">
          <span>
            Classic 1220AM CFAJ Radio · St. Catharines, Ontario, Canada · © {new Date().getFullYear()} All rights reserved. ·{' '}
            <Link to="/privacy-policy">Privacy policy</Link>
          </span>
          <nav aria-label="Footer" className="footer__nav">
            <Link to="/on-air">On Air</Link>
            <Link to="/hosts">Hosts</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/advertise">Advertise</Link>
            <Link to="/about-us">About Us</Link>
            <Link to="/traffic">Traffic</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
