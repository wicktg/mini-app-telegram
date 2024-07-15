import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AnniversaryPage from './pages/AnniversaryPage'
import HomePage from './pages/HomePage'
import InviteFriendPage from './pages/InviteFriendPage'
import LeaderboardPage from './pages/Leaderboard'
import RewardPage from './pages/RewardPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/invite" element={<InviteFriendPage />} />
        </Route>

        <Route path="/anniversary" element={<AnniversaryPage />} />
        <Route path="/reward" element={<RewardPage />} />
      </Routes>
    </Router>
  )
}

export default App
