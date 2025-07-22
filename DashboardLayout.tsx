import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { 
  GraduationCap, 
  Moon, 
  Sun, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardLayoutProps {
  children: React.ReactNode;
  navigation: Array<{
    name: string;
    icon: React.ReactNode;
    current: boolean;
    onClick: () => void;
  }>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, navigation }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white dark:bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              type="button"
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Class Captain</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`w-full group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                    item.current
                      ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mr-4 flex-shrink-0 h-6 w-6">{item.icon}</div>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <GraduationCap className="h-8 w-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Class Captain</span>
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={item.onClick}
                  className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    item.current
                      ? 'bg-purple-100 text-purple-900 dark:bg-purple-900 dark:text-purple-100'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="mr-3 flex-shrink-0 h-6 w-6">{item.icon}</div>
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-4 py-3 bg-[#9E7FFF] text-white shadow-md">
          {/* Left side: Mobile menu button (visible on mobile) and Greeting */}
          <div className="flex items-center">
            {/* Mobile menu button - only visible on small screens */}
            <button
              type="button"
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            {/* Greeting - adjust margin for mobile button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="ml-4 md:ml-0"
            >
              <h1 className="text-lg font-semibold text-white">
                {getGreeting()}, {user?.name}!
              </h1>
              <p className="text-sm text-white/80">
                {user?.role === 'academy' && user?.academyKey && `Academy ID: ${user.academyKey}`}
                {user?.role !== 'academy' && user?.academyId && `Academy: ${user.academyId}`}
              </p>
            </motion.div>
          </div>
          {/* Right side: Theme/Logout buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-white hover:bg-white/10"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={logout}
              className="p-2 rounded-md text-white hover:bg-white/10"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
