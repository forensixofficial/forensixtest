import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Search,
  Copy,
  RotateCcw,
  Shield,
  Activity,
  Heart,
  Zap,
  Download,
  FileText,
  CheckCircle,
  AlertTriangle,
  Globe,
  Mail,
  Hash,
  FolderOpen,
  Key,
  Lock,
  Eye,
  Filter
} from 'lucide-react';

interface IOCResults {
  urls: string[];
  ips: string[];
  emails: string[];
  filePaths: string[];
  registryKeys: string[];
  mutexes: string[];
  hashes: string[];
  domains: string[];
  base64: string[];
}

interface IOCFilters {
  [key: string]: boolean;
  urls: boolean;
  ips: boolean;
  emails: boolean;
  filePaths: boolean;
  registryKeys: boolean;
  mutexes: boolean;
  hashes: boolean;
  domains: boolean;
  base64: boolean;
}

const IOCExtractorPage = () => {
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState<IOCFilters>({
    urls: true,
    ips: true,
    emails: true,
    filePaths: true,
    registryKeys: true,
    mutexes: true,
    hashes: true,
    domains: true,
    base64: true,
  });
  const [results, setResults] = useState<IOCResults>({
    urls: [],
    ips: [],
    emails: [],
    filePaths: [],
    registryKeys: [],
    mutexes: [],
    hashes: [],
    domains: [],
    base64: [],
  });
  const [isExtracting, setIsExtracting] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const extractIOCs = () => {
    setIsExtracting(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const text = input;
      
      const urls = filters.urls ? [...text.matchAll(/https?:\/\/[^\s"'>)]+/gi)].map(m => m[0]) : [];
      const ips = filters.ips ? [...text.matchAll(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g)].map(m => m[0]) : [];
      const emails = filters.emails ? [...text.matchAll(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g)].map(m => m[0]) : [];
      const filePaths = filters.filePaths ? [...text.matchAll(/[a-zA-Z]:\\(?:[^\\\n]+\\)*[^\\\n]+/g)].map(m => m[0]) : [];
      const registryKeys = filters.registryKeys ? [...text.matchAll(/HKEY_[A-Z_]+\\[\\\w]+(?:\\[\\\w]+)*/gi)].map(m => m[0]) : [];
      const mutexes = filters.mutexes ? [...text.matchAll(/\\BaseNamedObjects\\[\w-]+/g)].map(m => m[0]) : [];
      const hashes = filters.hashes ? [...text.matchAll(/\b[a-fA-F0-9]{32}\b|\b[a-fA-F0-9]{40}\b|\b[a-fA-F0-9]{64}\b/g)].map(m => m[0]) : [];
      const domains = filters.domains ? [...text.matchAll(/\b(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}\b/g)].map(m => m[0]) : [];
      const base64 = filters.base64 ? [...text.matchAll(/(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?/g)].filter(m => m[0].length > 20).map(m => m[0]) : [];

      // Remove duplicates
      const uniqueResults = {
        urls: [...new Set(urls)],
        ips: [...new Set(ips)],
        emails: [...new Set(emails)],
        filePaths: [...new Set(filePaths)],
        registryKeys: [...new Set(registryKeys)],
        mutexes: [...new Set(mutexes)],
        hashes: [...new Set(hashes)],
        domains: [...new Set(domains)],
        base64: [...new Set(base64)],
      };

      setResults(uniqueResults);
      setIsExtracting(false);
    }, 500);
  };

  const toggleFilter = (key: string) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const copyToClipboard = (content: string, section?: string) => {
    navigator.clipboard.writeText(content);
    if (section) {
      setCopiedSection(section);
      setTimeout(() => setCopiedSection(null), 2000);
    }
  };

  const copyAllResults = () => {
    const content = Object.entries(results)
      .filter(([key]) => filters[key])
      .map(([key, values]) => `${key.toUpperCase()}:\n${values.join('\n') || 'None'}`)
      .join('\n\n');
    copyToClipboard(content, 'all');
  };

  const downloadResults = () => {
    const content = Object.entries(results)
      .filter(([key]) => filters[key])
      .map(([key, values]) => `${key.toUpperCase()}:\n${values.join('\n') || 'None'}`)
      .join('\n\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ForensiX-IOC-Results.txt';
    link.click();
  };

  const downloadCSV = () => {
    const rows: string[][] = [['Type', 'Value']];
    Object.entries(results)
      .filter(([key]) => filters[key])
      .forEach(([key, values]) => {
        values.forEach(val => {
          rows.push([key, val]);
        });
      });
    
    const csvContent = rows.map(r => r.map(v => `"${v.replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ForensiX-IOC-Results.csv';
    link.click();
  };

  const loadSample = () => {
    setInput(`PowerShell script detected:
$url = "http://malicious-domain.com/payload.exe"
$ip = "192.168.1.100"
$email = "attacker@evil.com"
$path = "C:\\Windows\\System32\\malware.exe"
$registry = "HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run"
$mutex = "\\BaseNamedObjects\\MyMalwareMutex"
$hash = "d41d8cd98f00b204e9800998ecf8427e"
$domain = "command-control.net"
$base64 = "VGhpcyBpcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyB0aGF0IGlzIGxvbmcgZW5vdWdoIHRvIGJlIGRldGVjdGVk"`);
  };

  const getIOCIcon = (type: string) => {
    switch (type) {
      case 'urls': return Globe;
      case 'ips': return Globe;
      case 'emails': return Mail;
      case 'filePaths': return FolderOpen;
      case 'registryKeys': return Key;
      case 'mutexes': return Lock;
      case 'hashes': return Hash;
      case 'domains': return Globe;
      case 'base64': return Eye;
      default: return FileText;
    }
  };

  const getIOCColor = (type: string) => {
    switch (type) {
      case 'urls': return 'text-blue-400';
      case 'ips': return 'text-green-400';
      case 'emails': return 'text-red-400';
      case 'filePaths': return 'text-yellow-400';
      case 'registryKeys': return 'text-purple-400';
      case 'mutexes': return 'text-pink-400';
      case 'hashes': return 'text-orange-400';
      case 'domains': return 'text-cyan-400';
      case 'base64': return 'text-indigo-400';
      default: return 'text-gray-400';
    }
  };

  const getIOCDescription = (type: string) => {
    switch (type) {
      case 'urls': return 'HTTP/HTTPS URLs';
      case 'ips': return 'IPv4 Addresses';
      case 'emails': return 'Email Addresses';
      case 'filePaths': return 'Windows File Paths';
      case 'registryKeys': return 'Registry Keys';
      case 'mutexes': return 'Named Objects/Mutexes';
      case 'hashes': return 'MD5/SHA1/SHA256 Hashes';
      case 'domains': return 'Domain Names';
      case 'base64': return 'Base64 Encoded Strings';
      default: return 'Unknown';
    }
  };

  const totalIOCs = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

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
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-orange-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Search className="h-16 w-16 text-orange-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-orange-400 bg-clip-text text-transparent">
                    IOC Extractor
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Extract Indicators of Compromise (IOCs) from any text, code, or malware samples. 
                  Automatically identify URLs, IPs, hashes, file paths, and other forensic artifacts.
                </p>
              </div>
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-6xl mx-auto">
            {/* IOC Type Filters */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Filter className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">IOC Types to Extract</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.keys(filters).map((key) => {
                    const IconComponent = getIOCIcon(key);
                    const isActive = filters[key];
                    return (
                      <label
                        key={key}
                        className={`flex items-center space-x-3 p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                          isActive
                            ? 'bg-orange-500/20 border-orange-500/30 text-orange-300'
                            : 'border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-800/50 hover:border-gray-600/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isActive}
                          onChange={() => toggleFilter(key)}
                          className="sr-only"
                        />
                        <IconComponent className={`h-5 w-5 ${isActive ? 'text-orange-400' : 'text-gray-500'}`} />
                        <div className="flex-1">
                          <div className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                          <div className="text-xs opacity-75">{getIOCDescription(key)}</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Input Section */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-bold text-white">Input Text/Code</h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={loadSample}
                      className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                    >
                      Load Sample
                    </button>
                    <button
                      onClick={() => setInput('')}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                      title="Clear input"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your decoded script, malware sample, logs, or any text here..."
                  className="w-full h-64 bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors resize-none font-mono text-sm"
                />
                <div className="mt-3 flex justify-between text-xs text-gray-400">
                  <span>Characters: {input.length}</span>
                  <span>Lines: {input.split('\n').length}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={extractIOCs}
                disabled={!input.trim() || isExtracting}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isExtracting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Extracting...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Extract IOCs</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => {
                  setInput('');
                  setResults({
                    urls: [],
                    ips: [],
                    emails: [],
                    filePaths: [],
                    registryKeys: [],
                    mutexes: [],
                    hashes: [],
                    domains: [],
                    base64: [],
                  });
                }}
                className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Results Section */}
            {totalIOCs > 0 && (
              <div className="space-y-8">
                {/* Results Header */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CheckCircle className="h-6 w-6 text-green-400" />
                        <h2 className="text-2xl font-bold text-white">Extraction Results</h2>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg text-sm font-medium">
                          {totalIOCs} IOCs Found
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={copyAllResults}
                          className="flex items-center space-x-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 px-4 py-2 rounded-lg transition-colors"
                        >
                          {copiedSection === 'all' ? (
                            <CheckCircle className="h-4 w-4 text-green-400" />
                          ) : (
                            <Copy className="h-4 w-4 text-cyan-400" />
                          )}
                          <span className="text-cyan-400">Copy All</span>
                        </button>
                        <button
                          onClick={downloadResults}
                          className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 px-4 py-2 rounded-lg transition-colors"
                        >
                          <Download className="h-4 w-4 text-blue-400" />
                          <span className="text-blue-400">Download TXT</span>
                        </button>
                        <button
                          onClick={downloadCSV}
                          className="flex items-center space-x-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 px-4 py-2 rounded-lg transition-colors"
                        >
                          <FileText className="h-4 w-4 text-green-400" />
                          <span className="text-green-400">Download CSV</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* IOC Results Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Object.entries(results)
                    .filter(([key]) => filters[key])
                    .map(([key, values]) => {
                      const IconComponent = getIOCIcon(key);
                      const color = getIOCColor(key);
                      
                      return (
                        <div key={key} className="relative group">
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                          <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <IconComponent className={`h-6 w-6 ${color}`} />
                                <h3 className="text-lg font-bold text-white capitalize">
                                  {key.replace(/([A-Z])/g, ' $1')}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  values.length > 0 
                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                                }`}>
                                  {values.length}
                                </span>
                              </div>
                              {values.length > 0 && (
                                <button
                                  onClick={() => copyToClipboard(values.join('\n'), key)}
                                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                                  title="Copy to clipboard"
                                >
                                  {copiedSection === key ? (
                                    <CheckCircle className="h-4 w-4 text-green-400" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </button>
                              )}
                            </div>
                            
                            <div className="max-h-48 overflow-y-auto">
                              {values.length > 0 ? (
                                <div className="space-y-2">
                                  {values.map((value, index) => (
                                    <div
                                      key={index}
                                      className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-3 font-mono text-sm text-gray-300 break-all"
                                    >
                                      {value}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-center py-8 text-gray-500">
                                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                                  <p className="text-sm">No {key.replace(/([A-Z])/g, ' $1').toLowerCase()} found</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* No Results State */}
            {!isExtracting && totalIOCs === 0 && input && (
              <div className="text-center py-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                    <div className="text-8xl mb-6">🔍</div>
                    <h3 className="text-3xl font-semibold text-gray-300 mb-4">No IOCs Found</h3>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                      No indicators of compromise were detected in the provided text. 
                      Try adjusting your filters or check if the input contains the expected IOC types.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!input && totalIOCs === 0 && (
              <div className="text-center py-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                    <div className="text-8xl mb-6">🔍</div>
                    <h3 className="text-3xl font-semibold text-gray-300 mb-4">Ready to Extract IOCs</h3>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                      Paste any text, code, malware samples, or logs to automatically extract 
                      indicators of compromise including URLs, IPs, hashes, file paths, and more.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                      <div className="text-center">
                        <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">URLs & Domains</div>
                      </div>
                      <div className="text-center">
                        <Hash className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">File Hashes</div>
                      </div>
                      <div className="text-center">
                        <FolderOpen className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">File Paths</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IOCExtractorPage;