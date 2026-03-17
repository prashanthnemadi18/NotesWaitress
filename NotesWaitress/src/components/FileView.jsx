import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FileText, Download, ExternalLink, Sparkles, FolderOpen } from 'lucide-react';

const FileView = ({ files, path }) => {
  const getFileUrl = (filename) => {
    return `/notes/${path.join('/')}/${filename}`;
  };

  if (files.length === 0) {
    return (
      <motion.div
        className="text-center py-20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border-2 border-dashed border-indigo-200 p-16 max-w-2xl mx-auto">
          <motion.div
            animate={{ 
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <FolderOpen className="w-24 h-24 text-indigo-300 mx-auto mb-6" />
          </motion.div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No Files Available Yet</h3>
          <p className="text-gray-600 mb-4">
            Study materials for this subject will be uploaded soon.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm text-gray-600 shadow-sm">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Check back later for updates</span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Section Title */}
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Available Resources
          </h2>
          <Sparkles className="w-5 h-5 text-purple-600" />
        </div>
        <p className="text-gray-600">{files.length} files ready to download</p>
      </motion.div>

      {/* Files Grid */}
      <div className="grid gap-3 sm:gap-4">
        {files.map((file, index) => (
          <motion.div
            key={index}
            className="group bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-indigo-200 relative overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Gradient Background on Hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              {/* File Info */}
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 w-full sm:w-auto">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-800 truncate text-base sm:text-lg group-hover:text-indigo-600 transition-colors">
                    {file}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full font-medium">
                      PDF Document
                    </span>
                    <span className="text-xs text-gray-500 hidden sm:inline">• Ready to download</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0 w-full sm:w-auto justify-end">
                <motion.a
                  href={getFileUrl(file)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View</span>
                </motion.a>
                <motion.a
                  href={getFileUrl(file)}
                  download
                  className="flex-1 sm:flex-none px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg sm:rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-semibold shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </motion.a>
              </div>
            </div>

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 pointer-events-none"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

FileView.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string).isRequired,
  path: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FileView;
