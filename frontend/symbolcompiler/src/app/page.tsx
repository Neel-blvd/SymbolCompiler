"use client";

import React, { useState, ChangeEvent, useRef } from "react";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Webcam from "react-webcam";
import { createWorker } from 'tesseract.js';

// Import necessary classes and types from antlr4ts
import { CharStreams, CommonTokenStream, CharStream, TokenSource } from "antlr4ts";
import ExprLexer from "../../lib/grammars/output/ExprLexer";
import ExprParser from "../../lib/grammars/output/ExprParser";

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    x: 0,
    y: 0,
    width: 50,
    height: 50,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);
  const workerRef = useRef<any>(null);

  // Initialize tesseract.js worker on component mount
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
    // Scale for higher quality if needed
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('No 2d context available');
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
    return canvas.toDataURL('image/jpeg', 0.8);
  };

  const processImage = async () => {
    if (!selectedImage || !imageRef.current || !workerRef.current) return;
  
    try {
      setIsProcessing(true);
      setStatus('Starting image processing...');
  
      // 1. Crop the image
      setStatus('Cropping image...');
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      
      // 2. Perform OCR
      setStatus('Performing OCR...');
      const { data: { text } } = await workerRef.current.recognize(croppedImageUrl, {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%&*()-+=:;"\'',
        tessedit_pageseg_mode: '6',
        preserve_interword_spaces: '1',
      });
      
      console.log("OCR Text:", text);
  
      // 3. Parse the OCR text using ANTLR
      setStatus('Parsing OCR text using ANTLR...');
  
      // Create a CharStream from the OCR text (it implements CharStream)
      const inputStream: CharStream = CharStreams.fromString(text);
      // Create a lexer (it should implement TokenSource)
      const lexer: TokenSource = new ExprLexer(inputStream);
      const tokenStream = new CommonTokenStream(lexer);
      const parser = new ExprParser(tokenStream);
  
      // Assume that your grammar starts with the 'program' rule
      const tree = parser.program();
  
      // Print the parse tree. toStringTree now requires the rule names and the parser instance.
      console.log("Parse Tree:", tree.toStringTree(parser.ruleNames, parser));
      setStatus('Parsing complete! Check console for parse tree.');
      
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

        {/* Button for processing OCR and ANTLR parsing */}
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={processImage}
          disabled={!selectedImage || isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Extract & Parse Text'}
        </button>
      </main>
    </div>
  );
}
