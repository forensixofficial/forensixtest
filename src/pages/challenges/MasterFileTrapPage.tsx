import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Download,
  User,
  Droplet,
  Trophy,
  ChevronDown,
  ChevronUp,
  Star
} from 'lucide-react';
import Confetti from 'react-confetti';
import Navigation from '../../components/Navigation';
import Footer from '../../components/Footer';
import { useAuth } from '../../contexts/AuthContext';

// Reusable QuestionCard Component
const QuestionCard = ({
  question,
  hintsRemaining,
  onAnswerChange,
  onSubmit,
  onToggleHint,
  progress,
}) => {
  return (
    <div
      className={`bg-gray-900/30 rounded-lg p-6 border ${
        progress?.completed
          ? 'border-green-500/20'
          : 'border-cyan-500/20 hover:bg-gray-900/40 hover:border-cyan-400/30'
      } transition-all ${
        question.isCorrect === true ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4">
            {question.text}
          </h3>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              className={`bg-gray-800/50 border ${
                progress?.completed
                  ? 'border-green-500/20 text-green-500'
                  : 'border-cyan-500/20'
              } rounded-md px-4 py-2 focus:outline-none focus:border-cyan-400 transition-colors flex-1`}
              placeholder="Enter your answer"
              value={question.userAnswer}
              onChange={(e) => onAnswerChange(question.id, e.target.value)}
              onKeyDown={(e) => {
                if (
                  e.key === 'Enter' &&
                  !question.isCorrect &&
                  !progress?.completed
                ) {
                  onSubmit(question.id, question.userAnswer);
                }
              }}
              disabled={progress?.completed || question.isCorrect === true}
            />
            {!progress?.completed && !question.isCorrect && (
              <>
                <button
                  className={`text-gray-500 hover:text-gray-400 transition-all ${
                    hintsRemaining === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => onToggleHint(question.id)}
                  disabled={question.isCorrect === true || hintsRemaining === 0}
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                <button
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all active:scale-95"
                  onClick={() => onSubmit(question.id, question.userAnswer)}
                >
                  Submit
                </button>
              </>
            )}
            {question.isCorrect !== undefined &&
              (question.isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              ))}
          </div>
          {question.showHint && (
            <div className="mt-4 text-gray-300 italic">{question.hint}</div>
          )}
        </div>
      </div>
    </div>
  );
};

