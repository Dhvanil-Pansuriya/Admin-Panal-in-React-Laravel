import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../../app/store";
import axios from "axios";
import { Check, X, Loader2 } from "lucide-react";
import { updateUser } from "../../../features/users/userSlice";

const SettingsPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userData);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check if form values are different from initial values
  const hasChanges = 
    name !== user?.name || 
    email !== user?.email || 
    role !== user?.role;

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_ADMIN_API}/user/${user?.id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data) {
        setSuccess("User updated successfully!");
        dispatch(updateUser({ name, email, role }));
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("An error occurred while updating the user.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600 bg-white p-8 rounded-sm shadow-md">
          User data not found. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
      <div className="bg-white shadow rounded-sm divide-y divide-gray-200">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900">Account Settings</h2>
          <div className="mt-6 space-y-6">
            <form onSubmit={handleUpdate}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 my-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="mt-1 block w-full rounded-sm py-2 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 my-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="mt-1 block w-full rounded-sm py-2 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="opacity-70 cursor-not-allowed hover:cursor-not-allowed">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 my-2 hover:cursor-not-allowed">
                  Role
                </label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full rounded-sm py-2 px-2 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm hover:cursor-not-allowed"
                  value={role}
                  onChange={(e) => setRole(parseInt(e.target.value))}
                  disabled
                >
                  <option value={1}>Admin</option>
                  <option value={2}>User</option>
                </select>
              </div>

              <button
                type="submit"
                className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white ${
                  hasChanges 
                    ? 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500' 
                    : 'bg-gray-400 cursor-not-allowed'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 mt-4`}
                disabled={isLoading || !hasChanges}
              >
                {isLoading ? (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                ) : (
                  <Check className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </button>
            </form>
            {error && (
              <div className="flex items-center text-red-600 mt-4">
                <X className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}
            {success && (
              <div className="flex items-center text-green-600 mt-4">
                <Check className="h-4 w-4 mr-2" />
                {success}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;