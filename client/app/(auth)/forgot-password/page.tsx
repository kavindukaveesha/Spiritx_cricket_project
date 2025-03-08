"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Zap } from "lucide-react";
import CricketPitchBackground from "@/components/authbackgrount";



// Forgot Password Page Component
const ForgotPasswordPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setError(null); // Clear error on typing
  };

  const validateEmail = (): boolean => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail()) {
      setIsSubmitted(true);
      console.log("Sending OTP to:", email); // Replace with API call
      // Simulate API call delay
      setTimeout(() => {
        router.push("/verify-otp"); // Redirect to OTP screen
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Enhanced Cricket Pitch Background */}
      <CricketPitchBackground />

      {/* Forgot Password Container */}
      <div className="relative z-10 w-full max-w-md p-8 mx-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <Mail className="mx-auto mb-4 text-[#D32F2F] animate-bounce" size={60} strokeWidth={1.8} />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#D32F2F] rounded-full animate-ping"></div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Forgot Your Password?</h1>
          <p className="text-neutral-300 text-sm mt-2">
            {isSubmitted
              ? `An OTP has been sent to ${email}`
              : "Enter your email to receive a verification code"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input with Floating Label */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-300 peer-focus:text-[#D32F2F]" size={18} />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled={isSubmitted}
              placeholder=" "
              className={`peer w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                error ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
              } text-white placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
            />
            <label
              htmlFor="email"
              className={`absolute left-10 top-1/2 -translate-y-1/2 text-neutral-400 transition-all duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-xs peer-focus:text-[#D32F2F] ${
                email ? "-top-2 text-xs text-[#D32F2F]" : ""
              }`}
            >
              Email Address
            </label>
            {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitted}
            className={`w-full py-3 rounded-full bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white font-semibold flex items-center justify-center gap-2 transition-all ${
              isSubmitted ? "opacity-50 cursor-not-allowed" : "hover:scale-105 hover:shadow-lg"
            } focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50`}
          >
            <Zap size={20} />
            <span>{isSubmitted ? "Sending..." : "Send OTP"}</span>
          </button>

          {/* Back to Login Link */}
          <div className="text-center text-sm text-neutral-300">
            Remembered your password?{" "}
            <a href="/login" className="text-[#D32F2F] hover:underline font-semibold">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;