import { NavLink } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";
import { TfiDropboxAlt } from "react-icons/tfi";
import { FaCartFlatbed } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

const SideBar = () => {
    return(
        <section className="h-screen w-[17vw] bg-gray-900 sticky top-0 ">
          <div className="flex flex-col  justify-center items-center gap-16">

            <NavLink to="/" className="w-[15vw] h-[5vh] flex pl-4 gap-3 text-2xl mt-10 text-white">
             <GiShoppingBag />
             <h2>SCATCH</h2>
            </NavLink>

            <nav className="w-[15vw] h-[70vh] flex flex-col gap-6 items-center text-xl text-zinc-300 tracking-wide">
               <NavLink to="/" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <RiDashboardFill />
                <p>Dashboard</p>
                </NavLink>

               <NavLink to="/products" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <TfiDropboxAlt />
                <p>Products</p>
                </NavLink>

               <NavLink to="/orders" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <FaCartFlatbed />
                <p>Orders</p>
                </NavLink>

              <NavLink to="/posts" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <MdPostAdd />
                <p>Posts</p>
                </NavLink>

                <NavLink to="/users" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <BiSolidMessageSquareDetail />
                <p>Users</p>
                </NavLink>

                <NavLink to="/settings" className="flex w-full pl-4 items-center gap-5 hover:text-white">
                <IoSettings />
                <p>Setting</p>
                </NavLink> 
            </nav>

          </div>
        </section>
    )
}

export default SideBar