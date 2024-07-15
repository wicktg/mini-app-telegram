import React from 'react'
import ButtonBottom from './ButtonBottom'
import { Home } from '../icons/Home'
import { Leaderboard } from '../icons/Leaderboard'
import Friends from '../icons/Friends'
import { Outlet } from 'react-router-dom'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <div className="flex-grow overflow-y-auto pb-10">
        <Outlet />
      </div>
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full bg-black flex justify-around items-center z-50 text-xs py-2">
        <ButtonBottom
          to="/"
          icon={<Home className="w-8 h-8 mx-auto" />}
          label="Home"
        />
        <ButtonBottom
          to="/leaderboard"
          icon={<Leaderboard className="w-8 h-8 mx-auto" />}
          label="Leaderboard"
        />
        <ButtonBottom
          to="/invite"
          icon={<Friends className="w-8 h-8 mx-auto" />}
          label="Friends"
        />
      </div>
    </div>
  )
}

export default MainLayout
