import { useEffect, useRef } from 'react';

/**
 * Reveals, without a motion library.
 *
 * This page is two sections behind a QR code, opened on a phone on mobile
 * data. A scroll-driven animation runtime would weigh more than everything
 * else on the page put together, so the reveal is an IntersectionObserver
 * adding one class and CSS doing the rest. Keyboard focus completes the
 * reveal too, since focus can reach a section before scroll does.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function useReveal({ rootMargin = '0px 0px -12% 0px' } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // No observer, or no motion wanted: show it, now and for good.
    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      el.dataset.shown = '';
      return;
    }

    const show = () => {
      el.dataset.shown = '';
      observer.disconnect();
      el.removeEventListener('focusin', show);
    };

    const observer = new IntersectionObserver(
      (entries) => entries.some((e) => e.isIntersecting) && show(),
      { rootMargin }
    );

    observer.observe(el);
    el.addEventListener('focusin', show);

    return () => {
      observer.disconnect();
      el.removeEventListener('focusin', show);
    };
  }, [rootMargin]);

  return ref;
}
