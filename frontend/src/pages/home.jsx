import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Users, Droplets } from "lucide-react"; // icons
import HomePageImage from "../assets/HOMEPAGE.png";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-red-50 via-white to-pink-50 min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-xl text-center md:text-left"
        >
          <h1 className="text-5xl font-extrabold text-red-700 mb-6">
            BLOODBOND
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            A moment of your time and a pint of your blood is a lifetime of
            smiles for someone waiting in hope.
          </p>
          <button
            onClick={() => navigate("/donor")}
            className="px-8 py-4 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-transform"
          >
            Become a Donor
          </button>
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
      <section className="px-10 md:px-20 py-12 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
          Why Donate Blood?
        </h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-2xl bg-red-100 shadow hover:scale-105 transition">
            <Heart className="mx-auto text-red-600" size={40} />
            <h3 className="mt-4 font-semibold text-lg">Save Lives</h3>
            <p className="text-gray-600 text-sm mt-2">
              Your donation can save up to 3 lives at once.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-pink-100 shadow hover:scale-105 transition">
            <Users className="mx-auto text-pink-600" size={40} />
            <h3 className="mt-4 font-semibold text-lg">Community Impact</h3>
            <p className="text-gray-600 text-sm mt-2">
              Join a network of heroes making a real difference.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-red-200 shadow hover:scale-105 transition">
            <Droplets className="mx-auto text-red-700" size={40} />
            <h3 className="mt-4 font-semibold text-lg">Quick & Easy</h3>
            <p className="text-gray-600 text-sm mt-2">
              Donation takes less than 30 minutes of your time.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-10 md:px-20 py-12 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p className="mt-2">Registered Donors</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">1000+</h3>
            <p className="mt-2">Lives Saved</p>
          </div>
          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p className="mt-2">Cities Covered</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
    </div>
  );
}
