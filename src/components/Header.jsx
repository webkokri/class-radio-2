import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { EXTERNAL, NAV, STATION } from '../data/station.js';
import { usePlayer } from '../context/PlayerContext.jsx';
import { CloseIcon, Logo, MenuIcon, MoonIcon, SunIcon } from './ui.jsx';

export function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <a href={`mailto:${STATION.emails.general}`} className="topbar__accent">
          {STATION.emails.general.toUpperCase()}
        </a>
        <div className="topbar__links">
          <a href={EXTERNAL.weather} target="_blank" rel="noopener noreferrer">St. Catharines weather</a>
          <Link to="/traffic">Weather, border & traffic</Link>
          <a className="topbar__accent" href={`tel:${STATION.phone.replace(/\D/g, '')}`}>STUDIO {STATION.phone}</a>
        </div>
      </div>
    </div>
  );
}

export function Header({ theme, onToggleTheme }) {
  const { playing, toggle } = usePlayer();
  const [open, setOpen] = useState(false);
  const dark = theme === 'dark';

  return (
    <header className="header">
      <div className="container header__inner">
        <Logo />

        <nav aria-label="Main" className={`nav ${open ? 'nav--open' : ''}`}>
          {NAV.map((item) => (
            <NavLink key={item.href} to={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onToggleTheme}
            aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {dark ? <SunIcon /> : <MoonIcon />}
            <span className="hide-sm">{dark ? 'Light' : 'Dark'}</span>
          </button>
          <button type="button" className="btn btn--gradient" onClick={toggle}>
            {playing ? '❚❚ Pause' : '▶ Listen Live'}
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--icon menu-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
