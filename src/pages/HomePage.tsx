import WebApp from '@twa-dev/sdk'
import { useEffect } from 'react'
import { Community } from '../components/Community'
import { Content } from '../components/Content'
import { Header } from '../components/Header'

import { useAppDispatch, useAppSelector } from '../app/hook'
import { fetchUserById, selectUserById } from '../app/slice/userSlice'
import { Rewards } from '../components/Rewards'
import {
  TonConnectButton,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react'
import { convertHexToNonBounceable, shortAddress } from '../helpers/tonHelper'

const HomePage = () => {
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
