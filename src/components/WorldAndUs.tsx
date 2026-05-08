import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface RegionData {
  name: string;
  percentage: number;
  color: string;
}

const regions: RegionData[] = [
  { name: "United Kingdom", percentage: 50, color: "#181C14" },
  { name: "United Arab Emirates", percentage: 20, color: "#3C3D37" },
  { name: "United States", percentage: 15, color: "#EEEEEE" },
  { name: "Europe", percentage: 15, color: "#686D76" },
];

const WorldAndUs: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const size = 300;
  const center = size / 2;
  const strokeWidth = 40;
  const radius = (size - strokeWidth) / 2;

  const calculatePath = (percentage: number, startAngle: number) => {
    const angle = (percentage / 100) * 360;
    const endAngle = startAngle + angle;
    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = center + radius * Math.cos(startRad);
    const y1 = center + radius * Math.sin(startRad);
    const x2 = center + radius * Math.cos(endRad);
    const y2 = center + radius * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`;
  };

  let startAngle = 0;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-3 md:px-4">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : -20 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-[26px] sm:text-3xl 2xl:text-[40px] font-bold font-serif text-center mb-12 text-[#4D4D4D]"
        >
          Global Operations Distribution
        </motion.h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Pie Chart Animation */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: isInView ? 1 : 0.8, opacity: isInView ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative w-[300px] h-[300px]"
          >
            <svg width={size} height={size} className="transform -rotate-90">
              {regions.map((region) => {
                const path = calculatePath(region.percentage, startAngle);
                startAngle += (region.percentage / 100) * 360;

                return (
                  <motion.path
                    key={region.name}
                    d={path}
                    stroke={region.color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: isInView ? 1 : 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    onMouseEnter={() => setActiveRegion(region.name)}
                    onMouseLeave={() => setActiveRegion(null)}
                    className="cursor-pointer transition-all duration-200 hover:filter hover:brightness-110"
                    style={{
                      filter:
                        activeRegion === region.name
                          ? "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
                          : "none",
                      transform:
                        activeRegion === region.name
                          ? "scale(1.02)"
                          : "scale(1)",
                    }}
                  />
                );
              })}
            </svg>

            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-sm font-medium text-gray-600">Global</p>
                <p className="text-2xl font-bold text-gray-800 ">Presence</p>
              </div>
            </div>
          </motion.div>

          {/* Legend Animation */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 30 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                className="flex items-center space-x-2 cursor-pointer"
                onMouseEnter={() => setActiveRegion(region.name)}
                onMouseLeave={() => setActiveRegion(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isInView ? 1 : 0,
                  y: isInView ? 0 : 20,
                }}
                transition={{ duration: 0.6, delay: 0.2 * index }}
                whileHover={{ scale: 1.05 }}
              >
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: region.color }}
                />
                <div>
                  <p className="font-medium">{region.name}</p>
                  <p className="text-sm text-gray-600">{region.percentage}%</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default WorldAndUs;
