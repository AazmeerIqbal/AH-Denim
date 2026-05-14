import { useEffect, useState } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const OurWork = () => {
  const { ref, visible } = useScrollReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: "#030b13",
        width: "100%",
        padding: "clamp(4rem, 8vw, 8rem) clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
      }}
    >
      <div
        className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease 0.2s, transform 1s ease 0.2s",
        }}
      >
        {/* Text Section */}
        <div className="flex-1 flex flex-col gap-8 order-2 lg:order-1">
          <div className="flex flex-col gap-3">
            <span
              className="uppercase tracking-[0.3em] text-[11px] font-light"
              style={{ color: "rgba(147,197,253,0.65)" }}
            >
              Discover Our Heritage
            </span>
            <h2
              className="text-white uppercase font-black leading-[1.1] tracking-tight"
              style={{
                fontFamily: "'Arial Black', Impact, sans-serif",
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
              }}
            >
              Who Are We
            </h2>
            <div
              className="h-px mt-2"
              style={{
                width: "80px",
                background: "linear-gradient(to right, rgba(147,197,253,0.6), transparent)",
              }}
            />
          </div>

          <div className="flex flex-col gap-6 text-[15px] leading-[1.8] font-light" style={{ color: "rgba(255,255,255,0.65)" }}>
            <p>
              <strong className="text-white font-medium block mb-2" style={{ letterSpacing: "0.05em" }}>
                ABOUT AH DENIM
              </strong>
              At AH Denim, we specialize in crafting premium denim and woven
              apparel, recognized for innovation, quality, and sustainable
              manufacturing. With over two decades of industry expertise, we
              have built a reputation for delivering fashion-forward garments to
              leading global brands, establishing ourselves as a trusted
              manufacturing partner.
            </p>

            <p>
              <strong className="text-white font-medium block mb-2" style={{ letterSpacing: "0.05em" }}>
                OUR COMMITMENT TO EXCELLENCE
              </strong>
              We take pride in consistently providing on-trend, high-quality
              apparel that meets the fast-paced and ever-evolving demands of
              global fashion brands. Our ability to deliver flexibility, speed,
              and precision ensures that every piece meets the highest standards
              without compromising on style, quality, or sustainability.
            </p>

            <div className="mt-2 pl-4 border-l border-[rgba(147,197,253,0.3)]">
              <strong className="text-white font-medium block mb-1">
                A Full-Range Apparel Manufacturer
              </strong>
              <p className="text-[14px]">
                Our production spans across men’s, women’s, and kids' apparel,
                offering a diverse range of premium, fashion-forward designs
                tailored to meet global market trends.
              </p>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full order-1 lg:order-2">
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="relative w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] overflow-hidden rounded-sm"
            style={{
              boxShadow: hovered
                ? "0 20px 40px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(147,197,253,0.3)"
                : "0 10px 30px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05)",
              transition: "box-shadow 0.5s ease",
            }}
          >
            <img
              src="/images/OverviewImage1.jpeg"
              alt="Our Work"
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                filter: hovered ? "brightness(0.6) contrast(1.1)" : "brightness(0.4) contrast(1.15) saturate(0.5)",
                transform: hovered ? "scale(1.05)" : "scale(1)",
                transition: "transform 0.8s ease, filter 0.8s ease",
              }}
            />
            {/* Soft inner gradient overlay */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(to top, rgba(3,11,19,0.9) 0%, rgba(3,11,19,0.2) 50%, transparent 100%)",
              }}
            />
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 70%)",
                opacity: hovered ? 1 : 0,
                transition: "opacity 0.5s ease",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
