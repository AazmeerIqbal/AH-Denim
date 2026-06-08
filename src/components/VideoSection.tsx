import { useEffect, useRef, useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const VideoSection = () => {
  const { ref, visible } = useScrollReveal(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (visible && videoRef.current) {
      videoRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.log("Auto-play prevented by browser", e));
    } else if (!visible && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [visible]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); setIsPlaying(false); }
      else { videoRef.current.play(); setIsPlaying(true); }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) { videoRef.current.muted = !isMuted; setIsMuted(!isMuted); }
  };

  return (
    <>
      <section
        id="video-section"
        ref={ref}
        className="flex flex-col lg:flex-row items-center w-full"
        style={{
          backgroundColor: '#030b13',
          padding: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 6vw, 5rem) clamp(4rem, 8vw, 6rem)',
          gap: 'clamp(2rem, 6vw, 6rem)',
        }}
      >
        {/* ── LEFT: VIDEO ── */}
        <div
          className="w-full lg:flex-1"
          style={{
            minWidth: '280px',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-40px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.05)',
            backgroundColor: '#000',
          }}
        >
          <video
            ref={videoRef}
            src="/About%20Video.mp4"
            muted={isMuted}
            loop
            playsInline
            style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover', filter: 'brightness(0.9) contrast(1.05)' }}
          />

          {/* Controls Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(1rem, 3vw, 2rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '1.25rem',
              background: 'rgba(3,11,19,0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '0.6rem 1.5rem',
              borderRadius: '50px',
              border: '1px solid rgba(255,255,255,0.15)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              zIndex: 10,
              alignItems: 'center',
            }}
          >
            <button
              onClick={togglePlay}
              style={{ color: 'rgba(255,255,255,0.9)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(147,197,253,1)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)'}
            >
              {isPlaying
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1" /><rect x="14" y="4" width="4" height="16" rx="1" /></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="6,3 20,12 6,21" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>
              }
            </button>

            <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }} />

            <button
              onClick={toggleMute}
              style={{ color: 'rgba(255,255,255,0.9)', background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'color 0.2s ease' }}
              onMouseEnter={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(147,197,253,1)'}
              onMouseLeave={e => (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.9)'}
            >
              {isMuted
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              }
            </button>
          </div>
        </div>

        {/* ── RIGHT: TEXT ── */}
        <div
          className="w-full lg:w-[35%] flex flex-col justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(40px)',
            transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
          }}
        >
          <p style={{ color: 'rgba(147,197,253,0.65)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            See It In Motion
          </p>

          <h2 style={{ color: '#ffffff', fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 3.5vw, 3.5rem)', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
            Craftsmanship<br />In Action
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.8, letterSpacing: '0.03em', marginBottom: '2.25rem', maxWidth: '450px' }}>
            Watch how raw materials are transformed into premium denim. Our commitment to quality is evident in every stitch, wash, and finishing touch. Experience the passion and precision that defines our brand from the inside out.
          </p>

          <div style={{ width: '60px', height: '1px', background: 'linear-gradient(to right, rgba(147,197,253,0.6), transparent)' }} />
        </div>
      </section>

      {/* ── OUR WASHING CTA — below the whole section ── */}
      <div
        style={{
          backgroundColor: '#030b13',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          padding: 'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 6vw, 5rem)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle glow behind CTA */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 80% at 50% 100%, rgba(13,33,71,0.55) 0%, transparent 65%)' }} />

        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 1 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(147,197,253,0.4)' }} />
          <span style={{ color: 'rgba(147,197,253,0.6)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.32em', textTransform: 'uppercase' }}>
            Explore Our Process
          </span>
          <div style={{ width: 28, height: 1, background: 'rgba(147,197,253,0.4)' }} />
        </div>

        {/* Text */}
        <p style={{
          color: 'rgba(255,255,255,0.4)',
          fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)',
          fontWeight: 300,
          lineHeight: 1.8,
          letterSpacing: '0.03em',
          textAlign: 'center',
          maxWidth: 520,
          margin: 0,
          position: 'relative',
          zIndex: 1,
        }}>
          From stonewash to enzyme treatments — discover the full range of washing and finishing techniques that give our denim its character.
        </p>

        {/* Button */}
        <a
          href="/AboutUS#our-washing"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.9rem 2.4rem',
            background: 'transparent',
            border: '1px solid rgba(147,197,253,0.38)',
            color: 'rgba(147,197,253,0.9)',
            fontSize: '0.62rem',
            fontWeight: 700,
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(147,197,253,0.08)';
            el.style.borderColor = 'rgba(147,197,253,0.75)';
            el.style.color = '#fff';
            el.style.boxShadow = '0 0 28px rgba(147,197,253,0.12)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'transparent';
            el.style.borderColor = 'rgba(147,197,253,0.38)';
            el.style.color = 'rgba(147,197,253,0.9)';
            el.style.boxShadow = 'none';
          }}
        >
          {/* Water drop */}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
          </svg>
          Our Washing
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </>
  );
};

export default VideoSection;