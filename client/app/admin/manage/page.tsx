"use client"
import React, { useState } from 'react';
import { 
  Clock, 
  Users, 
  Target, 
  BarChart3, 
  Shield, 
  Award, 
  AlertTriangle, 
  CheckCircle, 
  PlusCircle, 
  Minus, 
  Plus, 
  RefreshCw, 
  ChevronUp,
  ChevronDown,
  Heart,
  Zap,
  PenTool,
  Droplet,
  Repeat,
  Star,
  Mic
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard-layout';
import AdminDashboard from '../page';
import AdminDashboardLayout from '@/components/admin-layout';

const MatchManagement = () => {
  // Sample match data
  const [matchInfo, setMatchInfo] = useState({
    id: "M2023-45",
    title: "Dragons vs Lions",
    venue: "Central University Ground",
    status: "In Progress",
    overs: "50",
    currentOver: "23.4",
    umpires: "Kumar Dharmasena, Aleem Dar",
    referee: "Ranjan Madugalle",
    toss: "Dragons won the toss and elected to bat",
    weather: "28°C, Partly Cloudy",
    team1: {
      name: "Dragons",
      score: "145/3",
      runRate: "6.12",
      players: [
        { id: 1, name: "Ashan Kumar", role: "Batsman", isBatting: true, runs: 72, balls: 65, fours: 8, sixes: 2, strikeRate: 110.8 },
        { id: 2, name: "Rajiv Perera", role: "Batsman", isBatting: true, runs: 45, balls: 38, fours: 5, sixes: 1, strikeRate: 118.4 },
        { id: 3, name: "Sanath Jayawardene", role: "Batsman", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 4, name: "Dhanush Singh", role: "All-Rounder", isBatting: false, runs: 16, balls: 23, fours: 1, sixes: 0, strikeRate: 69.6 },
        { id: 5, name: "Chaminda Vaas", role: "All-Rounder", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 6, name: "Nuwan Fernando", role: "All-Rounder", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 7, name: "Isuru Udana", role: "Bowler", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 8, name: "Lasith Malinga", role: "Bowler", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 9, name: "Ajantha Mendis", role: "Bowler", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 10, name: "Muttiah Muralitharan", role: "Bowler", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 11, name: "Rangana Herath", role: "Bowler", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 }
      ]
    },
    team2: {
      name: "Lions",
      score: "0/0",
      runRate: "0.00",
      players: [
        { id: 12, name: "Rohit Sharma", role: "Batsman", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 13, name: "KL Rahul", role: "Batsman", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 14, name: "Virat Kohli", role: "Batsman", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 15, name: "Suryakumar Yadav", role: "Batsman", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 16, name: "Rishabh Pant", role: "Wicket-Keeper", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 17, name: "Hardik Pandya", role: "All-Rounder", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 18, name: "Ravindra Jadeja", role: "All-Rounder", isBatting: false, runs: 0, balls: 0, fours: 0, sixes: 0, strikeRate: 0 },
        { id: 19, name: "Bhuvneshwar Kumar", role: "Bowler", isBowling: true, overs: "8.0", maidens: 1, runs: 32, wickets: 1, economy: 4.0 },
        { id: 20, name: "Jasprit Bumrah", role: "Bowler", isBowling: true, overs: "7.4", maidens: 2, runs: 24, wickets: 2, economy: 3.1 },
        { id: 21, name: "Mohammed Shami", role: "Bowler", isBowling: false, overs: "5.0", maidens: 0, runs: 45, wickets: 0, economy: 9.0 },
        { id: 22, name: "Yuzvendra Chahal", role: "Bowler", isBowling: false, overs: "3.0", maidens: 0, runs: 28, wickets: 0, economy: 9.3 }
      ]
    },
    recentBalls: ["1", "W", "0", "4", "2", "1"],
    overHistory: [
      { over: "23", runs: 8, wickets: 0, events: ["1", "0", "4", "1", "2", "0"] },
      { over: "22", runs: 7, wickets: 0, events: ["1", "0", "4", "0", "2", "0"] },
      { over: "21", runs: 2, wickets: 1, events: ["0", "W", "0", "1", "1", "0"] },
      { over: "20", runs: 11, wickets: 0, events: ["1", "4", "0", "0", "6", "0"] }
    ],
    partnerships: [
      { players: "Ashan Kumar & Rajiv Perera", runs: 93, balls: 72 }
    ],
    commentary: [
      { time: "12:45 PM", text: "WICKET! Dhanush Singh caught by Rishabh Pant off Jasprit Bumrah for 16", type: "wicket" },
      { time: "12:43 PM", text: "FOUR! Ashan Kumar drives through covers for a beautiful boundary", type: "boundary" },
      { time: "12:40 PM", text: "Good running between the wickets, taking quick singles", type: "normal" },
      { time: "12:38 PM", text: "Jasprit Bumrah starts a new over", type: "normal" },
      { time: "12:35 PM", text: "WICKET! Pradeep Silva LBW by Bhuvneshwar Kumar for 8", type: "wicket" }
    ]
  });

  // States for various match management functions
  const [ballOutcome, setBallOutcome] = useState('0');
  const [showWicketModal, setShowWicketModal] = useState(false);
  const [selectedBowler, setSelectedBowler] = useState(19); // Default to first bowler
  const [commentaryInput, setCommentaryInput] = useState('');
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({
    matchInfo: true,
    liveScore: true,
    recentActivity: true,
    teams: true,
    statistics: true
  });

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  // Function to update runs
  const updateRuns = (runs: number) => {
    // Update team score
    const team1ScoreParts = matchInfo.team1.score.split('/');
    const newRuns = parseInt(team1ScoreParts[0]) + runs;
    
    // Update batting player runs
    const updatedPlayers = [...matchInfo.team1.players];
    const battingPlayerIndex = updatedPlayers.findIndex(p => p.isBatting);
    if (battingPlayerIndex >= 0) {
      updatedPlayers[battingPlayerIndex] = {
        ...updatedPlayers[battingPlayerIndex],
        runs: updatedPlayers[battingPlayerIndex].runs + runs,
        balls: updatedPlayers[battingPlayerIndex].balls + 1,
        strikeRate: parseFloat((((updatedPlayers[battingPlayerIndex].runs + runs) / (updatedPlayers[battingPlayerIndex].balls + 1)) * 100).toFixed(1))
      };
    }
    
    // Update recent balls
    const updatedRecentBalls = [...matchInfo.recentBalls];
    updatedRecentBalls.shift();
    updatedRecentBalls.push(runs.toString());
    
    // Update match info
    setMatchInfo({
      ...matchInfo,
      team1: {
        ...matchInfo.team1,
        score: `${newRuns}/${team1ScoreParts[1]}`,
        players: updatedPlayers
      },
      recentBalls: updatedRecentBalls
    });
  };

  // Add commentary
  const addCommentary = () => {
    if (!commentaryInput.trim()) return;
    
    const newComment = {
      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      text: commentaryInput,
      type: "normal"
    };
    
    setMatchInfo({
      ...matchInfo,
      commentary: [newComment, ...matchInfo.commentary]
    });
    
    setCommentaryInput('');
  };

  return (
  <AdminDashboardLayout>
      <div className="min-h-screen bg-[#0F172A] text-white">
      {/* Wicket Modal */}
      {showWicketModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1E293B] rounded-lg p-6 shadow-xl max-w-md w-full">
            <h3 className="text-xl text-white font-medium mb-6">Wicket Details</h3>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[#94A3B8] text-sm block mb-2">Wicket Type</label>
                <select className="w-full bg-[#0F172A] border border-[#334155] text-white p-2 rounded-lg">
                  <option value="bowled">Bowled</option>
                  <option value="caught">Caught</option>
                  <option value="lbw">LBW</option>
                  <option value="run_out">Run Out</option>
                  <option value="stumped">Stumped</option>
                  <option value="hit_wicket">Hit Wicket</option>
                </select>
              </div>
              
              <div>
                <label className="text-[#94A3B8] text-sm block mb-2">Fielder (if applicable)</label>
                <select className="w-full bg-[#0F172A] border border-[#334155] text-white p-2 rounded-lg">
                  <option value="">-- Select Fielder --</option>
                  {matchInfo.team2.players.map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-[#94A3B8] text-sm block mb-2">Next Batsman</label>
                <select className="w-full bg-[#0F172A] border border-[#334155] text-white p-2 rounded-lg">
                  {matchInfo.team1.players.filter(p => !p.isBatting && p.runs === 0).map(player => (
                    <option key={player.id} value={player.id}>{player.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                className="px-4 py-2 rounded-lg bg-[#334155] text-white mr-3 hover:bg-[#475569]"
                onClick={() => setShowWicketModal(false)}
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 rounded-lg bg-[#A91409] text-white hover:bg-[#7B1113]"
                onClick={() => {
                  // Update wicket logic would go here
                  setShowWicketModal(false);
                  
                  // Update match info with wicket
                  const team1ScoreParts = matchInfo.team1.score.split('/');
                  const newWickets = parseInt(team1ScoreParts[1]) + 1;
                  
                  // Update recent balls
                  const updatedRecentBalls = [...matchInfo.recentBalls];
                  updatedRecentBalls.shift();
                  updatedRecentBalls.push('W');
                  
                  // Add wicket commentary
                  const updatedCommentary = [
                    {
                      time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
                      text: "WICKET! Ashan Kumar caught by Rishabh Pant off Jasprit Bumrah for 72",
                      type: "wicket"
                    },
                    ...matchInfo.commentary
                  ];
                  
                  setMatchInfo({
                    ...matchInfo,
                    team1: {
                      ...matchInfo.team1,
                      score: `${team1ScoreParts[0]}/${newWickets}`
                    },
                    recentBalls: updatedRecentBalls,
                    commentary: updatedCommentary
                  });
                }}
              >
                Update Wicket
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-6">
        <div className="bg-gradient-to-r from-[#1B5E20]/20 to-[#1E293B] rounded-lg p-6 border border-[#1B5E20]/30">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">{matchInfo.title}</h1>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                  ${matchInfo.status === 'In Progress' ? 'bg-[#00B8D4] text-white' : 'bg-[#2E7D32] text-white'}`}
                >
                  {matchInfo.status}
                </span>
                <span className="text-[#94A3B8]">{matchInfo.venue}</span>
              </div>
            </div>
            
            <div className="flex mt-4 lg:mt-0 space-x-2">
              <button className="flex items-center bg-[#1B5E20] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#1B5E20]/80">
                <RefreshCw size={16} className="mr-1.5" />
                Refresh
              </button>
              <button className="flex items-center bg-[#7B1113] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#7B1113]/80">
                <Shield size={16} className="mr-1.5" />
                Match Control
              </button>
              <button className="flex items-center bg-[#00B8D4] text-white px-3 py-1.5 rounded-lg text-sm hover:bg-[#00B8D4]/80">
                <CheckCircle size={16} className="mr-1.5" />
                Save Updates
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-12 xl:col-span-8">

          <div className="bg-[#1E293B] rounded-lg mb-6 overflow-hidden shadow-lg border border-[#334155]">
            <div 
              className="bg-[#0F172A] p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('matchInfo')}
            >
              <div className="flex items-center">
                <Target className="h-5 w-5 text-[#E8B923] mr-2" />
                <h2 className="text-lg font-medium text-white">Match Information</h2>
              </div>
              {expandedSections.matchInfo ? 
                <ChevronUp className="h-5 w-5 text-[#94A3B8]" /> : 
                <ChevronDown className="h-5 w-5 text-[#94A3B8]" />
              }
            </div>
            
            {expandedSections.matchInfo && (
              <div className="p-5">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Match ID</p>
                    <p className="text-white">{matchInfo.id}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Venue</p>
                    <p className="text-white">{matchInfo.venue}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Total Overs</p>
                    <p className="text-white">{matchInfo.overs}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Current Over</p>
                    <p className="text-white">{matchInfo.currentOver}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Umpires</p>
                    <p className="text-white">{matchInfo.umpires}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Match Referee</p>
                    <p className="text-white">{matchInfo.referee}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Toss</p>
                    <p className="text-white">{matchInfo.toss}</p>
                  </div>
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <p className="text-[#94A3B8] text-xs mb-1">Weather</p>
                    <p className="text-white">{matchInfo.weather}</p>
                  </div>
                </div>
              </div>
            )}
          </div>


          <div className="grid grid-cols-12 gap-6">
  {/* Match Information */}
  {/* Live Score */}
  <div className="bg-[#1E293B] rounded-lg mb-6 overflow-hidden shadow-lg border border-[#334155] col-span-12 xl:col-span-8">
    <div 
      className="bg-[#0F172A] p-4 flex justify-between items-center cursor-pointer"
      onClick={() => toggleSection('liveScore')}
    >
      <div className="flex items-center">
        <Zap className="h-5 w-5 text-[#00B8D4] mr-2" />
        <h2 className="text-lg font-medium text-white">Live Score & Updates</h2>
      </div>
      {expandedSections.liveScore ? 
        <ChevronUp className="h-5 w-5 text-[#94A3B8]" /> : 
        <ChevronDown className="h-5 w-5 text-[#94A3B8]" />
      }
    </div>
    
    {expandedSections.liveScore && (
      <div className="p-5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score Card */}
          <div className="bg-gradient-to-b from-[#0F172A] to-[#1E293B] rounded-lg p-5 border border-[#334155]">
            {/* Team 1 */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#7B1113] rounded-full mr-2"></div>
                  <h4 className="text-white font-medium">{matchInfo.team1.name}</h4>
                </div>
                <div className="flex items-center">
                  <p className="text-white text-3xl font-bold">{matchInfo.team1.score}</p>
                  <div className="ml-4 bg-[#7B1113]/20 px-2 py-1 rounded text-xs text-white">
                    RR: {matchInfo.team1.runRate}
                  </div>
                </div>
              </div>
              
              {/* Current Batsmen */}
              <div className="space-y-2">
                {matchInfo.team1.players.filter(p => p.isBatting).map(player => (
                  <div key={player.id} className="flex justify-between items-center bg-[#0F172A]/60 p-3 rounded-md">
                    <div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#00B8D4] rounded-full mr-2"></div>
                        <p className="text-white font-medium">{player.name} *</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-lg font-bold">{player.runs} <span className="text-[#94A3B8] text-xs">({player.balls})</span></p>
                      <p className="text-[#94A3B8] text-xs">4s: {player.fours} | 6s: {player.sixes} | SR: {player.strikeRate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Team 2 */}
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-[#E8B923] rounded-full mr-2"></div>
                  <h4 className="text-white font-medium">{matchInfo.team2.name}</h4>
                </div>
                <div className="flex items-center">
                  <p className="text-white text-3xl font-bold">{matchInfo.team2.score}</p>
                  <div className="ml-4 bg-[#E8B923]/20 px-2 py-1 rounded text-xs text-white">
                    RR: {matchInfo.team2.runRate}
                  </div>
                </div>
              </div>
              
              {/* Current Bowlers */}
              <div className="space-y-2">
                {matchInfo.team2.players.filter(p => p.isBowling).map(player => (
                  <div key={player.id} className="flex justify-between items-center bg-[#0F172A]/60 p-3 rounded-md">
                    <div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-[#FF4081] rounded-full mr-2"></div>
                        <p className="text-white font-medium">{player.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-lg font-bold">{player.wickets}/{player.runs}</p>
                      <p className="text-[#94A3B8] text-xs">O: {player.overs} | M: {player.maidens} | ER: {player.economy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Partnership */}
            {matchInfo.partnerships.length > 0 && (
              <div className="bg-[#1B5E20]/20 p-3 rounded-md">
                <p className="text-white text-sm">
                  Current Partnership: <span className="font-bold">{matchInfo.partnerships[0].runs}</span> runs 
                  off <span className="font-bold">{matchInfo.partnerships[0].balls}</span> balls 
                  <span className="text-[#94A3B8]"> ({((matchInfo.partnerships[0].runs / matchInfo.partnerships[0].balls) * 100).toFixed(1)} SR)</span>
                </p>
              </div>
            )}
          </div>
          
          {/* Ball Updates */}
          <div>
            {/* Recent Balls */}
            <div className="bg-[#0F172A] p-4 rounded-lg mb-4 border border-[#334155]">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-medium">Ball Updates</h4>
                <div className="bg-[#334155] px-2 py-1 rounded text-xs text-white">
                  Over {matchInfo.currentOver}
                </div>
              </div>
              
              <div className="flex space-x-2 mb-4">
                {matchInfo.recentBalls.map((ball, index) => (
                  <div 
                    key={index} 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-xl
                      ${ball === 'W' ? 'bg-[#A91409]' : 
                        ball === '4' ? 'bg-[#00B8D4]' : 
                        ball === '6' ? 'bg-[#FF4081]' : 
                        'bg-[#334155]'}`}
                  >
                    {ball}
                  </div>
                ))}
              </div>
              
              {/* Ball Controls */}
              <div className="bg-[#1E293B] p-4 rounded-lg">
                <h5 className="text-white font-medium mb-3">Ball Outcome</h5>
                
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {['0', '1', '2', '3', '4', '6', 'W', 'WD'].map(outcome => (
                    <button 
                      key={outcome} 
                      className={`py-2 rounded-lg font-medium text-sm
                        ${ballOutcome === outcome ? 
                          outcome === 'W' ? 'bg-[#A91409] text-white' : 
                          outcome === '4' ? 'bg-[#00B8D4] text-white' : 
                          outcome === '6' ? 'bg-[#FF4081] text-white' : 
                          'bg-[#7B1113] text-white' 
                        : 'bg-[#334155] text-white'}`}
                      onClick={() => setBallOutcome(outcome)}
                    >
                      {outcome}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <button 
                    className="px-4 py-2 rounded-lg bg-[#1B5E20] text-white font-medium text-sm hover:bg-[#1B5E20]/80"
                    onClick={() => ballOutcome === 'W' ? setShowWicketModal(true) : updateRuns(parseInt(ballOutcome) || 0)}
                  >
                    Update Ball
                  </button>
                  
                  <div className="flex items-center">
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#334155] text-white mr-2 hover:bg-[#475569]">
                      <RefreshCw size={16} />
                    </button>
                    <button className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#334155] text-white hover:bg-[#475569]">
                      <AlertTriangle size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Over History */}
            <div className="bg-[#0F172A] p-4 rounded-lg border border-[#334155]">
              <h4 className="text-white font-medium mb-3">Over History</h4>
              
              <div className="space-y-2">
                {matchInfo.overHistory.map((over, index) => (
                  <div key={index} className="bg-[#1E293B] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-white">Over {over.over}</p>
                      <div className="flex items-center space-x-2">
                        <span className="bg-[#1B5E20]/20 px-2 py-0.5 rounded text-xs text-white">{over.runs} runs</span>
                        {over.wickets > 0 && (
                          <span className="bg-[#A91409]/20 px-2 py-0.5 rounded text-xs text-white">{over.wickets} wickets</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1.5">
                      {over.events.map((ball, i) => (
                        <div 
                          key={i} 
                          className={`w-6 h-6 rounded flex items-center justify-center text-white text-xs font-medium
                            ${ball === 'W' ? 'bg-[#A91409]' : 
                              ball === '4' ? 'bg-[#00B8D4]' : 
                              ball === '6' ? 'bg-[#FF4081]' : 
                              'bg-[#334155]'}`}
                        >
                          {ball}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )}

    {/* Teams */}
    <div className="bg-[#1E293B] rounded-lg mb-6 overflow-hidden shadow-lg border border-[#334155]">
            <div 
              className="bg-[#0F172A] p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('teams')}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 text-[#E8B923] mr-2" />
                <h2 className="text-lg font-medium text-white">Team Lineups</h2>
              </div>
              {expandedSections.teams ? 
                <ChevronUp className="h-5 w-5 text-[#94A3B8]" /> : 
                <ChevronDown className="h-5 w-5 text-[#94A3B8]" />
              }
            </div>
            
            {expandedSections.teams && (
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Team 1 */}
                  <div className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#7B1113] rounded-full mr-2"></div>
                        <h4 className="text-white font-medium">{matchInfo.team1.name}</h4>
                      </div>
                      <button className="bg-[#334155] text-white text-xs px-2 py-1 rounded flex items-center hover:bg-[#475569]">
                        <PlusCircle size={12} className="mr-1" /> Edit
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-[#334155] text-[#94A3B8]">
                            <th className="text-left pb-2 font-medium text-xs">Player</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">Role</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">R</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">B</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">4s</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">6s</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">SR</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchInfo.team1.players.map(player => (
                            <tr key={player.id} className="border-b border-[#334155]/50 hover:bg-[#1E293B]">
                              <td className="py-2.5">
                                <div className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${player.isBatting ? 'bg-[#00B8D4]' : 'bg-[#94A3B8]'}`}></div>
                                  {player.name} {player.isBatting ? '*' : ''}
                                </div>
                              </td>
                              <td className="px-2 py-2.5 text-center text-xs text-[#94A3B8]">{player.role}</td>
                              <td className="px-2 py-2.5 text-center">{player.runs}</td>
                              <td className="px-2 py-2.5 text-center">{player.balls}</td>
                              <td className="px-2 py-2.5 text-center">{player.fours}</td>
                              <td className="px-2 py-2.5 text-center">{player.sixes}</td>
                              <td className="px-2 py-2.5 text-center">
                                {player.balls > 0 ? player.strikeRate : '-'}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  {/* Team 2 */}
                  <div className="bg-[#0F172A] rounded-lg p-4">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-[#E8B923] rounded-full mr-2"></div>
                        <h4 className="text-white font-medium">{matchInfo.team2.name}</h4>
                      </div>
                      <button className="bg-[#334155] text-white text-xs px-2 py-1 rounded flex items-center hover:bg-[#475569]">
                        <PlusCircle size={12} className="mr-1" /> Edit
                      </button>
                    </div>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full text-white">
                        <thead>
                          <tr className="border-b border-[#334155] text-[#94A3B8]">
                            <th className="text-left pb-2 font-medium text-xs">Player</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">Role</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">O</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">M</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">R</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">W</th>
                            <th className="px-2 pb-2 text-center font-medium text-xs">ER</th>
                          </tr>
                        </thead>
                        <tbody>
                          {matchInfo.team2.players.map(player => (
                            <tr key={player.id} className="border-b border-[#334155]/50 hover:bg-[#1E293B]">
                              <td className="py-2.5">
                                <div className="flex items-center">
                                  <div className={`w-2 h-2 rounded-full mr-2 ${player.isBowling ? 'bg-[#FF4081]' : 'bg-[#94A3B8]'}`}></div>
                                  {player.name} {player.isBowling ? '*' : ''}
                                </div>
                              </td>
                              <td className="px-2 py-2.5 text-center text-xs text-[#94A3B8]">{player.role}</td>
                              <td className="px-2 py-2.5 text-center">{player.overs || '-'}</td>
                              <td className="px-2 py-2.5 text-center">{player.maidens || '-'}</td>
                              <td className="px-2 py-2.5 text-center">{player.runs || '-'}</td>
                              <td className="px-2 py-2.5 text-center">{player.wickets || '-'}</td>
                              <td className="px-2 py-2.5 text-center">{player.economy || '-'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
           
  </div>
 
  {/* Right Sidebar */}
  <div className="col-span-12 xl:col-span-4">
    {/* Quick Actions */}
    <div className="bg-[#1E293B] rounded-lg mb-6 shadow-lg border border-[#334155]">
      <div className="p-4 bg-[#0F172A]">
        <h2 className="text-lg font-medium text-white">Match Controls</h2>
      </div>
      <div className="p-5">
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <Clock className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">Update Time</span>
          </button>
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <RefreshCw className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">Change Bowler</span>
          </button>
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <Droplet className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">Drinks Break</span>
          </button>
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <Users className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">Batting Order</span>
          </button>
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <Repeat className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">End Over</span>
          </button>
          <button className="bg-[#0F172A] hover:bg-[#1E293B] p-3 rounded-lg flex flex-col items-center justify-center transition-colors">
            <PenTool className="h-6 w-6 text-[#00B8D4] mb-2" />
            <span className="text-white text-sm">Edit Score</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          <button className="bg-[#1B5E20] hover:bg-[#1B5E20]/80 p-3 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span className="text-white">Complete Innings</span>
          </button>
          <button className="bg-[#7B1113] hover:bg-[#7B1113]/80 p-3 rounded-lg flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 mr-2" />
            <span className="text-white">End Match</span>
          </button>
        </div>
      </div>
    </div>
    
    {/* Commentary */}
    <div className="bg-[#1E293B] rounded-lg mb-6 shadow-lg border border-[#334155]">
      <div className="p-4 bg-[#0F172A]">
        <h2 className="text-lg font-medium text-white">Live Commentary</h2>
      </div>
      <div className="p-5">
        <div className="mb-4">
          <textarea 
            className="w-full bg-[#0F172A] border border-[#334155] text-white p-3 rounded-lg mb-3 h-20 resize-none"
            placeholder="Add match commentary here..."
            value={commentaryInput}
            onChange={(e) => setCommentaryInput(e.target.value)}
          />
          
          <div className="flex justify-between">
            <div className="flex flex-wrap gap-2">
              <button className="px-2 py-1 rounded bg-[#00B8D4] text-white text-xs">Four</button>
              <button className="px-2 py-1 rounded bg-[#FF4081] text-white text-xs">Six</button>
              <button className="px-2 py-1 rounded bg-[#A91409] text-white text-xs">Wicket</button>
              <button className="px-2 py-1 rounded bg-[#334155] text-white text-xs">Over</button>
            </div>
            
            <button 
              className="px-3 py-1 rounded bg-[#1B5E20] text-white text-sm flex items-center"
              onClick={addCommentary}
            >
              <Mic className="h-4 w-4 mr-1" />
              Add
            </button>
          </div>
        </div>
        
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {matchInfo.commentary.map((comment, index) => (
            <div 
              key={index} 
              className={`p-3 rounded-lg border-l-4 
                ${comment.type === 'wicket' ? 'border-[#A91409] bg-[#A91409]/10' : 
                  comment.type === 'boundary' ? 'border-[#00B8D4] bg-[#00B8D4]/10' : 
                  'border-[#334155] bg-[#0F172A]'}`}
            >
              <div className="flex justify-between items-start">
                <p className="text-[#94A3B8] text-xs">{comment.time}</p>
                {comment.type === 'wicket' && (
                  <span className="bg-[#A91409] text-white text-xs px-1.5 py-0.5 rounded">WICKET</span>
                )}
                {comment.type === 'boundary' && (
                  <span className="bg-[#00B8D4] text-white text-xs px-1.5 py-0.5 rounded">BOUNDARY</span>
                )}
              </div>
              <p className="text-white text-sm mt-1">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
    
    {/* Match Events Timeline */}
    <div className="bg-[#1E293B] rounded-lg shadow-lg border border-[#334155]">
      <div className="p-4 bg-[#0F172A]">
        <h2 className="text-lg font-medium text-white">Key Events</h2>
      </div>
      <div className="p-5">
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-[#334155]"></div>
          
          <div className="space-y-4">
            <div className="ml-10 relative">
              <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[#00B8D4] border-4 border-[#1E293B]"></div>
              <div className="bg-[#0F172A] p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-[#94A3B8] text-xs">12:45 PM</p>
                  <span className="bg-[#A91409] text-white text-xs px-1.5 py-0.5 rounded">WICKET</span>
                </div>
                <p className="text-white text-sm mt-1">Dhanush Singh caught by Rishabh Pant off Jasprit Bumrah for 16</p>
              </div>
            </div>
            
            <div className="ml-10 relative">
              <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[#00B8D4] border-4 border-[#1E293B]"></div>
              <div className="bg-[#0F172A] p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-[#94A3B8] text-xs">12:35 PM</p>
                  <span className="bg-[#A91409] text-white text-xs px-1.5 py-0.5 rounded">WICKET</span>
                </div>
                <p className="text-white text-sm mt-1">Pradeep Silva LBW by Bhuvneshwar Kumar for 8</p>
              </div>
            </div>
            
            <div className="ml-10 relative">
              <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[#00B8D4] border-4 border-[#1E293B]"></div>
              <div className="bg-[#0F172A] p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-[#94A3B8] text-xs">12:20 PM</p>
                  <span className="bg-[#1B5E20] text-white text-xs px-1.5 py-0.5 rounded">MILESTONE</span>
                </div>
                <p className="text-white text-sm mt-1">Ashan Kumar reaches his fifty off 48 balls (6 fours, 1 six)</p>
              </div>
            </div>
            
            <div className="ml-10 relative">
              <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-[#00B8D4] border-4 border-[#1E293B]"></div>
              <div className="bg-[#0F172A] p-3 rounded-lg">
                <div className="flex justify-between">
                  <p className="text-[#94A3B8] text-xs">12:00 PM</p>
                  <span className="bg-[#334155] text-white text-xs px-1.5 py-0.5 rounded">DRINKS</span>
                </div>
                <p className="text-white text-sm mt-1">Drinks break taken. Dragons 78/1 after 15 overs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
          
         
          
         
          {/* Statistics */}
          <div className="bg-[#1E293B] rounded-lg overflow-hidden shadow-lg border border-[#334155]">
            <div 
              className="bg-[#0F172A] p-4 flex justify-between items-center cursor-pointer"
              onClick={() => toggleSection('statistics')}
            >
              <div className="flex items-center">
                <BarChart3 className="h-5 w-5 text-[#FF4081] mr-2" />
                <h2 className="text-lg font-medium text-white">Match Statistics</h2>
              </div>
              {expandedSections.statistics ? 
                <ChevronUp className="h-5 w-5 text-[#94A3B8]" /> : 
                <ChevronDown className="h-5 w-5 text-[#94A3B8]" />
              }
            </div>
            
            {expandedSections.statistics && (
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Run Rate Progression</h4>
                    <div className="h-48 bg-[#1E293B] rounded-lg flex items-center justify-center border border-[#334155]">
                      <p className="text-[#94A3B8]">Run rate chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Scoring Breakdown</h4>
                    <div className="h-48 bg-[#1E293B] rounded-lg flex items-center justify-center border border-[#334155]">
                      <p className="text-[#94A3B8]">Scoring breakdown chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Bowling Performance</h4>
                    <div className="h-48 bg-[#1E293B] rounded-lg flex items-center justify-center border border-[#334155]">
                      <p className="text-[#94A3B8]">Bowling performance chart will be displayed here</p>
                    </div>
                  </div>
                  
                  <div className="bg-[#0F172A] p-4 rounded-lg">
                    <h4 className="text-white font-medium mb-3">Dot Ball Analysis</h4>
                    <div className="h-48 bg-[#1E293B] rounded-lg flex items-center justify-center border border-[#334155]">
                      <p className="text-[#94A3B8]">Dot ball analysis chart will be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
      
    </div>
  </AdminDashboardLayout>
  );
};

export default MatchManagement;