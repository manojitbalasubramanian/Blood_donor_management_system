import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthContext from '../context/useAuthContext';

const useDonorRegistration = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();

    const registerDonor = async (donorData) => {
        setLoading(true);
        try {
            // Check if user is logged in and has a valid token
            if (!authUser || !authUser.token) {
                throw new Error("Please login first");
            }

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/donors/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authUser.token}`
                },
                body: JSON.stringify(donorData)
            });

            const data = await response.json();
            
            if (data.error) {
                throw new Error(data.error);
            }

            toast.success("Donor registration successful!");
            return data;

        } catch (error) {
            toast.error(error.message);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { loading, registerDonor };
};

export default useDonorRegistration;
