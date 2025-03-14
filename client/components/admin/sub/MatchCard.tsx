"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from 'lucide-react';

interface MatchProps {
  id: number;
  teams: string;
  date: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  venue: string;
}

interface MatchCardProps {
  match: MatchProps;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
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
        <div className="flex items-center">
          <div className="mr-2 h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-600 dark:text-green-400 text-xs font-medium">LIVE</span>
        </div>
      );
    }
    return null;
  }

  return (
    <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-medium text-slate-900 dark:text-slate-100">{match.teams}</h4>
        <Badge className={getStatusColor(match.status)}>
          {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
        </Badge>
      </div>
      
      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 mb-2">
        <Calendar className="h-3 w-3 mr-1" />
        <span>{match.date}</span>
        {getLiveIndicator(match.status)}
      </div>
      
      <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
        <MapPin className="h-3 w-3 mr-1" />
        <span>{match.venue}</span>
      </div>
    </div>
  );
};

export default MatchCard;