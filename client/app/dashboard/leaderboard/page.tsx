"use client"

import { useState, useEffect, SetStateAction } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import DashboardLayout from '@/components/dashboard-layout';
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Medal, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Sparkles, 
  Filter, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Crown, 
  Calendar, 
  BarChart3, 
  Award,
  ArrowUp,
  MoreHorizontal,
  ExternalLink
} from 'lucide-react';
import Leaderboard from '@/components/leaderDashboard';

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState('overall');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState('asc');
  const [highlightedTeam, setHighlightedTeam] = useState(42);

  // Extended sample data for the leaderboard
  const fullLeaderboardData = [
    {
      id: 1,
      rank: 1,
      name: "Team Thunder",
      university: "University of Colombo",
      points: 2850,
      change: "+2",
      changeValue: 2,
      winStreak: 5,
      totalMatches: 32,
      wins: 28,
      losses: 4,
      avatar: "/teams/team1.png",
      lastMatchResult: "W",
      performance: 92,
      badge: "legend"
    },
    {
      id: 2,
      rank: 2,
      name: "Cricket Kings",
      university: "University of Peradeniya",
      points: 2720,
      change: "0",
      changeValue: 0,
      winStreak: 3,
      totalMatches: 31,
      wins: 26,
      losses: 5,
      avatar: "/teams/team2.png",
      lastMatchResult: "W",
      performance: 88,
      badge: "gold"
    },
    {
      id: 3,
      rank: 3,
      name: "Royal Strikers",
      university: "University of Moratuwa",
      points: 2680,
      change: "+1",
      changeValue: 1,
      winStreak: 4,
      totalMatches: 30,
      wins: 25,
      losses: 5,
      avatar: "/teams/team3.png",
      lastMatchResult: "W",
      performance: 86,
      badge: "silver"
    },
    {
      id: 4,
      rank: 4,
      name: "Cricket Titans",
      university: "University of Kelaniya",
      points: 2610,
      change: "-1",
      changeValue: -1,
      winStreak: 0,
      totalMatches: 31,
      wins: 24,
      losses: 7,
      avatar: "/teams/team4.png",
      lastMatchResult: "L",
      performance: 84,
      badge: "bronze"
    },
    {
      id: 5,
      rank: 5,
      name: "Mighty Warriors",
      university: "University of Jaffna",
      points: 2580,
      change: "+2",
      changeValue: 2,
      winStreak: 3,
      totalMatches: 30,
      wins: 24,
      losses: 6,
      avatar: "/teams/team5.png",
      lastMatchResult: "W",
      performance: 82,
      badge: null
    },
    {
      id: 6,
      rank: 6,
      name: "Cricket Legends",
      university: "Eastern University",
      points: 2550,
      change: "+3",
      changeValue: 3,
      winStreak: 4,
      totalMatches: 29,
      wins: 23,
      losses: 6,
      avatar: "/teams/team6.png",
      lastMatchResult: "W",
      performance: 81,
      badge: null
    },
    {
      id: 7,
      rank: 7,
      name: "Victory XI",
      university: "South Eastern University",
      points: 2520,
      change: "-2",
      changeValue: -2,
      winStreak: 0,
      totalMatches: 30,
      wins: 22,
      losses: 8,
      avatar: "/teams/team7.png",
      lastMatchResult: "L",
      performance: 79,
      badge: null
    },
    // Add more teams to have enough data
    ...Array.from({ length: 40 }, (_, i) => ({
      id: i + 8,
      rank: i + 8,
      name: `Team ${i + 8}`,
      university: `University ${i + 8}`,
      points: Math.floor(2500 - (i * 15) + (Math.random() * 10)),
      change: Math.random() > 0.6 ? `+${Math.floor(Math.random() * 3) + 1}` : 
              Math.random() > 0.3 ? "0" : `-${Math.floor(Math.random() * 3) + 1}`,
      changeValue: Math.random() > 0.6 ? Math.floor(Math.random() * 3) + 1 : 
                Math.random() > 0.3 ? 0 : -(Math.floor(Math.random() * 3) + 1),
      winStreak: Math.floor(Math.random() * 6),
      totalMatches: Math.floor(25 + Math.random() * 5),
      wins: Math.floor(15 + Math.random() * 10),
      losses: Math.floor(5 + Math.random() * 5),
      avatar: null,
      lastMatchResult: Math.random() > 0.5 ? "W" : "L",
      performance: Math.floor(70 - (i * 0.5) + (Math.random() * 5)),
      badge: null
    }))
  ];

  // Update rank 42 to be "Your Team" for demonstration
  const yourTeamIndex = fullLeaderboardData.findIndex(team => team.rank === 42);
  if (yourTeamIndex !== -1) {
    fullLeaderboardData[yourTeamIndex] = {
      ...fullLeaderboardData[yourTeamIndex],
      name: "Spirit11",
      university: "University of Visual & Performing Arts",
      isYourTeam: true,
      points: 1985,
      change: "+5",
      changeValue: 5,
      winStreak: 3,
      performance: 65,
      badge: "rising"
    };
  }

  // Filter the data based on search query
  const filteredData = fullLeaderboardData.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    team.university.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the data based on the selected criteria
  const sortedData = [...filteredData].sort((a, b) => {
    let comparison = 0;
    
    switch(sortBy) {
      case 'rank':
        comparison = a.rank - b.rank;
        break;
      case 'points':
        comparison = b.points - a.points;
        break;
      case 'name':
        comparison = a.name.localeCompare(b.name);
        break;
      case 'university':
        comparison = a.university.localeCompare(b.university);
        break;
      case 'winStreak':
        comparison = b.winStreak - a.winStreak;
        break;
      case 'change':
        comparison = b.changeValue - a.changeValue;
        break;
      default:
        comparison = a.rank - b.rank;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  // Paginate the data
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(sortedData.length / pageSize);

  // Your team's stats
  const yourTeam = fullLeaderboardData.find(team => team.isYourTeam) || {
    rank: 42,
    points: 1985,
    change: "+5",
    winStreak: 3,
    wins: 18,
    losses: 9,
    performance: 65
  };

  // Stats for top performers
  const topPerformers = [
    { id: 1, name: "Team Thunder", points: 345, type: "Most Points This Week" },
    { id: 3, name: "Royal Strikers", streak: 8, type: "Longest Win Streak" },
    { id: 12, name: "Blazing Bats", wins: 9, type: "Most Wins This Month" }
  ];

  // Handle sorting changes
  const handleSort = (field: SetStateAction<string>) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Get the appropriate badge icon and color
  const getBadgeInfo = (badge: string) => {
    switch(badge) {
      case 'legend':
        return { icon: <Crown className="h-3 w-3 mr-1" />, color: 'bg-gradient-to-r from-yellow-400 to-amber-600 text-white' };
      case 'gold':
        return { icon: <Medal className="h-3 w-3 mr-1" />, color: 'bg-amber-500/20 text-amber-700 border-amber-500/30' };
      case 'silver':
        return { icon: <Medal className="h-3 w-3 mr-1" />, color: 'bg-slate-400/20 text-slate-700 border-slate-400/30' };
      case 'bronze':
        return { icon: <Medal className="h-3 w-3 mr-1" />, color: 'bg-amber-700/20 text-amber-800 border-amber-700/30' };
      case 'rising':
        return { icon: <TrendingUp className="h-3 w-3 mr-1" />, color: 'bg-green-500/20 text-green-700 border-green-500/30' };
      default:
        return { icon: null, color: '' };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 md:p-6 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border border-green-200/50 dark:border-green-800/20">
          <div>
            <h1 className="heading-2 text-green-800 dark:text-green-300 flex items-center gap-2">
              <Trophy className="h-6 w-6" /> 
              Leaderboard
            </h1>
            <p className="text-green-600/80 dark:text-green-400/80 mt-1">Track your ranking and compete with other teams</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={timeframe === 'overall' ? 'default' : 'outline'}
              onClick={() => setTimeframe('overall')}
              className={timeframe === 'overall' ? 
                'bg-green-600 hover:bg-green-700 text-white' : 
                'border-green-500/30 text-green-600 hover:bg-green-500/10'
              }
            >
              <Trophy className="w-4 h-4 mr-2" />
              Overall
            </Button>
            <Button
              variant={timeframe === 'weekly' ? 'default' : 'outline'}
              onClick={() => setTimeframe('weekly')}
              className={timeframe === 'weekly' ? 
                'bg-green-600 hover:bg-green-700 text-white' : 
                'border-green-500/30 text-green-600 hover:bg-green-500/10'
              }
            >
              <Calendar className="w-4 h-4 mr-2" />
              This Week
            </Button>
            <Button
              variant={timeframe === 'monthly' ? 'default' : 'outline'}
              onClick={() => setTimeframe('monthly')}
              className={timeframe === 'monthly' ? 
                'bg-green-600 hover:bg-green-700 text-white' : 
                'border-green-500/30 text-green-600 hover:bg-green-500/10'
              }
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              This Month
            </Button>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="overflow-hidden rounded-xl border-green-500/10 shadow-lg">
            <div className="h-2 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="p-6 relative">
              <div className="absolute right-0 top-0 w-20 h-20 -mt-4 -mr-4 text-amber-500/10">
                <Trophy className="w-full h-full" strokeWidth={1} />
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-amber-500/10 p-3">
                  <Trophy className="w-6 h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Your Rank</h3>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-4xl font-bold text-amber-600">#{yourTeam.rank}</p>
                    <div className="mb-1 flex items-center">
                      <Badge className="bg-green-500/10 text-green-600 border-green-500/30">
                        <ArrowUp className="h-3 w-3 mr-1" />
                        {yourTeam.change}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-muted-foreground">Top 10%</p>
                    <span className="mx-2 text-muted-foreground/30">|</span>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Award className="h-3 w-3 mr-1 text-amber-500" />
                      {yourTeam.performance}% performance
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-xl border-green-500/10 shadow-lg">
            <div className="h-2 bg-gradient-to-r from-purple-500 to-purple-600"></div>
            <div className="p-6 relative">
              <div className="absolute right-0 top-0 w-20 h-20 -mt-4 -mr-4 text-purple-500/10">
                <TrendingUp className="w-full h-full" strokeWidth={1} />
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-purple-500/10 p-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Points</h3>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-4xl font-bold text-purple-600">{yourTeam.points.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-green-500">+150 this week</p>
                    <span className="mx-2 text-muted-foreground/30">|</span>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Star className="h-3 w-3 mr-1 text-purple-500" />
                      {yourTeam.wins} wins, {yourTeam.losses} losses
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="overflow-hidden rounded-xl border-green-500/10 shadow-lg">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <div className="p-6 relative">
              <div className="absolute right-0 top-0 w-20 h-20 -mt-4 -mr-4 text-green-500/10">
                <Sparkles className="w-full h-full" strokeWidth={1} />
              </div>
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-green-500/10 p-3">
                  <Sparkles className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-muted-foreground text-sm font-medium">Win Streak</h3>
                  <div className="flex items-end gap-2 mt-1">
                    <p className="text-4xl font-bold text-green-600">{yourTeam.winStreak}</p>
                    <p className="text-lg text-green-600/70 mb-1">games</p>
                  </div>
                  <div className="flex items-center mt-1">
                    <p className="text-xs text-muted-foreground">Current streak</p>
                    <span className="mx-2 text-muted-foreground/30">|</span>
                    <p className="text-xs text-muted-foreground flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-green-500" />
                      Next match in 2 days
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Top Performers Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topPerformers.map((performer, idx) => (
            <Card key={idx} className="p-4 border-green-500/10 shadow-md bg-gradient-to-br from-green-500/5 to-transparent">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-green-500/10 p-2.5">
                  {idx === 0 ? (
                    <BarChart3 className="h-5 w-5 text-green-600" />
                  ) : idx === 1 ? (
                    <Star className="h-5 w-5 text-green-600" />
                  ) : (
                    <Trophy className="h-5 w-5 text-green-600" />
                  )}
                </div>
                <div>
                  <h3 className="text-sm text-muted-foreground">{performer.type}</h3>
                  <p className="font-semibold">{performer.name}</p>
                  <p className="text-sm text-green-600">
                    {performer.points ? `${performer.points} points` : 
                     performer.streak ? `${performer.streak} game streak` : 
                     `${performer.wins} wins`}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Leaderboard Card */}
      <Leaderboard/>

        {/* Compare Teams Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold flex items-center text-green-700">
            <Users className="mr-2 h-5 w-5 text-green-600" />
            Compare Teams
          </h2>
          <Button variant="outline" className="border-green-500/30 text-green-600 hover:bg-green-500/10">
            <ExternalLink className="h-3.5 w-3.5 mr-1" /> View All Stats
          </Button>
        </div>

        <Card className="border-green-500/10 shadow-lg overflow-hidden">
          <div className="p-4 border-b border-green-500/20 bg-green-500/5">
            <h2 className="font-semibold">Top Teams Comparison</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 42].map((rank) => {
                const team = fullLeaderboardData.find(t => t.rank === rank);
                if (!team) return null;
                
                return (
                  <div key={rank} className={`flex flex-col items-center ${team.isYourTeam ? 'bg-green-500/5 p-4 rounded-lg border border-green-500/20' : ''}`}>
                    <Avatar className="h-16 w-16 border border-green-500/20 mb-2">
                      {team.avatar ? (
                        <AvatarImage src={team.avatar} alt={team.name} />
                      ) : (
                        <AvatarFallback className={`${
                          team.isYourTeam ? 'bg-green-500 text-white' : 
                          team.rank === 1 ? 'bg-amber-500 text-white' : 
                          team.rank === 2 ? 'bg-slate-300 text-slate-700' : 
                          team.rank === 3 ? 'bg-amber-700 text-amber-100' : 'bg-muted'
                        }`}>
                          {team.name.substring(0, 2)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <p className="font-semibold text-center">{team.name}</p>
                    <p className="text-muted-foreground text-sm mb-2">Rank #{team.rank}</p>
                    
                    {team.badge && (
                      <Badge className={`${getBadgeInfo(team.badge).color} text-xs mb-2`}>
                        {getBadgeInfo(team.badge).icon}
                        {team.badge === 'legend' ? 'Legend' : 
                         team.badge === 'gold' ? 'Gold' : 
                         team.badge === 'silver' ? 'Silver' : 
                         team.badge === 'bronze' ? 'Bronze' : 
                         team.badge === 'rising' ? 'Rising Star' : team.badge}
                      </Badge>
                    )}
                    
                    <p className="text-green-600 font-bold">{team.points.toLocaleString()} pts</p>
                  </div>
                );
              })}
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Points Trend</h3>
                <div className="h-48 bg-green-500/5 rounded-lg border border-green-500/20 flex items-center justify-center">
                  <p className="text-muted-foreground">Points trend chart would appear here</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Win Rate Comparison</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 42].map((rank) => {
                    const team = fullLeaderboardData.find(t => t.rank === rank);
                    if (!team) return null;
                    
                    const winRate = Math.round((team.wins / (team.wins + team.losses)) * 100);
                    
                    return (
                      <div key={rank} className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>{team.name}</span>
                          <span className="font-medium">{winRate}%</span>
                        </div>
                        <Progress 
                          value={winRate} 
                          className="h-2" 
                          indicatorClassName={`${
                            team.rank === 1 ? 'bg-amber-500' : 
                            team.rank === 2 ? 'bg-slate-400' : 
                            team.rank === 3 ? 'bg-amber-700' : 
                            'bg-green-500'
                          }`} 
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{team.wins}W</span>
                          <span>{team.losses}L</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}