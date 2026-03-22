import { Link } from "react-router-dom";

const BrandStory = () => {
  return (
    <section className="container-main py-28">
      <div className="grid grid-cols-2 gap-20 items-center">

        {/* Left Content */}
        <div>
          <p className="text-xs tracking-widest uppercase mb-6 text-neutral-500">
            A minimal lifestyle accessory brand
          </p>

          <h2 className="text-3xl tracking-wide mb-8">
            MAISHA BY ESHA
          </h2>

          <div className="space-y-6 text-sm leading-relaxed text-neutral-700">
            <p>
              We started our label with a clear vision: to go beyond fleeting
              trends and create timeless pieces designed to be cherished for
              seasons to come. Maisha is a lifestyle accessory brand based in
              Ahmedabad, India.
            </p>

            <p>
              Our products are handcrafted and handmade by local artisans from
              the finest weaves of cotton and jute. The products are designed
              keeping in mind the aesthetics and versatility that lies in
              cottons & jute and the fine woven textures we’ve inherited. We use
              minimal vegan leather instead of animal leather.
            </p>

            <p>
              Our journey involved events like exhibitions & pop-ups around the
              country. Exhibitions in cities like Ahmedabad, Mumbai, Delhi,
              Surat, Baroda, Kolkata, Rajkot, etc. with a total of approximately
              250,000 footfall has been a place where we meet people from all
              around and interact with customers on a one-on-one basis.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex gap-6 mt-12">
            <Link to="/about" className="border border-black px-8 py-3 text-xs tracking-widest hover:bg-neutral-50 transition-colors">
              KNOW MORE
            </Link>
            <Link to="/bestsellers" className="bg-black text-white px-8 py-3 text-xs tracking-widest hover:bg-neutral-800 transition-colors">
              SHOP NOW
            </Link>
          </div>
        </div>

        {/* Right GIF */}
        <div className="w-full h-[460px] overflow-hidden">
          <img
            src="/gifs/brand-story.gif"
            alt="Craftsmanship at Maisha"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default BrandStory;
