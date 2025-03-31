"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, 
  BarChart3, 
  Calendar, 
  CheckCircle2, 
  Layout, 
  Shield, 
  Users 
} from "lucide-react";

const features = [
  {
    title: "Team Management",
    description: "Manage players, staff, and team composition with ease",
    icon: Users,
  },
  {
    title: "Match Scheduling",
    description: "Organize matches, tournaments, and practice sessions",
    icon: Calendar,
  },
  {
    title: "Performance Analytics",
    description: "Track player and team statistics with detailed insights",
    icon: BarChart3,
  },
  {
    title: "Security Features",
    description: "Role-based access control and data protection",
    icon: Shield,
  },
];

const screenshots = [
  {
    title: "Dashboard Overview",
    image: "https://images.unsplash.com/photo-1531973819741-e27a5ae2cc7b?auto=format&fit=crop&w=1200&q=80",
    description: "Complete overview of team performance and upcoming matches",
  },
  {
    title: "Player Statistics",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80",
    description: "Detailed player statistics and performance metrics",
  },
  {
    title: "Match Analysis",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80",
    description: "In-depth match analysis and team comparisons",
  },
];

const plans = [
  {
    name: "Starter",
    price: "$49",
    features: [
      "Basic dashboard features",
      "Up to 50 players",
      "5 admin users",
      "Email support",
    ],
  },
  {
    name: "Professional",
    price: "$99",
    features: [
      "All Starter features",
      "Unlimited players",
      "20 admin users",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    features: [
      "All Professional features",
      "Unlimited everything",
      "24/7 support",
      "Custom development",
      "On-premise deployment",
    ],
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
              Cricket Admin Dashboard
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto">
              A powerful, modern dashboard for managing your cricket team. Built with Next.js and Tailwind CSS.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg">
                Live Preview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Documentation
              </Button>
            </div>
          </div>
          
          <div className="mt-20">
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden border bg-card">
                <img
                  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=2000&q=80"
                  alt="Dashboard Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Powerful Features for Cricket Management
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to manage your cricket team effectively
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Card key={feature.title} className="p-6">
                <feature.icon className="h-10 w-10 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Beautiful Interface
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Modern and intuitive design that makes cricket management a breeze
            </p>
          </div>

          <div className="mt-16">
            <Tabs defaultValue="dashboard-overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                {screenshots.map((screen) => (
                  <TabsTrigger 
                    key={screen.title} 
                    value={screen.title.toLowerCase().replace(/\s+/g, "-")}
                  >
                    {screen.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {screenshots.map((screen) => (
                <TabsContent 
                  key={screen.title} 
                  value={screen.title.toLowerCase().replace(/\s+/g, "-")}
                  className="mt-8"
                >
                  <div className="aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={screen.image}
                      alt={screen.title}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    {screen.description}
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect plan for your team
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan) => (
              <Card key={plan.name} className="p-8">
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-4 text-4xl font-bold">{plan.price}</p>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-primary mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 w-full">Get Started</Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto flex flex-col items-center">
          <Layout className="h-8 w-8" />
          <p className="mt-4 text-center text-muted-foreground">
            © 2024 Cricket Admin Dashboard. All rights reserved by Janaka Ishan.
          </p>git 
        </div>
      </footer>
    </div>
  );
}