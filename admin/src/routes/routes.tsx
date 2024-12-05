import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import LoadingScreen from '@/components/common/LoadingScreen'
import DashboardLayout from '@/components/layout/DashboardLayout'

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Home = Loadable(lazy(() => import('@/pages/Home')))

const routes = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        path: '/',
        element: <Home />
      }
    ]
  }
])

export default function AppRouter() {
  return <RouterProvider router={routes} />
}
