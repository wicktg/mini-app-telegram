import { NavLink } from 'react-router-dom'

type ButtonProps = {
  icon: React.ReactNode
  label: string
  to: string
}

const ButtonBottom: React.FC<ButtonProps> = ({ icon, label, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `text-center w-1/5 ${isActive ? 'text-white' : 'text-[#85827d]'}`
      }>
      <div className="w-8 h-8 mx-auto">{icon}</div>
      <p className="mt-1">{label}</p>
    </NavLink>
  )
}

export default ButtonBottom
