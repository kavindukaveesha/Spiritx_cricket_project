"use client";
import React, { useState, useRef, useEffect } from "react";
import { Lock, Mail, Zap } from "lucide-react";
import CricketPitchBackground from "@/components/authbackgrount";



// OTP Verification Page Component
interface OTPVerificationProps {
  title: string;
  description: string;
  onSubmit: (otp: string) => void;
  email?: string; // Optional email prop to display in message
}

const OTPVerificationPage: React.FC<OTPVerificationProps> = ({ title, description, onSubmit, email }) => {
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [cooldownTime, setCooldownTime] = useState(30); // Countdown timer
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Handle individual digit input
  const handleChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError(null);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      } else if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  // Handle paste event
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pastedData.length > 0) {
      const newOtp = pastedData.split("").concat(Array(6 - pastedData.length).fill(""));
      setOtp(newOtp);
      setError(null);
      inputRefs.current[5]?.focus();
    }
  };

  // Handle key down for backspace navigation
  const handleKeyDown = (index: number) => (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const validateOTP = (): boolean => {
    const otpString = otp.join("");
    if (!otpString) {
      setError("OTP is required");
      return false;
    }
    if (otpString.length !== 6) {
      setError("OTP must be 6 digits");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateOTP()) {
      const otpString = otp.join("");
      onSubmit(otpString);
      console.log("OTP Submitted:", otpString); // Replace with actual logic
    }
  };

  const handleResend = () => {
    if (!resendCooldown) {
      setResendCooldown(true);
      setCooldownTime(30);
      console.log("Resending OTP..."); // Replace with resend logic
      const timer = setInterval(() => {
        setCooldownTime((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setResendCooldown(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Background */}
      <CricketPitchBackground />

      {/* OTP Verification Container */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Lock className="mx-auto mb-4 text-[#D32F2F] animate-pulse" size={60} strokeWidth={1.8} />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#D32F2F] rounded-full animate-ping"></div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">{title}</h1>
          <p className="text-neutral-200 text-sm mt-2">
            {email
              ? `Your OTP has been sent to ${email}. Please check your inbox to verify your email.`
              : description}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Inputs */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                value={digit}
                onChange={handleChange(index)}
                onKeyDown={handleKeyDown(index)}
                onPaste={index === 0 ? handlePaste : undefined}
                maxLength={1}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-14 h-14 text-center text-white text-xl font-semibold rounded-xl bg-white/10 border ${
                  error ? "border-red-500 animate-shake" : "border-white/20 focus:border-[#D32F2F]"
                } focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 focus:bg-white/20 transition-all shadow-md hover:shadow-lg`}
              />
            ))}
          </div>
          {error && <p className="text-red-400 text-xs text-center animate-fade-in">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50"
          >
            <Zap size={20} />
            <span>Verify OTP</span>
          </button>

          {/* Resend Link with Countdown */}
          <div className="text-center text-sm text-neutral-300">
            Didn’t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resendCooldown}
              className={`${
                resendCooldown ? "text-neutral-500 cursor-not-allowed" : "text-[#D32F2F] hover:underline"
              } font-semibold`}
            >
              Resend OTP {resendCooldown && `(${cooldownTime}s)`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OTPVerificationPage;