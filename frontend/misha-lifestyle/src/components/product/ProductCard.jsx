import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { WishlistContext } from "../../context/WishlistContext";

const ProductCard = ({ product, showThumbnails = false }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Check for product.images array or single product.image string
    const firstImage = product.images?.[0] || product.image || "https://placehold.co/600x800/e2e2e2/666666?text=Product";
    const [currentImage, setCurrentImage] = useState(firstImage);

    const { user } = useContext(AuthContext);
    const { toggleWishlist, isInWishlist } = useContext(WishlistContext);
    const navigate = useNavigate();

    // Fallback image if product.image is missing or placeholder
    const mainImage = currentImage;
    const hoverImage = product.images?.[1] || product.image || mainImage; // Use 2nd image or same if not available

    const isWished = isInWishlist(product.id);

    const handleWishlistClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!user) {
            navigate("/login");
            return;
        }
        toggleWishlist(product);
    };

    return (
        <div
            className="group relative flex flex-col"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Container */}
            <Link to={`/product/${product.id}`} state={{ product }} className="relative overflow-hidden aspect-[3/4] bg-gray-100">
                {/* Main Image */}
                <motion.img
                    key={mainImage} // Key change triggers animation
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    src={mainImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                />

                {/* Hover Image (Absolute to stack) - Only show if NOT showing thumbnails logic, or keep standard hover behavior? 
                    If showThumbnails is true, maybe we disable the standard "flip" on hover so user can see the specific thumbnail they hovered?
                    Let's keep it simple: If showThumbnails is FALSE, do standard flip. If TRUE, disable flip to avoid conflict with thumbnail hover.
                */}
                {!showThumbnails && product.images?.[1] && (
                    <motion.img
                        src={hoverImage}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                        style={{ opacity: isHovered ? 1 : 0 }}
                    />
                )}

                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-2 left-2 bg-white/90 text-[10px] font-bold px-2 py-1 uppercase tracking-wider">
                        {product.badge}
                    </div>
                )}

                {/* Wishlist Button */}
                <button
                    onClick={handleWishlistClick}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 hover:bg-white z-20 ${isWished ? 'bg-white opacity-100 text-red-500' : 'bg-white/80 opacity-0 group-hover:opacity-100 text-black'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill={isWished ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </button>

                {/* Quick Add Button (Bottom slide up) */}
                <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                    <button className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors shadow-lg">
                        Quick Add
                    </button>
                </div>
            </Link>

            {/* Product Info */}
            <div className="mt-3 text-center">
                <h3 className="text-sm text-gray-800 font-medium line-clamp-1">
                    <Link to={`/product/${product.id}`} state={{ product }}>{product.name}</Link>
                </h3>
                <p className="text-sm text-gray-500 mt-1">{product.price}</p>

                {/* Thumbnails (If enabled) */}
                {showThumbnails && product.images && product.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3 opacity-100 transition-opacity duration-300">
                        {product.images.slice(0, 4).map((img, i) => (
                            <div
                                key={i}
                                className={`w-10 h-10 border cursor-pointer overflow-hidden ${currentImage === img ? 'border-black' : 'border-transparent hover:border-gray-300'}`}
                                onMouseEnter={() => setCurrentImage(img)}
                                onClick={() => setCurrentImage(img)}
                            >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Color Dots (If thumbnails disabled) */}
                {!showThumbnails && (
                    <div className="flex justify-center gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-full border border-gray-300 ${i === 0 ? 'bg-amber-700' : i === 1 ? 'bg-black' : 'bg-gray-400'}`}></div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
