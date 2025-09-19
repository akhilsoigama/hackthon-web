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
} from 'react-icons/fa';

export const modules: any = [
  {
    moduleName: "Nabha Management",
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
    moduleName: "Institute Management",
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
    moduleName: "Student Management",
    links: [
      {
        to: '/dashboard/student-management/Assignment',
        label: 'Assignment',
        icon: <FaClipboardList className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/student-management/assignment/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/student-management/assignment/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/student-management/lession',
        label: 'Lesson',
        icon: <FaBook className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/student-management/lession/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/student-management/lession/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
      {
        to: '/dashboard/student-management/quize',
        label: 'Quiz',
        icon: <FaQuestionCircle className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/student-management/quize/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
          },
          {
            to: '/dashboard/student-management/quize/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
    ],
  },
  {
    moduleName: "Leave Management",
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
    moduleName: "Student Upload",
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
        to: '/dashboard/student-upload/lession-upload',
        label: 'Lesson Upload',
        icon: <FaUpload className="size-6" />,
        subLinks: [
          {
            to: '/dashboard/student-upload/lession-upload/upload',
            label: 'Upload',
            icon: <FaUpload className="size-6" />,
          },
          {
            to: '/dashboard/student-upload/lession-upload/list',
            label: 'List',
            icon: <FaList className="size-6" />,
          },
        ],
      },
    ],
  },
  {
    moduleName: "Dashboard",
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
    ],
  },
  {
    moduleName: "Communication",
    links: [
      {
        to: '/dashboard/chatbot',
        label: 'Chatbot',
        icon: <FaEnvelope className="size-6" />,
      },
    ],
  },
  {
    moduleName: "Settings",
    links: [
      {
        to: '/dashboard/settings',
        label: 'Settings',
        icon: <FaCog className="size-6" />,
      },
    ],
  },
];