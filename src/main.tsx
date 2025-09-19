import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// service worker register karne ke liye import
import { registerSW } from 'virtual:pwa-register'

// Auto-update setup (type hinting ke saath)
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm("New version available. Reload?")) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline 🚀")
  },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
