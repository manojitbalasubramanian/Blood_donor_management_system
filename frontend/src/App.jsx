import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import DonorCard from "./pages/DonorCard";
import RecipientForm from "./pages/RecipientForm";
import BloodNeed from "./pages/BloodNeed";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import useAuthContext from "./context/useAuthContext";
import DonorRegistration from "./pages/DonorRegistration";
import AdminPage from "./pages/admin/AdminPage";
import DonorRecord from "./pages/admin/DonorRecord";
import UserRecord from "./pages/admin/UserRecord";
import RecipientRecord from "./pages/admin/RecipientRecord";

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
            path="/recipient-form"
            element={authUser ? <RecipientForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/blood-need"
            element={authUser ? <BloodNeed /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin"
            element={authUser ? <AdminPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/donors"
            element={authUser && authUser.admin ? <DonorRecord /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/users"
            element={authUser && authUser.admin ? <UserRecord /> : <Navigate to="/login" />}
          />
          <Route
            path="/admin/recipients"
            element={authUser && authUser.admin ? <RecipientRecord /> : <Navigate to="/login" />}
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
