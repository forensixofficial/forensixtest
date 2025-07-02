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
  ExternalLink
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
      // Enhanced file analysis fields
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
      // Network/Domain fields
      last_dns_records?: Array<{
        type: string;
        value: string;
        ttl: number;
      }>;
      whois_date?: number;
      categories?: Record<string, string>;
      popularity_ranks?: Record<string, { rank: number; timestamp: number }>;
      // IP specific fields
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
    // Enhanced fields
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
  // Enhanced geolocation data
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

interface HybridAnalysisResult {
  sha256: string;
  threatname?: string;
  environment_description: string;
  verdict: string;
  threat_score: number;
  tags?: string[];
  // Enhanced malware analysis fields
  analysis_start_time?: string;
  submit_name?: string;
  size?: number;
  type?: string;
  type_short?: string[];
  mitre_attcks?: Array<{
    tactic: string;
    technique: string;
    attck_id: string;
    attck_id_wiki: string;
  }>;
  processes?: Array<{
    process_id: number;
    process_name: string;
    command_line: string;
    process_path: string;
    uid: string;
  }>;
  network?: {
    domains?: string[];
    hosts?: string[];
    urls?: string[];
  };
  signatures?: Array<{
    name: string;
    description: string;
    severity: number;
    category: string;
  }>;
  extracted_files?: Array<{
    name: string;
    path: string;
    threat_level: number;
    file_size: number;
    sha256: string;
  }>;
}

