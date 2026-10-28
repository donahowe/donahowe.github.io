import { Fragment, useEffect, useId, useRef, useState } from 'react';
import BounceCardsContent from './adapters/BounceCardsContent.jsx';
import HoloCardContent from './adapters/HoloCardContent.jsx';
import './PublicationDeck.css';

/**
 * Eight publications share one official BounceCards spring/hover engine.
 * Both adapters retain their upstream originals in components/reactbits/.
 * BounceCards adds rectangular HTML slots and descendant event routing.
 * HoloCard adds a front-face HTML slot; its shader and physics stay unchanged.
 * Public material props suppress the interior effect and keep the color
 * at the metallic edge. The figure is contained in a silver-framed texture.
 * All metadata remains real HTML on the same front face; the dialog reuses
 * this exact PublicationCard component and only scales its presentation.
 */
const CARD_WIDTH = 280;
const CARD_HEIGHT = 440;
const ART_HEIGHT = 156;
const FRAME_WIDTH = 11;
const PUSH_DISTANCE = 64;
const textureCache = new Map();
// These original PNGs contain transparency. The old RGB WebP derivatives
// discarded alpha against black; use their untouched originals over white.
const transparentFigures = new Set(['visdiahalbench', 'dkformer']);
const figureSource = paper => transparentFigures.has(paper.id) ? paper.image : `/images/optimized/${paper.id}.webp`;

function fitEnlargedCard() {
  const width = window.visualViewport?.width || window.innerWidth;
  const height = window.visualViewport?.height || window.innerHeight;
  return Math.max(0.4, Math.min(1.75, (width - 64) / CARD_WIDTH, (height - 112) / CARD_HEIGHT));
}

function DeckIcon({ name, size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'arrow' && <path d="M7 17 17 7M7 7h10v10"/>}
    {name === 'expand' && <path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/>}
    {name === 'close' && <path d="m6 6 12 12M6 18 18 6"/>}
  </svg>;
}

function PaperAuthors({ authors = [], id }) {
  return <p className="publication-deck__authors" id={id}>
    {authors.map((author, index) => <Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : ''}{author === 'Junhao Cheng' ? <strong>{author}</strong> : author}
    </Fragment>)}
  </p>;
}

function PaperLinks({ paper }) {
  return <div className="publication-deck__links" aria-label={`Links for ${paper.title}`}>
    {paper.links.map(link => <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">
      {link.label}<DeckIcon name="arrow" size={13}/>
    </a>)}
  </div>;
}

function usePaperTexture(paper, theme, enabled) {
  const key = `${paper.id}-${theme}-silver-white-art`;
  const [texture, setTexture] = useState(() => textureCache.get(key) || null);

  useEffect(() => {
    if (!enabled) return undefined;
    const cached = textureCache.get(key);
    if (cached) { setTexture(cached); return undefined; }
    let alive = true;
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      if (!alive) return;
      try {
        const canvas = document.createElement('canvas');
        canvas.width = CARD_WIDTH * 2;
        canvas.height = CARD_HEIGHT * 2;
        const context = canvas.getContext('2d');
        if (!context) return;
        context.scale(2, 2);
        const metal = context.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
        [[0, '#737f90'], [0.12, '#f6f8fc'], [0.26, '#a8b2c2'], [0.42, '#eef2f8'], [0.54, '#8f9caf'], [0.72, '#f7f9fc'], [0.86, '#b3bdca'], [1, '#e9edf4']].forEach(([stop, color]) => metal.addColorStop(stop, color));
        context.fillStyle = metal;
        context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
        context.fillStyle = theme === 'dark' ? '#1b1c20' : '#ffffff';
        context.beginPath();
        context.roundRect(FRAME_WIDTH, FRAME_WIDTH, CARD_WIDTH - FRAME_WIDTH * 2, CARD_HEIGHT - FRAME_WIDTH * 2, 5);
        context.fill();
        // The source figure is never cropped, recolored or stretched. This
        // texture adds only paper around it, leaving room for semantic HTML.
        context.fillStyle = '#ffffff';
        context.fillRect(14, 14, CARD_WIDTH - 28, ART_HEIGHT - 14);
        const roomWidth = CARD_WIDTH - 40;
        const roomHeight = ART_HEIGHT - 36;
        const fit = Math.min(roomWidth / image.naturalWidth, roomHeight / image.naturalHeight);
        const width = image.naturalWidth * fit;
        const height = image.naturalHeight * fit;
        context.drawImage(image, (CARD_WIDTH - width) / 2, 20 + (roomHeight - height) / 2, width, height);
        const next = { key, image: canvas.toDataURL('image/png') };
        textureCache.set(key, next);
        setTexture(next);
      } catch { /* Keep the real HTML/image card if texture creation fails. */ }
    };
    image.src = figureSource(paper);
    return () => { alive = false; };
  }, [paper.id, theme, enabled, key]);

  return texture?.key === key ? texture.image : null;
}

