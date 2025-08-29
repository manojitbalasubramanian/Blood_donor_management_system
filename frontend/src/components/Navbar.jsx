import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../context/useAuthContext";
import useLogout from "../hooks/useLogout";
import Logo from "../assets/logo.jpeg";

function Navbar() {
  const { authUser } = useAuthContext();
  const { logout, loading } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();       // clear session
    navigate("/login");   // go back to login page
  };

  return (
    <nav className="bg-red-600 text-white px-8 py-4 flex justify-between items-center h-20 shadow-md">
      {/* Logo + Brand Name */}
      <Link to="/" className="flex items-center gap-3">
       <img
        src={Logo}
        alt="BloodBridge Logo"
        className="h-12 w-12 object-cover rounded-full border-2 border-white shadow-md"
       />

        <h1 className="text-2xl font-bold">BloodBridge</h1>
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6 text-lg">
        <Link to="/">Home</Link>
        <Link to="/donor">Donor Registration</Link>
        <Link to="/blood-need">Recipient</Link>

        {!authUser && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {authUser && (
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-white text-red-600 px-4 py-2 rounded font-medium hover:bg-gray-200 transition disabled:opacity-50"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
