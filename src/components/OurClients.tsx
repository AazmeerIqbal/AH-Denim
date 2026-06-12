import { useRef, useEffect, useState } from "react";

import Client1 from "/images/Clients/bohoo_group.png";

import Client4 from "/images/Clients/B Couture.png";
import Client5 from "/images/Clients/disaster.png";
import Client6 from "/images/Clients/prettylittlethings.png";
import Client7 from "/images/Clients/aris.jpeg";
import Client8 from "/images/Clients/prohibited.png";
import Client9 from "/images/Clients/threadbare.jpg";
import Client10 from "/images/Clients/rivr.jpeg";
import Client11 from "/images/Clients/crosshatch.png";
import Client12 from "/images/Clients/wampum.png";
import Client13 from "/images/Clients/baggys.png";

// bg: "white" = pure white bg, "black" = pure black bg, "none" = transparent
const LOGOS = [
  // Row 1 — hero, centered
  { src: Client1, alt: "Boohoo Group", size: "hero", bg: "white" },

  // Row 2 — 4 logos
  { src: Client6, alt: "Pretty Little Thing", size: "large", bg: "white" },
  { src: Client11, alt: "Crosshatch", size: "large", bg: "white" },

  // Row 3 — 5 logos
  { src: Client5, alt: "Disaster", size: "medium", bg: "none" },
  { src: Client4, alt: "B Couture", size: "medium", bg: "none" },
  { src: Client8, alt: "Prohibited", size: "medium", bg: "none" },
  { src: Client9, alt: "Threadbare", size: "medium", bg: "black" },
  { src: Client7, alt: "Aris", size: "medium", bg: "white" },

  // Row 4 — 3 logos centered
  { src: Client12, alt: "Wampum", size: "medium", bg: "white" },
  { src: Client10, alt: "Rivr", size: "medium", bg: "black" },
  { src: Client13, alt: "Baggys", size: "medium", bg: "none" },
];

const ROWS = [
  [0],           // hero
  [1, 2, 3, 4],  // row 2
  [5, 6, 7, 8, 9], // row 3
  [10, 11, 12],  // row 4
];

const SIZES = {
  hero: { w: 420, h: 110 },
  large: { w: 200, h: 68 },
  medium: { w: 170, h: 60 },
};

function getMultiplier(w: number) {
  if (w < 480) return 0.42;
  if (w < 640) return 0.55;
  if (w < 900) return 0.70;
  if (w < 1200) return 0.85;
  return 1;
}

export default function OurClients() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [mult, setMult] = useState(1);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.06 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const update = () => setMult(getMultiplier(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const anim = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`,
  });

  let globalIndex = 0;

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#030b13",
        padding: "clamp(4rem, 8vw, 7rem) 0 clamp(4rem, 8vw, 6rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Radial glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 55% at 50% 52%, rgba(13,33,71,0.5) 0%, transparent 65%)",
      }} />

      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 clamp(1rem, 3vw, 2.5rem)", position: "relative", zIndex: 1 }}>

        {/* HEADER */}
        <div style={{ ...anim(0), textAlign: "center", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "0.9rem" }}>
            <div style={{ width: 28, height: 1, background: "rgba(147,197,253,0.4)" }} />
            <span style={{ color: "rgba(147,197,253,0.6)", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.32em", textTransform: "uppercase" }}>
              Trusted Partners
            </span>
            <div style={{ width: 28, height: 1, background: "rgba(147,197,253,0.4)" }} />
          </div>
          <h2 style={{
            fontFamily: "'Arial Black', Impact, sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4vw, 3.5rem)",
            textTransform: "uppercase",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            color: "#fff",
            margin: "0 0 0.7rem",
          }}>
            Our{" "}
            <span style={{ WebkitTextStroke: "1px rgba(255,255,255,0.28)", color: "transparent" }}>
              Clients
            </span>
          </h2>
          <p style={{
            ...anim(0.1),
            color: "rgba(255,255,255,0.32)",
            fontSize: "0.82rem", fontWeight: 300,
            lineHeight: 1.8, letterSpacing: "0.03em",
            maxWidth: 460, margin: "0 auto 1.1rem",
          }}>
            Proud to partner with leading global fashion brands and pioneering
            startups — delivering quality denim at every scale.
          </p>
          <div style={{ width: 48, height: 1, margin: "0 auto", background: "linear-gradient(90deg, transparent, rgba(147,197,253,0.35), transparent)" }} />
        </div>

        {/* LOGO ROWS */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: `${28 * mult}px` }}>
          {ROWS.map((row, rowIdx) => {
            const rowDelay = 0.15 + rowIdx * 0.1;
            return (
              <div
                key={rowIdx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: `${24 * mult}px`,
                  flexWrap: "wrap",
                }}
              >
                {row.map((logoIdx) => {
                  const logo = LOGOS[logoIdx];
                  const size = SIZES[logo.size as keyof typeof SIZES];
                  const w = size.w * mult;
                  const h = size.h * mult;
                  const itemDelay = rowDelay + (row.indexOf(logoIdx) * 0.06);

                  const bgStyle: React.CSSProperties =
                    logo.bg === "white"
                      ? { backgroundColor: "#ffffff", borderRadius: 4 }
                      : logo.bg === "black"
                        ? { backgroundColor: "#111111", borderRadius: 4 }
                        : {};

                  return (
                    <div
                      key={logoIdx}
                      style={{
                        ...anim(itemDelay),
                        width: w,
                        height: h,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: logo.bg !== "none" ? `${8 * mult}px ${14 * mult}px` : "0",
                        cursor: "pointer",
                        transition: `opacity 0.8s ease ${itemDelay}s, transform 0.8s ease ${itemDelay}s, box-shadow 0.3s ease`,
                        ...bgStyle,
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = "translateY(-3px) scale(1.06)";
                        if (logo.bg !== "none") {
                          el.style.boxShadow = logo.bg === "white"
                            ? "0 8px 24px rgba(255,255,255,0.15)"
                            : "0 8px 24px rgba(0,0,0,0.5)";
                        }
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = "translateY(0) scale(1)";
                        el.style.boxShadow = "none";
                      }}
                    >
                      <img
                        src={logo.src}
                        alt={logo.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                          userSelect: "none",
                          pointerEvents: "none",
                          mixBlendMode: logo.bg === "none" ? "screen" : "normal",
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* BOTTOM TAGLINE */}
        <div style={{ ...anim(0.9), textAlign: "center", marginTop: "clamp(2rem, 4vw, 3rem)" }}>
          <p style={{ color: "rgba(255,255,255,0.12)", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", fontWeight: 300 }}>
            13+ Global Fashion Brands & Growing
          </p>
        </div>
      </div>
    </section>
  );
}