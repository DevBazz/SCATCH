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
      <Route path="products" element={<Products />} />
      <Route path="orders" element={<Orders />} />
      <Route path="posts" element={<Posts />}/>
      <Route path="posts/:id" element={<PostDetail />}/>
      <Route path="create-post" element={<CreatePost />}/>
      <Route path="users" element={<Users />} />
      <Route path="settings" element={<Settings />} />
      <Route path="products/:id" element={<ProductDetails />} />
      <Route path="orders/:id" element={<OrderDetails />}/>
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