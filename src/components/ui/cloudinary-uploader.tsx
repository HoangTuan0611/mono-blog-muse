import { useState } from 'react';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { Button } from '@/components/ui/button';
import { cloudinary, uploadImage } from '@/lib/cloudinaryUtils';

interface CloudinaryUploaderProps {
  onUploadSuccess?: (imageData: any) => void;
  maxFileSize?: number; // in bytes
  acceptedFileTypes?: string[];
  className?: string;
}

export function CloudinaryUploader({
  onUploadSuccess,
  maxFileSize = 10 * 1024 * 1024, // 10MB default
  acceptedFileTypes = ['image/jpeg', 'image/png', 'image/gif'],
  className,
}: CloudinaryUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (!file) return;
    
    // Validate file size
    if (file.size > maxFileSize) {
      setError(`File size must be less than ${maxFileSize / (1024 * 1024)}MB`);
      return;
    }
    
    // Validate file type
    if (!acceptedFileTypes.includes(file.type)) {
      setError(`File type must be one of: ${acceptedFileTypes.join(', ')}`);
      return;
    }
    
    setError(null);
    setIsUploading(true);
    
    try {
      const result = await uploadImage(file);
      setUploadedImage(result);
      if (onUploadSuccess) onUploadSuccess(result);
    } catch (err) {
      setError('Failed to upload image. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer">
        <label className="w-full flex flex-col items-center cursor-pointer">
          <div className="flex flex-col items-center justify-center">
            {uploadedImage ? (
              <div className="mb-4">
                <AdvancedImage
                  cldImg={cloudinary
                    .image(uploadedImage.public_id)
                    .resize(fill().width(300).height(300))}
                  alt="Uploaded preview"
                  className="rounded-md max-w-full h-auto"
                />
              </div>
            ) : (
              <svg 
                className="w-12 h-12 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            )}
            <p className="text-sm text-gray-500">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Supported formats: {acceptedFileTypes.map(type => type.split('/')[1]).join(', ')}
            </p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={acceptedFileTypes.join(',')}
            disabled={isUploading}
          />
        </label>
      </div>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}
      
      {uploadedImage && (
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">Image uploaded successfully!</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setUploadedImage(null);
              if (onUploadSuccess) onUploadSuccess(null);
            }}
          >
            Remove Image
          </Button>
        </div>
      )}
    </div>
  );
}