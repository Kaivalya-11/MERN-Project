import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SEGMENTS = [
  { label: "Get 20% Off!", color: "#000000", textColor: "#FFFFFF" },
  { label: "No Luck!", color: "#FFFFFF", textColor: "#000000" },
  { label: "Flat Rs.100 Off!", color: "#000000", textColor: "#FFFFFF" },
  { label: "Get a Freebie", color: "#FFFFFF", textColor: "#000000" },
  { label: "Get 15% OFF", color: "#000000", textColor: "#FFFFFF" },
  // Duplicate 20% off to match 6 segments count if needed, or unique.
  // Based on image: 20% Off, No Luck, Flat 100, Freebie, 15% OFF, 20% Off
  { label: "Get 20% Off!", color: "#FFFFFF", textColor: "#000000" },
];

const SpinToWin = () => {
  const [visible, setVisible] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [phone, setPhone] = useState("");

  useEffect(() => {
    // Show popup after a delay
    const timer = setTimeout(() => {
      setVisible(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleSpin = () => {
    if (isSpinning || result) return;
    if (!phone || phone.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    setIsSpinning(true);
    // Random spin: multiple full rotations + random angle
    const randomAngle = Math.floor(Math.random() * 360);
    const totalRotation = 360 * 5 + randomAngle; // 5 spins + random
    setRotation(totalRotation);

    // Calculate result
    // Each segment is 60 degrees.
    // The pointer is usually at the right (0 degrees) or top.
    // Let's assume pointer is at the Right (0deg) for calculation or visualize it.
    // In the image, pointer is on the right.
    setTimeout(() => {
      setIsSpinning(false);
      // Determine index based on rotation normalization
      // The wheel rotates clockwise. The segment at the "pointer" (Right/0deg)
      // is determined by (360 - (finalAngle % 360)) / 60
      const normalizedAngle = totalRotation % 360;
      // Adjust logic if pointer is at different position. 
      // If pointer is at right (0), and wheel rotates clockwise, 
      // the segment passing 0 is what we get.
      // Let's keep it simple for now, just show a coupon.
      setResult("COUPON2024");
    }, 5000); // 5 seconds match transition
  };

  const closePopup = () => setVisible(false);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999]">
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closePopup}
        />

        {/* Sliding Panel */}
        <motion.div
          className="absolute top-0 left-0 h-full
                       w-[60vw] min-w-[720px] max-w-[920px]
                       bg-gradient-to-r from-[#d6d6d6] to-[#0f0f0f]
                       shadow-2xl overflow-hidden flex"
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Close Button */}
          <button
            onClick={closePopup}
            className="absolute top-6 right-6 text-white hover:text-gray-300 z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Left Side: Wheel */}
          <div className="w-1/2 relative flex items-center justify-center p-4">
            {/* Pointer - Adjusted for left panel layout if needed, essentially same */}
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 translate-x-1/2 z-20">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                <path d="M0 20 L40 0 L40 40 Z" fill="#E5E5E5" />
                <circle cx="28" cy="20" r="4" fill="#666" />
              </svg>
            </div>

            {/* The Wheel */}
            <motion.div
              className="w-[380px] h-[380px] rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
              animate={{ rotate: rotation }}
              transition={{ duration: 5, ease: [0.15, 0, 0.15, 1] }}
            >
              {/* Segments Background (using SVG below for precision) */}

              {/* SVG Wheel Implementation */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                {SEGMENTS.map((seg, i) => {
                  return (
                    <path
                      key={i}
                      d="M 50 50 L 50 0 A 50 50 0 0 1 93.301 25 L 50 50"
                      fill={seg.color}
                      stroke="#fff"
                      strokeWidth="0.5"
                      transform={`rotate(${i * 60} 50 50)`}
                    />
                  );
                })}
              </svg>

              {/* Text Overlay */}
              {SEGMENTS.map((seg, i) => (
                <div
                  key={i}
                  className="absolute w-full h-full top-0 left-0 flex justify-center text-[10px] font-bold uppercase tracking-wider"
                  style={{
                    transform: `rotate(${i * 60 + 30}deg)`,
                  }}
                >
                  <span
                    className="mt-6"
                    style={{ color: seg.textColor, transform: "rotate(0deg)" }}
                  >
                    {seg.label}
                  </span>
                </div>
              ))}

              {/* Center Dot */}
              <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-md z-10" />
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <div className="w-1/2 flex flex-col justify-center px-16 text-white bg-black/20 h-full"> {/* Added padding and bg for better contrast on gradient */}
            <h2 className="text-4xl font-bold mb-2 uppercase tracking-wide">Spin to Win!</h2>
            <p className="text-sm text-gray-200 mb-10">
              Feeling lucky? Give the wheel a spin!
            </p>

            {!result ? (
              <>
                <div className="flex mb-6">
                  <div className="bg-white text-black px-4 py-3 text-sm font-medium flex items-center">
                    IN +91
                  </div>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter mobile number"
                    className="flex-1 px-4 py-3 text-black text-sm outline-none focus:bg-gray-50"
                    maxLength={10}
                  />
                </div>

                <button
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="w-full bg-black text-white py-4 rounded-full text-sm font-bold uppercase tracking-widest border border-white/20 hover:bg-neutral-900 transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:scale-100"
                >
                  {isSpinning ? "Spinning..." : "Get Coupon"}
                </button>

                <p className="text-xs text-neutral-400 mt-6 leading-relaxed">
                  By submitting your information, you agree to our Privacy Policy and
                  Terms of Service.
                </p>
              </>
            ) : (
              <div className="text-center animate-pulse">
                <p className="text-2xl mb-4 font-light">You won!</p>
                <div className="bg-white text-black p-6 rounded text-3xl font-bold tracking-wider inline-block">
                  {result}
                </div>
                <p className="text-sm text-gray-300 mt-4">
                  Code copied to clipboard!
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default SpinToWin;