function MasterFileTrapPage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: '1. What was the archive name?',
      answer: 'Photoshop.7z',
      hint: 'Look for a .7z file in the MFT.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 2,
      text: '2. From which domain was the malware downloaded?',
      answer: 'limewire.com',
      hint: 'Identifier.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 3,
      text: '3. What is the full path and name of the malicious file that executed malicious code?',
      answer: 'C:\\Users\\Public\\Downloads\\installer.bat',
      hint: 'Check common extraction directories.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 4,
      text: '4. When was the malicious file created on the system?',
      answer: '2025-02-14 19:59:06',
      hint: 'The MFT entry for the file contains timestamps.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 5,
      text: '5. What is the file size (in bytes)?',
      answer: '533',
      hint: 'Look at the $DATA attribute for the file size.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 6,
      text: '6. What is the hexadecimal offset of the file in the MFT?',
      answer: 'EC00',
      hint: 'Each MFT entry is 1024 bytes. Find the entry number for the file and calculate the offset (Entry x 1024).',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 7,
      text: '7. What is the C2 IP address?',
      answer: '82.117.255.80',
      hint: 'If the file size is small enough, its content may be stored directly within the MFT.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 8,
      text: '8. What is the C2 port?',
      answer: '4444',
      hint: 'If the file size is small enough, its content may be stored directly within the MFT.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 9,
      text: '9. What protocol does the script use?',
      answer: 'TCP',
      hint: 'If the file size is small enough, its content may be stored directly within the MFT.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 10,
      text: '10. What type of attack was used?',
      answer: 'Reverse Shell',
      hint: 'If the file size is small enough, its content may be stored directly within the MFT.',
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
  ]);

  const [hintsRemaining, setHintsRemaining] = useState(3);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(0);
  const [xpNotification, setXpNotification] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // Update window dimensions when resized
  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allQuestionsAnswered = questions.every(q => q.isCorrect !== undefined);
  const correctAnswersCount = questions.filter(q => q.isCorrect).length;
  const totalQuestions = questions.length;
  const progressPercentage = (correctAnswersCount / totalQuestions) * 100;

  const handleAnswerChange = (id, value) => {
    setQuestions(questions.map(q => q.id === id ? { ...q, userAnswer: value } : q));
  };

  const handleAnswerSubmit = (id, answer) => {
    setQuestions(questions.map(q => {
      if (q.id === id) {
        return {
          ...q,
          userAnswer: answer,
          isCorrect: answer.toLowerCase() === q.answer.toLowerCase(),
        };
      }
      return q;
    }));
  };

  const toggleHint = (id) => {
    if (hintsRemaining > 0) {
      setQuestions(questions.map(q => {
        if (q.id === id && !q.showHint) {
          setHintsRemaining(hintsRemaining - 1);
          return { ...q, showHint: true };
        }
        return q;
      }));
    }
  };

  const handleComplete = async () => {
    if (allQuestionsAnswered && correctAnswersCount === totalQuestions) {
      if (profile) {
        try {
          // In a real implementation, this would save progress to a database
          console.log('Challenge completed successfully!');
          
          // Set XP amount for medium difficulty
          const xpAmount = 200;
          setXpAwarded(xpAmount);
          
          // Show XP notification
          setXpNotification(true);
          setTimeout(() => setXpNotification(false), 5000);
        } catch (error) {
          console.error("Error updating progress:", error);
        }
      }
      setShowConfetti(true);
      setShowSuccess(true);
      setShowError(false);
      setShowShareModal(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setShowError(true);
      setShowConfetti(false);
      setShowSuccess(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <Confetti
          width={windowDimensions.width}
          height={windowDimensions.height}
          recycle={true}
          numberOfPieces={200}
          gravity={0.1}
        />
      )}
      
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <Navigation />

      {/* Banner */}
      <div className="flex justify-center mb-12 pt-8">
        <div className="relative group">
          <div className="absolute inset-0 rounded-lg bg-cyan-500/40 blur-lg group-hover:opacity-100 opacity-0 transition-opacity duration-300"></div>
          <img
            src="/Challenges/mft-banner.png"
            alt="Master File Trap Challenge Banner"
            className="w-auto max-h-80 object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ease-in-out relative z-10 mt-8"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold mb-8">
          Master File Trap
        </h1>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">Progress</div>
          <div className="w-full bg-gray-800/20 h-4 rounded-full relative overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${progressPercentage}%`,
                background: 'linear-gradient(90deg, #4ade80, #3b82f6)',
                boxShadow: '0 0 8px rgba(59, 130, 246, 0.6)',
              }}
            >
              <div className="text-center text-white text-sm font-semibold absolute inset-0 flex items-center justify-center">
                {`${Math.round(progressPercentage)}%`}
              </div>
            </div>
          </div>
          <div className="text-sm mt-2 text-gray-400">
            {correctAnswersCount} of {totalQuestions} correct
          </div>
        </div>

        {/* Hints Remaining */}
        <div className="text-gray-400 mb-6">
          Hints Remaining: {hintsRemaining}
        </div>

        {/* Challenge Introduction */}
        <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Challenge Introduction</h2>
          <p className="text-gray-400 mb-6">
            Bob, a graphic designer, started his first day at a small startup. As part of his setup, he downloaded software to assist with his work. However, soon after executing a file, his system was compromised. The Security Operations Center (SOC) was alerted immediately to suspicious activity originating from Bob's laptop.
          </p>
          <p className="text-gray-400 mb-6">
            To investigate the incident, you have been provided with the Master File Table (MFT) from his system. The SOC suspects that Bob downloaded a 7z archive containing a malicious payload. Your task is to analyze the MFT and uncover the details of the attack.
          </p>
        </div>

        {/* Download Challenge Files */}
        <div className="text-center mb-8">
          <a
            href="/Challenges/MFT.zip"
            download="MFT.zip"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 mx-auto w-fit"
          >
            <Download className="w-5 h-5" />
            <span>Download MFT.zip</span>
          </a>
        </div>

        {/* Suggested Tools */}
        <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Suggested Tools</h2>
          <p className="text-gray-400 mb-4">
            To analyze the MFT, you can use the following tools:
          </p>
          <ul className="list-disc list-inside text-gray-400">
            <li>
              <a
                href="https://github.com/EricZimmerman/MFTECmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                MFTECmd
              </a>{' '}
              - A powerful tool for parsing and analyzing MFT files.
            </li>
            <li>
              <a
                href="https://mh-nexus.de/en/hxd/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300"
              >
                HxD
              </a>{' '}
              - A hex editor for viewing and editing binary files.
            </li>
          </ul>
        </div>

        {/* Writeups Section */}
        <div className="bg-gray-900/30 rounded-lg p-6 border border-cyan-500/20 mb-8">
          <h2 className="text-xl font-semibold mb-4">Writeups</h2>
          <p className="text-gray-400">Coming Soon.</p>
        </div>

        {/* Questions Dropdown Tab */}
        <div className="mb-6 text-center">
          <div
            onClick={() => setQuestionsVisible(!questionsVisible)}
            className="cursor-pointer border border-gray-600 rounded-lg px-4 py-2 flex items-center justify-center mx-auto hover:bg-gray-800/50 transition-all w-fit"
          >
            <span className="mr-2">Questions</span>
            {questionsVisible ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </div>
        </div>

        {/* Questions Section */}
        {questionsVisible && (
          <div className="space-y-6">
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                hintsRemaining={hintsRemaining}
                onAnswerChange={handleAnswerChange}
                onSubmit={handleAnswerSubmit}
                onToggleHint={toggleHint}
                progress={null}
              />
            ))}
          </div>
        )}

        {/* Complete Button */}
        <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
          <button
            onClick={handleComplete}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 px-6 rounded-lg transition-all active:scale-95 flex items-center justify-center space-x-2 mx-auto"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Complete Challenge</span>
          </button>
          {showError && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 text-red-400 rounded-lg">
              <p>Please answer all questions correctly before completing the challenge.</p>
            </div>
          )}
        </div>

        {/* XP Notification */}
        {xpNotification && (
          <div className="fixed top-20 right-4 bg-gray-900/90 border border-cyan-500/20 rounded-lg p-4 shadow-lg z-50">
            <div className="flex items-center space-x-3">
              <div className="bg-yellow-500/20 p-2 rounded-full">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="font-bold text-lg">+{xpAwarded} XP</p>
                <p className="text-sm text-gray-400">Challenge completed!</p>
              </div>
            </div>
          </div>
        )}

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-4xl mx-auto px-4 mt-8 text-center">
            <div className="p-4 bg-green-500/20 border border-green-500/30 text-green-400 rounded-lg">
              <p className="text-lg font-semibold">Congratulations!</p>
              <p>
                You have completed the challenge with {correctAnswersCount} out of {totalQuestions} correct answers.
              </p>
              {xpAwarded > 0 && (
                <p className="mt-2 text-yellow-300 font-bold">
                  +{xpAwarded} XP Awarded!
                </p>
              )}
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg p-8 z-50 text-center relative shadow-2xl max-w-md w-full">
              <button
                onClick={() => setShowShareModal(false)}
                className="absolute top-2 right-2 text-white hover:text-gray-200"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold mb-4 text-white">Congratulations!</h2>
              <p className="mb-4 text-white">You have finished the challenge. Share your achievement!</p>
              <div className="flex justify-center space-x-4">
                <a
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://forensix.net/challenge/master-file-trap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold"
                >
                  Share on LinkedIn
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=I%20just%20finished%20the%20Master%20File%20Trap%20challenge%20on%20ForensiX!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold"
                >
                  Share on X
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Combined Frame for Created by and First Blood */}
        <div className="max-w-4xl mx-auto px-4 mt-8">
          <div className="bg-gray-900/40 p-6 rounded-xl border border-cyan-500/20 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col md:flex-row justify-center md:space-x-8 space-y-4 md:space-y-0">
              {/* Created by section */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-cyan-500/10 rounded-full">
                  <User className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Created by:</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-cyan-400 hover:text-cyan-300 font-semibold">ForensiX Team</p>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px bg-cyan-500/20 h-12"></div>

              {/* First Blood section */}
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-red-500/10 rounded-full">
                  <Droplet className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">First Blood:</p>
                  <div className="flex items-center space-x-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    <p className="text-red-500 hover:text-red-400 font-semibold">MFTExplorer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default MasterFileTrapPage;