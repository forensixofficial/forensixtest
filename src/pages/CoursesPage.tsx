import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Clock,
  Users,
  Star,
  Play,
  CheckCircle,
  Lock,
  Monitor,
  Brain,
  Terminal,
  Apple,
  Shield,
  Activity,
  Heart,
  Zap,
  Award,
  Target,
  FileText,
  Code,
  Download
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  type: 'reading' | 'quiz';
  isCompleted: boolean;
  isLocked: boolean;
  content?: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  bgColor: string;
  borderColor: string;
  totalLessons: number;
  completedLessons: number;
  estimatedHours: string;
  lessons: Lesson[];
}

const CoursesPage = () => {
  const { topic, lesson } = useParams();
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<string>(topic || '');
  const [selectedLesson, setSelectedLesson] = useState<string>(lesson || '');
  const [expandedTopic, setExpandedTopic] = useState<string>(topic || '');

  // Scroll to top when component mounts or topic changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topic, lesson]);

  const courses: Course[] = [
    {
      id: 'windows-endpoint',
      title: 'Windows Endpoint Forensics',
      description: 'Master Windows artifact analysis including registry, event logs, prefetch, MFT, and more.',
      icon: Monitor,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      totalLessons: 12,
      completedLessons: 0,
      estimatedHours: '8-10 hours',
      lessons: [
        {
          id: 'intro-windows-forensics',
          title: 'Introduction to Windows Forensics',
          description: 'Overview of Windows forensics, key artifacts, and investigation methodology.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: false,
          content: `# Introduction to Windows Forensics

## What is Windows Forensics?

Windows forensics is the process of collecting, analyzing, and preserving digital evidence from Windows operating systems. This field is crucial for incident response, criminal investigations, and security analysis.

## Key Windows Artifacts

### 1. Windows Registry
- **Location**: C:\\Windows\\System32\\config\\
- **Purpose**: Stores system and user configuration data
- **Key Hives**: SYSTEM, SOFTWARE, SAM, SECURITY, NTUSER.DAT

### 2. Event Logs
- **Location**: C:\\Windows\\System32\\winevt\\Logs\\
- **Types**: System, Security, Application, Setup
- **Format**: .evtx files

### 3. Prefetch Files
- **Location**: C:\\Windows\\Prefetch\\
- **Purpose**: Application execution tracking
- **Information**: Program paths, run count, last execution time

### 4. Master File Table (MFT)
- **Location**: Root of NTFS volume
- **Purpose**: File system metadata
- **Information**: File creation, modification, access times

## Investigation Methodology

1. **Preparation**: Gather tools and create forensic images
2. **Identification**: Locate relevant artifacts
3. **Collection**: Extract data using forensic tools
4. **Analysis**: Examine artifacts for evidence
5. **Documentation**: Create detailed reports
6. **Presentation**: Present findings clearly

## Tools You'll Learn

- **Registry Explorer**: GUI registry analysis
- **Event Log Explorer**: Windows event log analysis
- **MFTECmd**: Command-line MFT parsing
- **PECmd**: Prefetch analysis
- **Timeline Explorer**: Multi-artifact timeline creation

## Next Steps

In the following lessons, we'll dive deep into each artifact type, learn to use professional tools, and practice with real-world scenarios.`
        },
        {
          id: 'registry-analysis',
          title: 'Windows Registry Analysis',
          description: 'Deep dive into registry structure, key locations, and analysis techniques.',
          duration: '60 min',
          type: 'reading',
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'event-logs',
          title: 'Windows Event Log Analysis',
          description: 'Understanding event logs, key event IDs, and correlation techniques.',
          duration: '50 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'prefetch-analysis',
          title: 'Prefetch File Analysis',
          description: 'Analyzing application execution artifacts and timeline reconstruction.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'mft-analysis',
          title: 'Master File Table (MFT) Analysis',
          description: 'File system forensics and deleted file recovery techniques.',
          duration: '70 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'usn-journal',
          title: 'USN Journal Analysis',
          description: 'Understanding file system activity through USN journal records.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'shimcache',
          title: 'Application Compatibility Cache',
          description: 'Analyzing ShimCache for program execution evidence.',
          duration: '35 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'amcache',
          title: 'Amcache Analysis',
          description: 'Program installation and execution tracking through Amcache.hve.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'lnk-files',
          title: 'LNK File Analysis',
          description: 'Shortcut file forensics and user activity reconstruction.',
          duration: '30 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'browser-artifacts',
          title: 'Browser Artifact Analysis',
          description: 'Analyzing web browser history, downloads, and cached data.',
          duration: '55 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'timeline-creation',
          title: 'Timeline Creation and Analysis',
          description: 'Combining multiple artifacts into comprehensive timelines.',
          duration: '65 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'case-study',
          title: 'Case Study: Data Exfiltration Investigation',
          description: 'Real-world scenario combining all Windows forensic techniques.',
          duration: '90 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'final-assessment',
          title: 'Final Assessment',
          description: 'Comprehensive quiz covering all Windows forensics topics.',
          duration: '30 min',
          type: 'quiz',
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      id: 'windows-memory',
      title: 'Windows Memory Forensics',
      description: 'Learn memory analysis using Volatility, process investigation, and malware detection.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
      totalLessons: 10,
      completedLessons: 0,
      estimatedHours: '6-8 hours',
      lessons: [
        {
          id: 'memory-forensics-intro',
          title: 'Introduction to Memory Forensics',
          description: 'Understanding memory acquisition and analysis fundamentals.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'volatility-basics',
          title: 'Volatility Framework Basics',
          description: 'Getting started with Volatility 3 and basic commands.',
          duration: '50 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'process-analysis',
          title: 'Process and Thread Analysis',
          description: 'Analyzing running processes and detecting anomalies.',
          duration: '60 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'network-connections',
          title: 'Network Connection Analysis',
          description: 'Examining network artifacts in memory dumps.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'registry-memory',
          title: 'Registry Analysis in Memory',
          description: 'Extracting and analyzing registry data from memory.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'malware-detection',
          title: 'Malware Detection Techniques',
          description: 'Identifying malicious processes and code injection.',
          duration: '70 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'rootkit-detection',
          title: 'Rootkit Detection',
          description: 'Advanced techniques for detecting hidden processes and drivers.',
          duration: '55 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'memory-strings',
          title: 'String and Password Extraction',
          description: 'Extracting sensitive data from memory dumps.',
          duration: '35 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'memory-case-study',
          title: 'Case Study: APT Investigation',
          description: 'Complete memory analysis of an advanced persistent threat.',
          duration: '80 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'memory-assessment',
          title: 'Memory Forensics Assessment',
          description: 'Practical assessment of memory analysis skills.',
          duration: '45 min',
          type: 'quiz',
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      id: 'linux-forensics',
      title: 'Linux Forensics',
      description: 'Linux system analysis, log investigation, and command-line forensics.',
      icon: Terminal,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-500/10',
      borderColor: 'border-green-500/20',
      totalLessons: 9,
      completedLessons: 0,
      estimatedHours: '5-7 hours',
      lessons: [
        {
          id: 'linux-forensics-intro',
          title: 'Introduction to Linux Forensics',
          description: 'Linux file system structure and forensic methodology.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'linux-file-systems',
          title: 'Linux File Systems',
          description: 'Understanding ext4, XFS, and other Linux file systems.',
          duration: '50 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'linux-logs',
          title: 'Linux Log Analysis',
          description: 'Analyzing syslog, auth.log, and systemd journal.',
          duration: '60 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'bash-history',
          title: 'Command History Analysis',
          description: 'Investigating bash history and command execution.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'process-forensics',
          title: 'Process and Memory Analysis',
          description: 'Linux process investigation and memory dumps.',
          duration: '55 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'network-forensics-linux',
          title: 'Network Forensics on Linux',
          description: 'Analyzing network connections and traffic on Linux.',
          duration: '50 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'persistence-mechanisms',
          title: 'Persistence Mechanisms',
          description: 'Identifying malware persistence on Linux systems.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'linux-case-study',
          title: 'Case Study: Server Compromise',
          description: 'Complete investigation of a compromised Linux server.',
          duration: '75 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'linux-assessment',
          title: 'Linux Forensics Assessment',
          description: 'Comprehensive assessment of Linux forensic skills.',
          duration: '40 min',
          type: 'quiz',
          isCompleted: false,
          isLocked: true
        }
      ]
    },
    {
      id: 'macos-forensics',
      title: 'macOS Forensics',
      description: 'macOS system analysis, artifact locations, and investigation techniques.',
      icon: Apple,
      color: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-500/10',
      borderColor: 'border-gray-500/20',
      totalLessons: 8,
      completedLessons: 0,
      estimatedHours: '4-6 hours',
      lessons: [
        {
          id: 'macos-forensics-intro',
          title: 'Introduction to macOS Forensics',
          description: 'macOS architecture and forensic considerations.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: false
        },
        {
          id: 'macos-file-system',
          title: 'APFS and HFS+ Analysis',
          description: 'Understanding Apple file systems and their artifacts.',
          duration: '55 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-logs',
          title: 'macOS Log Analysis',
          description: 'Analyzing unified logs and system diagnostics.',
          duration: '50 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-artifacts',
          title: 'macOS Artifact Analysis',
          description: 'Key artifact locations and analysis techniques.',
          duration: '60 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-applications',
          title: 'Application Analysis',
          description: 'Investigating application usage and data.',
          duration: '45 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-security',
          title: 'Security Feature Analysis',
          description: 'Understanding SIP, Gatekeeper, and XProtect.',
          duration: '40 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-case-study',
          title: 'Case Study: Insider Threat',
          description: 'Complete investigation of insider threat on macOS.',
          duration: '70 min',
          type: 'reading',
          isCompleted: false,
          isLocked: true
        },
        {
          id: 'macos-assessment',
          title: 'macOS Forensics Assessment',
          description: 'Final assessment of macOS forensic knowledge.',
          duration: '35 min',
          type: 'quiz',
          isCompleted: false,
          isLocked: true
        }
      ]
    }
  ];

  const currentCourse = courses.find(course => course.id === selectedTopic);
  const currentLesson = currentCourse?.lessons.find(l => l.id === selectedLesson);

  const handleTopicSelect = (topicId: string) => {
    if (selectedTopic === topicId && expandedTopic === topicId) {
      // If clicking the same topic that's already selected and expanded, collapse it
      setExpandedTopic('');
    } else {
      // Otherwise, select and expand the topic
      setSelectedTopic(topicId);
      setExpandedTopic(topicId);
      setSelectedLesson('');
      navigate(`/courses/${topicId}`);
    }
  };

  const handleLessonSelect = (lessonId: string) => {
    if (currentCourse) {
      const lesson = currentCourse.lessons.find(l => l.id === lessonId);
      if (lesson && !lesson.isLocked) {
        setSelectedLesson(lessonId);
        navigate(`/courses/${selectedTopic}/${lessonId}`);
      }
    }
  };

  const getNextLesson = () => {
    if (!currentCourse || !selectedLesson) return null;
    const currentIndex = currentCourse.lessons.findIndex(l => l.id === selectedLesson);
    if (currentIndex < currentCourse.lessons.length - 1) {
      return currentCourse.lessons[currentIndex + 1];
    }
    return null;
  };

  const getPreviousLesson = () => {
    if (!currentCourse || !selectedLesson) return null;
    const currentIndex = currentCourse.lessons.findIndex(l => l.id === selectedLesson);
    if (currentIndex > 0) {
      return currentCourse.lessons[currentIndex - 1];
    }
    return null;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'reading': return FileText;
      case 'quiz': return Target;
      default: return FileText;
    }
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              DFIR Courses
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Comprehensive learning paths for digital forensics and incident response. 
              Master the skills needed to investigate cyber incidents and analyze digital evidence.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Course Topics */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-6">
                    <BookOpen className="h-6 w-6 text-cyan-400" />
                    <h3 className="font-semibold text-white text-lg">Course Topics</h3>
                  </div>
                  <div className="space-y-3">
                    {courses.map((course) => (
                      <div key={course.id}>
                        <button
                          onClick={() => handleTopicSelect(course.id)}
                          className={`w-full text-left p-4 rounded-lg transition-all duration-300 border ${
                            selectedTopic === course.id
                              ? `${course.bgColor} ${course.borderColor} text-white`
                              : 'border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <course.icon className="h-5 w-5" />
                            <span className="font-medium">{course.title}</span>
                          </div>
                          <div className="text-xs text-gray-400 mb-2">
                            {course.totalLessons} lessons • {course.estimatedHours}
                          </div>
                        </button>

                        {/* Lessons Submenu */}
                        {selectedTopic === course.id && expandedTopic === course.id && (
                          <div className="mt-3 ml-4 space-y-2">
                            {course.lessons.map((lesson, index) => {
                              const TypeIcon = getTypeIcon(lesson.type);
                              return (
                                <button
                                  key={lesson.id}
                                  onClick={() => handleLessonSelect(lesson.id)}
                                  disabled={lesson.isLocked}
                                  className={`w-full text-left p-3 rounded-lg transition-all duration-300 text-sm border ${
                                    selectedLesson === lesson.id
                                      ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                                      : lesson.isLocked
                                      ? 'border-gray-700/30 text-gray-500 cursor-not-allowed'
                                      : 'border-gray-700/30 text-gray-400 hover:text-white hover:bg-gray-800/30'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2 mb-1">
                                    <span className="text-xs text-gray-500">{index + 1}.</span>
                                    <TypeIcon className="h-4 w-4" />
                                    <span className="flex-1 truncate">{lesson.title}</span>
                                    {lesson.isLocked && <Lock className="h-3 w-3" />}
                                    {lesson.isCompleted && <CheckCircle className="h-3 w-3 text-green-400" />}
                                  </div>
                                  <div className="text-xs text-gray-500 ml-6">
                                    {lesson.duration}
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              {currentCourse && (
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                  <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3 mb-4">
                      <Award className="h-5 w-5 text-green-400" />
                      <h4 className="font-semibold text-white">Progress</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Completed</span>
                        <span className="text-white">{currentCourse.completedLessons}/{currentCourse.totalLessons}</span>
                      </div>
                      <div className="w-full bg-gray-800 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentCourse.completedLessons / currentCourse.totalLessons) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {Math.round((currentCourse.completedLessons / currentCourse.totalLessons) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {!selectedTopic ? (
                /* Course Overview */
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course) => (
                      <div key={course.id} className="relative group">
                        <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-0 group-hover:opacity-10 rounded-xl blur-xl transition-all duration-500`}></div>
                        <div className={`relative ${course.bgColor} border ${course.borderColor} rounded-xl p-8 backdrop-blur-sm hover:bg-opacity-80 transition-all duration-300 group-hover:-translate-y-2 transform cursor-pointer`}
                             onClick={() => handleTopicSelect(course.id)}>
                          <div className={`w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-gradient-to-br ${course.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                            <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center">
                              <course.icon className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-4 group-hover:text-white transition-colors duration-300">{course.title}</h3>
                          <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                            {course.description}
                          </p>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Lessons:</span>
                              <span className="text-white">{course.totalLessons}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">Duration:</span>
                              <span className="text-white">{course.estimatedHours}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-cyan-400 group-hover:text-white transition-colors duration-300">
                            <span className="font-semibold">Start Course</span>
                            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : !selectedLesson ? (
                /* Course Detail */
                currentCourse && (
                  <div className="space-y-8">
                    {/* Course Header */}
                    <div className="relative group">
                      <div className={`absolute inset-0 bg-gradient-to-r ${currentCourse.color} opacity-10 rounded-xl blur-xl`}></div>
                      <div className={`relative ${currentCourse.bgColor} border ${currentCourse.borderColor} rounded-xl p-8 backdrop-blur-sm`}>
                        <div className="flex items-start space-x-6">
                          <div className={`w-20 h-20 rounded-lg flex items-center justify-center bg-gradient-to-br ${currentCourse.color} p-0.5`}>
                            <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center">
                              <currentCourse.icon className="h-10 w-10 text-white" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h2 className="text-3xl font-bold mb-4 text-white">{currentCourse.title}</h2>
                            <p className="text-gray-300 mb-6 leading-relaxed">{currentCourse.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="text-center">
                                <div className="text-2xl font-bold text-cyan-400">{currentCourse.totalLessons}</div>
                                <div className="text-sm text-gray-400">Lessons</div>
                              </div>
                              <div className="text-center">
                                <div className="text-2xl font-bold text-green-400">{currentCourse.estimatedHours}</div>
                                <div className="text-sm text-gray-400">Duration</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Lessons List */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold mb-6 text-white">Course Lessons</h3>
                        <div className="space-y-4">
                          {currentCourse.lessons.map((lesson, index) => {
                            const TypeIcon = getTypeIcon(lesson.type);
                            return (
                              <div
                                key={lesson.id}
                                className={`p-6 rounded-lg border transition-all duration-300 ${
                                  lesson.isLocked
                                    ? 'border-gray-700/30 bg-gray-800/30 opacity-60'
                                    : 'border-gray-700/50 bg-gray-800/50 hover:bg-gray-800/70 cursor-pointer hover:-translate-y-1 transform'
                                }`}
                                onClick={() => !lesson.isLocked && handleLessonSelect(lesson.id)}
                              >
                                <div className="flex items-start space-x-4">
                                  <div className="flex-shrink-0">
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                      lesson.isLocked ? 'bg-gray-700' : 'bg-cyan-500/20'
                                    }`}>
                                      {lesson.isLocked ? (
                                        <Lock className="h-6 w-6 text-gray-400" />
                                      ) : lesson.isCompleted ? (
                                        <CheckCircle className="h-6 w-6 text-green-400" />
                                      ) : (
                                        <TypeIcon className="h-6 w-6 text-cyan-400" />
                                      )}
                                    </div>
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                      <span className="text-sm text-gray-500">Lesson {index + 1}</span>
                                      <span className="px-2 py-1 rounded text-xs bg-gray-600/20 text-gray-400 border border-gray-600/30">
                                        {lesson.type}
                                      </span>
                                    </div>
                                    <h4 className={`text-lg font-semibold mb-2 ${lesson.isLocked ? 'text-gray-400' : 'text-white'}`}>
                                      {lesson.title}
                                    </h4>
                                    <p className={`text-sm mb-3 ${lesson.isLocked ? 'text-gray-500' : 'text-gray-300'}`}>
                                      {lesson.description}
                                    </p>
                                    <div className="flex items-center space-x-4 text-sm">
                                      <div className="flex items-center space-x-1">
                                        <Clock className="h-4 w-4 text-gray-400" />
                                        <span className="text-gray-400">{lesson.duration}</span>
                                      </div>
                                      {!lesson.isLocked && (
                                        <div className="flex items-center space-x-1 text-cyan-400">
                                          <Play className="h-4 w-4" />
                                          <span>Start Lesson</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ) : (
                /* Lesson Content */
                currentLesson && (
                  <div className="space-y-8">
                    {/* Lesson Header */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setSelectedLesson('')}
                            className="text-cyan-400 hover:text-white transition-colors"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <span className="text-sm text-gray-400">
                            {currentCourse?.title} / Lesson {currentCourse?.lessons.findIndex(l => l.id === selectedLesson) + 1}
                          </span>
                        </div>
                        <h1 className="text-3xl font-bold mb-4 text-white">{currentLesson.title}</h1>
                        <p className="text-gray-300 mb-6">{currentLesson.description}</p>
                        <div className="flex items-center space-x-6">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-400">{currentLesson.duration}</span>
                          </div>
                          <span className="px-3 py-1 rounded text-sm bg-gray-600/20 text-gray-400 border border-gray-600/30">
                            {currentLesson.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Lesson Content */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-xl"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                        {currentLesson.content ? (
                          <div className="prose prose-invert max-w-none">
                            <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">
                              {currentLesson.content}
                            </div>
                          </div>
                        ) : (
                          <div className="text-center py-20">
                            <div className="text-6xl mb-6">📚</div>
                            <h3 className="text-2xl font-semibold text-gray-300 mb-4">Lesson Content Coming Soon</h3>
                            <p className="text-gray-400 text-lg">This lesson is currently being developed. Check back soon!</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => {
                          const prev = getPreviousLesson();
                          if (prev) handleLessonSelect(prev.id);
                        }}
                        disabled={!getPreviousLesson()}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                          getPreviousLesson()
                            ? 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-600'
                            : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Previous</span>
                      </button>

                      <button
                        onClick={() => {
                          const next = getNextLesson();
                          if (next && !next.isLocked) handleLessonSelect(next.id);
                        }}
                        disabled={!getNextLesson() || getNextLesson()?.isLocked}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                          getNextLesson() && !getNextLesson()?.isLocked
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/25'
                            : 'bg-gray-800/50 text-gray-500 cursor-not-allowed border border-gray-700/30'
                        }`}
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;