import { createContext, useState } from "react";

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sortOption, setSortOption] = useState("featured");
  const [filters, setFilters] = useState({ availability: "all", minPrice: 0, maxPrice: Infinity, productType: "all" });

  const openFilter = () => setIsOpen(true);
  const closeFilter = () => setIsOpen(false);

  return (
    <FilterContext.Provider value={{ isOpen, openFilter, closeFilter, sortOption, setSortOption, filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
