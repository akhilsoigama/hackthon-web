import { useState, ChangeEvent, FormEvent } from 'react';
import { FaPoll, FaCalendarAlt, FaUniversity, FaSave, FaTimes } from 'react-icons/fa';

interface SurveyForm {
  title: string;
  description: string;
  institute: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
}

interface SurveyErrors {
  title?: string;
  institute?: string;
  type?: string;
  startDate?: string;
  endDate?: string;
}

const SurveyCreate = () => {
  const [formData, setFormData] = useState<SurveyForm>({
    title: '',
    description: '',
    institute: '',
    type: '',
    startDate: '',
    endDate: '',
    status: 'active'
  });

  const [errors, setErrors] = useState<SurveyErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof SurveyErrors]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SurveyErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Survey title is required';
    if (!formData.institute.trim()) newErrors.institute = 'Institute is required';
    if (!formData.type.trim()) newErrors.type = 'Survey type is required';
    if (!formData.startDate.trim()) newErrors.startDate = 'Start date is required';
    if (!formData.endDate.trim()) newErrors.endDate = 'End date is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        alert('Survey created successfully!');
        setIsSubmitting(false);
        setFormData({
          title: '',
          description: '',
          institute: '',
          type: '',
          startDate: '',
          endDate: '',
          status: 'active'
        });
      }, 1200);
    }
  };

  const handleReset = () => {
    setFormData({
      title: '',
      description: '',
      institute: '',
      type: '',
      startDate: '',
      endDate: '',
      status: 'active'
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <FaPoll className="mr-3 text-blue-600" />
          Create Survey
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.title ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                  placeholder="Survey title"
                />
                {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="Survey description"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Institute <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaUniversity />
                  </span>
                  <input
                    type="text"
                    name="institute"
                    value={formData.institute}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.institute ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                    placeholder="Institute name"
                  />
                </div>
                {errors.institute && <p className="text-sm text-red-500 mt-1">{errors.institute}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Survey Type <span className="text-red-500">*</span></label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${errors.type ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                >
                  <option value="">Select Type</option>
                  <option value="feedback">Feedback</option>
                  <option value="assessment">Assessment</option>
                  <option value="general">General</option>
                </select>
                {errors.type && <p className="text-sm text-red-500 mt-1">{errors.type}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.startDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                  />
                </div>
                {errors.startDate && <p className="text-sm text-red-500 mt-1">{errors.startDate}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    <FaCalendarAlt />
                  </span>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`pl-10 w-full rounded-md border ${errors.endDate ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
                  />
                </div>
                {errors.endDate && <p className="text-sm text-red-500 mt-1">{errors.endDate}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex items-center space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleChange}
                      className="text-blue-600"
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
                      className="text-blue-600"
                    />
                    <span className="ml-2">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button type="button" onClick={handleReset} className="flex items-center px-4 py-2 border rounded-md text-gray-700 bg-white hover:bg-gray-50">
                <FaTimes className="mr-2" /> Reset
              </button>
              <button type="submit" disabled={isSubmitting} className="flex items-center px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-75">
                <FaSave className="mr-2" />
                {isSubmitting ? 'Creating...' : 'Create Survey'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreate;