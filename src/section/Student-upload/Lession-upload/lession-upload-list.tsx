import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearch, BiFilter, BiSort, BiEdit, BiTrash, BiVideo, BiImage, BiFile } from 'react-icons/bi';
import { FiClock, FiUser, FiCalendar } from 'react-icons/fi';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  type: 'video' | 'document' | 'image';
  uploadDate: string;
  author: string;
  size: string;
  status: 'published' | 'draft' | 'archived';
  thumbnail?: string;
}

const LessonUploadList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sample data
  const lessons: Lesson[] = [
    {
      id: '1',
      title: 'Introduction to React Hooks',
      description: 'Learn how to use React Hooks in your functional components',
      duration: '45 min',
      level: 'intermediate',
      type: 'video',
      uploadDate: '2023-10-15',
      author: 'Jane Smith',
      size: '245 MB',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '2',
      title: 'Advanced JavaScript Patterns',
      description: 'Explore advanced JavaScript design patterns and best practices',
      duration: '60 min',
      level: 'advanced',
      type: 'document',
      uploadDate: '2023-10-10',
      author: 'John Doe',
      size: '3.2 MB',
      status: 'draft',
      thumbnail: 'https://bairesdev.mo.cloudinary.net/blog/2023/08/What-Is-JavaScript-Used-For.jpg'
    },
    {
      id: '3',
      title: 'CSS Flexbox Fundamentals',
      description: 'Master CSS Flexbox with practical examples',
      duration: '30 min',
      level: 'beginner',
      type: 'video',
      uploadDate: '2023-10-05',
      author: 'Alice Johnson',
      size: '180 MB',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '4',
      title: 'UI Design Principles',
      description: 'Learn the fundamental principles of good UI design',
      duration: '50 min',
      level: 'intermediate',
      type: 'image',
      uploadDate: '2023-09-28',
      author: 'Mike Wilson',
      size: '42 MB',
      status: 'archived',
      thumbnail: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '5',
      title: 'TypeScript for Beginners',
      description: 'Get started with TypeScript in your projects',
      duration: '55 min',
      level: 'beginner',
      type: 'video',
      uploadDate: '2023-09-20',
      author: 'Sarah Brown',
      size: '310 MB',
      status: 'published',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    },
    {
      id: '6',
      title: 'Node.js Backend Development',
      description: 'Build robust backend services with Node.js',
      duration: '70 min',
      level: 'advanced',
      type: 'document',
      uploadDate: '2023-09-15',
      author: 'David Lee',
      size: '5.7 MB',
      status: 'draft',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80'
    }
  ];

  // Filter and sort lessons
  const filteredLessons = lessons
    .filter(lesson => {
      const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lesson.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
      const matchesType = typeFilter === 'all' || lesson.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-blue-100 text-blue-800';
      case 'intermediate': return 'bg-purple-100 text-purple-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <BiVideo className="w-5 h-5" />;
      case 'image': return <BiImage className="w-5 h-5" />;
      case 'document': return <BiFile className="w-5 h-5" />;
      default: return <BiFile className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Lesson Library</h1>
            <p className="text-blue-100">Manage and view all your uploaded lessons</p>
          </div>

          {/* Controls */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                >
                  <BiFilter className="w-5 h-5" />
                  <span>Filter</span>
                </button>

                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all duration-200"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="title">Title A-Z</option>
                  </select>
                  <BiSort className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Filter Options */}
            <AnimatePresence>
              {isFilterOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'published', 'draft', 'archived'].map((status) => (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-3 py-1 rounded-full text-sm capitalize ${statusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <div className="flex flex-wrap gap-2">
                      {['all', 'video', 'document', 'image'].map((type) => (
                        <button
                          key={type}
                          onClick={() => setTypeFilter(type)}
                          className={`px-3 py-1 rounded-full text-sm capitalize ${typeFilter === type ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Results Count */}
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {filteredLessons.length} of {lessons.length} lessons
            </p>
          </div>

          {/* Lessons List */}
          <div className="divide-y divide-gray-200">
            <AnimatePresence>
              {filteredLessons.length > 0 ? (
                filteredLessons.map((lesson, index) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-6 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Thumbnail */}
                      {lesson.thumbnail ? (
                        <div className="flex-shrink-0">
                          <img
                            src={lesson.thumbnail}
                            alt={lesson.title}
                            className="w-32 h-20 object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          {getTypeIcon(lesson.type)}
                        </div>
                      )}

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl font-semibold text-gray-900">{lesson.title}</h3>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                              {lesson.status}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(lesson.level)}`}>
                              {lesson.level}
                            </span>
                          </div>
                        </div>

                        <p className="text-gray-600 mb-4">{lesson.description}</p>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <FiClock className="w-4 h-4" />
                            <span>{lesson.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {getTypeIcon(lesson.type)}
                            <span className="capitalize">{lesson.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiUser className="w-4 h-4" />
                            <span>{lesson.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FiCalendar className="w-4 h-4" />
                            <span>{new Date(lesson.uploadDate).toLocaleDateString()}</span>
                          </div>
                          <div>
                            <span>{lesson.size}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 self-center">
                        <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200">
                          <BiEdit className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200">
                          <BiTrash className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-12 text-center"
                >
                  <div className="text-gray-400 mb-4">
                    <BiSearch className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No lessons found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LessonUploadList;