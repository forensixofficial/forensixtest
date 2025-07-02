import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Mail,
  Copy,
  RotateCcw,
  Shield,
  Activity,
  Heart,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Clock,
  MapPin,
  Server,
  User,
  Globe,
  Flag,
  AtSign,
  Calendar,
  Lock,
  Unlock
} from 'lucide-react';

interface ParsedEmailData {
  sender?: string;
  recipient?: string;
  subject?: string;
  date?: string;
  messageId?: string;
  replyTo?: string;
  returnPath?: string;
  senderIP?: string;
  receivedServers?: string[];
  spfResult?: string;
  dkimResult?: string;
  dmarcResult?: string;
  priority?: string;
  contentType?: string;
  userAgent?: string;
}

const EmailAnalyzerPage = () => {
  const [input, setInput] = useState('');
  const [headers, setHeaders] = useState<Record<string, string[]>>({});
  const [parsedData, setParsedData] = useState<ParsedEmailData>({});

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample email headers for demonstration
  const sampleHeaders = `Delivered-To: victim@company.com
Received: by 2002:a05:6402:3b8f:b0:4a2:7c5d:8e9f with SMTP id h15csp1234567edd;
        Thu, 15 Feb 2024 09:15:32 -0800 (PST)
X-Google-Smtp-Source: AGHT+IFxyz123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz890
X-Received: by 2002:a17:902:b48f:b0:1a2:3c4d:5e6f with SMTP id q15-20020a17902b48f00b001a23c4d5e6fmr12345678plr.45.1708023332456;
        Thu, 15 Feb 2024 09:15:32 -0800 (PST)
ARC-Seal: i=1; a=rsa-sha256; t=1708023332; cv=none;
        d=google.com; s=arc-20160816;
        b=xyz123abc456def789ghi012jkl345mno678pqr901stu234vwx567yz890
Return-Path: <noreply@suspicious-domain.tk>
Received: from mail.suspicious-domain.tk (unknown [192.168.1.100])
        by mx.google.com with ESMTPS id abc123def456ghi789
        (version=TLS1_3 cipher=TLS_AES_256_GCM_SHA384 bits=256/256);
        Thu, 15 Feb 2024 09:15:31 -0800 (PST)
Received-SPF: fail (google.com: domain of noreply@suspicious-domain.tk does not designate 192.168.1.100 as permitted sender) client-ip=192.168.1.100;
Authentication-Results: mx.google.com;
       dkim=fail (signature did not verify) header.i=@suspicious-domain.tk;
       spf=fail (google.com: domain of noreply@suspicious-domain.tk does not designate 192.168.1.100 as permitted sender) smtp.mailfrom=noreply@suspicious-domain.tk;
       dmarc=fail (p=none dis=none) header.from=suspicious-domain.tk
Message-ID: <20240215171531.12345@suspicious-domain.tk>
Date: Thu, 15 Feb 2024 17:15:31 +0000
From: "IT Support" <noreply@suspicious-domain.tk>
Reply-To: support@different-domain.ru
To: victim@company.com
Subject: Urgent: Account Security Alert - Action Required
MIME-Version: 1.0
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable
X-Mailer: PHPMailer 6.8.0 (https://github.com/PHPMailer/PHPMailer)
X-Priority: 1 (Highest)
X-MSMail-Priority: High
Importance: high`;

  function parseEmailHeaders(rawHeaders: string): Record<string, string[]> {
    const lines = rawHeaders.split(/\r?\n/);
    const headers: Record<string, string[]> = {};
    let currentKey = '';

    for (const line of lines) {
      if (/^\s/.test(line) && currentKey) {
        // Continuation of previous header
        headers[currentKey][headers[currentKey].length - 1] += ' ' + line.trim();
      } else {
        const [key, ...rest] = line.split(':');
        if (key && rest.length > 0) {
          currentKey = key.trim();
          const value = rest.join(':').trim();
          if (!headers[currentKey]) headers[currentKey] = [];
          headers[currentKey].push(value);
        }
      }
    }

    return headers;
  }

  function extractStructuredData(headers: Record<string, string[]>): ParsedEmailData {
    const data: ParsedEmailData = {};

    // Extract basic email information
    if (headers['From']) {
      data.sender = headers['From'][0];
    }
    if (headers['To']) {
      data.recipient = headers['To'][0];
    }
    if (headers['Subject']) {
      data.subject = headers['Subject'][0];
    }
    if (headers['Date']) {
      data.date = headers['Date'][0];
    }
    if (headers['Message-ID']) {
      data.messageId = headers['Message-ID'][0];
    }
    if (headers['Reply-To']) {
      data.replyTo = headers['Reply-To'][0];
    }
    if (headers['Return-Path']) {
      data.returnPath = headers['Return-Path'][0];
    }
    if (headers['Content-Type']) {
      data.contentType = headers['Content-Type'][0];
    }
    if (headers['X-Mailer']) {
      data.userAgent = headers['X-Mailer'][0];
    }

    // Extract priority information
    if (headers['X-Priority']) {
      data.priority = headers['X-Priority'][0];
    } else if (headers['X-MSMail-Priority']) {
      data.priority = headers['X-MSMail-Priority'][0];
    } else if (headers['Importance']) {
      data.priority = headers['Importance'][0];
    }

    // Extract sender IP from Received headers
    if (headers['Received']) {
      const receivedHeaders = headers['Received'];
      data.receivedServers = [];
      
      for (const received of receivedHeaders) {
        // Extract IP addresses from received headers
        const ipMatch = received.match(/\[(\d+\.\d+\.\d+\.\d+)\]/);
        if (ipMatch && !data.senderIP) {
          data.senderIP = ipMatch[1];
        }
        
        // Extract server information
        const serverMatch = received.match(/from\s+([^\s]+)/);
        if (serverMatch) {
          data.receivedServers.push(serverMatch[1]);
        }
      }
    }

    // Extract authentication results
    if (headers['Received-SPF']) {
      const spfMatch = headers['Received-SPF'][0].match(/^(pass|fail|neutral|softfail|temperror|permerror)/i);
      if (spfMatch) {
        data.spfResult = spfMatch[1];
      }
    }

    if (headers['Authentication-Results']) {
      const authResults = headers['Authentication-Results'][0];
      
      // Extract SPF result
      const spfMatch = authResults.match(/spf=([^;\s]+)/i);
      if (spfMatch) {
        data.spfResult = spfMatch[1];
      }
      
      // Extract DKIM result
      const dkimMatch = authResults.match(/dkim=([^;\s]+)/i);
      if (dkimMatch) {
        data.dkimResult = dkimMatch[1];
      }
      
      // Extract DMARC result
      const dmarcMatch = authResults.match(/dmarc=([^;\s]+)/i);
      if (dmarcMatch) {
        data.dmarcResult = dmarcMatch[1];
      }
    }

    return data;
  }

  function getHighlightColor(key: string, value: string): string | null {
    const lowerKey = key.toLowerCase();
    const lowerValue = value.toLowerCase();

    // Known malicious domains (exact match)
    const knownMaliciousDomains = [
      "bit.ly",
      "tinyurl.com",
      "googie.com", // typo-squatted
      "login-facebook-support.cn",
      "account-recovery.cf",
      "secure-check-authentication.gq",
      "github-authentication.firebaseapp.com"
    ];

    // High-risk TLDs
    const riskyTLDs = [".tk", ".ru", ".cn", ".top", ".gq", ".ml", ".cf", ".xyz", ".shop", ".buzz"];

    // Suspicious domain keywords
    const suspiciousDomainKeywords = [
      "pay", "payment", "wallet", "bitcoin", "crypto", "login", "secure", 
      "account", "verify", "confirm", "update", "support", "service", 
      "alert", "admin", "webmail", "reset", "auth", "signin", "banking", 
      "transfer", "security", "transaction", "recovery", "billing", 
      "verification", "account-update", "safe", "helpdesk", "onlinebanking", 
      "resetpassword", "access", "customer-service", "alertcenter"
    ];

    // Function to check for suspicious keywords in domain
    function containsSuspiciousKeyword(domain: string): boolean {
      const lowerDomain = domain.toLowerCase();
      return suspiciousDomainKeywords.some(keyword => lowerDomain.includes(keyword));
    }

    // Track detected issues with their severity
    let issues = {
      maliciousDomain: false,
      riskyTLD: false,
      suspiciousKeywords: false,
      internalIP: false,
      authFail: false,
      headerMismatch: false
    };

    // Extract domain from email addresses for checking
    function extractDomain(emailValue: string): string {
      const match = emailValue.match(/@([^>\s]+)/);
      return match ? match[1].toLowerCase() : "";
    }

    // Check for known malicious domains, risky TLDs, and suspicious keywords
    if (lowerKey === "from" || lowerKey === "reply-to" || lowerKey === "return-path") {
      const domain = extractDomain(lowerValue);
      
      // Check for known malicious domains
      for (const maliciousDomain of knownMaliciousDomains) {
        if (domain.includes(maliciousDomain.toLowerCase())) {
          issues.maliciousDomain = true;
          break;
        }
      }

      // Check for risky TLDs
      for (const tld of riskyTLDs) {
        if (domain.endsWith(tld)) {
          issues.riskyTLD = true;
          break;
        }
      }

      // Check for suspicious keywords in domain
      if (containsSuspiciousKeyword(domain)) {
        issues.suspiciousKeywords = true;
      }
    }

    // Check for internal IPs in Received headers
    if (lowerKey === "received" && 
        /\b(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])|localhost)\b/i.test(value)) {
      issues.internalIP = true;
    }

    // Check for authentication failures
    if ((lowerKey.includes("spf") || lowerKey.includes("dkim") || lowerKey.includes("dmarc") || 
         lowerKey.includes("authentication-results")) && 
        lowerValue.includes("fail")) {
      issues.authFail = true;
    }

    // Check for header mismatches (Reply-To or Return-Path)
    if (lowerKey === "reply-to" || lowerKey === "return-path") {
      issues.headerMismatch = true;
    }

    // Determine the highest priority issue (red > orange > yellow)
    if (issues.maliciousDomain || issues.authFail || issues.internalIP) {
      return "red";
    } else if (issues.headerMismatch) {
      return "orange";
    } else if (issues.riskyTLD || issues.suspiciousKeywords) {
      return "yellow";
    }

    return null;
  }

  function getBadgeTexts(key: string, value: string): string[] {
    const lowerKey = key.toLowerCase();
    const lowerValue = value.toLowerCase();
    const badges: string[] = [];

    // Known malicious domains
    const knownMaliciousDomains = [
      "bit.ly",
      "tinyurl.com",
      "googie.com",
      "login-facebook-support.cn",
      "account-recovery.cf",
      "secure-check-authentication.gq",
      "github-authentication.firebaseapp.com"
    ];

    // High-risk TLDs
    const riskyTLDs = [".tk", ".ru", ".cn", ".top", ".gq", ".ml", ".cf", ".xyz", ".shop", ".buzz"];

    // Suspicious domain keywords
    const suspiciousDomainKeywords = [
      "pay", "payment", "wallet", "bitcoin", "crypto", "login", "secure", 
      "account", "verify", "confirm", "update", "support", "service", 
      "alert", "admin", "webmail", "reset", "auth", "signin", "banking", 
      "transfer", "security", "transaction", "recovery", "billing", 
      "verification", "account-update", "safe", "helpdesk", "onlinebanking", 
      "resetpassword", "access", "customer-service", "alertcenter"
    ];

    // Function to check for suspicious keywords in domain
    function containsSuspiciousKeyword(domain: string): boolean {
      return suspiciousDomainKeywords.some(keyword => domain.includes(keyword));
    }

    // Extract domain from email addresses for checking
    function extractDomain(emailValue: string): string {
      const match = emailValue.match(/@([^>\s]+)/);
      return match ? match[1].toLowerCase() : "";
    }

    // Check for authentication failures
    if ((lowerKey.includes("spf") || lowerKey.includes("dkim") || lowerKey.includes("dmarc") || 
         lowerKey.includes("authentication-results")) && 
        lowerValue.includes("fail")) {
      badges.push("Authentication Fail");
    }

    // Check for internal IPs in Received headers
    if (lowerKey === "received" && 
        /\b(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])|localhost)\b/i.test(value)) {
      badges.push("Internal IP");
    }

    // Check email headers for suspicious patterns
    if (lowerKey === "from" || lowerKey === "reply-to" || lowerKey === "return-path") {
      const domain = extractDomain(lowerValue);
      
      // Check for known malicious domains
      for (const maliciousDomain of knownMaliciousDomains) {
        if (domain.includes(maliciousDomain.toLowerCase())) {
          badges.push("Known Malicious Domain");
          break;
        }
      }

      // Check for risky TLDs
      for (const tld of riskyTLDs) {
        if (domain.endsWith(tld)) {
          badges.push("High-Risk TLD");
          break;
        }
      }

      // Check for suspicious keywords in domain
      if (containsSuspiciousKeyword(domain)) {
        badges.push("Suspicious Keywords");
      }
    }

    // Check for header mismatches
    if ((lowerKey === "reply-to" || lowerKey === "return-path") && badges.length === 0) {
      badges.push("Header Mismatch");
    }

    return badges;
  }

  const getBadgeClasses = (badge: string): string => {
    switch (badge) {
      case "Authentication Fail":
      case "Internal IP":
      case "Known Malicious Domain":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Header Mismatch":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "High-Risk TLD":
      case "Suspicious Keywords":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getAuthStatusIcon = (result?: string) => {
    if (!result) return <XCircle className="h-4 w-4 text-gray-400" />;
    
    const status = result.toLowerCase();
    if (status === 'pass') return <CheckCircle className="h-4 w-4 text-green-400" />;
    if (status === 'fail') return <XCircle className="h-4 w-4 text-red-400" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
  };

  const getAuthStatusColor = (result?: string) => {
    if (!result) return 'text-gray-400';
    
    const status = result.toLowerCase();
    if (status === 'pass') return 'text-green-400';
    if (status === 'fail') return 'text-red-400';
    return 'text-yellow-400';
  };

  const handleParse = () => {
    const parsed = parseEmailHeaders(input);
    setHeaders(parsed);
    const structured = extractStructuredData(parsed);
    setParsedData(structured);
  };

  const handleClear = () => {
    setInput('');
    setHeaders({});
    setParsedData({});
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const loadSample = () => {
    setInput(sampleHeaders);
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
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-red-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Mail className="h-16 w-16 text-red-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    Email Analyzer
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Forensic email header analysis tool. Parse email headers, detect suspicious patterns, 
                  and identify potential phishing indicators for incident response investigations.
                </p>
              </div>
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-6xl mx-auto">
            {/* Input/Output Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Input Section */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">Raw Email Headers</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={loadSample}
                        className="px-3 py-1 text-xs bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-500/30 transition-colors"
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
                    placeholder="Paste raw email headers here..."
                    className="w-full h-96 bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors resize-none font-mono text-sm"
                    rows={8}
                  />
                  <div className="mt-3 text-xs text-gray-400">
                    Lines: {input.split('\n').length} | Characters: {input.length}
                  </div>
                </div>
              </div>

              {/* Output Section */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">Parsed Headers</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => copyToClipboard(JSON.stringify(headers, null, 2))}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="Copy to clipboard"
                        disabled={Object.keys(headers).length === 0}
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="h-96 bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 overflow-auto">
                    <div className="space-y-2 font-mono text-sm">
                      {Object.entries(headers).length === 0 && (
                        <p className="text-gray-400">No parsed headers yet.</p>
                      )}

                      {Object.entries(headers).map(([key, values]) =>
                        values.map((value, i) => {
                          const badges = getBadgeTexts(key, value);
                          
                          return (
                            <div key={`${key}-${i}`} className="flex items-start space-x-2 py-1">
                              <span className="font-semibold text-cyan-400 min-w-0 flex-shrink-0">{key}:</span>
                              <span className="text-white break-all flex-1">{value}</span>
                              <div className="flex flex-col space-y-1 flex-shrink-0">
                                {badges.map((badge, index) => (
                                  <span
                                    key={index}
                                    className={`px-2 py-0.5 rounded text-xs font-bold border flex-shrink-0 ${getBadgeClasses(badge)}`}
                                  >
                                    {badge}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-3 text-xs text-gray-400">
                    Headers: {Object.keys(headers).length} | Total entries: {Object.values(headers).flat().length}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={handleParse}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Zap className="h-5 w-5" />
                <span>Parse Headers</span>
              </button>
              
              <button
                onClick={handleClear}
                className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* Structured Email Data Display */}
            {Object.keys(parsedData).length > 0 && (
              <div className="space-y-8 mb-16">
                <div className="text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    Email Analysis Results
                  </h2>
                  <p className="text-gray-400">Structured breakdown of email components and security indicators</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Email Information */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <Mail className="h-6 w-6 text-blue-400" />
                        <h3 className="text-xl font-bold text-white">Email Information</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {parsedData.sender && (
                          <div className="flex items-start space-x-3">
                            <User className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Sender</div>
                              <div className="text-white font-mono text-sm break-all">{parsedData.sender}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.recipient && (
                          <div className="flex items-start space-x-3">
                            <AtSign className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Recipient</div>
                              <div className="text-white font-mono text-sm break-all">{parsedData.recipient}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.subject && (
                          <div className="flex items-start space-x-3">
                            <FileText className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Subject</div>
                              <div className="text-white font-mono text-sm break-all">{parsedData.subject}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.date && (
                          <div className="flex items-start space-x-3">
                            <Calendar className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Date</div>
                              <div className="text-white font-mono text-sm">{parsedData.date}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.messageId && (
                          <div className="flex items-start space-x-3">
                            <Flag className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Message ID</div>
                              <div className="text-white font-mono text-xs break-all">{parsedData.messageId}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Security & Routing Information */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <Shield className="h-6 w-6 text-red-400" />
                        <h3 className="text-xl font-bold text-white">Security & Routing</h3>
                      </div>
                      
                      <div className="space-y-4">
                        {parsedData.senderIP && (
                          <div className="flex items-start space-x-3">
                            <Globe className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Sender IP</div>
                              <div className="text-white font-mono text-sm">{parsedData.senderIP}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.replyTo && (
                          <div className="flex items-start space-x-3">
                            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Reply-To</div>
                              <div className="text-white font-mono text-sm break-all">{parsedData.replyTo}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.returnPath && (
                          <div className="flex items-start space-x-3">
                            <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Return Path</div>
                              <div className="text-white font-mono text-sm break-all">{parsedData.returnPath}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.priority && (
                          <div className="flex items-start space-x-3">
                            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">Priority</div>
                              <div className="text-white font-mono text-sm">{parsedData.priority}</div>
                            </div>
                          </div>
                        )}
                        
                        {parsedData.userAgent && (
                          <div className="flex items-start space-x-3">
                            <Server className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="text-sm text-gray-400">User Agent</div>
                              <div className="text-white font-mono text-xs break-all">{parsedData.userAgent}</div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Authentication Results */}
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center space-x-3 mb-6">
                        <Lock className="h-6 w-6 text-green-400" />
                        <h3 className="text-xl font-bold text-white">Authentication Results</h3>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getAuthStatusIcon(parsedData.spfResult)}
                            <div>
                              <div className="text-sm font-medium text-white">SPF</div>
                              <div className="text-xs text-gray-400">Sender Policy Framework</div>
                            </div>
                          </div>
                          <div className={`font-mono text-sm ${getAuthStatusColor(parsedData.spfResult)}`}>
                            {parsedData.spfResult || 'Not Available'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getAuthStatusIcon(parsedData.dkimResult)}
                            <div>
                              <div className="text-sm font-medium text-white">DKIM</div>
                              <div className="text-xs text-gray-400">DomainKeys Identified Mail</div>
                            </div>
                          </div>
                          <div className={`font-mono text-sm ${getAuthStatusColor(parsedData.dkimResult)}`}>
                            {parsedData.dkimResult || 'Not Available'}
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getAuthStatusIcon(parsedData.dmarcResult)}
                            <div>
                              <div className="text-sm font-medium text-white">DMARC</div>
                              <div className="text-xs text-gray-400">Domain-based Message Authentication</div>
                            </div>
                          </div>
                          <div className={`font-mono text-sm ${getAuthStatusColor(parsedData.dmarcResult)}`}>
                            {parsedData.dmarcResult || 'Not Available'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Server Path */}
                  {parsedData.receivedServers && parsedData.receivedServers.length > 0 && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                        <div className="flex items-center space-x-3 mb-6">
                          <Server className="h-6 w-6 text-purple-400" />
                          <h3 className="text-xl font-bold text-white">Email Path</h3>
                        </div>
                        
                        <div className="space-y-3">
                          {parsedData.receivedServers.slice(0, 5).map((server, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-800/30 rounded-lg">
                              <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-xs text-purple-400 font-bold">
                                {index + 1}
                              </div>
                              <div className="flex-1 font-mono text-sm text-white break-all">
                                {server}
                              </div>
                            </div>
                          ))}
                          {parsedData.receivedServers.length > 5 && (
                            <div className="text-center text-gray-400 text-sm">
                              +{parsedData.receivedServers.length - 5} more servers
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
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

export default EmailAnalyzerPage;