import { BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import MyNavbar from './components/UI/navbar/MyNavbar'
import AppRouter from './components/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <MyNavbar/>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App
