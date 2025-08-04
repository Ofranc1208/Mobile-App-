import React, { useState, useEffect } from 'react';
import PayoutCard from '../components/PayoutCard';
import RadialMenu from '../components/RadialMenu';
import { todoCategories } from '../data/mockData';

const DashboardScreen = ({ onNavigate }) => {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const finalAmount = 26525.32;

  // Calculate dynamic progress from todos - UX RESEARCH BASED
  const calculateProgress = () => {
    const allItems = todoCategories.flatMap(cat => cat.items);
    const completedItems = allItems.filter(item => item.status === 'completed');
    const totalItems = allItems.length;
    const progressPercent = Math.round((completedItems.length / totalItems) * 100);
    
    // Step categorization based on UX research best practices
    // Step 1: Review & Confirm (0-25%)
    // Step 2: Documents Upload (26-50%) 
    // Step 3: Final Processing (51-75%)
    // Step 4: Complete (76-100%)
    
    let currentStep = 1;
    let stepStatus = 'pending'; // pending, active, completed
    
    if (progressPercent >= 76) {
      currentStep = 4;
      stepStatus = 'completed';
    } else if (progressPercent >= 51) {
      currentStep = 3;
      stepStatus = 'active';
    } else if (progressPercent >= 26) {
      currentStep = 3;
      stepStatus = 'pending'; // Step 3 is orange (pending/in-progress)
    } else if (progressPercent >= 1) {
      currentStep = 2;
      stepStatus = 'active';
    } else {
      currentStep = 1;
      stepStatus = 'active';
    }
    
    // Show orange for step 3 when we're in the 26-50% range (step 2 complete, step 3 starting)
    const showOrangeStep3 = progressPercent >= 26 && progressPercent <= 50;
    
    return { 
      currentStep, 
      progressPercent, 
      completedItems: completedItems.length, 
      totalItems,
      stepStatus,
      showOrangeStep3
    };
  };

  const progress = calculateProgress();

  // Sound functions (same as My Rewards)
  const playCountingSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  const playWinSound = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.2);
    
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  };

  // Animated counting effect
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = finalAmount / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newAmount = Math.min(increment * currentStep, finalAmount);
      setAnimatedAmount(newAmount);
      
      // Play counting sound every few steps
      if (currentStep % 3 === 0 && currentStep < steps) {
        try {
          playCountingSound();
        } catch (error) {
          console.log('Audio not available');
        }
      }
      
      if (currentStep >= steps) {
        setAnimatedAmount(finalAmount);
        // Play win sound at the end
        try {
          setTimeout(() => playWinSound(), 200);
        } catch (error) {
          console.log('Audio not available');
        }
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-orange-100 flex flex-col">
      {/* Top Section - User Info - EXTRA THIN */}
      <div className="flex justify-between items-center py-1 px-3 bg-gradient-to-r from-yellow-400 via-orange-300 to-yellow-400 shadow-lg border-b border-orange-200">
        <div 
          onClick={() => {
            console.log('ID area clicked - navigating to profile');
            onNavigate('profile');
          }}
          className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity p-1 rounded-lg"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white text-lg">👤</span>
          </div>
          <span className="font-bold text-gray-800 text-base drop-shadow-sm select-none">
            ID LM58324
          </span>
        </div>
        <div 
          onClick={() => onNavigate('todo')}
          className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-xl border-2 border-white cursor-pointer hover:scale-105 transition-all duration-200 relative"
        >
          <span className="text-white text-lg">🔔</span>
          {/* Notification indicator */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent"></div>

      {/* Main Content Area - TIGHTER SPACING */}
      <div className="flex-1 flex flex-col items-center justify-start pt-6 p-4">
        
        {/* Payout Section with Enhanced Styling and Animation */}
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-gray-700 mb-3 drop-shadow-sm">My Payout</p>
          <div 
            onClick={() => onNavigate('court', { tab: 'deal' })}
            className="relative cursor-pointer hover:scale-105 transition-all duration-200"
          >
            {/* 3D Shadow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl transform translate-x-1 translate-y-1"></div>
            {/* Main Payout Card */}
            <div className="relative border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-white via-gray-50 to-white shadow-xl hover:shadow-2xl transition-shadow duration-200">
              <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent drop-shadow-sm transition-all duration-200">
                {formatAmount(animatedAmount)}
              </p>
            </div>
          </div>
        </div>

        {/* Divider Line */}
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mb-3"></div>

        {/* Clean Radial Menu with NO Shadow Ring */}
        <div className="mt-1 relative">
          <RadialMenu onNavigate={onNavigate} />
        </div>

        {/* Divider Line */}
        <div className="w-3/4 h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent mt-6 mb-6"></div>

        {/* Clean Status Section - CLICKABLE */}
        <div 
          onClick={() => onNavigate('todo')}
          className="text-center pb-4 cursor-pointer hover:bg-white/30 rounded-xl p-4 transition-all duration-200"
        >
          <p className="text-base font-semibold text-gray-700 mb-4">Status</p>
          
          {/* UX Research-Based Progress Display */}
          <div className="flex items-center justify-center space-x-3">
            {/* Step 1: Review & Confirm */}
            <div className={`w-4 h-4 rounded-full shadow-md ${progress.currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            
            {/* Connection 1→2 */}
            <div className={`w-12 h-2 rounded-full ${progress.currentStep >= 2 ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            
            {/* Step 2: Document Upload */}
            <div className={`w-4 h-4 rounded-full shadow-sm ${progress.currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            
            {/* Connection 2→3: ORANGE when step 3 is pending */}
            <div className={`w-12 h-2 rounded-full ${
              progress.currentStep >= 3 && !progress.showOrangeStep3 ? 'bg-green-400' : 
              progress.showOrangeStep3 ? 'bg-orange-400' : 'bg-gray-300'
            }`}></div>
            
            {/* Step 3: Final Processing - ORANGE when pending */}
            <div className={`w-4 h-4 rounded-full shadow-sm ${
              progress.currentStep >= 3 && !progress.showOrangeStep3 ? 'bg-green-500' : 
              progress.showOrangeStep3 ? 'bg-orange-500' : 'bg-gray-300'
            }`}></div>
            
            {/* Connection 3→4 */}
            <div className={`w-12 h-2 rounded-full ${progress.currentStep >= 4 ? 'bg-green-400' : 'bg-gray-300'}`}></div>
            
            {/* Step 4: Complete */}
            <div className={`w-4 h-4 rounded-full shadow-sm ${progress.currentStep >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
          </div>
          
          <div className="flex justify-between text-sm font-medium text-gray-600 mt-4 max-w-sm mx-auto">
            <span className={progress.currentStep >= 1 ? 'text-green-600 font-semibold' : 'text-gray-500'}>Step 1</span>
            <span className={progress.currentStep >= 2 ? 'text-green-600 font-semibold' : 'text-gray-500'}>Step 2</span>
            <span className={`${
              progress.currentStep >= 3 && !progress.showOrangeStep3 ? 'text-green-600 font-semibold' : 
              progress.showOrangeStep3 ? 'text-orange-600 font-semibold' : 'text-gray-500'
            }`}>Step 3</span>
            <span className={progress.currentStep >= 4 ? 'text-green-600 font-semibold' : 'text-gray-500'}>Complete</span>
          </div>
          
          {/* Progress indicator */}
          <p className="text-xs text-gray-500 mt-2">{progress.completedItems} of {progress.totalItems} tasks completed ({progress.progressPercent}%)</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen; 