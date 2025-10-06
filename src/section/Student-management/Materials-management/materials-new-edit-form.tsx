import React from 'react';
import { FormProvider } from 'react-hook-form';
import { LessonFormData, useLessonForm } from '../../../hooks/useLectureUploadForm';
import BasicInfoStep from '../../../components/lecture-upload-constant/basic-info-step';


const MaterialNewEditForm: React.FC = () => {
  const {
    methods,
    currentStep,

  } = useLessonForm();

  const onSubmit = (data: LessonFormData) => {
    console.log('Lesson created:', data);
    alert('Lesson created successfully!');
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen  p-4">
        <div className="">
          <form >
            {currentStep === 1 && (
              <BasicInfoStep
                watch={methods.watch}
                setValue={methods.setValue}
                getValues={methods.getValues}
              />
            )}
            <button
              type="submit"
              onClick={()=>onSubmit}
              className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default MaterialNewEditForm;