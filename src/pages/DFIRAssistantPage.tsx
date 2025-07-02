import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Bot,
  Brain,
  Zap,
  Shield,
  Activity,
  Heart,
  Sparkles,
  FileSearch,
  MessageSquare,
  Upload,
  Search,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Database,
  Code,
  Eye,
  Cpu,
  Network
} from 'lucide-react';

const DFIRAssistantPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const features = [
    {
      icon: FileSearch,
      title: "Log Analysis",
      description: "Upload Windows Event Logs, Syslog, or custom log files for AI-powered pattern detection and anomaly identification.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      icon: Brain,
      title: "Memory Dump Triage",
      description: "Automated analysis of memory dumps with Volatility integration, process analysis, and malware detection.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      icon: Network,
      title: "Network Traffic Analysis",
      description: "PCAP file analysis with protocol breakdown, suspicious connection detection, and IOC extraction.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    },
    {
      icon: AlertTriangle,
      title: "Incident Correlation",
      description: "Cross-reference multiple data sources to build comprehensive incident timelines and attack narratives.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20"
    },
    {
      icon: Target,
      title: "IOC Generation",
      description: "Automatically extract and validate Indicators of Compromise from analyzed artifacts and generate YARA rules.",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20"
    },
    {
      icon: MessageSquare,
      title: "Natural Language Queries",
      description: "Ask questions about your investigation in plain English and get detailed, contextual responses.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20"
    }
  ];

  const capabilities = [
    {
      icon: Cpu,
      title: "Advanced ML Models",
      description: "Powered by state-of-the-art machine learning models trained on forensic datasets"
    },
    {
      icon: Database,
      title: "Threat Intelligence",
      description: "Integrated with multiple threat intelligence feeds for real-time IOC validation"
    },
    {
      icon: Code,
      title: "Custom Playbooks",
      description: "Create and share investigation playbooks with automated analysis workflows"
    },
    {
      icon: Eye,
      title: "Visual Analytics",
      description: "Interactive dashboards and visualizations for complex investigation data"
    }
  ];

  const useCases = [
    "Malware Analysis & Reverse Engineering",
    "Incident Response & Threat Hunting",
    "Digital Forensics Investigations",
    "Security Operations Center (SOC) Analysis",
    "Compliance & Audit Support",
    "Training & Education"
  ];

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
          {/* Hero Section */}
          <div className="text-center mb-20">
            <div className="relative group mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-red-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-red-500/20 rounded-3xl p-16 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  <div className="relative">
                    <Bot className="h-20 w-20 text-red-400 animate-pulse" />
                    <div className="absolute -top-2 -right-2">
                      <Sparkles className="h-8 w-8 text-yellow-400 animate-bounce" />
                    </div>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                    DFIR Assistant
                  </h1>
                </div>
                
                <div className="relative bg-gray-900/60 border border-gray-700/50 rounded-2xl p-8 backdrop-blur-sm mb-8">
                  <p className="text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed">
                    AI-powered digital forensics and incident response assistant. Upload logs, memory dumps, 
                    and network captures to get intelligent analysis, automated triage, and investigation insights.
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-4 mb-8">
                  <div className="flex items-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2">
                    <Clock className="h-5 w-5 text-yellow-400" />
                    <span className="text-yellow-300 font-semibold">Coming Soon</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-green-500/20 border border-green-500/30 rounded-lg px-4 py-2">
                    <Brain className="h-5 w-5 text-green-400" />
                    <span className="text-green-300 font-semibold">AI-Powered</span>
                  </div>
                </div>

                <p className="text-xl text-gray-400 italic">
                  "The future of digital forensics is here. Let AI accelerate your investigations."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DFIRAssistantPage;