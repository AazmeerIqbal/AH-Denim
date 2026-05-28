// import { useEffect, useRef, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';

// const STYLES = [
//   {
//     num: '01',
//     label: 'Vintage Wash',
//     sublabel: 'Heritage',
//     description: 'A timeless look achieved through expert distressing and stonewashing techniques, bringing out the authentic character of premium denim.',
//     image: '/images/vintage wash.jpeg',
//     accent: 'rgba(200,165,100,0.85)',
//   },
//   {
//     num: '02',
//     label: 'Black Resin',
//     sublabel: 'Refined',
//     description: 'Deep, rich black denim coated with a sleek resin finish for a refined, premium feel that effortlessly transitions from day to night.',
//     image: '/images/Black Resin.png',
//     accent: 'rgba(147,197,253,0.85)',
//   },
//   {
//     num: '03',
//     label: 'Utility Denim',
//     sublabel: 'Functional',
//     description: 'Functional and durable, featuring reinforced stitching and practical cargo pockets built for the modern explorer.',
//     image: '/images/Utility Denim.png',
//     accent: 'rgba(120,190,145,0.85)',
//   },
//   {
//     num: '04',
//     label: 'Coated Finish',
//     sublabel: 'Bold',
//     description: 'A subtle waxed appearance that adds an edgy, leather-like texture to the denim, offering a bold statement.',
//     image: '/images/Coated Finish.jpeg',
//     accent: 'rgba(210,170,120,0.85)',
//   },
//   {
//     num: '05',
//     label: 'Overdyed Look',
//     sublabel: 'Intense',
//     description: 'Intense, saturated color profiles created by over-dyeing premium indigo fabrics, resulting in unparalleled depth.',
//     image: '/images/Overdyed Look.jpg',
//     accent: 'rgba(147,197,253,0.85)',
//   },
// ];

// const StylesSection = () => {
//   const [active, setActive] = useState(0);
//   const [prev, setPrev] = useState<number | null>(null);
//   const [sectionVisible, setSectionVisible] = useState(false);

//   const sectionRef = useRef<HTMLElement>(null);
//   const activeRef = useRef(active);

//   useEffect(() => { activeRef.current = active; }, [active]);

//   /* ── Native scroll mapping ── */
//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;
//       const { top, height } = sectionRef.current.getBoundingClientRect();
//       const windowHeight = window.innerHeight;

//       // Ensure we don't divide by zero
//       const scrollableDistance = Math.max(1, height - windowHeight);
//       const scrolled = -top;

//       let progress = scrolled / scrollableDistance;
//       progress = Math.max(0, Math.min(1, progress));

//       const newActive = Math.min(STYLES.length - 1, Math.floor(progress * STYLES.length));

//       setActive((currentActive) => {
//         if (currentActive !== newActive) {
//           setPrev(currentActive);
//           return newActive;
//         }
//         return currentActive;
//       });

//       // Update visibility 
//       setSectionVisible(top < windowHeight * 0.8 && top > -height);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   /* ── Advance / go back slide via native scroll ── */
//   const goTo = useCallback((idx: number) => {
//     if (!sectionRef.current) return;
//     const windowHeight = window.innerHeight;
//     const height = sectionRef.current.offsetHeight;
//     const scrollableDistance = height - windowHeight;

//     // Target progress for the middle of the segment
//     const targetProgress = (idx + 0.5) / STYLES.length;
//     const targetY = sectionRef.current.offsetTop + targetProgress * scrollableDistance;

//     window.scrollTo({ top: targetY, behavior: 'smooth' });
//   }, []);

//   const goNext = useCallback(() => {
//     if (activeRef.current < STYLES.length - 1) {
//       goTo(activeRef.current + 1);
//     }
//   }, [goTo]);

//   const goPrev = useCallback(() => {
//     if (activeRef.current > 0) {
//       goTo(activeRef.current - 1);
//     }
//   }, [goTo]);

//   /* ── Keyboard ── */
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       // Only capture keyboard if section is visible
//       if (!sectionVisible) return;
//       if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
//       if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
//     };
//     window.addEventListener('keydown', onKey);
//     return () => window.removeEventListener('keydown', onKey);
//   }, [goNext, goPrev, sectionVisible]);

