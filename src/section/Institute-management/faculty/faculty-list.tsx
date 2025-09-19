import { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

interface Faculty {
  id: number;
  name: string;
  facultyId: string;
  designation: string;
  department: string;
  email: string;
  phone: string;
  status: string;
}

const FacultyList = () => {
  const [faculty, setFaculty] = useState<Faculty[]>([
    {
      id: 1,
      name: 'Dr. John Doe',
      facultyId: 'FAC001',
      designation: 'Professor',
      department: 'Computer Science',
      email: 'john.doe@example.com',
      phone: '+91 9876543210',
      status: 'active'
    },
    {
      id: 2,
      name: 'Ms. Jane Smith',
      facultyId: 'FAC002',
      designation: 'Lecturer',
      department: 'Mathematics',
      email: 'jane.smith@example.com',
      phone: '+91 9876501234',
      status: 'inactive'
    }
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      setFaculty(faculty.filter(f => f.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className=" mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-3 text-blue-600" />
              Faculty List
            </h1>
            <p className="text-gray-600 mt-2">
              View and manage all faculty members in the system.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow hover:bg-blue-700">
            <FaPlus className="mr-2" />
            Add Faculty
          </button>
        </div>

        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Faculty ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Designation</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Department</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {faculty.map(f => (
                <tr key={f.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{f.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.facultyId}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.designation}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{f.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex flex-col">
                    <span className="flex items-center"><FaEnvelope className="mr-2 text-gray-400" /> {f.email}</span>
                    <span className="flex items-center mt-1"><FaPhone className="mr-2 text-gray-400" /> {f.phone}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${f.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-800">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(f.id)} className="text-red-600 hover:text-red-800">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {faculty.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                    No faculty members found.
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

export default FacultyList;