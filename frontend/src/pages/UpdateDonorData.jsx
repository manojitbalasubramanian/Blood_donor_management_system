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

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!donorData) return <div className="min-h-screen flex items-center justify-center">Donor data not found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6">
      <div className="max-w-2xl w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-extrabold text-white">Update Donor Data</h2>
          <p className="text-sm text-slate-400">Keep your donor profile up to date</p>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={donorData.fullName || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={donorData.email || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Phone</label>
              <input
                type="text"
                name="phone"
                value={donorData.phone || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Age</label>
              <input
                type="number"
                name="age"
                min="18"
                max="65"
                value={donorData.age || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Gender</label>
              <select
                name="gender"
                value={donorData.gender || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Blood Group</label>
              <input
                type="text"
                name="bloodGroup"
                value={donorData.bloodGroup || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Height (cm)</label>
              <input
                type="number"
                name="height"
                min="140"
                max="220"
                value={donorData.height || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                min="45"
                max="150"
                value={donorData.weight || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div>
            <StateDistrictSelect
              stateValue={donorData.state || ''}
              districtValue={donorData.city || ''}
              onStateChange={handleStateChange}
              onDistrictChange={handleDistrictChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Country</label>
              <input
                type="text"
                name="country"
                value={donorData.country || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Address</label>
              <input
                type="text"
                name="address"
                value={donorData.address || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Last Donation Date</label>
              <input
                type="date"
                name="lastDonation"
                value={donorData.lastDonation ? donorData.lastDonation.slice(0,10) : ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Availability</label>
              <select
                name="availability"
                value={donorData.availability ? 'true' : 'false'}
                onChange={e => handleDonorChange({ target: { name: 'availability', value: e.target.value === 'true' } })}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              >
                <option value="true">Available</option>
                <option value="false">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">Has Health Issues?</label>
            <select
              name="hasHealthIssues"
              value={donorData.hasHealthIssues ? 'true' : 'false'}
              onChange={e => handleDonorChange({ target: { name: 'hasHealthIssues', value: e.target.value === 'true' } })}
              className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>

          {donorData.hasHealthIssues && (
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-2">Health Issues</label>
              <input
                type="text"
                name="healthIssues"
                value={donorData.healthIssues || ''}
                onChange={handleDonorChange}
                className="mt-1 block w-full rounded-md bg-slate-800 border border-slate-700 py-2 px-3 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={saving}
              className="w-full md:w-1/3 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 transition-all"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonorData;
