import Loader from '@/components/common/Loader'
import PageTitle from '@/components/common/PageTitle'
import PrivateRoute from '@/components/common/PrivateRoute'
import DefaultLayout from '@/components/layout/DefaultLayout'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import { ComponentType, lazy, ReactNode, Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import PublicRoute from '@/components/common/PublicRoute'

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
const AddProduct = Loadable(lazy(() => import('@/pages/Tables/Product/Add')))
const EditProduct = Loadable(lazy(() => import('@/pages/Tables/Product/Edit')))
const AttributeValue = Loadable(lazy(() => import('@/pages/Tables/AttributeValue')))
const AddAttributeValue = Loadable(lazy(() => import('@/pages/Tables/AttributeValue/Add')))
const EditAttributeValue = Loadable(lazy(() => import('@/pages/Tables/AttributeValue/Edit')))
const Employee = Loadable(lazy(() => import('@/pages/Tables/Employee')))
const AddEmployee = Loadable(lazy(() => import('@/pages/Tables/Employee/Add')))
const EditEmployee = Loadable(lazy(() => import('@/pages/Tables/Employee/Edit')))
const Rate = Loadable(lazy(() => import('@/pages/Tables/Rate')))
const Order = Loadable(lazy(() => import('@/pages/Tables/Order')))
const EditOrder = Loadable(lazy(() => import('@/pages/Tables/Order/Edit')))
const Variant = Loadable(lazy(() => import('@/pages/Tables/Variant')))
const AddVariant = Loadable(lazy(() => import('@/pages/Tables/Variant/Add')))
const EditVariant = Loadable(lazy(() => import('@/pages/Tables/Variant/Edit')))
const Decentralize = Loadable(lazy(() => import('@/pages/Tables/Decentralize')))
const Discount = Loadable(lazy(() => import('@/pages/Tables/Discount')))
const AddDiscount = Loadable(lazy(() => import('@/pages/Tables/Discount/Add')))
const EditDiscount = Loadable(lazy(() => import('@/pages/Tables/Discount/Edit')))
const Customer = Loadable(lazy(() => import('@/pages/Tables/Customer')))
const AddCustomer = Loadable(lazy(() => import('@/pages/Tables/Customer/Add')))
const Tag = Loadable(lazy(() => import('@/pages/Tables/Tag')))
const AddTag = Loadable(lazy(() => import('@/pages/Tables/Tag/Add')))
const EditTag = Loadable(lazy(() => import('@/pages/Tables/Tag/Edit')))
const Contact = Loadable(lazy(() => import('@/pages/Tables/Contact')))
const Chat = Loadable(lazy(() => import('@/pages/Tables/Chat')))

function AppRouter() {
  const routes = [
    {
      path: '/',
      element: (
        <PrivateRoute>
          <DefaultLayout />
        </PrivateRoute>
      ),
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
              path: 'edit/:id',
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
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Product' />
                  <EditProduct />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/attribute-value',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Attribute Value' />
                  <AttributeValue />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add AttributeValue' />
                  <AddAttributeValue />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Attribute Value' />
                  <EditAttributeValue />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/employee',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Employee' />
                  <Employee />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Employee' />
                  <AddEmployee />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Employee' />
                  <EditEmployee />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/rate',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Rate' />
                  <Rate />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/order',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Order' />
                  <Order />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Order' />
                  <EditOrder />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/variant',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Variant' />
                  <Variant />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Variant' />
                  <AddVariant />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Variant' />
                  <EditVariant />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/discount',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Discount' />
                  <Discount />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Discount' />
                  <AddDiscount />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Discount' />
                  <EditDiscount />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/customer',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Customer' />
                  <Customer />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Customer' />
                  <AddCustomer />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/tag',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Tag' />
                  <Tag />
                </>
              )
            },
            {
              path: 'add',
              element: (
                <>
                  <PageTitle title='Add Tag' />
                  <AddTag />
                </>
              )
            },
            {
              path: 'edit/:id',
              element: (
                <>
                  <PageTitle title='Edit Tag' />
                  <EditTag />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/contact',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='contact' />
                  <Contact />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/chat',
          children: [
            {
              path: '',
              element: (
                <>
                  <PageTitle title='Chat' />
                  <Chat />
                </>
              )
            }
          ]
        },
        {
          path: '/tables/decentralize',
          element: <Decentralize />
        }
      ]
    },
    {
      path: '/login',
      element: (
        <>
          <PageTitle title='login' />
          <PublicRoute>
            <Login />
          </PublicRoute>
        </>
      )
    }
  ]

  return useRoutes(routes)
}

export default AppRouter
