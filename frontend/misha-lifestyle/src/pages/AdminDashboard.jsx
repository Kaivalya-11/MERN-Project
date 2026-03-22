import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiShoppingBag, FiDollarSign, FiUsers, FiActivity, FiSearch, FiRefreshCcw } from "react-icons/fi";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchOrders = async () => {
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/orders");
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const totalRevenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
    const totalCOD = orders.filter(o => o.paymentMethod === 'COD').length;

    const filteredOrders = orders.filter(order =>
        (order._id && order._id.includes(searchTerm)) ||
        (order.userPhone && order.userPhone.includes(searchTerm))
    );

    const updateOrderStatus = async (id, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/orders/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen flex flex-col font-sans">
            <TopBar />

            <div className="flex-grow pt-28 pb-16 px-4 md:px-8 max-w-7xl mx-auto w-full">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Dashboard Overview</h1>
                        <p className="text-sm text-gray-500 mt-1">Real-time metrics and recent transactions</p>
                    </div>
                    <button
                        onClick={fetchOrders}
                        className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors"
                    >
                        <FiRefreshCcw className={isLoading ? "animate-spin" : ""} /> Refresh Data
                    </button>
                </div>

                {/* Metrics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                        { title: "Total Revenue", value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: <FiDollarSign size={24} className="text-blue-600" />, bg: "bg-blue-100" },
                        { title: "Total Orders", value: orders.length, icon: <FiShoppingBag size={24} className="text-green-600" />, bg: "bg-green-100" },
                        { title: "COD Payments", value: totalCOD, icon: <FiUsers size={24} className="text-orange-600" />, bg: "bg-orange-100" },
                        { title: "Live Viewers", value: Math.floor(Math.random() * 40) + 12, icon: <FiActivity size={24} className="text-purple-600" />, bg: "bg-purple-100" }
                    ].map((metric, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-5 hover:shadow-md transition-shadow"
                        >
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${metric.bg} shrink-0`}>
                                {metric.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">{metric.title}</p>
                                <h3 className="text-2xl font-black text-gray-900">{metric.value}</h3>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Orders Table */}
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                        <div className="relative w-full sm:w-64">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by ID or Phone..."
                                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-black"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] uppercase tracking-wider text-gray-500 font-bold">
                                    <th className="px-6 py-4">Order ID</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Customer Phone</th>
                                    <th className="px-6 py-4">Payment Method</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            <div className="flex justify-center flex-col items-center">
                                                <FiRefreshCcw className="animate-spin text-gray-400 mb-2" size={24} />
                                                <p>Loading database records...</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No orders found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredOrders.map((order, idx) => (
                                        <motion.tr
                                            key={order._id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: idx * 0.05 }}
                                            className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-gray-600">{order._id.substring(order._id.length - 8).toUpperCase()}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.userPhone}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-md tracking-wider ${order.paymentMethod === 'COD' ? 'bg-orange-100 text-orange-800' :
                                                    order.paymentMethod === 'Card' ? 'bg-blue-100 text-blue-800' :
                                                        order.paymentMethod === 'UPI' ? 'bg-purple-100 text-purple-800' :
                                                            'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {order.paymentMethod}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1.5 text-sm font-medium">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-500' : order.status === 'Delivering' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                                    <select
                                                        value={order.status || 'Pending'}
                                                        onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                                                        className={`bg-transparent outline-none cursor-pointer font-bold ${order.status === 'Delivered' ? 'text-green-600' : order.status === 'Delivering' ? 'text-blue-600' : 'text-orange-600'}`}
                                                    >
                                                        <option value="Pending" className="text-black">Pending</option>
                                                        <option value="Delivering" className="text-black">Delivering</option>
                                                        <option value="Delivered" className="text-black">Delivered</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                                                ₹{(order.totalAmount || 0).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminDashboard;
