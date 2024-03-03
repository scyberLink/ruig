import React, { useEffect } from 'react'
// import reportWebVitals from './common/reportWebVitals'
import AppContainer from './layers/view/application/components/base/AppContainer'
import { Link } from 'react-router-dom'
import { EXTENSION } from './configs/RestEndpoints'
import IAnyObject from './common/models/IAnyObject'

function App({ extensions = [] }: IAnyObject) {
  useEffect(() => {
    const appContainer = new AppContainer()

    appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH! ?? '100vw'
    appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT! ?? '100vh'
    // reportWebVitals(console.log);
    const body = document.getElementById('app')
    body?.appendChild(appContainer)

    for (const extension of extensions) {
      new extension(appContainer)
    }
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`cacher.js`).catch((error) => {
        console.error('Cacher Worker registration failed: ', error)
      })
      navigator.serviceWorker.register(`extension-store/extensionprovider.js`).catch((error) => {
        console.error('Extension Provider Worker registration failed: ', error)
      })
    }
  }, [])

  return (
    <>
      <div id="app">
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
