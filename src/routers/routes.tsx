import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, Suspense, lazy } from "react";
import Navbaar from "../section/Navbaar";
import Sidebar from "../section/Sidebar";

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

const Progress = lazy(() => import("../section/Progress"));
const Events = lazy(() => import("../section/Events"));
const ChatBot = lazy(() => import("../section/ChatBot"));
const Settings = lazy(() => import("../section/Settings"));
const Overview = lazy(() => import("../section/overview"));
const Quiz = lazy(() => import("../section/quiz"));

// Authentication
const Login = lazy(() => import("../section/auth/login"));

// Nabha Management
const InstituteCreate = lazy(
  () =>
    import("../section/Nabha-management/institute-management/Institute-create")
);
const InstituteList = lazy(
  () =>
    import("../section/Nabha-management/institute-management/Institute-list")
);
const GovtServeyCreate = lazy(
  () => import("../section/Nabha-management/servey-master/Govt-Servey-Create")
);
const GovtServeyList = lazy(
  () => import("../section/Nabha-management/servey-master/Govt-Servey-List")
);
const RolePermissionCreate = lazy(
  () =>
    import("../section/Nabha-management/Role-permission/Role-Permission-Create")
);
const RolePermissionList = lazy(
  () =>
    import("../section/Nabha-management/Role-permission/Role-Permission-List")
);

// Institute Management
const FacultyCreate = lazy(
  () => import("../section/Institute-management/faculty/faculty-create")
);
const FacultyList = lazy(
  () => import("../section/Institute-management/faculty/faculty-list")
);
const StudentCreate = lazy(
  () => import("../section/Institute-management/students/student-create")
);
const StudentList = lazy(
  () => import("../section/Institute-management/students/student-list")
);
const InstituteSurveyCreate = lazy(
  () =>
    import("../section/Institute-management/institure-serveys/servey-create")
);
const InstituteSurveyList = lazy(
  () => import("../section/Institute-management/institure-serveys/servey-list")
);
const DepartmentCreate = lazy(
  () =>
    import(
      "../section/Institute-management/department-master/department-create"
    )
);
const DepartmentList = lazy(
  () =>
    import("../section/Institute-management/department-master/department-list")
);

// In your Routers.tsx - check this path
const AssignmentCreate = lazy(
  () =>
    import("../section/Student-management/Assignment-master/assignment-create")
);
const AssignmentList = lazy(
  () =>
    import("../section/Student-management/Assignment-master/assignment-list")
);
const MaterialCreate = lazy(
  () => import("../section/Student-management/Material-master/Material-create")
);
const MaterialList = lazy(
  () => import("../section/Student-management/Material-master/Material-list")
);
const QuizCreate = lazy(
  () => import("../section/Student-management/Quiz-master/quiz-create")
);
const QuizList = lazy(
  () => import("../section/Student-management/Quiz-master/quiz-list")
);
const StudentProgress = lazy(
  () =>
    import("../section/Student-management/Student-Progress/Student-Progress")
);

// Leave Management
const LeaveCreate = lazy(
  () => import("../section/Leave-management/Leave-master/leave-create")
);
const LeaveList = lazy(
  () => import("../section/Leave-management/Leave-master/leave-list")
);
const LeaveApprovalDone = lazy(
  () =>
    import(
      "../section/Leave-management/Leave-Approval-master/leave-approval-done"
    )
);

// Student Upload
const AssignmentUploadCreate = lazy(
  () =>
    import(
      "../section/Student-upload/Assignment-upload/assignment-upload-create"
    )
);
const AssignmentUploadList = lazy(
  () =>
    import("../section/Student-upload/Assignment-upload/assignment-upload-list")
);
const StudentMaterialList = lazy(
  () => import("../section/Student-upload/Material/Material-list")
);

