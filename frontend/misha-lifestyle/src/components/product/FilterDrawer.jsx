import React, { useContext, useState, useEffect } from "react";
import { FilterContext } from "../../context/FilterContext";

const FilterDrawer = () => {
  const { isOpen, closeFilter, filters, setFilters } = useContext(FilterContext);
  const [local, setLocal] = useState(filters);

  useEffect(() => setLocal(filters), [filters]);

  const apply = () => {
    setFilters(local);
    closeFilter();
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white z-40 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} shadow-lg`}>
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h3 className="uppercase tracking-wider text-gray-600">Filters</h3>
          <button onClick={closeFilter} className="text-gray-400">✕</button>
        </div>

        <div className="flex-1 overflow-auto">
          <section className="mb-6">
            <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Availability</h4>
            <select className="w-full border p-3 text-sm" value={local.availability} onChange={(e) => setLocal({ ...local, availability: e.target.value })}>
              <option value="all">All</option>
              <option value="in-stock">In Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </section>

          <section className="mb-6">
            <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Price</h4>
            <div className="flex gap-2">
              <input type="number" className="w-1/2 border p-2" placeholder="Min" value={local.minPrice === 0 ? "" : local.minPrice} onChange={(e) => setLocal({ ...local, minPrice: Number(e.target.value) || 0 })} />
              <input type="number" className="w-1/2 border p-2" placeholder="Max" value={local.maxPrice === Infinity ? "" : local.maxPrice} onChange={(e) => setLocal({ ...local, maxPrice: Number(e.target.value) || Infinity })} />
            </div>
          </section>

          <section className="mb-6">
            <h4 className="text-xs text-gray-400 uppercase tracking-wider mb-3">Product Type</h4>
            <select className="w-full border p-3 text-sm" value={local.productType} onChange={(e) => setLocal({ ...local, productType: e.target.value })}>
              <option value="all">All</option>
              <option value="bag">Bag</option>
              <option value="sling">Sling</option>
              <option value="tote">Tote</option>
              <option value="accessory">Accessory</option>
              <option value="clothing">Clothing</option>
              <option value="kids">Kids</option>
            </select>
          </section>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-4">
            <button onClick={apply} className="flex-1 bg-gray-800 text-white py-3 uppercase tracking-wider">View Results</button>
            <button onClick={() => { setLocal(filters); closeFilter(); }} className="px-4 py-3 border">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
