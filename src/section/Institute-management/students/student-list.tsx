import { useState } from 'react';
import { FaUserGraduate, FaEnvelope, FaPhone, FaIdCard, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Student {
  id: number;
  name: string;
  studentId: string;
  department: string;
  course: string;
  year: string;
  email: string;
  phone: string;
  status: string;
}

const StudentList = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Alice Johnson',
      studentId: 'STU001',
      department: 'Computer Science',
      course: 'B.Tech',
      year: '3rd',
      email: 'alice.johnson@example.com',
      phone: '+91 9876543211',
      status: 'active'
    },
    {
      id: 2,
      name: 'Bob Williams',
      studentId: 'STU002',
      department: 'Mechanical Engineering',
      course: 'B.E.',
      year: '2nd',
      email: 'bob.williams@example.com',
      phone: '+91 9876509876',
      status: 'inactive'
    }
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaUserGraduate className="mr-3 text-blue-600" />
              Student List
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all students in the system.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700">
            <FaPlus className="mr-2" />
            Add Student
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Student ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Course</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Year</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.map(s => (
                <tr key={s.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{s.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center">
                    <FaIdCard className="mr-2 text-gray-400" /> {s.studentId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{s.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{s.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{s.year}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex flex-col">
                    <span className="flex items-center"><FaEnvelope className="mr-2 text-gray-400" /> {s.email}</span>
                    <span className="flex items-center mt-1"><FaPhone className="mr-2 text-gray-400" /> {s.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${s.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {s.status.charAt(0).toUpperCase() + s.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-4 text-center text-gray-500">
                    No students found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;