"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import {
  Mail,
  Lock,
  User,
  UserPlus,
  Zap,
  LogIn,
} from "lucide-react";
import CricketPitchBackground from "@/components/authbackgrount";


// Register Page Component
const RegisterPage: React.FC = () => {
  const router = useRouter(); // Initialize router for navigation
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const [isPasswordVisible, setIsPasswordVisible] = useState({
    password: false,
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
      firstName?: string;
      lastName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First Name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    else if (!/[A-Z]/.test(formData.password) || !/[a-z]/.test(formData.password) || !/[0-9]/.test(formData.password))
      newErrors.password = "Password must include uppercase, lowercase, and number";
    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Registration attempt", formData);
      // TODO: Replace with actual registration API call
      // For now, simulate success and redirect to OTP screen
      router.push("/verify-otp"); // Redirect to OTP verification page
    }
  };

  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    setIsPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <CricketPitchBackground />
      <div className="relative z-10 w-full max-w-lg p-8 mx-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10 animate-fade-in">
        <div className="text-center mb-8">
          <UserPlus className="mx-auto mb-4 text-[#D32F2F] animate-pulse" size={60} strokeWidth={1.8} />
          <h1 className="text-3xl font-bold text-white tracking-tight">Join the Cricket League</h1>
          <p className="text-neutral-300 text-sm mt-1">Register to start your journey</p>
        </div>
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                  errors.firstName ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
                } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                  errors.lastName ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
                } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>}
            </div>
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border ${
                errors.email ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
              } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={isPasswordVisible.password ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-10 pr-12 py-3 rounded-lg bg-white/10 border ${
                errors.password ? "border-red-500" : "border-white/20 focus:border-[#D32F2F]"
              } text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50 transition-all`}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("password")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-[#D32F2F] transition-colors"
            >
              {isPasswordVisible.password ? (
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
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
            <input
              type={isPasswordVisible.confirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
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
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              className="rounded text-[#D32F2F] focus:ring-[#D32F2F] mr-2 bg-white/10 border-white/20"
            />
            <label htmlFor="terms" className="text-sm text-neutral-300">
              I agree to the{" "}
              <a href="#" className="text-[#D32F2F] hover:underline">
                Terms of Service
              </a>
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#D32F2F] to-[#F44336] text-white font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D32F2F]/50"
          >
            <UserPlus size={20} />
            <span>Create Account</span>
          </button>
          <div className="text-center text-sm text-neutral-300">
            Already have an account?{" "}
            <a href="/login" className="text-[#D32F2F] hover:underline font-semibold flex items-center justify-center gap-1">
              <LogIn size={14} />
              Sign In
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;