"use client"

import React from 'react';
import { cn } from "@/lib/utils";

interface StatisticCardProps {
  value: string;
  label: string;
  icon?: React.ReactNode;
  className?: string;
  highlight?: boolean;
}

const StatisticCard: React.FC<StatisticCardProps> = ({
  value,
  label,
  icon,
  className,
  highlight = false
}) => {
  return (
    <div className={cn(
      "p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 text-center flex flex-col items-center justify-center",
      highlight ? "bg-blue-600/20 border-blue-500/30" : "",
      className
    )}>
      {icon && (
        <div className="mb-3 text-blue-400">
          {icon}
        </div>
      )}
      <div className={cn(
        "text-3xl md:text-4xl font-bold mb-1",
        highlight ? "text-blue-400" : "text-white"
      )}>
        {value}
      </div>
      <p className="text-blue-100/70">{label}</p>
    </div>
  );
};

export default StatisticCard;