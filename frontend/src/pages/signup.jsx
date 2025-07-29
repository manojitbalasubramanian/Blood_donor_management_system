import { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup";
import './signup.css';

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
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(formData);
  };

  return (
    <div className="signup-container">
      <h2>SIGNUP</h2>
      <form onSubmit={handleSubmit}>
        <label>NAME</label>
        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <br />

       <label>USERNAME</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        
         <label>PASSWORD</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br/>
        
         <label>CONFIRM PASSWORD</label>
        <input
          type="password"
          name="confrimpassword"
          placeholder="Confirm Password"
          value={formData.confrimpassword}
          onChange={handleChange}
          required
        />
        <br />
        
        <label>GENDER</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <br />
        
        <label>BLOOD GROUP</label>
        <input
          type="text"
          name="bloodgroup"
          placeholder="Blood Group"
          value={formData.bloodgroup}
          onChange={handleChange}
          required
        />
        <br />
        
        <label>CITY</label>
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
          required
        />
        <br />
        
        <label>PHONE NUMBER</label>
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br />
        
        <label>AGE</label>
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
        />
        <br />
        
        <label>ADDRESS</label>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>
        <br />
        
        <button type="submit" disabled={loading}>
          Sign Up
        </button>

        <p>Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Signup;
