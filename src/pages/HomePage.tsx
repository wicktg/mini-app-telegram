import { useEffect, useState } from 'react'
import { Community } from '../components/Community'
import { Content } from '../components/Content'
import { Header } from '../components/Header'
import WebApp from '@twa-dev/sdk'

import axios from '../config/axios.config'
import { Rewards } from '../components/Rewards'

interface User {
  telegramId: string
  username: string
  avatarPath: string
  point: number
  friendPoint: number
  registeredDate: string
}

const HomePage = () => {
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const userId = WebApp.initDataUnsafe?.user?.id

    if (userId) {
      axios
        .get(`/user/id/${userId}`)
        .then(({ data }) => setUserData(data))
        .catch((error) => console.error('Error fetching user data:', error))
    }
  }, [])

  return (
    <div>
      <Header />
      <div className="pt-1">
        <Content point={userData?.point ?? 0} />
        <Community />
        <Rewards
          pointAge={userData?.point ?? 0}
          pointFriends={userData?.friendPoint ?? 0}
        />
      </div>
    </div>
  )
}

export default HomePage
