import { useState, useContext } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";

/* =======================
   DIARIES
======================= */
import diary1 from "../../assets/images/diaries/gold-star.jpg";
import diary2 from "../../assets/images/diaries/scarlet-button.jpg";
import diary3 from "../../assets/images/diaries/mustard-maze.jpg";
import diary4 from "../../assets/images/diaries/amber-button.jpg";

/* =======================
   CLOTHING
======================= */
import dress1 from "../../assets/images/clothing/flora-green.jpg";
import dress2 from "../../assets/images/clothing/rose-midi.jpg";
import scarf from "../../assets/images/clothing/mellow-yellow.jpg";
import dress3 from "../../assets/images/clothing/little-black.jpg";

/* =======================
   ACCESSORIES
======================= */
import scrunchie from "../../assets/images/accessories/scrunchie.jpg";
import orangeTassel from "../../assets/images/accessories/orange-tassel.jpg";
import peachTassel from "../../assets/images/accessories/peach-tassel.jpg";
import pinkTassel from "../../assets/images/accessories/pink-tassel.jpg";

/* =======================
   DATA
======================= */
export const diaries = [
  { id: "diary-1", name: "Gold Star Diary", price: "Rs. 699.00", image: diary1 },
  { id: "diary-2", name: "Scarlet Button Trail Diary", price: "Rs. 849.00", image: diary2 },
  { id: "diary-3", name: "Mustard Maze Diary", price: "Rs. 699.00", image: diary3 },
  { id: "diary-4", name: "Amber Button Trail Diary", price: "Rs. 849.00", image: diary4 },
];

export const clothing = [
  {
    id: "clothing-1",
    name: "Flora In Green Dress",
    price: "Rs. 2,599.00",
    rating: "★★★★★ (5.0)",
    image: dress1,
  },
  {
    id: "clothing-2",
    name: "Rose Midi Dress",
    price: "Rs. 3,400.00",
    rating: "★★★★★ (5.0)",
    image: dress2,
  },
  {
    id: "clothing-3",
    name: "Mellow Yellow Scarf",
    price: "Rs. 1,050.00",
    rating: "★★★★★ (5.0)",
    image: scarf,
  },
  {
    id: "clothing-4",
    name: "Little Black Dress - Linen",
    price: "Rs. 3,499.00",
    rating: "★★★★★ (5.0)",
    image: dress3,
  },
];

export const accessories = [
  {
    id: "acc-1",
    name: "Royal Trio Scrunchie Combo",
    price: "Rs. 550.00",
    image: scrunchie,
  },
  {
    id: "acc-2",
    name: "Orange Tassel Of Love",
    price: "Rs. 299.00",
    rating: "★★★★★ (5.0)",
    image: orangeTassel,
  },
  {
    id: "acc-3",
    name: "Peach Tassel Of Love",
    price: "Rs. 299.00",
    rating: "★★★★★ (5.0)",
    image: peachTassel,
  },
  {
    id: "acc-4",
    name: "Pink Tassel Of Love",
    price: "Rs. 299.00",
    rating: "★★★★★ (5.0)",
    image: pinkTassel,
  },
];

export default function CategoryShowcase() {
  const [activeTab, setActiveTab] = useState("diaries");
  const { user } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const data =
    activeTab === "diaries"
      ? diaries
      : activeTab === "clothing"
        ? clothing
        : accessories;

  return (
    <section className="container-main py-10">
      {/* Tabs */}
      <div className="flex justify-center gap-12 mb-10 text-[13px] tracking-[0.25em] uppercase">
        {["diaries", "clothing", "accessories"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${activeTab === tab
              ? "border-b border-black"
              : "text-gray-400"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 gap-10">
        {data.map((product) => (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
          >
            <div className="relative h-[420px] bg-[#f2f2f2] overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <button
                className={`absolute top-4 right-4 w-9 h-9 rounded-full shadow flex items-center justify-center transition-colors ${isInWishlist(product.id) ? 'bg-white text-red-500' : 'bg-white text-black'}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (!user) {
                    navigate("/login");
                    return;
                  }
                  toggleWishlist(product);
                }}
              >
                <Heart size={16} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
              </button>
            </div>

            <p className="mt-5 text-center text-[13px] tracking-wide uppercase">
              {product.name}
            </p>

            <p className="mt-1 text-center text-[13px] text-gray-600">
              {product.price}
            </p>

            {product.rating && (
              <p className="mt-1 text-center text-[12px]">
                {product.rating}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-14">
        <button className="bg-black text-white text-xs tracking-[0.3em] px-10 py-3 uppercase">
          View All
        </button>
      </div>
    </section>
  );
}
