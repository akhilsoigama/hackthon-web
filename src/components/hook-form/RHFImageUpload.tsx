import React, { useRef, useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';

interface RHFImageUploadProps {
  name: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  validation?: any;
  maxSize?: number; // in MB
  accept?: string;
}

const RHFImageUpload: React.FC<RHFImageUploadProps> = ({
  name,
  label,
  required = false,
  disabled = false,
  className = '',
  validation = {},
  maxSize = 5,
  accept = 'image/*',
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const error = errors[name];

  const handleFileChange = (file: File, onChange: (value: any) => void) => {
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
        onChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemove = (onChange: (value: any) => void) => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`mb-5 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <Controller
        name={name}
        control={control}
        rules={{ 
          required: required ? 'This field is required' : false, 
          ...validation 
        }}
        render={({ field: { onChange } }) => (
          <div className="space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              accept={accept}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  handleFileChange(file, onChange);
                }
              }}
              className="hidden"
              disabled={disabled}
              {...props}
            />
            
            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={() => handleRemove(onChange)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                  error 
                    ? 'border-red-300 bg-red-50' 
                    : 'border-gray-300 hover:border-gray-400'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <FaCloudUploadAlt className="text-gray-400 text-3xl mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to {maxSize}MB
                </p>
              </div>
            )}
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

export default RHFImageUpload;