import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";

// Komponen bintang dinamis
function StarRating({ score, baseScore }) {
  const maxStars = 5;
  const stars = Math.round((score / baseScore) * maxStars);
  const starsArr = [];
  for (let i = 0; i < maxStars; i++) {
    starsArr.push(
      <span key={i} className="text-yellow-400 text-2xl">
        {i < stars ? "★" : "☆"}
      </span>
    );
  }
  return <div className="flex items-center justify-center mb-2">{starsArr}</div>;
}

export default function ResultPageTest({ score: defaultScore = 0, baseScore: defaultBaseScore = 0 }) {
  const navigate = useNavigate();

  // Untuk ambil score dari Test
  const location = useLocation();
  const score = location.state?.score ?? defaultScore;
  const baseScore = location.state?.baseScore ?? defaultBaseScore;
  console.log(score, baseScore)

  return (
    <div className="min-h-screen w-full bg-[#95e2ff] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col items-center flex-1 justify-center">
        {/* Title */}
        <div className="bg-purple-200 px-8 py-2 rounded-xl mt-0 mb-6 shadow text-center">
          <span className="text-2xl font-bold text-[#222] tracking-widest">
            Kerja Bagus!
          </span>
        </div>

        {/* Score Card */}
        <div className="bg-orange-100 rounded-3xl px-12 py-8 w-full max-w-lg flex flex-col items-center mb-1 shadow-lg">
          <div className="text-lg font-semibold text-gray-800 mb-2">Skor :</div>
          <StarRating score={score} baseScore={baseScore} />
          <div className="text-3xl font-bold text-gray-800 mb-1 flex items-center gap-2">
				{((score / baseScore) * 100).toFixed(0)}
            <span role="img" aria-label="trophy" className="text-yellow-500 text-2xl">🏆</span>
          </div>
          <div className="text-center text-sm text-gray-700 mt-2">
            Wow! Kamu makin jago membaca! <br />
            NaraBaca bangga padamu!
          </div>
        </div>

        {/* Input Username */}
        <h1 className="text-2xl font-bold text-gray-800 mt-5 mb-5">Tulis Nama Kamu Di Sini!</h1>
        <div className="bg-purple-200 w-xl h-auto rounded-2xl shadow-md p-4 mb-8">                  
          <div className="flex items-center justify-center">
          <input 
              id="inputUsername" 
              className="w-full pl-2 pr-2 justify-center text-center font-bold text-xl" 
              type="text"
              autoFocus />
          </div>
        </div>

        {/* Tombol bawah */}
        <div className="flex justify-between w-full max-w-md mb-6">
          <button
            onClick={() => navigate("/practice")}
            className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-2xl shadow-md transition"
          >
            Latihan lagi
          </button>
          <button
            onClick={() => navigate("/leaderboard")}
            className="bg-gray-100 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-3 rounded-2xl shadow-md transition"
          >
            Leaderboard
          </button>
        </div>
      </div>
    </div>
  );
}
