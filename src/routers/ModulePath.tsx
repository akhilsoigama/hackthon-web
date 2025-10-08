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
import { PermissionKeys } from '../utils/permission';

export const modules: any = [
  {
    moduleName: "Nabha Management (only for super admin)",
    permissions: [PermissionKeys.SUPER_ADMIN, PermissionKeys.ADMIN_ACCESS],
    links: [
      {
        to: '/dashboard/nabha-master/institute',
        label: 'Institute',
        icon: <FaHome className="size-6" />,
        permissions: [PermissionKeys.INSTITUTE_VIEW, PermissionKeys.INSTITUTE_LIST],
        subLinks: [
          {
            to: '/dashboard/nabha-master/institute/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.INSTITUTE_CREATE],
          },
          {
            to: '/dashboard/nabha-master/institute/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.INSTITUTE_LIST, PermissionKeys.INSTITUTE_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/servey-master',
        label: 'Govt. Survey',
        icon: <FaChartBar className="size-6" />,
        permissions: [PermissionKeys.SURVEY_VIEW, PermissionKeys.SURVEY_LIST],
        subLinks: [
          {
            to: '/dashboard/servey-master/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.SURVEY_CREATE],
          },
          {
            to: '/dashboard/servey-master/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.SURVEY_LIST, PermissionKeys.SURVEY_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/rolePermission',
        label: 'Role Permission',
        icon: <FaClipboardCheck className="size-6" />,
        permissions: [PermissionKeys.ROLES_VIEW, PermissionKeys.PERMISSIONS_VIEW],
        subLinks: [
          {
            to: '/dashboard/rolePermission/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.ROLES_CREATE, PermissionKeys.PERMISSIONS_ASSIGN],
          },
          {
            to: '/dashboard/rolePermission/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.ROLES_LIST, PermissionKeys.PERMISSIONS_LIST],
          },
        ],
      },
    ],
  },
  {
    moduleName: "Institute Management (only for institute admin)",
    permissions: [PermissionKeys.ADMIN_ACCESS, PermissionKeys.MODERATOR_ACCESS],
    links: [
      {
        to: '/dashboard/institute-management',
        label: 'Faculty',
        icon: <FaUsers className="size-6" />,
        permissions: [PermissionKeys.FACULTY_VIEW, PermissionKeys.FACULTY_LIST],
        subLinks: [
          {
            to: '/dashboard/institute-management/faculty/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.FACULTY_CREATE],
          },
          {
            to: '/dashboard/institute-management/faculty/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.FACULTY_LIST, PermissionKeys.FACULTY_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/institute-management/student',
        label: 'Student',
        icon: <FaUserGraduate className="size-6" />,
        permissions: [PermissionKeys.STUDENT_VIEW, PermissionKeys.STUDENT_LIST],
        subLinks: [
          {
            to: '/dashboard/institute-management/student/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.STUDENT_CREATE],
          },
          {
            to: '/dashboard/institute-management/student/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.STUDENT_LIST, PermissionKeys.STUDENT_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/institute-management/department',
        label: 'Department',
        icon: <FaUsers className="size-6" />,
        permissions: [PermissionKeys.DEPARTMENT_VIEW, PermissionKeys.DEPARTMENT_LIST],
        subLinks: [
          {
            to: '/dashboard/institute-management/department/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.DEPARTMENT_CREATE],
          },
          {
            to: '/dashboard/institute-management/department/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.DEPARTMENT_LIST, PermissionKeys.DEPARTMENT_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/institute-management/institute-servey',
        label: 'Institute Survey',
        icon: <FaClipboardList className="size-6" />,
        permissions: [PermissionKeys.INSTITUTE_SURVEY_VIEW, PermissionKeys.INSTITUTE_SURVEY_LIST],
        subLinks: [
          {
            to: '/dashboard/institute-management/institute-servey/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.INSTITUTE_SURVEY_CREATE],
          },
          {
            to: '/dashboard/institute-management/institute-servey/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.INSTITUTE_SURVEY_LIST, PermissionKeys.INSTITUTE_SURVEY_VIEW],
          },
        ],
      },
    ],
  },
  {
    moduleName: "Faculty Management (only for faculty)",
    permissions: [PermissionKeys.FACULTY_VIEW, PermissionKeys.FACULTY_UPDATE],
    links: [
      {
        to: '/dashboard/faculty-management/assignment',
        label: 'Assignment',
        icon: <FaBook className="size-6" />,
        permissions: [PermissionKeys.ASSIGNMENT_VIEW, PermissionKeys.ASSIGNMENT_LIST],
        subLinks: [
          {
            to: '/dashboard/faculty-managament/assignment/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.ASSIGNMENT_CREATE],
          },
          {
            to: '/dashboard/faculty-managament/assignment/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.ASSIGNMENT_LIST, PermissionKeys.ASSIGNMENT_VIEW],
          },
        ]
      },
      {
        to: '/dashboard/faculty-management/material',
        label: 'Student Material',
        icon: <FaBook className="size-6" />,
        permissions: [PermissionKeys.LESSON_VIEW, PermissionKeys.LESSON_LIST],
        subLinks: [
          {
            to: '/dashboard/faculty-managament/material/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.LESSON_CREATE, PermissionKeys.LECTURE_CREATE],
          },
          {
            to: '/dashboard/faculty-managament/material/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.LESSON_LIST, PermissionKeys.LECTURE_LIST],
          },
        ]
      },
      {
        to: '/dashboard/faculty-management/quiz',
        label: 'Quiz',
        icon: <FaBook className="size-6" />,
        permissions: [PermissionKeys.QUIZ_VIEW, PermissionKeys.QUIZ_LIST],
        subLinks: [
          {
            to: '/dashboard/faculty-managament/quiz/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.QUIZ_CREATE],
          },
          {
            to: '/dashboard/faculty-managament/quiz/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.QUIZ_LIST, PermissionKeys.QUIZ_VIEW],
          },
        ]
      },
      {
        to: '/dashboard/faculty-management/progress',
        label: 'faculty Progress',
        icon: <FaChartBar className="size-6" />,
        permissions: [PermissionKeys.PROGRESS_VIEW, PermissionKeys.PROGRESS_TRACK],
      },
      {
        to: '/dashboard/faculty-management/attendance',
        label: 'Attendance',
        icon: <FaClipboardCheck className="size-6" />,
        permissions: [PermissionKeys.REPORTS_VIEW, PermissionKeys.REPORTS_GENERATE],
      },
    ],
  },
  {
    moduleName: "Student Query(only for faculty)",
    permissions: [PermissionKeys.FACULTY_VIEW, PermissionKeys.MODERATOR_ACCESS],
    links: [
      {
        to: '/dashboard/qna/teacher',
        label: 'Student Q&A',
        icon: <FaQuestionCircle className="size-6" />,
        permissions: [PermissionKeys.MESSAGING_RECEIVE, PermissionKeys.MESSAGING_SEND],
        subLinks: [
          { 
            to: '/dashboard/qna/teacher/questions', 
            label: 'All Questions', 
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.REPORTS_VIEW],
          },
          { 
            to: '/dashboard/qna/teacher/answered', 
            label: 'Answered', 
            icon: <FaCheck className="size-6" />,
            permissions: [PermissionKeys.REPORTS_VIEW],
          },
          { 
            to: '/dashboard/qna/teacher/unanswered', 
            label: 'Unanswered', 
            icon: <FaTimes className="size-6" />,
            permissions: [PermissionKeys.REPORTS_VIEW],
          },
        ],
      },
    ],
  },
  {
    moduleName: "Leave Management (only for faculty and institute admin)",
    permissions: [PermissionKeys.LEAVE_VIEW, PermissionKeys.LEAVE_LIST],
    links: [
      {
        to: '/dashboard/Leave-management/Leave',
        label: 'Leave',
        icon: <FaSignOutAlt className="size-6" />,
        permissions: [PermissionKeys.LEAVE_VIEW, PermissionKeys.LEAVE_LIST],
        subLinks: [
          {
            to: '/dashboard/leave-management/leave/create',
            label: 'Create',
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.LEAVE_CREATE],
          },
          {
            to: '/dashboard/leave-management/leave/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.LEAVE_LIST, PermissionKeys.LEAVE_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/leave-management/leave-approval',
        label: 'Leave Approval',
        icon: <FaClipboardCheck className="size-6" />,
        permissions: [PermissionKeys.LEAVE_APPROVE, PermissionKeys.LEAVE_REJECT],
      },
    ],
  },
  {
    moduleName: "Student Upload (only for students)",
    permissions: [PermissionKeys.STUDENT_VIEW, PermissionKeys.STUDENT_UPDATE],
    links: [
      {
        to: '/dashboard/student-upload/assignment-upload',
        label: 'Assignment Upload',
        icon: <FaUpload className="size-6" />,
        permissions: [PermissionKeys.ASSIGNMENT_UPLOAD_VIEW, PermissionKeys.ASSIGNMENT_UPLOAD_LIST],
        subLinks: [
          {
            to: '/dashboard/student-upload/assignment-upload/upload',
            label: 'Upload',
            icon: <FaUpload className="size-6" />,
            permissions: [PermissionKeys.ASSIGNMENT_UPLOAD_CREATE, PermissionKeys.ASSIGNMENT_SUBMIT],
          },
          {
            to: '/dashboard/student-upload/assignment-upload/list',
            label: 'List',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.ASSIGNMENT_UPLOAD_LIST, PermissionKeys.ASSIGNMENT_UPLOAD_VIEW],
          },
        ],
      },
      {
        to: '/dashboard/student-upload/materials',
        label: 'Materials',
        icon: <FaBook className="size-6" />,
        permissions: [PermissionKeys.LESSON_VIEW, PermissionKeys.LESSON_UPLOAD_VIEW],
      },
    ],
  },
  {
    moduleName: "Dashboard (separate)",
    permissions: [PermissionKeys.DASHBOARD_OVERVIEW],
    links: [
      {
        to: '/dashboard/overview',
        label: 'Overview',
        icon: <FaHome className="size-6" />,
        permissions: [PermissionKeys.DASHBOARD_OVERVIEW],
      },
      {
        to: '/dashboard/progress',
        label: 'Progress',
        icon: <FaChartBar className="size-6" />,
        permissions: [PermissionKeys.DASHBOARD_PROGRESS, PermissionKeys.PROGRESS_VIEW],
      },
      {
        to: '/dashboard/Events',
        label: 'Events',
        icon: <FaCalendarAlt className="size-6" />,
        permissions: [PermissionKeys.DASHBOARD_EVENTS],
      },
      {
        to: '/dashboard/student-management/quize/list',
        label: 'Quiz',
        icon: <FaQuestionCircle className="size-6" />,
        permissions: [PermissionKeys.DASHBOARD_QUIZ, PermissionKeys.QUIZ_VIEW],
      }
    ],
  },
  {
    moduleName: "Gamification (only for students)",
    permissions: [PermissionKeys.STUDENT_VIEW, PermissionKeys.PROGRESS_TRACK],
    links: [
      {
        to: '/dashboard/gamification',
        label: 'Achievements / Badges',
        icon: <FaMedal className="size-6" />,
        permissions: [PermissionKeys.PROGRESS_VIEW, PermissionKeys.REPORTS_VIEW],
      },
    ],
  },
  {
    moduleName: "Offline Library (only for students and faculty)",
    permissions: [PermissionKeys.LESSON_VIEW, PermissionKeys.LESSON_UPLOAD_VIEW],
    links: [
      {
        to: '/dashboard/offline-library',
        label: 'Offline Library',
        icon: <FaDownload className="size-6" />,
        permissions: [PermissionKeys.LESSON_VIEW, PermissionKeys.LESSON_UPLOAD_VIEW],
        subLinks: [
          {
            to: '/dashboard/offline-library/lessons',
            label: 'Lessons',
            icon: <FaBook className="size-6" />,
            permissions: [PermissionKeys.LESSON_VIEW, PermissionKeys.LESSON_LIST],
          },
          {
            to: '/dashboard/offline-library/videos',
            label: 'Videos',
            icon: <FaBook className="size-6" />,
            permissions: [PermissionKeys.LECTURE_VIEW, PermissionKeys.LECTURE_LIST],
          },
          {
            to: '/dashboard/offline-library/audio',
            label: 'Audio Lessons',
            icon: <FaBook className="size-6" />,
            permissions: [PermissionKeys.LECTURE_VIEW, PermissionKeys.LECTURE_LIST],
          },
          {
            to: '/dashboard/offline-library/downloads',
            label: 'Downloaded Files',
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.LESSON_UPLOAD_LIST, PermissionKeys.LECTURE_LIST],
          },
          {
            to: '/dashboard/offline-library/manage',
            label: 'Manage Storage',
            icon: <FaTrash className="size-6" />,
            permissions: [PermissionKeys.LESSON_UPLOAD_DELETE, PermissionKeys.LECTURE_DELETE],
          },
        ],
      },
    ],
  },
  {
    moduleName: "Communication (only for institute admin and faculty)",
    permissions: [PermissionKeys.CHATBOT_ACCESS, PermissionKeys.MESSAGING_SEND],
    links: [
      {
        to: '/dashboard/chatbot',
        label: 'Chatbot',
        icon: <FaEnvelope className="size-6" />,
        permissions: [PermissionKeys.CHATBOT_ACCESS, PermissionKeys.MESSAGING_SEND],
      },
    ],
  },
  {
    moduleName: "Issue/Discussion (only for student)",
    permissions: [PermissionKeys.STUDENT_VIEW, PermissionKeys.MESSAGING_SEND],
    links: [
      {
        to: '/dashboard/qna',
        label: 'Q&A',
        icon: <FaQuestionCircle className="size-6" />,
        permissions: [PermissionKeys.MESSAGING_SEND, PermissionKeys.MESSAGING_RECEIVE],
        subLinks: [
          { 
            to: '/dashboard/qna/questions', 
            label: 'All Questions', 
            icon: <FaList className="size-6" />,
            permissions: [PermissionKeys.MESSAGING_RECEIVE],
          },
          { 
            to: '/dashboard/qna/ask', 
            label: 'Ask Question', 
            icon: <FaPlus className="size-6" />,
            permissions: [PermissionKeys.MESSAGING_SEND],
          },
        ],
      },
    ],
  },
  {
    moduleName: "Settings(over All)",
    permissions: [PermissionKeys.SETTINGS_VIEW],
    links: [
      {
        to: '/dashboard/settings',
        label: 'Settings',
        icon: <FaCog className="size-6" />,
        permissions: [PermissionKeys.SETTINGS_VIEW, PermissionKeys.SETTINGS_UPDATE],
      },
    ],
  },
];