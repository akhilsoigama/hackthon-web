import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, 
  FaVideo, 
  FaFilePdf, 
  FaImage, 
  FaLink, 
  FaPlus,
  FaTimes,
  FaChalkboardTeacher,
  FaClock,
} from 'react-icons/fa';

const LessonCreate = () => {
  const [formData, setFormData] = useState({
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
    resources: [] as { type: string; title: string; url: string }[],
    standards: [''],
    differentiation: '',
    notes: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newResource, setNewResource] = useState({ type: 'link', title: '', url: '' });

  // Sample data
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education'];
  const gradeLevels = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', 
                       '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  const resourceTypes = [
    { value: 'link', label: 'Web Link', icon: <FaLink /> },
    { value: 'video', label: 'Video', icon: <FaVideo /> },
    { value: 'pdf', label: 'PDF Document', icon: <FaFilePdf /> },
    { value: 'image', label: 'Image', icon: <FaImage /> }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInputChange = (field: string, index: number, value: string) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev] as string[]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const addArrayItem = (field: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field as keyof typeof prev] as string[]), '']
    }));
  };

  const removeArrayItem = (field: string, index: number) => {
    setFormData(prev => {
      const newArray = [...prev[field as keyof typeof prev] as string[]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setFormData(prev => ({
        ...prev,
        resources: [...prev.resources, { ...newResource }]
      }));
      setNewResource({ type: 'link', title: '', url: '' });
    }
  };

  const handleRemoveResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Lesson created:', formData);
    // Here you would typically send the data to your backend
    alert('Lesson created successfully!');
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaChalkboardTeacher className="mr-3 text-indigo-600" />
            Create New Lesson
          </h1>
          <p className="text-gray-600 mt-2">Design comprehensive lessons for your students</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3, 4].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Lesson Plan'}
                  {step === 3 && 'Resources'}
                  {step === 4 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <motion.div 
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6 mb-6"
          >
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Basic Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter lesson title"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select a subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade Level *</label>
                    <select
                      name="gradeLevel"
                      value={formData.gradeLevel}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Select grade level</option>
                      {gradeLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaClock className="mr-2 text-indigo-500" />
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g., 45 minutes, 2 class periods"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Learning Objectives</label>
                  {formData.objectives.map((objective, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={objective}
                        onChange={(e) => handleArrayInputChange('objectives', index, e.target.value)}
                        className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Objective ${index + 1}`}
                      />
                      {formData.objectives.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('objectives', index)}
                          className="bg-red-100 text-red-600 px-3 rounded-r-lg hover:bg-red-200"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('objectives')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add Objective
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Lesson Plan */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Lesson Plan</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Introduction</label>
                  <textarea
                    name="introduction"
                    value={formData.introduction}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How will you introduce the lesson and engage students?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instruction</label>
                  <textarea
                    name="instruction"
                    value={formData.instruction}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe the main teaching activities and strategies"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guided Practice</label>
                  <textarea
                    name="practice"
                    value={formData.practice}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How will students practice what they've learned with support?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Conclusion</label>
                  <textarea
                    name="conclusion"
                    value={formData.conclusion}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How will you wrap up the lesson and review key concepts?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assessment</label>
                  <textarea
                    name="assessment"
                    value={formData.assessment}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How will you assess student understanding?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Materials Needed</label>
                  {formData.materials.map((material, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={material}
                        onChange={(e) => handleArrayInputChange('materials', index, e.target.value)}
                        className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Material ${index + 1}`}
                      />
                      {formData.materials.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('materials', index)}
                          className="bg-red-100 text-red-600 px-3 rounded-r-lg hover:bg-red-200"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('materials')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add Material
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Resources & Standards */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Resources & Standards</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Resources</label>
                  <div className="mb-4 p-4 border rounded-lg bg-gray-50">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                      <select
                        value={newResource.type}
                        onChange={(e) => setNewResource({...newResource, type: e.target.value})}
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {resourceTypes.map(type => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={newResource.title}
                        onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                        placeholder="Resource title"
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <input
                        type="text"
                        value={newResource.url}
                        onChange={(e) => setNewResource({...newResource, url: e.target.value})}
                        placeholder="URL or path"
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleAddResource}
                      className="bg-indigo-600 text-white px-3 py-2 rounded hover:bg-indigo-700 flex items-center"
                    >
                      <FaPlus className="mr-1" />
                      Add Resource
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.resources.map((resource, index) => {
                      const resourceType = resourceTypes.find(t => t.value === resource.type);
                      return (
                        <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                          <div className="flex items-center">
                            <span className="text-indigo-600 mr-2">
                              {resourceType?.icon}
                            </span>
                            <span className="font-medium">{resource.title}</span>
                            <span className="text-gray-500 text-sm ml-2 truncate">{resource.url}</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveResource(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaTimes />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Standards Alignment</label>
                  {formData.standards.map((standard, index) => (
                    <div key={index} className="flex mb-2">
                      <input
                        type="text"
                        value={standard}
                        onChange={(e) => handleArrayInputChange('standards', index, e.target.value)}
                        className="flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder={`Standard ${index + 1} (e.g., CCSS.MATH.CONTENT.5.OA.A.1)`}
                      />
                      {formData.standards.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArrayItem('standards', index)}
                          className="bg-red-100 text-red-600 px-3 rounded-r-lg hover:bg-red-200"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addArrayItem('standards')}
                    className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add Standard
                  </button>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Differentiation Strategies</label>
                  <textarea
                    name="differentiation"
                    value={formData.differentiation}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="How will you support struggling learners and challenge advanced students?"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Teacher Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Any additional notes or reminders for teaching this lesson"
                  />
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Review Your Lesson</h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Lesson Overview</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Title:</span>
                      <span>{formData.title || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Subject:</span>
                      <span>{formData.subject || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Grade Level:</span>
                      <span>{formData.gradeLevel || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Duration:</span>
                      <span>{formData.duration || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Lesson Details</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">Objectives:</span>
                      <ul className="list-disc pl-5">
                        {formData.objectives.map((obj, i) => 
                          obj ? <li key={i}>{obj}</li> : null
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">Materials:</span>
                      <ul className="list-disc pl-5">
                        {formData.materials.map((mat, i) => 
                          mat ? <li key={i}>{mat}</li> : null
                        )}
                      </ul>
                    </div>
                    
                    <div>
                      <span className="font-medium text-gray-600 block mb-1">Resources:</span>
                      <ul className="list-disc pl-5">
                        {formData.resources.map((res, i) => 
                          <li key={i}>{res.title} ({res.type})</li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Lesson Plan Preview</h3>
                  <div className="space-y-4 text-sm">
                    {formData.introduction && (
                      <div>
                        <span className="font-medium text-gray-600 block mb-1">Introduction:</span>
                        <p>{formData.introduction}</p>
                      </div>
                    )}
                    
                    {formData.instruction && (
                      <div>
                        <span className="font-medium text-gray-600 block mb-1">Instruction:</span>
                        <p>{formData.instruction}</p>
                      </div>
                    )}
                    
                    {formData.practice && (
                      <div>
                        <span className="font-medium text-gray-600 block mb-1">Practice:</span>
                        <p>{formData.practice}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-lg ${currentStep === 1 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              Previous
            </button>
            
            {currentStep < 4 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Next
              </button>
            ) : (
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
              >
                <FaSave className="mr-2" />
                Create Lesson
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LessonCreate;