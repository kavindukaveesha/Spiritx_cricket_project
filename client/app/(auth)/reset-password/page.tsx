"use client";
import React, { useState } from "react";
import { Lock, Zap } from "lucide-react";
import CricketPitchBackground from "@/components/authbackgrount";



// Password Reset Page Component
interface PasswordResetProps {
  onSubmit: (newPassword: string) => void; // Callback for password submission
}

const PasswordResetPage: React.FC<PasswordResetProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState({
    newPassword: false,
    confirmPassword: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: {
      newPassword?: string;
      confirmPassword?: string;
    } = {};

    // New Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    } else if (
      !/[A-Z]/.test(formData.newPassword) ||
      !/[a-z]/.test(formData.newPassword) ||
      !/[0-9]/.test(formData.newPassword)
    ) {
      newErrors.newPassword = "Password must include uppercase, lowercase, and number";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData.newPassword);
      console.log("New Password Submitted:", formData.newPassword); // Replace with actual logic
    }
  };

  const togglePasswordVisibility = (field: "newPassword" | "confirmPassword") => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cricket Pitch Background */}
      <CricketPitchBackground />

      {/* Password Reset Container */}
      <div className="relative z-10 w-full max-w-lg p-8 mx-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <Lock className="mx-auto mb-4 text-[#D32F2F] animate-pulse" size={60} strokeWidth={1.8} />
          <h1 className="text-3xl font-bold text-white tracking-tight">Reset Your Password</h1>
          <p className="text-neutral-300 text-sm mt-1">Enter a new password to secure your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* New Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={isPasswordVisible.newPassword ? "text" : "password"}
              name="newPassword"
              placeholder="New Password"
              value={formData.newPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border ${
                errors.newPassword ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
              } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("newPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D32F2F] transition-colors"
            >
              {isPasswordVisible.newPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
            {errors.newPassword && <p className="text-red-400 text-xs mt-1">{errors.newPassword}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={isPasswordVisible.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border ${
                errors.confirmPassword ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
              } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirmPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D32F2F] transition-colors"
            >
              {isPasswordVisible.confirmPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </button>
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50"
          >
            <Zap size={20} />
            <span>Reset Password</span>
          </button>

          {/* Back to Login Link */}
          <div className="text-center text-sm text-neutral-300">
            Password reset?{" "}
            <a href="/login" className="text-[#D32F2F] hover:underline font-semibold">
              Back to Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;