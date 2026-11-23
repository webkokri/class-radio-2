import { Hosts } from '../components/Sections.jsx';
import { PageHeader } from '../components/ui.jsx';

export default function HostsPage() {
  return (
    <>
      <PageHeader eyebrow="Hosts" title="Meet the hosts">
        <p className="muted">The voices of Classic 1220 — select a host to see their show.</p>
      </PageHeader>
      <Hosts withHeading={false} />
    </>
  );
}