interface MalShareResult {
  sha256: string;
  firstSeen: string;
  origin: string;
  fileType: string;
  yara: string;
  // Enhanced fields
  fileSize?: number;
  md5?: string;
  sha1?: string;
  sources?: string[];
  detectionRatio?: string;
  uploadDate?: string;
  lastSeen?: string;
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
      // Enhanced pulse data
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
    // Enhanced general data
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
    hybridAnalysis?: HybridAnalysisResult[];
    malShare?: MalShareResult[];
    otx?: OTXResult;
  }>({});
  const [errors, setErrors] = useState<{
    virusTotal?: string;
    abuseIPDB?: string;
    ipInfo?: string;
    hybridAnalysis?: string;
    malShare?: string;
    otx?: string;
  }>({});
  
  const location = useLocation();

  // Your Cloudflare Worker URL
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
    const response = await fetch(`${WORKER_URL}/api/virustotal?query=${encodeURIComponent(query)}&type=${type}`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const fetchAbuseIPDB = async (query: string, type: string) => {
    if (type !== 'ip') return null;

    const response = await fetch(`${WORKER_URL}/api/abuseipdb?ip=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const fetchIPInfo = async (query: string, type: string) => {
    if (type !== 'ip') return null;

    const response = await fetch(`${WORKER_URL}/api/ipinfo?ip=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const fetchHybridAnalysis = async (query: string, type: string) => {
    if (type !== 'file') return null;

    const response = await fetch(`${WORKER_URL}/api/hybridanalysis?hash=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const fetchMalShare = async (query: string, type: string) => {
    if (type !== 'file') return null;

    const response = await fetch(`${WORKER_URL}/api/malshare?hash=${encodeURIComponent(query)}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const fetchOTX = async (query: string, type: string) => {
    // Only fetch OTX for file hashes
    if (type !== 'file') return null;

    const response = await fetch(`${WORKER_URL}/api/otx?query=${encodeURIComponent(query)}&type=${type}`);

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  };

  const handleSearch = async (query?: string) => {
    const searchTerm = query || searchQuery;
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    setResults({});
    setErrors({});

    const detectedType = searchType === 'auto' ? detectSearchType(searchTerm) : searchType;

    // Create promises array based on detected type
    const promises: Promise<any>[] = [];
    const promiseKeys: string[] = [];

    // Always fetch VirusTotal
    promises.push(fetchVirusTotal(searchTerm, detectedType).catch(err => ({ error: err.message })));
    promiseKeys.push('virusTotal');

    // IP-specific sources
    if (detectedType === 'ip') {
      promises.push(fetchAbuseIPDB(searchTerm, detectedType).catch(err => ({ error: err.message })));
      promiseKeys.push('abuseIPDB');

      promises.push(fetchIPInfo(searchTerm, detectedType).catch(err => ({ error: err.message })));
      promiseKeys.push('ipInfo');
    }

    // Hash-specific sources
    if (detectedType === 'file') {
      promises.push(fetchHybridAnalysis(searchTerm, detectedType).catch(err => ({ error: err.message })));
      promiseKeys.push('hybridAnalysis');

      promises.push(fetchMalShare(searchTerm, detectedType).catch(err => ({ error: err.message })));
      promiseKeys.push('malShare');

      // Only fetch OTX for file hashes
      promises.push(fetchOTX(searchTerm, detectedType).catch(err => ({ error: err.message })));
      promiseKeys.push('otx');
    }

    try {
      const results = await Promise.all(promises);

      const newResults: any = {};
      const newErrors: any = {};

      results.forEach((result, index) => {
        const key = promiseKeys[index];
        if (result && !result.error) {
          newResults[key] = result;
        } else if (result?.error) {
          newErrors[key] = result.error;
        }
      });

      setResults(newResults);
      setErrors(newErrors);

    } catch (err: any) {
      setErrors({ 
        virusTotal: 'Failed to fetch data'
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
  };

  const formatDate = (timestamp: number | string) => {
    const date = typeof timestamp === 'number' ? new Date(timestamp * 1000) : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              IOC Search
            </h1>
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
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <span>Search</span>
                        <Zap className="h-5 w-5" />
                      </>
                    )}
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
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <Loader className="h-12 w-12 text-cyan-400 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-300 mb-2">Analyzing Threat Intelligence</h3>
                  <p className="text-gray-400 text-lg">Querying multiple threat intelligence sources...</p>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {(Object.keys(results).length > 0 || Object.keys(errors).length > 0) && !isLoading && (
            <div className="max-w-7xl mx-auto space-y-8">
              {/* Search Summary */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Analysis Results</h2>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-400">Searched:</span>
                      <span className="font-mono text-cyan-400">{searchQuery}</span>
                      <button
                        onClick={() => copyToClipboard(searchQuery)}
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <Copy className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Security Analysis Card - Enhanced */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                    <div className="flex items-center space-x-3 mb-6">
                      <Shield className="h-8 w-8 text-blue-400" />
                      <h3 className="text-xl font-bold text-white">Security Analysis</h3>
                    </div>

                    {errors.virusTotal ? (
                      <div className="text-red-400 text-sm">{errors.virusTotal}</div>
                    ) : results.virusTotal ? (
                      <div className="space-y-4">
                        {results.virusTotal.data.attributes.last_analysis_stats && (
                          <>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-red-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.malicious}
                                </div>
                                <div className="text-xs text-red-300">Malicious</div>
                              </div>
                              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-yellow-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.suspicious}
                                </div>
                                <div className="text-xs text-yellow-300">Suspicious</div>
                              </div>
                              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                                <div className="text-xl font-bold text-green-400">
                                  {results.virusTotal.data.attributes.last_analysis_stats.harmless}
                                </div>
                                <div className="text-xs text-green-300">Clean</div>
                              </div>
                              <div className="bg-gray-500/10 border border-gray-500/30 rounded-lg p-3 text-center">
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
                                <div className={`${threat.bg} ${threat.border} border rounded-lg p-3 text-center`}>
                                  <div className={`text-lg font-bold ${threat.color}`}>
                                    Threat Level: {threat.level}
                                  </div>
                                </div>
                              );
                            })()}
                          </>
                        )}

                        {/* Enhanced File Information */}
                        {detectedType === 'file' && results.virusTotal.data.attributes && (
                          <div className="space-y-3">
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">File Details</h4>
                            
                            {results.virusTotal.data.attributes.size && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">File Size:</span>
                                <span className="text-white">{formatBytes(results.virusTotal.data.attributes.size)}</span>
                              </div>
                            )}
                            
                            {results.virusTotal.data.attributes.type_description && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">File Type:</span>
                                <span className="text-white">{results.virusTotal.data.attributes.type_description}</span>
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
                                <span className="text-gray-400">First Seen:</span>
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
                                <h5 className="text-xs font-semibold text-gray-400">Hashes:</h5>
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

                        {/* Enhanced Network/Domain Information */}
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
                                <span key={index} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-400 text-sm">No data available</div>
                    )}
                  </div>
                </div>

                {/* Enhanced Abuse Intelligence Card - Only for IPs */}
                {detectedType === 'ip' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <AlertTriangle className="h-8 w-8 text-orange-400" />
                        <h3 className="text-xl font-bold text-white">Abuse Intelligence</h3>
                      </div>

                      {errors.abuseIPDB ? (
                        <div className="text-red-400 text-sm">{errors.abuseIPDB}</div>
                      ) : results.abuseIPDB ? (
                        <div className="space-y-4">
                          {/* Abuse Score */}
                          <div className={`rounded-lg p-4 text-center ${
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

                          {/* Enhanced IP Information */}
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
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Abuse Reports</h4>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
                                <div className="text-lg font-bold text-orange-400">{results.abuseIPDB.data.totalReports}</div>
                                <div className="text-xs text-gray-400">Total Reports</div>
                              </div>
                              <div className="bg-gray-800/50 rounded-lg p-3 text-center">
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
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Security Indicators</h4>
                              <div className="flex flex-wrap gap-2">
                                {results.abuseIPDB.data.tor && (
                                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30">
                                    TOR Exit Node
                                  </span>
                                )}
                                {results.abuseIPDB.data.vpn && (
                                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30">
                                    VPN
                                  </span>
                                )}
                                {results.abuseIPDB.data.proxy && (
                                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs border border-orange-500/30">
                                    Proxy
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">No data available</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Enhanced IP Geolocation Card - Only for IPs */}
                {detectedType === 'ip' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <MapPin className="h-8 w-8 text-green-400" />
                        <h3 className="text-xl font-bold text-white">IP Geolocation</h3>
                      </div>

                      {errors.ipInfo ? (
                        <div className="text-red-400 text-sm">{errors.ipInfo}</div>
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
                            <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Organization</h4>
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

                          {/* Enhanced ASN Information */}
                          {results.ipInfo.asn && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">ASN Details</h4>
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
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Privacy & Security</h4>
                              <div className="flex flex-wrap gap-2">
                                {results.ipInfo.privacy.vpn && (
                                  <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs border border-yellow-500/30">
                                    VPN
                                  </span>
                                )}
                                {results.ipInfo.privacy.proxy && (
                                  <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs border border-orange-500/30">
                                    Proxy
                                  </span>
                                )}
                                {results.ipInfo.privacy.tor && (
                                  <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs border border-red-500/30">
                                    TOR
                                  </span>
                                )}
                                {results.ipInfo.privacy.hosting && (
                                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs border border-blue-500/30">
                                    Hosting
                                  </span>
                                )}
                                {results.ipInfo.privacy.relay && (
                                  <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs border border-purple-500/30">
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

                          {/* Company Information */}
                          {results.ipInfo.company && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Company</h4>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Name:</span>
                                  <span className="text-white text-xs">{results.ipInfo.company.name}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Domain:</span>
                                  <span className="text-white text-xs">{results.ipInfo.company.domain}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Type:</span>
                                  <span className="text-white">{results.ipInfo.company.type}</span>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Domains Hosted */}
                          {results.ipInfo.domains && results.ipInfo.domains.total > 0 && (
                            <div className="space-y-2">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Hosted Domains</h4>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-400">Total Domains:</span>
                                <span className="text-white">{results.ipInfo.domains.total}</span>
                              </div>
                              {results.ipInfo.domains.domains && results.ipInfo.domains.domains.length > 0 && (
                                <div className="space-y-1">
                                  <span className="text-xs text-gray-400">Sample Domains:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {results.ipInfo.domains.domains.slice(0, 3).map((domain, index) => (
                                      <span key={index} className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs border border-green-500/30">
                                        {domain}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">No data available</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Enhanced Malware Analysis Card - Only for Hashes */}
                {detectedType === 'file' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <Bug className="h-8 w-8 text-purple-400" />
                        <h3 className="text-xl font-bold text-white">Malware Analysis</h3>
                      </div>

                      {errors.hybridAnalysis ? (
                        <div className="text-red-400 text-sm">{errors.hybridAnalysis}</div>
                      ) : results.hybridAnalysis && results.hybridAnalysis.length > 0 ? (
                        <div className="space-y-4">
                          {results.hybridAnalysis.slice(0, 2).map((entry, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                              {/* Analysis Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getVerdictColor(entry.verdict)} border`}>
                                    {entry.verdict}
                                  </span>
                                  <span className="text-xs text-gray-400">Score: {entry.threat_score}/100</span>
                                </div>
                              </div>

                              {/* Basic Information */}
                              <div className="space-y-2 text-sm mb-4">
                                {entry.submit_name && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">File Name:</span>
                                    <span className="text-white text-xs">{entry.submit_name}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Environment:</span>
                                  <span className="text-white text-xs">{entry.environment_description}</span>
                                </div>
                                {entry.size && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Size:</span>
                                    <span className="text-white">{formatBytes(entry.size)}</span>
                                  </div>
                                )}
                                {entry.type && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Type:</span>
                                    <span className="text-white text-xs">{entry.type}</span>
                                  </div>
                                )}
                                {entry.analysis_start_time && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Analyzed:</span>
                                    <span className="text-white text-xs">{formatDate(entry.analysis_start_time)}</span>
                                  </div>
                                )}
                              </div>

                              {/* MITRE ATT&CK Techniques */}
                              {entry.mitre_attcks && entry.mitre_attcks.length > 0 && (
                                <div className="space-y-2 mb-4">
                                  <h5 className="text-xs font-semibold text-gray-400">MITRE ATT&CK Techniques:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {entry.mitre_attcks.slice(0, 4).map((attack, idx) => (
                                      <span key={idx} className={`px-2 py-1 rounded text-xs border ${getMitreAttackColor(attack.tactic)}`}>
                                        {attack.attck_id} - {attack.technique}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Network Activity */}
                              {entry.network && (
                                <div className="space-y-2 mb-4">
                                  <h5 className="text-xs font-semibold text-gray-400">Network Activity:</h5>
                                  {entry.network.domains && entry.network.domains.length > 0 && (
                                    <div>
                                      <span className="text-xs text-gray-500">Domains ({entry.network.domains.length}):</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {entry.network.domains.slice(0, 3).map((domain, idx) => (
                                          <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs border border-red-500/30">
                                            {domain}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                  {entry.network.hosts && entry.network.hosts.length > 0 && (
                                    <div>
                                      <span className="text-xs text-gray-500">IPs ({entry.network.hosts.length}):</span>
                                      <div className="flex flex-wrap gap-1 mt-1">
                                        {entry.network.hosts.slice(0, 3).map((host, idx) => (
                                          <span key={idx} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs border border-orange-500/30">
                                            {host}
                                          </span>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Signatures */}
                              {entry.signatures && entry.signatures.length > 0 && (
                                <div className="space-y-2 mb-4">
                                  <h5 className="text-xs font-semibold text-gray-400">Detection Signatures:</h5>
                                  <div className="space-y-1 max-h-24 overflow-y-auto">
                                    {entry.signatures.slice(0, 3).map((sig, idx) => (
                                      <div key={idx} className="text-xs">
                                        <span className={`px-1 py-0.5 rounded ${
                                          sig.severity >= 3 ? 'bg-red-500/20 text-red-300' : 
                                          sig.severity >= 2 ? 'bg-yellow-500/20 text-yellow-300' : 
                                          'bg-blue-500/20 text-blue-300'
                                        }`}>
                                          {sig.name}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Processes */}
                              {entry.processes && entry.processes.length > 0 && (
                                <div className="space-y-2">
                                  <h5 className="text-xs font-semibold text-gray-400">Processes ({entry.processes.length}):</h5>
                                  <div className="space-y-1 max-h-20 overflow-y-auto">
                                    {entry.processes.slice(0, 2).map((proc, idx) => (
                                      <div key={idx} className="text-xs bg-gray-900/50 p-2 rounded border border-gray-700/50">
                                        <div className="font-mono text-cyan-300">{proc.process_name}</div>
                                        {proc.command_line && (
                                          <div className="text-gray-400 truncate">{proc.command_line}</div>
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Tags */}
                              {entry.tags && entry.tags.length > 0 && (
                                <div className="space-y-2 mt-4">
                                  <h5 className="text-xs font-semibold text-gray-400">Tags:</h5>
                                  <div className="flex flex-wrap gap-1">
                                    {entry.tags.slice(0, 6).map((tag, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">No data available</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Enhanced YARA Detection Card - Only for Hashes */}
                {detectedType === 'file' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <Code className="h-8 w-8 text-teal-400" />
                        <h3 className="text-xl font-bold text-white">YARA Detection</h3>
                      </div>

                      {errors.malShare ? (
                        <div className="text-red-400 text-sm">{errors.malShare}</div>
                      ) : results.malShare && results.malShare.length > 0 ? (
                        <div className="space-y-4">
                          {results.malShare.slice(0, 3).map((entry, index) => (
                            <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
                              {/* Sample Header */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-2">
                                  <Hash className="h-4 w-4 text-teal-400" />
                                  <span className="text-sm font-medium text-white">Sample {index + 1}</span>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium border ${
                                  entry.yara !== "None" ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-green-500/20 text-green-400 border-green-500/30'
                                }`}>
                                  {entry.yara !== "None" ? "YARA Hit" : "No Match"}
                                </div>
                              </div>

                              {/* Sample Details */}
                              <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-gray-400">SHA256:</span>
                                  <span className="text-white font-mono text-xs">{entry.sha256.substring(0, 16)}...</span>
                                </div>
                                {entry.md5 && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">MD5:</span>
                                    <span className="text-white font-mono text-xs">{entry.md5}</span>
                                  </div>
                                )}
                                {entry.sha1 && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">SHA1:</span>
                                    <span className="text-white font-mono text-xs">{entry.sha1.substring(0, 16)}...</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">First Seen:</span>
                                  <span className="text-white text-xs">{entry.firstSeen}</span>
                                </div>
                                {entry.lastSeen && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Last Seen:</span>
                                    <span className="text-white text-xs">{entry.lastSeen}</span>
                                  </div>
                                )}
                                <div className="flex justify-between">
                                  <span className="text-gray-400">Origin:</span>
                                  <span className="text-white text-xs">{entry.origin}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-400">File Type:</span>
                                  <span className="text-white text-xs">{entry.fileType}</span>
                                </div>
                                {entry.fileSize && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">File Size:</span>
                                    <span className="text-white">{formatBytes(entry.fileSize)}</span>
                                  </div>
                                )}
                                {entry.uploadDate && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-400">Upload Date:</span>
                                    <span className="text-white text-xs">{entry.uploadDate}</span>
                                  </div>
                                )}
                              </div>

                              {/* YARA Rule Information */}
                              <div className="mt-4 pt-3 border-t border-gray-700/50">
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-sm">YARA Rule:</span>
                                  <div className="text-right">
                                    {entry.yara !== "None" ? (
                                      <div className="space-y-1">
                                        <span className="text-red-300 font-mono text-sm bg-red-500/10 px-2 py-1 rounded border border-red-500/30">
                                          {entry.yara}
                                        </span>
                                        <div className="text-xs text-red-400">⚠️ Malware Detected</div>
                                      </div>
                                    ) : (
                                      <div className="space-y-1">
                                        <span className="text-green-300 text-sm">No YARA Match</span>
                                        <div className="text-xs text-green-400">✅ Clean</div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Detection Ratio */}
                              {entry.detectionRatio && (
                                <div className="mt-3 pt-3 border-t border-gray-700/50">
                                  <div className="flex justify-between">
                                    <span className="text-gray-400 text-sm">Detection Ratio:</span>
                                    <span className="text-white text-sm">{entry.detectionRatio}</span>
                                  </div>
                                </div>
                              )}

                              {/* Sources */}
                              {entry.sources && entry.sources.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-gray-700/50">
                                  <span className="text-gray-400 text-sm">Sources:</span>
                                  <div className="flex flex-wrap gap-1 mt-1">
                                    {entry.sources.map((source, idx) => (
                                      <span key={idx} className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs border border-teal-500/30">
                                        {source}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-400 text-sm">No data available</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Enhanced Threat Intelligence Card - Only for Hashes */}
                {detectedType === 'file' && (
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <Target className="h-8 w-8 text-indigo-400" />
                        <h3 className="text-xl font-bold text-white">Threat Intelligence</h3>
                      </div>

                      {errors.otx ? (
                        <div className="text-red-400 text-sm">{errors.otx}</div>
                      ) : results.otx ? (
                        <div className="space-y-4">
                          {/* Pulse Count */}
                          <div className={`rounded-lg p-4 text-center ${
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

                          {/* Enhanced Pulse Information */}
                          {results.otx.pulse_info?.pulses && results.otx.pulse_info.pulses.length > 0 && (
                            <div className="space-y-3">
                              <h4 className="text-sm font-semibold text-gray-300 border-b border-gray-700 pb-2">Threat Pulses:</h4>
                              <div className="space-y-3 max-h-64 overflow-y-auto">
                                {results.otx.pulse_info.pulses.slice(0, 3).map((pulse, index) => (
                                  <div key={index} className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
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
                                            <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs border border-red-500/30">
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
                                            <span key={idx} className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs border border-purple-500/30">
                                              {attackId}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Industries */}
                                    {pulse.industries && pulse.industries.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Targeted Industries:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.industries.slice(0, 3).map((industry, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30">
                                              {industry}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Countries */}
                                    {pulse.targeted_countries && pulse.targeted_countries.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Targeted Countries:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.targeted_countries.slice(0, 4).map((country, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded text-xs border border-yellow-500/30">
                                              {country}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Adversary */}
                                    {pulse.adversary && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Adversary:</span>
                                        <span className="ml-2 px-2 py-1 bg-red-500/20 text-red-300 rounded text-xs border border-red-500/30">
                                          {pulse.adversary}
                                        </span>
                                      </div>
                                    )}

                                    {/* Tags */}
                                    {pulse.tags && pulse.tags.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Tags:</span>
                                        <div className="flex flex-wrap gap-1 mt-1">
                                          {pulse.tags.slice(0, 5).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-1 bg-indigo-500/20 text-indigo-300 rounded text-xs border border-indigo-500/30">
                                              {tag}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Indicators */}
                                    {pulse.indicators && pulse.indicators.length > 0 && (
                                      <div className="mb-3">
                                        <span className="text-xs text-gray-400">Indicators ({pulse.indicators.length}):</span>
                                        <div className="space-y-1 mt-1 max-h-16 overflow-y-auto">
                                          {pulse.indicators.slice(0, 3).map((indicator, idx) => (
                                            <div key={idx} className="text-xs bg-gray-900/50 p-2 rounded border border-gray-700/50">
                                              <span className="text-cyan-300 font-mono">{indicator.type}:</span>
                                              <span className="text-white ml-2">{indicator.indicator}</span>
                                            </div>
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
                        <div className="text-gray-400 text-sm">No data available</div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Enhanced Security Engine Results */}
              {results.virusTotal?.data.attributes.last_analysis_results && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-white mb-6">Security Engine Detections</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                      {Object.entries(results.virusTotal.data.attributes.last_analysis_results).map(([engine, result]) => (
                        <div
                          key={engine}
                          className={`p-4 rounded-lg border ${
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
          {!isLoading && Object.keys(results).length === 0 && Object.keys(errors).length === 0 && !searchQuery && (
            <div className="text-center py-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                  <div className="text-8xl mb-6">🔍</div>
                  <h3 className="text-3xl font-semibold text-gray-300 mb-4">Multi-Source Threat Intelligence</h3>
                  <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
                    Enter any IP address, domain, or file hash to analyze across multiple threat intelligence sources.
                  </p>
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