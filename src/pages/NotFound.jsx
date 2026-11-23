import { Link } from 'react-router-dom';
import { PageHeader } from '../components/ui.jsx';

export default function NotFound() {
  return (
    <>
      <PageHeader eyebrow="404" title="Page not found">
        <p className="muted">That page isn't on our dial.</p>
        <div className="row-wrap">
          <Link className="btn btn--gradient btn--lg" to="/">Back home</Link>
          <Link className="btn btn--ghost btn--lg" to="/on-air">See the shows</Link>
        </div>
      </PageHeader>
    </>
  );
}
