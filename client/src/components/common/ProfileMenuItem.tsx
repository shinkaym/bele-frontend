import { TMenuProfileItem } from '@/models/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

interface MenuProfileItemProps {
  item: TMenuProfileItem
  onClick?: () => void
}

const MenuProfileItem: React.FC<MenuProfileItemProps> = ({ item, onClick }) => {
  const { title, icon, link } = item

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      event.preventDefault() 
      onClick() 
    }
  }

  return (
    <NavLink
      to={link}
      onClick={handleClick}
      className={({ isActive }) =>
        `p-3 flex items-center justify-start gap-2 ${
          isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'
        } rounded-md cursor-pointer group transition-all duration-300`
      }
    >
      {({ isActive }) => (
        <>
          <div
            className={`w-8 h-8 rounded-xl flex items-center justify-center ${
              isActive ? 'bg-white' : 'bg-black group-hover:bg-white'
            }`}
          >
            <FontAwesomeIcon
              icon={icon}
              className={`text-lg bg-transparent ${isActive ? 'text-black' : 'text-white group-hover:text-black'}`}
            />
          </div>
          <span>{title}</span>
        </>
      )}
    </NavLink>
  )
}

export default MenuProfileItem
