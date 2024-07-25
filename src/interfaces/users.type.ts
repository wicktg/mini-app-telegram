export interface User {
  telegramId: string
  username: string
  avatarPath: string
  point: number
  friendPoint: number
  registeredDate: string
  rewardWallet: number
}

export interface userWallet {
  telegramId: string
  wallet: string
}
