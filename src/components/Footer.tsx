import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center justify-start ml-4">
              <img 
                src="/forensixlogo2.png" 
                alt="ForensiX Logo" 
                className="h-32 w-auto transition-all duration-300 hover:scale-110"
              />
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Platform</h4>
            <div className="space-y-3 text-gray-400">
              <Link to="/challenges" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Challenges</Link>
              <Link to="/tools" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Tools</Link>
              <Link to="/courses" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Courses</Link>
              <Link to="/cheatsheet" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">CheatSheet</Link>
              <Link to="/the-lab" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">The Lab</Link>
              <Link to="/exiftool" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">ExifTool</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Resources</h4>
            <div className="space-y-3 text-gray-400">
              <a href="https://discord.gg/forensix" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Discord</a>
              <a href="https://github.com/forensix" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">GitHub</a>
              <a href="https://linkedin.com/company/forensix" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">LinkedIn</a>
              <Link to="/contact" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Contact</Link>
              <Link to="/about" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">About</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white">Support</h4>
            <div className="space-y-3 text-gray-400">
              <Link to="/about" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">About</Link>
              <Link to="/contact" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Contact</Link>
              <Link to="/privacy" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Privacy</Link>
              <Link to="/terms" className="hover:text-cyan-400 cursor-pointer transition-colors duration-300 block">Terms</Link>
              <Link
                to="/donate"
                className="hover:text-pink-400 cursor-pointer transition-colors duration-300 flex items-center space-x-2 group"
              >
                <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                <span>Donate</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2025 ForensiX. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <div className="flex items-center space-x-2 text-gray-400">
                <Activity className="h-4 w-4 text-green-400 animate-pulse" />
                <span className="text-sm">All systems operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;