export default function Routers() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen((prev) => !prev);
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root path to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route
          path="/login"
          element={
            <Suspense fallback={<LoadingSpinner />}>
              <Login />
            </Suspense>
          }
        />

        <Route
          path="/dashboard"
          element={
            <div className="flex min-h-screen w-full">
              <Sidebar
                isMobileOpen={isMobileSidebarOpen}
                toggleMobileSidebar={toggleMobileSidebar}
              />
                <Navbaar toggleMobileSidebar={toggleMobileSidebar} />
            </div>
          }
        >
          {/* Dashboard Routes */}
          <Route
            index
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Overview />
              </Suspense>
            }
          />
          <Route
            path="overview"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Overview />
              </Suspense>
            }
          />
          <Route
            path="progress"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Progress />
              </Suspense>
            }
          />
          <Route
            path="events"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Events />
              </Suspense>
            }
          />
          <Route
            path="quize"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Quiz />
              </Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <Settings />
              </Suspense>
            }
          />
          <Route
            path="chatbot"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ChatBot />
              </Suspense>
            }
          />

          {/* Nabha Management Routes */}
          <Route
            path="nabha-master/institute/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <InstituteCreate />
              </Suspense>
            }
          />
          <Route
            path="nabha-master/institute/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <InstituteList />
              </Suspense>
            }
          />
          <Route
            path="servey-master/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GovtServeyCreate />
              </Suspense>
            }
          />
          <Route
            path="servey-master/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <GovtServeyList />
              </Suspense>
            }
          />
          <Route
            path="rolePermission/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <RolePermissionCreate />
              </Suspense>
            }
          />
          <Route
            path="rolePermission/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <RolePermissionList />
              </Suspense>
            }
          />

          {/* Institute Management Routes */}
          <Route
            path="institute-management/faculty/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyCreate />
              </Suspense>
            }
          />
          <Route
            path="institute-management/faculty/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <FacultyList />
              </Suspense>
            }
          />
          <Route
            path="institute-management/student/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <StudentCreate />
              </Suspense>
            }
          />
          <Route
            path="institute-management/student/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <StudentList />
              </Suspense>
            }
          />
          <Route
            path="institute-management/institute-servey/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <InstituteSurveyCreate />
              </Suspense>
            }
          />
          <Route
            path="institute-management/institute-servey/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <InstituteSurveyList />
              </Suspense>
            }
          />
          <Route
            path="institute-management/department/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DepartmentCreate />
              </Suspense>
            }
          />
          <Route
            path="institute-management/department/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <DepartmentList />
              </Suspense>
            }
          />
          {/* Student Management Routes */}
          <Route
            path="student-management/assignment/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AssignmentCreate />
              </Suspense>
            }
          />
          <Route
            path="student-management/assignment/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AssignmentList />
              </Suspense>
            }
          />
          <Route
            path="student-management/material/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MaterialCreate />
              </Suspense>
            }
          />
          <Route
            path="student-management/material/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MaterialList />
              </Suspense>
            }
          />
          <Route
            path="student-management/quize/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <QuizCreate />
              </Suspense>
            }
          />
          <Route
            path="student-management/quize/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <QuizList />
              </Suspense>
            }
          />
          <Route
            path="student-management/progress"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <StudentProgress />
              </Suspense>
            }
          />

          {/* Leave Management Routes */}
          <Route
            path="leave-management/leave/create"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LeaveCreate />
              </Suspense>
            }
          />
          <Route
            path="leave-management/leave/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LeaveList />
              </Suspense>
            }
          />
          <Route
            path="leave-management/leave-approval"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <LeaveApprovalDone />
              </Suspense>
            }
          />

          {/* Student Upload Routes */}
          <Route
            path="student-upload/assignment-upload/upload"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AssignmentUploadCreate />
              </Suspense>
            }
          />
          <Route
            path="student-upload/assignment-upload/list"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AssignmentUploadList />
              </Suspense>
            }
          />
          <Route
            path="student-upload/materials"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <StudentMaterialList />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
