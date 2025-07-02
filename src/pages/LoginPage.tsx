import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navigation from '../components/Navigation';
import { 
  LogIn,
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle,
  Info
} from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check for success message from registration
    if (location.state?.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setErrors({}); // Clear previous errors
    
    try {
      const { error } = await signIn(formData.email, formData.password);

      if (error) {
        // The error message is now more user-friendly from the AuthContext
        setErrors({ general: error.message });
      } else {
        // Login successful - user will be redirected by useEffect
        navigate('/');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      setErrors({ general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name] || errors.general) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.general;
        return newErrors;
      });
    }
  };

  const handleGoogleSignIn = () => {
    // Implement Google OAuth
    console.log('Google sign in clicked');
  };

  const handleForgotPassword = () => {
    // Implement forgot password
    console.log('Forgot password clicked');
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-cyan-400 transition-colors duration-300 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Success Message */}
          {message && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm">{message}</p>
            </div>
          )}

          {/* Login Form */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <LogIn className="h-8 w-8 text-cyan-400" />
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Welcome Back
                  </h1>
                </div>
                <p className="text-gray-300">
                  Sign in to your ForensiX account
                </p>
              </div>

              {/* General Error */}
              {errors.general && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-red-300 text-sm font-medium mb-2">{errors.general}</p>
                      {errors.general.includes('incorrect') && (
                        <div className="text-red-200/80 text-xs space-y-1">
                          <p>• Double-check your email address and password</p>
                          <p>• Make sure Caps Lock is not enabled</p>
                          <p>• If you forgot your password, use the "Forgot your password?" link below</p>
                        </div>
                      )}
                      {errors.general.includes('confirmation') && (
                        <div className="text-red-200/80 text-xs space-y-1">
                          <p>• Check your email inbox (including spam/junk folder)</p>
                          <p>• Click the confirmation link in the email from ForensiX</p>
                          <p>• If you can't find the email, try registering again</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Helpful Info for New Users */}
              {!errors.general && (
                <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-blue-300 text-sm font-medium mb-2">New to ForensiX?</p>
                      <div className="text-blue-200/80 text-xs space-y-1">
                        <p>• If you don't have an account, click "Register here" below</p>
                        <p>• After registering, check your email for a confirmation link</p>
                        <p>• You must confirm your email before you can sign in</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.email ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-cyan-400'
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <AlertCircle className="h-5 w-5 text-red-400" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                        errors.password ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-cyan-400'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    Forgot your password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-6 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5" />
                      <span>Sign In</span>
                    </>
                  )}
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                  </div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-3 border border-gray-300"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </form>

              {/* Register Link */}
              <div className="mt-8 text-center">
                <p className="text-gray-400">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-300"
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8 relative mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-cyan-400" />
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    ForensiX
                  </span>
                  <div className="text-xs text-gray-400 -mt-1">DFIR Platform</div>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner in digital forensics and incident response training. 
                Empowering the next generation of blue team professionals.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Platform</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Challenges</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Tools</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Courses</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">The Lab</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">AI Assistant</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Resources</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Documentation</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">API Reference</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Community</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Discord</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">GitHub</div>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-6 text-white">Support</h4>
              <div className="space-y-3 text-gray-400">
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">About</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Contact</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Privacy</div>
                <div className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">Terms</div>
                <div className="hover:text-pink-400 cursor-pointer transition-colors duration-300 flex items-center space-x-2 group">
                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Donate</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2025 ForensiX. All rights reserved. Free platform for the DFIR community.</p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                  <span className="text-sm">All systems operational</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;