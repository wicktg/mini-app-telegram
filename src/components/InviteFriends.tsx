import React, { useEffect } from 'react'
import duckCoin from '../assets/images/duck_coin.png'
import FriendItem from './FriendItem'
import WebApp from '@twa-dev/sdk'
import { Telegram } from '@twa-dev/types'

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

  useEffect(() => {
    if (window.Telegram) {
      window.Telegram.WebApp.ready()
    }
  }, [])

  // const handleForward = async () => {
  //   try {
  //     WebApp.sendData({
  //       data: 'Test Message', // Send a simple test message
  //     })
  //     console.log('Data sent successfully!')
  //   } catch (error) {
  //     console.error('Error sending data:', error)
  //   }
  // }

  // const handleForward = () => {
  //   console.log('Forwarding message')
  //   // const message = encodeURIComponent('Check out this mini app!')
  //   // const url = `https://t.me/share/url?url=&text=${message}`

  //   // window.open(url, '_blank')
  //   WebApp.sendData({
  //     data: 'Test Message',
  //   })

  //   console.log('Data sent successfully!')
  // }

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
        <h2 className="text-lg font-bold mb-4">2 friends</h2>
        {friends.map((friend, index) => (
          <FriendItem
            key={index}
            avatar={friend.avatar}
            name={friend.name}
            point={friend.point}
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
