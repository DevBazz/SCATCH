import { useState } from "react";
import { NavLink } from "react-router-dom";
import { GiShoppingBag } from "react-icons/gi";
import { RiDashboardFill } from "react-icons/ri";
import { TfiDropboxAlt } from "react-icons/tfi";
import { FaCartFlatbed } from "react-icons/fa6";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { MdPostAdd } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Hamburger button (visible on mobile only) */}
      <button
        className="lg:hidden fixed top-3 right-4 z-50 p-2 text-white bg-gray-800 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
      </button>

      {/* Sidebar */}
      <section
        className={`h-screen bg-gray-900 fixed md:sticky top-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out w-screen sm:w-[50vw] lg:w-[17vw] z-40`}
      >
        <div className="flex flex-col justify-center items-center gap-10 lg:gap-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="w-full h-[5vh] flex pl-4 gap-3 text-2xl mt-10 text-white"
          >
            <GiShoppingBag />
            <h2>SCATCH</h2>
          </NavLink>

          {/* Navigation */}
          <nav className="w-full h-[70vh] flex flex-col gap-6 items-start text-xl text-zinc-300 tracking-wide">
            <NavLink
              to="/"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <RiDashboardFill />
              <p>Dashboard</p>
            </NavLink>

            <NavLink
              to="/products"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <TfiDropboxAlt />
              <p>Products</p>
            </NavLink>

            <NavLink
              to="/orders"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <FaCartFlatbed />
              <p>Orders</p>
            </NavLink>

            <NavLink
              to="/posts"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <MdPostAdd />
              <p>Posts</p>
            </NavLink>

            <NavLink
              to="/users"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <BiSolidMessageSquareDetail />
              <p>Users</p>
            </NavLink>

            <NavLink
              to="/settings"
              className="flex w-full pl-4 items-center gap-5 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <IoSettings />
              <p>Setting</p>
            </NavLink>
          </nav>
        </div>
      </section>
    </>
  );
};

export default SideBar;
