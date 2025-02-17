import type React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.userData);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-xl text-gray-600 bg-white p-8 rounded-lg shadow-md">
          User data not found. Please log in again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Profile</h1>
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-xl text-gray-500">{user.name}</span>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-medium text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;