import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AD_PLACEMENTS, WEATHER_CITIES, fetchWeather } from '../data/live.js';
import { useLiveData } from '../hooks/useLiveData.js';

const SKY_ICON = { sun: '☀️', partly: '⛅', cloud: '☁️', fog: '🌫️', rain: '🌧️', snow: '❄️', storm: '⛈️' };
const BORDER_LABEL = { ok: 'Light', warn: 'Moderate', bad: 'Heavy' };

function Pill({ level, children }) {
  return <span className={`status-pill status-${level}`}>{children}</span>;
}

function Widget({ title, meta, children, sample }) {
  return (
    <section className="widget card">
      <header className="widget__head">
        <h3 className="widget__title">{title}</h3>
        <span className="widget__meta">
          {meta}
          {sample && <em className="sample-badge" title="Demo values — connect a data feed in .env">Sample</em>}
        </span>
      </header>
      {children}
    </section>
  );
}

/* ---------- Advertisement placement ---------- */
export function AdSlot({ size = 'rectangle', pitch }) {
  const cfg = AD_PLACEMENTS[size];
  const cls = size === 'leaderboard' ? 'ad-leaderboard' : 'ad-rectangle';
  return (
    <div className="ad-wrap">
      <div className="ad-label">ADVERTISEMENT</div>
      {cfg.banner ? (
        <a href={cfg.banner.href} target="_blank" rel="noopener sponsored" className={cls} style={{ display: 'block' }}>
          <img src={cfg.banner.src} alt={cfg.banner.alt} className="ad-banner-img" />
        </a>
      ) : (
        <Link to="/advertise" className={`ad-slot ${cls}`}>
          <strong>{pitch ?? 'Your business could be here'}</strong>
          <small>{cfg.size.replace('×', '×')} {size === 'leaderboard' ? 'leaderboard · seen on every page' : 'sidebar'}</small>
          <em>Book this spot →</em>
        </Link>
      )}
    </div>
  );
}

