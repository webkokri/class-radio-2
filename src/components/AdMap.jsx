import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BLOCKS, DEVICES, PLACEMENTS } from '../data/adMap.js';
import { STATION } from '../data/station.js';

const pos = (o) => ({ left: `${o.x}%`, top: `${o.y}%`, width: `${o.w}%`, height: `${o.h}%` });

function Frame({ device, active, setActive }) {
  const d = DEVICES[device];
  return (
    <figure className="admap__device">
      <div className={`admap__frame admap__frame--${device}`} style={{ aspectRatio: d.ratio }}>
        {BLOCKS[device].map((b, i) => (
          <div key={i} className="admap__block" style={pos(b)}>
            <span>{b.label}</span>
          </div>
        ))}
        {PLACEMENTS.filter((p) => p.device === device).map((p) => (
          <button
            key={p.id}
            type="button"
            className={`admap__zone ${active === p.id ? 'is-active' : ''}`}
            style={pos(p)}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(p.id)}
            onBlur={() => setActive(null)}
            aria-label={`${p.n}. ${p.name}, ${p.size}, ${p.where}`}
          >
            <b>{p.n}</b>
            <span>{p.size}</span>
          </button>
        ))}
      </div>
      <figcaption>
        <strong>{d.title}</strong>
        <span className="muted small">{d.sub}</span>
      </figcaption>
    </figure>
  );
}

/* Diagram of where banner ads appear on the website and the mobile app, generated from data/adMap.js */
export default function AdMap({ title = 'See exactly where your banner appears', cta = true }) {
  const [active, setActive] = useState(null);
  return (
    <div className="admap card">
      <div className="admap__intro stack-10">
        <span className="eyebrow">AD PLACEMENT MAP</span>
        <h2 className="h2">{title}</h2>
        <p className="muted">
          Every highlighted spot is a banner you can book — on the website and in the mobile app. Hover or tap a spot to
          see its size and location.
        </p>
      </div>

      <div className="admap__devices">
        <Frame device="web" active={active} setActive={setActive} />
        <Frame device="app" active={active} setActive={setActive} />
      </div>

      <ol className="admap__legend">
        {PLACEMENTS.map((p) => (
          <li
            key={p.id}
            className={active === p.id ? 'is-active' : ''}
            onMouseEnter={() => setActive(p.id)}
            onMouseLeave={() => setActive(null)}
          >
            <b>{p.n}</b>
            <div>
              <strong>{p.name}</strong> <span className="muted small">· {p.size} · {DEVICES[p.device].title}</span>
              <div className="muted small">{p.where}</div>
            </div>
          </li>
        ))}
      </ol>

      {cta && (
        <div className="row-wrap">
          <a className="btn btn--gradient btn--lg" href={`mailto:${STATION.emails.sales}?subject=Banner%20ad%20booking`}>
            Book a spot
          </a>
          <Link className="btn btn--ghost btn--lg" to="/advertise">
            Advertising details
          </Link>
          <a className="btn btn--ghost btn--lg" href={`tel:${STATION.phone.replace(/\D/g, '')}`}>
            {STATION.phone}
          </a>
        </div>
      )}
    </div>
  );
}
