import OurWorkImage from "/images/OurWorkImage.jpeg";

const OurWork = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row md:gap-[60px] gap-10 md:px-5 px-3 2xl:mx-auto py-16 md:justify-between">
        {/* Text Section */}
        <div className="text-[#4D4D4D] flex flex-col md:w-[60%] md:h-[50vh] lg:px-0 lg:w-[70%]">
          <div className="flex flex-col gap-4 md:gap-5">
            <h2 className="text-[26px] sm:text-3xl 2xl:text-[40px] text-center font-bold font-serif text-[#4D4D4D]">
              Who are we
            </h2>

            <p className="leading-relaxed  text-justify text-sm md:text-[15px]">
              <span className="block mb-3">
                <strong>About AH Denim</strong> At AH Denim, we specialize in
                crafting premium denim and woven apparel, recognized for
                innovation, quality, and sustainable manufacturing. With over
                two decades of industry expertise, we have built a reputation
                for delivering fashion-forward garments to leading global
                brands, establishing ourselves as a trusted manufacturing
                partner.
              </span>
              <span className="block mb-3">
                <strong>Our Commitment to Excellence</strong> We take pride in
                consistently providing on-trend, high-quality apparel that meets
                the fast-paced and ever-evolving demands of global fashion
                brands. Our ability to deliver flexibility, speed, and precision
                ensures that every piece meets the highest standards without
                compromising on style, quality, or sustainability.
              </span>
              <ul className="list-disc list-inside mb-3 space-y-2">
                <li>
                  <strong>A Full-Range Apparel Manufacturer:</strong> Our
                  production spans across men’s, women’s, and kids' apparel,
                  offering a diverse range of premium, fashion-forward designs
                  tailored to meet global market trends.
                </li>
              </ul>
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-2/5 lg:w-1/3">
          <img
            src={OurWorkImage}
            className="w-full h-auto max-h-[70vh] rounded-lg object-cover"
            alt="Our Work"
          />
        </div>
      </div>
    </>
  );
};

export default OurWork;
