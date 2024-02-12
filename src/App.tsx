import React, { useEffect, useRef } from 'react';
import reportWebVitals from './common/reportWebVitals';
import './common/globalInclude';
import AppContainer from './layers/view/application/components/base/AppContainer';

function App() {

  useEffect(() => {
    const appContainer = new AppContainer()

    appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH as string ?? "100vw"
    appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT as string ?? "100vh"
    //reportWebVitals(console.log);
    const body = document.getElementById('app')
    body?.appendChild(appContainer)
  }, [])

  return (
    <>
      <div id="app" />
    </>
  )
}

export default App