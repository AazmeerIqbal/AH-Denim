import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

/* ─── Counter hook ─── */
function useCounter(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
      else setCount(target);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [active, target, duration]);

  return count;
}

/* ─── Stat block ─── */
interface StatProps {
  target: number;
  suffix: string;
  label: string;
  index: number;
  active: boolean;
}
const StatBlock = ({ target, suffix, label, index, active }: StatProps) => {
  const count = useCounter(target, 1600 + index * 100, active);

  return (
    <div
      style={{
        padding: 'clamp(1.2rem, 2vw, 1.8rem) 0',
        borderBottom: index < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
        opacity: active ? 1 : 0,
        transform: active ? 'translateX(0)' : 'translateX(30px)',
        transition: `opacity 0.65s ease ${index * 0.14 + 0.3}s, transform 0.65s ease ${index * 0.14 + 0.3}s`,
      }}
    >
      <p
        style={{
          color: '#ffffff',
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(2rem, 4vw, 3.2rem)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          marginBottom: '0.35rem',
        }}
      >
        {target >= 1000
          ? count >= 1000
            ? `${Math.floor(count / 1000)},${String(count % 1000).padStart(3, '0')}+`
            : `${count}+`
          : `${count}${suffix}`}
      </p>
      <p
        style={{
          color: 'rgba(255,255,255,0.38)',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </p>
    </div>
  );
};

/* ─── Main section ─── */
const FactorySection = () => {
  const { ref, visible } = useScrollReveal(0.12);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [playHover, setPlayHover] = useState(false);

  /* Parallax: track section-relative scroll */
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const offset = -rect.top * 0.18;
      setScrollY(offset);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const STATS = [
    { target: 25, suffix: '+', label: 'Years of Experience' },
    { target: 150000, suffix: '+', label: 'Garments Monthly' },
    { target: 500, suffix: '+', label: 'Skilled Professionals' },
    { target: 100, suffix: '%', label: 'Quality Commitment' },
  ];

  return (
    <section
      ref={(el) => {
        // Attach both refs
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = el;
        (sectionRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      }}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#030b13',
        width: '100%',
        minHeight: 'clamp(520px, 60vw, 780px)',
        display: 'flex',
        alignItems: 'stretch',
      }}
    >
      {/* ── Parallax background image ── */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          zIndex: 0,
          transform: `translateY(${scrollY}px)`,
          transition: 'transform 0.05s linear',
          willChange: 'transform',
        }}
      >
        <img
          src="/images/factory production.png"
          alt="AH Denim Factory"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            // filter: 'brightness(0.28) contrast(1.1) saturate(0.35)',
          }}
        />
      </div>

      {/* Dark overlay gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'linear-gradient(to right, rgba(3,11,19,0.88) 0%, rgba(3,11,19,0.55) 55%, rgba(3,11,19,0.82) 100%)',
        }}
      />

      {/* Blue radial accent top-left */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background:
            'radial-gradient(ellipse 55% 55% at 0% 0%, rgba(13,33,71,0.55) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ── Content row ── */}
      <div
        className="relative z-10 flex-1 flex flex-col md:flex-row items-stretch w-full"
      >
        {/* LEFT: Text + CTA */}
        <div
          className="w-full md:w-[clamp(280px,48%,560px)] flex-shrink-0 flex flex-col justify-center"
          style={{
            padding: 'clamp(2.5rem, 6vw, 5rem) clamp(2rem, 6vw, 5rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(36px)',
            transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
          }}
        >
          <p
            style={{
              color: 'rgba(147,197,253,0.65)',
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1.1rem',
            }}
          >
            Behind Every Great Denim
          </p>

          <h2
            style={{
              color: '#ffffff',
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem',
            }}
          >
            From Concept To Creation
          </h2>

          <p
            style={{
              color: 'rgba(255,255,255,0.42)',
              fontSize: '0.8rem',
              fontWeight: 300,
              lineHeight: 1.75,
              letterSpacing: '0.03em',
              marginBottom: '2.25rem',
              maxWidth: '420px',
            }}
          >
            Our state-of-the-art facility blends advanced technology with skilled
            craftsmanship to deliver denim of unmatched quality.
          </p>

          {/* Play button CTA */}
          <button
            onMouseEnter={() => setPlayHover(true)}
            onMouseLeave={() => setPlayHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            {/* Circle play icon */}
            <div
              style={{
                width: '52px',
                height: '52px',
                borderRadius: '50%',
                border: `1px solid ${playHover ? 'rgba(147,197,253,0.7)' : 'rgba(255,255,255,0.25)'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
                boxShadow: playHover ? '0 0 22px rgba(59,130,246,0.3)' : 'none',
                background: playHover
                  ? 'rgba(59,130,246,0.08)'
                  : 'rgba(255,255,255,0.03)',
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill={playHover ? 'rgba(147,197,253,0.95)' : 'rgba(255,255,255,0.7)'}
                style={{ marginLeft: '2px', transition: 'fill 0.3s ease' }}
              >
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>

            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  color: playHover ? 'rgba(147,197,253,0.95)' : 'rgba(255,255,255,0.8)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  marginBottom: '0.15rem',
                  transition: 'color 0.3s ease',
                }}
              >
                Watch Our Factory
              </p>
              <p
                style={{
                  color: 'rgba(255,255,255,0.32)',
                  fontSize: '0.62rem',
                  fontWeight: 300,
                  letterSpacing: '0.05em',
                }}
              >
                See where excellence is made
              </p>
            </div>
          </button>
        </div>

        {/* ── Divider (horizontal on mobile, vertical on desktop) ── */}
        <div
          className="w-full h-[1px] md:w-[1px] md:h-auto self-stretch flex-shrink-0"
          style={{
            margin: 'clamp(1rem, 4vw, 3.5rem) 0',
            background:
              'linear-gradient(to bottom right, transparent, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent)',
            opacity: visible ? 1 : 0,
            transition: 'opacity 0.8s ease 0.5s',
          }}
        />

        {/* RIGHT: Stats */}
        <div
          className="flex-1 flex flex-col justify-center"
          style={{
            padding: 'clamp(2rem, 5vw, 4rem) clamp(2rem, 5vw, 4.5rem)',
          }}
        >
          {STATS.map((stat, i) => (
            <StatBlock
              key={i}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              index={i}
              active={visible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FactorySection;
