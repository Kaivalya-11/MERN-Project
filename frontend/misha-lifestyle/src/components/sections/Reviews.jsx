import reviews from "../../data/reviews";

const Reviews = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container-main">
        <h2 className="text-base font-medium text-center mb-8">
          What Our Customers Say
        </h2>

        <div className="flex gap-4 overflow-x-auto">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="min-w-[240px] bg-white p-4 border"
            >
              <p className="text-sm text-neutral-600 leading-relaxed mb-3">
                “{review.text}”
              </p>
              <p className="text-xs font-medium text-neutral-800">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
