import { Outlet } from 'react-router-dom'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

function DefaultLayout() {
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

export default DefaultLayout
