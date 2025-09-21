import React from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';

interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface RHFDropDownProps {
  name: string;
  label?: string; // Made optional
  options: SelectOption[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: RegisterOptions;
  // For use outside of React Hook Form context
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const RHFDropDown: React.FC<RHFDropDownProps> = ({
  name,
  label, // Now optional
  options,
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  validation = {},
  value: externalValue,
  onChange: externalOnChange,
  ...props
}) => {
  const formContext = useFormContext();
  
  // If we're using this outside of RHF context, use the controlled component approach
  if (!formContext || externalOnChange) {
    return (
      <div className={`mb-5 ${className}`}>
        {label && (
          <label 
            htmlFor={name} 
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          <select
            id={name}
            name={name}
            value={externalValue || ''}
            onChange={externalOnChange}
            disabled={disabled}
            className={`
              w-full px-4 py-3 border rounded-lg appearance-none
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
              transition duration-200 ease-in-out
              ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white'}
              shadow-sm
              pr-10
            `}
            {...props}
          >
            <option value="" className="text-gray-400">
              {placeholder}
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={option.disabled ? 'text-gray-400' : ''}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
            <svg 
              className="h-5 w-5" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  const {
    control,
    formState: { errors },
  } = formContext;

  const error = errors[name];

  return (
    <div className={`mb-5 ${className}`}>
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: required ? 'This field is required' : false, 
          ...validation 
        }}
        render={({ field }) => (
          <div className="relative">
            <select
              {...field}
              id={name}
              disabled={disabled}
              className={`
                w-full px-4 py-3 border rounded-lg appearance-none
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                transition duration-200 ease-in-out
                ${error 
                  ? 'border-red-500 text-red-900 bg-red-50' 
                  : 'border-gray-300 bg-white'
                }
                ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
                shadow-sm
                pr-10
              `}
              {...props}
            >
              <option value="" className="text-gray-400">
                {placeholder}
              </option>
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className={option.disabled ? 'text-gray-400' : ''}
                >
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
              <svg 
                className="h-5 w-5" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
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

export default RHFDropDown;