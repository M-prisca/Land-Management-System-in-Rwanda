import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  UserIcon,
  ShieldCheckIcon,
  KeyIcon
} from '@heroicons/react/24/outline';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('login'); // 'login', '2fa', 'forgot-password', 'reset-password'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [twoFactorData, setTwoFactorData] = useState({
    code: '',
  });

  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
  });

  const [resetPasswordData, setResetPasswordData] = useState({
    token: '',
    password: '',
    confirmPassword: '',
  });

  // Mock users for demo
  const mockUsers = [
    {
      id: 1,
      email: 'admin@landmanagement.rw',
      password: 'admin123',
      role: 'ADMIN',
      firstName: 'Admin',
      lastName: 'User',
      twoFactorEnabled: true
    },
    {
      id: 2,
      email: 'officer@landmanagement.rw',
      password: 'officer123',
      role: 'LAND_OFFICER',
      firstName: 'Land',
      lastName: 'Officer',
      twoFactorEnabled: false
    },
    {
      id: 3,
      email: 'citizen@landmanagement.rw',
      password: 'citizen123',
      role: 'CITIZEN',
      firstName: 'John',
      lastName: 'Citizen',
      twoFactorEnabled: false
    },
  ];

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = mockUsers.find(u => u.email === loginData.email && u.password === loginData.password);

      if (!user) {
        setError('Invalid email or password');
        setLoading(false);
        return;
      }

      if (user.twoFactorEnabled) {
        setStep('2fa');
        setLoading(false);
        return;
      }

      // Login successful
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTwoFactor = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // For demo, accept any 6-digit code
      if (twoFactorData.code.length === 6) {
        const user = mockUsers.find(u => u.email === loginData.email);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/dashboard');
      } else {
        setError('Invalid 2FA code');
      }
    } catch (err) {
      setError('2FA verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Password reset email sent! Check your inbox.');
      setTimeout(() => {
        setStep('reset-password');
        setSuccess('');
      }, 2000);
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (resetPasswordData.password !== resetPasswordData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setSuccess('Password reset successful! You can now login.');
      setTimeout(() => {
        setStep('login');
        setSuccess('');
        setResetPasswordData({ token: '', password: '', confirmPassword: '' });
      }, 2000);
    } catch (err) {
      setError('Password reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const testLogin = (userType) => {
    const user = mockUsers.find(u => u.role === userType);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <LockClosedIcon className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {step === 'login' && 'Sign in to your account'}
            {step === '2fa' && 'Two-Factor Authentication'}
            {step === 'forgot-password' && 'Reset your password'}
            {step === 'reset-password' && 'Set new password'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {step === 'login' && 'Land Management System'}
            {step === '2fa' && 'Enter the 6-digit code from your authenticator app'}
            {step === 'forgot-password' && 'Enter your email to receive reset instructions'}
            {step === 'reset-password' && 'Enter your new password'}
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        {/* Login Form */}
        {step === 'login' && (
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="input pl-10"
                    placeholder="Enter your email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="input pl-10 pr-10"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                className="text-sm text-blue-600 hover:text-blue-500"
                onClick={() => setStep('forgot-password')}
              >
                Forgot your password?
              </button>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>

            {/* Test Login Buttons */}
            <div className="mt-6 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-600 text-center mb-4">Quick Test Login:</p>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => testLogin('ADMIN')}
                  className="w-full btn btn-outline text-sm"
                >
                  Login as Admin
                </button>
                <button
                  type="button"
                  onClick={() => testLogin('LAND_OFFICER')}
                  className="w-full btn btn-outline text-sm"
                >
                  Login as Land Officer
                </button>
                <button
                  type="button"
                  onClick={() => testLogin('CITIZEN')}
                  className="w-full btn btn-outline text-sm"
                >
                  Login as Citizen
                </button>
              </div>
            </div>
          </form>
        )}

        {/* 2FA Form */}
        {step === '2fa' && (
          <form className="mt-8 space-y-6" onSubmit={handleTwoFactor}>
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                Authentication Code
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="code"
                  name="code"
                  type="text"
                  required
                  maxLength="6"
                  className="input pl-10 text-center text-lg tracking-widest"
                  placeholder="000000"
                  value={twoFactorData.code}
                  onChange={(e) => setTwoFactorData({ ...twoFactorData, code: e.target.value.replace(/\D/g, '') })}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                For demo: enter any 6-digit code (e.g., 123456)
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="flex-1 btn btn-outline"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn btn-primary"
              >
                {loading ? 'Verifying...' : 'Verify'}
              </button>
            </div>
          </form>
        )}

        {/* Forgot Password Form */}
        {step === 'forgot-password' && (
          <form className="mt-8 space-y-6" onSubmit={handleForgotPassword}>
            <div>
              <label htmlFor="reset-email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  required
                  className="input pl-10"
                  placeholder="Enter your email"
                  value={forgotPasswordData.email}
                  onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="flex-1 btn btn-outline"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn btn-primary"
              >
                {loading ? 'Sending...' : 'Send Reset Email'}
              </button>
            </div>
          </form>
        )}

        {/* Reset Password Form */}
        {step === 'reset-password' && (
          <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label htmlFor="token" className="block text-sm font-medium text-gray-700">
                  Reset Token
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <KeyIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="token"
                    name="token"
                    type="text"
                    required
                    className="input pl-10"
                    placeholder="Enter reset token from email"
                    value={resetPasswordData.token}
                    onChange={(e) => setResetPasswordData({ ...resetPasswordData, token: e.target.value })}
                  />
                </div>
                <p className="mt-1 text-sm text-gray-500">For demo: enter any token</p>
              </div>

              <div>
                <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="new-password"
                    name="password"
                    type="password"
                    required
                    className="input pl-10"
                    placeholder="Enter new password"
                    value={resetPasswordData.password}
                    onChange={(e) => setResetPasswordData({ ...resetPasswordData, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    className="input pl-10"
                    placeholder="Confirm new password"
                    value={resetPasswordData.confirmPassword}
                    onChange={(e) => setResetPasswordData({ ...resetPasswordData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep('login')}
                className="flex-1 btn btn-outline"
              >
                Back to Login
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn btn-primary"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
