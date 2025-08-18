// src/components/FeatureCard.jsx
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FeatureCard = ({ icon, title, description, color }) => {
  const colorMap = {
    red: "bg-red-500",
    pink: "bg-pink-500",
    gray: "bg-gray-500",
    black: "bg-black",
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300">
        {icon && (
          <div
            className={`w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full text-white ${colorMap[color]}`}
          >
            <FontAwesomeIcon icon={icon} size="2x" />
          </div>
        )}
        <h5 className="text-xl font-bold text-gray-800 mb-2">{title}</h5>
        {description && <p className="text-gray-600">{description}</p>}
      </div>
    </div>
  );
};

export default FeatureCard;
