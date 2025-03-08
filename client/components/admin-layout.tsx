"use client"
import { useState } from 'react';
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
  BookOpen
} from 'lucide-react';

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const adminNavigation = [
    { 
      name: 'Dashboard', 
      href: '/admin/', 
      icon: LayoutDashboard, 
      active: true 
    },
    { 
      name: 'Teams', 
      href: '/admin/teams', 
      icon: Users, 
      active: false 
    },
    { 
      name: 'Matches', 
      href: '/admin/matches', 
      icon: Calendar, 
      active: false 
    },
    { 
      name: 'Leaderboard', 
      href: '/admin/leaderboard', 
      icon: Trophy, 
      active: false 
    },
    { 
      name: 'Budget Planner', 
      href: '/admin/budget', 
      icon: CreditCard, 
      active: false 
    },
    { 
      name: 'Settings', 
      href: '/admin/settings', 
      icon: Settings, 
      active: false 
    },
    { 
      name: 'Admin Management', 
      href: '/admin/manage', 
      icon: Shield, 
      active: false 
    }
  ];
  
  return (
    <div className="min-h-screen bg-background dark">
      {/* Mobile sidebar toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-card shadow-md text-foreground"
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? 'w-20' : 'w-64'} 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          bg-card shadow-card border-r border-border`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className={`py-8 flex justify-center items-center border-b border-border relative ${sidebarCollapsed ? 'px-2' : 'px-6'}`}>
            <h1 className={`font-bold text-foreground transition-all duration-300 ${sidebarCollapsed ? 'text-2xl' : 'heading-3'}`}>
              {sidebarCollapsed ? 'A11' : 'Admin 11'}
            </h1>
            
            {/* Collapse toggle button - visible only on desktop */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 hidden lg:flex text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${sidebarCollapsed ? 'rotate-90' : '-rotate-90'}`} />
            </Button>
          </div>
          
          {/* Navigation */}
          <div className="mt-6 px-3 flex-1">
            <nav className="space-y-1.5">
              {adminNavigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 rounded-lg transition-colors relative
                    ${item.active 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                >
                  <item.icon className={`${sidebarCollapsed ? 'mx-auto' : 'mr-3'} h-5 w-5 transition-all`} />
                  
                  {!sidebarCollapsed && <span>{item.name}</span>}
                  
                  {/* Active indicator */}
                  {item.active && (
                    <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" aria-hidden="true"></span>
                  )}
                  
                  {/* Tooltip for collapsed mode */}
                  {sidebarCollapsed && (
                    <div className="absolute left-full ml-6 -translate-x-3 translate-y-0 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 z-50">
                      <div className="bg-popover px-2 py-1 rounded-md text-xs shadow-lg whitespace-nowrap">{item.name}</div>
                    </div>
                  )}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Help section */}
          <div className={`mt-6 px-3 ${!sidebarCollapsed ? 'mb-4' : 'mb-2'}`}>
            <div className={`rounded-lg bg-primary/5 p-3 ${sidebarCollapsed ? 'text-center' : ''}`}>
              <BookOpen className={`h-5 w-5 text-primary ${sidebarCollapsed ? 'mx-auto' : 'mb-2'}`} />
              {!sidebarCollapsed && (
                <>
                  <h5 className="font-medium text-sm mb-1">Admin Guide</h5>
                  <p className="text-xs text-muted-foreground">Access documentation for admin panel features.</p>
                  <Button size="sm" variant="default" className="w-full mt-2 text-xs">View Docs</Button>
                </>
              )}
            </div>
          </div>
          
          {/* Footer */}
          <div className={`p-4 mt-auto border-t border-border ${sidebarCollapsed ? 'text-center' : ''}`}>
            <Button 
              variant="outline" 
              className={`btn-outline text-foreground hover:bg-primary/10 hover:text-primary ${sidebarCollapsed ? 'w-10 h-10 p-0' : 'w-full'}`} 
              onClick={() => {}}
            >
              <LogOut className={`h-4 w-4 ${sidebarCollapsed ? 'mx-auto' : 'mr-2'}`} />
              {!sidebarCollapsed && "Logout"}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Top navigation bar */}
      <div className={`fixed top-0 right-0 transition-all duration-300 z-30 ${sidebarCollapsed ? 'lg:left-20' : 'lg:left-64'} left-0 bg-card shadow-sm border-b border-border`}>
        <div className="h-16 px-4 flex items-center justify-between">
          {/* Search bar */}
          <div className="hidden md:flex relative rounded-md w-64 lg:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input 
              type="text" 
              placeholder="Search teams, matches..." 
              className="block w-full pl-10 pr-3 py-2 border-0 bg-muted/50 text-sm rounded-md focus:ring-2 focus:ring-primary focus:outline-none h-10"
            />
          </div>
          
          {/* Mobile title - only shown on mobile screens */}
          <h1 className="text-xl font-bold text-foreground md:hidden">Admin 11</h1>
          
          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Help */}
            <Button variant="ghost" size="icon" className="text-muted-foreground hidden sm:flex">
              <HelpCircle className="h-5 w-5" />
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="text-muted-foreground relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
            </Button>
            
            {/* User dropdown */}
            <div className="flex items-center">
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="text-sm font-medium hidden lg:block">Admin User</span>
                <ChevronDown className="h-4 w-4 text-muted-foreground hidden lg:block" />
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