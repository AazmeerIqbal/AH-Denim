import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import {
  Captions,
  Download,
  Fullscreen,
  Zoom,
} from "yet-another-react-lightbox/plugins";

import "yet-another-react-lightbox/plugins/captions.css";
import Footer from "../components/Footer";

const ProductPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.state);

  const product = location.state;
  const category = location.state?.category || "Man";

  if (!product)
    return <div className="text-center mt-10 text-2xl">Product not found</div>;

  const images: string[] = product.src || [];

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div>
        <Navbar />

        <div className="min-h-screen mt-[5rem]">
          {/* 🔙 Back Button */}
          <button
            onClick={() => navigate(`/items?category=${category}`)}
            className="text-base p-2  md:text-lg  bg-gray-200 rounded-lg shadow hover:bg-gray-300 my-10 mx-4 2xl:mx-16"
          >
            ← Go Back
          </button>

          <Lightbox
            plugins={[Captions, Download, Fullscreen, Zoom]}
            captions={{ showToggle: true, descriptionTextAlign: "end" }}
            close={() => setOpen(false)}
            slides={images.map((img) => ({ src: img }))}
            open={open}
            index={currentIndex}
          />

          {/* 🖼️ Image Grid */}
          <div className="hidden md:flex gap-20 md:px-5 lg:p-12 2xl:p-16 pb-10">
            <div
              className={`grid w-auto ${
                images.length > 1 ? "grid-cols-2" : "grid-cols-1"
              } gap-8`}
            >
              {images.map((img: string, idx: number) => (
                <img
                  onClick={() => openLightbox(idx)}
                  key={idx}
                  src={img}
                  alt={`Product Image ${idx}`}
                  className="md:w-[250px] md:h-[300px] lg:w-[285px] lg:h-[420px] 2xl:w-[410px] 2xl:h-[600px] object-cover shadow-md"
                />
              ))}
            </div>
            <div className="flex flex-col gap-5 md:text-[15px] 2xl:text-[17px] md:w-[45%] 2xl:w-[55%] mt-5">
              <h2 className=" md:text-[18px] 2xl:text-2xl font-sans font-medium tracking-[3px] uppercase mb-5">
                {product.title}
              </h2>
              <div className="uppercase">
                <span className="font-bold font-serif">Fit & Style: </span>
                {product.fit}
              </div>
              <div>
                <p
                  className="font-normal mb-5
                "
                >
                  {product.disc}
                </p>
              </div>

              <div className="flex flex-col items-start gap-4">
                <span className="text-center text-lg font-serif uppercase">
                  Size
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative flex  h-[40px] w-[40px] 2xl:h-[50px] 2xl:w-[50px] items-center justify-center">
                    <div className="text-lg 2xl:text-xl font-bold text-black z-50">
                      S
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] 2xl:h-[50px] 2xl:w-[50px] items-center justify-center">
                    <div className="text-lg 2xl:text-xl font-bold text-black z-50">
                      M
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] 2xl:h-[50px] 2xl:w-[50px] items-center justify-center">
                    <div className="text-lg 2xl:text-xl font-bold text-black z-50">
                      L
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-purple-100 p-2 shadow-sm shadow-[#00000050] ring-purple-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-purple-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] 2xl:h-[50px] 2xl:w-[50px] items-center justify-center">
                    <div className="text-lg 2xl:text-xl font-bold text-black z-50">
                      XL
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-neutral-100 p-2 shadow-sm shadow-[#00000050] ring-neutral-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-neutral-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h5 className="text-lg uppercase tracking-[2px] font-serif">
                  Color
                </h5>
                <div>All washes available.</div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center gap-4 px-3 sm:px-4">
            {/* 🖼️ Image Carousel */}
            <div className="relative w-full h-[500px] sm:h-[600px]">
              <img
                src={images[currentIndex]}
                alt="Product"
                className="w-full h-full object-cover shadow-lg"
              />
            </div>
            {/* 🖼️ Thumbnails for Mobile */}
            <div className="flex gap-3 mt-5">
              {images.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx}`}
                  className={`w-20 h-20 object-cover cursor-pointer ${
                    idx === currentIndex
                      ? "border-2 border-black scale-105"
                      : ""
                  }`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
            <div className="flex flex-col gap-5 text-[15px] mt-5 mb-10">
              <h2 className="text-[18px] font-sans font-medium mb-5 tracking-[3px] sm:text-[18px] text-center ">
                {product.title}
              </h2>

              <div className="uppercase ">
                <span className="font-bold font-serif ">Fit & Style: </span>
                {product.fit}
              </div>
              <div>
                <p
                  className="font-normal mb-5
                "
                >
                  {product.disc}
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                <h5 className="text-lg uppercase tracking-[2px] font-serif">
                  Size
                </h5>
                <div className="flex items-center gap-4">
                  <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                    <div className="text-[17px] font-bold text-black z-50">
                      S
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-blue-100 p-4 shadow-sm shadow-[#00000050] ring-blue-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-blue-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                    <div className="text-[17px] font-bold text-black z-50">
                      M
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-pink-100 p-2 shadow-sm shadow-[#00000050] ring-pink-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-pink-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                    <div className="text-[17px] font-bold text-black z-50">
                      L
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-purple-100 p-2 shadow-sm shadow-[#00000050] ring-purple-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-purple-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                  <div className="relative flex h-[40px] w-[40px] items-center justify-center">
                    <div className="text-[17px] font-bold text-black z-50">
                      XL
                    </div>
                    <div className="absolute h-full w-full rounded-full bg-neutral-100 p-2 shadow-sm shadow-[#00000050] ring-neutral-400 duration-300 peer-checked:scale-110 peer-checked:ring-2"></div>
                    <div className="absolute -z-10 h-full w-full scale-0 rounded-full bg-neutral-200 duration-500 peer-checked:scale-[500%]"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h5 className="text-lg uppercase tracking-[2px] font-serif">
                  Color
                </h5>
                <div>All washes available.</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default ProductPage;
