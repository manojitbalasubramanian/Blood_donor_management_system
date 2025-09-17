import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/useAuthContext';

const DonorRecord = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create'); // 'edit' or 'create'
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '', bloodGroup: '', age: '', gender: '', height: '', weight: '', city: '', state: '', country: '', phone: '', email: '', address: '', lastDonation: '', availability: false, userId: '', password: ''
  });
  const [filters, setFilters] = useState({
    bloodGroup: '', city: '', state: '', age: '', gender: '',
  });
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || !authUser.admin) {
      navigate('/');
      return;
    }
    fetchDonors();
    // eslint-disable-next-line
  }, [authUser, navigate]);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:1234/api/donors/all', {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      setDonors(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (donor) => {
    setSelectedDonor(donor);
    setFormData({ ...donor });
    setModalType('edit');
    setShowModal(true);
  };

  const handleDelete = async (donorId) => {
    if (!window.confirm('Are you sure you want to delete this donor?')) return;
    try {
      await axios.delete(`http://localhost:1234/api/donors/${donorId}`, {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      fetchDonors();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleCreate = () => {
    setSelectedDonor(null);
    setFormData({ fullName: '', bloodGroup: '', age: '', gender: '', height: '', weight: '', city: '', state: '', country: '', phone: '', email: '', address: '', lastDonation: '', availability: false, userId: '', password: '' });
    setModalType('create');
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === 'edit') {
        await axios.put(`http://localhost:1234/api/donors/${selectedDonor._id}`, formData, {
          headers: { Authorization: `Bearer ${authUser.token}` }
        });
      } else {
        await axios.post('http://localhost:1234/api/donors/create', formData, {
          headers: { Authorization: `Bearer ${authUser.token}` }
        });
      }
      setShowModal(false);
      fetchDonors();
    } catch (error) {
      alert('Operation failed');
    }
  };

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Apply filters to donors
  const filteredDonors = donors.filter(donor => {
    return (
      (!filters.bloodGroup || donor.bloodGroup?.toLowerCase().includes(filters.bloodGroup.toLowerCase())) &&
      (!filters.city || donor.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.state || donor.state?.toLowerCase().includes(filters.state.toLowerCase())) &&
      (!filters.age || donor.age?.toString() === filters.age) &&
      (!filters.gender || donor.gender?.toLowerCase() === filters.gender.toLowerCase())
    );
  });

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6 text-red-600">Donor Records</h2>
      <button className="mb-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleCreate}>Create Donor</button>
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
            placeholder="Filter by blood group"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
            placeholder="Filter by city"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
          <input
            type="text"
            name="state"
            value={filters.state}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
            placeholder="Filter by state"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={filters.age}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
            placeholder="Filter by age"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
          <select
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded-md"
          >
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Height</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Donation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDonors.map((donor, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.fullName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.bloodGroup}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.age}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.gender}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.height}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.weight}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.city}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.state}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.country}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.lastDonation ? new Date(donor.lastDonation).toLocaleDateString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.availability ? 'Available' : 'Unavailable'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.createdAt ? new Date(donor.createdAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.updatedAt ? new Date(donor.updatedAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="px-2 py-1 bg-blue-500 text-white rounded text-xs mr-2" onClick={() => handleEdit(donor)}>Edit</button>
                    <button className="px-2 py-1 bg-red-500 text-white rounded text-xs" onClick={() => handleDelete(donor._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredDonors.length === 0 && (
            <div className="text-center py-4 text-gray-500">No donor records found</div>
          )}
        </div>
      </div>

      {/* Modal for Create/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h3 className="text-xl font-bold mb-4">{modalType === 'edit' ? 'Edit Donor' : 'Create Donor'}</h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-2 gap-4">
              <input type="text" name="fullName" value={formData.fullName} onChange={handleFormChange} placeholder="Full Name" className="col-span-2 p-2 border rounded" required />
              <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleFormChange} placeholder="Blood Group" className="p-2 border rounded" required />
              <input type="number" name="age" value={formData.age} onChange={handleFormChange} placeholder="Age" className="p-2 border rounded" />
              <input type="text" name="gender" value={formData.gender} onChange={handleFormChange} placeholder="Gender" className="p-2 border rounded" />
              <input type="number" name="height" value={formData.height} onChange={handleFormChange} placeholder="Height" className="p-2 border rounded" />
              <input type="number" name="weight" value={formData.weight} onChange={handleFormChange} placeholder="Weight" className="p-2 border rounded" />
              <input type="text" name="city" value={formData.city} onChange={handleFormChange} placeholder="City" className="p-2 border rounded" />
              <input type="text" name="state" value={formData.state} onChange={handleFormChange} placeholder="State" className="p-2 border rounded" />
              <input type="text" name="country" value={formData.country} onChange={handleFormChange} placeholder="Country" className="p-2 border rounded" />
              <input type="text" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="Phone" className="p-2 border rounded" />
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="Email" className="p-2 border rounded" />
              <input type="text" name="address" value={formData.address} onChange={handleFormChange} placeholder="Address" className="col-span-2 p-2 border rounded" />
              <input type="date" name="lastDonation" value={formData.lastDonation ? formData.lastDonation.substring(0,10) : ''} onChange={handleFormChange} placeholder="Last Donation" className="p-2 border rounded" />
              <label className="col-span-2 flex items-center gap-2">
                <input type="checkbox" name="availability" checked={formData.availability} onChange={handleFormChange} /> Available
              </label>
              <input type="text" name="userId" value={formData.userId} onChange={handleFormChange} placeholder="User ID" className="p-2 border rounded" />
              <input type="password" name="password" value={formData.password} onChange={handleFormChange} placeholder="Password" className="col-span-2 p-2 border rounded" required />
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <button type="button" className="px-4 py-2 bg-gray-400 text-white rounded" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{modalType === 'edit' ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorRecord;
