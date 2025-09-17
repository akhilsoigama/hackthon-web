import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from '../section/Sidebar';
import Dashboard from '../section/Navbaar';
import Progress from '../section/Progress';
import Assignments from '../section/Assignment';
import Calendar from '../section/Calendar';
import Messages from '../section/Message';
import Settings from '../section/Settings';
import Overview from '../section/overview';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <div className="flex min-h-screen w-full">
              <Sidebar />
              <Dashboard  />
            </div>
          }
        >
          <Route path="overview" element={<Overview />} />
          <Route path="progress" element={<Progress />} />
          <Route path="assignments" element={<Assignments />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}