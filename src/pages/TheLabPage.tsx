import React, { useState, useEffect } from 'react';
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
  Search
} from 'lucide-react';

const TheLabPage = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [operation, setOperation] = useState<keyof typeof operations>('Base64 Encode');
  
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Encoding/Decoding functions
  function base64Encode(input: string): string {
    try {
      return btoa(input);
    } catch {
      return 'Invalid input for base64 encoding';
    }
  }

  function base64Decode(input: string): string {
    try {
      return atob(input);
    } catch {
      return 'Invalid base64';
    }
  }

  function hexEncode(input: string): string {
    return Array.from(input)
      .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
      .join('');
  }

  function hexDecode(input: string): string {
    try {
      const cleanInput = input.replace(/\s/g, '');
      return cleanInput.match(/.{1,2}/g)
        ?.map(byte => String.fromCharCode(parseInt(byte, 16)))
        .join('') || '';
    } catch {
      return 'Invalid hex';
    }
  }

  function urlEncode(input: string): string {
    return encodeURIComponent(input);
  }

  function urlDecode(input: string): string {
    try {
      return decodeURIComponent(input);
    } catch {
      return 'Invalid URL encoding';
    }
  }

  function rot13(input: string): string {
    return input.replace(/[a-zA-Z]/g, c => {
      const base = c <= 'Z' ? 65 : 97;
      return String.fromCharCode(((c.charCodeAt(0) - base + 13) % 26) + base);
    });
  }

  // PowerShell Deobfuscation functions
  const decodeBase64 = (text: string): string => {
    try {
      const match = text.match(/fromBase64String\(['"]([^'"]+)['"]\)/i);
      if (match && match[1]) {
        return atob(match[1]);
      }
    } catch (e) {
      return "[!] Invalid base64 string";
    }
    return "";
  };

  const resolveCharCodes = (input: string): string => {
    return input.replace(/(\[char\](\d+))/gi, (_, _full, code) =>
      String.fromCharCode(parseInt(code))
    );
  };

  const resolveConcatenation = (input: string): string => {
    return input.replace(/\((?:'[^']+'\s*\+\s*)+'[^']+'\)/g, (match) => {
      const strings = match.match(/'[^']+'/g);
      return strings ? strings.map((s) => s.slice(1, -1)).join("") : match;
    });
  };

  const highlightSuspicious = (text: string): string => {
    const keywords = ["iex", "invoke-webrequest", "downloadstring", "new-object", "invoke-expression", "start-process", "invoke-command", "powershell", "cmd", "net.webclient", "system.net.webclient"];
    let result = text;
    keywords.forEach((kw) => {
      const regex = new RegExp(`\\b${kw}\\b`, "gi");
      result = result.replace(regex, (m) => `<span class="text-red-400 font-bold bg-red-500/20 px-1 rounded">${m}</span>`);
    });
    return result;
  };

  const deobfuscatePowerShell = () => {
    let clean = psInput;

    // Step 1: Resolve character codes
    clean = resolveCharCodes(clean);
    
    // Step 2: Resolve string concatenation
    clean = resolveConcatenation(clean);

    // Step 3: Decode base64 if present
    const base64Decoded = decodeBase64(clean);
    if (base64Decoded && base64Decoded !== "[!] Invalid base64 string") {
      clean += `\n\n[Base64 Decoded Output]\n${base64Decoded}`;
    }

    // Step 4: Highlight suspicious patterns
    const highlighted = highlightSuspicious(clean);
    setPsOutput(highlighted);
  };

  // Timestamp Converter functions
  const convertTimestamp = () => {
    try {
      if (timestampMode === "epoch-to-date") {
        // Accept seconds or milliseconds
        const num = Number(timestampInput.trim());
        if (isNaN(num)) {
          setTimestampOutput("Invalid epoch timestamp");
          return;
        }
        // Detect if timestamp is seconds or ms (assume >10^12 is ms)
        const date = new Date(num < 1e12 ? num * 1000 : num);
        setTimestampOutput(date.toISOString());
      } else {
        // date-to-epoch
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
    "4C00000001140200": "LNK shortcut file",
    "7573746172": "TAR archive",
    "425A68": "BZIP2 compressed file",
    "52656365697665": "Real Media",
    "7B5C72746631": "RTF document",
    "2321": "Script file (#!)"
  };

  const lookupFileSignature = () => {
    // Clean input hex string
    const cleanHex = hexInput.replace(/[^A-Fa-f0-9]/g, "").toUpperCase();

    // Try to find matching signature by prefix
    let matched = "Unknown file type";

    for (const prefix in signatures) {
      if (cleanHex.startsWith(prefix)) {
        matched = signatures[prefix];
        break;
      }
    }
    setSignatureResult(matched);
  };

  const operations = {
    'Base64 Encode': base64Encode,
    'Base64 Decode': base64Decode,
    'Hex Encode': hexEncode,
    'Hex Decode': hexDecode,
    'URL Encode': urlEncode,
    'URL Decode': urlDecode,
    'ROT13': rot13,
  };

  const operationIcons = {
    'Base64 Encode': Lock,
    'Base64 Decode': Unlock,
    'Hex Encode': Hash,
    'Hex Decode': Hash,
    'URL Encode': Globe,
    'URL Decode': Globe,
    'ROT13': RotateCcw,
  };

  const handleRun = () => {
    const result = operations[operation](input);
    setOutput(result);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
  };

  const handlePsClear = () => {
    setPsInput('');
    setPsOutput('');
  };

  const handleTimestampClear = () => {
    setTimestampInput('');
    setTimestampOutput('');
  };

  const handleSignatureClear = () => {
    setHexInput('');
    setSignatureResult('');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
  };

  const loadPsSample = () => {
    setPsInput(`([char]105+[char]101+[char]120) ([Text.Encoding]::UTF8.GetString([Convert]::FromBase64String('aHR0cDovL2V2aWwuY29tL3BheWxvYWQuZXhl')))`);
  };

  const loadTimestampSample = () => {
    setTimestampInput('1708023332');
  };

  const loadSignatureSample = () => {
    setHexInput('25504446');
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
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-cyan-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Code className="h-16 w-16 text-cyan-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                    The Lab
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Your digital forensics encoding and decoding laboratory. Transform data between different formats 
                  for analysis, investigation, and evidence processing.
                </p>
              </div>
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-6xl mx-auto">
            {/* Operation Selector */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-4">
                  <Zap className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-white">Select Operation</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {Object.keys(operations).map((op) => {
                    const IconComponent = operationIcons[op as keyof typeof operationIcons];
                    return (
                      <button
                        key={op}
                        onClick={() => setOperation(op as keyof typeof operations)}
                        className={`p-4 rounded-lg border transition-all duration-300 flex flex-col items-center space-y-2 ${
                          operation === op
                            ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300'
                            : 'border-gray-700/50 text-gray-400 hover:text-white hover:bg-gray-800/50 hover:border-gray-600/50'
                        }`}
                      >
                        <IconComponent className="h-6 w-6" />
                        <span className="text-xs font-medium text-center">{op}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Input/Output Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Input Section */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">Input</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setInput('')}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="Clear input"
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your text here..."
                    className="w-full h-64 bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors resize-none font-mono text-sm"
                  />
                  <div className="mt-3 text-xs text-gray-400">
                    Characters: {input.length}
                  </div>
                </div>
              </div>

              {/* Output Section */}
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-bold text-white">Output</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={swapInputOutput}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="Swap input/output"
                        disabled={!output}
                      >
                        <RotateCcw className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(output)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="Copy to clipboard"
                        disabled={!output}
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <textarea
                    value={output}
                    readOnly
                    placeholder="Output will appear here..."
                    className="w-full h-64 bg-gray-800/30 border border-gray-600/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 resize-none font-mono text-sm"
                  />
                  <div className="mt-3 text-xs text-gray-400">
                    Characters: {output.length}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4 mb-12">
              <button
                onClick={handleRun}
                disabled={!input.trim()}
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Play className="h-5 w-5" />
                <span>Run Operation</span>
              </button>
              
              <button
                onClick={handleClear}
                className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
              >
                <RotateCcw className="h-5 w-5" />
                <span>Clear All</span>
              </button>
            </div>

            {/* PowerShell Deobfuscator Section */}
            <div className="relative group mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-red-500/20 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <Terminal className="h-8 w-8 text-red-400" />
                  <h2 className="text-2xl font-bold text-white">PowerShell Deobfuscator</h2>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Analyze and deobfuscate malicious PowerShell commands. Supports Base64 decoding, string concatenation resolution, 
                  character code conversion, and highlights suspicious patterns commonly used in attacks.
                </p>

                {/* Features List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
                    <Lock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300 font-medium">Base64 Decoding</div>
                    <div className="text-xs text-gray-400 mt-1">[Convert]::FromBase64String</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
                    <Code className="h-6 w-6 text-green-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300 font-medium">String Concatenation</div>
                    <div className="text-xs text-gray-400 mt-1">('In'+'vo'+'ke')</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
                    <Hash className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300 font-medium">Character Codes</div>
                    <div className="text-xs text-gray-400 mt-1">[char]105+[char]101</div>
                  </div>
                  <div className="bg-gray-800/50 border border-gray-700/50 rounded-lg p-4 text-center">
                    <AlertTriangle className="h-6 w-6 text-red-400 mx-auto mb-2" />
                    <div className="text-sm text-gray-300 font-medium">Threat Detection</div>
                    <div className="text-xs text-gray-400 mt-1">IEX, Invoke-WebRequest</div>
                  </div>
                </div>

                {/* PowerShell Input/Output */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  {/* PowerShell Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Obfuscated PowerShell</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={loadPsSample}
                          className="px-3 py-1 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-lg hover:bg-orange-500/30 transition-colors"
                        >
                          Load Sample
                        </button>
                        <button
                          onClick={() => setPsInput('')}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Clear input"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={psInput}
                      onChange={(e) => setPsInput(e.target.value)}
                      placeholder="Paste obfuscated PowerShell code here..."
                      className="w-full h-64 bg-gray-800/50 border border-red-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-red-400/50 transition-colors resize-none font-mono text-sm"
                    />
                    <div className="mt-3 text-xs text-gray-400">
                      Characters: {psInput.length}
                    </div>
                  </div>

                  {/* PowerShell Output */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Deobfuscated Result</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(psOutput.replace(/<[^>]*>/g, ''))}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Copy to clipboard"
                          disabled={!psOutput}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-64 bg-gray-800/30 border border-green-500/30 rounded-lg p-4 overflow-auto">
                      {psOutput ? (
                        <div 
                          className="whitespace-pre-wrap font-mono text-sm text-white"
                          dangerouslySetInnerHTML={{ __html: psOutput }}
                        />
                      ) : (
                        <div className="text-gray-400 font-mono text-sm">Deobfuscated output will appear here...</div>
                      )}
                    </div>
                    <div className="mt-3 text-xs text-gray-400">
                      Characters: {psOutput.replace(/<[^>]*>/g, '').length}
                    </div>
                  </div>
                </div>

                {/* PowerShell Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={deobfuscatePowerShell}
                    disabled={!psInput.trim()}
                    className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Terminal className="h-5 w-5" />
                    <span>Deobfuscate PowerShell</span>
                  </button>
                  
                  <button
                    onClick={handlePsClear}
                    className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Timestamp Converter Section */}
            <div className="relative group mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-green-500/20 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <Clock className="h-8 w-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">Timestamp Converter</h2>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Convert Unix epoch timestamps (seconds or milliseconds) to human-readable date/time format and vice versa. 
                  Essential for forensic timeline analysis and log correlation.
                </p>

                {/* Mode Selector */}
                <div className="mb-6">
                  <select
                    value={timestampMode}
                    onChange={(e) => setTimestampMode(e.target.value as any)}
                    className="bg-gray-800/50 border border-gray-600/50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-400/50 transition-colors"
                  >
                    <option value="epoch-to-date">Epoch → Date/Time (ISO 8601)</option>
                    <option value="date-to-epoch">Date/Time → Epoch (seconds)</option>
                  </select>
                </div>

                {/* Timestamp Input/Output */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  {/* Timestamp Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Input</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={loadTimestampSample}
                          className="px-3 py-1 text-xs bg-green-500/20 text-green-400 border border-green-500/30 rounded-lg hover:bg-green-500/30 transition-colors"
                        >
                          Load Sample
                        </button>
                        <button
                          onClick={() => setTimestampInput('')}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Clear input"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={timestampInput}
                      onChange={(e) => setTimestampInput(e.target.value)}
                      placeholder={timestampMode === "epoch-to-date" ? "Enter epoch timestamp (e.g., 1708023332)" : "Enter date/time string (e.g., 2025-06-28T12:34:56Z)"}
                      className="w-full bg-gray-800/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-green-400/50 transition-colors font-mono text-sm"
                    />
                    <div className="mt-3 text-xs text-gray-400">
                      {timestampMode === "epoch-to-date" 
                        ? "Supports both seconds and milliseconds" 
                        : "Supports ISO 8601 and common date formats"}
                    </div>
                  </div>

                  {/* Timestamp Output */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Output</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(timestampOutput)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Copy to clipboard"
                          disabled={!timestampOutput}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800/30 border border-blue-500/30 rounded-lg px-4 py-3 min-h-[48px] flex items-center">
                      <span className="text-white font-mono text-sm">
                        {timestampOutput || "Converted timestamp will appear here..."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamp Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={convertTimestamp}
                    disabled={!timestampInput.trim()}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Clock className="h-5 w-5" />
                    <span>Convert</span>
                  </button>
                  
                  <button
                    onClick={handleTimestampClear}
                    className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>

            {/* File Signature / Magic Bytes Lookup Section */}
            <div className="relative group mb-16">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-purple-500/20 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-4 mb-6">
                  <Search className="h-8 w-8 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">File Signature / Magic Bytes Lookup</h2>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Identify file types by analyzing hex signatures (magic bytes) found at the start of files. 
                  Useful for forensic analysis of unknown or suspicious files and verifying file extensions.
                </p>

                {/* File Signature Input/Output */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                  {/* Hex Input */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">Hex Signature</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={loadSignatureSample}
                          className="px-3 py-1 text-xs bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-lg hover:bg-purple-500/30 transition-colors"
                        >
                          Load Sample
                        </button>
                        <button
                          onClick={() => setHexInput('')}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Clear input"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={hexInput}
                      onChange={(e) => setHexInput(e.target.value)}
                      placeholder="Enter hex bytes (start of file)&#10;Example: 25504446 for PDF&#10;or 89504E47 for PNG"
                      className="w-full h-32 bg-gray-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400/50 transition-colors resize-none font-mono text-sm"
                    />
                    <div className="mt-3 text-xs text-gray-400">
                      Enter hex bytes without spaces or 0x prefix
                    </div>
                  </div>

                  {/* File Type Result */}
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                        <h3 className="text-lg font-bold text-white">File Type</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => copyToClipboard(signatureResult)}
                          className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                          title="Copy to clipboard"
                          disabled={!signatureResult}
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="w-full bg-gray-800/30 border border-pink-500/30 rounded-lg px-4 py-3 min-h-[128px] flex items-center">
                      <span className="text-white font-mono text-sm">
                        {signatureResult || "File type will appear here after lookup..."}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Common Signatures Reference */}
                <div className="mb-6 p-4 bg-gray-800/30 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Common File Signatures:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">PDF:</span>
                      <span className="font-mono text-purple-300">25504446</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">PNG:</span>
                      <span className="font-mono text-purple-300">89504E47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">ZIP:</span>
                      <span className="font-mono text-purple-300">504B0304</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">EXE:</span>
                      <span className="font-mono text-purple-300">4D5A</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">GIF:</span>
                      <span className="font-mono text-purple-300">47494638</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">MP3:</span>
                      <span className="font-mono text-purple-300">494433</span>
                    </div>
                  </div>
                </div>

                {/* File Signature Action Buttons */}
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={lookupFileSignature}
                    disabled={!hexInput.trim()}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-700 px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 flex items-center space-x-2 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    <Search className="h-5 w-5" />
                    <span>Lookup File Type</span>
                  </button>
                  
                  <button
                    onClick={handleSignatureClear}
                    className="border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2 backdrop-blur-sm"
                  >
                    <RotateCcw className="h-5 w-5" />
                    <span>Clear</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TheLabPage;