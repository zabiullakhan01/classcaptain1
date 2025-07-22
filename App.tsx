import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AcademyDashboard from './pages/AcademyDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentDashboard from './pages/StudentDashboard';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route 
                path="/academy" 
                element={
                  <ProtectedRoute role="academy">
                    <AcademyDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/teacher" 
                element={
                  <ProtectedRoute role="teacher">
                    <TeacherDashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/student" 
                element={
                  <ProtectedRoute role="student">
                    <StudentDashboard />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