function PublicationCard({ paper, index, animated, theme, onOpen, titleId, authorsId, expanded = false, concealed = false }) {
  const triggerRef = useRef(null);
  const texture = usePaperTexture(paper, theme, animated);
  const holographic = animated && Boolean(texture);
  const open = () => onOpen?.(paper, triggerRef.current);
  const content = <div className="publication-deck__card-content">
    <div className="publication-deck__image-space" aria-hidden={holographic ? 'true' : undefined}>
      {!holographic && <img src={figureSource(paper)} alt={paper.imageAlt} loading="lazy" decoding="async"/>}
    </div>
    {!expanded && <button ref={triggerRef} type="button" className="publication-deck__view" data-bounce-reading="" onClick={open} aria-label={`View ${paper.title}`} aria-haspopup="dialog"><DeckIcon name="expand" size={15}/></button>}
    <div className="publication-deck__body" data-bounce-reading="">
      <div className="publication-deck__meta"><span className="publication-deck__venue">{paper.venue}</span><span className="publication-deck__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
      <h3 id={titleId}>{paper.title}</h3>
      <PaperAuthors authors={paper.authors} id={authorsId}/>
      <PaperLinks paper={paper}/>
    </div>
  </div>;

  return <article
    className={`publication-deck__card${holographic ? ' is-holographic' : ' is-static'}${concealed ? ' is-source' : ''}`}
    id={expanded ? `paper-${paper.id}-expanded` : `paper-${paper.id}`}
    data-publication-index={expanded ? undefined : index}
    data-card-view={expanded ? 'enlarged' : 'deck'}
    aria-labelledby={titleId}
    onClick={!animated && !expanded ? event => {
      if (event.target.closest('a,button') || window.getSelection()?.toString()) return;
      open();
    } : undefined}
  >
    {holographic ? <HoloCardContent image={texture} alt={paper.imageAlt} width={CARD_WIDTH} intensity={0} edgeSparkle={0.8} frame={4} glare={0} style={{ '--hc-ratio': CARD_WIDTH / CARD_HEIGHT }}>{content}</HoloCardContent> : content}
  </article>;
}

