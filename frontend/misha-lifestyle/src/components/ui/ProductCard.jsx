import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="cursor-pointer"
    >
      <div className="w-full aspect-[3/4] overflow-hidden mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-sm">
        <p className="text-neutral-800 leading-snug">
          {product.name}
        </p>
        <p className="text-neutral-900 font-medium mt-1">
          {product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
