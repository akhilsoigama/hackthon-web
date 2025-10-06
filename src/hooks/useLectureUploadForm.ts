import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const lessonSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
  subject: z.string().min(1, 'Subject is required'),
  std: z.string().min(1, 'Grade level is required'),
  duration: z.string().optional(),
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
      std: '',
      duration: '',
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

  const { watch} = methods;




  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, 4));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  return {
    methods,
    currentStep,
    setCurrentStep,
    newResource,
    setNewResource,
    formData: watch(),
    nextStep,
    prevStep
  };
};