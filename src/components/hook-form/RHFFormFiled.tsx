import React from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';

interface RHFFormFieldProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'date'|'time' | 'datetime-local';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: RegisterOptions;
  autoComplete?: string;
  icon?: React.ReactNode;
  min?: string | number;
  max?: string | number;
}

const RHFFormField: React.FC<RHFFormFieldProps> = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  validation = {},
  autoComplete = 'off',
  icon,
  min,
  max,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={`mb-5 ${className}`}>
      <label 
        htmlFor={name} 
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            {icon && (
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                {icon}
              </span>
            )}
            <input
              {...field}
              type={type}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              autoComplete={autoComplete}
              min={min}
              max={max}
              className={`
                w-full px-4 py-3 border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-200 ease-in-out
                ${error 
                  ? 'border-red-500 text-red-900 placeholder-red-300 bg-red-50' 
                  : 'border-gray-300 placeholder-gray-400 bg-white'
                }
                ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
                ${icon ? 'pl-10' : 'pl-4'}
                shadow-sm
              `}
              {...props}
            />
          </div>
        )}
      />
      
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default RHFFormField;