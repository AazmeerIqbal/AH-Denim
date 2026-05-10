import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const faqData = [
  {
    question: "What types of denim products do you manufacture?",
    answer: "We specialize in manufacturing denim and non-denim woven garments for men, women, and kids. Our product range includes jeans, jackets, shirts, skirts, and custom styles tailored to client requirements.",
  },
  {
    question: "Do you offer low MOQ or no minimum order quantity?",
    answer: "Yes! We offer low MOQ for fashion-forward styles and even no minimum order quantity for select designs, making it easier for startups and small brands to bring their vision to life",
  },
  {
    question: "Can you develop custom fabrics and washes?",
    answer: "Absolutely! We provide custom fabric development and an extensive range of sustainable wash techniques, including laser distressing, ozone washing, and enzyme washes.",
  },
  {
    question: "What sustainability practices do you follow?",
    answer: "Sustainability is at our core. We utilize eco-friendly washing processes, water recycling, low-impact dyes, and sustainable fabric sourcing to reduce our environmental footprint.",
  },
  {
    question: "Do you offer private label and OEM services?",
    answer: "Yes, we provide private label and OEM manufacturing services, allowing brands to customize designs, trims, labels, and packaging.",
  },
  {
    question: "How does the washing process affect the durability of denim?",
    answer: "The washing process can impact denim's durability. Aggressive washing techniques may weaken the fabric, while gentler methods like enzyme or ozone washing preserve the denim's strength. Properly executed, washing enhances the denim's aesthetic without compromising its longevity.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we export worldwide, with a strong presence in the UK, Dubai, and other global markets. We handle logistics efficiently to ensure timely deliveries.",
  },
  {
    question: "How long does production take?",
    answer: "Production timelines vary based on order size and customization. However, we prioritize efficient turnaround times, ensuring timely delivery without compromising quality.",
  },
  {
    question: "Can you help with design and technical development?",
    answer: "Yes! Our team provides end-to-end guidance, from concept development to fabric selection, pattern making, and finishing touches.",
  },
  {
    question: "How can I get a quote or place an order?",
    answer: "Simply contact us with your requirements, and our team will provide a tailored quote and guide you through the process.",
  },
];

const Faqs = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { ref, visible } = useScrollReveal(0.1);

  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030b13] text-[#ffffff] font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <section
          ref={ref}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
          }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">
              Find Answers
            </p>
            <h1 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.0] tracking-[-0.02em] mb-6">
              Frequently Asked<br />Questions
            </h1>
            <p className="text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em] max-w-2xl mx-auto">
              Everything you need to know about our manufacturing processes, capabilities, and how we can bring your denim vision to life.
            </p>
          </div>

          <div className="space-y-4">
            {faqData.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <div
                  key={index}
                  onClick={() => handleExpand(index)}
                  className={`border border-white/10 rounded-sm overflow-hidden cursor-pointer transition-all duration-300 ${
                    isExpanded ? "bg-white/[0.04] border-blue-500/30" : "bg-black/20 hover:bg-white/[0.02]"
                  }`}
                >
                  <div className="px-6 py-5 flex justify-between items-center gap-4">
                    <h3 className={`text-[0.85rem] tracking-[0.05em] uppercase font-bold transition-colors duration-300 ${
                      isExpanded ? "text-blue-300/90" : "text-white/80"
                    }`}>
                      {item.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${
                      isExpanded ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-white/10 text-white/50"
                    }`}>
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-500 ${isExpanded ? "rotate-180" : "rotate-0"}`}
                      />
                    </div>
                  </div>

                  <div
                    className={`transition-all duration-500 ease-in-out ${
                      isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6 pt-0 text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em]">
                      {item.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Faqs;
