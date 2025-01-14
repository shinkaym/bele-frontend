import { Outlet } from 'react-router-dom'
import Header from './Partials/Header'
import Footer from './Partials/Footer'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { fetchSettings } from '@/redux/slices/setting.slice'

function DefaultLayout() {
  const dispatch = useDispatch<AppDispatch>()
  const settings = useSelector((state: RootState) => state.settings)
  useEffect(() => {
    if (!settings.data || Object.keys(settings.data).length === 0) {
      console.log("Fetch lại dữ liệu");
      // Nếu store không có dữ liệu, gọi API
      dispatch(fetchSettings())
    }
  }, [dispatch, settings])

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
