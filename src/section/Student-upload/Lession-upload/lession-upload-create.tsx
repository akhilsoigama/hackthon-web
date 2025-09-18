import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiCheckCircle, BiPlus, BiUpload, BiVideo, BiX, BiEdit, BiArrowBack } from 'react-icons/bi';
import { ImImage } from 'react-icons/im';
import { FiFileText, FiClock } from 'react-icons/fi';
import { BsTextParagraph } from 'react-icons/bs';

interface LessonFormData {
  title: string;
  description: string;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  files: File[];
  type: 'video' | 'document' | 'image';
}

const LessionUploadCreate: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState<'details' | 'preview'>('details');
  const [formData, setFormData] = useState<LessonFormData>({
    title: '',
    description: '',
    duration: '',
    level: 'beginner',
    files: [],
    type: 'document'
  });
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)]
      }));
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragOver(false);
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFormData(prev => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)]
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsUploading(false);
            // Reset form after successful upload
            setFormData({
              title: '',
              description: '',
              duration: '',
              level: 'beginner',
              files: [],
              type: 'document'
            });
            setCurrentStep('details');
          }, 2000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('video')) return <BiVideo className="w-5 h-5" />;
    if (file.type.includes('image')) return <ImImage className="w-5 h-5" />;
    return <FiFileText className="w-5 h-5" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalFileSize = formData.files.reduce((total, file) => total + file.size, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6">
            <h1 className="text-3xl font-bold mb-2">Create New Lesson</h1>
            <p className="text-blue-100">{
              currentStep === 'details' 
                ? 'Fill in lesson details and upload materials' 
                : 'Review and submit your lesson'
            }</p>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-6">
              <div className={`flex items-center ${currentStep === 'details' ? 'text-white' : 'text-blue-200'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'details' ? 'bg-blue-800' : 'bg-blue-500'}`}>
                  1
                </div>
                <span className="ml-2">Details</span>
              </div>
              <div className="h-1 w-12 mx-2 bg-blue-500"></div>
              <div className={`flex items-center ${currentStep === 'preview' ? 'text-white' : 'text-blue-200'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'preview' ? 'bg-blue-800' : 'bg-blue-500'}`}>
                  2
                </div>
                <span className="ml-2">Submit</span>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">
              {currentStep === 'details' ? (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  <form className="space-y-6">
                    {/* Title Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lesson Title *
                      </label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter lesson title"
                        required
                      />
                    </div>

                    {/* Description Input */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="Describe your lesson..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Duration Input */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Duration *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formData.duration}
                            onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            placeholder="e.g., 45 minutes"
                            required
                          />
                          <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>

                      {/* Level Selection */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Difficulty Level *
                        </label>
                        <select
                          value={formData.level}
                          onChange={(e) => setFormData(prev => ({ ...prev, level: e.target.value as any }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>
                    </div>

                    {/* File Upload Area */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Files
                      </label>
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors duration-200 ${
                          isDragOver 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <input
                          id="file-upload"
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <BiUpload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-lg font-medium text-gray-700 mb-2">
                          Drag & drop files here
                        </p>
                        <p className="text-sm text-gray-500">
                          or click to browse files
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          Supports videos, documents, and images (Max 10 files)
                        </p>
                      </motion.div>
                    </div>

                    {/* Uploaded Files List */}
                    <AnimatePresence>
                      {formData.files.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3"
                        >
                          <h3 className="font-medium text-gray-700">Selected Files:</h3>
                          {formData.files.map((file, index) => (
                            <motion.div
                              key={`${file.name}-${index}`}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 20 }}
                              className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                            >
                              <div className="flex items-center space-x-3">
                                {getFileIcon(file)}
                                <div>
                                  <p className="text-sm font-medium text-gray-700 truncate max-w-xs">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeFile(index)}
                                className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1"
                              >
                                <BiX className="w-5 h-5" />
                              </button>
                            </motion.div>
                          ))}
                          <div className="text-sm text-gray-500 mt-2">
                            Total: {formData.files.length} file(s) - {formatFileSize(totalFileSize)}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Continue Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setCurrentStep('preview')}
                      disabled={!formData.title || !formData.description || !formData.duration}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                    >
                      <span>Continue to Preview</span>
                      <BiArrowBack className="w-5 h-5 rotate-180" />
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Preview Header */}
                  <div className="flex justify-between items-center pb-4 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Lesson Preview</h2>
                    <button
                      onClick={() => setCurrentStep('details')}
                      className="text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                    >
                      <BiEdit className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                  </div>

                  {/* Lesson Details Preview */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{formData.title}</h3>
                      <p className="text-gray-600 flex items-start">
                        <BsTextParagraph className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-blue-500" />
                        <span>{formData.description}</span>
                      </p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">{formData.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Level:</span>
                          <span className="font-medium capitalize">{formData.level}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Files:</span>
                          <span className="font-medium">{formData.files.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Size:</span>
                          <span className="font-medium">{formatFileSize(totalFileSize)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Files Preview */}
                  {formData.files.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Uploaded Files</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.files.map((file, index) => (
                          <motion.div
                            key={`preview-${file.name}-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-3 bg-gray-50 rounded-lg"
                          >
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-blue-100 text-blue-600 mr-3">
                              {getFileIcon(file)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-700 truncate">
                                {file.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={isUploading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                  >
                    {isUploading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Uploading... {uploadProgress}%</span>
                      </>
                    ) : (
                      <>
                        <BiPlus className="w-5 h-5" />
                        <span>Publish Lesson</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {uploadProgress === 100 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center space-x-3"
                >
                  <BiCheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">Upload Successful!</p>
                    <p className="text-sm text-green-600">Your lesson has been published successfully.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LessionUploadCreate;