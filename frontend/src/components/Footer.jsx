import React from "react";
import { Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-red-600 text-white py-8 shadow-inner">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <Heart className="w-8 h-8 text-white" />
          <h1 className="text-xl font-bold">BloodBridge</h1>
        </div>

        {/* Text only (links removed) */}
        <div className="text-sm font-medium mb-4 md:mb-0">
          Together we save lives ❤️
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-gray-200 mt-6">
        © {new Date().getFullYear()} BloodBridge. All rights reserved.
      </div>
    </footer>
  );
}
