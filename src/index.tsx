import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import initAppContainer from './init'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const appContainer = initAppContainer()

root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/ruig" Component={() => <App appContainer={appContainer} />} />
      <Route path="*" Component={() => <Navigate to="/ruig" />} />
    </Routes>
  </BrowserRouter>,
)
