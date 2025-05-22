/* eslint-disable @typescript-eslint/no-explicit-any */
import Reblend, { useEffect, useState } from 'reblendjs'
import { AppContainer } from './layers/view/application/components/base/AppContainer'
import { BaseExtension } from './extension/BaseExtension'
import { ExtensionManager } from './extension/page/ExtensionManager'

async function App({ extensions = [] }: { extensions?: BaseExtension[] }) {
  const [showingExtension, setShowingExtension] = useState(false)

  /* useEffect(() => {
    for (const extension of extensions) {
      new (extension as any)(appContainer)
    }
  }, []) */

  const openExtensionDialog = (e: any) => {
    e.preventDefault()
    setShowingExtension(!showingExtension)
  }

  return (
    <>
      <div
        style={{
          position: 'fixed' as any,
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
      <div id="app" style="display: flex;align-content: center;justify-content: center;align-items: center;">
        <AppContainer style={{ display: showingExtension ? 'none' : 'flex' }} />
      </div>
    </>
  )
}

export { App }
