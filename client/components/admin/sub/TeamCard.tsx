"use client"

import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface TeamProps {
  id: number;
  name: string;
  university: string;
  points: number;
  players: number;
  rank: number;
  change: string;
}

interface TeamCardProps {
  team: TeamProps;
}

const TeamCard: React.FC<TeamCardProps> = ({ team }) => {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-sm">
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
          {team.rank}
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-slate-100">{team.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{team.university}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <p className="text-xs text-slate-500 dark:text-slate-400">Points</p>
          <p className="font-semibold text-slate-900 dark:text-slate-100">{team.points}</p>
        </div>
        <Badge 
          className={`
            flex items-center px-2 py-1 text-xs
            ${team.change.startsWith('+') 
              ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
              : team.change === '0' 
              ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
              : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
            }
          `}
        >
          {team.change.startsWith('+') ? (
            <ArrowUpRight className="h-3 w-3 mr-1" />
          ) : team.change === '0' ? null : (
            <ArrowDownRight className="h-3 w-3 mr-1" />
          )}
          {team.change}
        </Badge>
      </div>
    </div>
  );
};

export default TeamCard;