import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
// import FeaturePillars from "../components/FeaturePillars";
import OurWork from "../components/OurWork";
import Collections from "../components/Collections";
import Capabilities from "../components/Capabilities";
import VideoSection from "../components/VideoSection";
import StylesSection from "../components/StylesSection";
import FactorySection from "../components/FactorySection";
import WorldAndUs from "../components/WorldAndUs";
import OurClients from "../components/OurClients";
import Footer from "../components/Footer";
// import WheelSection from "../components/Wheelsection";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#030b13" }}>
      <Navbar />
      <main>
        <Hero />
        <OurWork />
        {/* <WheelSection /> */}
        {/* <FeaturePillars /> */}
        <Collections />
        <Capabilities />
        <StylesSection />
        <VideoSection />
        <FactorySection />
        <WorldAndUs />
        <OurClients />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
