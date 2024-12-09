import Loader from '@/components/common/Loader'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import SignIn from '@/pages/Authentication/SignIn'
import SignUp from '@/pages/Authentication/SignUp'
import Dashboard from '@/pages/Dashboard'
import Add from '@/pages/Tables/Category/Add'
import Edit from '@/pages/Tables/Category/Edit'
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
                  <Add />
                </>
              )
            },
            {
              path: 'edit/:categoryId',
              element: (
                <>
                  <PageTitle title='Edit Category' />
                  <Edit />
                </>
              )
            }
          ]
        }
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
