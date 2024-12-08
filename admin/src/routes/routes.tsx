import Loader from '@/components/common/Loader'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import PageTitle from '@/components/common/PageTitle'
import DefaultLayout from '@/components/layout/DefaultLayout'
import ECommerce from '@/pages/Dashboard/ECommerce'
import SignIn from '@/pages/Authentication/SignIn'
import SignUp from '@/pages/Authentication/SignUp'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  )
}

const Calendar = Loadable(lazy(() => import('@/pages/Calendar')));
const Chart = Loadable(lazy(() => import('@/pages/Chart')));
const FormElements = Loadable(lazy(() => import('@/pages/Form/FormElements')));
const FormLayout = Loadable(lazy(() => import('@/pages/Form/FormLayout')));
const Profile = Loadable(lazy(() => import('@/pages/Profile')));
const Settings = Loadable(lazy(() => import('@/pages/Settings')));
const Tables = Loadable(lazy(() => import('@/pages/Tables')));
const Alerts = Loadable(lazy(() => import('@/pages/UiElements/Alerts')));
const Buttons = Loadable(lazy(() => import('@/pages/UiElements/Buttons')));





function AppRouter() {
  const routes = [
    {
      path:'/',
      element:<DefaultLayout/>,
      children:[
        {
          path: '/',
          index:true,
          element: (
            <>
              <PageTitle title="eCommerce Dashboard | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <ECommerce />
            </>
          ),
        },
        {
          path: '/calendar',
          element: (
            <>
              <PageTitle title="Calendar | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Calendar />
            </>
          ),
        },
        {
          path: '/profile',
          element: (
            <>
              <PageTitle title="Profile | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Profile />
            </>
          ),
        },
        {
          path: '/forms/form-elements',
          element: (
            <>
              <PageTitle title="Form Elements | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormElements />
            </>
          ),
        },
        {
          path: '/forms/form-layout',
          element: (
            <>
              <PageTitle title="Form Layout | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <FormLayout />
            </>
          ),
        },
        {
          path: '/tables',
          element: (
            <>
              <PageTitle title="Tables | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Tables />
            </>
          ),
        },
        {
          path: '/settings',
          element: (
            <>
              <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Settings />
            </>
          ),
        },
        {
          path: '/chart',
          element: (
            <>
              <PageTitle title="Basic Chart | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Chart />
            </>
          ),
        },
        {
          path: '/ui/alerts',
          element: (
            <>
              <PageTitle title="Alerts | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Alerts />
            </>
          ),
        },
        {
          path: '/ui/buttons',
          element: (
            <>
              <PageTitle title="Buttons | TailAdmin - Tailwind CSS Admin Dashboard Template" />
              <Buttons />
            </>
          ),
        },
      ]
    },
    {
      path: '/auth/signin',
      element: (
        <>
          <PageTitle title="Signin | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <SignIn />
        </>
      ),
    },
    {
      path: '/auth/signup',
      element: (
        <>
          <PageTitle title="Signup | TailAdmin - Tailwind CSS Admin Dashboard Template" />
          <SignUp />
        </>
      ),
    },
  ];

  // Sử dụng useRoutes
  return useRoutes(routes);
}

export default AppRouter
