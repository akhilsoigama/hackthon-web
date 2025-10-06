import React from 'react';
import { UseFormWatch, UseFormSetValue, UseFormGetValues } from 'react-hook-form';

import { FaClock } from 'react-icons/fa';
import { ContentType, LessonFormData } from '../../hooks/useLectureUploadForm';
import ContentTypeSelector from './lecture-content-type';
import ContentTypeFields from './content-type';
import RHFFormField from '../hook-form/RHFFormFiled';
import RHFDropDown from '../hook-form/RHFDropDown';
import { gradeLevels, subjects } from './lecture-upload-constant';

interface BasicInfoStepProps {
    watch: UseFormWatch<LessonFormData>;
    setValue: UseFormSetValue<LessonFormData>;
    getValues: UseFormGetValues<LessonFormData>;
}

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({
    watch,
    setValue,
}) => {

    const handleContentTypeChange = (type: ContentType) => {
        setValue('contentType', type);
        // Reset content-specific fields when type changes
        if (type !== 'text') setValue('textContent', '');
        if (type !== 'video' && type !== 'audio') setValue('durationInSeconds', undefined);
        if (type !== 'video') setValue('thumbnailUrl', '');
    };

    return (
        <div className="mb-5">
            <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                Student material Create
            </h2>

            <ContentTypeSelector
                watch={watch}
                onContentTypeChange={handleContentTypeChange}
            />


            <RHFFormField
                name="title"
                label="Material Title"
                type="text"
                placeholder="Enter Material title"
                required
            />

            <RHFFormField
                name="description"
                label="Description"
                placeholder="Enter Material description"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <RHFDropDown
                    name="subject"
                    label="Subject"
                    options={subjects.map(subject => ({ value: subject, label: subject }))}
                    placeholder="Select a subject"
                    required
                />

                <RHFDropDown
                    name="std"
                    label="Select STD"
                    options={gradeLevels.map(level => ({ value: level, label: level }))}
                    placeholder="Select grade level"
                    required
                />
            </div>

            <RHFFormField
                name="duration"
                label="Estimated Duration"
                type="date"
                placeholder="e.g., 45 minutes, 2 class periods"
                icon={<FaClock className="text-indigo-500" />}
            />
            <ContentTypeFields watch={watch} />

        </div>
    );
};

export default BasicInfoStep;