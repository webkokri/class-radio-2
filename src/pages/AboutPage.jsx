import { Link } from 'react-router-dom';
import { About } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';
import { ABOUT_HISTORY, BUMPERS } from '../data/station.js';

export default function AboutPage() {
  return (
    <>
      <PageHeader eyebrow="About Us" title="About Classic 1220" />
      <section className="section section--tight-top">
        <div className="container split split--top">
          <div className="split__main stack-18 prose">
            {ABOUT_HISTORY.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <div className="row-wrap">
              <Link className="btn btn--gradient btn--lg" to="/on-air">Hear our shows</Link>
              <Link className="btn btn--ghost btn--lg" to="/contact">Contact us</Link>
            </div>
          </div>
          <div className="split__side bumpers">
            {BUMPERS.map((b) => (
              <img key={b} src={b} alt="Classic 1220 AM CFAJ Radio" loading="lazy" />
            ))}
          </div>
        </div>
      </section>
      <About full />
    </>
  );
}
