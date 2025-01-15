import { menuProfileItems } from '@/constants'
import MenuProfileItem from '@/components/common/ProfileMenuItem'
import { Outlet } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='bg-gray-300 w-full px-3 py-10 2xl:px-16 flex justify-between items-start flex-col lg:flex-row gap-4'>
      <ul className='flex flex-col gap-2 w-full lg:max-w-[360px]'>
        {menuProfileItems.map((item) => (
          <MenuProfileItem key={item.id} item={item} />
        ))}
      </ul>
      <div className='w-full xl:w-[900px] 2xl:w-[1200px] px-2 pb-16 pt-10 md:pt-16 lg:p-16 bg-white text-black rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile
