import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Institute {
  id: number;
  name: string;
  code: string;
  type: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  principalName: string;
  principalContact: string;
  establishedYear: string;
  affiliation: string;
  campusArea: string;
  status: 'Active' | 'Inactive';
}

const instituteData: Institute[] = [
  {
    id: 1,
    name: 'ABC Engineering College',
    code: 'ABC-ENG-001',
    type: 'Engineering',
    address: '123 Tech Street',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560001',
    country: 'India',
    phone: '+91-80-25555555',
    email: 'info@abceng.edu.in',
    website: 'www.abceng.edu.in',
    principalName: 'Dr. Rajesh Kumar',
    principalContact: '+91-9876543210',
    establishedYear: '1995',
    affiliation: 'VTU',
    campusArea: '25 acres',
    status: 'Active'
  },
  {
    id: 2,
    name: 'XYZ Medical College',
    code: 'XYZ-MED-002',
    type: 'Medical',
    address: '456 Health Avenue',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400001',
    country: 'India',
    phone: '+91-22-26666666',
    email: 'admin@xyzmed.edu.in',
    website: 'www.xyzmed.edu.in',
    principalName: 'Dr. Sunita Sharma',
    principalContact: '+91-9876543211',
    establishedYear: '1980',
    affiliation: 'MUHS',
    campusArea: '30 acres',
    status: 'Active'
  },
  {
    id: 3,
    name: 'PQR Business School',
    code: 'PQR-BUS-003',
    type: 'Business',
    address: '789 Commerce Road',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110001',
    country: 'India',
    phone: '+91-11-27777777',
    email: 'info@pqrbs.edu.in',
    website: 'www.pqrbs.edu.in',
    principalName: 'Dr. Amit Verma',
    principalContact: '+91-9876543212',
    establishedYear: '2005',
    affiliation: 'AICTE',
    campusArea: '15 acres',
    status: 'Inactive'
  },
  {
    id: 4,
    name: 'LMN Arts and Science College',
    code: 'LMN-ART-004',
    type: 'Arts & Science',
    address: '101 Culture Street',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600001',
    country: 'India',
    phone: '+91-44-28888888',
    email: 'contact@lmnarts.edu.in',
    website: 'www.lmnarts.edu.in',
    principalName: 'Dr. Priya Iyer',
    principalContact: '+91-9876543213',
    establishedYear: '1975',
    affiliation: 'Anna University',
    campusArea: '20 acres',
    status: 'Active'
  },
  {
    id: 5,
    name: 'RST Law College',
    code: 'RST-LAW-005',
    type: 'Law',
    address: '202 Justice Avenue',
    city: 'Kolkata',
    state: 'West Bengal',
    pincode: '700001',
    country: 'India',
    phone: '+91-33-29999999',
    email: 'admin@rstlaw.edu.in',
    website: 'www.rstlaw.edu.in',
    principalName: 'Dr. Sanjay Chatterjee',
    principalContact: '+91-9876543214',
    establishedYear: '1990',
    affiliation: 'BCI',
    campusArea: '10 acres',
    status: 'Active'
  }
];

const InstituteList = () => {
  const [institutes] = useState<Institute[]>(instituteData);
  const [filteredInstitutes, setFilteredInstitutes] = useState<Institute[]>(instituteData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedInstitute, setSelectedInstitute] = useState<Institute | null>(null);

  const [isGridView, setIsGridView] = useState(true);

  // Handle search and filtering
  const handleSearch = () => {
    let results = institutes;

    // Apply search term filter
    if (searchTerm) {
      results = results.filter(institute =>
        institute.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        institute.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'All') {
      results = results.filter(institute => institute.status === statusFilter);
    }

    // Apply type filter
    if (typeFilter !== 'All') {
      results = results.filter(institute => institute.type === typeFilter);
    }

    setFilteredInstitutes(results);

  };

  // Apply filters automatically when filters change
  useEffect(() => {
    handleSearch();
  }, [searchTerm, statusFilter, typeFilter]);

  // Handle reset filters
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTypeFilter('All');
    setFilteredInstitutes(institutes);
  };

  // Show institute details
  const showDetails = (institute: Institute) => {
    setSelectedInstitute(institute);
  };

  // Close details view
  const closeDetails = () => {
    setSelectedInstitute(null);
  };


  // Toggle between grid and list view
  const toggleView = () => {
    setIsGridView(!isGridView);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Institute Directory</h2>
            <p className="text-gray-600 mt-1">Manage and explore educational institutions</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleView}
              className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              title={isGridView ? "Switch to list view" : "Switch to grid view"}
            >
              {isGridView ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="hidden md:inline">Add Institute</span>
            </motion.button>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by name, code or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              >
                <option value="All">All Types</option>
                <option value="Engineering">Engineering</option>
                <option value="Medical">Medical</option>
                <option value="Business">Business</option>
                <option value="Arts & Science">Arts & Science</option>
                <option value="Law">Law</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReset}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg flex items-center justify-center space-x-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Reset</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex justify-between items-center">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredInstitutes.length}</span> of <span className="font-semibold">{institutes.length}</span> institutes
          </p>
        </div>

        {/* Institute List */}
        {filteredInstitutes.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
            <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-4 text-gray-600 text-lg font-medium">No institutes found</p>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria</p>
            <button
              onClick={handleReset}
              className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center mx-auto"
            >
              <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Clear all filters
            </button>
          </div>
        ) : isGridView ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredInstitutes.map((institute, index) => (
              <motion.div
                key={institute.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{institute.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">{institute.code}</p>
                    </div>
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${institute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {institute.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center text-sm text-gray-600">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{institute.city}, {institute.state}</span>
                  </div>

                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span>{institute.type}</span>
                  </div>

                  <div className="mt-3 flex items-center text-sm text-gray-600">
                    <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>Est. {institute.establishedYear}</span>
                  </div>
                </div>

                <div className="px-5 py-4 bg-gray-50 flex justify-between items-center">
                  <span className="text-sm text-gray-500">{institute.affiliation}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => showDetails(institute)}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    View details
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Established</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInstitutes.map((institute, index) => (
                    <motion.tr
                      key={institute.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6" data-label="Institute">
                        <div className="text-sm font-medium text-gray-900 truncate max-w-[150px] sm:max-w-[200px]">
                          {institute.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{institute.code}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6" data-label="Location">
                        <div className="text-sm text-gray-900 truncate max-w-[120px] sm:max-w-[150px]">
                          {institute.city}
                        </div>
                        <div className="text-sm text-gray-500 truncate">{institute.state}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden md:table-cell" data-label="Type">
                        <div className="text-sm text-gray-500">{institute.type}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6 hidden lg:table-cell" data-label="Established">
                        <div className="text-sm text-gray-500">{institute.establishedYear}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap sm:px-6" data-label="Status">
                        <span
                          className={`px-2.5 py-1 text-xs font-medium rounded-full ${institute.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                        >
                          {institute.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium sm:px-6" data-label="Actions">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => showDetails(institute)}
                          className="text-blue-600 hover:text-blue-900 transition-colors font-medium"
                        >
                          View Details
                        </motion.button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Institute Details Modal */}
      <AnimatePresence>
        {selectedInstitute && (
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-sm bg-opacity-50 transition-opacity"
              onClick={closeDetails}
            ></motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white scrollbar-hide rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <h3 className="text-xl font-semibold text-gray-800">{selectedInstitute.name}</h3>
                <button
                  onClick={closeDetails}
                  className="text-gray-400 hover:text-gray-600 transition-colors rounded-full p-1 hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Institute Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Institute Code</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.code}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Type</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.type}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Established Year</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.establishedYear}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Affiliation</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.affiliation}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Campus Area</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.campusArea}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Status</span>
                        <span className={`mt-1 px-2.5 py-1 text-xs font-medium rounded-full ${selectedInstitute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedInstitute.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Contact Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Address</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.address}</p>
                        <p className="mt-1 text-gray-900">{selectedInstitute.city}, {selectedInstitute.state} - {selectedInstitute.pincode}</p>
                        <p className="mt-1 text-gray-900">{selectedInstitute.country}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Phone</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.phone}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Email</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.email}</p>
                      </div>
                      <div>
                        <span className="block text-sm font-medium text-gray-500">Website</span>
                        <p className="mt-1 text-gray-900">{selectedInstitute.website}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">Principal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Principal Name</span>
                      <p className="mt-1 text-gray-900">{selectedInstitute.principalName}</p>
                    </div>
                    <div>
                      <span className="block text-sm font-medium text-gray-500">Principal Contact</span>
                      <p className="mt-1 text-gray-900">{selectedInstitute.principalContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeDetails}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstituteList;