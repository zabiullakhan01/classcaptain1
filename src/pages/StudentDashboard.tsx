import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DashboardLayout from '../components/DashboardLayout';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle,
  AlertCircle,
  FileText,
  Award,
  TrendingUp,
  User
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Attendance',
      value: '94%',
      change: 'This month',
      icon: CheckCircle,
      color: 'bg-green-500'
    },
    {
      title: 'Assignments',
      value: '8/10',
      change: 'Completed',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Average Score',
      value: '87%',
      change: '+5% from last month',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Rank',
      value: '#3',
      change: 'In your batch',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  const todaySchedule = [
    {
      time: '09:00 AM',
      subject: 'Mathematics',
      teacher: 'Sarah Wilson',
      room: 'Room 101',
      status: 'completed'
    },
    {
      time: '11:00 AM',
      subject: 'Physics',
      teacher: 'Dr. Smith',
      room: 'Room 203',
      status: 'completed'
    },
    {
      time: '02:00 PM',
      subject: 'Chemistry',
      teacher: 'Prof. Johnson',
      room: 'Lab 1',
      status: 'upcoming'
    },
    {
      time: '04:00 PM',
      subject: 'English',
      teacher: 'Ms. Davis',
      room: 'Room 105',
      status: 'upcoming'
    }
  ];

  const assignments = [
    {
      subject: 'Mathematics',
      title: 'Quadratic Equations Practice',
      dueDate: 'Dec 28, 2024',
      status: 'pending',
      priority: 'high'
    },
    {
      subject: 'Physics',
      title: 'Newton\'s Laws Lab Report',
      dueDate: 'Dec 30, 2024',
      status: 'submitted',
      priority: 'medium'
    },
    {
      subject: 'Chemistry',
      title: 'Organic Compounds Research',
      dueDate: 'Jan 2, 2025',
      status: 'pending',
      priority: 'low'
    }
  ];

  const recentGrades = [
    {
      subject: 'Mathematics',
      test: 'Unit Test 3',
      score: '92%',
      grade: 'A',
      date: 'Dec 20, 2024'
    },
    {
      subject: 'Physics',
      test: 'Lab Practical',
      score: '88%',
      grade: 'B+',
      date: 'Dec 18, 2024'
    },
    {
      subject: 'Chemistry',
      test: 'Monthly Test',
      score: '85%',
      grade: 'B+',
      date: 'Dec 15, 2024'
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
              Ready to learn something new today?
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow-sm">
              <span className="text-sm text-gray-500 dark:text-gray-400">Student ID:</span>
              <span className="ml-2 font-semibold text-purple-600">STU2025009</span>
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
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Today's Schedule
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {todaySchedule.map((classItem, index) => (
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
                              {classItem.subject}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {classItem.time} • {classItem.teacher} • {classItem.room}
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

            {/* Recent Grades */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Recent Grades
                </h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentGrades.map((grade, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {grade.subject} - {grade.test}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {grade.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          {grade.score}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Grade {grade.grade}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Pending Assignments */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Assignments
                </h2>
              </div>
              <div className="p-6 space-y-4">
                {assignments.map((assignment, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {assignment.title}
                      </p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        assignment.status === 'submitted' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : assignment.priority === 'high'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {assignment.status === 'submitted' ? 'Submitted' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{assignment.subject}</span>
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Quick Actions
                </h2>
              </div>
              <div className="p-6 space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    View Timetable
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <FileText className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Submit Assignment
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Award className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    View Grades
                  </span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 text-left rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <CheckCircle className="w-5 h-5 text-orange-600" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Check Attendance
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;