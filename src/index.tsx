import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'

import { ToastContainer } from 'react-toastify'
import { UserContextProvider } from './context/userContext'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GlobalStyle } from './presentation/styles/global'

const rootElement = document.getElementById('root')

const queryClient = new QueryClient()

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContextProvider>
          <ToastContainer />
          <GlobalStyle />
          <App />
        </UserContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
