import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";


function Login() {
  const [username,setUsername]=useState("")
	const [password,setPassword]=useState("")

	const {loading,login}=useLogin()

	const handleSubmit = async(e)=>{
		e.preventDefault();
		await login(username,password)
	}

  return (
			<div>
				<h1>
					Login
				</h1>
				<form onSubmit={handleSubmit}>
					<div>
						<label>
							<span >Username</span>
						</label>
						<input type='text' placeholder='Enter username' 
							value={username}
							onChange={(e)=>setUsername(e.target.value)}
						/>
					</div>

					<div>
						<label>
							<span>Password</span>
						</label>
						<input
							type='password'
							placeholder='Enter Password'
							value={password}
							onChange={(e)=>setPassword(e.target.value)}
						/>
					</div>
					<Link to='/signup'>
						{"Don't"} have an account?
					</Link>

					<div>
						<button
              disabled={loading}>
                Login
						</button>
					</div>
				</form>
			</div>
	);
}

export default Login