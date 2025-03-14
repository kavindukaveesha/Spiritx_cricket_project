"use client"

import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";

interface BudgetOverviewCardProps {
  totalBudget: number;
  usedBudget: number;
  className?: string;
}

const BudgetOverviewCard: React.FC<BudgetOverviewCardProps> = ({
  totalBudget,
  usedBudget,
  className
}) => {
  const remainingBudget = totalBudget - usedBudget;
  const percentageUsed = (usedBudget / totalBudget) * 100;

  return (
    <Card className={`card-fixed-height bg-gradient-to-br from-blue-500/5 to-blue-500/10 shadow-lg dark:shadow-blue-900/5 ${className}`}>
      <div className="card-header p-4 border-b border-slate-200 dark:border-slate-700/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
              <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Budget Overview</h3>
          </div>
          <Badge className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
            Tournament Budget
          </Badge>
        </div>
      </div>
      
      <div className="card-content p-4">
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-600 dark:text-slate-400">Total Budget</span>
            <span className="font-semibold text-slate-900 dark:text-slate-100">${totalBudget.toLocaleString()}</span>
          </div>
          
          <div className="h-2.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" 
              style={{ width: `${percentageUsed}%` }}
            ></div>
          </div>
          
          <div className="flex justify-between">
            <div className="space-y-1">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Used Budget</span>
              <p className="font-semibold text-blue-600 dark:text-blue-400">${usedBudget.toLocaleString()}</p>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-slate-600 dark:text-slate-400 text-sm">Remaining</span>
              <p className="font-semibold text-green-600 dark:text-green-400">
                ${remainingBudget.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BudgetOverviewCard;