import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Medal, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  ChevronRight, 
  ChevronLeft, 
  Star, 
  Crown 
} from 'lucide-react';

// Sample Leaderboard Data
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
  
  // Add more sample teams
  ...Array.from({ length: 40 }, (_, i) => ({
    id: i + 4,
    rank: i + 4,
    name: `Team ${i + 4}`,
    university: `University ${i + 4}`,
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

// Add a custom team
const customTeamIndex = fullLeaderboardData.findIndex(team => team.rank === 42);
if (customTeamIndex !== -1) {
  fullLeaderboardData[customTeamIndex] = {
    ...fullLeaderboardData[customTeamIndex],
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

// Leaderboard Component
export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy, setSortBy] = useState('rank');
  const [sortDirection, setSortDirection] = useState('desc');

  // Get badge info helper
  const getBadgeInfo = (badge: any) => {
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

  // Filtered and Sorted Data
  const filteredAndSortedData = useMemo(() => {
    // Filter
    const filtered = fullLeaderboardData.filter(team => 
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      team.university.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Sort
    return filtered.sort((a, b) => {
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
        default:
          comparison = a.rank - b.rank;
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [searchQuery, sortBy, sortDirection]);

  // Paginated Data
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * pageSize, 
    currentPage * pageSize
  );

  // Total Pages
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);

  // Handle Sorting
  const handleSort = (field: React.SetStateAction<string>) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
  };

  return (
    <div className="space-y-6">
      {/* Leaderboard Card */}
      <Card className="border-green-500/10 shadow-lg overflow-hidden">
        <div className="p-4 border-b border-green-500/20 bg-green-500/5 flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="relative md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search teams..."
              className="pl-10 border-green-500/20 focus-visible:ring-green-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1}-
              {Math.min(currentPage * pageSize, filteredAndSortedData.length)} 
              of {filteredAndSortedData.length} teams
            </p>
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-auto border-green-500/20 text-green-600 text-xs hover:bg-green-500/10"
                onClick={() => handleSort(sortBy)}
              >
                <Filter className="h-3.5 w-3.5 mr-1" /> 
                Sort: {sortBy} 
                {sortDirection === 'asc' ? '↑' : '↓'}
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-500/10 bg-green-500/5">
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Rank</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Team</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground hidden md:table-cell">University</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground">Points</th>
                <th className="text-left py-3 px-4 text-xs uppercase tracking-wider font-semibold text-muted-foreground hidden sm:table-cell">Change</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((team) => (
                <tr 
                  key={team.id} 
                  className={`border-b border-green-500/10 hover:bg-green-500/5 transition-colors ${
                    team.isYourTeam ? 'bg-green-500/10' : ''
                  }`}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <span className={`${team.isYourTeam ? 'font-bold text-green-600' : ''}`}>
                        {team.rank}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8 border border-green-500/20">
                        {team.avatar ? (
                          <AvatarImage src={team.avatar} alt={team.name} />
                        ) : (
                          <AvatarFallback className={`${
                            team.isYourTeam ? 'bg-green-500 text-white' : 'bg-muted'
                          }`}>
                            {team.name.substring(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div>
                        <p className={`font-semibold ${team.isYourTeam ? 'text-green-600' : ''}`}>
                          {team.name}
                          {team.isYourTeam && <span className="ml-2 text-xs">(You)</span>}
                        </p>
                        <div className="md:hidden text-xs text-muted-foreground">{team.university}</div>
                        {team.badge && (
                          <Badge className={`${getBadgeInfo(team.badge).color} text-xs mt-1`}>
                            {getBadgeInfo(team.badge).icon}
                            {team.badge === 'legend' ? 'Legend' : 
                             team.badge === 'gold' ? 'Gold' : 
                             team.badge === 'silver' ? 'Silver' : 
                             team.badge === 'bronze' ? 'Bronze' : 
                             team.badge === 'rising' ? 'Rising Star' : team.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 hidden md:table-cell">
                    <p className="text-muted-foreground">{team.university}</p>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-semibold">{team.points.toLocaleString()}</p>
                  </td>
                  <td className="py-4 px-4 hidden sm:table-cell">
                    <Badge className={`
                      ${team.change.startsWith('+') ? 'bg-green-500/10 text-green-600 border-green-500/30' : 
                        team.change === '0' ? 'bg-gray-500/10 text-gray-600 border-gray-500/30' : 
                        'bg-red-500/10 text-red-600 border-red-500/30'}
                    `}>
                      {team.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                      team.change === '0' ? null : 
                      <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {team.change}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

 {/* Pagination */}
 <div className="p-4 border-t border-green-500/10 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-green-500/30 text-green-600 hover:bg-green-500/10 disabled:opacity-50"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-green-500/30 text-green-600 hover:bg-green-500/10 disabled:opacity-50"
            >
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}