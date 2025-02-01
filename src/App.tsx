/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import AppContainer from './layers/view/application/components/base/AppContainer'
import BaseExtension from './extension/BaseExtension'
import ExtensionManager from './extension/page/ExtensionManager'

function App({ extensions = [], appContainer }: { extensions?: BaseExtension[]; appContainer: AppContainer }) {
  const [showingExtension, setShowingExtension] = useState(false)

  useEffect(() => {
    const body = document.getElementById('app')
    body?.appendChild(appContainer)
    for (const extension of extensions) {
      new (extension as any)(appContainer)
    }

    return () => {
      body?.removeChild(appContainer)
    }
  }, [])

  const openExtensionDialog = (e: any) => {
    e.preventDefault()
    appContainer.toggleDisplay()
    setShowingExtension(!showingExtension)
  }

  return (
    <>
      <div id="app">
        <div
          style={{
            position: 'fixed',
            zIndex: '999999',
            top: 0,
            right: 0,
            width: '20px',
            height: '40px',
            border: 0,
            borderRadius: '5px',
          }}
        >
          <button
            onClick={openExtensionDialog}
            style={{
              background: showingExtension ? 'blue' : 'red',
              height: '20px',
            }}
          />

          <a
            href="./"
            style={{
              background: 'pink',
              height: '20px',
            }}
          >
            R
          </a>
        </div>
        {showingExtension ? <ExtensionManager /> : <></>}
      </div>
    </>
  )
}

export default App
