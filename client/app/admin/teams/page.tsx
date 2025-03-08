"use client"

import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Trophy, 
  Shield, 
  UserPlus, 
  Calendar, 
  BarChart3,
  Medal,
  Grid,
  UserCheck
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AdminDashboardLayout from '@/components/admin-layout';
import Link from 'next/link';

// Team Interface
interface Team {
  id: number;
  name: string;
  university: string;
  logo?: string;
  founded: number;
  captain: string;
  coach: string;
  points: number;
  rank: number;
  players: number;
  stats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
  };
}

// Sample Teams Data
const initialTeams: Team[] = [
  {
    id: 1,
    name: "Thunderbolts",
    university: "University of Colombo",
    logo: "/team-logos/thunderbolts.png",
    founded: 2015,
    captain: "Ashan Fernando",
    coach: "Kumara Sangakkara",
    points: 2850,
    rank: 1,
    players: 15,
    stats: {
      matches: 50,
      wins: 35,
      losses: 10,
      draws: 5
    }
  },
  {
    id: 2,
    name: "Cricket Kings",
    university: "University of Peradeniya",
    logo: "/team-logos/cricket-kings.png",
    founded: 2017,
    captain: "Lakshan Perera",
    coach: "Mahela Jayawardene",
    points: 2720,
    rank: 2,
    players: 14,
    stats: {
      matches: 48,
      wins: 32,
      losses: 12,
      draws: 4
    }
  }
];

export default function TeamsPage() {
  const [teams, setTeams] = useState<Team[]>(initialTeams);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isAddTeamDialogOpen, setIsAddTeamDialogOpen] = useState(false);

  // New Team Form State
  const [newTeam, setNewTeam] = useState({
    name: '',
    university: '',
    captain: '',
    coach: ''
  });

  const handleAddTeam = () => {
    const teamToAdd: Team = {
      ...newTeam,
      id: teams.length + 1,
      founded: new Date().getFullYear(),
      logo: '',
      points: 0,
      rank: teams.length + 1,
      players: 0,
      stats: {
        matches: 0,
        wins: 0,
        losses: 0,
        draws: 0
      }
    };

    setTeams([...teams, teamToAdd]);
    setIsAddTeamDialogOpen(false);
    // Reset form
    setNewTeam({
      name: '',
      university: '',
      captain: '',
      coach: ''
    });
  };

  return (
     <AdminDashboardLayout>
        <div className="container mx-auto p-6 space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-green-600 flex items-center">
            <Users className="mr-3 h-8 w-8" /> 
            Team Management
          </h1>
          <p className="text-muted-foreground">Manage and track your cricket teams</p>
        </div>
        <Button 
          onClick={() => setIsAddTeamDialogOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New Team
        </Button>
      </div>

      {/* Team Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-to-br from-green-500/5 to-green-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold">Total Teams</h3>
            </div>
            <Badge variant="outline" className="bg-green-500/10 text-green-600">
              Overview
            </Badge>
          </div>
          <div className="text-center">
            <span className="text-4xl font-bold text-green-600">{teams.length}</span>
            <p className="text-muted-foreground">Active Teams</p>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-500/5 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Medal className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Top Performing Teams</h3>
            </div>
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600">
              Ranking
            </Badge>
          </div>
          <div className="space-y-2">
            {teams
              .sort((a, b) => b.points - a.points)
              .slice(0, 2)
              .map((team) => (
                <div 
                  key={team.id} 
                  className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/70"
                >
                  <div>
                    <h4 className="font-medium">{team.name}</h4>
                    <p className="text-xs text-muted-foreground">{team.university}</p>
                  </div>
                  <span className="font-semibold text-blue-600">{team.points} pts</span>
                </div>
              ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-red-500/5 to-red-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-red-600" />
              <h3 className="text-lg font-semibold">Performance Metrics</h3>
            </div>
            <Badge variant="outline" className="bg-red-500/10 text-red-600">
              Stats
            </Badge>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <span className="text-2xl font-bold text-green-600">
                {teams.reduce((sum, team) => sum + team.stats.wins, 0)}
              </span>
              <p className="text-xs text-muted-foreground">Total Wins</p>
            </div>
            <div className="text-center">
              <span className="text-2xl font-bold text-red-600">
                {teams.reduce((sum, team) => sum + team.stats.losses, 0)}
              </span>
              <p className="text-xs text-muted-foreground">Total Losses</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Teams Grid */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <Grid className="mr-3 h-6 w-6 text-green-600" /> 
          All Teams
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map((team) => (
             <Link 
             key={team.id} 
             href={`/admin/teams/${team.id}`}  // This is the key change for navigation
           >
            <Card 
              key={team.id} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center">
                      <UserCheck className="text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{team.name}</h3>
                      <p className="text-sm text-muted-foreground">{team.university}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="bg-green-500/10 text-green-600"
                  >
                    Rank #{team.rank}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <span className="block text-lg font-bold text-green-600">{team.players}</span>
                    <p className="text-xs text-muted-foreground">Players</p>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-blue-600">{team.points}</span>
                    <p className="text-xs text-muted-foreground">Points</p>
                  </div>
                  <div>
                    <span className="block text-lg font-bold text-red-600">{team.founded}</span>
                    <p className="text-xs text-muted-foreground">Founded</p>
                  </div>
                </div>
              </div>
            </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Add Team Dialog */}
      <Dialog open={isAddTeamDialogOpen} onOpenChange={setIsAddTeamDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <UserPlus className="mr-3 h-6 w-6 text-green-600" />
              Add New Team
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">Team Name</label>
              <Input 
                id="name" 
                className="col-span-3" 
                value={newTeam.name}
                onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="university" className="text-right">University</label>
              <Input 
                id="university" 
                className="col-span-3" 
                value={newTeam.university}
                onChange={(e) => setNewTeam({...newTeam, university: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="captain" className="text-right">Captain</label>
              <Input 
                id="captain" 
                className="col-span-3" 
                value={newTeam.captain}
                onChange={(e) => setNewTeam({...newTeam, captain: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="coach" className="text-right">Coach</label>
              <Input 
                id="coach" 
                className="col-span-3" 
                value={newTeam.coach}
                onChange={(e) => setNewTeam({...newTeam, coach: e.target.value})}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button 
              onClick={handleAddTeam} 
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Create Team
            </Button>
          </div>
        </DialogContent>
      </Dialog>


</div>

     </AdminDashboardLayout>
  )

}