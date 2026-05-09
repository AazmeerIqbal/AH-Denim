import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const COLLECTIONS = [
  {
    category: 'Men',
    tagline: 'Timeless. Versatile.\nBuilt to perform.',
    image: '/images/men.png',
    link: '/Items?category=Man',
  },
  {
    category: 'Women',
    tagline: 'Confident. Contemporary.\nDesigned to empower.',
    image: '/images/women.png',
    link: '/Items?category=Woman',
  },
  {
    category: 'Kids',
    tagline: 'Comfort. Quality.\nMade for movement.',
    image: '/images/kid.png',
    link: '/Items?category=Kids',
  },
];

interface CardProps {
  category: string;
  tagline: string;
  image: string;
  link: string;
  index: number;
  visible: boolean;
}

const CollectionCard = ({ category, tagline, image, link, index, visible }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      to={link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '2 / 3',
        display: 'block',
        textDecoration: 'none',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(70px)',
        transition: `opacity 0.75s ease ${index * 0.14 + 0.15}s, transform 0.75s ease ${index * 0.14 + 0.15}s`,
        flex: 1,
      }}
    >
      {/* Photo */}
      <img
        src={image}
        alt={category}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'top center',
          filter: hovered ? 'brightness(0.65) contrast(1.05)' : 'brightness(0.8) contrast(1.05)',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.7s ease, filter 0.5s ease',
        }}
      />

      {/* Bottom gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(3,11,19,0.92) 0%, rgba(3,11,19,0.35) 45%, transparent 100%)',
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
          padding: 'clamp(1rem, 2vw, 1.5rem)',
        }}
      >
        <p
          style={{
            color: 'rgba(147,197,253,0.75)',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '0.3rem',
          }}
        >
          {category}
        </p>
        <p
          style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '0.68rem',
            fontWeight: 300,
            lineHeight: 1.55,
            letterSpacing: '0.04em',
            marginBottom: '0.85rem',
            whiteSpace: 'pre-line',
          }}
        >
          {tagline}
        </p>
        <span
          style={{
            color: hovered ? 'rgba(147,197,253,0.95)' : 'rgba(255,255,255,0.38)',
            fontSize: '1rem',
            display: 'inline-block',
            transform: hovered ? 'translateX(8px)' : 'translateX(0)',
            transition: 'color 0.3s ease, transform 0.35s ease',
          }}
        >
          →
        </span>
      </div>
    </Link>
  );
};

const Collections = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#030b13',
        background:
          'radial-gradient(ellipse 70% 60% at 80% 50%, #0d2147 0%, #030b13 65%)',
        width: '100%',
        display: 'flex',
        alignItems: 'stretch',
        minHeight: '520px',
      }}
    >
      {/* Left text block */}
      <div
        style={{
          width: 'clamp(220px, 26%, 320px)',
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 'clamp(2rem, 4vw, 4rem) clamp(1.5rem, 3vw, 3rem)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateX(0)' : 'translateX(-40px)',
          transition: 'opacity 0.75s ease 0.1s, transform 0.75s ease 0.1s',
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
          Our Collections
        </p>
        <h2
          style={{
            color: '#ffffff',
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}
        >
          Denim For Every Generation
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
              border: `1px solid ${btnHover ? 'rgba(147,197,253,0.6)' : 'rgba(255,255,255,0.22)'}`,
              color: btnHover ? 'rgba(147,197,253,0.95)' : 'rgba(255,255,255,0.75)',
              padding: '0.65rem 1.3rem',
              cursor: 'pointer',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              fontWeight: 600,
              transition: 'all 0.3s ease',
              boxShadow: btnHover ? '0 0 18px rgba(59,130,246,0.2)' : 'none',
            }}
          >
            Explore All
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

      {/* Cards strip */}
      <div style={{ flex: 1, display: 'flex', gap: '1px', overflow: 'hidden' }}>
        {COLLECTIONS.map((col, i) => (
          <CollectionCard key={i} {...col} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default Collections;
