import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import mannequinImage from "/images/Hero_Section_img2_transparent1.png";
import mannequinImage2 from "/images/Hero_Section_img2_transparent1.png";

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
        // #000105 at edges blending into deep navy-blue at center
        background:
          "radial-gradient(ellipse 130% 100% at 50% 65%, #0b1a35 0%, #071020 45%, #030810 75%, #000105 100%)",
      }}
    >
      {/* ── ATMOSPHERIC LAYERS ── */}

      {/* Blue glow pulse at center — gives the "brand" depth */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 52%, rgba(25,70,160,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Cinematic grain */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,5,0.75) 100%)",
        }}
      />

      {/* ── LEFT MANNEQUIN ── */}
      <div
        className="absolute bottom-0 left-0 z-10 pointer-events-none flex items-end"
        style={{
          width: "clamp(200px, 30vw, 500px)",
          height: "95%",
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      >
        <img
          src={mannequinImage}
          alt="Men's Denim Collection"
          className="w-full h-full object-contain object-bottom"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 0.15s",
            mixBlendMode: "lighten",
            filter: "brightness(0.88) contrast(1.1) saturate(0.85)",
          }}
        />
        {/* Gradient masks — blends all 4 edges into #000105 */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "linear-gradient(to right,  #000105 0%, transparent 50%)",   // left edge
              "linear-gradient(to top,    #000105 0%, transparent 28%)",   // bottom edge
              "linear-gradient(to bottom, #000105 0%, transparent 18%)",   // top edge
            ].join(", "),
          }}
        />
      </div>

      {/* ── RIGHT MANNEQUIN ── */}
      <div
        className="absolute bottom-0 right-0 z-10 pointer-events-none flex items-end"
        style={{
          width: "clamp(200px, 30vw, 500px)",
          height: "95%",
          transform: `translateY(${scrollY * 0.06}px)`,
        }}
      >
        <img
          src={mannequinImage2}
          alt="Women's Denim Collection"
          className="w-full h-full object-contain object-bottom"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 1.5s ease 0.3s",
            mixBlendMode: "lighten",
            filter: "brightness(0.88) contrast(1.1) saturate(0.85)",
          }}
        />
        {/* Gradient masks */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "linear-gradient(to left,   #000105 0%, transparent 50%)",   // right edge
              "linear-gradient(to top,    #000105 0%, transparent 28%)",   // bottom edge
              "linear-gradient(to bottom, #000105 0%, transparent 18%)",   // top edge
            ].join(", "),
          }}
        />
      </div>

      {/* Center fade — softens mannequins behind the text column */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 20%, rgba(0,1,5,0.5) 33%, rgba(0,1,5,0.5) 67%, transparent 80%)",
        }}
      />

      {/* Top fade */}
      <div
        className="absolute top-0 left-0 w-full h-32 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #000105 0%, transparent 100%)" }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 w-full h-44 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to top, #000105 0%, transparent 100%)" }}
      />

      {/* ── MAIN CONTENT (centered between the two mannequins) ── */}
      <div className="relative z-20 h-full flex flex-col items-center justify-between px-4 py-10">

        {/* Spacer for fixed nav */}
        <div className="mt-[80px]" />

        {/* ── CENTER TEXT BLOCK ── */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">

          {/* Eyebrow */}
          <p
            className="text-[10px] md:text-[11px] tracking-[0.45em] uppercase font-light mb-5"
            style={{ color: "rgba(147,197,253,0.6)", ...anim(0.3) }}
          >
            Crafted to Inspire
          </p>

          {/* Headline */}
          <h1
            className="uppercase font-black leading-[0.88] mb-6 select-none"
            style={{
              fontFamily: "'Arial Black', Impact, sans-serif",
              fontSize: "clamp(3rem, 8.5vw, 8rem)",
              letterSpacing: "-0.025em",
              ...anim(0.45),
            }}
          >
            <span className="block text-white drop-shadow-[0_2px_30px_rgba(0,0,0,0.9)]">
              The Denim
            </span>
            <span
              className="block"
              style={{
                WebkitTextStroke: "1.5px rgba(255,255,255,0.22)",
                color: "transparent",
              }}
            >
              Renaissance
            </span>
          </h1>

          {/* Thin divider */}
          <div
            className="mb-6"
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(147,197,253,0.55), transparent)",
              ...anim(0.62),
            }}
          />

          {/* Taglines */}
          <div className="space-y-[3px] mb-10" style={anim(0.74)}>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 300 }}>
              Premium craftsmanship.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 300 }}>
              Innovative techniques.
            </p>
            <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.75rem", letterSpacing: "0.12em", fontWeight: 300 }}>
              Denim that defines the future.
            </p>
          </div>

          {/* Circular Explore CTA */}
          <div style={anim(0.9)}>
            <Link to="/Items?category=Man">
              <button
                className="group relative w-[76px] h-[76px] rounded-full flex flex-col items-center justify-center text-white transition-all duration-500"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.03)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Outer glow ring on hover */}
                <span
                  className="absolute inset-[-4px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ boxShadow: "0 0 20px rgba(59,130,246,0.3)", border: "1px solid rgba(59,130,246,0.3)" }}
                />
                <span
                  className="text-[8px] tracking-[0.25em] uppercase font-semibold relative z-10"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  Explore
                </span>
                <svg
                  className="w-3 h-3 mt-[5px] relative z-10 group-hover:translate-y-0.5 transition-transform duration-300"
                  fill="none"
                  stroke="rgba(255,255,255,0.7)"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </Link>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="w-full flex items-end justify-between"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 1s ease 1.1s" }}
        >
          {/* Slide counter */}
          <div className="flex items-center gap-3">
            <span style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", letterSpacing: "0.2em" }}>01</span>
            <div className="relative w-14 h-px" style={{ background: "rgba(255,255,255,0.12)" }}>
              <div
                className="absolute left-0 top-0 h-full"
                style={{
                  width: "45%",
                  background: "linear-gradient(to right, rgba(147,197,253,0.7), rgba(255,255,255,0.5))",
                }}
              />
            </div>
            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "10px", letterSpacing: "0.2em" }}>03</span>
          </div>

          {/* Scroll to discover */}
          <div className="flex items-center gap-2">
            <span
              style={{
                color: "rgba(255,255,255,0.22)",
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
              <div className="w-px h-8" style={{ background: "rgba(255,255,255,0.15)" }} />
              <div
                className="w-1 h-1 rounded-full"
                style={{
                  background: "rgba(147,197,253,0.6)",
                  animation: "scrollDot 2s ease-in-out infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CORNER ACCENTS ── */}
      <div
        className="absolute top-[88px] left-7 z-20 pointer-events-none w-4 h-4"
        style={{
          borderLeft: "1px solid rgba(255,255,255,0.12)",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          opacity: loaded ? 1 : 0,
          transition: "opacity 1s ease 1.3s",
        }}
      />
      <div
        className="absolute bottom-7 right-7 z-20 pointer-events-none w-4 h-4"
        style={{
          borderRight: "1px solid rgba(255,255,255,0.12)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
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