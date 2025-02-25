import React, { useState, useRef } from "react";

const OTPInput = ({ length = 6, onSubmit }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Prevent non-numeric input

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take the last entered digit
    setOtp(newOtp);

    // Move to next input if available & not the last field
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // If all fields are filled, trigger submit
    if (newOtp.every((num) => num !== "")) {
      onSubmit(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus(); // Move focus back
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").split("").slice(0, length);
    if (pasteData.every((char) => !isNaN(char))) {
      setOtp(pasteData);
      pasteData.forEach((char, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = char;
        }
      });

      // Focus on the last input if all filled
      inputRefs.current[Math.min(pasteData.length, length - 1)].focus();
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
          className="w-12 h-12 bg-[#333A5C] text-white text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      ))}
    </div>
  );
};

export default OTPInput;
