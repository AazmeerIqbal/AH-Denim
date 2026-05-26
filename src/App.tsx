import React from "react";
import { Routes, Route } from "react-router-dom";
import Items from "./pages/Items";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage";
import AboutUS from "./pages/AboutUs";
import Faqs from "./pages/Faqs";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      const handleLoad = () => setLoading(false);
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);
  return (
    loading ? (
      <Loader />
    ) : (
      <div className="min-h-screen font-poppins font-light not-italic" style={{ backgroundColor: "#030b13" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ContactUS" element={<ContactUs />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/ProductPage" element={<ProductPage />} />
          <Route path="/AboutUs" element={<AboutUS />} />
          <Route path="/Faqs" element={<Faqs />} />
        </Routes>
      </div>
    )
  );
}

export default App;
