import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, AlertCircle, CheckCircle, Loader, Eye, EyeOff } from 'lucide-react';

interface PasswordResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PasswordResetModal: React.FC<PasswordResetModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(''); // Clear error when user types
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    if (!formData.currentPassword) {
      setError('Current password is required');
      return false;
    }
    if (!formData.newPassword) {
      setError('New password is required');
      return false;
    }
    if (formData.newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return false;
    }
    if (formData.currentPassword === formData.newPassword) {
      setError('New password must be different from current password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate password change API call
      // In a real implementation, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // For demo purposes, we'll just show success
      setSuccess(true);
    } catch (err) {
      setError('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setShowPasswords({
      current: false,
      new: false,
      confirm: false
    });
    setError('');
    setSuccess(false);
    setLoading(false);
    onClose();
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Weak';
    if (strength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-purple-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Change Password
              </h2>
              <button
                onClick={handleClose}
                className="p-2 hover:bg-purple-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {success ? (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Password Changed Successfully!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Your password has been updated. Please use your new password for future logins.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  )}

                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter current password"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter new password"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {formData.newPassword && (
                      <div className="mt-2">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(getPasswordStrength(formData.newPassword))}`}
                              style={{ width: `${(getPasswordStrength(formData.newPassword) / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {getStrengthText(getPasswordStrength(formData.newPassword))}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Confirm new password"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-2">
                      Password Requirements:
                    </p>
                    <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                      <li>• At least 6 characters long</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Include numbers and special characters</li>
                      <li>• Different from your current password</li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleClose}
                      className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.currentPassword || !formData.newPassword || !formData.confirmPassword}
                      className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Changing...
                        </>
                      ) : (
                        'Change Password'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PasswordResetModal;
