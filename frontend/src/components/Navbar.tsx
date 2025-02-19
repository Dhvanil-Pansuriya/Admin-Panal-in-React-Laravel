import { LogOut, User2 } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { logoutUser } from '../features/users/userSlice';
import Breadcrumbs from '../utils/Breadcrumbs';

interface LayoutProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<LayoutProps> = ({ children }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    // Check if the current path starts with `/dashboard`
    const isDashboardRoute = location.pathname.startsWith('/dashboard');

    return (
        <>
            <nav className="sticky top-0 z-10 bg-white flex items-center justify-between h-16 px-4 border-b">
                {children}
                <div className="text-black text-xl font-bold">
                    <Link to="/" className="text-xl font-semibold">My App</Link>
                </div>
                <div className="p-4 border-t flex">
                    {isDashboardRoute ? (
                        <button
                            className="flex items-center w-full p-3 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-full"
                            onClick={() => navigate('/dashboard/profile')}
                        >
                            <User2 className="w-5 h-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
                        >
                            <LogOut className="w-5 h-5 mr-3" />
                            Logout
                        </button>
                    )}
                </div>
            </nav>
            <section className="sticky top-16 bg-gray-100 z-10 p-3 flex items-center">
                <Breadcrumbs />
            </section>
        </>
    );
};

export default Navbar;