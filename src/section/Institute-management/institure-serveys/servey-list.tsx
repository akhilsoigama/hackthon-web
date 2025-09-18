import { FaPlus, FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface SurveyData {
  id: number;
  title: string;
  institute: string;
  type: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive';
}

const InstituteSurveyList = () => {
  const surveys: SurveyData[] = [
    {
      id: 1,
      title: 'Annual Feedback 2025',
      institute: 'ABC University',
      type: 'Feedback',
      startDate: '2025-01-15',
      endDate: '2025-01-30',
      status: 'active',
    },
    {
      id: 2,
      title: 'Course Evaluation Survey',
      institute: 'XYZ College',
      type: 'Evaluation',
      startDate: '2025-02-01',
      endDate: '2025-02-10',
      status: 'inactive',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Institute Surveys</h1>
            <p className="text-gray-600 mt-2">Manage all institute surveys here.</p>
          </div>
          <button className="flex items-center px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
            <FaPlus className="mr-2" /> Add Survey
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {surveys.map((survey) => (
                <tr key={survey.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{survey.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.institute}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.startDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{survey.endDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${survey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <button className="text-blue-600 hover:text-blue-900" title="View">
                      <FaEye />
                    </button>
                    <button className="text-yellow-600 hover:text-yellow-900" title="Edit">
                      <FaEdit />
                    </button>
                    <button className="text-red-600 hover:text-red-900" title="Delete">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstituteSurveyList;