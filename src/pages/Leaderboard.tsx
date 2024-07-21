import { useEffect, useState } from 'react'
import UserCard from '../components/Leaderboard/UserCard'
import WebApp from '@twa-dev/sdk'
import axios from '../config/axios.config'
import { URL_FILE_TELEGRAM } from '../constants/token'

interface Ranking {
  telegramId: string
  username: string
  avatarPath: string
  ranking: number
  totalScore: string
}

const LeaderboardPage = () => {
  const leaderboardData = [
    { name: 'glebtma', score: 11908769, rank: 1 },
    { name: 'Esalat', score: 10343451, rank: 2 },
    { name: 'mohamahamed', score: 7681324, rank: 3 },
    { name: 'NgdcKKhea', score: 1241512, rank: 4 },
    { name: 'Serious', score: 932312, rank: 53423423 },
  ]

  const user = {
    username: 'ducpro',
    rank: 1110,
    score: 12421343,
  }

  const [rankingData, setRankingData] = useState<Ranking | null>(null)

  useEffect(() => {
    const userId = WebApp.initDataUnsafe?.user?.id

    if (userId) {
      axios
        .get(`/ranking/id/${userId}`)
        .then(({ data }) => setRankingData(data))
        .catch((error) => console.error('Error fetching user data:', error))
    }
  }, [])
  const botToken = import.meta.env.VITE_BOT_TOKEN
  console.log('Bot token: ', botToken)

  const avatarPath = URL_FILE_TELEGRAM + botToken
  console.log('avatar path: ', avatarPath)
  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Telegram wall of fame
      </h1>
      <UserCard
        name={rankingData?.username ?? 'User1'}
        point={rankingData?.ranking ?? 0}
        isUserCard={true}
        rank={rankingData?.ranking ?? 0}
        avatar={
          rankingData?.avatarPath
            ? `https://api.telegram.org/file/bot${botToken}/${rankingData?.avatarPath}`
            : ''
        }
      />

      <button className="w-full bg-blue-600 py-2 rounded-lg font-bold text-white mb-4">
        ⭐ Boost score
      </button>
      <h2 className="text-xl font-bold mb-4">13.6M holders</h2>
      <div>
        {leaderboardData.map((user) => (
          <UserCard
            key={user.rank}
            name={user.name}
            point={user.score}
            rank={user.rank}
          />
        ))}
      </div>
    </div>
  )
}

export default LeaderboardPage
