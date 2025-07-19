import { useState } from 'react'
import useAuthContext  from '../context/useAuthContext'
import toast from 'react-hot-toast'

const useLogin = () => {
    const [loading,setLoading]=useState(false)
    const {setAuthUser}=useAuthContext()

    const login=async(username,password)=>{
        setLoading(true)
        try {
            const res = await fetch("http://localhost:1234/auth/login",{
                method:"POST",
                headers:{"content-Type":"application/json"},
                body: JSON.stringify({username,password})
            })

            const data=await res.json()
            if(data.error){
                throw new Error(data.error)
            }

            localStorage.setItem("user",JSON.stringify(data))
            setAuthUser(data);
            toast.success("Login successful")
            return true; 
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