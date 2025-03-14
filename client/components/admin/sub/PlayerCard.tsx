"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PlayerProps {
  id: number;
  name: string;
  university: string;
  type: 'batsman' | 'bowler' | 'all-rounder';
  runs?: number;
  wickets?: number;
  matches?: number;
  economy?: number;
}

interface PlayerCardProps {
  player: PlayerProps;
  colorScheme: 'blue' | 'green' | 'slate' | 'red';
  statLabel: string;
  secondaryStat: string;
  dualStat?: boolean;
  className?: string;
}

const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  colorScheme = 'blue',
  statLabel,
  secondaryStat,
  dualStat = false,
  className
}) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-100 dark:bg-blue-900/30',
          text: 'text-blue-600 dark:text-blue-400',
          border: 'border-blue-200 dark:border-blue-800/50',
          card: 'from-blue-500/5 to-blue-100/0 dark:from-blue-500/10 dark:to-transparent'
        };
      case 'green':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-600 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800/50',
          card: 'from-green-500/5 to-green-100/0 dark:from-green-500/10 dark:to-transparent'
        };
      case 'red':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-600 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800/50',
          card: 'from-red-500/5 to-red-100/0 dark:from-red-500/10 dark:to-transparent'
        };
      case 'slate':
      default:
        return {
          bg: 'bg-slate-100 dark:bg-slate-800/50',
          text: 'text-slate-600 dark:text-slate-300',
          border: 'border-slate-200 dark:border-slate-700',
          card: 'from-slate-500/5 to-slate-100/0 dark:from-slate-500/10 dark:to-transparent'
        };
    }
  };

  const colors = getColorClasses(colorScheme);
  const statValue = player[statLabel as keyof PlayerProps];
  
  return (
    <Card className={cn(
      `p-4 bg-gradient-to-b ${colors.card} border ${colors.border} shadow-md`,
      className
    )}>
      <div className="flex items-center space-x-3 mb-2">
        <div className={`w-10 h-10 rounded-full ${colors.bg} flex items-center justify-center ${colors.text} font-semibold text-sm`}>
          {player.id}
        </div>
        <div>
          <h4 className="font-medium text-slate-900 dark:text-slate-100">{player.name}</h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">{player.university}</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200 dark:border-slate-700/50">
        <div className="flex flex-col">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {player.type.charAt(0).toUpperCase() + player.type.slice(1)}
          </span>
        </div>
        
        <div className="text-right">
          {dualStat ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                {player.runs} <span className="text-xs">runs</span>
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {player.wickets} <span className="text-xs">wkts</span>
              </span>
            </div>
          ) : (
            <div className="space-y-1">
              <div className={`text-sm font-semibold ${colors.text}`}>
                {statValue} <span className="text-xs">{statLabel}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">{secondaryStat}</p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;