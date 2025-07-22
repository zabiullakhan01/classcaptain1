import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ForgotPasswordModal from '../components/ForgotPasswordModal';
import { GraduationCap, Mail, Lock, AlertCircle, Calendar, Building, User, BookOpen } from 'lucide-react';

const Login = () => {
  const [loginType, setLoginType] = useState<'academy' | 'student' | 'teacher'>('academy');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [academyId, setAcademyId] = useState('');
  const [studentId, setStudentId] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginType === 'academy') {
        await login(email, password);
        navigate('/academy');
      } else {
        // For students and teachers, use DOB and Academy ID
        const loginData = {
          academyId,
          dateOfBirth,
          studentId: loginType === 'student' ? studentId : null,
          teacherId: loginType === 'teacher' ? teacherId : null,
          loginType
        };
        await login(JSON.stringify(loginData), 'dob-login');
        navigate(`/${loginType}`);
      }
    } catch (err) {
      setError(loginType === 'academy' ? 'Invalid email or password' : 'Invalid Date of Birth or Academy ID');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <GraduationCap className="w-12 h-12 text-purple-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Class Captain</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Sign in to your account to continue
          </p>
        </div>

        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-8">
          {/* Login Type Selector */}
          <div className="mb-6">
            <div className="grid grid-cols-3 rounded-lg bg-gray-100 dark:bg-gray-700 p-1 gap-1">
              <button
                type="button"
                onClick={() => setLoginType('academy')}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginType === 'academy'
                    ? 'bg-white dark:bg-gray-600 text-purple-600 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <Building className="w-4 h-4 mx-auto mb-1" />
                Academy
              </button>
              <button
                type="button"
                onClick={() => setLoginType('student')}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginType === 'student'
                    ? 'bg-white dark:bg-gray-600 text-purple-600 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <User className="w-4 h-4 mx-auto mb-1" />
                Student
              </button>
              <button
                type="button"
                onClick={() => setLoginType('teacher')}
                className={`py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginType === 'teacher'
                    ? 'bg-white dark:bg-gray-600 text-purple-600 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <BookOpen className="w-4 h-4 mx-auto mb-1" />
                Teacher
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            {loginType === 'academy' ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="academyId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Academy ID
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="academyId"
                      type="text"
                      value={academyId}
                      onChange={(e) => setAcademyId(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Enter your academy ID"
                      required
                    />
                  </div>
                </div>

                {loginType === 'student' && (
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Student ID
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="studentId"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your student ID"
                        required
                      />
                    </div>
                  </div>
                )}

                {loginType === 'teacher' && (
                  <div>
                    <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Teacher ID
                    </label>
                    <div className="relative">
                      <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="teacherId"
                        type="text"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your teacher ID"
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth (DD/MM/YYYY)
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      id="dateOfBirth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Select date of birth"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You can also manually enter in DD/MM/YYYY format</p>
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {loginType === 'academy' && (
            <div className="mt-6 text-center">
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Forgot your password?
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Don't have an account?{' '}
                <Link to="/register" className="text-purple-600 hover:text-purple-700 font-medium">
                  Register here
                </Link>
              </p>
            </div>
          )}

          <div className="mt-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-2">Demo Credentials:</p>
            <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Academy Admin:</p>
                <p>Email: academy@demo.com | Password: demo123</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Student:</p>
                <p>Academy ID: AC001 | Student ID: STU2025009 | DOB: 01/01/1990</p>
              </div>
              <div>
                <p className="font-medium text-gray-700 dark:text-gray-300">Teacher:</p>
                <p>Academy ID: AC001 | Teacher ID: TCH001 | DOB: 15/05/1985</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default Login;