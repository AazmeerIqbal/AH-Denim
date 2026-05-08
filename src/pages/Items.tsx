import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { slides } from "../slides";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { Link } from "react-router-dom";

const Items = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category") || "Men"; // Default to "Men"
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Save category to localStorage when it changes
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    setCategory(selectedCategory);
    localStorage.setItem("selectedCategory", selectedCategory);
  }, [selectedCategory]);

  const filteredSlides = slides.filter(
    (slide) =>
      slide.category.trim().toLowerCase() === category.trim().toLowerCase() &&
      slide.disc?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  console.log("Selected Category:", category);
  console.log("Filtered Products:", filteredSlides);

  console.log(filteredSlides);

  const [imageIndices, setImageIndices] = useState<{ [key: string]: number }>(
    {}
  );

  // Function to change image
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
    <>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="mt-[5rem] ">
          <div className="mensWear flex flex-col my-10 gap-10 z-50 px-4 md:px-20 w-full mx-auto">
            <div className="flex flex-col gap-10 items-start md:flex-row md:justify-between md:items-center">
              {/* ✅ Category Toggle */}
              <ul className="flex gap-5 text-[#000000] text-[17px] sm:text-lg uppercase cursor-pointer">
                {["Man", "Woman", "Kids"].map((cat) => (
                  <li key={cat}>
                    <button
                      className={`uppercase ${
                        category === cat ? "font-bold" : ""
                      }`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>

              {/* ✅ Search Input */}
              <div className="flex items-center relative">
                <input
                  type="text"
                  className="border-b border-gray-400 p-2 text-[18px] text-[#000000] outline-none"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FiSearch
                  size={20}
                  className="cursor-pointer absolute right-[0px]"
                />
              </div>
            </div>
          </div>

          {/* ✅ Product Grid */}
          <div className="md:px-0 flex flex-col gap-10 mb-12 ">
            <h2 className="text-[#4D4D4D] px-4 md:px-8 my-7 uppercase font-bold font-serif text-[18px]">
              <span>You are interested in {category}</span>
            </h2>

            {/* ✅ Check if products exist */}
            {filteredSlides.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 2xl:gap-8 px-3 md:px-8">
                {filteredSlides.map((product, index) => {
                  return (
                    <div
                      key={product.id}
                      className="card relative group cursor-pointer"
                    >
                      <div className="h-[50vh] 2xl:h-[60vh] shadow-lg border border-gray-200 bg-white relative overflow-hidden">
                        <Link
                          to={`/ProductPage?id=${product.id}`}
                          state={product}
                        >
                          <img
                            className="w-full h-full object-cover transition-all duration-300"
                            src={product.src[imageIndices[product.id] || 0]} // 👈 Fix applied
                            alt={`Product ${index + 1}`}
                            onMouseEnter={() => {
                              if (product.src.length > 1) {
                                setImageIndices((prev) => ({
                                  ...prev,
                                  [product.id]: 1,
                                }));
                              }
                            }}
                            onMouseLeave={() => {
                              if (product.src.length > 1) {
                                setImageIndices((prev) => ({
                                  ...prev,
                                  [product.id]: 0,
                                }));
                              }
                            }}
                          />
                        </Link>
                        <button
                          className="absolute top-1/2 bg-white p-1 rounded-r-md shadow opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            prevImage(product.id, product.src.length);
                          }}
                        >
                          <MdOutlineKeyboardArrowLeft size={25} />
                        </button>
                        <button
                          className="absolute top-1/2 right-0 bg-white p-1 rounded-l-md shadow opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                            nextImage(product.id, product.src.length);
                          }}
                        >
                          <MdOutlineKeyboardArrowRight size={25} />
                        </button>
                      </div>
                      <div key={product.id} className="p-5 text-center">
                        <h2 className="mb-3 md:text-[15px] 2xl:text-[17px]  text-[#111111] font-medium font-sans tracking-[2px] uppercase">
                          {product.title}
                        </h2>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-xl font-normal">
                No products found for "{category}"
              </p>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Items;
