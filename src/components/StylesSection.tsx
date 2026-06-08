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
    num: '01', label: 'Laser', labelLine2: 'Artistry', sublabel: 'Precision Technique',
    description: 'Precision laser technology burns intricate tribal and flame patterns directly onto premium denim — creating bold, one-of-a-kind designs with razor-sharp detail and zero dye usage.',
    image: '/images/laser.png', accent: 'rgba(200,165,100,0.85)', accentHex: '#c8a564',
    features: [
      { icon: 'star', title: 'Precise Laser Finish', desc: 'High-precision laser beams etch sharp, intricate patterns with consistent accuracy.' },
      { icon: 'leaf', title: 'Sustainable Process', desc: 'Zero water and chemical usage — an eco-responsible finishing technique.' },
      { icon: 'diamond', title: 'Unique Appearance', desc: 'Creates one-of-a-kind tribal, flame, and geometric effects on every piece.' },
      { icon: 'pen', title: 'Custom Design Capability', desc: 'Endless creative possibilities — fully tailored to your brand vision.' },
    ],
  },
  {
    num: '02', label: 'Appliqué', labelLine2: 'Design', sublabel: 'Artisan Craft',
    description: 'Raised 3D appliqué work hand-stitched onto premium denim — bold chain and sculptural motifs that add extraordinary texture, depth, and a high-fashion edge to every garment.',
    image: '/images/appliqué.png', accent: 'rgba(147,197,253,0.85)', accentHex: '#93c5fd',
    features: [
      { icon: 'layers', title: 'Raised 3D Texture', desc: 'Hand-applied sculptural elements create dramatic depth and tactile character.' },
      { icon: 'star', title: 'Intricate Stitching', desc: 'Each motif is precisely sewn for clean edges and long-lasting hold.' },
      { icon: 'diamond', title: 'High-Fashion Appeal', desc: 'Bold chain and rope-like designs that command attention on and off the runway.' },
      { icon: 'pen', title: 'Custom Motif Design', desc: "Fully bespoke appliqué patterns crafted to your brand's creative direction." },
    ],
  },
  {
    num: '03', label: 'Embroidery', labelLine2: 'Craft', sublabel: 'Threadwork Mastery',
    description: 'Rich floral and oriental motifs hand-embroidered onto black premium denim — intricate threadwork that transforms each garment into a wearable piece of art with unmatched detail.',
    image: '/images/Embroidery.png', accent: 'rgba(120,190,145,0.85)', accentHex: '#78be91',
    features: [
      { icon: 'star', title: 'Intricate Threadwork', desc: 'Multi-colour embroidery threads layered with precision for depth and richness.' },
      { icon: 'diamond', title: 'Oriental Inspired', desc: 'Floral, bird and botanical motifs drawn from Japanese and eastern art traditions.' },
      { icon: 'target', title: 'Placement Accuracy', desc: "Every motif is positioned and scaled to complement the garment's cut perfectly." },
      { icon: 'pen', title: 'Custom Artwork', desc: 'Bespoke embroidery designs developed from scratch to match your brand identity.' },
    ],
  },
  {
    num: '04', label: 'Graphic', labelLine2: 'Print', sublabel: 'Street Art Aesthetic',
    description: 'Bold graffiti-inspired typography and tag art printed directly onto light wash denim — high-impact street culture designs delivered with vivid colour and razor-sharp print precision.',
    image: '/images/Print.png', accent: 'rgba(210,170,120,0.85)', accentHex: '#d2aa78',
    features: [
      { icon: 'zap', title: 'Vivid Colour Output', desc: 'High-saturation inks produce bold, striking visuals that hold through repeated washes.' },
      { icon: 'star', title: 'Sharp Print Detail', desc: 'Fine-line graffiti lettering and artwork reproduced with pixel-perfect accuracy.' },
      { icon: 'diamond', title: 'Street Culture Edge', desc: 'Urban tag and typography motifs that speak directly to youth and streetwear audiences.' },
      { icon: 'pen', title: 'Fully Custom Artwork', desc: 'Your original graphics, logos or artwork printed exactly as designed — no limitations.' },
    ],
  },
  {
    num: '05', label: 'Utility', labelLine2: 'Cargo', sublabel: 'Functional Fashion',
    description: 'Oversized wide-leg cargo jeans built for the streets — multiple large utility pockets, heavy-weight distressed denim, and a relaxed silhouette that blends raw function with modern streetwear.',
    image: '/images/Utility fashion cargos.png', accent: 'rgba(147,197,253,0.85)', accentHex: '#93c5fd',
    features: [
      { icon: 'target', title: 'Multi-Pocket Build', desc: 'Oversized cargo pockets with reinforced stitching built for real utility and style.' },
      { icon: 'layers', title: 'Heavy-Weight Denim', desc: '12–14oz structured fabric that holds shape and develops character over time.' },
      { icon: 'drop', title: 'Distressed Wash', desc: 'Stone and enzyme washing creates an authentic worn-in grey tone with depth.' },
      { icon: 'zap', title: 'Streetwear Silhouette', desc: 'Wide-leg oversized cut engineered for the contemporary fashion-forward consumer.' },
    ],
  },
];

