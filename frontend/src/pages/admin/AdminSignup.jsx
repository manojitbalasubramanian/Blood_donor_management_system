import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import statesData from '../../lib/indianStatesDistricts.json';
import bloodGroups from '../../lib/bloodGroups.json';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    admin: false,
    state: '',
    city: '',
    bloodgroup: '',
    phone: '',
    age: '',
    gender: '',
    address: '',
    password: ''
  });
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'state') {
      setFormData(prev => ({ ...prev, state: value, city: '' }));
      const found = statesData.find(s => s.state === value);
      setDistricts(found ? found.districts : []);
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/create`, formData);
      navigate('/admin/users');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-lg mt-24 mb-24">
      <h2 className="text-2xl font-bold mb-6">Admin Create User</h2>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
        <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" className="w-full p-2 border rounded" required />
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required />
        <select name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select State</option>
          {statesData.map((s) => (
            <option key={s.state} value={s.state}>{s.state}</option>
          ))}
        </select>
        <select name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border rounded" required disabled={!formData.state}>
          <option value="">Select City/District</option>
          {districts.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select name="bloodgroup" value={formData.bloodgroup} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Blood Group</option>
          {bloodGroups.map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>
        <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" />
        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full p-2 border rounded" />
        <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded" />
        <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" className="w-full p-2 border rounded" required />
        <label className="flex items-center gap-2">
          <input type="checkbox" name="admin" checked={formData.admin} onChange={handleChange} /> Admin
        </label>
        <button type="submit" disabled={loading} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-all w-full">
          {loading ? 'Creating...' : 'Create User'}
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
