import { useState } from "react"
import useAuthContext from "../context/useAuthContext"
import toast from "react-hot-toast"

const useLogout =()=>{
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const logout =async()=>{
        setLoading(true)
        try {
            const res=await fetch("https://blood-donor-management-system-v4qz.onrender.com/auth/logout",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
            });
            const data =await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.removeItem("user");
            setAuthUser(null);
            toast.success("Logout successful");
            
        } catch (error) {
            toast.error(error.message);
        } finally{
            setLoading(false)
        }
    }
  return {loading,logout};
}
export default useLogout;