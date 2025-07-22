import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { 
  Home, 
  Calendar, 
  BarChart3,
  BookOpen,
  Settings,
  Users,
  DollarSign,
  Shield,
  FileText,
  User,
  GraduationCap,
  Menu,
  Bell
} from 'lucide-react';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [studentData, setStudentData] = useState<any>(null);
  const [attendanceData, setAttendanceData] = useState<any[]>([]);
  const [gradeData, setGradeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', icon: <Home className="w-5 h-5" />, current: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { name: 'Attendance', icon: <Calendar className="w-5 h-5" />, current: activeTab === 'attendance', onClick: () => setActiveTab('attendance') },
    { name: 'Grades', icon: <BarChart3 className="w-5 h-5" />, current: activeTab === 'grades', onClick: () => setActiveTab('grades') },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, current: activeTab === 'settings', onClick: () => setActiveTab('settings') }
  ];

  useEffect(() => {
    fetchStudentData();
  }, [user]);

  const fetchStudentData = async () => {
    try {
      setLoading(true);
      
      // For demo users, use mock data
      if (user?.id === 'student-demo') {
        setStudentData({
          id: 'student-demo',
          name: 'SAFA MARYAM',
          roll_number: '2025009',
          batch: 'SSLC - B1',
          father_name: 'Mohammed Maryam',
          academy_id: 'AC001'
        });
      } else if (user?.id) {
        // Fetch real student data from database
        const { data: student } = await supabase
          .from('students')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (student) {
          setStudentData(student);
        }
      }
      
      // Mock data for demo
      setAttendanceData([
        { subject: 'Mathematics', present: 18, total: 20, percentage: 90 },
        { subject: 'Physics', present: 15, total: 18, percentage: 83 },
        { subject: 'Chemistry', present: 16, total: 19, percentage: 84 }
      ]);
      
      setGradeData([
        { subject: 'Mathematics', grade: 'A+', marks: 95, total: 100 },
        { subject: 'Physics', grade: 'A', marks: 88, total: 100 },
        { subject: 'Chemistry', grade: 'A', marks: 92, total: 100 }
      ]);
    } catch (error) {
      console.error('Error fetching student data:', error);
    } finally {
      setLoading(false);
    }
  };

  const menuItems = [
    {
      title: 'My Academy',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-blue-400 to-blue-600',
      onClick: () => setActiveTab('academy')
    },
    {
      title: 'Attendance',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-purple-500 to-purple-700',
      onClick: () => setActiveTab('attendance')
    },
    {
      title: 'Tuition Fees',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-green-400 to-green-600',
      onClick: () => setActiveTab('fees')
    },
    {
      title: 'Exams',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-lime-400 to-lime-600',
      onClick: () => setActiveTab('exams')
    },
    {
      title: 'Homework',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-cyan-400 to-cyan-600',
      onClick: () => setActiveTab('homework')
    },
    {
      title: 'Online Exam',
      icon: <User className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-red-400 to-red-600',
      onClick: () => setActiveTab('online-exam')
    },
    {
      title: 'Study Material',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-gradient-to-br from-gray-700 to-gray-900',
      onClick: () => setActiveTab('study-material')
    }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Header with Menu */}
      <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-4 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <Menu className="w-6 h-6" />
          <h1 className="text-xl font-bold">SM TUTORIALS</h1>
          <Bell className="w-6 h-6" />
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-orange-500 rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mr-4">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">SM TUTORIALS</h2>
              <p className="text-sm opacity-90">HELPING STUDENTS REACH THEIR POTENTIAL</p>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-2xl font-bold mb-2">ADMISSIONS OPEN FOR</h3>
            <h4 className="text-3xl font-bold text-yellow-300">II PUC COMMERCE</h4>
            <p className="text-lg">FOR YEAR 2024-25</p>
          </div>
          
          <div className="mb-4">
            <h5 className="text-lg font-semibold mb-2">WHAT'S SPECIAL?</h5>
            <ul className="text-sm space-y-1">
              <li>• Individual Attention</li>
              <li>• Experienced Faculty</li>
              <li>• Best Study Material</li>
              <li>• Shortcut Techniques</li>
              <li>• MONTHLY FEE STRUCTURE</li>
            </ul>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-cyan-300">LIMITED SEATS ONLY</p>
              <p className="text-xs">CLASSES WILL START FROM APRIL</p>
            </div>
            <div className="text-right">
              <p className="text-xs">+91 9341771761 | +91 7019334774</p>
            </div>
          </div>
          
          {/* Decorative circles */}
          <div className="absolute top-4 right-4 w-32 h-32 bg-orange-400 rounded-full opacity-30"></div>
          <div className="absolute bottom-4 right-8 w-20 h-20 bg-yellow-400 rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center border-4 border-blue-200">
            <User className="w-10 h-10 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {user?.name || 'SAFA MARYAM'}
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              (SSLC - B1)
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Roll No: {studentData?.roll_number || '2025009'}
            </p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="grid grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={item.onClick}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className={`w-20 h-20 ${item.color} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3`}>
                {item.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center group-hover:text-gray-900 dark:group-hover:text-white">
                {item.title}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">86%</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Grade</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">A</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AttendanceTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Attendance Record</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="space-y-6">
          {attendanceData.map((item) => (
            <div key={item.subject} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.subject}</h3>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{item.percentage}%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.present}/{item.total} classes</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full ${item.percentage >= 90 ? 'bg-green-500' : item.percentage >= 75 ? 'bg-yellow-500' : 'bg-red-500'}`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const GradesTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Grade Report</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Marks</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Percentage</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {gradeData.map((item) => (
              <tr key={item.subject}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.marks}/{item.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600 dark:text-green-400">{item.grade}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.marks}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'attendance':
        return <AttendanceTab />;
      case 'grades':
        return <GradesTab />;
      default:
        return <OverviewTab />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout navigation={navigation}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