//   const current = STYLES[active];
//   const prevSlide = prev !== null ? STYLES[prev] : null;
//   const isLast = active === STYLES.length - 1;

//   return (
//     <section
//       ref={sectionRef}
//       style={{
//         position: 'relative',
//         width: '100%',
//         height: `${STYLES.length * 100}vh`,
//         backgroundColor: '#030b13',
//       }}
//     >
//       <div style={{
//         position: 'sticky',
//         top: 0,
//         height: '100vh',
//         overflow: 'hidden',
//         display: 'flex',
//         flexDirection: 'column',
//         width: '100%'
//       }}>
//         {/* ── BACKGROUND IMAGE: outgoing ── */}
//         {prevSlide && (
//           <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'imgFadeOut 0.9s ease forwards' }}>
//             <img
//               src={prevSlide.image}
//               alt=""
//               style={{
//                 width: '100%', height: '100%', objectFit: 'cover',
//                 filter: 'brightness(0.52) contrast(1.08)',
//               }}
//             />
//           </div>
//         )}

//         {/* ── BACKGROUND IMAGE: incoming ── */}
//         <div
//           key={`bg-${active}`}
//           style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'imgFadeIn 1.1s cubic-bezier(0.22,1,0.36,1) forwards' }}
//         >
//           <img
//             src={current.image}
//             alt={current.label}
//             style={{
//               width: '100%', height: '100%', objectFit: 'cover',
//               filter: 'brightness(0.5) contrast(1.1) saturate(0.9)',
//             }}
//           />
//         </div>

//         {/* Overlay gradients */}
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
//           background: 'linear-gradient(to right, rgba(3,11,19,0.95) 0%, rgba(3,11,19,0.65) 45%, rgba(3,11,19,0.15) 100%)'
//         }} />
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
//           background: 'linear-gradient(to top, rgba(3,11,19,0.98) 0%, transparent 35%)'
//         }} />
//         <div style={{
//           position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
//           background: 'linear-gradient(to bottom, rgba(3,11,19,0.95) 0%, transparent 22%)'
//         }} />

//         {/* Accent color glow */}
//         <div
//           key={`glow-${active}`}
//           style={{
//             position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
//             background: `radial-gradient(ellipse 55% 55% at 72% 50%, ${current.accent.replace('0.85', '0.07')} 0%, transparent 70%)`,
//             animation: 'glowIn 1.2s ease forwards',
//           }}
//         />

//         {/* ── SCROLL HINT: "end of slider" nudge ── */}
//         {isLast && (
//           <div style={{
//             position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)',
//             zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
//             animation: 'fadeUp 0.6s ease forwards',
//           }}>
//             <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
//               Scroll to continue
//             </span>
//             <div style={{
//               width: '1px', height: '28px',
//               background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
//               animation: 'scrollPulse 1.5s ease-in-out infinite',
//             }} />
//           </div>
//         )}

//         {/* ── MAIN CONTENT ── */}
//         <div
//           style={{
//             position: 'relative', zIndex: 10, height: '100%',
//             display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
//             padding: 'clamp(1rem,3vh,3rem) clamp(1.5rem,5vw,5rem)',
//             opacity: sectionVisible ? 1 : 0,
//             transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
//             transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
//           }}
//         >
//           {/* TOP ROW */}
//           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
//             <div>
//               <p style={{ color: 'rgba(147,197,253,0.55)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 400, marginBottom: '0.3rem' }}>
//                 Explore Our Styles
//               </p>
//               <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 300 }}>
//                 {active + 1} / {STYLES.length}
//               </p>
//             </div>

