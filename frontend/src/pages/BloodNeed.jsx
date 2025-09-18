import React, { useState, useEffect } from 'react';
import useAuthContext from "../context/useAuthContext";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const BloodNeed = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  // Filter states
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
    state: '',
  });

  // Fetch latest recipient for the logged-in user and set filters
  useEffect(() => {
    const fetchRecipientAndSetFilters = async () => {
      try {
        const response = await fetch('http://localhost:1234/api/recipient/all', {
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch recipient data');
        const recipients = await response.json();
        // Get the latest recipient for the logged-in user (by email or userId if available)
        let userRecipients = recipients;
        if (authUser?.email) {
          userRecipients = recipients.filter(r => r.contactNumber === authUser.phone || r.email === authUser.email);
        }
        const latest = userRecipients.length > 0 ? userRecipients[userRecipients.length - 1] : recipients[recipients.length - 1];
        if (latest) {
          setFilters(f => ({ ...f, bloodGroup: latest.bloodGroup, city: latest.city, state: latest.state }));
        }
      } catch {
        // fallback: do not set filters
      }
    };
    if (authUser) fetchRecipientAndSetFilters();
  }, [authUser]);

  useEffect(() => {
    if (!authUser) {
      toast.error("Please login to view donor information");
      navigate("/login");
      return;
    }
    fetchDonors();
  }, [authUser, navigate]);

  const fetchDonors = async () => {
    try {
      const response = await fetch("http://localhost:1234/api/donors/all", {
        headers: {
          "Authorization": `Bearer ${authUser.token}`
        }
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setDonors(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch donors");
    } finally {
      setLoading(false);
    }
  };

  // All filters are now read-only (hardcoded from recipient)
  const handleFilterChange = () => {};

  // Apply filters to donors
  const filteredDonors = donors.filter(donor => {
    return (
      (!filters.bloodGroup || donor.bloodGroup.toLowerCase().includes(filters.bloodGroup.toLowerCase())) &&
      (!filters.city || donor.city.toLowerCase().includes(filters.city.toLowerCase())) &&
      (!filters.state || donor.state.toLowerCase().includes(filters.state.toLowerCase()))
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-2xl text-red-600 font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Blood Donor Directory</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
            <input
              type="text"
              name="bloodGroup"
              value={filters.bloodGroup}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              placeholder="Filter by blood group"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              value={filters.city}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              placeholder="Filter by city"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              value={filters.state}
              readOnly
              className="w-full p-2 border rounded-md bg-gray-100 cursor-not-allowed"
              placeholder="Filter by state"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.map((donor, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.gender}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.state}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${donor.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {donor.availability ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredDonors.length === 0 && (
            <div className="text-center py-4 text-gray-500">No donors found matching the filters</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BloodNeed;