import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import AttendanceModal from '../components/AttendanceModal';
import { 
  Home, 
  Users, 
  Calendar, 
  BarChart3,
  BookOpen,
  Settings,
  CheckCircle,
  XCircle
} from 'lucide-react';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAttendance, setShowAttendance] = useState(false);

  const navigation = [
    { name: 'Overview', icon: <Home className="w-5 h-5" />, current: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { name: 'My Batches', icon: <BookOpen className="w-5 h-5" />, current: activeTab === 'batches', onClick: () => setActiveTab('batches') },
    { name: 'Attendance', icon: <Calendar className="w-5 h-5" />, current: false, onClick: () => setShowAttendance(true) },
    { name: 'Grades', icon: <BarChart3 className="w-5 h-5" />, current: activeTab === 'grades', onClick: () => setActiveTab('grades') },
    { name: 'Settings', icon: <Settings className="w-5 h-5" />, current: activeTab === 'settings', onClick: () => setActiveTab('settings') }
  ];

  const batches = [
    { id: 1, name: 'Mathematics A', students: 25, schedule: 'Mon, Wed, Fri 9:00 AM', nextClass: 'Tomorrow 9:00 AM' },
    { id: 2, name: 'Mathematics B', students: 20, schedule: 'Tue, Thu, Sat 10:00 AM', nextClass: 'Today 10:00 AM' }
  ];

  const students = [
    { id: 1, name: 'John Doe', batch: 'Mathematics A', attendance: 85, lastGrade: 'A' },
    { id: 2, name: 'Jane Smith', batch: 'Mathematics A', attendance: 92, lastGrade: 'A+' },
    { id: 3, name: 'Mike Johnson', batch: 'Mathematics B', attendance: 78, lastGrade: 'B+' },
    { id: 4, name: 'Sarah Wilson', batch: 'Mathematics B', attendance: 88, lastGrade: 'A' }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">My Batches</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{batches.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Classes Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">2</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
        >
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <BarChart3 className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">86%</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Batches</h3>
          <div className="space-y-4">
            {batches.map((batch) => (
              <div key={batch.id} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{batch.name}</h4>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{batch.students} students</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Schedule: {batch.schedule}</p>
                <p className="text-sm text-green-600 dark:text-green-400">Next class: {batch.nextClass}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg border-l-4 border-green-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mathematics A</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">9:00 AM - 10:30 AM</p>
                </div>
                <span className="text-sm text-green-600 dark:text-green-400">Upcoming</span>
              </div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg border-l-4 border-blue-500">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Mathematics B</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">2:00 PM - 3:30 PM</p>
                </div>
                <span className="text-sm text-blue-600 dark:text-blue-400">Scheduled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AttendanceTab = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mark Attendance</h2>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Batch
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white">
            <option value="">Choose a batch</option>
            {batches.map((batch) => (
              <option key={batch.id} value={batch.id}>{batch.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Students</h3>
          {students.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{student.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Batch: {student.batch}</p>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 bg-green-100 dark:bg-green-900 text-green-600 rounded-lg hover:bg-green-200 dark:hover:bg-green-800">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button className="p-2 bg-red-100 dark:bg-red-900 text-red-600 rounded-lg hover:bg-red-200 dark:hover:bg-red-800">
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'attendance':
        return <AttendanceTab />;
      default:
        return <OverviewTab />;
    }
  };

  return (
    <DashboardLayout navigation={navigation}>
      <AttendanceModal
        isOpen={showAttendance}
        onClose={() => setShowAttendance(false)}
      />
      
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

export default TeacherDashboard;
