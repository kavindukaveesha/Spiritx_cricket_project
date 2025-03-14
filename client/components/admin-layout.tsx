"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Users,
  Trophy,
  Settings,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  User,
  ChevronDown,
  HelpCircle,
  CreditCard,
  Calendar,
  BarChart3,
  Shield,
  BookOpen,
  FileText,
  ExternalLink
} from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activePath, setActivePath] = useState('/admin/');
  const [showDocs, setShowDocs] = useState(false);

  // Force dark mode class on the document
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.className = 'bg-[#0F172A] text-white';
    
    // Set active path based on window location
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      setActivePath(path);
    }
    
    // Cleanup function to ensure we don't accidentally remove this if component unmounts
    return () => {
      // Keep dark mode even after unmount
    };
  }, []);
  
  const adminNavigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/', 
      icon: LayoutDashboard,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Teams', 
      href: '/admin/teams', 
      icon: Users,
      get active() { return activePath.startsWith(this.href); }
    },
    { 
      name: 'Matches', 
      href: '/admin/matches', 
      icon: Calendar,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Manage Match', 
      href: '/admin/manage', 
      icon: Calendar,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Leaderboard', 
      href: '/admin/leaderboard', 
      icon: Trophy,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Budget Planner', 
      href: '/admin/budget', 
      icon: CreditCard,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings,
      get active() { return activePath === this.href; }
    },
    { 
      name: 'Admin Management', 
      href: '/admin/manage', 
      icon: Shield,
      get active() { return activePath === this.href; }
    }
  ];
  
  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-[#1E293B] shadow-md text-white hover:bg-[#334155]"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-20' : 'w-64'} 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-[#0F172A] shadow-md border-r border-[#1E293B]`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`py-6 flex justify-center items-center border-b border-[#1E293B] relative ${sidebarCollapsed ? 'px-2' : 'px-6'}`}>
            <h1 className={`font-bold text-[#E8B923] transition-all duration-300 ${sidebarCollapsed ? 'text-2xl' : 'text-3xl font-bold tracking-wider'}`}>
              {sidebarCollapsed ? 'A11' : 'ADMIN 11'}
            </h1>
            
            {/* Collapse toggle button - visible only on desktop */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 hidden lg:flex text-[#94A3B8] hover:text-white"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
            </Button>
          </div>
          
          {/* Navigation Header */}
          <div className="px-4 pt-4 pb-2">
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wider">
              {!sidebarCollapsed && 'MAIN NAVIGATION'}
            </p>
          </div>
          
          {/* Navigation */}
          <div className="px-3 flex-1 overflow-y-auto">
            <nav className="space-y-1">
              {adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2.5 rounded-lg transition-colors relative
                    ${item.active 
                      ? 'bg-[#1E293B] text-white' 
                      : 'text-[#94A3B8] hover:bg-[#1E293B] hover:text-white'
                    }`}
                  onClick={() => {
                    setActivePath(item.href);
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                >
                  <item.icon className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 transition-all`} />
                  
                  {!sidebarCollapsed && <span>{item.name}</span>}
                  
                  {/* Active indicator */}
                  {item.active && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-[#E8B923] rounded-r-full" aria-hidden="true"></span>
                  )}
                  
                  {/* Tooltip for collapsed mode */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-6 -translate-x-3 translate-y-0 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 z-50">
                      <div className="bg-[#1E293B] px-2 py-1 rounded-md text-xs shadow-lg whitespace-nowrap">{item.name}</div>
                    </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Documentation Section */}
          <div className="mt-auto">
            <div className="px-3 py-4 border-t border-[#1E293B]">
              <Link
                href="/admin/documentation"
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors text-[#94A3B8] hover:bg-[#1E293B] hover:text-white`}
              >
                <BookOpen className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5`} />
                {!sidebarCollapsed && (
                  <div>
                    <span>Admin Documentation</span>
                    <p className="text-xs text-[#64748B] mt-0.5">Click to access documentation</p>
                  </div>
                )}
                
                {/* Tooltip for collapsed mode */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-6 -translate-x-3 translate-y-0 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 z-50">
                    <div className="bg-[#1E293B] px-2 py-1 rounded-md text-xs shadow-lg whitespace-nowrap">Admin Documentation</div>
                  </div>
                )}
              </Link>
            </div>
            
            {/* Footer */}
            <div className={`p-4 border-t border-[#1E293B] ${sidebarCollapsed ? 'text-center' : ''}`}>
              <Button 
                variant="outline" 
                className={`border-[#334155] text-[#94A3B8] hover:bg-[#1E293B] hover:text-white ${sidebarCollapsed ? 'w-10 h-10 p-0' : 'w-full'}`} 
                onClick={() => {}}
              >
                <LogOut className={`h-4 w-4 ${sidebarCollapsed ? 'mx-auto' : 'mr-2'}`} />
                {!sidebarCollapsed && "Logout"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Top navigation bar */}
      <div className={`fixed top-0 right-0 transition-all duration-300 z-30 ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-64'} left-0 bg-[#0F172A] shadow-md border-b border-[#1E293B]`}>
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Search bar */}
          <div className="hidden md:flex relative rounded-md w-64 lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-[#64748B]" />
            </div>
            <input 
              type="text" 
              placeholder="Search teams, matches..." 
              className="block w-full pl-10 pr-3 py-2 border-0 bg-[#1E293B]/50 text-sm rounded-md focus:ring-1 focus:ring-[#E8B923] focus:outline-none h-10 text-white"
            />
          </div>
          
          {/* Mobile title - only shown on mobile screens */}
          <h1 className="text-xl font-bold text-[#E8B923] md:hidden">Admin 11</h1>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Help */}
            <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white hover:bg-[#1E293B] hidden sm:flex">
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-[#94A3B8] hover:text-white hover:bg-[#1E293B] relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-[#FF4081]"></span>
            </Button>
            
            {/* User dropdown */}
            <div className="flex items-center">
              <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-[#1E293B]">
                <div className="w-8 h-8 rounded-full bg-[#7B1113] flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-[#64748B] block">Super Admin</span>
                </div>
                <ChevronDown className="h-4 w-4 text-[#64748B] hidden lg:block" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content wrapper - This is where the children will render */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'} pt-16`}>
        <main className="min-h-screen p-6">
          {children}
        </main>
      </div>
    </div>
  );
}