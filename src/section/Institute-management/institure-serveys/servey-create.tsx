import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { FaPoll, FaCalendarAlt, FaUniversity, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'sonner';
import RHFDropDown from '../../../components/hook-form/RHFDropDown';
import RHFFormField from '../../../components/hook-form/RHFFormFiled';
import RHFImageUpload from '../../../components/hook-form/RHFImageUpload';

// Zod schema for form validation - updated with image field
const surveySchema = z.object({
  title: z.string().min(1, 'Survey title is required'),
  description: z.string().optional(),
  institute: z.string().min(1, 'Institute is required'),
  type: z.string().min(1, 'Survey type is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  status: z.enum(['active', 'inactive']),
  image: z.any().optional(), // For file uploads, we typically handle validation in the component
}).refine((data) => new Date(data.startDate) < new Date(data.endDate), {
  message: "End date must be after start date",
  path: ["endDate"],
});

// Type inferred from Zod schema
type SurveyFormData = z.infer<typeof surveySchema>;

// Survey type options for dropdown
const surveyTypeOptions = [
  { value: 'feedback', label: 'Feedback' },
  { value: 'assessment', label: 'Assessment' },
  { value: 'general', label: 'General' },
];

const SurveyCreate = () => {
  const methods = useForm<SurveyFormData>({
    resolver: zodResolver(surveySchema),
    defaultValues: {
      title: '',
      description: '',
      institute: '',
      type: '',
      startDate: '',
      endDate: '',
      status: 'active',
      image: null,
    },
  });

  const { control, handleSubmit, reset, formState: { isSubmitting } } = methods;

  const onSubmit = async (data: SurveyFormData) => {
    try {
      // Create FormData to handle file upload
      // const formData = new FormData();
      
      // Append all form fields to FormData
      // Object.keys(data).forEach(key => {
      //   if (key === 'image' && data[key]) {
      //     formData.append(key, data[key]);
      //   } else {
      //     formData.append(key, data[key] as string);
      //   }
      // });
      
      await new Promise((resolve) => setTimeout(resolve, 1200));
      toast.success('Survey created successfully!');
      console.log(data);
      reset();
    } catch (error) {
      console.error('Error creating survey:', error);
      toast.error('Failed to create survey.');
    }
  };

  const handleReset = () => {
    reset();
    toast.info('Form reset successfully.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center mb-6">
          <FaPoll className="mr-3 text-blue-600" />
          Create Survey
        </h1>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Section */}
                <div className="md:col-span-2">
                  <RHFImageUpload
                    name="image"
                    label="Survey Image"
                    maxSize={5}
                    accept="image/*"
                  />
                </div>

                <div className="md:col-span-2">
                  <RHFFormField
                    name="title"
                    label="Title"
                    placeholder="Survey title"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <RHFFormField
                    name="description"
                    label="Description"
                    placeholder="Survey description"
                  />
                </div>

                <div>
                  <RHFFormField
                    name="institute"
                    label="Institute"
                    placeholder="Institute name"
                    required
                    icon={<FaUniversity />}
                  />
                </div>

                <div>
                  <RHFDropDown
                    name="type"
                    label="Survey Type"
                    options={surveyTypeOptions}
                    placeholder="Select Type"
                    required
                  />
                </div>

                <div>
                  <RHFFormField
                    name="startDate"
                    label="Start Date"
                    type="date"
                    required
                    icon={<FaCalendarAlt />}
                  />
                </div>

                <div>
                  <RHFFormField
                    name="endDate"
                    label="End Date"
                    type="date"
                    required
                    icon={<FaCalendarAlt />}
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
                  {isSubmitting ? 'Creating...' : 'Create Survey'}
                </button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default SurveyCreate;