export default function PublicationDeck({ publications = [], animated = true, theme = 'light' }) {
  const idPrefix = useId();
  const deckRef = useRef(null);
  const viewportRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const zoomRef = useRef(null);
  const originRectRef = useRef(null);
  const returnFocusRef = useRef(null);
  const transitionRef = useRef(null);
  const closingRef = useRef(false);
  const [selectedId, setSelectedId] = useState(null);
  const [near, setNear] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1160);
  const [zoomScale, setZoomScale] = useState(1);
  const selected = publications.find(paper => paper.id === selectedId);
  const interactive = animated && near;
  const stageWidth = Math.max(1160, viewportWidth);
  // Wider resting slots expose more of each card. Smaller rotation/push are
  // public layout props; the original spring/hover algorithm remains intact.
  const spread = Math.min(120, (stageWidth - CARD_WIDTH - PUSH_DISTANCE * 2 - 64) / Math.max(1, publications.length - 1));
  const hintId = `${idPrefix}-hint`;
  const dialogTitleId = `${idPrefix}-dialog-title`;
  const dialogAuthorsId = `${idPrefix}-dialog-authors`;

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;
    const measure = () => setViewportWidth(Math.round(viewport.clientWidth));
    measure();
    if (typeof ResizeObserver === 'undefined') return undefined;
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!animated || near) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setNear(true); return undefined; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '300px', threshold: 0 });
    if (viewportRef.current) observer.observe(viewportRef.current);
    return () => observer.disconnect();
  }, [animated, near]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) {
      if (dialog?.open) dialog.close();
      return undefined;
    }
    const root = document.documentElement;
    const body = document.body;
    const previousRootOverflow = root.style.overflow;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyPadding = body.style.paddingRight;
    const gutter = Math.max(0, window.innerWidth - root.clientWidth);
    const bodyPadding = parseFloat(getComputedStyle(body).paddingRight) || 0;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    if (gutter > 0) body.style.paddingRight = `${bodyPadding + gutter}px`;
    if (!dialog.open) {
      dialog.showModal();
      dialog.scrollTop = 0;
      closeRef.current?.focus({ preventScroll: true });
    }
    const resize = () => setZoomScale(fitEnlargedCard());
    window.addEventListener('resize', resize);
    window.visualViewport?.addEventListener('resize', resize);
    const origin = originRectRef.current;
    const zoom = zoomRef.current;
    transitionRef.current?.cancel();
    closingRef.current = false;
    if (animated && origin && zoom?.animate && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const target = zoom.getBoundingClientRect();
      const dx = origin.left + origin.width / 2 - target.left - target.width / 2;
      const dy = origin.top + origin.height / 2 - target.top - target.height / 2;
      transitionRef.current = zoom.animate([
        { transform: `translate(${dx}px, ${dy}px) scale(${origin.width / target.width})`, opacity: 0.7 },
        { transform: 'translate(0, 0) scale(1)', opacity: 1 }
      ], { duration: 340, easing: 'cubic-bezier(.22,1,.36,1)' });
    }
    return () => {
      transitionRef.current?.cancel();
      transitionRef.current = null;
      window.removeEventListener('resize', resize);
      window.visualViewport?.removeEventListener('resize', resize);
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPadding;
    };
  }, [selected]);

  const openPaper = (paper, trigger) => {
    returnFocusRef.current = trigger;
    const source = deckRef.current?.querySelector(`#paper-${paper.id}`);
    originRectRef.current = source?.getBoundingClientRect() || null;
    setZoomScale(fitEnlargedCard());
    setSelectedId(paper.id);
  };
  const openIndex = index => {
    const card = deckRef.current?.querySelector(`[data-bounce-index="${index}"]`);
    const active = document.activeElement;
    const trigger = card?.contains(active) ? active : card?.querySelector('.publication-deck__view');
    openPaper(publications[index], trigger);
  };
  const closePaper = () => {
    if (closingRef.current) return;
    const dialog = dialogRef.current;
    const zoom = zoomRef.current;
    const source = selected ? deckRef.current?.querySelector(`#paper-${selected.id}`) : null;
    if (!dialog?.open) return;
    const currentTransform = zoom ? getComputedStyle(zoom).transform : 'none';
    const currentOpacity = zoom ? getComputedStyle(zoom).opacity : '1';
    transitionRef.current?.cancel();
    if (!animated || !source || !zoom?.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      dialog.close();
      return;
    }
    closingRef.current = true;
    const from = zoom.getBoundingClientRect();
    const to = source.getBoundingClientRect();
    const dx = to.left + to.width / 2 - from.left - from.width / 2;
    const dy = to.top + to.height / 2 - from.top - from.height / 2;
    const animation = zoom.animate([
      { transform: currentTransform, opacity: currentOpacity },
      { transform: `translate(${dx}px, ${dy}px) scale(${to.width / from.width})`, opacity: 1 }
    ], { duration: 260, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' });
    transitionRef.current = animation;
    animation.onfinish = () => dialog.close();
  };
  const finishClose = () => {
    const previousId = selectedId;
    transitionRef.current?.cancel();
    transitionRef.current = null;
    closingRef.current = false;
    setSelectedId(null);
    requestAnimationFrame(() => {
      const trigger = returnFocusRef.current?.isConnected ? returnFocusRef.current : deckRef.current?.querySelector(`#paper-${previousId} .publication-deck__view`);
      trigger?.focus({ preventScroll: true });
    });
  };
  const renderCard = index => <PublicationCard key={publications[index].id} paper={publications[index]} index={index} animated={interactive} theme={theme} onOpen={openPaper} concealed={selectedId === publications[index].id} titleId={`${idPrefix}-${publications[index].id}`}/>;

  if (!publications.length) return null;

  return <div ref={deckRef} className="publication-deck" data-theme={theme} data-animated={animated ? 'true' : 'false'} data-publication-layout={interactive ? 'bounce' : 'row'}>
    <div className="publication-deck__toolbar"><p id={hintId}>{animated ? 'Hover to explore · click to view' : 'Scroll to explore · click to view'}</p></div>
    <div ref={viewportRef} className="publication-deck__viewport" role="region" aria-label="Publication cards" aria-describedby={hintId}>
      {interactive ? <BounceCardsContent
        images={publications.map(paper => ({ src: figureSource(paper), alt: paper.title }))}
        containerWidth={stageWidth}
        containerHeight={560}
        cardSize={CARD_WIDTH}
        cardHeight={CARD_HEIGHT}
        spread={spread}
        rotation={4}
        pushDistance={PUSH_DISTANCE}
        borderWidth={0}
        radius={14}
        shadow={false}
        onCardClick={openIndex}
        renderCard={(_, index) => renderCard(index)}
      /> : <div className="publication-deck__row">{publications.map((_, index) => renderCard(index))}</div>}
    </div>
    <dialog ref={dialogRef} className="publication-deck__dialog" aria-labelledby={dialogTitleId} aria-describedby={dialogAuthorsId} onCancel={event => { event.preventDefault(); closePaper(); }} onClose={finishClose} onClick={event => { if (event.target === event.currentTarget) closePaper(); }}>
      <div ref={zoomRef} className="publication-deck__enlargement" style={{ width: CARD_WIDTH * zoomScale, height: CARD_HEIGHT * zoomScale }}>
        <button ref={closeRef} type="button" className="publication-deck__close" aria-label="Close publication" onClick={closePaper}><DeckIcon name="close" size={20}/></button>
        {selected && <div className="publication-deck__zoom-surface" style={{ transform: `scale(${zoomScale})` }}><PublicationCard paper={selected} index={publications.indexOf(selected)} animated={animated} theme={theme} expanded titleId={dialogTitleId} authorsId={dialogAuthorsId}/></div>}
      </div>
    </dialog>
  </div>;
}
