import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag, FaSearch, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { title: "Shop", path: "/shop" },
    { title: "New Arrivals", path: "/new-arrivals" },
    { title: "Sales", path: "/sales" },
    { title: "Journal", path: "/journal" },
    { title: "Stores", path: "/stores" },
  ];

  return (
    <header className="w-full shadow-sm sticky top-0 z-50">

      {/* Main Nav */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide uppercase">
            CEIN
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 font-medium text-gray-700">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.path}
                className="hover:text-black transition"
              >
                {link.title}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-5">
            <button className="hover:text-gray-600">
              <FaSearch className="text-xl" />
            </button>
            <Link to="/login" className="hover:text-gray-600">
              <FaUser className="text-xl" />
            </Link>
            <Link to="/cart" className="relative hover:text-gray-600">
              <FaShoppingBag className="text-xl" />
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full px-1">
                2
              </span>
            </Link>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="flex flex-col p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-black transition"
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