// ── Intro heading section (non-sticky, scrolls away normally) ──────────────
const SectionIntro = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: '#030b13',
        padding: 'clamp(4rem, 8vw, 7rem) clamp(1.5rem, 5vw, 5rem) clamp(3rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Radial glow */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 60% 70% at 50% 60%, rgba(13,33,71,0.55) 0%, transparent 65%)' }} />

      <div style={{ maxWidth: 1320, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(2rem, 5vw, 6rem)', alignItems: 'end' }} className="ss-intro-grid">

          {/* Left: heading */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.2rem', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease 0s, transform 0.8s ease 0s' }}>
              <div style={{ width: 28, height: 1, background: 'rgba(147,197,253,0.5)' }} />
              <span style={{ color: 'rgba(147,197,253,0.6)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
                What We Create
              </span>
            </div>

            <h2 style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 5vw, 4.5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.025em',
              color: '#fff',
              margin: '0 0 1rem',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.8s ease 0.08s, transform 0.8s ease 0.08s',
            }}>
              THE FULL SPECTRUM OF
              <br />
              <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)', color: 'transparent' }}>
                CRAFT
              </span>
            </h2>

            <div style={{ width: 48, height: 2, background: 'linear-gradient(90deg, rgba(147,197,253,0.7), transparent)', opacity: visible ? 1 : 0, transition: 'opacity 0.8s ease 0.15s' }} />
          </div>

          {/* Right: description + scroll hint */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s' }}>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: 'clamp(0.82rem, 1.2vw, 0.95rem)', fontWeight: 300, lineHeight: 1.85, letterSpacing: '0.03em', margin: '0 0 1.5rem', maxWidth: 480 }}>
              Simple silhouettes or intricate detailing — we do both with the same obsession. Explore our extended range of techniques, finishes, and styles that go far beyond the ordinary.
            </p>
            {/* Scroll cue */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.12)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '45%', background: 'rgba(147,197,253,0.6)', animation: 'ssScrollDot 1.8s ease infinite' }} />
              </div>
              <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                Scroll to explore styles
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .ss-intro-grid { grid-template-columns: 1fr !important; } }
        @keyframes ssScrollDot { 0% { top: -45%; } 100% { top: 110%; } }
      `}</style>
    </div>
  );
};

const StylesSection = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const check = () => { setIsMobile(window.innerWidth < 640); setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024); };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const wh = window.innerHeight;
      const scrollableDistance = Math.max(1, height - wh);
      const progress = Math.max(0, Math.min(1, -top / scrollableDistance));
      const newActive = Math.min(STYLES.length - 1, Math.floor(progress * STYLES.length));
      setActive(cur => { if (cur !== newActive) { setPrev(cur); setContentKey(k => k + 1); return newActive; } return cur; });
      setSectionVisible(top < wh * 0.8 && top > -height);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goTo = useCallback((idx: number) => {
    if (!sectionRef.current) return;
    const wh = window.innerHeight;
    const targetY = sectionRef.current.offsetTop + ((idx + 0.5) / STYLES.length) * (sectionRef.current.offsetHeight - wh);
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
    <>
      {/* ── INTRO HEADING — scrolls normally above the sticky slider ── */}
      <SectionIntro />

      {/* ── STICKY SLIDER ── */}
      <section
        ref={sectionRef}
        style={{ position: 'relative', width: '100%', height: `${STYLES.length * 100}vh`, backgroundColor: '#030b13' }}
      >
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', width: '100%' }}>

          {prevSlide && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'ssImgOut 0.8s ease forwards' }}>
              <img src={prevSlide.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.25) saturate(0.3)' }} />
            </div>
          )}

          <div key={`bg-${active}`} style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'ssImgIn 1s cubic-bezier(0.22,1,0.36,1) forwards' }}>
            <img src={current.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.22) saturate(0.25)' }} />
          </div>

          <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to right, rgba(3,11,19,0.05) 0%, rgba(3,11,19,0.55) 35%, rgba(3,11,19,0.92) 62%, rgba(3,11,19,0.98) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '18%', zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to bottom, rgba(3,11,19,0.98), transparent)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '15%', zIndex: 3, pointerEvents: 'none', background: 'linear-gradient(to top, rgba(3,11,19,0.98), transparent)' }} />
          <div key={`glow-${active}`} style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', background: `radial-gradient(ellipse 40% 50% at 52% 50%, ${current.accentHex}12 0%, transparent 65%)`, animation: 'ssGlowIn 1s ease forwards' }} />

          <div style={{ position: 'relative', zIndex: 10, height: '100%', opacity: sectionVisible ? 1 : 0, transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)', transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s' }}>

            {/* DESKTOP ≥1024px */}
            {!isMobile && !isTablet && (
              <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1.15fr 1px 0.95fr' }}>
                {/* Mannequin */}
                <div style={{ position: 'relative', overflow: 'visible' }}>
                  <div key={`mq-${active}`} style={{ position: 'absolute', bottom: 0, width: '100%', height: '95%', animation: 'ssMannequinIn 0.9s cubic-bezier(0.22,1,0.36,1) forwards', opacity: 0 }}>
                    <img src={current.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center', maskImage: 'linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to bottom, transparent 0%, black 12%)', maskComposite: 'intersect', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 18%), linear-gradient(to bottom, transparent 0%, black 12%)', WebkitMaskComposite: 'source-in' }} />
                  </div>
                  <div style={{ position: 'absolute', bottom: '2.5rem', left: '2rem', display: 'flex', flexDirection: 'column', gap: '0.3rem', zIndex: 5 }}>
                    <span style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontWeight: 900, fontSize: '2.5rem', color: 'rgba(255,255,255,0.07)', lineHeight: 1, letterSpacing: '-0.04em' }}>{current.num}</span>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {STYLES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 18 : 5, height: 5, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer', background: i === active ? current.accentHex : 'rgba(255,255,255,0.15)', transition: 'all 0.35s ease' }} />)}
                    </div>
                  </div>
                </div>

                {/* Center text — overflow hidden so long content never pushes layout */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1.5rem,3vw,3rem) clamp(1.5rem,3vw,3.5rem) clamp(1.5rem,3vw,3rem) clamp(1rem,2vw,2rem)', overflow: 'hidden' }}>
                  <div key={contentKey} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <Eyebrow current={current} />
                    <Heading current={current} fontSize="clamp(3rem,6.5vw,6rem)" />
                    <AccentLine current={current} />
                    <Description current={current} />
                    <CTAButton current={current} />
                    <NavArrows goNext={goNext} goPrev={goPrev} current={current} />
                  </div>
                </div>

                {/* Divider */}
                <div style={{ width: 1, alignSelf: 'stretch', margin: '8vh 0', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }} />

                {/* Features — overflow hidden */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(1.5rem,3vw,3rem) clamp(1.5rem,3vw,3rem)', overflow: 'hidden' }}>
                  <div key={`features-${contentKey}`}>
                    {current.features.map((feat, i) => <FeatureItem key={i} feat={feat} i={i} current={current} total={current.features.length} />)}
                    <ProgressBar active={active} current={current} />
                  </div>
                </div>
              </div>
            )}

            {/* TABLET 640–1023px */}
            {isTablet && (
              <div style={{ height: '100%', display: 'grid', gridTemplateColumns: '1fr 1px 1fr' }}>
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 2rem 2rem 2.5rem', overflow: 'hidden' }}>
                  <div key={contentKey} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    <Eyebrow current={current} />
                    <Heading current={current} fontSize="clamp(2.4rem, 5.5vw, 4rem)" />
                    <AccentLine current={current} />
                    <Description current={current} />
                    <CTAButton current={current} />
                    <NavArrows goNext={goNext} goPrev={goPrev} current={current} />
                    <DotNav active={active} goTo={goTo} current={current} mt="1.5rem" />
                  </div>
                </div>
                <div style={{ width: 1, alignSelf: 'stretch', margin: '8vh 0', background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.1) 20%, rgba(255,255,255,0.1) 80%, transparent)' }} />
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '2rem 2rem 2rem 1.5rem', overflow: 'hidden' }}>
                  <div key={`feat-${contentKey}`}>
                    {current.features.map((feat, i) => <FeatureItem key={i} feat={feat} i={i} current={current} total={current.features.length} />)}
                    <ProgressBar active={active} current={current} />
                  </div>
                </div>
              </div>
            )}

            {/* MOBILE <640px */}
            {isMobile && (
              <div style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '4.5rem 1.5rem 2rem', overflow: 'hidden' }}>
                <div key={contentKey}>
                  <Eyebrow current={current} />
                  <Heading current={current} fontSize="clamp(2.2rem, 10vw, 3.2rem)" />
                  <AccentLine current={current} />
                </div>
                <div key={`feat-${contentKey}`} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  {current.features.map((feat, i) => (
                    <div key={i} style={{ opacity: 0, animation: `ssFadeUp 0.5s ease ${0.1 + i * 0.07}s forwards` }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.3rem' }}>
                        <div style={{ width: 26, height: 26, flexShrink: 0, borderRadius: '50%', border: `1px solid ${current.accentHex}44`, background: `${current.accentHex}0d`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: current.accentHex, padding: '5px' }}>
                          {ICONS[feat.icon as keyof typeof ICONS]}
                        </div>
                        <p style={{ color: '#fff', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', margin: 0, lineHeight: 1.2 }}>{feat.title}</p>
                      </div>
                      <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: '0.65rem', fontWeight: 300, lineHeight: 1.5, margin: 0 }}>{feat.desc}</p>
                    </div>
                  ))}
                </div>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.42)', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.7, marginBottom: '1rem', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.1s forwards' }}>{current.description}</p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.18s forwards' }}>
                    <CTAButton current={current} />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {(['←', '→'] as const).map((arrow, idx) => (
                        <button key={arrow} onClick={idx === 0 ? goPrev : goNext} style={{ width: 34, height: 34, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'inherit' }}>{arrow}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.9rem', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.25s forwards' }}>
                    {STYLES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 18 : 5, height: 5, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer', background: i === active ? current.accentHex : 'rgba(255,255,255,0.15)', transition: 'all 0.35s ease' }} />)}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes ssImgIn       { from{opacity:0;transform:scale(1.04)} to{opacity:1;transform:scale(1)} }
          @keyframes ssImgOut      { from{opacity:1} to{opacity:0} }
          @keyframes ssGlowIn      { from{opacity:0} to{opacity:1} }
          @keyframes ssFadeUp      { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
          @keyframes ssMannequinIn { from{opacity:0;transform:translateY(24px) scale(0.98)} to{opacity:1;transform:translateY(0) scale(1)} }
        `}</style>
      </section>
    </>
  );
};

