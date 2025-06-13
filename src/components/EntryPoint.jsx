import React from "react";
import { useNavigate } from "react-router-dom";
import charactersImg from "../assets/characters.png";
import playIcon from "../assets/play.png";
import book_bg1 from "/book_bg1.svg"
import book_open from "/book_open.svg"
import book_bg2 from "/book_bg2.svg"
import book_bg3 from "/book_bg3.svg"
import SVGButton from "./SVGButton";


export default function EntryPoint() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-blue-300 overflow-hidden">
            {/* About Us Button */}
            <button
                className="absolute top-8 right-12 flex items-center gap-2 bg-white bg-opacity-60 px-5 py-2 rounded-full shadow hover:bg-opacity-80 transition"
                onClick={() => navigate('/about')}
            >
                <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="font-medium text-gray-700">Tentang Kami</span>
            </button>

            {/* Main Content */}
            <div className="relative flex items-center justify-center w-full max-w-6xl px-4 sm:px-6">
                {/* Main Box */}
                <div className="relative bg-orange-100 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center w-full max-w-5xl min-h-[440px] px-6 sm:px-10 lg:px-20 py-10 sm:py-12 lg:py-16 gap-6 sm:gap-10">
                    {/* Buttons Section */}
                    <div className="flex flex-col items-center justify-center w-full lg:w-1/2 gap-4 sm:gap-6">
                        <SVGButton
                            onClick={() => navigate('/practice')}
                            src={book_bg1}
                            text="Latihan"
                            svgClassName=""
                            buttonClassName="hover:bg-cyan-200 text-white font-extrabold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-md text-lg sm:text-md transition duration-300"
                        />
                        <SVGButton
                            onClick={() => navigate('/test')}
                            src={book_bg2}
                            text="Tes"
                            svgClassName=""
                            buttonClassName="hover:bg-cyan-200 text-white font-extrabold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-md text-lg sm:text-xl transition duration-300"
                        />
                        <SVGButton
                            onClick={() => navigate('/leaderboard')}
                            src={book_bg3}
                            text="Leaderboard"
                            svgClassName=""
                            buttonClassName="hover:bg-cyan-200 text-white font-extrabold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-md text-lg sm:text-xl transition duration-300"
                        />
                    </div>

                    {/* Image Section */}
                    <div className="flex justify-center items-center w-full lg:w-1/2">
                        <img src={book_open} className="w-48 sm:w-64 md:w-72 lg:w-80" alt="Open Book" />
                    </div>
                </div>
            </div>
        </div>
    );
}
