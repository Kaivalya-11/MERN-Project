import { useState, useContext } from "react";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";
import "./TabbedProductSection.css";

/* 🔽 IMPORT YOUR IMAGES HERE 🔽 */
import bag1_1 from "../../assets/images/products/prod1.jpg";
import bag1_2 from "../../assets/images/products/prod1_alt.jpg";
import bag1_3 from "../../assets/images/products/prod1_alt2.jpg";
import bag1_4 from "../../assets/images/products/prod1_alt3.jpg";
import bag1_5 from "../../assets/images/products/prod1_alt4.jpg";

import bag2_1 from "../../assets/images/products/prod2.jpg";
import bag2_2 from "../../assets/images/products/prod2_alt.jpg";
import bag2_3 from "../../assets/images/products/prod2_alt2.jpg";
import bag2_4 from "../../assets/images/products/prod2_alt3.jpg";
import bag2_5 from "../../assets/images/products/prod2_alt4.jpg";

import bag3_1 from "../../assets/images/products/prod3.jpg";
import bag3_2 from "../../assets/images/products/prod3_alt.jpg";
import bag3_3 from "../../assets/images/products/prod3_alt2.jpg";
import bag3_4 from "../../assets/images/products/prod3_alt3.jpg";
import bag3_5 from "../../assets/images/products/prod3_alt4.jpg";

import bag4_1 from "../../assets/images/products/prod4.jpg";
import bag4_2 from "../../assets/images/products/prod4_alt.jpg";
import bag4_3 from "../../assets/images/products/prod4_alt2.jpg";
import bag4_4 from "../../assets/images/products/prod4_alt3.jpg";
import bag4_5 from "../../assets/images/products/prod4_alt4.jpg";

/* 🔽 PRODUCT DATA 🔽 */
export const PRODUCTS = {
  new: [
    {
      id: "tab-new-1",
      name: "Flora Bag - New Arrival",
      price: "Rs. 2,499.00",
      images: [bag1_1, bag1_2, bag1_3, bag1_4, bag1_5],
    },
    {
      id: "tab-new-2",
      name: "Flora Bag - Olive",
      price: "Rs. 2,299.00",
      images: [bag2_1, bag2_2, bag2_3, bag2_4, bag2_5],
    },
    {
      id: "tab-new-3",
      name: "Flora Bag - Midnight",
      price: "Rs. 2,499.00",
      images: [bag3_1, bag3_2, bag3_3, bag3_4, bag3_5],
    },
    {
      id: "tab-new-4",
      name: "Flora Bag - Classic",
      price: "Rs. 2,299.00",
      images: [bag4_1, bag4_2, bag4_3, bag4_4, bag4_5],
    },
    {
      id: "tab-new-5",
      name: "Flora Bag - Mustard",
      price: "Rs. 2,499.00",
      images: [bag3_1, bag3_2, bag3_3, bag3_4, bag3_5],
    },
    {
      id: "tab-new-6",
      name: "Flora Bag - Cream",
      price: "Rs. 2,299.00",
      images: [bag1_1, bag1_2, bag1_3, bag1_4, bag1_5],
    },
    {
      id: "tab-new-7",
      name: "Flora Bag - Slate",
      price: "Rs. 2,499.00",
      images: [bag4_1, bag4_2, bag4_3, bag4_4, bag4_5],
    },
    {
      id: "tab-new-8",
      name: "Flora Bag - Navy",
      price: "Rs. 2,299.00",
      images: [bag2_1, bag2_2, bag2_3, bag2_4, bag2_5],
    },
  ],
  box: [],
  tote: [],
};

const TabbedProductSection = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <section className="tabbed-products">
      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "new" ? "active" : ""}
          onClick={() => setActiveTab("new")}
        >
          NEW ARRIVALS
        </button>
        <button
          className={activeTab === "box" ? "active" : ""}
          onClick={() => setActiveTab("box")}
        >
          BOX BAGS
        </button>
        <button
          className={activeTab === "tote" ? "active" : ""}
          onClick={() => setActiveTab("tote")}
        >
          TOTE BAGS
        </button>
      </div>

      {/* Products */}
      <div className="products-grid">
        {PRODUCTS[activeTab].map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="view-all-wrapper">
        <button className="view-all">VIEW ALL</button>
      </div>
    </section>
  );
};

/* 🔽 PRODUCT CARD 🔽 */
const ProductCard = ({ product }) => {
  const [activeImage, setActiveImage] = useState(0);
  const { user } = useContext(AuthContext);
  const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  return (
    <div className="product-card group relative cursor-pointer" onClick={() => navigate(`/product/${product.id}`, { state: { product } })}>
      <div className="product-image relative">
        <img src={product.images[activeImage]} alt={product.name} />
        <button
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 shadow hover:bg-white z-20 ${isInWishlist(product.id) ? 'bg-white opacity-100 text-red-500' : 'bg-white/80 opacity-0 group-hover:opacity-100 text-black'}`}
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

      <div className="thumbnails">
        {product.images.slice(0, 4).map((img, index) => (
          <button
            key={index}
            className={`thumb ${activeImage === index ? "active" : ""
              }`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveImage(index);
            }}
          >
            <img src={img} alt="" />
          </button>
        ))}
      </div>

      <p className="price">{product.price}</p>
    </div>
  );
};

export default TabbedProductSection;
