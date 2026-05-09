import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CAPABILITIES = [
  {
    label: 'Design &\nDevelopment',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    label: 'Fabric\nSourcing',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: 'Washing &\nFinishing',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2" />
        <circle cx="12" cy="13" r="4" />
        <path d="M5 7h.01M8 7h.01" />
      </svg>
    ),
  },
  {
    label: 'Quality\nControl',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12l2 2 4-4" />
        <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
      </svg>
    ),
  },
  {
    label: 'Low MOQ &\nFlexibility',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    label: 'On-Time\nDelivery',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

const Capabilities = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [btnHover, setBtnHover] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#030b13',
        background:
          'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(13,33,71,0.7) 0%, #030b13 65%)',
        width: '100%',
        padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1.5rem, 6vw, 5rem)',
      }}
    >
      {/* Top row: left text + right items */}
      <div
        style={{
          display: 'flex',
          gap: 'clamp(2rem, 5vw, 5rem)',
          alignItems: 'flex-start',
          marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
        }}
      >
        {/* Left */}
        <div
          style={{
            flex: '0 0 auto',
            width: 'clamp(240px, 30%, 360px)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(32px)',
            transition: 'opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s',
          }}
        >
          <p
            style={{
              color: 'rgba(147,197,253,0.65)',
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.9rem',
            }}
          >
            Our Capabilities
          </p>
          <h2
            style={{
              color: '#ffffff',
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(1.7rem, 3.2vw, 2.8rem)',
              textTransform: 'uppercase',
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              marginBottom: '1rem',
            }}
          >
            From Concept To Creation
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.78rem',
              fontWeight: 300,
              lineHeight: 1.7,
              letterSpacing: '0.03em',
              marginBottom: '1.75rem',
            }}
          >
            End-to-end manufacturing solutions with unmatched quality and efficiency.
          </p>
          <Link to="/ContactUS">
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
              Our Capabilities
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

        {/* Right: 6 icons in 2×3 grid */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1.5rem, 3vw, 2.5rem) clamp(1rem, 2vw, 2rem)',
            alignContent: 'center',
          }}
        >
          {CAPABILITIES.map((cap, i) => (
            <CapabilityItem key={i} cap={cap} index={i} visible={visible} />
          ))}
        </div>
      </div>

      {/* Thin accent line */}
      <div
        style={{
          width: '100%',
          height: '1px',
          background:
            'linear-gradient(to right, rgba(147,197,253,0.15), rgba(147,197,253,0.05), transparent)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease 0.9s',
        }}
      />
    </section>
  );
};

interface CapItemProps {
  cap: { label: string; icon: React.ReactNode };
  index: number;
  visible: boolean;
}

const CapabilityItem = ({ cap, index, visible }: CapItemProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '0.75rem',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.6s ease ${index * 0.1 + 0.3}s, transform 0.6s ease ${index * 0.1 + 0.3}s`,
        cursor: 'default',
      }}
    >
      <div
        style={{
          color: hovered ? 'rgba(147,197,253,0.9)' : 'rgba(255,255,255,0.45)',
          transition: 'color 0.3s ease',
        }}
      >
        {cap.icon}
      </div>
      <p
        style={{
          color: hovered ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.55)',
          fontSize: '0.68rem',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          lineHeight: 1.4,
          whiteSpace: 'pre-line',
          transition: 'color 0.3s ease',
        }}
      >
        {cap.label}
      </p>
    </div>
  );
};

export default Capabilities;
