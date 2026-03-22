const categories = [
  {
    label: "Everyday Bags",
    image: "/src/assets/images/cat-everyday.jpg",
  },
  {
    label: "Work Bags",
    image: "/src/assets/images/cat-work.jpg",
  },
  {
    label: "Travel Bags",
    image: "/src/assets/images/cat-travel.jpg",
  },
  {
    label: "Festive Bags",
    image: "/src/assets/images/cat-festive.jpg",
  },
  {
    label: "Kids",
    image: "/src/assets/images/cat-kids.jpg",
  },
  {
    label: "Gifting",
    image: "/src/assets/images/cat-gifting.jpg",
  },
];

const CategoryRail = () => {
  return (
    <section className="container-main pt-12 pb-2">
      <div className="grid grid-cols-6 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="text-center">
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-[260px] object-cover mb-3"
            />
            <p className="text-[11px] tracking-wide uppercase">
              {cat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryRail;
