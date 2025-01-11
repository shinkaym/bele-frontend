import LoadingScreen from '@/components/common/LoadingScreen'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Home from '@/pages/Home'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Profile = Loadable(lazy(() => import('@/pages/Profile')))
const Search = Loadable(lazy(() => import('@/pages/Search')))

const AppRouter = () => {
  return useRoutes([
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          index: true,
          path: '',
          element: (
            <>
              <PageTitle title='Trang chủ' />
              <Home />
            </>
          )
        },
        {
          path: 'profile',
          element: (
            <>
              <PageTitle title='Thông tin cá nhân' />
              <Profile />
            </>
          )
        },
        {
          path: 'search',
          element: (
            <>
              <PageTitle title='Trang tìm kiếm' />
              <Search />
            </>
          )
        }
      ]
    }
  ])
}

export default AppRouter
