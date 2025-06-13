import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";


// Komponen bintang dinamis
function StarRating({ score, baseScore }) {
    const maxStars = 5;
    const stars = Math.round((score / baseScore) * maxStars);
    return (
        <div className="flex items-center justify-center mb-2">
            {[...Array(maxStars)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-2xl">
                    {i < stars ? "★" : "☆"}
                </span>
            ))}
        </div>
    );
}

export default function ResultPage({ score: defaultScore = 0, baseScore: defaultBaseScore = 1 }) {
    const navigate = useNavigate();

    const location = useLocation();
    const score = location.state?.score ?? defaultScore;
    const baseScore = location.state?.baseScore ?? defaultBaseScore;


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-cyan-200 to-blue-300 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="flex flex-col items-center justify-center flex-1 w-full">
                {/* Title */}
                <div className="bg-purple-200 px-8 py-3 rounded-2xl mb-8 shadow-md mt-1">
                    <h1 className="text-2xl font-bold text-gray-800">Kerja Bagus!</h1>
                </div>

                {/* Score Card */}
                <div className="bg-orange-100 rounded-3xl px-12 py-4 w-full max-w-lg flex flex-col items-center mb-6 shadow-lg">
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

                {/* Tombol */}
                <div className="flex justify-between w-full max-w-lg mb-6 gap-8">
                    <button
                        onClick={() => navigate("/test")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-2 rounded-2xl transition"
                    >
                        Test
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-8 py-2 rounded-2xl transition"
                    >
                        Selesai
                    </button>
                </div>
            </div>
        </div>
    );
}
