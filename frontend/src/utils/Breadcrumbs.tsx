import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react"; // Import the Home icon

// Define a customizable object for route names
const routeNames: { [key: string]: string } = {
    'dashboard': 'Dashboard',
    'alladminsusers': "All Admins & Users",
    'alladmins': "All Admins",
    'allusers': 'All Users',
    'settings': 'Settings',
    'reports': 'Reports',
    'adduser': 'Add User',
    'profile': 'Profile'
};

const Breadcrumbs: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);

    return (
        <nav className="flex items-center text-sm text-gray-600">
            {pathnames.map((name, index) => {
                const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
                const isLast = index === pathnames.length - 1;
                const displayName = routeNames[name] || name;

                return (
                    <React.Fragment key={name}>
                        {isLast ? (
                            <span className="text-gray-900 capitalize">
                                {name === 'dashboard' ? <Home className="h-4 w-4" /> : displayName}
                            </span>
                        ) : (
                            <>
                                <Link to={routeTo} className="hover:text-gray-900 capitalize">
                                    {name === 'dashboard' ? <Home className="h-4 w-4" /> : displayName}
                                </Link>
                                <ChevronRight className="mx-2 h-4 w-4" />
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </nav>
    );
};

export default Breadcrumbs;