import products from "../../data/products";
import ProductCard from "../ui/ProductCard";

const ProductCarousel = () => {
  return (
    <section className="container-main py-16">
      <h2 className="text-base font-medium mb-6">
        Best Sellers
      </h2>

      <div className="flex gap-5 overflow-x-auto">
        {products.map((product) => (
          <div key={product.id} className="min-w-[200px]">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCarousel;
