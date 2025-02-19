import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardHome: React.FC = () => {
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalAdmins, setTotalAdmins] = useState<number>(0);
  const [totalAdminsAndUsers, setTotalAdminsAndUsers] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setError("No authentication token found. Please log in.");
      setLoading(false);
      return;
    }

    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ADMIN_API}/totalUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        animateValue(setTotalUsers, 0, response.data.data.totalUsers, 1000);
      } catch (error) {
        console.error("Error fetching total users:", error);
      }
    };

    const fetchTotalAdmins = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ADMIN_API}/totalAdmins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        animateValue(setTotalAdmins, 0, response.data.data.totalAdmins, 1000);
      } catch (error) {
        console.error("Error fetching total admins:", error);
      }
    };

    const fetchTotalAdminsAndUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ADMIN_API}/totalAdminsAndUsers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        animateValue(setTotalAdminsAndUsers, 0, response.data.data.totalAdminsAndUsers, 1000);
      } catch (error) {
        console.error("Error fetching total admins and users:", error);
      }
    };

    fetchTotalUsers();
    fetchTotalAdmins();
    fetchTotalAdminsAndUsers();
  }, []);

  const animateValue = (setter: React.Dispatch<React.SetStateAction<number>>, start: number, end: number, duration: number) => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setter(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  if (loading) {
    return <div className="text-center py-6">Loading users...</div>;
  }

  if (error) {
    return <div className="text-center py-6 text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/dashboard/allusers" className="bg-white p-6 rounded-sm shadow block">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Total Users</h2>
            <p className="mt-2 text-3xl font-bold text-gray-600">{totalUsers}</p>
          </div>
        </Link>
        <Link to="/dashboard/alladmins" className="bg-white p-6 rounded-sm shadow block">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Total Admins</h2>
            <p className="mt-2 text-3xl font-bold text-gray-600">{totalAdmins}</p>
          </div>
        </Link>
        <Link to="/dashboard/alladminsusers" className="bg-white p-6 rounded-sm shadow block">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Total Admins + Users</h2>
            <p className="mt-2 text-3xl font-bold text-gray-600">{totalAdminsAndUsers}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashboardHome;