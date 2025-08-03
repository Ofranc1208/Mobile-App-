import React, { useState, useEffect } from 'react';
import { myRewardsData, exclusiveOffersData } from '../data/mockData';

const MyRewardsScreen = ({ onNavigate, onBack }) => {
  const [activeTab, setActiveTab] = useState('rewards'); // 'rewards', 'winnings', or 'offers'
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [currentRotation, setCurrentRotation] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentWinnings, setCurrentWinnings] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [showWinBanner, setShowWinBanner] = useState(false);
  const [pendingWinAmount, setPendingWinAmount] = useState(0);

  // Create spinning sound effect
  const playSpinSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create spinning/whirring sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Start with higher frequency and drop down
      oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 2.8);
      
      gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2.8);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 2.8);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playSpinWinSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create celebratory win sound for spin
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const oscillator3 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      oscillator3.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Major chord progression for big win feeling
      oscillator1.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator2.frequency.setValueAtTime(659, audioContext.currentTime); // E5
      oscillator3.frequency.setValueAtTime(784, audioContext.currentTime); // G5
      
      oscillator1.frequency.setValueAtTime(1047, audioContext.currentTime + 0.3); // C6
      oscillator2.frequency.setValueAtTime(1319, audioContext.currentTime + 0.3); // E6
      oscillator3.frequency.setValueAtTime(1568, audioContext.currentTime + 0.3); // G6
      
      gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.2);
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator3.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 1.2);
      oscillator2.stop(audioContext.currentTime + 1.2);
      oscillator3.stop(audioContext.currentTime + 1.2);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  const playChinkSound = () => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create satisfying "chink" sound like money being added
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Quick high-pitched "chink" like a coin
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.05);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Handle spin wheel with realistic physics
  const handleSpin = () => {
    if (myRewardsData.weeklySpins.spinsRemaining <= 0 || isSpinning) return;

    setIsSpinning(true);
    setSpinResult(null);
    setShowConfetti(false);

    // Play spinning sound
    playSpinSound();

    // Random spin logic with realistic physics
    const segments = myRewardsData.weeklySpins.wheelSegments;
    const randomIndex = Math.floor(Math.random() * segments.length);
    const winningSegment = segments[randomIndex];
    
    // Calculate target position (pointer at 3 o'clock = 0 degrees)
    const segmentAngle = 360 / segments.length;
    const targetAngle = randomIndex * segmentAngle + (segmentAngle / 2); // Center of segment
    
    // Add realistic multiple full rotations (between 3-6 full spins)
    const minSpins = 3;
    const maxSpins = 6;
    const spins = minSpins + Math.random() * (maxSpins - minSpins);
    
    // Calculate final rotation with proper targeting
    const baseRotation = spins * 360;
    const finalRotation = currentRotation + baseRotation - targetAngle;

    setCurrentRotation(finalRotation);

    // Show result after realistic spin animation (4 seconds)
    setTimeout(() => {
      setIsSpinning(false);
      setSpinResult(winningSegment);
      setShowConfetti(true);
      setShowWinBanner(true);
      setPendingWinAmount(winningSegment.value);
      
      // Update remaining spins
      myRewardsData.weeklySpins.spinsRemaining -= 1;
      myRewardsData.weeklySpins.spinsUsed += 1;
      
      // Play win sound after spin completes
      playSpinWinSound();

      // Auto-scroll to bottom to show winnings section
      setTimeout(() => {
        window.scrollTo({ 
          top: document.body.scrollHeight, 
          behavior: 'smooth' 
        });
      }, 500);

      // Hide confetti after 6 seconds (longer duration)
      setTimeout(() => {
        setShowConfetti(false);
      }, 6000);
    }, 4000); // Match the 4-second animation duration
  };

  // Handle clicking the win banner to add money
  const handleWinBannerClick = () => {
    setShowWinBanner(false);
    setSpinResult(null);
    
    // Add winnings to total with satisfying animation
    setCurrentWinnings(pendingWinAmount);
    setTotalWinnings(prev => prev + pendingWinAmount);
    
    // Play satisfying "chink" sound
    playChinkSound();
    
    // Reset pending amount
    setPendingWinAmount(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white flex items-center justify-between p-4 shadow-sm border-b border-gray-200">
        <button 
          onClick={onBack}
          className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
        >
          <span className="text-gray-700 text-lg">←</span>
        </button>
        <h1 className="text-xl font-bold text-gray-800">My Rewards</h1>
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-white text-lg">🔔</span>
        </div>
      </div>

      {/* Compact Tab Navigation */}
      <div className="px-6 pt-3 pb-2">
        <div className="bg-white rounded-full p-0.5 flex shadow-sm border border-gray-200">
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-2 px-3 rounded-full font-medium text-xs transition-colors ${
              activeTab === 'rewards'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🏆 My Rewards
          </button>
          <button
            onClick={() => setActiveTab('winnings')}
            className={`flex-1 py-2 px-3 rounded-full font-medium text-xs transition-colors ${
              activeTab === 'winnings'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🎰 Weekly Winnings
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 py-2 px-3 rounded-full font-medium text-xs transition-colors ${
              activeTab === 'offers'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🎁 Exclusive Offers
          </button>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'rewards' && <MyRewardsView />}
              {activeTab === 'winnings' && (
          <WeeklyWinningsView 
            onSpin={handleSpin}
            isSpinning={isSpinning}
            spinResult={spinResult}
            rotation={currentRotation}
            showConfetti={showConfetti}
            currentWinnings={currentWinnings}
            totalWinnings={totalWinnings}
            showWinBanner={showWinBanner}
            pendingWinAmount={pendingWinAmount}
            onWinBannerClick={handleWinBannerClick}
          />
        )}
      {activeTab === 'offers' && <ExclusiveOffersView />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="flex justify-around max-w-md mx-auto">
          <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">🏠</span>
            <span className="text-xs text-gray-600">Home</span>
          </button>
          <button onClick={() => onNavigate('profile')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">👤</span>
            <span className="text-xs text-gray-600">My Profile</span>
          </button>
          <button onClick={() => onNavigate('support')} className="flex flex-col items-center space-y-1">
            <span className="text-2xl">📞</span>
            <span className="text-xs text-gray-600">Support</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <span className="text-2xl text-green-600">🎁</span>
            <span className="text-xs text-green-600 font-semibold">Rewards</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// My Rewards Tab Content
const MyRewardsView = () => {
  const [animatedAmount, setAnimatedAmount] = useState(0);

  // Create audio context for sound effects
  const playCountingSound = () => {
    try {
      // Create audio context for counting sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create oscillator for tick sound
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.1);
    } catch (error) {
      // Fallback if audio context fails
      console.log('Audio not supported');
    }
  };

  const playWinSound = () => {
    try {
      // Create audio context for win sound
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Create a more complex win sound
      const oscillator1 = audioContext.createOscillator();
      const oscillator2 = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator1.connect(gainNode);
      oscillator2.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      // Casino-style win sound frequencies
      oscillator1.frequency.setValueAtTime(523, audioContext.currentTime); // C5
      oscillator2.frequency.setValueAtTime(659, audioContext.currentTime); // E5
      
      oscillator1.frequency.setValueAtTime(784, audioContext.currentTime + 0.2); // G5
      oscillator2.frequency.setValueAtTime(1047, audioContext.currentTime + 0.2); // C6
      
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
      
      oscillator1.start(audioContext.currentTime);
      oscillator2.start(audioContext.currentTime);
      oscillator1.stop(audioContext.currentTime + 0.8);
      oscillator2.stop(audioContext.currentTime + 0.8);
    } catch (error) {
      console.log('Audio not supported');
    }
  };

  // Animate the $2,000 amount on component mount with sound
  useEffect(() => {
    const targetAmount = myRewardsData.maxEarnings;
    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = targetAmount / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newAmount = Math.min(increment * currentStep, targetAmount);
      setAnimatedAmount(Math.floor(newAmount));
      
      // Play counting sound every few steps
      if (currentStep % 5 === 0) {
        playCountingSound();
      }
      
      // Play win sound when reaching the target
      if (newAmount >= targetAmount) {
        clearInterval(timer);
        setTimeout(() => {
          playWinSound();
        }, 100);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="px-6 pb-24">
      {/* Simple Earnings Header */}
      <div className="text-center mb-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">💰 Earn Funds Up to</h2>
        <div className="text-4xl font-bold text-blue-600 mb-8">
          ${animatedAmount.toLocaleString()}
        </div>
      </div>

      {/* Clean Balance Display */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 mb-3">
          <span className="text-xl">💎</span>
          <span className="text-lg font-semibold text-gray-700">Your Balance</span>
        </div>
        <div className="text-3xl font-bold text-green-600 mb-2">
          ${myRewardsData.currentBalance.toLocaleString()}
        </div>
        <p className="text-sm text-gray-500">Expires in {myRewardsData.expiresInDays} days</p>
      </div>

      {/* Simple Congratulations */}
      <div className="text-center mb-12">
        <div className="text-3xl mb-3">🎉</div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Congratulations!</h3>
        <p className="text-gray-600 mb-6">You've unlocked Level {myRewardsData.currentLevel}</p>
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-all">
          📤 Share Achievement
        </button>
      </div>

      {/* Rewards Progress */}
      <div className="space-y-3 mb-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🏆 Your Rewards Progress</h3>
        {myRewardsData.rewards.map((reward) => (
          <div
            key={reward.id}
            className={`rounded-xl p-4 shadow-sm border transition-all ${
              reward.unlocked 
                ? 'bg-white border-green-200 text-gray-800'
                : 'bg-gray-100 border-gray-200 text-gray-500'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  reward.completed 
                    ? 'bg-green-500 text-white'
                    : reward.unlocked
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {reward.completed ? '✓' : reward.level}
                </div>
                <div>
                  <h4 className="font-semibold">{reward.title}</h4>
                  <p className="text-sm opacity-75">{reward.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold">${reward.amount}</div>
                {!reward.unlocked && (
                  <div className="text-xs opacity-75">🔒</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* How to Unlock */}
      <div className="text-center">
        <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md">
          🔓 How to unlock your rewards?
        </button>
      </div>
    </div>
  );
};

// Confetti Animation Component
const ConfettiAnimation = ({ show }) => {
  if (!show) return null;

  const confettiPieces = Array.from({ length: 80 }, (_, index) => {
    const colors = ['#FF1744', '#00E676', '#2196F3', '#FF9800', '#E91E63', '#9C27B0', '#00BCD4', '#FFD700', '#FF5722', '#8BC34A', '#3F51B5', '#FF6B35'];
    const emojis = ['🎉', '🎊', '✨', '🌟', '💫', '🎈', '🎆', '🥳', '💰', '🏆', '⭐', '🎁'];
    
    return {
      id: index,
      color: colors[Math.floor(Math.random() * colors.length)],
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 0.8 + Math.random() * 0.6
    };
  });

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confettiPieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute animate-bounce"
          style={{
            left: `${piece.left}%`,
            top: '-10%',
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            fontSize: `${piece.size}rem`,
            animationName: 'confettiFall'
          }}
        >
          {Math.random() > 0.2 ? piece.emoji : (
            <div
              className="w-4 h-4 rounded-full shadow-lg"
              style={{ 
                backgroundColor: piece.color,
                boxShadow: `0 0 10px ${piece.color}`
              }}
            />
          )}
        </div>
      ))}
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

// Weekly Winnings Tab Content
const WeeklyWinningsView = ({ onSpin, isSpinning, spinResult, rotation, showConfetti, currentWinnings, totalWinnings, showWinBanner, pendingWinAmount, onWinBannerClick }) => {
  return (
    <div className="px-6 pb-24 relative">
      <ConfettiAnimation show={showConfetti} />
      
      {/* Your Current Winnings Section - 25% Smaller */}
      <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl p-4 text-white text-center shadow-lg mb-4">
        <div className="flex items-center justify-center space-x-1 mb-3">
          <span className="text-2xl">💰</span>
          <h3 className="text-lg font-bold">Your Current Winnings</h3>
          <span className="text-2xl">💰</span>
        </div>
        
        {totalWinnings === 0 ? (
          <div>
            <div className="text-2xl font-bold mb-1">$0</div>
            <p className="text-green-100 text-xs">Spin the wheel to start winning!</p>
            <p className="text-green-100 text-xs mt-1">🕒 Fridays 3:00-3:30 PM</p>
          </div>
        ) : (
          <div>
            {currentWinnings > 0 && (
              <div className="mb-3 animate-pulse">
                <p className="text-base font-semibold text-green-100">You just won ${currentWinnings}!</p>
              </div>
            )}
            <div className="text-3xl font-bold mb-1">${totalWinnings}</div>
            <p className="text-green-100 text-xs">
              Total winnings from {myRewardsData.weeklySpins.spinsUsed} spin{myRewardsData.weeklySpins.spinsUsed !== 1 ? 's' : ''}
            </p>
          </div>
        )}
        
        {/* Progress toward next level */}
        {totalWinnings > 0 && (
          <div className="mt-3 pt-3 border-t border-green-300">
            <p className="text-xs text-green-100 mb-1">Progress to next reward level</p>
            <div className="w-full bg-green-300 rounded-full h-1.5">
              <div 
                className="bg-white h-1.5 rounded-full transition-all duration-1000"
                style={{ width: `${Math.min((totalWinnings / 500) * 100, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-green-100 mt-1">
              ${totalWinnings} / $500 for bonus level
            </p>
          </div>
        )}
      </div>
      
      {/* Compact Earnings Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-3 text-white text-center mb-4">
        <h2 className="text-sm font-semibold mb-1">💰 Earn up to ${myRewardsData.weeklySpins.maxWinAmount.toLocaleString()}</h2>
        <p className="text-xs text-purple-100">Spin weekly for prizes!</p>
      </div>

      {/* Spin Wheel */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-6">
        <div className="flex flex-col items-center">
          <h3 className="text-lg font-bold text-gray-800 mb-6">🎯 Weekly Prize Wheel</h3>
          <div className="relative mb-6">
            {/* Wheel Container - Research-based implementation */}
            <div 
              className="relative w-64 h-64 rounded-full border-8 border-yellow-400 shadow-2xl overflow-hidden"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: isSpinning ? 'transform 4s cubic-bezier(0.23, 1, 0.32, 1)' : 'none',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.3)'
              }}
            >
              {/* Wheel Segments using linear-gradient technique */}
              {myRewardsData.weeklySpins.wheelSegments.map((segment, index) => {
                const segmentAngle = 360 / myRewardsData.weeklySpins.wheelSegments.length;
                const segmentRotation = index * segmentAngle;
                
                return (
                  <div
                    key={index}
                    className="absolute w-32 h-32"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `rotate(${segmentRotation}deg)`,
                      background: `linear-gradient(${segmentAngle/2}deg, ${segment.color} 50%, transparent 50%)`
                    }}
                  >
                    {/* Text positioned using the triangle approach */}
                    <div 
                      className="absolute text-white font-bold text-base leading-none"
                      style={{
                        left: '70%',
                        top: '15%',
                        transform: `rotate(${segmentAngle/2}deg)`,
                        transformOrigin: 'center',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.9)',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {segment.label}
                    </div>
                  </div>
                );
              })}

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full border-4 border-white z-10 flex items-center justify-center shadow-lg">
                <span className="text-2xl">🎯</span>
              </div>

              {/* Pointer - pointing to the right (3 o'clock position) */}
              <div className="absolute top-1/2 right-0 transform translate-x-3 -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-l-12 border-transparent border-l-yellow-400 z-20 drop-shadow-lg"></div>
            </div>
          </div>

          {/* Spin Button */}
          <button
            onClick={onSpin}
            disabled={isSpinning || myRewardsData.weeklySpins.spinsRemaining <= 0}
            className={`px-10 py-4 rounded-2xl font-bold text-xl transition-all transform ${
              isSpinning || myRewardsData.weeklySpins.spinsRemaining <= 0
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 text-white shadow-xl hover:shadow-2xl hover:scale-110 animate-pulse'
            }`}
            style={{
              boxShadow: isSpinning || myRewardsData.weeklySpins.spinsRemaining <= 0 
                ? 'none' 
                : '0 10px 25px rgba(255, 20, 147, 0.4), 0 0 20px rgba(255, 69, 0, 0.3)'
            }}
          >
            <span className="flex items-center space-x-2">
              <span>{isSpinning ? '🎰 SPINNING...' : '🎰 SPIN TO WIN!'}</span>
            </span>
          </button>
        </div>
      </div>



      {/* Clickable Win Banner */}
      {showWinBanner && (
        <div 
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 animate-bounce cursor-pointer"
          onClick={onWinBannerClick}
        >
          <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-center text-white shadow-2xl border-2 border-white max-w-sm mx-auto hover:scale-105 transition-transform">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl">🎉</div>
              <div>
                <p className="text-2xl font-bold">You won ${pendingWinAmount}!</p>
                <p className="text-base opacity-90">Tap to add to your balance</p>
              </div>
              <div className="text-4xl">💰</div>
              <div className="text-sm opacity-75 mt-2">👆 Tap here</div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

// Exclusive Offers View Component
const ExclusiveOffersView = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (selectedCategory) {
    return (
      <div className="px-6 pb-24">
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={() => setSelectedCategory(null)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-xl font-bold text-gray-800">{selectedCategory.name}</h2>
          <div className="w-8"></div>
        </div>

        <div className="space-y-4">
          {selectedCategory.offers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{offer.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{offer.subtitle}</p>
                  <p className="text-xs text-gray-500">{offer.description}</p>
                  <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">🎁 Exclusive Partner Offers</h2>
        <p className="text-gray-600 text-sm">Special deals for our valued clients from trusted partners</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {exclusiveOffersData.categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category)}
            className="bg-white rounded-xl p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{category.name}</h3>
            <p className="text-xs text-gray-500">{category.offers.length} offer{category.offers.length !== 1 ? 's' : ''}</p>
          </button>
        ))}
      </div>

      {/* Featured Offers */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-gray-800 mb-4">🌟 Featured This Week</h3>
        <div className="space-y-4">
          {exclusiveOffersData.categories
            .flatMap(cat => cat.offers)
            .filter(offer => offer.featured)
            .map((offer) => (
              <div key={offer.id} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                    <span className="text-lg">⭐</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{offer.title}</h4>
                    <p className="text-sm text-yellow-600">Featured Offer</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{offer.subtitle}</p>
                <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium">
                  View Featured Deal
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyRewardsScreen;