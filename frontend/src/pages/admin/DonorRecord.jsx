import { toast } from 'react-toastify';
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
    fullName: '', bloodGroup: '', age: '', gender: '', height: '', weight: '', city: '', state: '', country: '', phone: '', email: '', address: '', lastDonation: '', availability: false, userId: '', password: '', hasHealthIssues: false, healthIssues: ''
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
    toast.error('Delete failed');
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
    toast.error('Operation failed');
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
      <div className="flex gap-4 mb-4"></div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Health Issues</th>
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.hasHealthIssues ? (
                      <span className="text-red-600" title={donor.healthIssues}>Yes ⓘ</span>
                    ) : 'No'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.lastDonation ? (
                      <div>
                        <div>{new Date(donor.lastDonation).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-400">
                          {Math.floor((new Date() - new Date(donor.lastDonation)) / (1000 * 60 * 60 * 24))} days ago
                        </div>
                      </div>
                    ) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.availability ? 'Available' : 'Unavailable'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.userId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.createdAt ? new Date(donor.createdAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.updatedAt ? new Date(donor.updatedAt).toLocaleString() : '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {/* Edit button removed */}
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


    </div>
  );
};

export default DonorRecord;
