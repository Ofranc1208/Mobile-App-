import React from 'react';

const RadialMenu = ({ onNavigate }) => {
  const menuItems = [
    { label: 'To Do List', icon: '📋', screen: 'todo' },
    { label: 'Support', icon: '📞', screen: 'support' },
    { label: 'Rewards', icon: '🎁', screen: 'rewards' },
    { label: 'Court Info', icon: '⚖️', screen: 'court' },
    { label: 'My Annuity', icon: '📄', screen: 'annuity' },
    { label: 'My Profile', icon: '👤', screen: 'profile' }
  ];

  const handleItemClick = (screen) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const centerX = 200; // Half of container width (400px)
  const centerY = 200; // Half of container height (400px)
  const radius = 140; // Distance from center to menu items
  const startAngle = -90; // Start from top (12 o'clock position)

  return (
    <div className="relative w-[400px] h-[400px] mx-auto mt-8">
      {/* Main circular background */}
      <div className="absolute inset-0 bg-brand-yellow rounded-full shadow-xl border-4 border-orange-300"></div>
      
      {/* Center circle with "23 Days to Fund" */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-green-500 rounded-full flex flex-col items-center justify-center shadow-xl z-10">
        <span className="text-4xl font-bold text-white leading-none">23</span>
        <span className="text-xs text-white font-medium">Days to Fund</span>
      </div>
      
      {/* Radial menu items positioned using trigonometry */}
      {menuItems.map((item, index) => {
        // Calculate angle for each item (360 degrees divided by number of items)
        const angleStep = 360 / menuItems.length;
        const angle = (startAngle + (angleStep * index)) * (Math.PI / 180); // Convert to radians
        
        // Calculate x and y positions using trigonometry
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
                        return (
                  <div
                    key={item.label}
                    className="absolute flex flex-col items-center cursor-pointer"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleItemClick(item.screen)}
                  >
                    <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center mb-2 border-2 border-orange-200 hover:shadow-xl hover:scale-105 transition-all">
                      <span className="text-2xl">{item.icon}</span>
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center max-w-20 leading-tight">
                      {item.label}
                    </span>
                  </div>
                );
      })}
    </div>
  );
};

export default RadialMenu; 