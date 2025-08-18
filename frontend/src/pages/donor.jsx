import React from "react";
import { faTint } from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "../components/FeatureCard";

const bloodGroups = [
  { group: "A+", color: "red" },
  { group: "A-", color: "pink" },
  { group: "B+", color: "red" },
  { group: "B-", color: "pink" },
  { group: "O+", color: "red" },
  { group: "O-", color: "pink" },
  { group: "AB+", color: "red" },
  { group: "AB-", color: "pink" },
];

const Donor = () => {
  return (
    <section className="container mx-auto py-10">
      <h2 className="text-center text-4xl font-bold text-red-600 mb-8">
        Donor Registration
      </h2>
      <div className="flex flex-wrap justify-center">
        {bloodGroups.map((blood, index) => (
          <FeatureCard
            key={index}
            icon={faTint}
            title={blood.group}
            description={`Register as a ${blood.group} donor and save lives.`}
            color={blood.color}
          />
        ))}
      </div>
    </section>
  );
};

export default Donor;
