import { useState } from 'react';
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    setIsFilterOpen(false);
  };

  // Handle reset filters
  const handleReset = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setTypeFilter('All');
    setFilteredInstitutes(institutes);
    setIsFilterOpen(false);
  };

  // Show institute details
  const showDetails = (institute: Institute) => {
    setSelectedInstitute(institute);
  };

  // Close details view
  const closeDetails = () => {
    setSelectedInstitute(null);
  };

  // Toggle filter visibility on mobile
  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Institute List</h2>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors w-full md:w-auto"
            disabled
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="hidden md:inline">Add New Institute</span>
            <span className="md:hidden">Add Institute</span>
          </motion.button>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <motion.button 
            whileTap={{ scale: 0.95 }}
            onClick={toggleFilters}
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between"
          >
            <span>Filters</span>
            <svg 
              className={`w-5 h-5 transform transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </div>

        {/* Filters Section */}
        <motion.div 
          initial={false}
          animate={{ height: isFilterOpen ? 'auto' : 0, opacity: isFilterOpen ? 1 : 0 }}
          className="bg-white rounded-lg shadow-md p-4 mb-6 overflow-hidden md:overflow-visible md:h-auto md:opacity-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, code or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
              <button 
                onClick={handleSearch}
                className="absolute right-2 top-2 text-gray-500 hover:text-blue-600 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select 
              value={typeFilter} 
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              <option value="All">All Types</option>
              <option value="Engineering">Engineering</option>
              <option value="Medical">Medical</option>
              <option value="Business">Business</option>
              <option value="Arts & Science">Arts & Science</option>
              <option value="Law">Law</option>
            </select>
          </div>

          <div className="flex flex-col md:flex-row md:justify-end gap-2">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>Reset Filters</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Institute List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {filteredInstitutes.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-4 text-gray-600">No institutes found matching your criteria</p>
              <button 
                onClick={handleReset}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Established</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredInstitutes.map((institute, index) => (
                      <motion.tr 
                        key={institute.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{institute.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{institute.code}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{institute.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{institute.city}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{institute.establishedYear}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${institute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {institute.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => showDetails(institute)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                              title="View Details"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-indigo-600 hover:text-indigo-900 transition-colors"
                              title="Edit"
                              disabled
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </motion.button>
                            <motion.button 
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900 transition-colors"
                              title="Delete"
                              disabled
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden divide-y divide-gray-200">
                {filteredInstitutes.map((institute, index) => (
                  <motion.div 
                    key={institute.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{institute.name}</h3>
                        <p className="text-sm text-gray-500">{institute.code}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {institute.type}
                          </span>
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                            {institute.city}
                          </span>
                          <span className={`text-xs px-2 py-1 rounded-full ${institute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {institute.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Est: {institute.establishedYear}</p>
                      </div>
                      <div className="flex space-x-2 ml-2">
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => showDetails(institute)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                          title="View Details"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Institute Details Modal */}
      <AnimatePresence>
        {selectedInstitute && (
          <div className="fixed inset-0 overflow-y-auto z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
              onClick={closeDetails}
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
                <h3 className="text-xl font-semibold text-gray-800">{selectedInstitute.name} - Details</h3>
                <button 
                  onClick={closeDetails}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Basic Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Institute Code:</span>
                        <p className="font-medium">{selectedInstitute.code}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Type:</span>
                        <p className="font-medium">{selectedInstitute.type}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Established Year:</span>
                        <p className="font-medium">{selectedInstitute.establishedYear}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Affiliation:</span>
                        <p className="font-medium">{selectedInstitute.affiliation}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Campus Area:</span>
                        <p className="font-medium">{selectedInstitute.campusArea}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Status:</span>
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${selectedInstitute.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {selectedInstitute.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Contact Information</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-500">Address:</span>
                        <p className="font-medium">{selectedInstitute.address}, {selectedInstitute.city}, {selectedInstitute.state} - {selectedInstitute.pincode}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Country:</span>
                        <p className="font-medium">{selectedInstitute.country}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone:</span>
                        <p className="font-medium">{selectedInstitute.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <p className="font-medium">{selectedInstitute.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Website:</span>
                        <p className="font-medium">{selectedInstitute.website}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                    <h4 className="font-medium text-gray-700 mb-2">Principal Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Principal Name:</span>
                        <p className="font-medium">{selectedInstitute.principalName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Principal Contact:</span>
                        <p className="font-medium">{selectedInstitute.principalContact}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 px-6 py-3 flex justify-end">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeDetails}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
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