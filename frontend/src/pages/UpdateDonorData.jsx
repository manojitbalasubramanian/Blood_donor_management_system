import React, { useEffect, useState } from 'react';
import StateDistrictSelect from '../components/StateDistrictSelect';
import useAuthContext from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.className = `fixed top-8 right-8 z-50 px-4 py-2 rounded shadow-lg text-white text-sm toast-${type}`;
  toast.style.background = type === 'success' ? '#16a34a' : type === 'error' ? '#dc2626' : '#334155';
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => document.body.removeChild(toast), 400);
  }, 2200);
}

const UpdateDonorData = () => {
  const { authUser } = useAuthContext();
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    // Fetch donor data
    const fetchData = async () => {
      try {
        const donorRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donors/all`, {
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        });
        const donors = await donorRes.json();
        const donor = donors.find(d => d.userId === authUser._id);
        setDonorData(donor || {});
      } catch {
        showToast('Failed to fetch donor data', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, navigate]);

  const handleDonorChange = e => {
    setDonorData({ ...donorData, [e.target.name]: e.target.value });
  };
  const handleStateChange = (state) => {
    setDonorData(prev => ({ ...prev, state, city: '' }));
  };
  const handleDistrictChange = (city) => {
    setDonorData(prev => ({ ...prev, city }));
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      if (donorData && donorData._id) {
        const donorRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donors/${donorData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authUser.token}`
          },
          body: JSON.stringify(donorData)
        });
        const donorResult = await donorRes.json();
        if (!donorRes.ok) {
          showToast(donorResult.error || 'Failed to update donor data.', 'error');
          return;
        }
        showToast('Donor data updated successfully!', 'success');
      } else {
        showToast('No donor record found.', 'error');
      }
    } catch (err) {
      showToast('Failed to update donor data.', 'error');
      console.error('Donor update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!donorData) return <div className="p-8">Donor data not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-24 mb-24">
      <h2 className="text-2xl font-bold mb-6">Update Donor Data</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input type="text" name="fullName" value={donorData.fullName || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" value={donorData.email || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input type="text" name="phone" value={donorData.phone || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Age</label>
          <input type="number" name="age" min="18" max="65" value={donorData.age || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Gender</label>
          <select name="gender" value={donorData.gender || ''} onChange={handleDonorChange} className="w-full p-2 border rounded">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Blood Group</label>
          <input type="text" name="bloodGroup" value={donorData.bloodGroup || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Height (cm)</label>
          <input type="number" name="height" min="140" max="220" value={donorData.height || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Weight (kg)</label>
          <input type="number" name="weight" min="45" max="150" value={donorData.weight || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <StateDistrictSelect
          stateValue={donorData.state || ''}
          districtValue={donorData.city || ''}
          onStateChange={handleStateChange}
          onDistrictChange={handleDistrictChange}
        />
        <div>
          <label className="block text-gray-700">Country</label>
          <input type="text" name="country" value={donorData.country || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Address</label>
          <input type="text" name="address" value={donorData.address || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Last Donation Date</label>
          <input type="date" name="lastDonation" value={donorData.lastDonation ? donorData.lastDonation.slice(0,10) : ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Availability</label>
          <select name="availability" value={donorData.availability ? 'true' : 'false'} onChange={e => handleDonorChange({ target: { name: 'availability', value: e.target.value === 'true' } })} className="w-full p-2 border rounded">
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Has Health Issues?</label>
          <select name="hasHealthIssues" value={donorData.hasHealthIssues ? 'true' : 'false'} onChange={e => handleDonorChange({ target: { name: 'hasHealthIssues', value: e.target.value === 'true' } })} className="w-full p-2 border rounded">
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        {donorData.hasHealthIssues && (
          <div>
            <label className="block text-gray-700">Health Issues</label>
            <input type="text" name="healthIssues" value={donorData.healthIssues || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
          </div>
        )}
        <button type="submit" disabled={saving} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-all">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default UpdateDonorData;
