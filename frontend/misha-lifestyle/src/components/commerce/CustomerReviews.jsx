import "./CustomerReviews.css";

const reviews = [
  {
    image: "/images/reviews/review-1.jpg",
    name: "Saajana",
    title: "Loved it!",
    text: "Beautifully designed, perfect size, and easy to carry."
  },
  {
    image: "/images/reviews/review-2.jpg",
    name: "Swetha Subramanian",
    title: "Value for money",
    text: "Spacious, sturdy and amazing quality."
  },
  {
    image: "/images/reviews/review-3.jpg",
    name: "Anika Sharma",
    title: "Very useful",
    text: "Perfect bag for travel and daily use."
  },
  {
    image: "/images/reviews/review-4.jpg",
    name: "Anika Sharma",
    title: "Perfect gift",
    text: "Bought this for my mother. She loved it."
  },
  {
    image: "/images/reviews/review-5.jpg",
    name: "Soha Ali Khan",
    title: "Elegant",
    text: "Stylish and beautifully handcrafted."
  },
  {
    image: "/images/reviews/review-6.jpg",
    name: "Roopal Shah",
    title: "Amazing finish",
    text: "Premium feel and lovely detailing."
  },
  {
    image: "/images/reviews/review-7.jpg",
    name: "Surbhi Chandna",
    title: "Love the texture",
    text: "Soft fabric and great craftsmanship."
  },
  {
    image: "/images/reviews/review-8.jpg",
    name: "Sukhmani Gambhir",
    title: "Highly recommended",
    text: "Exactly what I was looking for."
  }
];

const CustomerReviews = () => {
  return (
    <section className="customer-reviews">
      <h2>WHAT OUR CUSTOMERS SAY</h2>
      <p className="subtitle">from 2164 reviews</p>

      <div className="reviews-grid">
        {reviews.map((review, index) => (
          <div className="review-card" key={index}>
            <img
              src={review.image}
              alt={review.name}
              className="review-image"
              loading="lazy"
            />

            <div className="review-stars">★★★★★</div>
            <p className="review-name">{review.name}</p>
            <p className="review-title">{review.title}</p>
            <p className="review-text">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CustomerReviews;
