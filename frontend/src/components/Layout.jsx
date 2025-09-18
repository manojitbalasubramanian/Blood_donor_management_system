import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-20 overflow-x-hidden"> {/* Add top padding for navbar and bottom for footer */}
        {children}
      </main>
      <Footer />
    </div>
  );
}