import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import FeaturePillars from "../components/FeaturePillars";
import Collections from "../components/Collections";
import Capabilities from "../components/Capabilities";
import VideoSection from "../components/VideoSection";
import StylesSection from "../components/StylesSection";
import FactorySection from "../components/FactorySection";
import OurClients from "../components/OurClients";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div style={{ backgroundColor: "#030b13" }}>
      <Navbar />
      <main>
        <Hero />
        <FeaturePillars />
        <Collections />
        <Capabilities />
        <VideoSection />
        <StylesSection />
        <FactorySection />
        <OurClients />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
