import React, { useEffect, useRef } from 'react';
import reportWebVitals from './common/reportWebVitals';
import './common/globalInclude';
import AppContainer from './layers/view/application/components/base/AppContainer';
import ExtensionPool from './extension/ExtensionPool';
import { Link } from 'react-router-dom';
import { EXTENSION } from './configs/RestEndpoints';

function App() {

  useEffect(() => {
    const appContainer = new AppContainer()

    appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH as string ?? "100vw"
    appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT as string ?? "100vh"
    //reportWebVitals(console.log);
    const body = document.getElementById('app')
    body?.appendChild(appContainer)

    new ExtensionPool(appContainer).loadExtension()
  }, [])

  return (
    <>
      <div id="app" >
        <Link id='extension' to={EXTENSION} style={{background: 'red', /* border: '1px solid red', borderRadius: '5px', */ position: 'fixed', zIndex: '999999', top: 0, right: 0, width: '10px', height: '10px' }}> </Link>
        <style>{`
          #extension:before {
            content: '\eb51';
          }
          `}</style>
      </div>
    </>
  )
}

export default App