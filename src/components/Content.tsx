import duckCoin from '../assets/images/duck_coin.png'

export const Content = ({ point = 0 }) => {
  return (
    <div className=" flex flex-col items-center justify-center text-white mt-16">
      <img
        src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJhdzR4ZmliZHN6dndtYXBla3NjY282eXpkdmNzbDVsNHhheTZ3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S1SnLg08CxnUGqyqha/giphy.webp"
        alt="Duck"
        className="w-32 h-32 mb-4"
      />
      <h1 className="text-4xl font-bold">{point} DUCK</h1>
    </div>
  )
}
