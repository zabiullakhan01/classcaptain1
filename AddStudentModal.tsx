import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Phone, Calendar, MapPin, GraduationCap, Users, Car as IdCard, Key } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: any) => void;
  availableBatches?: any[];
}

const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onSave, availableBatches = [] }) => {
  const [formData, setFormData] = useState({
    studentName: '',
    studentId: '',
    rollNumber: '',
    fatherName: '',
    dateOfBirth: '',
    mobileNumber1: '',
    mobileNumber2: '',
    gender: 'Male',
    address: '',
    admissionDate: '',
    password: '',
    transportUse: 'NO TRANSPORT USE',
    idNumber: '',
    field1: '',
    field2: '',
    selectedBatches: [] as string[]
  });

  const [errors, setErrors] = useState<Record<string, string>>({});


  const generateStudentId = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.random().toString(36).substr(2, 3).toUpperCase();
    return `STU${timestamp}${random}`;
  };

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

  const handleBatchChange = (batch: string) => {
    setFormData(prev => ({
      ...prev,
      selectedBatches: prev.selectedBatches.includes(batch)
        ? prev.selectedBatches.filter(b => b !== batch)
        : [...prev.selectedBatches, batch]
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim()) newErrors.studentName = 'Student name is required';
    if (!formData.studentId.trim()) newErrors.studentId = 'Student ID is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.mobileNumber1.trim()) newErrors.mobileNumber1 = 'Mobile number is required';
    if (!formData.admissionDate) newErrors.admissionDate = 'Admission date is required';
    if (!formData.password.trim()) newErrors.password = 'Password is required';

    // Validate mobile number format
    if (formData.mobileNumber1 && !/^\d{10}$/.test(formData.mobileNumber1)) {
      newErrors.mobileNumber1 = 'Mobile number must be 10 digits';
    }

    // Validate date format (DD/MM/YYYY)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (formData.dateOfBirth && !dateRegex.test(formData.dateOfBirth)) {
      newErrors.dateOfBirth = 'Date must be in DD/MM/YYYY format';
    }
    if (formData.admissionDate && !dateRegex.test(formData.admissionDate)) {
      newErrors.admissionDate = 'Date must be in DD/MM/YYYY format';
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
      studentName: '',
      studentId: '',
      rollNumber: '',
      fatherName: '',
      dateOfBirth: '',
      mobileNumber1: '',
      mobileNumber2: '',
      gender: 'Male',
      address: '',
      admissionDate: '',
      password: '',
      transportUse: 'NO TRANSPORT USE',
      idNumber: '',
      field1: '',
      field2: '',
      selectedBatches: []
    });
    setErrors({});
    onClose();
  };

  const formatDateInput = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as DD/MM/YYYY
    if (digits.length >= 8) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    } else if (digits.length >= 4) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
    } else if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    return digits;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formattedValue = formatDateInput(value);
    setFormData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Student</h2>
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
                  Student Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.studentName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter student name"
                  />
                </div>
                {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Student ID *
                </label>
                <div className="relative">
                  <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.studentId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter student ID"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, studentId: generateStudentId() }))}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-600 hover:text-teal-700 text-sm font-medium"
                  >
                    Generate
                  </button>
                </div>
                {errors.studentId && <p className="text-red-500 text-sm mt-1">{errors.studentId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter roll number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Father's Name *
                </label>
                <input
                  type="text"
                  name="fatherName"
                  value={formData.fatherName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.fatherName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter father's name"
                />
                {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth * (DD/MM/YYYY)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleDateChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number 1 *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobileNumber1"
                    value={formData.mobileNumber1}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.mobileNumber1 ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter mobile number"
                    maxLength={10}
                  />
                </div>
                {errors.mobileNumber1 && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber1}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Mobile Number 2
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="tel"
                    name="mobileNumber2"
                    value={formData.mobileNumber2}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Enter alternate mobile number"
                    maxLength={10}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Admission Date * (DD/MM/YYYY)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    name="admissionDate"
                    value={formData.admissionDate}
                    onChange={handleDateChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.admissionDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="DD/MM/YYYY"
                    maxLength={10}
                  />
                </div>
                {errors.admissionDate && <p className="text-red-500 text-sm mt-1">{errors.admissionDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter password"
                  />
                </div>
                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Transport Use
                </label>
                <select
                  name="transportUse"
                  value={formData.transportUse}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option value="NO TRANSPORT USE">No Transport Use</option>
                  <option value="TRANSPORT USE">Transport Use</option>
                </select>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter address"
                />
              </div>
            </div>

            {/* Batches */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assign to Batches
              </label>
              {availableBatches.length === 0 ? (
                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                  <p className="text-yellow-800 dark:text-yellow-200 text-sm">
                    No batches available. Create batches first to assign students.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 dark:border-gray-600 rounded-lg p-3">
                  {availableBatches.map((batch) => (
                    <label
                      key={batch.id}
                      className="flex items-center space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedBatches.includes(batch.name)}
                        onChange={() => handleBatchChange(batch.name)}
                        className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 dark:text-white">{batch.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {batch.subject} • {batch.schedule}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}

              {/* Selected Batches Summary */}
              {formData.selectedBatches.length > 0 && (
                <div className="mt-3 bg-teal-50 dark:bg-teal-900 border border-teal-200 dark:border-teal-700 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-teal-800 dark:text-teal-200 mb-2">
                    Selected Batches ({formData.selectedBatches.length}):
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.selectedBatches.map((batchName) => (
                      <span
                        key={batchName}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-teal-100 text-teal-800 dark:bg-teal-800 dark:text-teal-100"
                      >
                        {batchName}
                        <button
                          type="button"
                          onClick={() => handleBatchChange(batchName)}
                          className="ml-1 text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {/* Additional Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ID Number
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter ID number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field 1
                </label>
                <input
                  type="text"
                  name="field1"
                  value={formData.field1}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Custom field 1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Field 2
                </label>
                <input
                  type="text"
                  name="field2"
                  value={formData.field2}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Custom field 2"
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
                Add Student
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AddStudentModal;
