import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hook'
import {
  fetchRankingById,
  fetchRankings,
  selectRankIncludeUser,
} from '../app/slice/rankingSlice'
import UserCard from '../components/Leaderboard/UserCard'
import { preProcessUrl } from '../helpers/image'

const LeaderboardPage = () => {
  const userId = WebApp.initDataUnsafe?.user?.id ?? 5053674641
  const dispatch = useAppDispatch()

  const { ranking, rankings, totalHolder } = useAppSelector(
    selectRankIncludeUser,
  )

  useEffect(() => {
    if (userId) {
      dispatch(fetchRankingById(userId))
    }
    dispatch(fetchRankings())
  }, [userId, dispatch])

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Telegram wall of fame
      </h1>
      <UserCard
        name={ranking?.username ?? 'User1'}
        point={ranking?.ranking ?? 0}
        isUserCard={true}
        rank={ranking?.ranking ?? 0}
        avatar={ranking?.avatarPath ? preProcessUrl(ranking?.avatarPath) : ''}
      />

      <button className="w-full bg-blue-600 py-2 rounded-lg font-bold text-white mb-4">
        ⭐ Boost score
      </button>
      <h2 className="text-xl font-bold mb-4">{totalHolder}.6M holders</h2>
      <div>
        {rankings?.map((item) => (
          <UserCard
            key={item.telegramId}
            name={item.username}
            point={Number(item.totalScore)}
            rank={item.ranking}
            avatar={item?.avatarPath ? preProcessUrl(item?.avatarPath) : ''}
          />
        ))}
      </div>
    </div>
  )
}

export default LeaderboardPage
