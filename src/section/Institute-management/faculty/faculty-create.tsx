import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
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
    <motion.div
      className="min-h-screen bg-gray-50 p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <FaUser className="mr-3 text-blue-600" />
            Create New Faculty
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new faculty member to the system. Fill in all the required details below.
          </p>
        </motion.div>

        <motion.div className="bg-white rounded-lg shadow-md p-6 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-6" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                    Basic Information
                  </h2>
                </div>

                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="name"
                  label="Faculty Name"
                  placeholder="Enter full name"
                  required
                  icon={<FaUser />}
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="facultyId"
                  label="Faculty ID"
                  placeholder="Enter unique ID"
                  required
                  icon={<FaIdCard />}
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="designation"
                  label="Designation"
                  placeholder="Professor / Lecturer"
                  required
                  icon={<FaBriefcase />}
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="department"
                  label="Department"
                  placeholder="Department name"
                  required
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="qualification"
                  label="Qualification"
                  placeholder="PhD / M.Tech / M.Sc."
                  icon={<FaGraduationCap />}
                /></motion.div>

                <div className="md:col-span-2 mt-6">
                  <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b">
                    Contact Information
                  </h2>
                </div>

                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="email"
                  label="Email"
                  type="email"
                  placeholder="Email address"
                  required
                  icon={<FaEnvelope />}
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="Phone number"
                  required
                  icon={<FaPhone />}
                /></motion.div>
                <motion.div variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}><RHFFormField
                  name="joiningDate"
                  label="Joining Date"
                  type="date"
                  icon={<FaCalendarAlt />}
                /></motion.div>

                <motion.div className="md:col-span-2" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
                  <RHFDropDown
                    name="rolePermission" // Fixed to match sschema
                    label="Role Permission"
                    options={roleOptions}
                    placeholder="Select a role"
                    required
                  />
                </motion.div>

                <motion.div className="md:col-span-2" variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}>
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
                </motion.div>
              </motion.div>

              <motion.div className="mt-8 flex justify-end space-x-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <motion.button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaTimes className="mr-2" />
                  Reset
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-75"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaSave className="mr-2" />
                  {isSubmitting ? 'Creating...' : 'Create Faculty'}
                </motion.button>
              </motion.div>
            </form>
          </FormProvider>
        </motion.div>

        <motion.div className="bg-blue-50 rounded-lg p-4 border border-blue-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <h3 className="font-medium text-blue-800">Information</h3>
          <p className="text-blue-700 text-sm mt-1">
            After creating the faculty, you can assign them to courses, departments, and roles within the institute management section.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FacultyCreate;