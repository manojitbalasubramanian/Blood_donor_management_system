import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import DonorCard from "./pages/DonorCard";
import BloodNeed from "./pages/BloodNeed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuthContext from "./context/useAuthContext";
import DonorRegistration from "./pages/DonorRegistration";

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
          <Route path="/donor" element={<DonorCard />} />
          <Route 
            path="/donor-registration"
            element={authUser ? <DonorRegistration /> : <Navigate to="/login" />}
          />
          <Route
            path="/blood-need"
            element={authUser ? <BloodNeed /> : <Navigate to="/login" />}
          />
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
