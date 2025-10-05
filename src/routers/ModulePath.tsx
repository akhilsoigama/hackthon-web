import {
  FaHome,
  FaPlus,
  FaList,
  FaChartBar,
  FaClipboardList,
  FaCalendarAlt,
  FaEnvelope,
  FaCog,
  FaUsers,
  FaUserGraduate,
  FaClipboardCheck,
  FaBook,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUpload,
  FaDownload,
  FaTrash,
  FaMedal,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';

export const modules: any = [
  

  {
    moduleName: "Nabha Management (only for super admin)",
    links: [
      {
        to: '/dashboard/nabha-master/institute',
        label: 'Institute',
        icon: <FaHome className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/nabha-master/institute/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/nabha-master/institute/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/servey-master',
        label: 'Govt. Survey',
        icon: <FaChartBar className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/servey-master/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/servey-master/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/rolePermission',
        label: 'Role Permission',
        icon: <FaClipboardCheck className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/rolePermission/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/rolePermission/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
    ],
  },
  {
    moduleName: "Institute Management (only for institute admin)",
    links: [
      {
        to: '/dashboard/institute-management',
        label: 'Faculty',
        icon: <FaUsers className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/institute-management/faculty/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/institute-management/faculty/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/institute-management/student',
        label: 'Student',
        icon: <FaUserGraduate className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/institute-management/student/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/institute-management/student/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/institute-management/department',
        label: 'Department',
        icon: <FaUsers className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/institute-management/department/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/institute-management/department/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/institute-management/institute-servey',
        label: 'Institute Survey',
        icon: <FaClipboardList className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/institute-management/institute-servey/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/institute-management/institute-servey/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
    ],
  },
  {
    moduleName: "Faculty Management (only for faculty)",
    links: [
      {
        to: '/dashboard/student-management/material/list',
        label: 'Material Library',
        icon: <FaBook className="size-6" />,
      },
      {
        to: '/dashboard/student-management/material/create',
        label: 'Create Material',
        icon: <FaPlus className="size-6" />,
      },
      {
        to: '/dashboard/faculty-management/progress',
        label: 'student Progress',
        icon: <FaChartBar className="size-6" />,
      },
      {
        to: '/dashboard/faculty-management/attendance',
        label: 'Attendance',
        icon: <FaClipboardCheck className="size-6" />,
      },
    ],
  },
  {
    moduleName: "Student Query(only for faculty )",
    links: [
      {
        to: '/dashboard/qna/teacher',
        label: 'Student Q&A',
        icon: <FaQuestionCircle className="size-6" />,
        subLinks: [
          { to: '/dashboard/qna/teacher/questions', label: 'All Questions', icon: <FaList className="size-6" /> },
          { to: '/dashboard/qna/teacher/answered', label: 'Answered', icon: <FaCheck className="size-6" /> },
          { to: '/dashboard/qna/teacher/unanswered', label: 'Unanswered', icon: <FaTimes className="size-6" /> },
        ],
      },
    ],
  },

  {
    moduleName: "Leave Management (only for faculty and institute admin)",
    links: [
      {
        to: '/dashboard/Leave-management/Leave',
        label: 'Leave',
        icon: <FaSignOutAlt className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/leave-management/leave/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/leave-management/leave/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/leave-management/leave-approval',
        label: 'Leave Approval',
        icon: <FaClipboardCheck className="size-6" />,
        // subLinks: [
        //   {
        //     to: '/dashboard/leave-management/leave-approval/done',
        //     label: 'Done',
        //     icon: <FaCheckCircle className="size-6" />,
        //   },
        //   {
        //     to: '/dashboard/leave-management/leave-approval/reject',
        //     label: 'Reject',
        //     icon: <FaTimesCircle className="size-6" />,
        //   },
        // ],
      },
    ],
  },
  {
    moduleName: "Student Upload (only for students)",
    links: [
      {
        to: '/dashboard/student-upload/assignment-upload',
        label: 'Assignment Upload',
        icon: <FaUpload className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/student-upload/assignment-upload/upload',
            label: 'Upload',
            icon: <FaUpload className="size-6" />,
          },
          {
            to: '/dashboard/student-upload/assignment-upload/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/student-upload/materials',
        label: 'Materials',
        icon: <FaBook className="size-6" /> 
      },
    ],
  },
  {
    moduleName: "Dashboard (separate)",
    links: [
      {
        to: '/dashboard/overview',
        label: 'Overview',
        icon: <FaHome className="size-6" />,
      },
      {
        to: '/dashboard/progress',
        label: 'Progress',
        icon: <FaChartBar className="size-6" />,
      },
      {
        to: '/dashboard/Events',
        label: 'Events',
        icon: <FaCalendarAlt className="size-6" />,
      },
      {
        to: '/dashboard/student-management/quize/list',
        label: 'Quiz',
        icon: <FaQuestionCircle className="size-6" />,
      }
    ],
  },
  {
    moduleName: "Gamification (only for students)",
    links: [
      {
        to: '/dashboard/gamification',
        label: 'Achievements / Badges',
        icon: <FaMedal className="size-6" />,
      },
    ],
  },

  {
    moduleName: "Offline Library (only for students and faculty )",
    links: [
      {
        to: '/dashboard/offline-library',
        label: 'Offline Library',
        icon: <FaDownload className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/offline-library/lessons',
            label: 'Lessons',
            icon: <FaBook className="size-6" />,
          },
          {
            to: '/dashboard/offline-library/videos',
            label: 'Videos',
            icon: <FaBook className="size-6" />,
          },
          {
            to: '/dashboard/offline-library/audio',
            label: 'Audio Lessons',
            icon: <FaBook className="size-6" />,
          },
          {
            to: '/dashboard/offline-library/downloads',
            label: 'Downloaded Files',
            icon: <FaList className="size-6" />,
          },
          {
            to: '/dashboard/offline-library/manage',
            label: 'Manage Storage',
            icon: <FaTrash className="size-6" />,
          },
        ],
      },
    ],
  },
  {
    moduleName: "Communication (only for institute admin and faculty",
    links: [
      {
        to: '/dashboard/chatbot',
        label: 'Chatbot',
        icon: <FaEnvelope className="size-6" />,
      },
    ],
  },
  {
    moduleName: "Issue/Discussion (only for student)",
    links: [
      {
        to: '/dashboard/qna',
        label: 'Q&A',
        icon: <FaQuestionCircle className="size-6" />,
        subLinks: [
          { to: '/dashboard/qna/questions', label: 'All Questions', icon: <FaList className="size-6" /> },
          { to: '/dashboard/qna/ask', label: 'Ask Question', icon: <FaPlus className="size-6" /> },
        ],
      },
    ],
  },
  {
    moduleName: "Settings(over All)",
    links: [
      {
        to: '/dashboard/settings',
        label: 'Settings',
        icon: <FaCog className="size-6" />,
      },
    ],
  },
];