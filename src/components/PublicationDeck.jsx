import { Fragment, useEffect, useId, useRef, useState } from 'react';
import HoloCard from './reactbits/HoloCard/HoloCard.jsx';
import './PublicationDeck.css';

/**
 * Website adaptation, not the official BounceCards component.
 * HoloCard is imported from the byte-for-byte official source. Its public props
 * provide the image's quiet rainbow finish; research text stays ordinary HTML.
 * The spacious fan, staggered bounce and expansion below are custom layouts
 * inspired by BounceCards. They deliberately keep every title and link visible
 * instead of using its overlapping, image-only cards.
 */
const GROUP_SIZE = 4;
const FAN_ROTATIONS = [-1.8, -0.6, 0.6, 1.8];
const FAN_OFFSETS = [12, 0, 0, 12];

function DeckIcon({ name, size = 16 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === 'arrow' && <><path d="M7 17 17 7M7 7h10v10"/></>}
    {name === 'expand' && <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M3 3l6 6m12-6-6 6M3 21l6-6m12 6-6-6"/></>}
    {name === 'grid' && <><rect x="3" y="3" width="7" height="7" rx="1.4"/><rect x="14" y="3" width="7" height="7" rx="1.4"/><rect x="3" y="14" width="7" height="7" rx="1.4"/><rect x="14" y="14" width="7" height="7" rx="1.4"/></>}
    {name === 'fan' && <><rect x="8" y="4" width="9" height="16" rx="2"/><path d="m7 7-2 .5a2 2 0 0 0-1.5 2.4l2.1 9.7a2 2 0 0 0 2.4 1.5l2-.4M18 7l2 .5a2 2 0 0 1 1.5 2.4L19.4 19"/></>}
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

function PublicationArtwork({ paper, animated, illuminated }) {
  const imageRef = useRef(null);
  const [ratio, setRatio] = useState(0);
  const image = `/images/optimized/${paper.id}.webp`;
  const recordSize = element => {
    if (element?.naturalWidth && element?.naturalHeight) setRatio(element.naturalWidth / element.naturalHeight);
  };

  useEffect(() => {
    // An already cached SSR image may have loaded before React attached onLoad.
    recordSize(imageRef.current);
  }, [image]);

  return <div className="publication-deck__artwork" aria-hidden="true">
    {animated && ratio > 0 ? <HoloCard
      image={image}
      alt={paper.imageAlt}
      preset="rainbow"
      intensity={illuminated ? 0.22 : 0}
      edgeSparkle={0}
      frame={0}
      glare={illuminated ? 0.12 : 0}
      radius={5}
      tiltMax={8}
      hoverScale={1.025}
      idle={false}
      shadow={false}
      style={{ '--hc-w': '100%', '--hc-ratio': ratio }}
    /> : <img ref={imageRef} src={image} alt={paper.imageAlt} loading="lazy" decoding="async" onLoad={event => recordSize(event.currentTarget)} />}
  </div>;
}

function PublicationCard({ paper, index, slot, animated, onOpen, titleId }) {
  const triggerRef = useRef(null);
  const [illuminated, setIlluminated] = useState(false);
  const open = () => onOpen(paper, triggerRef.current);

  return <li className="publication-deck__slot" style={{ '--deck-turn': `${FAN_ROTATIONS[slot]}deg`, '--deck-y': `${FAN_OFFSETS[slot]}px`, '--deck-delay': `${slot * 60}ms` }}>
    <article
      className="publication-deck__card"
      id={`paper-${paper.id}`}
      aria-labelledby={titleId}
      onPointerEnter={() => setIlluminated(true)}
      onPointerLeave={() => setIlluminated(false)}
      onPointerCancel={() => setIlluminated(false)}
      onFocus={() => setIlluminated(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setIlluminated(false); }}
      onClick={event => {
        // Links and the explicit view button keep their own native behavior.
        if (event.target.closest('a, button')) return;
        if (window.getSelection()?.toString()) return;
        open();
      }}
    >
      <div className="publication-deck__image-area">
        <PublicationArtwork paper={paper} animated={animated} illuminated={illuminated}/>
        <button ref={triggerRef} type="button" className="publication-deck__view" onClick={open} aria-label={`View ${paper.title}`} aria-haspopup="dialog">
          <DeckIcon name="expand" size={15}/>
        </button>
      </div>
      <div className="publication-deck__body">
        <div className="publication-deck__meta"><span className="publication-deck__venue">{paper.venue}</span><span className="publication-deck__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span></div>
        <h3 id={titleId}>{paper.title}</h3>
        <PaperAuthors authors={paper.authors}/>
        <PaperLinks paper={paper}/>
      </div>
    </article>
  </li>;
}

function PublicationGroup({ papers, groupIndex, expanded, animated, onOpen, idPrefix }) {
  const groupRef = useRef(null);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!animated || entered) return undefined;
    if (typeof IntersectionObserver === 'undefined') { setEntered(true); return undefined; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setEntered(true); observer.disconnect(); }
    }, { rootMargin: '0px 0px -30px 0px', threshold: 0.08 });
    if (groupRef.current) observer.observe(groupRef.current);
    return () => observer.disconnect();
  }, [animated, entered]);

  return <ul ref={groupRef} className={`publication-deck__group${expanded ? ' is-expanded' : ''}${entered ? ' has-entered' : ''}`} aria-label={`Publications ${groupIndex * GROUP_SIZE + 1} to ${groupIndex * GROUP_SIZE + papers.length}`}>
    {papers.map((paper, slot) => <PublicationCard
      key={paper.id}
      paper={paper}
      index={groupIndex * GROUP_SIZE + slot}
      slot={slot}
      animated={animated}
      onOpen={(selected, trigger) => onOpen(selected, trigger, groupIndex)}
      titleId={`${idPrefix}-${paper.id}`}
    />)}
  </ul>;
}

