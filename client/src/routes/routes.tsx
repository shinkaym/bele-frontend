import LoadingScreen from '@/components/common/LoadingScreen'
import DefaultLayout from '@/components/layout/DefaultLayout'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

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
    element: <DefaultLayout />,
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
