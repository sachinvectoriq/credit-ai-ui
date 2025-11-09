// src/features/ticker-input/components/FileUploadZone.tsx

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useAppStore } from '@/store/useAppStore';
import { ACCEPTED_FILE_TYPES, MAX_FILE_SIZE } from '@/shared/utils/constants';
import { cn } from '@/shared/utils/cn';
import { Upload, File, X, CheckCircle } from 'lucide-react';

export function FileUploadZone() {
  const { source, uploadedFiles, setUploadedFiles } = useAppStore();
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  }, [uploadedFiles, setUploadedFiles]);
  
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    multiple: true,
  });
  
  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };
  
  // Only show if upload source is selected
  if (source !== 'upload') return null;
  
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-slate-700">
        Upload Financial Data Files
      </label>
      
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all',
          isDragActive && !isDragReject && 'border-primary-500 bg-primary-50',
          isDragReject && 'border-red-500 bg-red-50',
          !isDragActive && 'border-slate-300 hover:border-primary-400 hover:bg-slate-50'
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-3">
          <div className={cn(
            'rounded-full p-4',
            isDragActive ? 'bg-primary-100' : 'bg-slate-100'
          )}>
            <Upload className={cn(
              'w-8 h-8',
              isDragActive ? 'text-primary-600' : 'text-slate-400'
            )} />
          </div>
          
          <div>
            <p className="text-sm font-medium text-slate-900">
              {isDragActive
                ? isDragReject
                  ? 'Invalid file type'
                  : 'Drop files here'
                : 'Drag & drop files here, or click to browse'
              }
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Accepts: PDF, Excel (.xlsx, .xls), CSV • Max 10MB per file
            </p>
          </div>
        </div>
      </div>
      
      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-700">
            Uploaded Files ({uploadedFiles.length})
          </p>
          
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <File className="w-5 h-5 text-green-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <button
                    onClick={() => removeFile(index)}
                    className="p-1 hover:bg-slate-100 rounded transition-colors"
                    title="Remove file"
                  >
                    <X className="w-4 h-4 text-slate-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}