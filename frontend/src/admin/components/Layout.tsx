import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Settings, Users, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../../components/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarCollapsed, setIsDesktopSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    // { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
    { name: 'All Users', href: '/dashboard/alladminsusers', icon: Users },
    // { name: 'All Admins', href: '/dashboard/alladmins', icon: Shield },
    // { name: 'Add Admin/User', href: '/dashboard/adduser', icon: Plus },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
    { name: 'Reports', href: '/dashboard/reports', icon: BarChart3 },
  ];



  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDesktopSidebar = () => setIsDesktopSidebarCollapsed(!isDesktopSidebarCollapsed);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        {/* Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
            onClick={toggleSidebar}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 flex flex-col w-64 bg-white transform transition-transform duration-300 ease-in-out z-50 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b">
            <span className="text-xl font-semibold">Dashboard</span>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-sm hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 rounded-sm ${location.pathname === item.href
                  ? 'bg-gray-400 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
                  }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>
          
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className={`hidden lg:fixed lg:inset-y-0 lg:flex lg:flex-col ${isDesktopSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
        } transition-all duration-300`}>
        <div className="flex flex-col flex-1 min-h-0 bg-white border-r">
          <div className="flex items-center justify-between h-16 px-4 border-b">
            {!isDesktopSidebarCollapsed && (
              <span className="text-xl font-semibold">Dashboard</span>
            )}
            <button
              onClick={toggleDesktopSidebar}
              className={`p-2 rounded-sm hover:bg-gray-100 ${isDesktopSidebarCollapsed ? 'mx-auto ' : 'ml-auto'
                }`}
            >
              {isDesktopSidebarCollapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          </div>
          <nav className="flex-1 px-2 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center rounded-sm ${location.pathname === item.href
                  ? 'bg-gray-400 text-gray-900'
                  : 'text-gray-700 hover:bg-gray-100'
                  } ${isDesktopSidebarCollapsed ? 'justify-center py-2 ' : '  px-4 py-2 '}`}
                title={isDesktopSidebarCollapsed ? item.name : ''}
              >
                <item.icon className="w-5 h-5" />
                {!isDesktopSidebarCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            ))}
          </nav>

        </div>
      </div>

      {/* Main Content */}
      <div className={` flex flex-col flex-1 transition-all duration-300 ${isDesktopSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}>
        {/* Mobile Header */}

        <Navbar children={
          <div className="sticky flex h-16 bg-white border-b lg:hidden">
            <button
              onClick={toggleSidebar}
              className="px-4  border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

        } />

        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">{children}</div>
        </main>

      </div>
    </div>
  );
};

export default Layout;