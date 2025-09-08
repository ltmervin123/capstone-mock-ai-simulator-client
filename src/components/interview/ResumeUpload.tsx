import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';

interface ResumeUploadProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (resumeFile: File | null, jobTitle: string) => void;
}

function ResumeUpload({ isOpen, onClose, onProceed }: ResumeUploadProps) {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileSelect = (file: File) => {
    // Accept PDF, DOC, DOCX files
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedTypes.includes(file.type)) {
      setResumeFile(file);
    } else {
      alert('Please upload a PDF or Word document');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleProceed = () => {
    onProceed(resumeFile, jobTitle);
  };

  const handleClose = () => {
    setResumeFile(null);
    setJobTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="w-full max-w-2xl rounded-lg border-2 bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Upload Your Resume</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* File Upload Area */}
        <div className="mb-6">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
              isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-green-50'
            }`}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                <Upload className="h-6 w-6 text-green-600" />
              </div>

              {resumeFile ? (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-900">{resumeFile.name}</p>
                  <p className="text-sm text-gray-600">
                    {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-lg font-medium text-gray-700">Drag File to upload</p>
                  <p className="text-gray-500">or</p>
                </div>
              )}

              <button
                onClick={handleChooseFile}
                className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Choose file
              </button>
            </div>
          </div>
        </div>

        {/* Job Title Input */}
        <div className="mb-6">
          <label className="mb-2 block text-lg font-semibold text-gray-900">
            Desired Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder='e.g., "Software Engineer", "Marketing Associate"'
            className="w-full rounded-lg border border-gray-300 bg-green-50 p-3 text-gray-900 placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Proceed Button */}
        <div className="flex justify-end">
          <button
            onClick={handleProceed}
            disabled={!jobTitle.trim()}
            className={`rounded px-6 py-2 text-sm font-medium text-white transition-colors ${
              jobTitle.trim() ? 'bg-green-600 hover:bg-green-700' : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            Proceed
          </button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

export default ResumeUpload;
