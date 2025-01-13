import AuthProvider from './context/Auth/AuthProvider'
import SettingProvider from './context/Setting/SettingProvider'
import AppRouter from './routes/routes'

function App() {
  return (
    <AuthProvider>
      <SettingProvider>
        <AppRouter />
      </SettingProvider>
    </AuthProvider>
  )
}

export default App
