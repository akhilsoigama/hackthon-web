import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaSave, 
  FaPlus, 
  FaTrash, 
  FaClock, 
  FaChalkboardTeacher,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';

const QuizCreate = () => {
  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    gradeLevel: '',
    duration: 30,
    instructions: '',
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0,
        points: 1,
        explanation: ''
      }
    ],
    shuffleQuestions: false,
    shuffleOptions: false,
    showResults: 'after-submission',
    attempts: 1,
    dueDate: '',
    availableFrom: '',
    availableTo: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);

  // Sample data
  const subjects = ['Mathematics', 'Science', 'English', 'History', 'Art', 'Physical Education'];
  const gradeLevels = ['Kindergarten', '1st Grade', '2nd Grade', '3rd Grade', '4th Grade', '5th Grade', 
                       '6th Grade', '7th Grade', '8th Grade', '9th Grade', '10th Grade', '11th Grade', '12th Grade'];
  const questionTypes = [
    { value: 'multiple-choice', label: 'Multiple Choice' },
    { value: 'true-false', label: 'True/False' },
    { value: 'short-answer', label: 'Short Answer' },
    { value: 'essay', label: 'Essay' }
  ];
  const resultOptions = [
    { value: 'after-submission', label: 'Immediately after submission' },
    { value: 'after-deadline', label: 'After the deadline' },
    { value: 'manual', label: 'Manually by teacher' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[index] = {
        ...newQuestions[index],
        [field]: value
      };
      return {
        ...prev,
        questions: newQuestions
      };
    });
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      const newOptions = [...newQuestions[qIndex].options];
      newOptions[oIndex] = value;
      newQuestions[qIndex] = {
        ...newQuestions[qIndex],
        options: newOptions
      };
      return {
        ...prev,
        questions: newQuestions
      };
    });
  };

  const addQuestion = () => {
    setFormData(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: prev.questions.length + 1,
          type: 'multiple-choice',
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0,
          points: 1,
          explanation: ''
        }
      ]
    }));
    setActiveQuestion(formData.questions.length);
  };

  const deleteQuestion = (index: number) => {
    if (formData.questions.length > 1) {
      setFormData(prev => ({
        ...prev,
        questions: prev.questions.filter((_, i) => i !== index)
      }));
      setActiveQuestion(Math.max(0, index - 1));
    }
  };

  const addOption = (qIndex: number) => {
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      newQuestions[qIndex] = {
        ...newQuestions[qIndex],
        options: [...newQuestions[qIndex].options, '']
      };
      return {
        ...prev,
        questions: newQuestions
      };
    });
  };

  const deleteOption = (qIndex: number, oIndex: number) => {
    if (formData.questions[qIndex].options.length > 2) {
      setFormData(prev => {
        const newQuestions = [...prev.questions];
        const newOptions = [...newQuestions[qIndex].options];
        newOptions.splice(oIndex, 1);
        
        // Adjust correct answer if needed
        let correctAnswer = newQuestions[qIndex].correctAnswer;
        if (oIndex === correctAnswer) {
          correctAnswer = 0;
        } else if (oIndex < correctAnswer) {
          correctAnswer -= 1;
        }
        
        newQuestions[qIndex] = {
          ...newQuestions[qIndex],
          options: newOptions,
          correctAnswer
        };
        return {
          ...prev,
          questions: newQuestions
        };
      });
    }
  };

  const moveQuestion = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === formData.questions.length - 1)) {
      return;
    }
    
    setFormData(prev => {
      const newQuestions = [...prev.questions];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      
      [newQuestions[index], newQuestions[targetIndex]] = [newQuestions[targetIndex], newQuestions[index]];
      
      return {
        ...prev,
        questions: newQuestions
      };
    });
    
    setActiveQuestion(direction === 'up' ? index - 1 : index + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Quiz created successfully!');
  };

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const calculateTotalPoints = () => {
    return formData.questions.reduce((total, question) => total + question.points, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
            <FaChalkboardTeacher className="mr-3 text-indigo-600" />
            Create New Quiz
          </h1>
          <p className="text-gray-600 mt-2">Create assessments to evaluate student understanding</p>
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
                  {step === 1 && 'Basic Info'}
                  {step === 2 && 'Questions'}
                  {step === 3 && 'Settings'}
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
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Quiz Information</h2>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter quiz title"
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className=" text-sm font-medium text-gray-700 mb-1 flex items-center">
                      <FaClock className="mr-2 text-indigo-500" />
                      Time Limit (minutes)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attempts Allowed</label>
                    <input
                      type="number"
                      name="attempts"
                      value={formData.attempts}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Provide instructions for students taking this quiz"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Questions */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b pb-2">
                  <h2 className="text-xl font-semibold text-gray-800">Quiz Questions</h2>
                  <div className="text-sm text-gray-600">
                    Total Points: <span className="font-bold">{calculateTotalPoints()}</span>
                  </div>
                </div>
                
                {/* Question Navigation */}
                <div className="flex overflow-x-auto pb-2">
                  {formData.questions.map((q, index) => (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setActiveQuestion(index)}
                      className={`flex-shrink-0 px-4 py-2 mr-2 rounded-lg ${
                        activeQuestion === index
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      Q{index + 1}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={addQuestion}
                    className="flex-shrink-0 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                  >
                    <FaPlus className="mr-1" />
                    Add Question
                  </button>
                </div>
                
                {/* Active Question */}
                {formData.questions.map((question, qIndex) => (
                  <div key={question.id} className={`${activeQuestion === qIndex ? 'block' : 'hidden'}`}>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-800">Question {qIndex + 1}</h3>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => moveQuestion(qIndex, 'up')}
                          disabled={qIndex === 0}
                          className={`p-2 rounded ${qIndex === 0 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
                          title="Move up"
                        >
                          <FaArrowUp />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveQuestion(qIndex, 'down')}
                          disabled={qIndex === formData.questions.length - 1}
                          className={`p-2 rounded ${qIndex === formData.questions.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
                          title="Move down"
                        >
                          <FaArrowDown />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteQuestion(qIndex)}
                          disabled={formData.questions.length === 1}
                          className={`p-2 rounded ${formData.questions.length === 1 ? 'text-gray-400' : 'text-red-600 hover:bg-red-100'}`}
                          title="Delete question"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div className="md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question Text *</label>
                        <input
                          type="text"
                          value={question.question}
                          onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                          required
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                          placeholder="Enter your question"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                        <select
                          value={question.type}
                          onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                          {questionTypes.map(type => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                        <input
                          type="number"
                          value={question.points}
                          onChange={(e) => handleQuestionChange(qIndex, 'points', parseInt(e.target.value) || 0)}
                          min="0"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                      </div>
                    </div>
                    
                    {/* Options for multiple choice and true/false */}
                    {(question.type === 'multiple-choice' || question.type === 'true-false') && (
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
                        
                        {question.type === 'true-false' ? (
                          <div className="space-y-2">
                            {['True', 'False'].map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center p-3 border rounded-lg">
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  checked={question.correctAnswer === oIndex}
                                  onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-3 text-gray-700">{option}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="space-y-2">
                            {question.options.map((option, oIndex) => (
                              <div key={oIndex} className="flex items-center p-3 border rounded-lg">
                                <input
                                  type="radio"
                                  name={`question-${qIndex}`}
                                  checked={question.correctAnswer === oIndex}
                                  onChange={() => handleQuestionChange(qIndex, 'correctAnswer', oIndex)}
                                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
                                />
                                <input
                                  type="text"
                                  value={option}
                                  onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                  className="ml-3 flex-1 p-2 border rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                  placeholder={`Option ${oIndex + 1}`}
                                />
                                <button
                                  type="button"
                                  onClick={() => deleteOption(qIndex, oIndex)}
                                  disabled={question.options.length <= 2}
                                  className={`ml-2 p-2 ${question.options.length <= 2 ? 'text-gray-400' : 'text-red-600 hover:text-red-800'}`}
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            ))}
                            
                            <button
                              type="button"
                              onClick={() => addOption(qIndex)}
                              className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center"
                            >
                              <FaPlus className="mr-1" />
                              Add Option
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Explanation (optional)</label>
                      <textarea
                        value={question.explanation}
                        onChange={(e) => handleQuestionChange(qIndex, 'explanation', e.target.value)}
                        rows={2}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Explain why the correct answer is right"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Step 3: Settings */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Quiz Settings</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Availability</h3>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available From</label>
                      <input
                        type="datetime-local"
                        name="availableFrom"
                        value={formData.availableFrom}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Available To (Due Date)</label>
                      <input
                        type="datetime-local"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Show Results</label>
                      <select
                        name="showResults"
                        value={formData.showResults}
                        onChange={handleInputChange}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        {resultOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-800 mb-3">Quiz Behavior</h3>
                    
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="shuffleQuestions"
                        name="shuffleQuestions"
                        checked={formData.shuffleQuestions}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <label htmlFor="shuffleQuestions" className="ml-2 text-sm text-gray-700">
                        Shuffle questions
                      </label>
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        id="shuffleOptions"
                        name="shuffleOptions"
                        checked={formData.shuffleOptions}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 rounded"
                      />
                      <label htmlFor="shuffleOptions" className="ml-2 text-sm text-gray-700">
                        Shuffle answer options
                      </label>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mt-6">
                      <h4 className="font-medium text-gray-800 mb-2">Quiz Summary</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Questions:</span>
                          <span className="font-medium">{formData.questions.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Points:</span>
                          <span className="font-medium">{calculateTotalPoints()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time Limit:</span>
                          <span className="font-medium">{formData.duration} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Attempts Allowed:</span>
                          <span className="font-medium">{formData.attempts}</span>
                        </div>
                      </div>
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
                Create Quiz
              </motion.button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizCreate;