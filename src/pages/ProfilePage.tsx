import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Navigation from '../components/Navigation';
import { 
  User as UserIcon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  Trash2,
  Shield,
  Activity,
  Heart,
  AlertCircle,
  CheckCircle,
  Edit3,
  Calendar,
  UserCheck,
  Loader,
  RefreshCw
} from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, profile, updateProfile, signOut, loading: authLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Redirect if not logged in
  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/login');
    }
  }, [user, authLoading, navigate]);

  // Populate form data when profile or user changes
  useEffect(() => {
    if (profile && user) {
      setFormData({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        username: profile.username || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } else if (user && !profile) {
      // Set default values for new profile
      setFormData({
        firstName: '',
        lastName: '',
        username: user.email?.split('@')[0] || '',
        email: user.email || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
  }, [profile, user]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    } else if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      newErrors.username = 'Username can only contain letters, numbers, and underscores';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation (only if changing password)
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        newErrors.currentPassword = 'Current password is required to change password';
      }
      
      if (!formData.newPassword) {
        newErrors.newPassword = 'New password is required';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'New password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your new password';
      } else if (formData.newPassword !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const profileUpdates = {
        username: formData.username,
        first_name: formData.firstName || null,
        last_name: formData.lastName || null,
      };

      // Update profile
      const { error: profileError } = await updateProfile(profileUpdates);

      if (profileError) {
        if (profileError.message.includes('duplicate key value violates unique constraint')) {
          setErrors({ username: 'Username is already taken' });
        } else {
          setErrors({ general: profileError.message });
        }
        return;
      }

      // Update password if provided
      if (formData.newPassword) {
        const { error: passwordError } = await supabase.auth.updateUser({
          password: formData.newPassword
        });

        if (passwordError) {
          setErrors({ newPassword: passwordError.message });
          return;
        }

        // Clear password fields after successful update
        setFormData(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      }

      setSuccessMessage(profile ? 'Profile updated successfully!' : 'Profile created successfully!');
      setIsEditing(false);

    } catch (error: any) {
      console.error('Error updating profile:', error);
      setErrors({ general: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    setIsLoading(true);
    
    try {
      await signOut();
      navigate('/');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      setErrors({ general: 'Failed to delete account. Please contact support.' });
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Show loading spinner while auth is loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 text-cyan-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if no user (will redirect)
  if (!user) {
    return null;
  }

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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <UserIcon className="h-12 w-12 text-cyan-400" />
                  <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Profile Settings
                  </h1>
                </div>
                <p className="text-gray-300">
                  Manage your account information and preferences
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center space-x-3">
              <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
              <p className="text-green-300 text-sm">{successMessage}</p>
            </div>
          )}

          {/* General Error */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
              <p className="text-red-300 text-sm">{errors.general}</p>
            </div>
          )}

          {/* No Profile Found - Create Profile */}
          {!profile && !authLoading && (
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-yellow-500/30 rounded-xl p-8 backdrop-blur-sm text-center">
                <AlertCircle className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
                <p className="text-gray-300 mb-6">
                  Your account is set up, but you need to create your profile to continue.
                </p>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>Create Profile</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Info Card */}
            {profile && (
              <div className="lg:col-span-1">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <UserIcon className="h-12 w-12 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {profile.first_name && profile.last_name 
                          ? `${profile.first_name} ${profile.last_name}`
                          : profile.username || 'User'
                        }
                      </h3>
                      <p className="text-gray-400 mb-4">@{profile.username || 'username'}</p>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-center space-x-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300">{user.email}</span>
                        </div>
                        {profile.created_at && (
                          <div className="flex items-center justify-center space-x-2">
                            <Calendar className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-300">Joined {formatDate(profile.created_at)}</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-700">
                        <div className="flex items-center justify-center space-x-2 text-green-400">
                          <UserCheck className="h-4 w-4" />
                          <span className="text-sm">Account Verified</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Profile Form */}
            <div className={profile ? "lg:col-span-2" : "lg:col-span-3"}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">
                      {profile ? 'Account Information' : 'Create Your Profile'}
                    </h2>
                    {profile && (
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>{isEditing ? 'Cancel' : 'Edit'}</span>
                      </button>
                    )}
                  </div>

                  <form className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          disabled={!isEditing && profile}
                          className={`w-full bg-gray-800/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            (isEditing || !profile) ? 'border-gray-600 focus:border-cyan-400' : 'border-gray-700 cursor-not-allowed'
                          }`}
                          placeholder="John"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          disabled={!isEditing && profile}
                          className={`w-full bg-gray-800/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                            (isEditing || !profile) ? 'border-gray-600 focus:border-cyan-400' : 'border-gray-700 cursor-not-allowed'
                          }`}
                          placeholder="Doe"
                        />
                      </div>
                    </div>

                    {/* Username */}
                    <div>
                      <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                        Username <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        disabled={!isEditing && profile}
                        className={`w-full bg-gray-800/50 border rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                          (isEditing || !profile)
                            ? errors.username 
                              ? 'border-red-500 focus:border-red-400' 
                              : 'border-gray-600 focus:border-cyan-400'
                            : 'border-gray-700 cursor-not-allowed'
                        }`}
                        placeholder="johndoe"
                      />
                      {errors.username && (
                        <p className="mt-1 text-sm text-red-400">{errors.username}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={true}
                        className="w-full bg-gray-800/50 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-400 cursor-not-allowed"
                        placeholder="john@example.com"
                      />
                      <p className="mt-1 text-xs text-gray-400">
                        Contact support to change your email address
                      </p>
                    </div>

                    {/* Password Change Section */}
                    {(isEditing || !profile) && profile && (
                      <div className="pt-6 border-t border-gray-700">
                        <h3 className="text-lg font-semibold text-white mb-4">Change Password</h3>
                        <div className="space-y-4">
                          {/* Current Password */}
                          <div>
                            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showCurrentPassword ? 'text' : 'password'}
                                id="currentPassword"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleInputChange}
                                className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                                  errors.currentPassword ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-cyan-400'
                                }`}
                                placeholder="Enter current password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              >
                                {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                            {errors.currentPassword && (
                              <p className="mt-1 text-sm text-red-400">{errors.currentPassword}</p>
                            )}
                          </div>

                          {/* New Password */}
                          <div>
                            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showNewPassword ? 'text' : 'password'}
                                id="newPassword"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleInputChange}
                                className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                                  errors.newPassword ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-cyan-400'
                                }`}
                                placeholder="Enter new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowNewPassword(!showNewPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              >
                                {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                            {errors.newPassword && (
                              <p className="mt-1 text-sm text-red-400">{errors.newPassword}</p>
                            )}
                          </div>

                          {/* Confirm Password */}
                          <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                              <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                className={`w-full bg-gray-800/50 border rounded-lg pl-10 pr-12 py-3 text-white placeholder-gray-400 focus:outline-none transition-colors ${
                                  errors.confirmPassword ? 'border-red-500 focus:border-red-400' : 'border-gray-600 focus:border-cyan-400'
                                }`}
                                placeholder="Confirm new password"
                              />
                              <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                              >
                                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                              </button>
                            </div>
                            {errors.confirmPassword && (
                              <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    {(isEditing || !profile) && (
                      <div className="flex flex-col sm:flex-row gap-4 pt-6">
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={isLoading}
                          className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isLoading ? (
                            <>
                              <Loader className="h-5 w-5 animate-spin" />
                              <span>{profile ? 'Saving...' : 'Creating...'}</span>
                            </>
                          ) : (
                            <>
                              <Save className="h-5 w-5" />
                              <span>{profile ? 'Save Changes' : 'Create Profile'}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          {profile && (
            <div className="relative group mt-12">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4 flex items-center space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-400" />
                  <span>Danger Zone</span>
                </h2>
                <p className="text-gray-300 mb-6">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                
                {!showDeleteConfirm ? (
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 border border-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                    <span>Delete Account</span>
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <p className="text-red-300 font-semibold mb-2">⚠️ Are you absolutely sure?</p>
                      <p className="text-red-200 text-sm">
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                      </p>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button
                        onClick={handleDeleteAccount}
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-700 disabled:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader className="h-5 w-5 animate-spin" />
                            <span>Deleting...</span>
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-5 w-5" />
                            <span>Yes, Delete My Account</span>
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => setShowDeleteConfirm(false)}
                        className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-6 py-3 rounded-lg font-semibold transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
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

export default ProfilePage;
