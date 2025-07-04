import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Globe,
  Calendar,
  Activity,
  Heart,
  Loader,
  Copy,
  Zap,
  TrendingUp,
  Database,
  AlertCircle,
  MapPin,
  Users,
  FileText,
  Eye,
  Clock,
  Server,
  Wifi,
  Hash,
  Download,
  Upload,
  Code,
  Bug,
  Target,
  Info,
  ExternalLink,
  Sparkles,
  Fingerprint,
  Network,
  ShieldAlert,
  Globe2,
  Cpu,
  HardDrive
} from 'lucide-react';

interface VirusTotalResult {
  data: {
    id: string;
    type: string;
    attributes: {
      last_analysis_stats?: {
        harmless: number;
        malicious: number;
        suspicious: number;
        undetected: number;
        timeout: number;
      };
      last_analysis_results?: Record<string, {
        category: string;
        engine_name: string;
        engine_version: string;
        result: string | null;
        method: string;
        engine_update: string;
      }>;
      reputation?: number;
      country?: string;
      as_owner?: string;
      asn?: number;
      whois?: string;
      last_modification_date?: number;
      creation_date?: number;
      registrar?: string;
      names?: string[];
      meaningful_name?: string;
      size?: number;
      type_description?: string;
      first_submission_date?: number;
      last_submission_date?: number;
      times_submitted?: number;
      unique_sources?: number;
      magic?: string;
      md5?: string;
      sha1?: string;
      sha256?: string;
      ssdeep?: string;
      vhash?: string;
      authentihash?: string;
      imphash?: string;
      pe_info?: {
        machine_type?: string;
        timestamp?: number;
        entry_point?: number;
        sections?: Array<{
          name: string;
          virtual_size: number;
          raw_size: number;
          entropy: number;
          md5: string;
        }>;
        imports?: string[];
        exports?: string[];
        version_info?: Record<string, string>;
      };
      last_dns_records?: Array<{
        type: string;
        value: string;
        ttl: number;
      }>;
      whois_date?: number;
      categories?: Record<string, string>;
      popularity_ranks?: Record<string, { rank: number; timestamp: number }>;
      network?: string;
      regional_internet_registry?: string;
      jarm?: string;
      tags?: string[];
    };
  };
}

interface AbuseIPDBResult {
  data: {
    ipAddress: string;
    isPublic: boolean;
    ipVersion: number;
    isWhitelisted: boolean;
    abuseConfidenceScore: number;
    countryCode: string;
    countryName?: string;
    usageType: string;
    isp: string;
    domain: string;
    totalReports: number;
    numDistinctUsers: number;
    lastReportedAt: string;
    tor?: boolean;
    vpn?: boolean;
    proxy?: boolean;
    hostnames?: string[];
    reports?: Array<{
      reportedAt: string;
      comment: string;
      categories: number[];
      reporterId: number;
      reporterCountryCode: string;
    }>;
  };
}

interface IPInfoResult {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  hostname?: string;
  timezone?: string;
  postal?: string;
  anycast?: boolean;
  asn?: {
    asn: string;
    name: string;
    domain: string;
    route: string;
    type: string;
  };
  company?: {
    name: string;
    domain: string;
    type: string;
  };
  privacy?: {
    vpn: boolean;
    proxy: boolean;
    tor: boolean;
    relay: boolean;
    hosting: boolean;
    service: string;
  };
  abuse?: {
    address: string;
    country: string;
    email: string;
    name: string;
    network: string;
    phone: string;
  };
  domains?: {
    total: number;
    domains: string[];
  };
}

interface OTXResult {
  pulse_info: {
    count: number;
    pulses: Array<{
      id: string;
      name: string;
      description: string;
      author_name: string;
      created: string;
      modified: string;
      tags: string[];
      malware_families?: string[];
      attack_ids?: string[];
      industries?: string[];
      targeted_countries?: string[];
      adversary?: string;
      tlp?: string;
      references?: string[];
      indicators?: Array<{
        type: string;
        indicator: string;
        description: string;
      }>;
    }>;
  };
  general: {
    whois: string;
    alexa: string;
    base_indicator: {
      id: number;
      indicator: string;
      type: string;
      title: string;
      description: string;
      content: string;
      access_type: string;
      access_reason: string;
    };
    sections?: string[];
    pulse_info?: {
      count: number;
      references?: string[];
      related?: Array<{
        indicator: string;
        type: string;
        related_type: string;
      }>;
    };
  };
}

const IOCSearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'auto' | 'ip' | 'domain' | 'file'>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    virusTotal?: VirusTotalResult;
    abuseIPDB?: AbuseIPDBResult;
    ipInfo?: IPInfoResult;
    otx?: OTXResult;
  }>({});
  const [errors, setErrors] = useState<{
    virusTotal?: string;
    abuseIPDB?: string;
    ipInfo?: string;
    otx?: string;
  }>({});
  const [searchPerformed, setSearchPerformed] = useState(false);
  
  const location = useLocation();

  // Cloudflare Worker URL
  const WORKER_URL = 'https://forensix-api-proxy.forensixofficial.workers.dev';

  // Check for search query from URL params or state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const queryParam = urlParams.get('q');
    const stateQuery = location.state?.searchQuery;
    
    if (queryParam || stateQuery) {
      const query = queryParam || stateQuery;
      setSearchQuery(query);
      handleSearch(query);
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
  }, [location]);

  const detectSearchType = (query: string): 'ip' | 'domain' | 'file' => {
    // IP address pattern
    const ipPattern = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    
    // Hash patterns
    const md5Pattern = /^[a-fA-F0-9]{32}$/;
    const sha1Pattern = /^[a-fA-F0-9]{40}$/;
    const sha256Pattern = /^[a-fA-F0-9]{64}$/;
    
    if (ipPattern.test(query)) return 'ip';
    if (md5Pattern.test(query) || sha1Pattern.test(query) || sha256Pattern.test(query)) return 'file';
    return 'domain';
  };

  const fetchVirusTotal = async (query: string, type: string) => {
    try {
      const response = await fetch(`${WORKER_URL}/api/virustotal?query=${encodeURIComponent(query)}&type=${type}`);
      
      if (!response.ok) {
        throw new Error(`VirusTotal API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('VirusTotal fetch error:', error);
      throw error;
    }
  };

  const fetchAbuseIPDB = async (query: string, type: string) => {
    if (type !== 'ip') return null;

    try {
      const response = await fetch(`${WORKER_URL}/api/abuseipdb?ip=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`AbuseIPDB API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('AbuseIPDB fetch error:', error);
      throw error;
    }
  };

  const fetchIPInfo = async (query: string, type: string) => {
    if (type !== 'ip') return null;

    try {
      const response = await fetch(`${WORKER_URL}/api/ipinfo?ip=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`IPInfo API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('IPInfo fetch error:', error);
      throw error;
    }
  };

  const fetchOTX = async (query: string, type: string) => {
    try {
      const response = await fetch(`${WORKER_URL}/api/otx?query=${encodeURIComponent(query)}&type=${type}`);

      if (!response.ok) {
        throw new Error(`OTX API error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('OTX fetch error:', error);
      throw error;
    }
  };

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setResults({});
    setErrors({});
    setSearchPerformed(true);

    const detectedType = searchType === 'auto' ? detectSearchType(searchTerm) : searchType;

    try {
      // Fetch all APIs in parallel
      const [virusTotal, abuseIPDB, ipInfo, otx] = await Promise.allSettled([
        fetchVirusTotal(searchTerm, detectedType),
        detectedType === 'ip' ? fetchAbuseIPDB(searchTerm, detectedType) : Promise.resolve(null),
        detectedType === 'ip' ? fetchIPInfo(searchTerm, detectedType) : Promise.resolve(null),
        fetchOTX(searchTerm, detectedType)
      ]);

      const newResults: any = {};
      const newErrors: any = {};

      // Process VirusTotal
      if (virusTotal.status === 'fulfilled' && virusTotal.value) {
        newResults.virusTotal = virusTotal.value;
      } else if (virusTotal.status === 'rejected') {
        newErrors.virusTotal = virusTotal.reason.message || 'Failed to fetch VirusTotal data';
      }

      // Process AbuseIPDB
      if (detectedType === 'ip') {
        if (abuseIPDB.status === 'fulfilled' && abuseIPDB.value) {
          newResults.abuseIPDB = abuseIPDB.value;
        } else if (abuseIPDB.status === 'rejected') {
          newErrors.abuseIPDB = abuseIPDB.reason.message || 'Failed to fetch AbuseIPDB data';
        }
      }

      // Process IPInfo
      if (detectedType === 'ip') {
        if (ipInfo.status === 'fulfilled' && ipInfo.value) {
          newResults.ipInfo = ipInfo.value;
        } else if (ipInfo.status === 'rejected') {
          newErrors.ipInfo = ipInfo.reason.message || 'Failed to fetch IPInfo data';
        }
      }

      // Process OTX
      if (otx.status === 'fulfilled' && otx.value) {
        newResults.otx = otx.value;
      } else if (otx.status === 'rejected') {
        newErrors.otx = otx.reason.message || 'Failed to fetch OTX data';
      }

      setResults(newResults);
      setErrors(newErrors);

    } catch (err) {
      console.error('Search error:', err);
      setErrors({ 
        virusTotal: 'Failed to fetch data from one or more sources'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch();
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const formatDate = (timestamp: number | string) => {
    if (!timestamp) return 'Unknown';
    const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date(timestamp);
    return date.toLocaleString();
  };

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getThreatLevel = (malicious: number, suspicious: number) => {
    if (malicious > 5) return { level: 'High', color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30' };
    if (malicious > 0 || suspicious > 3) return { level: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' };
    return { level: 'Low', color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/30' };
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case 'malicious': return 'text-red-400';
      case 'suspicious': return 'text-yellow-400';
      case 'clean': case 'no specific threat': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getMitreAttackColor = (tactic: string) => {
    const colors = {
      'initial-access': 'bg-red-500/20 text-red-400',
      'execution': 'bg-orange-500/20 text-orange-400',
      'persistence': 'bg-yellow-500/20 text-yellow-400',
      'privilege-escalation': 'bg-purple-500/20 text-purple-400',
      'defense-evasion': 'bg-pink-500/20 text-pink-400',
      'credential-access': 'bg-indigo-500/20 text-indigo-400',
      'discovery': 'bg-blue-500/20 text-blue-400',
      'lateral-movement': 'bg-cyan-500/20 text-cyan-400',
      'collection': 'bg-green-500/20 text-green-400',
      'command-and-control': 'bg-teal-500/20 text-teal-400',
      'exfiltration': 'bg-emerald-500/20 text-emerald-400',
      'impact': 'bg-red-600/20 text-red-300'
    };
    return colors[tactic.toLowerCase()] || 'bg-gray-500/20 text-gray-400';
  };

  const detectedType = searchType === 'auto' ? detectSearchType(searchQuery) : searchType;

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>

      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl blur opacity-75 animate-pulse"></div>
                <div className="relative bg-gray-900 px-6 py-3 rounded-xl border border-gray-700/50">
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    IOC Search
                  </h1>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Multi-source threat intelligence analysis for comprehensive security investigations
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto mb-12">
            <form onSubmit={handleFormSubmit} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
              <div className="relative bg-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-14 h-14 text-cyan-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Enter IP address, domain, or file hash..."
                    className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-4 focus:outline-none text-lg"
                    disabled={isLoading}
                  />
                  <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value as any)}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white mr-2"
                    disabled={isLoading}
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="ip">IP Address</option>
                    <option value="domain">Domain</option>
                    <option value="file">File Hash</option>
                  </select>
                  <button
                    type="submit"
                    disabled={isLoading || !searchQuery.trim()}
                    className="relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10">
                      {isLoading ? (
                        <>
                          <Loader className="h-5 w-5 animate-spin inline mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          Search
                          <Zap className="h-5 w-5 inline ml-2" />
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-600 opacity-0 hover:opacity-100 transition-opacity duration-300"></span>
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse"></div>
                      <Loader className="relative h-12 w-12 text-cyan-400 animate-spin" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-300 mb-2">Analyzing Threat Intelligence</h3>
                    <p className="text-gray-400 text-lg max-w-md">
                      Querying multiple threat intelligence sources...
                      <span className="inline-block ml-2 animate-bounce">🔍</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {!isLoading && searchPerformed && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Search Summary */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-500/30">
                        {detectedType === 'ip' ? (
                          <Network className="h-6 w-6 text-cyan-400" />
                        ) : detectedType === 'domain' ? (
                          <Globe2 className="h-6 w-6 text-cyan-400" />
                        ) : (
                          <Fingerprint className="h-6 w-6 text-cyan-400" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                        <p className="text-sm text-gray-400">
                          {detectedType === 'ip' ? 'IP Address' : 
                           detectedType === 'domain' ? 'Domain' : 'File Hash'} Analysis
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/30">
                      <span className="text-sm text-gray-400">Searched:</span>
                      <span className="font-mono text-cyan-400">{searchQuery}</span>
                      <button
                        onClick={() => copyToClipboard(searchQuery)}
                        className="p-1 hover:bg-gray-700 rounded transition-colors"
                        title="Copy to clipboard"
                      >
                        <Copy className="h-4 w-4 text-gray-400 hover:text-cyan-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Security Analysis Card */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="p-2 bg-blue-500/20 rounded-lg border border-blue-500/30">
                        <Shield className="h-6 w-6 text-blue-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Security Analysis</h3>
                    </div>

                    {errors.virusTotal ? (
                      <div className="text-red-400 text-sm flex items-center space-x-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.virusTotal}</span>
                      </div>
                    ) : results.virusTotal ? (
                      <div className="space-y-4">
                        {results.virusTotal.data.attributes.last_analysis_stats && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-xl font-bold text-red-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.malicious}
                                </div>
                                <div className="text-xs text-red-300">Malicious</div>
                              </div>
                              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-xl font-bold text-yellow-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.suspicious}
                                </div>
                                <div className="text-xs text-yellow-300">Suspicious</div>
                              </div>
                              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-xl font-bold text-green-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.harmless}
                                </div>
                                <div className="text-xs text-green-300">Clean</div>
                              </div>
                              <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-xl font-bold text-gray-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.undetected}
                                </div>
                                <div className="text-xs text-gray-300">Undetected</div>
                              </div>
                            </div>

                            {/* Threat Level */}
                            {(() => {
                              const threat = getThreatLevel(
                                results.virusTotal.data.attributes.last_analysis_stats.malicious,
                                results.virusTotal.data.attributes.last_analysis_stats.suspicious
                              );
                              return (
                                <div className={`${threat.bg} ${threat.border} border rounded-lg p-3 text-center hover:scale-[1.01] transition-transform`}>
                                  <div className={`text-lg font-bold ${threat.color} flex items-center justify-center space-x-2`}>
                                    <span>Threat Level: {threat.level}</span>
                                    {threat.level === 'High' ? (
                                      <ShieldAlert className="h-5 w-5" />
                                    ) : threat.level === 'Medium' ? (
                                      <AlertTriangle className="h-5 w-5" />
                                    ) : (
                                      <CheckCircle className="h-5 w-5" />
                                    )}
                                  </div>
                                </div>
                              );
                            })()}
                          </>
                        )}

                        {/* File Information */}
                        {detectedType === 'file' && results.virusTotal.data.attributes && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                              <FileText className="h-4 w-4 mr-2" />
                              File Details
                            </h4>
                            
                            {results.virusTotal.data.attributes.size && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400 flex items-center">
                                  <HardDrive className="h-3 w-3 mr-2" />
                                  File Size:
                                </span>
                                <span className="text-white">{formatBytes(results.virusTotal.data.attributes.size)}</span>
                              </div>
                            )}
                            
                            {results.virusTotal.data.attributes.type_description && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">File Type:</span>
                                <span className="text-white text-xs">{results.virusTotal.data.attributes.type_description}</span>
                              </div>
                            )}
                            
                            {results.virusTotal.data.attributes.magic && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Magic:</span>
                                <span className="text-white text-xs">{results.virusTotal.data.attributes.magic}</span>
                              </div>
                            )}

                            {results.virusTotal.data.attributes.first_submission_date && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400 flex items-center">
                                  <Calendar className="h-3 w-3 mr-2" />
                                  First Seen:
                                </span>
                                <span className="text-white">{formatDate(results.virusTotal.data.attributes.first_submission_date)}</span>
                              </div>
                            )}

                            {results.virusTotal.data.attributes.times_submitted && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Submissions:</span>
                                <span className="text-white">{results.virusTotal.data.attributes.times_submitted}</span>
                              </div>
                            )}

                            {/* Hash Information */}
                            {(results.virusTotal.data.attributes.md5 || results.virusTotal.data.attributes.sha1 || results.virusTotal.data.attributes.sha256) && (
                              <div className="space-y-2">
                                <h5 className="text-xs font-semibold text-gray-400 border-b border-gray-700 pb-1">Hashes:</h5>
                                {results.virusTotal.data.attributes.md5 && (
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">MD5:</span>
                                    <span className="text-white font-mono">{results.virusTotal.data.attributes.md5.substring(0, 16)}...</span>
                                  </div>
                                )}
                                {results.virusTotal.data.attributes.sha1 && (
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">SHA1:</span>
                                    <span className="text-white font-mono">{results.virusTotal.data.attributes.sha1.substring(0, 16)}...</span>
                                  </div>
                                )}
                                {results.virusTotal.data.attributes.sha256 && (
                                  <div className="flex justify-between text-xs">
                                    <span className="text-gray-400">SHA256:</span>
                                    <span className="text-white font-mono">{results.virusTotal.data.attributes.sha256.substring(0, 16)}...</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Network/Domain Information */}
                        {(detectedType === 'domain' || detectedType === 'ip') && (
                          <div className="space-y-2 text-sm">
                            {results.virusTotal.data.attributes.reputation !== undefined && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Reputation:</span>
                                <span className={`${results.virusTotal.data.attributes.reputation >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                  {results.virusTotal.data.attributes.reputation}
                                </span>
                              </div>
                            )}
                            {results.virusTotal.data.attributes.country && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Country:</span>
                                <span className="text-white">{results.virusTotal.data.attributes.country}</span>
                              </div>
                            )}
                            {results.virusTotal.data.attributes.as_owner && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">AS Owner:</span>
                                <span className="text-white text-xs">{results.virusTotal.data.attributes.as_owner}</span>
                              </div>
                            )}
                            {results.virusTotal.data.attributes.asn && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">ASN:</span>
                                <span className="text-white">AS{results.virusTotal.data.attributes.asn}</span>
                              </div>
                            )}
                            {results.virusTotal.data.attributes.creation_date && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Created:</span>
                                <span className="text-white">{formatDate(results.virusTotal.data.attributes.creation_date)}</span>
                              </div>
                            )}
                            {results.virusTotal.data.attributes.registrar && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Registrar:</span>
                                <span className="text-white text-xs">{results.virusTotal.data.attributes.registrar}</span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Tags */}
                        {results.virusTotal.data.attributes.tags && results.virusTotal.data.attributes.tags.length > 0 && (
                          <div className="space-y-2">
                            <h5 className="text-xs font-semibold text-gray-400">Tags:</h5>
                            <div className="flex flex-wrap gap-1">
                              {results.virusTotal.data.attributes.tags.slice(0, 6).map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm flex items-center space-x-2">
                        <Info className="h-4 w-4" />
                        <span>No security analysis data available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Abuse Intelligence Card - Only for IPs */}
                {detectedType === 'ip' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-500/30">
                          <ShieldAlert className="h-6 w-6 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Abuse Intelligence</h3>
                      </div>

                      {errors.abuseIPDB ? (
                        <div className="text-red-400 text-sm flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.abuseIPDB}</span>
                        </div>
                      ) : results.abuseIPDB ? (
                        <div className="space-y-4">
                          {/* Abuse Score */}
                          <div className={`rounded-lg p-4 text-center hover:scale-[1.02] transition-transform ${
                            results.abuseIPDB.data.abuseConfidenceScore > 75 
                              ? 'bg-red-500/10 border border-red-500/30'
                              : results.abuseIPDB.data.abuseConfidenceScore > 25
                              ? 'bg-yellow-500/10 border border-yellow-500/30'
                              : 'bg-green-500/10 border border-green-500/30'
                          }`}>
                            <div className={`text-2xl font-bold ${
                              results.abuseIPDB.data.abuseConfidenceScore > 75 
                                ? 'text-red-400'
                                : results.abuseIPDB.data.abuseConfidenceScore > 25
                                ? 'text-yellow-400'
                                : 'text-green-400'
                            }`}>
                              {results.abuseIPDB.data.abuseConfidenceScore}%
                            </div>
                            <div className="text-xs text-gray-300">Abuse Confidence</div>
                          </div>

                          {/* IP Information */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">IP Version:</span>
                              <span className="text-white">IPv{results.abuseIPDB.data.ipVersion}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Public IP:</span>
                              <span className={results.abuseIPDB.data.isPublic ? 'text-green-400' : 'text-red-400'}>
                                {results.abuseIPDB.data.isPublic ? 'Yes' : 'No'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Whitelisted:</span>
                              <span className={results.abuseIPDB.data.isWhitelisted ? 'text-green-400' : 'text-gray-400'}>
                                {results.abuseIPDB.data.isWhitelisted ? 'Yes' : 'No'}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Country:</span>
                              <span className="text-white">{results.abuseIPDB.data.countryCode} {results.abuseIPDB.data.countryName && `(${results.abuseIPDB.data.countryName})`}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Usage Type:</span>
                              <span className="text-white">{results.abuseIPDB.data.usageType}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">ISP:</span>
                              <span className="text-white text-xs">{results.abuseIPDB.data.isp}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Domain:</span>
                              <span className="text-white text-xs">{results.abuseIPDB.data.domain}</span>
                            </div>
                          </div>

                          {/* Abuse Reports */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                              <Activity className="h-4 w-4 mr-2" />
                              Abuse Reports
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800/50 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-lg font-bold text-orange-400">{results.abuseIPDB.data.totalReports}</div>
                                <div className="text-xs text-gray-400">Total Reports</div>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3 text-center hover:scale-[1.02] transition-transform">
                                <div className="text-lg font-bold text-red-400">{results.abuseIPDB.data.numDistinctUsers}</div>
                                <div className="text-xs text-gray-400">Distinct Users</div>
                              </div>
                            </div>
                            {results.abuseIPDB.data.lastReportedAt && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Last Reported:</span>
                                <span className="text-white text-xs">{formatDate(results.abuseIPDB.data.lastReportedAt)}</span>
                              </div>
                            )}
                          </div>

                          {/* Security Indicators */}
                          {(results.abuseIPDB.data.tor || results.abuseIPDB.data.vpn || results.abuseIPDB.data.proxy) && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                                <Shield className="h-4 w-4 mr-2" />
                                Security Indicators
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {results.abuseIPDB.data.tor && (
                                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30 hover:bg-red-500/30 transition-colors">
                                    TOR Exit Node
                                  </span>
                                )}
                                {results.abuseIPDB.data.vpn && (
                                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors">
                                    VPN
                                  </span>
                                )}
                                {results.abuseIPDB.data.proxy && (
                                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs border border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                                    Proxy
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm flex items-center space-x-2">
                          <Info className="h-4 w-4" />
                          <span>No abuse intelligence data available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* IP Geolocation Card - Only for IPs */}
                {detectedType === 'ip' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
                          <MapPin className="h-6 w-6 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">IP Geolocation</h3>
                      </div>

                      {errors.ipInfo ? (
                        <div className="text-red-400 text-sm flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.ipInfo}</span>
                        </div>
                      ) : results.ipInfo ? (
                        <div className="space-y-4">
                          {/* Location Information */}
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">IP Address:</span>
                              <span className="text-white font-mono">{results.ipInfo.ip}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">City:</span>
                              <span className="text-white">{results.ipInfo.city}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Region:</span>
                              <span className="text-white">{results.ipInfo.region}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Country:</span>
                              <span className="text-white">{results.ipInfo.country}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Coordinates:</span>
                              <span className="text-white font-mono text-xs">{results.ipInfo.loc}</span>
                            </div>
                            {results.ipInfo.postal && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Postal Code:</span>
                                <span className="text-white">{results.ipInfo.postal}</span>
                              </div>
                            )}
                            {results.ipInfo.timezone && (
                              <div className="flex justify-between">
                                <span className="text-gray-400">Timezone:</span>
                                <span className="text-white">{results.ipInfo.timezone}</span>
                              </div>
                            )}
                          </div>

                          {/* Organization Information */}
                          <div className="space-y-2">
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                              <Users className="h-4 w-4 mr-2" />
                              Organization
                            </h4>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Organization:</span>
                              <span className="text-white text-xs">{results.ipInfo.org}</span>
                            </div>
                            {results.ipInfo.hostname && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Hostname:</span>
                                <span className="text-white text-xs">{results.ipInfo.hostname}</span>
                              </div>
                            )}
                          </div>

                          {/* ASN Information */}
                          {results.ipInfo.asn && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                                <Cpu className="h-4 w-4 mr-2" />
                                ASN Details
                              </h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">ASN:</span>
                                  <span className="text-white">{results.ipInfo.asn.asn}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Name:</span>
                                  <span className="text-white text-xs">{results.ipInfo.asn.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Domain:</span>
                                  <span className="text-white text-xs">{results.ipInfo.asn.domain}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Route:</span>
                                  <span className="text-white font-mono text-xs">{results.ipInfo.asn.route}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Type:</span>
                                  <span className="text-white">{results.ipInfo.asn.type}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Privacy/Security Information */}
                          {results.ipInfo.privacy && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                Privacy & Security
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {results.ipInfo.privacy.vpn && (
                                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors">
                                    VPN
                                  </span>
                                )}
                                {results.ipInfo.privacy.proxy && (
                                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs border border-orange-500/30 hover:bg-orange-500/30 transition-colors">
                                    Proxy
                                  </span>
                                )}
                                {results.ipInfo.privacy.tor && (
                                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30 hover:bg-red-500/30 transition-colors">
                                    TOR
                                  </span>
                                )}
                                {results.ipInfo.privacy.hosting && (
                                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                                    Hosting
                                  </span>
                                )}
                                {results.ipInfo.privacy.relay && (
                                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                                    Relay
                                  </span>
                                )}
                              </div>
                              {results.ipInfo.privacy.service && (
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-400">Service:</span>
                                  <span className="text-white text-xs">{results.ipInfo.privacy.service}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm flex items-center space-x-2">
                          <Info className="h-4 w-4" />
                          <span>No geolocation data available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Threat Intelligence Card - Only for Hashes */}
                {detectedType === 'file' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                          <Target className="h-6 w-6 text-indigo-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Threat Intelligence</h3>
                      </div>

                      {errors.otx ? (
                        <div className="text-red-400 text-sm flex items-center space-x-2">
                          <AlertCircle className="h-4 w-4" />
                          <span>{errors.otx}</span>
                        </div>
                      ) : results.otx ? (
                        <div className="space-y-4">
                          {/* Pulse Count */}
                          <div className={`rounded-lg p-4 text-center hover:scale-[1.02] transition-transform ${
                            results.otx.pulse_info?.count > 0
                              ? 'bg-red-500/10 border border-red-500/30'
                              : 'bg-green-500/10 border border-green-500/30'
                          }`}>
                            <div className={`text-2xl font-bold ${
                              results.otx.pulse_info?.count > 0 ? 'text-red-400' : 'text-green-400'
                            }`}>
                              {results.otx.pulse_info?.count || 0}
                            </div>
                            <div className="text-xs text-gray-300">Threat Pulses</div>
                          </div>

                          {/* Pulse Information */}
                          {results.otx.pulse_info?.pulses && results.otx.pulse_info.pulses.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2 flex items-center">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Threat Pulses:
                              </h4>
                              <div className="space-y-3 max-h-64 overflow-y-auto">
                                {results.otx.pulse_info.pulses.slice(0, 3).map((pulse, index) => (
                                  <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50 hover:border-gray-700 transition-colors">
                                    {/* Pulse Header */}
                                    <div className="flex items-start justify-between mb-3">
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-white mb-1 line-clamp-2">
                                          {pulse.name}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                          by {pulse.author_name} • {formatDate(pulse.created)}
                                        </div>
                                      </div>
                                      {pulse.tlp && (
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${
                                          pulse.tlp === 'white' ? 'bg-gray-500/20 text-gray-300 border-gray-500/30' :
                                          pulse.tlp === 'green' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                          pulse.tlp === 'amber' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                          'bg-red-500/20 text-red-400 border-red-500/30'
                                        }`}>
                                          TLP:{pulse.tlp.toUpperCase()}
                                        </span>
                                      )}
                                    </div>

                                    {/* Pulse Description */}
                                    {pulse.description && (
                                      <div className="text-xs text-gray-300 mb-3 line-clamp-2">
                                        {pulse.description}
                                      </div>
                                    )}

                                    {/* Malware Families */}
                                    {pulse.malware_families && pulse.malware_families.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Malware Families:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.malware_families.slice(0, 3).map((family, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs border border-red-500/30 hover:bg-red-500/30 transition-colors">
                                              {family}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Attack IDs */}
                                    {pulse.attack_ids && pulse.attack_ids.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">ATT&CK IDs:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.attack_ids.slice(0, 4).map((attackId, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30 hover:bg-purple-500/30 transition-colors">
                                              {attackId}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Tags */}
                                    {pulse.tags && pulse.tags.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Tags:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.tags.slice(0, 5).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs border border-indigo-500/30 hover:bg-indigo-500/30 transition-colors">
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* References */}
                                    {pulse.references && pulse.references.length > 0 && (
                                      <div className="pt-2 border-t border-gray-700/50">
                                        <span className="text-xs text-gray-400">References:</span>
                                        <div className="space-y-1 mt-1">
                                          {pulse.references.slice(0, 2).map((ref, idx) => (
                                            <a key={idx} href={ref} target="_blank" rel="noopener noreferrer" 
                                               className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 group">
                                              <ExternalLink className="h-3 w-3 group-hover:scale-110 transition-transform" />
                                              <span className="truncate">{ref}</span>
                                            </a>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {results.otx.pulse_info?.count === 0 && (
                            <div className="text-center text-gray-400 text-sm">
                              No threat intelligence found
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm flex items-center space-x-2">
                          <Info className="h-4 w-4" />
                          <span>No threat intelligence data available</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Security Engine Results */}
              {results.virusTotal?.data.attributes.last_analysis_results && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Security Engine Detections</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Total Engines:</span>
                        <span className="text-cyan-400 font-semibold">
                          {Object.keys(results.virusTotal.data.attributes.last_analysis_results).length}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                      {Object.entries(results.virusTotal.data.attributes.last_analysis_results).map(([engine, result]) => (
                        <div
                          key={engine}
                          className={`p-4 rounded-lg border hover:scale-[1.02] transition-transform ${
                            result.category === 'malicious'
                              ? 'bg-red-500/10 border-red-500/30'
                              : result.category === 'suspicious'
                              ? 'bg-yellow-500/10 border-yellow-500/30'
                              : 'bg-green-500/10 border-green-500/30'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-semibold text-white text-sm truncate">{result.engine_name}</span>
                            {result.category === 'malicious' ? (
                              <XCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                            ) : result.category === 'suspicious' ? (
                              <AlertTriangle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                            ) : (
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                            )}
                          </div>
                          <div className="text-xs text-gray-300 mb-2">
                            <div className="font-medium">{result.result || 'Clean'}</div>
                            <div className="text-gray-500">v{result.engine_version}</div>
                          </div>
                          <div className="text-xs text-gray-400">
                            Updated: {formatDate(result.engine_update)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* No Results State */}
          {!isLoading && !searchPerformed && (
            <div className="text-center py-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-lg animate-pulse"></div>
                      <div className="relative bg-gray-800/50 p-6 rounded-full border border-gray-700/30">
                        <Search className="h-12 w-12 text-cyan-400" />
                      </div>
                    </div>
                    <h3 className="text-3xl font-semibold text-gray-300 mb-4">Multi-Source Threat Intelligence</h3>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                      Enter any IP address, domain, or file hash to analyze across multiple threat intelligence sources.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                      <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 flex items-center">
                        <Network className="h-4 w-4 text-blue-400 mr-2" />
                        <span className="text-sm">IP Address</span>
                      </div>
                      <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 flex items-center">
                        <Globe2 className="h-4 w-4 text-green-400 mr-2" />
                        <span className="text-sm">Domain</span>
                      </div>
                      <div className="px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30 flex items-center">
                        <Fingerprint className="h-4 w-4 text-purple-400 mr-2" />
                        <span className="text-sm">File Hash</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default IOCSearchPage;
