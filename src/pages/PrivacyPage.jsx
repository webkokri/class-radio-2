import { PageHeader } from '../components/ui.jsx';
import { PRIVACY } from '../data/station.js';

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Privacy Policy" title="Privacy policy" />
      <section className="section section--tight-top">
        <div className="container prose stack-18">
          {PRIVACY.map(([h, t]) => (
            <div key={h} className="stack-8">
              <h2 className="h3">{h}</h2>
              <p className="muted">{t}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
