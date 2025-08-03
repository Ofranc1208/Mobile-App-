import React, { useState } from 'react';
import { annuityData } from '../data/mockData';

const AnnuityProfileScreen = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('annuities'); // 'annuities', 'payments'
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(annuityData.primary || {});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Payment Breakdown Data - Exchange vs Remaining
  const [paymentBreakdown] = useState({
    totalMonthlyPayment: 1500.00,
    exchangedAmount: 500.00,
    remainingAmount: 1000.00,
    lumpSumAmount: 150000.00, // The actual lump sum they're receiving
    exchangeDetails: {
      duration: "Life of annuity",
      startDate: "01/15/2025", // American date format
      reason: "Lump sum for home purchase",
      lumpSumReceived: 150000.00
    },
    remainingDetails: {
      duration: "Life of annuity", 
      startDate: "01/15/2025", // American date format
      purpose: "Continued monthly income"
    }
  });

  // Insurance company data
  const [insuranceInfo] = useState({
    company: "Pacific Life Insurance Company",
    rating: "A+",
    ratingAgency: "A.M. Best",
    financialStrength: "Superior",
    establishedYear: 1868,
    contact: {
      phone: "1-800-722-2333",
      website: "www.pacificlife.com",
      address: "700 Newport Center Drive, Newport Beach, CA 92660"
    },
    policyNumber: "SS-2024-789456123",
    annuityType: "Structured Settlement Annuity",
    guarantees: [
      "Guaranteed periodic payments",
      "A.M. Best A+ rating",
      "State guaranty fund protection",
      "No management fees"
    ]
  });

  // Handle form input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle form submission
  const handleSave = () => {
    // In real app, this would make API call to backend
    console.log('Saving annuity data:', formData);
    
    // Show success message
    setShowSuccessMessage(true);
    setIsEditing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handle adding new annuity (for secondary tab)
  const handleAddAnnuity = () => {
    setFormData({
      insCompany: '',
      paymentType: '',
      firstPaymentDate: '',
      lastPaymentDate: '',
      paymentFrequency: '',
      paymentAmount: '',
      totalValue: '',
      annuityIssueDate: '',
      increasePercentage: ''
    });
    setIsEditing(true);
  };

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-2xl">←</button>
          <span className="font-bold text-gray-800 text-lg">My Annuity Portfolio</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mx-6 mt-4 rounded">
          <span className="font-semibold">Success!</span> Annuity information updated successfully.
        </div>
      )}

      {/* Simplified Tab Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex">
          <button
            onClick={() => setActiveTab('annuities')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'annuities'
                ? 'bg-brand-yellow text-gray-800 border-b-2 border-orange-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            📄 My Annuities
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 px-4 text-center font-medium ${
              activeTab === 'payments'
                ? 'bg-brand-yellow text-gray-800 border-b-2 border-orange-400'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            💰 Payment Schedule
          </button>
        </div>
      </div>

      {/* My Annuities Tab Content */}
      {activeTab === 'annuities' && (
        <div className="p-6 pb-24">
          <AnnuitiesView 
            primaryData={annuityData.primary}
            secondaryData={annuityData.secondary}
            onEditPrimary={() => setIsEditing(true)}
            onAddSecondary={handleAddAnnuity}
            isEditing={isEditing}
            onSave={handleSave}
            onCancel={() => {
              setIsEditing(false);
              setFormData(annuityData.primary || {});
            }}
            formData={formData}
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* Payment Schedule Tab Content */}
      {activeTab === 'payments' && (
        <div className="p-6 pb-24">
          <PaymentBreakdownView breakdown={paymentBreakdown} />
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">🏠</span>
            <span className="text-xs text-gray-600">Home</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <span className="text-2xl text-green-600">📄</span>
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
};

// Combined Annuities View Component
const AnnuitiesView = ({ primaryData, secondaryData, onEditPrimary, onAddSecondary, isEditing, onSave, onCancel, formData, onChange }) => {
  return (
    <div className="space-y-6">
      {/* Primary Annuity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Primary Annuity</h2>
          {!isEditing ? (
            <button
              onClick={onEditPrimary}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ✏️ Edit
            </button>
          ) : (
            <div className="space-x-2">
              <button
                onClick={onSave}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Save
              </button>
              <button
                onClick={onCancel}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium text-sm"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
        
        {!isEditing ? (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Insurance Company</h3>
              <p className="text-yellow-700">{primaryData?.insCompany || 'Not specified'}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Payment Type</h3>
              <p className="text-yellow-700">{primaryData?.paymentType || 'Not specified'}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Payment Amount</h3>
              <p className="text-yellow-700">${primaryData?.paymentAmount?.toLocaleString() || '0'}</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <h3 className="font-semibold text-yellow-800 mb-1 text-sm">Frequency</h3>
              <p className="text-yellow-700">{primaryData?.paymentFrequency || 'Not specified'}</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Company</label>
                <input
                  type="text"
                  value={formData?.insCompany || ''}
                  onChange={(e) => onChange('insCompany', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter insurance company"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                <select
                  value={formData?.paymentType || ''}
                  onChange={(e) => onChange('paymentType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="LCP">LCP</option>
                  <option value="Life Contingent">Life Contingent</option>
                  <option value="Period Certain">Period Certain</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                <input
                  type="number"
                  value={formData?.paymentAmount || ''}
                  onChange={(e) => onChange('paymentAmount', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency</label>
                <select
                  value={formData?.paymentFrequency || ''}
                  onChange={(e) => onChange('paymentFrequency', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select frequency</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Semi-Annual">Semi-Annual</option>
                  <option value="Annual">Annual</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Annuity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Secondary Annuity</h2>
          {secondaryData && (
            <button className="text-blue-600 hover:text-blue-800 font-medium">
              ✏️ Edit
            </button>
          )}
        </div>
        
        {!secondaryData ? (
          <div className="text-center py-8">
            <div className="text-gray-400 text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No Secondary Annuity</h3>
            <p className="text-gray-500 text-sm mb-4">
              Add a secondary annuity for tracking multiple income streams
            </p>
            <button
              onClick={onAddSecondary}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
            >
              Add Secondary Annuity
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-1 text-sm">Insurance Company</h3>
              <p className="text-blue-700">{secondaryData.insCompany}</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-1 text-sm">Payment Amount</h3>
              <p className="text-blue-700">${secondaryData.paymentAmount?.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Payment Breakdown View Component
const PaymentBreakdownView = ({ breakdown }) => {
  return (
    <div className="space-y-6">
      {/* Total Payment Overview */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">Payment Breakdown</h2>
        
        {/* Visual Breakdown */}
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center space-x-4">
            {/* Total Payment Circle */}
            <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
              <div className="text-center text-white">
                <div className="text-2xl font-bold">${breakdown.totalMonthlyPayment.toLocaleString()}</div>
                <div className="text-xs opacity-90">Total Monthly</div>
              </div>
            </div>
            
            {/* Arrow */}
            <div className="text-3xl text-gray-400">→</div>
            
            {/* Split Breakdown */}
            <div className="space-y-3">
              {/* Exchanged Amount - NOW POSITIVE! */}
              <div className="flex items-center space-x-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center shadow-md">
                  <div className="text-center text-white">
                    <div className="text-lg font-bold">${breakdown.exchangedAmount}</div>
                    <div className="text-xs opacity-90">Exchanged</div>
                  </div>
                </div>
                <div className="text-sm text-purple-700">
                  <div className="font-semibold">Getting ${breakdown.lumpSumAmount.toLocaleString()}</div>
                  <div className="text-xs">{breakdown.exchangeDetails.reason}</div>
                </div>
              </div>
              
              {/* Remaining Amount */}
              <div className="flex items-center space-x-3">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-md">
                  <div className="text-center text-white">
                    <div className="text-lg font-bold">${breakdown.remainingAmount}</div>
                    <div className="text-xs opacity-90">Remaining</div>
                  </div>
                </div>
                <div className="text-sm text-green-700">
                  <div className="font-semibold">Monthly Income</div>
                  <div className="text-xs">{breakdown.remainingDetails.purpose}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exchange Details */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Exchange Details</h3>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-3">🎉 Your Lump Sum Exchange</h4>
            
            {/* Prominent Lump Sum Display */}
            <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg mb-4 text-center">
              <h5 className="text-purple-700 text-sm font-medium mb-1">You're Receiving</h5>
              <div className="text-3xl font-bold text-purple-800">${breakdown.lumpSumAmount.toLocaleString()}</div>
              <p className="text-purple-600 text-sm mt-1">Lump Sum Payment</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-purple-600 text-sm">Monthly Amount Exchanged:</span>
                <p className="font-bold text-purple-800">${breakdown.exchangedAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-purple-600 text-sm">Duration:</span>
                <p className="font-bold text-purple-800">{breakdown.exchangeDetails.duration}</p>
              </div>
              <div>
                <span className="text-purple-600 text-sm">Start Date:</span>
                <p className="font-bold text-purple-800">{breakdown.exchangeDetails.startDate}</p>
              </div>
              <div>
                <span className="text-purple-600 text-sm">Purpose:</span>
                <p className="font-bold text-purple-800">{breakdown.exchangeDetails.reason}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-3">💰 Continuing Monthly Income</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-green-600 text-sm">Monthly Amount:</span>
                <p className="font-bold text-green-800">${breakdown.remainingAmount.toLocaleString()}</p>
              </div>
              <div>
                <span className="text-green-600 text-sm">Duration:</span>
                <p className="font-bold text-green-800">{breakdown.remainingDetails.duration}</p>
              </div>
              <div>
                <span className="text-green-600 text-sm">Start Date:</span>
                <p className="font-bold text-green-800">{breakdown.remainingDetails.startDate}</p>
              </div>
              <div>
                <span className="text-green-600 text-sm">Purpose:</span>
                <p className="font-bold text-green-800">{breakdown.remainingDetails.purpose}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <h4 className="font-bold text-purple-800 mb-3">🎯 Your Exchange Benefits</h4>
        <div className="text-sm text-purple-700 space-y-2">
          <p>
            <strong>Original Monthly Payment:</strong> ${breakdown.totalMonthlyPayment.toLocaleString()}
          </p>
          <p>
            <strong>Lump Sum You're Getting:</strong> <span className="text-purple-800 font-bold">${breakdown.lumpSumAmount.toLocaleString()}</span>
          </p>
          <p>
            <strong>Monthly Portion Exchanged:</strong> ${breakdown.exchangedAmount.toLocaleString()} ({((breakdown.exchangedAmount / breakdown.totalMonthlyPayment) * 100).toFixed(1)}%)
          </p>
          <p>
            <strong>Continuing Monthly Income:</strong> ${breakdown.remainingAmount.toLocaleString()} ({((breakdown.remainingAmount / breakdown.totalMonthlyPayment) * 100).toFixed(1)}%)
          </p>
          <p className="text-xs text-purple-600 mt-3 bg-purple-100 p-3 rounded-lg">
            🎉 <strong>Great Choice!</strong> You're getting ${breakdown.lumpSumAmount.toLocaleString()} upfront for your home purchase while still keeping ${breakdown.remainingAmount.toLocaleString()} monthly income for life!
          </p>
        </div>
      </div>
    </div>
  );
};

// Annuity Display View Component (Read-only view)
const AnnuityDisplayView = ({ data, onEdit, type }) => {
  if (!data) {
    return <EmptySecondaryView onAdd={onEdit} />;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {type === 'primary' ? 'Primary' : 'Secondary'} Annuity
        </h2>
        <button
          onClick={onEdit}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ✏️ Edit
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ins Company</label>
            <div className="text-gray-800 font-medium">{data.insCompany}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Type</label>
            <div className="text-gray-800 font-medium">{data.paymentType}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">First Payment Date</label>
            <div className="text-gray-800 font-medium">{data.firstPaymentDate}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Last Payment Date</label>
            <div className="text-gray-800 font-medium">{data.lastPaymentDate}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Frequency</label>
            <div className="text-gray-800 font-medium">{data.paymentFrequency}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Amount</label>
            <div className="text-gray-800 font-medium">${data.paymentAmount?.toLocaleString()}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Total Value</label>
            <div className="text-gray-800 font-medium">${data.totalValue?.toLocaleString()}</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Annuity Issue Date</label>
            <div className="text-gray-800 font-medium">{data.annuityIssueDate}</div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Increase %</label>
          <div className="text-gray-800 font-medium">{data.increasePercentage}%</div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📝 Broaden your portfolio with multiple annuities, offering the potential for up to $1,500 in bonuses.
        </p>
      </div>
    </div>
  );
};

// Annuity Edit Form Component
const AnnuityEditForm = ({ data, onChange, onSave, onCancel, type }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">
          {type === 'primary' ? 'Edit Primary' : 'Add Secondary'} Annuity
        </h2>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Ins Company</label>
            <input
              type="text"
              value={data.insCompany || ''}
              onChange={(e) => onChange('insCompany', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Met Life"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Type</label>
            <select
              value={data.paymentType || ''}
              onChange={(e) => onChange('paymentType', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="LCP">LCP</option>
              <option value="GP">GP</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Frequency</label>
            <select
              value={data.paymentFrequency || ''}
              onChange={(e) => onChange('paymentFrequency', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annually">Annually</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Amount</label>
            <input
              type="number"
              value={data.paymentAmount || ''}
              onChange={(e) => onChange('paymentAmount', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="$500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment Start Date</label>
            <input
              type="date"
              value={data.firstPaymentDate || ''}
              onChange={(e) => onChange('firstPaymentDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Payment End Date</label>
            <input
              type="date"
              value={data.lastPaymentDate || ''}
              onChange={(e) => onChange('lastPaymentDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Annuity Issue Date</label>
            <input
              type="date"
              value={data.annuityIssueDate || ''}
              onChange={(e) => onChange('annuityIssueDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Increase %</label>
            <input
              type="number"
              value={data.increasePercentage || ''}
              onChange={(e) => onChange('increasePercentage', parseFloat(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="3"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 mt-8">
        <button
          onClick={onSave}
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Save
        </button>
        <button
          onClick={onCancel}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📝 Broaden your portfolio with multiple annuities, offering the potential for up to $1,500 in bonuses.
        </p>
      </div>
    </div>
  );
};

// Empty Secondary View Component
const EmptySecondaryView = ({ onAdd }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-8 text-center">
      <div className="text-6xl mb-4">📄</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">No Secondary Annuity</h3>
      <p className="text-gray-600 mb-6">Add a secondary annuity to broaden your portfolio</p>
      
      <button
        onClick={onAdd}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors"
      >
        Add Annuity
      </button>

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          📝 Broaden your portfolio with multiple annuities, offering the potential for up to $1,500 in bonuses.
        </p>
      </div>
    </div>
  );
};

// Payment Schedule View Component
const PaymentScheduleView = ({ schedule }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment Schedule</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          📧 Email Schedule
        </button>
      </div>

      {/* Next Payment Highlight */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-green-800">Next Payment</h3>
            <p className="text-green-700">{formatDate(schedule[0].date)}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{formatCurrency(schedule[0].amount)}</div>
            <span className="text-sm text-green-600">in 23 days</span>
          </div>
        </div>
      </div>

      {/* Schedule Summary */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700">Monthly Amount</h4>
          <p className="text-xl font-bold text-blue-600">{formatCurrency(1250)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-700">Annual Total</h4>
          <p className="text-xl font-bold text-blue-600">{formatCurrency(15000)}</p>
        </div>
      </div>

      {/* Payment List */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-700">Upcoming Payments</h3>
        {schedule.map((payment, index) => (
          <div key={index} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{formatDate(payment.date)}</h4>
                <p className="text-sm text-gray-600">{payment.type}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">{formatCurrency(payment.amount)}</div>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  payment.status === 'Upcoming' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {payment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Important Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-yellow-600 text-xl mr-3">⚠️</div>
          <div>
            <h4 className="font-semibold text-yellow-800 mb-1">Tax-Free Payments</h4>
            <p className="text-sm text-yellow-700">
              All payments are tax-free under IRC Section 104(a)(2). No 1099 forms will be issued.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Insurance Information View Component
const InsuranceInfoView = ({ info }) => {
  return (
    <div className="p-6 pb-24 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Insurance Company</h2>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">
          🌐 Visit Website
        </button>
      </div>

      {/* Company Overview */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{info.company}</h3>
            <p className="text-sm text-gray-600">Established {info.establishedYear}</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{info.rating}</div>
            <p className="text-sm text-gray-600">{info.ratingAgency} Rating</p>
          </div>
        </div>
        <div className="border-t pt-4">
          <p className="text-gray-700"><strong>Financial Strength:</strong> {info.financialStrength}</p>
          <p className="text-gray-700"><strong>Policy Number:</strong> {info.policyNumber}</p>
          <p className="text-gray-700"><strong>Annuity Type:</strong> {info.annuityType}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">Contact Information</h4>
        <div className="space-y-2 text-sm text-gray-700">
          <p><strong>Phone:</strong> {info.contact.phone}</p>
          <p><strong>Website:</strong> {info.contact.website}</p>
          <p><strong>Address:</strong> {info.contact.address}</p>
        </div>
        <div className="flex space-x-3 mt-4">
          <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm">
            📞 Call
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm">
            📧 Email
          </button>
        </div>
      </div>

      {/* Guarantees & Protection */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <h4 className="font-semibold text-gray-800 mb-3">Guarantees & Protection</h4>
        <div className="space-y-2">
          {info.guarantees.map((guarantee, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span className="text-green-500">✅</span>
              <span className="text-sm text-gray-700">{guarantee}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Details */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex">
          <div className="text-green-600 text-xl mr-3">🏆</div>
          <div>
            <h4 className="font-semibold text-green-800 mb-1">Superior Financial Strength</h4>
            <p className="text-sm text-green-700">
              A.M. Best's "A+" rating indicates superior ability to meet ongoing insurance obligations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnuityProfileScreen;