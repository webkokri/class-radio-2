import { useState } from 'react';
import { Link } from 'react-router-dom';
import { STATION } from '../data/station.js';

/* ---------- Icons (inline stroke SVG) ---------- */
export const PlayIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  </svg>
);

export const PauseIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
    <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
  </svg>
);

export const SunIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
);

export const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
  </svg>
);

export const MenuIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

/* ---------- Image that disappears if the file is missing ---------- */
export function SmartImage({ src, alt, className }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return null;
  return <img src={src} alt={alt} className={className} loading="lazy" onError={() => setFailed(true)} />;
}

/* ---------- Logo: real logo if present, otherwise a gradient badge ---------- */
export function Logo() {
  const [failed, setFailed] = useState(false);
  return (
    <Link to="/" className="logo">
      {failed ? (
        <span className="logo__badge" aria-hidden="true">
          <span className="logo__small">classic</span>
          <span className="logo__big">1220</span>
        </span>
      ) : (
        <img src={STATION.logo} alt="" className="logo__img" onError={() => setFailed(true)} />
      )}
      <span className="logo__text">
        <span className="logo__name">{STATION.name}</span>
        <span className="logo__sub">
          {STATION.callSign} · {STATION.tagline.toUpperCase()}
        </span>
      </span>
    </Link>
  );
}

/* ---------- Animated equalizer ---------- */
export function Equalizer({ playing, bars = 10, className = '' }) {
  return (
    <div className={`eq ${playing ? '' : 'eq--paused'} ${className}`} aria-hidden="true">
      {Array.from({ length: bars }, (_, i) => (
        <span key={i} />
      ))}
    </div>
  );
}

/* ---------- Section heading ---------- */
export function SectionHead({ eyebrow, title, children, center = false }) {
  return (
    <div className={`section-head ${center ? 'section-head--center' : ''}`}>
      <div className="section-head__text">
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="h2">{title}</h2>
      </div>
      {children}
    </div>
  );
}

/* ---------- Page banner for inner pages ---------- */
export function PageHeader({ eyebrow, title, children }) {
  return (
    <section className="page-header">
      <div className="container stack-14">
        <nav aria-label="Breadcrumb" className="crumbs">
          <Link to="/">Home</Link>
          <span aria-hidden="true">/</span>
          <span>{eyebrow}</span>
        </nav>
        <h1 className="page-header__title">{title}</h1>
        {children}
      </div>
    </section>
  );
}

/* ---------- Sponsor banner strip ---------- */
export function Sponsors({ items }) {
  return (
    <div className="sponsors">
      {items.map((s) => (
        <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" className="sponsor card">
          <img src={s.image} alt={s.name} loading="lazy" />
        </a>
      ))}
    </div>
  );
}
