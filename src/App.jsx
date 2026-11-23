import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PlayerProvider } from './context/PlayerContext.jsx';
import { useTheme } from './hooks/useTheme.js';
import { Header, TopBar } from './components/Header.jsx';
import { AdSlot, Ticker } from './components/Widgets.jsx';
import { Footer } from './components/Sections.jsx';
import Home from './pages/Home.jsx';
import OnAir from './pages/OnAir.jsx';
import ShowDetail from './pages/ShowDetail.jsx';
import HostsPage from './pages/HostsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import AdvertisePage from './pages/AdvertisePage.jsx';
import CareersPage from './pages/CareersPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import TrafficPage from './pages/TrafficPage.jsx';
import PrivacyPage from './pages/PrivacyPage.jsx';
import NotFound from './pages/NotFound.jsx';
import { getShow } from './data/station.js';

const TITLES = {
  '/': 'Hometown Radio · St. Catharines / Niagara',
  '/on-air': 'On Air',
  '/hosts': 'Hosts',
  '/about-us': 'About Us',
  '/advertise': 'Advertise',
  '/careers': 'Careers',
  '/contact': 'Contact',
  '/traffic': 'Local Traffic',
  '/privacy-policy': 'Privacy Policy',
};

/* Scroll to top (or to #hash) and set the page title on every navigation. */
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const path = pathname.replace(/\/$/, '') || '/';
    const show = path.startsWith('/on-air/') ? getShow(path.split('/')[2]) : null;
    const title = show ? show.name : TITLES[path] || 'Page not found';
    document.title = `${title} — Classic 1220 AM CFAJ`;
    if (hash) {
      requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView());
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <PlayerProvider>
      <RouteEffects />
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="page">
        <TopBar />
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <Ticker />
        <div className="ad-strip">
          <div className="container ad-top">
            <AdSlot size="leaderboard" />
          </div>
        </div>
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/on-air" element={<OnAir />} />
            <Route path="/on-air/:slug" element={<ShowDetail />} />
            <Route path="/hosts" element={<HostsPage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/advertise" element={<AdvertisePage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/traffic" element={<TrafficPage />} />
            <Route path="/privacy-policy" element={<PrivacyPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PlayerProvider>
  );
}
