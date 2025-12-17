import React, { useEffect, useState } from 'react';
import StateDistrictSelect from '../components/StateDistrictSelect';
// Simple toast implementation
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
import useAuthContext from '../context/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const [userData, setUserData] = useState(null);
  const [donorData, setDonorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate('/login');
      return;
    }
    // Fetch user data
    const fetchData = async () => {
      try {
        const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/all`, {
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        });
        const users = await userRes.json();
        const user = users.find(u => u._id === authUser._id);
        setUserData(user);
        // Fetch donor data
        const donorRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donors/all`, {
          headers: { 'Authorization': `Bearer ${authUser.token}` }
        });
        const donors = await donorRes.json();
        const donor = donors.find(d => d.userId === authUser._id);
        setDonorData(donor || null);
      } catch {
        // fallback: do nothing
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [authUser, navigate]);

  const handleUserChange = e => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleStateChange = (state) => {
    setUserData(prev => ({ ...prev, state, city: '' }));
  };
  const handleDistrictChange = (city) => {
    setUserData(prev => ({ ...prev, city }));
  };
  const handleDonorChange = e => {
    setDonorData({ ...donorData, [e.target.name]: e.target.value });
  };

  const handleSave = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      // Update user data via new endpoint
      const userRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authUser.token}`
        },
        body: JSON.stringify(userData)
      });
      const userResult = await userRes.json();
      console.log('User update response:', userResult);
      if (!userRes.ok) {
        showToast(userResult.error || 'Failed to update profile.', 'error');
        return;
      }
      // Update donor data if exists
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
        console.log('Donor update response:', donorResult);
        if (!donorRes.ok) {
          showToast(donorResult.error || 'Failed to update donor information.', 'error');
          return;
        }
      }
  setAuthUser({ ...authUser, ...userData });
  showToast('Update profile successfully!', 'success');
    } catch (err) {
      showToast('Failed to update profile.', 'error');
      console.error('Profile update error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!userData) return <div className="p-8">User not found.</div>;

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg mt-24 mb-24">
  <h2 className="text-2xl font-bold mb-6">Update Profile</h2>
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-700">Full Name</label>
          <input type="text" name="fullname" value={userData.fullname || ''} onChange={handleUserChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <input type="email" name="email" value={userData.email || ''} onChange={handleUserChange} className="w-full p-2 border rounded" />
        </div>
        <div>
          <label className="block text-gray-700">Phone</label>
          <input type="text" name="phone" value={userData.phone || ''} onChange={handleUserChange} className="w-full p-2 border rounded" />
        </div>
        {/* State & City Dropdown */}
        <StateDistrictSelect
          stateValue={donorData.state || ''}
          districtValue={donorData.city || ''}
          onStateChange={handleStateChange}
          onDistrictChange={handleDistrictChange}
        />
        {/* Add more user fields as needed */}
        {donorData && (
          <>
            <h3 className="text-xl font-semibold mt-8 mb-2">Donor Information</h3>
            <div>
              <label className="block text-gray-700">Blood Group</label>
              <input type="text" name="bloodGroup" value={donorData.bloodGroup || ''} onChange={handleDonorChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-gray-700">Availability</label>
              <select name="availability" value={donorData.availability ? 'true' : 'false'} onChange={e => handleDonorChange({ target: { name: 'availability', value: e.target.value === 'true' } })} className="w-full p-2 border rounded">
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
            {/* Add more donor fields as needed */}
          </>
        )}
        <button type="submit" disabled={saving} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-all">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Profile;
