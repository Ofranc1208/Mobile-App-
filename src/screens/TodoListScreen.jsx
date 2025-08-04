import React, { useState } from 'react';
import { todoCategories } from '../data/mockData';

const TodoListScreen = ({ onNavigate, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle item action click
  const handleItemAction = (item) => {
    if (item.actionType === 'navigate') {
      // Navigate to specific screen with optional tab
      if (item.tab) {
        onNavigate(item.actionTarget, { tab: item.tab });
      } else {
        onNavigate(item.actionTarget);
      }
    } else if (item.actionType === 'component') {
      // Open component modal or detail view
      setSelectedItem(item);
    }
  };

  // Calculate completed items for simple display
  const completedItems = todoCategories.reduce((sum, cat) => 
    sum + cat.items.filter(item => item.status === 'completed').length, 0
  );

  // Main todo list view - MODERNIZED
  if (!selectedCategory && !selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-4">
              <button 
                onClick={onBack} 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-lg">←</span>
              </button>
              <div>
                <h1 className="font-bold text-gray-800 text-xl">Action Items</h1>
                <p className="text-sm text-gray-500">{completedItems} items completed</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🔔</span>
            </div>
          </div>
        </div>

        {/* Todo Categories - CLEAN & SIMPLE */}
        <div className="p-6 space-y-5 pb-24">
          {todoCategories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  {/* Clean icon */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center text-lg">
                    {category.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-base">{category.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{category.description}</p>
                    
                    {/* Simple status indicators */}
                    <div className="flex items-center space-x-2 mt-3">
                      {category.status === 'attention' && (
                        <div className="flex items-center space-x-1 bg-red-50 text-red-700 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          <span className="text-xs font-medium">Action Required</span>
                        </div>
                      )}
                      {category.status === 'pending' && (
                        <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                          <span className="text-xs font-medium">Review</span>
                        </div>
                      )}
                      {category.status === 'available' && (
                        <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                          <span className="text-xs font-medium">Available</span>
                        </div>
                      )}
                      
                      <div className="text-xs text-gray-500">
                        {category.items.length} {category.items.length === 1 ? 'item' : 'items'}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  {category.status === 'attention' && (
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-sm">
                      <span className="text-white text-sm font-bold">!</span>
                    </div>
                  )}
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex justify-around max-w-md mx-auto">
            <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">Tasks</span>
            </button>
            <button onClick={() => onNavigate('support')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📞</span>
              <span className="text-xs text-gray-600">Support</span>
            </button>
            <button onClick={() => onNavigate('rewards')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xs text-gray-600">Rewards</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Category Detail View - MODERNIZED
  if (selectedCategory && !selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSelectedCategory(null)} 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-lg">←</span>
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                  {selectedCategory.icon}
                </div>
                <div>
                  <h1 className="font-bold text-gray-800 text-xl">{selectedCategory.title}</h1>
                  <p className="text-sm text-gray-500">{selectedCategory.description}</p>
                </div>
              </div>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🔔</span>
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="p-4 space-y-3 pb-24">
          {selectedCategory.items.map((item) => (
            <div 
              key={item.id}
              onClick={() => handleItemAction(item)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  {/* Status icon */}
                  <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    {item.status === 'completed' && (
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                    )}
                    {item.status === 'pending' && (
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">⏳</span>
                      </div>
                    )}
                    {item.status === 'available' && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">📄</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{item.description}</p>
                    
                    {/* Due date and completion info */}
                    <div className="flex items-center space-x-2 mt-2">
                      {item.dueDate && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          Due: {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      )}
                      {item.completedDate && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Completed: {new Date(item.completedDate).toLocaleDateString()}
                        </span>
                      )}
                      {item.required && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          Required
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-gray-400 text-sm">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex justify-around max-w-md mx-auto">
            <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">Tasks</span>
            </button>
            <button onClick={() => onNavigate('support')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📞</span>
              <span className="text-xs text-gray-600">Support</span>
            </button>
            <button onClick={() => onNavigate('rewards')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xs text-gray-600">Rewards</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Action Item Detail View (for component-based items)
  if (selectedItem) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        {/* Header */}
        <div className="bg-white shadow-lg border-b border-gray-200">
          <div className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setSelectedItem(null)} 
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <span className="text-gray-600 text-lg">←</span>
              </button>
              <div>
                <h1 className="font-bold text-gray-800 text-xl">{selectedItem.title}</h1>
                <p className="text-sm text-gray-500">{selectedItem.description}</p>
              </div>
            </div>
            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-lg">🔔</span>
            </div>
          </div>
        </div>

        {/* Action Content */}
        <div className="p-6 pb-24">
          {selectedItem.actionTarget === 'document-upload' && <DocumentUploadAction item={selectedItem} />}
          {selectedItem.actionTarget === 'harassment-report' && <HarassmentReportAction item={selectedItem} />}
          {selectedItem.actionTarget === 'security-education' && <SecurityEducationAction item={selectedItem} />}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
          <div className="flex justify-around max-w-md mx-auto">
            <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">Tasks</span>
            </button>
            <button onClick={() => onNavigate('support')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📞</span>
              <span className="text-xs text-gray-600">Support</span>
            </button>
            <button onClick={() => onNavigate('rewards')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xs text-gray-600">Rewards</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

// Document Upload Action Component
const DocumentUploadAction = ({ item }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const handleUpload = (file) => {
    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [file.name]: 0 }));
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const currentProgress = prev[file.name] || 0;
        if (currentProgress >= 100) {
          clearInterval(interval);
          return prev;
        }
        return { ...prev, [file.name]: currentProgress + 10 };
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Upload Documents</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-2xl">📁</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Choose files to upload</h3>
          <p className="text-sm text-gray-600 mb-4">Drag and drop files here, or click to browse</p>
          <input
            type="file"
            multiple
            accept=".jpg,.jpeg,.png,.pdf"
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
          >
            Choose Files
          </label>
          <p className="text-xs text-gray-500 mt-2">Accepted formats: JPG, PNG, PDF (Max 5MB each)</p>
        </div>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Files</h3>
          <div className="space-y-3">
            {selectedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-sm">📄</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-600">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {uploadProgress[file.name] !== undefined ? (
                    <div className="w-20">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${uploadProgress[file.name]}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{uploadProgress[file.name]}%</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUpload(file)}
                      className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                    >
                      Upload
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Requirements */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-900 mb-4">📋 Document Requirements</h3>
        <div className="space-y-3">
          {item.id === 'identity-docs' && (
            <>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">Driver's License (front and back)</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">Social Security benefits letter</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">W2 or Social Security Certificate</p>
              </div>
            </>
          )}
          {item.id === 'financial-docs' && (
            <>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">Recent bank statements (last 3 months)</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">Debt documentation (if applicable)</p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-blue-600 mt-1">•</span>
                <p className="text-sm text-blue-800">Utility bills for address verification</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Harassment Report Action Component
const HarassmentReportAction = ({ item }) => {
  const [reportData, setReportData] = useState({
    type: '',
    source: '',
    date: '',
    description: '',
    frequency: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Harassment report submitted:', reportData);
    alert('Report submitted successfully. Our security team will investigate this matter.');
  };

  return (
    <div className="space-y-6">
      <div className="bg-red-50 rounded-xl p-6 border border-red-200">
        <h2 className="text-lg font-semibold text-red-900 mb-2">🛡️ Report Suspicious Activity</h2>
        <p className="text-sm text-red-800">
          Help us protect you and other clients by reporting any suspicious calls, emails, or contact regarding your settlement.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type of Contact</label>
          <select 
            value={reportData.type}
            onChange={(e) => setReportData(prev => ({ ...prev, type: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select type</option>
            <option value="phone">Phone Call</option>
            <option value="email">Email</option>
            <option value="mail">Physical Mail</option>
            <option value="text">Text Message</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Contact Source</label>
          <input
            type="text"
            value={reportData.source}
            onChange={(e) => setReportData(prev => ({ ...prev, source: e.target.value }))}
            placeholder="Phone number, email address, company name, etc."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Contact</label>
          <input
            type="date"
            value={reportData.date}
            onChange={(e) => setReportData(prev => ({ ...prev, date: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={reportData.description}
            onChange={(e) => setReportData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what happened, what they said, any offers made, etc."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          Submit Report
        </button>
      </form>
    </div>
  );
};

// Security Education Action Component  
const SecurityEducationAction = ({ item }) => {
  const securityTips = [
    {
      title: "Never Give Out Personal Information",
      description: "Legitimate companies already have your information. Never provide SSN, bank details, or settlement information over the phone.",
      icon: "🔒"
    },
    {
      title: "Verify Contact Identity",
      description: "Always ask for the caller's name, company, and call back using official numbers. Scammers often use spoofed phone numbers.",
      icon: "📞"
    },
    {
      title: "Be Wary of Urgent Offers",
      description: "Scammers create false urgency. Legitimate settlement changes require court approval and proper documentation.",
      icon: "⏰"
    },
    {
      title: "Report Suspicious Activity",
      description: "Report any suspicious calls or offers immediately. This helps us protect you and other settlement recipients.",
      icon: "🚨"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
        <h2 className="text-lg font-semibold text-blue-900 mb-2">🛡️ Security Education Center</h2>
        <p className="text-sm text-blue-800">
          Learn how to protect yourself from scams and fraudulent activity targeting settlement recipients.
        </p>
      </div>

      <div className="space-y-4">
        {securityTips.map((tip, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                {tip.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600">{tip.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-2">⚠️ Red Flags to Watch For</h3>
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 mt-1">•</span>
            <p className="text-sm text-yellow-800">Unsolicited calls about your settlement</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 mt-1">•</span>
            <p className="text-sm text-yellow-800">Pressure to make immediate decisions</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 mt-1">•</span>
            <p className="text-sm text-yellow-800">Requests for personal or financial information</p>
          </div>
          <div className="flex items-start space-x-2">
            <span className="text-yellow-600 mt-1">•</span>
            <p className="text-sm text-yellow-800">Offers that seem too good to be true</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoListScreen;