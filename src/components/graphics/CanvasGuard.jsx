import { useEffect, useRef, useState } from 'react';

/**
 * Website-level fallback around an unmodified official component. This wrapper
 * observes canvas availability only; it never changes rendering or input.
 * Keep it inside Suspense so its checks run after the lazy component loads.
 */
export default function CanvasGuard({ children, fallback = null, onUnavailable }) {
  const hostRef = useRef(null);
  const callbackRef = useRef(onUnavailable);
  const [failed, setFailed] = useState(false);
  callbackRef.current = onUnavailable;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let alive = true;
    let canvas = null;
    const fail = () => {
      if (!alive) return;
      setFailed(true);
      callbackRef.current?.();
    };
    const observeCanvas = () => {
      const next = host.querySelector('canvas');
      if (next === canvas) return Boolean(canvas);
      canvas?.removeEventListener('webglcontextlost', fail);
      canvas = next;
      canvas?.addEventListener('webglcontextlost', fail);
      return Boolean(canvas);
    };
    const observer = new MutationObserver(observeCanvas);
    observer.observe(host, { childList: true, subtree: true });
    const frame = requestAnimationFrame(() => {
      if (!observeCanvas()) fail();
    });
    observeCanvas();
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas?.removeEventListener('webglcontextlost', fail);
    };
  }, []);

  return <div ref={hostRef} className="official-canvas-host">{failed ? fallback : children}</div>;
}
