import LoadingScreen from '@/components/common/LoadingScreen'
import DefaultLayout from '@/components/layout/DefaultLayout'
<<<<<<< Updated upstream
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
=======
>>>>>>> Stashed changes

const Loadable = <P extends object>(Component: ComponentType<P>): React.FC<P> => {
  return (props: P): ReactNode => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const Home = Loadable(lazy(() => import('@/pages/Home')))

<<<<<<< Updated upstream
function AppRouter() {
  return useRoutes([
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
=======
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
>>>>>>> Stashed changes
}

export default AppRouter
