import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";
import useLogout from "../hooks/useLogout";
import Logo from "../assets/logo.jpeg";
import { Menu, X, UserCircle } from 'lucide-react';

function Navbar() {
  const { authUser } = useAuthContext();
  const { logout, loading } = useLogout();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await logout();       // clear session
    navigate("/login");   // go back to login page
  };

  const NavLink = ({ to, children }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        className={`relative px-3 py-2 transition-all duration-300 ${
          isActive
            ? 'text-red-400 font-semibold'
            : 'text-gray-300 hover:text-red-400'
        } group`}
      >
        {children}
        <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-red-400 transform origin-left transition-transform duration-300 ${
          isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
        }`}></span>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg'
        : 'bg-gradient-to-r from-gray-800 to-gray-700'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 group">
              <img
                src={Logo}
                alt="BloodBridge Logo"
                className="h-10 w-10 object-cover rounded-full border-2 border-red-500 shadow-md transition-transform duration-300 group-hover:scale-105"
              />
              <h1 className="text-xl font-bold text-white">
                Blood<span className="text-red-500">Bridge</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation - Moved to right */}
          <div className="hidden md:flex items-center justify-end flex-1 ml-10">
            <div className="flex items-center space-x-4">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/donor">Donor Registration</NavLink>
              <NavLink to="/recipient-form">Request Blood</NavLink>
              
              {!authUser && (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/signup">Signup</NavLink>
                </>
              )}

              {authUser && (
                <div className="relative group">
                  <button className="flex items-center space-x-2 focus:outline-none px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                    <UserCircle size={28} className="text-red-400" />
                    <span className="text-red-400 font-semibold">{authUser.fullname || 'User'}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 py-2 z-50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-auto transition-all duration-200 flex flex-col gap-1">
                    {authUser.admin && (
                      <NavLink to="/admin" className={({isActive}) => `block px-5 py-2 rounded-lg transition-colors ${isActive ? 'bg-red-900 text-red-400 font-semibold' : 'text-gray-200 hover:bg-gray-700 hover:text-red-400'}`}>Admin</NavLink>
                    )}
                    <NavLink to="/update-profile" className={({isActive}) => `block px-5 py-2 rounded-lg transition-colors ${isActive ? 'bg-red-900 text-red-400 font-semibold' : 'text-gray-200 hover:bg-gray-700 hover:text-red-400'}`}>Update Profile</NavLink>
                    <NavLink to="/update-donor-data" className={({isActive}) => `block px-5 py-2 rounded-lg transition-colors ${isActive ? 'bg-red-900 text-red-400 font-semibold' : 'text-gray-200 hover:bg-gray-700 hover:text-red-400'}`}>Update Donor Data</NavLink>
                    <button
                      onClick={handleLogout}
                      disabled={loading}
                      className="w-full text-left px-5 py-2 text-red-400 rounded-lg font-semibold hover:bg-gray-700 hover:text-red-300 transition-colors disabled:opacity-50 mt-1"
                    >
                      {loading ? "Logging out..." : "Logout"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden bg-gray-800`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              to="/donor"
              className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
            >
              Donor Registration
            </Link>
            <Link
              to="/blood-need"
              className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
            >
              Blood Need
            </Link>
            <Link
              to="/recipient-form"
              className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
            >
              Request Blood
            </Link>
            {!authUser && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
                >
                  Signup
                </Link>
              </>
            )}

            {authUser && authUser.admin && (
              <Link
                to="/admin"
                className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
              >
                Admin
              </Link>
            )}
            
            {authUser && (
              <button
                onClick={handleLogout}
                disabled={loading}
                className="w-full text-left px-3 py-2 text-white hover:bg-gray-700 hover:text-red-400 rounded-md transition-colors"
              >
                {loading ? "Logging out..." : "Logout"}
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
