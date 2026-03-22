import p1 from "../assets/images/products/prod1.jpg";
import p1_a1 from "../assets/images/products/prod1_alt.jpg";
import p1_a2 from "../assets/images/products/prod1_alt2.jpg";
import p1_a3 from "../assets/images/products/prod1_alt3.jpg";
import p1_a4 from "../assets/images/products/prod1_alt4.jpg";

import p2 from "../assets/images/products/prod2.jpg";
import p2_a1 from "../assets/images/products/prod2_alt.jpg";
import p2_a2 from "../assets/images/products/prod2_alt2.jpg";
import p2_a3 from "../assets/images/products/prod2_alt3.jpg";
import p2_a4 from "../assets/images/products/prod2_alt4.jpg";

import p3 from "../assets/images/products/prod3.jpg";
import p3_a1 from "../assets/images/products/prod3_alt.jpg";
import p3_a2 from "../assets/images/products/prod3_alt2.jpg";
import p3_a3 from "../assets/images/products/prod3_alt3.jpg";
import p3_a4 from "../assets/images/products/prod3_alt4.jpg";

import p4 from "../assets/images/products/prod4.jpg";
import p4_a1 from "../assets/images/products/prod4_alt.jpg";
import p4_a2 from "../assets/images/products/prod4_alt2.jpg";
import p4_a3 from "../assets/images/products/prod4_alt3.jpg";
import p4_a4 from "../assets/images/products/prod4_alt4.jpg";

const merchProducts = [
  {
    name: "Ikat Ember Box Bag (Large)",
    price: "₹2,499",
    badge: "Bestseller",
    images: [p1, p1_a1, p1_a2, p1_a3, p1_a4],
  },
  {
    name: "Ikat Ember Box Bag (Medium)",
    price: "₹2,299",
    images: [p2, p2_a1, p2_a2, p2_a3, p2_a4],
  },
  {
    name: "Pink Mogra Box Bag (Medium)",
    price: "₹2,299",
    badge: "New",
    images: [p3, p3_a1, p3_a2, p3_a3, p3_a4],
  },
  {
    name: "Blossom Pop Backpack",
    price: "₹2,349",
    images: [p4, p4_a1, p4_a2, p4_a3, p4_a4],
  },
  {
    name: "White Forest Box Bag (Large)",
    price: "₹2,499",
    images: [p1, p1_a1, p1_a2, p1_a3, p1_a4], // Reusing 1
  },
  {
    name: "Golden Bloom Box Bag (Large)",
    price: "₹2,499",
    images: [p2, p2_a1, p2_a2, p2_a3, p2_a4], // Reusing 2
  },
  {
    name: "Sahara Grid Box Bag (Large)",
    price: "₹2,499",
    images: [p3, p3_a1, p3_a2, p3_a3, p3_a4], // Reusing 3
  },
  {
    name: "Sahara Grid Box Bag (Medium)",
    price: "₹2,299",
    images: [p4, p4_a1, p4_a2, p4_a3, p4_a4], // Reusing 4
  },
];

export default merchProducts;
