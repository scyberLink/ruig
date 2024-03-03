import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import NotFound from './common/NotFound'
import ExtensionManager from './extension/page/ExtensionManager'
import { register } from './customElementRegistration'
import IAnyObject from './common/models/IAnyObject'

register()

function RuigRouting({ extensions }: IAnyObject) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={(props) => <App {...{ extensions, props }} />} />
        <Route path="/extension" Component={(props) => <ExtensionManager {...{ extensions, props }} />} />
        <Route path="*" Component={(props) => <NotFound {...props} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default RuigRouting
