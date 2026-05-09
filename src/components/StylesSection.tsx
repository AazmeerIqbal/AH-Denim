import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const STYLES = [
  { num: '01', label: 'Vintage Wash', description: 'A timeless look achieved through expert distressing and stonewashing techniques, bringing out the authentic character of premium denim.', image: '/images/vintage wash.jpeg' },
  { num: '02', label: 'Black Resin', description: 'Deep, rich black denim coated with a sleek resin finish for a refined, premium feel that effortlessly transitions from day to night.', image: '/images/man/02.jpg' },
  { num: '03', label: 'Utility Denim', description: 'Functional and durable, featuring reinforced stitching and practical cargo pockets built for the modern explorer.', image: '/images/man/11.jpg' },
  { num: '04', label: 'Coated Finish', description: 'A subtle waxed appearance that adds an edgy, leather-like texture to the denim, offering a bold statement.', image: '/images/man/05.jpg' },
  { num: '05', label: 'Overdyed Look', description: 'Intense, saturated color profiles created by over-dyeing premium indigo fabrics, resulting in unparalleled depth.', image: '/images/man/20.jpg' },
];

const StylesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number;
    let targetProgress = 0;
    let currentProgress = 0;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = height - windowHeight;
      const scrolled = -top;

      let progress = scrolled / scrollableDistance;
      progress = Math.max(0, Math.min(1, progress));
      targetProgress = progress;
    };

    // Smooth interpolation (lerp) for the scroll progress
    const smoothScroll = () => {
      currentProgress += (targetProgress - currentProgress) * 0.1;
      setScrollProgress(currentProgress);
      rafId = requestAnimationFrame(smoothScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    rafId = requestAnimationFrame(smoothScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        // 100vh per slide to give enough scroll distance
        height: `${STYLES.length * 100}vh`,
        position: 'relative',
        backgroundColor: '#030b13'
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          width: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: `${STYLES.length * 100}vw`,
            // Use the lerped scrollProgress for buttery smooth sliding
            transform: `translateX(-${scrollProgress * (100 - (100 / STYLES.length))}%)`,
            willChange: 'transform'
          }}
        >
          {STYLES.map((style, index) => {
            // Calculate if this slide is currently the main one in view
            const slideProgress = scrollProgress * (STYLES.length - 1);
            const isActive = Math.abs(slideProgress - index) < 0.6;

            return (
              <div
                key={index}
                style={{
                  width: '100vw',
                  height: '100%',
                  display: 'flex',
                  position: 'relative',
                  flexShrink: 0
                }}
              >
                {/* Left Image Side */}
                <div
                  style={{
                    width: '60%',
                    height: '100%',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <img
                    src={style.image}
                    alt={style.label}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(0.65) contrast(1.15)',
                      transform: isActive ? 'scale(1)' : 'scale(1.1)',
                      transition: 'transform 1.5s cubic-bezier(0.25, 1, 0.5, 1)'
                    }}
                  />

                  {/* Subtle gradient to blend left edge if needed */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(3,11,19,0.8) 0%, transparent 20%)'
                  }} />
                </div>

                {/* Right Content Side with Curved Overlap */}
                <div
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: '55%',
                    height: '100%',
                    backgroundColor: '#030b13',
                    // Creates an elegant curve overlapping the image on the left
                    clipPath: 'ellipse(120% 100% at 100% 50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: '12%',
                    paddingRight: '8%',
                    zIndex: 2,
                  }}
                >
                  {/* Background radial glow */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(circle at 70% 50%, rgba(13,33,71,0.5) 0%, transparent 70%)',
                      zIndex: -1
                    }}
                  />

                  <div style={{
                    opacity: isActive ? 1 : 0,
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                      <p
                        style={{
                          color: 'rgba(147,197,253,0.8)',
                          fontSize: '0.9rem',
                          fontWeight: 600,
                          letterSpacing: '0.3em',
                        }}
                      >
                        {style.num}
                      </p>
                      <div style={{ width: '40px', height: '1px', backgroundColor: 'rgba(147,197,253,0.4)' }} />
                    </div>

                    <h2
                      style={{
                        color: '#ffffff',
                        fontFamily: "'Arial Black', Impact, sans-serif",
                        fontWeight: 900,
                        fontSize: 'clamp(3rem, 5vw, 5rem)',
                        textTransform: 'uppercase',
                        lineHeight: 1.0,
                        letterSpacing: '-0.02em',
                        marginBottom: '1.5rem',
                      }}
                    >
                      {style.label}
                    </h2>

                    <p
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '1.05rem',
                        fontWeight: 300,
                        lineHeight: 1.8,
                        letterSpacing: '0.03em',
                        maxWidth: '480px',
                        marginBottom: '3rem'
                      }}
                    >
                      {style.description}
                    </p>

                    <Link to="/Items">
                      <button
                        className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full"
                        style={{
                          padding: '0.8rem 2rem',
                          background: 'transparent',
                          border: '1px solid rgba(147,197,253,0.4)',
                          color: '#ffffff',
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          letterSpacing: '0.2em',
                          textTransform: 'uppercase',
                          fontWeight: 600,
                          transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(147,197,253,0.1)';
                          e.currentTarget.style.borderColor = 'rgba(147,197,253,0.8)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.borderColor = 'rgba(147,197,253,0.4)';
                        }}
                      >
                        Explore Style
                        <span style={{ transition: 'transform 0.3s ease' }} className="group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StylesSection;
