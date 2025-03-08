"use client"

import React, { useState } from 'react';
import { 
  Users, 
  Trophy, 
  Shield, 
  UserCheck, 
  Calendar, 
  BarChart3,
  Star,
  Zap,
  Target,
  Activity
} from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Team Details Interfaces
interface Player {
  id: number;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  age: number;
  battingStyle: string;
  bowlingStyle?: string;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    average?: number;
    strikeRate?: number;
  };
}

interface Match {
  id: number;
  date: string;
  opponent: string;
  result: 'Won' | 'Lost' | 'Draw';
  venue: string;
  scorecard?: {
    runs: number;
    wickets: number;
    overs: number;
  };
}

interface TeamDetails {
  id: number;
  name: string;
  university: string;
  logo?: string;
  founded: number;
  captain: string;
  coach: string;
  points: number;
  rank: number;
  stats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
  };
  players: Player[];
  matches: Match[];
}

// TeamDetailsContent Component
export default function TeamDetailsContent({ team }: { team: TeamDetails }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Team Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center">
            <img 
              src={team.logo || '/default-team-logo.png'} 
              alt={`${team.name} logo`} 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-green-600">{team.name}</h1>
            <p className="text-muted-foreground">{team.university}</p>
            <div className="flex items-center space-x-4 mt-2">
              <Badge variant="outline" className="bg-green-500/10 text-green-600">
                Rank #{team.rank}
              </Badge>
              <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                Founded {team.founded}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50">
            <Trophy className="mr-2 h-4 w-4" /> Team Stats
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Users className="mr-2 h-4 w-4" /> Manage Team
          </Button>
        </div>
      </div>

      {/* Team Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4 bg-neutral-100 dark:bg-neutral-800">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" /> Overview
          </TabsTrigger>
          <TabsTrigger value="players" className="flex items-center gap-2">
            <Users className="h-4 w-4" /> Players
          </TabsTrigger>
          <TabsTrigger value="matches" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Matches
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <Activity className="h-4 w-4" /> Performance
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Team Performance Card */}
            <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Trophy className="h-6 w-6 text-green-600" />
                  <h3 className="text-lg font-semibold">Team Performance</h3>
                </div>
                <Badge variant="outline" className="bg-green-500/10 text-green-600">
                  Season 2023
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <span className="text-2xl font-bold text-green-600">{team.stats.matches}</span>
                  <p className="text-sm text-muted-foreground">Total Matches</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-blue-600">{team.stats.wins}</span>
                  <p className="text-sm text-muted-foreground">Wins</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-red-600">{team.stats.losses}</span>
                  <p className="text-sm text-muted-foreground">Losses</p>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-600">{team.stats.draws}</span>
                  <p className="text-sm text-muted-foreground">Draws</p>
                </div>
              </div>
            </Card>

            {/* Team Leadership Card */}
            <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <h3 className="text-lg font-semibold">Team Leadership</h3>
                </div>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
                  Key Roles
                </Badge>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserCheck className="h-6 w-6 text-green-600" />
                    <div>
                      <p className="font-medium">Captain</p>
                      <p className="text-sm text-muted-foreground">{team.captain}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Target className="h-6 w-6 text-blue-600" />
                    <div>
                      <p className="font-medium">Coach</p>
                      <p className="text-sm text-muted-foreground">{team.coach}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Team Points Card */}
            <Card className="p-6 bg-gradient-to-br from-red-500/5 to-red-500/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Star className="h-6 w-6 text-red-600" />
                  <h3 className="text-lg font-semibold">Points & Ranking</h3>
                </div>
                <Badge variant="outline" className="bg-red-500/10 text-red-600">
                  Current Season
                </Badge>
              </div>
              <div className="text-center">
                <span className="text-4xl font-bold text-red-600">{team.points}</span>
                <p className="text-sm text-muted-foreground mt-2">Total Points</p>
                <div className="mt-4 flex justify-center">
                  <Badge variant="outline" className="bg-red-500/10 text-red-600">
                    Rank #{team.rank}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Players Tab */}
        <TabsContent value="players" className="mt-6">
          <div className="grid md:grid-cols-3 gap-6">
            {team.players.map((player) => (
              <Card key={player.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <UserCheck className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{player.name}</h4>
                      <p className="text-sm text-muted-foreground">{player.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-blue-500/10 text-blue-600"
                  >
                    {player.age} yrs
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="block text-lg font-bold text-green-600">
                      {player.stats.matches}
                    </span>
                    <p className="text-xs text-muted-foreground">Matches</p>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-blue-600">
                      {player.role === 'Batsman' 
                        ? player.stats.runs 
                        : player.role === 'Bowler' 
                        ? player.stats.wickets 
                        : 'N/A'}
                    </span>
                    <p className="text-xs text-muted-foreground">
                      {player.role === 'Batsman' ? 'Runs' : 'Wickets'}
                    </p>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-red-600">
                      {player.stats.average?.toFixed(1) || 'N/A'}
                    </span>
                    <p className="text-xs text-muted-foreground">Average</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Matches Tab */}
        <TabsContent value="matches" className="mt-6">
          <div className="space-y-4">
            {team.matches.map((match) => (
              <Card key={match.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h4 className="font-semibold">vs {match.opponent}</h4>
                    <p className="text-sm text-muted-foreground">{match.date}</p>
                  </div>
                  <Badge 
                    variant="outline"
                    className={`
                      ${match.result === 'Won' 
                        ? 'bg-green-500/10 text-green-600 border-green-500/30'
                        : match.result === 'Lost'
                        ? 'bg-red-500/10 text-red-600 border-red-500/30'
                        : 'bg-gray-500/10 text-gray-600 border-gray-500/30'
                      }
                    `}
                  >
                    {match.result}
                  </Badge>
                </div>
                {match.scorecard && (
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <span className="block text-lg font-bold text-green-600">
                        {match.scorecard.runs}
                      </span>
                      <p className="text-xs text-muted-foreground">Runs</p>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-red-600">
                        {match.scorecard.wickets}
                      </span>
                      <p className="text-xs text-muted-foreground">Wickets</p>
                    </div>
                    <div>
                      <span className="block text-lg font-bold text-blue-600">
                        {match.scorecard.overs}
                      </span>
                      <p className="text-xs text-muted-foreground">Overs</p>
                    </div>
                  </div>
                )}
                <div className="mt-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{match.venue}</span>
                  </div>
                  <Button variant="outline" size="sm" className="border-green-600 text-green-600">
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

<TabsContent value="performance" className="mt-6">
  <div className="grid md:grid-cols-2 gap-6">
    {/* Batting Performance */}
    <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Target className="h-6 w-6 text-green-600" />
          <h3 className="text-lg font-semibold">Batting Performance</h3>
        </div>
        <Badge variant="outline" className="bg-green-500/10 text-green-600">
          Season Stats
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-2xl font-bold text-green-600">
            {team.players.reduce((sum, player) => sum + (player.stats.runs || 0), 0)}
          </span>
          <p className="text-sm text-muted-foreground">Total Runs</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">
            {(team.players.reduce((sum, player) => sum + (player.stats.average || 0), 0) / team.players.length).toFixed(1)}
          </span>
          <p className="text-sm text-muted-foreground">Avg Batting Average</p>
        </div>
      </div>
    </Card>

    {/* Bowling Performance */}
    <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Zap className="h-6 w-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Bowling Performance</h3>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
          Season Stats
        </Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600">
            {team.players.reduce((sum, player) => sum + (player.stats.wickets || 0), 0)}
          </span>
          <p className="text-sm text-muted-foreground">Total Wickets</p>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-red-600">
            {(team.players.reduce((sum, player) => sum + (player.stats.average || 0), 0) / team.players.length).toFixed(1)}
          </span>
          <p className="text-sm text-muted-foreground">Avg Bowling Average</p>
        </div>
      </div>
    </Card>
  </div>
</TabsContent>
        </Tabs>
      </div>
  );
}