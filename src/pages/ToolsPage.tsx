import React, { useState, useMemo, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Search,
  ExternalLink,
  Filter,
  Download,
  Star,
  Tag,
  Monitor,
  Smartphone,
  Globe,
  Shield,
  Activity,
  Heart,
  ChevronDown,
  ChevronUp,
  Code
} from 'lucide-react';
import { forensicTools, toolCategories, Tool } from '../data/toolsData';

const ToolsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredTools = useMemo(() => {
    return forensicTools.filter(tool => {
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tool.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'windows': return '🪟';
      case 'linux': return '🐧';
      case 'macos': return '🍎';
      case 'android': return '🤖';
      case 'ios': return '📱';
      default: return '💻';
    }
  };

  const toggleToolExpansion = (toolId: string) => {
    const newExpanded = new Set(expandedTools);
    if (newExpanded.has(toolId)) {
      newExpanded.delete(toolId);
    } else {
      newExpanded.add(toolId);
    }
    setExpandedTools(newExpanded);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Forensics Tools
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive collection of digital forensics and incident response tools. 
              From memory analysis to mobile forensics, find the right tool for your investigation.
            </p>
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg max-w-2xl mx-auto">
              <p className="text-blue-300 text-sm">
                💡 <strong>Tip:</strong> Click on any tool name to visit its official website or repository for downloads and documentation.
              </p>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 space-y-6">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Search className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Search Tools</h3>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, description, or tags..."
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Tag className="h-5 w-5 text-green-400" />
                    <h3 className="font-semibold text-white">Categories</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {toolCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          selectedCategory === category.id
                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <span className="text-lg">{category.icon}</span>
                        <span className="text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">{filteredTools.length}</div>
                    <div className="text-sm text-gray-400">Tools Available</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Grid */}
            <div className="flex-1">
              <div className="space-y-6">
                {filteredTools.map((tool) => (
                  <div key={tool.id} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 group-hover:-translate-y-1 transform">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <a
                              href={tool.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xl font-bold text-white hover:text-cyan-300 transition-colors flex items-center space-x-2 group/link"
                            >
                              <span>{tool.name}</span>
                              <ExternalLink className="h-4 w-4 text-cyan-400 group-hover/link:scale-110 transition-transform" />
                            </a>
                            {tool.subcategory === 'eric-zimmerman' && (
                              <span className="px-2 py-1 rounded-md text-xs font-medium bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                                Eric Zimmerman Tools
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {tool.description}
                      </p>

                      {/* Platform Support */}
                      <div className="flex items-center space-x-2 mb-4">
                        <Monitor className="h-4 w-4 text-gray-400" />
                        <div className="flex items-center space-x-1">
                          {tool.platform.map((platform, index) => (
                            <span key={index} className="text-sm" title={platform}>
                              {getPlatformIcon(platform)}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">
                          {tool.platform.join(', ')}
                        </span>
                      </div>

                      {/* Plugins Section */}
                      {tool.plugins && tool.plugins.length > 0 && (
                        <div className="mb-4">
                          <button
                            onClick={() => toggleToolExpansion(tool.id)}
                            className="flex items-center space-x-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                          >
                            <Code className="h-4 w-4" />
                            <span>View Plugins & Commands ({tool.plugins.length})</span>
                            {expandedTools.has(tool.id) ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </button>
                          
                          {expandedTools.has(tool.id) && (
                            <div className="mt-3 p-4 bg-gray-800/30 rounded-lg border border-gray-600/30">
                              <h4 className="text-sm font-semibold text-white mb-3">Available Plugins & Commands:</h4>
                              <div className="space-y-2">
                                {tool.plugins.map((plugin, index) => (
                                  <div key={index} className="text-sm font-mono text-gray-300 bg-gray-900/50 p-2 rounded border border-gray-700/50">
                                    {plugin}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {tool.tags.slice(0, 6).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs border border-gray-600/50"
                          >
                            {tag}
                          </span>
                        ))}
                        {tool.tags.length > 6 && (
                          <span className="px-2 py-1 bg-gray-800/50 text-gray-400 rounded-md text-xs border border-gray-600/50">
                            +{tool.tags.length - 6} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTools.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">No tools found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or filters</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ToolsPage;