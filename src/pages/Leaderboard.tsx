import { useAppDispatch, useAppSelector } from '@/app/hook'
import {
  fetchRankingById,
  fetchRankings,
  selectRankIncludeUser,
} from '@/app/slice/rankingSlice'
import UserCard from '@/components/Leaderboard/UserCard'
import { preProcessUrl } from '@/helpers/image'
import WebApp from '@twa-dev/sdk'
import { useEffect, useMemo } from 'react'

export const LeaderboardPage = () => {
  const userId = WebApp.initDataUnsafe?.user?.id ?? null
  const dispatch = useAppDispatch()

  const { ranking, rankings, totalHolder, loading, error } = useAppSelector(
    selectRankIncludeUser,
  )

  useEffect(() => {
    if (userId && !ranking) {
      dispatch(fetchRankingById(userId))
    }
    if (!rankings) {
      dispatch(fetchRankings())
    }
  }, [userId, ranking, rankings, dispatch])

  const userCardProps = useMemo(() => {
    return {
      name: ranking?.username ?? 'Unknow',
      point: ranking?.ranking ?? 0,
      isUserCard: true,
      rank: ranking?.ranking ?? 0,
      avatar: ranking?.avatarPath ? preProcessUrl(ranking.avatarPath) : '',
    }
  }, [ranking])

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Telegram wall of fame
      </h1>
      <UserCard {...userCardProps} />

      <button className="w-full bg-blue-600 py-2 rounded-lg font-bold text-white mb-4">
        ⭐ Boost score
      </button>
      <h2 className="text-xl font-bold mb-4">
        {totalHolder?.toFixed(0)}.6M holders
      </h2>
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
