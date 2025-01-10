import { useDispatch, useSelector } from 'react-redux'
import AccountInfo from '@/components/common/AccountInfo'
import OrderHistory from '@/components/common/OrderHistory'
import AddressNotes from '@/components/common/AddressNotes'
import RatingProducts from '@/components/common/RatingProducts'
import Wishlist from '@/components/common/Wishlist'
import { ProfileState, setActiveComponent } from '@/redux/slices/profile.slice'
import { useCallback } from 'react'
import { RootState } from '@/redux/store'
import { menuProfileItems } from '@/constants'
import MenuProfileItem from '@/components/common/ProfileMenuItem'
import { EMenuProfileItemId } from '@/models/enum'

const componentMap = {
  [EMenuProfileItemId.AccountInfo]: <AccountInfo />,
  [EMenuProfileItemId.OrderHistory]: <OrderHistory />,
  [EMenuProfileItemId.AddressNotes]: <AddressNotes />,
  [EMenuProfileItemId.Wishlist]: <Wishlist />,
  [EMenuProfileItemId.RatingProducts]: <RatingProducts />
}

const Profile = () => {
  const dispatch = useDispatch()
  const activeComponent = useSelector((state: RootState) => state.profile.activeComponent)

  const handleClick = useCallback(
    (component: ProfileState['activeComponent']) => {
      dispatch(setActiveComponent(component))
    },
    [dispatch]
  )

  return (
    <div className='bg-gray-300 w-full px-3 py-10 2xl:px-16 flex justify-between items-start flex-col lg:flex-row gap-4'>
      <ul className='flex flex-col gap-2 w-full lg:max-w-[360px]'>
        {menuProfileItems.map((item) => (
          <MenuProfileItem
            key={item.id}
            item={item}
            isActive={activeComponent === item.id}
            onClick={() => handleClick(item.id)}
          />
        ))}
      </ul>
      <div className='w-full xl:w-[900px] 2xl:w-[1200px] px-2 pb-16 pt-10 md:pt-16 lg:p-16 bg-white text-black rounded-lg'>
        {componentMap[activeComponent]}
      </div>
    </div>
  )
}

export default Profile
