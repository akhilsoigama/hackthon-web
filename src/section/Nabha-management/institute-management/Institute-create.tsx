import { useState, ChangeEvent, FormEvent } from 'react';
import { 
  FaUniversity, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaGlobe, 
  FaUser, 
  FaIdCard, 
  FaSave, 
  FaTimes 
} from 'react-icons/fa';

interface FormData {
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
  status: string;
}

interface FormErrors {
  name?: string;
  code?: string;
  type?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  phone?: string;
  email?: string;
}

const InstituteCreate = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    type: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    principalName: '',
    principalContact: '',
    establishedYear: '',
    affiliation: '',
    campusArea: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Institute name is required';
    if (!formData.code.trim()) newErrors.code = 'Institute code is required';
    if (!formData.type) newErrors.type = 'Please select institute type';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        alert('Institute created successfully!');
        setIsSubmitting(false);
        // Reset form
        setFormData({
          name: '',
          code: '',
          type: '',
          address: '',
          city: '',
          state: '',
          pincode: '',
          country: '',
          phone: '',
          email: '',
          website: '',
          principalName: '',
          principalContact: '',
          establishedYear: '',
          affiliation: '',
          campusArea: '',
          status: 'active'
        });
      }, 1500);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      code: '',
      type: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      country: '',
      phone: '',
      email: '',
      website: '',
      principalName: '',
      principalContact: '',
      establishedYear: '',
      affiliation: '',
      campusArea: '',
      status: 'active'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUniversity className="mr-3 text-blue-600" />
            Create New Institute
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new educational institute to the system. Fill in all the required details below.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institute Basic Information */}
              <div className="md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Basic Information
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaUniversity />
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter institute name"
                  />
                </div>
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Code <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaIdCard />
                  </span>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.code ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter unique code"
                  />
                </div>
                {errors.code && <p className="mt-1 text-sm text-red-500">{errors.code}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Institute Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.type ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Type</option>
                  <option value="school">School</option>
                  <option value="college">College</option>
                  <option value="university">University</option>
                  <option value="training">Training Institute</option>
                </select>
                {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Established Year
                </label>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={handleChange}
                  min="1900"
                  max={new Date().getFullYear()}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Year"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Affiliation
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Affiliation body"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Campus Area (sq. ft.)
                </label>
                <input
                  type="number"
                  name="campusArea"
                  value={formData.campusArea}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Area in square feet"
                />
              </div>

              {/* Contact Information */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Contact Information
                </h2>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaMapMarkerAlt />
                  </span>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.address ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Street address"
                  />
                </div>
                {errors.address && <p className="mt-1 text-sm text-red-500">{errors.address}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.city ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="City"
                />
                {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.state ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="State"
                />
                {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.pincode ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  placeholder="Pincode"
                />
                {errors.pincode && <p className="mt-1 text-sm text-red-500">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaPhone />
                  </span>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Phone number"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    placeholder="Email address"
                  />
                </div>
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Website
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaGlobe />
                  </span>
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Website URL"
                  />
                </div>
              </div>

              {/* Principal Information */}
              <div className="md:col-span-2 mt-6">
                <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                  Principal Information
                </h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Name
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    type="text"
                    name="principalName"
                    value={formData.principalName}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Full name"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Principal Contact
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaPhone />
                  </span>
                  <input
                    type="text"
                    name="principalContact"
                    value={formData.principalContact}
                    onChange={handleChange}
                    className="pl-10 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contact number"
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Active</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleChange}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <FaTimes className="mr-2" />
                Reset
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
              >
                <FaSave className="mr-2" />
                {isSubmitting ? 'Creating...' : 'Create Institute'}
              </button>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-medium text-blue-800">Information</h3>
          <p className="text-blue-700 text-sm mt-1">
            After creating the institute, you can add departments, courses, and faculty members from the institute management section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstituteCreate;