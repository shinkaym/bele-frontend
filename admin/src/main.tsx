import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import '@/assets/css/style.css'
import '@/assets/css/satoshi.css'
import 'jsvectormap/dist/css/jsvectormap.css'
import 'flatpickr/dist/flatpickr.min.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
  </Router>
)
