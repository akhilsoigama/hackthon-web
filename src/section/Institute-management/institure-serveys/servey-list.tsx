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
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Institute Surveys</h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">Manage all institute surveys here.</p>
          </div>
          <button className="flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors w-fit">
            <FaPlus className="mr-1 sm:mr-2 text-sm sm:text-base" /> Add Survey
          </button>
        </div>

        {/* Mobile: Card Layout */}
        <div className="block lg:hidden">
          {surveys.length === 0 ? (
            <div className="text-center text-gray-500 p-6 bg-white rounded-lg shadow-md">
              No surveys found.
            </div>
          ) : (
            surveys.map((survey) => (
              <div
                key={survey.id}
                className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{survey.title}</h3>
                    <p className="text-sm text-gray-600">Institute: {survey.institute}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View"
                      aria-label={`View ${survey.title}`}
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-900 p-1"
                      title="Edit"
                      aria-label={`Edit ${survey.title}`}
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                      aria-label={`Delete ${survey.title}`}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-600 space-y-2">
                  <p><span className="font-medium">Type:</span> {survey.type}</p>
                  <p><span className="font-medium">Start Date:</span> {survey.startDate}</p>
                  <p><span className="font-medium">End Date:</span> {survey.endDate}</p>
                  <p>
                    <span className="font-medium">Status:</span>{' '}
                    <span
                      className={`inline-flex px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                        survey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden lg:block bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Institute
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  End Date
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-left text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 sm:px-6 sm:py-4 text-right text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {surveys.map((survey) => (
                <tr key={survey.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-800">{survey.title}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{survey.institute}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{survey.type}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{survey.startDate}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-600">{survey.endDate}</td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4">
                    <span
                      className={`px-2 inline-flex text-xs sm:text-sm font-semibold rounded-full ${
                        survey.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {survey.status.charAt(0).toUpperCase() + survey.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 sm:px-6 sm:py-4 text-right text-sm font-medium space-x-3">
                    <button
                      className="text-blue-600 hover:text-blue-900 p-1"
                      title="View"
                      aria-label={`View ${survey.title}`}
                    >
                      <FaEye className="text-lg" />
                    </button>
                    <button
                      className="text-yellow-600 hover:text-yellow-900 p-1"
                      title="Edit"
                      aria-label={`Edit ${survey.title}`}
                    >
                      <FaEdit className="text-lg" />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900 p-1"
                      title="Delete"
                      aria-label={`Delete ${survey.title}`}
                    >
                      <FaTrash className="text-lg" />
                    </button>
                  </td>
                </tr>
              ))}
              {surveys.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-3 sm:px-6 sm:py-4 text-center text-sm sm:text-base text-gray-500"
                  >
                    No surveys found.
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

export default InstituteSurveyList;