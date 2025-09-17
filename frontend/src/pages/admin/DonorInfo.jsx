import React from "react";

const DonorInfo = ({ donor, onClose }) => {
  return (
    <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
      <h3 className="text-lg font-bold mb-4">Edit Donor</h3>
      {/* Add your form fields here, pre-filled with donor data */}
      <div className="mb-4">Full Name: {donor.fullName}</div>
      {/* ...other fields... */}
      <button className="mt-4 px-4 py-2 bg-gray-300 rounded" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default DonorInfo;