//             {/* Arrow buttons */}
//             <div style={{ display: 'flex', gap: '0.75rem' }}>
//               {([['←', () => goPrev()], ['→', () => goNext()]] as const).map(([label, action]) => (
//                 <button
//                   key={label}
//                   onClick={() => action()}
//                   style={{
//                     width: '44px', height: '44px', borderRadius: '50%',
//                     border: '1px solid rgba(255,255,255,0.15)',
//                     background: 'rgba(255,255,255,0.04)',
//                     color: 'rgba(255,255,255,0.7)',
//                     fontSize: '1rem', cursor: 'pointer',
//                     display: 'flex', alignItems: 'center', justifyContent: 'center',
//                     backdropFilter: 'blur(8px)',
//                     transition: 'all 0.25s ease',
//                   }}
//                   onMouseEnter={e => {
//                     const b = e.currentTarget as HTMLButtonElement;
//                     b.style.borderColor = current.accent;
//                     b.style.color = '#fff';
//                     b.style.background = 'rgba(255,255,255,0.08)';
//                   }}
//                   onMouseLeave={e => {
//                     const b = e.currentTarget as HTMLButtonElement;
//                     b.style.borderColor = 'rgba(255,255,255,0.15)';
//                     b.style.color = 'rgba(255,255,255,0.7)';
//                     b.style.background = 'rgba(255,255,255,0.04)';
//                   }}
//                 >
//                   {label}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* CENTER */}
//           <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-[4vw] pt-[1vh]">

//             {/* Left text */}
//             <div className="flex-none w-full lg:max-w-[55%]">

//               {/* Ghost number */}
//               <div
//                 key={`num-${active}`}
//                 style={{
//                   fontFamily: "'Arial Black', Impact, sans-serif",
//                   fontSize: 'clamp(5rem, 15vh, 16rem)',
//                   fontWeight: 900,
//                   color: 'transparent',
//                   WebkitTextStroke: `1px ${current.accent.replace('0.85', '0.1')}`,
//                   lineHeight: 0.85, userSelect: 'none',
//                   letterSpacing: '-0.04em',
//                   marginBottom: 'clamp(-3rem, -4vh, -1rem)',
//                   animation: 'numSlideIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
//                   opacity: 0,
//                 }}
//               >
//                 {current.num}
//               </div>

//               {/* Sublabel pill */}
//               <div
//                 key={`pill-${active}`}
//                 style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)', animation: 'fadeUp 0.7s ease 0.15s forwards', opacity: 0 }}
//               >
//                 <div style={{ width: '28px', height: '1px', background: current.accent }} />
//                 <span style={{ color: current.accent, fontSize: 'clamp(0.55rem, 1.2vh, 0.65rem)', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
//                   {current.sublabel}
//                 </span>
//               </div>

//               {/* Heading */}
//               <h2
//                 key={`h-${active}`}
//                 style={{
//                   fontFamily: "'Arial Black', Impact, sans-serif",
//                   fontWeight: 900,
//                   fontSize: 'clamp(2rem, 7vh, 5rem)',
//                   color: '#ffffff',
//                   textTransform: 'uppercase',
//                   lineHeight: 0.95,
//                   letterSpacing: '-0.03em',
//                   marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)',
//                   animation: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards',
//                   opacity: 0,
//                 }}
//               >
//                 {current.label}
//               </h2>

//               {/* Description */}
//               <p
//                 key={`desc-${active}`}
//                 style={{
//                   color: 'rgba(255,255,255,0.5)',
//                   fontSize: 'clamp(0.75rem, 1.5vh, 1rem)',
//                   fontWeight: 300, lineHeight: 1.7,
//                   letterSpacing: '0.03em',
//                   maxWidth: '420px', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
//                   animation: 'fadeUp 0.8s ease 0.35s forwards', opacity: 0,
//                 }}
//               >
//                 {current.description}
//               </p>

//               {/* CTA */}
//               <div key={`cta-${active}`} style={{ animation: 'fadeUp 0.8s ease 0.5s forwards', opacity: 0 }}>
//                 <Link to="/Items">
//                   <button
//                     style={{
//                       display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
//                       padding: '0.75rem 1.75rem',
//                       background: 'transparent',
//                       border: `1px solid ${current.accent.replace('0.85', '0.35')}`,
//                       color: '#fff', cursor: 'pointer',
//                       fontSize: '0.65rem', letterSpacing: '0.25em',
//                       textTransform: 'uppercase', fontWeight: 600,
//                       borderRadius: '2px', transition: 'all 0.3s ease',
//                     }}
//                     onMouseEnter={e => {
//                       const b = e.currentTarget as HTMLButtonElement;
//                       b.style.background = current.accent.replace('0.85', '0.1');
//                       b.style.borderColor = current.accent;
//                     }}
//                     onMouseLeave={e => {
//                       const b = e.currentTarget as HTMLButtonElement;
//                       b.style.background = 'transparent';
//                       b.style.borderColor = current.accent.replace('0.85', '0.35');
//                     }}
//                   >
//                     Explore Style <span style={{ fontSize: '0.9rem' }}>→</span>
//                   </button>
//                 </Link>
//               </div>
//             </div>

