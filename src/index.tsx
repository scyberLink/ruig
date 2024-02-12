import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NotFound from "./common/NotFound"
import App from "./App"
import { register } from "./customElementRegistration"

register()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <BrowserRouter>
    <Routes>
      <Route
        path="/"
        Component={(props) => <App {...props} />}
      />
      <Route path="*" Component={(props) => <NotFound {...props} />} />
    </Routes>
  </BrowserRouter>
)