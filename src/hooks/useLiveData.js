import { useEffect, useState } from 'react';
import { SAMPLE, fetchAll } from '../data/live.js';

const initial = { ...SAMPLE, updatedAt: new Date(), isSample: true };

/* Refreshes the Niagara Today feeds every 5 minutes; shows sample data until the first load. */
export function useLiveData(intervalMs = 300000) {
  const [data, setData] = useState(initial);
  useEffect(() => {
    let ctrl = new AbortController();
    const load = () => {
      ctrl.abort();
      ctrl = new AbortController();
      fetchAll(ctrl.signal).then(setData).catch(() => {});
    };
    load();
    const t = setInterval(load, intervalMs);
    return () => {
      clearInterval(t);
      ctrl.abort();
    };
  }, [intervalMs]);
  return data;
}
