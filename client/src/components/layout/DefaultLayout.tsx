import { Outlet } from 'react-router-dom'
import Footer from './Partials/Footer'
import Header from './Partials/Header'
import Chat from './Partials/Chat'

function DefaultLayout() {

  return (
    <div className='min-h-screen bg-white'>
      <Header />
      <main>
        <Outlet />
      </main>
      <Chat/>
      <Footer />  
    </div>
  )
}

export default DefaultLayout
