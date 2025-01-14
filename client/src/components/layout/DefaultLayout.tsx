import { Outlet } from 'react-router-dom'
import Footer from './Partials/Footer'
import Header from './Partials/Header'

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
