import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Layout from '../components/Layout';
import Loading from '../utils/Loading';

const DashboardPage: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        setIsAdmin(false);
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_ADMIN_API}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.role === 1) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  // If the user is not an admin or not authenticated, redirect to home
  if (isAdmin === false) {
    return <Navigate to="/home" />;
  }

  // While checking the admin status, show a loading state
  if (isAdmin === null) {
    return <Loading />;
  }

  // If the user is an admin, show the dashboard
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default DashboardPage;
