import React, { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, ArrowLeft, Sun, Moon, GitBranch, GraduationCap, Menu, X, MoveUpRight, MoveHorizontal, Plus, Pause, Play, MessageCircle, Check } from 'lucide-react';
import TechText from './components/reactbits/TechText/TechText.jsx';
import ScrollStack, { ScrollStackItem } from './components/reactbits/ScrollStack/ScrollStack.jsx';
import Magnet from './components/reactbits/Magnet/Magnet.jsx';
import SpotlightCard from './components/reactbits/SpotlightCard/SpotlightCard.jsx';
import CanvasGuard from './components/graphics/CanvasGuard.jsx';
import { profile, publications, education, experience, news } from './data/profile.js';

const Lanyard = lazy(() => import('./components/reactbits/Lanyard/Lanyard.jsx'));
const LightRays = lazy(() => import('./components/reactbits/LightRays/LightRays.jsx'));
const FlexCarousel = lazy(() => import('./components/reactbits/FlexCarousel/FlexCarousel.jsx'));
const galleryItems = publications.map(p => ({ src: `/images/optimized/${p.id}.webp`, alt: p.imageAlt, title: p.shortTitle }));
const pad = n => String(n).padStart(2, '0');

function ExternalLink({ href, children, className = '', ...props }) {
  const external = /^https?:/.test(href);
  return <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>{children}</a>;
}

class VisualBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function StaticPortrait() {
  return <div className="static-portrait">
    <img src={profile.avatar} alt="Junhao Cheng Avatar" width="604" height="806" fetchPriority="high" />
  </div>;
}

function PaperDetail({ paper }) {
  return <div className="paper-detail">
    <div className="paper-detail-main" aria-live="polite" aria-atomic="true"><div className="paper-meta"><span className="venue-tag">{paper.venue}</span></div><h3>{paper.title}</h3><p className="paper-authors"><Authors authors={paper.authors}/></p></div>
    <div className="paper-detail-side"><PaperLinks links={paper.links}/></div>
  </div>;
}

function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span><span className="label-line" />{children}</p>;
}

function Authors({ authors }) {
  return <>{authors.map((name, index) => <React.Fragment key={`${name}-${index}`}>{index > 0 && ', '}{name === profile.name ? <strong>{name}</strong> : name}</React.Fragment>)}</>;
}

function PaperLinks({ links, small = false }) {
  return <div className={`paper-links${small ? ' paper-links--small' : ''}`}>{links.map(link => <ExternalLink key={link.label} href={link.url}>{link.label}<ArrowUpRight size={14} /></ExternalLink>)}</div>;
}

function JourneyEntry({ item }) {
  return <article className="journey-entry">
    <div className="organization-logo"><img src={item.image} alt={`${item.organization} logo`} width="58" height="58" loading="lazy" /></div>
    <div className="journey-entry-content">
      <p className="entry-period">{item.period}</p>
      <h4>{item.url ? <ExternalLink href={item.url}>{item.title}<ArrowUpRight size={15}/></ExternalLink> : item.title}</h4>
      {item.people.length > 0 && <p className="entry-people">{item.people[0].role}: {item.people.map((person, i) => <React.Fragment key={person.name}>{i > 0 && ', '}<ExternalLink href={person.url}>{person.name}</ExternalLink></React.Fragment>)}</p>}
    </div>
  </article>;
}

function NewsItem({ item }) {
  const text = item.text;
  const pieces = item.linkLabel ? text.split(item.linkLabel) : [text];
  return <li className="news-item"><time dateTime={item.date.replace('.', '-')}>{item.date}</time><p>{item.url ? <>{pieces[0]}<ExternalLink href={item.url}>{item.linkLabel}<ArrowUpRight size={13}/></ExternalLink>{pieces.slice(1).join(item.linkLabel)}</> : text}</p></li>;
}

function WeChatDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  return <dialog ref={dialogRef} className="wechat-dialog" aria-labelledby="wechat-title" onClose={onClose} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="wechat-dialog-content">
      <button className="icon-button dialog-close" type="button" aria-label="Close WeChat dialog" onClick={onClose}><X size={19}/></button>
      <p className="eyebrow">LET’S CONNECT</p>
      <h2 id="wechat-title">Find me on WeChat.</h2>
      <img src={profile.wechatQr} alt="Scan this QR code to add Junhao Cheng on WeChat" width="250" height="250" loading="lazy"/>
      <p>Scan to say hello.</p>
      <button className="button button-dark" onClick={onClose} type="button">Done <Check size={16}/></button>
    </div>
  </dialog>;
}

export default function App() {
  const [theme, setTheme] = useState('light');
  const [motion, setMotion] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [activePaper, setActivePaper] = useState(0);
  const [galleryNear, setGalleryNear] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const carouselHost = useRef(null);
  const motionPreferenceRef = useRef(null);
  const researchRef = useRef(null);
  const archiveRef = useRef(null);
  const paper = publications[activePaper];
  const animated = ready && motion;
  const gpu = animated && webgl;

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    let preference = null;
    try { preference = localStorage.getItem('junhao-motion'); } catch { /* Storage is optional. */ }
    motionPreferenceRef.current = preference;
    setMotion(preference ? preference === 'on' : !media.matches);
    const onChange = event => { if (!motionPreferenceRef.current) setMotion(!event.matches); };
    media.addEventListener('change', onChange);
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2', { powerPreference: 'low-power' });
      setWebgl(Boolean(gl));
      gl?.getExtension('WEBGL_lose_context')?.loseContext();
    } catch { setWebgl(false); }
    setReady(true);
    return () => media.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setGalleryNear(true); observer.disconnect(); }
    }, { rootMargin: '350px' });
    if (researchRef.current) observer.observe(researchRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-18% 0px -60% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const escape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#131713' : '#f6f5ef');
    try { localStorage.setItem('junhao-theme', next); } catch { /* Keep the in-memory preference. */ }
  };
  const toggleMotion = () => {
    const next = !motion;
    motionPreferenceRef.current = next ? 'on' : 'off';
    setMotion(next);
    try { localStorage.setItem('junhao-motion', next ? 'on' : 'off'); } catch { /* Optional persistence. */ }
  };
  const onWebglUnavailable = useCallback(() => setWebgl(false), []);
  const onPaperChange = useCallback(index => setActivePaper(index), []);
  const sendCarouselKey = key => {
    const carousel = carouselHost.current?.querySelector('.flex-carousel');
    if (!carousel) return false;
    // Use the official component's existing keyboard interaction unchanged.
    carousel.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
    return true;
  };
  const selectPaper = index => {
    const next = (index + publications.length) % publications.length;
    if (gpu && galleryNear && sendCarouselKey('Home')) {
      for (let step = 0; step < next; step++) sendCarouselKey('ArrowRight');
    } else {
      setActivePaper(next);
    }
  };
  const navigatePaper = delta => {
    if (!(gpu && galleryNear && sendCarouselKey(delta > 0 ? 'ArrowRight' : 'ArrowLeft'))) {
      setActivePaper(index => (index + delta + publications.length) % publications.length);
    }
  };
  const goToPaper = index => {
    selectPaper(index);
    document.getElementById('research')?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant' });
  };

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header">
      <div className="header-inner page-width">
        <a className="brand" href="#top" aria-label="Junhao Cheng, back to top"><span className="brand-mark" aria-hidden="true">jc<span>✳</span></span><span className="brand-label">JUNHAO CHENG<span>MPHIL IN COMPUTER SCIENCE</span></span></a>
        <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          {[['about', 'About'], ['research', 'Research'], ['journey', 'Journey'], ['contact', 'Contact']].map(([id, label]) => <a key={id} className={activeSection === id ? 'active' : ''} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="header-controls">
          <button className="theme-toggle icon-button" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button>
          <button className="mobile-menu icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button>
        </div>
      </div>
    </header>

    <main id="main">
      <section className="hero page-width" id="top" aria-labelledby="hero-name">
        <div className="hero-rays" aria-hidden="true">{gpu && <VisualBoundary fallback={null}><Suspense fallback={null}><CanvasGuard onUnavailable={onWebglUnavailable}><LightRays lightMode={theme === 'light'}/></CanvasGuard></Suspense></VisualBoundary>}</div>
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow"><span className="status-dot"/> CITY UNIVERSITY OF HONG KONG</p>
          <h1 className="hero-name" id="hero-name"><span className="sr-only">Junhao Cheng</span><span aria-hidden="true" className="name-visual">{animated ? <TechText text="Junhao Cheng"/> : <span className="name-static">Junhao Cheng</span>}</span></h1>
          <p className="hero-identity"><span lang="zh-CN">程钧豪</span><span className="identity-divider"/>MPhil in Computer Science</p>
          <p className="hero-description"><em>Interactive AI</em><br/>video reasoning and generation</p>
          <div className="hero-actions">
            <Magnet disabled={!animated}><a className="button button-dark" href="#research">Explore my research <ArrowDown size={17}/></a></Magnet>
            <ExternalLink className="text-link" href={profile.scholarUrl}>Google Scholar <ArrowUpRight size={16}/></ExternalLink>
          </div>
        </div>
        <div className="hero-portrait">
          <span className="portrait-corner top-left" aria-hidden="true"/><span className="portrait-corner bottom-right" aria-hidden="true"/>
          <div className="portrait-annotation"><span>JUNHAO CHENG</span><span>MPHIL IN COMPUTER SCIENCE</span></div>
          <div className="lanyard-stage" role="img" aria-label="Junhao Cheng’s photo on an interactive lanyard">{gpu ? <VisualBoundary fallback={<StaticPortrait/>}><Suspense fallback={<StaticPortrait/>}><CanvasGuard fallback={<StaticPortrait/>} onUnavailable={onWebglUnavailable}><Lanyard frontImage={profile.avatar} backImage={profile.avatar} strapImage="/images/react-bits/lanyard.png"/></CanvasGuard></Suspense></VisualBoundary> : <StaticPortrait/>}</div>
          <div className="portrait-footer"><span className="portrait-caption"><span className="status-dot"/> CITY UNIVERSITY OF HONG KONG</span><span className="drag-hint">{gpu ? <><MoveHorizontal size={16}/> Drag. Swing. Explore.</> : 'VIDEO REASONING & GENERATION'}</span></div>
        </div>
        <div className="hero-bottom"><span>INTERACTIVE AI · VIDEO REASONING AND GENERATION</span><a href="#about">A little about me <ArrowDown size={15}/></a><span className="hero-coordinate">SHENZHEN, GUANGDONG, CHINA</span></div>
      </section>

      <section className="about-section page-width section-space" id="about" aria-labelledby="about-heading">
        <div className="about-label"><SectionLabel number="01">ABOUT ME</SectionLabel></div>
        <div className="about-main">
          <h2 id="about-heading" className="editorial-heading">About <em>me</em></h2>
          <div className="about-text"><p>My name is <strong>Junhao Cheng (程钧豪)</strong>, currently an MPhil student at CityUHK. I received my bachelor's degree from Sun Yat-sen University (SYSU) in 2025, where I was fortunate to be supervised by Prof. <ExternalLink href={profile.people[0].url}>Xiaodan Liang</ExternalLink>. And I spent a wonderful year as a research intern at <ExternalLink href={profile.affiliations[0].url}>Tencent ARC Lab</ExternalLink>. I also had the opportunity to work with Prof. <ExternalLink href={profile.people[1].url}>Ming-Hsuan Yang</ExternalLink>.</p><p>I am currently a research intern at the <ExternalLink href={profile.affiliations[1].url}>Kuaishou Kling team</ExternalLink>. My research interests lie in <strong>Interactive AI</strong>, particularly foundation models and novel applications for <strong>video reasoning and generation</strong>.</p></div>
          <div className="research-topics">{['Video reasoning', 'Video generation', 'Interactive AI'].map((topic, index) => <span key={topic}><span className="topic-number">0{index+1}</span>{topic}</span>)}</div>
          <a className="opportunity-note" href="#contact"><span className="status-dot"/><span>I am currently seeking <strong>Industry Roles or Startup Opportunities</strong> (graduating Fall 2027). I’d be happy to connect via WeChat or Email.</span><ArrowUpRight size={19}/></a>
        </div>
      </section>

      <section className="research-section section-space" id="research" ref={researchRef} aria-labelledby="research-heading">
        <div className="page-width">
          <SectionLabel number="02">PUBLICATIONS</SectionLabel>
          <div className="section-heading-row"><h2 className="editorial-heading" id="research-heading">Selected <em>Publications</em></h2><div className="research-heading-aside"><button type="button" className="text-link" onClick={() => { archiveRef.current.open = true; archiveRef.current.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'start' }); }}>All publications <span className="small-count">{pad(publications.length)}</span><ArrowDown size={14}/></button></div></div>
        </div>
        <div className="research-gallery-wrap">
          <div className="research-gallery" ref={carouselHost} aria-label="Publication image gallery">
            {gpu && galleryNear ? <VisualBoundary fallback={<div className="static-paper"><img src={galleryItems[activePaper].src} alt={paper.imageAlt}/></div>}><Suspense fallback={<div className="static-paper"><img src={galleryItems[activePaper].src} alt={paper.imageAlt} loading="lazy"/></div>}><CanvasGuard fallback={<div className="static-paper"><img src={galleryItems[activePaper].src} alt={paper.imageAlt}/></div>} onUnavailable={onWebglUnavailable}><FlexCarousel items={galleryItems} onChange={onPaperChange} onSelect={onPaperChange}/></CanvasGuard></Suspense></VisualBoundary> : <div className="static-paper"><img src={galleryItems[activePaper].src} alt={paper.imageAlt} loading="lazy" width="1200" height="680"/></div>}
          </div>
        </div>
        <div className="page-width">
          <div className="gallery-toolbar"><span><span className="gallery-current">{pad(activePaper + 1)}</span><span className="gallery-total"> / {pad(publications.length)}</span><span className="gallery-instruction">{gpu ? 'DRAG TO DISCOVER' : 'EXPLORE THE PAPERS'}</span></span><div className="gallery-dots" aria-label="Choose a publication">{publications.map((item, index) => <button key={item.id} type="button" aria-label={`Show ${item.shortTitle}`} aria-pressed={activePaper === index} className={activePaper === index ? 'active' : ''} onClick={() => selectPaper(index)}/>)}</div><div className="gallery-arrows"><button className="icon-button" type="button" aria-label="Previous publication" onClick={() => navigatePaper(-1)}><ArrowLeft size={19}/></button><button className="icon-button" type="button" aria-label="Next publication" onClick={() => navigatePaper(1)}><ArrowRight size={19}/></button></div></div>
          <div className="paper-detail-shell">{animated ? <SpotlightCard theme={theme}><PaperDetail paper={paper}/></SpotlightCard> : <div className="paper-detail-static"><PaperDetail paper={paper}/></div>}</div>
          <details className="publication-archive" ref={archiveRef}><summary><span>Publication index <span className="small-count">{pad(publications.length)}</span></span><Plus size={20}/></summary><div className="publication-list">{publications.map((item, index) => <article key={item.id} className="publication-row"><span className="publication-number">{pad(index + 1)}</span><button type="button" className="publication-thumbnail" onClick={() => goToPaper(index)} aria-label={`View ${item.shortTitle} in the gallery`}><img src={galleryItems[index].src} alt={item.imageAlt} loading="lazy" width="170" height="108"/></button><div className="publication-row-content"><span className="publication-venue">{item.venue}</span><h3><ExternalLink href={item.links[0].url}>{item.title}</ExternalLink></h3><p><Authors authors={item.authors}/></p><PaperLinks links={item.links} small/></div></article>)}</div></details>
        </div>
      </section>

      <section className="journey-section page-width section-space" id="journey" aria-labelledby="journey-heading">
        <div className="journey-intro"><SectionLabel number="03">EDUCATION & INTERNSHIPS</SectionLabel><h2 className="editorial-heading" id="journey-heading">Education<br/>& <em>Internships</em></h2><span className="journey-scroll-note"><ArrowDown size={16}/> EDUCATION & EXPERIENCE</span></div>
        <div className={animated ? 'journey-stack' : 'journey-static'}>
          {animated ? <ScrollStack itemDistance={40} itemStackDistance={22} stackPosition="12%" itemScale={0.05} baseScale={0.8} dimAmount={0.25} smoothScroll snap={false}>
            {[...education, ...experience].map((item, index) => <ScrollStackItem key={item.id}><div className="journey-card-heading"><h3>{index < education.length ? 'Education' : 'Internships'}</h3><span>{pad(index + 1)}</span></div><JourneyEntry item={item}/></ScrollStackItem>)}
          </ScrollStack> : [...education, ...experience].map((item, index) => <div className="journey-static-card" key={item.id}><div className="journey-card-heading"><h3>{index < education.length ? 'Education' : 'Internships'}</h3><span>{pad(index + 1)}</span></div><JourneyEntry item={item}/></div>)}
        </div>
      </section>

      <section className="notes-section page-width section-space" id="notes" aria-labelledby="news-heading"><div className="notes-intro"><SectionLabel number="04">UPDATES</SectionLabel><h2 className="editorial-heading" id="news-heading">News</h2></div><div className="news-main"><ul className="news-list">{news.slice(0,4).map((item, i) => <NewsItem key={i} item={item}/>)}</ul><details className="news-archive"><summary>Earlier updates <Plus size={16}/></summary><ul className="news-list">{news.slice(4).map((item, i) => <NewsItem key={i} item={item}/>)}</ul></details></div></section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><div className="page-width contact-inner"><div><SectionLabel number="05">LET’S CONNECT</SectionLabel><h2 className="editorial-heading" id="contact-heading">Get in <em>touch</em></h2><p>I’d be happy to connect via WeChat or Email.</p></div><div className="contact-actions"><Magnet disabled={!animated}><a className="contact-email" href={`mailto:${profile.email}`}><span>Say hello<span>{profile.email}</span></span><ArrowUpRight size={36} strokeWidth={1.3}/></a></Magnet><div className="contact-links"><ExternalLink href={profile.scholarUrl}><GraduationCap size={17}/>Scholar<ArrowUpRight size={13}/></ExternalLink><ExternalLink href={profile.githubUrl}><GitBranch size={16}/>GitHub<ArrowUpRight size={13}/></ExternalLink><button type="button" onClick={() => setWechatOpen(true)}><MessageCircle size={16}/>WeChat<Plus size={13}/></button></div></div></div></section>
    </main>

    <footer className="site-footer page-width"><span>© 2025 Junhao Cheng <span lang="zh-CN">程钧豪</span></span><div><button type="button" className="motion-toggle" aria-pressed={motion} onClick={toggleMotion}>{motion ? <Pause size={12}/> : <Play size={12}/>}Motion {motion ? 'on' : 'off'}</button><a href="/legacy.html">Classic version <ArrowUpRight size={12}/></a><a href="#top" aria-label="Back to top">Back to top <MoveUpRight size={13}/></a></div></footer>
    <WeChatDialog open={wechatOpen} onClose={() => setWechatOpen(false)}/>
  </>;
}
