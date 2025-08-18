import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, loading } = useSignup();

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
    confrimpassword: "",
    gender: "",
    bloodgroup: "",
    city: "",
    phone: "",
    age: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 font-[Outfit]">
      <div className="bg-gray-900 text-white p-10 rounded-2xl shadow-2xl max-w-[640px] w-full mx-4 border border-gray-700">
        <h2 className="text-center text-[28px] font-bold mb-6 text-red-500">
          Signup
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-2 rounded-full"></div>
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Full Name */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Name</label>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
            value={formData.fullname}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Username */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Password */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Confirm Password */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Confirm Password</label>
          <input
            type="password"
            name="confrimpassword"
            placeholder="Confirm Password"
            value={formData.confrimpassword}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Gender */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* Blood Group */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Blood Group</label>
          <input
            type="text"
            name="bloodgroup"
            placeholder="Blood Group (e.g. A+, O-)"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* City */}
          <label className="mt-4 mb-1 text-sm text-gray-300">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Phone */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Age */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          />

          {/* Address */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 focus:ring-red-500"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="mt-6 py-3 text-base font-semibold rounded-xl bg-gradient-to-r from-red-600 to-pink-600 text-white shadow-md hover:scale-105 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          {/* Already have account */}
          <p className="mt-5 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="text-red-400 hover:text-red-300">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
