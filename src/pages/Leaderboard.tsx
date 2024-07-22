import { useEffect, useState } from 'react'
import UserCard from '../components/Leaderboard/UserCard'
import WebApp from '@twa-dev/sdk'
import axios from '../config/axios.config'
import { URL_FILE_TELEGRAM } from '../constants/token'
import { Ranking } from '../interfaces/ranks.type'
import { preProcessUrl } from '../utils/image'

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

  const [userData, setuserData] = useState<Ranking | null>(null)
  const [rankings, setRankings] = useState<Ranking[] | null>(null)
  const [totalHolder, setTotalHolder] = useState(0)

  useEffect(() => {
    const userId = WebApp.initDataUnsafe?.user?.id ?? null

    if (userId) {
      axios
        .get(`/ranking/id/${userId}`)
        .then(({ data }) => setuserData(data))
        .catch((error) => console.error('Error fetching user data:', error))
    }

    axios
      .get('/ranking')
      .then(({ data }) => {
        setRankings(data.ranks)
        setTotalHolder(data.totalHolder)
      })
      .catch((error) => console.error('Error fetching ranking data: ', error))
  }, [])
  const botToken = import.meta.env.VITE_BOT_TOKEN

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Telegram wall of fame
      </h1>
      <UserCard
        name={userData?.username ?? 'User1'}
        point={userData?.ranking ?? 0}
        isUserCard={true}
        rank={userData?.ranking ?? 0}
        avatar={userData?.avatarPath ? preProcessUrl(userData?.avatarPath) : ''}
      />

      <button className="w-full bg-blue-600 py-2 rounded-lg font-bold text-white mb-4">
        ⭐ Boost score
      </button>
      <h2 className="text-xl font-bold mb-4">{totalHolder}.6M holders</h2>
      <div>
        {rankings?.map((ranking) => (
          <UserCard
            key={ranking.telegramId}
            name={ranking.username}
            point={Number(ranking.totalScore)}
            rank={ranking.ranking}
            avatar={
              ranking?.avatarPath ? preProcessUrl(ranking?.avatarPath) : ''
            }
          />
        ))}
      </div>
    </div>
  )
}

export default LeaderboardPage
