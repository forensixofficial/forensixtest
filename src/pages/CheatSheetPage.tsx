import React, { useState, useEffect, useMemo } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Search,
  Copy,
  BookOpen,
  Shield,
  Activity,
  Heart,
  Zap,
  FileText,
  Database,
  HardDrive,
  Monitor,
  Globe,
  Clock,
  User,
  Settings,
  FolderOpen,
  Terminal,
  Key,
  Eye,
  AlertTriangle,
  CheckCircle,
  Hash,
  Server,
  Wifi,
  Smartphone,
  Mail,
  Calendar,
  MapPin,
  Lock,
  Unlock,
  Code,
  Filter
} from 'lucide-react';

interface ArtifactItem {
  id: string;
  title: string;
  path: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
}

const CheatSheetPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = [
    { id: 'all', name: 'All Artifacts', icon: Database, color: 'text-cyan-400' },
    { id: 'system-info', name: 'System Information', icon: Monitor, color: 'text-blue-400' },
    { id: 'file-usage', name: 'File/Folder Usage', icon: FolderOpen, color: 'text-green-400' },
    { id: 'execution', name: 'Evidence of Execution', icon: Zap, color: 'text-orange-400' },
    { id: 'usb-devices', name: 'USB/External Devices', icon: HardDrive, color: 'text-purple-400' },
    { id: 'browser', name: 'Browser Artifacts', icon: Globe, color: 'text-pink-400' },
    { id: 'registry', name: 'Registry Hives', icon: Key, color: 'text-red-400' },
    { id: 'event-logs', name: 'Event Logs', icon: FileText, color: 'text-yellow-400' }
  ];

  const artifacts: ArtifactItem[] = [
    // System Information
    {
      id: 'os-version',
      title: 'OS Version',
      path: 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      description: 'Windows operating system version information',
      category: 'system-info',
      tags: ['windows', 'version', 'os', 'system']
    },
    {
      id: 'current-control-set',
      title: 'Current Control Set',
      path: 'HKLM\\SYSTEM\\CurrentControlSet',
      description: 'Active control set for system configuration',
      category: 'system-info',
      tags: ['control', 'system', 'configuration']
    },
    {
      id: 'control-set-select',
      title: 'Control Set Selection',
      path: 'SYSTEM\\Select\\Current\nSYSTEM\\Select\\LastKnownGood',
      description: 'Current and last known good control set identifiers',
      category: 'system-info',
      tags: ['control', 'select', 'boot']
    },
    {
      id: 'computer-name',
      title: 'Computer Name',
      path: 'SYSTEM\\CurrentControlSet\\Control\\ComputerName\\ComputerName',
      description: 'System computer name configuration',
      category: 'system-info',
      tags: ['computer', 'name', 'hostname']
    },
    {
      id: 'timezone',
      title: 'Time Zone Information',
      path: 'SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation',
      description: 'System timezone settings and configuration',
      category: 'system-info',
      tags: ['timezone', 'time', 'configuration']
    },
    {
      id: 'network-interfaces',
      title: 'Network Interfaces',
      path: 'SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces',
      description: 'Network interface configuration and past networks',
      category: 'system-info',
      tags: ['network', 'interfaces', 'tcp', 'ip']
    },
    {
      id: 'user-profiles',
      title: 'User Profiles',
      path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList',
      description: 'User profile information and paths',
      category: 'system-info',
      tags: ['users', 'profiles', 'accounts']
    },
    {
      id: 'last-shutdown',
      title: 'Last Shutdown Time',
      path: 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Windows',
      description: 'System shutdown time information',
      category: 'system-info',
      tags: ['shutdown', 'time', 'system']
    },

    // Autostart Programs
    {
      id: 'run-current-user',
      title: 'Run (Current User)',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
      description: 'Programs that run automatically for current user',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'run', 'user', 'startup']
    },
    {
      id: 'run-once-user',
      title: 'RunOnce (Current User)',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
      description: 'Programs that run once for current user',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'runonce', 'user', 'startup']
    },
    {
      id: 'run-all-users',
      title: 'Run (All Users)',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run',
      description: 'Programs that run automatically for all users',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'run', 'global', 'startup']
    },
    {
      id: 'run-once-all-users',
      title: 'RunOnce (All Users)',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
      description: 'Programs that run once for all users',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'runonce', 'global', 'startup']
    },
    {
      id: 'run-policies',
      title: 'Run Policies',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\policies\\Explorer\\Run',
      description: 'Group policy defined autostart programs',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'policies', 'group policy', 'startup']
    },

    // SAM Information
    {
      id: 'sam-users',
      title: 'SAM User Information',
      path: 'SAM\\Domains\\Account\\Users',
      description: 'User account information from SAM hive',
      category: 'system-info',
      subcategory: 'sam',
      tags: ['sam', 'users', 'accounts', 'passwords']
    },

    // File/Folder Usage
    {
      id: 'recent-docs',
      title: 'Recent Documents',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs',
      description: 'Recently accessed documents and files',
      category: 'file-usage',
      tags: ['recent', 'documents', 'files', 'access']
    },
    {
      id: 'office-recent',
      title: 'Office Recent Files',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Office\\VERSION\nNTUSER.DAT\\Software\\Microsoft\\Office\\VERSION\\UserMRU\\LiveID_####\\FileMRU',
      description: 'Recently accessed Microsoft Office files',
      category: 'file-usage',
      tags: ['office', 'recent', 'documents', 'mru']
    },
    {
      id: 'shellbags',
      title: 'ShellBags',
      path: 'USRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\Bags\nUSRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\BagMRU\nNTUSER.DAT\\Software\\Microsoft\\Windows\\Shell\\BagMRU\nNTUSER.DAT\\Software\\Microsoft\\Windows\\Shell\\Bags',
      description: 'Folder access history and view preferences',
      category: 'file-usage',
      tags: ['shellbags', 'folders', 'explorer', 'access']
    },
    {
      id: 'open-save-mru',
      title: 'Open/Save Dialog MRUs',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePIDlMRU',
      description: 'Most Recently Used files in Open/Save dialogs',
      category: 'file-usage',
      tags: ['open', 'save', 'dialog', 'mru']
    },
    {
      id: 'last-visited-mru',
      title: 'Last Visited MRU',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\LastVisitedPidlMRU',
      description: 'Last visited locations in Open/Save dialogs',
      category: 'file-usage',
      tags: ['last visited', 'dialog', 'mru', 'locations']
    },
    {
      id: 'typed-paths',
      title: 'Explorer Address Bar',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\TypedPaths',
      description: 'Manually typed paths in Windows Explorer address bar',
      category: 'file-usage',
      tags: ['explorer', 'address bar', 'typed paths']
    },
    {
      id: 'search-queries',
      title: 'Explorer Search Queries',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\WordWheelQuery',
      description: 'Search queries performed in Windows Explorer',
      category: 'file-usage',
      tags: ['search', 'queries', 'explorer', 'wordwheel']
    },

    // Evidence of Execution
    {
      id: 'userassist',
      title: 'UserAssist',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\Currentversion\\Explorer\\UserAssist\\{GUID}\\Count',
      description: 'Program execution tracking with run count and last execution time',
      category: 'execution',
      tags: ['userassist', 'execution', 'programs', 'count']
    },
    {
      id: 'shimcache',
      title: 'ShimCache (Application Compatibility Cache)',
      path: 'SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache',
      description: 'Application execution artifacts and compatibility information',
      category: 'execution',
      tags: ['shimcache', 'execution', 'compatibility', 'applications']
    },
    {
      id: 'amcache',
      title: 'AmCache',
      path: 'Amcache.hve\\Root\\File\\{Volume GUID}\\',
      description: 'Application installation and execution tracking',
      category: 'execution',
      tags: ['amcache', 'applications', 'installation', 'execution']
    },
    {
      id: 'bam-dam',
      title: 'BAM/DAM',
      path: 'SYSTEM\\CurrentControlSet\\Services\\bam\\UserSettings\\{SID}\nSYSTEM\\CurrentControlSet\\Services\\dam\\UserSettings\\{SID}',
      description: 'Background Activity Moderator and Desktop Activity Moderator execution tracking',
      category: 'execution',
      tags: ['bam', 'dam', 'execution', 'background activity']
    },

    // USB/External Devices
    {
      id: 'usbstor',
      title: 'USB Storage Devices',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USBSTOR',
      description: 'USB storage device identification and history',
      category: 'usb-devices',
      tags: ['usb', 'storage', 'devices', 'external']
    },
    {
      id: 'usb-devices',
      title: 'USB Devices',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USB',
      description: 'All USB device connections and information',
      category: 'usb-devices',
      tags: ['usb', 'devices', 'connections']
    },
    {
      id: 'usb-timestamps',
      title: 'USB Connection Timestamps',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Ven_Prod_Version\\USBSerial#\\Properties\\{83da6326-97a6-4088-9453-a19231573b29}\\####',
      description: 'USB device first connection (0064), last connection (0066), and last removal (0067) timestamps',
      category: 'usb-devices',
      tags: ['usb', 'timestamps', 'connection', 'removal']
    },
    {
      id: 'usb-volume-names',
      title: 'USB Volume Names',
      path: 'SOFTWARE\\Microsoft\\Windows Portable Devices\\Devices',
      description: 'USB device volume names and friendly names',
      category: 'usb-devices',
      tags: ['usb', 'volume', 'names', 'portable devices']
    },

    // Browser Artifacts - Microsoft Edge (Chromium)
    {
      id: 'edge-chromium-profile',
      title: 'Edge Chromium Profile',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\*',
      description: 'Microsoft Edge Chromium user profile data',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'profile', 'browser']
    },
    {
      id: 'edge-chromium-history',
      title: 'Edge Chromium History',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\History',
      description: 'Microsoft Edge Chromium browsing history database',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'history', 'sqlite']
    },
    {
      id: 'edge-chromium-cookies',
      title: 'Edge Chromium Cookies',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Network\\Cookies',
      description: 'Microsoft Edge Chromium cookies database',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'cookies', 'sqlite']
    },
    {
      id: 'edge-chromium-cache',
      title: 'Edge Chromium Cache',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Cache\\*',
      description: 'Microsoft Edge Chromium cached files',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'cache', 'files']
    },
    {
      id: 'edge-chromium-sessions',
      title: 'Edge Chromium Sessions',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Sessions\\*',
      description: 'Microsoft Edge Chromium session data',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'sessions', 'tabs']
    },
    {
      id: 'edge-chromium-preferences',
      title: 'Edge Chromium Preferences',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Preferences',
      description: 'Microsoft Edge Chromium settings and configuration',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'preferences', 'settings']
    },

    // Browser Artifacts - Google Chrome
    {
      id: 'chrome-profile',
      title: 'Chrome Profile',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\*',
      description: 'Google Chrome user profile data',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'profile', 'browser']
    },
    {
      id: 'chrome-history',
      title: 'Chrome History',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\History',
      description: 'Google Chrome browsing history database',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'history', 'sqlite']
    },
    {
      id: 'chrome-cookies',
      title: 'Chrome Cookies',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Network\\Cookies',
      description: 'Google Chrome cookies database',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'cookies', 'sqlite']
    },
    {
      id: 'chrome-cache',
      title: 'Chrome Cache',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Cache\\*',
      description: 'Google Chrome cached files',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'cache', 'files']
    },
    {
      id: 'chrome-sessions',
      title: 'Chrome Sessions',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Sessions\\*',
      description: 'Google Chrome session data',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'sessions', 'tabs']
    },
    {
      id: 'chrome-preferences',
      title: 'Chrome Preferences',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Preferences',
      description: 'Google Chrome settings and configuration',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'preferences', 'settings']
    },

    // Browser Artifacts - Mozilla Firefox
    {
      id: 'firefox-profile',
      title: 'Firefox Profile',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\*',
      description: 'Mozilla Firefox user profile data',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'profile', 'browser']
    },
    {
      id: 'firefox-places',
      title: 'Firefox Places',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\places.sqlite',
      description: 'Firefox history, bookmarks, and downloads database',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'places', 'history', 'bookmarks', 'sqlite']
    },
    {
      id: 'firefox-cookies',
      title: 'Firefox Cookies',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\cookies.sqlite',
      description: 'Mozilla Firefox cookies database',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'cookies', 'sqlite']
    },
    {
      id: 'firefox-cache',
      title: 'Firefox Cache',
      path: '%LocalAppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\cache2\\*',
      description: 'Mozilla Firefox cached files',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'cache', 'files']
    },
    {
      id: 'firefox-sessions',
      title: 'Firefox Sessions',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\sessionstore-backups\\*',
      description: 'Mozilla Firefox session data',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'sessions', 'tabs']
    },
    {
      id: 'firefox-preferences',
      title: 'Firefox Preferences',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\prefs.js',
      description: 'Mozilla Firefox settings and configuration',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'preferences', 'settings']
    },

    // Browser Artifacts - Microsoft Edge Legacy
    {
      id: 'edge-legacy-profile',
      title: 'Edge Legacy Profile',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC',
      description: 'Microsoft Edge Legacy user profile data',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'profile', 'browser']
    },
    {
      id: 'edge-legacy-webcache',
      title: 'Edge Legacy WebCache',
      path: '%LocalAppData%\\Microsoft\\Windows\\WebCache\\WebCacheV01.dat',
      description: 'Edge Legacy history, cookies, and downloads (ESE database)',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'webcache', 'ese']
    },
    {
      id: 'edge-legacy-cache',
      title: 'Edge Legacy Cache',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC#!XXX\\MicrosoftEdge\\Cache',
      description: 'Microsoft Edge Legacy cached files',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'cache', 'files']
    },
    {
      id: 'edge-legacy-sessions',
      title: 'Edge Legacy Sessions',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC\\MicrosoftEdge\\User\\Default\\Recovery\\Active',
      description: 'Microsoft Edge Legacy session data',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'sessions', 'tabs']
    },
    {
      id: 'edge-legacy-settings',
      title: 'Edge Legacy Settings',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC\\MicrosoftEdge\\User\\Default\\DataStore\\Data\\nouser1\\XXX\\DBStore\\spartan.edb',
      description: 'Microsoft Edge Legacy settings and configuration',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'settings', 'edb']
    },

    // Browser Artifacts - Internet Explorer
    {
      id: 'ie-webcache',
      title: 'Internet Explorer WebCache',
      path: '%LocalAppData%\\Microsoft\\Windows\\WebCache\\WebCacheV01.dat',
      description: 'Internet Explorer artifacts (ESE database)',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'webcache', 'ese']
    },
    {
      id: 'ie-cookies',
      title: 'Internet Explorer Cookies',
      path: '%AppData%\\Microsoft\\Windows\\Cookies',
      description: 'Internet Explorer cookies (stored separately from WebCache)',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'cookies', 'files']
    },
    {
      id: 'ie-sessions',
      title: 'Internet Explorer Sessions',
      path: '%LocalAppData%\\Microsoft\\Internet Explorer\\Recovery\\*.dat',
      description: 'Internet Explorer session recovery data',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'sessions', 'recovery']
    },

    // Registry Hives
    {
      id: 'registry-default',
      title: 'DEFAULT Hive',
      path: '\\Windows\\System32\\config\\DEFAULT',
      description: 'Default user profile registry hive',
      category: 'registry',
      tags: ['registry', 'default', 'hive', 'system']
    },
    {
      id: 'registry-sam',
      title: 'SAM Hive',
      path: '\\Windows\\System32\\config\\SAM',
      description: 'Security Account Manager registry hive',
      category: 'registry',
      tags: ['registry', 'sam', 'hive', 'security', 'accounts']
    },
    {
      id: 'registry-security',
      title: 'SECURITY Hive',
      path: '\\Windows\\System32\\config\\SECURITY',
      description: 'Security policy registry hive',
      category: 'registry',
      tags: ['registry', 'security', 'hive', 'policy']
    },
    {
      id: 'registry-software',
      title: 'SOFTWARE Hive',
      path: '\\Windows\\System32\\config\\SOFTWARE',
      description: 'System-wide software configuration registry hive',
      category: 'registry',
      tags: ['registry', 'software', 'hive', 'system']
    },
    {
      id: 'registry-system',
      title: 'SYSTEM Hive',
      path: '\\Windows\\System32\\config\\SYSTEM',
      description: 'System configuration registry hive',
      category: 'registry',
      tags: ['registry', 'system', 'hive', 'configuration']
    },
    {
      id: 'registry-ntuser',
      title: 'NTUSER.DAT',
      path: '\\Users\\<user>\\NTUSER.DAT',
      description: 'User-specific registry hive',
      category: 'registry',
      tags: ['registry', 'ntuser', 'hive', 'user']
    },
    {
      id: 'registry-usrclass',
      title: 'UsrClass.dat',
      path: '\\Users\\<user>\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat',
      description: 'User class registration registry hive',
      category: 'registry',
      tags: ['registry', 'usrclass', 'hive', 'user']
    },

    // Event Logs
    {
      id: 'event-logs-location',
      title: 'Event Logs Location',
      path: 'C:\\Windows\\System32\\winevt\\logs',
      description: 'Windows Event Log files location',
      category: 'event-logs',
      tags: ['event logs', 'windows', 'logs', 'evtx']
    },

    // Tasks
    {
      id: 'scheduled-tasks-registry',
      title: 'Scheduled Tasks (Registry)',
      path: 'HKLM\\Software\\Microsoft\\Windows NT\\Current Version\\Schedule\\TaskCache\\Tasks\nHKLM\\Software\\Microsoft\\Windows NT\\Current Version\\Schedule\\TaskCache\\Tree',
      description: 'Scheduled tasks information in registry',
      category: 'system-info',
      subcategory: 'tasks',
      tags: ['scheduled tasks', 'registry', 'automation']
    },
    {
      id: 'scheduled-tasks-files',
      title: 'Scheduled Tasks (Files)',
      path: 'C:\\Windows\\System32\\Tasks',
      description: 'Scheduled task definition files',
      category: 'system-info',
      subcategory: 'tasks',
      tags: ['scheduled tasks', 'files', 'automation']
    },

    // Startup Folders
    {
      id: 'startup-user',
      title: 'Startup Folder (User)',
      path: 'C:\\Users\\Username\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup',
      description: 'User-specific startup folder',
      category: 'system-info',
      subcategory: 'startup',
      tags: ['startup', 'user', 'autostart']
    },
    {
      id: 'startup-all-users',
      title: 'Startup Folder (All Users)',
      path: 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp',
      description: 'System-wide startup folder',
      category: 'system-info',
      subcategory: 'startup',
      tags: ['startup', 'all users', 'autostart']
    }
  ];

  const filteredArtifacts = useMemo(() => {
    return artifacts.filter(artifact => {
      const matchesCategory = selectedCategory === 'all' || artifact.category === selectedCategory;
      const matchesSearch = 
        artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const copyToClipboard = (text: string, itemId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemId);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Database;
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : 'text-gray-400';
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
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-blue-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <BookOpen className="h-16 w-16 text-blue-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    DFIR CheatSheet
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Comprehensive reference guide for Windows forensic artifacts, registry locations, 
                  and digital evidence sources. Your quick reference for incident response investigations.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 space-y-6">
              {/* Search */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Search className="h-5 w-5 text-cyan-400" />
                    <h3 className="font-semibold text-white">Search Artifacts</h3>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, path, or description..."
                    className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <Filter className="h-5 w-5 text-purple-400" />
                    <h3 className="font-semibold text-white">Categories</h3>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          selectedCategory === category.id
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                        <span className="text-sm">{category.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">{filteredArtifacts.length}</div>
                    <div className="text-sm text-gray-400">Artifacts Found</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="space-y-4">
                {filteredArtifacts.map((artifact) => {
                  const CategoryIcon = getCategoryIcon(artifact.category);
                  const categoryColor = getCategoryColor(artifact.category);
                  
                  return (
                    <div key={artifact.id} className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                      <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 group-hover:-translate-y-1 transform">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start space-x-3 flex-1">
                            <CategoryIcon className={`h-6 w-6 ${categoryColor} mt-1 flex-shrink-0`} />
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                {artifact.title}
                              </h3>
                              {artifact.subcategory && (
                                <span className="inline-block px-2 py-1 rounded-md text-xs font-medium bg-gray-600/20 text-gray-400 border border-gray-600/30 mb-2">
                                  {artifact.subcategory}
                                </span>
                              )}
                              <p className="text-gray-300 mb-3 leading-relaxed text-sm">
                                {artifact.description}
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => copyToClipboard(artifact.path, artifact.id)}
                            className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors group/copy flex-shrink-0"
                            title="Copy path to clipboard"
                          >
                            {copiedItem === artifact.id ? (
                              <CheckCircle className="h-4 w-4 text-green-400" />
                            ) : (
                              <Copy className="h-4 w-4 text-cyan-400 group-hover/copy:scale-110 transition-transform" />
                            )}
                          </button>
                        </div>

                        {/* Path */}
                        <div className="mb-4">
                          <div className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4">
                            <div className="flex items-center space-x-2 mb-2">
                              <FolderOpen className="h-4 w-4 text-orange-400" />
                              <span className="text-sm font-semibold text-orange-400">Path:</span>
                            </div>
                            <pre className="text-cyan-300 font-mono text-sm whitespace-pre-wrap break-all">
                              {artifact.path}
                            </pre>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {artifact.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs border border-gray-600/50"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredArtifacts.length === 0 && (
                <div className="text-center py-16">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">No artifacts found</h3>
                      <p className="text-gray-400">Try adjusting your search criteria or category filter</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheatSheetPage;