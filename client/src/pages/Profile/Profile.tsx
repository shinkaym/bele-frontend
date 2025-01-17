import { menuProfileItems } from '@/constants'
import MenuProfileItem from '@/components/common/ProfileMenuItem'
import { Outlet, useNavigate } from 'react-router-dom'
import { EMenuProfileItemId } from '@/models/enum'
import authApi from '@/apis/modules/auth.api'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { logout } from '@/redux/slices/auh.slice'
import { resetCart } from '@/redux/slices/cart.slice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'

const Profile = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(-1)
    }
  }, [isAuthenticated, navigate])

  const dispatch = useDispatch<AppDispatch>()

  const handleLogout = async () => {
    try {
      const res: { message: string; status: number } = await authApi.logout()
      if (res.status === 200) {
        dispatch(logout())
        dispatch(resetCart())
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-gray-300 w-full px-3 py-10 2xl:px-16 flex justify-between items-start flex-col lg:flex-row gap-4'>
      <ul className='flex flex-col gap-2 w-full lg:max-w-[360px]'>
        {menuProfileItems.map((item) => {
          if (item.id === EMenuProfileItemId.Logout) {
            return <MenuProfileItem key={item.id} item={item} onClick={handleLogout} />
          }
          return <MenuProfileItem key={item.id} item={item} />
        })}
      </ul>
      <div className='w-full xl:w-[900px] 2xl:w-[1200px] px-2 pb-16 pt-10 md:pt-16 lg:p-16 bg-white text-black rounded-lg'>
        <Outlet />
      </div>
    </div>
  )
}

export default Profile
