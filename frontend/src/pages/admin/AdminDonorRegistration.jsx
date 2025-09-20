import React, { useState } from "react";
import StateDistrictSelect from "../../components/StateDistrictSelect";
import toast from "react-hot-toast";
import useDonorRegistration from "../../hooks/useDonorRegistration";

const initialForm = {
	fullName: "",
	email: "",
	phone: "",
	age: "",
	gender: "",
	bloodGroup: "",
	customBloodGroup: "",
	height: "",
	weight: "",
	city: "",
	state: "",
	country: "",
	address: "",
	lastDonation: "",
	hasHealthIssues: false,
	healthIssues: "",
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
	healthIssues: "",
};

export default function AdminDonorRegistration() {
	const { loading: submitting, registerDonor } = useDonorRegistration();
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState(initialErrors);

	// Validation functions (copied from DonorRegistration)
	const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	const validatePhone = (phone) => /^\d{10}$/.test(phone);
	const validateForm = () => {
		const newErrors = {};
		let isValid = true;
		if (!form.fullName.trim()) {
			newErrors.fullName = "Full name is required";
			isValid = false;
		} else if (form.fullName.length < 3) {
			newErrors.fullName = "Full name must be at least 3 characters";
			isValid = false;
		}
		if (!form.email.trim()) {
			newErrors.email = "Email is required";
			isValid = false;
		} else if (!validateEmail(form.email)) {
			newErrors.email = "Please enter a valid email address";
			isValid = false;
		}
		if (!form.phone.trim()) {
			newErrors.phone = "Phone number is required";
			isValid = false;
		} else if (!validatePhone(form.phone)) {
			newErrors.phone = "Please enter a valid 10-digit phone number";
			isValid = false;
		}
		if (!form.age) {
			newErrors.age = "Age is required";
			isValid = false;
		} else if (form.age < 19 || form.age > 65) {
			newErrors.age = "Age must be between 18 and 65";
			isValid = false;
		}
		if (!form.gender) {
			newErrors.gender = "Please select a gender";
			isValid = false;
		}
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
		if (!form.city.trim()) {
			newErrors.city = "City is required";
			isValid = false;
		}
		if (!form.country.trim()) {
			newErrors.country = "Country is required";
			isValid = false;
		}
		if (!form.address.trim()) {
			newErrors.address = "Address is required";
			isValid = false;
		}
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
		if (form.hasHealthIssues && !form.healthIssues.trim()) {
			newErrors.healthIssues = "Please describe your health issues";
			isValid = false;
		}
		if (form.lastDonation) {
			const donationDate = new Date(form.lastDonation);
			const today = new Date();
			const threeMonthsAgo = new Date();
			threeMonthsAgo.setMonth(today.getMonth() - 3);
			if (donationDate > today) {
				newErrors.lastDonation = "Last donation date cannot be in the future";
				isValid = false;
			} else if (donationDate > threeMonthsAgo) {
				const nextEligibleDate = new Date(donationDate);
				nextEligibleDate.setMonth(donationDate.getMonth() + 3);
				newErrors.lastDonation = `You must wait at least 3 months between donations. You will be eligible to donate after ${nextEligibleDate.toLocaleDateString()}`;
				isValid = false;
			}
		}
		setErrors(newErrors);
		return isValid;
	};

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		if (name === "bloodGroup" && value) {
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
		if (errors[name]) {
			setErrors(prev => ({ ...prev, [name]: "" }));
		}
	};

	const handleStateDistrict = (state, city) => {
		setForm((prev) => ({ ...prev, state, city }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			toast.error("Please fix the errors in the form");
			return;
		}
		// Calculate availability based on last donation date
		const lastDonationDate = form.lastDonation ? new Date(form.lastDonation) : null;
		const today = new Date();
		const threeMonthsAgo = new Date();
		threeMonthsAgo.setMonth(today.getMonth() - 3);
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
			address: form.address,
			hasHealthIssues: form.hasHealthIssues,
			healthIssues: form.healthIssues,
		};
		const result = await registerDonor(donorData, true);
		if (result) {
			setForm(initialForm);
			toast.success("Donor registered successfully!");
		}
	};

	const inputBase =
		"w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 placeholder-gray-400 " +
		"focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-300 transition";

	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center px-4 py-10">
			<div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl border border-gray-100">
				<div className="px-8 pt-8 pb-4 text-center">
					<h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
						Admin Donor Registration
					</h1>
					<p className="mt-2 text-gray-600">
						Register a new donor on behalf of a user.
					</p>
					<div className="w-24 h-1 bg-gradient-to-r from-red-500 to-pink-500 mx-auto mt-4 rounded-full" />
				</div>
				<form onSubmit={handleSubmit} className="px-8 pb-8 pt-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Full Name
							</label>
							<input
								className={`${inputBase} ${errors.fullName ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="text"
								name="fullName"
								value={form.fullName}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
							{errors.fullName && <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Email
							</label>
							<input
								className={`${inputBase} ${errors.email ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="email"
								name="email"
								value={form.email}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
							{errors.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Phone
							</label>
							<input
								className={`${inputBase} ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="text"
								name="phone"
								value={form.phone}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
							{errors.phone && <div className="text-red-500 text-xs mt-1">{errors.phone}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Age
							</label>
							<input
								className={`${inputBase} ${errors.age ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="number"
								name="age"
								value={form.age}
								onChange={handleChange}
								min={18}
								max={65}
								required
							/>
							{errors.age && <div className="text-red-500 text-xs mt-1">{errors.age}</div>}
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
								<option value="">Select Gender</option>
								<option value="male">Male</option>
								<option value="female">Female</option>
								<option value="other">Other</option>
							</select>
							{errors.gender && <div className="text-red-500 text-xs mt-1">{errors.gender}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Blood Group
							</label>
							<input
								className={`${inputBase} ${errors.bloodGroup ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="text"
								name="bloodGroup"
								value={form.bloodGroup}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
							{form.bloodGroup === "other" && (
								<input
									className={`${inputBase} mt-2`}
									type="text"
									name="customBloodGroup"
									value={form.customBloodGroup}
									onChange={handleChange}
									placeholder="Specify your blood group"
									required
								/>
							)}
							{errors.bloodGroup && <div className="text-red-500 text-xs mt-1">{errors.bloodGroup}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Height (cm)
							</label>
							<input
								className={`${inputBase} ${errors.height ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="number"
								name="height"
								value={form.height}
								onChange={handleChange}
								min={140}
								max={220}
								required
							/>
							{errors.height && <div className="text-red-500 text-xs mt-1">{errors.height}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Weight (kg)
							</label>
							<input
								className={`${inputBase} ${errors.weight ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="number"
								name="weight"
								value={form.weight}
								onChange={handleChange}
								min={45}
								max={150}
								required
							/>
							{errors.weight && <div className="text-red-500 text-xs mt-1">{errors.weight}</div>}
						</div>
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
								autoComplete="off"
								required
							/>
							{errors.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								State
							</label>
							<StateDistrictSelect state={form.state} city={form.city} onChange={handleStateDistrict} />
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
								autoComplete="off"
								required
							/>
							{errors.country && <div className="text-red-500 text-xs mt-1">{errors.country}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Address
							</label>
							<input
								className={`${inputBase} ${errors.address ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="text"
								name="address"
								value={form.address}
								onChange={handleChange}
								autoComplete="off"
								required
							/>
							{errors.address && <div className="text-red-500 text-xs mt-1">{errors.address}</div>}
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Last Donation Date
							</label>
							<input
								className={`${inputBase} ${errors.lastDonation ? 'border-red-500 ring-1 ring-red-500' : ''}`}
								type="date"
								name="lastDonation"
								value={form.lastDonation}
								onChange={handleChange}
							/>
							{errors.lastDonation && <div className="text-red-500 text-xs mt-1">{errors.lastDonation}</div>}
						</div>
						<div className="md:col-span-2">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="hasHealthIssues"
									checked={form.hasHealthIssues}
									onChange={handleChange}
								/>
								Health Issues
							</label>
							{form.hasHealthIssues && (
								<input
									className={`${inputBase} mt-2 ${errors.healthIssues ? 'border-red-500 ring-1 ring-red-500' : ''}`}
									type="text"
									name="healthIssues"
									value={form.healthIssues}
									onChange={handleChange}
									placeholder="Describe health issues"
									required
								/>
							)}
							{errors.healthIssues && <div className="text-red-500 text-xs mt-1">{errors.healthIssues}</div>}
						</div>
						<div className="md:col-span-2">
							<label className="flex items-center gap-2">
								<input
									type="checkbox"
									name="availability"
									checked={form.availability}
									onChange={handleChange}
								/>
								Available to Donate
							</label>
						</div>
					</div>
					<div className="mt-6 flex justify-end">
						<button
							type="submit"
							className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded transition"
							disabled={submitting}
						>
							{submitting ? "Registering..." : "Register Donor"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
