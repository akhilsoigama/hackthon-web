import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaPlus,
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaListOl,
  FaPlay,
  FaCopy
} from 'react-icons/fa';

// Define the Quiz interface
interface Quiz {
  id: string;
  title: string;
  subject: string;
  gradeLevel: string;
  duration: number;
  questionCount: number;
  totalPoints: number;
  status: 'draft' | 'published' | 'completed' | 'archived';
  attempts: number;
  dueDate: string;
  availableFrom: string;
  availableTo: string;
  submissions: number;
  averageScore: number;
  createdAt: string;
  author: string;
}

const QuizList = () => {
  // Sample quiz data
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      title: 'Algebra Basics Quiz',
      subject: 'Mathematics',
      gradeLevel: '9th Grade',
      duration: 30,
      questionCount: 15,
      totalPoints: 100,
      status: 'published',
      attempts: 2,
      dueDate: '2023-12-15',
      availableFrom: '2023-11-20',
      availableTo: '2023-12-15',
      submissions: 24,
      averageScore: 78.5,
      createdAt: '2023-11-15',
      author: 'John Smith'
    },
    {
      id: '2',
      title: 'Photosynthesis Assessment',
      subject: 'Science',
      gradeLevel: '7th Grade',
      duration: 45,
      questionCount: 20,
      totalPoints: 100,
      status: 'published',
      attempts: 1,
      dueDate: '2023-12-10',
      availableFrom: '2023-11-25',
      availableTo: '2023-12-10',
      submissions: 18,
      averageScore: 82.3,
      createdAt: '2023-11-18',
      author: 'Sarah Johnson'
    },
    {
      id: '3',
      title: 'Grammar Test: Parts of Speech',
      subject: 'English',
      gradeLevel: '6th Grade',
      duration: 25,
      questionCount: 12,
      totalPoints: 50,
      status: 'draft',
      attempts: 1,
      dueDate: '2023-12-20',
      availableFrom: '2023-12-01',
      availableTo: '2023-12-20',
      submissions: 0,
      averageScore: 0,
      createdAt: '2023-11-22',
      author: 'Michael Brown'
    },
    {
      id: '4',
      title: 'World History Exam',
      subject: 'History',
      gradeLevel: '10th Grade',
      duration: 60,
      questionCount: 25,
      totalPoints: 100,
      status: 'completed',
      attempts: 1,
      dueDate: '2023-11-30',
      availableFrom: '2023-11-01',
      availableTo: '2023-11-30',
      submissions: 30,
      averageScore: 75.2,
      createdAt: '2023-10-15',
      author: 'Emily Davis'
    },
    {
      id: '5',
      title: 'Chemistry Periodic Table Quiz',
      subject: 'Science',
      gradeLevel: '11th Grade',
      duration: 35,
      questionCount: 18,
      totalPoints: 90,
      status: 'archived',
      attempts: 2,
      dueDate: '2023-10-31',
      availableFrom: '2023-10-01',
      availableTo: '2023-10-31',
      submissions: 22,
      averageScore: 85.7,
      createdAt: '2023-09-20',
      author: 'Robert Wilson'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [subjectFilter, setSubjectFilter] = useState<string>('all');
  const [gradeFilter, setGradeFilter] = useState<string>('all');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Quiz; direction: 'ascending' | 'descending' } | null>(null);
  const [expandedQuiz, setExpandedQuiz] = useState<string | null>(null);

  // Available filters
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education'];
  const gradeLevels = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', 
                       '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
