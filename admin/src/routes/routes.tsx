import Loader from '@/components/common/Loader'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import SignIn from '@/pages/Authentication/SignIn'
import SignUp from '@/pages/Authentication/SignUp'
import Dashboard from '@/pages/Dashboard'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}

const InfoPersonal = Loadable(lazy(() => import('@/pages/InfoPersonal')))
const Setting = Loadable(lazy(() => import('@/pages/Setting')))
const Category = Loadable(lazy(() => import('@/pages/Tables/Category')))
const AddCat = Loadable(lazy(() => import('@/pages/Tables/Category/Add')))
const EditCat = Loadable(lazy(() => import('@/pages/Tables/Category/Edit')))
const Product = Loadable(lazy(() => import('@/pages/Tables/Product'))) 
const AddProduct= Loadable(lazy(() => import('@/pages/Tables/Product/Add')))
const EditProduct= Loadable(lazy(() => import('@/pages/Tables/Product/Edit')))


function AppRouter() {
  const routes = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        {
          path: '/',
          index: true,
          element: (
            <>
              <PageTitle title='Dashboard' />
              <Dashboard />
            </>
          )
        },
        {
          path: '/info-personal',
          index: true,
          element: (
            <>
              <PageTitle title='Info Personal' />
              <InfoPersonal />
            </>
          )
        },
        {
          path: '/setting',
          element: (
            <>
              <PageTitle title='Setting' />
              <Setting />
            </>
          )
        },
        {
          path: '/tables/category',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Category' />
                  <Category />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Category' />
                  <AddCat />
                </>
              )
            },
            {
              path: 'edit/:categoryId',
              element: (
                <>
                  <PageTitle title='Edit Category' />
                  <EditCat />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/product',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Product' />
                  <Product />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Product' />
                  <AddProduct />
                </>
              )
            },
            {
              path: 'edit/:productId',
              element: (
                <>
                  <PageTitle title='Edit Product' />
                  <EditProduct />
                </>
              )
            }
          ]
        },
      ]
    },
    {
      path: '/signin',
      element: (
        <>
          <PageTitle title='Signin' />
          <SignIn />
        </>
      )
    },
    {
      path: '/signup',
      element: (
        <>
          <PageTitle title='Signup' />
          <SignUp />
        </>
      )
    }
  ]

  return useRoutes(routes)
}

export default AppRouter
