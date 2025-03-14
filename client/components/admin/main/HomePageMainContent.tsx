"use client"

import React from 'react';
import BudgetOverviewCard from '../sub/BudgetOverview';
import MatchesOverviewCard from '../sub/MatchesOverviewCard';
import TeamsOverviewCard from '../sub/TeamOverviewCard';


const MainContent = () => {
  // Sample Data
  const budgetData = {
    totalBudget: 100000,
    usedBudget: 45000
  };

  const teamsData = [
    { 
      id: 1, 
      name: "Team Thunder", 
      university: "University of Colombo", 
      points: 2850,
      rank: 1,
      change: "+2"
    },
    { 
      id: 2, 
      name: "Cricket Kings", 
      university: "University of Peradeniya", 
      points: 2720,
      rank: 2,
      change: "0"
    },
    { 
      id: 3, 
      name: "Royal Strikers", 
      university: "University of Moratuwa", 
      points: 2680,
      rank: 3,
      change: "+1"
    },
    { 
      id: 4, 
      name: "Eastern Eagles", 
      university: "Eastern University", 
      points: 2580,
      rank: 4,
      change: "-1"
    }
  ];

  const matchesData = [
    {
      id: 1,
      teams: "Dragons vs Lions",
      date: "Tomorrow, 2:30 PM",
      status: "upcoming" as const,
      venue: "Central University Ground"
    },
    {
      id: 2,
      teams: "Titans vs Warriors",
      date: "Live - 32 overs",
      status: "ongoing" as const,
      venue: "National Cricket Stadium"
    },
    {
      id: 3,
      teams: "Panthers vs Wolves",
      date: "Yesterday",
      status: "completed" as const,
      venue: "Eastern Cricket Academy"
    },
    {
      id: 4,
      teams: "Northern Knights vs Southern Stars",
      date: "Today, 6:00 PM",
      status: "upcoming" as const,
      venue: "University Sports Complex"
    }
  ];

  const handleMatchClick = (match: any) => {
    console.log('Match clicked:', match);
    // Handle match click - e.g., navigate to match details
  };

  return (
    <div className="space-y-8">
      {/* Main Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetOverviewCard 
          totalBudget={budgetData.totalBudget} 
          usedBudget={budgetData.usedBudget} 
        />
        
        <TeamsOverviewCard 
          teams={teamsData} 
        />
        
        <MatchesOverviewCard 
          matches={matchesData} 
          onMatchClick={handleMatchClick} 
        />
      </div>
 
    </div>
  );
};

export default MainContent;