import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { 
  Heart,
  ArrowLeft,
  Shield,
  Activity,
  Coffee,
  DollarSign,
  Copy,
  CheckCircle,
  ExternalLink,
  Users,
  Code,
  Zap,
  Star,
  Share2,
  Facebook,
  Linkedin,
  Twitter
} from 'lucide-react';

const DonatePage = () => {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const cryptoAddresses = {
    bitcoin: 'bc1qjj60fv3g9t2dce8wv053u7eav9z3j34ewuh7p4',
    ethereum: '0x4d9d96c1305e16fc740f1489010c854a5ba288a3'
  };

  const copyToClipboard = (address: string, type: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(type);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const handlePayPalDonate = () => {
    window.open('https://paypal.me/forensixofficial?country.x=IL&locale.x=en_US', '_blank');
  };

  const handleSocialShare = (platform: string) => {
    const url = 'http://forensix.net/';
    const text = 'Check out ForensiX - the ultimate DFIR platform for cybersecurity professionals!';
    
    let shareUrl = '';
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-pink-500/3 to-purple-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center space-x-2 text-gray-400 hover:text-pink-400 transition-colors duration-300 group"
            >
              <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Home</span>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-pink-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Heart className="h-16 w-16 text-pink-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Support ForensiX
                  </h1>
                </div>
                
                <div className="relative bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm mb-8">
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Help us keep ForensiX accessible for the entire DFIR community. 
                    Your support enables us to develop new tools, create educational content, 
                    and maintain this platform for cybersecurity professionals worldwide.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Users className="h-6 w-6 text-cyan-400" />
                      <span className="text-2xl font-bold text-cyan-400">10,000+</span>
                    </div>
                    <p className="text-gray-300">Active Users</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <Zap className="h-6 w-6 text-yellow-400" />
                      <span className="text-2xl font-bold text-yellow-400">24/7</span>
                    </div>
                    <p className="text-gray-300">Available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Support Us Section */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Support ForensiX?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Tool Development</h3>
                  <p className="text-gray-300 text-sm">
                    Fund the development of new forensic tools and enhancement of existing features.
                  </p>
                </div>
                
                <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Users className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Community Growth</h3>
                  <p className="text-gray-300 text-sm">
                    Support community events, workshops, and educational initiatives worldwide.
                  </p>
                </div>

                <div className="text-center p-6 bg-gray-800/30 rounded-lg border border-gray-700/50">
                  <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-3">Platform Maintenance</h3>
                  <p className="text-gray-300 text-sm">
                    Keep the platform running smoothly with regular updates and improvements.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Methods */}
          <div className="space-y-8">
            {/* PayPal Donation */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-8 w-8 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">PayPal Donation</h3>
                    <p className="text-gray-300">Quick and secure one-time or recurring donations</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handlePayPalDonate}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2"
                  >
                    <ExternalLink className="h-5 w-5" />
                    <span>Donate via PayPal</span>
                  </button>
                  
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4" />
                      <span>Secure</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="h-4 w-4" />
                      <span>Instant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptocurrency Donations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bitcoin */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">₿</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Bitcoin (BTC)</h3>
                      <p className="text-gray-300 text-sm">Send Bitcoin to our wallet address</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-gray-300 break-all">
                        {cryptoAddresses.bitcoin}
                      </span>
                      <button
                        onClick={() => copyToClipboard(cryptoAddresses.bitcoin, 'bitcoin')}
                        className="ml-2 p-2 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-colors flex-shrink-0"
                      >
                        {copiedAddress === 'bitcoin' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-orange-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    Only send Bitcoin (BTC) to this address. Sending other cryptocurrencies may result in permanent loss.
                  </p>
                </div>
              </div>

              {/* Ethereum */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">Ξ</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Ethereum (ETH)</h3>
                      <p className="text-gray-300 text-sm">Send Ethereum to our wallet address</p>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm text-gray-300 break-all">
                        {cryptoAddresses.ethereum}
                      </span>
                      <button
                        onClick={() => copyToClipboard(cryptoAddresses.ethereum, 'ethereum')}
                        className="ml-2 p-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors flex-shrink-0"
                      >
                        {copiedAddress === 'ethereum' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4 text-purple-400" />
                        )}
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400">
                    Only send Ethereum (ETH) or ERC-20 tokens to this address. Verify the address before sending.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Support */}
          <div className="relative group mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Other Ways to Support</h3>
              
              <div className="text-center">
                <div className="mb-6">
                  <Share2 className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-white mb-3">Spread the Word</h4>
                  <p className="text-gray-300 mb-6">Share ForensiX with your colleagues and the cybersecurity community</p>
                  
                  {/* Social Share Buttons */}
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => handleSocialShare('linkedin')}
                      className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span>LinkedIn</span>
                    </button>
                    
                    <button
                      onClick={() => handleSocialShare('facebook')}
                      className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Facebook</span>
                    </button>
                    
                    <button
                      onClick={() => handleSocialShare('twitter')}
                      className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      <Twitter className="h-5 w-5" />
                      <span>X (Twitter)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Thank You Section */}
          <div className="relative group mt-16">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm text-center">
              <Heart className="h-16 w-16 text-pink-400 mx-auto mb-6 animate-pulse" />
              <h2 className="text-3xl font-bold text-white mb-4">Thank You!</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-6">
                Every donation, no matter the size, helps us continue building the best DFIR platform 
                for the cybersecurity community. Your support makes a real difference!
              </p>
              
              <div className="flex items-center justify-center space-x-2 text-gray-400">
                <Star className="h-5 w-5 text-yellow-400" />
                <span>Made with ❤️ for the DFIR community</span>
                <Star className="h-5 w-5 text-yellow-400" />
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
                <Link
                  to="/donate"
                  className="hover:text-pink-400 cursor-pointer transition-colors duration-300 flex items-center space-x-2 group"
                >
                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Donate</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">© 2025 ForensiX. All rights reserved.</p>
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

export default DonatePage;