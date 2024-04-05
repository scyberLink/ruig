import React, { useEffect } from 'react'
// import reportWebVitals from './common/reportWebVitals'
import { Link, useLocation } from 'react-router-dom'
import { EXTENSION } from './configs/RestEndpoints'
import IAnyObject from './common/models/IAnyObject'

function App({ extensions = [], appContainer, body }: IAnyObject) {
  const loc = useLocation()

  useEffect(() => {
    body?.appendChild(appContainer)
    for (const extension of extensions) {
      new extension(appContainer)
    }

    if ('serviceWorker' in navigator) {
      if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.register('cacher.js').catch((error) => {
          console.error('Cacher Worker registration failed:', error)

          if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then((registrations) => {
              registrations.forEach((registration) => {
                registration.unregister()
                console.log('Service worker unregistered successfully:', registration)
              })
            })
          }
        })

        navigator.serviceWorker.register('extension-store/extensionprovider.js').catch((error) => {
          console.error('Extension Provider Worker registration failed:', error)

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

    return () => {
      body?.removeChild(appContainer)
    }
  }, [])

  return (
    <>
      <div>
        <Link
          id="extension"
          to={EXTENSION}
          style={{
            background: 'red',
            /* border: '1px solid red', borderRadius: '5px', */ position: 'fixed',
            zIndex: '999999',
            top: 0,
            right: 0,
            width: '10px',
            height: '10px',
          }}
        >
          {' '}
        </Link>
        <style>{`
          #extension:before {
            content: '\\eb51';
          }
          `}</style>
      </div>
    </>
  )
}

export default App
