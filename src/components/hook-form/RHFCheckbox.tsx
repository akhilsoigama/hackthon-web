import React from 'react';
import { useFormContext, Controller, RegisterOptions } from 'react-hook-form';

interface RHFCheckboxProps {
  name: string;
  label: string | React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: RegisterOptions;
  description?: string;
  // For use outside of React Hook Form context
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RHFCheckbox: React.FC<RHFCheckboxProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  className = '',
  validation = {},
  description,
  checked: externalChecked,
  onChange: externalOnChange,
  ...props
}) => {
  const formContext = useFormContext();
  
  // If we're using this outside of RHF context, use the controlled component approach
  if (!formContext || externalOnChange) {
    return (
      <div className={`mb-4 ${className}`}>
        <div className="flex items-center">
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={externalChecked || false}
            onChange={externalOnChange}
            disabled={disabled}
            className={`
              h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
              ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
            `}
            {...props}
          />
          <label
            htmlFor={name}
            className={`ml-2 block text-sm font-medium text-gray-700 ${disabled ? 'text-gray-400' : ''}`}
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        {description && (
          <p className="mt-1 text-sm text-gray-500">
            {description}
          </p>
        )}
      </div>
    );
  }

  const {
    control,
    formState: { errors },
  } = formContext;

  const error = errors[name];

  return (
    <div className={`mb-4 ${className}`}>
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: required ? 'This field is required' : false, 
          ...validation 
        }}
        render={({ field }) => (
          <div className="relative flex items-start">
            <div className="flex items-center h-5">
              <input
                {...field}
                type="checkbox"
                id={name}
                disabled={disabled}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                className={`
                  h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500
                  ${error ? 'border-red-500' : ''}
                  ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''}
                `}
                {...props}
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor={name}
                className={`font-medium ${error ? 'text-red-700' : 'text-gray-700'} ${disabled ? 'text-gray-400' : ''}`}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {description && (
                <p className={`mt-1 ${error ? 'text-red-600' : 'text-gray-500'}`}>
                  {description}
                </p>
              )}
            </div>
          </div>
        )}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
          {error.message as string}
        </p>
      )}
    </div>
  );
};

export default RHFCheckbox;