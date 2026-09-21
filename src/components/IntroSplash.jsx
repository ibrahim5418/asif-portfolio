import { useEffect, useRef, useState } from 'react';
import LogoMark from './LogoMark';
import SoundingBand from './SoundingBand';
import { prefersReducedMotion } from '../lib/motion';
import './intro.css';

/**
 * Opening sequence: the logo page, then the card.
 *
 * It opens straight onto paper with the mark already drawing — no
 * coloured screen in front of it. The mark keeps the brand lockup
 * exactly as drawn: the Arabic حلف in the brand grey, the Latin "hilf"
 * in the brand navy, which is why the ground is paper.
 *
 * It is vector, so there is no image to download before the motion can
 * start and no blur at any screen density. The motion is CSS, authored
 * in intro.css alongside the rest of the timeline.
 *
 * Total: ~2.05s of drawing, a short rest, then the lift. Anyone who
 * taps during it gets the card immediately.
 */
const DRAW = 2050; // ms — the full timeline, matching intro.css
const HOLD_AFTER = 320; // ms the finished mark rests
const EXIT = 600; // ms for the intro to lift

export default function IntroSplash({ onReveal }) {
  const [phase, setPhase] = useState('draw'); // draw → exit → done
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const timers = [];

    // The page underneath must not scroll while the intro owns the screen.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
    let locked = true;
    const unlock = () => {
      if (!locked) return;
      locked = false;
      root.style.overflow = previousOverflow;
    };

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      window.removeEventListener('pointerdown', finish);
      setPhase('exit');
      unlock();
      onRevealRef.current?.();
      timers.push(setTimeout(() => setPhase('done'), reduced ? 200 : EXIT));
    };

    if (reduced) {
      timers.push(setTimeout(finish, 700));
    } else {
      timers.push(setTimeout(finish, DRAW + HOLD_AFTER));
      // A visitor who came for the phone number should not have to wait.
      window.addEventListener('pointerdown', finish);
    }

    return () => {
      window.removeEventListener('pointerdown', finish);
      timers.forEach(clearTimeout);
      unlock();
    };
  }, []);

  if (phase === 'done') return null;

  return (
    <div className="intro" data-phase={phase} aria-hidden="true">
      <div className="intro__stage">
        <LogoMark className="intro__mark" />

        {/* The datum the mark comes to rest on, and the soundings that
            drop from it — the same figure that marks the seam between
            the card and the company section further down the page. */}
        <span className="intro__rule" />
        <SoundingBand className="intro__band" />
      </div>
    </div>
  );
}
