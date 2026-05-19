import React, { useState, useRef, useEffect } from "react";

interface RegionData {
  name: string;
  percentage: number;
  color: string;
  market: string;
}

const regions: RegionData[] = [
  { name: "United Kingdom", percentage: 50, color: "#93c5fd", market: "Primary Market" },
  { name: "United Arab Emirates", percentage: 20, color: "#3b82f6", market: "Growing Hub" },
  { name: "United States", percentage: 15, color: "#e2e8f0", market: "Emerging Market" },
  { name: "Europe", percentage: 15, color: "#1e3a8a", market: "Expanding Reach" },
];

const WorldAndUs: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [counted, setCounted] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setCounted(true);
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const anim = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(32px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  const slideRight = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : "translateX(40px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  // --- Donut chart math ---
  const size = 340;
  const center = size / 2;
  const strokeWidth = 38;
  const radius = (size - strokeWidth) / 2 - 8;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  const segments = regions.map((region) => {
    const dashArray = (region.percentage / 100) * circumference - 4; // 4px gap
    const dashOffset = -cumulativePercent / 100 * circumference;
    cumulativePercent += region.percentage;
    return { ...region, dashArray, dashOffset };
  });

  const activeData = regions.find((r) => r.name === activeRegion);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#030b13",
        padding: "clamp(3rem, 6vw, 6rem) 0",
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 70% 60% at 70% 50%, rgba(13,33,71,0.55) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      {/* Subtle grid texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(147,197,253,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(147,197,253,0.03) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(3rem, 6vw, 7rem)",
          alignItems: "center",
        }}
        className="world-grid"
      >
        {/* ── LEFT: Text + Region List ── */}
        <div>
          {/* Eyebrow */}
          <div style={{ ...anim(0), marginBottom: "1.2rem", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: 28, height: 1, background: "rgba(147,197,253,0.5)" }} />
            <span
              style={{
                color: "rgba(147,197,253,0.6)",
                fontSize: "0.6rem",
                fontWeight: 700,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
              }}
            >
              Our Reach
            </span>
          </div>

          {/* Heading */}
          <h2
            style={{
              ...anim(0.1),
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontWeight: 900,
              fontSize: "clamp(2.4rem, 4.5vw, 4rem)",
              textTransform: "uppercase",
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "#fff",
              marginBottom: "1.5rem",
            }}
          >
            Global
            <br />
            <span
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.35)",
                color: "transparent",
              }}
            >
              Operations
            </span>
          </h2>

          {/* Divider */}
          <div
            style={{
              ...anim(0.2),
              width: 48,
              height: 2,
              background: "linear-gradient(90deg, rgba(147,197,253,0.7), transparent)",
              marginBottom: "1.8rem",
            }}
          />

          {/* Description */}
          <p
            style={{
              ...anim(0.25),
              color: "rgba(255,255,255,0.45)",
              fontSize: "0.9rem",
              fontWeight: 300,
              lineHeight: 1.8,
              letterSpacing: "0.03em",
              maxWidth: 400,
              marginBottom: "3rem",
            }}
          >
            AH Denim supplies premium garments to fashion houses and retail brands across four key global markets — built on 25+ years of manufacturing trust.
          </p>

          {/* Region List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {regions.map((region, i) => {
              const isActive = activeRegion === region.name;
              const isFaded = activeRegion !== null && !isActive;
              return (
                <div
                  key={region.name}
                  onMouseEnter={() => setActiveRegion(region.name)}
                  onMouseLeave={() => setActiveRegion(null)}
                  style={{
                    ...anim(0.35 + i * 0.08),
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "0.9rem 1.2rem",
                    background: isActive
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,0.02)",
                    border: `1px solid ${isActive ? region.color + "66" : "rgba(255,255,255,0.06)"}`,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    opacity: isFaded ? 0.4 : 1,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Active fill glow */}
                  {isActive && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(90deg, ${region.color}18, transparent)`,
                        pointerEvents: "none",
                      }}
                    />
                  )}

                  {/* Color dot */}
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      backgroundColor: region.color,
                      boxShadow: isActive ? `0 0 12px ${region.color}` : "none",
                      flexShrink: 0,
                      transition: "box-shadow 0.3s ease",
                    }}
                  />

                  {/* Name + market label */}
                  <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
                    <div
                      style={{
                        color: isActive ? "#fff" : "rgba(255,255,255,0.75)",
                        fontSize: "0.85rem",
                        fontWeight: 400,
                        letterSpacing: "0.02em",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {region.name}
                    </div>
                    <div
                      style={{
                        color: "rgba(255,255,255,0.3)",
                        fontSize: "0.62rem",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        marginTop: 2,
                      }}
                    >
                      {region.market}
                    </div>
                  </div>

                  {/* Percentage */}
                  <span
                    style={{
                      fontFamily: "'Arial Black', Impact, sans-serif",
                      fontWeight: 900,
                      fontSize: "1.4rem",
                      color: isActive ? region.color : "rgba(255,255,255,0.5)",
                      lineHeight: 1,
                      transition: "color 0.3s ease",
                      position: "relative",
                      zIndex: 1,
                    }}
                  >
                    {region.percentage}%
                  </span>

                  {/* Progress bar at bottom */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      height: 2,
                      width: isActive ? `${region.percentage}%` : "0%",
                      background: `linear-gradient(90deg, ${region.color}, transparent)`,
                      transition: "width 0.5s ease",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Donut Chart ── */}
        <div
          style={{
            ...slideRight(0.3),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Chart wrapper with outer glow ring */}
          <div
            style={{
              position: "relative",
              width: "clamp(260px, 28vw, 360px)",
              height: "clamp(260px, 28vw, 360px)",
            }}
          >
            {/* Outer ambient glow */}
            <div
              style={{
                position: "absolute",
                inset: "-20px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <svg
              viewBox={`0 0 ${size} ${size}`}
              style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}
            >
              {/* Track ring */}
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={strokeWidth}
              />

              {/* Segments */}
              {segments.map((seg) => {
                const isActive = activeRegion === seg.name;
                const isFaded = activeRegion !== null && !isActive;
                return (
                  <circle
                    key={seg.name}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={seg.color}
                    strokeWidth={isActive ? strokeWidth + 6 : strokeWidth}
                    strokeDasharray={`${visible ? seg.dashArray : 0} ${circumference}`}
                    strokeDashoffset={seg.dashOffset}
                    strokeLinecap="butt"
                    onMouseEnter={() => setActiveRegion(seg.name)}
                    onMouseLeave={() => setActiveRegion(null)}
                    style={{
                      cursor: "pointer",
                      opacity: isFaded ? 0.25 : 1,
                      filter: isActive ? `drop-shadow(0 0 14px ${seg.color}90)` : "none",
                      transition: `stroke-dasharray 1.4s cubic-bezier(0.4,0,0.2,1) ${segments.indexOf(seg) * 0.15}s, opacity 0.3s ease, stroke-width 0.3s ease, filter 0.3s ease`,
                    }}
                  />
                );
              })}
            </svg>

            {/* Center info */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                pointerEvents: "none",
                transition: "all 0.4s ease",
              }}
            >
              {activeData ? (
                <>
                  <span
                    style={{
                      color: activeData.color,
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {activeData.market}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Arial Black', Impact, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      color: activeData.color,
                      lineHeight: 1,
                    }}
                  >
                    {activeData.percentage}%
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      marginTop: 6,
                      textAlign: "center",
                      maxWidth: 100,
                    }}
                  >
                    {activeData.name}
                  </span>
                </>
              ) : (
                <>
                  <span
                    style={{
                      color: "rgba(147,197,253,0.5)",
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Global
                  </span>
                  <span
                    style={{
                      fontFamily: "'Arial Black', Impact, sans-serif",
                      fontWeight: 900,
                      fontSize: "clamp(2rem, 4vw, 2.8rem)",
                      color: "#fff",
                      lineHeight: 1,
                    }}
                  >
                    4
                  </span>
                  <span
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      marginTop: 6,
                      textTransform: "uppercase",
                    }}
                  >
                    Markets
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Bottom label */}
          <p
            style={{
              ...anim(0.6),
              marginTop: "2rem",
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Hover segments to explore
          </p>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (max-width: 900px) {
          .world-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default WorldAndUs;