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

      {/* ── OUR WASHING CTA — full-width banner ── */}
      <div
        style={{
          width: '100%',
          backgroundColor: '#030b13',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          minHeight: 'clamp(420px, 55vw, 680px)',
        }}
      >
        {/* ── LEFT: Text content ── */}
        <div
          style={{
            flex: '1 1 50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(3rem, 7vw, 7rem) clamp(2rem, 6vw, 6rem)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* Radial glow */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 80% 70% at 0% 60%, rgba(13,33,71,0.7) 0%, transparent 70%)' }} />

          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)', position: 'relative' }}>
            <div style={{ width: 36, height: 1, background: 'rgba(147,197,253,0.45)' }} />
            <span style={{ color: 'rgba(147,197,253,0.65)', fontSize: 'clamp(0.55rem, 0.7vw, 0.7rem)', fontWeight: 700, letterSpacing: '0.35em', textTransform: 'uppercase' }}>
              Explore Our Process
            </span>
          </div>

          {/* Main headline */}
          <h2 style={{
            color: '#ffffff',
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(2.4rem, 5vw, 5.5rem)',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            margin: '0 0 clamp(1rem, 2vw, 1.5rem)',
            position: 'relative',
          }}>
            See Our<br />
            <span style={{ color: 'rgba(147,197,253,0.85)' }}>Whole</span><br />
            Washing<br />
            Process
          </h2>

          {/* Accent line */}
          <div style={{ width: 70, height: 2, background: 'linear-gradient(to right, rgba(147,197,253,0.7), transparent)', marginBottom: 'clamp(1.2rem, 2.5vw, 2rem)', position: 'relative' }} />

          {/* Description */}
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: 'clamp(0.82rem, 1.1vw, 1.05rem)',
            fontWeight: 300,
            lineHeight: 1.85,
            letterSpacing: '0.02em',
            maxWidth: 440,
            margin: '0 0 clamp(2rem, 3.5vw, 3rem)',
            position: 'relative',
          }}>
            From stonewash to enzyme treatments — discover the full range of washing and finishing techniques that give our denim its unique character, texture, and longevity.
          </p>

          {/* CTA Button */}
          <div style={{ position: 'relative' }}>
            <a
              href="/AboutUS#our-washing"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                padding: 'clamp(0.9rem, 1.5vw, 1.2rem) clamp(1.8rem, 3vw, 3rem)',
                background: 'rgba(147,197,253,0.07)',
                border: '1px solid rgba(147,197,253,0.4)',
                color: 'rgba(147,197,253,0.95)',
                fontSize: 'clamp(0.62rem, 0.85vw, 0.82rem)',
                fontWeight: 700,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.35s ease',
                borderRadius: '2px',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(147,197,253,0.15)';
                el.style.borderColor = 'rgba(147,197,253,0.8)';
                el.style.color = '#fff';
                el.style.boxShadow = '0 0 40px rgba(147,197,253,0.18), inset 0 0 20px rgba(147,197,253,0.04)';
                el.style.letterSpacing = '0.32em';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'rgba(147,197,253,0.07)';
                el.style.borderColor = 'rgba(147,197,253,0.4)';
                el.style.color = 'rgba(147,197,253,0.95)';
                el.style.boxShadow = 'none';
                el.style.letterSpacing = '0.28em';
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
              </svg>
              View Washing Process
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT: Washing image panel ── */}
        <div
          style={{
            flex: '1 1 50%',
            position: 'relative',
            minHeight: '100%',
            overflow: 'hidden',
          }}
        >
          {/* Main image */}
          <img
            src="/images/washing/2.jpeg"
            alt="Our washing process"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.6) saturate(0.65)',
              position: 'absolute',
              inset: 0,
            }}
          />

          {/* Left-side fade into dark bg */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #030b13 0%, rgba(3,11,19,0.4) 30%, transparent 60%)' }} />
          {/* Bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(3,11,19,0.6) 0%, transparent 40%)' }} />

          {/* Floating label badge */}
          <div style={{
            position: 'absolute',
            top: 'clamp(1.5rem, 3vw, 2.5rem)',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(3,11,19,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(147,197,253,0.2)',
            borderRadius: '50px',
            padding: '0.5rem 1.1rem',
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(147,197,253,0.85)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2C6 10 4 14 4 16a8 8 0 0016 0c0-2-2-6-8-14z" />
            </svg>
            <span style={{ color: 'rgba(147,197,253,0.85)', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase' }}>
              Washing
            </span>
          </div>

          {/* Bottom-right corner stat */}
          <div style={{
            position: 'absolute',
            bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            right: 'clamp(1.5rem, 3vw, 2.5rem)',
            textAlign: 'right',
          }}>
            <div style={{ color: '#fff', fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)', fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em' }}>20+</div>
            <div style={{ color: 'rgba(147,197,253,0.6)', fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)', fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginTop: '0.25rem' }}>Wash Techniques</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoSection;