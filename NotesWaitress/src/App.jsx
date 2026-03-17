import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import FolderView from './components/FolderView';
import FileView from './components/FileView';
import { Loader2, Search, X } from 'lucide-react';

// Lazy load LoginPage
const LoginPage = lazy(() => import('./components/LoginPage'));

// Main Dashboard Component
const Dashboard = () => {
  const [structure, setStructure] = useState({});
  const [currentPath, setCurrentPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetch('/notes-structure.json')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load notes structure');
        return res.json();
      })
      .then(data => {
        setStructure(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const navigateTo = (level, name) => {
    if (level === 'dept') setCurrentPath([name]);
    else if (level === 'semester') setCurrentPath([currentPath[0], name]);
    else if (level === 'subject') setCurrentPath([currentPath[0], currentPath[1], name]);
  };

  const goBack = (index) => {
    setCurrentPath(currentPath.slice(0, index + 1));
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    const results = [];
    const searchLower = value.toLowerCase();

    // Search through all departments, semesters, and subjects
    Object.entries(structure).forEach(([dept, semesters]) => {
      if (dept.toLowerCase().includes(searchLower)) {
        results.push({ type: 'Branch', name: dept, path: [dept] });
      }
      
      Object.entries(semesters).forEach(([semester, subjects]) => {
        if (semester.toLowerCase().includes(searchLower)) {
          results.push({ type: 'Semester', name: `${dept} - ${semester}`, path: [dept, semester], fullPath: `${dept} > ${semester}` });
        }
        
        Object.keys(subjects).forEach((subject) => {
          if (subject.toLowerCase().includes(searchLower)) {
            results.push({ 
              type: 'Subject', 
              name: subject, 
              path: [dept, semester, subject],
              fullPath: `${dept} > ${semester} > ${subject}`
            });
          }
        });
      });
    });

    setSearchResults(results.slice(0, 10)); // Limit to 10 results
  };

  const navigateToSearchResult = (path) => {
    setCurrentPath(path);
    setSearchTerm('');
    setSearchResults([]);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Loading notes...</p>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md">
            <p className="text-red-600 font-semibold mb-2">Error loading notes</p>
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        </div>
      );
    }

    if (currentPath.length === 0) {
      return <FolderView items={Object.keys(structure)} level="dept" onNavigate={navigateTo} />;
    } else if (currentPath.length === 1) {
      const dept = structure[currentPath[0]];
      return <FolderView items={Object.keys(dept)} level="semester" onNavigate={navigateTo} />;
    } else if (currentPath.length === 2) {
      const dept = structure[currentPath[0]];
      const semester = dept[currentPath[1]];
      return <FolderView items={Object.keys(semester)} level="subject" onNavigate={navigateTo} />;
    } else if (currentPath.length === 3) {
      const dept = structure[currentPath[0]];
      const semester = dept[currentPath[1]];
      const subject = semester[currentPath[2]];
      return <FileView files={subject} path={currentPath} />;
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      
      {/* Search Bar */}
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200 py-3 sm:py-5">
        <div className="container mx-auto px-4">
          <div className="relative max-w-3xl mx-auto">
            <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="🔍 Search branches, semesters, subjects..."
              className="w-full pl-10 sm:pl-12 pr-10 sm:pr-12 py-3 sm:py-4 border-2 border-gray-200 rounded-xl sm:rounded-2xl focus:border-indigo-500 focus:outline-none transition-all bg-white shadow-sm hover:shadow-md text-gray-800 placeholder-gray-400 font-medium text-sm sm:text-base"
            />
            {searchTerm && (
              <motion.button
                onClick={() => {
                  setSearchTerm('');
                  setSearchResults([]);
                }}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
            
            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <motion.div
                className="absolute top-full left-0 right-0 mt-2 sm:mt-3 bg-white rounded-xl sm:rounded-2xl shadow-2xl max-h-80 sm:max-h-96 overflow-y-auto z-50 border-2 border-gray-100"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {searchResults.map((result, index) => (
                  <motion.button
                    key={index}
                    onClick={() => navigateToSearchResult(result.path)}
                    className="w-full text-left px-3 sm:px-5 py-3 sm:py-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all border-b border-gray-100 last:border-b-0 first:rounded-t-xl first:sm:rounded-t-2xl last:rounded-b-xl last:sm:rounded-b-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <Search className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 truncate text-sm sm:text-base">{result.name}</p>
                        {result.fullPath && (
                          <p className="text-xs text-gray-500 truncate">{result.fullPath}</p>
                        )}
                      </div>
                      <span className="text-xs bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-2 sm:px-3 py-1 sm:py-1.5 rounded-full font-semibold shadow-sm">
                        {result.type}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
      
      <Breadcrumb path={currentPath} onGoBack={goBack} />
      
      <motion.main
        className="container mx-auto px-4 py-6 sm:py-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* Welcome Message */}
        {currentPath.length === 0 && !loading && (
          <motion.div
            className="mb-6 sm:mb-10 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="inline-block mb-3 sm:mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <span className="text-4xl sm:text-6xl">👋</span>
            </motion.div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome back, {user?.name}!
            </h2>
            <p className="text-gray-600 text-base sm:text-lg px-4">
              Select a branch to explore premium study materials
            </p>
          </motion.div>
        )}
        
        {renderContent()}
      </motion.main>
    </motion.div>
  );
};

// App Component with Auth Logic
const AppContent = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        <div className="text-center">
          <Loader2 className="w-16 h-16 animate-spin text-white mx-auto mb-4" />
          <p className="text-white font-semibold text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {isAuthenticated ? (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Dashboard />
        </motion.div>
      ) : (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
              <div className="text-center">
                <Loader2 className="w-16 h-16 animate-spin text-white mx-auto mb-4" />
                <p className="text-white font-semibold text-lg">Loading...</p>
              </div>
            </div>
          }>
            <LoginPage />
          </Suspense>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Root App Component
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
