import { Routes, Route } from "react-router-dom";
import Items from "./pages/Items";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import ProductPage from "./pages/ProductPage";
import AboutUS from "./pages/AboutUs";

function App() {
  return (
    <div className="min-h-screen font-poppins font-light not-italic bg-white ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ContactUS" element={<ContactUs />} />
        <Route path="/Items" element={<Items />} />
        <Route path="/ProductPage" element={<ProductPage />} />
        <Route path="/AboutUs" element={<AboutUS />} />
      </Routes>
    </div>
  );
}

export default App;
