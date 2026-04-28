import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import MainLayout from "../components/MainLayout";
import api from "../services/api";

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");
  const user = JSON.parse(localStorage.getItem("user"));
  const [name, setName] = useState(user.name);
  const [saved, setSaved] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const { theme, toggleTheme } = useTheme();

  async function handleUpdateProfile() {
    await api.put("/users/me", { name });
    localStorage.setItem("user", JSON.stringify({ ...user, name }));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleUpdatePassword() {
    try {
      await api.put("/users/me/password", { currentPassword, newPassword });
      setPasswordSaved(true);
      setPasswordError("");
      setTimeout(() => setPasswordSaved(false), 3000);
    } catch {
      setPasswordError("Current password is incorrect.");
    }
  }

  async function handleDeleteAccount() {
    if (
      window.confirm(
        "Are you surte you want to delete your account? This cannot be undone.",
      )
    ) {
      await api.delete("/users/me");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
    }
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto flex gap-8">
        <div className="w-56 border-r border-gray-200 pr-8">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
            Settings
          </h2>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => setActiveTab("profile")}
              className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === "profile" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("account")}
              className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === "account" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Account
            </button>
            <button
              onClick={() => setActiveTab("theme")}
              className={`text-left px-3 py-2 rounded text-sm font-medium transition-colors ${activeTab === "theme" ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-100"}`}
            >
              Theme
            </button>
          </nav>
        </div>

        <div className="flex-1">
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Profile</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Save Changes
                </button>
                {saved && (
                  <p className="text-green-600 text-sm mt-2">Changes saved!</p>
                )}
              </div>
            </div>
          )}
          {activeTab === "account" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Account</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Change Password
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-100 text-gray-900 p-3 rounded border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleUpdatePassword}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  Update Password
                </button>
                {passwordSaved && (
                  <p className="text-green-600 text-sm mt-2">
                    Password updated!
                  </p>
                )}
                {passwordError && (
                  <p className="text-red-500 text-sm mt-2">{passwordError}</p>
                )}
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 border border-red-100">
                <h3 className="font-semibold text-red-600 mb-2">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  This action is permanent and cannot be undone.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className="border border-red-300 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors cursor-pointer"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
          {activeTab === "theme" && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">Theme</h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900">Dark Mode</p>
                    <p className="text-sm text-gray-500">
                      Switch between light and dark theme
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full transition-colors cursor-pointer ${theme === "dark" ? "bg-blue-600" : "bg-gray-300"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow transition-transform mx-0.5 ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
                    />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default Settings;
