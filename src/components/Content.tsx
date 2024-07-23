import { useState } from 'react'
import staticLogo from '../assets/images/duckmeme.jpg'

export const Content = ({ point = 0 }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const handleClick = () => {
    setIsPlaying(!isPlaying)
    console.log('vao day')
  }

  return (
    <div className="flex flex-col items-center justify-center text-white mt-16">
      <img
        src={
          isPlaying
            ? `https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExbjJhdzR4ZmliZHN6dndtYXBla3NjY282eXpkdmNzbVsNHhheTZ3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/S1SnLg08CxnUGqyqha/giphy.webp?${new Date().getTime()}`
            : staticLogo
        }
        alt="Duck"
        className="w-32 h-32 mb-4 cursor-pointer"
        onClick={handleClick}
      />
      <h1 className="text-4xl font-bold">{point} DUCK</h1>
    </div>
  )
}

export default Content
