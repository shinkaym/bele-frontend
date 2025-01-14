import authApi from '@/apis/modules/auth.api'
import { menuProfileItems } from '@/constants'
import { EMenuProfileItemId } from '@/models/enum'
import { logout } from '@/redux/slices/auh.slice'
import { AppDispatch } from '@/redux/store'
import executeAOS from '@/utils/executeAOS'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from '../Button'
import Loader from '../Loader'
import Overlay from '../Overlay'

export interface ICustomerMenuProps {
  onClose: () => void
  fullName: string | ''
}

export function CustomerMenu({ onClose, fullName }: ICustomerMenuProps) {
  const [loading, setLoading] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()
  const handleLogout = async () => {
    setLoading(true)
    try {
      const res: { message: string; status: number } = await authApi.logout()
      if (res.status === 200) {
        dispatch(logout())
        onClose()
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const callBackAos = useCallback(() => {
    executeAOS({})
  }, [])

  useEffect(() => {
    callBackAos()
  }, [callBackAos])
  return (
    <>
      <div className='fixed inset-0 z-40'>
        <Overlay onClose={() => onClose()} className='z-50' />
        <div
          data-aos='fade-right'
          className='flex flex-col absolute left-0 top-0 lg:w-[500px] md:w-[260px] sm:w-[220px] w-[180px] bg-white h-screen z-50 shadow-md border-r border-zinc-700'
        >
          <h1 className='uppercase text-2xl p-10 shadow-sm border-b'>Hi, {fullName}</h1>
          <div className='p-10 flex-1 overflow-x-hidden overflow-y-auto'>
            <div className='w-full grid grid-cols-3 gap-4'>
              {menuProfileItems.map((item) => {
                if (item.id === EMenuProfileItemId.Logout) {
                  return (
                    <button
                      onClick={handleLogout}
                      key={item.id}
                      className='w-full px-3 py-4 h-32 rounded-xl bg-zinc-200 flex items-center flex-col gap-2'
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className='w-6 h-6 text-base text-white bg-black p-2 border-solid rounded-xl'
                      />
                      <p className='text-center'>{item.title}</p>
                    </button>
                  )
                } else {
                  return (
                    <Link
                      onClick={() => onClose()}
                      key={item.id}
                      className='w-full px-3 py-4 h-32 rounded-xl bg-zinc-200 flex items-center flex-col gap-2'
                      to={'/profile/' + item.link}
                    >
                      <FontAwesomeIcon
                        icon={item.icon}
                        className='w-6 h-6 text-base text-white bg-black p-2 border-solid rounded-xl'
                      />
                      <p className='text-center'>{item.title}</p>
                    </Link>
                  )
                }
              })}
            </div>
          </div>
          <Button
            type='link'
            to='/profile/account-info'
            className='py-4 text-center uppercase hover:bg-blue-primary-light transition-colors ease-linear duration-200'
            color='blue-primary'
            textColor='white'
          >
            Đi đến tài khoản
          </Button>
        </div>
      </div>
      {loading && <Loader />}
    </>
  )
}
