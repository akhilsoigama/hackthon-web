import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import { Toaster } from 'sonner'

import { registerSW } from 'virtual:pwa-register'
const updateSW = registerSW({
  onNeedRefresh() {
    import('sonner').then(({ toast }) => {
      toast.info('New version available!', {
        description: 'Click to update the application',
        action: {
          label: 'Update',
          onClick: () => updateSW(true)
        },
        duration: 5000,
        dismissible: true
      })
    })
  },
  onOfflineReady() {
    import('sonner').then(({ toast }) => {
      toast.success('App ready to work offline 🚀', {
        duration: 3000
      })
    })
    console.log("App ready to work offline 🚀")
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster 
      position="top-right"
      expand={true}
      richColors
      closeButton
      theme="light"
    />
  </React.StrictMode>,
)
