import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mannequinImage from "/images/Group 2.png";
import mannequinImage2 from "/images/Group 3.png";

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const anim = (delay: number): React.CSSProperties => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0px)" : "translateY(28px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s ease ${delay}s`,
  });

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
      style={{
        // Pure solid dark base — no radial that creates visible boundaries
        backgroundColor: "#000105",
      }}
    >
      {/* ── BACKGROUND: Blue radial glow — sits BEHIND everything ── */}
      {/* This is the only gradient layer; it's soft and centered so no edge artifacts */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 60%, #0d2147 0%, #071529 35%, #020810 65%, #000105 100%)",
        }}
      />

      {/* Secondary blue glow — subtle halo behind the text */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 40% at 50% 48%, rgba(30,80,200,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Cinematic grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* ── LEFT MANNEQUIN ── */}
      {/*
        KEY FIX: No wrapper div with background gradients.
        The PNG is transparent — we use CSS mask-image directly on the img
        to fade its edges into the page background seamlessly.
        This eliminates the rectangular halo artifact entirely.
      */}
      <div
        className="absolute bottom-0 left-0 z-10 pointer-events-none flex items-end max-md:opacity-40"
        style={{
          width: "clamp(140px, 33vw, 520px)",
          height: "92%",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <img
          src={mannequinImage}
          alt="Men's Denim Collection"
          className="w-full h-full object-contain object-bottom"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 0.15s",
            filter: "brightness(0.92) contrast(1.05)",
            // CSS mask fades left edge and bottom of the PNG itself — no wrapper needed
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 12%, black 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 12%, black 100%)",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>

      {/* ── RIGHT MANNEQUIN ── */}
      <div
        className="absolute bottom-0 right-0 z-10 pointer-events-none flex items-end max-md:opacity-40"
        style={{
          width: "clamp(140px, 33vw, 520px)",
          height: "92%",
          transform: `translateY(${scrollY * 0.05}px)`,
        }}
      >
        <img
          src={mannequinImage2}
          alt="Women's Denim Collection"
          className="w-full h-full object-contain object-bottom"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 0.3s",
            filter: "brightness(0.92) contrast(1.05)",
            // Mirror of left: fade right edge and bottom
            maskImage:
              "linear-gradient(to left, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 12%, black 100%)",
            maskComposite: "intersect",
            WebkitMaskImage:
              "linear-gradient(to left, transparent 0%, black 30%, black 85%, transparent 100%), linear-gradient(to top, transparent 0%, black 12%, black 100%)",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>

      {/* Top fade — blends mannequin tops into dark bg */}
      <div
        className="absolute top-0 left-0 w-full h-36 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #000105 0%, transparent 100%)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-40 z-20 pointer-events-none"
        style={{ background: "linear-gradient(to top, #000105 0%, transparent 100%)" }}
      />

      {/* ── MAIN CONTENT ── */}
      <div className="relative z-30 h-full flex flex-col items-center justify-between px-4 py-10">

        {/* Spacer for fixed nav */}
        <div className="mt-[80px]" />

        {/* Center text block */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">

          {/* Eyebrow */}
          <p
            className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase font-light mb-5"
            style={{ color: "rgba(147,197,253,0.65)", ...anim(0.3) }}
          >
            Crafted to Inspire
          </p>

          {/* Headline */}
          <h1
            className="uppercase font-black leading-[0.88] mb-6 select-none"
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: "clamp(2.5rem, 8.5vw, 8rem)",
              letterSpacing: "-0.025em",
              ...anim(0.45),
            }}
          >
            <span className="block text-white">
              The Denim
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.2)",
                color: "transparent",
              }}
            >
              Renaissance
            </span>
          </h1>

          {/* Divider */}
          <div
            className="mb-6"
            style={{
              width: "60px",
              height: "1px",
              background: "linear-gradient(to right, transparent, rgba(147,197,253,0.6), transparent)",
              ...anim(0.6),
            }}
          />

          {/* Taglines */}
          <div className="space-y-[3px] mb-10" style={anim(0.72)}>
            {["Premium craftsmanship.", "Innovative techniques.", "Denim that defines the future."].map(
              (line) => (
                <p
                  key={line}
                  style={{
                    color: "rgba(255,255,255,0.42)",
                    fontSize: "0.72rem",
                    letterSpacing: "0.14em",
                    fontWeight: 300,
                  }}
                >
                  {line}
                </p>
              )
            )}
          </div>

          {/* Circular CTA */}
          <div style={anim(0.88)}>
            <Link to="/Items?category=Man">
              <button
                className="group relative w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center text-white transition-all duration-500"
                style={{
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <span
                  className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: "0 0 24px rgba(59,130,246,0.3)",
                    border: "1px solid rgba(59,130,246,0.35)",
                  }}
                />
                <span
                  className="text-[8px] tracking-[0.25em] uppercase font-semibold relative z-10"
                  style={{ color: "rgba(255,255,255,0.8)" }}
                >
                  Explore
                </span>
                <svg
                  className="w-3 h-3 mt-[5px] relative z-10 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="rgba(255,255,255,0.65)"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="w-full flex items-end justify-between"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}
        >
          {/* Slide counter */}
          <div className="flex items-center gap-3">
            <span style={{ color: "rgba(255,255,255,0.32)", fontSize: "10px", letterSpacing: "0.2em" }}>01</span>
            <div className="relative w-14 h-px" style={{ background: "rgba(255,255,255,0.1)" }}>
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: "45%",
                  background: "linear-gradient(to right, rgba(147,197,253,0.8), rgba(255,255,255,0.5))",
                }}
              />
            </div>
            <span style={{ color: "rgba(255,255,255,0.16)", fontSize: "10px", letterSpacing: "0.2em" }}>03</span>
          </div>

          {/* Scroll to discover */}
          <div className="flex items-center gap-2">
            <span
              style={{
                color: "rgba(255,255,255,0.2)",
                fontSize: "8px",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                fontWeight: 300,
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                transform: "rotate(180deg)",
              }}
            >
              Scroll to Discover
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.12)" }} />
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  background: "rgba(147,197,253,0.65)",
                  animation: "scrollDot 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Corner accents */}
      <div
        className="absolute top-[88px] left-7 z-30 pointer-events-none w-4 h-4"
        style={{
          borderLeft: "1px solid rgba(255,255,255,0.1)",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.3s",
        }}
      />
      <div
        className="absolute bottom-7 right-7 z-30 pointer-events-none w-4 h-4"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.1)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.3s",
        }}
      />

      <style>{`
        @keyframes scrollDot {
          0%, 100% { transform: translateY(0);   opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1;   }
        }
      `}</style>
    </section>
  );
};

export default Hero;