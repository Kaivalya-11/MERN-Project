import { Link } from "react-router-dom";
import {
  FiSearch,
  FiHeart,
  FiUser,
  FiShoppingBag,
} from "react-icons/fi";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { FiX } from "react-icons/fi";
import merchProducts from "../../data/merchProducts";
import { PRODUCTS as tabbedProducts } from "../commerce/TabbedProductSection";
import { diaries, clothing as showcaseClothing, accessories } from "../commerce/CategoryShowcase";
import { products as bestsellersProducts } from "../../pages/Bestsellers";
import { products as newArrivalsProducts } from "../../pages/NewArrivals";
import { products as shopCategoryProducts } from "../../pages/ShopCategory";
import { products as clothingProducts } from "../../pages/Clothing";
import { products as handbagsProducts } from "../../pages/HandbagsTotes";
import { products as jewelleryProducts } from "../../pages/JewelleryBox";
import { products as kidsProducts } from "../../pages/KidsCollection";

// Create a single master catalog for search
const allSiteProducts = [
  ...merchProducts.map((p, i) => ({ ...p, id: `merch-${i}` })),
  ...(tabbedProducts?.new || []),
  ...diaries,
  ...showcaseClothing,
  ...accessories,
  ...bestsellersProducts.map(p => ({ ...p, id: `bs-${p.id}` })),
  ...newArrivalsProducts.map(p => ({ ...p, id: `na-${p.id}` })),
  ...shopCategoryProducts.map(p => ({ ...p, id: `sc-${p.id}` })),
  ...clothingProducts.map(p => ({ ...p, id: `cl-${p.id}` })),
  ...handbagsProducts.map(p => ({ ...p, id: `hb-${p.id}` })),
  ...jewelleryProducts.map(p => ({ ...p, id: `jb-${p.id}` })),
  ...kidsProducts.map(p => ({ ...p, id: `ki-${p.id}` }))
];

const Header = () => {
  const { user } = useContext(AuthContext);
  const { cart, setIsCartOpen } = useCart();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim().length > 0) {
      const results = allSiteProducts.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const totalCartItems = cart.reduce((total, item) => total + item.qty, 0);

  return (
    <header className="border-b border-neutral-200">
      <div className="container-main flex items-center justify-between py-10">

        {/* Logo */}
        <Link
          to="/"
          className="text-4xl tracking-tight text-neutral-800 lowercase"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          maisha
        </Link>

        {/* Navigation */}
        <nav className="flex gap-10 text-xs tracking-widest uppercase">
          <Link to="/bestsellers" className="hover:text-neutral-600">
            Best Sellers
          </Link>
          <Link to="/new-arrivals" className="hover:text-neutral-600">
            New Arrivals
          </Link>
          <div className="group relative h-full flex items-center">
            <Link to="/shop-category" className="hover:text-neutral-600 h-full flex items-center">
              Shop By Category
            </Link>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-0 w-64 bg-white border border-gray-100 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 transform translate-y-2 group-hover:translate-y-0">
              <ul className="py-4 text-sm text-gray-600 normal-case tracking-wide font-normal flex flex-col gap-1">
                {[
                  { name: "Handbags & Totes", path: "/handbags-totes" },
                  { name: "Cross Body Bags", path: "#" },
                  { name: "Box Bags", path: "#" },
                  { name: "Pouches", path: "#" },
                  { name: "Three Pocket Bags", path: "#" },
                  { name: "Duffle Bags", path: "#" },
                  { name: "Kids Collection", path: "/kids-collection" },
                  { name: "Festive Collection", path: "#" },
                  { name: "Jewellery Box", path: "/jewellery-box" },
                  { name: "Diaries", path: "#" },
                  { name: "Backpacks", path: "#" },
                  { name: "Wallets and Passport Covers", path: "#" },
                  { name: "Laptop Bags", path: "#" }
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="block px-6 py-2 hover:bg-gray-50 hover:text-black transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Link to="/watch-and-shop" className="hover:text-neutral-600">
            Watch & Shop
          </Link>
          <Link to="/clothing" className="hover:text-neutral-600">
            Clothing
          </Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-7 text-[20px] text-neutral-800">

          {/* Profile */}
          <Link
            to={user ? "/account" : "/login"}
            aria-label="Account"
            className="hover:text-neutral-500 transition-colors"
          >
            <FiUser strokeWidth={1.5} />
          </Link>

          {/* Search */}
          <button
            aria-label="Search"
            className="hover:text-neutral-500 transition-colors"
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (isSearchOpen) {
                setSearchQuery("");
                setSearchResults([]);
              }
            }}
          >
            <FiSearch strokeWidth={1.5} />
          </button>

          {/* Wishlist */}
          <Link
            to={user ? "/wishlist" : "/login"}
            aria-label="Wishlist"
            className="hover:text-neutral-500 transition-colors"
          >
            <FiHeart strokeWidth={1.5} />
          </Link>

          {/* Cart */}
          <button
            aria-label="Cart"
            className="hover:text-neutral-500 transition-colors relative group"
            onClick={() => setIsCartOpen(true)}
          >
            <FiShoppingBag strokeWidth={1.5} />
            {totalCartItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center transform group-hover:-translate-y-0.5 transition-transform duration-300">
                {totalCartItems}
              </span>
            )}
          </button>

        </div>
      </div>

      {/* Expandable Search Bar */}
      {isSearchOpen && (
        <div className="border-t border-neutral-100 bg-white relative z-40">
          <div className="container-main flex items-center py-5">
            <FiSearch className="text-gray-400 mr-4 text-xl" />
            <input
              type="text"
              placeholder="SEARCH TOTES..."
              className="flex-grow text-[13px] tracking-widest uppercase outline-none bg-transparent placeholder:text-gray-400"
              autoFocus
              value={searchQuery}
              onChange={handleSearch}
            />
            <button
              onClick={() => {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
              }}
              className="text-gray-400 hover:text-black transition-colors"
            >
              <FiX className="text-2xl" strokeWidth={1} />
            </button>
          </div>

          {/* Search Results Dropdown */}
          {searchQuery.trim().length > 0 && (
            <div className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl max-h-[60vh] overflow-y-auto">
              {searchResults.length > 0 ? (
                <div className="container-main py-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {searchResults.map((product) => (
                    <Link
                      to={`/product/${product.id}`}
                      state={{ product }}
                      key={product.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                        setSearchResults([]);
                      }}
                      className="group flex flex-col cursor-pointer"
                    >
                      <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-3 relative">
                        <img src={product.images?.[0] || product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-900 group-hover:text-gray-600 line-clamp-1">{product.name}</h3>
                      <p className="text-[12px] text-gray-500 mt-1">{product.price}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="container-main py-12 text-center text-gray-500 text-[12px] tracking-widest uppercase">
                  No products found matching "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
