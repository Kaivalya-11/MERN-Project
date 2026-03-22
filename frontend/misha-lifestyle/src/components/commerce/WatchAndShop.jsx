import { useRef } from "react";
import "./WatchAndShop.css";

const watchItems = [
  {
    title: "Bear Hug Fanny Pack",
    src: "/gifs/watch-1.gif",
  },
  {
    title: "Sundown Bloom Small Box Bag (Small)",
    src: "/gifs/watch-2.gif",
  },
  {
    title: "Raat Rang Potli Bag",
    src: "/gifs/watch-3.gif",
  },
  {
    title: "Blossom Pop Backpack",
    src: "/gifs/watch-4.gif",
  },
  {
    title: "Midnight Moon Sling Bag",
    src: "/gifs/watch-5.gif",
  },
];

const WatchAndShop = () => {
  const sliderRef = useRef(null);

  const slide = (direction) => {
    if (!sliderRef.current) return;

    const cardWidth = sliderRef.current.children[0].offsetWidth + 24;
    sliderRef.current.scrollBy({
      left: direction * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section className="watch-and-shop">
      <h2 className="watch-shop-title">WATCH & SHOP</h2>

      <div className="watch-slider-wrapper">
        <button className="watch-arrow left" onClick={() => slide(-1)}>
          ‹
        </button>

        <div className="watch-slider" ref={sliderRef}>
          {watchItems.map((item, index) => (
            <div className="watch-card" key={index}>
              <div className="watch-media">
                <img src={item.src} alt={item.title} loading="lazy" />
              </div>
              <p className="watch-title">{item.title}</p>
            </div>
          ))}
        </div>

        <button className="watch-arrow right" onClick={() => slide(1)}>
          ›
        </button>
      </div>
    </section>
  );
};

export default WatchAndShop;
