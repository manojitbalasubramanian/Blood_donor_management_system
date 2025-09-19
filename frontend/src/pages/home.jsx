import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Droplets, Clock, Award, Activity, Phone } from "lucide-react";
import HomePageImage from "../assets/HOMEPAGE.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50 min-h-screen flex flex-col">
      {/* Hero Section with Floating Elements */}
      <section className="relative flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        {/* Floating Elements */}
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-10 right-20 w-16 h-16 bg-red-100 rounded-full opacity-50"
        />
        <motion.div
          animate={{ 
            y: [0, 10, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-10 left-20 w-12 h-12 bg-pink-100 rounded-full opacity-50"
        />
        
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left relative z-10"
        >
          <div className="inline-block">
            <h1 className="text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
              BLOODBOND
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto md:mx-0"></div>
          </div>
          <p className="text-xl text-gray-700 mt-8 mb-8 leading-relaxed">
            A moment of your time and a pint of your blood is a lifetime of
            smiles for someone waiting in hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate("/donor")}
              className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Heart size={20} />
              Become a Donor
            </button>
            <button
              onClick={() => navigate("/recipient-form")}
              className="px-8 py-4 bg-gradient-to-r from-pink-100 to-red-100 text-red-700 font-semibold rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 border border-red-200 flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              Request Blood
            </button>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-10 md:mt-0 flex justify-center"
        >
          <img
            src={HomePageImage}
            alt="Blood Donation"
            className="w-[500px] md:w-[600px] h-auto drop-shadow-xl rounded-2xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-10 md:px-20 py-16 bg-gradient-to-b from-white to-red-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-center mb-4">
            Why Donate Blood?
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-12"></div>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Heart className="text-red-600" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Save Lives</h3>
            <p className="text-gray-600 mt-3">
              Your donation can save up to 3 lives at once. Be a hero today.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Users className="text-pink-600" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Community Impact</h3>
            <p className="text-gray-600 mt-3">
              Join our growing network of heroes making a real difference.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-red-100 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Clock className="text-red-600" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Quick & Easy</h3>
            <p className="text-gray-600 mt-3">
              Simple process that takes less than 30 minutes of your time.
            </p>
          </motion.div>
        </div>

        {/* Additional Features */}
        <div className="grid md:grid-cols-3 gap-8 text-center mt-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Award className="text-orange-500" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Recognition</h3>
            <p className="text-gray-600 mt-3">
              Get recognized for your lifesaving contributions.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Activity className="text-rose-500" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Health Benefits</h3>
            <p className="text-gray-600 mt-3">
              Regular donation helps maintain good health and vitality.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -10 }}
            className="p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-red-50 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-white rounded-full flex items-center justify-center shadow-md">
              <Droplets className="text-red-500" size={32} />
            </div>
            <h3 className="mt-6 font-semibold text-xl text-gray-800">Regular Updates</h3>
            <p className="text-gray-600 mt-3">
              Stay informed about blood donation camps and emergencies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative px-10 md:px-20 py-16 bg-gradient-to-b from-red-50 to-white overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-300 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-300 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative z-10"
        >
          <h2 className="text-4xl font-bold text-center mb-4">Our Impact</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-12"></div>
          
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <Users className="text-red-600" size={32} />
              </div>
              <h3 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">500+</h3>
              <p className="mt-3 text-gray-600 font-medium">Registered Donors</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-pink-50 rounded-full flex items-center justify-center">
                <Heart className="text-pink-600" size={32} />
              </div>
              <h3 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent">1000+</h3>
              <p className="mt-3 text-gray-600 font-medium">Lives Saved</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg"
            >
              <div className="w-20 h-20 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
                <Award className="text-red-600" size={32} />
              </div>
              <h3 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">50+</h3>
              <p className="mt-3 text-gray-600 font-medium">Cities Covered</p>
            </motion.div>
          </div>
        </motion.div>
      </section>
  

{/* Blood Group Information Section */}
<section className="px-10 md:px-20 py-16 bg-gradient-to-b from-white to-red-50">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold text-center mb-4">Blood Groups & Compatibility</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-12"></div>
  </motion.div>
  
  <div className="grid md:grid-cols-4 gap-6">
    {[
      { group: "A+", canGiveTo: "A+, AB+", canReceiveFrom: "A+, A-, O+, O-" },
      { group: "O+", canGiveTo: "O+, A+, B+, AB+", canReceiveFrom: "O+, O-" },
      { group: "B+", canGiveTo: "B+, AB+", canReceiveFrom: "B+, B-, O+, O-" },
      { group: "AB+", canGiveTo: "AB+", canReceiveFrom: "All Groups" },
      { group: "A-", canGiveTo: "A+, A-, AB+, AB-", canReceiveFrom: "A-, O-" },
      { group: "O-", canGiveTo: "All Groups", canReceiveFrom: "O-" },
      { group: "B-", canGiveTo: "B+, B-, AB+, AB-", canReceiveFrom: "B-, O-" },
      { group: "AB-", canGiveTo: "AB+, AB-", canReceiveFrom: "All Negative" },
    ].map((blood) => (
      <motion.div
        key={blood.group}
        whileHover={{ scale: 1.05 }}
        className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <div className="text-3xl font-bold text-red-600 mb-4">{blood.group}</div>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Can Give To:</span>
            <br />{blood.canGiveTo}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-gray-700">Can Receive From:</span>
            <br />{blood.canReceiveFrom}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/* Donation Process Section */}
<section className="px-10 md:px-20 py-16 bg-white">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
  >
    <h2 className="text-4xl font-bold text-center mb-4">Donation Process</h2>
    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mx-auto mb-12"></div>
  </motion.div>

  <div className="grid md:grid-cols-4 gap-8">
    {[
      { step: "1", title: "Registration", description: "Fill out the donor registration form with your details" },
      { step: "2", title: "Screening", description: "Quick health check-up and hemoglobin test" },
      { step: "3", title: "Donation", description: "Safe and quick blood donation process (takes only 10-15 minutes)" },
      { step: "4", title: "Recovery", description: "Short rest and refreshments before heading home" },
    ].map((process) => (
      <motion.div
        key={process.step}
        whileHover={{ y: -10 }}
        className="relative p-6 rounded-xl bg-gradient-to-br from-red-50 to-pink-50 shadow-lg"
      >
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
          {process.step}
        </div>
        <h3 className="text-xl font-semibold mt-4 mb-2">{process.title}</h3>
        <p className="text-gray-600">{process.description}</p>
      </motion.div>
    ))}
  </div>
</section>

      {/* Call to Action */}
      <section className="px-10 md:px-20 py-16 bg-gradient-to-b from-white to-red-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join our community of lifesavers today. Every donation counts, every drop matters.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/donor")}
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Register as Donor
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/about")}
              className="px-8 py-4 bg-white text-red-600 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-red-200"
            >
              Learn More
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}