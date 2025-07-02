import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  FileText,
  Shield,
  AlertTriangle,
  UserCheck,
  Globe,
  Lock,
  Scale,
  Mail
} from 'lucide-react';

const TermsPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: UserCheck,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using ForensiX, you accept and agree to be bound by these Terms of Service",
        "If you do not agree to these terms, you may not access or use our services",
        "We may update these terms at any time, and continued use constitutes acceptance of changes",
        "You must be at least 13 years old to use our platform"
      ]
    },
    {
      icon: Shield,
      title: "User Accounts",
      content: [
        "You are responsible for maintaining the confidentiality of your account credentials",
        "You must provide accurate and complete information when creating an account",
        "You are responsible for all activities that occur under your account",
        "You must notify us immediately of any unauthorized use of your account",
        "We reserve the right to suspend or terminate accounts that violate these terms"
      ]
    },
    {
      icon: Lock,
      title: "Acceptable Use",
      content: [
        "Use the platform only for lawful purposes and in accordance with these terms",
        "Do not attempt to gain unauthorized access to our systems or other users' accounts",
        "Do not upload malicious code, viruses, or other harmful content",
        "Do not use the platform to harass, abuse, or harm others",
        "Do not attempt to reverse engineer or copy our proprietary technology"
      ]
    },
    {
      icon: FileText,
      title: "Intellectual Property",
      content: [
        "All content on ForensiX is protected by copyright, trademark, and other intellectual property laws",
        "You may not reproduce, distribute, or create derivative works without permission",
        "User-generated content remains your property, but you grant us a license to use it",
        "We respect the intellectual property rights of others and expect users to do the same",
        "Report any copyright infringement to our designated agent"
      ]
    },
    {
      icon: Globe,
      title: "Service Availability",
      content: [
        "We strive to maintain high availability but do not guarantee uninterrupted service",
        "We may temporarily suspend service for maintenance or updates",
        "We reserve the right to modify or discontinue features at any time",
        "We are not liable for any downtime or service interruptions",
        "Some features may be subject to usage limits or restrictions"
      ]
    },
    {
      icon: AlertTriangle,
      title: "Disclaimers and Limitations",
      content: [
        "The platform is provided 'as is' without warranties of any kind",
        "We do not guarantee the accuracy or completeness of content",
        "We are not liable for any indirect, incidental, or consequential damages",
        "Our total liability is limited to the amount you paid for our services",
        "Some jurisdictions do not allow certain limitations, so these may not apply to you"
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
                  <Scale className="h-16 w-16 text-cyan-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Terms of Service
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Please read these terms carefully before using ForensiX. They govern your use of our platform and services.
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
                These Terms of Service ("Terms") govern your use of the ForensiX platform and services operated by ForensiX ("we," "our," or "us"). 
                ForensiX is a digital forensics and incident response training platform designed for cybersecurity professionals.
              </p>
              <p className="text-gray-300 leading-relaxed">
                By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of these terms, 
                then you may not access the service.
              </p>
            </div>
          </div>

          {/* Terms Sections */}
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

          {/* Educational Use */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <FileText className="h-6 w-6 text-green-400" />
                <span>Educational Purpose</span>
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  ForensiX is designed exclusively for educational and training purposes in the field of digital forensics 
                  and incident response. By using our platform, you agree that:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>You will use the knowledge gained for legitimate cybersecurity purposes only</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>You will not use our tools or techniques for malicious activities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>You understand that some content may contain simulated malware or attack scenarios</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-400">•</span>
                    <span>You will comply with all applicable laws and regulations in your jurisdiction</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Termination */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-400" />
                <span>Termination</span>
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  We may terminate or suspend your account and access to the service immediately, without prior notice or liability, 
                  for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                  <h4 className="font-semibold text-white mb-3">Grounds for Termination:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">•</span>
                      <span>Violation of these Terms of Service</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">•</span>
                      <span>Misuse of the platform for malicious purposes</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">•</span>
                      <span>Harassment or abuse of other users</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-400">•</span>
                      <span>Attempting to compromise platform security</span>
                    </li>
                  </ul>
                </div>
                <p>
                  Upon termination, your right to use the service will cease immediately. You may delete your account at any time 
                  by contacting us or using the account deletion feature in your profile settings.
                </p>
              </div>
            </div>
          </div>

          {/* Governing Law */}
          <div className="relative group mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">Governing Law</h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  These Terms shall be interpreted and governed by the laws of the jurisdiction in which ForensiX operates, 
                  without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                  of these Terms will remain in effect.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
            <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center space-x-3">
                <Mail className="h-6 w-6 text-blue-400" />
                <span>Contact Us</span>
              </h3>
              <div className="space-y-4 text-gray-300">
                <p>
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-6">
                  <div className="space-y-2">
                    <p><strong>Email:</strong> legal@forensix.net</p>
                    <p><strong>Subject Line:</strong> Terms of Service Inquiry</p>
                    <p><strong>Response Time:</strong> We will respond to legal inquiries within 5 business days</p>
                  </div>
                </div>
                <p className="text-sm">
                  These Terms of Service are effective as of the date listed above and will remain in effect except with respect 
                  to any changes in their provisions in the future, which will be in effect immediately after being posted on this page.
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

export default TermsPage;