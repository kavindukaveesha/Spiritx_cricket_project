// components/ScoreUpdater.js
import { useState } from 'react';
import { useTheme } from 'next-themes';

export default function ScoreUpdater({ match, onUpdate, onPlayerUpdate, onAddSpecialMoment }) {
  const [homeScore, setHomeScore] = useState(match.homeScore);
  const [homeWickets, setHomeWickets] = useState(match.homeWickets);
  const [awayScore, setAwayScore] = useState(match.awayScore);
  const [awayWickets, setAwayWickets] = useState(match.awayWickets);
  
  const [openPlayerDialog, setOpenPlayerDialog] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [currentTeamType, setCurrentTeamType] = useState(null);
  const [playerUpdates, setPlayerUpdates] = useState({
    runs: 0,
    wickets: 0,
    catches: 0,
  });
  
  const [openMomentDialog, setOpenMomentDialog] = useState(false);
  const [momentData, setMomentData] = useState({
    description: '',
    type: 'catch',
  });
  
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleScoreUpdate = () => {
    onUpdate({
      homeScore: homeScore,
      homeWickets: homeWickets,
      awayScore: awayScore,
      awayWickets: awayWickets,
    });
  };

  const handleOpenPlayerDialog = (player, teamType) => {
    setCurrentPlayer(player);
    setCurrentTeamType(teamType);
    setPlayerUpdates({
      runs: 0,
      wickets: 0,
      catches: 0,
    });
    setOpenPlayerDialog(true);
  };

  const handlePlayerUpdateSubmit = () => {
    onPlayerUpdate(currentTeamType, currentPlayer.id, playerUpdates);
    setOpenPlayerDialog(false);
  };

  const handlePlayerUpdateChange = (e) => {
    const { name, value } = e.target;
    setPlayerUpdates({
      ...playerUpdates,
      [name]: parseInt(value, 10) || 0,
    });
  };

  const handleOpenMomentDialog = () => {
    setMomentData({
      description: '',
      type: 'catch',
    });
    setOpenMomentDialog(true);
  };

  const handleMomentChange = (e) => {
    const { name, value } = e.target;
    setMomentData({
      ...momentData,
      [name]: value,
    });
  };

  const handleMomentSubmit = () => {
    onAddSpecialMoment(momentData);
    setOpenMomentDialog(false);
  };

  const toggleAccordion = (section) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  return (
    <div className="bg-white rounded-lg p-4 mb-6 border border-dashed border-blue-500">
      <h3 className="text-lg font-semibold text-blue-600 mb-4">
        Admin Controls
      </h3>
      
      <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleAccordion('score')}
          className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        >
          <span className="font-medium">Update Match Score</span>
          <svg
            className={`w-5 h-5 transition-transform ${activeAccordion === 'score' ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeAccordion === 'score' && (
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">{match.homeTeam}</h4>
                <div className="flex gap-3 mb-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Score</label>
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      value={homeScore}
                      onChange={(e) => setHomeScore(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Wickets</label>
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      value={homeWickets}
                      onChange={(e) => setHomeWickets(parseInt(e.target.value, 10) || 0)}
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-2">{match.awayTeam}</h4>
                <div className="flex gap-3 mb-3">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Score</label>
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      value={awayScore}
                      onChange={(e) => setAwayScore(parseInt(e.target.value, 10) || 0)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Wickets</label>
                    <input
                      type="number"
                      className="w-24 px-2 py-1 border border-gray-300 rounded"
                      value={awayWickets}
                      onChange={(e) => setAwayWickets(parseInt(e.target.value, 10) || 0)}
                      min="0"
                      max="10"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-2"
              onClick={handleScoreUpdate}
            >
              Update Score
            </button>
          </div>
        )}
      </div>
      
      <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleAccordion('players')}
          className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        >
          <span className="font-medium">Update Player Stats</span>
          <svg
            className={`w-5 h-5 transition-transform ${activeAccordion === 'players' ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeAccordion === 'players' && (
          <div className="p-4 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">{match.homeTeam} Players</h4>
                {match.homePlayers.map((player) => (
                  <button 
                    key={player.id}
                    className="block w-full text-left mb-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => handleOpenPlayerDialog(player, 'home')}
                  >
                    {player.name}
                  </button>
                ))}
              </div>
              <div>
                <h4 className="font-medium mb-3">{match.awayTeam} Players</h4>
                {match.awayPlayers.map((player) => (
                  <button 
                    key={player.id}
                    className="block w-full text-left mb-2 px-3 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    onClick={() => handleOpenPlayerDialog(player, 'away')}
                  >
                    {player.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mb-3 border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleAccordion('moments')}
          className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
        >
          <span className="font-medium">Add Special Moment</span>
          <svg
            className={`w-5 h-5 transition-transform ${activeAccordion === 'moments' ? 'transform rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
        {activeAccordion === 'moments' && (
          <div className="p-4 border-t border-gray-200">
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              onClick={handleOpenMomentDialog}
            >
              Record New Moment
            </button>
          </div>
        )}
      </div>
      
      {/* Player Update Dialog */}
      {openPlayerDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Update {currentPlayer?.name}
            </h3>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Runs</label>
                <input
                  type="number"
                  name="runs"
                  value={playerUpdates.runs}
                  onChange={handlePlayerUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Wickets</label>
                <input
                  type="number"
                  name="wickets"
                  value={playerUpdates.wickets}
                  onChange={handlePlayerUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Catches</label>
                <input
                  type="number"
                  name="catches"
                  value={playerUpdates.catches}
                  onChange={handlePlayerUpdateChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenPlayerDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handlePlayerUpdateSubmit}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Special Moment Dialog */}
      {openMomentDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Record Special Moment</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Moment Type</label>
              <select
                name="type"
                value={momentData.type}
                onChange={handleMomentChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="catch">Catch</option>
                <option value="wicket">Wicket</option>
                <option value="six">Six</option>
                <option value="four">Four</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={momentData.description}
                onChange={handleMomentChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpenMomentDialog(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleMomentSubmit}
                disabled={!momentData.description}
              >
                Add Moment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );}