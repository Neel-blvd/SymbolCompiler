"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Webcam from "react-webcam";
import { createWorker } from 'tesseract.js';

// Import necessary classes from antlr4
import antlr4 from "antlr4";
import ExprLexer from "../../lib/grammars/ExprLexer";
import ExprParser from "../../lib/grammars/ExprParser";

// Add type definitions
type GrammarType = 'circle' | 'omega' | 'two_vertical_plus';
type Relop = '<' | '>' | '==' | '<=' | '>=';

interface TypeMap {
  [key: string]: string;
  circle: string;
  omega: string;
  two_vertical_plus: string;
}

// Update TreeNode interface to match ANTLR's ParseTree
interface TreeNode {
  ruleIndex: number;
  getChild: (index: number) => TreeNode;
  getChildCount: () => number;
  getText: () => string;
  toStringTree: (ruleNames: string[], parser: any) => string;
  symbol?: {
    type: number;
  };
}

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
  const [ocrText, setOcrText] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [astString, setAstString] = useState<string>('');
  const imageRef = useRef<HTMLImageElement>(null);
  const workerRef = useRef<any>(null);
  const [executionResult, setExecutionResult] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  useEffect(() => {
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

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
      }
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

      setStatus('Cropping image...');
      const croppedImageUrl = await getCroppedImg(imageRef.current, crop);
      
      setStatus('Performing OCR...');
      const { data: { text } } = await workerRef.current.recognize(croppedImageUrl, {
        tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789.,!?@#$%&*()-+=:;"\' {}',
        tessedit_pageseg_mode: '6',
        preserve_interword_spaces: '1',
      });
      
      setOcrText(text);
      console.log("OCR Text:", text);
      setStatus('OCR complete! Press Compile to parse the text.');

    } catch (error) {
      console.error('Error processing image:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      alert('Error processing image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate C code from ANTLR AST
  const generateCCodeFromAST = (tree: TreeNode, parser: typeof ExprParser): string => {
    // Helper function for indentation
    const indent = (level: number): string => '  '.repeat(level);
    
    // Helper function to translate grammar types to C types
    const translateType = (grammarType: string): string => {
      const typeMap: TypeMap = {
        'circle': 'int',
        'omega': 'bool',
        'two_vertical_plus': 'float',
      };
      
      return typeMap[grammarType as GrammarType] || 'void';
    };

    // Helper function to translate relational operators
    const translateRelop = (relop: string): string => {
      switch (relop) {
        case '<': return '<';
        case '>': return '>';
        case '==': return '==';
        case '<=': return '<=';
        case '>=': return '>=';
        default: return relop;
      }
    };

    // Helper function to process parameter lists
    const processParamList = (paramListNode: TreeNode): string => {
      if (!paramListNode || paramListNode.getChildCount() === 0) return '';
      
      const params: string[] = [];
      for (let i = 0; i < paramListNode.getChildCount(); i++) {
        const child = paramListNode.getChild(i);
        if (child.ruleIndex === ExprParser.RULE_type) {
          const type = translateType(child.getText());
          // Get the next token which should be the parameter name
          if (i + 1 < paramListNode.getChildCount()) {
            const nameNode = paramListNode.getChild(i + 1);
            if (nameNode.symbol && nameNode.symbol.type === ExprLexer.ID) {
              params.push(`${type} ${nameNode.getText()}`);
              i++; // Skip the name node in the next iteration
            }
          }
        }
      }
      
      return params.join(', ');
    };

    // Main recursive function to process AST nodes
    const processNode = (node: TreeNode, level: number = 0): string => {
      if (!node) return '';
      
      // For terminal nodes
      if (node.symbol) {
        return node.getText();
      }
      
      // Otherwise handle non-terminal nodes based on rule index
      switch (node.ruleIndex) {
        case ExprParser.RULE_program:
          // Process the single stat child and ignore EOF
          return processNode(node.getChild(0), level);
          
        case ExprParser.RULE_stat:
          // Handle different statement types
          const childNode = node.getChild(0);
          let statCode: string = processNode(childNode, level);
          
          // Add semicolon if not already present
          if (!statCode.trim().endsWith(';') && 
              childNode.ruleIndex !== ExprParser.RULE_funcDecl &&
              childNode.ruleIndex !== ExprParser.RULE_ifStat &&
              childNode.ruleIndex !== ExprParser.RULE_whileStat) {
            statCode += ';';
          }
          
          return statCode + '\n';
          
        case ExprParser.RULE_varDecl:
          // Variable declaration: type ID = expr;
          const typeNode = node.getChild(0);
          const cType = translateType(typeNode.getText());
          const idNode = node.getChild(1);
          const exprNode = node.getChild(3);
          
          return `${indent(level)}${cType} ${idNode.getText()} = ${processNode(exprNode, 0)};`;
          
        case ExprParser.RULE_funcDecl:
          // Function declaration: funct ID ( paramList ) { stat* }
          const fnNameNode = node.getChild(1);
          const fnName = fnNameNode.getText();
          
          // Process parameters
          const paramListNode = node.getChild(3);
          const params = processParamList(paramListNode);
          
          // Find the function body (statements inside braces)
          let bodyCode = '';
          let inBody = false;
          
          for (let i = 0; i < node.getChildCount(); i++) {
            const child = node.getChild(i);
            
            if (inBody && child.getText() === '}') {
              inBody = false;
              break;
            }
            
            if (inBody && child.ruleIndex === ExprParser.RULE_stat) {
              bodyCode += processNode(child, level + 1);
            }
            
            if (child.getText() === '{') {
              inBody = true;
            }
          }
          
          return `${indent(level)}void ${fnName}(${params}) {\n${bodyCode}${indent(level)}}\n`;
          
        case ExprParser.RULE_readStat:
          // Read statement: ID = READ();
          const readVarNode = node.getChild(0);
          return `${indent(level)}scanf("%d", &${readVarNode.getText()});`;
          
        case ExprParser.RULE_writeStat:
          // Write statement: WRITE(expr);
          const writeArgNode = node.getChild(2);
          if (writeArgNode.ruleIndex === ExprParser.RULE_type) {
            // This is a type - for simplicity we'll just print it as a string
            return `${indent(level)}printf("%s\\n", "${writeArgNode.getText()}");`;
          } else if (writeArgNode.getText().startsWith('two_asterisk')) {
            // This is a string literal
            return `${indent(level)}printf("%s\\n", "${writeArgNode.getText().replace('two_asterisk', '')}");`;
          } else {
            // This is an expression
            return `${indent(level)}printf("%d\\n", ${processNode(writeArgNode, 0)});`;
          }
          
        case ExprParser.RULE_ifStat:
          // If statement: IF ( expr ) { stat* } ELSE stat*
          const conditionNode = node.getChild(2);
          const condition: string = processNode(conditionNode, 0);
          
          // Process if block
          let ifBodyCode = '';
          let elseBodyCode = '';
          let inIfBody = false;
          let inElseBody = false;
          
          for (let i = 0; i < node.getChildCount(); i++) {
            const child = node.getChild(i);
            
            if (child.getText() === 'left_arrow') {
              inIfBody = false;
              inElseBody = true;
              continue;
            }
            
            if (inIfBody && child.getText() === '}') {
              inIfBody = false;
              continue;
            }
            
            if (inIfBody && child.ruleIndex === ExprParser.RULE_stat) {
              ifBodyCode += processNode(child, level + 1);
            }
            
            if (inElseBody && child.ruleIndex === ExprParser.RULE_stat) {
              elseBodyCode += processNode(child, level + 1);
            }
            
            if (child.getText() === '{') {
              inIfBody = true;
            }
          }
          
          let ifCode: string = `${indent(level)}if (${condition}) {\n${ifBodyCode}${indent(level)}}`;
          if (elseBodyCode) {
            ifCode += ` else {\n${elseBodyCode}${indent(level)}}`;
          }
          
          return ifCode;
          
        case ExprParser.RULE_whileStat:
          // While statement: WHILE ( expr ) { stat* }
          const whileCondNode = node.getChild(2);
          const whileCond: string = processNode(whileCondNode, 0);
          
          // Process while body
          let whileBodyCode = '';
          let inWhileBody = false;
          
          for (let i = 0; i < node.getChildCount(); i++) {
            const child = node.getChild(i);
            
            if (inWhileBody && child.getText() === '}') {
              inWhileBody = false;
              break;
            }
            
            if (inWhileBody && child.ruleIndex === ExprParser.RULE_stat) {
              whileBodyCode += processNode(child, level + 1);
            }
            
            if (child.getText() === '{') {
              inWhileBody = true;
            }
          }
          
          return `${indent(level)}while (${whileCond}) {\n${whileBodyCode}${indent(level)}}`;
          
        case ExprParser.RULE_idops:
          // ID++, ID--, ID+=ID, ID-=ID
          const opId = node.getChild(0).getText();
          const op = node.getChild(1).getText();
          
          if (node.getChildCount() === 3) {
            // ID++ or ID--
            return `${indent(level)}${opId}${op}${op};`;
          } else {
            // ID+=ID or ID-=ID
            const rightId = node.getChild(3).getText();
            return `${indent(level)}${opId} ${op}= ${rightId};`;
          }
          
        case ExprParser.RULE_for:
          // For loop: FOR ( varDecl ; expr ; idops ) { stat* }
          const initNode = node.getChild(2);
          const condNode = node.getChild(4);
          const updateNode = node.getChild(6);
          
          const init: string = processNode(initNode, 0);
          const cond: string = processNode(condNode, 0);
          const update: string = processNode(updateNode, 0);
          
          // Process for body
          let forBodyCode = '';
          let inForBody = false;
          
          for (let i = 0; i < node.getChildCount(); i++) {
            const child = node.getChild(i);
            
            if (inForBody && child.getText() === '}') {
              inForBody = false;
              break;
            }
            
            if (inForBody && child.ruleIndex === ExprParser.RULE_stat) {
              forBodyCode += processNode(child, level + 1);
            }
            
            if (child.getText() === '{') {
              inForBody = true;
            }
          }
          
          return `${indent(level)}for (${init.trim()} ${cond}; ${update.trim()}) {\n${forBodyCode}${indent(level)}}`;
          
        case ExprParser.RULE_expr:
          // Handle different expression types
          if (node.getChildCount() === 1) {
            // Simple identifier or integer
            return node.getText();
          } else if (node.getChildCount() === 2 && node.getChild(0).getText() === '~') {
            // Negation: ~expr
            return `!${processNode(node.getChild(1), 0)}`;
          } else if (node.getChildCount() === 3) {
            // Binary operations: expr op expr
            const left: string = processNode(node.getChild(0), 0);
            const op = node.getChild(1).getText();
            const right: string = processNode(node.getChild(2), 0);
            
            // Translate operators
            let cOp = op;
            switch (op) {
              case 'and': cOp = '&&'; break;
              case 'or': cOp = '||'; break;
              case '==': cOp = '=='; break;
              default: break;
            }
            
            return `(${left} ${cOp} ${right})`;
          } else if (node.getChild(0).ruleIndex === ExprParser.RULE_expr && 
                     node.getChild(1).ruleIndex === ExprParser.RULE_relop) {
            // Relational operation: expr relop expr
            const left: string = processNode(node.getChild(0), 0);
            const relop: string = processNode(node.getChild(1), 0);
            const right: string = processNode(node.getChild(2), 0);
            
            return `(${left} ${translateRelop(relop)} ${right})`;
          }
          
          // Default case
          return node.getText();
          
        case ExprParser.RULE_func:
          // Function call: ID(expr, expr, ...)
          const funcName = node.getChild(0).getText();
          const args: string[] = [];
          
          for (let i = 2; i < node.getChildCount(); i++) {
            const child = node.getChild(i);
            if (child.ruleIndex === ExprParser.RULE_expr) {
              args.push(processNode(child, 0));
            }
          }
          
          return `${funcName}(${args.join(', ')})`;
          
        default:
          // For unhandled rules, return the raw text
          return node.getText();
      }
    };
    
    // Start processing from the root
    return processNode(tree);
  };

  const compileOcrText = () => {
    try {
      setStatus('Parsing OCR text using ANTLR...');
      const chars = new antlr4.InputStream(ocrText);
      const lexer = new ExprLexer(chars);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new ExprParser(tokens);
      const tree = parser.program() as unknown as TreeNode;

      const treeString = tree.toStringTree(parser.ruleNames, parser);
      console.log("Parse Tree:", treeString);
      setAstString(treeString);
      setStatus('Parsing complete! Generating C code...');
      
      // Generate C code from the AST
      const cCode = generateCCodeFromAST(tree, parser as any);
      
      // Add necessary includes and main function wrapper if not present
      let fullCode = "#include <stdio.h>\n#include <stdbool.h>\n\n";
      
      // If the code doesn't already define a main function, wrap it in one
      if (!cCode.includes("main(")) {
        fullCode += cCode + "\n";
        fullCode += "int main() {\n  // Add your main code here\n  return 0;\n}\n";
      } else {
        fullCode += cCode;
      }
      
      setGeneratedCode(fullCode);
      setStatus('C code generation complete!');
      
    } catch (error) {
      console.error('Error parsing OCR text:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      alert('Error parsing OCR text. Please try again.');
    }
  };

  const handleAstInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setOcrText(e.target.value);
  };

  const executeCCode = async () => {
    if (!generatedCode) return;

    try {
      setIsExecuting(true);
      setStatus('Preparing C code...');

      // Create a temporary C file using Blob
      const blob = new Blob([generatedCode], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Download the file
      const a = document.createElement('a');
      a.href = url;
      a.download = 'temp.c';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExecutionResult(`C code generated successfully. To execute this code:
1. Install a C compiler (like gcc) on your system
2. Save the downloaded file
3. Compile it using: gcc temp.c -o temp
4. Run it using: ./temp (on Linux/Mac) or temp.exe (on Windows)`);

      setStatus('Code ready for compilation!');

    } catch (error) {
      console.error('Error processing C code:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setExecutionResult('');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl">
        <h1 className="text-2xl font-bold">OCR to C Code Generator</h1>
        
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">1. Select Image</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="mb-4"
          />

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
        </div>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">2. Extract Text or Enter AST Manually</h2>
          <div className="flex gap-4 mb-4">
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={processImage}
              disabled={!selectedImage || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Extract Text from Image'}
            </button>
          </div>
          
          <textarea
            value={ocrText}
            onChange={handleAstInput}
            placeholder="Enter AST or OCR text manually, e.g., (program (stat (funcDecl funct f ( (paramList (type circle) num) ) { (stat (varDecl (type omega) abc = (expr 1) ;) ;) }) ;) <EOF>)"
            className="w-full h-32 p-2 border border-gray-300 rounded-lg"
          />
        </div>

        {status && (
          <div className="text-sm text-gray-600 mt-2 w-full">
            <strong>Status:</strong> {status}
          </div>
        )}

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2">3. Generate Code</h2>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition"
            onClick={compileOcrText}
            disabled={!ocrText}
          >
            Generate C Code
          </button>
        </div>

        {astString && (
          <div className="w-full mt-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold mb-2">Parsed AST:</h3>
            <pre className="whitespace-pre-wrap text-sm overflow-auto p-2 bg-gray-100 rounded text-black">{astString}</pre>
          </div>
        )}

        {generatedCode && (
          <div className="w-full mt-4 border border-gray-300 rounded-lg p-4 bg-gray-50">
            <h3 className="font-bold mb-2">Generated C Code:</h3>
            <pre className="whitespace-pre-wrap text-sm overflow-auto p-2 bg-gray-100 rounded text-black">{generatedCode}</pre>
            
            <div className="mt-4">
              <button 
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={executeCCode}
                disabled={isExecuting || !generatedCode}
              >
                {isExecuting ? 'Processing...' : 'Download & Compile Instructions'}
              </button>
            </div>

            {executionResult && (
              <div className="mt-4">
                <h3 className="font-bold mb-2">Compilation Instructions:</h3>
                <pre className="whitespace-pre-wrap text-sm overflow-auto p-2 bg-gray-100 rounded text-black">{executionResult}</pre>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
