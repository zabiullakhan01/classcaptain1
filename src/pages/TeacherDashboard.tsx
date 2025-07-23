import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  FileText,
  Award
} from 'lucide-react';

const TeacherDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'My Students',
      value: '45',
      change: '+3 this month',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Batches',
      value: '3',
      change: 'Mathematics, Physics',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Classes Today',
      value: '4',
      change: '2 completed',
      icon: Clock,
      color: 'bg-purple-500'
    },
    {
      title: 'Attendance Rate',
      value: '92%',
      change: 'This week',
      icon: CheckCircle,
      color: 'bg-orange-500'
    }
  ];

  const todayClasses = [
    {
      time: '09:00 AM',
      subject: 'Mathematics',
      batch: 'Grade 10 - A',
      students: 15,
      status: 'completed',
      room: 'Room 101'
    },
    {
      time: '11:00 AM',
      subject: 'Physics',
      batch: 'Grade 11 - B',
      students: 18,
      status: 'completed',
      room: 'Room 203'
    },
    {
      time: '02:00 PM',
      subject: 'Mathematics',
      batch: 'Grade 9 - C',
      students: 12,
      status: 'upcoming',
      room: 'Room 101'
    },
    {
      time: '04:00 PM',
      subject: 'Physics',
      batch: 'Grade 12 - A',
      students: 20,
      status: 'upcoming',
      room: 'Room 203'
    }
  ];

  const recentActivities = [
    {
      type: 'attendance',
      message: 'Attendance marked for Grade 10 - A Mathematics',
      time: '2 hours ago',
      icon: CheckCircle
    },
    {
      type: 'assignment',
      message: 'Assignment submitted by 15 students',
      time: '4 hours ago',
      icon: FileText
    },
    {
      type: 'achievement',
      message: 'Student John scored 95% in Physics test',
      time: '1 day ago',
      icon: Award
    },
    {
      type: 'alert',
      message: '3 students absent in today\'s class',
      time: '1 day ago',
      icon: AlertCircle
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-1">
              Ready to inspire minds today?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400">Teacher ID:</span>
              <span className="ml-2 font-semibold text-purple-600">TCH001</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Schedule
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todayClasses.map((classItem, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          classItem.status === 'completed' ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'
                        }`}>
                          <Clock className={`w-6 h-6 ${
                            classItem.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'
                          }`} />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {classItem.subject} - {classItem.batch}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {classItem.time} • {classItem.room} • {classItem.students} students
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              classItem.status === 'completed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            }`}>
                              {classItem.status === 'completed' ? 'Completed' : 'Upcoming'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Mark Attendance
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Create Assignment
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Grade Tests
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Users className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    View Students
                  </span>
                </button>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Activities
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {activity.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;