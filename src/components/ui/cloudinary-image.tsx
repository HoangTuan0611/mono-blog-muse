import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react';
import { fill, crop as cropResize, scale, thumbnail } from '@cloudinary/url-gen/actions/resize';
import { cloudinary, getImageUrl } from '@/lib/cloudinaryUtils';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

interface CloudinaryImageProps {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  crop?: 'fill' | 'crop' | 'scale' | 'thumb';
  aspectRatio?: string;
  className?: string;
  transformations?: string[];
  loading?: 'lazy' | 'eager';
}

export function CloudinaryImage({
  publicId,
  alt,
  width,
  height,
  crop = 'fill',
  aspectRatio,
  className = '',
  transformations = [],
  loading = 'lazy',
}: CloudinaryImageProps) {
  const cldImg = cloudinary.image(publicId);

  // Apply resize action based on crop type
  if (width || height) {
    if (crop === 'fill') {
      cldImg.resize(fill().width(width).height(height));
    } else if (crop === 'crop') {
      cldImg.resize(cropResize().width(width).height(height));
    } else if (crop === 'scale') {
      cldImg.resize(scale().width(width).height(height));
    } else if (crop === 'thumb') {
      cldImg.resize(thumbnail().width(width).height(height));
    }
  }

  // Apply delivery format optimization
  cldImg.delivery(format(auto()));
  
  // Apply quality optimization
  cldImg.delivery(quality(autoQuality()));

  // Apply any custom transformations
  if (transformations.length > 0) {
    transformations.forEach(t => {
      cldImg.addTransformation(t);
    });
  }

  // Different ways to use the Cloudinary SDK for optimizations

  // 1. Using AdvancedImage with plugins for responsive and lazy loading
  return (
    <AdvancedImage
      cldImg={cldImg}
      plugins={[
        lazyload({ rootMargin: '10px 20px 10px 30px', threshold: 0.1 }),
        responsive({ steps: 100 }),
        placeholder({ mode: 'blur' })
      ]}
      alt={alt}
      style={{ aspectRatio: aspectRatio }}
      className={className}
      loading={loading}
    />
  );
}

// Alternative component that uses direct URL construction
// This is simpler and may be more performant for basic use cases
export function CloudinaryOptimizedImage({
  publicId,
  alt,
  width,
  height,
  quality = 80,
  className = '',
}: {
  publicId: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
}) {
  // Using our utility function to generate the optimized URL
  const imageUrl = getImageUrl(publicId, { width, height, quality });
  
  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className={className}
    />
  );
}