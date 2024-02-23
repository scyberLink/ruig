import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import NotFound from './common/NotFound'
import ExtensionManager from './extension/page/ExtensionManager'

function RuigRouting() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={(props) => <App {...props} />} />
        <Route path="/extension" Component={(props) => <ExtensionManager {...props} />} />
        <Route path="*" Component={(props) => <NotFound {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RuigRouting
