import { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import DriftWall from './reactbits/DriftWall/DriftWall.jsx';
import './LifeGallery.css';

/**
 * Website wrapper around the unmodified official DriftWall.
 * Photos are data only: no personal captions are generated here. The official
 * component supplies drifting columns, pointer parallax and hover/focus lift;
 * its native anchors open the supplied original image. Motion is never patched.
 */
function normalizePhotos(photos) {
  return photos.flatMap((photo, index) => {
    const entry = typeof photo === 'string' ? { src: photo } : photo;
    if (!entry || typeof entry.src !== 'string' || !entry.src.trim()) return [];
    return [{
      id: entry.id || `photo-${index + 1}`,
      src: entry.src,
      alt: typeof entry.alt === 'string' ? entry.alt : '',
      fullSrc: typeof entry.fullSrc === 'string' && entry.fullSrc.trim() ? entry.fullSrc : entry.src,
      width: Number.isFinite(entry.width) && entry.width > 0 ? entry.width : undefined,
      height: Number.isFinite(entry.height) && entry.height > 0 ? entry.height : undefined
    }];
  });
}

function StaticPhotoWall({ photos, wallRef }) {
  return <ul ref={wallRef} className="life-gallery__static" aria-label="Photo collection" tabIndex={0}>
    {photos.map((photo, index) => <li key={`${photo.id}-${index}`} data-life-photo-id={photo.id}>
      <a href={photo.fullSrc} target="_blank" rel="noopener noreferrer" aria-label={photo.alt || `Open photo ${index + 1}`}>
        <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async"/>
      </a>
    </li>)}
  </ul>;
}

class GalleryBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

export default function LifeGallery({ photos = [], animated = true, theme = 'dark' }) {
  const hostRef = useRef(null);
  const staticRef = useRef(null);
  const [supported, setSupported] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [near, setNear] = useState(false);
  const [focused, setFocused] = useState(false);
  const [staticFocused, setStaticFocused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [columns, setColumns] = useState(5);
  const photoItems = useMemo(() => normalizePhotos(photos), [photos]);
  const wallItems = useMemo(() => photoItems.map((photo, index) => ({
    image: photo.src,
    title: photo.alt || `Photo ${index + 1}`,
    href: photo.fullSrc
  })), [photoItems]);
  const onFailure = useCallback(() => setFailed(true), []);

  useEffect(() => {
    const available = typeof ResizeObserver === 'function'
      && typeof window.requestAnimationFrame === 'function'
      && typeof window.matchMedia === 'function'
      && Boolean(window.CSS?.supports?.('transform-style', 'preserve-3d'))
      && Boolean(window.CSS?.supports?.('perspective', '1200px'));
    if (!available) { setSupported(false); return undefined; }

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (typeof media.addEventListener !== 'function') { setSupported(false); return undefined; }
    setSupported(true);
    setReduced(media.matches);
    const onMotionChange = event => setReduced(event.matches);
    media.addEventListener('change', onMotionChange);

    const measure = () => {
      const width = hostRef.current?.clientWidth || 0;
      setColumns(width >= 1000 ? 5 : width >= 740 ? 4 : width >= 470 ? 3 : 2);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (hostRef.current) observer.observe(hostRef.current);
    return () => {
      observer.disconnect();
      media.removeEventListener('change', onMotionChange);
    };
  }, [photoItems.length]);

  useEffect(() => {
    if (!animated || !supported || reduced || failed) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setNear(true); return undefined; }
    const observer = new IntersectionObserver(entries => {
      setNear(entries.some(entry => entry.isIntersecting));
    }, { rootMargin: '240px', threshold: 0 });
    if (hostRef.current) observer.observe(hostRef.current);
    return () => observer.disconnect();
  }, [animated, supported, reduced, failed, photoItems.length]);

  // Retain focused DOM when the wall leaves the viewport or a keyboard reader
  // starts with the static SSR collection before the animation is mounted.
  const interactive = animated && supported && !reduced && !failed && (near || focused) && !staticFocused;
  const fallback = <StaticPhotoWall photos={photoItems} wallRef={staticRef}/>;

  if (!photoItems.length) return null;

  return <div
    ref={hostRef}
    className="life-gallery"
    data-life-gallery={interactive ? 'drift' : 'static'}
    data-photo-count={photoItems.length}
    data-theme={theme}
    onFocusCapture={event => {
      setFocused(true);
      if (staticRef.current?.contains(event.target)) setStaticFocused(true);
    }}
    onBlurCapture={event => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setFocused(false);
        setStaticFocused(false);
      }
    }}
  >
    {interactive ? <GalleryBoundary fallback={fallback} onFailure={onFailure}>
      <DriftWall
        items={wallItems}
        columns={columns}
        tileWidth={columns <= 3 ? 160 : 200}
        tileHeight={columns <= 3 ? 106 : 132}
        overlayColor={theme === 'light' ? '#ffffff' : '#111215'}
      />
    </GalleryBoundary> : fallback}
  </div>;
}
