"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  Trophy,
  Target,
  Filter,
  Activity,
  PlusCircle,
  Trash2,
  Edit,
  ChevronDown,
  Star,
  Shield,
  Zap,
  BarChart2,
  AlertCircle,
  Search,
  ArrowUpRight,
  ArrowRight,
  Check,
  FileText,
  UserPlus,
  DollarSign,
  CreditCard
} from 'lucide-react';
import AdminDashboardLayout from '@/components/admin-layout';

// Sample Data Types and Interfaces
interface Match {
  id: number;
  homeTeam: string;
  homeUniversity: string;
  awayTeam: string;
  awayUniversity: string;
  homeScore: number | null;
  awayScore: number | null;
  homeWickets: number | null;
  awayWickets: number | null;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
  ground: string;
  overs?: number;
  inningNumber?: number;
  tossWinner?: string;
  tossDecision?: 'bat' | 'bowl';
  umpires?: string[];
  highlights?: string[];
}

interface MatchCounts {
  upcoming: number;
  ongoing: number;
  completed: number;
  total: number;
}

interface Team {
  id: number;
  name: string;
  university: string;
  points: number;
  players: number;
  rank: number;
  change: string;
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

export default function MatchesPage() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<Match[]>([]);
  const [tabValue, setTabValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [matchCounts, setMatchCounts] = useState<MatchCounts>({
    upcoming: 0,
    ongoing: 0,
    completed: 0,
    total: 0
  });
  const [showAllTeams, setShowAllTeams] = useState(false);
  const [topTeams, setTopTeams] = useState<Team[]>([]);
  const [topPerformers, setTopPerformers] = useState<{
    batsmen: TopPerformer[];
    bowlers: TopPerformer[];
  }>({
    batsmen: [],
    bowlers: []
  });
  
  const router = useRouter();
  
  useEffect(() => {
    // Fetch matches from API
    // For demo purposes, we'll use dummy data
    const dummyMatches: Match[] = [
      {
        id: 1,
        homeTeam: "Team Thunder",
        homeUniversity: "University of Colombo",
        awayTeam: "Cricket Kings",
        awayUniversity: "University of Peradeniya",
        date: "2025-03-15T15:00:00",
        status: 'upcoming',
        homeScore: null,
        awayScore: null,
        homeWickets: null,
        awayWickets: null,
        venue: "Central University Stadium",
        ground: "Main Ground",
        overs: 20,
        umpires: ['Kumar Dharmasena', 'Aleem Dar'],
      },
      {
        id: 2,
        homeTeam: "Royal Strikers",
        homeUniversity: "University of Moratuwa",
        awayTeam: "Tech Titans",
        awayUniversity: "University of Ruhuna",
        date: "2025-03-08T13:30:00",
        status: 'ongoing',
        homeScore: 120,
        awayScore: 85,
        homeWickets: 4,
        awayWickets: 3,
        venue: "Moratuwa Cricket Ground",
        ground: "Engineering Faculty Ground",
        overs: 20,
        inningNumber: 2,
        tossWinner: "Tech Titans",
        tossDecision: 'bowl',
        umpires: ['Richard Kettleborough', 'Nitin Menon'],
      },
      {
        id: 3,
        homeTeam: "Campus Warriors",
        homeUniversity: "University of Kelaniya",
        awayTeam: "Academic Aces",
        awayUniversity: "Eastern University",
        date: "2025-03-07T18:00:00",
        status: 'completed',
        homeScore: 180,
        awayScore: 175,
        homeWickets: 6,
        awayWickets: 8,
        venue: "Kelaniya University Stadium",
        ground: "Central Ground",
        overs: 20,
        tossWinner: "Campus Warriors",
        tossDecision: 'bat',
        umpires: ['Marais Erasmus', 'Bruce Oxenford'],
        highlights: [
          'Stellar batting performance by Kelaniya opener with 85 runs',
          'Hat-trick by Eastern bowler in the 18th over',
          'Last over thriller with 10 runs needed'
        ]
      },
      {
        id: 4,
        homeTeam: "Jaffna Jaguars",
        homeUniversity: "University of Jaffna",
        awayTeam: "Southern Sharks",
        awayUniversity: "University of Ruhuna",
        date: "2025-03-10T14:00:00",
        status: 'upcoming',
        homeScore: null,
        awayScore: null,
        homeWickets: null,
        awayWickets: null,
        venue: "Jaffna University Stadium",
        ground: "Northern Grounds",
        overs: 20,
        umpires: ['Joel Wilson', 'Chris Gaffaney'],
      },
      {
        id: 5,
        homeTeam: "Western Warriors",
        homeUniversity: "University of Sri Jayewardenepura",
        awayTeam: "Eastern Eagles",
        awayUniversity: "Eastern University",
        date: "2025-03-09T19:00:00",
        status: 'completed',
        homeScore: 205,
        awayScore: 190,
        homeWickets: 5,
        awayWickets: 10,
        venue: "Jayewardenepura Stadium",
        ground: "Management Faculty Ground",
        overs: 20,
        tossWinner: "Western Warriors",
        tossDecision: 'bat',
        umpires: ['Michael Gough', 'Paul Reiffel'],
        highlights: [
          'Western captain scores century in just 52 balls',
          'Eastern collapses in final 5 overs',
          'Three spectacular catches in the deep'
        ]
      },
      {
        id: 6,
        homeTeam: "Northern Knights",
        homeUniversity: "Rajarata University",
        awayTeam: "Southern Strikers",
        awayUniversity: "University of Ruhuna",
        date: "2025-03-05T15:30:00",
        status: 'completed',
        homeScore: 165,
        awayScore: 168,
        homeWickets: 8,
        awayWickets: 7,
        venue: "Rajarata Cricket Ground",
        ground: "Agricultural Faculty Ground",
        overs: 20,
        tossWinner: "Northern Knights",
        tossDecision: 'bat',
        umpires: ['Rod Tucker', 'Kumar Dharmasena'],
        highlights: [
          'Southern Strikers win by 3 wickets with 2 balls remaining',
          'Man of the match: Kusal Mendis with 75* off 42 balls',
          'Northern spinner takes 4 wickets for 30 runs'
        ]
      },
      {
        id: 7,
        homeTeam: "Dragons",
        homeUniversity: "Central University",
        awayTeam: "Lions",
        awayUniversity: "National University",
        date: "2025-03-14T14:30:00",
        status: 'upcoming',
        homeScore: null,
        awayScore: null,
        homeWickets: null,
        awayWickets: null,
        venue: "Central University Ground",
        ground: "Main Stadium",
        overs: 20,
        umpires: ['Joel Wilson', 'Chris Gaffaney'],
      },
      {
        id: 8,
        homeTeam: "Titans",
        homeUniversity: "South Eastern University",
        awayTeam: "Warriors",
        awayUniversity: "Wayamba University",
        date: "2025-03-12T13:00:00",
        status: 'ongoing',
        homeScore: 156,
        awayScore: 92,
        homeWickets: 7,
        awayWickets: 4,
        venue: "National Cricket Stadium",
        ground: "University Ground",
        overs: 20,
        inningNumber: 2,
        tossWinner: "Warriors",
        tossDecision: 'bowl',
        umpires: ['Richard Kettleborough', 'Nitin Menon'],
      },
      {
        id: 9,
        homeTeam: "Panthers",
        homeUniversity: "Eastern University",
        awayTeam: "Wolves",
        awayUniversity: "Uva Wellassa University",
        date: "2025-03-06T15:30:00",
        status: 'completed',
        homeScore: 178,
        awayScore: 145,
        homeWickets: 6,
        awayWickets: 10,
        venue: "Eastern Cricket Academy",
        ground: "Science Faculty Ground",
        overs: 20,
        tossWinner: "Wolves",
        tossDecision: 'bowl',
        umpires: ['Marais Erasmus', 'Bruce Oxenford'],
        highlights: [
          'Panthers win by 33 runs',
          'Man of the match: Lahiru Kumara with 4 wickets',
          'Panthers opener scores quickfire 65 off 38 balls'
        ]
      },
    ];

    // Team data
    const teamData: Team[] = [
      { 
        id: 1, 
        name: "Team Thunder", 
        university: "University of Colombo", 
        points: 10,
        players: 11,
        rank: 1,
        change: "+2"
      },
      { 
        id: 2, 
        name: "Cricket Kings", 
        university: "University of Peradeniya", 
        points: 8,
        players: 10,
        rank: 2,
        change: "0"
      },
      { 
        id: 3, 
        name: "Royal Strikers", 
        university: "University of Moratuwa", 
        points: 6,
        players: 9,
        rank: 3,
        change: "+1"
      },
      { 
        id: 4, 
        name: "Campus Warriors", 
        university: "University of Kelaniya", 
        points: 6,
        players: 11,
        rank: 4,
        change: "+1"
      },
      { 
        id: 5, 
        name: "Tech Titans", 
        university: "University of Ruhuna", 
        points: 4,
        players: 10,
        rank: 5,
        change: "-2"
      },
    ];

    // Top performers data
    const performersData = {
      batsmen: [
        { 
          id: 1, 
          name: "Dasun Shanaka", 
          university: "University of Colombo", 
          type: 'batsman' as const,
          runs: 354, 
          matches: 6 
        },
        { 
          id: 2, 
          name: "Charith Asalanka", 
          university: "University of Peradeniya", 
          type: 'batsman' as const,
          runs: 312, 
          matches: 5 
        },
        { 
          id: 3, 
          name: "Pathum Nissanka", 
          university: "University of Moratuwa", 
          type: 'batsman' as const,
          runs: 289, 
          matches: 6 
        }
      ],
      bowlers: [
        { 
          id: 1, 
          name: "Wanindu Hasaranga", 
          university: "University of Colombo", 
          type: 'bowler' as const,
          wickets: 15, 
          economy: 6.2 
        },
        { 
          id: 2, 
          name: "Maheesh Theekshana", 
          university: "University of Peradeniya", 
          type: 'bowler' as const,
          wickets: 12, 
          economy: 6.8 
        },
        { 
          id: 3, 
          name: "Dushmantha Chameera", 
          university: "University of Kelaniya", 
          type: 'bowler' as const,
          wickets: 10, 
          economy: 7.1 
        }
      ]
    };

    setMatches(dummyMatches);
    setTopTeams(teamData);
    setTopPerformers(performersData);
    
    // Count match types
    const counts = {
      upcoming: dummyMatches.filter(match => match.status === 'upcoming').length,
      ongoing: dummyMatches.filter(match => match.status === 'ongoing').length,
      completed: dummyMatches.filter(match => match.status === 'completed').length,
      total: dummyMatches.length
    };
    
    setMatchCounts(counts);
    
    // Initialize with all matches
    setFilteredMatches(dummyMatches);
  }, []);

  useEffect(() => {
    if (matches.length > 0) {
      let filtered = [...matches];
      
      // Apply tab filter
      if (tabValue !== 'all') {
        filtered = filtered.filter(match => match.status === tabValue);
      }
      
      // Apply search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(match => 
          match.homeTeam.toLowerCase().includes(query) ||
          match.awayTeam.toLowerCase().includes(query) ||
          match.homeUniversity.toLowerCase().includes(query) ||
          match.awayUniversity.toLowerCase().includes(query) ||
          match.venue.toLowerCase().includes(query)
        );
      }
      
      setFilteredMatches(filtered);
    }
  }, [tabValue, searchQuery, matches]);

  const handleTabChange = (newValue: string) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const navigateToMatchDetail = (matchId: number) => {
    router.push(`/admin/matches/${matchId}`);
  };
  
  // Status label styling function
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-400';
      case 'ongoing': return 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400';
      case 'completed': return 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200 dark:bg-gray-800/40 dark:border-gray-700 dark:text-gray-400';
    }
  };

  return (
    <AdminDashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
     
        <div className="container mx-auto px-4 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Cricket Matches</h1>
              <p className="text-gray-600 dark:text-gray-400">University Cricket Tournament 2025</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <button className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </button>
              <button className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                <span>Add Match</span>
              </button>
            </div>
          </div>

          {/* Match Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4 border-l-4 border-indigo-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Total Matches</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{matchCounts.total}</h3>
                </div>
                <div className="bg-indigo-100 dark:bg-indigo-900/20 p-3 rounded-lg">
                  <Trophy className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                University Cricket Tournament 2025
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4 border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Upcoming Matches</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{matchCounts.upcoming}</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/20 p-3 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                Next match in {matches.filter(m => m.status === 'upcoming').length > 0 ? 
                  '2 days' : 'N/A'}
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4 border-l-4 border-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Ongoing Matches</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{matchCounts.ongoing}</h3>
                </div>
                <div className="bg-green-100 dark:bg-green-900/20 p-3 rounded-lg">
                  <Activity className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {matchCounts.ongoing > 0 ? 'Live now' : 'No matches in progress'}
              </div>
            </div>
            
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4 border-l-4 border-gray-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Completed Matches</p>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{matchCounts.completed}</h3>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                  <Check className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                {matchCounts.completed} matches completed so far
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Featured Live Match */}
            {matches.filter(match => match.status === 'ongoing').length > 0 && (
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-md overflow-hidden">
                  {matches.filter(match => match.status === 'ongoing').slice(0, 1).map((match) => (
                    <div key={`featured-${match.id}`} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="inline-flex items-center text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full mb-2">
                            <span className="relative flex h-2 w-2 mr-1">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                            </span>
                            Live Now
                          </div>
                          <h2 className="text-xl font-bold">{match.homeTeam} vs {match.awayTeam}</h2>
                          <div className="flex items-center mt-1 text-white/70 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {match.venue}
                          </div>
                        </div>
                        <button 
                          onClick={() => navigateToMatchDetail(match.id)}
                          className="text-xs font-medium bg-white/20 hover:bg-white/30 backdrop-blur-sm px-3 py-1 rounded-full flex items-center"
                        >
                          View Details
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </button>
                      </div>
                      
                      <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                        <div className="grid grid-cols-3 gap-4 items-center">
                          <div className="text-center">
                            <div className="text-sm text-white/70 mb-1">{match.homeUniversity}</div>
                            <div className="font-bold text-lg">{match.homeTeam}</div>
                            <div className="text-3xl font-black mt-1">
                              {match.homeScore}/{match.homeWickets}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm bg-white/20 rounded-full py-1 px-2 mb-1">
                              {match.inningNumber === 1 ? 'First Innings' : 'Second Innings'}
                            </div>
                            <div className="text-3xl font-bold">VS</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm text-white/70 mb-1">{match.awayUniversity}</div>
                            <div className="font-bold text-lg">{match.awayTeam}</div>
                            <div className="text-3xl font-black mt-1">
                              {match.awayScore}/{match.awayWickets}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 text-sm text-white/70">
                        {match.tossWinner && (
                          <div className="flex items-center">
                            <Shield className="h-4 w-4 mr-1" />
                            {match.tossWinner} won toss & elected to {match.tossDecision}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Top Teams Standings */}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Team Standings</h2>
                <button 
                  onClick={() => setShowAllTeams(!showAllTeams)}
                  className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  {showAllTeams ? 'Show Less' : 'View All'}
                </button>
              </div>
              
                                <div className="space-y-3">
                {(showAllTeams ? topTeams : topTeams.slice(0, 3)).map((team) => (
                  <div 
                    key={team.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800/80"
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-semibold mr-3">
                        {team.rank}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{team.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{team.university}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{team.points} pts</span>
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        team.change.startsWith('+') 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                          : team.change === '0' 
                          ? 'bg-gray-100 text-gray-800 dark:bg-gray-800/40 dark:text-gray-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                        {team.change.startsWith('+') && <ArrowUpRight className="h-3 w-3 mr-1" />}
                        {team.change === '0' ? '-' : team.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Match Search and Tabs */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm overflow-hidden mb-8">
            <div className="border-b border-gray-200 dark:border-gray-700 p-4">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="relative w-full md:w-80">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  </div>
                  <input 
                    type="search" 
                    className="block w-full p-2.5 pl-10 text-sm text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 focus:border-indigo-500 dark:focus:border-indigo-600" 
                    placeholder="Search teams, universities, venues..." 
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
                
                <div className="flex border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => handleTabChange('all')} 
                    className={`px-4 py-2 text-sm font-medium ${tabValue === 'all' ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => handleTabChange('upcoming')} 
                    className={`px-4 py-2 text-sm font-medium ${tabValue === 'upcoming' ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    Upcoming
                  </button>
                  <button 
                    onClick={() => handleTabChange('ongoing')} 
                    className={`px-4 py-2 text-sm font-medium ${tabValue === 'ongoing' ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    Ongoing
                  </button>
                  <button 
                    onClick={() => handleTabChange('completed')} 
                    className={`px-4 py-2 text-sm font-medium ${tabValue === 'completed' ? 'bg-indigo-600 dark:bg-indigo-700 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                  >
                    Completed
                  </button>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-4">Match</th>
                    <th scope="col" className="px-6 py-3">Date & Time</th>
                    <th scope="col" className="px-6 py-3">Venue</th>
                    <th scope="col" className="px-6 py-3">Score</th>
                    <th scope="col" className="px-6 py-3">Status</th>
                    <th scope="col" className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
      {filteredMatches.length > 0 ? (
        filteredMatches.map((match) => (
          <tr 
            key={match.id} 
            className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <td className="px-6 py-4">
              <Link href={`/admin/matches/${match.id}`} className="cursor-pointer">
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900 dark:text-white">{match.homeTeam} vs {match.awayTeam}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{match.homeUniversity} vs {match.awayUniversity}</span>
                </div>
              </Link>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <Calendar className="h-3.5 w-3.5 text-gray-400 mr-1.5" />
                  <span className="text-gray-900 dark:text-white">
                    {new Date(match.date).toLocaleDateString('en-US', { 
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3 mr-1.5" />
                  {new Date(match.date).toLocaleTimeString('en-US', { 
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </td>
            <td className="px-6 py-4">
              <div className="flex flex-col">
                <span className="text-gray-900 dark:text-white">{match.venue}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">{match.ground}</span>
              </div>
            </td>
            <td className="px-6 py-4">
              {match.status !== 'upcoming' ? (
                <div className="font-medium">
                  <div className="text-gray-900 dark:text-white">
                    {match.homeScore !== null && match.homeWickets !== null ? 
                      `${match.homeScore}/${match.homeWickets}` : '-'}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {match.awayScore !== null && match.awayWickets !== null ? 
                      `${match.awayScore}/${match.awayWickets}` : '-'}
                  </div>
                </div>
              ) : (
                <span className="text-gray-500 dark:text-gray-400">-</span>
              )}
            </td>
            <td className="px-6 py-4">
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(match.status)}`}>
                {match.status === 'ongoing' ? (
                  <div className="flex items-center">
                    <span className="relative flex h-2 w-2 mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Live Now
                  </div>
                ) : (
                  match.status.charAt(0).toUpperCase() + match.status.slice(1)
                )}
              </span>
            </td>
            <td className="px-6 py-4 text-right">
              <div className="flex items-center justify-end space-x-3">
                <Link 
                  href={`/admin/matches/${match.id}`} 
                  className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                >
                  View
                </Link>
                <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium">
                  Edit
                </button>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={6} className="px-6 py-8 text-center">
            <div className="flex flex-col items-center">
              <AlertCircle className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-lg font-medium text-gray-900 dark:text-white">No matches found</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">Try changing your search or filter criteria</p>
            </div>
          </td>
        </tr>
      )}
    </tbody>

              </table>
            </div>
          </div>

          {/* Top Performers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Top Batsmen */}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-green-50 dark:bg-green-900/10 p-4 border-b border-green-100 dark:border-green-900/20">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center">
                  <Target className="h-5 w-5 mr-2 text-green-600 dark:text-green-500" />
                  Top Batsmen
                </h2>
              </div>
              <div className="p-4">
                {topPerformers.batsmen.map((player, index) => (
                  <div 
                    key={player.id} 
                    className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-500 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{player.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{player.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600 dark:text-green-500">{player.runs} runs</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{player.matches} matches</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Top Bowlers */}
            <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm overflow-hidden">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-4 border-b border-blue-100 dark:border-blue-900/20">
                <h2 className="font-semibold text-lg text-gray-900 dark:text-white flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-500" />
                  Top Bowlers
                </h2>
              </div>
              <div className="p-4">
                {topPerformers.bowlers.map((player, index) => (
                  <div 
                    key={player.id} 
                    className="flex items-center justify-between p-3 rounded-lg mb-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-500 font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">{player.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{player.university}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-blue-600 dark:text-blue-500">{player.wickets} wickets</div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Econ: {player.economy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white dark:bg-[#1e293b] rounded-xl shadow-sm p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Match Management</h2>
              
              <div className="flex flex-wrap gap-2">
                <Link 
                  href="/matches/new" 
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white flex items-center gap-1"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>New Match</span>
                </Link>
                <Link 
                  href="/matches/schedule" 
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule</span>
                </Link>
                <Link 
                  href="/matches/stats" 
                  className="px-3 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-1"
                >
                  <BarChart2 className="h-4 w-4" />
                  <span>Statistics</span>
                </Link>
              </div>
            </div>
            
            <hr className="border-gray-200 dark:border-gray-700 mb-6" />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Access</h3>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Today&apos;s Matches</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">This Week&apos;s Schedule</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Tournament Bracket</button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Match Reports</h3>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Generate Match Report</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Export Match Data</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">View All Reports</button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Teams</h3>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Team Rankings</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Team Management</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Player Statistics</button>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Settings</h3>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Tournament Settings</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">User Permissions</button>
                <button className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300">Notification Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardLayout>
  );
}