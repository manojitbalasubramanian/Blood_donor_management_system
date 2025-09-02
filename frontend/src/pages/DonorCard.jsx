import React from "react";
import { faTint, faHeart } from "@fortawesome/free-solid-svg-icons";
import FeatureCard from "../components/FeatureCard";

const bloodGroups = [
  { group: "A+", color: "red", urlParam: "A+" },
  { group: "A-", color: "pink", urlParam: "A-" },
  { group: "B+", color: "red", urlParam: "B+" },
  { group: "B-", color: "pink", urlParam: "B-" },
  { group: "O+", color: "red", urlParam: "O+" },
  { group: "O-", color: "pink", urlParam: "O-" },
  { group: "AB+", color: "red", urlParam: "AB+" },
  { group: "AB-", color: "pink", urlParam: "AB-" },
  { group: "Others", color: "gray", icon: faHeart, urlParam: "Others" },
];

const DonorCard = () => {
  return (
    <section className="container mx-auto py-10">
      <h2 className="text-center text-4xl font-bold text-red-600 mb-8">
        Donor Registration
      </h2>
      <div className="flex flex-wrap justify-center">
        {bloodGroups.map((blood, index) => (
          <FeatureCard
            key={index}
            icon={blood.icon || faTint}
            title={blood.group}
            bloodGroup={blood.group}  // Pass the full blood group including +/-
            description={
              blood.group === "Others"
                ? "Register as a donor even if your group is rare or not listed."
                : `Register as a ${blood.group} donor and save lives.`
            }
            color={blood.color}
          />
        ))}
      </div>
    </section>
  );
};

export default DonorCard;
