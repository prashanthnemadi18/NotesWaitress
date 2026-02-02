import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';

const Breadcrumb = ({ path, onGoBack }) => {
  if (path.length === 0) return null;

  return (
    <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm flex-wrap">
          {/* Home */}
          <motion.button
            onClick={() => onGoBack(-1)}
            className="flex items-center gap-2 px-3 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg font-semibold transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </motion.button>

          {/* Path Items */}
          {path.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-gray-400" />
              {index < path.length - 1 ? (
                <motion.button
                  onClick={() => onGoBack(index)}
                  className="px-3 py-2 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg font-semibold transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.button>
              ) : (
                <span className="px-3 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-bold shadow-md">
                  {item}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
};

Breadcrumb.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
  onGoBack: PropTypes.func.isRequired,
};

export default Breadcrumb;
