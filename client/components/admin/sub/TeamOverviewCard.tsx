"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface Team {
  id: number;
  name: string;
  university: string;
  points: number;
  rank: number;
  change: string;
}

interface TeamsOverviewCardProps {
  teams: Team[];
  className?: string;
}

const TeamsOverviewCard: React.FC<TeamsOverviewCardProps> = ({
  teams,
  className
}) => {
  return (
    <Card className={`card-fixed-height bg-gradient-to-br from-slate-800/5 to-slate-800/10 shadow-lg dark:shadow-slate-900/5 ${className}`}>
      <div className="card-header p-4 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Top Teams</h3>
          </div>
          <Badge className="bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            Ranking
          </Badge>
        </div>
      </div>
      
      <div className="card-content p-4">
        <div className="space-y-2">
          {teams.map((team) => (
            <div 
              key={team.id} 
              className="flex items-center justify-between p-2 rounded-lg bg-white/60 dark:bg-slate-800/60 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs font-bold">
                  {team.rank}
                </div>
                <div>
                  <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{team.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{team.university}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">Points</p>
                  <p className="font-semibold text-xs text-slate-900 dark:text-slate-100">{team.points}</p>
                </div>
                <Badge 
                  className={`
                    flex items-center px-1.5 py-0.5 text-xs
                    ${team.change.startsWith('+') 
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
                      : team.change === '0' 
                      ? 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                      : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    }
                  `}
                >
                  {team.change.startsWith('+') ? (
                    <ArrowUpRight className="h-3 w-3 mr-0.5" />
                  ) : team.change === '0' ? null : (
                    <ArrowDownRight className="h-3 w-3 mr-0.5" />
                  )}
                  {team.change}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TeamsOverviewCard;