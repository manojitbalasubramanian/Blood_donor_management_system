import React, { useEffect, useState } from 'react';
import bloodGroups from '../../lib/bloodGroups.json';
import statesData from '../../lib/indianStatesDistricts.json';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/useAuthContext';

const UserRecord = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'edit' or 'create'
  const [selectedUser, setSelectedUser] = useState(null);
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
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || !authUser.admin) {
      navigate('/');
      return;
    }
    fetchUsers();
    // eslint-disable-next-line
  }, [authUser, navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1234/api/admin/all', {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Edit functionality removed

  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      await axios.delete(`http://localhost:1234/api/admin/${userId}`, {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      fetchUsers();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleCreate = () => {
    navigate('/admin/signup');
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'state') {
      setFormData(prev => ({ ...prev, state: value, city: '' }));
      const found = statesData.find(s => s.state === value);
      setDistricts(found ? found.districts : []);
    } else {
      setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'edit') {
        await axios.put(`http://localhost:1234/api/admin/${selectedUser._id}`, formData, {
          headers: { Authorization: `Bearer ${authUser.token}` }
        });
      } else {
        await axios.post('http://localhost:1234/api/admin/create', formData, {
          headers: { Authorization: `Bearer ${authUser.token}` }
        });
      }
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
      alert('Operation failed');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-pink-600">User Records</h2>
  <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleCreate}>Create User</button>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.fullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.admin ? 'Yes' : 'No'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.bloodgroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.password}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Edit button removed */}
                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs" onClick={() => handleDelete(user._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="text-center py-4 text-gray-500">No user records found</div>
          )}
        </div>
      </div>

      {/* Modal for Edit only (not for create) */}
      {showModal && modalType === 'edit' && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input type="text" name="fullname" value={formData.fullname} onChange={handleFormChange} placeholder="Full Name" className="w-full p-2 border rounded" required />
              <input type="text" name="username" value={formData.username} onChange={handleFormChange} placeholder="Username" className="w-full p-2 border rounded" required />
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" className="w-full p-2 border rounded" required />
              <select name="state" value={formData.state} onChange={handleFormChange} className="w-full p-2 border rounded" required>
                <option value="">Select State</option>
                {statesData.map((s) => (
                  <option key={s.state} value={s.state}>{s.state}</option>
                ))}
              </select>
              <select name="city" value={formData.city} onChange={handleFormChange} className="w-full p-2 border rounded" required disabled={!formData.state}>
                <option value="">Select City/District</option>
                {districts.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              <select name="bloodgroup" value={formData.bloodgroup} onChange={handleFormChange} className="w-full p-2 border rounded" required>
                <option value="">Select Blood Group</option>
                {bloodGroups.map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" className="w-full p-2 border rounded" />
              <input type="number" name="age" value={formData.age} onChange={handleFormChange} placeholder="Age" className="w-full p-2 border rounded" />
              <select name="gender" value={formData.gender} onChange={handleFormChange} className="w-full p-2 border rounded" required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" className="w-full p-2 border rounded" />
              <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password (leave blank to keep current)" className="w-full p-2 border rounded" />
              <label className="flex items-center gap-2">
                <input type="checkbox" name="admin" checked={formData.admin} onChange={handleFormChange} /> Admin
              </label>
              <div className="flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRecord;
