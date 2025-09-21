import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FaUser,
  FaIdCard,
  FaBriefcase,
  FaGraduationCap,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import RHFDropDown from '../../../components/hook-form/RHFDropDown';
import { toast } from 'sonner';
import RHFFormField from '../../../components/hook-form/RHFFormFiled';

const facultySchema = z.object({
  name: z.string().min(1, 'Faculty name is required'),
  facultyId: z.string().min(1, 'Faculty ID is required'),
  designation: z.string().min(1, 'Designation is required'),
  department: z.string().min(1, 'Department is required'),
  qualification: z.string().optional(),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  phone: z.string().min(1, 'Phone number is required'),
  joiningDate: z.string().optional(),
  status: z.enum(['active', 'inactive']),
  rolePermission: z.string().min(1, 'Please select a role permission'),
});

type FacultyFormData = z.infer<typeof facultySchema>;

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'course_coordinator', label: 'Course Coordinator' },
  { value: 'lecturer', label: 'Lecturer' },
  { value: 'department_head', label: 'Department Head' },
];

const FacultyCreate = () => {
  const methods = useForm<FacultyFormData>({
    resolver: zodResolver(facultySchema),
    defaultValues: {
      name: '',
      facultyId: '',
      designation: '',
      department: '',
      qualification: '',
      email: '',
      phone: '',
      joiningDate: '',
      status: 'active',
      rolePermission: '', // Fixed to match schema
    },
  });

  const { control, handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: FacultyFormData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Faculty created successfully!');
      console.log(data)
      reset();
    } catch (error) {
      console.error('Error creating faculty:', error);
      toast.error('Failed to create faculty.');
    }
  };

  const handleReset = () => {
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Create New Faculty
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new faculty member to the system. Fill in all the required details below.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                    Basic Information
                  </h2>
                </div>

                <RHFFormField
                  name="name"
                  label="Faculty Name"
                  placeholder="Enter full name"
                  required
                  icon={<FaUser />}
                />
                <RHFFormField
                  name="facultyId"
                  label="Faculty ID"
                  placeholder="Enter unique ID"
                  required
                  icon={<FaIdCard />}
                />
                <RHFFormField
                  name="designation"
                  label="Designation"
                  placeholder="Professor / Lecturer"
                  required
                  icon={<FaBriefcase />}
                />
                <RHFFormField
                  name="department"
                  label="Department"
                  placeholder="Department name"
                  required
                />
                <RHFFormField
                  name="qualification"
                  label="Qualification"
                  placeholder="PhD / M.Tech / M.Sc."
                  icon={<FaGraduationCap />}
                />

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
                <RHFFormField
                  name="joiningDate"
                  label="Joining Date"
                  type="date"
                  icon={<FaCalendarAlt />}
                />

                <div className="md:col-span-2">
                  <RHFDropDown
                    name="rolePermission" // Fixed to match sschema
                    label="Role Permission"
                    options={roleOptions}
                    placeholder="Select a role"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <div className="flex items-center space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...control.register('status')}
                        value="active"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        {...control.register('status')}
                        value="inactive"
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>

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
                  {isSubmitting ? 'Creating...' : 'Create Faculty'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h3 className="font-medium text-blue-800">Information</h3>
          <p className="text-blue-700 text-sm mt-1">
            After creating the faculty, you can assign them to courses, departments, and roles within the institute management section.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FacultyCreate;