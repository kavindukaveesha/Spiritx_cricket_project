"use client"

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowLeft, 
  PlusCircle, 
  ChevronDown 
} from 'lucide-react';

// Mock data service (replace with actual API calls in production)
const MatchDataService = {
  getMatchById: (id) => {
    // Simulated match data with detailed information
    return {
      id: id,
      homeTeam: 'Royal Tigers',
      awayTeam: 'Eagle Warriors',
      homeUniversity: 'Tech University',
      awayUniversity: 'City College',
      date: new Date('2024-03-15T14:30:00'),
      venue: 'Central Stadium',
      status: 'ongoing',
      homeScore: 156,
      awayScore: 142,
      homeWickets: 5,
      awayWickets: 7,
      homePlayers: [
        { id: 1, name: 'John Smith', runs: 45, wickets: 2, catches: 1 },
        { id: 2, name: 'Mike Johnson', runs: 38, wickets: 1, catches: 0 },
        { id: 3, name: 'David Brown', runs: 32, wickets: 0, catches: 2 },
        { id: 4, name: 'Robert Lee', runs: 21, wickets: 1, catches: 1 },
        { id: 5, name: 'Chris Taylor', runs: 15, wickets: 1, catches: 0 },
      ],
      awayPlayers: [
        { id: 1, name: 'Alex Rodriguez', runs: 42, wickets: 1, catches: 2 },
        { id: 2, name: 'Sam Wilson', runs: 35, wickets: 2, catches: 1 },
        { id: 3, name: 'Tom Harris', runs: 28, wickets: 1, catches: 0 },
        { id: 4, name: 'Jack Martin', runs: 22, wickets: 0, catches: 1 },
        { id: 5, name: 'Ryan Clark', runs: 15, wickets: 1, catches: 0 },
      ],
      specialMoments: [
        { 
          id: 1, 
          type: 'catch', 
          description: 'Brilliant catch by John Smith at the boundary', 
          player: 'John Smith',
          time: '14:45'
        },
        { 
          id: 2, 
          type: 'wicket', 
          description: 'Clean bowled by Mike Johnson', 
          player: 'Mike Johnson',
          time: '15:10'
        }
      ]
    };
  },

  updateMatch: (matchId, updates) => {
    console.log('Match updates:', { matchId, updates });
    // In a real app, this would make an API call
    return { success: true };
  },

  updatePlayerStats: (matchId, teamType, playerId, updates) => {
    console.log('Player stats update:', { matchId, teamType, playerId, updates });
    // In a real app, this would make an API call
    return { success: true };
  }
};

