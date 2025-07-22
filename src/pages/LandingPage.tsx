import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Users, 
  Calendar, 
  BarChart3, 
  Shield, 
  Zap,
  GraduationCap,
  Clock
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Multi-Role Management",
      description: "Separate dashboards for academy admins, teachers, and students with role-based access control."
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Attendance Tracking",
      description: "Real-time attendance monitoring with automated notifications and detailed reports."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Grade Management",
      description: "Comprehensive grade tracking with analytics and performance insights."
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Batch Management",
      description: "Create and manage batches with student assignments and scheduling."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Access",
      description: "Enterprise-grade security with unique academy keys and encrypted data."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Instant notifications and live updates across all user roles."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-purple-600" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Class Captain</h1>
            </div>
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 text-purple-600 hover:text-purple-800 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Your Institute <span className="text-purple-600">Manager</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Streamline your coaching institute operations with our comprehensive management system. 
              Handle students, teachers, batches, and performance tracking all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="px-8 py-3 border border-purple-600 text-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-50 transition-colors"
              >
                Login
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Manage Your Institute
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Powerful features designed specifically for coaching institutes
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-purple-600 mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Institute?
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of institutes already using Class Captain to streamline their operations.
            </p>
            <Link
              to="/register"
              className="px-8 py-3 bg-purple-600 text-white rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center gap-2"
            >
              <Clock className="w-5 h-5" />
              Start Your Free Trial
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <GraduationCap className="w-8 h-8 text-purple-400" />
            <h4 className="text-2xl font-bold">Class Captain</h4>
          </div>
          <p className="text-gray-400">
            © 2024 Class Captain. All rights reserved. Your Institute Manager.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;