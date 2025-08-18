import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/useLogout";

const LogoutButton = () => {
  const { loading, logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login"); // redirect after logout
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="px-5 py-2 rounded-lg bg-gradient-to-r from-red-600 to-pink-500 text-white font-semibold shadow-md hover:scale-105 disabled:opacity-50 transition-all duration-300"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
};

export default LogoutButton;
