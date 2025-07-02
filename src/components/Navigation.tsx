import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Shield, 
  Menu, 
  X,
  LogIn,
  UserPlus,
  ChevronDown,
  Code,
  Globe,
  Mail,
  Image,
  Bot,
  User,
  LogOut,
  Star,
  Search
} from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isToolsDropdownOpen, setIsToolsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { user, profile, signOut } = useAuth();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/challenges", label: "Challenges", color: "blue" },
    { href: "/courses", label: "Courses", color: "blue" },
    { href: "/tools", label: "Tools", color: "blue" },
    { href: "/cheatsheet", label: "CheatSheet", color: "blue" }
  ];

  const liveTools = [
    { href: "/the-lab", label: "The Lab", icon: Code, color: "text-purple-400" },
    { href: "/ioc-search", label: "IOC Search", icon: Globe, color: "text-teal-400" },
    { href: "/ioc-extractor", label: "IOC Extractor", icon: Search, color: "text-orange-400" },
    { href: "/email-analyzer", label: "Email Analyzer", icon: Mail, color: "text-red-400" },
    { href: "/exiftool", label: "ExifTool", icon: Image, color: "text-purple-400" },
    { href: "/dfir-assistant", label: "DFIR Assistant", icon: Bot, color: "text-indigo-400" }
  ];

  const getNavItemClasses = (item: any) => {
    const isActive = location.pathname === item.href;
    
    if (item.color === "blue") {
      return isActive
        ? 'text-blue-400'
        : 'text-gray-300 hover:text-blue-400';
    } else {
      return isActive
        ? 'text-cyan-400'
        : 'text-gray-300 hover:text-cyan-400';
    }
  };

  const getUnderlineClasses = (item: any) => {
    const isActive = location.pathname === item.href;
    
    if (item.color === "blue") {
      return isActive ? 'w-full bg-blue-400' : 'w-0 group-hover:w-full bg-blue-400';
    } else {
      return isActive ? 'w-full bg-cyan-400' : 'w-0 group-hover:w-full bg-cyan-400';
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsUserDropdownOpen(false);
      // The user will be redirected automatically by the auth context
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    } else if (profile?.first_name) {
      return profile.first_name;
    } else if (profile?.username) {
      return profile.username;
    } else if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-950/95 backdrop-blur-md border-b border-gray-800/50 z-50 shadow-lg shadow-cyan-500/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative group">
              <img 
                src="/forensixlogo2.png" 
                alt="ForensiX Logo" 
                className="h-20 sm:h-24 md:h-28 w-auto transition-all duration-300 group-hover:scale-110"
              />
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-4 2xl:space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`transition-all duration-300 font-medium relative group text-sm 2xl:text-base whitespace-nowrap ${getNavItemClasses(item)}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ${getUnderlineClasses(item)}`}></span>
              </Link>
            ))}

            {/* Enhanced Live Tools Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onMouseLeave={() => setIsToolsDropdownOpen(false)}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-500/30 hover:border-orange-400/50 px-4 py-2 rounded-lg transition-all duration-300 font-medium text-sm 2xl:text-base whitespace-nowrap group/btn"
              >
                <Star className="h-4 w-4 text-yellow-400 animate-pulse" />
                <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent font-bold">Live Tools</span>
                <ChevronDown className={`h-4 w-4 text-orange-400 transition-transform duration-300 ${isToolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Enhanced Dropdown Menu */}
              <div
                className={`absolute top-full left-0 mt-2 w-64 bg-gray-900/95 backdrop-blur-md border border-orange-500/30 rounded-xl shadow-2xl shadow-orange-500/20 transition-all duration-300 ${
                  isToolsDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                }`}
                onMouseEnter={() => setIsToolsDropdownOpen(true)}
                onMouseLeave={() => setIsToolsDropdownOpen(false)}
              >
                {/* Tools List */}
                <div className="p-2">
                  {liveTools.map((tool) => (
                    <Link
                      key={tool.href}
                      to={tool.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group/item"
                      onClick={() => setIsToolsDropdownOpen(false)}
                    >
                      <tool.icon className={`h-5 w-5 ${tool.color} group-hover/item:scale-110 transition-transform duration-300`} />
                      <div className="flex-1">
                        <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300 font-medium">
                          {tool.label}
                        </span>
                        <div className="text-xs text-gray-500 group-hover/item:text-gray-400 transition-colors duration-300">
                          {tool.href === '/the-lab' && 'Encode/Decode Lab'}
                          {tool.href === '/ioc-search' && 'Threat Intelligence'}
                          {tool.href === '/ioc-extractor' && 'Extract IOCs from Text'}
                          {tool.href === '/email-analyzer' && 'Header Analysis'}
                          {tool.href === '/exiftool' && 'Metadata Extraction'}
                          {tool.href === '/dfir-assistant' && 'AI-Powered Analysis'}
                        </div>
                      </div>
                      <ChevronDown className="h-4 w-4 text-gray-500 rotate-[-90deg] group-hover/item:translate-x-1 transition-transform duration-300" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Auth Section */}
            <div className="flex items-center space-x-3 ml-6 pl-6 border-l border-gray-700">
              {user ? (
                /* User Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium group text-sm 2xl:text-base bg-gray-800/50 px-3 py-2 rounded-lg border border-gray-700/50"
                  >
                    <User className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden 2xl:inline">{getDisplayName()}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* User Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl shadow-2xl shadow-black/20">
                      <div className="p-2">
                        <div className="px-4 py-3 border-b border-gray-700/50">
                          <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                          <p className="text-xs text-gray-400">{user.email}</p>
                        </div>
                        
                        <Link
                          to="/profile"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 group/item text-left"
                        >
                          <User className="h-4 w-4 text-blue-400 group-hover/item:scale-110 transition-transform duration-300" />
                          <span className="text-gray-300 group-hover/item:text-white transition-colors duration-300">Profile</span>
                        </Link>
                        
                        <div className="border-t border-gray-700/50 mt-2 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-500/10 transition-all duration-300 group/item text-left"
                          >
                            <LogOut className="h-4 w-4 text-red-400 group-hover/item:scale-110 transition-transform duration-300" />
                            <span className="text-gray-300 group-hover/item:text-red-300 transition-colors duration-300">Log Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* Login/Register Buttons */
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-all duration-300 font-medium group text-sm 2xl:text-base"
                  >
                    <LogIn className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span className="hidden 2xl:inline">Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-3 2xl:px-4 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2 text-sm 2xl:text-base"
                  >
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden 2xl:inline">Register Free</span>
                    <span className="inline 2xl:hidden">Free</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button 
            className="xl:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="xl:hidden py-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`font-medium transition-colors py-2 ${getNavItemClasses(item)}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Live Tools - Enhanced */}
              <div className="pt-2 border-t border-gray-700">
                <div className="flex items-center space-x-2 mb-3">
                  <Star className="h-5 w-5 text-yellow-400 animate-pulse" />
                  <div className="text-sm font-semibold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">Live Tools</div>
                </div>
                {liveTools.map((tool) => (
                  <Link
                    key={tool.href}
                    to={tool.href}
                    className="flex items-center space-x-3 py-2 text-gray-300 hover:text-white transition-colors pl-4 border-l-2 border-orange-500/30 ml-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <tool.icon className={`h-4 w-4 ${tool.color}`} />
                    <span>{tool.label}</span>
                  </Link>
                ))}
              </div>
              
              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-700 space-y-3">
                {user ? (
                  <>
                    <div className="px-4 py-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm font-medium text-white">{getDisplayName()}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium w-full py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 text-gray-300 hover:text-red-400 transition-colors font-medium w-full py-2 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Log Out</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center space-x-2 text-gray-300 hover:text-cyan-400 transition-colors font-medium w-full py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LogIn className="h-4 w-4" />
                      <span>Sign In</span>
                    </Link>
                    <Link
                      to="/register"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-4 py-2 rounded-lg font-semibold transition-all w-full flex items-center justify-center space-x-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <UserPlus className="h-4 w-4" />
                      <span>Register Free</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;