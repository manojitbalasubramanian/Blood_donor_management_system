import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthContext from '../context/useAuthContext';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const RecipientForm = () => {
    const navigate = useNavigate();
    const { authUser } = useAuthContext();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [matchingDonors, setMatchingDonors] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        gender: '',
        bloodGroup: '',
        contactNumber: '',
        hospital: '',
        city: '',
        reason: '',
        unitsNeeded: '',
        urgency: ''
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const validateForm = () => {
        const errors = {};
        if (!formData.name.trim()) errors.name = "Name is required";
        if (!formData.age || formData.age < 0) errors.age = "Valid age is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.bloodGroup) errors.bloodGroup = "Blood group is required";
        if (!formData.contactNumber || !/^[0-9]{10}$/.test(formData.contactNumber)) {
            errors.contactNumber = "Valid 10-digit phone number is required";
        }
        if (!formData.hospital.trim()) errors.hospital = "Hospital name is required";
        if (!formData.city.trim()) errors.city = "City is required";
        if (!formData.reason.trim()) errors.reason = "Reason is required";
        if (!formData.unitsNeeded || formData.unitsNeeded < 1) {
            errors.unitsNeeded = "At least 1 unit is required";
        }
        if (!formData.urgency) errors.urgency = "Urgency level is required";

        setError(Object.values(errors)[0] || '');
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:1234/api/recipient/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authUser.token}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log('Received response:', data);

            if (!response.ok) {
                throw new Error(data.error || 'Failed to submit request');
            }

            // Validate the matching donors data structure
            const matchingDonorsData = {
                exactMatches: data.matchingDonors?.exactMatches || [],
                compatibleMatches: data.matchingDonors?.compatibleMatches || [],
                otherCityMatches: data.matchingDonors?.otherCityMatches || []
            };

            console.log('Processed matching donors:', matchingDonorsData);

            setMatchingDonors(matchingDonorsData);
            setSubmitSuccess(true);
            setFormSubmitted(true);
            
            // Navigate to BloodNeed page with the matching donors data
            navigate('/blood-need', { 
                state: { 
                    matchingDonors: matchingDonorsData,
                    requestId: data.requestId,
                    message: data.message || 'Successfully found matching donors!'
                }
            });
            
        } catch (err) {
            setError(err.message);
            setSubmitSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-100 to-pink-100 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <AlertCircle className="w-10 h-10 text-red-500" />
                        </motion.div>
                        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-4">
                            Blood Request Form
                        </h2>
                        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                            Fill in your details to find matching blood donors in your area
                        </p>
                    </div>
                    <div className="bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-sm bg-opacity-90">
                        {error && (
                            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 flex items-center">
                                <AlertCircle className="mr-2" />
                                <p>{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <div className="relative">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all duration-200"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                {/* Age */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Age
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        required
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                {/* Gender */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Gender
                                    </label>
                                    <select
                                        name="gender"
                                        required
                                        value={formData.gender}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                {/* Blood Group */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Blood Group Required
                                    </label>
                                    <select
                                        name="bloodGroup"
                                        required
                                        value={formData.bloodGroup}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="">Select Blood Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>

                                {/* Contact Number */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Contact Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        required
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                {/* Hospital */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Hospital Name
                                    </label>
                                    <input
                                        type="text"
                                        name="hospital"
                                        required
                                        value={formData.hospital}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        City
                                    </label>
                                    <input
                                        type="text"
                                        name="city"
                                        required
                                        value={formData.city}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                {/* Units Needed */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Units of Blood Needed
                                    </label>
                                    <input
                                        type="number"
                                        name="unitsNeeded"
                                        required
                                        min="1"
                                        value={formData.unitsNeeded}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    />
                                </div>

                                {/* Urgency */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Urgency Level
                                    </label>
                                    <select
                                        name="urgency"
                                        required
                                        value={formData.urgency}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                    >
                                        <option value="">Select Urgency</option>
                                        <option value="Immediate">Immediate</option>
                                        <option value="Within 24 hours">Within 24 hours</option>
                                        <option value="Within a week">Within a week</option>
                                    </select>
                                </div>
                            </div>

                            {/* Reason */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Reason for Blood Requirement
                                </label>
                                <textarea
                                    name="reason"
                                    required
                                    rows="3"
                                    value={formData.reason}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-center mt-8">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    disabled={loading}
                                    className="w-full md:w-2/3 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-red-700 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transform transition-all duration-300 disabled:opacity-50 shadow-xl hover:shadow-2xl flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            <span>Searching for Donors...</span>
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-5 h-5" />
                                            <span>Find Matching Donors</span>
                                        </>
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </div>

                    {/* Success Message */}
                    {submitSuccess && formSubmitted && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center"
                        >
                            <p className="text-lg font-medium">Request submitted successfully!</p>
                        </motion.div>
                    )}

                    {/* Matching Donors Section */}
                    {matchingDonors && formSubmitted && submitSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mt-12 bg-white shadow-2xl rounded-2xl p-8 backdrop-blur-sm bg-opacity-90"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 mb-3">
                                    Available Matching Donors
                                </h3>
                                <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto rounded-full"></div>
                            </div>
                            
                            {matchingDonors.length === 0 ? (
                                <motion.div
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="text-center py-8"
                                >
                                    <div className="w-16 h-16 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                                        <AlertCircle className="w-8 h-8 text-red-500" />
                                    </div>
                                    <p className="text-gray-600 text-lg">
                                        No matching donors found in your city.
                                    </p>
                                    <p className="text-gray-500 mt-2">
                                        We'll notify you when a donor becomes available.
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {matchingDonors.map((donor, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="bg-gradient-to-br from-white to-red-50 border border-red-100 rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
                                        >
                                            <div className="flex items-start justify-between">
                                                <h4 className="font-semibold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                                                    {donor.name}
                                                </h4>
                                                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                                                    {donor.bloodGroup}
                                                </span>
                                            </div>
                                            <div className="mt-4 space-y-2 text-gray-600">
                                                <p className="flex items-center gap-2">
                                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                                                        📍
                                                    </span>
                                                    {donor.city}
                                                </p>
                                                <p className="flex items-center gap-2">
                                                    <span className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                                                        📞
                                                    </span>
                                                    {donor.contactNumber}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default RecipientForm;