/* ---------- Scrolling ticker ---------- */
export function Ticker() {
  const d = useLiveData();
  const items = [
    { label: 'Peace Bridge', value: `into U.S. ${d.border.intoUS[0]?.minutes ?? '—'} min` },
    ...d.markets.filter((m, i) => i === 0 || m.name.startsWith('CAD')).map((m) => ({ label: m.name, value: m.value, delta: m.changePct })),
    ...d.canal.filter((c) => c.level !== 'ok').map((c) => ({ label: `Bridge ${c.number} ${c.name}`, value: c.status.toLowerCase() })),
    { label: 'Gas', value: `${d.gas.todayCents.toFixed(1)}¢/L`, delta: d.gas.tomorrowChangeCents, unit: '¢ tomorrow' },
    ...d.scores.filter((s) => s.status === 'FINAL').map((s) => ({ label: s.match, value: s.score })),
  ];
  const loop = [...items, ...items];
  return (
    <div className="ticker" aria-label="Local updates">
      <div className="ticker-track">
        {loop.map((it, i) => {
          const unit = it.unit ?? '%';
          const up = it.delta >= 0;
          const good = unit === '%' ? up : !up;
          return (
            <div key={i} className="ticker-item" aria-hidden={i >= items.length}>
              <strong>{it.label}</strong>
              <span>{it.value}</span>
              {it.delta !== undefined && (
                <span className={good ? 'delta-ok' : 'delta-bad'}>
                  {up ? '▲' : '▼'} {Math.abs(it.delta)}{unit === '%' ? '%' : unit}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- Weather (live, Open-Meteo) ---------- */
export function WeatherWidget() {
  const [city, setCity] = useState(WEATHER_CITIES[0]);
  const [w, setW] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    const ctrl = new AbortController();
    setErr('');
    fetchWeather(city, ctrl.signal)
      .then(setW)
      .catch((e) => e.name !== 'AbortError' && setErr('Weather is unavailable right now.'));
    return () => ctrl.abort();
  }, [city]);

  return (
    <Widget title="Weather" meta="Open-Meteo">
      <div className="chips" role="group" aria-label="City">
        {WEATHER_CITIES.map((c) => (
          <button key={c.name} type="button" className={`chip-btn ${c.name === city.name ? 'is-active' : ''}`} aria-pressed={c.name === city.name} onClick={() => setCity(c)}>
            {c.name}
          </button>
        ))}
      </div>
      {err && <p className="muted small" role="alert">{err}</p>}
      {!w && !err && <p className="muted small">Loading forecast…</p>}
      {w && (
        <>
          <div className="wx-now">
            <span className="wx-icon" aria-hidden="true">{SKY_ICON[w.sky]}</span>
            <div>
              <div className="wx-temp">{w.tempC}°C</div>
              <div className="muted small">{w.label} · feels like {w.feelsC}°</div>
            </div>
          </div>
          <div className="wx-facts muted small">
            <span>💧 {w.humidity}%</span>
            <span>💨 {w.windKmh} km/h {w.windDir}</span>
            <span>🌅 {w.sunrise}</span>
            <span>🌇 {w.sunset}</span>
          </div>
          <ul className="wx-days">
            {w.days.map((d) => (
              <li key={d.day}>
                <span>{d.day}</span>
                <span aria-hidden="true">{SKY_ICON[d.sky]}</span>
                <strong>{d.hi}°</strong>
                <span className="muted">{d.lo}°</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </Widget>
  );
}

/* ---------- Border wait times ---------- */
export function BorderWidget({ data, sample }) {
  const [dir, setDir] = useState('intoUS');
  return (
    <Widget title="Border wait times" meta="Cars" sample={sample}>
      <div className="segmented card" role="group" aria-label="Direction">
        {[['intoUS', 'Into U.S.'], ['intoCanada', 'Into Canada']].map(([k, l]) => (
          <button key={k} type="button" aria-pressed={dir === k} className={`segmented__btn ${dir === k ? 'is-active' : ''}`} onClick={() => setDir(k)}>
            {l}
          </button>
        ))}
      </div>
      <ul className="widget-list">
        {data[dir].map((c) => (
          <li key={c.name}>
            <div className="widget-item-text"><strong>{c.name}</strong><small>{c.note}</small></div>
            <span className="widget-num">{c.minutes} min</span>
            <Pill level={c.level}>{BORDER_LABEL[c.level]}</Pill>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

/* ---------- Markets / stocks ---------- */
function Spark({ values, up }) {
  const lo = Math.min(...values), hi = Math.max(...values);
  const pts = values.map((v, i) => `${(i / (values.length - 1)) * 68 + 1},${24 - ((v - lo) / (hi - lo || 1)) * 20}`).join(' ');
  return (
    <svg width="70" height="26" viewBox="0 0 70 26" aria-hidden="true">
      <polyline points={pts} fill="none" stroke={up ? 'var(--ok-fg)' : 'var(--bad-fg)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
export function MarketsWidget({ data, sample }) {
  return (
    <Widget title="Markets" meta="Stocks · currency · commodities" sample={sample}>
      <ul className="widget-list">
        {data.map((m) => {
          const up = m.changePct >= 0;
          return (
            <li key={m.name}>
              <div className="widget-item-text"><strong>{m.name}</strong><small>{m.value}</small></div>
              <Spark values={m.history} up={up} />
              <span className={up ? 'delta-ok' : 'delta-bad'}>{up ? '▲' : '▼'} {Math.abs(m.changePct).toFixed(2)}%</span>
            </li>
          );
        })}
      </ul>
    </Widget>
  );
}

function StatusList({ title, meta, rows, sample, numbered }) {
  return (
    <Widget title={title} meta={meta} sample={sample}>
      <ul className="widget-list">
        {rows.map((r) => (
          <li key={r.name}>
            <div className="widget-item-text">
              <strong>{numbered ? `Bridge ${r.number} · ` : ''}{r.name}</strong>
              <small>{r.note}</small>
            </div>
            <Pill level={r.level}>{r.status}</Pill>
          </li>
        ))}
      </ul>
    </Widget>
  );
}
export const CanalWidget = ({ data, sample }) => <StatusList title="Welland Canal bridges" meta="Seaway" rows={data} sample={sample} numbered />;
export const TrafficWidget = ({ data, sample }) => <StatusList title="Highway traffic" meta="QEW · 405 · 406" rows={data} sample={sample} />;

export function GasWidget({ data, sample }) {
  const c = data.tomorrowChangeCents;
  return (
    <Widget title="Gas prices" meta="St. Catharines" sample={sample}>
      <div className="gas">
        <div><div className="wx-temp">{data.todayCents.toFixed(1)}¢</div><span className="muted small">per litre today</span></div>
        <Pill level={c > 0 ? 'bad' : c < 0 ? 'ok' : 'warn'}>
          {c === 0 ? 'No change tomorrow' : `${c > 0 ? '▲' : '▼'} ${Math.abs(c)}¢ tomorrow`}
        </Pill>
      </div>
    </Widget>
  );
}

export function ScoresWidget({ data, sample }) {
  return (
    <Widget title="Scores & schedule" meta="Sports" sample={sample}>
      <ul className="widget-list">
        {data.map((s) => (
          <li key={s.match}>
            <div className="widget-item-text"><strong>{s.match}</strong><small>{s.status}</small></div>
            <span className="widget-num">{s.score}</span>
          </li>
        ))}
      </ul>
    </Widget>
  );
}

/* ---------- Full dashboard ---------- */
export function NiagaraToday({ compact = false }) {
  const d = useLiveData();
  const s = d.isSample;
  return (
    <div className="stack-18">
      <div className="today-grid">
        <WeatherWidget />
        <BorderWidget data={d.border} sample={s} />
        <MarketsWidget data={d.markets} sample={s} />
        <div className="widget-ad"><AdSlot size="rectangle" pitch="Put your brand beside Niagara’s most-checked info" /></div>
        <TrafficWidget data={d.traffic} sample={s} />
        <CanalWidget data={d.canal} sample={s} />
        {!compact && <GasWidget data={d.gas} sample={s} />}
        {!compact && <ScoresWidget data={d.scores} sample={s} />}
      </div>
      <p className="muted small">
        Updated {d.updatedAt.toLocaleTimeString('en-CA', { hour: 'numeric', minute: '2-digit' })}
        {s && ' · Weather is live; other widgets show sample values until data feeds are connected.'}
      </p>
    </div>
  );
}
