import categories from "../../data/categories";

const CategoryGrid = () => {
  return (
    <section className="container-main py-12">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="relative overflow-hidden cursor-pointer"
          >
            <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-[220px] object-cover transition-opacity duration-300 hover:opacity-90"
            />


            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <span className="text-white text-sm font-medium tracking-wide">
                {cat.title}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