//             {/* Right thumbnail strip */}
//             <div className="flex lg:flex-1 flex-row lg:flex-col gap-3 max-w-full lg:max-w-[280px] lg:ml-auto overflow-x-auto pb-2 lg:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
//               {STYLES.map((style, i) => {
//                 const isCurrent = i === active;
//                 return (
//                   <button
//                     key={i}
//                     onClick={() => goTo(i)}
//                     className="flex-shrink-0"
//                     style={{
//                       display: 'flex', alignItems: 'center', gap: '0.75rem',
//                       background: 'none', border: 'none', cursor: 'pointer',
//                       padding: '0.4rem 0', textAlign: 'left',
//                       transition: 'all 0.3s ease',
//                       opacity: isCurrent ? 1 : 0.38,
//                     }}
//                     onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.opacity = '0.65'; }}
//                     onMouseLeave={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.opacity = '0.38'; }}
//                   >
//                     <div style={{
//                       width: isCurrent ? '52px' : '40px',
//                       height: isCurrent ? '52px' : '40px',
//                       borderRadius: '3px', overflow: 'hidden',
//                       border: isCurrent ? `1px solid ${current.accent.replace('0.85', '0.6')}` : '1px solid rgba(255,255,255,0.1)',
//                       flexShrink: 0, transition: 'all 0.4s ease',
//                     }}>
//                       <img
//                         src={style.image} alt={style.label}
//                         style={{
//                           width: '100%', height: '100%', objectFit: 'cover',
//                           filter: isCurrent ? 'brightness(1)' : 'brightness(0.45) grayscale(0.4)',
//                           transition: 'all 0.4s ease',
//                         }}
//                       />
//                     </div>
//                     <div>
//                       <p style={{
//                         color: isCurrent ? '#fff' : 'rgba(255,255,255,0.5)',
//                         fontSize: '0.65rem', letterSpacing: '0.2em',
//                         textTransform: 'uppercase',
//                         fontWeight: isCurrent ? 700 : 400,
//                         transition: 'all 0.3s ease', marginBottom: '0.15rem',
//                       }}>
//                         {style.label}
//                       </p>
//                       <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
//                         {style.num}
//                       </p>
//                     </div>
//                     {isCurrent && (
//                       <div style={{ marginLeft: 'auto', width: '20px', height: '1px', background: current.accent, flexShrink: 0 }} />
//                     )}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* BOTTOM BAR */}
//           <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//             {/* Progress track */}
//             <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)', position: 'relative', maxWidth: '300px' }}>
//               <div style={{
//                 position: 'absolute', left: 0, top: 0, height: '100%',
//                 width: `${((active + 1) / STYLES.length) * 100}%`,
//                 background: current.accent,
//                 transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
//               }} />
//             </div>

//             <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', fontWeight: 300 }}>
//               {String(active + 1).padStart(2, '0')} / {String(STYLES.length).padStart(2, '0')}
//             </span>

//             <div style={{ marginLeft: 'auto' }}>
//               <Link to="/Items" style={{
//                 color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem',
//                 letterSpacing: '0.25em', textTransform: 'uppercase',
//                 textDecoration: 'none', transition: 'color 0.25s ease',
//                 display: 'flex', alignItems: 'center', gap: '0.5rem',
//               }}
//                 onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
//                 onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
//               >
//                 View All Styles <span>→</span>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* ── KEYFRAMES ── */}
//         <style>{`
//         @keyframes imgFadeIn {
//           from { opacity:0; transform:scale(1.04); }
//           to   { opacity:1; transform:scale(1); }
//         }
//         @keyframes imgFadeOut {
//           from { opacity:1; }
//           to   { opacity:0; }
//         }
//         @keyframes glowIn {
//           from { opacity:0; }
//           to   { opacity:1; }
//         }
//         @keyframes numSlideIn {
//           from { opacity:0; transform:translateX(-40px); }
//           to   { opacity:1; transform:translateX(0); }
//         }
//         @keyframes fadeUp {
//           from { opacity:0; transform:translateY(22px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         @keyframes scrollPulse {
//           0%,100% { opacity:0.4; transform:scaleY(1); }
//           50%     { opacity:1;   transform:scaleY(1.15); }
//         }
//       `}</style>
//       </div>
//     </section>
//   );
// };

