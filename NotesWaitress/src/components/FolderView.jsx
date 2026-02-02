import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Folder, ChevronRight, Sparkles } from 'lucide-react';

const getGradientColors = (index) => {
  const gradients = [
    { from: 'from-blue-500', to: 'to-cyan-500', bg: 'bg-blue-500' },
    { from: 'from-purple-500', to: 'to-pink-500', bg: 'bg-purple-500' },
    { from: 'from-green-500', to: 'to-emerald-500', bg: 'bg-green-500' },
    { from: 'from-orange-500', to: 'to-red-500', bg: 'bg-orange-500' },
    { from: 'from-indigo-500', to: 'to-purple-500', bg: 'bg-indigo-500' },
    { from: 'from-pink-500', to: 'to-rose-500', bg: 'bg-pink-500' },
    { from: 'from-teal-500', to: 'to-cyan-500', bg: 'bg-teal-500' },
    { from: 'from-amber-500', to: 'to-orange-500', bg: 'bg-amber-500' },
  ];
  return gradients[index % gradients.length];
};

const getLevelLabel = (level) => {
  const labels = {
    dept: 'Branch',
    semester: 'Semester',
    subject: 'Subject'
  };
  return labels[level] || level;
};

const FolderView = ({ items, level, onNavigate }) => {
  return (
    <div className="space-y-6">
      {/* Section Title */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Choose Your {getLevelLabel(level)}
          </h2>
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-gray-600">Select from {items.length} available options</p>
      </motion.div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {items.map((item, index) => {
          const colors = getGradientColors(index);
          return (
            <motion.button
              key={item}
              onClick={() => onNavigate(level, item)}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent overflow-hidden"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.05,
                ease: 'easeOut'
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
              
              {/* Decorative Corner */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.from} ${colors.to} opacity-5 rounded-bl-full`} />

              {/* Content */}
              <div className="relative">
                {/* Icon Container */}
                <motion.div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${colors.from} ${colors.to} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
                  whileHover={{ 
                    rotate: [0, -10, 10, -10, 0],
                    scale: 1.1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Folder className="w-8 h-8 text-white" strokeWidth={2} />
                </motion.div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-800 mb-3 text-center line-clamp-2 min-h-[3rem] flex items-center justify-center group-hover:text-indigo-600 transition-colors">
                  {item}
                </h3>

                {/* Level Badge */}
                <div className="flex items-center justify-center mb-3">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${colors.from} ${colors.to} text-white shadow-md`}>
                    {getLevelLabel(level)}
                  </span>
                </div>

                {/* Hover Arrow */}
                <motion.div
                  className="flex items-center justify-center text-gray-400 group-hover:text-indigo-600 transition-colors"
                  initial={{ x: -5, opacity: 0 }}
                  whileHover={{ x: 0, opacity: 1 }}
                >
                  <span className="text-sm font-medium mr-1">Explore</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>

              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

FolderView.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  level: PropTypes.string.isRequired,
  onNavigate: PropTypes.func.isRequired,
};

export default FolderView;