export default function PublicationDeck({ publications = [], animated = true, theme = 'light' }) {
  const idPrefix = useId();
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const returnFocusRef = useRef(null);
  const [expandedGroups, setExpandedGroups] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const selected = publications.find(paper => paper.id === selectedId);
  const groups = Array.from({ length: Math.ceil(publications.length / GROUP_SIZE) }, (_, index) => publications.slice(index * GROUP_SIZE, (index + 1) * GROUP_SIZE));
  const allExpanded = !animated || groups.every((_, index) => expandedGroups.includes(index));
  const gridId = `${idPrefix}-cards`;
  const dialogTitleId = `${idPrefix}-dialog-title`;
  const dialogAuthorsId = `${idPrefix}-dialog-authors`;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!selected || !dialog) {
      if (dialog?.open) dialog.close();
      return undefined;
    }

    // A modal dialog makes the page inert, but does not lock its scrolling.
    // Keep the reader at the same card and compensate for the removed gutter.
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

  const openPaper = (paper, trigger, groupIndex) => {
    returnFocusRef.current = trigger;
    setExpandedGroups(current => current.includes(groupIndex) ? current : [...current, groupIndex]);
    setSelectedId(paper.id);
  };
  const closePaper = () => dialogRef.current?.close();
  const finishClose = () => {
    setSelectedId(null);
    if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus({ preventScroll: true });
  };

  if (!publications.length) return null;

  return <div className="publication-deck" data-theme={theme} data-animated={animated ? 'true' : 'false'}>
    <div className="publication-deck__toolbar">
      <p>Click a card to view</p>
      <button type="button" className="publication-deck__layout-toggle" aria-label="Expanded grid layout for all publications" aria-controls={gridId} aria-pressed={allExpanded} disabled={!animated} onClick={() => setExpandedGroups(allExpanded ? [] : groups.map((_, index) => index))}>
        <DeckIcon name={allExpanded && animated ? 'fan' : 'grid'} size={15}/>{allExpanded ? (animated ? 'Fan layout' : 'Grid view') : 'Expand all'}
      </button>
    </div>
    <div className="publication-deck__groups" id={gridId}>
      {groups.map((papers, index) => <PublicationGroup key={index} papers={papers} groupIndex={index} expanded={!animated || expandedGroups.includes(index)} animated={animated} onOpen={openPaper} idPrefix={idPrefix}/>)}
    </div>
    <dialog
      ref={dialogRef}
      className="publication-deck__dialog"
      aria-labelledby={dialogTitleId}
      aria-describedby={dialogAuthorsId}
      onCancel={event => { event.preventDefault(); closePaper(); }}
      onClose={finishClose}
      onClick={event => { if (event.target === event.currentTarget) closePaper(); }}
    >
      <div className="publication-deck__dialog-content">
        <button ref={closeRef} type="button" className="publication-deck__close" aria-label="Close publication" onClick={closePaper}><DeckIcon name="close" size={20}/></button>
        {selected && <>
          <figure className="publication-deck__large-image"><img src={`/images/optimized/${selected.id}.webp`} alt={selected.imageAlt}/></figure>
          <div className="publication-deck__dialog-body">
            <span className="publication-deck__venue">{selected.venue}</span>
            <h2 id={dialogTitleId}>{selected.title}</h2>
            <PaperAuthors authors={selected.authors} id={dialogAuthorsId}/>
            <PaperLinks paper={selected}/>
          </div>
        </>}
      </div>
    </dialog>
  </div>;
}
