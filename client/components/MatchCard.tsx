export default function MatchCard({ match, onClick }: { match: any, onClick: any }) {
  const getStatusColor = (status: any) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-500';
      case 'ongoing': return 'bg-green-500';
      case 'ended': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className={`${getStatusColor(match.status)} text-white text-center py-1`}>
        <span className="text-xs font-semibold uppercase">{match.status}</span>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-blue-600 text-center mb-3">
          {match.homeTeam} vs {match.awayTeam}
        </h2>
        
        {(match.status === 'ongoing' || match.status === 'ended') && (
          <div className="flex justify-around mb-4">
            <div className="text-center">
              <div className="text-sm text-gray-600">{match.homeTeam}</div>
              <div className="text-xl font-semibold">{match.homeScore}</div>
            </div>
            <div className="self-center">-</div>
            <div className="text-center">
              <div className="text-sm text-gray-600">{match.awayTeam}</div>
              <div className="text-xl font-semibold">{match.awayScore}</div>
            </div>
          </div>
        )}
        
        <div className="flex items-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">
            {new Date(match.date).toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm text-gray-600">{match.venue}</span>
        </div>
      </div>
    </div>
  );
}