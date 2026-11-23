import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { STATION } from '../data/station.js';

const PlayerContext = createContext(null);

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!STATION.streamUrl) return undefined;
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;
    const onPause = () => setPlaying(false);
    const onPlay = () => setPlaying(true);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('play', onPlay);
    return () => {
      audio.pause();
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('play', onPlay);
    };
  }, []);

  const toggle = useCallback(async () => {
    const audio = audioRef.current;
    // No stream configured yet: just toggle the visual state so the design can be previewed.
    if (!audio) {
      setPlaying((p) => !p);
      return;
    }
    if (playing) {
      audio.pause();
      audio.src = ''; // drop the buffer so "play" always resumes live, not from a stale point
      return;
    }
    try {
      setError('');
      audio.src = STATION.streamUrl;
      await audio.play();
    } catch {
      setError('The live stream could not start. Please try again.');
      setPlaying(false);
    }
  }, [playing]);

  return <PlayerContext.Provider value={{ playing, toggle, error }}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>');
  return ctx;
}
