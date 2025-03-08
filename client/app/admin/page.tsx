"use client"

import { useState } from 'react';
import { 
Trophy, 
Users, 
Calendar, 
BarChart3, 
CreditCard, 
PlusCircle,
Star,
Shield,
Target,
Zap,
Activity,
FileText,
DollarSign,
UserPlus,
ArrowUpRight,
ArrowDownRight
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminDashboardLayout from '../../components/admin-layout';
import Leaderboard from '@/components/leaderDashboard';

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

  // Budget and Shortcuts State
  const [budget] = useState({
    total: 100000,
    used: 45000
  });

  return (
    <AdminDashboardLayout>
      <div className="space-y-8">
        {/* Shortcuts Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Button 
            variant="outline" 
            className="flex flex-col h-24 justify-center items-center border-green-600/30 hover:bg-green-600/5"
          >
            <UserPlus className="h-6 w-6 mb-2 text-green-600" />
            <span>Add New Team</span>
          </Button>

          <Button 
            variant="outline" 
            className="flex flex-col h-24 justify-center items-center border-green-600/30 hover:bg-green-600/5"
          >
            <DollarSign className="h-6 w-6 mb-2 text-green-600" />
            <span>Add Budget</span>
          </Button>

          <Button 
            variant="outline" 
            className="flex flex-col h-24 justify-center items-center border-green-600/30 hover:bg-green-600/5"
          >
            <Calendar className="h-6 w-6 mb-2 text-green-600" />
            <span>Add Match</span>
          </Button>

          <Button 
            variant="outline" 
            className="flex flex-col h-24 justify-center items-center border-green-600/30 hover:bg-green-600/5"
          >
            <FileText className="h-6 w-6 mb-2 text-green-600" />
            <span>Add Match Summary</span>
          </Button>
        </div>

        {/* Statistics and Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Budget Card */}
          <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <CreditCard className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold">Budget Overview</h3>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                Total Budget
              </Badge>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Budget</span>
                <span className="font-semibold">${budget.total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Used Budget</span>
                <span className="font-semibold text-blue-600">${budget.used.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Remaining</span>
                <span className="font-semibold text-green-600">
                  ${(budget.total - budget.used).toLocaleString()}
                </span>
              </div>
            </div>
          </Card>

          {/* Teams Overview */}
          <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Users className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Teams</h3>
              </div>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                Total Teams
              </Badge>
            </div>
            <div className="space-y-3">
              {teams.slice(0, 3).map((team) => (
                <div 
                  key={team.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70"
                >
                  <div>
                    <h4 className="font-medium">{team.name}</h4>
                    <p className="text-xs text-muted-foreground">{team.university}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-green-600">#{team.rank}</span>
                    <Badge 
                      variant="outline"
                      className={`
                        ${team.change.startsWith('+') 
                          ? 'bg-green-500/10 text-green-600 border-green-500/30' 
                          : team.change === '0' 
                          ? 'bg-gray-500/10 text-gray-600 border-gray-500/30'
                          : 'bg-red-500/10 text-red-600 border-red-500/30'
                        }
                      `}
                    >
                      {team.change.startsWith('+') ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : team.change === '0' ? null : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {team.change}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Matches Overview */}
          <Card className="p-6 bg-gradient-to-br from-red-500/5 to-red-500/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold">Matches</h3>
              </div>
              <Badge variant="outline" className="bg-red-500/10 text-red-600">
                Upcoming & Ongoing
              </Badge>
            </div>
            <div className="space-y-3">
              {matches.slice(0, 3).map((match) => (
                <div 
                  key={match.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70"
                >
                  <div>
                    <h4 className="font-medium">{match.teams}</h4>
                    <p className="text-xs text-muted-foreground">{match.venue}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`
                      ${match.status === 'ongoing' 
                        ? 'bg-green-500/10 text-green-600 border-green-500/30'
                        : match.status === 'upcoming'
                        ? 'bg-blue-500/10 text-blue-600 border-blue-500/30'
                        : 'bg-red-500/10 text-red-600 border-red-500/30'
                      }
                    `}
                  >
                    {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Top Performers Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Batsmen */}
          <Card className="bg-gradient-to-b from-green-500/5 to-transparent border-green-500/10 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-green-500/20 bg-green-500/10 flex justify-between items-center">
              <h3 className="font-semibold text-lg flex items-center">
                <Target className="h-4 w-4 mr-2 text-green-500" />
                Top Run Scorers
              </h3>
              <Badge className="bg-green-500/20 text-green-600 border-none">Batting</Badge>
            </div>
            <div className="p-4">
              {topPerformers.batsmen.map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-green-500/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold">
                      {player.id}
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{player.name}</h4>
                      <p className="text-xs text-muted-foreground">{player.university}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-sm text-green-500">{player.runs} runs</div>
                    <p className="text-xs text-muted-foreground">{player.matches} matches</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        {/* Top Bowlers */}
        <Card className="bg-gradient-to-b from-blue-500/5 to-transparent border-blue-500/10 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-blue-500/20 bg-blue-500/10 flex justify-between items-center">
            <h3 className="font-semibold text-lg flex items-center">
              <Zap className="h-4 w-4 mr-2 text-blue-500" />
              Top Wicket Takers
            </h3>
            <Badge className="bg-blue-500/20 text-blue-600 border-none">Bowling</Badge>
          </div>
          <div className="p-4">
            {topPerformers.bowlers.map((player) => (
              <div 
                key={player.id} 
                className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-blue-500/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 font-bold">
                    {player.id}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{player.name}</h4>
                    <p className="text-xs text-muted-foreground">{player.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-sm text-blue-500">{player.wickets} wickets</div>
                  <p className="text-xs text-muted-foreground">Econ: {player.economy}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top All-Rounders */}
        <Card className="bg-gradient-to-b from-red-500/5 to-transparent border-red-500/10 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-red-500/20 bg-red-500/10 flex justify-between items-center">
            <h3 className="font-semibold text-lg flex items-center">
              <Activity className="h-4 w-4 mr-2 text-red-500" />
              Top All-Rounders
            </h3>
            <Badge className="bg-red-500/20 text-red-600 border-none">All-Round</Badge>
          </div>
          <div className="p-4">
            {topPerformers.allRounders.map((player) => (
              <div 
                key={player.id} 
                className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-red-500/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-600 font-bold">
                    {player.id}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{player.name}</h4>
                    <p className="text-xs text-muted-foreground">{player.university}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-medium">
                    <span className="text-green-400">{player.runs} runs</span> • 
                    <span className="text-red-600"> {player.wickets} wkts</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
        </div>

        {/* Leaderboard Section */}
        <Leaderboard/>
        
      </div>
    </AdminDashboardLayout>
  );
}