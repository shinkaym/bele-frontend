import LoadingScreen from '@/components/common/LoadingScreen'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Home from '@/pages/Home'
import Blog from '@/pages/Blog'
import Contact from '@/pages/Contact'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import ProductDetail from '@/pages/ProductDetail'
import AccountInfo from '@/pages/Profile/AccountInfo'
import OrderHistory from '@/pages/Profile/OrderHistory'
import AddressNotes from '@/pages/Profile/AddressNotes'
import RatingProducts from '@/pages/Profile/RatingProducts'
import Wishlist from '@/pages/Profile/Wishlist'
import About from '@/pages/About'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Profile = Loadable(lazy(() => import('@/pages/Profile/Profile')))
const Search = Loadable(lazy(() => import('@/pages/Search')))
const Filter = Loadable(lazy(() => import('@/pages/Filter')))


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
          path: 'products',
          children: [
            {
              path: 'detail/:slug',
              element: (
                <>
                  <PageTitle title='Trang chi tiết sản phẩm' />
                  <ProductDetail />,
                </>
              )
            },
            {
              path: 'filter/:slug?',
              element: (
                <>
                  <PageTitle title='Trang sản phẩm' />
                  <Filter />,
                </>
              )
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
        },
        {
          path: 'about',
          element: (
            <>
              <PageTitle title='Trang thông tin' />
              <About />
            </>
          )
        }
      ]
    }
  ])
}

export default AppRouter
