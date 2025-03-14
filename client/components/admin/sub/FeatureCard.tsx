"use client"

import React from 'react';
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  className
}) => {
  return (
    <div className={cn(
      "text-center p-6 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 shadow-lg",
      className
    )}>
      <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-blue-100/80">{description}</p>
    </div>
  );
};

export default FeatureCard;