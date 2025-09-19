import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { 
  FaSave, 
  FaPlus, 
  FaUserShield,
  FaKey,
  FaShieldAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

// Define the Permission interface
interface Permission {
  [key: string]: boolean;
}

// Define the Role interface
interface Role {
  id: string;
  roleName: string;
  permissions: Permission;
  userCount: number;
  createdAt: string;
}

// Permission categories based on routes
const permissionCategories: { [key: string]: string[] } = {
  Dashboard: [
    'OVERVIEW_LIST',
    'PROGRESS_LIST',
    'EVENTS_LIST',
    'MESSAGES_LIST',
    'SETTINGS_LIST',
  ],
  NabhaManagement: [
    'INSTITUTE_CREATE',
    'INSTITUTE_LIST',
    'INSTITUTE_UPDATE',
    'INSTITUTE_DELETE',
    'SURVEY_MASTER_CREATE',
    'SURVEY_MASTER_LIST',
    'SURVEY_MASTER_UPDATE',
    'SURVEY_MASTER_DELETE',
    'ROLE_PERMISSION_CREATE',
    'ROLE_PERMISSION_LIST',
    'ROLE_PERMISSION_UPDATE',
    'ROLE_PERMISSION_DELETE',
  ],
  InstituteManagement: [
    'FACULTY_CREATE',
    'FACULTY_LIST',
    'FACULTY_UPDATE',
    'FACULTY_DELETE',
    'STUDENT_CREATE',
    'STUDENT_LIST',
    'STUDENT_UPDATE',
    'STUDENT_DELETE',
    'INSTITUTE_SURVEY_CREATE',
    'INSTITUTE_SURVEY_LIST',
    'INSTITUTE_SURVEY_UPDATE',
    'INSTITUTE_SURVEY_DELETE',
  ],
  StudentManagement: [
    'ASSIGNMENT_CREATE',
    'ASSIGNMENT_LIST',
    'ASSIGNMENT_UPDATE',
    'ASSIGNMENT_DELETE',
    'LESSON_CREATE',
    'LESSON_LIST',
    'LESSON_UPDATE',
    'LESSON_DELETE',
    'QUIZ_CREATE',
    'QUIZ_LIST',
    'QUIZ_UPDATE',
    'QUIZ_DELETE',
  ],
  LeaveManagement: [
    'LEAVE_CREATE',
    'LEAVE_LIST',
    'LEAVE_UPDATE',
    'LEAVE_DELETE',
    'LEAVE_APPROVAL_DONE',
    'LEAVE_APPROVAL_REJECT',
  ],
  StudentUpload: [
    'ASSIGNMENT_UPLOAD_UPLOAD',
    'ASSIGNMENT_UPLOAD_LIST',
    'LESSON_UPLOAD_UPLOAD',
    'LESSON_UPLOAD_LIST',
  ],
  Communication: ['CHATBOT_LIST'],
};

// Sample roles data
const sampleRoles: Role[] = [
  {
    id: '1',
    roleName: 'Administrator',
    permissions: Object.values(permissionCategories)
      .flat()
      .reduce((acc, perm) => ({ ...acc, [perm]: true }), {}),
    userCount: 5,
    createdAt: '2023-01-15',
  },
  {
    id: '2',
    roleName: 'Institute Manager',
    permissions: {
      ...Object.values(permissionCategories)
        .flat()
        .reduce((acc, perm) => ({ ...acc, [perm]: false }), {}),
      INSTITUTE_LIST: true,
      FACULTY_LIST: true,
      STUDENT_LIST: true,
      INSTITUTE_SURVEY_LIST: true,
    },
    userCount: 12,
    createdAt: '2023-03-22',
  },
  {
    id: '3',
    roleName: 'Faculty',
    permissions: {
      ...Object.values(permissionCategories)
        .flat()
        .reduce((acc, perm) => ({ ...acc, [perm]: false }), {}),
      ASSIGNMENT_CREATE: true,
      ASSIGNMENT_LIST: true,
      LESSON_CREATE: true,
      LESSON_LIST: true,
      QUIZ_CREATE: true,
      QUIZ_LIST: true,
      LEAVE_CREATE: true,
      LEAVE_LIST: true,
    },
    userCount: 45,
    createdAt: '2023-05-10',
  },
];

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const RolePermissionCreate: React.FC = () => {
  const [roleName, setRoleName] = useState<string>('');
  const [permissions, setPermissions] = useState<Permission>(
    Object.values(permissionCategories)
      .flat()
      .reduce((acc, perm) => ({ ...acc, [perm]: false }), {}),
  );
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [roles, setRoles] = useState<Role[]>(sampleRoles);
  const [expandedCategories, setExpandedCategories] = useState<{[key: string]: boolean}>({});
  const [viewMode, setViewMode] = useState<'create' | 'list'>('create');

  // Toggle category expansion
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Handle permission change
  const handlePermissionChange = (permission: string) => {
    setPermissions((prev) => ({ ...prev, [permission]: !prev[permission] }));
  };

  // Select all permissions in a category
  const selectAllInCategory = (category: string, select: boolean) => {
    const newPermissions = { ...permissions };
    permissionCategories[category].forEach(perm => {
      newPermissions[perm] = select;
    });
    setPermissions(newPermissions);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) {
      setError('Role name is required');
      return;
    }
    
    setError('');
    const newRole: Role = {
      id: Date.now().toString(),
      roleName,
      permissions,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    setRoles([...roles, newRole]);
    setSuccess(`Role "${roleName}" created successfully!`);
    
    // Reset form
    setRoleName('');
    setPermissions(
      Object.values(permissionCategories)
        .flat()
        .reduce((acc, perm) => ({ ...acc, [perm]: false }), {}),
    );
    
    setTimeout(() => setSuccess(''), 3000);
  };

  // Format permission name for display
  const formatPermissionName = (permission: string) => {
    return permission
      .replace(/_/g, ' ')
      .toLowerCase()
      .replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-4 md:py-8 px-3 sm:px-4 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6 md:mb-10"
        >
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-3 md:mb-4 flex items-center justify-center">
            <FaUserShield className="mr-2 md:mr-3 text-lg md:text-xl lg:text-2xl" />
            Role & Permission Management
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Create and manage roles with specific permissions to control access to different parts of the system.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode('create')}
              className={`px-4 py-2 text-xs md:text-sm font-medium rounded-lg ${
                viewMode === 'create'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              } opacity-50 cursor-not-allowed`}
              disabled
            >
              <FaPlus className="inline mr-1 md:mr-2 text-xs md:text-sm" />
              Create New Role
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key="create-view"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl p-4 md:p-6 mb-6 md:mb-8"
          >
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center">
              <FaKey className="mr-2 text-indigo-500 text-lg md:text-xl" />
              Create New Role
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4 md:mb-6">
                <label className="block text-base md:text-lg font-semibold text-gray-800 mb-2">
                  Role Name
                </label>
                <input
                  type="text"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="Enter role name (e.g., Admin, Teacher)"
                  className="w-full p-2 md:p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 opacity-50 cursor-not-allowed"
                  disabled
                />
                {error && <p className="text-red-500 text-xs md:text-sm mt-1 md:mt-2">{error}</p>}
                {success && <p className="text-green-500 text-xs md:text-sm mt-1 md:mt-2">{success}</p>}
              </div>
              
              <div className="mb-4 md:mb-6">
                <div className="flex justify-between items-center mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 flex items-center">
                    <FaShieldAlt className="mr-2 text-indigo-500 text-base md:text-lg" />
                    Permissions
                  </h3>
                  <div className="text-xs md:text-sm text-gray-500">
                    {Object.values(permissions).filter(Boolean).length} permissions selected
                  </div>
                </div>
                
                <div className="space-y-3 md:space-y-4">
                  {Object.entries(permissionCategories).map(([category, perms]) => (
                    <motion.div
                      key={category}
                      className="bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-200"
                      variants={itemVariants}
                    >
                      <div 
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => toggleCategory(category)}
                      >
                        <h4 className="text-base md:text-lg font-semibold text-indigo-700">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </h4>
                        <div className="flex items-center">
                          <span className="text-xs md:text-sm text-gray-500 mr-2 md:mr-3">
                            {perms.filter(perm => permissions[perm]).length}/{perms.length} selected
                          </span>
                          {expandedCategories[category] ? (
                            <FaChevronUp className="text-indigo-600 text-xs md:text-sm" />
                          ) : (
                            <FaChevronDown className="text-indigo-600 text-xs md:text-sm" />
                          )}
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expandedCategories[category] && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 md:mt-4"
                          >
                            <div className="flex space-x-2 mb-2 md:mb-3">
                              <button
                                type="button"
                                onClick={() => selectAllInCategory(category, true)}
                                className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded opacity-50 cursor-not-allowed"
                                disabled
                              >
                                Select All
                              </button>
                              <button
                                type="button"
                                onClick={() => selectAllInCategory(category, false)}
                                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded opacity-50 cursor-not-allowed"
                                disabled
                              >
                                Deselect All
                              </button>
                            </div>
                            
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                              {perms.map((perm) => (
                                <motion.label 
                                  key={perm}
                                  className="flex items-start space-x-2 p-2 bg-white rounded-lg border border-gray-200 transition-colors opacity-50 cursor-not-allowed"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <input
                                    type="checkbox"
                                    checked={permissions[perm]}
                                    onChange={() => handlePermissionChange(perm)}
                                    className="h-4 w-4 md:h-5 md:w-5 text-indigo-600 focus:ring-indigo-500 rounded mt-1 opacity-50 cursor-not-allowed"
                                    disabled
                                  />
                                  <span className="text-gray-700 flex-1 text-xs md:text-sm">
                                    {formatPermissionName(perm)}
                                  </span>
                                </motion.label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transition-colors flex items-center justify-center opacity-50 cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled
              >
                <FaSave className="mr-1 md:mr-2 text-sm md:text-base" />
                Create Role
              </motion.button>
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RolePermissionCreate;