// Live "Niagara Today" data.
// Weather is fetched live from Open-Meteo (free, no key).
// Border, markets, canal, traffic, gas and scores use sample data until you set a JSON feed URL in .env, e.g.
//   VITE_BORDER_URL=https://example.com/border.json   (must return the same shape as the samples below)
// Anything without a feed (or whose feed fails) falls back to the sample and the UI shows a "Sample data" badge.

export const FEEDS = {
  border: import.meta.env.VITE_BORDER_URL,
  canal: import.meta.env.VITE_CANAL_URL,
  markets: import.meta.env.VITE_MARKETS_URL,
  traffic: import.meta.env.VITE_TRAFFIC_URL,
  gas: import.meta.env.VITE_GAS_URL,
  scores: import.meta.env.VITE_SCORES_URL,
};

export const WEATHER_CITIES = [
  { name: 'St. Catharines', lat: 43.1594, lon: -79.2469 },
  { name: 'Niagara Falls', lat: 43.0896, lon: -79.0849 },
  { name: 'Welland', lat: 42.9922, lon: -79.2483 },
  { name: 'Niagara-on-the-Lake', lat: 43.2553, lon: -79.0718 },
  { name: 'Grimsby', lat: 43.2001, lon: -79.5663 },
];

export const borderLevel = (m) => (m < 20 ? 'ok' : m < 40 ? 'warn' : 'bad');
const b = (name, note, minutes) => ({ name, note, minutes, level: borderLevel(minutes) });

export const SAMPLE = {
  border: {
    intoUS: [b('Peace Bridge', 'Fort Erie – Buffalo', 10), b('Rainbow Bridge', 'Niagara Falls', 25), b('Lewiston–Queenston', 'Queenston', 40), b('Whirlpool Bridge', 'NEXUS only', 5)],
    intoCanada: [b('Peace Bridge', 'Buffalo – Fort Erie', 15), b('Rainbow Bridge', 'Niagara Falls', 20), b('Lewiston–Queenston', 'Lewiston', 10), b('Whirlpool Bridge', 'NEXUS only', 5)],
  },
  canal: [
    { number: '1', name: 'Lakeshore Road', note: 'St. Catharines', level: 'ok', status: 'Available' },
    { number: '4', name: 'Queenston Street', note: 'Homer Lift Bridge', level: 'warn', status: 'Raising soon' },
    { number: '5', name: 'Glendale Avenue', note: 'St. Catharines', level: 'bad', status: 'Up · vessel' },
    { number: '11', name: 'Highway 20', note: 'Allanburg', level: 'ok', status: 'Available' },
    { number: '21', name: 'Clarence Street', note: 'Port Colborne', level: 'ok', status: 'Available' },
  ],
  markets: [
    { name: 'S&P/TSX', value: '30,412.18', changePct: 0.42, history: [50, 52, 51, 54, 53, 56, 55, 58] },
    { name: 'S&P 500', value: '6,871.40', changePct: 0.31, history: [50, 51, 53, 52, 54, 55, 54, 57] },
    { name: 'Dow Jones', value: '47,236.55', changePct: -0.12, history: [58, 57, 58, 56, 55, 56, 54, 53] },
    { name: 'CAD / USD', value: '0.7184', changePct: 0.08, history: [50, 50, 51, 51, 50, 52, 52, 53] },
    { name: 'Gold (oz)', value: 'US$4,012', changePct: 0.65, history: [48, 50, 49, 52, 53, 55, 56, 58] },
    { name: 'Crude oil', value: 'US$61.30', changePct: -1.1, history: [60, 58, 59, 56, 55, 53, 54, 51] },
  ],
  traffic: [
    { name: 'QEW · Garden City Skyway', note: 'Toronto-bound · moving well', level: 'ok', status: 'Clear' },
    { name: 'QEW at Glendale Ave', note: 'Fort Erie-bound · lane closure', level: 'warn', status: 'Slow' },
    { name: 'Highway 406', note: 'St. Catharines ↔ Welland', level: 'ok', status: 'Clear' },
    { name: 'Highway 405', note: 'To Lewiston–Queenston', level: 'bad', status: 'Delays' },
  ],
  gas: { todayCents: 142.9, tomorrowChangeCents: 2 },
  scores: [
    { status: 'FINAL', live: false, match: 'Maple Leafs vs Bruins', score: '4–2' },
    { status: '7:30 PM', live: true, match: 'Raptors vs Celtics', score: 'Tonight' },
    { status: 'SAT', live: true, match: 'Local hockey: [TEAM] vs [TEAM]', score: '—' },
  ],
};

