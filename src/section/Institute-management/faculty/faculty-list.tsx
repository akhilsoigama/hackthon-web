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
      status: 'active',
    },
    {
      id: 2,
      name: 'Ms. Jane Smith',
      facultyId: 'FAC002',
      designation: 'Lecturer',
      department: 'Mathematics',
      email: 'jane.smith@example.com',
      phone: '+91 9876501234',
      status: 'inactive',
    },
  ]);

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      setFaculty(faculty.filter((f) => f.id !== id));
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
              <FaUser className="mr-2 sm:mr-3 text-blue-600 text-lg sm:text-xl" />
              Faculty List
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              View and manage all faculty members in the system.
            </p>
          </div>
          <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-md shadow hover:bg-blue-700 transition-colors w-fit">
            <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" />
            Add Faculty
          </button>
        </div>

        {/* Mobile: Card Layout, Desktop: Table */}
        <div className="block lg:hidden">
          {faculty.length === 0 ? (
            <div className="text-center text-gray-500 p-6 bg-white rounded-lg shadow-md">
              No faculty members found.
            </div>
          ) : (
            faculty.map((f) => (
              <div
                key={f.id}
                className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{f.name}</h3>
                    <p className="text-sm text-gray-600">ID: {f.facultyId}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 p-1"
                      aria-label={`Edit ${f.name}`}
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      onClick={() => handleDelete(f.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      aria-label={`Delete ${f.name}`}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium">Designation:</span> {f.designation}</p>
                  <p><span className="font-medium">Department:</span> {f.department}</p>
                  <p className="flex items-center">
                    <FaEnvelope className="mr-2 text-gray-400" /> {f.email}
                  </p>
                  <p className="flex items-center">
                    <FaPhone className="mr-2 text-gray-400" /> {f.phone}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        f.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white shadow-md rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Faculty ID
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Designation
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Department
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Contact
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-4 py-3 sm:px-6 sm:py-4 text-center text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {faculty.map((f) => (
                  <tr key={f.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-800">{f.name}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{f.facultyId}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{f.designation}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{f.department}</td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">
                      <div className="flex flex-col">
                        <span className="flex items-center">
                          <FaEnvelope className="mr-2 text-gray-400" /> {f.email}
                        </span>
                        <span className="flex items-center mt-1">
                          <FaPhone className="mr-2 text-gray-400" /> {f.phone}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm">
                      <span
                        className={`px-2 inline-flex text-xs sm:text-sm font-semibold rounded-full ${
                          f.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {f.status.charAt(0).toUpperCase() + f.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 sm:px-6 sm:py-4 text-center text-sm font-medium space-x-3">
                      <button
                        className="text-blue-600 hover:text-blue-800 p-1"
                        aria-label={`Edit ${f.name}`}
                      >
                        <FaEdit className="text-lg" />
                      </button>
                      <button
                        onClick={() => handleDelete(f.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        aria-label={`Delete ${f.name}`}
                      >
                        <FaTrash className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
                {faculty.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-3 sm:px-6 sm:py-4 text-center text-gray-500 text-sm sm:text-base"
                    >
                      No faculty members found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyList;