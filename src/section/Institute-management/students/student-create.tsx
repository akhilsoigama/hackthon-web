import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  FaUser,
  FaIdCard,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import RHFDropDown from '../../../components/hook-form/RHFDropDown';
import RHFFormField from '../../../components/hook-form/RHFFormFiled';
import { toast } from 'sonner';

// Define Zod schema for validation
const studentFormSchema = z.object({
  name: z.string().min(1, 'Student name is required'),
  studentId: z.string().min(1, 'Student ID is required'),
  department: z.string().min(1, 'Department is required'),
  course: z.string().min(1, 'Course is required'),
  year: z.string().optional(),
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  address: z.string().optional(),
  dob: z.string().optional(),
  admissionDate: z.string().optional(),
  status: z.enum(['active', 'inactive']), // Remove .default('active') to align with defaultValues
});

// Infer TypeScript type from Zod schema
type StudentFormData = z.infer<typeof studentFormSchema>;

const StudentCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const formMethods = useForm<StudentFormData>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      name: '',
      studentId: '',
      department: '',
      course: '',
      year: '',
      email: '',
      phone: '',
      address: '',
      dob: '',
      admissionDate: '',
      status: 'active', // Default value is handled here
    },
  });

  const { handleSubmit, reset } = formMethods;

  const onSubmit = (data: StudentFormData) => {
    setIsSubmitting(true);
    toast.success('Student created successfully!');
    console.log(data)
  };

  const handleReset = () => {
    reset();
  };

  // Year options for dropdown
  const yearOptions = [
    { value: '', label: 'Select year' },
    { value: '1st', label: '1st Year' },
    { value: '2nd', label: '2nd Year' },
    { value: '3rd', label: '3rd Year' },
    { value: 'final', label: 'Final Year' },
  ];

  // Status options for dropdown
  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Create New Student
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new student to the system. Fill in all the required details below.
          </p>
        </div>

        {/* Form Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Student Basic Information */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                    Basic Information
                  </h2>
                </div>

                <RHFFormField
                  name="name"
                  label="Student Name"
                  type="text"
                  placeholder="Enter full name"
                  required
                  icon={<FaUser />}
                />

                <RHFFormField
                  name="studentId"
                  label="Student ID"
                  type="text"
                  placeholder="Enter unique ID"
                  required
                  icon={<FaIdCard />}
                />

                <RHFFormField
                  name="department"
                  label="Department"
                  type="text"
                  placeholder="Department name"
                  required
                />

                <RHFFormField
                  name="course"
                  label="Course"
                  type="text"
                  placeholder="Course name"
                  required
                />

                <RHFDropDown
                  name="year"
                  label="Year"
                  options={yearOptions}
                  placeholder="Select year"
                />

                {/* Contact Information */}
                <div className="md:col-span-2 mt-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                    Contact Information
                  </h2>
                </div>

                <RHFFormField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email address"
                  required
                  icon={<FaEnvelope />}
                />

                <RHFFormField
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  required
                  icon={<FaPhone />}
                />

                <div className="md:col-span-2">
                  <RHFFormField
                    name="address"
                    label="Address"
                    type="text"
                    placeholder="Residential address"
                    icon={<FaMapMarkerAlt />}
                  />
                </div>

                {/* Dates */}
                <RHFFormField
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  icon={<FaCalendarAlt />}
                />

                <RHFFormField
                  name="admissionDate"
                  label="Admission Date"
                  type="date"
                  icon={<FaCalendarAlt />}
                />

                {/* Status */}
                <div className="md:col-span-2">
                  <RHFDropDown
                    name="status"
                    label="Status"
                    options={statusOptions}
                  />
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
                  {isSubmitting ? 'Creating...' : 'Create Student'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-medium text-blue-800">Information</h3>
          <p className="text-blue-700 text-sm mt-1">
            After creating the student, you can enroll them in courses, assign faculty mentors, and track their academic progress in the system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentCreate;