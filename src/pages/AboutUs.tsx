import Navbar from "../components/Navbar";
import WashingSection from "../components/WashingSection";
import Footer from "../components/Footer";
import AboutVideo from "/About Video.mp4";
import AboutUsImage from "/images/AboutUsImage.jpeg";
import ExpoImage1 from "/images/ExpoImage1.jpeg";
import ExpoImage2 from "/images/ExpoImage2.jpeg";
import ExpoImage3 from "/images/ExpoImage3.jpeg";
import ExpoImage4 from "/images/ExpoImage4.jpeg";
import ExpoImage5 from "/images/ExpoImage5.jpeg";
import ExpoImage6 from "/images/ExpoImage6.jpeg";
import ExpoImage8 from "/images/ExpoImage8.jpeg";

// Washing images









import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useScrollReveal } from "../hooks/useScrollReveal";

const expoImages = [
  ExpoImage1, ExpoImage2, ExpoImage3, ExpoImage4,
  ExpoImage5, ExpoImage6, ExpoImage8,
];



const AboutUs = () => {
  const [expoIndex, setExpoIndex] = useState(0);

  // Expo slider auto-play
  useEffect(() => {
    const interval = setInterval(() => setExpoIndex(p => (p + 1) % expoImages.length), 5000);
    return () => clearInterval(interval);
  }, [expoIndex]);


  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      document.getElementById(location.hash.substring(1))?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  const { ref: overviewRef, inView: overviewInView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const { ref: aboutRef, visible: aboutVisible } = useScrollReveal(0.1);
  // const { ref: videoRef, visible: videoVisible } = useScrollReveal(0.1);
  const { ref: expoRef, visible: expoVisible } = useScrollReveal(0.1);

  return (
    <div className="min-h-screen flex flex-col bg-[#030b13] text-[#ffffff] font-sans">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">

        {/* ── ABOUT SECTION ── */}
        <section
          ref={aboutRef}
          id="about-us"
          style={{
            padding: "clamp(3rem, 6vw, 5.5rem) clamp(1.5rem, 6vw, 5rem)",
            opacity: aboutVisible ? 1 : 0,
            transform: aboutVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
        >
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 max-w-7xl mx-auto items-center">
            <div className="w-full lg:w-1/2">
              <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">Our Story</p>
              <h2 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.0] tracking-[-0.02em] mb-6">
                Legacy of<br />Excellence
              </h2>
              <div className="space-y-6 text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em]">
                <p>
                  <strong className="text-white/80 font-semibold tracking-wider">FOUNDED IN 2000</strong> — AH Denim has grown into a leading cut-to-pack manufacturer, specializing in denim and woven garments for men, women, and kids. With two state-of-the-art manufacturing units and a monthly production capacity of 150,000 garments, we provide end-to-end solutions—from design development to final packaging, all under one roof.
                </p>
                <div className="border-l border-blue-400/20 pl-6 py-2 space-y-4">
                  <p><strong className="text-blue-300/80 uppercase text-[0.7rem] tracking-wider block mb-1">Cut-to-Pack Solutions</strong>Managing every stage of production in-house—ensuring superior quality control and faster turnaround times.</p>
                  <p><strong className="text-blue-300/80 uppercase text-[0.7rem] tracking-wider block mb-1">Advanced Facilities</strong>Equipped with modern laundry systems for precision-crafted garments and sustainable practices.</p>
                  <p><strong className="text-blue-300/80 uppercase text-[0.7rem] tracking-wider block mb-1">Sustainability</strong>Dedicated to reducing environmental impact by following eco-friendly washing techniques.</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-blue-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
              <img src={AboutUsImage} alt="AH Denim Facility" className="w-full h-[50vh] lg:h-[70vh] object-cover rounded-sm border border-white/10 filter brightness-[0.85] contrast-[1.1] group-hover:brightness-100 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-[0.6rem] tracking-[0.2em] text-white/70 uppercase">State of the art manufacturing</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── VIDEO SECTION ── */}
        {/* <section
          ref={videoRef}
          id="our-video"
          style={{
            padding: "clamp(2rem, 4vw, 4rem) 0",
            opacity: videoVisible ? 1 : 0,
            transform: videoVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          <div className="max-w-[95%] mx-auto relative border border-white/10 rounded-sm overflow-hidden bg-black/50">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(3,11,19,0.8)_100%)] z-10" />
            <video className="w-full h-[40vh] md:h-[65vh] object-cover opacity-80 mix-blend-screen" controls poster={AboutUsImage}>
              <source src={AboutVideo} type="video/mp4" />
            </video>
          </div>
        </section> */}

        {/* ── OVERVIEW NUMBERS ── */}
        <section
          ref={overviewRef}
          id="overview"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(13,33,71,0.5) 0%, #030b13 65%)",
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem)",
            borderTop: "1px solid rgba(255,255,255,0.03)",
            borderBottom: "1px solid rgba(255,255,255,0.03)",
          }}
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center font-['Arial_Black',Impact,sans-serif] text-[clamp(1.5rem,3vw,2.5rem)] uppercase tracking-[-0.02em] mb-16 text-white/90">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              {[
                { label: "Monthly Capacity", end: 100000, suffix: "+", desc: "Garments produced per month with continuous growth" },
                { label: "Global Workforce", end: 2000, suffix: "+", desc: "Dedicated professionals crafting premium denim" },
                { label: "Annual Revenue", end: 30, prefix: "$", suffix: "M", desc: "Consistent growth in the international market" },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center text-center px-6 py-8 md:py-0">
                  <div className="text-[clamp(2.5rem,5vw,4rem)] font-black tracking-tighter text-blue-300/90 leading-none mb-4" style={{ fontFamily: "Impact, sans-serif" }}>
                    {stat.prefix}
                    {overviewInView ? <CountUp start={0} end={stat.end} duration={3} separator="," /> : "0"}
                    {stat.suffix}
                  </div>
                  <h3 className="text-[0.7rem] font-bold tracking-[0.2em] uppercase text-white/80 mb-3">{stat.label}</h3>
                  <p className="text-[0.7rem] text-white/40 leading-relaxed font-light">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WashingSection />

        {/* ── EXPO SECTION ── */}
        <section
          ref={expoRef}
          id="our-expo"
          style={{
            padding: "clamp(4rem, 8vw, 7rem) clamp(1.5rem, 6vw, 5rem)",
            opacity: expoVisible ? 1 : 0,
            transform: expoVisible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            borderTop: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-3">Global Reach</p>
              <h2 className="font-['Arial_Black',Impact,sans-serif] text-[clamp(2rem,4vw,3.5rem)] uppercase tracking-[-0.02em] text-white/90">Our Expo</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Slider */}
              <div className="w-full lg:w-[55%] relative group">
                <div className="overflow-hidden rounded-sm border border-white/10 bg-black/50 aspect-[4/3] relative">
                  <img
                    key={expoIndex}
                    src={expoImages[expoIndex]}
                    alt={`Expo ${expoIndex + 1}`}
                    className="w-full h-full object-cover filter brightness-[0.85] contrast-[1.1] transition-opacity duration-1000"
                    style={{ animation: "fadeIn 0.5s ease-in-out" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030b13] via-transparent to-transparent opacity-80" />
                </div>

                <button onClick={() => setExpoIndex(p => (p - 1 + expoImages.length) % expoImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/50 text-white/70 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 transition-all rounded-full backdrop-blur-sm"><ChevronLeft size={18} /></button>
                <button onClick={() => setExpoIndex(p => (p + 1) % expoImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center border border-white/20 bg-black/50 text-white/70 hover:bg-blue-500/20 hover:text-white hover:border-blue-500/50 transition-all rounded-full backdrop-blur-sm"><ChevronRight size={18} /></button>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                  {expoImages.map((_, i) => (
                    <button key={i} onClick={() => setExpoIndex(i)} className={`w-12 h-1 transition-all ${i === expoIndex ? "bg-blue-400" : "bg-white/20"}`} />
                  ))}
                </div>
              </div>

              {/* Expo content */}
              <div className="w-full lg:w-[45%] grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Expo Exhibitions", desc: "At AH Denim, we actively participate in global trade shows to showcase our expertise in denim innovation and sustainable apparel manufacturing. Recently, we exhibited at Karachi TEXPO." },
                  { title: "Karachi TEXPO", desc: "Our booth attracted visitors from various countries, including top retailers, fashion designers, and sourcing professionals. We presented a range of sustainable denim solutions." },
                  { title: "Global Market", desc: "We introduced customization and low MOQ solutions, allowing buyers to order tailored styles with flexible quantities alongside our advanced washing capabilities." },
                  { title: "Future Innovation", desc: "We look forward to unveiling more innovations at upcoming trade shows and continuing to push the boundaries of denim manufacturing. Experience the future of denim with AH Denim!" },
                ].map((item, i) => (
                  <div key={i} className="p-6 border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-colors rounded-sm group relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    <h3 className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-white/90 mb-3">{item.title}</h3>
                    <p className="text-[0.7rem] text-white/40 leading-[1.8] font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0.6; filter: blur(4px); }
          to   { opacity: 1;   filter: blur(0);   }
        }
      `}</style>
    </div>
  );
};

export default AboutUs;