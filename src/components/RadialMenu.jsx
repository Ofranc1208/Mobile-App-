import React from 'react';

const RadialMenu = ({ onNavigate }) => {
  const menuItems = [
    { label: 'To Do List', icon: '📋', screen: 'todo' },
    { label: 'Support', icon: '📞', screen: 'support' },
    { label: 'Rewards', icon: '🎁', screen: 'rewards' },
    { label: 'Deal Info', icon: '💼', screen: 'court' },
    { label: 'My Annuity', icon: '📄', screen: 'annuity' },
    { label: 'My Profile', icon: '👤', screen: 'profile' }
  ];

  const handleItemClick = (screen) => {
    if (onNavigate) {
      onNavigate(screen);
    }
  };

  const centerX = 212.5; // Half of container width (425px)
  const centerY = 212.5; // Half of container height (425px)
  const radius = 150; // Distance from center to menu items - PERFECT SIZE
  const startAngle = -90; // Start from top (12 o'clock position)

  return (
    <div className="relative w-[425px] h-[425px] mx-auto mt-8">
      {/* Ultra-thin connecting ring - PERFECT SIZE */}
      <div 
        className="absolute rounded-full border-2 border-orange-300/40 transform hover:scale-[1.01] transition-transform duration-300"
        style={{
          width: '300px',
          height: '300px',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      ></div>
      
      {/* Center circle - BIGGER AND MORE PROMINENT - CLICKABLE */}
      <div 
        onClick={() => onNavigate && onNavigate('court', { tab: 'history' })}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex flex-col items-center justify-center shadow-xl z-10 border-2 border-green-400 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200"
      >
        <span className="text-4xl font-bold text-white leading-tight">23</span>
        <span className="text-xs text-white font-medium mt-1">Days to Fund</span>
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
                    className="absolute flex flex-col items-center cursor-pointer group"
                    style={{
                      left: `${x}px`,
                      top: `${y}px`,
                      transform: 'translate(-50%, -50%)'
                    }}
                    onClick={() => handleItemClick(item.screen)}
                  >
                    {/* Clean 3D Button */}
                    <div className="relative mb-2">
                      {/* Subtle Shadow Layer */}
                      <div className="absolute inset-0 w-16 h-16 bg-gray-300 rounded-full transform translate-x-0.5 translate-y-0.5"></div>
                      {/* Main Button */}
                      <div className="relative w-16 h-16 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-lg flex items-center justify-center border-2 border-orange-200 group-hover:shadow-xl group-hover:scale-105 transition-all duration-200">
                        <span className="text-2xl">{item.icon}</span>
                      </div>
                    </div>
                    <span className="text-xs font-medium text-gray-700 text-center max-w-20 leading-tight drop-shadow-sm group-hover:text-gray-900 transition-colors">
                      {item.label}
                    </span>
                  </div>
                );
      })}
    </div>
  );
};

export default RadialMenu; 