import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Shield,
  Target,
  Users,
  Globe,
  Award,
  Heart,
  Code,
  BookOpen,
  Zap
} from 'lucide-react';

const AboutPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const teamMembers = [
    {
      name: "Alex Chen",
      role: "Founder & Lead Developer",
      avatar: "👨‍💻",
      description: "Former incident response specialist with 8+ years in DFIR. Passionate about making forensic tools accessible to everyone."
    },
    {
      name: "Sarah Rodriguez",
      role: "Security Researcher",
      avatar: "👩‍🔬",
      description: "Malware analyst and threat hunter. Specializes in creating realistic training scenarios based on real-world attacks."
    },
    {
      name: "Mike Johnson",
      role: "Platform Engineer",
      avatar: "👨‍🔧",
      description: "Full-stack developer focused on building scalable forensic platforms. Expert in cloud infrastructure and security."
    }
  ];

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Countries Served", value: "50+", icon: Globe },
    { label: "Tools Available", value: "100+", icon: Code },
    { label: "Challenges Created", value: "25+", icon: Target }
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
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Shield className="h-16 w-16 text-cyan-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    About ForensiX
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Empowering the next generation of digital forensics and incident response professionals 
                  through hands-on training, cutting-edge tools, and real-world scenarios.
                </p>
              </div>
            </div>
          </div>

          {/* Mission Section */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6 flex items-center space-x-3">
                    <Target className="h-8 w-8 text-blue-400" />
                    <span>Our Mission</span>
                  </h2>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    ForensiX was born from the need to bridge the gap between theoretical knowledge and practical skills in digital forensics. 
                    We believe that the best way to learn DFIR is through hands-on experience with real-world scenarios.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Our platform provides a comprehensive learning environment where security professionals can develop, 
                    practice, and refine their incident response skills in a safe, controlled environment.
                  </p>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                    <div className="grid grid-cols-2 gap-6">
                      {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <stat.icon className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                          <div className="text-2xl font-bold text-white">{stat.value}</div>
                          <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What We Offer */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
                <Zap className="h-8 w-8 text-green-400" />
                <span>What We Offer</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 text-center">
                  <Target className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">Realistic Challenges</h3>
                  <p className="text-gray-300 text-sm">
                    Hands-on scenarios based on real-world incidents, from malware analysis to data breaches.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 text-center">
                  <BookOpen className="h-12 w-12 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">Comprehensive Courses</h3>
                  <p className="text-gray-300 text-sm">
                    Structured learning paths covering Windows forensics, memory analysis, and incident response.
                  </p>
                </div>
                
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6 text-center">
                  <Code className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-white mb-3">Professional Tools</h3>
                  <p className="text-gray-300 text-sm">
                    Curated collection of DFIR tools with guides, tips, and best practices.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
                <Users className="h-8 w-8 text-purple-400" />
                <span>Meet Our Team</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div className="relative group/member">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl group-hover/member:blur-lg transition-all duration-300"></div>
                      <div className="relative bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-800/70 transition-all duration-300">
                        <div className="text-6xl mb-4">{member.avatar}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-cyan-400 font-medium mb-4">{member.role}</p>
                        <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="relative group mb-16">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-3xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-3">
                <Award className="h-8 w-8 text-yellow-400" />
                <span>Our Values</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-red-400" />
                    <span>Community First</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We believe in the power of community. ForensiX is built by practitioners, for practitioners. 
                    Our platform is designed to foster collaboration and knowledge sharing among DFIR professionals.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Shield className="h-6 w-6 text-cyan-400" />
                    <span>Quality & Accuracy</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Every challenge, course, and tool on our platform is carefully crafted and reviewed by experienced 
                    professionals to ensure accuracy and relevance to real-world scenarios.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Globe className="h-6 w-6 text-green-400" />
                    <span>Accessibility</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We're committed to making high-quality DFIR training accessible to everyone, regardless of 
                    background or financial situation. That's why ForensiX is free to use.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                    <Zap className="h-6 w-6 text-purple-400" />
                    <span>Innovation</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    We continuously evolve our platform with the latest tools, techniques, and threat landscapes 
                    to ensure our users stay ahead of emerging challenges.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="text-center">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-2xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/20 rounded-2xl p-8 backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
                <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                  Have questions, suggestions, or want to contribute to ForensiX? We'd love to hear from you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25"
                  >
                    Contact Us
                  </a>
                  <a
                    href="https://discord.gg/forensix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    Join Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;