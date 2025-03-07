import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './admin/pages/DashboardPage';
import DashboardHome from './admin/pages/dashboard/DashboardHome';
import ProfilePage from './admin/pages/dashboard/ProfilePage';
import SettingsPage from './admin/pages/dashboard/SettingsPage';
import ReportsPage from './admin/pages/dashboard/ReportsPage';
import AllUsers from './admin/pages/dashboard/AllUsers';
import ProtectedRoute from './utils/ProtectedRoute';
import Home from './user/Home';
import AddUser from './admin/pages/dashboard/AddUser';
import AllAdmins from './admin/pages/dashboard/AllAdmins';
import AllAdminsAndUsers from './admin/pages/dashboard/AllAdminsAndUsers';

// if you want to dispatch an action when the user closes the tab or refreshes the page
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { logoutUser } from './features/users/userSlice';

const App: React.FC = () => {

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   const handleBeforeUnload = () => {
  //     dispatch(logoutUser());
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {
  //     window.removeEventListener('beforeunload', handleBeforeUnload);
  //   };
  // }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path='/home' element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />}>
            <Route index element={<DashboardHome />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="allusers" element={<AllUsers />} />
            <Route path="alladmins" element={<AllAdmins />} />
            <Route path="alladminsusers" element={<AllAdminsAndUsers />} />
            <Route path="adduser" element={<AddUser />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;