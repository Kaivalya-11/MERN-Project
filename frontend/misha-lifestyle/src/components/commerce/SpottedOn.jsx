const spottedImages = [
  { src: "/spotted/sara.jpg", name: "Sara Ali Khan" },
  { src: "/spotted/shraddha.jpg", name: "Shraddha Kapoor" },
  { src: "/spotted/fatima.jpg", name: "Fatima Sana Shaikh" },
  { src: "/spotted/urmi.jpg", name: "Urmi Daga" },
  { src: "/spotted/esha.jpg", name: "Esha Kansara" },
  { src: "/spotted/soha.jpg", name: "Soha Ali Khan" },
  { src: "/spotted/roopal.jpg", name: "Roopal Shah" },
  { src: "/spotted/surbhi.jpg", name: "Surbhi Chandna" },
  { src: "/spotted/sukhmani.jpg", name: "Sukhmani Gambhir" },
  { src: "/spotted/rajvee.jpg", name: "Rajvee Gandhi" },
];

const SpottedOn = () => {
  return (
    <section className="py-24">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-sm tracking-[0.35em] uppercase">
          Spotted on your favourites
        </h2>
        <p className="text-sm text-gray-500 mt-2">
          Use <span className="underline">#maishabyesha</span> on Instagram
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-0">
        {spottedImages.map((item, index) => (
          <div key={index} className="relative group">
            <img
              src={item.src}
              alt={item.name}
              className="w-full h-[420px] object-cover"
            />

            {/* Name overlay */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 text-xs tracking-wide opacity-0 group-hover:opacity-100 transition">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SpottedOn;
