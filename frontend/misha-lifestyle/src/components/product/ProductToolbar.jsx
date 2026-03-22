import { useContext } from "react";
import { FilterContext } from "../../context/FilterContext";

const ProductToolbar = ({
    viewMode,
    setViewMode,
    productCount
}) => {
    const { openFilter, setSortOption, sortOption } = useContext(FilterContext);
    return (
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-4 gap-4">

            {/* Left: View Toggles & Count */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                {/* View Toggles */}
                <div className="flex items-center gap-3">
                    {/* 2-Column Toggle */}
                    <button
                        onClick={() => setViewMode('grid-2')}
                        className={`text-xl hover:text-black transition-colors ${viewMode === 'grid-2' ? 'text-black' : 'text-gray-400'}`}
                        aria-label="2 Columns"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="rotate-90">
                            <path d="M3 3h8v8H3zm0 10h8v8H3zM13 3h8v8h-8zm0 10h8v8h-8z" />
                        </svg>
                    </button>

                    {/* 3-Column Toggle */}
                    <button
                        onClick={() => setViewMode('grid-3')}
                        className={`hidden md:block text-xl hover:text-black transition-colors ${viewMode === 'grid-3' ? 'text-black' : 'text-gray-400'}`}
                        aria-label="3 Columns"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <rect x="3" y="3" width="5" height="5" />
                            <rect x="9.5" y="3" width="5" height="5" />
                            <rect x="16" y="3" width="5" height="5" />

                            <rect x="3" y="9.5" width="5" height="5" />
                            <rect x="9.5" y="9.5" width="5" height="5" />
                            <rect x="16" y="9.5" width="5" height="5" />

                            <rect x="3" y="16" width="5" height="5" />
                            <rect x="9.5" y="16" width="5" height="5" />
                            <rect x="16" y="16" width="5" height="5" />
                        </svg>
                    </button>

                    {/* 4-Column Toggle */}
                    <button
                        onClick={() => setViewMode('grid-4')}
                        className={`hidden lg:block text-xl hover:text-black transition-colors ${viewMode === 'grid-4' ? 'text-black' : 'text-gray-400'}`}
                        aria-label="4 Columns"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h3v3H4zm4.3 0h3v3h-3zm4.3 0h3v3h-3zm4.4 0h3v3H17zm-13 4.3h3v3H4zm4.3 0h3v3h-3zm4.3 0h3v3h-3zm4.4 0h3v3H17zm-13 4.3h3v3H4zm4.3 0h3v3h-3zm4.3 0h3v3h-3zm4.4 0h3v3H17zm-13 4.4h3v3H4zm4.3 0h3v3h-3zm4.3 0h3v3h-3zm4.4 0h3v3H17z" />
                        </svg>
                    </button>
                </div>

                {/* Separator / Count */}
                <div className="h-4 w-px bg-gray-300 hidden md:block"></div>

                <span className="text-sm text-gray-500 font-medium hidden md:block">
                    {productCount} Products
                </span>
            </div>

            {/* Right: Sort & Filter */}
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">

                {/* Mobile Product Count */}
                <span className="text-sm text-gray-500 font-medium md:hidden">
                    {productCount} Items
                </span>

                <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="relative group cursor-pointer flex items-center gap-2 text-sm font-medium hover:text-gray-600">
                        <span className="uppercase tracking-wider">Sort By</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>

                        {/* Dropdown Menu (Hover) */}
                        <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10 w-40">
                            <div className="bg-white border border-gray-100 shadow-lg py-2 flex flex-col items-start text-black">
                                <button onClick={() => setSortOption('featured')} className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-xs uppercase tracking-wide ${sortOption==='featured'?'font-semibold':''}`}>Featured</button>
                                <button onClick={() => setSortOption('newest')} className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-xs uppercase tracking-wide ${sortOption==='newest'?'font-semibold':''}`}>Newest</button>
                                <button onClick={() => setSortOption('price-asc')} className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-xs uppercase tracking-wide ${sortOption==='price-asc'?'font-semibold':''}`}>Price: Low-High</button>
                                <button onClick={() => setSortOption('price-desc')} className={`w-full text-left px-4 py-2 hover:bg-gray-50 text-xs uppercase tracking-wide ${sortOption==='price-desc'?'font-semibold':''}`}>Price: High-Low</button>
                            </div>
                        </div>
                    </div>

                    {/* Filter Toggle */}
                    <button
                        onClick={openFilter}
                        className="flex items-center gap-2 text-sm font-medium hover:text-gray-600 uppercase tracking-wider"
                    >
                        <span>Filter</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>
                    </button>
                </div>
            </div>

        </div>
    );
};

export default ProductToolbar;
