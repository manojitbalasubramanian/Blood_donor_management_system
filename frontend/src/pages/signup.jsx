import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, loading } = useSignup();
  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};
    
    // Validate fullname
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Name is required";
    } else if (formData.fullname.length < 2) {
      newErrors.fullname = "Name must be at least 2 characters long";
    }

    // Validate username
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    // Validate password
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    // Validate confirm password
    if (!formData.confrimpassword) {
      newErrors.confrimpassword = "Please confirm your password";
    } else if (formData.confrimpassword !== formData.password) {
      newErrors.confrimpassword = "Passwords do not match";
    }

    // Validate gender
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    // Validate blood group
    if (!formData.bloodgroup) {
      newErrors.bloodgroup = "Blood group is required";
    } else if (!/^(A|B|AB|O)[+-]$/.test(formData.bloodgroup)) {
      newErrors.bloodgroup = "Invalid blood group format (e.g., A+, O-, AB+)";
    }

    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    // Validate phone
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    // Validate age
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 18 || formData.age > 65) {
      newErrors.age = "Age must be between 18 and 65";
    }

    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
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
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.fullname ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.fullname && (
            <span className="text-red-500 text-xs mt-1">{errors.fullname}</span>
          )}

          {/* Username */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Username</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.username ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-xs mt-1">{errors.username}</span>
          )}

          {/* Password */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.password ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.password && (
            <span className="text-red-500 text-xs mt-1">{errors.password}</span>
          )}

          {/* Confirm Password */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Confirm Password</label>
          <input
            type="password"
            name="confrimpassword"
            placeholder="Confirm Password"
            value={formData.confrimpassword}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.confrimpassword ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.confrimpassword && (
            <span className="text-red-500 text-xs mt-1">{errors.confrimpassword}</span>
          )}

          {/* Gender */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.gender ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <span className="text-red-500 text-xs mt-1">{errors.gender}</span>
          )}

          {/* Blood Group */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Blood Group</label>
          <input
            type="text"
            name="bloodgroup"
            placeholder="Blood Group (e.g. A+, O-)"
            value={formData.bloodgroup}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.bloodgroup ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.bloodgroup && (
            <span className="text-red-500 text-xs mt-1">{errors.bloodgroup}</span>
          )}

          {/* City */}
          <label className="mt-4 mb-1 text-sm text-gray-300">City</label>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.city ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.city && (
            <span className="text-red-500 text-xs mt-1">{errors.city}</span>
          )}

          {/* Phone */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Phone Number</label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.phone ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.phone && (
            <span className="text-red-500 text-xs mt-1">{errors.phone}</span>
          )}

          {/* Age */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Age</label>
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.age ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          />
          {errors.age && (
            <span className="text-red-500 text-xs mt-1">{errors.age}</span>
          )}

          {/* Address */}
          <label className="mt-4 mb-1 text-sm text-gray-300">Address</label>
          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className={`p-3 rounded-xl bg-gray-800 text-sm text-white placeholder-gray-500 outline-none focus:bg-gray-700 focus:ring-2 ${
              errors.address ? "ring-2 ring-red-500" : "focus:ring-red-500"
            }`}
          ></textarea>
          {errors.address && (
            <span className="text-red-500 text-xs mt-1">{errors.address}</span>
          )}

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
