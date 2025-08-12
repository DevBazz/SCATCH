import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"
import  Products  from "./Pages/Products"
import  Dashboard from "./Pages/Dashboard"
import  Orders from "./Pages/Orders"
import  Users from "./Pages/Users"
import  Settings from "./Pages/Settings"
import AdminSignup from "./Pages/AdminSignup"
import AdminLogin from "./Pages/AdminLogin"
import ProductDetails from "./Pages/ProductDetails"
import UserSignup from "./Pages/UserSignup"
import UserLogin from "./Pages/UserLogin"

const App = () => {
  return(
   <Router>
    <Routes>
      <Route path="/" element={<AdminLayout />}>
      <Route index  element={<Dashboard />}/>
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route path="products/:id" element={<ProductDetails />} />
      </Route>
      <Route path="admin/signup" element={<AdminSignup /> } />
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="signup" element={<UserSignup />}/>
      <Route path="login" element={<UserLogin />} />
    </Routes>
   </Router>

  )
}

export default App