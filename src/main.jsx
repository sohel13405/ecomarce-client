import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-calendar/dist/Calendar.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import {  RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import AuthProvider from './components/auth/AuthProvider.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
