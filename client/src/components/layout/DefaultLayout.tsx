import { Outlet } from 'react-router-dom'
import Header from './Partials/Header'
import Footer from './Partials/Footer'

function DefaultLayout() {
  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default DefaultLayout
