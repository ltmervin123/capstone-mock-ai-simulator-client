import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { useExpertInterview } from '@/queries/useInterview';
import interviewStore from '@/stores/interview-store';

interface ResumeUploadProps {
  isOpen: boolean;
  selectedOption: string;
  handleStart: () => void;
  onClose: () => void;
}

const ALLOWED_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];
const FILE_SIZE_LIMIT = 1 * 1024 * 1024;

function ResumeUpload({ isOpen, onClose, handleStart, selectedOption }: ResumeUploadProps) {
  const { mutate: fetchQuestions, isPending, isError } = useExpertInterview();
  const setInterviewOption = interviewStore((state) => state.setInterviewOption);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobTitle, setJobTitle] = useState('');
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [responseError, setResponseError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const validateFile = (file: File) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setValidationError('Unsupported file type. Please upload a PDF or DOCX file.');
      return false;
    }
    if (file.size > FILE_SIZE_LIMIT) {
      setValidationError('File size exceeds 1 MB limit.');
      return false;
    }
    setValidationError('');
    return true;
  };

  const handleFileSelect = (file: File) => {
    if (validateFile(file)) {
      setResumeFile(file);
    } else {
      setResumeFile(null);
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
    const formData = new FormData();
    if (resumeFile) {
      formData.append('resume', resumeFile);
    }
    if (jobTitle) {
      formData.append('jobTitle', jobTitle);
    }

    fetchQuestions(formData, {
      onSuccess: (data) => {
        setInterviewOption({
          interviewType: 'Expert',
          resumeFile,
          jobTitle,
          selectedInterviewee: selectedOption as 'Alice' | 'Steve',
          questions: data,
        });
        handleStart();
      },
      onError: (error: any) => {
        setResponseError(error?.response?.data?.message);
      },
    });
  };

  const handleClose = () => {
    setResumeFile(null);
    setJobTitle('');
    setValidationError('');
    onClose();
  };

  const isUploadEnabled = resumeFile && !validationError;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-white p-8 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex w-full items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Upload Resume</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Drag-and-drop Upload Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`mb-4 flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-colors ${isDragOver ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'} `}
          style={{ minHeight: 160 }}
        >
          <Upload className="mb-2 h-8 w-8 text-green-600" />
          <p className="mb-1 font-medium text-gray-800">Drag &amp; drop your resume here</p>
          <p className="mb-3 text-sm text-gray-500">or</p>
          <button
            onClick={handleChooseFile}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            type="button"
          >
            Choose file
          </button>
          {resumeFile && !validationError && (
            <div className="mt-4 text-center">
              <span className="block font-semibold text-green-700">{resumeFile.name}</span>
              <span className="block text-xs text-gray-500">
                {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
              </span>
            </div>
          )}
        </div>

        {/* Info Text */}
        <div className="mb-2 w-full">
          <p className="text-center text-xs text-gray-500">
            💡 Tip: Use a text-based PDF or DOCX (under 1 MB). Avoid image-based or scanned resumes
          </p>
        </div>

        {/* Error Message */}
        {validationError && (
          <div className="mb-2 w-full">
            <p className="text-center text-xs text-red-600">{validationError}</p>
          </div>
        )}

        {isError && (
          <div className="mb-2 w-full">
            <p className="text-center text-xs text-red-600">{responseError}</p>
          </div>
        )}

        {/* Job Title Input */}
        <div className="mb-6 w-full">
          <label className="mb-1 block text-sm font-semibold text-gray-900">
            Desired Job Title
          </label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            disabled={isPending}
            placeholder='e.g., "Software Engineer"'
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-3 text-gray-900 placeholder-gray-400 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleProceed}
          disabled={!isUploadEnabled || !jobTitle.trim() || isPending}
          className={`w-full rounded-lg px-6 py-3 text-sm font-semibold transition-colors ${
            isUploadEnabled && jobTitle.trim()
              ? 'bg-green-600 text-white hover:bg-green-700'
              : 'cursor-not-allowed bg-gray-300 text-gray-500'
          } `}
        >
          {isPending ? 'Uploading...' : 'Upload'}
        </button>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isPending}
        />
      </div>
    </div>
  );
}

export default ResumeUpload;
