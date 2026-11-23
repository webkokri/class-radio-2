import { NiagaraToday } from '../components/Widgets.jsx';
import { Traffic } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';
import { EXTERNAL } from '../data/station.js';

export default function TrafficPage() {
  return (
    <>
      <PageHeader eyebrow="Niagara Today" title="Niagara Today">
        <p className="muted">
          Weather, border wait times, markets, canal bridges, highway traffic, gas and scores — plus the{' '}
          <a href={EXTERNAL.weather} target="_blank" rel="noopener noreferrer">St. Catharines weather forecast</a>.
        </p>
      </PageHeader>
      <section className="section section--tight-top">
        <div className="container"><NiagaraToday /></div>
      </section>
      <Traffic />
    </>
  );
}
