import { Outlet } from "react-router-dom"
import  SideBar  from "../components/SideBar"

 const AdminLayout = () => {
   return (
    <div className="flex flex-row">
       <div>
        <SideBar />
        </div> 
        <Outlet />
    </div>
   )
}

export default AdminLayout