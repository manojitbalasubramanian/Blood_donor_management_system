import React, { useState, useEffect } from 'react';
import useAuthContext from "../context/useAuthContext";
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';


const BloodNeed = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get matching donors from navigation state
  const [matchingDonors, setMatchingDonors] = useState(location.state?.matchingDonors || null);
  const [requestMessage] = useState(location.state?.message || '');
  

  // Filter states (will be set from recipient data)
  const [filters, setFilters] = useState({
    bloodGroup: '',
    city: '',
    matchType: ''
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
          setFilters(f => ({ ...f, bloodGroup: latest.bloodGroup, city: latest.city }));
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

    const fetchDonors = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:1234/api/donors/all", {
          headers: {
            "Authorization": `Bearer ${authUser.token}`
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Fetched donors:', data);

        if (data.error) {
          throw new Error(data.error);
        }

        // Transform the data to match the expected format
        const transformedDonors = data.map(donor => ({
          ...donor,
          listType: 'All Donors'
        }));

        setDonors(transformedDonors);
        console.log('Transformed donors set to state:', transformedDonors);
      } catch (error) {
        console.error('Error fetching donors:', error);
        toast.error(error.message || "Failed to fetch donors");
        setDonors([]); // Set empty array on error
      } finally {
        setLoading(false);
      }
    };

    // Check if we have matching donors from the form submission
    if (location.state?.matchingDonors) {
      console.log('Received matching donors from form:', location.state.matchingDonors);
      setMatchingDonors(location.state.matchingDonors);
      setLoading(false);
      toast.success(location.state.message || 'Found matching donors!');
    } else {
      console.log('No matching donors in location state, fetching all donors');
      fetchDonors();
    }
  }, [authUser, navigate, location.state]);

  // ...existing code...

  // Filter handlers
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Get active donor list
  const getActiveDonorList = () => {
    if (matchingDonors) {
      // Check if matchingDonors has the expected structure
      const exactMatches = matchingDonors.exactMatches || [];
      const compatibleMatches = matchingDonors.compatibleMatches || [];
      const otherCityMatches = matchingDonors.otherCityMatches || [];

      console.log('Matching Donors Data:', {
        exact: exactMatches.length,
        compatible: compatibleMatches.length,
        otherCity: otherCityMatches.length
      });

      const allDonors = [
        ...exactMatches.map(d => ({ ...d, listType: 'Exact Match - Same City' })),
        ...compatibleMatches.map(d => ({ ...d, listType: 'Compatible Match - Same City' })),
        ...otherCityMatches.map(d => ({ ...d, listType: 'Exact Match - Other City' }))
      ];
      return allDonors;
    }
    return donors;
  };

  // Display all donors without filtering
  // const filteredDonors = getActiveDonorList().filter(donor => {
  //   ...filter logic...
  // });
  const filteredDonors = getActiveDonorList();
  console.log('Filtered donors to display:', filteredDonors);

  // Get match type color


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
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {matchingDonors ? 'Matching Blood Donors' : 'Blood Donor Directory'}
        </h1>
        
        {/* Success Message */}
        {requestMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
            {requestMessage}
          </div>
        )}

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
          {matchingDonors && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Match Type</label>
              <select
                name="matchType"
                value={filters.matchType}
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Matches</option>
                <option value="Exact Match - Same City">Exact Match - Same City</option>
                <option value="Compatible Match">Compatible Match</option>
                <option value="Other City">Other Cities</option>
              </select>
            </div>
          )}
        </div>

        {/* Donors Table (copied from admin DonorRecord) */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonors.map((donor, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{donor.fullName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.bloodGroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.city}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donor.availability ? 'Available' : 'Unavailable'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredDonors.length === 0 && (
              <div className="text-center py-4 text-gray-500">No donor records found</div>
            )}
          </div>
        </div>

        {filteredDonors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No matching donors found</p>
            <p className="text-gray-400 mt-2">Try adjusting your filters or check back later</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BloodNeed;