/* Ad placements. Set `banner` to { src, href, alt } to show a paid banner; null shows the "Book this spot" slot. */
export const AD_PLACEMENTS = {
  leaderboard: { size: '728 × 90', where: 'Top of every page', banner: null },
  rectangle: { size: '300 × 250', where: 'Niagara Today widgets (home page and /traffic)', banner: null },
};

const SKY = (c) =>
  c === 0 ? ['sun', 'Clear']
  : c <= 2 ? ['partly', 'Partly cloudy']
  : c === 3 ? ['cloud', 'Overcast']
  : c === 45 || c === 48 ? ['fog', 'Fog']
  : c >= 51 && c <= 57 ? ['rain', 'Drizzle']
  : c >= 61 && c <= 67 ? ['rain', 'Rain']
  : c >= 71 && c <= 77 ? ['snow', 'Snow']
  : c >= 80 && c <= 82 ? ['rain', 'Showers']
  : c === 85 || c === 86 ? ['snow', 'Snow showers']
  : c >= 95 ? ['storm', 'Thunderstorms']
  : ['cloud', 'Cloudy'];
const DIRS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const dayFmt = new Intl.DateTimeFormat('en-CA', { weekday: 'short', timeZone: 'America/Toronto' });

export async function fetchWeather(city, signal) {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: String(city.lat),
    longitude: String(city.lon),
    current: 'temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m,weather_code',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
    timezone: 'America/Toronto',
    forecast_days: '6',
  });
  const r = await fetch(url, { signal });
  if (!r.ok) throw new Error(`Weather request failed (${r.status})`);
  const j = await r.json();
  const [sky, label] = SKY(j.current.weather_code);
  const clock = (iso) => {
    const [h, m] = iso.split('T')[1].split(':').map(Number);
    return `${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, '0')} ${h < 12 ? 'AM' : 'PM'}`;
  };
  return {
    tempC: Math.round(j.current.temperature_2m),
    feelsC: Math.round(j.current.apparent_temperature),
    humidity: Math.round(j.current.relative_humidity_2m),
    windKmh: Math.round(j.current.wind_speed_10m),
    windDir: DIRS[Math.round(j.current.wind_direction_10m / 45) % 8],
    sky,
    label,
    sunrise: clock(j.daily.sunrise[0]),
    sunset: clock(j.daily.sunset[0]),
    days: j.daily.time.slice(1).map((d, i) => ({
      day: dayFmt.format(new Date(`${d}T12:00:00`)),
      sky: SKY(j.daily.weather_code[i + 1])[0],
      hi: Math.round(j.daily.temperature_2m_max[i + 1]),
      lo: Math.round(j.daily.temperature_2m_min[i + 1]),
    })),
  };
}

async function feed(url, fallback, signal) {
  if (!url) return { data: fallback, sample: true };
  try {
    const r = await fetch(url, { signal });
    if (!r.ok) throw new Error(String(r.status));
    return { data: await r.json(), sample: false };
  } catch {
    return { data: fallback, sample: true };
  }
}

export async function fetchAll(signal) {
  const keys = Object.keys(FEEDS);
  const res = await Promise.all(keys.map((k) => feed(FEEDS[k], SAMPLE[k], signal)));
  const out = { updatedAt: new Date(), isSample: res.some((x) => x.sample) };
  keys.forEach((k, i) => (out[k] = res[i].data));
  return out;
}
