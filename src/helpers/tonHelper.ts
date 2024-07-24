import { Address } from '@ton/core'

export const convertHexToNonBounceable = (hex: string) => {
  const workchain = parseInt(hex.slice(0, 2), 16)
  const publicKey = hex.slice(2)

  const address = new Address(workchain, Buffer.from(publicKey, 'hex'))
  return address.toString({ bounceable: false })
}

export const shortAddress = (address: string) => {
  const firstChar = address.slice(0, 3)
  const lastChar = address.slice(-4)

  const result = `${firstChar}...${lastChar}`
  return result
}
