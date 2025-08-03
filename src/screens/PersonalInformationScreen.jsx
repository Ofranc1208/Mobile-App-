import React, { useState } from 'react';
import { userProfile } from '../data/mockData';

const PersonalInformationScreen = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('profile'); // profile, beneficiaries, tax-docs
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  
  // Beneficiary data
  const [beneficiaries, setBeneficiaries] = useState([
    { id: 1, name: "Sarah Johnson", relationship: "Spouse", percentage: 50, type: "Primary", phone: "(555) 123-4567" },
    { id: 2, name: "Michael Johnson", relationship: "Son", percentage: 25, type: "Primary", phone: "(555) 234-5678" },
    { id: 3, name: "Emily Johnson", relationship: "Daughter", percentage: 25, type: "Primary", phone: "(555) 345-6789" },
    { id: 4, name: "Robert Smith", relationship: "Brother", percentage: 100, type: "Contingent", phone: "(555) 456-7890" }
  ]);

  // Tax documents data
  const [taxDocuments, setTaxDocuments] = useState([
    { id: 1, type: "Tax-Free Status Certificate", year: 2024, status: "Available", downloadUrl: "#" },
    { id: 2, type: "IRC 104(a)(2) Documentation", year: 2024, status: "Available", downloadUrl: "#" },
    { id: 3, type: "Settlement Agreement Tax Summary", year: 2024, status: "Available", downloadUrl: "#" },
    { id: 4, type: "Annual Tax Statement", year: 2023, status: "Available", downloadUrl: "#" }
  ]);

  // Handle form input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      // Handle nested fields like address.street
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Handle form submission
  const handleSave = () => {
    // In real app, this would make API call to backend
    console.log('Saving profile data:', formData);
    
    // Show success message
    setShowSuccessMessage(true);
    setIsEditing(false);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  // Handle avatar upload simulation
  const handleAvatarUpload = (type) => {
    // In real app, this would open camera or gallery
    console.log(`Opening ${type} for avatar upload`);
    
    // Simulate avatar upload with placeholder
    const placeholderAvatar = `https://via.placeholder.com/150/4ade80/ffffff?text=${formData.firstName[0]}${formData.lastName[0]}`;
    setAvatarPreview(placeholderAvatar);
    setFormData(prev => ({
      ...prev,
      avatar: placeholderAvatar
    }));
    setShowAvatarOptions(false);
  };

  return (
    <div className="min-h-screen bg-background-main">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-brand-yellow shadow-md border-b-2 border-orange-200">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="text-2xl">←</button>
          <span className="font-bold text-gray-800 text-lg">Personal Information</span>
        </div>
        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="px-6 pt-6 pb-4">
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'profile'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            👤 Profile
          </button>
          <button
            onClick={() => setActiveTab('beneficiaries')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'beneficiaries'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            👥 Beneficiaries
          </button>
          <button
            onClick={() => setActiveTab('tax-docs')}
            className={`flex-1 py-2 px-4 rounded-md font-medium text-sm transition-colors ${
              activeTab === 'tax-docs'
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600'
            }`}
          >
            📄 Tax Docs
          </button>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mx-6 mt-4 rounded">
          <span className="font-semibold">Success!</span> Profile updated successfully.
        </div>
      )}

      {/* Main Content */}
      <div className="p-6 pb-24">
        {activeTab === 'profile' && (
          !isEditing ? (
            <ProfileDisplayView 
              data={formData}
              onEdit={() => setIsEditing(true)}
            />
          ) : (
            <ProfileEditForm 
              data={formData}
              onChange={handleInputChange}
              onSave={handleSave}
              onCancel={() => {
                setIsEditing(false);
                setFormData(userProfile);
                setAvatarPreview(null);
              }}
              onAvatarClick={() => setShowAvatarOptions(true)}
              avatarPreview={avatarPreview}
            />
          )
        )}

        {activeTab === 'beneficiaries' && (
          <BeneficiariesView beneficiaries={beneficiaries} />
        )}

        {activeTab === 'tax-docs' && (
          <TaxDocumentsView documents={taxDocuments} />
        )}
      </div>

      {/* Avatar Options Modal */}
      {showAvatarOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl p-6 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Choose Photo</h3>
              <button 
                onClick={() => setShowAvatarOptions(false)}
                className="text-2xl text-gray-400"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => handleAvatarUpload('camera')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">📷</span>
                <span>Take Photo</span>
              </button>
              
              <button
                onClick={() => handleAvatarUpload('gallery')}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3"
              >
                <span className="text-2xl">🖼️</span>
                <span>Choose from Gallery</span>
              </button>
              
              <button
                onClick={() => setShowAvatarOptions(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-4 px-6 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
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
            <span className="text-2xl text-green-600">👤</span>
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

// Profile Display View Component (Read-only) - PROFESSIONAL & CLEAN
const ProfileDisplayView = ({ data, onEdit }) => {
  const [expandedSections, setExpandedSections] = useState({
    contact: false,
    address: false,
    employment: false,
    emergency: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Main Profile Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center shadow-sm overflow-hidden flex-shrink-0">
              {data.avatar ? (
                <img src={data.avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-white text-lg font-bold">
                  {data.firstName[0]}{data.lastName[0]}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-xl font-bold text-gray-900 truncate">
                {data.firstName} {data.middleName} {data.lastName}
              </h2>
              <p className="text-gray-600 text-sm">ID: {data.id}</p>
              <div className="flex items-center space-x-2 mt-1 text-sm text-gray-600 flex-wrap">
                <span>{data.dateOfBirth}</span>
                <span>•</span>
                <span>{data.gender}</span>
                <span>•</span>
                <span>{data.maritalStatus}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors flex-shrink-0"
          >
            ✏️ Edit
          </button>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('contact')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">📞</span>
            </div>
            <h3 className="font-semibold text-gray-900">Contact Information</h3>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.contact ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.contact && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Primary Phone</label>
                <div className="text-gray-900 font-medium">{data.phone}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Secondary Phone</label>
                <div className="text-gray-900 font-medium">{data.phoneSecondary}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Email Address</label>
                <div className="text-gray-900 font-medium">{data.email}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Address Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('address')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">🏠</span>
            </div>
            <h3 className="font-semibold text-gray-900">Home Address</h3>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.address ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.address && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="mt-3">
              <div className="text-gray-900 font-medium">{data.address.street}</div>
              <div className="text-gray-600">{data.address.city}, {data.address.state} {data.address.zipCode}</div>
            </div>
          </div>
        )}
      </div>

      {/* Employment Information Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('employment')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-sm">💼</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Employment Information</h3>
              <p className="text-sm text-gray-600">{data.employment?.status || 'Not provided'} • {data.employment?.employer || 'N/A'}</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.employment ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.employment && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Employment Status</label>
                <div className="text-gray-900 font-medium">{data.employment?.status || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Employer</label>
                <div className="text-gray-900 font-medium">{data.employment?.employer || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Position</label>
                <div className="text-gray-900 font-medium">{data.employment?.position || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Work Phone</label>
                <div className="text-gray-900 font-medium">{data.employment?.workPhone || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Years Employed</label>
                <div className="text-gray-900 font-medium">{data.employment?.yearsEmployed || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Annual Income</label>
                <div className="text-gray-900 font-medium">{data.employment?.annualIncome || 'Not provided'}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Emergency Contact Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('emergency')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-sm">🚨</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Emergency Contact</h3>
              <p className="text-sm text-gray-600">{data.emergencyContact?.name || 'Not provided'} • {data.emergencyContact?.relationship || 'N/A'}</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.emergency ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.emergency && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Contact Name</label>
                <div className="text-gray-900 font-medium">{data.emergencyContact?.name || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Relationship</label>
                <div className="text-gray-900 font-medium">{data.emergencyContact?.relationship || 'Not provided'}</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">Phone Number</label>
                <div className="text-gray-900 font-medium">{data.emergencyContact?.phone || 'Not provided'}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Profile Edit Form Component
const ProfileEditForm = ({ data, onChange, onSave, onCancel, onAvatarClick, avatarPreview }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      {/* Header with Avatar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onAvatarClick}
            className="relative w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white overflow-hidden cursor-pointer hover:opacity-80"
          >
            {avatarPreview || data.avatar ? (
              <img 
                src={avatarPreview || data.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            ) : (
              <span className="text-white text-2xl font-bold">
                {data.firstName[0]}{data.lastName[0]}
              </span>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
              <span className="text-white text-xs">✏️</span>
            </div>
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Edit Profile</h2>
            <p className="text-gray-600">{data.id}</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                value={data.firstName}
                onChange={(e) => onChange('firstName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Middle Name</label>
              <input
                type="text"
                value={data.middleName}
                onChange={(e) => onChange('middleName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                value={data.lastName}
                onChange={(e) => onChange('lastName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">DOB</label>
              <input
                type="text"
                value={data.dateOfBirth}
                onChange={(e) => onChange('dateOfBirth', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="1/12/1985"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
              <select
                value={data.gender}
                onChange={(e) => onChange('gender', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Marital Status</label>
              <select
                value={data.maritalStatus}
                onChange={(e) => onChange('maritalStatus', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Contact Information</h3>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone #1</label>
              <input
                type="tel"
                value={data.phone}
                onChange={(e) => onChange('phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone #2</label>
              <input
                type="tel"
                value={data.phoneSecondary}
                onChange={(e) => onChange('phoneSecondary', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
              <input
                type="email"
                value={data.email}
                onChange={(e) => onChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Address</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Street Address</label>
              <input
                type="text"
                value={data.address.street}
                onChange={(e) => onChange('address.street', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">City</label>
                <input
                  type="text"
                  value={data.address.city}
                  onChange={(e) => onChange('address.city', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">State</label>
                <input
                  type="text"
                  value={data.address.state}
                  onChange={(e) => onChange('address.state', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">ZIP Code</label>
              <input
                type="text"
                value={data.address.zipCode}
                onChange={(e) => onChange('address.zipCode', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Employment Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Employment Status</label>
              <select
                value={data.employment?.status || ''}
                onChange={(e) => onChange('employment.status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select Status</option>
                <option value="Employed">Employed</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Unemployed">Unemployed</option>
                <option value="Retired">Retired</option>
                <option value="Student">Student</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Employer</label>
              <input
                type="text"
                value={data.employment?.employer || ''}
                onChange={(e) => onChange('employment.employer', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Position</label>
              <input
                type="text"
                value={data.employment?.position || ''}
                onChange={(e) => onChange('employment.position', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Work Phone</label>
              <input
                type="tel"
                value={data.employment?.workPhone || ''}
                onChange={(e) => onChange('employment.workPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Years Employed</label>
              <input
                type="text"
                value={data.employment?.yearsEmployed || ''}
                onChange={(e) => onChange('employment.yearsEmployed', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., 8 years"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Annual Income</label>
              <input
                type="text"
                value={data.employment?.annualIncome || ''}
                onChange={(e) => onChange('employment.annualIncome', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., $85,000"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Emergency Contact</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Contact Name</label>
              <input
                type="text"
                value={data.emergencyContact?.name || ''}
                onChange={(e) => onChange('emergencyContact.name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Relationship</label>
              <input
                type="text"
                value={data.emergencyContact?.relationship || ''}
                onChange={(e) => onChange('emergencyContact.relationship', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Sister, Brother, Friend"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
              <input
                type="tel"
                value={data.emergencyContact?.phone || ''}
                onChange={(e) => onChange('emergencyContact.phone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
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
    </div>
  );
};

// Beneficiaries View Component - PROFESSIONAL & COLLAPSIBLE
const BeneficiariesView = ({ beneficiaries }) => {
  const [expandedSections, setExpandedSections] = useState({
    primary: false,
    contingent: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const primaryBeneficiaries = beneficiaries.filter(b => b.type === 'Primary');
  const contingentBeneficiaries = beneficiaries.filter(b => b.type === 'Contingent');
  const totalCoverage = primaryBeneficiaries.reduce((sum, b) => sum + b.percentage, 0);

  return (
    <div className="space-y-4">
      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Beneficiary Management</h2>
            <p className="text-gray-600 text-sm mt-1">
              {beneficiaries.length} beneficiaries • {totalCoverage}% primary coverage
            </p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Add Beneficiary
          </button>
        </div>
      </div>

      {/* Primary Beneficiaries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('primary')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">👑</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Primary Beneficiaries</h3>
              <p className="text-sm text-gray-600">{primaryBeneficiaries.length} recipients • {totalCoverage}% total</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.primary ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.primary && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="space-y-3 mt-3">
              {primaryBeneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{beneficiary.name}</h4>
                      <p className="text-sm text-gray-600">{beneficiary.relationship} • {beneficiary.phone}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{beneficiary.percentage}%</div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Contingent Beneficiaries */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('contingent')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-sm">🛡️</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Contingent Beneficiaries</h3>
              <p className="text-sm text-gray-600">{contingentBeneficiaries.length} backup recipients</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.contingent ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.contingent && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="space-y-3 mt-3">
              {contingentBeneficiaries.map((beneficiary) => (
                <div key={beneficiary.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{beneficiary.name}</h4>
                      <p className="text-sm text-gray-600">{beneficiary.relationship} • {beneficiary.phone}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-orange-600">{beneficiary.percentage}%</div>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Legal Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
            <span className="text-blue-600 text-xs">ℹ️</span>
          </div>
          <div>
            <h4 className="font-medium text-blue-900 mb-1">Legal Notice</h4>
            <p className="text-sm text-blue-800">
              Changes to beneficiaries may require court approval. Contact your settlement administrator for assistance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tax Documents View Component - PROFESSIONAL & ORGANIZED
const TaxDocumentsView = ({ documents }) => {
  const [expandedSections, setExpandedSections] = useState({
    documents: false,
    cpa: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-4">
      {/* Tax Status Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tax Documentation</h2>
            <div className="flex items-center space-x-2 mt-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                ✓ Tax-Free Status
              </span>
              <span className="text-gray-600 text-sm">IRC Section 104(a)(2)</span>
            </div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
            <span>📧</span>
            <span>Email CPA</span>
          </button>
        </div>
      </div>

      {/* Documents List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('documents')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">📄</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Available Documents</h3>
              <p className="text-sm text-gray-600">{documents.length} documents ready for download</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.documents ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.documents && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="space-y-3 mt-3">
              {documents.map((doc) => (
                <div key={doc.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doc.type}</h4>
                      <div className="flex items-center space-x-3 mt-1">
                        <span className="text-sm text-gray-600">Year: {doc.year}</span>
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                          doc.status === 'Available' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {doc.status}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <span>📥</span>
                        <span>Download</span>
                      </button>
                      <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-lg text-sm transition-colors flex items-center space-x-1">
                        <span>📧</span>
                        <span>Email</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CPA Contact Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <button
          onClick={() => toggleSection('cpa')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-sm">👨‍💼</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Tax Professional</h3>
              <p className="text-sm text-gray-600">Jennifer Martinez, CPA</p>
            </div>
          </div>
          <span className={`text-gray-400 transition-transform ${expandedSections.cpa ? 'rotate-180' : ''}`}>
            ▼
          </span>
        </button>
        
        {expandedSections.cpa && (
          <div className="px-4 pb-4 border-t border-gray-100">
            <div className="mt-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Name</label>
                  <div className="text-gray-900 font-medium">Jennifer Martinez, CPA</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Firm</label>
                  <div className="text-gray-900 font-medium">Settlement Tax Advisors</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                  <div className="text-gray-900 font-medium">(555) 123-TAX1</div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                  <div className="text-gray-900 font-medium">jennifer@settlementtax.com</div>
                </div>
              </div>
              <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2">
                <span>📞</span>
                <span>Contact CPA</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalInformationScreen;