import { useState } from "react";
import toast from "react-hot-toast";
import useAuthContext from "../context/useAuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);

	const {AuthUser,setAuthUser}= useAuthContext();

	const signup = async ({fullname,username,password,confrimpassword,gender,bloodgroup,city,phone,age,address}) => {

		setLoading(true);
		try {
			const res = await fetch("http://localhost:1234/auth/signup", {
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
				  },
				body: JSON.stringify({fullname,username,password,confrimpassword,gender,bloodgroup,city,phone,age,address}),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("user", JSON.stringify(data));
			setAuthUser(data);
            toast.success("Signup successful");
		} catch (error) {
			toast.error(error.message);
            
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};
export default useSignup;
