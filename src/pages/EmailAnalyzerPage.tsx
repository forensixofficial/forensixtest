import React, { useState, useEffect, useMemo } from 'react';
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
  Unlock,
  Info,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  AlertCircle,
  ShieldCheck,
  ShieldOff,
  Link,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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
  securityWarnings?: SecurityWarning[];
  suspiciousIndicators?: SuspiciousIndicator[];
}

interface SecurityWarning {
  type: string;
  message: string;
  severity: 'high' | 'medium' | 'low';
  relatedHeader?: string;
}

interface SuspiciousIndicator {
  type: string;
  value: string;
  description: string;
  severity: 'high' | 'medium' | 'low';
}

const EmailAnalyzerPage = () => {
  const [input, setInput] = useState('');
  const [headers, setHeaders] = useState<Record<string, string[]>>({});
  const [parsedData, setParsedData] = useState<ParsedEmailData>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHeaders, setFilteredHeaders] = useState<Record<string, string[]>>({});
  const [expandedSections, setExpandedSections] = useState({
    emailInfo: true,
    security: true,
    authentication: true,
    path: true
  });
  const [copied, setCopied] = useState(false);

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

  // Parse email headers into a structured object
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

  // Extract structured data from parsed headers
  function extractStructuredData(headers: Record<string, string[]>): ParsedEmailData {
    const data: ParsedEmailData = {};
    const securityWarnings: SecurityWarning[] = [];
    const suspiciousIndicators: SuspiciousIndicator[] = [];

    // Extract basic email information
    if (headers['From']) {
      data.sender = headers['From'][0];
      const senderAnalysis = analyzeEmailAddress(data.sender);
      if (senderAnalysis.warnings.length > 0) {
        securityWarnings.push(...senderAnalysis.warnings);
      }
      if (senderAnalysis.indicators.length > 0) {
        suspiciousIndicators.push(...senderAnalysis.indicators);
      }
    }
    
    if (headers['To']) {
      data.recipient = headers['To'][0];
    }
    
    if (headers['Subject']) {
      data.subject = headers['Subject'][0];
      // Check for urgency indicators in subject
      if (/(urgent|immediate|action required|security alert)/i.test(data.subject)) {
        securityWarnings.push({
          type: 'Urgent Subject',
          message: 'Subject line contains urgency indicators that may be used in phishing attempts',
          severity: 'medium',
          relatedHeader: 'Subject'
        });
      }
    }
    
    if (headers['Date']) {
      data.date = headers['Date'][0];
    }
    
    if (headers['Message-ID']) {
      data.messageId = headers['Message-ID'][0];
    }
    
    if (headers['Reply-To']) {
      data.replyTo = headers['Reply-To'][0];
      // Check if reply-to differs from sender
      if (data.sender && data.replyTo && !isSameDomain(data.sender, data.replyTo)) {
        securityWarnings.push({
          type: 'Reply-To Mismatch',
          message: 'Reply-To address is different from sender address',
          severity: 'high',
          relatedHeader: 'Reply-To'
        });
      }
    }
    
    if (headers['Return-Path']) {
      data.returnPath = headers['Return-Path'][0];
      // Check if return-path differs from sender
      if (data.sender && data.returnPath && !isSameDomain(data.sender, data.returnPath)) {
        securityWarnings.push({
          type: 'Return-Path Mismatch',
          message: 'Return-Path address is different from sender address',
          severity: 'high',
          relatedHeader: 'Return-Path'
        });
      }
    }
    
    if (headers['Content-Type']) {
      data.contentType = headers['Content-Type'][0];
      // Check for HTML content
      if (data.contentType.includes('text/html')) {
        securityWarnings.push({
          type: 'HTML Content',
          message: 'Email contains HTML which may include malicious content',
          severity: 'medium',
          relatedHeader: 'Content-Type'
        });
      }
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

    // Check for high priority flags
    if (data.priority && /high|1|urgent/i.test(data.priority)) {
      securityWarnings.push({
        type: 'High Priority',
        message: 'Email marked as high priority - common tactic in phishing',
        severity: 'medium',
        relatedHeader: headers['X-Priority'] ? 'X-Priority' : 
                     headers['X-MSMail-Priority'] ? 'X-MSMail-Priority' : 
                     headers['Importance'] ? 'Importance' : ''
      });
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
          
          // Check for internal IPs
          if (isInternalIP(ipMatch[1])) {
            securityWarnings.push({
              type: 'Internal IP',
              message: `Email appears to originate from internal IP address: ${ipMatch[1]}`,
              severity: 'high',
              relatedHeader: 'Received'
            });
          }
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
        if (spfMatch[1].toLowerCase() === 'fail') {
          securityWarnings.push({
            type: 'SPF Failure',
            message: 'SPF check failed - email may be spoofed',
            severity: 'high',
            relatedHeader: 'Received-SPF'
          });
        }
      }
    }

    if (headers['Authentication-Results']) {
      const authResults = headers['Authentication-Results'][0];
      
      // Extract SPF result
      const spfMatch = authResults.match(/spf=([^;\s]+)/i);
      if (spfMatch) {
        data.spfResult = spfMatch[1];
        if (spfMatch[1].toLowerCase() === 'fail') {
          securityWarnings.push({
            type: 'SPF Failure',
            message: 'SPF check failed - email may be spoofed',
            severity: 'high',
            relatedHeader: 'Authentication-Results'
          });
        }
      }
      
      // Extract DKIM result
      const dkimMatch = authResults.match(/dkim=([^;\s]+)/i);
      if (dkimMatch) {
        data.dkimResult = dkimMatch[1];
        if (dkimMatch[1].toLowerCase() === 'fail') {
          securityWarnings.push({
            type: 'DKIM Failure',
            message: 'DKIM signature verification failed - email may be altered',
            severity: 'high',
            relatedHeader: 'Authentication-Results'
          });
        }
      }
      
      // Extract DMARC result
      const dmarcMatch = authResults.match(/dmarc=([^;\s]+)/i);
      if (dmarcMatch) {
        data.dmarcResult = dmarcMatch[1];
        if (dmarcMatch[1].toLowerCase() === 'fail') {
          securityWarnings.push({
            type: 'DMARC Failure',
            message: 'DMARC check failed - email may not be authorized by domain owner',
            severity: 'high',
            relatedHeader: 'Authentication-Results'
          });
        }
      }
    }

    // Add security warnings and indicators to parsed data
    if (securityWarnings.length > 0) {
      data.securityWarnings = securityWarnings;
    }
    if (suspiciousIndicators.length > 0) {
      data.suspiciousIndicators = suspiciousIndicators;
    }

    return data;
  }

  // Helper function to check if two email addresses are from the same domain
  function isSameDomain(email1: string, email2: string): boolean {
    const domain1 = email1.split('@')[1]?.toLowerCase();
    const domain2 = email2.split('@')[1]?.toLowerCase();
    return domain1 === domain2;
  }

  // Helper function to check if an IP is internal
  function isInternalIP(ip: string): boolean {
    return /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(ip);
  }

  // Analyze email address for suspicious patterns
  function analyzeEmailAddress(email: string): { warnings: SecurityWarning[], indicators: SuspiciousIndicator[] } {
    const warnings: SecurityWarning[] = [];
    const indicators: SuspiciousIndicator[] = [];
    const lowerEmail = email.toLowerCase();

    // Extract domain
    const domainMatch = lowerEmail.match(/@([^>\s]+)/);
    if (!domainMatch) return { warnings, indicators };
    
    const domain = domainMatch[1];

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

    // Check for known malicious domains
    for (const maliciousDomain of knownMaliciousDomains) {
      if (domain.includes(maliciousDomain.toLowerCase())) {
        warnings.push({
          type: 'Known Malicious Domain',
          message: `Sender domain matches known malicious domain: ${maliciousDomain}`,
          severity: 'high',
          relatedHeader: 'From'
        });
        indicators.push({
          type: 'Malicious Domain',
          value: domain,
          description: `Domain matches known malicious domain: ${maliciousDomain}`,
          severity: 'high'
        });
        break;
      }
    }

    // Check for risky TLDs
    for (const tld of riskyTLDs) {
      if (domain.endsWith(tld)) {
        warnings.push({
          type: 'High-Risk TLD',
          message: `Sender domain uses high-risk top-level domain: ${tld}`,
          severity: 'medium',
          relatedHeader: 'From'
        });
        indicators.push({
          type: 'Risky TLD',
          value: domain,
          description: `Domain uses high-risk top-level domain: ${tld}`,
          severity: 'medium'
        });
        break;
      }
    }

    // Check for suspicious keywords in domain
    for (const keyword of suspiciousDomainKeywords) {
      if (domain.includes(keyword)) {
        warnings.push({
          type: 'Suspicious Domain Keywords',
          message: `Sender domain contains suspicious keyword: ${keyword}`,
          severity: 'medium',
          relatedHeader: 'From'
        });
        indicators.push({
          type: 'Suspicious Keyword',
          value: keyword,
          description: `Domain contains suspicious keyword: ${keyword}`,
          severity: 'medium'
        });
        break;
      }
    }

    return { warnings, indicators };
  }

  // Get highlight color for header based on analysis
  function getHighlightColor(key: string, value: string): string | null {
    const lowerKey = key.toLowerCase();
    const lowerValue = value.toLowerCase();

    // Check for authentication failures
    if ((lowerKey.includes("spf") || lowerKey.includes("dkim") || lowerKey.includes("dmarc") || 
         lowerKey.includes("authentication-results")) && 
        lowerValue.includes("fail")) {
      return "red";
    }

    // Check for internal IPs in Received headers
    if (lowerKey === "received" && 
        /\b(127\.|10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])|localhost)\b/i.test(value)) {
      return "red";
    }

    // Check email headers for suspicious patterns
    if (lowerKey === "from" || lowerKey === "reply-to" || lowerKey === "return-path") {
      const domainMatch = lowerValue.match(/@([^>\s]+)/);
      if (domainMatch) {
        const domain = domainMatch[1];
        
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

        // Check for known malicious domains
        for (const maliciousDomain of knownMaliciousDomains) {
          if (domain.includes(maliciousDomain.toLowerCase())) {
            return "red";
          }
        }

        // Check for risky TLDs
        for (const tld of riskyTLDs) {
          if (domain.endsWith(tld)) {
            return "orange";
          }
        }

        // Check for suspicious keywords in domain
        for (const keyword of suspiciousDomainKeywords) {
          if (domain.includes(keyword)) {
            return "yellow";
          }
        }
      }
    }

    // Check for header mismatches
    if ((lowerKey === "reply-to" || lowerKey === "return-path") && 
        parsedData.sender && !isSameDomain(lowerValue, parsedData.sender)) {
      return "orange";
    }

    return null;
  }

  // Get badge texts for header based on analysis
  function getBadgeTexts(key: string, value: string): string[] {
    const lowerKey = key.toLowerCase();
    const lowerValue = value.toLowerCase();
    const badges: string[] = [];

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
      const domainMatch = lowerValue.match(/@([^>\s]+)/);
      if (domainMatch) {
        const domain = domainMatch[1];
        
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
        for (const keyword of suspiciousDomainKeywords) {
          if (domain.includes(keyword)) {
            badges.push("Suspicious Keywords");
            break;
          }
        }
      }
    }

    // Check for header mismatches
    if ((lowerKey === "reply-to" || lowerKey === "return-path") && 
        parsedData.sender && !isSameDomain(lowerValue, parsedData.sender)) {
      badges.push("Header Mismatch");
    }

    return badges;
  }

  // Get badge classes based on badge type
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

  // Get icon for authentication status
  const getAuthStatusIcon = (result?: string) => {
    if (!result) return <XCircle className="h-4 w-4 text-gray-400" />;
    
    const status = result.toLowerCase();
    if (status === 'pass') return <CheckCircle className="h-4 w-4 text-green-400" />;
    if (status === 'fail') return <XCircle className="h-4 w-4 text-red-400" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
  };

  // Get color for authentication status
  const getAuthStatusColor = (result?: string) => {
    if (!result) return 'text-gray-400';
    
    const status = result.toLowerCase();
    if (status === 'pass') return 'text-green-400';
    if (status === 'fail') return 'text-red-400';
    return 'text-yellow-400';
  };

  // Toggle section expansion
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle parse button click
  const handleParse = async () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const parsed = parseEmailHeaders(input);
      setHeaders(parsed);
      const structured = extractStructuredData(parsed);
      setParsedData(structured);
    } catch (error) {
      console.error("Error parsing email headers:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle clear button click
  const handleClear = () => {
    setInput('');
    setHeaders({});
    setParsedData({});
    setSearchTerm('');
  };

  // Copy text to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load sample headers
  const loadSample = () => {
    setInput(sampleHeaders);
  };

  // Filter headers based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredHeaders(headers);
      return;
    }

    const filtered: Record<string, string[]> = {};
    const lowerSearchTerm = searchTerm.toLowerCase();

    for (const [key, values] of Object.entries(headers)) {
      const filteredValues = values.filter(value => 
        key.toLowerCase().includes(lowerSearchTerm) || 
        value.toLowerCase().includes(lowerSearchTerm)
      );

      if (filteredValues.length > 0) {
        filtered[key] = filteredValues;
      }
    }

    setFilteredHeaders(filtered);
  }, [searchTerm, headers]);

  // Calculate security score
  const securityScore = useMemo(() => {
    if (!parsedData.securityWarnings) return 100;
    
    const highSeverity = parsedData.securityWarnings.filter(w => w.severity === 'high').length;
    const mediumSeverity = parsedData.securityWarnings.filter(w => w.severity === 'medium').length;
    const lowSeverity = parsedData.securityWarnings.filter(w => w.severity === 'low').length;
    
    // Deduct points based on severity
    let score = 100;
    score -= highSeverity * 30;
    score -= mediumSeverity * 15;
    score -= lowSeverity * 5;
    
    // Ensure score doesn't go below 0
    return Math.max(0, Math.round(score));
  }, [parsedData.securityWarnings]);

  // Get security score color
  const getSecurityScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 50) return 'text-yellow-400';
    return 'text-red-400';
  };

  // Get security score icon
  const getSecurityScoreIcon = (score: number) => {
    if (score >= 80) return <ShieldCheck className="h-5 w-5 text-green-400" />;
    if (score >= 50) return <Shield className="h-5 w-5 text-yellow-400" />;
    return <ShieldOff className="h-5 w-5 text-red-400" />;
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative group mb-8"
            >
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
            </motion.div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-6xl mx-auto">
            {/* Input/Output Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Input Section */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative group"
              >
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
              </motion.div>

              {/* Output Section */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="relative group"
              >
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
                      {Object.keys(headers).length > 0 && (
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search headers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-3 py-1 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-colors w-40"
                          />
                          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="h-96 bg-gray-800/30 border border-gray-600/30 rounded-lg p-4 overflow-auto">
                    <div className="space-y-2 font-mono text-sm">
                      {Object.entries(filteredHeaders).length === 0 && (
                        <p className="text-gray-400">
                          {Object.keys(headers).length === 0 
                            ? "No parsed headers yet." 
                            : "No headers match your search."}
                        </p>
                      )}

                      {Object.entries(filteredHeaders).map(([key, values]) =>
                        values.map((value, i) => {
                          const badges = getBadgeTexts(key, value);
                          
                          return (
                            <div 
                              key={`${key}-${i}`} 
                              className="flex items-start space-x-2 py-1 hover:bg-gray-700/20 rounded px-2 transition-colors"
                            >
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
                    Showing {Object.keys(filteredHeaders).length} of {Object.keys(headers).length} headers | 
                    Total entries: {Object.values(filteredHeaders).flat().length} of {Object.values(headers).flat().length}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex justify-center space-x-4 mb-12"
            >
              <button
                onClick={handleParse}
                disabled={!input.trim() || isAnalyzing}
                className={`bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none ${isAnalyzing ? 'cursor-wait' : ''}`}
              >
                {isAnalyzing ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <Zap className="h-5 w-5" />
                )}
                <span>{isAnalyzing ? 'Analyzing...' : 'Parse Headers'}</span>
              </button>
              
              <button
                onClick={handleClear}
                className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Clear All</span>
              </button>
            </motion.div>

            {/* Structured Email Data Display */}
            {Object.keys(parsedData).length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="space-y-8 mb-16"
              >
                <div className="text-center">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                    Email Analysis Results
                  </h2>
                  <p className="text-gray-400">Structured breakdown of email components and security indicators</p>
                </div>

                {/* Security Score Card */}
                {parsedData.securityWarnings && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Shield className="h-6 w-6 text-purple-400" />
                          <h3 className="text-xl font-bold text-white">Security Assessment</h3>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-xs text-gray-400">Security Score</div>
                            <div className={`text-2xl font-bold ${getSecurityScoreColor(securityScore)}`}>
                              {securityScore}/100
                            </div>
                          </div>
                          {getSecurityScoreIcon(securityScore)}
                        </div>
                      </div>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">High Severity</div>
                            <div className="text-red-400 font-bold">
                              {parsedData.securityWarnings.filter(w => w.severity === 'high').length}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">Medium Severity</div>
                            <div className="text-yellow-400 font-bold">
                              {parsedData.securityWarnings.filter(w => w.severity === 'medium').length}
                            </div>
                          </div>
                        </div>
                        <div className="bg-gray-800/30 rounded-lg p-4">
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-400">Low Severity</div>
                            <div className="text-blue-400 font-bold">
                              {parsedData.securityWarnings.filter(w => w.severity === 'low').length}
                            </div>
                          </div>
                        </div>
                      </div>

                      {parsedData.securityWarnings.length > 0 && (
                        <div className="mt-6">
                          <div className="text-sm font-medium text-gray-400 mb-3">Security Warnings</div>
                          <div className="space-y-3">
                            {parsedData.securityWarnings.map((warning, index) => (
                              <div 
                                key={index} 
                                className={`p-3 rounded-lg border ${
                                  warning.severity === 'high' ? 'border-red-500/30 bg-red-500/10' :
                                  warning.severity === 'medium' ? 'border-orange-500/30 bg-orange-500/10' :
                                  'border-yellow-500/30 bg-yellow-500/10'
                                }`}
                              >
                                <div className="flex items-start space-x-3">
                                  {warning.severity === 'high' ? (
                                    <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                                  ) : warning.severity === 'medium' ? (
                                    <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                  ) : (
                                    <Info className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="font-medium text-white">{warning.type}</div>
                                    <div className="text-sm text-gray-300">{warning.message}</div>
                                    {warning.relatedHeader && (
                                      <div className="text-xs text-gray-400 mt-1">
                                        Related header: <span className="text-cyan-400">{warning.relatedHeader}</span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Email Information Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Basic Email Information */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                      <button 
                        onClick={() => toggleSection('emailInfo')}
                        className="w-full flex items-center justify-between p-6"
                      >
                        <div className="flex items-center space-x-3">
                          <Mail className="h-6 w-6 text-blue-400" />
                          <h3 className="text-xl font-bold text-white">Email Information</h3>
                        </div>
                        {expandedSections.emailInfo ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.emailInfo && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6"
                          >
                            <div className="space-y-4">
                              {parsedData.sender && (
                                <div className="flex items-start space-x-3">
                                  <User className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400">Sender</div>
                                    <div className="text-white font-mono text-sm break-all">{parsedData.sender}</div>
                                    {parsedData.suspiciousIndicators?.filter(i => i.type.includes('Domain') || i.type.includes('Keyword')).map((indicator, idx) => (
                                      <div key={idx} className="text-xs text-yellow-400 mt-1">
                                        <span className="font-medium">{indicator.type}:</span> {indicator.description}
                                      </div>
                                    ))}
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
                                    {parsedData.subject && /(urgent|immediate|action required|security alert)/i.test(parsedData.subject) && (
                                      <div className="text-xs text-yellow-400 mt-1">
                                        Contains urgency indicators - common in phishing attempts
                                      </div>
                                    )}
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Security & Routing Information */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                      <button 
                        onClick={() => toggleSection('security')}
                        className="w-full flex items-center justify-between p-6"
                      >
                        <div className="flex items-center space-x-3">
                          <Shield className="h-6 w-6 text-red-400" />
                          <h3 className="text-xl font-bold text-white">Security & Routing</h3>
                        </div>
                        {expandedSections.security ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.security && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6"
                          >
                            <div className="space-y-4">
                              {parsedData.senderIP && (
                                <div className="flex items-start space-x-3">
                                  <Globe className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400">Sender IP</div>
                                    <div className="text-white font-mono text-sm">{parsedData.senderIP}</div>
                                    {isInternalIP(parsedData.senderIP) && (
                                      <div className="text-xs text-red-400 mt-1">
                                        Internal IP address - potential spoofing attempt
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {parsedData.replyTo && (
                                <div className="flex items-start space-x-3">
                                  <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400">Reply-To</div>
                                    <div className="text-white font-mono text-sm break-all">{parsedData.replyTo}</div>
                                    {parsedData.sender && !isSameDomain(parsedData.sender, parsedData.replyTo) && (
                                      <div className="text-xs text-orange-400 mt-1">
                                        Different domain from sender - potential phishing attempt
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {parsedData.returnPath && (
                                <div className="flex items-start space-x-3">
                                  <MapPin className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400">Return Path</div>
                                    <div className="text-white font-mono text-sm break-all">{parsedData.returnPath}</div>
                                    {parsedData.sender && !isSameDomain(parsedData.sender, parsedData.returnPath) && (
                                      <div className="text-xs text-orange-400 mt-1">
                                        Different domain from sender - potential phishing attempt
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {parsedData.priority && (
                                <div className="flex items-start space-x-3">
                                  <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1">
                                    <div className="text-sm text-gray-400">Priority</div>
                                    <div className="text-white font-mono text-sm">{parsedData.priority}</div>
                                    {/high|1|urgent/i.test(parsedData.priority) && (
                                      <div className="text-xs text-yellow-400 mt-1">
                                        High priority - common tactic in phishing emails
                                      </div>
                                    )}
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Authentication Results */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                    <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                      <button 
                        onClick={() => toggleSection('authentication')}
                        className="w-full flex items-center justify-between p-6"
                      >
                        <div className="flex items-center space-x-3">
                          <Lock className="h-6 w-6 text-green-400" />
                          <h3 className="text-xl font-bold text-white">Authentication Results</h3>
                        </div>
                        {expandedSections.authentication ? (
                          <ChevronUp className="h-5 w-5 text-gray-400" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                      
                      <AnimatePresence>
                        {expandedSections.authentication && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="px-6 pb-6"
                          >
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
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Server Path */}
                  {parsedData.receivedServers && parsedData.receivedServers.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl backdrop-blur-sm">
                        <button 
                          onClick={() => toggleSection('path')}
                          className="w-full flex items-center justify-between p-6"
                        >
                          <div className="flex items-center space-x-3">
                            <Server className="h-6 w-6 text-purple-400" />
                            <h3 className="text-xl font-bold text-white">Email Path</h3>
                          </div>
                          {expandedSections.path ? (
                            <ChevronUp className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        
                        <AnimatePresence>
                          {expandedSections.path && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="px-6 pb-6"
                            >
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
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Help Section */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Info className="h-6 w-6 text-blue-400" />
                <h3 className="text-xl font-bold text-white">How to Use This Tool</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Copy Email Headers</h4>
                      <p className="text-sm text-gray-400">
                        In your email client, find the option to "View Headers" or "Show Original" and copy all the text.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Paste and Analyze</h4>
                      <p className="text-sm text-gray-400">
                        Paste the headers into the left panel and click "Parse Headers" to analyze the email.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-400">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Review Results</h4>
                      <p className="text-sm text-gray-400">
                        Check the parsed headers on the right and the detailed analysis below for security insights.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400">
                      4
                    </div>
                    <div>
                      <h4 className="font-medium text-white">Understand Warnings</h4>
                      <p className="text-sm text-gray-400">
                        Pay attention to any security warnings highlighted in red or orange for potential threats.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EmailAnalyzerPage;
