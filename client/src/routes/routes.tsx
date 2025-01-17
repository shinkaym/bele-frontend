import LoadingScreen from '@/components/common/LoadingScreen'
import PageTitle from '@/components/common/PageTitle'
import BlogDetail from '@/components/common/Blog/BlogDetail'
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
import Wishlist from '@/pages/Profile/Wishlist'
import About from '@/pages/About'
import RateProduct from '@/pages/Profile/RateProduct'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Profile = Loadable(lazy(() => import('@/pages/Profile/Profile')))
const Search = Loadable(lazy(() => import('@/pages/Search')))
const Cart = Loadable(lazy(() => import('@/pages/Cart')))
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
              element: <RateProduct />
            },
            {
              path: 'wishlist',
              element: <Wishlist />
            }
          ]
        },
        {
          path: 'product',
          element: <ProductDetail />,
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
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Trang danh sách blog' />
                  <Blog />
                </>
              )
            },
            {
              path: ':id',
              element: (
                <>
                  <PageTitle title='Edit Category' />
                  <BlogDetail />
                </>
              )
            }
          ]
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
        },
        {
          path: 'cart',
          element: (
            <>
              <PageTitle title='Trang thanh toán' />
              <Cart />
            </>
          )
        }
      ]
    }
  ])
}

export default AppRouter
