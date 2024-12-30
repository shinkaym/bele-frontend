import AuthProvider from './context/Auth/AuthProvider'
import AppRouter from './routes/routes'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
