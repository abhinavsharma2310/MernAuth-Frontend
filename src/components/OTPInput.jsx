import React, { useState, useRef, useEffect } from "react";

const OTPInput = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Auto-focus first input
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, ""); // Only allow digits
    if (!value) return; // Ignore empty input

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Store last entered digit
    setOtp(newOtp);

    if (index < length - 1 && value) {
      inputRefs.current[index + 1]?.focus(); // Move to next input
    }

    if (newOtp.every((num) => num !== "")) {
      onSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move focus back
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length).split("");

    if (pasteData.length === length) {
      setOtp(pasteData);
      pasteData.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });

      inputRefs.current[length - 1]?.focus(); // Move to last input
      onSubmit(pasteData.join(""));
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          maxLength="1"
          value={otp[index]}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      ))}
    </div>
  );
};

export default OTPInput;
