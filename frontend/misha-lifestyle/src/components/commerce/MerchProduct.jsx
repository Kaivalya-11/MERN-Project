import { useState } from "react";

const MerchProduct = ({ product }) => {
  const [active, setActive] = useState(0);

  return (
    <div>

      {/* Image */}
      <div className="relative mb-2">
        <img
          src={product.images[active]}
          alt={product.name}
          className="w-full h-[320px] object-cover"
        />

        {product.badge && (
          <span className="absolute top-2 left-2 text-[10px] bg-black text-white px-2 py-[2px]">
            {product.badge}
          </span>
        )}
      </div>

      {/* Thumbnails */}
      {product.images.length > 1 && (
        <div className="flex gap-1 mb-1">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onMouseEnter={() => setActive(i)}
              className={`w-8 h-8 object-cover cursor-pointer ${
                active === i ? "ring-1 ring-black" : "opacity-60"
              }`}
              alt=""
            />
          ))}
        </div>
      )}

      {/* Text */}
      <p className="text-[13px] leading-tight">{product.name}</p>
      <p className="text-[13px]">{product.price}</p>
    </div>
  );
};

export default MerchProduct;
