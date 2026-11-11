import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'

// Once the page has loaded, so Google's tag, which react-ga4 loads, doesn't
// compete with the page's own script for the network and main thread.
window.addEventListener(
  'load',
  async () => {
    const { default: ReactGA } = await import('react-ga4')
    ReactGA.initialize('G-ID-CHANGE-THIS')
  },
  { once: true }
)

// biome-ignore lint/style/noNonNullAssertion: root is always present
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
