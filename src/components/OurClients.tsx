import { useScrollReveal } from "../hooks/useScrollReveal";
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
        padding: 'clamp(4rem, 8vw, 8rem) 0',
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
          <div
            className="h-px mx-auto mt-8"
            style={{
              width: "60px",
              background: "linear-gradient(to right, transparent, rgba(147,197,253,0.4), transparent)",
            }}
          />
        </div>

        {/* Client Grid */}
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8 px-4 lg:px-0">
          {clients.map((client, index) => (
            <div 
              key={index}
              className="group relative w-full aspect-[4/3] rounded-sm flex items-center justify-center p-6 sm:p-8 transition-all duration-500 overflow-hidden cursor-pointer"
              style={{
                backgroundColor: "rgba(255,255,255,0.02)",
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.05)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)";
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(147,197,253,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.02)";
                e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(255,255,255,0.05)";
              }}
            >
              <img
                src={client}
                alt={`Client ${index + 1}`}
                className="w-full h-full object-contain filter grayscale contrast-125 opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100 transition-all duration-500 transform group-hover:scale-110 mix-blend-screen"
              />
              {/* Subtle hover glow behind image */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "radial-gradient(circle at 50% 50%, rgba(59,130,246,0.1) 0%, transparent 60%)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurClients;
