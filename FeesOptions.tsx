import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, HandCoins, CalendarCheck, FileText } from 'lucide-react';

interface FeesOptionsProps {
  onClose: () => void;
}

const FeesOptions: React.FC<FeesOptionsProps> = ({ onClose }) => {
  const feesItems = [
    {
      title: 'Pay Fees',
      icon: <HandCoins className="w-8 h-8 text-orange-500" />,
      description: 'Process student fee payments',
      onClick: () => console.log('Navigate to Pay Fees'),
    },
    {
      title: 'Fees Dues List',
      icon: <CalendarCheck className="w-8 h-8 text-orange-500" />,
      description: 'View outstanding fee balances',
      onClick: () => console.log('Navigate to Fees Dues List'),
    },
    {
      title: 'Fee Collection Report',
      icon: <FileText className="w-8 h-8 text-orange-500" />,
      description: 'Generate reports on fee collections',
      onClick: () => console.log('Navigate to Fee Collection Report'),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center bg-[#9E7FFF] text-white p-4 rounded-xl shadow-lg">
        <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold ml-4">Fees Options</h2>
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-1 gap-4">
        {feesItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onClick={item.onClick}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group flex items-center space-x-6"
          >
            <div className="p-4 bg-orange-100 dark:bg-orange-900 rounded-full group-hover:scale-110 transition-transform">
              {item.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default FeesOptions;
