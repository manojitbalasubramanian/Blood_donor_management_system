import React from "react";
import { Heart, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-900 via-red-900 to-blue-900 text-white py-4 z-40">
      {/* Animated border top */}
      <div className="absolute top-0 left-0 right-0 h-[1px]">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-shimmer"></div>
      </div>

      {/* Glass effect background */}
      <div className="absolute inset-0 backdrop-blur-sm bg-blue-950 bg-opacity-30"></div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-wrap items-center justify-between">
          {/* Brand and Copyright */}
          <div className="flex items-center gap-4 group">
            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-800/50 to-blue-900/50 p-1.5 rounded-full border border-blue-700/30 shadow-lg transition-transform duration-300 group-hover:scale-105">
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              <span className="text-sm font-bold bg-gradient-to-r from-white to-red-100 bg-clip-text text-transparent">
                BloodBridge
              </span>
            </div>
            <span className="text-xs text-blue-200">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Quick Links */}
          <div className="hidden sm:flex items-center gap-6">
            <Link to="/" 
              className="text-xs text-blue-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10 px-3 py-1 rounded-full hover:bg-gradient-to-r hover:from-red-400/10 hover:to-transparent">
              Home
            </Link>
            <Link to="/donor"
              className="text-xs text-blue-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10 px-3 py-1 rounded-full hover:bg-gradient-to-r hover:from-red-400/10 hover:to-transparent">
              Become a Donor
            </Link>
            <Link to="/blood-need"
              className="text-xs text-blue-200 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-red-400/10 px-3 py-1 rounded-full hover:bg-gradient-to-r hover:from-red-400/10 hover:to-transparent">
              Need Blood
            </Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            <a href="#" 
              className="group relative p-2 bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-full border border-blue-700/30 shadow-lg transition-all duration-300 hover:shadow-red-400/20 hover:scale-110"
            >
              <Facebook size={14} className="text-blue-200 group-hover:text-red-300 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/0 to-red-400/0 group-hover:from-red-400/10 group-hover:to-transparent transition-all duration-300"></div>
            </a>
            <a href="#" 
              className="group relative p-2 bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-full border border-blue-700/30 shadow-lg transition-all duration-300 hover:shadow-red-400/20 hover:scale-110"
            >
              <Instagram size={14} className="text-blue-200 group-hover:text-red-300 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/0 to-red-400/0 group-hover:from-red-400/10 group-hover:to-transparent transition-all duration-300"></div>
            </a>
            <a href="mailto:info@bloodbridge.com" 
              className="group relative p-2 bg-gradient-to-br from-blue-800/50 to-blue-900/50 rounded-full border border-blue-700/30 shadow-lg transition-all duration-300 hover:shadow-red-400/20 hover:scale-110"
            >
              <Mail size={14} className="text-blue-200 group-hover:text-red-300 transition-colors" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-400/0 to-red-400/0 group-hover:from-red-400/10 group-hover:to-transparent transition-all duration-300"></div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
