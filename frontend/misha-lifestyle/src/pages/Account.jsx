import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiChevronDown, FiGlobe, FiInfo, FiEdit2 } from "react-icons/fi";
import { AuthContext } from "../context/AuthContext";

const Account = () => {
    const [activeTab, setActiveTab] = useState("orders");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders");
                if (response.ok) {
                    const data = await response.json();
                    // For the sake of the tutorial, we show all orders if there's no auth mapping,
                    // or filter if we had a proper user logic mapped to mobile.
                    setOrders(data);
                }
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        };
        fetchOrders();
    }, []);

    // Retrieve email from user context, fallback for safety
    const email = user?.email || "";

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSignOut = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col font-sans">
            {/* Header */}
            <header className="px-6 sm:px-12 py-6 flex items-center justify-between">
                <div className="flex items-center gap-10">
                    {/* Logo Mockup */}
                    <Link to="/" className="h-[64px] w-[64px] rounded-full border border-gray-400 border-dashed flex items-center justify-center relative bg-white">
                        <span className="font-serif italic text-xs tracking-widest text-black">maisha</span>
                        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-gray-400"></div>
                        <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center gap-6 mt-1">
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`text-[15px] pb-1 border-b-[1.5px] transition-colors ${activeTab === "orders" ? "text-gray-900 border-gray-900 font-medium" : "text-gray-500 border-transparent hover:text-gray-900"}`}
                        >
                            Orders
                        </button>
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`text-[15px] pb-1 border-b-[1.5px] transition-colors ${activeTab === "profile" ? "text-gray-900 border-gray-900 font-medium" : "text-gray-500 border-transparent hover:text-gray-900"}`}
                        >
                            Profile
                        </button>
                    </nav>
                </div>

                <div className="relative" ref={dropdownRef}>
                    <div
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="flex items-center gap-1.5 cursor-pointer text-gray-500 hover:text-black border border-gray-100 p-2 rounded-full shadow-sm hover:shadow transition-all"
                    >
                        <FiUser className="w-5 h-5 ml-1" />
                        <FiChevronDown className="w-4 h-4 mr-1" />
                    </div>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white border border-gray-100 rounded-[12px] shadow-[0_4px_24px_rgba(0,0,0,0.06)] z-50 overflow-hidden text-sm animate-in fade-in slide-in-from-top-2 duration-200 cursor-default p-2">
                            <div className="p-4 flex items-center gap-3 border-b border-gray-200/60 pb-5 mb-2 px-3">
                                <div className="p-1 rounded-full border border-gray-300">
                                    <FiUser className="w-6 h-6 text-gray-500" />
                                </div>
                                <span className="text-gray-600 truncate font-medium text-[15px]">{email}</span>
                            </div>
                            <div className="flex flex-col mb-1 text-black font-[450] text-[15px]">
                                <button className="text-left px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg mb-0.5" onClick={() => { setActiveTab("profile"); setIsDropdownOpen(false); }}>Profile</button>
                                <button className="text-left px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg mb-0.5" onClick={() => setIsDropdownOpen(false)}>Settings</button>
                                <button className="text-left px-4 py-3 hover:bg-gray-50 transition-colors rounded-lg mb-0.5" onClick={handleSignOut}>Sign out</button>
                            </div>
                        </div>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 max-w-[1000px] w-full mx-auto px-6 py-12">
                {activeTab === "orders" && (
                    <div className="animate-in fade-in duration-300">
                        <h1 className="text-[22px] font-bold text-gray-900 mb-8 tracking-tight">Orders</h1>

                        {orders.length === 0 ? (
                            <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] py-24 flex flex-col items-center justify-center text-center">
                                <h3 className="text-[17px] font-semibold text-gray-900 mb-3">No orders yet</h3>
                                <p className="text-[14px] text-gray-500">Go to store to place an order.</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {orders.map(order => (
                                    <div key={order._id} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row justify-between gap-4">
                                        <div>
                                            <div className="text-xs text-gray-500 mb-1 font-mono">Order #{order._id.substring(order._id.length - 8).toUpperCase()}</div>
                                            <div className="font-black text-gray-900 mb-1 text-lg">Total: ₹{(order.totalAmount || 0).toLocaleString('en-IN')}</div>
                                            <div className="text-[13px] text-gray-500 mb-3 uppercase tracking-wider font-bold">Paid via {order.paymentMethod}</div>
                                            <div className="text-sm text-gray-800">
                                                {order.items && order.items.length > 0 ? (
                                                    <ul className="list-disc pl-4 space-y-1 mt-1">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx}>
                                                                <span className="font-semibold">{item.name}</span> <span className="text-gray-400">x{item.qty}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                ) : <span className="text-gray-400 italic">No item details</span>}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end justify-start">
                                            <span className={`px-3 py-1.5 text-xs font-bold uppercase rounded-md flex items-center gap-1.5 shadow-sm border ${order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                                                order.status === 'Delivering' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                                    'bg-orange-50 border-orange-200 text-orange-700'
                                                }`}>
                                                <div className={`w-2 h-2 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' :
                                                    order.status === 'Delivering' ? 'bg-blue-500' :
                                                        'bg-orange-500'
                                                    }`}></div>
                                                {order.status || 'Pending'}
                                            </span>
                                            {order.status === 'Delivered' && (
                                                <div className="mt-4 text-xs font-semibold text-gray-400">
                                                    Delivered successfully
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "profile" && (
                    <div className="animate-in fade-in duration-300">
                        <h1 className="text-[22px] font-bold text-gray-900 mb-8 tracking-tight">Profile</h1>

                        {/* Profile Info Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-8 mb-8">
                            <div className="mb-7">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-[14px] text-gray-500">Name</span>
                                    <button className="text-gray-600 hover:text-black transition-colors"><FiEdit2 className="w-3.5 h-3.5" /></button>
                                </div>
                                <div className="text-[15px] text-gray-900 h-6"></div> {/* Empty space for name */}
                            </div>

                            <div>
                                <div className="text-[14px] text-gray-500 mb-1">Email</div>
                                <div className="text-[15px] text-gray-900 font-medium tracking-wide">{email}</div>
                            </div>
                        </div>

                        {/* Addresses Card */}
                        <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] p-8">
                            <div className="flex items-center gap-4 mb-6">
                                <h3 className="text-[16px] font-bold text-gray-900">
                                    Addresses
                                </h3>
                                <button className="text-[14px] font-bold text-gray-900 hover:text-gray-600 flex items-center gap-1">
                                    + Add
                                </button>
                            </div>

                            <div className="bg-[#f5f5f5] rounded-xl p-5 flex items-center gap-3 text-[14px] text-gray-600">
                                <FiInfo className="w-4 h-4 text-gray-500 shrink-0" />
                                No addresses added
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="px-6 sm:px-12 py-8 flex items-center gap-5 text-[13px] text-zinc-600 font-medium mt-auto border-t border-gray-50">
                <button className="flex items-center gap-1 text-black hover:opacity-80 transition-opacity font-semibold">
                    <FiGlobe className="w-[18px] h-[18px]" strokeWidth={1.5} />
                    <span className="ml-0.5">India</span>
                    <FiChevronDown className="w-3.5 h-3.5" />
                </button>
                <div className="flex items-center gap-5 ml-2">
                    <a href="#" className="hover:text-black transition-colors">Refund policy</a>
                    <a href="#" className="hover:text-black transition-colors">Shipping</a>
                    <a href="#" className="hover:text-black transition-colors">Privacy policy</a>
                    <a href="#" className="hover:text-black transition-colors">Terms of service</a>
                </div>
            </footer>
        </div>
    );
};

export default Account;
