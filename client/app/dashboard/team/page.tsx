"use client"

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { playerData } from '@/lib/sample-data';
import { 
  Ticket as Cricket, 
  Users, 
  Trophy, 
  DollarSign, 
  Filter, 
  Search, 
  ChevronDown, 
  SlidersHorizontal, 
  PlusCircle, 
  UserX, 
  Star, 
  BarChart3, 
  Sparkles,
  Clock,
  Check,
  Info,
  Shield,
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';

export default function TeamPage() {
  const [activeView, setActiveView] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');

  const categories = ['All', 'Batsman', 'Bowler', 'All-Rounder'];

  // Extended sample players data for 15 players
  const sampleTeamPlayers = [
    { id: 1, name: "Virat Kumar", role: "Batsman", university: "Delhi University", points: 342, form: "Excellent", batting: 92, bowling: 12, fielding: 85, price: 125, matches: 8, runs: 520, wickets: 2, starred: true },
    { id: 2, name: "Rohit Shah", role: "Batsman", university: "Mumbai College", points: 289, form: "Good", batting: 88, bowling: 15, fielding: 80, price: 110, matches: 8, runs: 456, wickets: 0, starred: false },
    { id: 3, name: "Ravindra Singh", role: "All-Rounder", university: "Gujarat University", points: 315, form: "Excellent", batting: 75, bowling: 82, fielding: 90, price: 130, matches: 8, runs: 310, wickets: 12, starred: true },
    { id: 4, name: "Jasprit Patel", role: "Bowler", university: "Rajasthan College", points: 278, form: "Good", batting: 35, bowling: 95, fielding: 78, price: 105, matches: 8, runs: 68, wickets: 15, starred: false },
    { id: 5, name: "Hardik Gupta", role: "All-Rounder", university: "Baroda Institute", points: 264, form: "Average", batting: 72, bowling: 75, fielding: 80, price: 100, matches: 7, runs: 245, wickets: 8, starred: false },
    { id: 6, name: "Suryakumar Yadav", role: "Batsman", university: "Mumbai University", points: 302, form: "Good", batting: 90, bowling: 20, fielding: 92, price: 120, matches: 8, runs: 492, wickets: 0, starred: true },
    { id: 7, name: "Yuzvendra Chahal", role: "Bowler", university: "Haryana College", points: 256, form: "Good", batting: 22, bowling: 89, fielding: 70, price: 90, matches: 8, runs: 12, wickets: 16, starred: false },
    { id: 8, name: "Rishabh Pandit", role: "Batsman", university: "Delhi Institute", points: 238, form: "Excellent", batting: 85, bowling: 10, fielding: 75, price: 95, matches: 7, runs: 342, wickets: 0, starred: false },
    { id: 9, name: "Ravichandran Ashwin", role: "All-Rounder", university: "Chennai University", points: 272, form: "Good", batting: 65, bowling: 88, fielding: 72, price: 115, matches: 8, runs: 156, wickets: 12, starred: false },
    { id: 10, name: "Mohammed Shami", role: "Bowler", university: "UP Technical", points: 255, form: "Average", batting: 25, bowling: 91, fielding: 68, price: 98, matches: 8, runs: 22, wickets: 18, starred: false },
    { id: 11, name: "KL Rahul", role: "Batsman", university: "Karnataka College", points: 276, form: "Excellent", batting: 91, bowling: 5, fielding: 82, price: 118, matches: 6, runs: 385, wickets: 0, starred: false },
  ];
  
  // Sample available players
  const availablePlayers = [
    { id: 12, name: "Shreyas Iyer", role: "Batsman", university: "Mumbai Sports Academy", points: 268, form: "Good", batting: 86, bowling: 18, fielding: 85, price: 102, matches: 6, runs: 328, wickets: 0 },
    { id: 13, name: "Axar Patel", role: "All-Rounder", university: "Gujarat State", points: 250, form: "Good", batting: 68, bowling: 85, fielding: 80, price: 96, matches: 7, runs: 184, wickets: 10 },
    { id: 14, name: "Shardul Thakur", role: "All-Rounder", university: "Mumbai University", points: 243, form: "Average", batting: 60, bowling: 80, fielding: 78, price: 88, matches: 7, runs: 125, wickets: 12 },
    { id: 15, name: "Deepak Chahar", role: "Bowler", university: "Rajasthan Institute", points: 235, form: "Excellent", batting: 45, bowling: 87, fielding: 75, price: 85, matches: 6, runs: 65, wickets: 14 },
  ];

  // Get the total price of the team
  const totalTeamPrice = sampleTeamPlayers.reduce((sum, player) => sum + player.price, 0);
  
  // Get role counts for team balance visualization
  const roleCount = {
    Batsman: sampleTeamPlayers.filter(p => p.role === "Batsman").length,
    Bowler: sampleTeamPlayers.filter(p => p.role === "Bowler").length,
    "All-Rounder": sampleTeamPlayers.filter(p => p.role === "All-Rounder").length
  };

  // Get skill distribution for team balance
  const teamSkills = {
    batting: Math.round(sampleTeamPlayers.reduce((sum, player) => sum + player.batting, 0) / sampleTeamPlayers.length),
    bowling: Math.round(sampleTeamPlayers.reduce((sum, player) => sum + player.bowling, 0) / sampleTeamPlayers.length),
    fielding: Math.round(sampleTeamPlayers.reduce((sum, player) => sum + player.fielding, 0) / sampleTeamPlayers.length)
  };

  const filteredPlayers = availablePlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || player.role === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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

  // Get badge color based on player role
  const getRoleBadgeStyle = (role: string) => {
    switch(role) {
      case "Batsman": return "bg-green-500/10 text-green-600 border-green-500/30";
      case "Bowler": return "bg-purple-500/10 text-purple-600 border-purple-500/30";
      case "All-Rounder": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      default: return "bg-gray-500/10 text-gray-600 border-gray-500/30";
    }
  };

  return (
  <DashboardLayout>
      <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 md:p-6 rounded-xl bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/10 border border-green-200/50 dark:border-green-800/20">
        <div>
          <h1 className="heading-2 text-green-800 dark:text-green-300 flex items-center gap-2">
            <Shield className="h-6 w-6" /> My Team
          </h1>
          <p className="text-green-600/80 dark:text-green-400/80 mt-1">Build and manage your dream cricket team</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Sparkles className="w-4 h-4 mr-2" />
            Auto Complete Team
          </Button>
          <Button variant="outline" className="border-green-500/30 text-green-600 hover:bg-green-500/10">
            <BarChart3 className="w-4 h-4 mr-2" />
            Team Analysis
          </Button>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-lg shadow-green-500/5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full z-0"></div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-start mb-1">
              <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                <Users className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mt-2">Team Size</h3>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-bold text-green-600">{sampleTeamPlayers.length}</span>
              <span className="text-lg text-green-600/70">/11</span>
            </div>
            <Progress value={(sampleTeamPlayers.length / 11) * 100} className="h-1.5 mt-2 bg-background/50" 
                   />
            <p className="text-xs text-green-600/70 mt-1">Need {11 - sampleTeamPlayers.length} more players</p>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-lg shadow-green-500/5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full z-0"></div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-start mb-1">
              <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mt-2">Budget</h3>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-bold text-green-600">${1000 - totalTeamPrice}</span>
              <span className="text-sm text-green-600/70 self-end mb-1">remaining</span>
            </div>
            <Progress value={((1000 - totalTeamPrice) / 1000) * 100} className="h-1.5 mt-2 bg-background/50" 
                 />
            <p className="text-xs text-green-600/70 mt-1">${totalTeamPrice} used of $1000</p>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-lg shadow-green-500/5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full z-0"></div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-start mb-1">
              <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                <Trophy className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mt-2">Performance</h3>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-bold text-green-600">2,784</span>
              <span className="text-sm text-green-600/70 self-end mb-1">points</span>
            </div>
            
            <div className="mt-2 flex items-center gap-1">
              <Badge variant="outline" className="bg-green-500/10 text-green-600 text-xs border-green-500/20">
                <TrendingUp className="h-3 w-3 mr-1" />
                +128 points
              </Badge>
              <p className="text-xs text-green-600/70">last match</p>
            </div>
          </div>
        </Card>

        <Card className="overflow-hidden bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/10 shadow-lg shadow-green-500/5">
          <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-bl-full z-0"></div>
          <div className="p-5 relative z-10">
            <div className="flex justify-between items-start mb-1">
              <div className="p-2 rounded-xl bg-green-500/20 backdrop-blur-sm">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
            </div>
            <h3 className="text-muted-foreground text-sm font-medium mt-2">Next Match</h3>
            <div className="flex items-end gap-1 mt-1">
              <span className="text-2xl font-bold text-green-600">2d 14h</span>
              <span className="text-sm text-green-600/70 self-end mb-1">left</span>
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-green-600/70">Dragons vs Lions</p>
              <Button size="sm" variant="link" className="text-green-600 p-0 h-auto text-xs mt-1">
                View Details
              </Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Team Balance Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 shadow-lg border-green-500/10 overflow-hidden">
          <div className="p-4 border-b border-green-500/20 bg-green-500/5">
            <h2 className="font-semibold text-lg flex items-center">
              <BarChart3 className="h-4 w-4 mr-2 text-green-500" />
              Team Balance
            </h2>
          </div>
          <div className="p-5 space-y-6">
            {/* Role distribution */}
            <div>
              <h3 className="text-sm font-medium mb-3 flex justify-between">
                <span>Role Distribution</span>
                <span className="text-xs text-green-600">{sampleTeamPlayers.length} players</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-3 rounded-lg bg-green-500/5 border border-green-500/10">
                  <p className="text-xl font-bold text-green-600">{roleCount.Batsman}</p>
                  <p className="text-xs text-muted-foreground">Batsmen</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/5 border border-purple-500/10">
                  <p className="text-xl font-bold text-purple-600">{roleCount.Bowler}</p>
                  <p className="text-xs text-muted-foreground">Bowlers</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                  <p className="text-xl font-bold text-blue-600">{roleCount["All-Rounder"]}</p>
                  <p className="text-xs text-muted-foreground">All-rounders</p>
                </div>
              </div>
            </div>

            {/* Skill distribution */}
            <div>
              <h3 className="text-sm font-medium mb-3">Team Skill Distribution</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Batting</span>
                    <span className="font-medium">{teamSkills.batting}/100</span>
                  </div>
                  <Progress value={teamSkills.batting} className="h-2 bg-background/50" 
                            />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Bowling</span>
                    <span className="font-medium">{teamSkills.bowling}/100</span>
                  </div>
                  <Progress value={teamSkills.bowling} className="h-2 bg-background/50" 
                         />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>Fielding</span>
                    <span className="font-medium">{teamSkills.fielding}/100</span>
                  </div>
                  <Progress value={teamSkills.fielding} className="h-2 bg-background/50" 
                           />
                </div>
              </div>
            </div>

            {/* Team status indicators */}
            <div className="border-t border-green-500/10 pt-4">
              <h3 className="text-sm font-medium mb-3">Team Status</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  {sampleTeamPlayers.length === 11 ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <span>Full team of 11 players</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {teamSkills.batting >= 70 ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <span>Strong batting lineup</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {teamSkills.bowling >= 70 ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <span>Balanced bowling attack</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  {roleCount["All-Rounder"] >= 3 ? (
                    <Check className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                  )}
                  <span>Sufficient all-rounders</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="md:col-span-2 shadow-lg border-green-500/10 overflow-hidden">
          <Tabs defaultValue="current" className="w-full">
            <div className="flex justify-between items-center p-4 border-b border-green-500/20">
              <h2 className="font-semibold text-lg flex items-center">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                Team Lineup
              </h2>
              <TabsList className="grid grid-cols-2 h-8 bg-green-500/5">
                <TabsTrigger value="current" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">Current Squad</TabsTrigger>
                <TabsTrigger value="available" className="text-xs data-[state=active]:bg-green-500 data-[state=active]:text-white">Available Players</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="current" className="p-0 m-0">
              <div className="p-4 bg-green-500/5 border-b border-green-500/10 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                  <Info className="h-4 w-4 text-green-500" />
                  <p className="text-sm text-green-700">Star your favorite players to prioritize them in the lineup</p>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="ml-auto border-green-500/20 text-green-600 text-xs hover:bg-green-500/10">
                      <SlidersHorizontal className="h-3.5 w-3.5 mr-1" /> Sort By
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setSortBy('name')}>Name</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('points')}>Points</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setSortBy('role')}>Role</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
                {sampleTeamPlayers.map((player) => (
                  <Card key={player.id} className="flex overflow-hidden border-green-500/10 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <div className={`w-2 ${
                      player.role === 'Batsman' ? 'bg-green-500' : 
                      player.role === 'Bowler' ? 'bg-purple-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <div className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-1">
                            <h3 className="font-semibold">{player.name}</h3>
                            {player.starred && (
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">{player.university}</p>
                          <div className="mt-1 flex items-center gap-1.5">
                            <Badge className={`text-xs ${getRoleBadgeStyle(player.role)}`}>
                              {player.role}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-green-500/5 text-green-600 border-green-500/20">
                              ${player.price}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-amber-500 hover:text-amber-600 hover:bg-amber-500/10">
                            <Star className={`h-4 w-4 ${player.starred ? 'fill-amber-400' : ''}`} />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-red-500 hover:text-red-600 hover:bg-red-500/10">
                            <UserX className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* <div className="mt-3 pt-3 border-t border-green-500/10 grid grid-cols-5 gap-2">
                        <div className="col-span-2">
                          <div className="text-xs text-muted-foreground mb-1">Match Form</div>
                          <div className={`text-sm font-medium ${getFormColor(player.form)}`}>{player.form}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Points</div>
                          <div className="text-sm font-medium">{player.points}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Runs</div>
                          <div className="text-sm font-medium">{player.runs}</div>
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Wickets</div>
                          <div className="text-sm font-medium">{player.wickets}</div>
                        </div>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-3 gap-1.5">
                        <div>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span>Batting</span>
                            <span>{player.batting}</span>
                          </div>
                          <Progress value={player.batting} className="h-1.5" indicatorClassName="bg-green-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span>Bowling</span>
                            <span>{player.bowling}</span>
                          </div>
                          <Progress value={player.bowling} className="h-1.5" indicatorClassName="bg-purple-500" />
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-0.5">
                            <span>Fielding</span>
                            <span>{player.fielding}</span>
                          </div>
                          <Progress value={player.fielding} className="h-1.5" indicatorClassName="bg-blue-500" />
                        </div>
                      </div> */}
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="available" className="p-0 m-0">
              <div className="p-4 bg-green-500/5 border-b border-green-500/10 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search players..."
                    className="pl-10 border-green-500/20 focus-visible:ring-green-500/30"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      onClick={() => setSelectedCategory(category)}
                      className={selectedCategory === category ? 
                        "bg-green-500 hover:bg-green-600 text-white" : 
                        "border-green-500/20 text-green-600 hover:bg-green-500/10"
                      }
                      size="sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
          {filteredPlayers.map((player) => (
            <Card key={player.id} className="flex overflow-hidden border-green-500/10 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className={`w-2 ${
                player.role === 'Batsman' ? 'bg-green-500' : 
                player.role === 'Bowler' ? 'bg-purple-500' : 
                'bg-blue-500'
              }`}></div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{player.name}</h3>
                    <p className="text-xs text-muted-foreground">{player.university}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <Badge className={`text-xs ${getRoleBadgeStyle(player.role)}`}>
                        {player.role}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-green-500/5 text-green-600 border-green-500/20">
                        ${player.price}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <PlusCircle className="h-3.5 w-3.5 mr-1" /> Add
                  </Button>
                </div>
                
                <div className="mt-3 pt-3 border-t border-green-500/10 grid grid-cols-5 gap-2">
                  <div className="col-span-2">
                    <div className="text-xs text-muted-foreground mb-1">Match Form</div>
                    <div className={`text-sm font-medium ${getFormColor(player.form)}`}>{player.form}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Points</div>
                    <div className="text-sm font-medium">{player.points}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Runs</div>
                    <div className="text-sm font-medium">{player.runs}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Wickets</div>
                    <div className="text-sm font-medium">{player.wickets}</div>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-3 gap-1.5">
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span>Batting</span>
                      <span>{player.batting}</span>
                    </div>
                    <Progress value={player.batting} className="h-1.5"  />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span>Bowling</span>
                      <span>{player.bowling}</span>
                    </div>
                    <Progress value={player.bowling} className="h-1.5"  />
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-0.5">
                      <span>Fielding</span>
                      <span>{player.fielding}</span>
                    </div>
                    <Progress value={player.fielding} className="h-1.5"  />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
        </TabsContent>
        </Tabs>
      </Card>
    </div>
  </div>
  </DashboardLayout>
  

);}

      


