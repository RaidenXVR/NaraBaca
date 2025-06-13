import React, { useState, useRef } from "react";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RandomStars from "./RandomStar";
import { getRandomWord } from "../assets/words";
import axios from "axios";
import RandomCircle from "./RandomCircle";
import Header from "./Header";


export default function Practice() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [word, setWord] = useState(getRandomWord());
  const [wordsDone, setWordsDone] = useState([])
  const [showGifPopup, setShowGifPopup] = useState(false);

  const [showFailGifPopUp, setShowFailGifPopup] = useState(false);
  const [showLoadingGifPopup, setShowLoadingGifPopup] = useState(false);

  const cheersAudioRef = useRef(null);
  const failAudioRef = useRef(null);
  const [score, setScore] = useState(0);
  const [baseScore, setBaseScore] = useState(0);
  const recordingTimeoutRef = useRef(null)

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      setShowLoadingGifPopup(true)

      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });

      // Create a FormData object
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav'); // 'file' should match the parameter name in FastAPI

      // Sesuaikan
      axios.post(import.meta.env.VITE_PREDICT_URL ? import.meta.env.VITE_PREDICT_URL : 'http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Axios will set this automatically when sending FormData, but good to be explicit
        }
      }).then((val) => {
        setShowLoadingGifPopup(false)
        const predicted_words = val.data.predicted_keywords;
        if (predicted_words.includes(word.word.toLowerCase())) {
          setWordsDone(prev => [...prev, word.word]);
          setShowGifPopup(true); // Show popup
          if (cheersAudioRef.current) {
            cheersAudioRef.current.currentTime = 0;
            cheersAudioRef.current.play();
          }

          // set score
          setScore(prev => prev + word.score);
          setBaseScore(prev => prev + word.score);

          setTimeout(() => {
            setShowGifPopup(false); // Hide popup after 3s
            setWord(getRandomWord([word.word]));
          }, 3000);
        } else {

          console.log("False...", val.data, word.word.toLowerCase());
          setShowFailGifPopup(true); // Show popup

          if (failAudioRef.current) {
            failAudioRef.current.currentTime = 0;
            failAudioRef.current.play();
          }
          setTimeout(() => {
            setShowFailGifPopup(false); // Hide popup after 3s
          }, 3000);
        }
      }).catch((err) => {
        console.log(err)
      });
    };

    mediaRecorder.start();
    setRecording(true);
    recordingTimeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 3000);
  };

  const stopRecording = () => {
    if (recordingTimeoutRef.current) {
      clearTimeout(recordingTimeoutRef.current);
      recordingTimeoutRef.current = null;
    }
    mediaRecorderRef.current?.stop();
    setRecording(false);
  };

  const handleMicClick = () => {
    if (recording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const handleFinishClick = () => {
    setShowModal(true);
  };

  const handleConfirmYes = () => {
    setShowModal(false);

    navigate("/result", { state: { score: score, baseScore: baseScore } });
  };

  const handleConfirmNo = () => {
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-300 relative z-0">
      <audio ref={cheersAudioRef} src="/cheers.mp3" preload="auto" />
      <audio ref={failAudioRef} src="/fail.mp3" preload="auto" />
      <div className="absolute inset-0 pointer-events-none z-1">
        <RandomStars amount={25} />
      </div>
      <div className="absolute inset-0 pointer-events-none -z-10">
        <RandomCircle amount={15} />
      </div>

      {/* Header */}
      <Header />
		  
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8 z-10">
        {/* Title */}
        <div className="bg-purple-200 px-8 py-3 rounded-2xl mb-12 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">LATIHAN</h1>
        </div>

        {/* Word Display Card */}
        <div className="bg-orange-200 w-full max-w-2xl rounded-3xl p-12 mb-12 shadow-lg">
          <h2 className="text-5xl font-bold text-gray-800 text-center">{word.word}</h2>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-8">
          {/* Microphone Button */}
          <button
            className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center
              ${recording ? "bg-red-500 hover:bg-red-600 scale-110" : "bg-gray-300 hover:bg-gray-400"}`}
            onClick={handleMicClick}>
            <Mic size={32} className={recording ? "text-white" : "text-gray-600"} />
          </button>

          {/* Finish Button */}
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-8 py-3 rounded-2xl shadow-md transition duration-300"
            onClick={handleFinishClick}>
            Selesai
          </button>
        </div>
      </div>

      {/* Modal Konfirmasi */}
      {showModal && (
        <div className="fixed inset-0 bg-cyan-200/40 flex items-center justify-center z-50">
          <div className="bg-[#53b2b1] rounded-lg shadow-lg px-12 py-10 flex flex-col items-center w-[500px]">
            <div className="text-white text-2xl font-bold mb-8 text-center tracking-wide">
              Sudah selesai membaca?
            </div>
            <div className="flex gap-16">
              <button
                className="bg-[#f48c5b] hover:bg-[#ffb98a] text-white font-bold px-8 py-3 rounded-lg text-lg transition"
                onClick={handleConfirmNo}
              >
                Tidak
              </button>
              <button
                className="bg-[#f48c5b] hover:bg-[#ffb98a] text-white font-bold px-8 py-3 rounded-lg text-lg transition"
                onClick={handleConfirmYes}
              >
                Ya
              </button>
            </div>
          </div>
        </div>
      )}
      {showGifPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col items-center animate-popinout"
          >
            <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExN3VsaGk1aXBsbjBuNHM0azViNGd4bTc2NndnbGZpeDR4eDFkZmhmdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/PYS9of5NOhSGZ7HPpE/giphy.gif" // Replace with your local GIF if needed
              alt="Great job!"
              className="w-48 h-48 mb-4"
            />
            <div className="text-2xl font-bold text-black">Kerja Bagus! 🎉</div>
          </div>
        </div>
      )}
      {showFailGifPopUp && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col items-center animate-popinout"
          >
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExYWZxa3VnbWE3ajU2OXF5YXh5YjhvdTk5dzc2dmJsdjNtNjJiNmdteSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/t4qszh1g5tZhumqycz/giphy.gif" // Replace with your local GIF if needed
              alt="Great job!"
              className="w-48 h-48 mb-4"
            />
            <div className="text-2xl font-bold text-black">Masih Salah...</div>
          </div>
        </div>
      )}

      {showLoadingGifPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col items-center animate-popinout"
          >
            <img
              src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHZ1djcwZGR5Z21oNDBtaTNybWZlZHR2OW8ybW5hdmZiYjB3MTFtNiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Zg11hb1FdPVWwQcSuw/giphy.gif" // Replace with your local GIF if needed
              alt="Memproses..."
              className="w-48 h-48 mb-4"
            />
            <div className="text-2xl font-bold text-black">Memproses... </div>
          </div>
        </div>
      )}
    </div>
  );
}
