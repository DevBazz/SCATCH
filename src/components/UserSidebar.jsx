import { Link, useLocation } from "react-router-dom";
import { FaUser, FaBox, FaHeart, FaSignOutAlt } from "react-icons/fa";

const UserSidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/profile", label: "Profile", icon: <FaUser /> },
    { path: "/orders", label: "Order History", icon: <FaBox /> },
    { path: "/wishlist", label: "Wishlist", icon: <FaHeart /> },
  ];

  return (
    <aside className="bg-gray-100 rounded-lg p-6 h-fit">
      <h2 className="text-lg font-semibold mb-6">My Account</h2>
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`flex items-center gap-2 ${
                location.pathname === link.path
                  ? "font-bold text-black"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              {link.icon} {link.label}
            </Link>
          </li>
        ))}
        <li>
          <button className="flex items-center gap-2 text-red-600 hover:underline">
            <FaSignOutAlt /> Logout
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
