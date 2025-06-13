import './index.css'
import MainMenu from './components/MainMenu'
import LeaderboardPage from './components/LeaderboardPage'
import ResultPage from './components/ResultPage';
import ResultPageTest from './components/ResultPageTest';
import AboutPage from './components/AboutPage';
import { Route, Routes } from 'react-router-dom'
import PracticeWrapper from './components/PracticeWrapper'
import EntryPoint from './components/EntryPoint';
import TestPageWrapper from './components/TestPageWrapper';

function App() {

  return (
    <div className='w-screen h-screen top-0 left-0'>
      <Routes>
        <Route path="/" element={<MainMenu />} />
        <Route path='/main-menu' element={<EntryPoint />} />
        <Route path="/practice" element={<PracticeWrapper />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/test" element={<TestPageWrapper />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/test-result" element={<ResultPageTest />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
}

export default App
