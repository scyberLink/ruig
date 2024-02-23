import ReactDOM from 'react-dom/client'
import { register } from './customElementRegistration'
import RuigRouting from './RuigRouting'

register()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<RuigRouting />)
