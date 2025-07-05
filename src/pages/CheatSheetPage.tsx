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
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Bookmark,
  Layers,
  Cpu,
  Network,
  Disc,
  ShieldCheck,
  FileSearch,
  FileInput,
  FileOutput,
  File,
  FilePlus,
  FileMinus,
  FileCheck,
  FileX,
  FileDigit
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ArtifactItem {
  id: string;
  title: string;
  path: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  favorite?: boolean;
}

const CheatSheetPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [expandedArtifact, setExpandedArtifact] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('dfir-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dfir-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id) 
        : [...prev, id]
    );
  };

  const toggleExpand = (id: string) => {
    setExpandedArtifact(prev => prev === id ? null : id);
  };

  const categories = [
    { id: 'all', name: 'All Artifacts', icon: Database, color: 'text-cyan-400', bgColor: 'bg-cyan-400/10' },
    { id: 'system-info', name: 'System Information', icon: Monitor, color: 'text-blue-400', bgColor: 'bg-blue-400/10' },
    { id: 'file-usage', name: 'File/Folder Usage', icon: FolderOpen, color: 'text-green-400', bgColor: 'bg-green-400/10' },
    { id: 'execution', name: 'Evidence of Execution', icon: Zap, color: 'text-orange-400', bgColor: 'bg-orange-400/10' },
    { id: 'usb-devices', name: 'USB/External Devices', icon: HardDrive, color: 'text-purple-400', bgColor: 'bg-purple-400/10' },
    { id: 'browser', name: 'Browser Artifacts', icon: Globe, color: 'text-pink-400', bgColor: 'bg-pink-400/10' },
    { id: 'registry', name: 'Registry Hives', icon: Key, color: 'text-red-400', bgColor: 'bg-red-400/10' },
    { id: 'event-logs', name: 'Event Logs', icon: FileText, color: 'text-yellow-400', bgColor: 'bg-yellow-400/10' }
  ];

  const artifacts: ArtifactItem[] = [
    // System Information
    {
      id: 'os-version',
      title: 'OS Version',
      path: 'SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion',
      description: 'Windows operating system version information including build number, product name, and installation date.',
      category: 'system-info',
      tags: ['windows', 'version', 'os', 'system']
    },
    {
      id: 'current-control-set',
      title: 'Current Control Set',
      path: 'HKLM\\SYSTEM\\CurrentControlSet',
      description: 'Active control set containing system configuration data including services, hardware, and software settings.',
      category: 'system-info',
      tags: ['control', 'system', 'configuration']
    },
    {
      id: 'control-set-select',
      title: 'Control Set Selection',
      path: 'SYSTEM\\Select\\Current\nSYSTEM\\Select\\LastKnownGood',
      description: 'Current and last known good control set identifiers which can help identify system changes between boots.',
      category: 'system-info',
      tags: ['control', 'select', 'boot']
    },
    {
      id: 'computer-name',
      title: 'Computer Name',
      path: 'SYSTEM\\CurrentControlSet\\Control\\ComputerName\\ComputerName',
      description: 'System computer name configuration which can help identify the machine in network logs.',
      category: 'system-info',
      tags: ['computer', 'name', 'hostname']
    },
    {
      id: 'timezone',
      title: 'Time Zone Information',
      path: 'SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation',
      description: 'System timezone settings and configuration which is crucial for timestamp interpretation.',
      category: 'system-info',
      tags: ['timezone', 'time', 'configuration']
    },
    {
      id: 'network-interfaces',
      title: 'Network Interfaces',
      path: 'SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters\\Interfaces',
      description: 'Network interface configuration including IP addresses, DHCP settings, and past network connections.',
      category: 'system-info',
      tags: ['network', 'interfaces', 'tcp', 'ip']
    },
    {
      id: 'user-profiles',
      title: 'User Profiles',
      path: 'HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\ProfileList',
      description: 'User profile information including SIDs, profile paths, and last load times for each user.',
      category: 'system-info',
      tags: ['users', 'profiles', 'accounts']
    },
    {
      id: 'last-shutdown',
      title: 'Last Shutdown Time',
      path: 'HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Control\\Windows',
      description: 'System shutdown time information which can help establish timelines during investigations.',
      category: 'system-info',
      tags: ['shutdown', 'time', 'system']
    },

    // Autostart Programs
    {
      id: 'run-current-user',
      title: 'Run (Current User)',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Run',
      description: 'Programs that automatically run when the current user logs in. Common persistence mechanism for malware.',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'run', 'user', 'startup']
    },
    {
      id: 'run-once-user',
      title: 'RunOnce (Current User)',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
      description: 'Programs that run once when the current user logs in. Often used by installers and updates.',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'runonce', 'user', 'startup']
    },
    {
      id: 'run-all-users',
      title: 'Run (All Users)',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run',
      description: 'Programs that automatically run for all users when they log in. System-wide persistence location.',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'run', 'global', 'startup']
    },
    {
      id: 'run-once-all-users',
      title: 'RunOnce (All Users)',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\RunOnce',
      description: 'Programs that run once for all users when they log in. System-wide one-time execution point.',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'runonce', 'global', 'startup']
    },
    {
      id: 'run-policies',
      title: 'Run Policies',
      path: 'SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\policies\\Explorer\\Run',
      description: 'Group policy defined autostart programs. Often overlooked persistence mechanism.',
      category: 'system-info',
      subcategory: 'autostart',
      tags: ['autostart', 'policies', 'group policy', 'startup']
    },

    // SAM Information
    {
      id: 'sam-users',
      title: 'SAM User Information',
      path: 'SAM\\Domains\\Account\\Users',
      description: 'User account information including usernames, password hashes (when available), and account status from the SAM hive.',
      category: 'system-info',
      subcategory: 'sam',
      tags: ['sam', 'users', 'accounts', 'passwords']
    },

    // File/Folder Usage
    {
      id: 'recent-docs',
      title: 'Recent Documents',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\RecentDocs',
      description: 'Recently accessed documents and files with extensions. Shows user file interaction history.',
      category: 'file-usage',
      tags: ['recent', 'documents', 'files', 'access']
    },
    {
      id: 'office-recent',
      title: 'Office Recent Files',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Office\\VERSION\nNTUSER.DAT\\Software\\Microsoft\\Office\\VERSION\\UserMRU\\LiveID_####\\FileMRU',
      description: 'Recently accessed Microsoft Office files including Word, Excel, PowerPoint with timestamps.',
      category: 'file-usage',
      tags: ['office', 'recent', 'documents', 'mru']
    },
    {
      id: 'shellbags',
      title: 'ShellBags',
      path: 'USRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\Bags\nUSRCLASS.DAT\\Local Settings\\Software\\Microsoft\\Windows\\Shell\\BagMRU\nNTUSER.DAT\\Software\\Microsoft\\Windows\\Shell\\BagMRU\nNTUSER.DAT\\Software\\Microsoft\\Windows\\Shell\\Bags',
      description: 'Folder access history including view preferences, window size, and sort order. Shows user browsing habits.',
      category: 'file-usage',
      tags: ['shellbags', 'folders', 'explorer', 'access']
    },
    {
      id: 'open-save-mru',
      title: 'Open/Save Dialog MRUs',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\OpenSavePIDlMRU',
      description: 'Most Recently Used files in Open/Save dialogs across applications. Shows file access patterns.',
      category: 'file-usage',
      tags: ['open', 'save', 'dialog', 'mru']
    },
    {
      id: 'last-visited-mru',
      title: 'Last Visited MRU',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\ComDlg32\\LastVisitedPidlMRU',
      description: 'Last visited locations in Open/Save dialogs. Shows where users commonly navigate when saving files.',
      category: 'file-usage',
      tags: ['last visited', 'dialog', 'mru', 'locations']
    },
    {
      id: 'typed-paths',
      title: 'Explorer Address Bar',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\TypedPaths',
      description: 'Manually typed paths in Windows Explorer address bar. Shows user navigation habits.',
      category: 'file-usage',
      tags: ['explorer', 'address bar', 'typed paths']
    },
    {
      id: 'search-queries',
      title: 'Explorer Search Queries',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\WordWheelQuery',
      description: 'Search queries performed in Windows Explorer. Shows what files users were looking for.',
      category: 'file-usage',
      tags: ['search', 'queries', 'explorer', 'wordwheel']
    },

    // Evidence of Execution
    {
      id: 'userassist',
      title: 'UserAssist',
      path: 'NTUSER.DAT\\Software\\Microsoft\\Windows\\Currentversion\\Explorer\\UserAssist\\{GUID}\\Count',
      description: 'Program execution tracking with run count and last execution time in ROT13 encoded format.',
      category: 'execution',
      tags: ['userassist', 'execution', 'programs', 'count']
    },
    {
      id: 'shimcache',
      title: 'ShimCache (Application Compatibility Cache)',
      path: 'SYSTEM\\CurrentControlSet\\Control\\Session Manager\\AppCompatCache',
      description: 'Application execution artifacts including file paths and last modification times. Persists across reboots.',
      category: 'execution',
      tags: ['shimcache', 'execution', 'compatibility', 'applications']
    },
    {
      id: 'amcache',
      title: 'AmCache',
      path: 'Amcache.hve\\Root\\File\\{Volume GUID}\\',
      description: 'Application installation and execution tracking including file hashes and execution times.',
      category: 'execution',
      tags: ['amcache', 'applications', 'installation', 'execution']
    },
    {
      id: 'bam-dam',
      title: 'BAM/DAM',
      path: 'SYSTEM\\CurrentControlSet\\Services\\bam\\UserSettings\\{SID}\nSYSTEM\\CurrentControlSet\\Services\\dam\\UserSettings\\{SID}',
      description: 'Background Activity Moderator and Desktop Activity Moderator execution tracking for applications.',
      category: 'execution',
      tags: ['bam', 'dam', 'execution', 'background activity']
    },

    // USB/External Devices
    {
      id: 'usbstor',
      title: 'USB Storage Devices',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USBSTOR',
      description: 'USB storage device identification including vendor, product, and serial numbers.',
      category: 'usb-devices',
      tags: ['usb', 'storage', 'devices', 'external']
    },
    {
      id: 'usb-devices',
      title: 'USB Devices',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USB',
      description: 'All USB device connections including non-storage devices like keyboards, mice, and other peripherals.',
      category: 'usb-devices',
      tags: ['usb', 'devices', 'connections']
    },
    {
      id: 'usb-timestamps',
      title: 'USB Connection Timestamps',
      path: 'SYSTEM\\CurrentControlSet\\Enum\\USBSTOR\\Ven_Prod_Version\\USBSerial#\\Properties\\{83da6326-97a6-4088-9453-a19231573b29}\\####',
      description: 'USB device first connection (0064), last connection (0066), and last removal (0067) timestamps in FILETIME format.',
      category: 'usb-devices',
      tags: ['usb', 'timestamps', 'connection', 'removal']
    },
    {
      id: 'usb-volume-names',
      title: 'USB Volume Names',
      path: 'SOFTWARE\\Microsoft\\Windows Portable Devices\\Devices',
      description: 'USB device volume names and friendly names as assigned by the user or system.',
      category: 'usb-devices',
      tags: ['usb', 'volume', 'names', 'portable devices']
    },

    // Browser Artifacts - Microsoft Edge (Chromium)
    {
      id: 'edge-chromium-profile',
      title: 'Edge Chromium Profile',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\*',
      description: 'Microsoft Edge Chromium user profile data including extensions, preferences, and browsing data.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'profile', 'browser']
    },
    {
      id: 'edge-chromium-history',
      title: 'Edge Chromium History',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\History',
      description: 'Microsoft Edge Chromium browsing history database (SQLite) containing URLs, visit counts, and timestamps.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'history', 'sqlite']
    },
    {
      id: 'edge-chromium-cookies',
      title: 'Edge Chromium Cookies',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Network\\Cookies',
      description: 'Microsoft Edge Chromium cookies database (SQLite) containing authentication tokens and tracking cookies.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'cookies', 'sqlite']
    },
    {
      id: 'edge-chromium-cache',
      title: 'Edge Chromium Cache',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Cache\\*',
      description: 'Microsoft Edge Chromium cached files including images, scripts, and other web resources.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'cache', 'files']
    },
    {
      id: 'edge-chromium-sessions',
      title: 'Edge Chromium Sessions',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Sessions\\*',
      description: 'Microsoft Edge Chromium session data including open tabs and navigation history from current/last session.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'sessions', 'tabs']
    },
    {
      id: 'edge-chromium-preferences',
      title: 'Edge Chromium Preferences',
      path: '%LocalAppData%\\Microsoft\\Edge\\User Data\\[Default|Profile X]\\Preferences',
      description: 'Microsoft Edge Chromium settings and configuration in JSON format including sync settings and flags.',
      category: 'browser',
      subcategory: 'edge-chromium',
      tags: ['edge', 'chromium', 'preferences', 'settings']
    },

    // Browser Artifacts - Google Chrome
    {
      id: 'chrome-profile',
      title: 'Chrome Profile',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\*',
      description: 'Google Chrome user profile data including extensions, preferences, and browsing data.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'profile', 'browser']
    },
    {
      id: 'chrome-history',
      title: 'Chrome History',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\History',
      description: 'Google Chrome browsing history database (SQLite) containing URLs, visit counts, and timestamps.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'history', 'sqlite']
    },
    {
      id: 'chrome-cookies',
      title: 'Chrome Cookies',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Network\\Cookies',
      description: 'Google Chrome cookies database (SQLite) containing authentication tokens and tracking cookies.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'cookies', 'sqlite']
    },
    {
      id: 'chrome-cache',
      title: 'Chrome Cache',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Cache\\*',
      description: 'Google Chrome cached files including images, scripts, and other web resources.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'cache', 'files']
    },
    {
      id: 'chrome-sessions',
      title: 'Chrome Sessions',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Sessions\\*',
      description: 'Google Chrome session data including open tabs and navigation history from current/last session.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'sessions', 'tabs']
    },
    {
      id: 'chrome-preferences',
      title: 'Chrome Preferences',
      path: '%LocalAppData%\\Google\\Chrome\\User Data\\Default\\Preferences',
      description: 'Google Chrome settings and configuration in JSON format including sync settings and flags.',
      category: 'browser',
      subcategory: 'chrome',
      tags: ['chrome', 'preferences', 'settings']
    },

    // Browser Artifacts - Mozilla Firefox
    {
      id: 'firefox-profile',
      title: 'Firefox Profile',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\*',
      description: 'Mozilla Firefox user profile data including extensions, preferences, and browsing data.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'profile', 'browser']
    },
    {
      id: 'firefox-places',
      title: 'Firefox Places',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\places.sqlite',
      description: 'Firefox history, bookmarks, and downloads database (SQLite) containing comprehensive browsing data.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'places', 'history', 'bookmarks', 'sqlite']
    },
    {
      id: 'firefox-cookies',
      title: 'Firefox Cookies',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\cookies.sqlite',
      description: 'Mozilla Firefox cookies database (SQLite) containing authentication tokens and tracking cookies.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'cookies', 'sqlite']
    },
    {
      id: 'firefox-cache',
      title: 'Firefox Cache',
      path: '%LocalAppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\cache2\\*',
      description: 'Mozilla Firefox cached files including images, scripts, and other web resources.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'cache', 'files']
    },
    {
      id: 'firefox-sessions',
      title: 'Firefox Sessions',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\sessionstore-backups\\*',
      description: 'Mozilla Firefox session data including open tabs and navigation history from current/last session.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'sessions', 'tabs']
    },
    {
      id: 'firefox-preferences',
      title: 'Firefox Preferences',
      path: '%AppData%\\Mozilla\\Firefox\\Profiles\\xxxxxxxx.default-release\\prefs.js',
      description: 'Mozilla Firefox settings and configuration in JavaScript format including privacy settings.',
      category: 'browser',
      subcategory: 'firefox',
      tags: ['firefox', 'preferences', 'settings']
    },

    // Browser Artifacts - Microsoft Edge Legacy
    {
      id: 'edge-legacy-profile',
      title: 'Edge Legacy Profile',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC',
      description: 'Microsoft Edge Legacy user profile data including browsing history and preferences.',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'profile', 'browser']
    },
    {
      id: 'edge-legacy-webcache',
      title: 'Edge Legacy WebCache',
      path: '%LocalAppData%\\Microsoft\\Windows\\WebCache\\WebCacheV01.dat',
      description: 'Edge Legacy history, cookies, and downloads in ESE database format.',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'webcache', 'ese']
    },
    {
      id: 'edge-legacy-cache',
      title: 'Edge Legacy Cache',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC#!XXX\\MicrosoftEdge\\Cache',
      description: 'Microsoft Edge Legacy cached files including web resources.',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'cache', 'files']
    },
    {
      id: 'edge-legacy-sessions',
      title: 'Edge Legacy Sessions',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC\\MicrosoftEdge\\User\\Default\\Recovery\\Active',
      description: 'Microsoft Edge Legacy session data including open tabs.',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'sessions', 'tabs']
    },
    {
      id: 'edge-legacy-settings',
      title: 'Edge Legacy Settings',
      path: '%LocalAppData%\\Packages\\Microsoft.MicrosoftEdge_XXX\\AC\\MicrosoftEdge\\User\\Default\\DataStore\\Data\\nouser1\\XXX\\DBStore\\spartan.edb',
      description: 'Microsoft Edge Legacy settings and configuration in EDB database format.',
      category: 'browser',
      subcategory: 'edge-legacy',
      tags: ['edge', 'legacy', 'settings', 'edb']
    },

    // Browser Artifacts - Internet Explorer
    {
      id: 'ie-webcache',
      title: 'Internet Explorer WebCache',
      path: '%LocalAppData%\\Microsoft\\Windows\\WebCache\\WebCacheV01.dat',
      description: 'Internet Explorer artifacts including history, cookies, and downloads in ESE database format.',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'webcache', 'ese']
    },
    {
      id: 'ie-cookies',
      title: 'Internet Explorer Cookies',
      path: '%AppData%\\Microsoft\\Windows\\Cookies',
      description: 'Internet Explorer cookies stored as individual files (separate from WebCache).',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'cookies', 'files']
    },
    {
      id: 'ie-sessions',
      title: 'Internet Explorer Sessions',
      path: '%LocalAppData%\\Microsoft\\Internet Explorer\\Recovery\\*.dat',
      description: 'Internet Explorer session recovery data including crashed sessions.',
      category: 'browser',
      subcategory: 'internet-explorer',
      tags: ['internet explorer', 'sessions', 'recovery']
    },

    // Registry Hives
    {
      id: 'registry-default',
      title: 'DEFAULT Hive',
      path: '\\Windows\\System32\\config\\DEFAULT',
      description: 'Default user profile registry hive containing system-wide default settings for new users.',
      category: 'registry',
      tags: ['registry', 'default', 'hive', 'system']
    },
    {
      id: 'registry-sam',
      title: 'SAM Hive',
      path: '\\Windows\\System32\\config\\SAM',
      description: 'Security Account Manager registry hive containing local user account information.',
      category: 'registry',
      tags: ['registry', 'sam', 'hive', 'security', 'accounts']
    },
    {
      id: 'registry-security',
      title: 'SECURITY Hive',
      path: '\\Windows\\System32\\config\\SECURITY',
      description: 'Security policy registry hive containing system security settings and policies.',
      category: 'registry',
      tags: ['registry', 'security', 'hive', 'policy']
    },
    {
      id: 'registry-software',
      title: 'SOFTWARE Hive',
      path: '\\Windows\\System32\\config\\SOFTWARE',
      description: 'System-wide software configuration registry hive containing installed application settings.',
      category: 'registry',
      tags: ['registry', 'software', 'hive', 'system']
    },
    {
      id: 'registry-system',
      title: 'SYSTEM Hive',
      path: '\\Windows\\System32\\config\\SYSTEM',
      description: 'System configuration registry hive containing hardware, services, and system settings.',
      category: 'registry',
      tags: ['registry', 'system', 'hive', 'configuration']
    },
    {
      id: 'registry-ntuser',
      title: 'NTUSER.DAT',
      path: '\\Users\\<user>\\NTUSER.DAT',
      description: 'User-specific registry hive containing user preferences, application settings, and activity data.',
      category: 'registry',
      tags: ['registry', 'ntuser', 'hive', 'user']
    },
    {
      id: 'registry-usrclass',
      title: 'UsrClass.dat',
      path: '\\Users\\<user>\\AppData\\Local\\Microsoft\\Windows\\UsrClass.dat',
      description: 'User class registration registry hive containing COM class registrations and shell extensions.',
      category: 'registry',
      tags: ['registry', 'usrclass', 'hive', 'user']
    },

    // Event Logs
    {
      id: 'event-logs-location',
      title: 'Event Logs Location',
      path: 'C:\\Windows\\System32\\winevt\\logs',
      description: 'Windows Event Log files location containing system, security, and application logs in EVTX format.',
      category: 'event-logs',
      tags: ['event logs', 'windows', 'logs', 'evtx']
    },

    // Tasks
    {
      id: 'scheduled-tasks-registry',
      title: 'Scheduled Tasks (Registry)',
      path: 'HKLM\\Software\\Microsoft\\Windows NT\\Current Version\\Schedule\\TaskCache\\Tasks\nHKLM\\Software\\Microsoft\\Windows NT\\Current Version\\Schedule\\TaskCache\\Tree',
      description: 'Scheduled tasks information in registry including task definitions and execution history.',
      category: 'system-info',
      subcategory: 'tasks',
      tags: ['scheduled tasks', 'registry', 'automation']
    },
    {
      id: 'scheduled-tasks-files',
      title: 'Scheduled Tasks (Files)',
      path: 'C:\\Windows\\System32\\Tasks',
      description: 'Scheduled task definition files in XML format containing task actions and triggers.',
      category: 'system-info',
      subcategory: 'tasks',
      tags: ['scheduled tasks', 'files', 'automation']
    },

    // Startup Folders
    {
      id: 'startup-user',
      title: 'Startup Folder (User)',
      path: 'C:\\Users\\Username\\AppData\\Roaming\\Microsoft\\Windows\\Start Menu\\Programs\\Startup',
      description: 'User-specific startup folder containing shortcuts to programs that run at user login.',
      category: 'system-info',
      subcategory: 'startup',
      tags: ['startup', 'user', 'autostart']
    },
    {
      id: 'startup-all-users',
      title: 'Startup Folder (All Users)',
      path: 'C:\\ProgramData\\Microsoft\\Windows\\Start Menu\\Programs\\StartUp',
      description: 'System-wide startup folder containing shortcuts to programs that run at login for all users.',
      category: 'system-info',
      subcategory: 'startup',
      tags: ['startup', 'all users', 'autostart']
    }
  ];

  const filteredArtifacts = useMemo(() => {
    let result = artifacts.filter(artifact => {
      const matchesCategory = selectedCategory === 'all' || artifact.category === selectedCategory;
      const matchesSearch = 
        artifact.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        artifact.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchesCategory && matchesSearch;
    });

    if (showFavoritesOnly) {
      result = result.filter(artifact => favorites.includes(artifact.id));
    }

    return result;
  }, [selectedCategory, searchQuery, showFavoritesOnly, favorites]);

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

  const getCategoryBgColor = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.bgColor : 'bg-gray-400/10';
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
        <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-green-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-yellow-500/5 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>

      <Navigation />

      <div className="pt-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Loading Overlay */}
          <AnimatePresence>
            {isLoading && (
              <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 bg-gray-950/90 backdrop-blur-sm z-50 flex items-center justify-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Header */}
          <div className="text-center mb-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative group mb-8"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-blue-500/20 rounded-3xl p-8 sm:p-12 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center justify-center space-x-0 sm:space-x-4 mb-6">
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      y: [0, -5, 5, 0]
                    }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8,
                      ease: "easeInOut"
                    }}
                  >
                    <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 text-blue-400" />
                  </motion.div>
                  <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    DFIR CheatSheet
                  </h1>
                </div>
                <p className="text-lg sm:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Comprehensive reference guide for Windows forensic artifacts, registry locations, 
                  and digital evidence sources. Your quick reference for incident response investigations.
                </p>
                <div className="mt-6 flex justify-center space-x-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium">67 Artifacts</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-medium">8 Categories</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium">Windows Forensics</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <div className="lg:w-80 space-y-6">
              {/* Search */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
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
              </motion.div>

              {/* Categories */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Filter className="h-5 w-5 text-purple-400" />
                      <h3 className="font-semibold text-white">Categories</h3>
                    </div>
                    <button 
                      onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                      className={`p-2 rounded-lg transition-colors ${showFavoritesOnly ? 'bg-pink-500/20 text-pink-300' : 'bg-gray-800/50 text-gray-400 hover:text-pink-300'}`}
                    >
                      <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-300 flex items-center space-x-3 ${
                          selectedCategory === category.id
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <category.icon className={`h-4 w-4 ${category.color}`} />
                        <span className="text-sm">{category.name}</span>
                        {selectedCategory === category.id && (
                          <span className="ml-auto text-xs bg-blue-500/20 px-2 py-1 rounded">
                            {artifacts.filter(a => a.category === category.id).length}
                          </span>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-4 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">{filteredArtifacts.length}</div>
                      <div className="text-xs text-gray-400">Artifacts Found</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400 mb-1">{favorites.length}</div>
                      <div className="text-xs text-gray-400">Favorites</div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-700/50">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Showing:</span>
                      <span className="font-medium text-white">
                        {showFavoritesOnly ? 'Favorites Only' : selectedCategory === 'all' ? 'All Categories' : categories.find(c => c.id === selectedCategory)?.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {filteredArtifacts.length > 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-4"
                >
                  {filteredArtifacts.map((artifact) => {
                    const CategoryIcon = getCategoryIcon(artifact.category);
                    const categoryColor = getCategoryColor(artifact.category);
                    const categoryBgColor = getCategoryBgColor(artifact.category);
                    const isFavorite = favorites.includes(artifact.id);
                    
                    return (
                      <motion.div 
                        key={artifact.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl blur-xl group-hover:blur-lg transition-all duration-300"></div>
                        <div className={`relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm hover:bg-gray-900/90 transition-all duration-300 group-hover:-translate-y-1 transform ${isFavorite ? 'ring-1 ring-pink-500/30' : ''}`}>
                          {/* Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`p-2 rounded-lg ${categoryBgColor} flex-shrink-0`}>
                                <CategoryIcon className={`h-5 w-5 ${categoryColor}`} />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                                    {artifact.title}
                                  </h3>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      toggleFavorite(artifact.id);
                                    }}
                                    className={`p-1 rounded-full ${isFavorite ? 'text-pink-400' : 'text-gray-500 hover:text-pink-300'}`}
                                  >
                                    <Star className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
                                  </button>
                                </div>
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
                            <div className="flex space-x-2">
                              <button
                                onClick={() => toggleExpand(artifact.id)}
                                className="p-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors"
                                title={expandedArtifact === artifact.id ? "Collapse" : "Expand"}
                              >
                                {expandedArtifact === artifact.id ? (
                                  <ChevronUp className="h-4 w-4 text-gray-400" />
                                ) : (
                                  <ChevronDown className="h-4 w-4 text-gray-400" />
                                )}
                              </button>
                              <button
                                onClick={() => copyToClipboard(artifact.path, artifact.id)}
                                className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-lg transition-colors group/copy"
                                title="Copy path to clipboard"
                              >
                                {copiedItem === artifact.id ? (
                                  <CheckCircle className="h-4 w-4 text-green-400" />
                                ) : (
                                  <Copy className="h-4 w-4 text-cyan-400 group-hover/copy:scale-110 transition-transform" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Expanded Content */}
                          <AnimatePresence>
                            {expandedArtifact === artifact.id && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
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
                                <div className="flex flex-wrap gap-2 mb-4">
                                  {artifact.tags.map((tag, index) => (
                                    <motion.span
                                      key={index}
                                      whileHover={{ scale: 1.05 }}
                                      className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md text-xs border border-gray-600/50"
                                    >
                                      {tag}
                                    </motion.span>
                                  ))}
                                </div>

                                {/* Quick Actions */}
                                <div className="flex space-x-2">
                                  <button 
                                    onClick={() => copyToClipboard(artifact.title, artifact.id + '-title')}
                                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-xs flex items-center space-x-1 hover:bg-blue-500/30 transition-colors"
                                  >
                                    <FileText className="h-3 w-3" />
                                    <span>Copy Title</span>
                                  </button>
                                  <button 
                                    onClick={() => copyToClipboard(artifact.path, artifact.id + '-path')}
                                    className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-xs flex items-center space-x-1 hover:bg-purple-500/30 transition-colors"
                                  >
                                    <FolderOpen className="h-3 w-3" />
                                    <span>Copy Path</span>
                                  </button>
                                  <button 
                                    onClick={() => copyToClipboard(artifact.description, artifact.id + '-desc')}
                                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-xs flex items-center space-x-1 hover:bg-green-500/30 transition-colors"
                                  >
                                    <File className="h-3 w-3" />
                                    <span>Copy Description</span>
                                  </button>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-16"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                    <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                      <div className="text-6xl mb-4">🔍</div>
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">
                        {showFavoritesOnly ? "No favorites found" : "No artifacts found"}
                      </h3>
                      <p className="text-gray-400 mb-4">
                        {showFavoritesOnly 
                          ? "Star artifacts to add them to your favorites" 
                          : "Try adjusting your search criteria or category filter"}
                      </p>
                      {showFavoritesOnly ? (
                        <button
                          onClick={() => setShowFavoritesOnly(false)}
                          className="px-4 py-2 bg-pink-500/20 text-pink-300 rounded-lg hover:bg-pink-500/30 transition-colors"
                        >
                          Show All Artifacts
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory('all');
                          }}
                          className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-lg hover:bg-blue-500/30 transition-colors"
                        >
                          Reset Filters
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
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