// export default StylesSection;

import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

// SVG icons for features (thin line style matching reference)
const ICONS = {
  star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><circle cx="12" cy="12" r="3" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /><line x1="4.93" y1="4.93" x2="7.05" y2="7.05" /><line x1="16.95" y1="16.95" x2="19.07" y2="19.07" /><line x1="4.93" y1="19.07" x2="7.05" y2="16.95" /><line x1="16.95" y1="7.05" x2="19.07" y2="4.93" /></svg>,
  leaf: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><path d="M2 22c0 0 5-2 10-7s7-12 7-12-7 2-12 7-5 12-5 12z" /><line x1="2" y1="22" x2="12" y2="12" /></svg>,
  diamond: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(45 12 12)" style={{ transformOrigin: '12px 12px' }} /></svg>,
  pen: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></svg>,
  drop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" /></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ width: '100%', height: '100%' }}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
};

const STYLES = [
  {
    num: '01',
    label: 'Vintage',
    labelLine2: 'Wash',
    sublabel: 'Heritage Technique',
    description: 'A timeless look achieved through expert distressing and stonewashing techniques, bringing out the authentic character of premium denim.',
    image: '/images/wheelSection1.png',
    accent: 'rgba(200,165,100,0.85)',
    accentHex: '#c8a564',
    features: [
      { icon: 'star', title: 'Authentic Distressing', desc: 'Hand-crafted wear marks for genuine vintage character.' },
      { icon: 'drop', title: 'Stonewash Process', desc: 'Pumice stones create natural fading and softness.' },
      { icon: 'diamond', title: 'Unique Appearance', desc: 'Every piece has its own distinct aged personality.' },
      { icon: 'pen', title: 'Custom Wash Levels', desc: 'Light, medium or heavy — tailored to your brand.' },
    ],
  },
  {
    num: '02',
    label: 'Black',
    labelLine2: 'Resin',
    sublabel: 'Refined Finish',
    description: 'Deep, rich black denim coated with a sleek resin finish for a refined, premium feel that effortlessly transitions from day to night.',
    image: '/images/wheelSection2.png',
    accent: 'rgba(147,197,253,0.85)',
    accentHex: '#93c5fd',
    features: [
      { icon: 'layers', title: 'Resin Coating', desc: 'Glossy surface layer adds a premium leather-like feel.' },
      { icon: 'leaf', title: 'Sustainable Process', desc: 'Eco-friendly resin application with low water usage.' },
      { icon: 'diamond', title: 'Bold Statement', desc: 'Deep black tone that holds colour wash after wash.' },
      { icon: 'pen', title: 'Custom Design', desc: 'Endless creative possibilities tailored to your brand.' },
    ],
  },
  {
    num: '03',
    label: 'Utility',
    labelLine2: 'Denim',
    sublabel: 'Functional Build',
    description: 'Functional and durable, featuring reinforced stitching and practical cargo pockets built for the modern explorer.',
    image: '/images/wheelSection3.png',
    accent: 'rgba(120,190,145,0.85)',
    accentHex: '#78be91',
    features: [
      { icon: 'target', title: 'Reinforced Stitching', desc: 'Triple-needle seams built for maximum durability.' },
      { icon: 'layers', title: 'Heavy-Weight Fabric', desc: '12–14oz denim for structure and long-term wear.' },
      { icon: 'leaf', title: 'Eco Construction', desc: 'Responsibly sourced canvas and hardware throughout.' },
      { icon: 'zap', title: 'Functional Design', desc: 'Multiple pocket configurations for real-world use.' },
    ],
  },
  {
    num: '04',
    label: 'Coated',
    labelLine2: 'Finish',
    sublabel: 'Bold Expression',
    description: 'A subtle waxed appearance that adds an edgy, leather-like texture to the denim, offering a bold statement.',
    image: '/images/wheelSection4.png',
    accent: 'rgba(210,170,120,0.85)',
    accentHex: '#d2aa78',
    features: [
      { icon: 'layers', title: 'Wax Coating', desc: 'Full-surface wax treatment for distinct texture.' },
      { icon: 'diamond', title: 'Leather-like Feel', desc: 'Premium hand-feel without animal-derived materials.' },
      { icon: 'leaf', title: 'Sustainable Choice', desc: 'Water-based coatings that reduce chemical impact.' },
      { icon: 'pen', title: 'Versatile Designs', desc: 'Create unlimited patterns aligned to your brand vision.' },
    ],
  },
  {
    num: '05',
    label: 'Overdyed',
    labelLine2: 'Look',
    sublabel: 'Intense Colour',
    description: 'Intense, saturated color profiles created by over-dyeing premium indigo fabrics, resulting in unparalleled depth.',
    image: '/images/wheelSection5.png',
    accent: 'rgba(147,197,253,0.85)',
    accentHex: '#93c5fd',
    features: [
      { icon: 'drop', title: 'Deep Saturation', desc: 'Multi-bath dyeing delivers rich, uniform colour.' },
      { icon: 'star', title: 'Precision Detailing', desc: 'High-accuracy dye placement for sharp, clean results.' },
      { icon: 'leaf', title: 'Low-Impact Process', desc: 'Reduced water and dye-waste through closed-loop system.' },
      { icon: 'zap', title: 'Innovative Finish', desc: 'Modern vintage look with superior quality and consistency.' },
    ],
  },
];

