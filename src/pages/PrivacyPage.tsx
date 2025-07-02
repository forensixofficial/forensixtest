import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Shield,
  Lock,
  Eye,
  Database,
  Globe,
  UserCheck,
  AlertTriangle,
  Mail
} from 'lucide-react';

const PrivacyPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      content: [
        "Account information (email, username, profile details)",
        "Usage data (pages visited, features used, time spent)",
        "Device information (browser type, IP address, operating system)",
        "Cookies and similar tracking technologies",
        "Content you create or upload to our platform"
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "Provide and improve our services",
        "Personalize your learning experience",
        "Communicate with you about updates and features",
        "Analyze usage patterns to enhance platform performance",
        "Ensure security and prevent fraud"
      ]
    },
    {
      icon: Shield,
      title: "Information Sharing",
      content: [
        "We do not sell your personal information to third parties",
        "We may share data with service providers who help operate our platform",
        "We may disclose information if required by law or to protect our rights",
        "Anonymous, aggregated data may be shared for research purposes"
      ]
    },
    {
      icon: Lock,
      title: "Data Security",
      content: [
        "Industry-standard encryption for data transmission and storage",
        "Regular security audits and vulnerability assessments",
        "Access controls and authentication measures",
        "Secure data centers with physical and digital protections",
        "Employee training on data protection best practices"
      ]
    },
    {
      icon: UserCheck,
      title: "Your Rights",
      content: [
        "Access your personal data and request corrections",
        "Delete your account and associated data",
        "Export your data in a portable format",
        "Opt out of marketing communications",
        "Request information about how your data is processed"
      ]
    },
    {
      icon: Globe,
      title: "International Transfers",
      content: [
        "Your data may be processed in countries outside your residence",
        "We ensure adequate protection through appropriate safeguards",
        "Data transfers comply with applicable privacy laws",
        "We maintain the same level of protection regardless of location"
      ]
    }
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Shield className="h-16 w-16 text-cyan-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Privacy Policy
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Your privacy is important to us. This policy explains how we collect, use, and protect your information.
                </p>
                <div className="mt-6 text-sm text-gray-400">
                  Last updated: January 1, 2025
                </div>
              </div>
            </div>
          </div>

          {/* Introduction */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h2 className="text-2xl font-bold text-white mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                ForensiX ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our digital forensics training platform.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By using ForensiX, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with our policies and practices, please do not use our services.
              </p>
            </div>
          </div>

          {/* Privacy Sections */}
          <div className="space-y-8 mb-12">
            {sections.map((section, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5">
                      <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center">
                        <section.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{section.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-300 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Cookies Section */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-orange-400" />
                <span>Cookies and Tracking</span>
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  We use cookies and similar tracking technologies to enhance your experience on our platform. 
                  These technologies help us:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Analyze how you use our platform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Provide personalized content and recommendations</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-orange-400">•</span>
                    <span>Ensure security and prevent fraud</span>
                  </li>
                </ul>
                <p>
                  You can control cookies through your browser settings, but disabling them may affect platform functionality.
                </p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Data Retention</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  We retain your personal information only as long as necessary to provide our services and fulfill 
                  the purposes outlined in this privacy policy. Specific retention periods include:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Account Data</h4>
                    <p className="text-sm text-gray-300">Retained while your account is active and for 30 days after deletion</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Usage Analytics</h4>
                    <p className="text-sm text-gray-300">Aggregated data retained for up to 2 years for platform improvement</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Support Communications</h4>
                    <p className="text-sm text-gray-300">Retained for 1 year to provide ongoing support</p>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4">
                    <h4 className="font-semibold text-white mb-2">Legal Requirements</h4>
                    <p className="text-sm text-gray-300">Some data may be retained longer if required by law</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Mail className="h-6 w-6 text-green-400" />
                <span>Contact Us</span>
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                  <div className="space-y-2">
                    <p><strong>Email:</strong> privacy@forensix.net</p>
                    <p><strong>Address:</strong> ForensiX Privacy Team, Digital Forensics Platform</p>
                    <p><strong>Response Time:</strong> We will respond to privacy inquiries within 30 days</p>
                  </div>
                </div>
                <p className="text-sm">
                  We reserve the right to update this Privacy Policy at any time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date.
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

export default PrivacyPage;