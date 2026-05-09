import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const STYLES = [
  { num: '01', label: 'Vintage\nWash', image: '/images/man/09.jpg' },
  { num: '02', label: 'Black\nResin', image: '/images/man/02.jpg' },
  { num: '03', label: 'Utility\nDenim', image: '/images/man/11.jpg' },
  { num: '04', label: 'Coated\nFinish', image: '/images/man/05.jpg' },
  { num: '05', label: 'Overdyed\nLook', image: '/images/man/20.jpg' },
];

interface PanelProps {
  num: string;
  label: string;
  image: string;
  index: number;
  visible: boolean;
}

const StylePanel = ({ num, label, image, index, visible }: PanelProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        flex: hovered ? '1.45' : '1',
        transition: 'flex 0.5s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(60px)',
        transitionProperty: 'flex, opacity, transform',
        transitionDuration: `0.5s, 0.65s, 0.65s`,
        transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1), ease, ease',
        transitionDelay: `0s, ${index * 0.1 + 0.15}s, ${index * 0.1 + 0.15}s`,
      }}
    >
      {/* Photo */}
      <img
        src={image}
        alt={label}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          filter: hovered
            ? 'brightness(0.6) contrast(1.1) saturate(0.6)'
            : 'brightness(0.35) contrast(1.1) saturate(0.3)',
          transform: hovered ? 'scale(1.06)' : 'scale(1)',
          transition: 'transform 0.6s ease, filter 0.5s ease',
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(3,11,19,0.95) 0%, rgba(3,11,19,0.5) 35%, transparent 70%)',
        }}
      />

      {/* Blue border on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: hovered ? 'inset 0 0 0 1px rgba(59,130,246,0.45)' : 'none',
          transition: 'box-shadow 0.4s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(1rem, 2vw, 1.75rem)',
        }}
      >
        <p
          style={{
            color: 'rgba(147,197,253,0.55)',
            fontSize: '0.6rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            marginBottom: '0.4rem',
          }}
        >
          {num}
        </p>
        {/* Thin accent line */}
        <div
          style={{
            width: hovered ? '32px' : '18px',
            height: '1px',
            background: 'rgba(147,197,253,0.5)',
            marginBottom: '0.55rem',
            transition: 'width 0.4s ease',
          }}
        />
        <p
          style={{
            color: hovered ? '#ffffff' : 'rgba(255,255,255,0.75)',
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(0.85rem, 1.5vw, 1.15rem)',
            textTransform: 'uppercase',
            lineHeight: 1.05,
            letterSpacing: '-0.01em',
            whiteSpace: 'pre-line',
            transition: 'color 0.3s ease',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  );
};

const StylesSection = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#030b13',
        width: '100%',
        display: 'flex',
        minHeight: 'clamp(480px, 55vw, 680px)',
      }}
    >
      {/* Left text panel */}
      <div
        style={{
          width: 'clamp(200px, 22%, 300px)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: 'clamp(2rem, 4vw, 3.5rem) clamp(1.5rem, 3vw, 2.5rem)',
          background:
            'linear-gradient(to right, #030b13 60%, rgba(3,11,19,0.8) 100%)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <p
          style={{
            color: 'rgba(147,197,253,0.65)',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
          }}
        >
          Explore Our Styles
        </p>
        <h2
          style={{
            color: '#ffffff',
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}
        >
          Denim For Every Vision
        </h2>
        <Link to="/Items">
          <button
            onMouseEnter={() => setBtnHover(true)}
            onMouseLeave={() => setBtnHover(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              background: 'transparent',
              border: `1px solid ${btnHover ? 'rgba(147,197,253,0.6)' : 'rgba(255,255,255,0.2)'}`,
              color: btnHover ? 'rgba(147,197,253,0.95)' : 'rgba(255,255,255,0.7)',
              padding: '0.65rem 1.3rem',
              cursor: 'pointer',
              fontSize: '0.62rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: btnHover ? '0 0 18px rgba(59,130,246,0.2)' : 'none',
            }}
          >
            View All Styles
            <span
              style={{
                display: 'inline-block',
                transform: btnHover ? 'translateX(5px)' : 'translateX(0)',
                transition: 'transform 0.3s ease',
              }}
            >
              →
            </span>
          </button>
        </Link>
      </div>

      {/* 5 vertical panels */}
      <div style={{ flex: 1, display: 'flex', gap: '1px', overflow: 'hidden' }}>
        {STYLES.map((s, i) => (
          <StylePanel key={i} {...s} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default StylesSection;
