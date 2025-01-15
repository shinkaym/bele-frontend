import LoadingScreen from '@/components/common/LoadingScreen'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import Contact from '@/pages/Contact'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import AccountInfo from '@/pages/AccountInfo'
import OrderHistory from '@/pages/OrderHistory'
import AddressNotes from '@/pages/AddressNotes'
import RatingProducts from '@/pages/RatingProducts'
import Wishlist from '@/pages/Wishlist'

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
          element: <Profile />,
          children: [
            {
              path: 'account-info',
              element: <AccountInfo />
            },
            {
              path: 'order-history',
              element: <OrderHistory />
            },
            {
              path: 'address-notes',
              element: <AddressNotes />
            },
            {
              path: 'rating-products',
              element: <RatingProducts />
            },
            {
              path: 'wishlist',
              element: <Wishlist />
            }
          ]
        },
        {
          path: 'search',
          element: (
            <>
              <PageTitle title='Trang tìm kiếm' />
              <Search />
            </>
          )
        },
        {
          path: 'blog',
          element: (
            <>
              <PageTitle title='Trang thông tin' />
              <Blog />
            </>
          )
        },
        {
          path: 'contact',
          element: (
            <>
              <PageTitle title='Trang liên hệ' />
              <Contact />
            </>
          )
        }
      ]
    }
  ])
}

export default AppRouter
