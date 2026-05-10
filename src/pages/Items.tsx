import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { slides } from "../slides";
import { useScrollReveal } from "../hooks/useScrollReveal";

const Items = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "Man";
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState(selectedCategory);

  const { ref: headerRef, visible: headerVisible } = useScrollReveal(0.1);
  const { ref: gridRef, visible: gridVisible } = useScrollReveal(0.1);

  useEffect(() => {
    setCategory(selectedCategory);
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const filteredSlides = slides.filter(
    (slide) =>
      slide.category.trim().toLowerCase() === category.trim().toLowerCase() &&
      slide.disc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>({});

  const nextImage = (productId: string, length: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: (prev[productId] + 1) % length || 0,
    }));
  };

  const prevImage = (productId: string, length: number) => {
    setImageIndices((prev) => ({
      ...prev,
      [productId]: prev[productId] === 0 ? length - 1 : prev[productId] - 1,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#030b13] text-[#ffffff] font-sans">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Header & Controls */}
          <section
            ref={headerRef}
            className="mb-12"
            style={{
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s",
            }}
          >
            <div className="text-center mb-12">
              <p className="text-blue-300/65 text-[0.6rem] font-semibold tracking-[0.3em] uppercase mb-4">
                Our Collections
              </p>
              <h1 className="font-['Arial_Black',Impact,sans-serif] font-black text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[1.0] tracking-[-0.02em] mb-6">
                Explore Our<br />Catalog
              </h1>
            </div>

            <div className="flex flex-col md:flex-row gap-8 justify-between items-center border-y border-white/10 py-6 mb-8">
              <ul className="flex flex-wrap justify-center gap-4 sm:gap-8">
                {["Man", "Woman", "Kids"].map((cat) => {
                  const isActive = category === cat;
                  return (
                    <li key={cat}>
                      <button
                        className={`text-[0.7rem] uppercase tracking-[0.2em] font-bold transition-all duration-300 pb-1 border-b-2 ${
                          isActive 
                            ? "text-blue-400 border-blue-400" 
                            : "text-white/50 border-transparent hover:text-white/80"
                        }`}
                        onClick={() => setCategory(cat)}
                      >
                        {cat}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {/* Search Input */}
              <div className="relative w-full md:w-64 group">
                <input
                  type="text"
                  className="w-full bg-white/[0.02] border border-white/10 text-white rounded-sm py-3 px-4 pl-10 focus:outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all text-[0.75rem] font-light placeholder:text-white/30"
                  placeholder="SEARCH CATALOG..."
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-blue-400 transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Product Grid */}
          <section
            ref={gridRef}
            style={{
              opacity: gridVisible ? 1 : 0,
              transform: gridVisible ? "translateY(0)" : "translateY(32px)",
              transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
            }}
          >
            <p className="text-[0.65rem] tracking-[0.2em] uppercase text-white/40 mb-8 border-l-2 border-blue-500/50 pl-3">
              Showing {filteredSlides.length} results for {category}
            </p>

            {filteredSlides.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 2xl:gap-8">
                {filteredSlides.map((product, index) => {
                  const currentImageIndex = imageIndices[product.id] || 0;
                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col gap-4 relative"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-white/10 bg-black/50">
                        <Link to={`/ProductPage?id=${product.id}`} state={product} className="block w-full h-full">
                          <div className="absolute inset-0 bg-blue-500/0 mix-blend-screen group-hover:bg-blue-500/10 transition-colors duration-500 z-10 pointer-events-none" />
                          <img
                            className="w-full h-full object-cover filter contrast-[1.1] brightness-[0.85] group-hover:brightness-[1] group-hover:scale-105 transition-all duration-700"
                            src={product.src[currentImageIndex]}
                            alt={`Product ${index + 1}`}
                            onMouseEnter={() => {
                              if (product.src.length > 1) {
                                setImageIndices((prev) => ({ ...prev, [product.id]: 1 }));
                              }
                            }}
                            onMouseLeave={() => {
                              if (product.src.length > 1) {
                                setImageIndices((prev) => ({ ...prev, [product.id]: 0 }));
                              }
                            }}
                          />
                        </Link>
                        
                        {/* Navigation Arrows */}
                        {product.src.length > 1 && (
                          <>
                            <button
                              className="absolute top-1/2 left-2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all z-20"
                              onClick={(e) => {
                                e.preventDefault();
                                prevImage(product.id, product.src.length);
                              }}
                            >
                              <ChevronLeft size={16} />
                            </button>
                            <button
                              className="absolute top-1/2 right-2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-black/40 backdrop-blur-sm border border-white/10 text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-blue-500/20 hover:border-blue-500/50 transition-all z-20"
                              onClick={(e) => {
                                e.preventDefault();
                                nextImage(product.id, product.src.length);
                              }}
                            >
                              <ChevronRight size={16} />
                            </button>
                          </>
                        )}
                      </div>
                      
                      <div className="text-center">
                        <Link to={`/ProductPage?id=${product.id}`} state={product}>
                          <h2 className="text-[0.7rem] font-bold tracking-[0.15em] uppercase text-white/90 group-hover:text-blue-300 transition-colors">
                            {product.title}
                          </h2>
                          {product.disc && (
                            <p className="text-[0.6rem] tracking-[0.05em] text-white/40 mt-1 line-clamp-1">
                              {product.disc}
                            </p>
                          )}
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-20 text-center border border-white/10 bg-white/[0.02] rounded-sm">
                <p className="text-[0.8rem] tracking-[0.15em] uppercase text-white/40 font-light">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Items;
