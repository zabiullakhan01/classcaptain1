import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  Calendar, 
  Clock, 
  Users, 
  DollarSign,
  FileText,
  User,
  GraduationCap
} from 'lucide-react';

interface AddBatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (batchData: any) => void;
  teachers: any[];
}

const AddBatchModal: React.FC<AddBatchModalProps> = ({ isOpen, onClose, onSave, teachers }) => {
  const [formData, setFormData] = useState({
    batchName: '',
    subject: '',
    teacherId: '',
    schedule: '',
    startDate: '',
    endDate: '',
    maxStudents: '',
    fees: '',
    description: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.batchName.trim()) newErrors.batchName = 'Batch name is required';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.schedule.trim()) newErrors.schedule = 'Schedule is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';

    // Validate max students if provided
    if (formData.maxStudents && (isNaN(Number(formData.maxStudents)) || Number(formData.maxStudents) <= 0)) {
      newErrors.maxStudents = 'Max students must be a positive number';
    }

    // Validate fees if provided
    if (formData.fees && (isNaN(Number(formData.fees)) || Number(formData.fees) < 0)) {
      newErrors.fees = 'Fees must be a valid amount';
    }

    // Validate end date if provided
    if (formData.endDate && formData.startDate && new Date(formData.endDate) <= new Date(formData.startDate)) {
      newErrors.endDate = 'End date must be after start date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      batchName: '',
      subject: '',
      teacherId: '',
      schedule: '',
      startDate: '',
      endDate: '',
      maxStudents: '',
      fees: '',
      description: ''
    });
    setErrors({});
    onClose();
  };

  const predefinedSubjects = [
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'Hindi',
    'Computer Science',
    'Economics',
    'Accountancy',
    'Business Studies',
    'History',
    'Geography',
    'Political Science',
    'Sociology',
    'Psychology'
  ];

  const scheduleOptions = [
    'Monday, Wednesday, Friday - 9:00 AM to 10:30 AM',
    'Tuesday, Thursday, Saturday - 9:00 AM to 10:30 AM',
    'Monday, Wednesday, Friday - 2:00 PM to 3:30 PM',
    'Tuesday, Thursday, Saturday - 2:00 PM to 3:30 PM',
    'Monday, Wednesday, Friday - 4:00 PM to 5:30 PM',
    'Tuesday, Thursday, Saturday - 4:00 PM to 5:30 PM',
    'Monday, Wednesday, Friday - 6:00 PM to 7:30 PM',
    'Tuesday, Thursday, Saturday - 6:00 PM to 7:30 PM',
    'Daily - 9:00 AM to 10:00 AM',
    'Daily - 2:00 PM to 3:00 PM',
    'Daily - 4:00 PM to 5:00 PM',
    'Daily - 6:00 PM to 7:00 PM',
    'Weekends Only - Saturday & Sunday 10:00 AM to 12:00 PM'
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-teal-600" />
              Create New Batch
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Batch Name *
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="batchName"
                    value={formData.batchName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.batchName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., SSLC - B1, II PUC Science"
                  />
                </div>
                {errors.batchName && <p className="text-red-500 text-sm mt-1">{errors.batchName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Subject</option>
                  {predefinedSubjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assign Teacher
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="teacherId"
                    value={formData.teacherId}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  >
                    <option value="">Select Teacher (Optional)</option>
                    {teachers.map((teacher) => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} - {teacher.subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Schedule *
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.schedule ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select Schedule</option>
                    {scheduleOptions.map((schedule) => (
                      <option key={schedule} value={schedule}>{schedule}</option>
                    ))}
                  </select>
                </div>
                {errors.schedule && <p className="text-red-500 text-sm mt-1">{errors.schedule}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.startDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.startDate && <p className="text-red-500 text-sm mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.endDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.endDate && <p className="text-red-500 text-sm mt-1">{errors.endDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Maximum Students
                </label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="maxStudents"
                    value={formData.maxStudents}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.maxStudents ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 30"
                    min="1"
                  />
                </div>
                {errors.maxStudents && <p className="text-red-500 text-sm mt-1">{errors.maxStudents}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Batch Fees (₹)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="number"
                    name="fees"
                    value={formData.fees}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.fees ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., 5000"
                    min="0"
                  />
                </div>
                {errors.fees && <p className="text-red-500 text-sm mt-1">{errors.fees}</p>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Brief description about the batch, curriculum, or special notes..."
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="button"
                onClick={handleClose}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Create Batch
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddBatchModal;
