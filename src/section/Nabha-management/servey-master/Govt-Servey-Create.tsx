import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlus, 
  FaTrash, 
  FaSave, 
  FaEye, 
  FaQuestionCircle, 
  FaStar,
  FaCalendarAlt,
  FaUserTie,
  FaBuilding 
} from 'react-icons/fa';

// Type definitions
interface SurveyQuestion {
  id: string;
  type: 'text' | 'multiple-choice' | 'checkbox' | 'rating' | 'date';
  question: string;
  options?: string[];
  required: boolean;
}

interface SurveyFormData {
  title: string;
  description: string;
  department: string;
  startDate: string;
  endDate: string;
  questions: SurveyQuestion[];
}

const GovtServeyCreate: React.FC = () => {
  const [formData, setFormData] = useState<SurveyFormData>({
    title: '',
    description: '',
    department: '',
    startDate: '',
    endDate: '',
    questions: []
  });

  const [activeTab, setActiveTab] = useState<'details' | 'questions' | 'preview'>('details');
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [newQuestion, setNewQuestion] = useState<Omit<SurveyQuestion, 'id'>>({
    type: 'text',
    question: '',
    required: false
  });

  // Add a new question to the survey
  const addQuestion = () => {
    if (newQuestion.question.trim() === '') return;
    
    const question: SurveyQuestion = {
      ...newQuestion,
      id: Date.now().toString()
    };
    
    setFormData({
      ...formData,
      questions: [...formData.questions, question]
    });
    
    setNewQuestion({
      type: 'text',
      question: '',
      required: false
    });
    
    setShowQuestionModal(false);
  };

  // Remove a question from the survey
  const removeQuestion = (id: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id)
    });
  };

  // Handle input changes for the main form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Render the appropriate input based on question type
  const renderQuestionInput = (question: SurveyQuestion) => {
    switch (question.type) {
      case 'text':
        return (
          <input
            type="text"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            placeholder="Text response"
            disabled
          />
        );
      case 'multiple-choice':
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input type="radio" disabled className="mr-2" />
                <input
                  type="text"
                  value={option}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
            ))}
          </div>
        );
      case 'checkbox':
        return (
          <div className="mt-2 space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center">
                <input type="checkbox" disabled className="mr-2" />
                <input
                  type="text"
                  value={option}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  disabled
                />
              </div>
            ))}
          </div>
        );
      case 'rating':
        return (
          <div className="flex mt-2 space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar key={star} className="text-yellow-400 text-xl" />
            ))}
          </div>
        );
      case 'date':
        return (
          <input
            type="date"
            className="w-full p-2 mt-2 border border-gray-300 rounded-md"
            disabled
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <FaBuilding className="text-2xl md:text-3xl" />
              <h1 className="text-xl md:text-2xl font-bold">Government Survey Creator</h1>
            </div>
            <div className="flex space-x-2 md:space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                <FaSave className="mr-1 md:mr-2 text-sm md:text-base" /> 
                <span className="text-sm md:text-base">Save Draft</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-green-500 text-white rounded-md opacity-50 cursor-not-allowed"
                disabled
              >
                <FaEye className="mr-1 md:mr-2 text-sm md:text-base" /> 
                <span className="text-sm md:text-base">Publish Survey</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 md:px-4 py-6 md:py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
          {(['details', 'questions', 'preview'] as const).map((tab) => (
            <button
              key={tab}
              className={`px-3 py-2 font-medium capitalize whitespace-nowrap ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">Survey Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Survey Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter survey title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Government Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="">Select Department</option>
                    <option value="health">Health Department</option>
                    <option value="education">Education Department</option>
                    <option value="transport">Transport Department</option>
                    <option value="finance">Finance Department</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Describe the purpose of this survey"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Questions Tab */}
          {activeTab === 'questions' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 space-y-4 md:space-y-0">
                <h2 className="text-lg md:text-xl font-semibold">Survey Questions</h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowQuestionModal(true)}
                  className="flex items-center px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                >
                  <FaPlus className="mr-1 md:mr-2 text-sm md:text-base" /> 
                  <span className="text-sm md:text-base">Add Question</span>
                </motion.button>
              </div>

              {formData.questions.length === 0 ? (
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <FaQuestionCircle className="text-4xl md:text-5xl mx-auto mb-3 md:mb-4 opacity-50" />
                  <p className="text-sm md:text-base">No questions added yet. Click "Add Question" to get started.</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  {formData.questions.map((q, index) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border border-gray-200 rounded-lg p-3 md:p-4"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium flex items-center text-sm md:text-base">
                          <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs md:text-sm mr-2">
                            {index + 1}
                          </span>
                          {q.question}
                          {q.required && <span className="text-red-500 ml-1 md:ml-2">*</span>}
                        </h3>
                        <button
                          onClick={() => removeQuestion(q.id)}
                          className="text-red-500 hover:text-red-700 text-sm md:text-base"
                        >
                          <FaTrash />
                        </button>
                      </div>
                      <div className="mt-2 md:mt-3">
                        {renderQuestionInput(q)}
                      </div>
                      <div className="mt-1 md:mt-2 text-xs text-gray-500 capitalize">
                        {q.type} {q.required && '(Required)'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Preview Tab */}
          {activeTab === 'preview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-lg shadow-md p-4 md:p-6"
            >
              <h2 className="text-lg md:text-xl font-semibold mb-4">Survey Preview</h2>
              
              {formData.questions.length === 0 ? (
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <p className="text-sm md:text-base">No questions to preview. Add questions in the Questions tab.</p>
                </div>
              ) : (
                <div className="space-y-4 md:space-y-6">
                  <div className="bg-blue-50 p-4 md:p-6 rounded-lg mb-4 md:mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-blue-800 mb-2">{formData.title || 'Survey Title'}</h1>
                    <p className="text-gray-700 text-sm md:text-base">{formData.description || 'Survey description will appear here.'}</p>
                    <div className="flex items-center mt-3 text-xs md:text-sm text-gray-600">
                      <FaUserTie className="mr-1 md:mr-2" />
                      <span>{formData.department || 'Government Department'}</span>
                    </div>
                    <div className="flex items-center mt-1 md:mt-2 text-xs md:text-sm text-gray-600">
                      <FaCalendarAlt className="mr-1 md:mr-2" />
                      <span>
                        {formData.startDate || 'Start Date'} to {formData.endDate || 'End Date'}
                      </span>
                    </div>
                  </div>
                  
                  {formData.questions.map((q, index) => (
                    <div key={q.id} className="border border-gray-200 rounded-lg p-4 md:p-6">
                      <h3 className="font-medium mb-3 md:mb-4 flex items-center text-sm md:text-base">
                        <span className="bg-blue-100 text-blue-800 rounded-full w-5 h-5 md:w-7 md:h-7 flex items-center justify-center text-xs md:text-sm mr-2">
                          {index + 1}
                        </span>
                        {q.question}
                        {q.required && <span className="text-red-500 ml-1">*</span>}
                      </h3>
                      <div className="mt-2 md:mt-3">
                        {renderQuestionInput(q)}
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-4 md:mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 md:py-3 bg-blue-500 text-white rounded-md opacity-50 cursor-not-allowed font-medium"
                      disabled
                    >
                      Submit Survey
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Add Question Modal */}
        <AnimatePresence>
          {showQuestionModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 md:p-4 z-50"
              onClick={() => setShowQuestionModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-lg shadow-xl p-4 md:p-6 w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Add New Question</h3>
                
                <div className="mb-3 md:mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                  <select
                    value={newQuestion.type}
                    onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value as any})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    <option value="text">Text Input</option>
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="checkbox">Checkboxes</option>
                    <option value="rating">Rating</option>
                    <option value="date">Date</option>
                  </select>
                </div>
                
                <div className="mb-3 md:mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                  <input
                    type="text"
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter your question"
                  />
                </div>
                
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id="required"
                    checked={newQuestion.required}
                    onChange={(e) => setNewQuestion({...newQuestion, required: e.target.checked})}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="required" className="ml-2 block text-sm text-gray-900">
                    Required question
                  </label>
                </div>
                
                <div className="flex justify-end space-x-2 md:space-x-3">
                  <button
                    onClick={() => setShowQuestionModal(false)}
                    className="px-3 py-1 md:px-4 md:py-2 text-gray-700 hover:text-gray-900 text-sm md:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={addQuestion}
                    className="px-3 py-1 md:px-4 md:py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 text-sm md:text-base"
                  >
                    Add Question
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default GovtServeyCreate;