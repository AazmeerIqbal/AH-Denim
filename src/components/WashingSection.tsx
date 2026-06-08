import { useEffect, useRef, useState } from "react";

import WashImage1 from "/images/washing/1.jpeg";
import WashImage2 from "/images/washing/2.jpeg";
import WashImage3 from "/images/washing/3.jpeg";
import WashImage4 from "/images/washing/4.jpeg";
import WashImage5 from "/images/washing/5.jpeg";
import WashImage6 from "/images/washing/6.jpeg";
import WashImage7 from "/images/washing/7.jpeg";
import WashImage8 from "/images/washing/8.jpeg";

const STEPS = [
    {
        num: "01",
        title: "Water Supply System",
        subtitle: "Production Infrastructure",
        desc: "Every wash begins at the source. Our dedicated production tank network supplies precisely controlled water to every machine on the floor — maintaining consistent temperature, pressure, and chemical ratios for repeatable results across every batch.",
        tag: "Foundation",
        image: WashImage1,
    },
    {
        num: "02",
        title: "Garment Loading",
        subtitle: "Pre-Wash Preparation",
        desc: "Raw denim is sorted by weight, colour, and wash recipe before being loaded onto the floor. Careful batching ensures consistent results — every garment in a run receives identical treatment from the first rinse to the final finish.",
        tag: "Preparation",
        image: WashImage7,
    },
    {
        num: "03",
        title: "Industrial Washing",
        subtitle: "Yilmak EcoGreen EG-W 400",
        desc: "Our Yilmak EcoGreen machines run stone wash, enzyme wash, and colour-correction cycles with precision-controlled drum speed, temperature, and chemical dosing. The closed-loop system recycles up to 60% of water — reducing consumption without compromising quality.",
        tag: "Core Process",
        image: WashImage2,
    },
    {
        num: "04",
        title: "Full Floor Operations",
        subtitle: "Scale & Throughput",
        desc: "Our two-floor laundry facility runs multiple wash programmes simultaneously. With a fleet of industrial washers operating in parallel, we process thousands of garments per shift while maintaining strict quality checks between every cycle.",
        tag: "Capacity",
        image: WashImage3,
    },
    {
        num: "05",
        title: "Steam Drying",
        subtitle: "Yilmak HNS 4065 — Eco Friendly 2020",
        desc: "Post-wash garments enter our steam drying units for precise moisture removal. Steam drying preserves the structural integrity of the denim, prevents shrinkage deviation, and sets the wash effect before the finishing stage begins.",
        tag: "Drying",
        image: WashImage4,
    },
    {
        num: "06",
        title: "High-Speed Tumble Drying",
        subtitle: "Industrial Dryer Banks",
        desc: "Our bank of industrial tumble dryers ensures high-volume throughput with consistent results. Multiple units run in rotation so production never stalls — every garment exits dry, softened, and ready for the spray finishing stage.",
        tag: "Volume Drying",
        image: WashImage8,
    },
    {
        num: "07",
        title: "Spray Finishing Setup",
        subtitle: "Controlled Spray Booths",
        desc: "Garments are hung and staged inside our enclosed spray booths. The sealed environment prevents overspray contamination and ensures our technicians can work with precision, applying bleach, potassium permanganate, and colour effects to exact specifications.",
        tag: "Finishing Setup",
        image: WashImage5,
    },
    {
        num: "08",
        title: "Hand Spray Application",
        subtitle: "Artisan Finishing",
        desc: "Our trained technicians hand-spray each garment individually — applying fades, tints, and whisker effects with expert control. This human touch is what separates our finishing from automated alternatives, delivering depth and variation that machines alone cannot replicate.",
        tag: "Artisan Step",
        image: WashImage6,
    },
];

export default function WashingSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeStep, setActiveStep] = useState(0);
    const [sectionVisible, setSectionVisible] = useState(false);
    const prevStep = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const { top, height } = sectionRef.current.getBoundingClientRect();
            const wh = window.innerHeight;
            const scrollable = Math.max(1, height - wh);
            const progress = Math.max(0, Math.min(1, -top / scrollable));
            const step = Math.min(STEPS.length - 1, Math.floor(progress * STEPS.length));
            setActiveStep(step);
            setSectionVisible(top < wh * 0.9 && top > -height);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => { prevStep.current = activeStep; }, [activeStep]);

    const step = STEPS[activeStep];
    const progress = ((activeStep + 1) / STEPS.length) * 100;

    return (
        <div
            ref={sectionRef}
            id="our-washing"
            style={{
                position: "relative",
                height: `${STEPS.length * 100}vh`,
                backgroundColor: "#030b13",
                borderTop: "1px solid rgba(255,255,255,0.04)",
            }}
        >
            {/* ── STICKY VIEWPORT ── */}
            <div style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                overflow: "hidden",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
            }}
                className="washing-grid"
            >

                {/* ── LEFT: IMAGE ── */}
                <div style={{ position: "relative", overflow: "hidden" }}>
                    {STEPS.map((s, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                inset: 0,
                                opacity: i === activeStep ? 1 : 0,
                                transform: i === activeStep ? "scale(1)" : "scale(1.04)",
                                transition: "opacity 0.75s cubic-bezier(0.4,0,0.2,1), transform 0.75s cubic-bezier(0.4,0,0.2,1)",
                                zIndex: i === activeStep ? 2 : 1,
                            }}
                        >
                            <img
                                src={s.image}
                                alt={s.title}
                                style={{
                                    width: "100%", height: "100%",
                                    objectFit: "cover",
                                    filter: "brightness(0.7) contrast(1.08) saturate(0.85)",
                                }}
                            />
                            {/* Right-side fade into content */}
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to right, transparent 60%, #030b13 100%)",
                                pointerEvents: "none",
                            }} />
                            {/* Bottom fade */}
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to top, rgba(3,11,19,0.9) 0%, transparent 40%)",
                                pointerEvents: "none",
                            }} />
                        </div>
                    ))}

                    {/* Step tag badge — bottom left of image */}
                    <div style={{
                        position: "absolute", bottom: 32, left: 32, zIndex: 10,
                        display: "flex", alignItems: "center", gap: "0.6rem",
                    }}>
                        <div style={{
                            padding: "0.35rem 0.9rem",
                            background: "rgba(3,11,19,0.75)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(147,197,253,0.3)",
                            color: "rgba(147,197,253,0.85)",
                            fontSize: "0.55rem", fontWeight: 700,
                            letterSpacing: "0.25em", textTransform: "uppercase",
                        }}>
                            {step.tag}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: CONTENT ── */}
                <div style={{
                    display: "flex", flexDirection: "column", justifyContent: "center",
                    padding: "clamp(2rem, 5vw, 5rem) clamp(2rem, 4vw, 4.5rem)",
                    position: "relative",
                    opacity: sectionVisible ? 1 : 0,
                    transition: "opacity 0.8s ease",
                }}>

                    {/* Vertical timeline line */}
                    <div style={{
                        position: "absolute",
                        left: 0, top: "10%", bottom: "10%",
                        width: 1,
                        background: "rgba(255,255,255,0.06)",
                    }}>
                        {/* Active fill */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            height: `${progress}%`,
                            background: "linear-gradient(to bottom, rgba(147,197,253,0.6), rgba(147,197,253,0.2))",
                            transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                        {/* Dot at current position */}
                        <div style={{
                            position: "absolute",
                            left: "50%",
                            top: `${progress}%`,
                            transform: "translate(-50%, -50%)",
                            width: 8, height: 8,
                            borderRadius: "50%",
                            background: "rgba(147,197,253,0.9)",
                            boxShadow: "0 0 12px rgba(147,197,253,0.6)",
                            transition: "top 0.6s cubic-bezier(0.4,0,0.2,1)",
                        }} />
                    </div>

                    {/* ── SECTION HEADER — only on step 0, flows above step content ── */}
                    {activeStep === 0 && (
                        <div style={{
                            paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)",
                            paddingBottom: "1.5rem",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            marginBottom: "1.8rem",
                            opacity: 0, animation: "wsFadeUp 0.7s ease 0.05s forwards",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                                <div style={{ width: 24, height: 1, background: "rgba(147,197,253,0.4)" }} />
                                <span style={{ color: "rgba(147,197,253,0.55)", fontSize: "0.56rem", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                                    Finishing Mastery
                                </span>
                            </div>
                            <h3 style={{
                                fontFamily: "'Arial Black', Impact, sans-serif",
                                fontWeight: 900, fontSize: "clamp(0.85rem, 1.5vw, 1.1rem)",
                                textTransform: "uppercase", letterSpacing: "-0.01em",
                                color: "rgba(255,255,255,0.5)", margin: 0,
                            }}>
                                Our Washing Process — {STEPS.length} Steps
                            </h3>
                        </div>
                    )}

                    <div key={activeStep} style={{ paddingLeft: "clamp(1.5rem, 3vw, 2.5rem)" }}>

                        {/* Step counter — eyebrow row only, no giant ghost number here */}
                        <div style={{
                            display: "flex", alignItems: "center", gap: "0.75rem",
                            marginBottom: "0.8rem",
                            opacity: 0, animation: "wsFadeUp 0.5s ease 0.05s forwards",
                        }}>
                            <div style={{
                                padding: "0.3rem 0.7rem",
                                border: "1px solid rgba(147,197,253,0.25)",
                                color: "rgba(147,197,253,0.7)",
                                fontSize: "0.55rem", fontWeight: 700,
                                letterSpacing: "0.25em", textTransform: "uppercase",
                            }}>
                                {step.num}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
                                <span style={{ color: "rgba(147,197,253,0.6)", fontSize: "0.55rem", fontWeight: 700, letterSpacing: "0.28em", textTransform: "uppercase" }}>
                                    Step {step.num} of {String(STEPS.length).padStart(2, "0")}
                                </span>
                                <span style={{ color: "rgba(255,255,255,0.28)", fontSize: "0.52rem", letterSpacing: "0.18em", textTransform: "uppercase" }}>
                                    {step.subtitle}
                                </span>
                            </div>
                        </div>

                        {/* Title — two separate h2 tags with proper spacing */}
                        <div style={{
                            marginBottom: "0.5rem",
                            opacity: 0, animation: "wsFadeUp 0.5s ease 0.1s forwards",
                        }}>
                            <h2 style={{
                                fontFamily: "'Arial Black', Impact, sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                textTransform: "uppercase",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "#fff",
                                margin: 0,
                            }}>
                                {step.title.split(" ").slice(0, -1).join(" ")}
                            </h2>
                            <h2 style={{
                                fontFamily: "'Arial Black', Impact, sans-serif",
                                fontWeight: 900,
                                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                                textTransform: "uppercase",
                                lineHeight: 1.05,
                                letterSpacing: "-0.025em",
                                color: "transparent",
                                WebkitTextStroke: "1px rgba(255,255,255,0.22)",
                                margin: 0,
                            }}>
                                {step.title.split(" ").slice(-1)[0]}
                            </h2>
                        </div>

                        {/* Accent line */}
                        <div style={{
                            width: 44, height: 2, marginBottom: "1.4rem",
                            background: "linear-gradient(90deg, rgba(147,197,253,0.7), transparent)",
                            opacity: 0, animation: "wsFadeUp 0.5s ease 0.15s forwards",
                        }} />

                        {/* Description */}
                        <p style={{
                            color: "rgba(255,255,255,0.45)",
                            fontSize: "clamp(0.8rem, 1.2vw, 0.9rem)",
                            fontWeight: 300, lineHeight: 1.85, letterSpacing: "0.025em",
                            maxWidth: 420, margin: "0 0 2rem",
                            opacity: 0, animation: "wsFadeUp 0.5s ease 0.2s forwards",
                        }}>
                            {step.desc}
                        </p>

                        {/* Step dots nav */}
                        <div style={{
                            display: "flex", gap: "0.45rem", flexWrap: "wrap",
                            opacity: 0, animation: "wsFadeUp 0.5s ease 0.25s forwards",
                        }}>
                            {STEPS.map((_, i) => (
                                <div key={i} style={{
                                    width: i === activeStep ? 20 : 5, height: 5,
                                    borderRadius: 3,
                                    background: i === activeStep
                                        ? "rgba(147,197,253,0.85)"
                                        : i < activeStep
                                            ? "rgba(147,197,253,0.3)"
                                            : "rgba(255,255,255,0.12)",
                                    transition: "all 0.4s ease",
                                }} />
                            ))}
                        </div>

                        {/* Scroll hint */}
                        {activeStep < STEPS.length - 1 && (
                            <div style={{
                                marginTop: "2rem", display: "flex", alignItems: "center", gap: "0.6rem",
                                opacity: 0, animation: "wsFadeUp 0.5s ease 0.3s forwards",
                            }}>
                                <div style={{
                                    width: 1, height: 28,
                                    background: "rgba(255,255,255,0.1)",
                                    position: "relative", overflow: "hidden",
                                }}>
                                    <div style={{
                                        position: "absolute", top: 0, left: 0, right: 0, height: "45%",
                                        background: "rgba(147,197,253,0.5)",
                                        animation: "wsScrollDot 1.8s ease infinite",
                                    }} />
                                </div>
                                <span style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                                    Scroll to next step
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes wsFadeUp   { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes wsScrollDot{ 0%{top:-45%} 100%{top:110%} }
        @media (max-width: 768px) {
          .washing-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 45vh 1fr;
          }
        }
      `}</style>
        </div>
    );
}