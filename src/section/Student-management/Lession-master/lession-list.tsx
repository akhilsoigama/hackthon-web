import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaSearch,
    FaFilter,
    FaEdit,
    FaTrash,
    FaEye,
    FaClock,
    FaChalkboardTeacher,
    FaSort,
    FaSortUp,
    FaSortDown,
    FaBook,
    FaPlus,
    FaVideo,
    FaFilePdf,
    FaImage,
    FaLink,
    FaUsers,
    FaChartBar
} from 'react-icons/fa';

// Define the Lesson interface
interface Lesson {
    id: string;
    title: string;
    subject: string;
    gradeLevel: string;
    duration: string;
    objectives: string[];
    status: 'draft' | 'published' | 'archived';
    createdAt: string;
    lastModified: string;
    resources: { type: string; title: string; url: string }[];
    standards: string[];
    author: string;
    timesTaught: number;
    rating: number;
}

const LessonList = () => {
    // Sample lesson data
    const [lessons, setLessons] = useState<Lesson[]>([
        {
            id: '1',
            title: 'Introduction to Quadratic Equations',
            subject: 'Mathematics',
            gradeLevel: '9th Grade',
            duration: '45 minutes',
            objectives: ['Understand quadratic functions', 'Solve quadratic equations using factoring', 'Graph quadratic equations'],
            status: 'published',
            createdAt: '2023-10-15',
            lastModified: '2023-10-20',
            resources: [
                { type: 'video', title: 'Quadratic Formula Explained', url: 'https://example.com/video1' },
                { type: 'pdf', title: 'Practice Problems', url: 'https://example.com/pdf1' }
            ],
            standards: ['CCSS.MATH.CONTENT.HSA.REI.B.4', 'CCSS.MATH.CONTENT.HSA.SSE.B.3'],
            author: 'John Smith',
            timesTaught: 24,
            rating: 4.5
        },
        {
            id: '2',
            title: 'Photosynthesis Process',
            subject: 'Science',
            gradeLevel: '7th Grade',
            duration: '60 minutes',
            objectives: ['Explain the process of photosynthesis', 'Identify the reactants and products', 'Understand the importance of photosynthesis'],
            status: 'published',
            createdAt: '2023-11-05',
            lastModified: '2023-11-10',
            resources: [
                { type: 'image', title: 'Photosynthesis Diagram', url: 'https://example.com/image1' },
                { type: 'link', title: 'Interactive Simulation', url: 'https://example.com/link1' }
            ],
            standards: ['NGSS.MS-LS1-6', 'NGSS.MS-LS1-7'],
            author: 'Sarah Johnson',
            timesTaught: 18,
            rating: 4.2
        },
        {
            id: '3',
            title: 'Shakespeare\'s Macbeth Analysis',
            subject: 'English',
            gradeLevel: '11th Grade',
            duration: '90 minutes',
            objectives: ['Analyze themes in Macbeth', 'Understand Shakespearean language', 'Explore character development'],
            status: 'draft',
            createdAt: '2023-11-12',
            lastModified: '2023-11-12',
            resources: [
                { type: 'pdf', title: 'Macbeth Full Text', url: 'https://example.com/pdf2' },
                { type: 'video', title: 'Macbeth Summary', url: 'https://example.com/video2' }
            ],
            standards: ['CCSS.ELA-LITERACY.RL.11-12.1', 'CCSS.ELA-LITERACY.RL.11-12.2'],
            author: 'Michael Brown',
            timesTaught: 0,
            rating: 0
        },
        {
            id: '4',
            title: 'World War II Causes',
            subject: 'History',
            gradeLevel: '10th Grade',
            duration: '75 minutes',
            objectives: ['Identify causes of WWII', 'Understand geopolitical factors', 'Analyze primary sources'],
            status: 'published',
            createdAt: '2023-09-20',
            lastModified: '2023-10-05',
            resources: [
                { type: 'link', title: 'Timeline of Events', url: 'https://example.com/link2' },
                { type: 'pdf', title: 'Primary Source Documents', url: 'https://example.com/pdf3' }
            ],
            standards: ['CCSS.ELA-LITERACY.RH.9-10.3', 'CCSS.ELA-LITERACY.RH.9-10.4'],
            author: 'Emily Davis',
            timesTaught: 32,
            rating: 4.8
        },
        {
            id: '5',
            title: 'Introduction to Watercolor Techniques',
            subject: 'Art',
            gradeLevel: '8th Grade',
            duration: '120 minutes',
            objectives: ['Learn basic watercolor techniques', 'Practice color mixing', 'Create a simple landscape'],
            status: 'archived',
            createdAt: '2023-08-15',
            lastModified: '2023-09-01',
            resources: [
                { type: 'video', title: 'Watercolor Basics', url: 'https://example.com/video3' },
                { type: 'image', title: 'Technique Examples', url: 'https://example.com/image2' }
            ],
            standards: ['NCCAS.VA.Cr1.1.8a', 'NCCAS.VA.Cr2.1.8a'],
            author: 'Robert Wilson',
            timesTaught: 15,
            rating: 4.0
        }
    ]);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [subjectFilter, setSubjectFilter] = useState<string>('all');
    const [gradeFilter, setGradeFilter] = useState<string>('all');
    const [sortConfig, setSortConfig] = useState<{ key: keyof Lesson; direction: 'ascending' | 'descending' } | null>(null);
    const [expandedLesson, setExpandedLesson] = useState<string | null>(null);

    // Available filters
    const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education'];
    const gradeLevels = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade',
        '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
    //   const statusOptions = ['draft', 'published', 'archived'];

    // Handle sorting
    const handleSort = (key: keyof Lesson) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    // Get sorted lessons
    const getSortedLessons = () => {
        if (!sortConfig) return lessons;

        return [...lessons].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
    };

    // Filter lessons based on search term and filters
    const filteredLessons = getSortedLessons().filter(lesson => {
        const matchesSearch = lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
            lesson.objectives.some(obj => obj.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || lesson.status === statusFilter;
        const matchesSubject = subjectFilter === 'all' || lesson.subject === subjectFilter;
        const matchesGrade = gradeFilter === 'all' || lesson.gradeLevel === gradeFilter;

        return matchesSearch && matchesStatus && matchesSubject && matchesGrade;
    });

    // Delete a lesson
    const deleteLesson = (id: string) => {
        if (window.confirm('Are you sure you want to delete this lesson?')) {
            setLessons(lessons.filter(lesson => lesson.id !== id));
        }
    };

    // Get status badge style
    const getStatusInfo = (status: string) => {
        switch (status) {
            case 'published':
                return {
                    style: 'bg-green-100 text-green-800',
                    icon: 'Published'
                };
            case 'draft':
                return {
                    style: 'bg-yellow-100 text-yellow-800',
                    icon: 'Draft'
                };
            case 'archived':
                return {
                    style: 'bg-gray-100 text-gray-800',
                    icon: 'Archived'
                };
            default:
                return {
                    style: 'bg-gray-100 text-gray-800',
                    icon: 'Unknown'
                };
        }
    };

    // Format date for display
    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get resource icon
    const getResourceIcon = (type: string) => {
        switch (type) {
            case 'video':
                return <FaVideo className="text-red-500" />;
            case 'pdf':
                return <FaFilePdf className="text-red-600" />;
            case 'image':
                return <FaImage className="text-green-500" />;
            case 'link':
                return <FaLink className="text-blue-500" />;
            default:
                return <FaLink className="text-gray-500" />;
        }
    };

    // Render sort icon
    const renderSortIcon = (key: keyof Lesson) => {
        if (!sortConfig || sortConfig.key !== key) return <FaSort className="ml-1 opacity-50" />;
        if (sortConfig.direction === 'ascending') return <FaSortUp className="ml-1" />;
        return <FaSortDown className="ml-1" />;
    };

    // Toggle lesson expansion
    const toggleLessonExpansion = (lessonId: string) => {
        setExpandedLesson(expandedLesson === lessonId ? null : lessonId);
    };

    // Render star rating
    const renderRating = (rating: number) => {
        if (rating === 0) return <span className="text-gray-400">No ratings</span>;

        return (
            <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
                <span className="ml-1 text-gray-600">({rating})</span>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-6 md:mb-8">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
                        <FaBook className="mr-3 text-indigo-600" />
                        Lesson Library
                    </h1>
                    <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
                        Browse and manage all teaching lessons
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
                                placeholder="Search lessons..."
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
                                New Lesson
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
                            <FaBook className="text-indigo-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Lessons</p>
                            <p className="text-xl md:text-2xl font-bold">{lessons.length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <div className="rounded-full bg-green-100 p-3 mr-4">
                            <FaChalkboardTeacher className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Published</p>
                            <p className="text-xl md:text-2xl font-bold">{lessons.filter(l => l.status === 'published').length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <div className="rounded-full bg-yellow-100 p-3 mr-4">
                            <FaClock className="text-yellow-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Drafts</p>
                            <p className="text-xl md:text-2xl font-bold">{lessons.filter(l => l.status === 'draft').length}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-md p-4 flex items-center">
                        <div className="rounded-full bg-blue-100 p-3 mr-4">
                            <FaUsers className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-gray-600 text-sm">Total Taught</p>
                            <p className="text-xl md:text-2xl font-bold">{lessons.reduce((acc, lesson) => acc + lesson.timesTaught, 0)}</p>
                        </div>
                    </div>
                </motion.div>

                {/* Lessons List */}
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
                            Lesson {renderSortIcon('title')}
                        </div>
                        <div
                            className="col-span-2 flex items-center cursor-pointer"
                            onClick={() => handleSort('subject')}
                        >
                            Subject {renderSortIcon('subject')}
                        </div>
                        <div
                            className="col-span-2 flex items-center cursor-pointer"
                            onClick={() => handleSort('gradeLevel')}
                        >
                            Grade {renderSortIcon('gradeLevel')}
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

                    {/* Lesson Items */}
                    {filteredLessons.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">
                            No lessons found. Try adjusting your search or filters.
                        </div>
                    ) : (
                        filteredLessons.map((lesson) => {
                            const statusInfo = getStatusInfo(lesson.status);

                            return (
                                <div key={lesson.id} className="border-b border-gray-100 last:border-b-0">
                                    {/* Lesson Summary */}
                                    <div
                                        className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                                        onClick={() => toggleLessonExpansion(lesson.id)}
                                    >
                                        <div className="md:col-span-4">
                                            <div className="font-medium text-gray-900">{lesson.title}</div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                {lesson.objectives[0]}
                                                {lesson.objectives.length > 1 && '...'}
                                            </div>
                                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                                <FaChalkboardTeacher className="mr-1" />
                                                <span>by {lesson.author}</span>
                                                <span className="mx-2">•</span>
                                                <FaClock className="mr-1" />
                                                <span>{lesson.duration}</span>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2 flex items-center">
                                            <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {lesson.subject}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2 flex items-center">
                                            <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                {lesson.gradeLevel}
                                            </span>
                                        </div>

                                        <div className="md:col-span-2">
                                            <div className="flex items-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.style}`}>
                                                    {statusInfo.icon}
                                                </span>
                                            </div>
                                            <div className="text-sm text-gray-500 mt-1">
                                                <div className="flex items-center">
                                                    <FaUsers className="mr-1" />
                                                    <span>Taught {lesson.timesTaught} times</span>
                                                </div>
                                                {renderRating(lesson.rating)}
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
                                                    toggleLessonExpansion(lesson.id);
                                                }}
                                            >
                                                <FaEye />
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                className="p-2 text-green-600 hover:bg-green-100 rounded-full"
                                                title="Edit Lesson"
                                            >
                                                <FaEdit />
                                            </motion.button>

                                            <motion.button
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    deleteLesson(lesson.id);
                                                }}
                                                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                                                title="Delete Lesson"
                                            >
                                                <FaTrash />
                                            </motion.button>
                                        </div>
                                    </div>

                                    {/* Expanded Lesson Details */}
                                    <AnimatePresence>
                                        {expandedLesson === lesson.id && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="bg-gray-50 p-4 border-t border-gray-200"
                                            >
                                                <h3 className="font-medium text-gray-800 mb-3">Lesson Details</h3>

                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-2">Learning Objectives</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {lesson.objectives.map((obj, i) => (
                                                                <li key={i} className="text-sm text-gray-600">{obj}</li>
                                                            ))}
                                                        </ul>

                                                        <h4 className="font-medium text-gray-700 mt-4 mb-2">Standards</h4>
                                                        <ul className="list-disc pl-5 space-y-1">
                                                            {lesson.standards.map((standard, i) => (
                                                                <li key={i} className="text-sm text-gray-600">{standard}</li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    <div>
                                                        <h4 className="font-medium text-gray-700 mb-2">Resources</h4>
                                                        <div className="space-y-2">
                                                            {lesson.resources.map((resource, i) => (
                                                                <div key={i} className="flex items-center bg-white p-2 rounded-lg border">
                                                                    <span className="mr-2">{getResourceIcon(resource.type)}</span>
                                                                    <span className="text-sm text-gray-700 flex-1">{resource.title}</span>
                                                                    <a
                                                                        href={resource.url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-indigo-600 hover:text-indigo-800 text-sm"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        View
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>

                                                        <div className="flex justify-between mt-4 text-sm text-gray-500">
                                                            <div>
                                                                <div>Created: {formatDate(lesson.createdAt)}</div>
                                                                <div>Modified: {formatDate(lesson.lastModified)}</div>
                                                            </div>
                                                            <div className="text-right">
                                                                <div className="flex items-center">
                                                                    <FaChartBar className="mr-1" />
                                                                    <span>Taught {lesson.timesTaught} times</span>
                                                                </div>
                                                                {renderRating(lesson.rating)}
                                                            </div>
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

export default LessonList;