import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  const navigate = useNavigate();

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
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
      <div className="bg-white shadow rounded-sm">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-sm bg-gray-200 flex items-center justify-center">
                <span className="text-xl text-gray-500 text-center">{user.name}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-sm shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4 right-0"
              onClick={()=>navigate("/dashboard/settings")}
            >
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;