import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const STYLES = [
  {
    num: '01',
    label: 'Vintage Wash',
    sublabel: 'Heritage',
    description: 'A timeless look achieved through expert distressing and stonewashing techniques, bringing out the authentic character of premium denim.',
    image: '/images/vintage wash.jpeg',
    accent: 'rgba(200,165,100,0.85)',
  },
  {
    num: '02',
    label: 'Black Resin',
    sublabel: 'Refined',
    description: 'Deep, rich black denim coated with a sleek resin finish for a refined, premium feel that effortlessly transitions from day to night.',
    image: '/images/Black Resin.png',
    accent: 'rgba(147,197,253,0.85)',
  },
  {
    num: '03',
    label: 'Utility Denim',
    sublabel: 'Functional',
    description: 'Functional and durable, featuring reinforced stitching and practical cargo pockets built for the modern explorer.',
    image: '/images/Utility Denim.png',
    accent: 'rgba(120,190,145,0.85)',
  },
  {
    num: '04',
    label: 'Coated Finish',
    sublabel: 'Bold',
    description: 'A subtle waxed appearance that adds an edgy, leather-like texture to the denim, offering a bold statement.',
    image: '/images/Coated Finish.jpeg',
    accent: 'rgba(210,170,120,0.85)',
  },
  {
    num: '05',
    label: 'Overdyed Look',
    sublabel: 'Intense',
    description: 'Intense, saturated color profiles created by over-dyeing premium indigo fabrics, resulting in unparalleled depth.',
    image: '/images/Overdyed Look.jpg',
    accent: 'rgba(147,197,253,0.85)',
  },
];

