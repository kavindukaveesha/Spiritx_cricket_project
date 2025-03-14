"use client"

import React from 'react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'accent' | 'default';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  title,
  icon,
  onClick,
  className,
  variant = 'default'
}) => {
  const getVariantClasses = (variant: string) => {
    switch (variant) {
      case 'primary':
        return 'border-blue-600/30 hover:bg-blue-600/5 text-blue-600';
      case 'secondary':
        return 'border-green-600/30 hover:bg-green-600/5 text-green-600';
      case 'accent':
        return 'border-purple-600/30 hover:bg-purple-600/5 text-purple-600';
      case 'default':
      default:
        return 'border-blue-600/30 hover:bg-blue-600/5 text-blue-600';
    }
  };

  const variantClasses = getVariantClasses(variant);

  return (
    <Button 
      variant="outline" 
      onClick={onClick}
      className={cn(
        "flex flex-col h-24 justify-center items-center",
        variantClasses,
        "transition-all duration-200 hover:shadow-md",
        className
      )}
    >
      <div className="mb-2">{icon}</div>
      <span className="text-sm font-medium">{title}</span>
    </Button>
  );
};

export default ActionButton;