// ── Shared sub-components ──────────────────────────────────────────────────

const Eyebrow = ({ current }: { current: typeof STYLES[0] }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.05s forwards' }}>
    <div style={{ width: 20, height: 1, background: current.accentHex + 'cc' }} />
    <span style={{ color: current.accentHex, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{current.sublabel}</span>
  </div>
);

const Heading = ({ current, fontSize }: { current: typeof STYLES[0]; fontSize: string }) => (
  <div style={{ marginBottom: '0.75rem', opacity: 0, animation: 'ssFadeUp 0.65s ease 0.1s forwards' }}>
    <h2 style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontWeight: 900, fontSize, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.03em', color: '#fff', margin: 0 }}>{current.label}</h2>
    <h2 style={{ fontFamily: "'Arial Black',Impact,sans-serif", fontWeight: 900, fontSize, textTransform: 'uppercase', lineHeight: 0.88, letterSpacing: '-0.03em', color: 'transparent', WebkitTextStroke: `1.5px ${current.accentHex}55`, margin: 0 }}>{current.labelLine2}</h2>
  </div>
);

const AccentLine = ({ current }: { current: typeof STYLES[0] }) => (
  <div style={{ width: 44, height: 2, marginBottom: '1rem', background: `linear-gradient(90deg, ${current.accentHex}, transparent)`, opacity: 0, animation: 'ssFadeUp 0.6s ease 0.18s forwards' }} />
);

const Description = ({ current }: { current: typeof STYLES[0] }) => (
  <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 'clamp(0.75rem,1.15vw,0.88rem)', fontWeight: 300, lineHeight: 1.7, letterSpacing: '0.02em', maxWidth: 340, margin: '0 0 1.4rem 0', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.25s forwards' }}>
    {current.description}
  </p>
);

const CTAButton = ({ current }: { current: typeof STYLES[0] }) => (
  <div style={{ opacity: 0, animation: 'ssFadeUp 0.6s ease 0.33s forwards' }}>
    <Link to="/Items">
      <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1.8rem', background: 'transparent', border: `1px solid ${current.accentHex}55`, color: 'rgba(255,255,255,0.85)', cursor: 'pointer', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'inherit', transition: 'all 0.3s ease' }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = current.accentHex + '18'; b.style.borderColor = current.accentHex + 'aa'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background = 'transparent'; b.style.borderColor = current.accentHex + '55'; }}
      >Explore Style <span style={{ fontSize: '0.85rem' }}>→</span></button>
    </Link>
  </div>
);

const NavArrows = ({ goNext, goPrev, current }: { goNext: () => void; goPrev: () => void; current: typeof STYLES[0] }) => (
  <div style={{ display: 'flex', gap: '0.6rem', marginTop: '1.4rem', opacity: 0, animation: 'ssFadeUp 0.6s ease 0.4s forwards' }}>
    {(['←', '→'] as const).map((arrow, idx) => (
      <button key={arrow} onClick={idx === 0 ? goPrev : goNext} style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.03)', color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.25s ease', fontFamily: 'inherit' }}
        onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = current.accentHex + '88'; b.style.color = '#fff'; }}
        onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.borderColor = 'rgba(255,255,255,0.12)'; b.style.color = 'rgba(255,255,255,0.55)'; }}
      >{arrow}</button>
    ))}
  </div>
);

