import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/* Elements that fade/slide in as they scroll into view (staggered within each row). */
const REVEAL = [
  '.section-head', '.show', '.host', '.timeline-item', '.tribute', '.ad-point', '.widget', '.step', '.package',
  '.option', '.why__item', '.panel', '.admap', '.traffic', '.sponsor', '.page-header .container > *', '.notice',
].join(',');

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useScrollReveal() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (reduced() || !('IntersectionObserver' in window)) return undefined;
    const root = document.documentElement;
    root.classList.add('js-reveal');
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    const seen = new WeakSet();
    const scan = () => {
      document.querySelectorAll(REVEAL).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const idx = [...el.parentElement.children].indexOf(el);
        el.style.setProperty('--reveal-delay', `${Math.min(idx, 6) * 70}ms`);
        el.classList.add('reveal');
        io.observe(el);
      });
    };
    scan();
    const mo = new MutationObserver(scan);
    mo.observe(document.getElementById('main') || document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, [pathname]);
}

/* Thin gradient bar showing scroll progress + a "scrolled" class on <html> for the header. */
export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? h.scrollTop / max : 0);
      h.classList.toggle('is-scrolled', h.scrollTop > 40);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden="true" />;
}
