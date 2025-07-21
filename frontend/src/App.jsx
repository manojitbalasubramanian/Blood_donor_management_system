import { Navigate,Route,Routes } from 'react-router-dom'
import {Toaster} from "react-hot-toast"
import Home from './pages/home'
import Login from './pages/login'
import Signup from './pages/signup'
import  useAuthContext  from './context/useAuthContext'

function App() {
  const { authUser } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} /> } />
        <Route path="/login" element={authUser ? <Navigate to="/"/> : <Login />} />
        <Route path="/signUp" element={authUser ? <Navigate to="/"/> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
