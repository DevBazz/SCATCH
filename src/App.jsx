import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"
import  Products  from "./Pages/Products"
import  Dashboard from "./Pages/Dashboard"
import  Orders from "./Pages/Orders"
import  Users from "./Pages/Users"
import  Settings from "./Pages/Settings"


const App = () => {
  return(
   <Router>
    <Routes>
      <Route path="/" element={<AdminLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
   </Router>

  )
}

export default App