const StylesSection = () => {
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  /* ── Native scroll mapping ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Ensure we don't divide by zero
      const scrollableDistance = Math.max(1, height - windowHeight);
      const scrolled = -top;

      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));

      const newActive = Math.min(STYLES.length - 1, Math.floor(progress * STYLES.length));

      setActive((currentActive) => {
        if (currentActive !== newActive) {
          setPrev(currentActive);
          return newActive;
        }
        return currentActive;
      });

      // Update visibility 
      setSectionVisible(top < windowHeight * 0.8 && top > -height);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* ── Advance / go back slide via native scroll ── */
  const goTo = useCallback((idx: number) => {
    if (!sectionRef.current) return;
    const windowHeight = window.innerHeight;
    const height = sectionRef.current.offsetHeight;
    const scrollableDistance = height - windowHeight;

    // Target progress for the middle of the segment
    const targetProgress = (idx + 0.5) / STYLES.length;
    const targetY = sectionRef.current.offsetTop + targetProgress * scrollableDistance;

    window.scrollTo({ top: targetY, behavior: 'smooth' });
  }, []);

  const goNext = useCallback(() => {
    if (activeRef.current < STYLES.length - 1) {
      goTo(activeRef.current + 1);
    }
  }, [goTo]);

  const goPrev = useCallback(() => {
    if (activeRef.current > 0) {
      goTo(activeRef.current - 1);
    }
  }, [goTo]);

  /* ── Keyboard ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Only capture keyboard if section is visible
      if (!sectionVisible) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, sectionVisible]);

  const current = STYLES[active];
  const prevSlide = prev !== null ? STYLES[prev] : null;
  const isLast = active === STYLES.length - 1;

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
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
      }}>
        {/* ── BACKGROUND IMAGE: outgoing ── */}
        {prevSlide && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, animation: 'imgFadeOut 0.9s ease forwards' }}>
            <img
              src={prevSlide.image}
              alt=""
              style={{
                width: '100%', height: '100%', objectFit: 'cover',
                filter: 'brightness(0.52) contrast(1.08)',
              }}
            />
          </div>
        )}

        {/* ── BACKGROUND IMAGE: incoming ── */}
        <div
          key={`bg-${active}`}
          style={{ position: 'absolute', inset: 0, zIndex: 2, animation: 'imgFadeIn 1.1s cubic-bezier(0.22,1,0.36,1) forwards' }}
        >
          <img
            src={current.image}
            alt={current.label}
            style={{
              width: '100%', height: '100%', objectFit: 'cover',
              filter: 'brightness(0.5) contrast(1.1) saturate(0.9)',
            }}
          />
        </div>

        {/* Overlay gradients */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(3,11,19,0.95) 0%, rgba(3,11,19,0.65) 45%, rgba(3,11,19,0.15) 100%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to top, rgba(3,11,19,0.98) 0%, transparent 35%)'
        }} />
        <div style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(3,11,19,0.95) 0%, transparent 22%)'
        }} />

        {/* Accent color glow */}
        <div
          key={`glow-${active}`}
          style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: `radial-gradient(ellipse 55% 55% at 72% 50%, ${current.accent.replace('0.85', '0.07')} 0%, transparent 70%)`,
            animation: 'glowIn 1.2s ease forwards',
          }}
        />

        {/* ── SCROLL HINT: "end of slider" nudge ── */}
        {isLast && (
          <div style={{
            position: 'absolute', bottom: '5rem', left: '50%', transform: 'translateX(-50%)',
            zIndex: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
            animation: 'fadeUp 0.6s ease forwards',
          }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.55rem', letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Scroll to continue
            </span>
            <div style={{
              width: '1px', height: '28px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)',
              animation: 'scrollPulse 1.5s ease-in-out infinite',
            }} />
          </div>
        )}

        {/* ── MAIN CONTENT ── */}
        <div
          style={{
            position: 'relative', zIndex: 10, height: '100%',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            padding: 'clamp(1rem,3vh,3rem) clamp(1.5rem,5vw,5rem)',
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s',
          }}
        >
          {/* TOP ROW */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
            <div>
              <p style={{ color: 'rgba(147,197,253,0.55)', fontSize: '0.65rem', letterSpacing: '0.4em', textTransform: 'uppercase', fontWeight: 400, marginBottom: '0.3rem' }}>
                Explore Our Styles
              </p>
              <p style={{ color: 'rgba(255,255,255,0.18)', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 300 }}>
                {active + 1} / {STYLES.length}
              </p>
            </div>

            {/* Arrow buttons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {([['←', () => goPrev()], ['→', () => goNext()]] as const).map(([label, action]) => (
                <button
                  key={label}
                  onClick={() => action()}
                  style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '1rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.borderColor = current.accent;
                    b.style.color = '#fff';
                    b.style.background = 'rgba(255,255,255,0.08)';
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.borderColor = 'rgba(255,255,255,0.15)';
                    b.style.color = 'rgba(255,255,255,0.7)';
                    b.style.background = 'rgba(255,255,255,0.04)';
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* CENTER */}
          <div className="flex-1 flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-[4vw] pt-[1vh]">

            {/* Left text */}
            <div className="flex-none w-full lg:max-w-[55%]">

              {/* Ghost number */}
              <div
                key={`num-${active}`}
                style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontSize: 'clamp(5rem, 15vh, 16rem)',
                  fontWeight: 900,
                  color: 'transparent',
                  WebkitTextStroke: `1px ${current.accent.replace('0.85', '0.1')}`,
                  lineHeight: 0.85, userSelect: 'none',
                  letterSpacing: '-0.04em',
                  marginBottom: 'clamp(-3rem, -4vh, -1rem)',
                  animation: 'numSlideIn 0.8s cubic-bezier(0.22,1,0.36,1) forwards',
                  opacity: 0,
                }}
              >
                {current.num}
              </div>

              {/* Sublabel pill */}
              <div
                key={`pill-${active}`}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: 'clamp(0.5rem, 1.5vh, 1rem)', animation: 'fadeUp 0.7s ease 0.15s forwards', opacity: 0 }}
              >
                <div style={{ width: '28px', height: '1px', background: current.accent }} />
                <span style={{ color: current.accent, fontSize: 'clamp(0.55rem, 1.2vh, 0.65rem)', letterSpacing: '0.35em', textTransform: 'uppercase', fontWeight: 600 }}>
                  {current.sublabel}
                </span>
              </div>

              {/* Heading */}
              <h2
                key={`h-${active}`}
                style={{
                  fontFamily: "'Arial Black', Impact, sans-serif",
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 7vh, 5rem)',
                  color: '#ffffff',
                  textTransform: 'uppercase',
                  lineHeight: 0.95,
                  letterSpacing: '-0.03em',
                  marginBottom: 'clamp(0.75rem, 2vh, 1.5rem)',
                  animation: 'fadeUp 0.8s cubic-bezier(0.22,1,0.36,1) 0.2s forwards',
                  opacity: 0,
                }}
              >
                {current.label}
              </h2>

              {/* Description */}
              <p
                key={`desc-${active}`}
                style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: 'clamp(0.75rem, 1.5vh, 1rem)',
                  fontWeight: 300, lineHeight: 1.7,
                  letterSpacing: '0.03em',
                  maxWidth: '420px', marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)',
                  animation: 'fadeUp 0.8s ease 0.35s forwards', opacity: 0,
                }}
              >
                {current.description}
              </p>

              {/* CTA */}
              <div key={`cta-${active}`} style={{ animation: 'fadeUp 0.8s ease 0.5s forwards', opacity: 0 }}>
                <Link to="/Items">
                  <button
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.75rem 1.75rem',
                      background: 'transparent',
                      border: `1px solid ${current.accent.replace('0.85', '0.35')}`,
                      color: '#fff', cursor: 'pointer',
                      fontSize: '0.65rem', letterSpacing: '0.25em',
                      textTransform: 'uppercase', fontWeight: 600,
                      borderRadius: '2px', transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = current.accent.replace('0.85', '0.1');
                      b.style.borderColor = current.accent;
                    }}
                    onMouseLeave={e => {
                      const b = e.currentTarget as HTMLButtonElement;
                      b.style.background = 'transparent';
                      b.style.borderColor = current.accent.replace('0.85', '0.35');
                    }}
                  >
                    Explore Style <span style={{ fontSize: '0.9rem' }}>→</span>
                  </button>
                </Link>
              </div>
            </div>

            {/* Right thumbnail strip */}
            <div className="flex lg:flex-1 flex-row lg:flex-col gap-3 max-w-full lg:max-w-[280px] lg:ml-auto overflow-x-auto pb-2 lg:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {STYLES.map((style, i) => {
                const isCurrent = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="flex-shrink-0"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.75rem',
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '0.4rem 0', textAlign: 'left',
                      transition: 'all 0.3s ease',
                      opacity: isCurrent ? 1 : 0.38,
                    }}
                    onMouseEnter={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.opacity = '0.65'; }}
                    onMouseLeave={e => { if (!isCurrent) (e.currentTarget as HTMLButtonElement).style.opacity = '0.38'; }}
                  >
                    <div style={{
                      width: isCurrent ? '52px' : '40px',
                      height: isCurrent ? '52px' : '40px',
                      borderRadius: '3px', overflow: 'hidden',
                      border: isCurrent ? `1px solid ${current.accent.replace('0.85', '0.6')}` : '1px solid rgba(255,255,255,0.1)',
                      flexShrink: 0, transition: 'all 0.4s ease',
                    }}>
                      <img
                        src={style.image} alt={style.label}
                        style={{
                          width: '100%', height: '100%', objectFit: 'cover',
                          filter: isCurrent ? 'brightness(1)' : 'brightness(0.45) grayscale(0.4)',
                          transition: 'all 0.4s ease',
                        }}
                      />
                    </div>
                    <div>
                      <p style={{
                        color: isCurrent ? '#fff' : 'rgba(255,255,255,0.5)',
                        fontSize: '0.65rem', letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        fontWeight: isCurrent ? 700 : 400,
                        transition: 'all 0.3s ease', marginBottom: '0.15rem',
                      }}>
                        {style.label}
                      </p>
                      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.55rem', letterSpacing: '0.15em' }}>
                        {style.num}
                      </p>
                    </div>
                    {isCurrent && (
                      <div style={{ marginLeft: 'auto', width: '20px', height: '1px', background: current.accent, flexShrink: 0 }} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Progress track */}
            <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)', position: 'relative', maxWidth: '300px' }}>
              <div style={{
                position: 'absolute', left: 0, top: 0, height: '100%',
                width: `${((active + 1) / STYLES.length) * 100}%`,
                background: current.accent,
                transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>

            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', fontWeight: 300 }}>
              {String(active + 1).padStart(2, '0')} / {String(STYLES.length).padStart(2, '0')}
            </span>

            <div style={{ marginLeft: 'auto' }}>
              <Link to="/Items" style={{
                color: 'rgba(255,255,255,0.35)', fontSize: '0.6rem',
                letterSpacing: '0.25em', textTransform: 'uppercase',
                textDecoration: 'none', transition: 'color 0.25s ease',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
              }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#fff')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.35)')}
              >
                View All Styles <span>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ── KEYFRAMES ── */}
        <style>{`
        @keyframes imgFadeIn {
          from { opacity:0; transform:scale(1.04); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes imgFadeOut {
          from { opacity:1; }
          to   { opacity:0; }
        }
        @keyframes glowIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes numSlideIn {
          from { opacity:0; transform:translateX(-40px); }
          to   { opacity:1; transform:translateX(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scrollPulse {
          0%,100% { opacity:0.4; transform:scaleY(1); }
          50%     { opacity:1;   transform:scaleY(1.15); }
        }
      `}</style>
      </div>
    </section>
  );
};

export default StylesSection;