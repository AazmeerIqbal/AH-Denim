import { useScrollReveal } from "../hooks/useScrollReveal";
import Buyers from "/images/Buyers.jpeg";
import Client1 from "/images/Client1.jpg";
import Client2 from "/images/Client2.jpeg";
import Client3 from "/images/Client3.jpeg";
import Client4 from "/images/Client4.jpeg";
import Client5 from "/images/Client5.jpeg";
import Client6 from "/images/Client6.jpg";
import Client7 from "/images/Client7.jpeg";
import Client8 from "/images/Client8.jpeg";
import Client9 from "/images/Client9.jpeg";
import Client10 from "/images/Client10.jpeg";
import Client11 from "/images/Client11.jpeg";
import Client12 from "/images/Client12.jpeg";
import Client13 from "/images/Client13.jpeg";
import Client14 from "/images/Client14.png";
import Client15 from "/images/Client15.jpg";

const clients = [
  Client1, Client2, Client3, Client4, Client5, 
  Client6, Client7, Client8, Client9, Client10, 
  Client11, Client12, Client13, Client14, Client15
];

const OurClients = () => {
  const { ref, visible } = useScrollReveal(0.1);

  return (
    <section
      ref={ref}
      style={{
        backgroundColor: '#030b13',
        padding: 'clamp(3rem, 6vw, 5.5rem) 0',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s',
      }}
      className="overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl">
          <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">
            Trusted Partners
          </p>
          <h2 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.0] tracking-[-0.02em] mb-6 text-white/90">
            Our Clients
          </h2>
          <p className="text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em]">
            We are proud to work with established brands and fashion startups globally. 
            Our objective is to leverage our industry knowledge and expertise to create value for our clients.
          </p>
        </div>
      </div>

      {/* Infinite Slider */}
      <div className="relative w-full flex overflow-hidden group">
        {/* Left and Right Fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-[15%] bg-gradient-to-r from-[#030b13] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-[15%] bg-gradient-to-l from-[#030b13] to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-scroll hover:[animation-play-state:paused] w-max gap-8 items-center py-4">
          {/* Double the array for seamless looping */}
          {[...clients, ...clients].map((client, index) => (
            <div 
              key={index}
              className="w-24 sm:w-28 md:w-36 aspect-square rounded-sm border border-white/10 bg-white/[0.02] flex items-center justify-center p-4 filter grayscale contrast-125 opacity-60 hover:grayscale-0 hover:opacity-100 hover:border-blue-500/50 transition-all duration-500 flex-shrink-0"
            >
              <img
                src={client}
                alt={`Client ${index + 1}`}
                className="max-w-full max-h-full object-contain mix-blend-screen"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); } /* -50% shifts halfway through the doubled list */
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default OurClients;
