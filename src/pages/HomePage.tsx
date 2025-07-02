import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Play,
  Target,
  Image,
  Wrench,
  GraduationCap,
  Globe,
  FileSearch,
  Bot,
  ChevronRight,
  Zap,
  Search,
  Upload,
  Heart,
  UserPlus,
  Database,
  Scan,
  Shield,
  Activity,
  Star,
  Quote,
  Code,
  Lock,
  Hash,
  Mail,
  Terminal,
  Clock,
  Eye,
  BookOpen,
  FileText,
  FolderOpen
} from 'lucide-react';

const HomePage = () => {
  const [iocQuery, setIocQuery] = useState('');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('the-lab');
  const [activeToolIndex, setActiveToolIndex] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const featuredTools = [
    {
      id: 'the-lab',
      title: 'The Lab',
      description: 'Digital forensics encoding and decoding laboratory for transforming data between different formats during investigations.',
      icon: Code,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
      hoverBg: 'hover:bg-purple-500/20',
      link: '/the-lab',
      images: ['/thelab1.png', '/thelab2.png'],
      features: [
        { icon: Lock, label: 'Base64' },
        { icon: Hash, label: 'Hex' },
        { icon: Globe, label: 'URL' }
      ]
    },
    {
      id: 'email-analyzer',
      title: 'Email Analyzer',
      description: 'Forensic email header analysis tool to detect phishing attempts and suspicious patterns in email communications.',
      icon: Mail,
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/20',
      textColor: 'text-red-400',
      hoverBg: 'hover:bg-red-500/20',
      link: '/email-analyzer',
      images: ['/emailanalyzer1.png', '/emailanalyzer2.png'],
      features: [
        { icon: Shield, label: 'Authentication Analysis' },
        { icon: Search, label: 'Phishing Detection' },
        { icon: Globe, label: 'Source Tracking' }
      ]
    },
    {
      id: 'exiftool',
      title: 'ExifTool',
      description: 'Extract comprehensive metadata from images and documents. Analyze EXIF data, GPS coordinates, and hidden information.',
      icon: Image,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
      hoverBg: 'hover:bg-purple-500/20',
      link: '/exiftool',
      images: ['/exiftool1.png', '/exiftool2.png'],
      features: [
        { icon: Image, label: 'EXIF Data' },
        { icon: Globe, label: 'GPS Coordinates' },
        { icon: FileSearch, label: 'Hidden Metadata' }
      ]
    },
    {
      id: 'cheatsheet',
      title: 'DFIR CheatSheet',
      description: 'Comprehensive reference guide for Windows forensic artifacts, registry locations, and digital evidence sources.',
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      textColor: 'text-blue-400',
      hoverBg: 'hover:bg-blue-500/20',
      link: '/cheatsheet',
      images: ['/cheatsheet1.png', '/cheatsheet2.png'],
      features: [
        { icon: Database, label: 'Registry Artifacts' },
        { icon: FileText, label: 'File System Evidence' },
        { icon: Globe, label: 'Browser Artifacts' }
      ]
    },
    {
      id: 'ioc-extractor',
      title: 'IOC Extractor',
      description: 'Extract Indicators of Compromise (IOCs) from any text, code, or malware samples. Automatically identify URLs, IPs, hashes, and more.',
      icon: Search,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      textColor: 'text-orange-400',
      hoverBg: 'hover:bg-orange-500/20',
      link: '/ioc-extractor',
      images: ['/iocextractor1.png', '/iocextractor2.png'],
      features: [
        { icon: Globe, label: 'URLs & Domains' },
        { icon: Hash, label: 'File Hashes' },
        { icon: FolderOpen, label: 'File Paths' }
      ]
    }
  ];

  const features = [
    {
      icon: Target,
      title: "DFIR Challenges",
      description: "Realistic DFIR simulations using logs, disk images, PCAPs, and memory dumps. Users solve cases and earn badges.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
      hoverBg: "hover:bg-blue-500/20",
      link: "/challenges"
    },
    {
      icon: GraduationCap,
      title: "Forensics Courses",
      description: "Structured learning paths: Windows forensics, memory analysis, incident response, malware triage, etc.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-400",
      hoverBg: "hover:bg-orange-500/20",
      link: "/courses"
    },
    {
      icon: Wrench,
      title: "Forensics Tools",
      description: "A categorized toolbox with download links and usage tips for DFIR tools (Volatility, MFTECmd, Autopsy, etc.)",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
      textColor: "text-green-400",
      hoverBg: "hover:bg-green-500/20",
      link: "/tools"
    },
    {
      icon: BookOpen,
      title: "DFIR CheatSheet",
      description: "Comprehensive reference guide for Windows forensic artifacts, registry locations, and digital evidence sources.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      textColor: "text-blue-400",
      hoverBg: "hover:bg-blue-500/20",
      link: "/cheatsheet"
    },
    {
      icon: Code,
      title: "The Lab",
      description: "Digital forensics encoding and decoding laboratory for transforming data between different formats during investigations.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-400",
      hoverBg: "hover:bg-purple-500/20",
      link: "/the-lab"
    },
    {
      icon: Globe,
      title: "IOC Search",
      description: "Paste an IP, domain, or file hash to get enriched results from VirusTotal, Hybrid Analysis, Intezer, and more.",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-500/10",
      borderColor: "border-teal-500/20",
      textColor: "text-teal-400",
      hoverBg: "hover:bg-teal-500/20",
      link: "/ioc-search"
    },
    {
      icon: Mail,
      title: "Email Analyzer",
      description: "Forensic email header analysis tool to detect phishing attempts and suspicious patterns in email communications.",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      textColor: "text-red-400",
      hoverBg: "hover:bg-red-500/20",
      link: "/email-analyzer"
    },
    {
      icon: Image,
      title: "ExifTool Analyzer",
      description: "Extract comprehensive metadata from images and documents. Analyze EXIF data, GPS coordinates, and hidden information.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      textColor: "text-purple-400",
      hoverBg: "hover:bg-purple-500/20",
      link: "/exiftool"
    },
    {
      icon: Bot,
      title: "AI-Powered DFIR Assistant",
      description: "Upload logs or memory dumps and receive triage summaries, detection suggestions, and basic analysis.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      textColor: "text-indigo-400",
      hoverBg: "hover:bg-indigo-500/20",
      link: "/dfir-assistant"
    },
    {
      icon: Search,
      title: "IOC Extractor",
      description: "Extract Indicators of Compromise (IOCs) from any text, code, or malware samples. Automatically identify URLs, IPs, hashes, and more.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      textColor: "text-orange-400",
      hoverBg: "hover:bg-orange-500/20",
      link: "/ioc-extractor"
    }
  ];

  const stats = [
    { label: "IOC Database Entries", value: "2.4M+", icon: Database, color: "text-cyan-400" },
    { label: "Threat Indicators Queried", value: "847K+", icon: Scan, color: "text-green-400" }
  ];

  const testimonials = [
    {
      name: "Alex M.",
      avatar: "👨‍💻",
      rating: 5,
      text: "Been using ForensiX for 6 months now. The challenges are incredibly realistic and have helped me level up my incident response skills significantly."
    },
    {
      name: "Sarah K.",
      avatar: "👩‍🔬",
      rating: 4,
      text: "Great platform for learning DFIR. The tool collection is comprehensive and the AI assistant actually provides useful insights. Could use more beginner content though."
    },
    {
      name: "Mike Rodriguez",
      avatar: "👨‍🔧",
      rating: 5,
      text: "ForensiX has become my go-to resource for staying current with forensic techniques. The hands-on approach beats reading documentation any day."
    },
    {
      name: "Jennifer L.",
      avatar: "👩‍💼",
      rating: 4,
      text: "Solid platform with good variety of challenges. The IOC search feature saves me tons of time during investigations. Interface could be more intuitive but overall very useful."
    },
    {
      name: "David Chen",
      avatar: "👨‍🎓",
      rating: 5,
      text: "As someone transitioning into cybersecurity, ForensiX has been invaluable. The progressive difficulty levels help build confidence step by step."
    },
    {
      name: "Lisa Thompson",
      avatar: "👩‍🚀",
      rating: 4,
      text: "Love the realistic scenarios and the community aspect. Sometimes the challenges can be quite tough, but that's what makes them valuable for skill development."
    }
  ];

  const handleIocSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (iocQuery.trim()) {
      navigate('/ioc-search', { state: { searchQuery: iocQuery } });
    }
  };

  const handleToolTabClick = (toolId: string) => {
    setActiveTab(toolId);
    // Find the index of the tool in the featuredTools array
    const index = featuredTools.findIndex(tool => tool.id === toolId);
    if (index !== -1) {
      setActiveToolIndex(0); // Reset image index when switching tools
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/3 to-blue-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <Navigation />

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center">
            {/* Floating Logo - Responsive */}
            <div className="flex justify-center mb-8">
              <img 
                src="/forensixlogo2.png" 
                alt="ForensiX Logo" 
                className="h-32 sm:h-40 md:h-48 lg:h-64 w-auto animate-float"
                style={{
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
            </div>

            {/* IOC Search Bar - Mobile Optimized */}
            <div className="max-w-2xl mx-auto mb-8">
              <form onSubmit={handleIocSearch} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-xl p-1 shadow-2xl">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center">
                    <div className="flex items-center flex-1">
                      <div className="flex items-center justify-center w-12 h-12 text-cyan-400">
                        <Search className="h-5 w-5" />
                      </div>
                      <input
                        type="text"
                        value={iocQuery}
                        onChange={(e) => setIocQuery(e.target.value)}
                        placeholder="Search IOCs: IP addresses, domains, file hashes..."
                        className="flex-1 bg-transparent text-white placeholder-gray-400 px-4 py-3 focus:outline-none text-base sm:text-lg"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 mt-2 sm:mt-0 sm:ml-2"
                    >
                      <span>Search</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Stats - Mobile Responsive with Visual Separation */}
            <div className="relative mb-12">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gray-900/60 border border-gray-700/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                  {stats.map((stat, index) => (
                    <div key={index} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300 group">
                        <div className="flex items-center justify-center mb-3">
                          <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} group-hover:scale-110 transition-transform duration-300`} />
                        </div>
                        <div className="text-xl sm:text-2xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">{stat.value}</div>
                        <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
                Your Interactive Hub for
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Forensics & IR
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              ForensiX is your all-in-one platform for learning, investigating, and testing your skills in DFIR. 
              Access powerful tools, realistic challenges, and hands-on training - all in one place.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 px-4">
              <Link
                to="/challenges"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 group"
              >
                <Play className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Start Investigating</span>
              </Link>
              <Link
                to="/tools"
                className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 backdrop-blur-sm group"
              >
                <Wrench className="h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Browse Tools</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900/30 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Featured Tools
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Explore our most popular digital forensics and incident response tools
            </p>
          </div>

          {/* Tool Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {featuredTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleToolTabClick(tool.id)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tool.id
                    ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                    : 'bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <tool.icon className="h-4 w-4" />
                <span>{tool.title}</span>
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="mb-12">
            {featuredTools.map((tool) => (
              <div 
                key={tool.id} 
                className={`${activeTab === tool.id ? 'block' : 'hidden'}`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Tool Info */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-10 rounded-xl blur-xl`}></div>
                    <div className={`relative ${tool.bgColor} border ${tool.borderColor} rounded-xl p-8 backdrop-blur-sm`}>
                      <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br ${tool.color} p-0.5`}>
                        <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center">
                          <tool.icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold mb-4 text-white">{tool.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{tool.description}</p>
                      
                      {/* Tool Features */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {tool.features.map((feature, index) => (
                          <div key={index} className="text-center">
                            <feature.icon className={`h-6 w-6 ${tool.textColor} mx-auto mb-2`} />
                            <div className="text-sm text-gray-300">{feature.label}</div>
                          </div>
                        ))}
                      </div>
                      
                      <Link
                        to={tool.link}
                        className={`inline-flex items-center space-x-2 bg-gradient-to-r ${tool.color} px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg`}
                      >
                        <span>Explore</span>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                  
                  {/* Tool Images */}
                  <div className="relative group">
                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-10 rounded-xl blur-xl`}></div>
                    <div className={`relative ${tool.bgColor} border ${tool.borderColor} rounded-xl p-4 backdrop-blur-sm`}>
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-lg">
                        <img 
                          src={tool.images[activeToolIndex % tool.images.length]} 
                          alt={`${tool.title} Interface`} 
                          className="w-full h-full object-contain shadow-lg"
                        />
                      </div>
                      
                      {/* Image Navigation */}
                      {tool.images.length > 1 && (
                        <div className="flex justify-center mt-4 space-x-2">
                          {tool.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveToolIndex(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                activeToolIndex % tool.images.length === index 
                                  ? `bg-gradient-to-r ${tool.color}`
                                  : 'bg-gray-600'
                              }`}
                              aria-label={`View image ${index + 1}`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              DFIR Command Center
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Everything you need for digital forensics and incident response in one powerful platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`relative group cursor-pointer`}
                onClick={() => feature.link && navigate(feature.link)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-all duration-500`}></div>
                <div className={`relative ${feature.bgColor} border ${feature.borderColor} rounded-xl p-6 sm:p-8 ${feature.hoverBg} transition-all duration-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-2 transform`}>
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center mb-4 sm:mb-6 bg-gradient-to-br ${feature.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center">
                      <feature.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${feature.textColor}`} />
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 group-hover:text-white transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 text-sm sm:text-base">
                    {feature.description}
                  </p>
                  <div className={`${feature.textColor} hover:text-white font-semibold flex items-center space-x-2 group/btn transition-colors duration-300`}>
                    <span>Explore</span>
                    <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Our users say
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
              Trusted by security professionals worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 sm:p-6 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 group-hover:-translate-y-1 transform">
                  <div className="flex items-center mb-4">
                    <div className="text-2xl sm:text-3xl mr-3">{testimonial.avatar}</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white text-sm sm:text-base">{testimonial.name}</h4>
                      <div className="flex space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 sm:h-4 sm:w-4 ${
                              i < testimonial.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-600'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="relative">
                    <Quote className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400/30 absolute -top-1 -left-1" />
                    <p className="text-gray-300 leading-relaxed text-sm pl-4">
                      "{testimonial.text}"
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
            <div className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 sm:p-12 backdrop-blur-sm">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Ready to Master DFIR?
              </h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
                Join thousands of security professionals advancing their careers with ForensiX's comprehensive training platform. 
                Registration is free and gives you access to all our tools and resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 group"
                >
                  <UserPlus className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Register for Free</span>
                </Link>
                <Link
                  to="/donate"
                  className="border border-pink-500/30 hover:border-pink-500/50 hover:bg-pink-500/10 px-6 sm:px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm flex items-center justify-center space-x-2 text-pink-300 hover:text-pink-200 group"
                >
                  <Heart className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>Support Developers</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

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

export default HomePage;