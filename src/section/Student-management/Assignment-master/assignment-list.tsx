import { useState } from 'react';
import { motion, } from 'framer-motion';
import {
  FaSearch,
  FaFilter,
  FaEdit,
  FaTrash,
  FaEye,
  FaClock,
  FaCalendarAlt,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaSort,
  FaSortUp,
  FaSortDown,
  FaDownload,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimesCircle,
  FaPlus
} from 'react-icons/fa';

// Define the Assignment interface
interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  dueTime: string;
  points: number;
  assignmentType: string;
  status: 'draft' | 'published' | 'completed';
  submissions: number;
  totalStudents: number;
  createdAt: string;
  description: string;
}

const AssignmentList = () => {
  // Sample assignment data
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Algebra Homework: Quadratic Equations',
      subject: 'Mathematics',
      dueDate: '2023-11-30',
      dueTime: '23:59',
      points: 100,
      assignmentType: 'Homework',
      status: 'published',
      submissions: 24,
      totalStudents: 30,
      createdAt: '2023-11-20',
      description: 'Solve the quadratic equations using the appropriate method.'
    },
    {
      id: '2',
      title: 'Science Project: Solar System',
      subject: 'Science',
      dueDate: '2023-12-15',
      dueTime: '23:59',
      points: 150,
      assignmentType: 'Project',
      status: 'published',
      submissions: 18,
      totalStudents: 30,
      createdAt: '2023-11-25',
      description: 'Create a model of the solar system with accurate planet sizes and distances.'
    },
    {
      id: '3',
      title: 'English Essay: Shakespeare Analysis',
      subject: 'English',
      dueDate: '2023-12-05',
      dueTime: '23:59',
      points: 100,
      assignmentType: 'Essay',
      status: 'draft',
      submissions: 0,
      totalStudents: 30,
      createdAt: '2023-11-28',
      description: 'Analyze the themes in Shakespeare\'s Macbeth.'
    },
    {
      id: '4',
      title: 'History Quiz: World War II',
      subject: 'History',
      dueDate: '2023-11-25',
      dueTime: '23:59',
      points: 50,
      assignmentType: 'Quiz',
      status: 'completed',
      submissions: 28,
      totalStudents: 30,
      createdAt: '2023-11-15',
      description: 'Multiple choice questions about key events in World War II.'
    },
    {
      id: '5',
      title: 'Art Assignment: Perspective Drawing',
      subject: 'Art',
      dueDate: '2023-12-10',
      dueTime: '23:59',
      points: 100,
      assignmentType: 'Project',
      status: 'published',
      submissions: 15,
      totalStudents: 25,
      createdAt: '2023-11-22',
      description: 'Create a perspective drawing of a cityscape.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Assignment; direction: 'ascending' | 'descending' } | null>(null);

  // Available filters
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art'];
  const assignmentTypes = ['Homework', 'Project', 'Quiz', 'Exam', 'Essay', 'Presentation'];
//   const statusOptions = ['draft', 'published', 'completed'];

  // Handle sorting
  const handleSort = (key: keyof Assignment) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted assignments
  const getSortedAssignments = () => {
    if (!sortConfig) return assignments;
    
    return [...assignments].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter assignments based on search term and filters
  const filteredAssignments = getSortedAssignments().filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         assignment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || assignment.subject === subjectFilter;
    const matchesType = typeFilter === 'all' || assignment.assignmentType.toLowerCase() === typeFilter;
    
    return matchesSearch && matchesStatus && matchesSubject && matchesType;
  });

  // Delete an assignment
  const deleteAssignment = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(assignments.filter(assignment => assignment.id !== id));
    }
  };

  // Get status badge style and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published':
        return { 
          style: 'bg-green-100 text-green-800',
          icon: <FaCheckCircle className="text-green-500" />
        };
      case 'draft':
        return { 
          style: 'bg-yellow-100 text-yellow-800',
          icon: <FaExclamationCircle className="text-yellow-500" />
        };
      case 'completed':
        return { 
          style: 'bg-blue-100 text-blue-800',
          icon: <FaTimesCircle className="text-blue-500" />
        };
      default:
        return { 
          style: 'bg-gray-100 text-gray-800',
          icon: <FaExclamationCircle className="text-gray-500" />
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if assignment is overdue
  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  // Render sort icon
  const renderSortIcon = (key: keyof Assignment) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ml-1" />;
    return <FaSortDown className="ml-1" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaChalkboardTeacher className="mr-3 text-indigo-600" />
            Assignments
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            Manage and track all assignments in one place
          </p>
        </div>

        {/* Filters and Search */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search assignments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center">
                <FaFilter className="text-gray-400 mr-2" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <select
                value={subjectFilter}
                onChange={(e) => setSubjectFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="all">All Subjects</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                {assignmentTypes.map(type => (
                  <option key={type} value={type.toLowerCase()}>{type}</option>
                ))}
              </select>

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                <FaPlus className="mr-2" />
                New Assignment
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-indigo-100 p-3 mr-4">
              <FaChalkboardTeacher className="text-indigo-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Assignments</p>
              <p className="text-xl md:text-2xl font-bold">{assignments.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Published</p>
              <p className="text-xl md:text-2xl font-bold">{assignments.filter(a => a.status === 'published').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FaExclamationCircle className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Drafts</p>
              <p className="text-xl md:text-2xl font-bold">{assignments.filter(a => a.status === 'draft').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaClock className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Completed</p>
              <p className="text-xl md:text-2xl font-bold">{assignments.filter(a => a.status === 'completed').length}</p>
            </div>
          </div>
        </motion.div>

        {/* Assignments List */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          {/* Table Header */}
          <div className="hidden md:grid md:grid-cols-12 gap-4 p-4 border-b border-gray-200 font-semibold text-gray-700 bg-gray-50">
            <div 
              className="col-span-4 flex items-center cursor-pointer"
              onClick={() => handleSort('title')}
            >
              Assignment {renderSortIcon('title')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('subject')}
            >
              Subject {renderSortIcon('subject')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('dueDate')}
            >
              Due Date {renderSortIcon('dueDate')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status {renderSortIcon('status')}
            </div>
            <div className="col-span-2 text-center">
              Actions
            </div>
          </div>

          {/* Assignment Items */}
          {filteredAssignments.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No assignments found. Try adjusting your search or filters.
            </div>
          ) : (
            filteredAssignments.map((assignment) => {
              const statusInfo = getStatusInfo(assignment.status);
              const isAssignmentOverdue = isOverdue(assignment.dueDate) && assignment.status !== 'completed';
              
              return (
                <div key={assignment.id} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors duration-200">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4">
                    <div className="md:col-span-4">
                      <div className="font-medium text-gray-900">{assignment.title}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">{assignment.description}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaGraduationCap className="mr-1" />
                        <span>{assignment.assignmentType}</span>
                        <span className="mx-2">•</span>
                        <span>{assignment.points} points</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {assignment.subject}
                      </span>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center">
                      <div>
                        <div className="flex items-center text-sm text-gray-500">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(assignment.dueDate)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FaClock className="mr-1" />
                          <span className={isAssignmentOverdue ? 'text-red-500 font-medium' : ''}>
                            {assignment.dueTime}
                            {isAssignmentOverdue && ' (Overdue)'}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.style}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}</span>
                        </span>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {assignment.submissions}/{assignment.totalStudents} submitted
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center justify-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        title="View Assignment"
                      >
                        <FaEye />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                        title="Edit Assignment"
                      >
                        <FaEdit />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                        title="Download Submissions"
                      >
                        <FaDownload />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteAssignment(assignment.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        title="Delete Assignment"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AssignmentList;