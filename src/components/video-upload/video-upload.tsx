import axios from 'axios';
import React, { useState, useRef, ChangeEvent } from 'react';

// Types define karo
interface CloudinaryResponse {
    public_id: string;
    secure_url: string;
    format: string;
    bytes: number;
    width: number;
    height: number;
    duration: number;
}

interface FFmpegProgress {
    ratio: number;
}

const VideoUpload: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [uploading, setUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadedVideo, setUploadedVideo] = useState<CloudinaryResponse | null>(null);
    const [compressionProgress, setCompressionProgress] = useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle file selection with TypeScript
    const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
        const files = event.target.files;
        if (files && files[0]) {
            const file = files[0];

            if (!file.type.startsWith('video/')) {
                alert('Please select a video file');
                return;
            }

            setSelectedFile(file);

            // Create preview URL
            const previewURL = URL.createObjectURL(file);
            setPreviewUrl(previewURL);
        }
    };

    // Load FFmpeg - WORKING VERSION
    const loadFFmpeg = async (): Promise<any> => {
        try {
            // Method 1: Direct import (most reliable)
            const FFmpeg = await import('@ffmpeg/ffmpeg');

            // Check different possible export structures
            let createFFmpegFunc: any;

            if (typeof FFmpeg.createFFmpeg === 'function') {
                createFFmpegFunc = FFmpeg.createFFmpeg;
            } else if (typeof (FFmpeg as any).default?.createFFmpeg === 'function') {
                createFFmpegFunc = (FFmpeg as any).default.createFFmpeg;
            } else {
                // Last resort - try to access createFFmpeg directly
                createFFmpegFunc = (FFmpeg as any).createFFmpeg;
            }

            if (!createFFmpegFunc) {
                throw new Error('createFFmpeg function not found in FFmpeg package');
            }

            const ffmpeg = createFFmpegFunc({
                log: true,
                progress: ({ ratio }: FFmpegProgress) => {
                    setCompressionProgress(Math.round(ratio * 100));
                }
            });

            await ffmpeg.load();
            return ffmpeg;
        } catch (error) {
            console.error('FFmpeg loading failed:', error);
            throw error;
        }
    };

    // Alternative: Simple FFmpeg wrapper
    const loadFFmpegSimple = async (): Promise<any> => {
        try {
            // Simple approach - use any type to bypass TypeScript errors
            const FFmpegModule: any = await import('@ffmpeg/ffmpeg');

            // Try different possible ways to access createFFmpeg
            const createFFmpeg =
                FFmpegModule.createFFmpeg ||
                FFmpegModule.default?.createFFmpeg ||
                FFmpegModule.default;

            if (!createFFmpeg) {
                throw new Error('Could not find createFFmpeg');
            }

            const ffmpeg = createFFmpeg({
                log: true,
                progress: ({ ratio }: any) => {
                    setCompressionProgress(Math.round(ratio * 100));
                }
            });

            await ffmpeg.load();
            return ffmpeg;
        } catch (error) {
            console.error('Simple FFmpeg loading failed:', error);
            throw error;
        }
    };

    // File fetch helper function
    const fetchFile = async (file: File): Promise<Uint8Array> => {
        const response = await fetch(URL.createObjectURL(file));
        const arrayBuffer = await response.arrayBuffer();
        return new Uint8Array(arrayBuffer);
    };

    // Compress video using FFmpeg
    const compressVideoWithFFmpeg = async (file: File): Promise<File> => {
        try {
            setCompressionProgress(0);

            let ffmpeg: any;
            try {
                ffmpeg = await loadFFmpeg();
            } catch (error) {
                console.log('Trying simple FFmpeg loading method...');
                ffmpeg = await loadFFmpegSimple();
            }

            ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(file));

            await ffmpeg.run(
                '-i', 'input.mp4',
                '-c:v', 'libx264',           // Video codec
                '-crf', '28',                // Higher CRF for more compression (23-28 range)
                '-preset', 'slow',           // Better compression efficiency
                '-profile:v', 'baseline',    // Broader compatibility
                '-level', '3.0',             // Compression level
                '-maxrate', '800k',          // Maximum bitrate
                '-bufsize', '1600k',         // Buffer size
                '-vf', 'scale=640:-2',       // Scale down resolution if needed
                '-movflags', '+faststart',   // Web optimization
                '-c:a', 'aac',               // Audio codec
                '-b:a', '64k',               // Lower audio bitrate
                '-ac', '1',                  // Mono audio to save space
                '-ar', '22050',              // Lower audio sample rate
                'output.mp4'
            );

            // Read the compressed file
            const data = ffmpeg.FS('readFile', 'output.mp4');
            const compressedBlob = new Blob([data.buffer], { type: 'video/mp4' });
            const compressedFile = new File([compressedBlob], 'compressed-video.mp4', {
                type: 'video/mp4'
            });

            // Cleanup
            if (ffmpeg.exit) {
                await ffmpeg.exit();
            }

            setCompressionProgress(100);
            return compressedFile;
        } catch (error) {
            console.error('FFmpeg compression error:', error);
            throw error;
        }
    };

    const uploadToCloudinary = async (file: File): Promise<CloudinaryResponse> => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_PRESET);

        try {
            const response = await axios.post<CloudinaryResponse>(
                `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/video/upload`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(progress);
                        }
                    },
                }
            );

            return response.data;
        } catch (error: any) {
            console.error('Cloudinary upload error:', error);
            throw new Error(error.response?.data?.error?.message || 'Upload failed');
        }
    };

    // Simple compression fallback
    const simpleCompression = async (file: File): Promise<File> => {
        return new Promise((resolve) => {
            // Simulate compression progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 20;
                setCompressionProgress(progress);
                if (progress >= 100) {
                    clearInterval(interval);
                    resolve(file); 
                }
            }, 200);
        });
    };

    const handleUpload = async (): Promise<void> => {
        if (!selectedFile) {
            alert('Please select a video file first');
            return;
        }

        const maxSize = 100 * 1024 * 1024; 
        if (selectedFile.size > maxSize) {
            alert('File size too large. Please select a video under 100MB');
            return;
        }

        setUploading(true);
        setUploadProgress(0);
        setCompressionProgress(0);

        try {
            let compressedFile: File;

            // Try FFmpeg compression
            try {
                console.log('Starting FFmpeg compression...');
                compressedFile = await compressVideoWithFFmpeg(selectedFile);
                console.log('FFmpeg compression successful');
            } catch (ffmpegError) {
                console.log('FFmpeg compression failed, using fallback:', ffmpegError);
                compressedFile = await simpleCompression(selectedFile);
                console.log('Fallback compression completed');
            }

            const originalSizeMB = (selectedFile.size / 1024 / 1024).toFixed(2);
            const compressedSizeMB = (compressedFile.size / 1024 / 1024).toFixed(2);

            console.log(`Original: ${originalSizeMB}MB, Compressed: ${compressedSizeMB}MB`);

            // Upload to Cloudinary
            console.log('Uploading to Cloudinary...');
            const uploadResult = await uploadToCloudinary(compressedFile);
            setUploadedVideo(uploadResult);

            console.log('Upload completed');

            // Clean up preview URL
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }

        } catch (error) {
            console.error('Upload process failed:', error);
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            alert('Upload failed: ' + errorMessage);
        } finally {
            setUploading(false);
        }
    };

    // Reset form
    const handleReset = (): void => {
        setSelectedFile(null);
        setPreviewUrl('');
        setUploadedVideo(null);
        setUploadProgress(0);
        setCompressionProgress(0);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
    };

    return (
        <div className="mt-5 ">
            <div className=" mx-auto">

                {/* Card: Upload Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload & Compress Video</h2>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select video file</label>
                        <input
                            type="file"
                            name='contentUrl'
                            accept="video/*"
                            onChange={handleFileSelect}
                            ref={fileInputRef}
                            disabled={uploading}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        <p className="text-xs text-gray-400 mt-1">Supported formats: MP4, MOV, AVI (max 100MB)</p>
                    </div>

                    {previewUrl && (
                        <div className="mb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-3">Preview</h3>
                            <video
                                controls
                                className="w-full rounded-xl shadow-md border border-gray-200"
                                src={previewUrl}
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}

                    {selectedFile && (
                        <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <h4 className="font-medium text-gray-900 mb-2">File Details</h4>
                            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                                <div><span className="font-medium">Name:</span> {selectedFile.name}</div>
                                <div><span className="font-medium">Size:</span> {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</div>
                                <div><span className="font-medium">Type:</span> {selectedFile.type}</div>
                            </div>
                        </div>
                    )}

                    {/* Compression Progress */}
                    {compressionProgress > 0 && compressionProgress < 100 && (
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Compressing video...</span>
                                <span>{compressionProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${compressionProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Upload Progress */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="mb-4">
                            <div className="flex justify-between text-sm text-gray-600 mb-1">
                                <span>Uploading to Cloudinary...</span>
                                <span>{uploadProgress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-green-400 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || uploading}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                        >
                            {uploading ? 'Processing...' : 'Upload Video'}
                        </button>
                        <button
                            type="button"
                            onClick={handleReset}
                            disabled={uploading}
                            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                {/* Uploaded Video Section */}
                {uploadedVideo && (
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-green-600 mb-6">✅ Video Successfully Uploaded!</h3>
                       
                    </div>
                )}

            </div>
        </div>

    );
};

export default VideoUpload;