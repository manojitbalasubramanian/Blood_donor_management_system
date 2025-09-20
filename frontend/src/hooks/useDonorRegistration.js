import { useState } from 'react';
import toast from 'react-hot-toast';
import useAuthContext from '../context/useAuthContext';

const useDonorRegistration = () => {
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();


    /**
     * Register a donor. If admin is true, use the admin endpoint.
     * @param {object} donorData - Donor data
     * @param {boolean} admin - If true, use /api/donors/create
     */
    const registerDonor = async (donorData, admin = false) => {
        setLoading(true);
        try {
            if (!authUser || !authUser.token) {
                throw new Error("Please login first");
            }
            const url = admin
                ? "http://localhost:1234/api/donors/create"
                : "http://localhost:1234/api/donors/register";
            const response = await fetch(url, {
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
