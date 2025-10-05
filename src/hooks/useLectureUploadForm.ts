import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const lessonSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subject: z.string().min(1, 'Subject is required'),
  gradeLevel: z.string().min(1, 'Grade level is required'),
  duration: z.string().optional(),
  objectives: z.array(z.string()).min(1, 'At least one objective is required'),
  materials: z.array(z.string()).optional(),
  introduction: z.string().optional(),
  instruction: z.string().optional(),
  practice: z.string().optional(),
  conclusion: z.string().optional(),
  assessment: z.string().optional(),
  resources: z.array(z.object({
    type: z.string(),
    title: z.string(),
    url: z.string().url('Invalid URL format')
  })).optional(),
  standards: z.array(z.string()).optional(),
  differentiation: z.string().optional(),
  notes: z.string().optional(),
  termsAccepted: z.boolean().refine(val => val === true, 'You must accept the terms'),
  contentType: z.enum(['video', 'pdf', 'audio', 'text', 'image']),
  description: z.string().optional(),
  thumbnailUrl: z.string().url('Invalid URL format').optional(),
  contentUrl: z.string().url('Invalid URL format').optional(),
  durationInSeconds: z.number().min(1).optional(),
  textContent: z.string().optional()
});

export type LessonFormData = z.infer<typeof lessonSchema>;

export interface Resource {
  type: string;
  title: string;
  url: string;
}

export type ContentType = 'video' | 'pdf' | 'audio' | 'text' | 'image';

export const useLessonForm = () => {
  const methods = useForm<LessonFormData>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: '',
      subject: '',
      gradeLevel: '',
      duration: '',
      objectives: [''],
      materials: [''],
      introduction: '',
      instruction: '',
      practice: '',
      conclusion: '',
      assessment: '',
      resources: [],
      standards: [''],
      differentiation: '',
      notes: '',
      termsAccepted: false,
      contentType: 'video',
      description: '',
      thumbnailUrl: '',
      contentUrl: '',
      durationInSeconds: undefined,
      textContent: ''
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newResource, setNewResource] = useState({ type: 'link', title: '', url: '' });

  const { watch, setValue, getValues } = methods;

  const handleArrayInputChange = (field: keyof LessonFormData, index: number, value: string) => {
    const currentArray = getValues(field) as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    setValue(field, newArray);
  };

  const addArrayItem = (field: keyof LessonFormData) => {
    const currentArray = getValues(field) as string[];
    setValue(field, [...currentArray, '']);
  };

  const removeArrayItem = (field: keyof LessonFormData, index: number) => {
    const currentArray = getValues(field) as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    setValue(field, newArray);
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      const currentResources = getValues('resources') || [];
      setValue('resources', [...currentResources, { ...newResource }]);
      setNewResource({ type: 'link', title: '', url: '' });
    }
  };

  const handleRemoveResource = (index: number) => {
    const currentResources = getValues('resources') || [];
    setValue('resources', currentResources.filter((_, i) => i !== index));
  };

  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return {
    methods,
    currentStep,
    setCurrentStep,
    newResource,
    setNewResource,
    formData: watch(),
    handleArrayInputChange,
    addArrayItem,
    removeArrayItem,
    handleAddResource,
    handleRemoveResource,
    nextStep,
    prevStep
  };
};