export default function MatchDetailPage({ params }: { params: { id: string } }) {
  const [match, setMatch] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMatch, setEditedMatch] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [playerToEdit, setPlayerToEdit] = useState(null);

  useEffect(() => {
    // Fetch match details when component mounts
    const fetchedMatch = MatchDataService.getMatchById(params.id);
    setMatch(fetchedMatch);
    setEditedMatch({ ...fetchedMatch });
  }, [params.id]);

  const handleMatchUpdate = () => {
    MatchDataService.updateMatch(match.id, {
      homeScore: editedMatch.homeScore,
      awayScore: editedMatch.awayScore,
      homeWickets: editedMatch.homeWickets,
      awayWickets: editedMatch.awayWickets,
      status: editedMatch.status
    });
    setMatch(editedMatch);
    setIsEditing(false);
  };

  const handlePlayerUpdate = () => {
    if (!playerToEdit) return;

    const teamKey = playerToEdit.teamType === 'home' ? 'homePlayers' : 'awayPlayers';
    const updatedPlayers = match[teamKey].map(player => 
      player.id === playerToEdit.player.id 
        ? { 
            ...player, 
            runs: playerToEdit.runs, 
            wickets: playerToEdit.wickets, 
            catches: playerToEdit.catches 
          } 
        : player
    );

    MatchDataService.updatePlayerStats(
      match.id, 
      playerToEdit.teamType, 
      playerToEdit.player.id, 
      { 
        runs: playerToEdit.runs, 
        wickets: playerToEdit.wickets, 
        catches: playerToEdit.catches 
      }
    );

    setMatch(prev => ({
      ...prev,
      [teamKey]: updatedPlayers
    }));

    setPlayerToEdit(null);
  };

  if (!match) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navigation Header */}
      <div className="bg-blue-600 dark:bg-blue-800 text-white py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/admin/matches" className="flex items-center text-white hover:text-white/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Matches
          </Link>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-md"
          >
            {isEditing ? 'Cancel' : 'Edit Match'}
          </button>
        </div>
      </div>

      {/* Match Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {match.homeTeam} vs {match.awayTeam}
            </h1>
            
            {/* Match Basic Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>{new Date(match.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>{new Date(match.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
                <span>{match.venue}</span>
              </div>
            </div>

            {/* Match Status and Scores */}
            {isEditing ? (
              <div className="flex flex-col items-center space-y-4">
                <select
                  value={editedMatch.status}
                  onChange={(e) => setEditedMatch(prev => ({ ...prev, status: e.target.value }))}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2">{match.homeTeam} Score</label>
                    <input 
                      type="number"
                      value={editedMatch.homeScore}
                      onChange={(e) => setEditedMatch(prev => ({ ...prev, homeScore: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <label className="block mb-2 mt-2">{match.homeTeam} Wickets</label>
                    <input 
                      type="number"
                      value={editedMatch.homeWickets}
                      onChange={(e) => setEditedMatch(prev => ({ ...prev, homeWickets: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border rounded-md"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">{match.awayTeam} Score</label>
                    <input 
                      type="number"
                      value={editedMatch.awayScore}
                      onChange={(e) => setEditedMatch(prev => ({ ...prev, awayScore: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                    <label className="block mb-2 mt-2">{match.awayTeam} Wickets</label>
                    <input 
                      type="number"
                      value={editedMatch.awayWickets}
                      onChange={(e) => setEditedMatch(prev => ({ ...prev, awayWickets: parseInt(e.target.value) || 0 }))}
                      className="w-full px-3 py-2 border rounded-md"
                      max="10"
                    />
                  </div>
                </div>
                <button 
                  onClick={handleMatchUpdate}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Save Match Updates
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-4 justify-center items-center">
                <div className="text-center">
                  <h2 className="text-lg font-semibold">{match.homeTeam}</h2>
                  <div className="text-2xl font-bold">{match.homeScore}/{match.homeWickets}</div>
                </div>
                <div className="text-center text-xl font-bold">VS</div>
                <div className="text-center">
                  <h2 className="text-lg font-semibold">{match.awayTeam}</h2>
                  <div className="text-2xl font-bold">{match.awayScore}/{match.awayWickets}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b">
          <nav className="flex space-x-4">
            {['Team Stats', 'Players', 'Special Moments'].map((tab, index) => (
              <button
                key={tab}
                onClick={() => setActiveTab(index)}
                className={`py-2 px-4 ${
                  activeTab === index 
                    ? 'border-b-2 border-blue-600 text-blue-600' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Home Team Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{match.homeTeam} Stats</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Total Runs</span>
                  <div className="text-lg font-bold">{match.homeScore}</div>
                </div>
                <div>
                  <span className="text-gray-600">Wickets</span>
                  <div className="text-lg font-bold">{match.homeWickets}/10</div>
                </div>
                <div>
                  <span className="text-gray-600">Run Rate</span>
                  <div className="text-lg font-bold">
                    {(match.homeScore / 20).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Away Team Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">{match.awayTeam} Stats</h2>
              <div className="space-y-3">
                <div>
                  <span className="text-gray-600">Total Runs</span>
                  <div className="text-lg font-bold">{match.awayScore}</div>
                </div>
                <div>
                  <span className="text-gray-600">Wickets</span>
                  <div className="text-lg font-bold">{match.awayWickets}/10</div>
                </div>
                <div>
                  <span className="text-gray-600">Run Rate</span>
                  <div className="text-lg font-bold">
                    {(match.awayScore / 20).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

{activeTab === 1 && (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Home Team Players */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{match.homeTeam} Players</h2>
      {match.homePlayers.map((player) => (
        <div 
          key={player.id} 
          className="mb-4 pb-4 border-b flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{player.name}</h3>
            <div className="text-sm text-gray-600">
              Runs: {player.runs} | Wickets: {player.wickets} | Catches: {player.catches}
            </div>
          </div>
          <button 
            onClick={() => setPlayerToEdit({
              teamType: 'home',
              player: player,
              runs: player.runs,
              wickets: player.wickets,
              catches: player.catches
            })}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ))}
    </div>

    {/* Away Team Players */}
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{match.awayTeam} Players</h2>
      {match.awayPlayers.map((player) => (
        <div 
          key={player.id} 
          className="mb-4 pb-4 border-b flex justify-between items-center"
        >
          <div>
            <h3 className="font-semibold">{player.name}</h3>
            <div className="text-sm text-gray-600">
              Runs: {player.runs} | Wickets: {player.wickets} | Catches: {player.catches}
            </div>
          </div>
          <button 
            onClick={() => setPlayerToEdit({
              teamType: 'away',
              player: player,
              runs: player.runs,
              wickets: player.wickets,
              catches: player.catches
            })}
            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Edit
          </button>
        </div>
      ))}
    </div>

    {/* Player Edit Modal */}
    {playerToEdit && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">
            Edit {playerToEdit.player.name}'s Stats
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-2">Runs</label>
              <input 
                type="number"
                value={playerToEdit.runs}
                onChange={(e) => setPlayerToEdit(prev => ({
                  ...prev,
                  runs: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2">Wickets</label>
              <input 
                type="number"
                value={playerToEdit.wickets}
                onChange={(e) => setPlayerToEdit(prev => ({
                  ...prev,
                  wickets: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border rounded-md"
                max="10"
              />
            </div>
            <div>
              <label className="block mb-2">Catches</label>
              <input 
                type="number"
                value={playerToEdit.catches}
                onChange={(e) => setPlayerToEdit(prev => ({
                  ...prev,
                  catches: parseInt(e.target.value) || 0
                }))}
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button 
              onClick={() => setPlayerToEdit(null)}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-md"
            >
              Cancel
            </button>
            <button 
              onClick={handlePlayerUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)}
</div>
</div>
  )}