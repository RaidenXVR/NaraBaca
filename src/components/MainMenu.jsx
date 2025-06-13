import React from "react";
import { useNavigate } from "react-router-dom";
import charactersImg from "../assets/characters.png";
import playIcon from "../assets/play.png";


export default function MainMenu() {
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
      <div className="relative flex items-center justify-center w-full max-w-6xl px-6">
        {/* Kotak Oren Besar */}
        <div className="relative bg-orange-100 rounded-3xl shadow-2xl flex items-center w-full max-w-5xl min-h-[440px] px-20 py-16">
          <div className="flex-1 min-w-[320px]">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Selamat Datang di</h2>
            <h1 className="text-6xl font-extrabold text-gray-900 mb-4">NaraBaca</h1>
            <p className="text-lg text-gray-700 mb-1">Ayoo kita latihan membaca bersama NaraBaca!</p>
            <p className="text-lg text-gray-700 mb-10">Belajar jadi lebih seru dan asik!</p>
            <button className="flex items-center gap-3 bg-[#2687F2] hover:bg-blue-700 text-white font-extrabold px-8 py-4 rounded-2xl shadow-md text-lg transition duration-300"
              onClick={() => navigate('/main-menu')}
            >
              {/* Icon Play */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M6 4l15 8-15 8z" />
              </svg>
              <span className="tracking-widest">MULAI</span>
            </button>
          </div>
          {/* Karakter Masuk Dalam Kotak */}
          <div className="flex-1 flex justify-end items-end">
            <img
              src={charactersImg}
              alt="Characters"
              className="w-[px] md:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-xl"
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
