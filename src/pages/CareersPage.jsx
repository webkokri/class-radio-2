import { CAREERS, STATION } from '../data/station.js';
import { Departments } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';

export default function CareersPage() {
  return (
    <>
      <PageHeader eyebrow="Careers" title="Careers at Classic 1220AM">
        <p className="muted">Your future in radio starts here.</p>
      </PageHeader>
      <section className="section section--tight-top">
        <div className="container stack-40">
          <div className="stack-18">
            {CAREERS.map((job) => (
              <div key={job.title} className="card panel stack-14">
                <span className="eyebrow">OPEN POSITION</span>
                <h2 className="h3">{job.title}</h2>
                <p className="muted">{job.text}</p>
                <div className="row-wrap">
                  <a className="btn btn--gradient btn--lg" href={`mailto:${STATION.emails.general}?subject=${encodeURIComponent(`Application: ${job.title}`)}`}>
                    Apply by email
                  </a>
                  <a className="btn btn--ghost btn--lg" href={`tel:${STATION.phone.replace(/\D/g, '')}`}>
                    Studio {STATION.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <div className="stack-18">
            <span className="eyebrow">CONTACT A DEPARTMENT</span>
            <Departments />
          </div>
        </div>
      </section>
    </>
  );
}
