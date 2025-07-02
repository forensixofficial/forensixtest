import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { 
  Image,
  Upload,
  FileImage,
  Copy,
  RotateCcw,
  Shield,
  Activity,
  Heart,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  FileText,
  Clock,
  MapPin,
  Camera,
  Settings,
  Info,
  Download,
  Loader
} from 'lucide-react';

interface MetadataEntry {
  tag: string;
  value: any;
  description?: string;
  group?: string;
}

const ExifToolPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [metadata, setMetadata] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = async (uploadedFile: File) => {
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setError(null);
    setMetadata(null);

    try {
      // TODO: Implement ExifTool integration manually
      setError('ExifTool integration will be implemented manually later');
    } catch (err: any) {
      console.error('Error parsing metadata:', err);
      setError(err.message || 'Failed to extract metadata from file');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      handleFileChange(uploadedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleClear = () => {
    setFile(null);
    setMetadata(null);
    setError(null);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getMetadataEntries = (): MetadataEntry[] => {
    if (!metadata) return [];
    
    return Object.entries(metadata).map(([key, value]) => ({
      tag: key,
      value: value,
      group: getMetadataGroup(key)
    }));
  };

  const getMetadataGroup = (tag: string): string => {
    const lowerTag = tag.toLowerCase();
    
    if (lowerTag.includes('gps') || lowerTag.includes('location')) return 'GPS & Location';
    if (lowerTag.includes('camera') || lowerTag.includes('make') || lowerTag.includes('model')) return 'Camera Info';
    if (lowerTag.includes('date') || lowerTag.includes('time')) return 'Date & Time';
    if (lowerTag.includes('image') || lowerTag.includes('width') || lowerTag.includes('height') || lowerTag.includes('resolution')) return 'Image Properties';
    if (lowerTag.includes('exif')) return 'EXIF Data';
    if (lowerTag.includes('file') || lowerTag.includes('size')) return 'File Info';
    
    return 'Other';
  };

  const getGroupIcon = (group: string) => {
    switch (group) {
      case 'GPS & Location': return MapPin;
      case 'Camera Info': return Camera;
      case 'Date & Time': return Clock;
      case 'Image Properties': return Image;
      case 'EXIF Data': return Settings;
      case 'File Info': return FileText;
      default: return Info;
    }
  };

  const getGroupColor = (group: string) => {
    switch (group) {
      case 'GPS & Location': return 'text-red-400';
      case 'Camera Info': return 'text-blue-400';
      case 'Date & Time': return 'text-green-400';
      case 'Image Properties': return 'text-purple-400';
      case 'EXIF Data': return 'text-orange-400';
      case 'File Info': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  const groupedMetadata = getMetadataEntries().reduce((groups, entry) => {
    const group = entry.group || 'Other';
    if (!groups[group]) groups[group] = [];
    groups[group].push(entry);
    return groups;
  }, {} as Record<string, MetadataEntry[]>);

  const isImageFile = (file: File): boolean => {
    return file.type.startsWith('image/');
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
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-2xl group-hover:blur-xl transition-all duration-500"></div>
              <div className="relative bg-gradient-to-r from-gray-900/80 via-gray-800/80 to-gray-900/80 border border-purple-500/20 rounded-3xl p-12 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <Image className="h-16 w-16 text-purple-400 animate-pulse" />
                  <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                    ExifTool Analyzer
                  </h1>
                </div>
                <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                  Extract comprehensive metadata from images and documents. Analyze EXIF data, GPS coordinates, 
                  camera settings, and hidden information for digital forensics investigations.
                </p>
                <div className="mt-6 flex items-center justify-center space-x-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg px-4 py-2 inline-flex">
                  <Clock className="h-5 w-5 text-yellow-400" />
                  <span className="text-yellow-300 font-semibold">Implementation in Progress</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Tool Interface */}
          <div className="max-w-6xl mx-auto">
            {/* File Upload Section */}
            <div className="relative group mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-8 backdrop-blur-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <Upload className="h-6 w-6 text-blue-400" />
                  <h3 className="text-xl font-bold text-white">Upload File for Analysis</h3>
                </div>

                {/* Drag and Drop Area */}
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-400 bg-blue-500/10'
                      : 'border-gray-600 hover:border-gray-500 hover:bg-gray-800/30'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <FileImage className="h-16 w-16 text-gray-400" />
                      {dragActive && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-20 border-4 border-blue-400 border-dashed rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <p className="text-lg font-semibold text-white mb-2">
                        {dragActive ? 'Drop file here' : 'Drag and drop your file here'}
                      </p>
                      <p className="text-gray-400 mb-4">
                        Supports images (JPEG, PNG, TIFF, RAW) and documents (PDF, DOCX, etc.)
                      </p>
                      
                      <label className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 cursor-pointer">
                        <Upload className="h-5 w-5" />
                        <span>Choose File</span>
                        <input
                          type="file"
                          onChange={handleInputChange}
                          className="hidden"
                          accept="*"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* File Info */}
                {file && (
                  <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <FileImage className="h-8 w-8 text-blue-400" />
                        <div>
                          <div className="font-semibold text-white">{file.name}</div>
                          <div className="text-sm text-gray-400">
                            {formatFileSize(file.size)} • {file.type || 'Unknown type'}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleClear}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-colors"
                        title="Clear file"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-12 backdrop-blur-sm text-center">
                  <div className="flex items-center justify-center space-x-4 mb-4">
                    <Loader className="h-8 w-8 text-cyan-400 animate-spin" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-300 mb-2">Extracting Metadata</h3>
                  <p className="text-gray-400">Analyzing file with ExifTool...</p>
                </div>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="relative group mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-red-500/30 rounded-xl p-8 backdrop-blur-sm">
                  <div className="flex items-center space-x-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-400" />
                    <h3 className="text-xl font-bold text-white">Notice</h3>
                  </div>
                  <p className="text-orange-300">{error}</p>
                </div>
              </div>
            )}

            {/* No Results State */}
            {!loading && !error && !metadata && !file && (
              <div className="text-center py-20">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
                  <div className="relative bg-gray-900/50 border border-gray-700/50 rounded-2xl p-12 backdrop-blur-sm">
                    <div className="text-8xl mb-6">📷</div>
                    <h3 className="text-3xl font-semibold text-gray-300 mb-4">Ready to Analyze</h3>
                    <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                      Upload any image or document to extract comprehensive metadata including EXIF data, 
                      GPS coordinates, camera settings, and hidden forensic information.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Camera Data</div>
                      </div>
                      <div className="text-center">
                        <MapPin className="h-8 w-8 text-red-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">GPS Location</div>
                      </div>
                      <div className="text-center">
                        <Clock className="h-8 w-8 text-green-400 mx-auto mb-2" />
                        <div className="text-sm text-gray-300">Timestamps</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Camera className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">EXIF Data</h4>
                  <p className="text-sm text-gray-400">Camera settings, lens information, and shooting parameters</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <MapPin className="h-8 w-8 text-red-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">GPS Coordinates</h4>
                  <p className="text-sm text-gray-400">Location data and geospatial information embedded in files</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Clock className="h-8 w-8 text-green-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Timestamps</h4>
                  <p className="text-sm text-gray-400">Creation, modification, and access time analysis</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Settings className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Technical Details</h4>
                  <p className="text-sm text-gray-400">Image dimensions, color profiles, and compression settings</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Eye className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Hidden Data</h4>
                  <p className="text-sm text-gray-400">Discover embedded thumbnails, comments, and metadata</p>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur-xl"></div>
                <div className="relative bg-gray-900/80 border border-gray-700/50 rounded-xl p-6 backdrop-blur-sm text-center">
                  <Zap className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
                  <h4 className="font-bold text-white mb-2">Client-Side Processing</h4>
                  <p className="text-sm text-gray-400">100% browser-based analysis with WebAssembly technology</p>
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

export default ExifToolPage;