"use client"
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import DashboardLayout from '@/components/dashboard-layout';
import { playerData } from '@/lib/sample-data';
import {
  Calendar,
  Clock,
  Trophy,
  Users,
  BarChart3,
  TrendingUp,
  Plus,
  Filter,
  ChevronRight,
  Star,
  Target,
  Zap,
  ChevronUp,
  BarChart,
  Activity,
  Check,
  ArrowRight
} from 'lucide-react';
import Leaderboard from '@/components/leaderDashboard';

export default function Dashboard() {
  const [budget] = useState(1000);
  const [usedBudget] = useState(450);
  
  // Sample data for team members
  const teamMembers = [
    { name: "Virat Kumar", role: "Batsman", points: 342, form: "Excellent", image: "/assets/player1.jpg" },
    { name: "Rohit Shah", role: "Batsman", points: 289, form: "Good", image: "/assets/player2.jpg" },
    { name: "Ravindra Singh", role: "All-Rounder", points: 315, form: "Excellent", image: "/assets/player3.jpg" },
    { name: "Jasprit Patel", role: "Bowler", points: 278, form: "Good", image: "/assets/player4.jpg" },
    { name: "Hardik Gupta", role: "All-Rounder", points: 264, form: "Average", image: "/assets/player5.jpg" },
  ];

  // Sample data for matches
  const matches = {
    ongoing: [
      { 
        id: 1,
        teams: "Titans vs Warriors",
        venue: "National Cricket Stadium",
        time: "Live - 32 overs",
        score: "178/4 vs 156/6",
        teamScore: 78
      }
    ],
    upcoming: [
      { 
        id: 2,
        teams: "Dragons vs Lions",
        venue: "Central University Ground",
        date: "Tomorrow, 2:30 PM",
        prediction: "High scoring match expected"
      },
      { 
        id: 3,
        teams: "Eagles vs Sharks",
        venue: "Eastern Cricket Academy",
        date: "15 Mar, 10:00 AM",
        prediction: "Bowling friendly conditions" 
      }
    ],
    completed: [
      { 
        id: 4,
        teams: "Panthers vs Wolves",
        result: "Panthers won by 42 runs",
        date: "Yesterday",
        teamScore: 67,
        maxScore: 89
      },
      { 
        id: 5,
        teams: "Falcons vs Tigers",
        result: "Tigers won by 5 wickets",
        date: "10 Mar 2025",
        teamScore: 58,
        maxScore: 96
      }
    ]
  };

  // Sample data for top performers
  const topPerformers = {
    batsmen: [
      { rank: 1, name: "Sachin Tendulkar", university: "Mumbai University", runs: 856, matches: 12 },
      { rank: 2, name: "Virat Kapur", university: "Delhi University", runs: 789, matches: 12 },
      { rank: 3, name: "Rohit Mehra", university: "Bangalore Institute", runs: 745, matches: 11 },
    ],
    bowlers: [
      { rank: 1, name: "Jasprit Kumar", university: "Gujarat University", wickets: 28, economy: 5.2 },
      { rank: 2, name: "Ravichandran Singh", university: "Chennai College", wickets: 24, economy: 5.8 },
      { rank: 3, name: "Mohammad Patel", university: "UP Technical Institute", wickets: 22, economy: 6.1 },
    ],
    allRounders: [
      { rank: 1, name: "Ravindra Jadav", university: "Saurashtra University", runs: 456, wickets: 18 },
      { rank: 2, name: "Hardik Sharma", university: "Baroda College", runs: 389, wickets: 15 },
      { rank: 3, name: "Krunal Patel", university: "Rajkot Technical", runs: 342, wickets: 14 },
    ]
  };

  // Get form color based on form status
  const getFormColor = (form: string) => {
    switch(form) {
      case "Excellent": return "text-green-500";
      case "Good": return "text-green-400";
      case "Average": return "text-yellow-500";
      case "Poor": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <DashboardLayout>
      {/* Main Dashboard Content */}
      <div className="space-y-8 px-2">
        {/* Stats Cards Row */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-md shadow-green-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-muted-foreground text-sm font-medium">Budget</h3>
                <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                  <BarChart3 className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="stats-number text-green-500 mb-3">
                ${usedBudget} / ${budget}
              </div>
              <Progress value={(usedBudget / budget) * 100} className="h-2 mt-2 bg-background/50" />
              <p className="text-xs text-muted-foreground mt-2 text-right">{(usedBudget / budget * 100).toFixed(1)}% used</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-md shadow-green-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-muted-foreground text-sm font-medium">Team Status</h3>
                <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                  <Users className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="stats-number text-green-500 mb-3">
                8/11 Players
              </div>
              <Progress value={72.7} className="h-2 mt-2 bg-background/50" 
                        indicatorClassName="bg-green-500" />
              <p className="text-xs text-muted-foreground mt-2">Need 3 more players</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-md shadow-green-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-muted-foreground text-sm font-medium">Current Rank</h3>
                <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                  <Trophy className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="stats-number text-green-500 mb-2">
                #42
              </div>
              <div className="flex items-center gap-1">
                <Badge variant="outline" className="bg-green-500/10 text-green-500 text-xs border-green-500/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +12 positions
                </Badge>
                <p className="text-xs text-muted-foreground">Top 10%</p>
              </div>
            </div>
          </Card>
          
          <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-md shadow-green-500/5">
            <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full z-0"></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-muted-foreground text-sm font-medium">Next Match</h3>
                <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                  <Clock className="h-4 w-4 text-green-500" />
                </div>
              </div>
              <div className="stats-number text-green-500 mb-2">
                2d 14h 33m
              </div>
              <p className="text-xs text-muted-foreground mb-3">Dragons vs Lions</p>
              <Button size="sm" className="w-full bg-green-500 hover:bg-green-600 text-white">
                <Calendar className="h-3.5 w-3.5 mr-1" /> View Details
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Top Performers Section */}
        <div className="my-8">
          <h2 className="heading-3 mb-6 flex items-center text-green-600">
            <Star className="mr-2 h-5 w-5 text-green-500" /> 
            Top Performers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Top Batsmen */}
            <Card className="bg-gradient-to-b from-green-500/5 to-transparent border-green-500/10 shadow-lg shadow-green-500/5 overflow-hidden">
              <div className="p-4 border-b border-green-500/20 bg-green-500/10 backdrop-blur-sm flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center">
                  <Target className="h-4 w-4 mr-2 text-green-500" />
                  Top Run Scorers
                </h3>
                <Badge className="bg-green-500/20 text-green-600 border-none">Batting</Badge>
              </div>
              <div className="p-4">
                {topPerformers.batsmen.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-green-500/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold">
                        {player.rank}
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
                <Button variant="ghost" size="sm" className="w-full mt-2 text-green-500 text-xs hover:bg-green-500/10">
                  View Full Rankings
                </Button>
              </div>
            </Card>
            
            {/* Top Bowlers */}
            <Card className="bg-gradient-to-b from-green-500/5 to-transparent border-green-500/10 shadow-lg shadow-green-500/5 overflow-hidden">
              <div className="p-4 border-b border-green-500/20 bg-green-500/10 backdrop-blur-sm flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center">
                  <Zap className="h-4 w-4 mr-2 text-green-500" />
                  Top Wicket Takers
                </h3>
                <Badge className="bg-green-500/20 text-green-600 border-none">Bowling</Badge>
              </div>
              <div className="p-4">
                {topPerformers.bowlers.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-green-500/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{player.name}</h4>
                        <p className="text-xs text-muted-foreground">{player.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm text-green-500">{player.wickets} wickets</div>
                      <p className="text-xs text-muted-foreground">Econ: {player.economy}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2 text-green-500 text-xs hover:bg-green-500/10">
                  View Full Rankings
                </Button>
              </div>
            </Card>
            
            {/* Top All-Rounders */}
            <Card className="bg-gradient-to-b from-green-500/5 to-transparent border-green-500/10 shadow-lg shadow-green-500/5 overflow-hidden">
              <div className="p-4 border-b border-green-500/20 bg-green-500/10 backdrop-blur-sm flex justify-between items-center">
                <h3 className="font-semibold text-lg flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-green-500" />
                  Top All-Rounders
                </h3>
                <Badge className="bg-green-500/20 text-green-600 border-none">All-Round</Badge>
              </div>
              <div className="p-4">
                {topPerformers.allRounders.map((player, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-green-500/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 font-bold">
                        {player.rank}
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{player.name}</h4>
                        <p className="text-xs text-muted-foreground">{player.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-medium">
                        <span className="text-green-400">{player.runs} runs</span> • 
                        <span className="text-green-600"> {player.wickets} wkts</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" size="sm" className="w-full mt-2 text-green-500 text-xs hover:bg-green-500/10">
                  View Full Rankings
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* lederdashboard */}
          <Leaderboard/>

         {/* lederdashboard */}
        
        
        {/* Team and Matches Section */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Team Members Card */}
          <Card className="col-span-3 md:col-span-1 shadow-lg border-green-500/10 bg-gradient-to-br from-green-500/5 via-background to-background backdrop-blur-sm shadow-green-500/5">
            <div className="p-4 border-b border-green-500/20 bg-green-500/10 flex justify-between items-center">
              <h2 className="font-semibold text-lg flex items-center">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                My Team
              </h2>
              <Button variant="ghost" size="sm" className="text-green-500 text-xs hover:bg-green-500/10">View All</Button>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-green-500/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                        <Users className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <h4 className="font-medium text-sm">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{member.points} pts</div>
                      <p className={`text-xs ${getFormColor(member.form)}`}>{member.form}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-green-500/20 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Team Points</p>
                  <p className="text-xs text-muted-foreground">Last match</p>
                </div>
                <div className="text-xl font-bold text-green-500">1,547</div>
              </div>
            </div>
          </Card>
          
          {/* Matches Section */}
          <Card className="col-span-3 md:col-span-2 shadow-lg border-green-500/10 bg-gradient-to-br from-background via-background to-green-500/5 shadow-green-500/5">
            <Tabs defaultValue="ongoing" className="w-full">
              <div className="flex justify-between items-center p-4 border-b border-green-500/20 bg-green-500/5 backdrop-blur-sm">
                <h2 className="font-semibold text-lg flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-green-500" />
                  Matches
                </h2>
                <TabsList className="grid grid-cols-3 h-8 bg-background/80 backdrop-blur-sm">
                  <TabsTrigger value="ongoing" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">Ongoing</TabsTrigger>
                  <TabsTrigger value="upcoming" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">Upcoming</TabsTrigger>
                  <TabsTrigger value="completed" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">Completed</TabsTrigger>
                </TabsList>
              </div>
              
              {/* Ongoing Matches */}
              <TabsContent value="ongoing" className="p-4 space-y-4">
                {matches.ongoing.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    No ongoing matches at the moment
                  </div>
                ) : (
                  matches.ongoing.map(match => (
                    <Card key={match.id} className="p-4 border-none shadow-md bg-gradient-to-r from-green-600/10 to-green-400/5 backdrop-blur-sm shadow-green-500/5">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full -z-10 opacity-70"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <Badge variant="outline" className="bg-green-600/10 border-green-500/30 text-green-600 text-xs mb-2">
                            LIVE
                          </Badge>
                          <h3 className="font-semibold">{match.teams}</h3>
                          <p className="text-xs text-muted-foreground">{match.venue}</p>
                          <p className="text-sm font-medium mt-2">{match.score}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">{match.time}</p>
                          <div className="mt-4 px-3 py-2 bg-card/80 backdrop-blur-sm rounded-lg text-center shadow-sm border border-green-500/10">
                            <p className="text-xs text-muted-foreground">Your Points</p>
                            <p className="font-bold text-green-500">{match.teamScore}</p>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3 text-green-600 border-green-500/30 hover:bg-green-500/10">
                        Track Live
                      </Button>
                    </Card>
                  ))
                )}
              </TabsContent>
              
              {/* Upcoming Matches */}
              <TabsContent value="upcoming" className="p-4 space-y-4">
                {matches.upcoming.map(match => (
                  <Card key={match.id} className="p-4 hover:bg-green-500/5 transition-colors bg-green-500/5 border-none shadow-md shadow-green-500/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-bl-full -z-10 opacity-50"></div>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{match.teams}</h3>
                        <p className="text-xs text-muted-foreground">{match.venue}</p>
                        <div className="flex items-center mt-2 text-xs text-green-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {match.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 text-xs">
                          Upcoming
                        </Badge>
                        <div className="mt-3 text-xs text-muted-foreground italic">
                          {match.prediction}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="default" className="flex-1 bg-green-500 text-white hover:bg-green-600">
                        Create Team
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-green-500/30 text-green-600 hover:bg-green-500/10">
                        Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </TabsContent>
              
              {/* Completed Matches */}
              <TabsContent value="completed" className="p-4 space-y-4">
                {matches.completed.map(match => (
                  <Card key={match.id} className="p-4 hover:bg-green-500/5 transition-colors border-none shadow-md bg-green-500/5 backdrop-blur-sm shadow-green-500/5">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-bl-full -z-10 opacity-50"></div>
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold">{match.teams}</h3>
                        <p className="text-sm text-muted-foreground">{match.result}</p>
                        <div className="flex items-center mt-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {match.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="border border-green-500/20 rounded-lg p-2 text-center bg-card/50 backdrop-blur-sm shadow-sm">
                          <p className="text-xs text-muted-foreground">Your Score</p>
                          <div className="flex items-end justify-center gap-1">
                            <span className="font-bold text-green-500 text-xl">{match.teamScore}</span>
                            <span className="text-xs text-muted-foreground">/ {match.maxScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-3 border-green-500/30 text-green-600 hover:bg-green-500/10">
                      View Summary
                    </Button>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
        
       
      </div>
    </DashboardLayout>
  );
}