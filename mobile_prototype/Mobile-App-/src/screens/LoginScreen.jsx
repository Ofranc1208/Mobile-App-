import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';

// A simple SVG placeholder for the "Smarter Payouts" logo
const LogoPlaceholder = () => (
  <svg width="80" height="80" viewBox="0 0 100 100" className="mx-auto">
    <rect width="100" height="100" rx="20" fill="#A4D72A" />
    <path d="M25 50 L45 70 L75 30" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LoginScreen = ({ onLogin }) => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // In a real app, you would handle login logic here.
    // For now, we'll just log the credentials and call onLogin.
    console.log({ clientId, password });
    alert(`Logging in with Client ID: ${clientId}`);
    
    // Call the onLogin prop to navigate to dashboard
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-background-main px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LogoPlaceholder />
        <h2 className="mt-6 text-center text-3xl font-bold text-text-primary">
          Sign In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm ring-1 ring-gray-200 sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <InputField
              label="Client ID"
              id="clientId"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              placeholder="Enter your Client ID"
            />

            <InputField
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />

            <div>
              <Button type="submit" onClick={handleLogin}>
                Sign In
              </Button>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">Need Help?</p>
            <p className="font-medium text-brand-green">
              +1 (866) 972-9688
            </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen; 