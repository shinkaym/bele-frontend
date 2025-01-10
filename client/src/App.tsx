import SettingProvider from './context/Setting/SettingProvider'
import AppRouter from './routes/routes'

function App() {
  return (
    <SettingProvider>
      <AppRouter />
    </SettingProvider>
  )
}

export default App
