import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 mt-10">
      {/* Top Section */}
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
          <p className="mb-2">+1 (844) 326-6000</p>
          <p className="mb-2">Email Us</p>
          <p>Mon–Fri 9am–3pm PT</p>
        </div>

        {/* Customers */}
        <div>
          <h3 className="text-lg font-semibold mb-4">CUSTOMERS</h3>
          <ul className="space-y-2">
            <li><Link to="/returns" className="hover:text-black">Start a Return</Link></li>
            <li><Link to="/returns-policy" className="hover:text-black">Return Policy</Link></li>
            <li><Link to="/faq" className="hover:text-black">FAQ</Link></li>
            <li><Link to="/catalogs" className="hover:text-black">Catalogs and Mailers</Link></li>
            <li><Link to="/gifting" className="hover:text-black">About Group Gifting</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="space-y-2">
            <li><Link to="/about" className="hover:text-black">About Us</Link></li>
            <li><Link to="/sustainability" className="hover:text-black">Sustainability</Link></li>
            <li><Link to="/revive" className="hover:text-black">Discover Revive</Link></li>
            <li><Link to="/careers" className="hover:text-black">Careers</Link></li>
            <li><Link to="/privacy" className="hover:text-black">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-black">Terms</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get the latest news from us</h3>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-2 rounded-md hover:bg-gray-800 transition"
            >
              Subscribe
            </button>
          </form>
          <p className="text-xs mt-3">
            By signing up, you agree to our{" "}
            <Link to="/privacy" className="underline">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link to="/terms" className="underline">
              Terms of Service
            </Link>.
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
          <span className="text-xl font-bold">CEIN</span>
          <p className="text-sm text-gray-500 mt-2 md:mt-0">
            © {new Date().getFullYear()} CEIN. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
