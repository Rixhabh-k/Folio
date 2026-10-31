import {BrowserRouter, Routes, Route} from "react-router"
import Register from "./features/auth/pages/Register"
import VerifyEmail from "./features/auth/pages/VerifyEmail"
import Login from "./features/auth/pages/Login"
import Home from "./components/Home"
import CompleteProfile from "./features/profile/pages/CompleteProfile"
import ForgetUsername from "./features/auth/pages/ForgetUsername"


const AppRoutes = () => {
  return (
   <BrowserRouter>
    <Routes>
        
        <Route path="/register" element={<Register/>} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/complete-profile" element={<CompleteProfile/>} />
        <Route path="/forget-username" element={<ForgetUsername/>} />

        
    </Routes>
   </BrowserRouter>
  )
}

export default AppRoutes
