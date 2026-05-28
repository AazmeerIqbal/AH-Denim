import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const SLIDES = [
    {
        id: 0,
        label: "Men's Collection",
        sublabel: "CRAFTED FOR HIM",
        description:
            "Precision-cut denim engineered for the modern man. From slim tapers to relaxed fits — built tough, styled sharp.",
        image: "/images/wheelSection1.png",
        accent: "#93c5fd",
    },
    {
        id: 1,
        label: "Women's Collection",
        sublabel: "DESIGNED FOR HER",
        description:
            "Fashion-forward silhouettes with premium stretch fabrics. Every stitch tells a story of confidence and craftsmanship.",
        image: "/images/wheelSection2.png",
        accent: "#c4b5fd",
    },
    {
        id: 2,
        label: "Kids' Collection",
        sublabel: "MADE FOR THEM",
        description:
            "Durable, comfortable, and stylish. Built to withstand the energy of childhood without compromising on quality.",
        image: "/images/wheelSection3.png",
        accent: "#6ee7b7",
    },
    {
        id: 3,
        label: "Premium Washes",
        sublabel: "FINISHING MASTERY",
        description:
            "Stone-washed, acid-washed, vintage — our wash techniques transform raw denim into wearable art with lasting character.",
        image: "/images/wheelSection4.png",
        accent: "#fcd34d",
    },
];

const TOTAL = SLIDES.length;
const SEG_ANGLE = 360 / TOTAL;
const SVG_SIZE = 700;
const CX = SVG_SIZE / 2;
const CY = SVG_SIZE / 2;
const R_OUTER = 320;
const R_INNER = 110;
const GAP_DEG = 2.5;

// Pre-compute all paths once — never recompute on render
const PATHS = Array.from({ length: TOTAL }, (_, i) => {
    const startDeg = i * SEG_ANGLE + GAP_DEG / 2;
    const endDeg = (i + 1) * SEG_ANGLE - GAP_DEG / 2;
    const toRad = (d: number) => ((d - 90) * Math.PI) / 180;
    const sx = CX + R_OUTER * Math.cos(toRad(startDeg));
    const sy = CY + R_OUTER * Math.sin(toRad(startDeg));
    const ex = CX + R_OUTER * Math.cos(toRad(endDeg));
    const ey = CY + R_OUTER * Math.sin(toRad(endDeg));
    const ix = CX + R_INNER * Math.cos(toRad(endDeg));
    const iy = CY + R_INNER * Math.sin(toRad(endDeg));
    const jx = CX + R_INNER * Math.cos(toRad(startDeg));
    const jy = CY + R_INNER * Math.sin(toRad(startDeg));
    const large = SEG_ANGLE > 180 ? 1 : 0;
    return `M ${sx} ${sy} A ${R_OUTER} ${R_OUTER} 0 ${large} 1 ${ex} ${ey} L ${ix} ${iy} A ${R_INNER} ${R_INNER} 0 ${large} 0 ${jx} ${jy} Z`;
});

