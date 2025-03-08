// Cricket Pitch Background Component
const CricketPitchBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-cricket-pitch/50 to-[#0A2342]/70 opacity-80"></div>
    
    {/* Cricket Pitch Texture */}
    <div className="absolute inset-0 opacity-20">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <pattern id="cricket-pitch-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
          <path 
            d="M0 0 L10 0 L5 5 Z" 
            fill="rgba(255,255,255,0.1)" 
          />
        </pattern>
        <rect 
          x="0" 
          y="0" 
          width="100%" 
          height="100%" 
          fill="url(#cricket-pitch-pattern)" 
        />
      </svg>
    </div>

    {/* Cricket Elements */}
    <div className="absolute top-10 left-10 transform rotate-[-15deg] opacity-30">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="100" 
        height="100" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="1"
      >
        <path d="M3 14l3.5-3.5L8 13l4-4 3 3 5-5" />
        <path d="M12 5l3 3 5-5v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3z" />
      </svg>
    </div>

    <div className="absolute bottom-10 right-10 transform rotate-[15deg] opacity-30">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="150" 
        height="150" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="white" 
        strokeWidth="1"
      >
        <path d="M16 22h2a2 2 0 0 0 2-2V7.5l-5-5H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
        <path d="M9 12v-5" />
        <path d="M15 12v-5" />
        <path d="M12 12v-5" />
      </svg>
    </div>
  </div>
);
export default CricketPitchBackground;