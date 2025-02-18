import { LogOut } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../features/users/userSlice';


interface LayoutProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<LayoutProps> = ({ children }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-10 bg-white flex items-center justify-between h-16 px-4 border-b">
            {children}
            <div className="text-blacktext-xl font-bold">
                <Link to="/" className="text-xl font-semibold">My App</Link>
            </div>
            <div className="p-4 border-t">
                <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 rounded-sm"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Logout
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
