const initAppContainer = () => {
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
}

export { initAppContainer }
