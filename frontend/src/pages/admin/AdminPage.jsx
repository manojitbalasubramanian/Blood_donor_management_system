import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, UserPlus, Activity, Calendar, Heart, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminPage = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalDonors: 245,
    activeDonors: 180,
    totalUsers: 320,
    recentDonations: 45
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800 mb-2">
            Admin Dashboard
          </h2>
          <p className="text-gray-600">Manage and monitor blood donation activities</p>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Donors</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalDonors}</h3>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                <Users size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-green-500 text-xs flex items-center">
                <Activity size={14} className="mr-1" />
                +12% from last month
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Donors</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.activeDonors}</h3>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                <UserPlus size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-green-500 text-xs flex items-center">
                <Activity size={14} className="mr-1" />
                +5% this week
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Users size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-green-500 text-xs flex items-center">
                <Activity size={14} className="mr-1" />
                +8% this month
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Recent Donations</p>
                <h3 className="text-3xl font-bold text-gray-900">{stats.recentDonations}</h3>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center text-pink-600">
                <Calendar size={24} />
              </div>
            </div>
            <div className="mt-4">
              <div className="text-green-500 text-xs flex items-center">
                <Activity size={14} className="mr-1" />
                +15% this week
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/admin/donors')}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Donor Records</h3>
              <p className="text-gray-600 mb-6">
                Manage and view all blood donor information, track donations, and update records.
              </p>
              <div className="flex items-center text-red-600 font-medium">
                View Donors
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/admin/recipients')}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Recipient Records</h3>
              <p className="text-gray-600 mb-6">
                Manage blood requests, track recipient information, and monitor request status.
              </p>
              <div className="flex items-center text-purple-600 font-medium">
                View Recipients
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            onClick={() => navigate('/admin/users')}
            className="group relative overflow-hidden bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent group-hover:opacity-100 opacity-0 transition-opacity"></div>
            <div className="relative z-10">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">User Management</h3>
              <p className="text-gray-600 mb-6">
                Oversee user accounts, manage permissions, and handle user-related activities.
              </p>
              <div className="flex items-center text-blue-600 font-medium">
                Manage Users
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;
