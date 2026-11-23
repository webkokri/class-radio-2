import { Shows } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';
import { STATION } from '../data/station.js';
import { usePlayer } from '../context/PlayerContext.jsx';

export default function OnAir() {
  const { playing, toggle } = usePlayer();
  return (
    <>
      <PageHeader eyebrow="On Air" title="On Air @ Classic 1220">
        <p className="muted">Every show on Classic 1220AM CFAJ — tap a show for the host, schedule and contact details.</p>
      </PageHeader>
      <section id="listen" className="section section--tight-top">
        <div className="container">
          <div className="card panel row-wrap listen">
            <div className="stack-10">
              <span className="eyebrow">LISTEN LIVE</span>
              <h2 className="h3">Tune in to 1220 AM, or stream it anywhere.</h2>
              <div className="row-wrap">
                <button type="button" className="btn btn--gradient btn--lg" onClick={toggle}>
                  {playing ? '❚❚ Pause' : '▶ Listen Live'}
                </button>
                <a className="btn btn--ghost btn--lg" href={STATION.tuneInUrl} target="_blank" rel="noopener noreferrer">
                  Listen on TuneIn ↗
                </a>
              </div>
            </div>
            <a href={STATION.tuneInUrl} target="_blank" rel="noopener noreferrer" aria-label="Listen on TuneIn">
              <img className="listen__badge" src={STATION.tuneInImage} alt="TuneIn" />
            </a>
          </div>
        </div>
      </section>
      <Shows withHeading={false} />
    </>
  );
}
