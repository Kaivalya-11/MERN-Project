import { useContext, useMemo } from "react";
import { FilterContext } from "../context/FilterContext";

const parsePrice = (p) => {
  if (typeof p === "number") return p;
  if (!p) return 0;
  const n = String(p).replace(/[^0-9.]/g, "");
  return Number(n) || 0;
};

export default function useFilterSort(items) {
  const { sortOption, filters } = useContext(FilterContext);

  return useMemo(() => {
    if (!items) return [];

    let out = [...items];

    // Apply productType filter (if product.productType exists)
    if (filters.productType && filters.productType !== "all") {
      out = out.filter((p) => (p.productType || "").toLowerCase().includes(filters.productType));
    }

    // Price filter
    out = out.filter((p) => {
      const price = p.priceValue != null ? p.priceValue : parsePrice(p.price);
      const min = filters.minPrice || 0;
      const max = filters.maxPrice === Infinity ? Number.MAX_SAFE_INTEGER : filters.maxPrice;
      return price >= min && price <= max;
    });

    // Availability - if items have 'inStock' flag
    if (filters.availability === "in-stock") {
      out = out.filter((p) => p.inStock !== false);
    } else if (filters.availability === "out-of-stock") {
      out = out.filter((p) => p.inStock === false);
    }

    // Sorting
    switch (sortOption) {
      case "newest":
        out.sort((a, b) => (a.badge === "New" ? -1 : 1) - (b.badge === "New" ? -1 : 1));
        break;
      case "price-asc":
        out.sort((a, b) => (a.priceValue ?? parsePrice(a.price)) - (b.priceValue ?? parsePrice(b.price)));
        break;
      case "price-desc":
        out.sort((a, b) => (b.priceValue ?? parsePrice(b.price)) - (a.priceValue ?? parsePrice(a.price)));
        break;
      default:
        // featured or unknown: keep original order
        break;
    }

    return out;
  }, [items, sortOption, filters]);
}
