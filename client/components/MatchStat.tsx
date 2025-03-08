// components/MatchStat.js
export default function MatchStat({ score, wickets, teamType, match }) {
  // Calculate total runs by all players
  const players = teamType === 'home' ? match.homePlayers : match.awayPlayers;
  const totalPlayerRuns = players.reduce((sum, player) => sum + player.runs, 0);
  
  // Calculate total wickets by all players
  const totalPlayerWickets = players.reduce((sum, player) => sum + player.wickets, 0);
  
  // Calculate total catches by all players
  const totalPlayerCatches = players.reduce((sum, player) => sum + player.catches, 0);
  
  // Find top scorer
  const topScorer = [...players].sort((a, b) => b.runs - a.runs)[0];
  
  // Find top wicket taker
  const topWicketTaker = [...players].sort((a, b) => b.wickets - a.wickets)[0];

  return (
    <div className="space-y-4">
      <div>
        <div className="text-sm text-gray-600">Score</div>
        <div className="text-xl font-bold">{score}/{wickets}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-600">Run Rate</div>
        <div>{(score / 20).toFixed(2)}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-600">Top Scorer</div>
        <div>
          {topScorer.name} - {topScorer.runs} runs
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-600">Top Wicket Taker</div>
        <div>
          {topWicketTaker.name} - {topWicketTaker.wickets} wickets
        </div>
      </div>
      
      <div>
        <div className="text-sm text-gray-600">Total Catches</div>
        <div>{totalPlayerCatches}</div>
      </div>
      
      <div>
        <div className="text-sm text-gray-600 mb-2">Score Distribution</div>
        <div className="mb-2">
          <div className="flex items-center">
            <span className="w-20 text-xs">Runs</span>
            <div className="w-full ml-2">
              <div className="bg-blue-500 h-2 rounded-full w-full"></div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center">
            <span className="w-20 text-xs">Wickets</span>
            <div className="w-full ml-2">
              <div 
                className="bg-blue-500 h-2 rounded-full" 
                style={{ width: `${(wickets / 10) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
