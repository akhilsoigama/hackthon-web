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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 flex items-center justify-center">
            <FaUserShield className="mr-3" />
            Role & Permission Management
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create and manage roles with specific permissions to control access to different parts of the system.
          </p>
        </motion.div>

        {/* View Toggle */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode('create')}
              className={`px-5 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === 'create'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FaPlus className="inline mr-2" />
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
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <FaKey className="mr-2 text-indigo-500" />
                Create New Role
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-lg font-semibold text-gray-800 mb-2">
                    Role Name
                  </label>
                  <input
                    type="text"
                    value={roleName}
                    onChange={(e) => setRoleName(e.target.value)}
                    placeholder="Enter role name (e.g., Admin, Teacher)"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                  {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
                </div>
                
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                      <FaShieldAlt className="mr-2 text-indigo-500" />
                      Permissions
                    </h3>
                    <div className="text-sm text-gray-500">
                      {Object.values(permissions).filter(Boolean).length} permissions selected
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {Object.entries(permissionCategories).map(([category, perms]) => (
                      <motion.div
                        key={category}
                        className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                        variants={itemVariants}
                      >
                        <div 
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleCategory(category)}
                        >
                          <h4 className="text-lg font-semibold text-indigo-700">
                            {category.replace(/([A-Z])/g, ' $1').trim()}
                          </h4>
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 mr-3">
                              {perms.filter(perm => permissions[perm]).length}/{perms.length} selected
                            </span>
                            {expandedCategories[category] ? (
                              <FaChevronUp className="text-indigo-600" />
                            ) : (
                              <FaChevronDown className="text-indigo-600" />
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
                              className="mt-4"
                            >
                              <div className="flex space-x-2 mb-3">
                                <button
                                  type="button"
                                  onClick={() => selectAllInCategory(category, true)}
                                  className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded"
                                >
                                  Select All
                                </button>
                                <button
                                  type="button"
                                  onClick={() => selectAllInCategory(category, false)}
                                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                                >
                                  Deselect All
                                </button>
                              </div>
                              
                              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                                {perms.map((perm) => (
                                  <motion.label 
                                    key={perm}
                                    className="flex items-start space-x-3 p-2 bg-white rounded-lg border border-gray-200 hover:bg-indigo-50 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={permissions[perm]}
                                      onChange={() => handlePermissionChange(perm)}
                                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 rounded mt-1"
                                    />
                                    <span className="text-gray-700 flex-1">
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
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FaSave className="mr-2" />
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