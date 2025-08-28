import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AdminLayout from "./layout/AdminLayout"
import  Products  from "./Backend/Products"
import  Dashboard from "./Backend/Dashboard"
import  Orders from "./Backend/Orders"
import  Users from "./Backend/Users"
import  Settings from "./Backend/Settings"
import AdminSignup from "./Backend/AdminSignup"
import AdminLogin from "./Backend/AdminLogin"
import ProductDetails from "./Backend/ProductDetails"
import UserSignup from "./Backend/UserSignup"
import UserLogin from "./Backend/UserLogin"
import OrderDetails from "./Backend/OrderDetails"
import Posts from "./Backend/Posts"
import CreatePost from "./Backend/CreatePost"
import PostDetail from "./Backend/PostDetails"
import UserLayout from "./layout/UserLayout"
import Home from "./Frontend/Pages/Home"
import Shop from "./Frontend/Pages/Shop"

const App = () => {
  return(
   <Router>
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
      <Route index  element={<Dashboard />}/>
      <Route path="/dashboard/products" element={<Products />} />
      <Route path="/dashboard/orders" element={<Orders />} />
      <Route path="/dashboard/posts" element={<Posts />}/>
      <Route path="/dashboard/posts/:id" element={<PostDetail />}/>
      <Route path="/dashboard/create-post" element={<CreatePost />}/>
      <Route path="/dashboard/users" element={<Users />} />
      <Route path="/dashboard/settings" element={<Settings />} />
      <Route path="/dashboard/products/:id" element={<ProductDetails />} />
      <Route path="/dashboard/orders/:id" element={<OrderDetails />}/>
      </Route>

      <Route path="admin/signup" element={<AdminSignup /> } />
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="signup" element={<UserSignup />}/>
      <Route path="login" element={<UserLogin />} />

      <Route path="/" element={<UserLayout />}>
       <Route index element={<Home />}/>
       <Route path="shop" element={<Shop />}/>
      </Route>
    </Routes>
   </Router>

  )
}

export default App