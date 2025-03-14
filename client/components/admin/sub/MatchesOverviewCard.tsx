"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface Match {
  id: number;
  teams: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
}

interface MatchesOverviewCardProps {
  matches: Match[];
  onMatchClick?: (match: Match) => void;
  className?: string;
}

const MatchesOverviewCard: React.FC<MatchesOverviewCardProps> = ({
  matches,
  onMatchClick,
  className
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
      case 'upcoming':
        return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400';
      case 'completed':
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
      default:
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getLiveIndicator = (status: string) => {
    if (status === 'ongoing') {
      return (
        <div className="flex items-center ml-2">
          <div className="mr-1 h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-600 dark:text-green-400 text-xs font-medium">LIVE</span>
        </div>
      );
    }
    return null;
  }

  return (
    <Card className={`card-fixed-height bg-gradient-to-br from-green-500/5 to-green-500/10 shadow-lg dark:shadow-green-900/5 ${className}`}>
      <div className="card-header p-4 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 dark:bg-green-900/30">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Recent Matches</h3>
          </div>
          <Badge className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            Today&apos;s Schedule
          </Badge>
        </div>
      </div>
      
      <div className="card-content p-4">
        <div className="space-y-2">
          {matches.map((match) => (
            <div 
              key={match.id} 
              className="p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-sm cursor-pointer"
              onClick={() => onMatchClick && onMatchClick(match)}
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{match.teams}</h4>
                <Badge className={`text-xs px-1.5 py-0.5 ${getStatusColor(match.status)}`}>
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </Badge>
              </div>
              
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                <span>{match.date}</span>
                {getLiveIndicator(match.status)}
              </div>
              
              <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1">
                <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                <span className="truncate">{match.venue}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default MatchesOverviewCard;