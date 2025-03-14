"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  changeType?: 'increase' | 'decrease' | 'neutral';
  trend?: React.ReactNode;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  change,
  changeType = 'neutral',
  trend,
  className
}) => {
  return (
    <Card className={cn(
      "p-6 bg-white dark:bg-slate-800 shadow-lg dark:shadow-slate-900/10 border-none",
      className
    )}>
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <div className="flex items-end space-x-1">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{value}</h3>
            {change && (
              <div className={cn(
                "flex items-center text-xs font-medium ml-2",
                changeType === 'increase' ? "text-green-600 dark:text-green-400" : 
                changeType === 'decrease' ? "text-red-600 dark:text-red-400" : 
                "text-slate-600 dark:text-slate-400"
              )}>
                {trend && <span className="mr-1">{trend}</span>}
                <span>{change}</span>
              </div>
            )}
          </div>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
          <div className="text-blue-600 dark:text-blue-400">
            {icon}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StatCard;