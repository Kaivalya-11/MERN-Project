import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import CheckoutModal from "./CheckoutModal";

const CartDrawer = () => {
    const { cart, removeFromCart, updateQty, isCartOpen, setIsCartOpen } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isCartOpen]);

    // Extract numeric price and calculate total
    const cartTotal = cart.reduce((total, item) => {
        const rawPrice = Number((item.price || "2499").replace(/[^0-9.-]+/g, ""));
        return total + (item.qty * (rawPrice || 2499));
    }, 0);

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/40 z-[998] transition-opacity duration-300 ${isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-[999] shadow-2xl flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <span className="text-[14px] tracking-[0.2em] font-medium text-gray-800 uppercase">CART</span>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="text-gray-400 hover:text-black transition-colors"
                    >
                        <FiX size={24} strokeWidth={1} />
                    </button>
                </div>

                {/* Cart Contents */}
                <div className="flex-grow flex flex-col overflow-y-auto">
                    {cart.length === 0 ? (
                        <div className="flex-grow flex items-center justify-center">
                            <span className="text-[12px] tracking-[0.15em] text-gray-500 uppercase">YOUR CART IS EMPTY</span>
                        </div>
                    ) : (
                        <div className="p-6 flex flex-col gap-8">
                            {cart.map((item) => {
                                const imgSource = item.image || (item.images && item.images[0]) || "https://placehold.co/100x100";
                                return (
                                    <div key={item.id} className="flex gap-5">
                                        <div className="w-[100px] h-[130px] rounded-sm bg-gray-50 overflow-hidden flex-shrink-0">
                                            <img src={imgSource} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex flex-col flex-grow justify-between py-1">
                                            <div>
                                                <h4 className="text-[12px] font-medium uppercase tracking-wide text-gray-900 mb-2 leading-relaxed">{item.name}</h4>
                                                <p className="text-[13px] text-gray-500">{item.price}</p>
                                            </div>

                                            <div className="flex justify-between items-center mt-3">
                                                <div className="flex items-center border border-gray-200 rounded-sm">
                                                    <button
                                                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                                                        className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                                                    >
                                                        <FiMinus size={12} />
                                                    </button>
                                                    <span className="px-4 text-[13px] text-gray-800 font-medium">{item.qty}</span>
                                                    <button
                                                        onClick={() => updateQty(item.id, item.qty + 1)}
                                                        className="px-3 py-1.5 text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                                                    >
                                                        <FiPlus size={12} />
                                                    </button>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors p-2"
                                                >
                                                    <FiTrash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer / Checkout */}
                {cart.length > 0 && (
                    <div className="border-t border-gray-100 p-6 bg-white shrink-0">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-[12px] font-bold tracking-[0.1em] text-gray-900 uppercase">SUBTOTAL</span>
                            <span className="text-[16px] font-medium text-gray-900">
                                ₹{cartTotal.toLocaleString('en-IN')}
                            </span>
                        </div>
                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="w-full bg-black text-white py-4 text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors shadow-lg"
                        >
                            CHECKOUT
                        </button>
                        <p className="text-[10px] text-gray-400 text-center mt-4 tracking-wide">
                            Shipping, taxes, and discounts calculated at checkout.
                        </p>
                    </div>
                )}
            </div>
            {/* Checkout Modal Overlay */}
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cartTotal={cartTotal}
                totalItems={cart.reduce((acc, item) => acc + item.qty, 0)}
                cartItems={cart}
            />
        </>
    );
};

export default CartDrawer;
