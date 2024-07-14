import React from 'react'
import duckCoin from '../assets/images/duck_coin.png'
import FriendItem from './FriendItem'

const InviteFriends: React.FC = () => {
  const friends = [
    {
      avatar:
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg',
      name: 'letuan1201',
      point: 2341,
    },
    {
      avatar: 'https://m.media-amazon.com/images/I/517r-1LZfgL.jpg',
      name: 'nganganga',
      point: 1487,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col justify-between bg-black text-white p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Invited friends</h1>

        <p className="text-xl mt-1">and get more DUCKS</p>
        <div className="my-8">
          <img src={duckCoin} alt="DUCKS" className="mx-auto" />
        </div>
      </div>

      <div className="">
        <h2 className="text-lg font-bold mb-4">2 friends</h2>
        {friends.map((friend, index) => (
          <FriendItem
            key={index}
            avatar={friend.avatar}
            name={friend.name}
            point={friend.point}
          />
        ))}
      </div>
    </div>
  )
}

export default InviteFriends
