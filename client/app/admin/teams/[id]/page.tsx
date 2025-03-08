// Interfaces
interface Player {
  id: number;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-Rounder' | 'Wicket-Keeper';
  age: number;
  battingStyle: string;
  bowlingStyle?: string;
  stats: {
    matches: number;
    runs?: number;
    wickets?: number;
    average?: number;
    strikeRate?: number;
  };
}

interface Match {
  id: number;
  date: string;
  opponent: string;
  result: 'Won' | 'Lost' | 'Draw';
  venue: string;
  scorecard?: {
    runs: number;
    wickets: number;
    overs: number;
  };
}

interface TeamDetails {
  id: number;
  name: string;
  university: string;
  logo?: string;
  founded: number;
  captain: string;
  coach: string;
  points: number;
  rank: number;
  stats: {
    matches: number;
    wins: number;
    losses: number;
    draws: number;
  };
  players: Player[];
  matches: Match[];
}

// Sample Team Details
const sampleTeamDetails: TeamDetails[] = [
  {
    id: 1,
    name: "Thunderbolts",
    university: "University of Colombo",
    logo: "/team-logos/thunderbolts.png",
    founded: 2015,
    captain: "Ashan Fernando",
    coach: "Kumara Sangakkara",
    points: 2850,
    rank: 1,
    stats: {
      matches: 50,
      wins: 35,
      losses: 10,
      draws: 5
    },
    players: [
      {
        id: 1,
        name: "Sachin Mendis",
        role: 'Batsman',
        age: 22,
        battingStyle: 'Right-handed',
        stats: {
          matches: 45,
          runs: 1200,
          average: 40.5,
          strikeRate: 85.6
        }
      },
      {
        id: 2,
        name: "Rajitha Kumar",
        role: 'Bowler',
        age: 24,
        battingStyle: 'Left-handed',
        bowlingStyle: 'Right-arm Fast',
        stats: {
          matches: 40,
          wickets: 65,
          average: 22.3,
          strikeRate: 35.2
        }
      },
      {
        id: 3,
        name: "Dinesh Perera",
        role: 'All-Rounder',
        age: 23,
        battingStyle: 'Right-handed',
        bowlingStyle: 'Right-arm Medium',
        stats: {
          matches: 48,
          runs: 650,
          wickets: 35,
          average: 30.5,
          strikeRate: 75.3
        }
      }
    ],
    matches: [
      {
        id: 1,
        date: "2023-09-15",
        opponent: "Cricket Kings",
        result: 'Won',
        venue: "University Ground",
        scorecard: {
          runs: 280,
          wickets: 7,
          overs: 50
        }
      },
      {
        id: 2,
        date: "2023-08-22",
        opponent: "Royal Strikers",
        result: 'Lost',
        venue: "National Stadium",
        scorecard: {
          runs: 240,
          wickets: 10,
          overs: 47.2
        }
      }
    ]
  }
];


import React from 'react';
import TeamDetailsContent from './TeamDetailsContent';
import AdminDashboardLayout from '@/components/admin-layout';

// eslint-disable-next-line @next/next/no-async-client-component
export default async function TeamDetailsPage({ params }: { params: { id: string } }) {
  // Fetch team details based on the ID
  const team =  sampleTeamDetails.find((team) => team.id === Number(params.id));

  if (!team) {
    return <div>Team not found</div>;
  }

  return <AdminDashboardLayout>
    <TeamDetailsContent team={team} />
  </AdminDashboardLayout>;
}

// This function helps with static generation of routes
export async function generateStaticParams() {
  // In a real app, you'd fetch this from your database or API
  const teams = [
    { id: '1' },
    { id: '2' },
    // Add more team IDs
  ];

  return teams.map((team) => ({
    id: team.id
  }));
}






