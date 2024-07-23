// import WebApp from '@twa-dev/sdk'
// import { useEffect } from 'react'
// import { useAppDispatch, useAppSelector } from '../app/hook'
// import {
//   fetchRankingById,
//   fetchRankings,
//   selectRankIncludeUser,
// } from '../app/slice/rankingSlice'
// import UserCard from '../components/Leaderboard/UserCard'
// import { preProcessUrl } from '../helpers/image'
// import { RootState } from '../app/store'

// const LeaderboardPage = () => {
//   const userId = WebApp.initDataUnsafe?.user?.id ?? 5053674641
//   const dispatch = useAppDispatch()

//   const { ranking, rankings, totalHolder, loading, error } = useAppSelector(
//     (state: RootState) => state.ranking,
//   )

//   useEffect(() => {
//     if (userId) {
//       dispatch(fetchRankingById(userId))
//     }
//     dispatch(fetchRankings())
//   }, [userId, dispatch])

//   console.log('error: ', error)
//   // const { ranking, rankings, totalHolder } = useAppSelector(
//   //   selectRankIncludeUser,
//   // )

//   // useEffect(() => {
//   //   if (userId && !ranking) {
//   //     dispatch(fetchRankingById(userId))
//   //   }
//   //   if (!rankings) {
//   //     dispatch(fetchRankings())
//   //   }
//   // }, [userId, ranking, rankings, dispatch])

//   return (
//     <div className="p-4 text-white">
//       <h1 className="text-2xl font-bold mb-4 text-center">
//         Telegram wall of fame
//       </h1>
//       <UserCard
//         name={ranking?.username ?? 'User1'}
//         point={ranking?.ranking ?? 0}
//         isUserCard={true}
//         rank={ranking?.ranking ?? 0}
//         avatar={ranking?.avatarPath ? preProcessUrl(ranking?.avatarPath) : ''}
//       />

//       <button className="w-full bg-blue-600 py-2 rounded-lg font-bold text-white mb-4">
//         ⭐ Boost score
//       </button>
//       <h2 className="text-xl font-bold mb-4">{totalHolder}.6M holders</h2>
//       <div>
//         {rankings?.map((item) => (
//           <UserCard
//             key={item.telegramId}
//             name={item.username}
//             point={Number(item.totalScore)}
//             rank={item.ranking}
//             avatar={item?.avatarPath ? preProcessUrl(item?.avatarPath) : ''}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// export default LeaderboardPage

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import UserCard from '../components/Leaderboard/UserCard'
import axios from '../config/axios.config'
import { preProcessUrl } from '../helpers/image'
import { Ranking } from '../interfaces/ranks.type'

const LeaderboardPage = () => {
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
