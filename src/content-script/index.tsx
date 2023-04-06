import { createRoot } from 'react-dom/client'
import '../../base.css'
import App from './App'

const renderBidButton = () => {
  const mainContainer = document.querySelector('#main') as HTMLElement
  const responseContainer = document.createElement('div')
  mainContainer?.append(responseContainer)

  const root = createRoot(responseContainer)
  root.render(<App />)
}

renderBidButton()
