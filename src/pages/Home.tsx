import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WorldAndUs from "../components/WorldAndUs";
import Footer from "../components/Footer";
import Questions from "../components/Questions";
import OurServices from "../components/OurServices";
import OurWork from "../components/OurWork";
import MissionandVission from "../components/MissionandVission";
import Overview from "../components/Overview";
import Certificates from "../components/Certificates";
import ImageCollage from "../components/Collage";
import OurClients from "../components/OurClients";

const Home = () => {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <div className="lg:w-[95%] 2xl:w-[90%] mx-auto text-[15px] sm:text-[16px] 2xl:text-[18px] flex flex-col justify-center">
          <OurWork />
          <MissionandVission />
          <ImageCollage />
          <OurServices />
          <WorldAndUs />
          <Overview />
          <OurClients />
          <Certificates />
        </div>
        <Questions />
      </main>
      <Footer />
    </>
  );
};

export default Home;
