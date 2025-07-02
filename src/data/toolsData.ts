export interface Tool {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  subcategory?: string;
  platform: string[];
  tags: string[];
  plugins?: string[];
}

export const toolCategories = [
  { id: 'all', name: 'All Tools', icon: '🔧' },
  { id: 'memory-forensics', name: 'Memory Forensics', icon: '🧠' },
  { id: 'disk-forensics', name: 'Disk Forensics', icon: '💾' },
  { id: 'file-system-forensics', name: 'File/System Forensics', icon: '📁' },
  { id: 'browser-forensics', name: 'Browser History & Analysis', icon: '🌐' },
  { id: 'log-timeline-analysis', name: 'Log/Timeline Analysis', icon: '📊' },
  { id: 'network-forensics', name: 'Network Forensics', icon: '🌐' },
  { id: 'registry', name: 'Registry', icon: '🗂️' },
  { id: 'mobile-forensics', name: 'Mobile Forensics', icon: '📱' }
];

export const forensicTools: Tool[] = [
  // Memory Forensics
  {
    id: 'volatility',
    name: 'Volatility',
    description: 'Memory forensics framework to extract artifacts from RAM dumps (Windows, Linux, macOS)',
    url: 'https://github.com/volatilityfoundation/volatility',
    category: 'memory-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['memory analysis', 'RAM dumps', 'malware detection', 'incident response'],
    plugins: [
      'Windows.info - Show operating system information',
      'Windows.pstree - List processes in tree structure',
      'Windows.pslist - List processes',
      'Windows.pslist pid <PID> --dump - Dump process',
      'Windows.dlllist pid <PID> --dump - Dump DLLs associated with a process',
      'Windows.getsids pid <PID> - SIDs associated with a process',
      'Windows.registry.hivelist - Show registry hives and offsets',
      'Windows.registry.printkey --offset hive_offset --key <key_name> - Show registry key'
    ]
  },
  {
    id: 'rekall',
    name: 'Rekall',
    description: 'Alternative to Volatility for analyzing memory images.',
    url: 'https://github.com/google/rekall',
    category: 'memory-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['memory analysis', 'forensics', 'incident response', 'malware analysis']
  },
  {
    id: 'memprocfs',
    name: 'MemProcFS',
    description: 'Mount memory dumps as a filesystem. Easy access to memory structures.',
    url: 'https://github.com/ufrisk/MemProcFS',
    category: 'memory-forensics',
    platform: ['Windows', 'Linux'],
    tags: ['memory analysis', 'filesystem', 'memory structures', 'forensics']
  },

  // Disk Forensics
  {
    id: 'autopsy',
    name: 'Autopsy',
    description: 'GUI-based digital forensics platform. Analyze disk images, files, registry, and more.',
    url: 'https://www.sleuthkit.org/autopsy/',
    category: 'disk-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['disk imaging', 'GUI', 'case management', 'file analysis']
  },
  {
    id: 'sleuth-kit',
    name: 'The Sleuth Kit (TSK)',
    description: 'Command-line tools for analyzing disk images and file systems.',
    url: 'https://www.sleuthkit.org/sleuthkit/',
    category: 'disk-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['command-line', 'disk imaging', 'file systems', 'forensics']
  },
  {
    id: 'ftk-imager',
    name: 'FTK Imager',
    description: 'Acquire and browse forensic images, preview files, and export artifacts.',
    url: 'https://www.exterro.com/',
    category: 'disk-forensics',
    platform: ['Windows'],
    tags: ['disk imaging', 'acquisition', 'preview', 'artifacts']
  },
  {
    id: 'magnet-axiom',
    name: 'Magnet AXIOM',
    description: 'Commercial tool to acquire, analyze, and report digital evidence from many sources.',
    url: 'https://www.magnetforensics.com/products/magnet-axiom/',
    category: 'disk-forensics',
    platform: ['Windows'],
    tags: ['commercial', 'acquisition', 'analysis', 'reporting']
  },
  {
    id: 'kape',
    name: 'KAPE',
    description: 'Kroll Artifact Parser and Extractor – Collects, processes, and analyzes forensic artifacts rapidly using target and module configurations.',
    url: 'https://www.sans.org/tools/kape/',
    category: 'disk-forensics',
    platform: ['Windows'],
    tags: ['artifact collection', 'parsing', 'extraction', 'automation', 'targets', 'modules', 'SANS']
  },

  // File/System Forensics
  {
    id: 'mftecmd',
    name: 'MFTECmd',
    description: 'Parse NTFS Master File Table (MFT) entries.',
    url: 'https://ericzimmerman.github.io/#!index.md',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['MFT', 'NTFS', 'file system', 'parsing']
  },
  {
    id: 'jlecmd',
    name: 'JLECmd',
    description: 'Parses Windows Jump Lists for file access history.',
    url: 'https://github.com/EricZimmerman/JLECmd',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['jump lists', 'file access', 'Windows artifacts', 'history']
  },
  {
    id: 'pecmd',
    name: 'PECmd',
    description: 'Parses Windows prefetch files to reveal executed apps.',
    url: 'https://github.com/EricZimmerman/PECmd',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['prefetch', 'execution', 'Windows artifacts', 'applications']
  },
  {
    id: 'shellbags-explorer',
    name: 'ShellBags Explorer',
    description: 'Investigate folder access through Windows ShellBags.',
    url: 'https://ericzimmerman.github.io/#!index.md',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['shellbags', 'folder access', 'Windows artifacts', 'explorer']
  },
  {
    id: 'appcompatcacheparser',
    name: 'AppCompatCacheParser',
    description: 'Extracts evidence of executed programs from the AppCompatCache.',
    url: 'https://github.com/mbevilacqua/appcompatprocessor',
    category: 'file-system-forensics',
    platform: ['Windows'],
    tags: ['appcompat cache', 'execution', 'programs', 'artifacts']
  },
  {
    id: 'recentfilecacheparser',
    name: 'RecentFileCacheParser',
    description: 'Parses RecentFileCache.bcf, a binary file cache used by Windows.',
    url: 'https://ericzimmerman.github.io/#!index.md',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['recent files', 'cache', 'Windows artifacts', 'binary']
  },
  {
    id: 'lnk-parser',
    name: 'Lnk-parser',
    description: 'Parses .lnk (shortcut) files to determine file usage and paths.',
    url: 'https://github.com/Matmaus/LnkParse3',
    category: 'file-system-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['lnk files', 'shortcuts', 'file usage', 'paths']
  },
  {
    id: 'windows-file-analyzer',
    name: 'Windows File Analyzer',
    description: 'GUI tool to analyze thumbs.db, index.dat, shortcuts, and USB history.',
    url: 'https://www.mitec.cz/wfa.html',
    category: 'file-system-forensics',
    platform: ['Windows'],
    tags: ['GUI', 'thumbs.db', 'index.dat', 'USB history']
  },
  {
    id: 'usnjrnl-parser',
    name: 'UsnJrnl Parser (AnalyzeMFT)',
    description: 'Parse and analyze NTFS USN Journal ($UsnJrnl) entries (file-level changes).',
    url: 'https://github.com/rowingdude/analyzeMFT',
    category: 'file-system-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['USN journal', 'NTFS', 'file changes', 'analysis']
  },
  {
    id: 'thumbcacheviewer',
    name: 'ThumbCacheViewer',
    description: 'View and extract images stored in Windows thumbnail cache.',
    url: 'https://thumbcacheviewer.github.io/',
    category: 'file-system-forensics',
    platform: ['Windows'],
    tags: ['thumbnail cache', 'images', 'extraction', 'viewer']
  },
  {
    id: 'srum-dump',
    name: 'SRUM-Dump',
    description: 'Dumps SRUM database – a great source for network and app usage activity.',
    url: 'https://github.com/MarkBaggett/srum-dump',
    category: 'file-system-forensics',
    platform: ['Windows'],
    tags: ['SRUM', 'database', 'network activity', 'app usage', 'system resource']
  },
  {
    id: 'lastactivityview',
    name: 'LastActivityView',
    description: 'Displays system activity logs such as file openings, run dialogs, etc.',
    url: 'https://www.nirsoft.net/utils/computer_activity_view.html',
    category: 'file-system-forensics',
    subcategory: 'nirsoft',
    platform: ['Windows'],
    tags: ['system activity', 'file openings', 'run dialogs', 'activity logs', 'nirsoft']
  },
  {
    id: 'userassistview',
    name: 'UserAssistView',
    description: 'Shows program usage info from the UserAssist registry key.',
    url: 'https://www.nirsoft.net/utils/userassist_view.html',
    category: 'file-system-forensics',
    subcategory: 'nirsoft',
    platform: ['Windows'],
    tags: ['userassist', 'program usage', 'registry', 'execution count', 'nirsoft']
  },
  {
    id: 'usbdeview',
    name: 'USBDeview',
    description: 'Lists USB devices connected to the system, including timestamps.',
    url: 'https://www.nirsoft.net/utils/usb_devices_view.html',
    category: 'file-system-forensics',
    subcategory: 'nirsoft',
    platform: ['Windows'],
    tags: ['USB devices', 'timestamps', 'device history', 'external storage', 'nirsoft']
  },
  {
    id: 'amcacheparser',
    name: 'AmCacheParser',
    description: 'Parses AmCache.hve (Windows executable evidence).',
    url: 'https://github.com/EricZimmerman/AmcacheParser',
    category: 'file-system-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['AmCache', 'executable evidence', 'Windows artifacts', 'parsing']
  },

  // Browser History & Analysis Tools
  {
    id: 'browserhistoryview',
    name: 'BrowserHistoryView',
    description: 'Displays browsing history from Chrome, Firefox, Edge, and Internet Explorer.',
    url: 'https://www.nirsoft.net/utils/browsing_history_view.html',
    category: 'browser-forensics',
    subcategory: 'nirsoft',
    platform: ['Windows'],
    tags: ['browser history', 'Chrome', 'Firefox', 'Edge', 'Internet Explorer', 'nirsoft']
  },
  {
    id: 'hindsight',
    name: 'Hindsight',
    description: 'Google Chrome history parser — timelines, downloads, autofill, and more.',
    url: 'https://github.com/obsidianforensics/hindsight',
    category: 'browser-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['Chrome', 'history parser', 'timelines', 'downloads', 'autofill', 'browser forensics']
  },
  {
    id: 'pasco',
    name: 'Pasco',
    description: 'Parses Internet Explorer index.dat files.',
    url: 'https://www.kali.org/tools/pasco/',
    category: 'browser-forensics',
    platform: ['Linux', 'Windows'],
    tags: ['Internet Explorer', 'index.dat', 'browser history', 'IE forensics']
  },
  {
    id: 'chromagnon',
    name: 'Chromagnon',
    description: 'Extracts data from Chrome user data directory (cookies, downloads, history).',
    url: 'https://github.com/macronucleus/Chromagnon',
    category: 'browser-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['Chrome', 'cookies', 'downloads', 'history', 'user data', 'browser forensics']
  },
  {
    id: 'sqlecmd',
    name: 'SQLECmd',
    description: 'Parse SQLite files (e.g., browser data, app storage).',
    url: 'https://github.com/EricZimmerman/SQLECmd',
    category: 'browser-forensics',
    subcategory: 'eric-zimmerman',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['SQLite', 'browser data', 'app storage', 'parsing']
  },

  // Log/Timeline Analysis
  {
    id: 'evtxecmd',
    name: 'EvtxECmd',
    description: 'Extract and parse Windows EVTX event logs.',
    url: 'https://github.com/EricZimmerman/evtx',
    category: 'log-timeline-analysis',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['EVTX', 'event logs', 'Windows', 'parsing']
  },
  {
    id: 'logontracer',
    name: 'LogonTracer',
    description: 'Visualize Windows logon events and detect lateral movement.',
    url: 'https://github.com/JPCERTCC/LogonTracer',
    category: 'log-timeline-analysis',
    platform: ['Windows', 'Linux'],
    tags: ['logon events', 'visualization', 'lateral movement', 'detection']
  },
  {
    id: 'timesketch',
    name: 'Timesketch',
    description: 'Timeline analysis platform. Correlate forensic artifacts over time.',
    url: 'https://github.com/google/timesketch',
    category: 'log-timeline-analysis',
    platform: ['Linux', 'macOS'],
    tags: ['timeline', 'correlation', 'artifacts', 'platform']
  },
  {
    id: 'plaso',
    name: 'Plaso (log2timeline)',
    description: 'Extract events from various log sources and build timelines.',
    url: 'https://plaso.readthedocs.io/en/latest/',
    category: 'log-timeline-analysis',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['timeline', 'log extraction', 'events', 'multiple sources']
  },

  // Network Forensics
  {
    id: 'wireshark',
    name: 'Wireshark',
    description: 'Industry-standard packet sniffer and analyzer.',
    url: 'https://www.wireshark.org/',
    category: 'network-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['packet analysis', 'network monitoring', 'protocol analysis', 'sniffer']
  },
  {
    id: 'tshark',
    name: 'TShark',
    description: 'The command-line version of Wireshark. Perfect for remote use, automation, and parsing large PCAPs efficiently. Ideal for scripting and headless environments.',
    url: 'https://tshark.dev/',
    category: 'network-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['command-line', 'packet analysis', 'automation', 'PCAP', 'scripting', 'headless', 'remote']
  },
  {
    id: 'tcpdump',
    name: 'tcpdump',
    description: 'Classic CLI packet capture tool. Great for lightweight monitoring and automation.',
    url: 'https://www.tcpdump.org/',
    category: 'network-forensics',
    platform: ['Linux', 'macOS', 'Windows'],
    tags: ['packet capture', 'command-line', 'lightweight', 'monitoring', 'automation', 'CLI']
  },
  {
    id: 'zeek',
    name: 'Zeek',
    description: 'Powerful network security monitor that logs detailed information from network traffic.',
    url: 'https://zeek.org/',
    category: 'network-forensics',
    platform: ['Linux', 'macOS'],
    tags: ['network security', 'monitoring', 'traffic analysis', 'logging', 'IDS', 'network forensics']
  },
  {
    id: 'networkminer',
    name: 'NetworkMiner',
    description: 'Passive network forensics. Reconstruct files, sessions, and metadata.',
    url: 'https://www.netresec.com/?page=NetworkMiner',
    category: 'network-forensics',
    platform: ['Windows', 'Linux'],
    tags: ['passive forensics', 'file reconstruction', 'sessions', 'metadata']
  },
  {
    id: 'brim',
    name: 'Brim',
    description: 'Cross-platform tool to analyze Zeek logs and PCAPs visually.',
    url: 'https://www.brimdata.io/',
    category: 'network-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['Zeek logs', 'PCAP', 'visualization', 'cross-platform']
  },
  {
    id: 'arkime',
    name: 'Arkime',
    description: 'Full packet capture and web UI for exploring captured traffic.',
    url: 'https://arkime.com/',
    category: 'network-forensics',
    platform: ['Linux'],
    tags: ['packet capture', 'web UI', 'traffic analysis', 'full capture']
  },

  // Registry
  {
    id: 'registry-explorer',
    name: 'Registry Explorer',
    description: 'Deep dive into Windows registry hives.',
    url: 'https://ericzimmerman.github.io/#!index.md',
    category: 'registry',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['registry', 'hives', 'Windows artifacts', 'GUI']
  },
  {
    id: 'recmd',
    name: 'RECmd',
    description: 'Powerful registry parsing tool for analyzing persistence and user actions.',
    url: 'https://github.com/EricZimmerman/RECmd',
    category: 'registry',
    subcategory: 'eric-zimmerman',
    platform: ['Windows'],
    tags: ['registry', 'command-line', 'parser', 'persistence', 'user actions']
  },
  {
    id: 'regripper',
    name: 'RegRipper',
    description: 'Plugin-based CLI tool for parsing Windows registry hives quickly.',
    url: 'https://www.kali.org/tools/regripper/',
    category: 'registry',
    platform: ['Windows', 'Linux'],
    tags: ['registry', 'command-line', 'plugins', 'parsing', 'hives', 'CLI']
  },

  // Mobile Forensics
  {
    id: 'cellebrite-ufed',
    name: 'Cellebrite UFED',
    description: 'Commercial tool for iOS/Android acquisition and analysis.',
    url: 'https://cellebrite.com/en/ufed/',
    category: 'mobile-forensics',
    platform: ['Windows'],
    tags: ['iOS', 'Android', 'acquisition', 'commercial']
  },
  {
    id: 'magnet-axiom-mobile',
    name: 'Magnet AXIOM Mobile',
    description: 'Mobile evidence acquisition and analysis suite.',
    url: 'https://www.magnetforensics.com/products/magnet-axiom/',
    category: 'mobile-forensics',
    platform: ['Windows'],
    tags: ['mobile evidence', 'acquisition', 'analysis', 'suite']
  },
  {
    id: 'adb',
    name: 'ADB (Android Debug Bridge)',
    description: 'Native Android acquisition tool (requires USB debug access).',
    url: 'https://developer.android.com/tools/adb',
    category: 'mobile-forensics',
    platform: ['Windows', 'Linux', 'macOS'],
    tags: ['Android', 'acquisition', 'USB debug', 'native tool']
  }
];