import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './redux/slices/auh.slice'
import { AppDispatch, RootState } from './redux/store'
import AppRouter from './routes/routes'
import { fetchCart } from './redux/slices/cart.slice'
import { fetchSettings } from './redux/slices/setting.slice'
import Loader from './components/common/Loader'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated, error } = useSelector((state: RootState) => state.auth)
  const settings = useSelector((state: RootState) => state.settings)
  const [loading, setLoading] = useState<boolean>(true)

  // Fetch user data when the app starts
  useEffect(() => {
    const fetchApi = async () => {
      const accessToken = Cookies.get('accessToken')
      const refreshToken = Cookies.get('refreshToken')

      if (!accessToken && refreshToken) {
        console.log('Dispatching fetchUserData...')
        await dispatch(fetchUserData(refreshToken))

        if (!error) {
          console.log('Dispatching fetchCart...')
          dispatch(fetchCart())
        }
      }
    }

    if (isAuthenticated) {
      console.log('Fetching API...')
      fetchApi()
    }
  }, [dispatch, isAuthenticated, error])

  useEffect(() => {
    const fetchApi = async () => {
      dispatch(fetchSettings())
      setLoading(false)
    }
    if (!settings.data) fetchApi()
    else {
      setLoading(false)
    }
  }, [dispatch, settings])

  if (loading) return <Loader />

  return <AppRouter />
}

export default App
