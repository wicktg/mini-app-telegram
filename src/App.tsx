import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import MainLayout from './components/MainLayout'
import AnniversaryPage from './pages/AnniversaryPage'
import HomePage from './pages/HomePage'
import InviteFriendPage from './pages/InviteFriendPage'
import LeaderboardPage from './pages/Leaderboard'
import RewardPage from './pages/RewardPage'
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react'

function App() {
  return (
    <TonConnectUIProvider
      manifestUrl="https://mantis-lenient-usually.ngrok-free.app/tonconnect-manifest.json"
      uiPreferences={{ theme: THEME.DARK }}
      actionsConfiguration={{
        twaReturnUrl: 'https://t.me/Duck_01_bot/DuckMeme',
      }}>
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
    </TonConnectUIProvider>
  )
}

export default App
