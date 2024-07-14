import { Link } from 'react-router-dom'

type ButtonProps = {
  icon: React.ReactNode
  label: string
  to: string
}

const ButtonBottom: React.FC<ButtonProps> = ({ icon, label, to }) => {
  return (
    <Link to={to} className="text-center text-[#85827d] w-1/5">
      <div className="w-8 h-8 mx-auto">{icon}</div>
      <p className="mt-1">{label}</p>
    </Link>
  )
}

export default ButtonBottom
