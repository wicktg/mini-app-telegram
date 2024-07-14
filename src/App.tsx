import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage'
import InviteFriendPage from './pages/InviteFriendPage'
import LeaderboardPage from './pages/Leaderboard'

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/rank" element={<LeaderboardPage />} />
          <Route path="/invite" element={<InviteFriendPage />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
