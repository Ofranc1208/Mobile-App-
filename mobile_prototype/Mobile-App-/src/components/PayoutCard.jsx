import React from 'react';

const PayoutCard = () => {
  return (
    <div className="bg-brand-yellow rounded-xl shadow-lg p-6 text-center w-full max-w-xs mx-auto">
      <p className="text-sm font-medium text-gray-500">My Payout</p>
      <p className="text-4xl font-bold text-brand-green mt-2">
        $26,525.32
      </p>
    </div>
  );
};

export default PayoutCard; 