import WebApp from '@twa-dev/sdk'
import React, { useEffect, useState } from 'react'
import duckCoin from '../assets/images/duck_coin.png'
import axios from '../config/axios.config'
import { Referral } from '../interfaces/referrals.type'
import FriendItem from './FriendItem'
import { preProcessUrl } from '../helpers/image'

const InviteFriends: React.FC = () => {
  const [friends, setFriends] = useState<Referral[] | null>(null)

  useEffect(() => {
    const userId = WebApp.initDataUnsafe?.user?.id ?? null

    if (userId) {
      axios
        .get(`/referral/id/${userId}`)
        .then(({ data }) => setFriends(data))
        .catch((error) => console.error('Error fetching user data:', error))
    }
  }, [])

  const handleForward = () => {
    WebApp.openTelegramLink('https')
  }

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold">Invited friends</h1>
        <p className="text-xl mt-1">and get more DUCKS</p>
        <div className="my-2">
          <img src={duckCoin} alt="DUCKS" className="mx-auto" />
        </div>
      </div>

      <div className="flex-grow p-4 overflow-y-auto ">
        <h2 className="text-lg font-bold mb-4">{friends?.length} friends</h2>
        {friends?.map((friend, index) => (
          <FriendItem
            key={index}
            avatar={friend?.avatarPath ? preProcessUrl(friend.avatarPath) : ''}
            name={friend.username}
            point={friend.scoreEarned}
          />
        ))}
        <div className="h-20"></div>
      </div>

      <div className="fixed bottom-12 left-0 w-full p-5 z-50 bg-black">
        <button
          className="w-full p-3 bg-white rounded-full text-black"
          onClick={handleForward}>
          Invite friend
        </button>
      </div>
    </div>
  )
}

export default InviteFriends
