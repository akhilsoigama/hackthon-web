import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, 
  FaPaperclip, 
  FaCalendarAlt, 
  FaClock, 
  FaChalkboardTeacher,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

const AssignmentCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    dueTime: '',
    points: 100,
    assignmentType: 'homework',
    instructions: '',
    attachments: [] as string[],
    assignedTo: 'all',
    specificStudents: [] as string[],
    allowLateSubmission: false,
    rubric: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [newAttachment, setNewAttachment] = useState('');
  const [newStudent, setNewStudent] = useState('');

  // Sample data
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education'];
  const students = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson', 'Sarah Brown'];
  const assignmentTypes = ['Homework', 'Project', 'Quiz', 'Exam', 'Presentation', 'Essay'];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment.trim()]
      }));
      setNewAttachment('');
    }
  };

  const handleRemoveAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleAddStudent = () => {
    if (newStudent && !formData.specificStudents.includes(newStudent)) {
      setFormData(prev => ({
        ...prev,
        specificStudents: [...prev.specificStudents, newStudent]
      }));
      setNewStudent('');
    }
  };

  const handleRemoveStudent = (student: string) => {
    setFormData(prev => ({
      ...prev,
      specificStudents: prev.specificStudents.filter(s => s !== student)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Assignment created:', formData);
    // Here you would typically send the data to your backend
    alert('Assignment created successfully!');
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
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
            Create New Assignment
          </h1>
          <p className="text-gray-600 mt-2">Create and assign tasks to your students</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            {[1, 2, 3].map(step => (
              <div key={step} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                <span className="text-sm mt-2 text-gray-600">
                  {step === 1 && 'Details'}
                  {step === 2 && 'Settings'}
                  {step === 3 && 'Review'}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 3) * 100}%` }}
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
            {/* Step 1: Assignment Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Assignment Details</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter assignment title"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe the assignment to your students"
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                    <select
                      name="assignmentType"
                      value={formData.assignmentType}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      {assignmentTypes.map(type => (
                        <option key={type} value={type.toLowerCase()}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Provide detailed instructions for the assignment"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Settings & Configuration */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Settings & Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaCalendarAlt className="mr-2 text-indigo-500" />
                      Due Date *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaClock className="mr-2 text-indigo-500" />
                      Due Time
                    </label>
                    <input
                      type="time"
                      name="dueTime"
                      value={formData.dueTime}
                      onChange={handleInputChange}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                  <input
                    type="number"
                    name="points"
                    value={formData.points}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="allowLateSubmission"
                    name="allowLateSubmission"
                    checked={formData.allowLateSubmission}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                  />
                  <label htmlFor="allowLateSubmission" className="ml-2 text-sm text-gray-700">
                    Allow late submission
                  </label>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleInputChange}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                  >
                    <option value="all">All Students</option>
                    <option value="specific">Specific Students</option>
                  </select>
                  
                  {formData.assignedTo === 'specific' && (
                    <div className="mt-2">
                      <div className="flex mb-2">
                        <select
                          value={newStudent}
                          onChange={(e) => setNewStudent(e.target.value)}
                          className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          <option value="">Select a student</option>
                          {students.map(student => (
                            <option key={student} value={student}>{student}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={handleAddStudent}
                          className="bg-indigo-600 text-white px-3 rounded-r-lg hover:bg-indigo-700"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {formData.specificStudents.map(student => (
                          <span key={student} className="bg-indigo-100 text-indigo-800 text-sm px-3 py-1 rounded-full flex items-center">
                            {student}
                            <button
                              type="button"
                              onClick={() => handleRemoveStudent(student)}
                              className="ml-2 text-indigo-600 hover:text-indigo-800"
                            >
                              <FaTimes size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rubric/Grading Criteria</label>
                  <textarea
                    name="rubric"
                    value={formData.rubric}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Describe how this assignment will be graded"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Attachments & Review */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Attachments & Review</h2>
                
                <div>
                  <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                    <FaPaperclip className="mr-2 text-indigo-500" />
                    Attachments
                  </label>
                  <div className="flex mb-2">
                    <input
                      type="text"
                      value={newAttachment}
                      onChange={(e) => setNewAttachment(e.target.value)}
                      placeholder="Enter file URL or path"
                      className="flex-grow p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={handleAddAttachment}
                      className="bg-indigo-600 text-white px-3 rounded-r-lg hover:bg-indigo-700"
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <span className="text-sm text-gray-700 truncate">{attachment}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAttachment(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-800 mb-3">Assignment Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Title:</span>
                      <span>{formData.title || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Subject:</span>
                      <span>{formData.subject || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Type:</span>
                      <span>{formData.assignmentType || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Due Date:</span>
                      <span>{formData.dueDate || <span className="text-gray-400">Not provided</span>}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Points:</span>
                      <span>{formData.points}</span>
                    </div>
                    <div className="flex">
                      <span className="w-32 font-medium text-gray-600">Assigned To:</span>
                      <span>
                        {formData.assignedTo === 'all' 
                          ? 'All Students' 
                          : `${formData.specificStudents.length} students`}
                      </span>
                    </div>
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
            
            {currentStep < 3 ? (
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
                Create Assignment
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignmentCreate;