import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    const response = await api.post("/users/login", { email, password });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    navigate("/profile");
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Log In</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-100 text-gray-900 p-3 rounded outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-100 text-gray-900 p-3 rounded outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Login
      </button>
      <p className="text-center text-gray-500 text-sm mt-4">
        New here?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Login;
