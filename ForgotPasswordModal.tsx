import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'email' | 'sent'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError('Please enter a valid email address');
        return;
      }

      // Simulate password reset email sending
      // In a real implementation, this would call your backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setStep('sent');
      setMessage(`Password reset instructions have been sent to ${email}`);
    } catch (err) {
      setError('Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setMessage('');
    setStep('email');
    setLoading(false);
    onClose();
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
              <h2 className="text-xl font-semibold">
                {step === 'email' ? 'Reset Password' : 'Check Your Email'}
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
              {step === 'email' ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                      Enter your email address and we'll send you instructions to reset your password.
                    </p>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-600" />
                      <span className="text-red-700">{error}</span>
                    </div>
                  )}

                  <div>
                    <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        id="reset-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Enter your email address"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

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
                      disabled={loading || !email}
                      className="flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send Reset Link'
                      )}
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Email Sent!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {message}
                    </p>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Didn't receive the email?</strong><br />
                      Check your spam folder or try again with a different email address.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ForgotPasswordModal;
