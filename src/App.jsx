import React, { Component, Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ArrowDown, Sun, Moon, GitBranch, GraduationCap, Menu, X, MoveUpRight, MoveHorizontal, Pause, Play, MessageCircle, Mail, MapPin, RotateCcw } from 'lucide-react';
import TechText from './components/reactbits/TechText/TechText.jsx';
import TearTicket from './components/reactbits/TearTicket/TearTicket.jsx';
import Magnet from './components/reactbits/Magnet/Magnet.jsx';
import CanvasGuard from './components/graphics/CanvasGuard.jsx';
import PublicationDeck from './components/PublicationDeck.jsx';
import { profile, publications, education, experience, news } from './data/profile.js';

const Lanyard = lazy(() => import('./components/ThemedLanyard.jsx'));
const LightRays = lazy(() => import('./components/reactbits/LightRays/LightRays.jsx'));
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
  const [showBack, setShowBack] = useState(false);
  return <button className="static-portrait" type="button" onClick={() => setShowBack(value => !value)} aria-label={`Show ${showBack ? 'front' : 'back'} portrait`} title="Click to switch photo"><img src={showBack ? profile.avatarBack : profile.avatar} alt={`Junhao Cheng portrait, ${showBack ? 'back' : 'front'} of badge`} width="604" height="806" fetchPriority="high" /></button>;
}

function Biography() {
  return <div className="about-text" data-content="biography">
    <p>My name is <strong>Junhao Cheng (程钧豪)</strong>, currently an MPhil student at CityUHK. I received my bachelor's degree from Sun Yat-sen University (SYSU) in 2025, where I was fortunate to be supervised by Prof. <ExternalLink href={profile.people[0].url}>Xiaodan Liang</ExternalLink>. And I spent a wonderful year as a research intern at <ExternalLink href={profile.affiliations[0].url}>Tencent ARC Lab</ExternalLink>. I also had the opportunity to work with Prof. <ExternalLink href={profile.people[1].url}>Ming-Hsuan Yang</ExternalLink>.</p>
    <p>I am currently a research intern at the <ExternalLink href={profile.affiliations[1].url}>Kuaishou Kling team</ExternalLink>. My research interests lie in <strong>Interactive AI</strong>, particularly foundation models and novel applications for <strong>video reasoning and generation</strong>.</p>
  </div>;
}

function SectionHeading({ id, children }) {
  return <div className="section-heading">
    <div className="section-title"><h2 id={id}>{children}</h2></div>
    <span className="section-rule" aria-hidden="true" />
  </div>;
}

function ExperienceContent({ item, staticImage = false, educationEntry = false, torn = false }) {
  const at = item.title.indexOf('@');
  const title = educationEntry && at >= 0 ? <>{item.title.slice(0, at + 1)}{' '}<br/>{item.title.slice(at + 1).trimStart()}</> : item.title;
  return <div className="ticket-content">
    <div className="ticket-topline">{staticImage && <img className="organization-logo" src={item.image} alt={`${item.organization} logo`} width="92" height="92" loading="lazy" />}</div>
    <h3>{item.url ? <ExternalLink href={item.url}>{title}<ArrowUpRight size={15}/></ExternalLink> : title}</h3>
    {torn && <span className="sr-only">{item.period}</span>}
    {item.people.length > 0 && <p className="entry-people">{item.people[0].role}: {item.people.map((person, i) => <React.Fragment key={person.name}>{i > 0 && ', '}<ExternalLink href={person.url}>{person.name}</ExternalLink></React.Fragment>)}</p>}
  </div>;
}

function ExperienceTicket({ item, index, animated, theme, educationEntry = false }) {
  const [torn, setTorn] = useState(false);
  const ticketRef = useRef(null);
  useEffect(() => { if (!animated) setTorn(false); }, [animated]);
  const restoreTicket = () => {
    setTorn(false);
    requestAnimationFrame(() => ticketRef.current?.querySelector('.tear-ticket__piece--stub')?.focus({ preventScroll: true }));
  };
  const stub = <div className="ticket-stub-content"><span className="stub-number" aria-hidden="true">{pad(index + 1)}</span><span className="stub-period">{item.period}</span><span className="stub-barcode" aria-hidden="true"/></div>;
  return <article className="experience-ticket" data-kind={educationEntry ? 'education' : 'internship'} ref={ticketRef}>
    {animated ? <TearTicket width={286} height={286} stubSize={48} radius={16} rotate={0} image={item.image} imageAlt={`${item.organization} logo`} scrim={false} imageRadius={12} background={theme === 'light' ? '#ffffff' : '#1b1c20'} color={theme === 'light' ? '#191a1e' : '#f4f4f5'} borderColor={theme === 'light' ? '#dfe1e7' : '#3b3e47'} stubBackground={theme === 'light' ? '#f4f5f8' : '#262831'} torn={torn} onTear={() => setTorn(true)} ariaLabel={`Tear the ${item.organization} ticket stub, ${item.period}`} stub={stub}><ExperienceContent item={item} educationEntry={educationEntry} torn={torn}/></TearTicket> : <div className="ticket-static"><div className="ticket-static-main"><ExperienceContent item={item} educationEntry={educationEntry} staticImage/></div><div className="ticket-static-stub">{stub}</div></div>}
    {torn && <div className="ticket-footer"><button type="button" onClick={restoreTicket} aria-label={`Restore ${item.organization} ticket`}><RotateCcw size={13}/>Restore ticket</button></div>}
  </article>;
}

function NewsItem({ item }) {
  const pieces = item.linkLabel ? item.text.split(item.linkLabel) : [item.text];
  return <li className="news-item"><time dateTime={item.date.replace('.', '-')}>{item.date}</time><p>{item.url ? <>{pieces[0]}<ExternalLink href={item.url}>{item.linkLabel}</ExternalLink>{pieces.slice(1).join(item.linkLabel)}</> : item.text}</p></li>;
}

function ContactMotion({ children, animated }) {
  // The outer hit area never moves. A small, shared pull keeps adjacent links
  // clickable and avoids stacking a CSS translate over the official spring.
  return <Magnet disabled={!animated} padding={10} magnetStrength={5} maxOffset={3} wrapperClassName="contact-magnet" innerClassName="contact-magnet-inner">{children}</Magnet>;
}

function WeChatDialog({ open, onClose }) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    const root = document.documentElement;
    const body = document.body;
    const previous = { rootOverflow: root.style.overflow, overflow: body.style.overflow, paddingRight: body.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar > 0) body.style.paddingRight = `${parseFloat(getComputedStyle(body).paddingRight || '0') + scrollbar}px`;
    root.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous.rootOverflow;
      body.style.overflow = previous.overflow;
      body.style.paddingRight = previous.paddingRight;
    };
  }, [open]);
  return <dialog ref={dialogRef} className="wechat-dialog" aria-labelledby="wechat-title" onClose={onClose} onCancel={onClose} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
    <div className="wechat-dialog-content"><button className="icon-button dialog-close" type="button" aria-label="Close WeChat dialog" onClick={onClose}><X size={20}/></button><h2 id="wechat-title">WeChat</h2><img src={profile.wechatQr} alt="WeChat QR Code" width="250" height="250" loading="lazy"/><p>Scan to add me on WeChat</p><button className="button" type="button" onClick={onClose}>Close</button></div>
  </dialog>;
}

export default function App() {
  // Every visit starts in dark mode, independently of an earlier or OS theme.
  const [theme, setTheme] = useState('dark');
  const [motion, setMotion] = useState(false);
  const [webgl, setWebgl] = useState(false);
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wechatOpen, setWechatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const motionPreferenceRef = useRef(null);
  const animated = ready && motion;
  const gpu = animated && webgl;

  useEffect(() => {
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

  useEffect(() => { document.documentElement.dataset.motion = motion ? 'on' : 'off'; }, [motion]);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111215' : '#ffffff');
  }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { rootMargin: '-12% 0px -62% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const escape = event => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, []);

  const toggleMotion = () => {
    const next = !motion;
    motionPreferenceRef.current = next ? 'on' : 'off';
    setMotion(next);
    try { localStorage.setItem('junhao-motion', next ? 'on' : 'off'); } catch { /* Optional persistence. */ }
  };
  const onWebglUnavailable = useCallback(() => setWebgl(false), []);

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <div className={`site-rays${gpu ? ' has-webgl' : ''}`} aria-hidden="true">{gpu && <VisualBoundary fallback={null}><Suspense fallback={null}><CanvasGuard onUnavailable={onWebglUnavailable}><LightRays lightMode={theme === 'light'}/></CanvasGuard></Suspense></VisualBoundary>}</div>
    <header className="site-header"><div className="header-inner page-width">
      <a className="brand" href="#top" aria-label="HOWE, back to top">HOWE<span className="brand-dot" aria-hidden="true"/></a>
      <nav id="main-navigation" aria-label="Main navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>{[['top','About'],['notes','News'],['education','Education'],['internships','Internships'],['research','Publications']].map(([id,label]) => <a key={id} href={`#${id}`} className={activeSection === id ? 'active' : ''} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>
      <div className="header-controls"><button className="theme-toggle icon-button" type="button" onClick={() => setTheme(value => value === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}>{theme === 'light' ? <Moon size={18}/> : <Sun size={18}/>}</button><button className="mobile-menu icon-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20}/> : <Menu size={20}/>}</button></div>
    </div></header>

    <main id="main">
      <section className="hero page-width" id="top" aria-labelledby="hero-name">
        <div className="hero-portrait"><div className="lanyard-stage" role="group" aria-label="Junhao Cheng’s two-sided interactive portrait badge">{gpu ? <VisualBoundary fallback={<StaticPortrait/>}><Suspense fallback={<StaticPortrait/>}><Lanyard frontImage={profile.avatar} backImage={profile.avatarBack} theme={theme} fallback={<StaticPortrait/>} onUnavailable={onWebglUnavailable}/></Suspense></VisualBoundary> : <StaticPortrait/>}</div><div className="portrait-meta"><span><GraduationCap size={15}/>{profile.institution}</span><span><MapPin size={14}/>{profile.location}</span>{gpu && <span className="portrait-interaction"><MoveHorizontal size={14}/>Click to flip · Drag to interact</span>}</div></div>
        <div className="hero-copy" id="about">
          <h1 id="hero-name" className="hero-name"><span className="sr-only">Junhao Cheng (程钧豪)</span><span className="name-visual name-en" aria-hidden="true">{animated ? <TechText text={profile.name} align="left"/> : <span className="name-static">{profile.name}</span>}</span><span className="name-visual name-cn" aria-hidden="true" lang="zh-CN">{animated ? <TechText text={profile.nameCn} align="left" fontSize={86} letterSpacing={0.02} fontFamily='"PingFang SC", "Microsoft YaHei", "Noto Sans CJK SC", sans-serif'/> : <span className="name-static">{profile.nameCn}</span>}</span></h1>
          <Biography/>
          <a className="opportunity-note" data-content="opportunity" href="#contact"><span className="opportunity-signal" aria-hidden="true"/><span>I am currently seeking <strong>Industry Roles or Startup Opportunities</strong> (graduating Fall 2027). I’d be happy to connect via WeChat or Email.</span><ArrowUpRight size={19}/></a>
          <div id="contact" className="hero-contact" aria-label="Contact Junhao Cheng"><ContactMotion animated={animated}><a className="contact-link contact-email" href={`mailto:${profile.email}`}><Mail size={16}/>{profile.email}<ArrowUpRight size={14}/></a></ContactMotion><ContactMotion animated={animated}><ExternalLink className="contact-link" href={profile.scholarUrl}><GraduationCap size={17}/>Scholar<ArrowUpRight size={13}/></ExternalLink></ContactMotion><ContactMotion animated={animated}><ExternalLink className="contact-link" href={profile.githubUrl}><GitBranch size={16}/>GitHub<ArrowUpRight size={13}/></ExternalLink></ContactMotion><ContactMotion animated={animated}><button className="contact-link" type="button" onClick={() => setWechatOpen(true)}><MessageCircle size={16}/>WeChat</button></ContactMotion></div>
        </div>
        <div className="hero-bottom"><span>INTERACTIVE AI · VIDEO REASONING AND GENERATION</span><a href="#education">Education & Internships<ArrowDown size={14}/></a></div>
      </section>

      <section className="news-section page-width" id="notes" aria-labelledby="news-heading"><SectionHeading id="news-heading">News</SectionHeading><div className="news-layout" data-content="news-scroll" tabIndex={0} role="region" aria-label="News updates"><ul className="news-list">{news.map((item,i) => <NewsItem key={i} item={item}/>)}</ul></div></section>

      <section className="experience-section page-width" id="education" aria-labelledby="education-heading"><SectionHeading id="education-heading">Education</SectionHeading><div className="ticket-grid">{education.map((item,index) => <ExperienceTicket key={item.id} item={item} index={index} animated={animated} theme={theme} educationEntry/>)}</div></section>

      <section className="experience-section page-width" id="internships" aria-labelledby="internships-heading"><SectionHeading id="internships-heading">Internships</SectionHeading><div className="ticket-grid">{experience.map((item,index) => <ExperienceTicket key={item.id} item={item} index={index} animated={animated} theme={theme}/>)}</div></section>

      <section className="research-section page-width" id="research" aria-labelledby="research-heading"><SectionHeading id="research-heading">Selected Publications</SectionHeading><PublicationDeck publications={publications} animated={animated} theme={theme}/></section>
    </main>

    <footer className="site-footer page-width"><a href="#top" className="footer-brand">HOWE</a><span>© 2025 Junhao Cheng <span lang="zh-CN">程钧豪</span></span><div><button type="button" className="motion-toggle" aria-pressed={motion} onClick={toggleMotion}>{motion ? <Pause size={12}/> : <Play size={12}/>}Motion {motion ? 'on' : 'off'}</button><a href="/legacy.html">Classic version<ArrowUpRight size={12}/></a><a href="#top" aria-label="Back to top">Back to top<MoveUpRight size={13}/></a></div></footer>
    <WeChatDialog open={wechatOpen} onClose={() => setWechatOpen(false)}/>
  </>;
}
