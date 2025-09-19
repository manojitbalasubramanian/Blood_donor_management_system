import { useState } from "react";
import toast from "react-hot-toast";
import useAuthContext from "../context/useAuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const {AuthUser,setAuthUser}= useAuthContext();

	const signup = async ({fullname,username,email,password,confrimpassword,gender,bloodgroup,city,phone,age,address}) => {

		setLoading(true);
				try {
						const res = await fetch("https://blood-donor-management-system-v4qz.onrender.com/auth/signup", {
								method: "POST",
								headers: {
										'Content-Type': 'application/json',
									},
								body: JSON.stringify({fullname,username,email,password,confrimpassword,gender,bloodgroup,city,phone,age,address}),
						});

			const data = await res.json();
			if (data.error) {
				toast.error(data.error);
				return;
			}
			localStorage.setItem("user", JSON.stringify(data));
			setAuthUser(data);
            toast.success("Signup successful");
		} catch (error) {
			console.error("Signup error:", error);
			toast.error("An error occurred while signing up. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;
