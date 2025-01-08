import LoadingScreen from '@/components/common/LoadingScreen'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Profile from '@/pages/Profile'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Home = Loadable(lazy(() => import('@/pages/Home')))

const AppRouter = () => {
  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          path: '',
          element: <Home />
        },
        {
          path: 'profile',
          element: <Profile />
        }
      ]
    }
  ])
}

export default AppRouter
