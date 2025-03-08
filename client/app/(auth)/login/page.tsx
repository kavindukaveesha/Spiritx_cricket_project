"use client"
import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  LogIn, 
  Trophy, 
  Zap,
  Edit3
} from 'lucide-react';
import CricketPitchBackground from '@/components/authbackgrount';



// Login Page Component
const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<{ email?: string, password?: string }>({});
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { email?: string, password?: string } = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Login attempt', formData);
      // TODO: Implement actual login logic
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Cricket Pitch Background */}
      <CricketPitchBackground />
      
      {/* Login Container */}
      <div className="relative z-10 w-full max-w-lg p-8 mx-4 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/10 animate-fade-in
        ">
        
        {/* Cricket-Themed Header */}
        <div className="text-center mb-10 relative">
          <Trophy 
            className="mx-auto mb-6 text-cricket-ball animate-pulse" 
            size={80} 
            strokeWidth={1.5} 
          />
          <h1 className="text-4xl font-bold text-white mb-4 font-bebas-neue tracking-wide">
            Cricket Tournament
          </h1>
          <p className="text-neutral-300 font-nunito-sans">
            Login to Your Cricket Portal
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail 
                className={`text-neutral-400 group-focus-within:text-cricket-ball 
                  group-focus-within:scale-110 transition-all`} 
                size={20} 
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={`w-full pl-12 pr-4 py-3 rounded-lg 
                bg-white/10 border
                ${errors.email 
                  ? 'border-cricket-ball/50' 
                  : 'border-white/20 focus:border-cricket-ball'
                }
                text-white placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-cricket-ball/50
                transition-all duration-300 group`}
            />
            {errors.email && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-cricket-ball">
                <Zap size={20} />
              </div>
            )}
          </div>

          {/* Password Input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock 
                className={`text-neutral-400 group-focus-within:text-cricket-ball 
                  group-focus-within:scale-110 transition-all`} 
                size={20} 
              />
            </div>
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full pl-12 pr-12 py-3 rounded-lg 
                bg-white/10 border
                ${errors.password 
                  ? 'border-cricket-ball/50' 
                  : 'border-white/20 focus:border-cricket-ball'
                }
                text-white placeholder-neutral-400
                focus:outline-none focus:ring-2 focus:ring-cricket-ball/50
                transition-all duration-300 group`}
            />
            {/* Password Visibility Toggle */}
            <button
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                text-neutral-400 hover:text-cricket-ball 
                focus:outline-none transition-colors"
            >
              {isPasswordVisible ? (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              ) : (
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              )}
            </button>
            {errors.password && (
              <div className="absolute right-12 top-1/2 -translate-y-1/2 text-cricket-ball">
                <Zap size={20} />
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex justify-between items-center">
            <label className="flex items-center text-neutral-300">
              <input 
                type="checkbox" 
                className="form-checkbox rounded text-cricket-ball 
                  focus:ring-cricket-ball mr-2"
              />
              <span className="text-sm">Remember me</span>
            </label>
            <a 
              href="/forgot-password" 
              className="text-sm text-cricket-bat hover:text-cricket-ball transition-colors"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            className="w-full py-3 rounded-lg 
              bg-cricket-ball hover:bg-mora-maroon 
              text-white font-bold 
              flex items-center justify-center 
              space-x-2 
              transition-all duration-300 
              hover:scale-[1.02] 
              focus:outline-none 
              focus:ring-2 
              focus:ring-cricket-ball/50"
          >
            <LogIn size={20} />
            <span>Play Cricket</span>
          </button>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-neutral-300">
              New to Cricket Tournament? {' '}
              <a 
                href="/register" 
                className="text-cricket-bat hover:text-cricket-ball 
                  transition-colors font-bold flex items-center justify-center gap-2"
              >
                <Edit3 size={16} />
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;