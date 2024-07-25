import WebApp from '@twa-dev/sdk'
import { useEffect, useMemo, useState } from 'react'
import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react'

import { Community, Content, Rewards, Header } from '@/components'

import { useAppDispatch, useAppSelector } from '@/app/hook'
import { fetchUserById, selectUserById } from '@/app/slice/userSlice'
import { convertHexToNonBounceable, shortAddress } from '@/helpers/tonHelper'
import { Sheet } from 'react-modal-sheet'

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUserById)
  const userId = WebApp.initDataUnsafe?.user?.id ?? null
  const wallet = useTonWallet()
  const [tonConnectUi] = useTonConnectUI()

  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (userId && !user) {
      dispatch(fetchUserById(userId))
    }
  }, [userId, user, dispatch])

  const userPoints = useMemo(
    () => (user?.point ?? 0) + (user?.friendPoint ?? 0),
    [user],
  )
  const walletButtonText = wallet
    ? shortAddress(convertHexToNonBounceable(wallet.account.address))
    : 'Connect wallet'

  const handleClickConnectWallet = () => {
    if (wallet) {
      setIsOpen(true)
      return
    }
    tonConnectUi.openModal()
  }

  const handleConnectDifferentWallet = () => {
    if (wallet) {
      tonConnectUi.disconnect()
    }
    setIsOpen(false)
    tonConnectUi.openModal()
  }

  return (
    <div>
      <Header />
      <div className="pt-1">
        <Content point={userPoints} />

        <div className="  left-0 w-full p-4  ">
          <button
            onClick={handleClickConnectWallet}
            className="w-full p-3 bg-white rounded-lg text-black font-bold">
            {walletButtonText}
          </button>
        </div>

        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          snapPoints={[320, 100, 0]}
          initialSnap={0}
          tweenConfig={{ ease: 'easeInOut', duration: 0.7 }}>
          <Sheet.Container className="bg-black rounded-s-xl">
            <Sheet.Content className="bg-[#1c1c1e]">
              <div className=" mt-4 text-center">
                <span className="text-white font-bold text-xl">Wallet</span>
              </div>
              <div className="  left-0 w-full p-4  ">
                <div className="text-center w-full p-3 bg-[#282828] rounded-lg text-white font-bold">
                  {walletButtonText}
                </div>
              </div>

              <div className="  left-0 w-full p-4  ">
                <button
                  className="w-full p-3 bg-[#202535] rounded-lg text-[#007aff] font-bold"
                  onClick={handleConnectDifferentWallet}>
                  🔄 Connect different wallet
                </button>
              </div>

              <div className="  left-0 w-full p-4  ">
                <button
                  className="w-full p-3 bg-white rounded-lg text-black font-bold"
                  onClick={() => setIsOpen(false)}>
                  Close
                </button>
              </div>
            </Sheet.Content>
          </Sheet.Container>
        </Sheet>

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
