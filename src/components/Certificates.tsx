import Certificate1 from "/images/Sedex.png";
import Certificate2 from "/images/amforiBsciLogo.jpg";
import Certificate3 from "/images/QesiLogo.png";
import { motion } from "framer-motion";

const certificates = [Certificate1, Certificate2, Certificate3];

const Certificates = () => {
  return (
    <div className="py-20 flex flex-col px-5 md:px-5">
      <h2 className="text-[26px] sm:text-3xl 2xl:text-[40px] text-center font-bold font-serif my-6 text-[#4D4D4D]">
        Our Certifications
      </h2>

      <div className="relative w-full overflow-hidden py-10">
        {/* Gradient Effects */}
        <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

        <div className="w-full flex justify-center">
          <motion.div
            className="flex space-x-10 w-max"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              repeat: Infinity,
              duration: 8,
              ease: "linear",
            }}
          >
            {/* Duplicate images twice for a seamless loop */}
            {[...certificates, ...certificates].map((client, index) => (
              <img
                key={index}
                src={client}
                alt={`Client ${index + 1}`}
                className="2xl:w-[180px] 2xl:h-[140px] w-[160px] h-[140px] object-contain rounded-lg shadow-md transition-transform duration-300 hover:scale-110"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
