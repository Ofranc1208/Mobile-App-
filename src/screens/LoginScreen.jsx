import React, { useState } from 'react';
import Button from '../components/Button';
import InputField from '../components/InputField';
import logo1 from '../assets/images/logo1.png';

// Logo component using the actual logo image
const LogoComponent = () => (
  <img src={logo1} alt="Smarter Payouts Logo" className="mx-auto w-40 h-40 object-contain" />
);

const LoginScreen = ({ onLogin }) => {
  const [clientId, setClientId] = useState('');
  const [password, setPassword] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [email, setEmail] = useState('');

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

  const handleResetPassword = () => {
    if (email) {
      alert(`Password reset link sent to ${email}`);
      setShowResetPassword(false);
      setEmail('');
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen bg-white px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <LogoComponent />
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Sign in to access your structured settlement dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          {!showResetPassword ? (
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div>
                <label htmlFor="clientId" className="block text-sm font-medium text-gray-700 mb-2">
                  Client ID
                </label>
                <input
                  id="clientId"
                  name="clientId"
                  type="text"
                  required
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  placeholder="Enter your Client ID"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <div>
                                 <button
                   type="submit"
                   className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200 transform hover:scale-105"
                 >
                   Sign In
                 </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Reset Password</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="flex space-x-3">
                                 <button
                   type="button"
                   onClick={handleResetPassword}
                   className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                 >
                   Send Reset Link
                 </button>
                <button
                  type="button"
                  onClick={() => setShowResetPassword(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

                 <div className="mt-8 text-center">
           <div className="bg-gray-50 rounded-lg p-6 shadow-sm border border-gray-200">
             <p className="text-base font-medium text-gray-700 mb-3">Need Help?</p>
             <p className="text-lg font-semibold text-green-600 mb-2">
               +1 (866) 972-9688
             </p>
             <p className="text-sm text-gray-600">
               433 Plaza Real, Suite 275<br />
               Boca Raton, FL 33434
             </p>
           </div>
         </div>
      </div>
    </div>
  );
};

export default LoginScreen; 