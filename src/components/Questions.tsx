import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Questions = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const handleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What types of denim products do you manufacture?",
      answer:
        "We specialize in manufacturing denim and non-denim woven garments for men, women, and kids. Our product range includes jeans, jackets, shirts, skirts, and custom styles tailored to client requirements.",
    },
    {
      question: "Do you offer low MOQ or no minimum order quantity?",
      answer:
        "Yes! We offer low MOQ for fashion-forward styles and even no minimum order quantity for select designs, making it easier for startups and small brands to bring their vision to life",
    },
    {
      question: "Can you develop custom fabrics and washes?",
      answer:
        "Absolutely! We provide custom fabric development and an extensive range of sustainable wash techniques, including laser distressing, ozone washing, and enzyme washes.",
    },
    {
      question: "What sustainability practices do you follow?",
      answer:
        "Sustainability is at our core. We utilize eco-friendly washing processes, water recycling, low-impact dyes, and sustainable fabric sourcing to reduce our environmental footprint.",
    },

    {
      question: "Do you offer private label and OEM services?",
      answer:
        "Yes, we provide private label and OEM manufacturing services, allowing brands to customize designs, trims, labels, and packaging.",
    },

    {
      question: "How does the washing process affect the durability of denim?",
      answer:
        "The washing process can impact denim's durability. Aggressive washing techniques may weaken the fabric, while gentler methods like enzyme or ozone washing preserve the denim's strength. Properly executed, washing enhances the denim's aesthetic without compromising its longevity.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we export worldwide, with a strong presence in the UK, Dubai, and other global markets. We handle logistics efficiently to ensure timely deliveries.",
    },
    {
      question: "How long does production take?",
      answer:
        "Production timelines vary based on order size and customization. However, we prioritize efficient turnaround times, ensuring timely delivery without compromising quality.",
    },

    {
      question: "Can you help with design and technical development?",
      answer:
        "Yes! Our team provides end-to-end guidance, from concept development to fabric selection, pattern making, and finishing touches.",
    },

    {
      question: "How can I get a quote or place an order?",
      answer:
        "Simply contact us with your requirements, and our team will provide a tailored quote and guide you through the process.",
    },
  ];

  return (
    <div id="faq" className="bg-gray-100">
      <div className="px-3 sm:px-5 pt-10 pb-20 text-[#4D4D4D] lg:w-[75%] 2xl:w-[50%] mx-auto flex flex-col gap-8 items-center">
        <div>
          <h1 className="text-[26px] sm:text-3xl 2xl:text-[40px] my-5 text-center font-bold font-serif text-[#4D4D4D]">
            Frequently Asked Questions
          </h1>
        </div>

        <div className="flex flex-col gap-[40px] w-full font-normal">
          {faqData.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => handleExpand(index)}
                className="mb-[10px] md:text-[18px] flex sm:justify-between items-start cursor-pointer"
              >
                <div className="w-full">{item.question}</div>

                <MdKeyboardArrowDown
                  size={22}
                  className={`transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>

              <div
                className={`pr-[30px] sm:pr-[60px] md:pr-[80px] transition-all ease-in-out duration-500 overflow-hidden ${
                  expandedIndex === index
                    ? "max-h-40 visible opacity-100"
                    : "max-h-0 opacity-0 invisible"
                }`}
              >
                {item.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Questions;
