import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolsPage from './pages/ToolsPage';
import ChallengesPage from './pages/ChallengesPage';
import IOCSearchPage from './pages/IOCSearchPage';
import IOCExtractorPage from './pages/IOCExtractorPage';
import CoursesPage from './pages/CoursesPage';
import TheLabPage from './pages/TheLabPage';
import EmailAnalyzerPage from './pages/EmailAnalyzerPage';
import DFIRAssistantPage from './pages/DFIRAssistantPage';
import ExifToolPage from './pages/ExifToolPage';
import CheatSheetPage from './pages/CheatSheetPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import DonatePage from './pages/DonatePage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

// Challenge Pages
import PowerShellChallengePage from './pages/challenges/PowerShellChallengePage';
import HackedByCaptchaPage from './pages/challenges/HackedByCaptchaPage';
import MinerOnTheRunPage from './pages/challenges/MinerOnTheRunPage';
import MasterFileTrapPage from './pages/challenges/MasterFileTrapPage';
import EmotetTracePage from './pages/challenges/EmotetTracePage';
import BruteforceDetectedPage from './pages/challenges/BruteforceDetectedPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tools" element={<ToolsPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/challenges/powershell-analysis" element={<PowerShellChallengePage />} />
      <Route path="/challenges/hacked-by-captcha" element={<HackedByCaptchaPage />} />
      <Route path="/challenges/miner-on-the-run" element={<MinerOnTheRunPage />} />
      <Route path="/challenges/master-file-trap" element={<MasterFileTrapPage />} />
      <Route path="/challenges/emotet-trace" element={<EmotetTracePage />} />
      <Route path="/challenges/bruteforce-detected" element={<BruteforceDetectedPage />} />
      <Route path="/ioc-search" element={<IOCSearchPage />} />
      <Route path="/ioc-extractor" element={<IOCExtractorPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:topic" element={<CoursesPage />} />
      <Route path="/courses/:topic/:lesson" element={<CoursesPage />} />
      <Route path="/cheatsheet" element={<CheatSheetPage />} />
      <Route path="/the-lab" element={<TheLabPage />} />
      <Route path="/email-analyzer" element={<EmailAnalyzerPage />} />
      <Route path="/dfir-assistant" element={<DFIRAssistantPage />} />
      <Route path="/exiftool" element={<ExifToolPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/terms" element={<TermsPage />} />
    </Routes>
  );
}

export default App;