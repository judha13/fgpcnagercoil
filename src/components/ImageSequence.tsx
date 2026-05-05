'use client';

import { useEffect, useRef, useState } from 'react';
import { MotionValue, useTransform } from 'framer-motion';

interface ImageSequenceProps {
  progress: MotionValue<number>;
  frameCount: number;
  directory: string;
  prefix: string;
  extension: string;
  digits?: number;
  onLoadComplete?: () => void;
}

export default function ImageSequence({ 
  progress, 
  frameCount, 
  directory, 
  prefix, 
  extension, 
  digits = 3,
  onLoadComplete 
}: ImageSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Map progress (0-1) to frame index (0 to frameCount - 1)
  const frameIndex = useTransform(progress, [0, 1], [0, frameCount - 1]);

  useEffect(() => {
    const preloadImages = async () => {
      const loadPromises = Array.from({ length: frameCount }, (_, i) => {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          const frameStr = (i + 1).toString().padStart(digits, '0');
          img.src = `${directory}/${prefix}${frameStr}.${extension}`;
          
          img.decode()
            .then(() => resolve(img))
            .catch(() => resolve(img)); // Resolve anyway to not block others
        });
      });

      const loadedImages = await Promise.all(loadPromises);
      setImages(loadedImages);
      setIsLoaded(true);
      onLoadComplete?.();
    };

    preloadImages();
  }, [frameCount, directory, prefix, extension, digits, onLoadComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isLoaded || images.length === 0) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const render = () => {
      const index = Math.round(frameIndex.get());
      const img = images[index];
      if (!img) return;

      // Clear canvas
      context.clearRect(0, 0, canvas.width, canvas.height);
      
      // Ensure high quality scaling on every frame
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = 'high';

      // Handle object-fit: cover logic for canvas
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const ratio = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      const newWidth = imgWidth * ratio;
      const newHeight = imgHeight * ratio;
      const x = (canvasWidth - newWidth) / 2;
      const y = (canvasHeight - newHeight) / 2;

      // Use the 9-argument version of drawImage for more explicit control over scaling
      context.drawImage(
        img,
        0, 0, imgWidth, imgHeight, // Source rectangle
        x, y, newWidth, newHeight  // Destination rectangle
      );
    };

    // Initial render
    render();

    // Re-render on progress change
    const unsubscribe = frameIndex.on("change", render);

    // Resize handler
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Ensure smooth scaling
      const context = canvas.getContext('2d');
      if (context) {
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';
      }
      
      render();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener('resize', handleResize);
    };
  }, [isLoaded, images, frameIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ 
          filter: 'brightness(0.95)',
          imageRendering: 'auto',
          willChange: 'transform'
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-emerald-950">
           <div className="text-amber-200/50 animate-pulse font-bold tracking-widest text-xs">LOADING JOURNEY...</div>
        </div>
      )}
    </div>
  );
}
