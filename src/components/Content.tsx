import duckCoin from '../assets/images/duck_coin.png'

export const Content = ({ point = 0 }) => {
  return (
    <div className=" flex flex-col items-center justify-center text-white mt-16">
      <img src={duckCoin} alt="Duck" className="w-32 h-32 mb-4" />
      <h1 className="text-4xl font-bold">{point} DUCK</h1>
    </div>
  )
}
