import Hero from '../components/Hero.jsx';
import { About, Advertise, CareersListen, Departments, Hosts, Shows } from '../components/Sections.jsx';
import { Link } from 'react-router-dom';
import { NiagaraToday } from '../components/Widgets.jsx';
import { SectionHead } from '../components/ui.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <Shows />
      <About />
      <Hosts />
      <section className="section section--tight-top section--solid">
        <div className="container stack-28">
          <SectionHead eyebrow="NIAGARA TODAY" title="Weather, border waits & markets">
            <Link className="btn btn--ghost" to="/traffic">See everything →</Link>
          </SectionHead>
          <NiagaraToday compact />
        </div>
      </section>
      <Advertise />
      <CareersListen />
      <section className="section section--tight-top band-soft">
        <div className="container stack-28">
          <SectionHead eyebrow="CONTACT US" title="Get in touch" />
          <Departments />
        </div>
      </section>
    </>
  );
}