//   const statusOptions = ['draft', 'published', 'completed', 'archived'];

  // Handle sorting
  const handleSort = (key: keyof Quiz) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted quizzes
  const getSortedQuizzes = () => {
    if (!sortConfig) return quizzes;
    
    return [...quizzes].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  // Filter quizzes based on search term and filters
  const filteredQuizzes = getSortedQuizzes().filter(quiz => {
    const matchesSearch = quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quiz.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    const matchesSubject = subjectFilter === 'all' || quiz.subject === subjectFilter;
    const matchesGrade = gradeFilter === 'all' || quiz.gradeLevel === gradeFilter;
    
    return matchesSearch && matchesStatus && matchesSubject && matchesGrade;
  });

  // Delete a quiz
  const deleteQuiz = (id: string) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    }
  };

  // Duplicate a quiz
  const duplicateQuiz = (quiz: Quiz) => {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      title: `${quiz.title} (Copy)`,
      status: 'draft' as const,
      submissions: 0,
      averageScore: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setQuizzes([...quizzes, newQuiz]);
  };

  // Get status badge style and icon
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'published':
        return { 
          style: 'bg-green-100 text-green-800',
          icon: <FaCheckCircle className="text-green-500" />,
          label: 'Published'
        };
      case 'draft':
        return { 
          style: 'bg-yellow-100 text-yellow-800',
          icon: <FaExclamationCircle className="text-yellow-500" />,
          label: 'Draft'
        };
      case 'completed':
        return { 
          style: 'bg-blue-100 text-blue-800',
          icon: <FaTimesCircle className="text-blue-500" />,
          label: 'Completed'
        };
      case 'archived':
        return { 
          style: 'bg-gray-100 text-gray-800',
          icon: <FaTimesCircle className="text-gray-500" />,
          label: 'Archived'
        };
      default:
        return { 
          style: 'bg-gray-100 text-gray-800',
          icon: <FaExclamationCircle className="text-gray-500" />,
          label: 'Unknown'
        };
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if quiz is active
  const isQuizActive = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    const availableTo = new Date(quiz.availableTo);
    return now >= availableFrom && now <= availableTo && quiz.status === 'published';
  };

  // Check if quiz is upcoming
  const isQuizUpcoming = (quiz: Quiz) => {
    const now = new Date();
    const availableFrom = new Date(quiz.availableFrom);
    return now < availableFrom && quiz.status === 'published';
  };

  // Check if quiz is overdue
  const isQuizOverdue = (quiz: Quiz) => {
    const now = new Date();
    const availableTo = new Date(quiz.availableTo);
    return now > availableTo && quiz.status === 'published';
  };

  // Render sort icon
  const renderSortIcon = (key: keyof Quiz) => {
    if (!sortConfig || sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" />;
    if (sortConfig.direction === 'ascending') return <FaSortUp className="ml-1" />;
    return <FaSortDown className="ml-1" />;
  };

  // Toggle quiz expansion
  const toggleQuizExpansion = (quizId: string) => {
    setExpandedQuiz(expandedQuiz === quizId ? null : quizId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            <FaListOl className="mr-3 text-indigo-600" />
            Quiz Management
          </h1>
          <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
            Create and manage assessments for your students
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
                placeholder="Search quizzes..."
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
                  <option value="archived">Archived</option>
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
                value={gradeFilter}
                onChange={(e) => setGradeFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="all">All Grades</option>
                {gradeLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>

              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center">
                <FaPlus className="mr-2" />
                New Quiz
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
              <FaListOl className="text-indigo-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Quizzes</p>
              <p className="text-xl md:text-2xl font-bold">{quizzes.length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Published</p>
              <p className="text-xl md:text-2xl font-bold">{quizzes.filter(q => q.status === 'published').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <FaExclamationCircle className="text-yellow-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Drafts</p>
              <p className="text-xl md:text-2xl font-bold">{quizzes.filter(q => q.status === 'draft').length}</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FaUsers className="text-blue-600 text-xl" />
            </div>
            <div>
              <p className="text-gray-600 text-sm">Total Submissions</p>
              <p className="text-xl md:text-2xl font-bold">{quizzes.reduce((acc, quiz) => acc + quiz.submissions, 0)}</p>
            </div>
          </div>
        </motion.div>

        {/* Quizzes List */}
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
              Quiz {renderSortIcon('title')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('subject')}
            >
              Subject {renderSortIcon('subject')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status {renderSortIcon('status')}
            </div>
            <div 
              className="col-span-2 flex items-center cursor-pointer"
              onClick={() => handleSort('dueDate')}
            >
              Due Date {renderSortIcon('dueDate')}
            </div>
            <div className="col-span-2 text-center">
              Actions
            </div>
          </div>

          {/* Quiz Items */}
          {filteredQuizzes.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No quizzes found. Try adjusting your search or filters.
            </div>
          ) : (
            filteredQuizzes.map((quiz) => {
              const statusInfo = getStatusInfo(quiz.status);
              const isActive = isQuizActive(quiz);
              const isUpcoming = isQuizUpcoming(quiz);
              const isOverdue = isQuizOverdue(quiz);
              
              return (
                <div key={quiz.id} className="border-b border-gray-100 last:border-b-0">
                  {/* Quiz Summary */}
                  <div 
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    onClick={() => toggleQuizExpansion(quiz.id)}
                  >
                    <div className="md:col-span-4">
                      <div className="font-medium text-gray-900">{quiz.title}</div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaGraduationCap className="mr-1" />
                        <span>{quiz.gradeLevel}</span>
                        <span className="mx-2">•</span>
                        <FaChalkboardTeacher className="mr-1" />
                        <span>by {quiz.author}</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <FaListOl className="mr-1" />
                        <span>{quiz.questionCount} questions</span>
                        <span className="mx-2">•</span>
                        <FaClock className="mr-1" />
                        <span>{quiz.duration} minutes</span>
                        <span className="mx-2">•</span>
                        <span>{quiz.totalPoints} points</span>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center">
                      <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {quiz.subject}
                      </span>
                    </div>
                    
                    <div className="md:col-span-2">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.style}`}>
                          {statusInfo.icon}
                          <span className="ml-1">{statusInfo.label}</span>
                        </span>
                      </div>
                      {isActive && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                          <FaPlay className="mr-1" />
                          Active
                        </span>
                      )}
                      {isUpcoming && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                          Upcoming
                        </span>
                      )}
                      {isOverdue && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                          Overdue
                        </span>
                      )}
                    </div>
                    
                    <div className="md:col-span-2 flex items-center">
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>Due: {formatDate(quiz.dueDate)}</span>
                        </div>
                        {quiz.submissions > 0 && (
                          <div className="flex items-center mt-1">
                            <FaUsers className="mr-1" />
                            <span>{quiz.submissions} submissions</span>
                            {quiz.averageScore > 0 && (
                              <span className="ml-2 font-medium">{quiz.averageScore}% avg</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="md:col-span-2 flex items-center justify-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                        title="View Details"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleQuizExpansion(quiz.id);
                        }}
                      >
                        <FaEye />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                        title="Edit Quiz"
                      >
                        <FaEdit />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          duplicateQuiz(quiz);
                        }}
                        className="p-2 text-purple-600 hover:bg-purple-100 rounded-full"
                        title="Duplicate Quiz"
                      >
                        <FaCopy />
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteQuiz(quiz.id);
                        }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                        title="Delete Quiz"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>

                  {/* Expanded Quiz Details */}
                  <AnimatePresence>
                    {expandedQuiz === quiz.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-50 p-4 border-t border-gray-200"
                      >
                        <h3 className="font-medium text-gray-800 mb-3">Quiz Details</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Availability</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>From: {formatDate(quiz.availableFrom)}</div>
                              <div>To: {formatDate(quiz.availableTo)}</div>
                              <div>Due: {formatDate(quiz.dueDate)}</div>
                            </div>
                            
                            <h4 className="font-medium text-gray-700 mt-4 mb-2">Settings</h4>
                            <div className="text-sm text-gray-600 space-y-1">
                              <div>Attempts allowed: {quiz.attempts}</div>
                              <div>Time limit: {quiz.duration} minutes</div>
                              <div>Total points: {quiz.totalPoints}</div>
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Performance</h4>
                            {quiz.submissions > 0 ? (
                              <div className="text-sm text-gray-600 space-y-1">
                                <div>Submissions: {quiz.submissions}</div>
                                <div>Average score: {quiz.averageScore}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                  <div 
                                    className="bg-indigo-600 h-2.5 rounded-full" 
                                    style={{ width: `${quiz.averageScore}%` }}
                                  ></div>
                                </div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">No submissions yet</div>
                            )}
                            
                            <h4 className="font-medium text-gray-700 mt-4 mb-2">Actions</h4>
                            <div className="flex space-x-2">
                              <button className="px-3 py-1 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700">
                                View Results
                              </button>
                              <button className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
                                Preview
                              </button>
                              {quiz.status === 'published' && (
                                <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                                  Share Link
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizList;