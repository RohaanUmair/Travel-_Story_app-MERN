import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/auth/Login'
import Signup from './pages/auth/Signup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/dashboard' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}
