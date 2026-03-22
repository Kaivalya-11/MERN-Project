import instagram from "../../data/instagram";

const InstagramGrid = () => {
  return (
    <section className="py-20">
      <div className="container-main">
        <h2 className="text-base font-medium text-center mb-10">
          As Seen On Favorites
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {instagram.map((img, index) => (
            <div key={index} className="overflow-hidden">
              <img
                src={img}
                alt="Lifestyle"
                className="w-full aspect-square object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramGrid;
