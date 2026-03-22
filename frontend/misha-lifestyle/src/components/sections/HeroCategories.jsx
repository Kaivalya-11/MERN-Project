import categories from "../../data/categories";

const HeroCategories = () => {
  return (
    <section className="border-b">
      <div className="container-main py-5">
        <div className="flex gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[72px] cursor-pointer"
            >
              <div className="w-[64px] h-[64px] rounded-full overflow-hidden mb-2">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs text-neutral-700 text-center leading-tight">
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroCategories;
