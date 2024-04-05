import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { JSX } from 'react/jsx-runtime'
import IAnyObject from './common/models/IAnyObject'
import AppContainer from './layers/view/application/components/base/AppContainer'
import { register } from './customElementRegistration'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

register()

const appContainer = new AppContainer()

appContainer.style.minWidth = process.env.REACT_APP_MIN_WIDTH! ?? '100vw'
appContainer.style.minHeight = process.env.REACT_APP_MIN_HEIGHT! ?? '100vh'
// reportWebVitals(console.log);

const body = document.getElementById('app')

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        Component={(props: JSX.IntrinsicAttributes & IAnyObject) => <App {...{ ...props, appContainer, body }} />}
      />
      <Route
        path="/extension"
        Component={(props: JSX.IntrinsicAttributes & IAnyObject) => <App {...{ ...props, appContainer, body }} />}
      />
    </Routes>
  </BrowserRouter>,
)
