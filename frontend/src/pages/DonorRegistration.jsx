import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuthContext from "../context/useAuthContext";
import useDonorRegistration from "../hooks/useDonorRegistration";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  bloodGroup: "",
  customBloodGroup: "",
  height: "", // in cm
  weight: "", // in kg
  city: "",
  state: "",
  country: "",
  address: "",
  lastDonation: "",
  availability: true,
  consent: false,
};

const initialErrors = {
  fullName: "",
  email: "",
  phone: "",
  age: "",
  gender: "",
  bloodGroup: "",
  height: "",
  weight: "",
  city: "",
  country: "",
  address: "",
  lastDonation: "",
};

export default function DonorRegistration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const { loading: submitting, registerDonor } = useDonorRegistration();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    // If user is not logged in, redirect to login
    if (!authUser) {
      toast.error("Please login to register as a donor");
      navigate("/login");
    }
  }, [authUser, navigate]);

  // Validation functions
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone);
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Full Name validation
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    } else if (form.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters";
      isValid = false;
    }

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    // Phone validation
    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    // Age validation
    if (!form.age) {
      newErrors.age = "Age is required";
      isValid = false;
    } else if (form.age < 18 || form.age > 65) {
      newErrors.age = "Age must be between 18 and 65";
      isValid = false;
    }

    // Gender validation
    if (!form.gender) {
      newErrors.gender = "Please select a gender";
      isValid = false;
    }

    // Blood Group validation
    if (!form.bloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
      isValid = false;
    } else if (form.bloodGroup === "other") {
      if (!form.customBloodGroup || !form.customBloodGroup.trim()) {
        newErrors.bloodGroup = "Please specify your blood group";
        isValid = false;
      }
    } else {
      const validGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
      if (!validGroups.includes(form.bloodGroup)) {
        const enteredGroup = form.bloodGroup.toUpperCase();
        const baseGroups = ["A", "B", "O", "AB"];
        if (baseGroups.includes(enteredGroup)) {
          newErrors.bloodGroup = `Did you mean ${enteredGroup}+ or ${enteredGroup}-?`;
        } else {
          newErrors.bloodGroup = "Please enter a valid blood group (A+, B+, AB+, O+, A-, B-, AB-, O-)";
        }
        isValid = false;
      }
    }

    // City validation
    if (!form.city.trim()) {
      newErrors.city = "City is required";
      isValid = false;
    }

    // Country validation
    if (!form.country.trim()) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    // Address validation
    if (!form.address.trim()) {
      newErrors.address = "Address is required";
      isValid = false;
    }

    // Height validation
    if (!form.height) {
      newErrors.height = "Height is required";
      isValid = false;
    } else {
      const height = parseFloat(form.height);
      if (isNaN(height) || height < 140 || height > 220) {
        newErrors.height = "Height must be between 140cm and 220cm";
        isValid = false;
      }
    }

    // Weight validation
    if (!form.weight) {
      newErrors.weight = "Weight is required";
      isValid = false;
    } else {
      const weight = parseFloat(form.weight);
      if (isNaN(weight) || weight < 45 || weight > 150) {
        newErrors.weight = "Weight must be between 45kg and 150kg";
        isValid = false;
      }
    }

    // BMI Calculation and Validation
    if (!newErrors.height && !newErrors.weight) {
      const heightInMeters = parseFloat(form.height) / 100;
      const weight = parseFloat(form.weight);
      const bmi = weight / (heightInMeters * heightInMeters);

      if (bmi < 18.5) {
        newErrors.weight = `Your BMI (${bmi.toFixed(1)}) is too low for blood donation. Minimum BMI required is 18.5.`;
        isValid = false;
      } else if (bmi > 35) {
        newErrors.weight = `Your BMI (${bmi.toFixed(1)}) is too high for blood donation. Maximum BMI allowed is 35.`;
        isValid = false;
      }
    }

    // Last Donation Date validation
    if (form.lastDonation) {
      const donationDate = new Date(form.lastDonation);
      const today = new Date();
      if (donationDate > today) {
        newErrors.lastDonation = "Last donation date cannot be in the future";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // ✅ Auto-fill blood group from URL param
  useEffect(() => {
    const bloodGroup = searchParams.get("bloodGroup");
    if (bloodGroup) {
      // Decode the URL parameter to get the proper blood group with + sign
      const decodedBloodGroup = decodeURIComponent(bloodGroup);
      setForm((prev) => ({ ...prev, bloodGroup: decodedBloodGroup }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Special handling for blood group input
    if (name === "bloodGroup" && value) {
      // If user enters just A, B, O, or AB, automatically append +
      const baseGroups = ["A", "B", "O", "AB"];
      const inputGroup = value.toUpperCase();
      if (baseGroups.includes(inputGroup)) {
        setForm((prev) => ({
          ...prev,
          [name]: inputGroup + "+"
        }));
        return;
      }
    }
    
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!form.consent) {
      toast.error("Please confirm that the information provided is true");
      return;
    }

    if (!authUser || !authUser.token) {
      toast.error("Please login again to register as a donor");
      navigate("/login");
      return;
    }

    // Calculate availability based on last donation date
    const lastDonationDate = form.lastDonation ? new Date(form.lastDonation) : null;
    const today = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(today.getMonth() - 3);
    
    // Donor is unavailable if last donation was less than 3 months ago
    const isAvailable = !lastDonationDate || lastDonationDate < threeMonthsAgo;

    const donorData = {
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      age: parseInt(form.age),
      gender: form.gender,
      bloodGroup: form.bloodGroup === "other" ? form.customBloodGroup : form.bloodGroup,
      height: parseFloat(form.height),
      weight: parseFloat(form.weight),
      lastDonation: form.lastDonation || null,
      availability: isAvailable,
      city: form.city,
      state: form.state,
      country: form.country,
      address: form.address
    };

    const result = await registerDonor(donorData);
    if (result) {
      setForm(initialForm);
    }
  };

  const inputBase =
    "w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 " +
    "focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-300 transition";

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100">
        {/* Header */}
        <div className="px-8 pt-8 pb-4 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Donor Registration
          </h1>
          <p className="mt-2 text-gray-600">
            A few minutes from you could mean a lifetime for someone else.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </div>
        <form onSubmit={handleSubmit} className="px-8 pb-8 pt-4">
          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                className={`${inputBase} ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                type="text"
                name="fullName"
                placeholder=""
                value={form.fullName}
                onChange={handleChange}
                required
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                className={`${inputBase} ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                type="email"
                name="email"
                placeholder=""
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                className={`${inputBase} ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                type="tel"
                name="phone"
                placeholder=""
                value={form.phone}
                onChange={handleChange}
                required
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Age & Gender */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  className={`${inputBase} ${errors.age ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  type="number"
                  name="age"
                  min="18"
                  max="65"
                  placeholder="18"
                  value={form.age}
                  onChange={handleChange}
                  required
                />
                {errors.age && (
                  <p className="mt-1 text-sm text-red-500">{errors.age}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <select
                  className={`${inputBase} ${errors.gender ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other / Prefer not to say</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Height & Weight */}
            <div className="grid grid-cols-2 gap-5 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (cm)
                </label>
                <input
                  className={`${inputBase} ${errors.height ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  type="number"
                  name="height"
                  placeholder="Height in centimeters"
                  value={form.height}
                  onChange={handleChange}
                  min="140"
                  max="220"
                  required
                />
                {errors.height && (
                  <p className="mt-1 text-sm text-red-500">{errors.height}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg)
                </label>
                <input
                  className={`${inputBase} ${errors.weight ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                  type="number"
                  name="weight"
                  placeholder="Weight in kilograms"
                  value={form.weight}
                  onChange={handleChange}
                  min="45"
                  max="150"
                  required
                />
                {errors.weight && (
                  <p className="mt-1 text-sm text-red-500">{errors.weight}</p>
                )}
              </div>
            </div>

            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood Group
              </label>
              <div className="relative">
                {searchParams.get("bloodGroup") && searchParams.get("bloodGroup") !== "Others" ? (
                  <input
                    type="text"
                    className={`${inputBase} bg-gray-100`}
                    value={form.bloodGroup}
                    disabled
                    title="Blood group is pre-selected"
                  />
                ) : (
                  <select
                    className={`${inputBase} ${errors.bloodGroup ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                    name="bloodGroup"
                    value={form.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Blood Group</option>
                    
                    <option value="other">Other Blood Group</option>
                  </select>
                )}
              </div>
              {form.bloodGroup === "other" && (
                <input
                  type="text"
                  name="customBloodGroup"
                  className={`${inputBase} mt-2`}
                  placeholder="Enter your blood group (e.g., Rh null, HH)"
                  value={form.customBloodGroup || ""}
                  onChange={handleChange}
                  required
                />
              )}
              {errors.bloodGroup && (
                <p className="mt-1 text-sm text-red-500">{errors.bloodGroup}</p>
              )}
            </div>

            {/* Last Donation Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Donation Date
              </label>
              <input
                type="date"
                name="lastDonation"
                className={`${inputBase}`}
                value={form.lastDonation}
                onChange={handleChange}
                max={new Date().toISOString().split('T')[0]} // Prevents future dates
                title="Select your last blood donation date"
              />
              <p className="mt-1 text-xs text-gray-500">
                Leave empty if you haven't donated before
              </p>
            </div>
          </div>

          {/* Location */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City
              </label>
              <input
                className={`${inputBase} ${errors.city ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                className={inputBase}
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                className={`${inputBase} ${errors.country ? 'border-red-500 ring-1 ring-red-500' : ''}`}
                type="text"
                name="country"
                value={form.country}
                onChange={handleChange}
                required
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">{errors.country}</p>
              )}
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <textarea
              className={`${inputBase} min-h-[110px] resize-y ${errors.address ? 'border-red-500 ring-1 ring-red-500' : ''}`}
              name="address"
              value={form.address}
              onChange={handleChange}
              required
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          {/* Consent */}
          <div className="mt-6 flex items-start gap-3">
            <input
              type="checkbox"
              name="consent"
              checked={form.consent}
              onChange={handleChange}
              className="mt-1 h-5 w-5 rounded border-gray-300 text-red-600 focus:ring-red-500"
            />
            <label className="text-sm text-gray-700">
              I confirm that the details provided are accurate and I agree to be
              contacted for blood donation when needed.
            </label>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-95 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
            <button
              type="button"
              onClick={() => setForm(initialForm)}
              className="px-5 py-3 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
