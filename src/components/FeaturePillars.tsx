import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const PILLARS = [
  {
    title: 'Premium\nFabrics',
    tagline: 'Carefully chosen.\nPerfectly crafted.',
    image: '/images/jeans1.jpg',
  },
  {
    title: 'Innovative\nWashes',
    tagline: 'Unique tones.\nLasting impressions.',
    image: '/images/jeans2.jpg',
  },
  {
    title: 'Expert\nTechniques',
    tagline: 'Precision in every\ndetail.',
    image: '/images/jacket1.jpg',
  },
  {
    title: 'Sustainable\nFuture',
    tagline: 'Responsible today.\nBetter tomorrow.',
    image: '/images/jacket2.jpg',
  },
];

interface CardProps {
  title: string;
  tagline: string;
  image: string;
  index: number;
  visible: boolean;
}

const PillarCard = ({ title, tagline, image, index, visible }: CardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '3 / 4',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(52px)',
        transition: `opacity 0.75s ease ${index * 0.13}s, transform 0.75s ease ${index * 0.13}s`,
        boxShadow: hovered
          ? 'inset 0 0 0 1px rgba(59,130,246,0.55)'
          : 'inset 0 0 0 1px rgba(255,255,255,0.06)',
      }}
    >
      {/* BG Image */}
      <img
        src={image}
        alt={title}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'brightness(0.28) contrast(1.15) saturate(0.3)',
          transform: hovered ? 'scale(1.07)' : 'scale(1)',
          transition: 'transform 0.7s ease, filter 0.5s ease',
        }}
      />

      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(to top, rgba(3,11,19,0.98) 0%, rgba(3,11,19,0.55) 50%, rgba(3,11,19,0.1) 100%)',
        }}
      />

      {/* Blue radial glow on hover */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 80% 60% at 0% 100%, rgba(59,130,246,0.13) 0%, transparent 70%)',
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'clamp(1rem, 2.5vw, 1.75rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <h3
          style={{
            color: '#ffffff',
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: 'clamp(1.1rem, 2.2vw, 1.55rem)',
            textTransform: 'uppercase',
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: '0.55rem',
            whiteSpace: 'pre-line',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            color: 'rgba(255,255,255,0.42)',
            fontSize: 'clamp(0.62rem, 0.85vw, 0.72rem)',
            fontWeight: 300,
            lineHeight: 1.6,
            letterSpacing: '0.04em',
            marginBottom: '1.1rem',
            whiteSpace: 'pre-line',
          }}
        >
          {tagline}
        </p>
        <span
          style={{
            color: hovered ? 'rgba(147,197,253,0.9)' : 'rgba(255,255,255,0.32)',
            fontSize: '1.05rem',
            display: 'inline-block',
            transform: hovered ? 'translateX(6px)' : 'translateX(0)',
            transition: 'color 0.3s ease, transform 0.3s ease',
          }}
        >
          →
        </span>
      </div>
    </div>
  );
};

const FeaturePillars = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      style={{ backgroundColor: '#030b13', width: '100%' }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full">
        {PILLARS.map((p, i) => (
          <PillarCard key={i} {...p} index={i} visible={visible} />
        ))}
      </div>
    </section>
  );
};

export default FeaturePillars;
