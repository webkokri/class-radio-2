import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HERO_SLIDES, STATION } from '../data/station.js';
import { usePlayer } from '../context/PlayerContext.jsx';
import { Equalizer, PauseIcon, PlayIcon } from './ui.jsx';

/* Auto-rotating, animated headline slider (pauses on hover/focus, respects reduced motion). */
function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = HERO_SLIDES.length;
  const go = (k) => setI((k + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % n), 5000);
    return () => clearInterval(t);
  }, [paused, n]);

  const slide = HERO_SLIDES[i];
  return (
    <div
      className="hslider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Station highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div key={i} className="hslider__slide" aria-live={paused ? 'polite' : 'off'}>
        <h1 className="hero__title">
          <span className="hslider__line">{slide.top}</span>
          <br />
          <span className="hslider__line hslider__line--2 gradient-text">{slide.accent}</span>
        </h1>
        <p className="hero__lead hslider__text">{slide.text}</p>
      </div>
      <div className="hslider__controls">
        <button type="button" className="hslider__arrow" onClick={() => go(i - 1)} aria-label="Previous slide">
          ‹
        </button>
        <div className="hslider__dots">
          {HERO_SLIDES.map((_, k) => (
            <button
              key={k}
              type="button"
              className={`hslider__dot ${k === i ? 'is-active' : ''}`}
              onClick={() => setI(k)}
              aria-label={`Go to slide ${k + 1}`}
              aria-current={k === i}
            />
          ))}
        </div>
        <button type="button" className="hslider__arrow" onClick={() => go(i + 1)} aria-label="Next slide">
          ›
        </button>
      </div>
    </div>
  );
}

export default function Hero() {
  const { playing, toggle, error } = usePlayer();
  const np = STATION.nowPlaying;

  return (
    <section id="home" className="hero">
      <div className="orb orb--a" aria-hidden="true" />
      <div className="orb orb--b" aria-hidden="true" />

      <div className="container hero__inner">
        <span className="pill">
          <span className="dot dot--orange" />
          LIVE ON 1220 AM · ST. CATHARINES · NIAGARA
        </span>

        <HeroSlider />

        <div className="player card">
          <div className="player__dial">
            <div className={`player__ring ${playing ? '' : 'is-paused'}`} aria-hidden="true" />
            <div className="player__inner">
              <button
                type="button"
                className="player__btn"
                onClick={toggle}
                aria-label={playing ? 'Pause live stream' : 'Play live stream'}
              >
                {playing ? <PauseIcon size={26} /> : <PlayIcon size={28} />}
              </button>
            </div>
          </div>

          <div className="player__meta">
            <span className="eyebrow">{playing ? 'NOW STREAMING · 1220 AM' : 'ON AIR NOW'}</span>
            <span className="player__show">{np.show}</span>
            <span className="muted">
              with {np.host} · {np.time}
            </span>
            <span className="player__recent muted">
              Recently played: <strong>{np.recentSong}</strong>
            </span>
            {error && (
              <span className="player__error" role="alert">
                {error}
              </span>
            )}
          </div>

          <Equalizer playing={playing} className="player__eq" />
        </div>

        <div className="hero__chips">
          <span className="chip">On your dial at 1220 AM</span>
          <a className="chip" href={STATION.tuneInUrl} target="_blank" rel="noopener noreferrer">
            Listen on TuneIn
          </a>
          <Link className="chip" to="/on-air#listen">
            Stream online
          </Link>
          <Link className="chip" to="/on-air">
            Full schedule
          </Link>
        </div>
      </div>
    </section>
  );
}
