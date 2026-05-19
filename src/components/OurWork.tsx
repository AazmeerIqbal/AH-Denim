import { useState, useRef, useEffect } from "react";

const stats = [
  { value: "25+", label: "Years of Excellence" },
  { value: "150K+", label: "Garments Monthly" },
  { value: "500+", label: "Skilled Professionals" },
  { value: "4", label: "Global Markets" },
];

const OurWork = () => {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const anim = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0px)" : "translateY(32px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  const slideLeft = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(0px)" : "translateX(-40px)",
    transition: `opacity 1s ease ${delay}s, transform 1s ease ${delay}s`,
  });

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#030b13",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial glow — right side toward text */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 55% 70% at 75% 50%, rgba(13,33,71,0.7) 0%, transparent 65%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent, rgba(147,197,253,0.15) 30%, rgba(147,197,253,0.15) 70%, transparent)",
          zIndex: 1,
        }}
      />

      {/* ── MAIN TWO-COL — image bleeds full left, text padded right ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "52% 48%",
          alignItems: "stretch",
          position: "relative",
          zIndex: 1,
          minHeight: "75vh",
        }}
        className="ourwork-grid"
      >
        {/* ── LEFT: IMAGE — full bleed to left edge ── */}
        <div
          style={{
            ...slideLeft(0.1),
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img
            src="/images/AhDenim.png"
            alt="AH Denim"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              filter: hovered
                ? "brightness(0.80) contrast(1.08) saturate(0.75)"
                : "brightness(0.70) contrast(1.12) saturate(0.6)",
              transform: hovered ? "scale(1.04)" : "scale(1.0)",
              transition: "transform 1s ease, filter 0.9s ease",
            }}
          />

          {/* Right fade — blends image into bg seamlessly */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, transparent 50%, rgba(3,11,19,0.7) 80%, #030b13 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {/* Bottom fade */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(3,11,19,0.85) 0%, transparent 40%)",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />
          {/* Blue hover glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 40% 40%, rgba(59,130,246,0.1) 0%, transparent 60%)",
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.6s ease",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Corner bracket TR */}
          <div
            style={{
              position: "absolute",
              top: 28,
              right: 28,
              width: 28,
              height: 28,
              borderTop: "1px solid rgba(147,197,253,0.4)",
              borderRight: "1px solid rgba(147,197,253,0.4)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />
          {/* Corner bracket BL */}
          <div
            style={{
              position: "absolute",
              bottom: 28,
              left: 0,
              width: 28,
              height: 28,
              borderBottom: "1px solid rgba(147,197,253,0.4)",
              borderLeft: "1px solid rgba(147,197,253,0.4)",
              zIndex: 2,
              pointerEvents: "none",
            }}
          />

          {/* Bottom label inside image */}
          <div
            style={{
              position: "absolute",
              bottom: 36,
              left: 36,
              zIndex: 3,
            }}
          >
            <div
              style={{
                color: "rgba(147,197,253,0.6)",
                fontSize: "0.55rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontWeight: 600,
                marginBottom: 5,
              }}
            >
              Est. 1999
            </div>
            <div
              style={{
                color: "rgba(255,255,255,0.85)",
                fontSize: "0.85rem",
                fontWeight: 300,
                letterSpacing: "0.08em",
              }}
            >
              Karachi, Pakistan
            </div>
          </div>

          {/* Vertical text on far left edge */}
          <div
            style={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "center center",
              color: "rgba(147,197,253,0.2)",
              fontSize: "0.5rem",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontWeight: 600,
              whiteSpace: "nowrap",
              zIndex: 3,
            }}
          >
            Premium Denim Manufacturing
          </div>
        </div>

        {/* ── RIGHT: TEXT ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "1.8rem",
            padding: "clamp(4rem, 7vw, 7rem) clamp(2.5rem, 5vw, 5rem) clamp(4rem, 7vw, 7rem) clamp(2rem, 4vw, 4rem)",
          }}
        >
          {/* Eyebrow */}
          <div style={{ ...anim(0.15), display: "flex", alignItems: "center", gap: "0.75rem" }}>
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
              Discover Our Heritage
            </span>
          </div>

          {/* Heading */}
          <div style={anim(0.22)}>
            <h2
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(2.6rem, 4.5vw, 4.2rem)",
                textTransform: "uppercase",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#fff",
                margin: 0,
              }}
            >
              Who Are
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.3)",
                  color: "transparent",
                }}
              >
                We
              </span>
            </h2>
            <div
              style={{
                marginTop: "1rem",
                width: 48,
                height: 2,
                background: "linear-gradient(90deg, rgba(147,197,253,0.7), transparent)",
              }}
            />
          </div>

          {/* Body */}
          <p
            style={{
              ...anim(0.3),
              color: "rgba(255,255,255,0.52)",
              fontSize: "0.88rem",
              fontWeight: 300,
              lineHeight: 1.9,
              letterSpacing: "0.03em",
              margin: 0,
              maxWidth: 460,
            }}
          >
            At AH Denim, we specialize in crafting premium denim and woven
            apparel — recognized for innovation, quality, and sustainable
            manufacturing. With over two decades of industry expertise, we
            deliver fashion-forward garments to leading global brands.
          </p>

          {/* Quote block */}
          <div
            style={{
              ...anim(0.38),
              borderLeft: "2px solid rgba(147,197,253,0.3)",
              paddingLeft: "1.2rem",
              maxWidth: 460,
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.38)",
                fontSize: "0.84rem",
                fontWeight: 300,
                lineHeight: 1.8,
                letterSpacing: "0.03em",
                margin: 0,
              }}
            >
              Our ability to deliver{" "}
              <span style={{ color: "rgba(147,197,253,0.85)", fontWeight: 400 }}>
                flexibility, speed, and precision
              </span>{" "}
              ensures every piece meets the highest standards — without
              compromising on style, quality, or sustainability.
            </p>
          </div>

          {/* Pillars row */}
          <div
            style={{
              ...anim(0.44),
              display: "flex",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            {["Premium Fabrics", "Innovative Washes", "Sustainable Future"].map((pill) => (
              <div
                key={pill}
                style={{
                  padding: "0.45rem 1rem",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {pill}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{ ...anim(0.5), display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <button
              style={{
                background: "transparent",
                border: "1px solid rgba(147,197,253,0.35)",
                color: "rgba(147,197,253,0.85)",
                fontSize: "0.62rem",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                padding: "0.9rem 2.2rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(147,197,253,0.08)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(147,197,253,0.65)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(147,197,253,1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(147,197,253,0.35)";
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(147,197,253,0.85)";
              }}
            >
              Our Story →
            </button>
            <span
              style={{
                color: "rgba(255,255,255,0.18)",
                fontSize: "0.68rem",
                letterSpacing: "0.1em",
                fontWeight: 300,
              }}
            >
              Full-range apparel manufacturer
            </span>
          </div>
        </div>
      </div>

      {/* ── STATS ROW — full width ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          position: "relative",
          zIndex: 1,
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              ...anim(0.55 + i * 0.08),
              padding: "2.2rem clamp(1.5rem, 3vw, 3rem)",
              borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              display: "flex",
              flexDirection: "column",
              gap: "0.45rem",
              position: "relative",
              overflow: "hidden",
              cursor: "default",
              transition: "background 0.3s ease",
            }}
            className="stat-card"
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: "linear-gradient(90deg, rgba(147,197,253,0.55), transparent)",
                opacity: 0,
                transition: "opacity 0.3s ease",
              }}
              className="stat-line"
            />
            <span
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontWeight: 900,
                fontSize: "clamp(1.8rem, 2.8vw, 2.8rem)",
                color: "#fff",
                lineHeight: 1,
                letterSpacing: "-0.02em",
              }}
            >
              {stat.value}
            </span>
            <span
              style={{
                color: "rgba(255,255,255,0.32)",
                fontSize: "0.62rem",
                fontWeight: 400,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ourwork-grid {
            grid-template-columns: 1fr !important;
          }
          .ourwork-grid > div:first-child {
            min-height: 55vw !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid > div:nth-child(2) {
            border-right: none !important;
          }
          .stats-grid > div:nth-child(1),
          .stats-grid > div:nth-child(2) {
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
        }
        .stat-card:hover {
          background: rgba(147,197,253,0.02) !important;
        }
        .stat-card:hover .stat-line {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
};

export default OurWork;