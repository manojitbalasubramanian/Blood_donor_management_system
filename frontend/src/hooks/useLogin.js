import { useState } from 'react'
import useAuthContext  from '../context/useAuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const login=async(identifier,password)=>{
        setLoading(true)
        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body: JSON.stringify({identifier,password})
            })

            const data = await res.json()
            if(data.error){
                throw new Error(data.error)
            }

            // Store the complete user data including token and admin status
            const userData = {
                _id: data._id,
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                token: data.token,
                admin: data.admin
            };

            console.log('Admin status after login:', userData.admin);
            localStorage.setItem("user", JSON.stringify(userData));
            setAuthUser(userData);
            toast.success("Login successful");
            return userData; 
        } catch (error) {
            toast.error(error.message)
            return false;
        }finally{
            setLoading(false)
        }
    }
    return{loading,login};
}

export default useLogin;