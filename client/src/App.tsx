import Cookies from 'js-cookie'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from './redux/slices/auh.slice'
import { AppDispatch, RootState } from './redux/store'
import AppRouter from './routes/routes'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { isAuthenticated } = useSelector((state: RootState) => state.auth)
  // Fetch user data when the app starts
  useEffect(() => {
    if (isAuthenticated) {
      console.log("Chay vao");
      const accessToken = Cookies.get('accessToken')

      if (!accessToken) {
        const refreshToken = Cookies.get('refreshToken')
        if (refreshToken) {
          dispatch(fetchUserData(refreshToken))
        }
        // If access token is available, we don't need to refresh
        dispatch(fetchUserData(null)) // We can skip refreshing the token
      }
    }
  }, [dispatch])

  return <AppRouter />
}

export default App
