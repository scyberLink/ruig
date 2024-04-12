import { register } from './customElementRegistration'
import AppContainer from './layers/view/application/components/base/AppContainer'

const initAppContainer = () => {
  register()

  const appContainer = new AppContainer()

  appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH! ?? '100vw'
  appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT! ?? '100vh'
  // reportWebVitals(console.log);

  if ('serviceWorker' in navigator) {
    if (!navigator.serviceWorker.controller) {
      navigator.serviceWorker.register('sw.js').catch((error) => {
        console.error('Worker registration failed:', error)

        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.getRegistrations().then((registrations) => {
            registrations.forEach((registration) => {
              registration.unregister()
              console.log('Service worker unregistered successfully:', registration)
            })
          })
        }
      })
    }
  }
  return appContainer
}

export default initAppContainer
