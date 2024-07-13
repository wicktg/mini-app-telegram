import WebApp from '@twa-dev/sdk'
import Friends from './icons/Friends'
import { Home } from './icons/Home'
import { Leaderboard } from './icons/Leaderboard'
import { Header } from './components/Header'
import { Content } from './components/Content'
import { Community } from './components/Community'
import { Rewards } from './components/Rewards'
function App() {
  return (
    <div className="bg-black min-h-screen" data-testid="app-page">
      <Header />
      <main className="pt-1">
        <Content point={2300} />
        <Community />
        <Rewards />
      </main>
      <button onClick={() => WebApp.showAlert('hello')}>Show alert</button>

      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  bg-[#272a2f] flex justify-around items-center z-50  text-xs">
        <div className="text-center text-[#85827d] w-1/5">
          <Home className="w-8 h-8 mx-auto" />
          <p className="mt-1">Home</p>
        </div>

        <div className="text-center text-[#85827d] w-1/5">
          <Leaderboard className="w-8 h-8 mx-auto" />
          <p className="mt-1">Rank</p>
        </div>

        <div className="text-center text-[#85827d] w-1/5">
          <Friends className="w-8 h-8 mx-auto" />
          <p className="mt-1">Friends</p>
        </div>
      </div>
    </div>
  )
}

export default App
