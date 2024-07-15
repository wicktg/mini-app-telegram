import UserCard from '../components/Leaderboard/UserCard'

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

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Telegram wall of fame
      </h1>
      <UserCard
        name={user.username}
        point={user.score}
        isUserCard={true}
        rank={user.rank}
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
