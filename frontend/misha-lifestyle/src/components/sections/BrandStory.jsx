const BrandStory = () => {
  return (
    <section className="py-24">
      <div className="container-narrow text-center">
        <h2 className="text-lg font-medium mb-6">
          A minimal lifestyle accessory brand
        </h2>

        <p className="text-sm text-neutral-600 leading-relaxed mb-10">
          Maisha is built around thoughtfully designed lifestyle essentials.
          Every piece is created with a balance of form and function, made
          to blend effortlessly into everyday routines while maintaining
          a timeless aesthetic.
        </p>

        <div className="flex justify-center gap-4">
          <button className="text-sm border border-neutral-900 px-6 py-2 hover:bg-neutral-900 hover:text-white transition">
            Know More
          </button>
          <button className="text-sm bg-neutral-900 text-white px-6 py-2 hover:opacity-90 transition">
            Shop Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
