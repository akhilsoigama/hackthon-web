import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaChartBar,
  FaCalendarAlt,
  FaUserTie,
  FaBuilding,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaCopy,
  FaArchive,
  FaBars,
  FaTimes
} from 'react-icons/fa';

// Type definitions
interface Survey {
  id: string;
  title: string;
  department: string;
  status: 'draft' | 'active' | 'completed' | 'archived';
  responses: number;
  createdAt: string;
  endDate: string;
  questions: number;
}

const GovtServeyList: React.FC = () => {
  // Sample survey data
  const [surveys, setSurveys] = useState<Survey[]>([
    {
      id: '1',
      title: 'Public Health Infrastructure Feedback',
      department: 'health',
      status: 'active',
      responses: 1245,
      createdAt: '2023-10-15',
      endDate: '2023-12-15',
      questions: 12
    },
    {
      id: '2',
      title: 'Education Policy Satisfaction Survey',
      department: 'education',
      status: 'active',
      responses: 876,
      createdAt: '2023-11-01',
      endDate: '2023-12-31',
      questions: 15
    },
    {
      id: '3',
      title: 'Transportation System Improvement',
      department: 'transport',
      status: 'draft',
      responses: 0,
      createdAt: '2023-11-20',
      endDate: '2024-02-20',
      questions: 10
    },
    {
      id: '4',
      title: 'Taxation System Feedback',
      department: 'finance',
      status: 'completed',
      responses: 2103,
      createdAt: '2023-08-10',
      endDate: '2023-10-10',
      questions: 18
    },
    {
      id: '5',
      title: 'Public Parks Usage Patterns',
      department: 'environment',
      status: 'archived',
      responses: 542,
      createdAt: '2023-05-22',
      endDate: '2023-07-22',
      questions: 8
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [departmentFilter, setDepartmentFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Survey; direction: 'ascending' | 'descending' } | null>(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowMobileFilters(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle sorting
  const handleSort = (key: keyof Survey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted surveys
  const getSortedSurveys = () => {
    if (!sortConfig) return surveys;
    
    return [...surveys].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter surveys based on search term and filters
  const filteredSurveys = getSortedSurveys().filter(survey => {
    const matchesSearch = survey.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || survey.status === statusFilter;
    const matchesDepartment = departmentFilter === 'all' || survey.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  // Get department name from key
  const getDepartmentName = (key: string) => {
    const departments: Record<string, string> = {
      health: 'Health',
      education: 'Education',
      transport: 'Transport',
      finance: 'Finance',
      environment: 'Environment'
    };
    return departments[key] || key;
  };

  // Get status badge style
  const getStatusBadge = (status: string) => {
    const statusStyles: Record<string, string> = {
      draft: 'bg-gray-100 text-gray-800',
      active: 'bg-green-100 text-green-800',
      completed: 'bg-blue-100 text-blue-800',
      archived: 'bg-purple-100 text-purple-800'
    };
    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  // Render sort icon
  const renderSortIcon = (key: keyof Survey) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ml-1" />;
    return <FaSortDown className="ml-1" />;
  };

  // Delete a survey
  const deleteSurvey = (id: string) => {
    if (window.confirm('Are you sure you want to delete this survey?')) {
      setSurveys(surveys.filter(survey => survey.id !== id));
    }
  };

  // Duplicate a survey
  const duplicateSurvey = (survey: Survey) => {
    const newSurvey = {
      ...survey,
      id: Date.now().toString(),
      title: `${survey.title} (Copy)`,
      status: 'draft' as const,
      responses: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setSurveys([...surveys, newSurvey]);
  };

  // Toggle mobile filters
  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaBuilding className="mr-3 text-blue-600" />
            Government Surveys
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            Manage and track all government surveys in one place
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <button
            onClick={toggleMobileFilters}
            className="flex items-center justify-center w-full py-2 bg-white rounded-lg shadow-md"
          >
            <FaFilter className="mr-2 text-gray-600" />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            {showMobileFilters ? (
              <FaTimes className="ml-2 text-gray-600" />
            ) : (
              <FaBars className="ml-2 text-gray-600" />
            )}
          </button>
        </div>

        {/* Filters and Search */}
        <AnimatePresence>
          {(!isMobile || showMobileFilters) && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6 overflow-hidden"
            >
              <div className="flex flex-col gap-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search surveys..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <FaFilter className="text-gray-400 mr-2 flex-shrink-0" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                    >
                      <option value="all">All Statuses</option>
                      <option value="draft">Draft</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
                  >
                    <option value="all">All Departments</option>
                    <option value="health">Health Department</option>
                    <option value="education">Education Department</option>
                    <option value="transport">Transport Department</option>
                    <option value="finance">Finance Department</option>
                    <option value="environment">Environment Department</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Survey List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Table Header - Hidden on mobile, shown on tablet and desktop */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700">
            <div 
              className="col-span-5 flex items-center cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Title {renderSortIcon('title')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('department')}
            >
              Department {renderSortIcon('department')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status {renderSortIcon('status')}
            </div>
            <div 
              className="col-span-1 flex items-center cursor-pointer"
              onClick={() => handleSort('responses')}
            >
              Responses {renderSortIcon('responses')}
            </div>
            <div className="col-span-2 text-center">Actions</div>
          </div>

          {/* Survey Items */}
          {filteredSurveys.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No surveys found. Try adjusting your search or filters.
            </div>
          ) : (
            filteredSurveys.map((survey, index) => (
              <motion.div
                key={survey.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200"
              >
                {/* Mobile Card View */}
                <div className="md:hidden space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="font-medium text-gray-900">{survey.title}</div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(survey.status)}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <FaUserTie className="text-gray-400 mr-2" />
                    <span>{getDepartmentName(survey.department)}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <FaChartBar className="text-gray-400 mr-2" />
                    <span>{survey.responses.toLocaleString()} responses</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <FaCalendarAlt className="mr-1" />
                    <span>Created: {survey.createdAt}</span>
                    <span className="mx-2">•</span>
                    <span>Ends: {survey.endDate}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{survey.questions} questions</span>
                  </div>
                  
                  <div className="flex justify-center space-x-2 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      title="View Survey"
                    >
                      <FaEye />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                      title="Edit Survey"
                    >
                      <FaEdit />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => duplicateSurvey(survey)}
                      className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                      title="Duplicate Survey"
                    >
                      <FaCopy />
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => deleteSurvey(survey.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      title="Delete Survey"
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </div>
                
                {/* Desktop Table View */}
                <div className="hidden md:block md:col-span-5">
                  <div className="font-medium text-gray-900">{survey.title}</div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <FaCalendarAlt className="mr-1" />
                    <span>Created: {survey.createdAt}</span>
                    <span className="mx-2">•</span>
                    <span>Ends: {survey.endDate}</span>
                    <span className="mx-2">•</span>
                    <span>{survey.questions} questions</span>
                  </div>
                </div>
                
                <div className="hidden md:flex md:col-span-2 md:items-center">
                  <FaUserTie className="text-gray-400 mr-2" />
                  <span>{getDepartmentName(survey.department)}</span>
                </div>
                
                <div className="hidden md:block md:col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(survey.status)}`}>
                    {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                  </span>
                </div>
                
                <div className="hidden md:flex md:col-span-1 md:items-center">
                  <FaChartBar className="text-gray-400 mr-1" />
                  <span>{survey.responses.toLocaleString()}</span>
                </div>
                
                <div className="hidden md:flex md:col-span-2 md:items-center md:justify-center md:space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                    title="View Survey"
                  >
                    <FaEye />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                    title="Edit Survey"
                  >
                    <FaEdit />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => duplicateSurvey(survey)}
                    className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                    title="Duplicate Survey"
                  >
                    <FaCopy />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteSurvey(survey.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                    title="Delete Survey"
                  >
                    <FaTrash />
                  </motion.button>
                </div>
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Summary Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mt-6"
        >
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaBuilding className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Surveys</p>
              <p className="text-xl md:text-2xl font-bold">{surveys.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaChartBar className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Active Surveys</p>
              <p className="text-xl md:text-2xl font-bold">{surveys.filter(s => s.status === 'active').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-purple-100 p-3 mr-4">
              <FaEye className="text-purple-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Responses</p>
              <p className="text-xl md:text-2xl font-bold">{surveys.reduce((acc, s) => acc + s.responses, 0).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-gray-100 p-3 mr-4">
              <FaArchive className="text-gray-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Draft Surveys</p>
              <p className="text-xl md:text-2xl font-bold">{surveys.filter(s => s.status === 'draft').length}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GovtServeyList;