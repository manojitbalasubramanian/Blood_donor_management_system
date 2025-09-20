import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../../context/useAuthContext';

const RecipientRecord = () => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('create');
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [formData, setFormData] = useState({
  name: '',
    bloodGroup: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    country: '',
    hospitalName: '',
    urgency: '',
    medicalCondition: '',
    requiredUnits: '',
    status: 'Pending'
  });
  // Removed filters state since we're showing all recipients
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser || !authUser.admin) {
      navigate('/');
      return;
    }
    fetchRecipients();
    // eslint-disable-next-line
  }, [authUser, navigate]);

  const fetchRecipients = async () => {
    setLoading(true);
    try {
      console.log('Fetching recipients...');
      const response = await axios.get('http://localhost:1234/api/recipient/all', {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      console.log('Response:', response.data);
      if (response.data) {
        setRecipients(response.data);
      } else {
        console.error('No data received from the API');
      }
    } catch (error) {
      console.error('Error fetching recipients:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };



  const handleDelete = async (recipientId) => {
    if (!window.confirm('Are you sure you want to delete this recipient?')) return;
    try {
      await axios.delete(`http://localhost:1234/api/recipient/${recipientId}`, {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      fetchRecipients();
    } catch (error) {
      alert('Delete failed');
    }
  };

  const handleCreate = () => {
    setSelectedRecipient(null);
    setFormData({
      fullName: '',
      bloodGroup: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      state: '',
      country: '',
      hospitalName: '',
      urgency: '',
      medicalCondition: '',
      requiredUnits: '',
      status: 'Pending'
    });
    setModalType('create');
    setShowModal(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1234/api/recipient/create', formData, {
        headers: { Authorization: `Bearer ${authUser.token}` }
      });
      setShowModal(false);
      fetchRecipients();
    } catch (error) {
      alert('Operation failed');
    }
  };

  // Removed filter handling as we're showing all recipients

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recipient Records</h2>
      </div>

      {/* Removed filters section as we're showing all recipients */}

      {/* Recipients Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recipients.map((recipient) => (
              <tr key={recipient._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{recipient.name && recipient.name.trim() ? recipient.name : 'No Name'}</div>
                  <div className="text-sm text-gray-500">{recipient.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recipient.bloodGroup}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recipient.city}, {recipient.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recipient.hospitalName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    recipient.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    recipient.status === 'Fulfilled' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipient.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    recipient.urgency === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {recipient.urgency}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleDelete(recipient._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Create */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Add New Recipient</h3>
            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* ...existing form fields, but no edit logic... */}
              <div>
                <label className="block mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full border rounded p-2"
                  required
                />
              </div>
              {/* ...other fields unchanged... */}
              {/* ...keep all fields, but only for create... */}
              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientRecord;