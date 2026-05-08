import collageImage1 from "/images/collageImage1.jpeg";
import collageImage2 from "/images/collageImage2.jpeg";
import collageVideo3 from "/collageVideo3.mp4";
import gif from "/images/gifImage.gif";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

const ImageCollage = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });

  const sm = useTransform(scrollYProgress, [0, 1], [80, -100]);
  const md = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const lg = useTransform(scrollYProgress, [0, 1], [150, -200]);
  return (
    <section
      ref={container}
      className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-4 p-1 md:p-4 auto-rows-[200px] md:auto-rows-[300px]"
    >
      {/* Top left: Stacked denim */}
      <motion.div className="relative col-span-2 sm:col-span-1 row-span-2 overflow-hidden ">
        <motion.video
          src={collageVideo3}
          style={{ y: md }}
          autoPlay
          loop
          muted
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
        ></motion.video>
      </motion.div>
      {/* Center top: Person wearing cropped pants */}
      <motion.div className="relative col-span-1 row-span-1 overflow-hidden">
        <motion.img
          src={collageImage2}
          style={{ y: sm }}
          alt="Modern Minimalism"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
        ></motion.img>
      </motion.div>
      {/* Top right: White pants */}
      <motion.div className="relative col-span-1 row-span-2 overflow-hidden">
        <motion.img
          src={gif}
          style={{ y: md }}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
        />
      </motion.div>
      {/* Middle left: Person wearing a green oversized jacket */}
      <motion.div className="relative col-span-2 md:col-span-1 row-span-1 overflow-hidden rounded-lg">
        <motion.img
          src={collageImage1}
          style={{ y: sm }}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110 rounded-lg"
        ></motion.img>
      </motion.div>
    </section>
  );
};

export default ImageCollage;