export default function WheelSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [active, setActive] = useState(0);
    const [rotation, setRotation] = useState(0);
    const [locked, setLocked] = useState(false);
    const [contentKey, setContentKey] = useState(0);
    const navigate = useNavigate();

    // All mutable scroll state in refs — zero re-renders on scroll
    const scrollAccum = useRef(0);
    const lastActive = useRef(0);
    const isAnimating = useRef(false);
    const lockedRef = useRef(false);
    const lastTouchY = useRef<number | null>(null);
    const rafPending = useRef(false);

    // Keep lockedRef in sync with state (state is for UI only)
    useEffect(() => { lockedRef.current = locked; }, [locked]);

    const goTo = useCallback((idx: number) => {
        if (isAnimating.current) return;
        const next = ((idx % TOTAL) + TOTAL) % TOTAL;
        if (next === lastActive.current) return;
        isAnimating.current = true;
        lastActive.current = next;
        setActive(next);
        setRotation(next * SEG_ANGLE);
        setContentKey((k) => k + 1);
        setTimeout(() => { isAnimating.current = false; }, 750);
    }, []);

    // Sticky detection via scroll — single passive listener
    useEffect(() => {
        const check = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const inSticky = rect.top <= 1 && rect.bottom > window.innerHeight * 0.3;
            if (inSticky !== lockedRef.current) {
                lockedRef.current = inSticky;
                setLocked(inSticky);
            }
        };
        window.addEventListener("scroll", check, { passive: true });
        check();
        return () => window.removeEventListener("scroll", check);
    }, []);

    // Wheel handler — uses RAF to batch, never blocks main thread
    useEffect(() => {
        const onWheel = (e: WheelEvent) => {
            if (!lockedRef.current) return;

            if (lastActive.current === TOTAL - 1 && e.deltaY > 0) {
                lockedRef.current = false;
                setLocked(false);
                return;
            }
            if (lastActive.current === 0 && e.deltaY < 0) {
                lockedRef.current = false;
                setLocked(false);
                return;
            }

            e.preventDefault();
            scrollAccum.current += e.deltaY;

            if (!rafPending.current) {
                rafPending.current = true;
                requestAnimationFrame(() => {
                    rafPending.current = false;
                    if (scrollAccum.current > 100) {
                        scrollAccum.current = 0;
                        goTo(lastActive.current + 1);
                    } else if (scrollAccum.current < -100) {
                        scrollAccum.current = 0;
                        goTo(lastActive.current - 1);
                    }
                });
            }
        };

        const onTouchStart = (e: TouchEvent) => {
            lastTouchY.current = e.touches[0]?.clientY ?? null;
        };

        const onTouchMove = (e: TouchEvent) => {
            if (!lockedRef.current || lastTouchY.current === null) return;
            const currentY = e.touches[0]?.clientY ?? lastTouchY.current;
            const delta = lastTouchY.current - currentY; // positive = scroll down
            lastTouchY.current = currentY;

            if (lastActive.current === TOTAL - 1 && delta > 0) {
                lockedRef.current = false;
                setLocked(false);
                return;
            }
            if (lastActive.current === 0 && delta < 0) {
                lockedRef.current = false;
                setLocked(false);
                return;
            }

            e.preventDefault();
            scrollAccum.current += delta;
            if (scrollAccum.current > 80) {
                scrollAccum.current = 0;
                goTo(lastActive.current + 1);
            } else if (scrollAccum.current < -80) {
                scrollAccum.current = 0;
                goTo(lastActive.current - 1);
            }
        };

        const onTouchEnd = () => { lastTouchY.current = null; };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: true });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [goTo]);

    const slide = SLIDES[active];

    return (
        <div style={{ height: "200vh" }}>
            <section
                ref={sectionRef}
                style={{
                    backgroundColor: "#030b13",
                    width: "100%",
                    height: "100vh",
                    position: "sticky",
                    top: 0,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    // Promote section to its own compositor layer
                    willChange: "transform",
                }}
            >
                {/* BG gradient */}
                <div style={{
                    position: "absolute", inset: 0, pointerEvents: "none",
                    background: "radial-gradient(ellipse 70% 80% at 65% 50%, rgba(13,33,71,0.65) 0%, transparent 65%)",
                }} />

                {/* Top/bottom fades */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to bottom, #030b13, transparent)", zIndex: 10, pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 100, background: "linear-gradient(to top, #030b13, transparent)", zIndex: 10, pointerEvents: "none" }} />

                {/* ── WHEEL ── */}
                <div
                    style={{
                        position: "absolute",
                        left: "clamp(-220px, -10vw, -160px)",
                        top: "50%",
                        transform: "translateY(-50%)",
                        width: SVG_SIZE,
                        height: SVG_SIZE,
                        zIndex: 2,
                        // Own compositor layer so wheel rotation never triggers layout
                        willChange: "transform",
                    }}
                >
                    <svg
                        viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
                        style={{
                            width: "100%",
                            height: "100%",
                            // GPU-composited rotation — no layout, no paint
                            transform: `rotate(${-rotation}deg)`,
                            transition: "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)",
                            willChange: "transform",
                            overflow: "visible",
                        }}
                    >
                        <defs>
                            {SLIDES.map((_, i) => (
                                <clipPath key={i} id={`wsclip-${i}`}>
                                    <path d={PATHS[i]} />
                                </clipPath>
                            ))}
                        </defs>

                        {SLIDES.map((s, i) => {
                            const isActive = i === active;
                            return (
                                <g key={i}>
                                    {/* Segment fill — no CSS transition, change is instant on rotation */}
                                    <path
                                        d={PATHS[i]}
                                        fill={isActive ? "rgba(255,255,255,0.05)" : "rgba(8,16,36,0.75)"}
                                        stroke={isActive ? s.accent : "rgba(255,255,255,0.07)"}
                                        strokeWidth={isActive ? 1.5 : 0.5}
                                    />

                                    {/*
                    Image: NO css filter on SVG image — that triggers expensive repaints.
                    Instead use opacity only. Inactive images are dark naturally because
                    the dark fill sits on top via a separate overlay rect below.
                  */}
                                    <image
                                        href={s.image}
                                        x={CX - R_OUTER}
                                        y={CY - R_OUTER}
                                        width={R_OUTER * 2}
                                        height={R_OUTER * 2}
                                        clipPath={`url(#wsclip-${i})`}
                                        preserveAspectRatio="xMidYMid slice"
                                        style={{
                                            opacity: isActive ? 0.88 : 0.15,
                                            // opacity-only transition is compositor-only — no repaint
                                            transition: "opacity 0.5s ease",
                                        }}
                                    />

                                    {/* Dark overlay for inactive segments — avoids filter */}
                                    {!isActive && (
                                        <path
                                            d={PATHS[i]}
                                            fill="rgba(3,11,19,0.55)"
                                        />
                                    )}

                                    {/* Active accent border */}
                                    {isActive && (
                                        <path
                                            d={PATHS[i]}
                                            fill="none"
                                            stroke={s.accent}
                                            strokeWidth={2}
                                            opacity={0.45}
                                        />
                                    )}
                                </g>
                            );
                        })}

                        {/* Inner hole */}
                        <circle cx={CX} cy={CY} r={R_INNER - 2} fill="#030b13" stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
                        <circle cx={CX} cy={CY} r={R_INNER - 14} fill="none" stroke={slide.accent} strokeWidth={0.8} opacity={0.25} />
                        <circle cx={CX} cy={CY} r={7} fill={slide.accent} />
                        <circle cx={CX} cy={CY} r={3} fill="#030b13" />
                    </svg>

                    {/* Counter — outside SVG so it doesn't rotate */}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        display: "flex", flexDirection: "column", alignItems: "center",
                        pointerEvents: "none", zIndex: 5,
                    }}>
                        <span style={{ fontFamily: "'Arial Black', Impact, sans-serif", fontWeight: 900, fontSize: "1.8rem", color: "#fff", lineHeight: 1 }}>
                            0{active + 1}
                        </span>
                        <span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.52rem", letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 5 }}>
                            / 0{TOTAL}
                        </span>
                    </div>
                </div>

                {/* ── CONTENT (right) ── */}
                <div
                    style={{
                        marginLeft: "auto",
                        width: "clamp(340px, 46%, 580px)",
                        marginRight: "clamp(2rem, 6vw, 7rem)",
                        position: "relative",
                        zIndex: 5,
                    }}
                >
                    <div key={contentKey} style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>

                        {/* Eyebrow */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", opacity: 0, animation: "wsFadeUp 0.6s ease 0.05s forwards" }}>
                            <div style={{ width: 28, height: 1, background: `${slide.accent}80` }} />
                            <span style={{ color: `${slide.accent}99`, fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                {slide.sublabel}
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 style={{
                            fontFamily: "'Arial Black', Impact, sans-serif",
                            fontWeight: 900,
                            fontSize: "clamp(3rem, 5.5vw, 5rem)",
                            textTransform: "uppercase",
                            lineHeight: 0.92,
                            letterSpacing: "-0.025em",
                            color: "#fff",
                            margin: 0,
                            opacity: 0,
                            animation: "wsFadeUp 0.6s ease 0.11s forwards",
                        }}>
                            {slide.label.includes("'s ")
                                ? <>{slide.label.split("'s ")[0]}'s<br />
                                    <span style={{ WebkitTextStroke: `1px ${slide.accent}50`, color: "transparent" }}>
                                        {slide.label.split("'s ")[1]}
                                    </span>
                                </>
                                : <>{slide.label}</>
                            }
                        </h2>

                        {/* Accent line */}
                        <div style={{ width: 52, height: 2, background: `linear-gradient(90deg, ${slide.accent}, transparent)`, opacity: 0, animation: "wsFadeUp 0.6s ease 0.17s forwards" }} />

                        {/* Description */}
                        <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.9, letterSpacing: "0.03em", maxWidth: 400, margin: 0, opacity: 0, animation: "wsFadeUp 0.6s ease 0.22s forwards" }}>
                            {slide.description}
                        </p>

                        {/* Dot nav */}
                        <div style={{ display: "flex", gap: "0.55rem", alignItems: "center", opacity: 0, animation: "wsFadeUp 0.6s ease 0.28s forwards" }}>
                            {SLIDES.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => goTo(i)}
                                    style={{
                                        width: i === active ? 22 : 6, height: 6,
                                        borderRadius: 3, border: "none", padding: 0, cursor: "pointer",
                                        background: i === active ? slide.accent : "rgba(255,255,255,0.18)",
                                        transition: "width 0.3s ease, background 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>

                        {/* CTA */}
                        <div style={{ opacity: 0, animation: "wsFadeUp 0.6s ease 0.34s forwards" }}>
                            <button
                                onClick={() => navigate(`/Items?category=${['Man','Women','Kids','Premium'][slide.id]}`)}
                                style={{
                                    background: "transparent",
                                    border: `1px solid ${slide.accent}55`,
                                    color: `${slide.accent}dd`,
                                    fontSize: "0.62rem", fontWeight: 600,
                                    letterSpacing: "0.22em", textTransform: "uppercase",
                                    padding: "0.9rem 2.4rem",
                                    cursor: "pointer", fontFamily: "inherit",
                                    transition: "background 0.3s ease, border-color 0.3s ease",
                                }}
                                onMouseEnter={(e) => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.background = `${slide.accent}18`;
                                    b.style.borderColor = `${slide.accent}99`;
                                }}
                                onMouseLeave={(e) => {
                                    const b = e.currentTarget as HTMLButtonElement;
                                    b.style.background = "transparent";
                                    b.style.borderColor = `${slide.accent}55`;
                                }}
                            >
                                Explore →
                            </button>
                        </div>

                        {/* Scroll hint */}
                        <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", opacity: 0, animation: "wsFadeUp 0.6s ease 0.4s forwards" }}>
                            <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.12)", position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", background: slide.accent, animation: "wsScrollDot 1.8s ease infinite" }} />
                            </div>
                            <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.56rem", letterSpacing: "0.22em", textTransform: "uppercase" }}>
                                Scroll to explore
                            </span>
                        </div>

                    </div>
                </div>

                <style>{`
          @keyframes wsFadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes wsScrollDot {
            0%   { top: -45%; }
            100% { top: 110%; }
          }
        `}</style>
            </section>
        </div>
    );
}