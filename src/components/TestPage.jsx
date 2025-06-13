import React, { useState, useRef, useEffect } from "react";
import { Mic, Pause, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RandomStars from "./RandomStar";
import { getRandomWord } from "../assets/words";
import axios from "axios";
import Header from "./Header";

export default function TestPage() {
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const navigate = useNavigate();
  const [word, setWord] = useState(getRandomWord());
  const [wordsDone, setWordsDone] = useState([])
  const [showGifPopup, setShowGifPopup] = useState(false);
  const [showFailGifPopUp, setShowFailGifPopup] = useState(false);
  const [showLoadingGifPopup, setShowLoadingGifPopup] = useState(false);
  const failAudioRef = useRef(null);
  const cheersAudioRef = useRef(null);
  const [score, setScore] = useState(0);
  const [baseScore, setBaseScore] = useState(0);
  const [timer, setTimer] = useState(7); // 7 seconds
  const [timerPaused, setTimerPaused] = useState(false);
  const timerRef = useRef();
  const timerStartRef = useRef(Date.now());
  const timerLeftRef = useRef(7);
  const timerPausedRef = useRef(false);
  const [userPaused, setUserPaused] = useState(false);
  const recordingTimeoutRef = useRef(null)
  const streamRef = useRef(null);

  const startRecording = async () => {
    setTimerPaused(true); // pause timer

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    audioChunksRef.current = [];

    mediaRecorder.ondataavailable = (event) => {
      audioChunksRef.current.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
      setShowLoadingGifPopup(true)
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav'); // 'file' should match the parameter name in FastAPI

      // Sesuaikan
      axios.post(import.meta.env.VITE_PREDICT_URL ? import.meta.env.VITE_PREDICT_URL : 'http://localhost:8000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((val) => {
        const predicted_words = val.data.predicted_keywords;
        setShowLoadingGifPopup(false);
        if (predicted_words.includes(word.word.toLowerCase())) {
          setWordsDone(prev => [...prev, word.word]);
          setShowGifPopup(true); // Show popup
          if (cheersAudioRef.current) {
            cheersAudioRef.current.currentTime = 0;
            cheersAudioRef.current.play();
          }

          const multiplier = timerLeftRef.current / 7
          setScore(prev => prev + Math.round(word.score * multiplier));
          setBaseScore(prev => prev + word.score);
          console.log((word.score * multiplier).toFixed(0), multiplier, word.score, score + Math.round(word.score * multiplier), "Score, Multiplier, Base Score, Total");

          setTimeout(() => {
            setShowGifPopup(false); // Hide popup after 3s
            setWord(getRandomWord([...wordsDone, word.word]));
            if (wordsDone.length == 4) {
              navigate("/test-result", { state: { score: score + Math.round(word.score * multiplier), baseScore: baseScore + word.score } })
            }
          }, 3000);
        } else {
          setShowFailGifPopup(true); // Show popup

          if (failAudioRef.current) {
            failAudioRef.current.currentTime = 0;
            failAudioRef.current.play();
          }
          setTimeout(() => {

            setTimerPaused(false);
            timerStartRef.current = Date.now();
            setShowFailGifPopup(false); // Hide popup after 3s
          }, 3000);
        }
      }).catch((err) => {
        setTimerPaused(false);
        timerStartRef.current = Date.now();
        console.log(err)
      });
    };

    mediaRecorder.start();
    setRecording(true);

    // Automatically stop after 3 seconds
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

  const handlePauseClick = () => {
    if (!timerPausedRef.current) {
      setTimerPaused(true);
      setUserPaused(true)
      const elapsed = (Date.now() - timerStartRef.current) / 1000;
      timerLeftRef.current = Math.max(0, timerLeftRef.current - elapsed);
    } else {
      setUserPaused(false)
      setTimerPaused(false);
      timerStartRef.current = Date.now();
    }
  };

  useEffect(() => {
    timerPausedRef.current = timerPaused;
  }, [timerPaused]);

  useEffect(() => {
    setTimer(7);
    timerLeftRef.current = 7;
    timerStartRef.current = Date.now();
    setTimerPaused(false);

    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {

      if (!timerPausedRef.current) {
        const elapsed = (Date.now() - timerStartRef.current) / 1000;
        const remaining = Math.max(0, timerLeftRef.current - elapsed);
        setTimer(remaining);
        if (remaining === 0) {
          clearInterval(timerRef.current);
        }
      }
    }, 50);

    return () => clearInterval(timerRef.current);
  }, [word]);

  // Pause timer when record or check
  useEffect(() => {
    if (recording) {
      // Pause timer
      setTimerPaused(true);
      // Save remaining time
      const elapsed = (Date.now() - timerStartRef.current) / 1000;
      timerLeftRef.current = Math.max(0, timerLeftRef.current - elapsed);
    } else if (!recording && !timerPaused) {
      // Resume timer
      timerStartRef.current = Date.now();
      setTimerPaused(false);
    }
  }, [recording]);

  const timerWidth = `${(timer / 7) * 100}%`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-300 relative">
      <audio ref={cheersAudioRef} src="/cheers.mp3" preload="auto" />

      <audio ref={failAudioRef} src="/fail.mp3" preload="auto" />
      <div className="w-screen h-screen absolute inset-0 pointer-events-none z-0">
        <RandomStars />
      </div>
      {/* Header mirip History */}
      <Header />
      {/* { timer} */}
      <div id="timer" className="bg-purple-300 h-2 transition-all duration-70" style={{ width: timerWidth }}>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-8 z-10">

        {/* Title */}
        <div className="bg-purple-200 px-8 py-3 rounded-2xl mb-12 shadow-md">
          <h1 className="text-2xl font-bold text-gray-800">TES</h1>
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
            onClick={handleMicClick}
          >
            <Mic size={32} className={recording ? "text-white" : "text-gray-600"} />
          </button>

          {/* Pause Button */}
          <button
            className={`w-20 h-20 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center
              ${userPaused && !recording ? "bg-blue-500 hover:bg-blue-600 scale-110 z-70" : "bg-gray-300 hover:bg-gray-400 z-0"}`}
            onClick={handlePauseClick}
            disabled={recording}
          >
            {userPaused ? (<Play />) : (<Pause />)}

          </button>
        </div>
      </div>

      {
        userPaused && !recording && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div
              className="bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col items-center"
            >
              <img
                src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZjBlaTMxNnFobDcyd3RjaWJlYnZhbWZ2M2hrcGsyazJ6YjJocm01MyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2JSHK4YtgLjsdctQWb/giphy.gif" // Replace with your local GIF if needed
                alt="Don't cheat, bro."
                className="w-48 h-48 mb-4"
              />
              <div className="text-2xl font-bold text-black">Jangan licik, ya</div>
            </div>
          </div>
        )
      }

      {showGifPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-lg shadow-lg px-10 py-8 flex flex-col items-center animate-popinout"
          >
            <img
              src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnE0bWtnaWtqdnF0dXVqdnlzZWNoZW5pMXJzeGVoZWNzaTltdXdjaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/2q8SjsEeAPttXSNLw6/giphy.gif" // Replace with your local GIF if needed
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
