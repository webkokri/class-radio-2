# Classic 1220 AM CFAJ — Website (React + Vite)

The Classic 1220 gradient design as a React project. It has a light/dark theme switch, a live player, a weekday/weekend show schedule and a mobile menu.

## Getting started

```bash
npm install
npm run dev       # local dev server at http://localhost:5173
npm run build     # production build in /dist
npm run preview   # preview the production build
```

Requires Node.js 18 or newer.

## Pages (React Router)

`/` Home · `/on-air` · `/on-air/:slug` (8 show pages) · `/hosts` · `/about-us` · `/advertise` · `/careers` · `/contact` · `/traffic` · `/privacy-policy` · 404.
Hosts link to their show, show cards link to show pages, and the header, footer, hero chips and every section CTA link between pages.
Uses `BrowserRouter`, so a production host must serve `index.html` for unknown paths (SPA fallback).

## Project structure

```
src/
  pages/                   ← one file per page (Home, OnAir, ShowDetail, ...)
  data/station.js          ← ALL content: shows, hosts, story, contact, stream URL
  context/PlayerContext.jsx← live-stream audio player (shared play/pause state)
  hooks/useTheme.js        ← light/dark theme (remembers the visitor's choice)
  components/
    Header.jsx             ← top bar, sticky header, nav, theme toggle, mobile menu
    Hero.jsx               ← headline + live player card
    Sections.jsx           ← Shows, About/Story, Hosts, Advertise, Careers/Listen, Footer
    ui.jsx                 ← icons, logo, equalizer, image fallback, section heading
  styles/global.css        ← design tokens (CSS variables) + all styles
public/images/             ← put logo and photos here
```

## Things to set before going live

1. **Live stream:** in `src/data/station.js` set `STATION.streamUrl` to the station's stream URL. Until it's set, the play buttons only animate the design.
2. **TuneIn link:** set `STATION.tuneInUrl`.
3. **Images:** copy files into `public/images/` using the file names in `station.js`, or change the paths there. If an image is missing, the page shows the gradient artwork instead:
   - `classic-new-logo.png` (logo)
   - show artwork: `tony-stuart.jpg`, `ella.jpeg`, `x-zone.jpg`, `8-days-this-week.jpg`, `memphis-to-merseyside.jpg`, `musicology.png`, `rock-n-roll-bandstand.jpg`, `old-school-dance.png`
   - host photos in `public/images/hosts/` (see `HOSTS` in `station.js`)
4. **Recently played:** `STATION.nowPlaying.recentSong` is a placeholder. Connect it to your playout system's now-playing feed if you have one.
5. **Newsletter / contact form:** these open the visitor's email app addressed to the station (no backend). Connect `Subscribe` in `Sections.jsx` and `ContactPage.jsx` to a form service if you want in-page sending.
6. **Weather / Local traffic:** weather links to forecast7.com, traffic has its own `/traffic` page (bridge-status images from the live site).

## Theming

Colours are CSS variables at the top of `src/styles/global.css`. `:root` holds the light theme and `[data-theme='dark']` holds the dark theme. The brand colours are `--purple`, `--magenta`, `--orange` and `--yellow`.
