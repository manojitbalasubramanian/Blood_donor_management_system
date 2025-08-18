import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Donor from "./pages/Donor";   // ✅ Import Donor page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";  // ✅ Import Footer
import useAuthContext from "./context/useAuthContext";

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route path="/donor" element={<Donor />} />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />

      {/* Notifications */}
      <Toaster />
    </div>
  );
}

export default App;
