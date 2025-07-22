import React from 'react';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, BookOpen, Calendar, Users, DollarSign, User } from 'lucide-react';

interface Batch {
  id: string;
  name: string;
  subject: string;
  teacher_id?: string;
  schedule: string;
  start_date: string;
  end_date?: string;
  max_students?: number;
  fees?: number;
  description?: string;
  academy_id: string;
  created_at: string;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
}

interface BatchesTabProps {
  batches: Batch[];
  teachers: Teacher[]; // To display teacher name instead of ID
  setShowAddBatch: (show: boolean) => void;
  onEditBatch: (batch: Batch) => void; // Placeholder for edit functionality
  onDeleteBatch: (batchId: string) => void; // Placeholder for delete functionality
}

const BatchesTab: React.FC<BatchesTabProps> = ({ batches, teachers, setShowAddBatch, onEditBatch, onDeleteBatch }) => {
  const getTeacherName = (teacherId?: string) => {
    if (!teacherId) return 'N/A';
    const teacher = teachers.find(t => t.id === teacherId);
    return teacher ? teacher.name : 'Unknown Teacher';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Batch Management</h2>
        <button
          onClick={() => setShowAddBatch(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Batch
        </button>
      </div>

      {batches.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm text-center flex flex-col items-center justify-center min-h-[300px]"
        >
          <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
          <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">No Batches Created Yet</p>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            It looks like you haven't created any batches. Start by adding your first batch to organize your classes.
          </p>
          <button
            onClick={() => setShowAddBatch(true)}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2 text-lg"
          >
            <Plus className="w-5 h-5" />
            Create Your First Batch
          </button>
        </motion.div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Batch Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Teacher</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Max Students</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fees</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {batches.map((batch) => (
                <tr key={batch.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{batch.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{batch.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{getTeacherName(batch.teacher_id)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{batch.schedule}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{batch.max_students || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{batch.fees ? `₹${batch.fees.toFixed(2)}` : 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex space-x-2">
                      <button onClick={() => onEditBatch(batch)} className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => onDeleteBatch(batch.id)} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchesTab;
