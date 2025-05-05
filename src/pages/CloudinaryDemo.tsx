import { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { CloudinaryUploader } from '@/components/ui/cloudinary-uploader';
import { CloudinaryImage, CloudinaryOptimizedImage } from '@/components/ui/cloudinary-image';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CloudinaryDemo() {
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  
  // Example images that are already in your Cloudinary account
  // Replace these with actual public_ids from your account
  const exampleImages = [
    { public_id: 'sample', description: 'Sample Image' },
    { public_id: 'sample2', description: 'Another Sample Image' }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Cloudinary Integration Demo</h1>
        
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upload">Upload Images</TabsTrigger>
            <TabsTrigger value="display">Display Images</TabsTrigger>
            <TabsTrigger value="transformations">Image Transformations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload an Image to Cloudinary</h2>
              <p className="text-gray-600 mb-6">
                This demo uses direct uploads to Cloudinary. In production, you might want to use 
                signed uploads through your backend for better security.
              </p>
              
              <CloudinaryUploader
                onUploadSuccess={(data) => {
                  console.log('Upload successful:', data);
                  setUploadedImage(data);
                }}
                maxFileSize={5 * 1024 * 1024} // 5MB limit
                acceptedFileTypes={['image/jpeg', 'image/png', 'image/webp']}
                className="max-w-lg mx-auto"
              />
              
              {uploadedImage && (
                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium mb-2">Upload Result:</h3>
                  <pre className="bg-gray-800 text-white p-4 rounded-md overflow-x-auto text-sm">
                    {JSON.stringify(uploadedImage, null, 2)}
                  </pre>
                </div>
              )}
            </Card>
          </TabsContent>
          
          <TabsContent value="display" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Display Cloudinary Images</h2>
              <p className="text-gray-600 mb-6">
                Two approaches for displaying optimized images from Cloudinary
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium mb-3">Advanced Image Component</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Uses Cloudinary SDK with plugins for advanced features
                  </p>
                  
                  {uploadedImage ? (
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="User uploaded image"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="p-8 bg-gray-100 text-center rounded-lg">
                      <p>Upload an image first or check example images tab</p>
                    </div>
                  )}
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Simple Optimized Image</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Uses direct URL construction for simpler implementation
                  </p>
                  
                  {uploadedImage ? (
                    <CloudinaryOptimizedImage
                      publicId={uploadedImage.public_id}
                      alt="User uploaded image"
                      width={400}
                      height={300}
                      className="rounded-lg shadow-md"
                    />
                  ) : (
                    <div className="p-8 bg-gray-100 text-center rounded-lg">
                      <p>Upload an image first or check example images tab</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="font-medium mb-3">Example Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {exampleImages.map((img, index) => (
                    <div key={index} className="border rounded-md overflow-hidden">
                      <CloudinaryImage
                        publicId={img.public_id}
                        alt={img.description}
                        width={300}
                        height={200}
                        className="w-full h-auto"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium">{img.description}</p>
                        <p className="text-xs text-gray-500">ID: {img.public_id}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="transformations" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Image Transformations</h2>
              <p className="text-gray-600 mb-6">
                Examples of different Cloudinary image transformations
              </p>
              
              {uploadedImage ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Original</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Original image"
                      className="w-full h-auto rounded"
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Grayscale Effect</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Grayscale image"
                      className="w-full h-auto rounded"
                      transformations={['e_grayscale']}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Rounded Corners & Border</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Rounded image with border"
                      className="w-full h-auto"
                      transformations={['r_50,bo_5px_solid_red']}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Blur Effect</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Blurred image"
                      className="w-full h-auto rounded"
                      transformations={['e_blur:300']}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Sepia Effect</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Sepia image"
                      className="w-full h-auto rounded"
                      transformations={['e_sepia']}
                    />
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Auto Brightness</h3>
                    <CloudinaryImage
                      publicId={uploadedImage.public_id}
                      alt="Auto brightness adjusted image"
                      className="w-full h-auto rounded"
                      transformations={['e_auto_brightness']}
                    />
                  </div>
                </div>
              ) : (
                <div className="p-8 bg-gray-100 text-center rounded-lg">
                  <p>Upload an image first to see transformations</p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}