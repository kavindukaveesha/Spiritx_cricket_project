"use client"

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardLayout from '@/components/dashboard-layout';
import { 
  Bell, 
  Moon, 
  Sun, 
  Volume2, 
  Mail, 
  Shield, 
  User, 
  Key, 
  Settings as SettingsIcon, 
  LogOut, 
  Lock,
  Zap
} from 'lucide-react';

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    updates: false,
    newsletter: true
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    sound: true,
    autoComplete: false
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-primary flex items-center gap-3">
                <SettingsIcon className="w-10 h-10" />
                Account Settings
              </h1>
              <p className="text-muted-foreground mt-2">
                Manage your account preferences, notifications, and security
              </p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>

          {/* Tabs Container */}
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-muted p-1 rounded-xl">
              <TabsTrigger 
                value="account" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all rounded-lg"
              >
                <User className="mr-2 h-4 w-4" /> Account
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all rounded-lg"
              >
                <Bell className="mr-2 h-4 w-4" /> Notifications
              </TabsTrigger>
              <TabsTrigger 
                value="preferences" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all rounded-lg"
              >
                <Zap className="mr-2 h-4 w-4" /> Preferences
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all rounded-lg"
              >
                <Lock className="mr-2 h-4 w-4" /> Security
              </TabsTrigger>
            </TabsList>

            {/* Account Tab */}
            <TabsContent value="account">
              <Card className="p-6 mt-4 space-y-6 border-none shadow-lg">
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-12 h-12 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold">John Doe</h2>
                    <p className="text-muted-foreground">University of Colombo</p>
                  </div>
                  <Button variant="outline" className="hover:bg-primary/10">
                    Edit Profile
                  </Button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <input 
                      type="email" 
                      value="john.doe@example.com" 
                      readOnly 
                      className="w-full p-3 border rounded-lg bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">University</label>
                    <input 
                      type="text" 
                      value="University of Colombo" 
                      readOnly 
                      className="w-full p-3 border rounded-lg bg-muted/50 cursor-not-allowed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Team Name</label>
                    <input 
                      type="text" 
                      defaultValue="Thunder Warriors" 
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Notifications Tab */}
            <TabsContent value="notifications">
              <Card className="p-6 mt-4 space-y-6 border-none shadow-lg">
                <div className="space-y-6">
                  {[
                    { 
                      icon: Mail, 
                      title: "Email Notifications", 
                      description: "Receive updates and alerts via email",
                      state: notifications.email,
                      onChange: (checked: any) => setNotifications(prev => ({ ...prev, email: checked }))
                    },
                    { 
                      icon: Bell, 
                      title: "Push Notifications", 
                      description: "Get real-time browser notifications",
                      state: notifications.push,
                      onChange: (checked: any) => setNotifications(prev => ({ ...prev, push: checked }))
                    },
                    { 
                      icon: Volume2, 
                      title: "Sound Alerts", 
                      description: "Play sounds for important events",
                      state: preferences.sound,
                      onChange: (checked: any) => setPreferences(prev => ({ ...prev, sound: checked }))
                    }
                  ].map(({ icon: Icon, title, description, state, onChange }) => (
                    <div key={title} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 p-3 rounded-full">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{title}</h3>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={state}
                        onCheckedChange={onChange}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="p-6 mt-4 space-y-6 border-none shadow-lg">
                {[
                  { 
                    icon: Moon, 
                    title: "Dark Mode", 
                    description: "Switch between light and dark themes",
                    state: preferences.darkMode,
                    onChange: (checked: any) => setPreferences(prev => ({ ...prev, darkMode: checked }))
                  },
                  { 
                    icon: Shield, 
                    title: "AI Team Completion", 
                    description: "Automatically suggest team members",
                    state: preferences.autoComplete,
                    onChange: (checked: any) => setPreferences(prev => ({ ...prev, autoComplete: checked }))
                  }
                ].map(({ icon: Icon, title, description, state, onChange }) => (
                  <div key={title} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 p-3 rounded-full">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                      </div>
                    </div>
                    <Switch
                      checked={state}
                      onCheckedChange={onChange}
                    />
                  </div>
                ))}
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="p-6 mt-4 space-y-6 border-none shadow-lg">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Key className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Security Management</h2>
                    <p className="text-muted-foreground">
                      Manage your account protection and access settings
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { 
                      title: "Change Password", 
                      description: "Update your account password",
                      icon: Lock,
                      variant: "default"
                    },
                    { 
                      title: "Two-Factor Authentication", 
                      description: "Add an extra layer of security",
                      icon: Shield,
                      variant: "default"
                    },
                    { 
                      title: "Active Sessions", 
                      description: "View and manage logged-in devices",
                      icon: User,
                      variant: "default"
                    },
                    { 
                      title: "Delete Account", 
                      description: "Permanently remove your account",
                      icon: LogOut,
                      variant: "destructive"
                    }
                  ].map(({ title, description, icon: Icon, variant }) => (
                    <Button 
                      key={title} 
                      variant={variant === "destructive" ? "destructive" : "outline"} 
                      className="w-full justify-between p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`
                          p-2 rounded-full 
                          ${variant === "destructive" 
                            ? "bg-destructive/10" 
                            : "bg-primary/10"
                          }
                        `}>
                          <Icon className={`
                            w-5 h-5 
                            ${variant === "destructive" 
                              ? "text-destructive" 
                              : "text-primary"
                            }
                          `} />
                        </div>
                        <div className="text-left">
                          <h3 className="font-medium">{title}</h3>
                          <p className="text-sm text-muted-foreground">{description}</p>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}