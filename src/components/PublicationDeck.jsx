import { Fragment, useEffect, useId, useRef, useState } from 'react';
import BounceCardsContent from './adapters/BounceCardsContent.jsx';
import HoloCardContent from './adapters/HoloCardContent.jsx';
import './PublicationDeck.css';

/**
 * Eight publications share one official BounceCards spring/hover engine.
 * Both adapters retain their upstream originals in components/reactbits/.
 * BounceCards adds rectangular HTML slots and descendant event routing.
 * HoloCard adds a front-face HTML slot; its shaders, defaults and physics are
 * unchanged. The real figure is contained in a card-sized texture, so the
 * original holographic material, frame, shadow and tilt cover the WHOLE card.
 * Titles/authors/venues/links remain real HTML on that same front face.
 */
const CARD_WIDTH = 320;
const CARD_HEIGHT = 460;
const ART_HEIGHT = 184;

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
  const [texture, setTexture] = useState(null);
  const key = `${paper.id}-${theme}`;

  useEffect(() => {
    if (!enabled) return undefined;
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
        context.fillStyle = theme === 'dark' ? '#1b1c20' : '#ffffff';
        context.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
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
        setTexture({ key, image: canvas.toDataURL('image/png') });
      } catch { /* Keep the real HTML/image card if texture creation fails. */ }
    };
    image.src = `/images/optimized/${paper.id}.webp`;
    return () => { alive = false; };
  }, [paper.id, theme, enabled, key]);

  return texture?.key === key ? texture.image : null;
}

function PublicationCard({ paper, index, animated, theme, onOpen, titleId }) {
  const triggerRef = useRef(null);
  const texture = usePaperTexture(paper, theme, animated);
  const holographic = animated && Boolean(texture);
  const open = () => onOpen(paper, triggerRef.current);
  const content = <div className="publication-deck__card-content">
    <div className="publication-deck__image-space" aria-hidden={holographic ? 'true' : undefined}>
      {!holographic && <img src={`/images/optimized/${paper.id}.webp`} alt={paper.imageAlt} loading="lazy" decoding="async"/>}
    </div>
    <button ref={triggerRef} type="button" className="publication-deck__view" onClick={open} aria-label={`View ${paper.title}`} aria-haspopup="dialog"><DeckIcon name="expand" size={15}/></button>
    <div className="publication-deck__body" data-bounce-reading="">
      <div className="publication-deck__meta"><span className="publication-deck__venue">{paper.venue}</span><span className="publication-deck__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
      <h3 id={titleId}>{paper.title}</h3>
      <PaperAuthors authors={paper.authors}/>
      <PaperLinks paper={paper}/>
    </div>
  </div>;

  return <article
    className={`publication-deck__card${holographic ? ' is-holographic' : ' is-static'}`}
    id={`paper-${paper.id}`}
    data-publication-index={index}
    aria-labelledby={titleId}
    onClick={!animated ? event => {
      if (event.target.closest('a,button') || window.getSelection()?.toString()) return;
      open();
    } : undefined}
  >
    {holographic ? <HoloCardContent image={texture} alt={paper.imageAlt} style={{ '--hc-ratio': CARD_WIDTH / CARD_HEIGHT }}>{content}</HoloCardContent> : content}
  </article>;
}

export default function PublicationDeck({ publications = [], animated = true, theme = 'light' }) {
  const idPrefix = useId();
  const deckRef = useRef(null);
  const viewportRef = useRef(null);
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [selectedId, setSelectedId] = useState(null);
  const [near, setNear] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(1080);
  const selected = publications.find(paper => paper.id === selectedId);
  const interactive = animated && near;
  const stageWidth = Math.max(1080, viewportWidth);
  // Only layout dimensions adapt to available space. The original pushDistance,
  // rotation, stiffness, damping, stagger and bounciness remain their defaults.
  const spread = Math.min(85, Math.max(46, (stageWidth - CARD_WIDTH - 320 - 112) / Math.max(1, publications.length - 1)));
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
    return () => {
      root.style.overflow = previousRootOverflow;
      body.style.overflow = previousBodyOverflow;
      body.style.paddingRight = previousBodyPadding;
    };
  }, [selected]);

  const openPaper = (paper, trigger) => {
    returnFocusRef.current = trigger;
    setSelectedId(paper.id);
  };
  const openIndex = index => {
    const card = deckRef.current?.querySelector(`[data-bounce-index="${index}"]`);
    const active = document.activeElement;
    const trigger = card?.contains(active) ? active : card?.querySelector('.publication-deck__view');
    openPaper(publications[index], trigger);
  };
  const closePaper = () => dialogRef.current?.close();
  const finishClose = () => {
    setSelectedId(null);
    if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus({ preventScroll: true });
  };
  const renderCard = index => <PublicationCard key={publications[index].id} paper={publications[index]} index={index} animated={interactive} theme={theme} onOpen={openPaper} titleId={`${idPrefix}-${publications[index].id}`}/>;

  if (!publications.length) return null;

  return <div ref={deckRef} className="publication-deck" data-theme={theme} data-animated={animated ? 'true' : 'false'} data-publication-layout={interactive ? 'bounce' : 'row'}>
    <div className="publication-deck__toolbar"><p id={hintId}>{animated ? 'Hover to explore · click to view' : 'Scroll to explore · click to view'}</p><span>{String(publications.length).padStart(2, '0')} papers</span></div>
    <div ref={viewportRef} className="publication-deck__viewport" role="region" aria-label="Publication cards" aria-describedby={hintId}>
      {interactive ? <BounceCardsContent
        images={publications.map(paper => ({ src: `/images/optimized/${paper.id}.webp`, alt: paper.title }))}
        containerWidth={stageWidth}
        containerHeight={600}
        cardSize={CARD_WIDTH}
        cardHeight={CARD_HEIGHT}
        spread={spread}
        borderWidth={0}
        radius={14}
        shadow={false}
        onCardClick={openIndex}
        renderCard={(_, index) => renderCard(index)}
      /> : <div className="publication-deck__row">{publications.map((_, index) => renderCard(index))}</div>}
    </div>
    <dialog ref={dialogRef} className="publication-deck__dialog" aria-labelledby={dialogTitleId} aria-describedby={dialogAuthorsId} onCancel={event => { event.preventDefault(); closePaper(); }} onClose={finishClose} onClick={event => { if (event.target === event.currentTarget) closePaper(); }}>
      <div className="publication-deck__dialog-content">
        <button ref={closeRef} type="button" className="publication-deck__close" aria-label="Close publication" onClick={closePaper}><DeckIcon name="close" size={20}/></button>
        {selected && <>
          <figure className="publication-deck__large-image"><img src={`/images/optimized/${selected.id}.webp`} alt={selected.imageAlt}/></figure>
          <div className="publication-deck__dialog-body"><span className="publication-deck__venue">{selected.venue}</span><h2 id={dialogTitleId}>{selected.title}</h2><PaperAuthors authors={selected.authors} id={dialogAuthorsId}/><PaperLinks paper={selected}/></div>
        </>}
      </div>
    </dialog>
  </div>;
}
