import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiAward, FiBarChart2, FiBook, FiCalendar, FiCheckCircle, FiClock, FiMessageSquare, FiTrendingUp } from 'react-icons/fi';


const Overview = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Sample data for stats cards
  const stats = [
    { title: 'Total Assignments', value: '12', description: 'Pending submissions', icon: <FiBook className="text-blue-500" />, color: 'bg-blue-100' },
    { title: 'Progress', value: '75%', description: 'Course completion', icon: <FiBarChart2 className="text-green-500" />, color: 'bg-green-100' },
    { title: 'Upcoming Events', value: '3', description: 'This week', icon: <FiCalendar className="text-purple-500" />, color: 'bg-purple-100' },
    { title: 'Messages', value: '8', description: 'Unread messages', icon: <FiMessageSquare className="text-red-500" />, color: 'bg-red-100' },
  ];

  // Recent activities data
  const activities = [
    { id: 1, title: 'Submitted Math Assignment', time: '2 hours ago', icon: <FiCheckCircle className="text-green-500" /> },
    { id: 2, title: 'Completed Chemistry Quiz', time: '5 hours ago', icon: <FiAward className="text-blue-500" /> },
    { id: 3, title: 'Joined Study Group', time: 'Yesterday', icon: <FiMessageSquare className="text-purple-500" /> },
    { id: 4, title: 'Started New Module', time: '2 days ago', icon: <FiBook className="text-orange-500" /> },
  ];

  // Upcoming deadlines
  const deadlines = [
    { id: 1, title: 'Physics Homework', due: 'Tomorrow, 10:00 AM', subject: 'Physics' },
    { id: 2, title: 'Literature Essay', due: 'In 3 days', subject: 'Literature' },
    { id: 3, title: 'Math Quiz', due: 'Next Monday', subject: 'Mathematics' },
  ];

  // Progress by subject
  const progressData = [
    { subject: 'Mathematics', progress: 85, color: 'bg-blue-500' },
    { subject: 'Physics', progress: 70, color: 'bg-green-500' },
    { subject: 'Literature', progress: 60, color: 'bg-purple-500' },
    { subject: 'Chemistry', progress: 90, color: 'bg-orange-500' },
  ];

  useEffect(() => {
    // Update time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date:any) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date:any) => {
    return date.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <motion.header
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Good morning, Alex!</h1>
            <p className="text-sm text-gray-500 mt-1">
              {formatDate(currentTime)} • {formatTime(currentTime)}
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center shadow-md hover:bg-blue-700 transition-colors"
          >
            <FiTrendingUp className="mr-2" />
            View Detailed Report
          </motion.button>
        </div>
      </motion.header>

      {/* Stats Cards */}
      <motion.section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{stat.title}</h2>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Welcome Card */}
        <motion.section
          className="lg:col-span-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-3">Welcome to your learning dashboard!</h2>
            <p className="mb-4">
              You're making great progress in your courses. Keep up the good work! 
              You have 3 upcoming deadlines this week and 75% overall completion.
            </p>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              <span>Last login: Today at {formatTime(currentTime)}</span>
            </div>
          </div>
        </motion.section>

        {/* Recent Activities */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiAward className="mr-2 text-yellow-500" />
              Recent Activities
            </h2>
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <motion.div 
                  key={activity.id}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="mr-3 p-2 bg-gray-100 rounded-full">
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Upcoming Deadlines */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiCalendar className="mr-2 text-red-500" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-4">
              {deadlines.map((deadline, index) => (
                <motion.div 
                  key={deadline.id}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-gray-800">{deadline.title}</h3>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {deadline.subject}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 flex items-center">
                    <FiClock className="mr-1" />
                    Due: {deadline.due}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Progress by Subject */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FiTrendingUp className="mr-2 text-green-500" />
              Progress by Subject
            </h2>
            <div className="space-y-4">
              {progressData.map((subject, index) => (
                <motion.div 
                  key={subject.subject}
                  className="space-y-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800">{subject.subject}</span>
                    <span className="text-sm text-gray-500">{subject.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div 
                      className={`h-2 rounded-full ${subject.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${subject.progress}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Quick Actions */}
      <motion.section 
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {['Start Assignment', 'View Calendar', 'Message Instructor', 'View Resources'].map((action, index) => (
              <motion.button
                key={action}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="p-3 bg-gray-100 hover:bg-blue-100 text-gray-800 rounded-lg text-sm font-medium transition-colors"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {action}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Overview;