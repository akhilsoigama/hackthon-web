import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../section/Sidebar';
import Dashboard from '../section/Navbaar';
import Progress from '../section/Progress';
// import Assignments from '../section/Assignment';
import Calendar from '../section/Calendar';
import Messages from '../section/Message';
import Settings from '../section/Settings';
import Overview from '../section/overview';

// Nabha Management
import InstituteCreate from '../section/Nabha-management/institute-management/Institute-create';
import InstituteList from '../section/Nabha-management/institute-management/Institute-list';
import GovtServeyCreate from '../section/Nabha-management/servey-master/Govt-Servey-Create';
import GovtServeyList from '../section/Nabha-management/servey-master/Govt-Servey-List';
import RolePermissionCreate from '../section/Nabha-management/Role-permission/Role-Permission-Create';
import RolePermissionList from '../section/Nabha-management/Role-permission/Role-Permission-List';
import AssignmentCreate from '../section/Student-management/Assignment-master/assignment-create';
import AssignmentList from '../section/Student-management/Assignment-master/assignment-list';
import LessonCreate from '../section/Student-management/Lession-master/lession-create';
import LessonList from '../section/Student-management/Lession-master/lession-list';
import QuizCreate from '../section/Student-management/Quiz-master/quiz-create';
import QuizList from '../section/Student-management/Quiz-master/quiz-list';
import LeaveCreate from '../section/Leave-management/Leave-master/leave-create';
import LeaveList from '../section/Leave-management/Leave-master/leave-list';
import LeaveApprovalDone from '../section/Leave-management/Leave-Approval-master/leave-approval-done';
import AssignmentUploadCreate from '../section/Student-upload/Assignment-upload/assignment-upload-create';
import AssignmentUploadList from '../section/Student-upload/Assignment-upload/assignment-upload-list';
import LessionUploadCreate from '../section/Student-upload/Lession-upload/lession-upload-create';
import LessonUploadList from '../section/Student-upload/Lession-upload/lession-upload-list';
import Quiz from '../section/quiz';


export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <Dashboard />
            </div>
          }
        >
          {/* Dashboard Routes */}
          <Route path="overview" element={<Overview />} />
          <Route path="progress" element={<Progress />} />
          <Route path="events" element={<Calendar />} />
          <Route path="quize" element={<Quiz />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />

          {/* Nabha Management Routes */}
          <Route path="nabha-master/institute/create" element={<InstituteCreate />} />
          <Route path="nabha-master/institute/list" element={<InstituteList />} />
          <Route path="servey-master/create" element={<GovtServeyCreate />} />
          <Route path="servey-master/list" element={<GovtServeyList />} />
          <Route path="rolePermission/create" element={<RolePermissionCreate />} />
          <Route path="rolePermission/list" element={<RolePermissionList />} />

          {/* Institute Management Routes */}
          {/* <Route path="institute-management/faculty/create" element={<FacultyCreate />} />
          <Route path="institute-management/faculty/list" element={<FacultyList />} />
          <Route path="institute-management/student/create" element={<StudentCreate />} />
          <Route path="institute-management/student/list" element={<StudentList />} />
          <Route path="institute-management/institute-servey/create" element={<InstituteSurveyCreate />} />
          <Route path="institute-management/institute-servey/list" element={<InstituteSurveyList />} /> */}

          {/* Student Management Routes */}
          <Route path="student-management/assignment/create" element={<AssignmentCreate />} />
          <Route path="student-management/assignment/list" element={<AssignmentList />} />
          <Route path="student-management/lession/create" element={<LessonCreate />} />
          <Route path="student-management/lession/list" element={<LessonList />} />
          <Route path="student-management/quize/create" element={<QuizCreate />} />
          <Route path="student-management/quize/list" element={<QuizList />} />

          {/* Leave Management Routes */}
          <Route path="leave-management/leave/create" element={<LeaveCreate />} />
          <Route path="leave-management/leave/list" element={<LeaveList />} />
          <Route path="leave-management/leave-approval" element={<LeaveApprovalDone />} />

          {/* Student Upload Routes */}
          <Route path="student-upload/assignment-upload/upload" element={<AssignmentUploadCreate />} />
          <Route path="student-upload/assignment-upload/list" element={<AssignmentUploadList />} />
          <Route path="student-upload/lession-upload/upload" element={<LessionUploadCreate />} />
          <Route path="student-upload/lession-upload/list" element={<LessonUploadList />} />

          {/* Communication Routes */}
          {/* <Route path="chatbot" element={<Chatbot />} /> */}

          {/* Default route */}
          <Route index element={<Overview />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}