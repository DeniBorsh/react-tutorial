import { BrowserRouter } from 'react-router-dom'
import './styles/App.css'
import MyNavbar from './components/UI/navbar/MyNavbar'
import AppRouter from './components/AppRouter'
import { AuthContext } from './context'
import { useEffect, useState } from 'react'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)
  useEffect(() => {
    if (localStorage.getItem('auth')) 
      setIsAuth(true)
    setLoading(false)
  }, [])
  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <MyNavbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
