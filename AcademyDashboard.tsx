import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '../components/DashboardLayout';
import AddStudentModal from '../components/AddStudentModal';
import AttendanceModal from '../components/AttendanceModal';
import PasswordResetModal from '../components/PasswordResetModal';
import AddBatchModal from '../components/AddBatchModal';
import BatchesTab from '../components/BatchesTab'; // Import BatchesTab
import FeesOptions from './FeesOptions'; // Import FeesOptions
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { isSupabaseConfigured } from '../lib/supabase';
import { 
  Users, 
  BookOpen, 
  Calendar,
  DollarSign,
  ShoppingBag,
  Shield,
  HelpCircle,
  UserCheck,
  FileText,
  GraduationCap,
  BarChart3,
  ClipboardList,
  CheckSquare,
  MessageSquare,
  Globe,
  Truck,
  Settings,
  Phone,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  Award,
  Bell,
  Heart,
  HandCoins, // New icon for Pay Fees
  CalendarCheck, // New icon for Fees Dues List
  ArrowLeft // New icon for back button
} from 'lucide-react';

const AcademyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [batches, setBatches] = useState([]); // Fixed: Changed from [] to useState([])
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAttendance, setShowAttendance] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [showAddBatch, setShowAddBatch] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.academyKey) {
      fetchData();
    } else if (!user && !loading) {
      // If user is null and not loading, it means no session, so clear data
      setStudents([]);
      setTeachers([]);
      setBatches([]);
    }
  }, [user, loading]); // Depend on user and loading state

  const fetchData = async () => {
    setLoading(true);
    
    // Skip all database calls if Supabase is not properly configured
    if (!isSupabaseConfigured) {
      console.log('Supabase not configured, using empty data');
      setStudents([]);
      setTeachers([]);
      setBatches([]);
      setLoading(false);
      return;
    }

    try {
      // Initialize with empty arrays
      let studentsData: any[] = [];
      let teachersData: any[] = [];
      let batchesData: any[] = [];

      // Try to fetch students
      try {
        const { data: studentsResult, error: studentsError } = await supabase
          .from('students')
          .select('*')
          .eq('academy_id', user?.academyKey);
        
        if (studentsError && studentsError.code !== '42P01') {
          console.error('Error fetching students:', studentsError);
        } else if (!studentsError) {
          studentsData = studentsResult || [];
        }
      } catch (error) {
        console.log('Students table not available or fetch failed, using empty data');
      }

      // Try to fetch teachers
      try {
        const { data: teachersResult, error: teachersError } = await supabase
          .from('teachers')
          .select('*')
          .eq('academy_id', user?.academyKey);
        
        if (teachersError && teachersError.code !== '42P01') {
          console.error('Error fetching teachers:', teachersError);
        } else if (!teachersError) {
          teachersData = teachersResult || [];
        }
      } catch (error) {
        console.log('Teachers table not available or fetch failed, using empty data');
      }

      // Try to fetch batches
      try {
        const { data: batchesResult, error: batchesError } = await supabase
          .from('batches')
          .select('*')
          .eq('academy_id', user?.academyKey);
        
        if (batchesError && batchesError.code !== '42P01') {
          console.error('Error fetching batches:', batchesError);
        } else if (!batchesError) {
          batchesData = batchesResult || [];
        }
      } catch (error) {
        console.log('Batches table not available or fetch failed, using empty data');
      }

      // Set the state with fetched data (or empty arrays)
      setStudents(studentsData);
      setTeachers(teachersData);
      setBatches(batchesData);
      
    } catch (error) {
      console.log('Database fetch failed, using empty data');
      setStudents([]);
      setTeachers([]);
      setBatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddStudent = async (studentData) => {
    try {
      // Prepare student data for database insertion
      const dbStudentData = {
        name: studentData.studentName,
        email: `${studentData.studentId.toLowerCase()}@${user?.academyKey?.toLowerCase()}.com`,
        roll_number: studentData.rollNumber || null,
        father_name: studentData.fatherName,
        date_of_birth: studentData.dateOfBirth,
        mobile_number_1: studentData.mobileNumber1,
        mobile_number_2: studentData.mobileNumber2 || null,
        gender: studentData.gender,
        address: studentData.address || null,
        admission_date: studentData.admissionDate,
        academy_id: user?.academyKey,
        // password: studentData.password, // Password is now handled by Supabase Auth
        transport_use: studentData.transportUse,
        id_number: studentData.idNumber || null,
        field_1: studentData.field1 || null,
        field_2: studentData.field2 || null,
        student_id: studentData.studentId,
        batch: studentData.selectedBatches.join(', ') || 'General'
      };

      try {
        const { data, error } = await supabase
          .from('students')
          .insert([dbStudentData])
          .select();

        if (error) {
          if (error.code === '42P01') {
            // Table doesn't exist, store locally
            const localStudent = { ...dbStudentData, id: `student-${Date.now()}` };
            setStudents([...students, localStudent]);
            console.log('Student stored locally (database table not found)');
          } else {
            throw error;
          }
        } else if (data) {
          setStudents([...students, ...data]);
          console.log('Student added to database successfully');
        }
        
        setShowAddStudent(false);
        alert('Student added successfully!');
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fallback to local storage
        const localStudent = { ...dbStudentData, id: `student-${Date.now()}` };
        setStudents([...students, localStudent]);
        setShowAddStudent(false);
        alert('Student added successfully (stored locally)!');
      }
    } catch (error) {
      console.error('Error adding student:', error);
      alert('Failed to add student. Please try again.');
    }
  };

  const handleAddBatch = async (batchData: any) => {
    try {
      // Prepare batch data for database insertion
      const dbBatchData = {
        name: batchData.batchName,
        subject: batchData.subject,
        teacher_id: batchData.teacherId || null,
        academy_id: user?.academyKey,
        schedule: batchData.schedule,
        start_date: batchData.startDate || null,
        end_date: batchData.endDate || null,
        max_students: batchData.maxStudents ? parseInt(batchData.maxStudents) : null,
        fees: batchData.fees ? parseFloat(batchData.fees) : null,
        description: batchData.description || null
      };

      if (!isSupabaseConfigured) {
        // Store locally when Supabase is not configured
        const localBatch = { ...dbBatchData, id: `batch-${Date.now()}` };
        setBatches([...batches, localBatch]);
        console.log('Batch stored locally (Supabase not configured)');
        alert('Batch created successfully!');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('batches')
          .insert([dbBatchData])
          .select();

        if (error) {
          if (error.code === '42P01') {
            // Table doesn't exist, store locally
            const localBatch = { ...dbBatchData, id: `batch-${Date.now()}` };
            setBatches([...batches, localBatch]);
            console.log('Batch stored locally (database table not found)');
          } else {
            throw error;
          }
        } else {
          setBatches([...batches, ...data]);
          console.log('Batch added to database successfully');
        }
        
        alert('Batch created successfully!');
        fetchData(); // Re-fetch data to update the list
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Fallback to local storage
        const localBatch = { ...dbBatchData, id: `batch-${Date.now()}` };
        setBatches([...batches, localBatch]);
        alert('Batch created successfully (stored locally)!');
      }
    } catch (error) {
      console.error('Error adding batch:', error);
      alert('Failed to create batch. Please try again.');
    }
  };

  const handleEditBatch = (batch: any) => {
    console.log('Edit batch:', batch);
    // Implement edit logic here, e.g., open modal with pre-filled data
  };

  const handleDeleteBatch = async (batchId: string) => {
    if (!window.confirm('Are you sure you want to delete this batch?')) {
      return;
    }

    if (!isSupabaseConfigured) {
      setBatches(batches.filter(b => b.id !== batchId));
      alert('Batch deleted locally (Supabase not configured)');
      return;
    }

    try {
      const { error } = await supabase
        .from('batches')
        .delete()
        .eq('id', batchId);

      if (error) {
        if (error.code === '42P01') {
          // Table doesn't exist, delete locally
          setBatches(batches.filter(b => b.id !== batchId));
          console.log('Batch deleted locally (database table not found)');
        } else {
          throw error;
        }
      } else {
        setBatches(batches.filter(b => b.id !== batchId));
        alert('Batch deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting batch:', error);
      alert('Failed to delete batch. Please try again.');
    }
  };

  const navigation = [
    { name: 'Dashboard', icon: <BarChart3 className="w-5 h-5" />, current: activeTab === 'overview', onClick: () => setActiveTab('overview') },
    { name: 'Batches', icon: <BookOpen className="w-5 h-5" />, current: activeTab === 'batches', onClick: () => setActiveTab('batches') } // Added Batches to navigation
  ];

  const dashboardItems = [
    {
      title: 'Batches',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-teal-600',
      onClick: () => setActiveTab('batches')
    },
    {
      title: 'Students',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-blue-600',
      onClick: () => setActiveTab('students')
    },
    {
      title: 'Attendance',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-purple-600',
      onClick: () => setShowAttendance(true)
    },
    {
      title: 'Tuition Fees',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'bg-green-600',
      onClick: () => setActiveTab('fees') // Changed to set activeTab to 'fees'
    },
    {
      title: 'Income/Expenses',
      icon: <ShoppingBag className="w-8 h-8" />,
      color: 'bg-orange-600',
      onClick: () => setActiveTab('income')
    },
    {
      title: 'Manage Exams',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-green-500',
      onClick: () => setActiveTab('exams')
    },
    {
      title: 'Enquiry Manager',
      icon: <HelpCircle className="w-8 h-8" />,
      color: 'bg-cyan-500',
      onClick: () => setActiveTab('enquiry')
    },
    {
      title: 'Staff Manager',
      icon: <UserCheck className="w-8 h-8" />,
      color: 'bg-teal-700',
      onClick: () => setActiveTab('staff')
    },
    {
      title: 'Reports',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-red-600',
      onClick: () => setActiveTab('reports')
    },
    {
      title: 'Study Material',
      icon: <GraduationCap className="w-8 h-8" />,
      color: 'bg-gray-800',
      onClick: () => setActiveTab('material')
    },
    {
      title: 'Homework',
      icon: <BarChart3 className="w-8 h-8" />,
      color: 'bg-green-400',
      onClick: () => setActiveTab('homework')
    },
    {
      title: 'Online Quiz',
      icon: <ClipboardList className="w-8 h-8" />,
      color: 'bg-blue-700',
      onClick: () => setActiveTab('quiz')
    },
    {
      title: 'Manage Behavior',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-green-500',
      onClick: () => setActiveTab('behavior')
    },
    {
      title: 'Leave Manager',
      icon: <Calendar className="w-8 h-8" />,
      color: 'bg-blue-600',
      onClick: () => setActiveTab('leave')
    },
    {
      title: 'To Do Task',
      icon: <CheckSquare className="w-8 h-8" />,
      color: 'bg-gray-600',
      onClick: () => setActiveTab('todo')
    },
    {
      title: 'Notice Board',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'bg-teal-700',
      onClick: () => setActiveTab('notice')
    },
    {
      title: 'Website Settings',
      icon: <Globe className="w-8 h-8" />,
      color: 'bg-purple-700',
      onClick: () => setActiveTab('website')
    },
    {
      title: 'Transport',
      icon: <Truck className="w-8 h-8" />,
      color: 'bg-orange-600',
      onClick: () => setActiveTab('transport')
    },
    {
      title: 'Settings',
      icon: <Settings className="w-8 h-8" />,
      color: 'bg-red-600',
      onClick: () => setActiveTab('settings')
    },
    {
      title: 'Contact Us',
      icon: <Phone className="w-8 h-8" />,
      color: 'bg-green-500',
      onClick: () => setActiveTab('contact')
    }
  ];

  const OverviewTab = () => (
    <div className="space-y-6">
      {/* Academy Header */}
      <div className="bg-teal-600 text-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name || 'SM TUTORIAL'}</h2>
            <p className="text-teal-100">{user?.email || 'smtutorials01@gmail.com'}</p>
            <p className="text-teal-200 text-sm">Academy ID: {user?.academyKey}</p>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {dashboardItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            onClick={item.onClick}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group"
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`${item.color} p-4 rounded-full text-white group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{students.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Teachers</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{teachers.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Batches</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{batches.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <Award className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">85%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Image */}
      <div className="relative bg-gradient-to-r from-green-400 to-blue-500 rounded-xl overflow-hidden h-64">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <GraduationCap className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Empowering Education</h3>
            <p className="text-lg opacity-90">Building the future, one student at a time</p>
          </div>
        </div>
      </div>

      {/* Made with Love in India */}
      <div className="text-center py-6">
        <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
          Made with <Heart className="w-5 h-5 text-red-500 fill-current" /> in India
        </p>
      </div>
    </div>
  );

  const StudentsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Students Management</h2>
        <button
          onClick={() => setShowAddStudent(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Roll No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Father Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {students.map((student) => (
              <tr key={student.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.roll_number || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.father_name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{student.mobile_number_1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button>
                    <button className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab />;
      case 'students':
        return <StudentsTab />;
      case 'batches': // New case for batches tab
        return (
          <BatchesTab
            batches={batches}
            teachers={teachers}
            setShowAddBatch={setShowAddBatch}
            onEditBatch={handleEditBatch}
            onDeleteBatch={handleDeleteBatch}
          />
        );
      case 'fees': // New case for fees options tab
        return <FeesOptions onClose={() => setActiveTab('overview')} />;
      default:
        return <OverviewTab />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <DashboardLayout navigation={navigation}>
      <AddStudentModal
        isOpen={showAddStudent}
        onClose={() => setShowAddStudent(false)}
        onSave={handleAddStudent}
        availableBatches={batches}
      />
      
      <AddBatchModal
        isOpen={showAddBatch}
        onClose={() => setShowAddBatch(false)}
        onSave={handleAddBatch}
        teachers={teachers}
      />
      
      <AttendanceModal
        isOpen={showAttendance}
        onClose={() => setShowAttendance(false)}
        batches={batches.filter(batch => batch.academy_id === user?.academyKey)}
        students={students}
      />
      
      <PasswordResetModal
        isOpen={showPasswordReset}
        onClose={() => setShowPasswordReset(false)}
      />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {renderContent()}
      </motion.div>
    </DashboardLayout>
  );
};

export default AcademyDashboard;
