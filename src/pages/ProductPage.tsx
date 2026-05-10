import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Navbar from "../components/Navbar";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Captions, Download, Fullscreen, Zoom } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/captions.css";
import Footer from "../components/Footer";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const product = location.state;
  const category = location.state?.category || "Man";

  const { ref: contentRef, visible: contentVisible } = useScrollReveal(0.1);

  if (!product)
    return (
      <div className="min-h-screen bg-[#030b13] flex flex-col justify-center items-center text-white">
        <Navbar />
        <h1 className="text-2xl font-bold tracking-widest uppercase">Product not found</h1>
        <button onClick={() => navigate("/")} className="mt-6 text-blue-400 hover:text-blue-300">Return Home</button>
      </div>
    );

  const images: string[] = product.src || [];

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  const sizes = ["S", "M", "L", "XL"];

  return (
    <div className="min-h-screen flex flex-col bg-[#030b13] text-[#ffffff] font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Back Button */}
          <button
            onClick={() => navigate(`/items?category=${category}`)}
            className="flex items-center gap-2 text-[0.65rem] tracking-[0.2em] uppercase font-bold text-white/50 hover:text-blue-400 transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Catalog
          </button>

          <Lightbox
            plugins={[Captions, Download, Fullscreen, Zoom]}
            captions={{ showToggle: true, descriptionTextAlign: "end" }}
            close={() => setOpen(false)}
            slides={images.map((img) => ({ src: img }))}
            open={open}
            index={currentIndex}
            styles={{ container: { backgroundColor: "rgba(3, 11, 19, 0.95)" } }}
          />

          <section
            ref={contentRef}
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
            className="flex flex-col lg:flex-row gap-12 lg:gap-20"
          >
            {/* Desktop Image Grid / Mobile Main Image */}
            <div className="w-full lg:w-[55%]">
              {/* Desktop Grid */}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-6">
                {images.map((img: string, idx: number) => (
                  <div 
                    key={idx}
                    className="relative aspect-[3/4] rounded-sm overflow-hidden border border-white/10 bg-black/50 cursor-zoom-in group"
                    onClick={() => openLightbox(idx)}
                  >
                    <div className="absolute inset-0 bg-blue-500/0 mix-blend-screen group-hover:bg-blue-500/10 transition-colors duration-500 z-10 pointer-events-none" />
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85] group-hover:brightness-[1] transition-all duration-700"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="md:hidden flex flex-col gap-4">
                <div 
                  className="relative w-full aspect-[3/4] rounded-sm overflow-hidden border border-white/10 bg-black/50 cursor-zoom-in"
                  onClick={() => openLightbox(currentIndex)}
                >
                  <img
                    src={images[currentIndex]}
                    alt="Product"
                    className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.9]"
                  />
                </div>
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((img: string, idx: number) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Thumbnail ${idx}`}
                      className={`w-20 h-24 object-cover cursor-pointer rounded-sm border transition-all ${
                        idx === currentIndex
                          ? "border-blue-400 opacity-100"
                          : "border-white/10 opacity-50 hover:opacity-80"
                      }`}
                      onClick={() => setCurrentIndex(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="w-full lg:w-[45%] flex flex-col gap-8 lg:sticky lg:top-32 h-fit">
              <div className="border-b border-white/10 pb-8">
                <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">
                  {category} Collection
                </p>
                <h1 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(1.8rem,3vw,2.5rem)] uppercase leading-[1.1] tracking-[-0.02em] mb-6">
                  {product.title}
                </h1>
                
                <div className="flex flex-col gap-2 mb-6">
                  <div className="flex gap-2 items-baseline">
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Fit & Style:</span>
                    <span className="text-[0.85rem] font-light text-white/90">{product.fit || "Standard Fit"}</span>
                  </div>
                  <div className="flex gap-2 items-baseline">
                    <span className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Color:</span>
                    <span className="text-[0.85rem] font-light text-white/90">All washes available</span>
                  </div>
                </div>

                <p className="text-[0.8rem] text-white/50 font-light leading-[1.8] tracking-[0.03em]">
                  {product.disc}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-[0.65rem] tracking-[0.15em] uppercase text-white/50">Available Sizes</h3>
                <div className="flex flex-wrap items-center gap-4">
                  {sizes.map((size) => (
                    <div key={size} className="relative group cursor-pointer">
                      <input 
                        type="radio" 
                        name="size" 
                        id={`size-${size}`} 
                        className="peer sr-only" 
                        defaultChecked={size === "M"}
                      />
                      <label 
                        htmlFor={`size-${size}`}
                        className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 bg-white/[0.02] text-white/70 font-bold text-[0.85rem] transition-all cursor-pointer peer-checked:border-blue-400 peer-checked:bg-blue-500/10 peer-checked:text-blue-300 hover:border-white/50 peer-checked:shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                      >
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 bg-blue-500/5 border border-blue-500/20 rounded-sm p-6">
                <h4 className="text-[0.65rem] tracking-[0.15em] uppercase text-blue-300 mb-2">Inquiry</h4>
                <p className="text-[0.75rem] text-white/50 font-light leading-[1.6]">
                  Interested in this product? Please contact our sales team with the product name for bulk orders and customization options.
                </p>
              </div>

            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;
