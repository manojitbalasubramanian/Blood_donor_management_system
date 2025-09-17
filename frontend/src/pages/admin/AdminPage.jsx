import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 via-white to-pink-100 p-8">
      <h2 className="text-3xl font-bold mb-8 text-red-600">Admin Dashboard</h2>
      <div className="flex gap-12 mb-12">
        <div
          className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-red-200"
          onClick={() => navigate('/admin/donors')}
        >
          <span className="text-5xl mb-4 text-red-500">🩸</span>
          <h3 className="text-xl font-semibold mb-2">Donor Record</h3>
          <p className="text-gray-500">View and manage all donor records</p>
        </div>
        <div
          className="bg-white shadow-lg rounded-xl p-8 flex flex-col items-center cursor-pointer hover:scale-105 transition-all duration-300 border-2 border-pink-200"
          onClick={() => navigate('/admin/users')}
        >
          <span className="text-5xl mb-4 text-pink-500">👤</span>
          <h3 className="text-xl font-semibold mb-2">User Record</h3>
          <p className="text-gray-500">View and manage all user records</p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
