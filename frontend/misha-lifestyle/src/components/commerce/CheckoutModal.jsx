import { useState } from "react";
import { FiChevronLeft, FiChevronDown, FiCreditCard, FiChevronRight, FiDollarSign, FiEye } from "react-icons/fi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiUserCircle, BiWallet, BiBuildingHouse } from "react-icons/bi";
import qrImage from "../../assets/images/qr.jpeg";

const CheckoutModal = ({ isOpen, onClose, cartTotal, totalItems, cartItems }) => {
    const [mobileNumber, setMobileNumber] = useState("");
    const [sendUpdates, setSendUpdates] = useState(true);
    const [couponCode, setCouponCode] = useState("");
    const [isDiscountApplied, setIsDiscountApplied] = useState(false);
    const [upiId, setUpiId] = useState("");

    // UI steps: 'login', 'otp', 'payment', 'card'
    const [checkoutStep, setCheckoutStep] = useState("login");
    const [otp, setOtp] = useState(['', '', '', '']);

    // Card Details state
    const [cardName, setCardName] = useState("Kaivalya Gavaskar");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvv, setCardCvv] = useState("");
    const [saveCard, setSaveCard] = useState(false);

    const handleCardNumberChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
        setCardNumber(formatted.substring(0, 19));
    };

    const handleExpiryChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length >= 2) {
            val = val.substring(0, 2) + '/' + val.substring(2, 4);
        }
        setCardExpiry(val.substring(0, 5));
    };

    const handleCvvChange = (e) => {
        let val = e.target.value.replace(/\D/g, '');
        setCardCvv(val.substring(0, 4));
    };

    const isCardValid = () => {
        return cardName.trim().length > 0 &&
            cardNumber.replace(/\s/g, '').length === 16 &&
            cardExpiry.length === 5 &&
            cardCvv.length >= 3;
    };

    const handleApplyCoupon = () => {
        if (isDiscountApplied) {
            setIsDiscountApplied(false);
            setCouponCode("");
        } else if (couponCode.toUpperCase() === "MAISHA10") {
            setIsDiscountApplied(true);
        } else {
            alert("Invalid Coupon Code");
        }
    };

    const handleContinueClick = () => {
        setCheckoutStep('otp');
    };

    const placeOrder = async (paymentMethod) => {
        try {
            // Adjust final total if it's COD
            const amountToCharge = paymentMethod === 'COD' ? finalTotal + 100 : finalTotal;

            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userPhone: mobileNumber,
                    items: cartItems ? cartItems.map(item => ({ name: item.name, qty: item.qty, price: item.price })) : [],
                    totalAmount: amountToCharge,
                    paymentMethod: paymentMethod
                })
            });

            if (response.ok) {
                const data = await response.json();
                alert("Order placed successfully! Order ID: " + data._id);
                onClose(); // Close the modal
            } else {
                alert("Failed to submit order.");
            }
        } catch (error) {
            console.error("Error submitting order", error);
            alert("Network error. Is your backend running?");
        }
    };

    const handleOtpChange = (index, value) => {
        if (!/^\d*$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value !== '' && index < 3) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) {
                setTimeout(() => nextInput.focus(), 10);
            }
        }

        if (newOtp.every(v => v !== '')) {
            setTimeout(() => setCheckoutStep("payment"), 300);
        }
    };

    const handleOtpKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) {
                setTimeout(() => prevInput.focus(), 10);
            }
        }
    };

    const discountAmount = isDiscountApplied ? (cartTotal * 0.1) : 0;
    const finalTotal = cartTotal - discountAmount;

    if (!isOpen) return null;

    const renderTrustBadges = () => (
        <div className={`flex flex-col items-center justify-center opacity-80 ${checkoutStep === 'payment' ? 'pt-2 pb-6 px-4' : 'pt-8 pb-4'}`}>
            <div className="text-[11px] text-gray-500 uppercase tracking-widest font-semibold mb-1 flex items-center justify-center relative">
                <svg viewBox="0 0 100 50" className="w-[100px] h-[30px] -mb-1">
                    <path id="curve" d="M 10,40 Q 50,0 90,40" fill="transparent" />
                    <text className="text-[13px] font-semibold fill-gray-400" letterSpacing="2">
                        <textPath href="#curve" startOffset="50%" textAnchor="middle">Powered By</textPath>
                    </text>
                </svg>
            </div>
            <div className="flex items-center gap-1.5 mb-6">
                <div className="bg-[#1A4B85] p-1.5 rounded-sm">
                    <div className="w-2.5 h-2.5 bg-[#FFC107] rounded-sm transform rotate-45"></div>
                </div>
                <span className="text-[#1A4B85] font-black text-xl tracking-tight leading-none">GoKwik</span>
            </div>

            <div className="flex items-center justify-center gap-6 text-[10px] font-bold text-gray-500 uppercase leading-tight text-center">
                <div className="flex items-center gap-1.5 flex-1">
                    <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-white shrink-0">✓</div>
                    <span>PCI DSS<br />Certified</span>
                </div>
                <div className="flex items-center gap-1.5 flex-1 border-x border-gray-200 px-3">
                    <div className="w-6 h-6 bg-gray-300 rounded text-[7px] text-white flex items-center justify-center text-center leading-none shrink-0 border border-gray-400 shadow-sm">
                        100%<br />SECURED
                    </div>
                    <span>Secured<br />Payments</span>
                </div>
                <div className="flex items-center gap-1.5 flex-1">
                    <div className="w-5 h-6 bg-gray-300 flex items-center justify-center text-white shrink-0 relative custom-shield">
                        <span className="absolute text-[8px]">★</span>
                    </div>
                    <span>Verified<br />Merchant</span>
                </div>
            </div>

            {checkoutStep === 'payment' && (
                <div className="text-center mt-6 text-[11px] text-gray-800 font-medium">
                    By proceeding, I agree to Gokwik's <a href="#" className="underline text-black font-bold">Privacy Policy</a> and <a href="#" className="underline text-black font-bold">T&C</a>
                </div>
            )}
        </div>
    );

    return (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
            <div className="bg-[#f7f8f8] w-full max-w-[420px] h-[85vh] md:h-[90vh] rounded-xl flex flex-col overflow-hidden shadow-2xl relative">

                {/* Header (White) */}
                <div className={`bg-white px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0 ${checkoutStep === 'otp' ? 'opacity-30' : ''}`}>
                    <div className="flex items-center gap-3">
                        <button onClick={() => { if (checkoutStep === 'card') { setCheckoutStep('payment'); } else { onClose(); } }} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <FiChevronLeft size={24} strokeWidth={2.5} className="text-gray-800" />
                        </button>
                        <div className="w-10 h-10 rounded-full border border-dashed border-gray-400 flex items-center justify-center">
                            <span className="text-[9px] font-mono tracking-tighter text-gray-700">maisha</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="flex flex-col items-end">
                            <div className="flex items-center gap-2 mb-0.5">
                                {isDiscountApplied && checkoutStep === 'payment' && (
                                    <span className="bg-[#e8f3ee] text-[#2c6e49] text-[11px] font-bold px-2 py-0.5 rounded-full">
                                        ₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })} saved so far
                                    </span>
                                )}
                                <span className="text-[12px] text-gray-500 font-medium">{checkoutStep === 'payment' && isDiscountApplied && '• '}{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                {isDiscountApplied && checkoutStep !== 'payment' && <span className="text-sm line-through text-gray-400 font-medium">₹{cartTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>}
                                <span className={`text-xl font-bold leading-tight ${isDiscountApplied && checkoutStep !== 'payment' ? 'text-green-600' : 'text-gray-900'}`}>₹{finalTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>

                            {isDiscountApplied && checkoutStep !== 'payment' && (
                                <span className="text-[11px] text-green-600 font-bold tracking-wide">
                                    Discount: -₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                            )}
                        </div>
                        <FiChevronDown className="text-gray-500" size={18} />
                    </div>
                </div>

                {/* Scrollable Body */}
                <div className={`flex-1 overflow-y-auto w-full relative ${checkoutStep === 'otp' ? 'bg-black/40 overflow-hidden' : ''}`}>
                    <div className={`p-4 space-y-4 ${checkoutStep === 'otp' ? 'opacity-30 pointer-events-none' : ''}`}>

                        {/* Coupon Section (Hidden on Payment Step) */}
                        {checkoutStep !== 'payment' && (
                            isDiscountApplied ? (
                                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden mb-4">
                                    <div className="bg-[#e4ece8] py-1.5 px-3 text-center text-[13px] text-[#2c6e49] font-medium border-b border-[#cce0d5]">
                                        You saved ₹{discountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                    </div>
                                    <div className="p-3.5 flex items-center justify-between">
                                        <div className="flex items-center gap-2.5 text-black font-bold text-[14px]">
                                            <div className="bg-[#1ca454] rounded-full w-4 h-4 text-white flex items-center justify-center text-[11px] shrink-0 font-bold">✓</div>
                                            "{couponCode.toUpperCase()}" applied
                                        </div>
                                        <button onClick={handleApplyCoupon} className="text-[14px] font-bold text-black hover:underline">
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                                    <div className="relative mt-2">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-[12px] text-gray-800 z-10 transition-all">
                                            Enter coupon code
                                        </label>
                                        <div className="flex items-center border border-gray-800 rounded-xl overflow-hidden relative z-0 h-[48px] bg-white pr-4">
                                            <input
                                                type="text"
                                                className="flex-1 h-full outline-none text-[15px] px-4 tracking-wide bg-transparent uppercase"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                            />
                                            {couponCode.length > 0 && (
                                                <button
                                                    onClick={handleApplyCoupon}
                                                    className="text-[15px] font-bold text-black"
                                                >
                                                    Apply
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 px-1">
                                        <div className="flex items-center gap-2 text-gray-700 font-medium text-[14px]">
                                            <MdOutlineLocalOffer className="text-gray-500" size={18} />
                                            1 coupon available
                                        </div>
                                        <button className="text-[14px] font-bold text-black hover:underline">
                                            View All
                                        </button>
                                    </div>
                                </div>
                            )
                        )}

                        {/* Login Section */}
                        {checkoutStep !== 'payment' && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                                <div className="bg-[#fef4de] py-2 px-3 text-center text-[13px] text-[#aa7519] font-medium border-b border-[#f3e3c0]">
                                    {checkoutStep === 'otp' ? 'Enter OTP to Redeem Loyalty Points' : 'Login to Redeem Loyalty Points'}
                                </div>

                                <div className="p-4">
                                    <div className="flex items-center gap-2 text-gray-700 font-medium text-[15px] mb-4">
                                        <BiUserCircle size={22} className="text-slate-500" />
                                        Login to continue
                                    </div>

                                    <div className="relative mt-2">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] text-slate-500 font-medium z-10 transition-all">
                                            Enter Mobile Number
                                        </label>
                                        <div className="flex items-center border border-gray-800 rounded-lg overflow-hidden relative z-0 h-[50px] bg-white">
                                            <span className="pl-4 pr-1 text-[15px] font-medium text-gray-800">+91</span>
                                            <div className="h-6 w-px bg-gray-300 mx-2"></div>
                                            <input
                                                type="tel"
                                                maxLength="10"
                                                className="flex-1 h-full outline-none text-[16px] font-medium tracking-wide bg-transparent cursor-text"
                                                value={mobileNumber}
                                                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                                                disabled={checkoutStep === 'otp'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Methods Section */}
                        {checkoutStep === 'payment' && (
                            <>
                                <div className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 flex flex-col items-center">
                                    <div className="w-40 h-40 bg-gray-100 flex items-center justify-center font-bold text-gray-900 border border-gray-200 mb-4 relative overflow-hidden flex-col gap-2 rounded-lg">
                                        <img src={qrImage} alt="QR Code" className="w-full h-full object-cover" />
                                    </div>

                                    <div className="w-full relative flex justify-center items-center mt-2 mb-6">
                                        <div className="absolute inset-x-0 h-px bg-gray-200"></div>
                                        <span className="bg-white px-3 text-[12px] text-gray-500 relative z-10 font-medium tracking-wider">OR</span>
                                    </div>

                                    <div className="w-full relative">
                                        <input
                                            type="text"
                                            placeholder="Pay via UPI ID"
                                            className="w-full border border-gray-200 rounded-lg text-[15px] px-4 py-3.5 pr-20 outline-none focus:border-gray-400 shadow-sm placeholder:text-gray-400"
                                            value={upiId}
                                            onChange={(e) => setUpiId(e.target.value)}
                                            onKeyDown={(e) => { if (e.key === 'Enter' && upiId) placeOrder('UPI') }}
                                        />
                                        {upiId.length > 3 && (
                                            <button
                                                onClick={() => placeOrder('UPI')}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white text-[12px] font-bold px-3 py-1.5 rounded hover:bg-gray-800"
                                            >
                                                PAY
                                            </button>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-3 pb-4">
                                    {[
                                        { name: 'Debit/Credit Cards', icon: <FiCreditCard size={20} className="text-gray-500" />, price: finalTotal },
                                        { name: 'Wallets', icon: <BiWallet size={20} className="text-gray-500" />, price: finalTotal },
                                        { name: 'Netbanking', icon: <BiBuildingHouse size={20} className="text-gray-500" />, price: finalTotal },
                                    ].map(method => (
                                        <div key={method.name} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-300" onClick={() => {
                                            if (method.name === 'Debit/Credit Cards') setCheckoutStep('card');
                                            else placeOrder(method.name);
                                        }}>
                                            <div className="flex items-center gap-3 text-[15px] font-bold text-gray-800">
                                                {method.icon} {method.name}
                                            </div>
                                            <div className="flex items-center gap-1 font-bold text-[17px] text-black">
                                                ₹{method.price.toLocaleString('en-IN', { minimumFractionDigits: 2 })} <FiChevronRight />
                                            </div>
                                        </div>
                                    ))}

                                    {/* COD */}
                                    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:border-gray-300 relative" onClick={() => placeOrder('COD')}>
                                        <div className="absolute -top-2.5 right-4 bg-[#f34141] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-[0_2px_4px_rgba(243,65,65,0.3)]">₹100 COD fee added</div>
                                        <div className="flex items-center gap-3 text-[15px] font-bold text-gray-800">
                                            <FiDollarSign size={20} className="text-gray-500 bg-gray-100 rounded-sm p-0.5" /> Cash on Delivery
                                        </div>
                                        <div className="flex items-center gap-1 font-bold text-[17px] text-black">
                                            ₹{(finalTotal + 100).toLocaleString('en-IN', { minimumFractionDigits: 2 })} <FiChevronRight />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Trust Badges */}
                        {checkoutStep !== 'otp' && checkoutStep !== 'card' && renderTrustBadges()}

                        {/* Debit/Credit Card Section */}
                        {checkoutStep === 'card' && (
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-800 text-[15px] font-medium mb-2 px-1">
                                    <FiCreditCard className="text-gray-500" /> Credit/Debit Card
                                </div>

                                <div className="space-y-3">
                                    <div className="relative mt-2">
                                        <label className="absolute -top-2 left-3 bg-[#f7f8f8] px-1 text-[12px] text-gray-400 font-medium z-10 transition-all">
                                            Full Name
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden relative z-0 h-[50px] bg-white">
                                            <input
                                                type="text"
                                                className="flex-1 h-full outline-none text-[15px] px-4 font-medium text-[#0a1e42] bg-transparent"
                                                value={cardName}
                                                onChange={(e) => setCardName(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="relative mt-2">
                                        <label className="absolute -top-2 left-3 bg-[#f7f8f8] px-1 text-[12px] text-gray-400 font-medium z-10 transition-all">
                                            Card Number
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden relative z-0 h-[50px] bg-white pr-3">
                                            <input
                                                type="text"
                                                className="flex-1 h-full outline-none text-[15px] px-4 font-medium text-[#0a1e42] bg-transparent tracking-widest placeholder:text-gray-300"
                                                placeholder="XXXX XXXX XXXX XXXX"
                                                value={cardNumber}
                                                onChange={handleCardNumberChange}
                                            />
                                            <div className="flex items-center gap-1.5 opacity-80 shrink-0 select-none">
                                                {/* Mastercard */}
                                                <div className="flex -space-x-1.5 mr-0.5">
                                                    <div className="w-3 h-3 rounded-full bg-red-600 mix-blend-multiply opacity-90"></div>
                                                    <div className="w-3 h-3 rounded-full bg-[#f79e1b] mix-blend-multiply opacity-90"></div>
                                                </div>
                                                {/* Visa */}
                                                <span className="text-blue-800 font-black italic text-[11px] uppercase tracking-tighter">VISA</span>
                                                {/* RuPay */}
                                                <div className="flex items-center -ml-0.5">
                                                    <span className="text-[#e27125] font-black italic text-[9px]"><span className="text-[#3b9c6f]">Ru</span>Pay</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="flex-1 relative mt-2">
                                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden relative z-0 h-[50px] bg-white">
                                                <input
                                                    type="text"
                                                    placeholder="MM/YY"
                                                    className="flex-1 h-full outline-none text-[15px] px-4 font-medium placeholder:text-gray-300 text-[#0a1e42] bg-transparent"
                                                    value={cardExpiry}
                                                    onChange={handleExpiryChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex-1 relative mt-2">
                                            <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden relative z-0 h-[50px] bg-white pr-4">
                                                <input
                                                    type="password"
                                                    placeholder="Enter CVV"
                                                    className="flex-1 h-full outline-none text-[15px] px-4 font-medium placeholder:text-gray-300 text-[#0a1e42] bg-transparent"
                                                    value={cardCvv}
                                                    onChange={handleCvvChange}
                                                />
                                                <FiEye className="text-black ml-2" size={20} />
                                            </div>
                                        </div>
                                    </div>

                                    <label className="flex items-center gap-2.5 cursor-pointer mt-4 px-1" onClick={() => setSaveCard(!saveCard)}>
                                        <div className={`w-5 h-5 border rounded flex justify-center items-center shrink-0 ${saveCard ? 'bg-black border-black' : 'border-gray-800 bg-transparent'}`}>
                                            {saveCard && <FiChevronDown className="text-white transform -rotate-45" size={14} />}
                                        </div>
                                        <span className="text-[14px] text-black">Save card as per RBI guidelines</span>
                                    </label>

                                </div>
                            </div>
                        )}

                    </div>

                    {/* OTP overlay Layer inside the body taking over bottom area */}
                    {checkoutStep === 'otp' && (
                        <div className="absolute inset-x-0 bottom-0 bg-[#fffcf5] z-[20] rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col items-center pt-8 px-6 pb-4 animate-slide-up" style={{ height: '70%', transition: 'transform 0.3s ease-in-out' }}>
                            <div className="mb-4">
                                <div className="w-12 h-14 bg-[#f3bc30] rounded-t-full border-[10px] border-[#fffcf5] outline outline-[#dfa11e] outline-4 relative shadow-sm">
                                    <div className="absolute inset-x-0 bottom-1 flex justify-center"><div className="w-1.5 h-3 bg-[#a8740b] rounded-full"></div></div>
                                </div>
                                <div className="flex gap-1 justify-center mt-3 text-green-500 font-bold tracking-widest text-lg">****</div>
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mt-2 tracking-tight">Verify number securely</h3>
                            <p className="text-[13px] text-gray-500 mb-6 flex items-center justify-center gap-1">Your details are safe with us 🔒</p>

                            <h4 className="text-[14px] font-bold text-[#0a1e42] mb-1">We can help prefill your address</h4>
                            <p className="text-[13px] text-gray-800 mb-6 flex items-center gap-1">
                                Enter OTP sent to <span className="font-semibold underline">+91-{mobileNumber}</span> <button onClick={() => setCheckoutStep('login')} className="font-bold text-black ml-1">Edit</button>
                            </p>

                            <div className="flex gap-4 mb-6">
                                {[0, 1, 2, 3].map(i => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="tel"
                                        maxLength={1}
                                        value={otp[i]}
                                        onChange={(e) => handleOtpChange(i, e.target.value)}
                                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                                        className="w-12 h-12 bg-white border border-gray-400 rounded-xl text-center text-xl font-bold shadow-sm outline-none focus:border-black transition-colors"
                                    />
                                ))}
                            </div>

                            <p className="text-[13px] text-gray-500 mb-auto">Resend OTP in 00:27</p>

                            <div className="mt-4 text-[10px] text-gray-500 flex items-center justify-center gap-1.5 opacity-80">
                                Powered by <span className="text-[#1A4B85] font-black text-xs">GoKwik</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Login */}
                {checkoutStep === 'login' && (
                    <div className="bg-white border-t border-gray-200 p-4 shrink-0 relative z-[5]">
                        <label className="flex items-center gap-3 mb-4 cursor-pointer">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border ${sendUpdates ? 'bg-black border-black' : 'bg-white border-gray-300'}`}>
                                {sendUpdates && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={sendUpdates}
                                onChange={() => setSendUpdates(!sendUpdates)}
                            />
                            <span className="text-[14px] text-gray-800 font-medium">Send me order updates & offers - (no spam)</span>
                        </label>

                        <button
                            onClick={handleContinueClick}
                            className={`w-full py-3.5 rounded-lg text-[15px] font-bold tracking-wide transition-colors ${mobileNumber.length === 10 ? 'bg-[#000000] text-white hover:bg-neutral-800' : 'bg-[#989898] text-[#e0e0e0]'}`}
                            disabled={mobileNumber.length !== 10}
                        >
                            Continue
                        </button>

                        <div className="text-center mt-3 text-[11px] text-gray-800 font-medium">
                            By proceeding, I agree to Gokwik's <a href="#" className="underline text-black font-bold">Privacy Policy</a> and <a href="#" className="underline text-black font-bold">T&C</a>
                        </div>
                    </div>
                )}

                {/* Footer Payment Mode */}
                {checkoutStep === 'payment' && (
                    <div className="bg-[#f7f8f8] p-4 shrink-0">
                        <div className="bg-white rounded-xl border border-gray-200 py-3.5 px-4 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3 text-gray-700 font-medium text-[15px]">
                                <BiUserCircle size={22} className="text-gray-400" />
                                <span>Logged in using <span className="text-black font-bold">+91 {mobileNumber}</span></span>
                            </div>
                            <button onClick={() => setCheckoutStep('login')} className="text-black font-bold text-[14px] hover:underline">
                                Logout
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Card */}
                {checkoutStep === 'card' && (
                    <div className="bg-[#f7f8f8] p-4 shrink-0">
                        <button
                            className={`w-full py-3.5 rounded-lg text-[15px] font-bold tracking-wide transition-colors ${isCardValid() ? 'bg-black text-white hover:bg-neutral-800' : 'bg-[#989898] text-[#e0e0e0]'}`}
                            disabled={!isCardValid()}
                            onClick={() => placeOrder('Card')}
                        >
                            Continue
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default CheckoutModal;