const DotNav = ({ active, goTo, current, mt = '0' }: { active: number; goTo: (i: number) => void; current: typeof STYLES[0]; mt?: string }) => (
  <div style={{ display: 'flex', gap: '0.4rem', marginTop: mt, opacity: 0, animation: 'ssFadeUp 0.6s ease 0.46s forwards' }}>
    {STYLES.map((_, i) => <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? 18 : 5, height: 5, borderRadius: 3, border: 'none', padding: 0, cursor: 'pointer', background: i === active ? current.accentHex : 'rgba(255,255,255,0.15)', transition: 'all 0.35s ease' }} />)}
  </div>
);

const FeatureItem = ({ feat, i, current, total }: { feat: typeof STYLES[0]['features'][0]; i: number; current: typeof STYLES[0]; total: number }) => (
  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', padding: '0.85rem 0', borderBottom: i < total - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none', opacity: 0, animation: `ssFadeUp 0.55s ease ${0.12 + i * 0.08}s forwards` }}>
    <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: '50%', border: `1px solid ${current.accentHex}33`, background: `${current.accentHex}0d`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: current.accentHex, padding: '7px', marginTop: 2 }}>
      {ICONS[feat.icon as keyof typeof ICONS]}
    </div>
    <div>
      <p style={{ color: '#fff', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', margin: '0 0 0.2rem 0', lineHeight: 1.2 }}>{feat.title}</p>
      <p style={{ color: 'rgba(255,255,255,0.38)', fontSize: '0.68rem', fontWeight: 300, lineHeight: 1.55, letterSpacing: '0.02em', margin: 0 }}>{feat.desc}</p>
    </div>
  </div>
);

const ProgressBar = ({ active, current }: { active: number; current: typeof STYLES[0] }) => (
  <div style={{ marginTop: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
    <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)', position: 'relative' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${((active + 1) / STYLES.length) * 100}%`, background: current.accentHex, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
    </div>
    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.55rem', letterSpacing: '0.2em', whiteSpace: 'nowrap' }}>
      {String(active + 1).padStart(2, '0')} / {String(STYLES.length).padStart(2, '0')}
    </span>
  </div>
);

export default StylesSection;