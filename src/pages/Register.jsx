import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../services/api";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  async function handleRegister() {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const response = await api.post("users/register", {
      name,
      email,
      password,
    });

    navigate("/");
  }

  return (
    <AuthLayout>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign up</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-gray-100 text-gray-900 p-3 rounded outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full bg-gray-100 text-gray-900 p-3 rounded outline-none border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleRegister}
        className="w-full bg-blue-600 text-white p-3 rounded font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
      >
        Sign Up
      </button>
      <p className="text-center text-gray-500 text-sm mt-4">
        Already have an account?{" "}
        <Link to="/" className="text-blue-600 hover:underline">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default Register;
