import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const teamMembers = [
  {
    name: "Nara",
    title: "Team Lead",
    photo: "https://i.pravatar.cc/150?img=7",
    description: "Pengembang aplikasi dan pengelola proyek.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Team 2",
    title: "UI/UX Designer",
    photo: "https://i.pravatar.cc/150?img=11",
    description: "Bertanggung jawab untuk desain visual dan pengalaman pengguna.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
  {
    name: "Team 3",
    title: "Front-End Developer",
    photo: "https://i.pravatar.cc/150?img=12",
    description: "Implementasi tampilan dan interaksi aplikasi.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
    {
    name: "Team 4",
    title: "Front-End Developer",
    photo: "https://i.pravatar.cc/150?img=7",
    description: "Implementasi tampilan dan interaksi aplikasi.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
    {
    name: "Team 5",
    title: "Front-End Developer",
    photo: "https://i.pravatar.cc/150?img=11",
    description: "Implementasi tampilan dan interaksi aplikasi.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
    {
    name: "Team 6",
    title: "Front-End Developer",
    photo: "https://i.pravatar.cc/150?img=12",
    description: "Implementasi tampilan dan interaksi aplikasi.",
    social: {
      Instagram: "#",
      linkedin: "#",
    },
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#d9f4ff] flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-8">
        {/* Title */}
        <div className="bg-[#aee2ff] px-10 py-3 rounded-xl shadow mt-8 mb-12">
          <h1 className="text-3xl font-bold text-[#222] tracking-wide">Tentang Kami</h1>
        </div>

        {/* Team Section */}
        <div className="flex flex-wrap justify-center max-w-5xl">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 lg:w-1/3 px-4 py-6 flex flex-col items-center"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-32 h-32 rounded-full shadow-lg mb-4"
              />
              <h2 className="text-xl font-bold text-[#222]">{member.name}</h2>
              <p className="text-gray-600">{member.title}</p>
              <p className="text-gray-700 text-center mt-2">{member.description}</p>
              <div className="flex gap-4 mt-4">
                <a href={member.social.instagram} className="text-blue-500 hover:text-blue-700">
                  Instagram
                </a>
                <a href={member.social.linkedin} className="text-blue-500 hover:text-blue-700">
                  LinkedIn
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Button */}
        <button
          className="bg-[#ffc2b3] hover:bg-[#ffb3a3] text-[#222] font-bold py-3 px-8 rounded-xl mt-8 shadow-md transition duration-300"
          onClick={() => alert("Hubungi kami di email@contoh.com")}
        >
          Hubungi Kami
        </button>
      </div>
    </div>
  );
}
