import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Search,
  Filter,
  Target,
  Clock,
  Users,
  Trophy,
  Lock,
  Play,
  Star,
  Shield,
  Activity,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  estimatedTime: string;
  participants: number;
  xpReward: number;
  tags: string[];
  isLocked: boolean;
  route: string; // Add route for navigation
  icon?: string; // Optional custom icon path
}

const ChallengesPage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const challengesPerPage = 8;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const challenges: Challenge[] = [
    {
      id: 'powershell-analysis',
      title: 'PowerShell Analysis',
      description: 'Analyze suspicious PowerShell logs to identify malicious activity and command execution patterns.',
      difficulty: 'beginner',
      category: 'Log Analysis',
      estimatedTime: '45 min',
      participants: 1247,
      xpReward: 100,
      tags: ['powershell', 'logs', 'malware', 'execution'],
      isLocked: false,
      route: '/challenges/powershell-analysis',
      icon: '/powershell-banner2.png'
    },
    {
      id: 'hacked-by-capcha',
      title: 'Hacked by Captcha',
      description: 'Investigate a web server compromise where attackers left their signature. Uncover the attack vector and timeline.',
      difficulty: 'advanced',
      category: 'Web Forensics',
      estimatedTime: '90 min',
      participants: 892,
      xpReward: 300,
      tags: ['web', 'compromise', 'timeline', 'investigation'],
      isLocked: false,
      route: '/challenges/hacked-by-captcha',
      icon: '/Challenges/HackedByCaptcha.png'
    },
    {
      id: 'miner-on-the-run',
      title: 'Miner On The Run',
      description: 'Investigate a cryptomining malware infection through a browser extension. Analyze artifacts and determine the attack path.',
      difficulty: 'intermediate',
      category: 'Browser Forensics',
      estimatedTime: '60 min',
      participants: 756,
      xpReward: 200,
      tags: ['browser', 'cryptomining', 'malware', 'extension'],
      isLocked: false,
      route: '/challenges/miner-on-the-run',
      icon: '/Challenges/cryptominer-banner.png'
    },
    {
      id: 'master-file-trap',
      title: 'Master File Trap',
      description: 'Analyze an MFT file to uncover evidence of malware infection and determine the attack details.',
      difficulty: 'intermediate',
      category: 'File System Forensics',
      estimatedTime: '75 min',
      participants: 623,
      xpReward: 200,
      tags: ['mft', 'file system', 'malware', 'windows'],
      isLocked: false,
      route: '/challenges/master-file-trap',
      icon: '/Challenges/mft-banner.png'
    },
    {
      id: 'emotet-trace',
      title: 'Emotet Trace',
      description: 'Analyze a suspicious file hash using OSINT techniques to determine its malware family, behavior, and threat level.',
      difficulty: 'intermediate',
      category: 'Threat Intelligence',
      estimatedTime: '60 min',
      participants: 512,
      xpReward: 200,
      tags: ['osint', 'malware', 'threat intelligence', 'emotet'],
      isLocked: false,
      route: '/challenges/emotet-trace',
      icon: '/Challenges/emotet.png'
    },
    {
      id: 'bruteforce-detected',
      title: 'Bruteforce Detected',
      description: 'Analyze network traffic to investigate a web server brute-force attack and determine the attacker\'s techniques and impact.',
      difficulty: 'intermediate',
      category: 'Network Forensics',
      estimatedTime: '60 min',
      participants: 0,
      xpReward: 200,
      tags: ['network', 'pcap', 'brute-force', 'web'],
      isLocked: false,
      route: '/challenges/bruteforce-detected',
      icon: '/Challenges/bruteforcechallenge.png'
    }
  ];

  const filteredChallenges = useMemo(() => {
    return challenges.filter(challenge => {
      const matchesDifficulty = selectedDifficulty === 'all' || challenge.difficulty === selectedDifficulty;
      const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           challenge.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           challenge.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesDifficulty && matchesSearch;
    });
  }, [selectedDifficulty, searchQuery]);

  // Pagination logic
  const totalPages = Math.ceil(filteredChallenges.length / challengesPerPage);
  const startIndex = (currentPage - 1) * challengesPerPage;
  const endIndex = startIndex + challengesPerPage;
  const currentChallenges = filteredChallenges.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getDifficultyEmoji = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢';
      case 'intermediate': return '🟡';
      case 'advanced': return '🔴';
      default: return '⚪';
    }
  };

  const handleChallengeClick = (challenge: Challenge) => {
    if (!challenge.isLocked) {
      navigate(challenge.route);
    }
  };

  const availableChallenges = challenges.filter(c => !c.isLocked).length;

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
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent whitespace-nowrap">
                  Training Grounds
                </h1>
                
                <div className="relative bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm mb-8">
                  <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                    Explore realistic challenges to build your DFIR skills.
                    Analyze logs, disk images, memory dumps, and network data to find out what happened, how, and who was behind it.
                  </p>
                </div>
                
                <div className="text-center flex items-center justify-center space-x-12">
                  {/* Floating Image - Bigger */}
                  <div className="hidden lg:block">
                    <img 
                      src="/image.png" 
                      alt="Blue Team Training" 
                      className="w-64 h-64 object-contain animate-float"
                      style={{
                        animation: 'float 3s ease-in-out infinite'
                      }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xl text-gray-300 italic">Every log tells a story. Can you uncover it?</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Search */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-1 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-12 h-12 text-cyan-400">
                    <Search className="h-5 w-5" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search challenges by name, description, or tags..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none text-lg"
                  />
                </div>
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-transparent text-white px-6 py-4 pr-10 focus:outline-none cursor-pointer text-lg font-medium min-w-[200px]"
                >
                  <option value="all" className="bg-gray-900">🎯 All Levels</option>
                  <option value="beginner" className="bg-gray-900">🟢 Beginner</option>
                  <option value="intermediate" className="bg-gray-900">🟡 Intermediate</option>
                  <option value="advanced" className="bg-gray-900">🔴 Advanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Challenges Grid with 3D Effects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentChallenges.map((challenge, index) => (
              <div 
                key={challenge.id} 
                className="relative group perspective-1000 h-64"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleChallengeClick(challenge)}
              >
                {/* 3D Card Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-500 group-hover:scale-105"></div>
                <div className={`relative bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-x-2 group-hover:rotate-y-1 transform-gpu ${
                  challenge.isLocked ? 'opacity-75' : 'hover:bg-gray-900/95 hover:border-cyan-500/30'
                } shadow-2xl group-hover:shadow-cyan-500/20 h-full flex flex-col justify-between cursor-pointer`}>
                  
                  {/* Challenge Header */}
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          {challenge.icon ? (
                            <img 
                              src={challenge.icon} 
                              alt={challenge.title} 
                              className="h-12 w-12 object-contain"
                            />
                          ) : (
                            <Target className="h-10 w-10 text-blue-400" />
                          )}
                          <h3 className={`text-lg font-bold ${challenge.isLocked ? 'text-gray-400' : 'text-white group-hover:text-cyan-300'} transition-colors duration-300`}>
                            {challenge.title}
                          </h3>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(challenge.difficulty)} w-fit`}>
                            {getDifficultyEmoji(challenge.difficulty)} {challenge.difficulty}
                          </span>
                        </div>
                      </div>
                      {challenge.isLocked && <Lock className="h-4 w-4 text-gray-500" />}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div>
                    {/* XP Reward */}
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <span className="text-yellow-400 font-bold text-lg">{challenge.xpReward} XP</span>
                      </div>
                    </div>

                    {/* Action Button or Coming Soon */}
                    {challenge.isLocked ? (
                      <div className="text-center pt-2 border-t border-gray-700/50">
                        <span className="text-sm text-gray-500 italic flex items-center justify-center space-x-2">
                          <span>Coming Soon</span>
                        </span>
                      </div>
                    ) : (
                      <button className="w-full p-3 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 rounded-xl transition-all duration-300 group/btn border border-cyan-500/30 hover:border-cyan-400/50 flex items-center justify-center space-x-2">
                        <Play className="h-5 w-5 text-cyan-400 group-hover/btn:scale-110 transition-transform duration-300" />
                        <span className="text-cyan-400 font-medium">Start Challenge</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4 mb-12">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === 1
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <div className="flex space-x-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => setCurrentPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg transition-all duration-300 ${
                        currentPage === pageNumber
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/25'
                          : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  currentPage === totalPages
                    ? 'bg-gray-800/50 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30'
                }`}
              >
                <span>Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* No Results */}
          {filteredChallenges.length === 0 && (
            <div className="text-center py-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-4">No challenges found</h3>
                  <p className="text-gray-400 text-lg">Try adjusting your search criteria or difficulty filter</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />

      {/* Custom CSS for floating animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ChallengesPage;