import { TMenuProfileItem } from '@/models/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface MenuProfileItemProps {
  item: TMenuProfileItem
  isActive: boolean
  onClick: () => void
}

const MenuProfileItem: React.FC<MenuProfileItemProps> = ({ item, isActive, onClick }) => {
  const { title, icon } = item

  return (
    <li
      className={`p-3 flex items-center justify-start gap-2 ${isActive ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'} rounded-md cursor-pointer group transition-all duration-300`}
      onClick={onClick}
    >
      <div
        className={`${isActive ? 'bg-white' : 'bg-black group-hover:bg-white'} w-8 h-8 rounded-xl flex items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={icon}
          className={`text-lg bg-transparent ${isActive ? 'text-black' : 'text-white group-hover:text-black'}`}
        />
      </div>
      <span>{title}</span>
    </li>
  )
}

export default MenuProfileItem
