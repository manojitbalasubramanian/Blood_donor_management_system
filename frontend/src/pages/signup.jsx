import { useState } from "react";
import StateDistrictSelect from "../components/StateDistrictSelect";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";

const Signup = () => {
  const { signup, loading } = useSignup();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    confrimpassword: "",
    gender: "",
    bloodgroup: "",
    city: "",
    state: "",
    phone: "",
    age: "",
    address: "",
  });

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullname.trim()) {
      newErrors.fullname = "Name is required";
    } else if (formData.fullname.length < 2) {
      newErrors.fullname = "Name must be at least 2 characters long";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confrimpassword) {
      newErrors.confrimpassword = "Please confirm your password";
    } else if (formData.confrimpassword !== formData.password) {
      newErrors.confrimpassword = "Passwords do not match";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
    }

    if (!formData.bloodgroup) {
      newErrors.bloodgroup = "Blood group is required";
    } else if (!/^(A|B|AB|O)[+-]$/.test(formData.bloodgroup)) {
      newErrors.bloodgroup = "Invalid blood group format (e.g., A+, O-, AB+)";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (formData.age < 18 || formData.age > 65) {
      newErrors.age = "Age must be between 18 and 65";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleStateChange = (state) => {
    setFormData((prev) => ({ ...prev, state, city: "" }));
  };

  const handleDistrictChange = (city) => {
    setFormData((prev) => ({ ...prev, city }));
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
    <div className="min-h-screen flex justify-center items-center bg-slate-950 p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-lg shadow-xl max-w-2xl w-full p-8">
        <div className="space-y-2 mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Create an account</h1>
          <p className="text-sm text-slate-400">Register to become a blood donor</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullname" className="text-sm font-medium text-slate-200 block">
                Full Name
              </label>
              <input
                id="fullname"
                type="text"
                name="fullname"
                placeholder="John Doe"
                value={formData.fullname}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "
              />
              {errors.fullname && <span className="text-red-500 text-xs">{errors.fullname}</span>}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-slate-200 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "
              />
              {errors.email && <span className="text-red-500 text-xs">{errors.email}</span>}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-slate-200 block">
                Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="johndoe"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors"
              ></input>
              {errors.username && <span className="text-red-500 text-xs">{errors.username}</span>}
            </div>

            {/* Blood Group */}
            <div className="space-y-2">
              <label htmlFor="bloodgroup" className="text-sm font-medium text-slate-200 block">
                Blood Group
              </label>
              <input
                id="bloodgroup"
                type="text"
                name="bloodgroup"
                placeholder="A+, O-, AB+"
                value={formData.bloodgroup}
                onChange={handleChange}
                required
                className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "}
              />
              {errors.bloodgroup && <span className="text-red-500 text-xs">{errors.bloodgroup}</span>}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-slate-200 block">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder=""
                value={formData.password}
                onChange={handleChange}
                required
                className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "}
              />
              {errors.password && <span className="text-red-500 text-xs">{errors.password}</span>}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label htmlFor="confrimpassword" className="text-sm font-medium text-slate-200 block">
                Confirm Password
              </label>
              <input
                id="confrimpassword"
                type="password"
                name="confrimpassword"
                placeholder=""
                value={formData.confrimpassword}
                onChange={handleChange}
                required
                className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "}
              />
              {errors.confrimpassword && <span className="text-red-500 text-xs">{errors.confrimpassword}</span>}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label htmlFor="gender" className="text-sm font-medium text-slate-200 block">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 bg-slate-800 border rounded-md text-white text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && <span className="text-red-500 text-xs">{errors.gender}</span>}
            </div>

            {/* Age */}
            <div className="space-y-2">
              <label htmlFor="age" className="text-sm font-medium text-slate-200 block">
                Age
              </label>
              <input
                id="age"
                type="number"
                name="age"
                placeholder="25"
                value={formData.age}
                onChange={handleChange}
                required
                className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "}
              />
              {errors.age && <span className="text-red-500 text-xs">{errors.age}</span>}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-200 block">
                Phone Number
              </label>
              <input
                id="phone"
                type="text"
                name="phone"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                required
                className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors "}
              />
              {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
            </div>
          </div>

          {/* State & City Dropdown */}
          <div className="space-y-2">
            <StateDistrictSelect
              stateValue={formData.state}
              districtValue={formData.city}
              onStateChange={handleStateChange}
              onDistrictChange={handleDistrictChange}
              stateName="state"
              districtName="city"
              required={true}
            />
            {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label htmlFor="address" className="text-sm font-medium text-slate-200 block">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              className={"w-full px-3 py-2 bg-slate-800 border rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:border-red-500 transition-colors resize-none "}
            />
            {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors mt-6"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>

          {/* Already have account */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
