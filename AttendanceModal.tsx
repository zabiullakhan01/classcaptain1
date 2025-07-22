import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Calendar, 
  Users, 
  ChevronLeft,
  ChevronRight,
  Search,
  Info,
  Clock,
  CheckCircle,
  XCircle,
  Minus,
  Home,
  Plane
} from 'lucide-react';
import { format, addDays, subDays } from 'date-fns';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  batches: any[];
  students: any[];
}

interface Batch {
  id: string;
  name: string;
  time: string;
  present: number;
  absent: number;
  leave: number;
  total: number;
}

interface Student {
  id: string;
  rollNumber: string;
  name: string;
  batch: string;
  category: string;
  status: 'Not Set' | 'Present' | 'Absent' | 'Leave' | 'Holiday';
}

const AttendanceModal: React.FC<AttendanceModalProps> = ({ isOpen, onClose, batches: propBatches, students: propStudents }) => {
  const [currentView, setCurrentView] = useState<'batch-selection' | 'take-attendance'>('batch-selection');
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);

  // Convert prop batches to the expected format
  const batches: Batch[] = propBatches.map(batch => ({
    id: batch.id,
    name: batch.name,
    time: batch.schedule?.split(' - ')[1]?.split(' ')[0] || '18:45',
    present: 0,
    absent: 0,
    leave: 0,
    total: propStudents.filter(student => student.batch === batch.name).length
  }));


  useEffect(() => {
    if (selectedBatch) {
      const batchStudents = propStudents
        .filter(student => student.batch === selectedBatch.name)
        .map(student => ({
          id: student.id,
          rollNumber: student.roll_number || 'N/A',
          name: student.name,
          batch: student.batch || 'Not Assigned',
          category: 'STUDENT',
          status: 'Not Set' as Student['status']
        }));
      setFilteredStudents(batchStudents);
    }
  }, [selectedBatch, propStudents]);

  const handleBatchSelect = (batch: Batch) => {
    setSelectedBatch(batch);
    setCurrentView('take-attendance');
  };

  const handleBackToBatches = () => {
    setCurrentView('batch-selection');
    setSelectedBatch(null);
    setSearchTerm('');
  };

  const handleDateChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentDate(subDays(currentDate, 1));
    } else {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  const handleStatusChange = (studentId: string, status: Student['status']) => {
    setFilteredStudents(prev => prev.map(student => 
      student.id === studentId ? { ...student, status } : student
    ));
  };

  const handleSetAllStatus = (status: Student['status']) => {
    setFilteredStudents(prev => prev.map(student => ({ ...student, status })));
  };

  const searchFilteredStudents = filteredStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.includes(searchTerm)
  );

  const getStatusColor = (status: Student['status']) => {
    switch (status) {
      case 'Present': return 'bg-green-500 text-white';
      case 'Absent': return 'bg-red-500 text-white';
      case 'Leave': return 'bg-orange-500 text-white';
      case 'Holiday': return 'bg-purple-500 text-white';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getStatusIcon = (status: Student['status']) => {
    switch (status) {
      case 'Present': return <CheckCircle className="w-4 h-4" />;
      case 'Absent': return <XCircle className="w-4 h-4" />;
      case 'Leave': return <Plane className="w-4 h-4" />;
      case 'Holiday': return <Home className="w-4 h-4" />;
      default: return <Minus className="w-4 h-4" />;
    }
  };

  const BatchSelectionView = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <Users className="w-6 h-6" />
          Select Batch
        </h2>
        <div className="flex items-center gap-2">
          <Search className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {batches.map((batch) => (
          <motion.div
            key={batch.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => handleBatchSelect(batch)}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 cursor-pointer hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-blue-600 dark:text-blue-400 text-lg">
                {batch.name}
              </h3>
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">{batch.time}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                  {batch.present}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Present</div>
              </div>
              <div className="text-center">
                <div className="text-red-600 dark:text-red-400 font-bold text-lg">
                  {batch.absent}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Absent</div>
              </div>
              <div className="text-center">
                <div className="text-orange-600 dark:text-orange-400 font-bold text-lg">
                  {batch.leave}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Leave</div>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Students: {batch.total}
              </p>
            </div>
          </motion.div>
        ))}
        
        {batches.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Batches Available</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create batches first to take attendance.
            </p>
          </div>
        )}
      </div>
    </div>
  );

  const TakeAttendanceView = () => (
    <div className="space-y-4">
      {/* Header with date navigation */}
      <div className="bg-blue-500 text-white p-4 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <button
            onClick={handleBackToBatches}
            className="p-2 hover:bg-blue-600 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold">Take Attendance</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm">SMS</span>
            <button className="p-2 hover:bg-blue-600 rounded-lg transition-colors">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-blue-600 rounded-lg p-3">
          <button
            onClick={() => handleDateChange('prev')}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="text-xl font-bold">
              {format(currentDate, 'dd-MM-yyyy')}
            </div>
          </div>
          <button
            onClick={() => handleDateChange('next')}
            className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick set all buttons */}
      <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 text-center">
          Click to set all
        </p>
        <div className="flex gap-2 justify-center flex-wrap">
          <button
            onClick={() => handleSetAllStatus('Not Set')}
            className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm hover:bg-blue-600 transition-colors"
          >
            Not Set
          </button>
          <button
            onClick={() => handleSetAllStatus('Holiday')}
            className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm hover:bg-purple-600 transition-colors"
          >
            Holiday
          </button>
          <button
            onClick={() => handleSetAllStatus('Leave')}
            className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm hover:bg-orange-600 transition-colors"
          >
            Leave
          </button>
          <button
            onClick={() => handleSetAllStatus('Present')}
            className="px-3 py-1 bg-green-500 text-white rounded-full text-sm hover:bg-green-600 transition-colors"
          >
            Present
          </button>
          <button
            onClick={() => handleSetAllStatus('Absent')}
            className="px-3 py-1 bg-red-500 text-white rounded-full text-sm hover:bg-red-600 transition-colors"
          >
            Absent
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Students list */}
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {searchFilteredStudents.map((student) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-blue-600 dark:text-blue-400 font-semibold">
                  {student.rollNumber}
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                {student.name}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {student.batch} • {student.category}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {(['Not Set', 'Holiday', 'Leave', 'Present', 'Absent'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => handleStatusChange(student.id, status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                    student.status === status
                      ? getStatusColor(status)
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                  }`}
                >
                  {getStatusIcon(status)}
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        ))}
        
        {searchFilteredStudents.length === 0 && filteredStudents.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">
              No students found matching "{searchTerm}"
            </p>
          </div>
        )}
        
        {filteredStudents.length === 0 && (
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Students in This Batch</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add students to this batch to take attendance.
            </p>
          </div>
        )}
      </div>

      {/* Save button */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Save Attendance
        </button>
      </div>
    </div>
  );

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
            <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                <h2 className="text-xl font-semibold">
                  {currentView === 'batch-selection' ? 'Attendance Management' : selectedBatch?.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              {currentView === 'batch-selection' ? <BatchSelectionView /> : <TakeAttendanceView />}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AttendanceModal;
