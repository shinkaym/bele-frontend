import { Outlet } from 'react-router-dom'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

function DashboardLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default DashboardLayout
