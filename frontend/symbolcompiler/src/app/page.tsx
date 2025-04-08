"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Webcam from "react-webcam";
import { createWorker, createScheduler } from 'tesseract.js';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 50,
    height: 50
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);
  const workerRef = useRef<any>(null);

  // Initialize worker on component mount
  React.useEffect(() => {
    const initializeWorker = async () => {
      try {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        workerRef.current = worker;
      } catch (error) {
        console.error('Error initializing worker:', error);
      }
    };
    initializeWorker();

    // Cleanup on unmount
    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleClick = () => {
    alert("ALSJDLKJ");
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setSelectedImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = async (image: HTMLImageElement, crop: Crop): Promise<string> => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return canvas.toDataURL('image/jpeg', 0.8); // Reduced quality for faster processing
  };

  const processImage = async () => {
    if (!selectedImage || !imageRef.current || !workerRef.current) return;

    try {
      setIsProcessing(true);
      setStatus('Starting image processing...');
      
      // Get cropped image
      setStatus('Cropping image...');
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      
      // Perform OCR with optimized settings
      setStatus('Performing OCR...');
      const { data: { text } } = await workerRef.current.recognize(croppedImageUrl, {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%&*()-+=:;"\'',
        tessedit_pageseg_mode: '6', // Assume uniform text block
        preserve_interword_spaces: '1',
      });
      
      setStatus('Done!');
      alert(`Extracted Text:\n${text}`);
    } catch (error) {
      console.error('Error processing image:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          className="mb-4"
        />

        {/* Image Preview & Crop */}
        {selectedImage && (
          <ReactCrop 
            crop={crop} 
            onChange={(newCrop: Crop) => setCrop(newCrop)}
          >
            <img 
              ref={imageRef}
              src={selectedImage} 
              alt="Selected" 
              className="max-w-xs" 
            />
          </ReactCrop>
        )}

        {/* Status message */}
        {status && (
          <div className="text-sm text-gray-600">
            {status}
          </div>
        )}

        {/* Button for OCR processing */}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={processImage}
          disabled={!selectedImage || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Extract Text'}
        </button>
      </main>
    </div>
  );
}
