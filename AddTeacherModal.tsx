import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Camera, 
  User, 
  Calendar, 
  Phone, 
  MapPin, 
  BookOpen,
  Key,
  CreditCard,
  Mail
} from 'lucide-react';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teacherData: any) => void;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    teacherId: '',
    teacherName: '',
    email: '',
    subject: '',
    dateOfBirth: '',
    mobileNumber: '',
    address: '',
    joiningDate: '',
    profileImage: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        profileImage: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.teacherName || !formData.subject || !formData.dateOfBirth || 
        !formData.teacherId || !formData.joiningDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Convert date format from YYYY-MM-DD to DD/MM/YYYY for storage
    const convertedData = {
      ...formData,
      dateOfBirth: convertDateToDisplay(formData.dateOfBirth),
      joiningDate: convertDateToDisplay(formData.joiningDate)
    };
    
    onSave(convertedData);
    // Reset form
    setFormData({
      teacherId: '',
      teacherName: '',
      email: '',
      subject: '',
      dateOfBirth: '',
      mobileNumber: '',
      address: '',
      joiningDate: '',
      profileImage: null
    });
  };

  const generateTeacherId = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    const teacherId = `TCH${timestamp}${random}`;
    setFormData(prev => ({ ...prev, teacherId }));
  };

  const convertDateToDisplay = (dateStr: string) => {
    if (dateStr && dateStr.includes('-')) {
      const [year, month, day] = dateStr.split('-');
      return `${day}/${month}/${year}`;
    }
    return dateStr;
  };

  const convertDateToInput = (dateStr: string) => {
    if (dateStr && dateStr.includes('/')) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
  };

  React.useEffect(() => {
    if (isOpen && !formData.teacherId) {
      generateTeacherId();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                New Teacher
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Profile Image */}
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center border-4 border-orange-400">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Teacher ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teacher ID (Required for Login)
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="teacherId"
                      value={formData.teacherId}
                      onChange={handleInputChange}
                      required
                      className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={generateTeacherId}
                      className="px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
                    >
                      <CreditCard className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Teacher Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Teacher Name
                  </label>
                  <input
                    type="text"
                    name="teacherName"
                    value={formData.teacherName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border-b-2 border-blue-500 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:border-blue-600"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter subject taught"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={convertDateToInput(formData.dateOfBirth)}
                      onChange={(e) => setFormData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      required
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format: DD/MM/YYYY</p>
                </div>

                {/* Mobile Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Mobile Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 text-sm">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="flex-1 p-4 border border-gray-300 dark:border-gray-600 rounded-r-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>

                {/* Address */}
                <div>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Address"
                    rows={3}
                    className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                </div>

                {/* Joining Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Joining Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="joiningDate"
                      value={convertDateToInput(formData.joiningDate)}
                      onChange={(e) => setFormData(prev => ({ ...prev, joiningDate: e.target.value }))}
                      required
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Format: DD/MM/YYYY</p>
                </div>
              </form>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 bg-gray-50 dark:bg-gray-700 flex gap-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 px-6 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                CANCEL
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                SAVE
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddTeacherModal;
