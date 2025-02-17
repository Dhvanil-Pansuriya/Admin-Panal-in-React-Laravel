import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute: React.FC = () => {

    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : null;

    if (!user) {
        return <Navigate to="/login"/>;
    }

    return <Outlet />;
};

export default ProtectedRoute;
