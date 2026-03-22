import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [code, setCode] = useState("");
    const [codeError, setCodeError] = useState("");

    const { user, login } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/account");
        }
    }, [user, navigate]);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        if (!email.includes("@")) {
            setEmailError("Please enter a valid email address (must contain '@').");
            return;
        }
        setEmailError("");
        setStep(2);
    };

    const handleCodeSubmit = (e) => {
        e.preventDefault();
        if (code.length !== 6 || !/^\d+$/.test(code)) {
            setCodeError("Please enter exactly 6 digits.");
            return;
        }
        setCodeError("");
        // Add actual verification logic here if necessary
        console.log("Verifying code for", email);
        login(email);
        navigate("/account");
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8 relative font-sans">
            <div className="w-full max-w-[440px] px-6 sm:px-0 z-10">
                <div className="bg-white py-10 sm:py-12 px-4 sm:px-12 sm:border sm:border-gray-100 sm:rounded-2xl sm:shadow-[0_2px_20px_rgb(0,0,0,0.04)]">

                    {/* Main Logo Mockup */}
                    <div className="flex justify-center mb-8">
                        <div className="h-[72px] w-[72px] rounded-full border border-gray-400 border-dashed flex items-center justify-center relative bg-white">
                            <span className="font-serif italic text-sm tracking-widest text-black">maisha</span>
                            {/* Decorative tiny elements to mimic the leafy ring */}
                            <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full border border-gray-400"></div>
                            <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                        </div>
                    </div>

                    {step === 1 ? (
                        <>
                            <h2 className="text-[22px] font-semibold text-gray-900 leading-tight mb-1">
                                Sign in
                            </h2>
                            <p className="text-sm text-gray-500 mb-8 tracking-wide">
                                Sign in or create an account
                            </p>

                            <button type="button" className="w-full flex items-center justify-center gap-1.5 bg-[#5a31f4] hover:bg-[#4a21e4] text-white rounded-[8px] h-[52px] text-sm font-semibold transition-colors duration-200">
                                Continue with <span className="font-bold relative text-[17px] tracking-tight ml-0.5">shop</span>
                            </button>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-[13px]">
                                    <span className="px-4 bg-white text-gray-400 font-medium">or</span>
                                </div>
                            </div>

                            <form className="space-y-4" onSubmit={handleEmailSubmit}>
                                <div>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (emailError) setEmailError("");
                                        }}
                                        className={`block w-full px-4 h-[52px] text-sm text-gray-900 border-[1.5px] ${emailError ? 'border-red-500' : 'border-gray-800'} rounded-[8px] placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors`}
                                        placeholder="Email"
                                    />
                                    {emailError && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{emailError}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center bg-black hover:bg-neutral-800 text-white rounded-[8px] h-[52px] text-sm font-semibold transition-colors shadow-md"
                                    >
                                        Continue
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <>
                            <h2 className="text-[22px] font-semibold text-gray-900 leading-tight mb-1">
                                Enter code
                            </h2>
                            <p className="text-sm text-gray-500 mb-8 tracking-wide">
                                Sent to {email}
                            </p>

                            <form className="space-y-4" onSubmit={handleCodeSubmit}>
                                <div>
                                    <input
                                        id="code"
                                        name="code"
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={code}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (/^\d*$/.test(val)) {
                                                setCode(val);
                                            }
                                            if (codeError) setCodeError("");
                                        }}
                                        className={`block w-full px-4 h-[52px] text-sm text-gray-900 border-[1.5px] ${codeError ? 'border-red-500' : 'border-gray-800'} rounded-[8px] placeholder-gray-500 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors`}
                                        placeholder="6-digit code"
                                    />
                                    {codeError && <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium">{codeError}</p>}
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center bg-black hover:bg-neutral-800 text-white rounded-[8px] h-[52px] text-sm font-semibold transition-colors shadow-md"
                                    >
                                        Submit
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6">
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-[13px] text-gray-600 hover:text-black hover:underline"
                                >
                                    Sign in with a different email
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Footer Links */}
            <div className="absolute bottom-6 w-full flex justify-center gap-6 text-[13px] text-zinc-600 font-medium">
                <a href="#" className="hover:text-black transition-colors">Privacy policy</a>
                <a href="#" className="hover:text-black transition-colors">Terms of service</a>
            </div>
        </div>
    );
};

export default Login;
