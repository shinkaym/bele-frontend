import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store, { persistor } from './redux/store.ts'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import Loader from './components/common/Loader/index.tsx'
import { IntlProvider } from 'react-intl'
createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <Router>
        <IntlProvider locale='vi-VN'>
          <App />
        </IntlProvider>
      </Router>
    </PersistGate>
  </Provider>
)
