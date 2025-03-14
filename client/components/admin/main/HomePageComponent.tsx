"use client"

import { Button } from "@/components/ui/button";
import { Trophy, Users, DollarSign, TrendingUp, PlayCircle, ArrowRight, Star, Shield, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import FeatureCard from "../sub/FeatureCard";
import StatisticCard from "../sub/StaticCard";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Navigation */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V6Z" strokeWidth="2"/>
                  <path d="M9 10H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="font-bold text-xl text-white">CricketU</h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-white/80 hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#stats" className="text-white/80 hover:text-white transition-colors">Stats</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Log In
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center text-white px-4 overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 z-0" />
        
        {/* Cricket ball animation */}
        <div className="absolute opacity-10 w-96 h-96 rounded-full bg-red-600 blur-3xl animate-pulse-glow"></div>
        
        {/* Visual elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-green-500/20 blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-64 h-64 rounded-full bg-blue-600/10 blur-2xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto pt-20">
          <div className="inline-block px-6 py-2 rounded-full bg-white/10 backdrop-blur-md mb-6 animate-slide-up">
            <p className="text-sm font-medium text-blue-300">Premier Inter-University Cricket League</p>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-montserrat leading-tight animate-slide-up">
            BUILD YOUR ULTIMATE <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">CRICKET DREAM TEAM</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 font-nunito-sans text-blue-100/90 animate-slide-up">
            Join CricketU - The most exciting fantasy cricket platform exclusively for university students
          </p>
          
          <div className="space-x-4 animate-slide-up">
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6">
                JOIN THE COMPETITION
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 px-6 py-6">
              <PlayCircle className="mr-2 h-5 w-5" />
              LEARN HOW TO PLAY
            </Button>
          </div>
          
          <div className="mt-16 flex flex-wrap justify-center gap-8 animate-slide-up">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                <Trophy className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-sm text-blue-200">Universities</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">5000+</p>
                <p className="text-sm text-blue-200">Active Players</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mr-3">
                <Award className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-white">₹200K</p>
                <p className="text-sm text-blue-200">Prize Pool</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 rounded-full border-2 border-white/30 flex items-center justify-center">
            <div className="w-1.5 h-3 bg-white/70 rounded-full animate-float"></div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-slate-900 to-blue-900/70">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-blue-100/80 max-w-2xl mx-auto">Follow these simple steps to start your journey in the world of fantasy cricket and compete with fellow students</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-600/20 via-green-500/50 to-blue-600/20 -translate-y-1/2 z-0"></div>
            
            {/* Feature cards */}
            {[
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Sign Up",
                description: "Create your profile and connect with your university credentials"
              },
              {
                icon: <Trophy className="w-8 h-8 text-blue-400" />,
                title: "Build Your Team",
                description: "Select players within your budget to create your dream lineup"
              },
              {
                icon: <DollarSign className="w-8 h-8 text-blue-400" />,
                title: "Manage Budget",
                description: "Strategically allocate your budget for maximum team performance"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
                title: "Compete & Win",
                description: "Earn points based on real-world performances and win prizes"
              }
            ].map((item, index) => (
              <div key={index} className="relative z-10">
                <FeatureCard
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
                <div className="flex justify-center mt-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-blue-900/70 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Platform Features</h2>
            <p className="text-blue-100/80 max-w-2xl mx-auto">Our platform offers a rich set of features designed to provide the ultimate fantasy cricket experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Shield className="w-8 h-8 text-blue-400" />,
                title: "Live Scoring",
                description: "Real-time updates and scoring based on actual match performances"
              },
              {
                icon: <Star className="w-8 h-8 text-blue-400" />,
                title: "University Leagues",
                description: "Compete in exclusive leagues against students from your own university"
              },
              {
                icon: <Trophy className="w-8 h-8 text-blue-400" />,
                title: "Cash Prizes",
                description: "Win real cash prizes based on your team's performance in tournaments"
              },
              {
                icon: <Users className="w-8 h-8 text-blue-400" />,
                title: "Player Stats",
                description: "Access detailed statistics and analytics for all cricket players"
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-blue-400" />,
                title: "Performance Insights",
                description: "Get valuable insights to help improve your team selections"
              },
              {
                icon: <DollarSign className="w-8 h-8 text-blue-400" />,
                title: "Budget Management",
                description: "Advanced tools to help manage your team budget effectively"
              }
            ].map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-20 bg-slate-900 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-blue-600/5 blur-3xl"></div>
          <div className="absolute bottom-10 left-20 w-96 h-96 rounded-full bg-green-600/5 blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Platform Statistics</h2>
            <p className="text-blue-100/80 max-w-2xl mx-auto">Join thousands of students already competing in our fantasy cricket platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatisticCard
              value="20+"
              label="Universities"
              icon={<Shield className="w-8 h-8" />}
            />
            <StatisticCard
              value="5,000+"
              label="Active Players"
              icon={<Users className="w-8 h-8" />}
              highlight={true}
            />
            <StatisticCard
              value="₹200K"
              label="Prize Pool"
              icon={<DollarSign className="w-8 h-8" />}
            />
            <StatisticCard
              value="25+"
              label="Tournaments"
              icon={<Trophy className="w-8 h-8" />}
            />
          </div>
          
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Ready to start your fantasy cricket journey?</h3>
            <Link href="/dashboard">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl">
                JOIN NOW
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-blue-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <div className="w-10 h-10 rounded-md bg-blue-600 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 6C5 4.34315 6.34315 3 8 3H16C17.6569 3 19 4.34315 19 6V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V6Z" strokeWidth="2"/>
                  <path d="M9 10H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 14H15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="font-bold text-xl text-white">CricketU</h1>
            </div>
            
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="#how-it-works" className="text-blue-100/70 hover:text-white transition-colors">How It Works</a>
              <a href="#features" className="text-blue-100/70 hover:text-white transition-colors">Features</a>
              <a href="#stats" className="text-blue-100/70 hover:text-white transition-colors">Stats</a>
              <a href="/about" className="text-blue-100/70 hover:text-white transition-colors">About Us</a>
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                </svg>
              </Button>
              <Button variant="outline" size="icon" className="border-white/20 text-white hover:bg-white/10 w-10 h-10 p-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                </svg>
              </Button>
            </div>
          </div>
          
          <div className="border-t border-blue-900/30 mt-8 pt-8 text-center">
            <p className="text-blue-100/50 text-sm">© 2025 CricketU. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}