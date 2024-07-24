import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'

import { Community, Content, Rewards, Header } from '@/components'

import { useAppDispatch, useAppSelector } from '@/app/hook'
import { fetchUserById, selectUserById } from '@/app/slice/userSlice'
import { convertHexToNonBounceable, shortAddress } from '@/helpers/tonHelper'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUserById)
  const userId = WebApp.initDataUnsafe?.user?.id ?? null
  const wallet = useTonWallet()
  const [tonConnectUi] = useTonConnectUI()

  useEffect(() => {
    if (userId && !user) {
      dispatch(fetchUserById(userId))
    }
  }, [userId, user, dispatch])

  return (
    <div>
      <Header />
      <div className="pt-1">
        <Content point={user?.point ? user.point + user.friendPoint : 0} />
        <div className="  left-0 w-full p-4  ">
          <button
            onClick={() => tonConnectUi.openModal()}
            className="w-full p-3 bg-white rounded-lg text-black font-bold">
            {wallet
              ? shortAddress(convertHexToNonBounceable(wallet.account.address))
              : 'Connect wallet'}
          </button>
        </div>
        <Community />
        <Rewards
          pointAge={user?.point ?? 0}
          pointFriends={user?.friendPoint ?? 0}
        />
      </div>
    </div>
  )
}

export default HomePage
