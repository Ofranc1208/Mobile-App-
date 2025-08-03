import React, { useState } from 'react';
import { todoCategories } from '../data/mockData';

const TodoListScreen = ({ onNavigate, onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Main todo list view (Screen 9)
  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-background-main">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-2xl">←</button>
            <span className="font-bold text-gray-800 text-lg">To Do List</span>
          </div>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-lg">🔔</span>
          </div>
        </div>

        {/* Todo Categories */}
        <div className="p-4 space-y-3 pb-20">
          {todoCategories.map((category) => (
            <div 
              key={category.id}
              onClick={() => setSelectedCategory(category)}
              className="bg-white rounded-xl p-4 shadow-md border-l-4 border-orange-300 cursor-pointer hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-xl">{category.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 text-sm">{category.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{category.description}</p>
                    {/* Status indicators */}
                    <div className="flex items-center space-x-2 mt-2">
                      {category.status === 'completed' && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Complete</span>
                      )}
                      {category.status === 'attention' && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">⚠ Action Required</span>
                      )}
                      {category.status === 'pending' && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">📋 Review</span>
                      )}
                      {category.urgency === 'high' && (
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">🔥 Urgent</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {category.status === 'attention' && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">!</span>
                    </div>
                  )}
                  <span className="text-gray-400 text-lg">›</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Bottom spacing for mobile navigation */}
          <div className="h-16"></div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-around max-w-md mx-auto">
            <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">My Profile</span>
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

  // Review & Confirm detailed view (Screens 9.1-9.11)
  if (selectedCategory.id === 'review-confirm') {
    return <ReviewConfirmScreen onBack={() => setSelectedCategory(null)} />;
  }

  // Documents Needed detailed view (Screens 9.11-9.18)
  if (selectedCategory.id === 'documents-needed') {
    return <DocumentsNeededScreen onBack={() => setSelectedCategory(null)} />;
  }

  // Exclusive Client Offers moved to My Rewards screen - redirect there
  if (selectedCategory.id === 'exclusive-offers') {
    onNavigate('rewards');
    return null;
  }

  // Other category views can be added here
  return (
    <div className="min-h-screen bg-background-main p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => setSelectedCategory(null)} className="text-2xl mr-4">←</button>
          <h1 className="text-2xl font-bold text-text-primary">{selectedCategory.title}</h1>
        </div>
        <p className="text-gray-600 mb-8">{selectedCategory.description}</p>
        <p className="text-gray-500">Detailed view for {selectedCategory.title} coming soon...</p>
      </div>
    </div>
  );
};

// Review & Confirm Screen Component (Screens 9.1-9.11)
const ReviewConfirmScreen = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState('overview'); // overview, disclosures-sent, etc.
  
  if (currentStep === 'overview') {
    return (
      <div className="min-h-screen bg-background-main">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-2xl">←</button>
            <span className="font-bold text-gray-800 text-lg">Review & Confirm</span>
          </div>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-lg">🔔</span>
          </div>
        </div>

        {/* Status Header */}
        <div className="bg-white p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-center mb-4">Status</h2>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
          </div>

          {/* Step Labels */}
          <div className="flex justify-between text-sm font-medium text-gray-600 max-w-sm mx-auto mb-4">
            <span className="text-green-600 font-semibold">Step 1</span>
            <span>Step 2</span>
            <span>Step 3</span>
            <span>Complete</span>
          </div>

          {/* Current Status */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-green-800">Disclosures Sent ✓</h3>
                <p className="text-sm text-green-600">Step 1 - Fasano (LCP Only)</p>
              </div>
              <div className="text-right">
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold">
                  Sent
                </button>
                <p className="text-xs text-green-600 mt-1">01/15/2024</p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Steps */}
        <div className="p-6 space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Notarized Docs</h3>
                <p className="text-sm text-gray-600">Step 2</p>
              </div>
              <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg">
                Pending
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-800">Closing Docs</h3>
                <p className="text-sm text-gray-600">Step 3</p>
              </div>
              <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg">
                Pending
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="p-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              • You have approximately 23 days to secure funding. Prioritize getting funded and handling all tasks.
            </p>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">My Profile</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📞</span>
              <span className="text-xs text-gray-600">Support</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
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

// Documents Needed Screen Component (Screens 9.11-9.18) 
const DocumentsNeededScreen = ({ onBack }) => {
  const [selectedDoc, setSelectedDoc] = useState(null);

  if (!selectedDoc) {
    return (
      <div className="min-h-screen bg-background-main">
        {/* Header */}
        <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
          <div className="flex items-center space-x-4">
            <button onClick={onBack} className="text-2xl">←</button>
            <span className="font-bold text-gray-800 text-lg">Documents Needed</span>
          </div>
          <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-lg">🔔</span>
          </div>
        </div>

        {/* Title */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-2">Tap, Snap, and Send!</h2>
        </div>

        {/* Document Grid */}
        <div className="px-6 pb-20">
          <div className="grid grid-cols-2 gap-4">
            <DocumentCard 
              title="Driver License"
              icon="🆔"
              status="required"
              onClick={() => setSelectedDoc('drivers-license')}
            />
            <DocumentCard 
              title="Benefits Letter"
              icon="📄"
              status="required"
              onClick={() => setSelectedDoc('benefits-letter')}
            />
            <DocumentCard 
              title="S.S Cert/W2"
              icon="📋"
              status="required"
              onClick={() => setSelectedDoc('ss-cert-w2')}
            />
            <DocumentCard 
              title="Debt Paperwork"
              icon="📊"
              status="optional"
              onClick={() => setSelectedDoc('debt-paperwork')}
            />
            <DocumentCard 
              title="Utility Bills"
              icon="⚡"
              status="optional"
              onClick={() => setSelectedDoc('utility-bills')}
            />
            <DocumentCard 
              title="Miscellaneous"
              icon="📁"
              status="optional"
              isHighlighted={true}
              onClick={() => setSelectedDoc('miscellaneous')}
            />
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex justify-around max-w-md mx-auto">
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🏠</span>
              <span className="text-xs text-gray-600">Home</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl text-green-600">📋</span>
              <span className="text-xs text-green-600 font-semibold">My Profile</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl">📞</span>
              <span className="text-xs text-gray-600">Support</span>
            </button>
            <button className="flex flex-col items-center space-y-1">
              <span className="text-2xl">🎁</span>
              <span className="text-xs text-gray-600">Rewards</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Document upload view would go here
  return (
    <div className="min-h-screen bg-background-main p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <button onClick={() => setSelectedDoc(null)} className="text-2xl mr-4">←</button>
          <h1 className="text-2xl font-bold text-text-primary">Upload {selectedDoc}</h1>
        </div>
        <p className="text-gray-600">Document upload functionality coming soon...</p>
      </div>
    </div>
  );
};

// Document Card Component
const DocumentCard = ({ title, icon, status, isHighlighted = false, onClick }) => {
  const borderColor = status === 'required' ? 'border-red-300' : 'border-gray-300';
  const bgColor = isHighlighted ? 'bg-green-100 border-green-400' : `bg-white ${borderColor}`;
  
  return (
    <div 
      onClick={onClick}
      className={`${bgColor} border-2 rounded-xl p-4 cursor-pointer hover:shadow-md transition-shadow`}
    >
      <div className="text-center">
        <div className="text-3xl mb-2">{icon}</div>
        <h3 className="font-medium text-gray-800 text-sm">{title}</h3>
        {status === 'required' && (
          <div className="w-4 h-4 bg-red-500 rounded-full mx-auto mt-2"></div>
        )}
      </div>
    </div>
  );
};

export default TodoListScreen;