const StylesSection = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(active);
  const prevActiveRef = useRef<number | null>(null);

  useEffect(() => { activeRef.current = active; }, [active]);

  /* ── Native scroll mapping ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollableDistance = Math.max(1, height - windowHeight);
      const scrolled = -top;
      let progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      const newActive = Math.min(STYLES.length - 1, Math.floor(progress * STYLES.length));

      setActive((cur) => {
        if (cur !== newActive) {
          setPrev(cur);
          prevActiveRef.current = cur;
          setContentKey(k => k + 1);
          return newActive;
        }
        return cur;
      });

      setSectionVisible(top < windowHeight * 0.8 && top > -height);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (!sectionRef.current) return;
    const windowHeight = window.innerHeight;
    const height = sectionRef.current.offsetHeight;
    const scrollableDistance = height - windowHeight;
    const targetProgress = (idx + 0.5) / STYLES.length;
    const targetY = sectionRef.current.offsetTop + targetProgress * scrollableDistance;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  const goNext = useCallback(() => { if (activeRef.current < STYLES.length - 1) goTo(activeRef.current + 1); }, [goTo]);
  const goPrev = useCallback(() => { if (activeRef.current > 0) goTo(activeRef.current - 1); }, [goTo]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!sectionVisible) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, sectionVisible]);

  const current = STYLES[active];
  const prevSlide = prev !== null ? STYLES[prev] : null;

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: `${STYLES.length * 100}vh`,
        backgroundColor: '#030b13',
      }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', width: '100%',
      }}>

        {/* ── BACKGROUND: outgoing ── */}
        {prevSlide && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'ssImgOut 0.8s ease forwards' }}>
            <img src={prevSlide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) saturate(0.3)' }} />
          </div>
        )}

        {/* ── BACKGROUND: incoming ── */}
        <div key={`bg-${active}`} style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'ssImgIn 1s cubic-bezier(0.22,1,0.36,1) forwards' }}>
          <img src={current.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.22) saturate(0.25)' }} />
        </div>

        {/* Dark vignette — heavier than before so mannequin pops */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 80% 100% at 20% 100%, transparent 30%, rgba(3,11,19,0.7) 65%, rgba(3,11,19,0.97) 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(3,11,19,0.05) 0%, rgba(3,11,19,0.55) 35%, rgba(3,11,19,0.92) 62%, rgba(3,11,19,0.98) 100%)'
        }} />
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '18%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(3,11,19,0.98), transparent)'
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%', zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(3,11,19,0.98), transparent)'
        }} />

        {/* Accent glow — subtle, behind content */}
        <div key={`glow-${active}`} style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: `radial-gradient(ellipse 40% 50% at 52% 50%, ${current.accentHex}12 0%, transparent 65%)`,
          animation: 'ssGlowIn 1s ease forwards',
        }} />

        {/* ── THREE-COLUMN LAYOUT ── */}
        <div style={{
          position: 'relative', zIndex: 10,
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1.15fr 1px 0.95fr',
          gap: 0,
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
        }}>

          {/* ── COL 1: MANNEQUIN ── */}
          <div style={{
            position: 'relative',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            paddingBottom: 0, overflow: 'visible',
          }}>
            <div
              key={`mannequin-${active}`}
              style={{
                position: 'absolute', bottom: 0,
                width: '100%', height: '95%',
                animation: 'ssMannequinIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
                opacity: 0,
              }}
            >
              <img
                src={current.image}
                alt="mannequin"
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'contain', objectPosition: 'center',
                  // Mask: fades out left edge and top
                  maskImage: 'linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to bottom, transparent 0%, black 12%)',
                  maskComposite: 'intersect',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to bottom, transparent 0%, black 12%)',
                  WebkitMaskComposite: 'source-in',
                }}
              />
            </div>

            {/* Slide counter bottom-left */}
            <div style={{
              position: 'absolute', bottom: '2.5rem', left: '2rem',
              display: 'flex', flexDirection: 'column', gap: '0.25rem', zIndex: 5,
            }}>
              <span style={{ fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, fontSize: '2.5rem', color: 'rgba(255,255,255,0.08)', lineHeight: 1, letterSpacing: '-0.04em' }}>
                {current.num}
              </span>
              <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
                {STYLES.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{
                    width: i === active ? 18 : 5, height: 5, borderRadius: 3,
                    border: 'none', padding: 0, cursor: 'pointer',
                    background: i === active ? current.accentHex : 'rgba(255,255,255,0.15)',
                    transition: 'all 0.35s ease',
                  }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── COL 2: CENTER TEXT ── */}
          <div style={{
            display: 'flex', flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3.5rem)',
            paddingLeft: 'clamp(1rem, 2vw, 2rem)',
          }}>
            <div key={contentKey} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>

              {/* Eyebrow */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.6rem',
                marginBottom: '1rem',
                opacity: 0, animation: 'ssFadeUp 0.6s ease 0.05s forwards',
              }}>
                <div style={{ width: 20, height: 1, background: current.accentHex + 'cc' }} />
                <span style={{ color: current.accentHex, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>
                  {current.sublabel}
                </span>
              </div>

              {/* Big two-line heading */}
              <div style={{
                opacity: 0, animation: 'ssFadeUp 0.65s ease 0.1s forwards',
                marginBottom: '1.2rem',
              }}>
                <h2 style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  margin: 0,
                }}>
                  {current.label}
                </h2>
                <h2 style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(3.5rem, 7vw, 6.5rem)',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                  letterSpacing: '-0.03em',
                  color: 'transparent',
                  WebkitTextStroke: `1.5px ${current.accentHex}55`,
                  margin: 0,
                }}>
                  {current.labelLine2}
                </h2>
              </div>

              {/* Accent line */}
              <div style={{
                width: 44, height: 2, marginBottom: '1.4rem',
                background: `linear-gradient(90deg, ${current.accentHex}, transparent)`,
                opacity: 0, animation: 'ssFadeUp 0.6s ease 0.18s forwards',
              }} />

              {/* Description */}
              <p style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 'clamp(0.78rem, 1.3vw, 0.92rem)',
                fontWeight: 300, lineHeight: 1.75,
                letterSpacing: '0.02em',
                maxWidth: '360px', margin: '0 0 2rem 0',
                opacity: 0, animation: 'ssFadeUp 0.6s ease 0.25s forwards',
              }}>
                {current.description}
              </p>

              {/* CTA */}
              <div style={{ opacity: 0, animation: 'ssFadeUp 0.6s ease 0.33s forwards' }}>
                <Link to="/Items">
                  <button
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.8rem 2rem',
                      background: 'transparent',
                      border: `1px solid ${current.accentHex}55`,
                      color: 'rgba(255,255,255,0.85)', cursor: 'pointer',
                      fontSize: '0.6rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', fontWeight: 600,
                      fontFamily: 'inherit', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = current.accentHex + '18';
                      b.style.borderColor = current.accentHex + 'aa';
                      b.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'transparent';
                      b.style.borderColor = current.accentHex + '55';
                      b.style.color = 'rgba(255,255,255,0.85)';
                    }}
                  >
                    Explore Style <span style={{ fontSize: '0.85rem' }}>→</span>
                  </button>
                </Link>
              </div>

              {/* Nav arrows */}
              <div style={{
                display: 'flex', gap: '0.6rem', marginTop: '2rem',
                opacity: 0, animation: 'ssFadeUp 0.6s ease 0.4s forwards',
              }}>
                {(['←', '→'] as const).map((arrow, idx) => (
                  <button
                    key={arrow}
                    onClick={idx === 0 ? goPrev : goNext}
                    style={{
                      width: 38, height: 38, borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.03)',
                      color: 'rgba(255,255,255,0.55)',
                      fontSize: '0.9rem', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.25s ease', fontFamily: 'inherit',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.borderColor = current.accentHex + '88';
                      b.style.color = '#fff';
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.borderColor = 'rgba(255,255,255,0.12)';
                      b.style.color = 'rgba(255,255,255,0.55)';
                    }}
                  >{arrow}</button>
                ))}
              </div>
            </div>
          </div>

          {/* ── VERTICAL DIVIDER ── */}
          <div style={{
            width: 1,
            alignSelf: 'stretch',
            margin: '8vh 0',
            background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)',
          }} />

          {/* ── COL 3: FEATURE LIST ── */}
          <div style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)',
            gap: 0,
          }}>
            <div key={`features-${contentKey}`} style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {current.features.map((feat, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                    padding: '1.1rem 0',
                    borderBottom: i < current.features.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                    opacity: 0,
                    animation: `ssFadeUp 0.55s ease ${0.12 + i * 0.08}s forwards`,
                  }}
                >
                  {/* Icon circle */}
                  <div style={{
                    width: 38, height: 38, flexShrink: 0,
                    borderRadius: '50%',
                    border: `1px solid ${current.accentHex}33`,
                    background: `${current.accentHex}0d`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: current.accentHex,
                    padding: '9px',
                    marginTop: 2,
                  }}>
                    {ICONS[feat.icon as keyof typeof ICONS]}
                  </div>

                  {/* Text */}
                  <div>
                    <p style={{
                      color: '#fff', fontSize: '0.72rem',
                      fontWeight: 700, letterSpacing: '0.1em',
                      textTransform: 'uppercase', margin: '0 0 0.3rem 0',
                      lineHeight: 1.2,
                    }}>
                      {feat.title}
                    </p>
                    <p style={{
                      color: 'rgba(255,255,255,0.38)',
                      fontSize: '0.72rem', fontWeight: 300,
                      lineHeight: 1.6, letterSpacing: '0.02em', margin: 0,
                    }}>
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}

              {/* Progress bar at bottom of features */}
              <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute', left: 0, top: 0, height: '100%',
                    width: `${((active + 1) / STYLES.length) * 100}%`,
                    background: current.accentHex,
                    transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
                  }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
                  {String(active + 1).padStart(2, '0')} / {String(STYLES.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ssImgIn  { from { opacity:0; transform:scale(1.04); } to { opacity:1; transform:scale(1); } }
        @keyframes ssImgOut { from { opacity:1; } to { opacity:0; } }
        @keyframes ssGlowIn { from { opacity:0; } to { opacity:1; } }
        @keyframes ssFadeUp {
          from { opacity:0; transform:translateY(18px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes ssMannequinIn {
          from { opacity:0; transform:translateY(24px) scale(0.98); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }
      `}</style>
    </section>
  );
};

export default StylesSection;