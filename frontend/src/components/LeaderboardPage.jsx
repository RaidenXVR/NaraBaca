import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

// Function to generate avatar URL (keep existing function)
const getAvatarUrl = (name) => {
  return `https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${name}&backgroundColor=ffdfbf,ffd5dc,c0aede,bde4f4&scale=80`;
};

// Rank badge function (keep existing function)
function getRankBadge(rank, isTop) {
  if (isTop) return <span className="text-3xl mr-2">👑</span>;
  if (rank === 2) return <span className="text-2xl mr-2">🥈</span>;
  if (rank === 3) return <span className="text-2xl mr-2">🥉</span>;
  return (
    <span className="text-base mr-2 bg-white rounded-full px-3 py-1 border-2 border-blue-400 text-blue-500 font-bold">
      #{rank}
    </span>
  );
}

// Helper function to determine player level based on score
function getPlayerLevel(score) {
  if (score >= 90) return "Master Reader";
  if (score >= 80) return "Expert Reader";
  if (score >= 70) return "Advanced Reader";
  if (score >= 60) return "Intermediate";
  return "Beginner";
}

// Helper function to determine reward based on rank
function getReward(rank) {
  if (rank === 1) return "🏆 Gold";
  if (rank === 2) return "🥈 Silver";
  if (rank === 3) return "🥉 Bronze";
  if (rank <= 5) return "🎖️ Top 5";
  return "🎖️ Top 10";
}

export default function LeaderboardPage() {
  const navigate = useNavigate();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/leaderboards`);
      if (!response.ok) {
        throw new Error("Failed to fetch leaderboard data");
      }
      const data = await response.json();

      // Transform API data to match our UI requirements
      const transformedData = data.data.map((item, index) => ({
        rank: index + 1,
        name: item.name,
        level: getPlayerLevel(item.score),
        score: item.score,
        stars: Math.ceil(item.score / 20), // Calculate stars based on score
        reward: getReward(index + 1),
        isTop: index === 0, // First place is top
      }));

      setLeaderboardData(transformedData);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
      setError("Failed to load leaderboard data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#8ee6fc] to-[#7fd0f6] flex items-center justify-center">
        <div className="text-white text-xl font-bold">
          Loading leaderboard...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#8ee6fc] to-[#7fd0f6] flex items-center justify-center">
        <div className="text-red-500 text-xl font-bold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#8ee6fc] to-[#7fd0f6] flex flex-col">
      {/* HEADER */}
      <Header />

      {/* STAR DECORATION */}
      <span className="absolute left-10 top-1/3 text-white text-3xl select-none">
        ✦
      </span>
      <span className="absolute right-10 bottom-10 text-white text-3xl select-none">
        ✦
      </span>

      {/* LEADERBOARD TITLE */}
      <div className="w-full flex justify-center mt-4 sm:mt-8 mb-4 sm:mb-6 px-4">
        <div className="bg-[#7fd0f6] px-8 sm:px-16 py-2 sm:py-3 rounded-xl shadow-lg border-2 border-white">
          <span className="text-2xl sm:text-3xl font-bold tracking-wide text-white">
            Leaderboard
          </span>
        </div>
      </div>

      {/* LEADERBOARD LIST */}
      <div className="flex flex-col items-center w-full px-2 sm:px-4 pb-12">
        {leaderboardData.map((player, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl ${player.isTop
                ? "bg-gradient-to-r from-yellow-100 to-[#aeeaff]"
                : "bg-[#aeeaff]"
              } rounded-2xl mb-4 sm:mb-6 p-4 sm:px-8 sm:py-4 shadow-lg border-2 border-white transition-transform hover:scale-102`}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-full sm:w-[10%] mb-2 sm:mb-0">
              {getRankBadge(player.rank, player.isTop)}
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center gap-3 w-full sm:w-[30%] justify-center sm:justify-start mb-2 sm:mb-0">
              <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12">
                <img
                  src={getAvatarUrl(player.name)}
                  alt={player.name}
                  className="w-full h-full rounded-full bg-white p-1 border-2 border-white shadow-md object-contain"
                />
                {player.isTop && (
                  <span className="absolute -top-2 -right-2 text-lg sm:text-xl">
                    ✨
                  </span>
                )}
              </div>
              <div className="text-center sm:text-left">
                <div className="font-bold text-base sm:text-lg text-[#222]">
                  {player.name}
                </div>
                <div className="text-xs text-gray-600">{player.level}</div>
              </div>
            </div>

            {/* Score & Stars */}
            <div className="flex items-center justify-center w-full sm:w-[40%] mb-2 sm:mb-0">
              <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-[300px] gap-4">
                <div className="flex items-center justify-end sm:justify-end gap-2 min-w-[150px]">
                  <span className="text-blue-500 text-lg sm:text-xl w-6 text-center">
                    🎯
                  </span>
                  <span className="font-bold text-base sm:text-lg text-[#222] w-12 text-right">
                    {player.score}
                  </span>
                  <span className="text-xs text-gray-500 w-10">%</span>
                </div>
                <div className="flex items-center justify-start gap-1 min-w-[100px]">
                  {"⭐".repeat(player.stars)}
                </div>
              </div>
            </div>

            {/* Reward */}
            <div className="flex items-center justify-center sm:justify-end w-full sm:w-[20%]">
              <span className="font-bold text-base sm:text-lg text-[#222]">
                {player.reward}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
