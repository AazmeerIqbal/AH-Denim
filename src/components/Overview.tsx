import OverviewImage1 from "/images/OverviewImage1.jpeg";
import OverviewImage2 from "/images/OverviewImage2.jpeg";
import { Link } from "react-router-dom";

const Overview = () => {
  return (
    <section className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-5 2xl:gap-20 py-20 items-start px-3 md:px-5">
      <div className="md:w-[40%] lg:w-[30%] w-full ">
        <img
          src={OverviewImage1}
          className=" w-full h-[65vh] md:h-[60vh] rounded-lg "
          alt="OverviewImage1"
        />
      </div>

      <div className="md:w-[60%] lg:w-[60%] mt-5">
        <div className="text-2xl sm:text-[28px] 2xl:text-[40px] font-bold font-serif mb-5 text-center md:text-left text-[#4D4D4D]">
          Elevating Denim Craftsmanship
        </div>

        <p className="max-w-3xl 2xl:max-w-4xl mb-8 text-[#4B5563] font-normal">
          AH Denim is a leading name in sustainable and high-quality denim
          manufacturing. With over two decades of expertise, we take pride in
          crafting premium woven garments for men, women, and kids. Our
          commitment to excellence is reflected in our meticulous craftsmanship,
          cutting-edge production techniques, and dedication to sustainability.
        </p>
        <Link
          to="/AboutUs"
          className="bg-[#222222] text-[#ffffff] md:px-6 py-3 px-4 font-semibold rounded-full transition w-[150px] "
        >
          Learn More
        </Link>
      </div>
      <div className="md:w-[40%] lg:w-[30%] w-full hidden lg:block h-full">
        <img
          src={OverviewImage2}
          className=" w-full h-[60vh] rounded-lg object-contain md:object-fill"
          alt="OverviewImage2"
        />
      </div>
    </section>
  );
};

export default Overview;
