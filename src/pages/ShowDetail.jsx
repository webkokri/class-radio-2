import { Link, Navigate, useParams } from 'react-router-dom';
import { ALL_SHOWS, GRADIENTS, STATION, getShow } from '../data/station.js';
import { PageHeader, SmartImage } from '../components/ui.jsx';
import { ShowCard } from '../components/Sections.jsx';

export default function ShowDetail() {
  const { slug } = useParams();
  const show = getShow(slug);
  if (!show) return <Navigate to="/not-found" replace />;
  const idx = ALL_SHOWS.indexOf(show);
  const others = ALL_SHOWS.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHeader eyebrow={show.name} title={show.name}>
        <p className="muted">
          {show.host} · {show.time}
        </p>
      </PageHeader>
      <section className="section section--tight-top">
        <div className="container split split--top">
          <div className="split__side">
            <div className="show__art detail__art" style={{ background: GRADIENTS[idx % GRADIENTS.length] }}>
              <SmartImage src={show.image} alt={`${show.name} with ${show.host}`} className="cover" />
            </div>
          </div>
          <div className="split__main stack-18">
            <span className="eyebrow">ABOUT THE SHOW</span>
            <p>{show.blurb}</p>
            <p className="muted">{show.bio}</p>
            <div className="card ad-point stack-8">
              <span className="eyebrow">SCHEDULE</span>
              <strong>{show.time}</strong>
              <span className="muted small">Hosted by {show.host}</span>
            </div>
            {show.gallery?.map((g) => (
              <SmartImage key={g} src={g} alt={`${show.name} award`} className="detail__extra" />
            ))}
            <div className="row-wrap">
              <a className="btn btn--gradient btn--lg" href={STATION.tuneInUrl} target="_blank" rel="noopener noreferrer">
                Listen live ↗
              </a>
              <a className="btn btn--ghost btn--lg" href={`mailto:${show.email || STATION.emails.general}?subject=${encodeURIComponent(show.name)}`}>
                Email the show
              </a>
              <Link className="btn btn--ghost btn--lg" to="/on-air">
                ← All shows
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--tight-top">
        <div className="container stack-28">
          <h2 className="h3">More from Classic 1220</h2>
          <div className="grid grid--shows">
            {others.map((s, i) => (
              <ShowCard key={s.slug} show={s} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
