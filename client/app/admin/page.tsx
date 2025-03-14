"use client"

import { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Calendar, 
  BarChart3, 
  CreditCard, 
  FileText,
  DollarSign,
  UserPlus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  Percent,
  Target,
  Zap,
  Activity
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardLayout from '@/components/admin-layout';
import ActionButton from '@/components/admin/sub/ActionButton';
import PlayerCard from '@/components/admin/sub/PlayerCard';
import StatCard from '@/components/admin/sub/StatCard';
import TeamCard from '@/components/admin/sub/TeamCard';
import Leaderboard from '@/components/leaderDashboard';
import MatchCard from '@/components/MatchCard';
import MainContent from '@/components/admin/main/HomePageMainContent';


// Sample Data Types and Interfaces
interface Team {
  id: number;
  name: string;
  university: string;
  points: number;
  players: number;
  rank: number;
  change: string;
}

interface Match {
  id: number;
  teams: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
}

interface TopPerformer {
  id: number;
  name: string;
  university: string;
  type: 'batsman' | 'bowler' | 'all-rounder';
  runs?: number;
  wickets?: number;
  matches?: number;
  economy?: number;
}

export default function AdminDashboard() {
  // Sample Data
  const teams: Team[] = [
    { 
      id: 1, 
      name: "Team Thunder", 
      university: "University of Colombo", 
      points: 2850,
      players: 11,
      rank: 1,
      change: "+2"
    },
    { 
      id: 2, 
      name: "Cricket Kings", 
      university: "University of Peradeniya", 
      points: 2720,
      players: 10,
      rank: 2,
      change: "0"
    },
    { 
      id: 3, 
      name: "Royal Strikers", 
      university: "University of Moratuwa", 
      points: 2680,
      players: 9,
      rank: 3,
      change: "+1"
    }
  ];

  const matches: Match[] = [
    {
      id: 1,
      teams: "Dragons vs Lions",
      date: "Tomorrow, 2:30 PM",
      status: "upcoming",
      venue: "Central University Ground"
    },
    {
      id: 2,
      teams: "Titans vs Warriors",
      date: "Live - 32 overs",
      status: "ongoing",
      venue: "National Cricket Stadium"
    },
    {
      id: 3,
      teams: "Panthers vs Wolves",
      date: "Yesterday",
      status: "completed",
      venue: "Eastern Cricket Academy"
    }
  ];

  const topPerformers: {
    batsmen: TopPerformer[];
    bowlers: TopPerformer[];
    allRounders: TopPerformer[];
  } = {
    batsmen: [
      { 
        id: 1, 
        name: "Sachin Tendulkar", 
        university: "Mumbai University", 
        type: 'batsman',
        runs: 856, 
        matches: 12 
      },
      { 
        id: 2, 
        name: "Virat Kapur", 
        university: "Delhi University", 
        type: 'batsman',
        runs: 789, 
        matches: 12 
      },
      { 
        id: 3, 
        name: "Rohit Mehra", 
        university: "Bangalore Institute", 
        type: 'batsman',
        runs: 745, 
        matches: 11 
      }
    ],
    bowlers: [
      { 
        id: 1, 
        name: "Jasprit Kumar", 
        university: "Gujarat University", 
        type: 'bowler',
        wickets: 28, 
        economy: 5.2 
      },
      { 
        id: 2, 
        name: "Ravichandran Singh", 
        university: "Chennai College", 
        type: 'bowler',
        wickets: 24, 
        economy: 5.8 
      },
      { 
        id: 3, 
        name: "Mohammad Patel", 
        university: "UP Technical Institute", 
        type: 'bowler',
        wickets: 22, 
        economy: 6.1 
      }
    ],
    allRounders: [
      { 
        id: 1, 
        name: "Ravindra Jadav", 
        university: "Saurashtra University", 
        type: 'all-rounder',
        runs: 456, 
        wickets: 18 
      },
      { 
        id: 2, 
        name: "Hardik Sharma", 
        university: "Baroda College", 
        type: 'all-rounder',
        runs: 389, 
        wickets: 15 
      },
      { 
        id: 3, 
        name: "Krunal Patel", 
        university: "Rajkot Technical", 
        type: 'all-rounder',
        runs: 342, 
        wickets: 14 
      }
    ]
  };

  // Stats for dashboard summary
  const stats = [
    {
      title: "Total Teams",
      value: "24",
      icon: <Users className="h-5 w-5" />,
      change: "+4",
      changeType: "increase",
      trend: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Total Players",
      value: "312",
      icon: <Users className="h-5 w-5" />,
      change: "+28",
      changeType: "increase",
      trend: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Tournament Progress",
      value: "68%",
      icon: <Percent className="h-5 w-5" />,
      change: "+5%",
      changeType: "increase",
      trend: <TrendingUp className="h-4 w-4" />
    },
    {
      title: "Avg. Match Score",
      value: "287",
      icon: <Activity className="h-5 w-5" />,
      change: "+12",
      changeType: "increase",
      trend: <TrendingUp className="h-4 w-4" />
    }
  ];

  // Budget and Shortcuts State
  const [budget] = useState({
    total: 100000,
    used: 45000
  });

  // Quick actions for the dashboard
  const quickActions = [
    { 
      title: "Add New Team", 
      icon: <UserPlus className="h-6 w-6" />, 
      onClick: () => console.log("Add team clicked"),
      variant: "secondary"
    },
    { 
      title: "Add Budget", 
      icon: <DollarSign className="h-6 w-6" />, 
      onClick: () => console.log("Add budget clicked"),
      variant: "secondary"
    },
    { 
      title: "Schedule Match", 
      icon: <Calendar className="h-6 w-6" />, 
      onClick: () => console.log("Schedule match clicked"),
      variant: "secondary"
    },
    { 
      title: "Match Summary", 
      icon: <FileText className="h-6 w-6" />, 
      onClick: () => console.log("Add summary clicked"),
      variant: "secondary"
    }
  ];

  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        {/* Dashboard Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 mb-2">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">Cricket Tournament Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome back, Admin! Here&apos;s what&apos;s happening today.</p>
          </div>
          <div className="flex space-x-3">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              <Calendar className="mr-2 h-4 w-4" />
              Tournament Schedule
            </Button>
            <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <FileText className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <StatCard 
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              trend={stat.trend}
            />
          ))}
        </div>

        {/* Quick Actions Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <ActionButton 
              key={index} 
              title={action.title} 
              icon={action.icon} 
              onClick={action.onClick}
              variant={action.variant as 'primary' | 'secondary' | 'accent' | 'default'}
            />
          ))}
        </div>

        {/* Main Content Grid */}
         <MainContent/>

        {/* Top Performers Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Trophy className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Top Performers
          </h2>
          <Tabs defaultValue="batsmen" className="w-full">
            <TabsList className="mb-4 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg">
              <TabsTrigger value="batsmen" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Target className="h-4 w-4 mr-2" />
                Batsmen
              </TabsTrigger>
              <TabsTrigger value="bowlers" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Zap className="h-4 w-4 mr-2" />
                Bowlers
              </TabsTrigger>
              <TabsTrigger value="allrounders" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Activity className="h-4 w-4 mr-2" />
                All-Rounders
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="batsmen" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.batsmen.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    colorScheme="green" 
                    statLabel="runs" 
                    secondaryStat={`${player.matches} matches`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="bowlers" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.bowlers.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    colorScheme="blue" 
                    statLabel="wickets" 
                    secondaryStat={`Econ: ${player.economy}`}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="allrounders" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topPerformers.allRounders.map((player) => (
                  <PlayerCard 
                    key={player.id} 
                    player={player} 
                    colorScheme="slate" 
                    statLabel="runs" 
                    secondaryStat={`${player.wickets} wickets`}
                    dualStat={true}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Leaderboard Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" />
            Tournament Leaderboard
          </h2>
          <Leaderboard />
        </div>
      </div>
    </AdminDashboardLayout>
  );
}