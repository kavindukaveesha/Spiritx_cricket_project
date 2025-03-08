import { Button } from "@/components/ui/button";
import { Trophy, Users, DollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-teal-700">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-white px-4">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 font-montserrat">
            BUILD YOUR ULTIMATE CRICKET DREAM TEAM
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-nunito-sans">
            Join Spirit11 - The Premier Inter-University Fantasy Cricket League
          </p>
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button size="lg" className="bg-pink-500 hover:bg-pink-600">
                JOIN THE COMPETITION
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              LEARN HOW TO PLAY
            </Button>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-purple-900">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Sign Up",
                description: "Create your profile and connect with your university"
              },
              {
                icon: Trophy,
                title: "Build Your Team",
                description: "Select players within your budget to create your dream team"
              },
              {
                icon: DollarSign,
                title: "Manage Budget",
                description: "Strategically allocate your budget for maximum performance"
              },
              {
                icon: TrendingUp,
                title: "Compete & Win",
                description: "Earn points and climb the leaderboard to win prizes"
              }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 rounded-lg bg-gray-50 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-purple-900" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-purple-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}