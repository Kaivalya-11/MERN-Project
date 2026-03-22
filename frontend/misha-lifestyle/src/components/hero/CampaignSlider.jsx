import { useEffect, useState } from "react";
import { FiChevronDown } from "react-icons/fi";

import slide1 from "../../assets/images/campaign/campaign-slide-1.jpg";
import slide2 from "../../assets/images/campaign/campaign-slide-2.jpg";
import slide3 from "../../assets/images/campaign/campaign-slide-3.jpg";
import slide4 from "../../assets/images/campaign/campaign-slide-4.jpg";
import slide5 from "../../assets/images/campaign/campaign-slide-5.jpg";
import slide6 from "../../assets/images/campaign/campaign-slide-6.jpg";

const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

const CampaignSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollDown = () => {
    const section = document.getElementById("products");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="pt-4 pb-6 relative">
      <div className="w-full relative">

        {/* Slideshow wrapper (clipped) */}
        <div className="relative w-full h-[560px] overflow-hidden">
          {slides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt="Campaign Slide"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === current ? "opacity-100" : "opacity-0"
                }`}
            />
          ))}
        </div>

        {/* Scroll Down Button (NOT clipped) */}
        <button
          onClick={scrollDown}
          aria-label="Scroll to products"
          className="absolute left-1/2 -translate-x-1/2 -bottom-4 z-20 w-12 h-12 rounded-full bg-white border border-neutral-300 flex items-center justify-center shadow-sm hover:shadow-md transition"
        >
          <FiChevronDown className="text-xl animate-scroll-hint" />
        </button>

      </div>
    </section>
  );
};

export default CampaignSlider;
