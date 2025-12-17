import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import useAuthContext from "../context/useAuthContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { loading, login } = useLogin();
  const { setAuthUser } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = await login(username, password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setAuthUser(user);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-lg shadow-xl p-8 space-y-6"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-white">Welcome back</h1>
          <p className="text-sm text-slate-400">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          {/* Username */}
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-slate-200 block">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-slate-200 block">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-600 disabled:opacity-50 text-white font-medium py-2 px-4 rounded-md text-sm transition-colors"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Signup link */}
        <p className="text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 hover:text-red-400 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
