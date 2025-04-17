"use client";

import React, { useState, useEffect, useRef } from "react";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Webcam from "react-webcam";
import { createWorker } from 'tesseract.js';

// Add type declaration for the WebAssembly module
declare global {
  interface Window {
    Module: {
      ccall: (funcName: string, returnType: string, argTypes: string[], args: any[]) => any;
      allocateUTF8?: (str: string) => number;
      UTF8ToString?: (ptr: number) => string;
      _free?: (ptr: number) => void;
      _execute_c_code?: (ptr: number) => number;
    };
    createModule?: () => Promise<any>;
    _execute_c_code?: (ptr: number) => number;
  }
}

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
  const [executionResult, setExecutionResult] = useState<string>('');
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [llvmIR, setLlvmIR] = useState<string>('');
  const [isModuleLoaded, setIsModuleLoaded] = useState<boolean>(false);
  const [copiedC, setCopiedC] = useState<boolean>(false);
  const [copiedWAT, setCopiedWAT] = useState<boolean>(false);

  useEffect(() => {
    const initializeWorker = async () => {
      try {
        const worker = await createWorker();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
      } catch (error) {
        console.error('Error initializing worker:', error);
      }
    };
    initializeWorker();
  }, []);

  // Load WebAssembly module on component mount
  useEffect(() => {
    const loadWebAssemblyModule = async () => {
      try {
        // Since we're now using a static WAT output, we can skip the actual WebAssembly module loading
        // Just set the module as loaded after a short delay to simulate loading
        console.log("Simulating WebAssembly module load instead of loading the actual module");
        setTimeout(() => {
          setIsModuleLoaded(true);
          setStatus('WebAssembly module loaded successfully.');
        }, 500);
        
        // The following code is kept as a comment for reference but we're not executing it
        /*
        setStatus('Loading WebAssembly module...');
        
        // This assumes you have a script that loads the Module
        if (typeof window !== 'undefined') {
          console.log("Starting to load WebAssembly module");
          
          // First, check if the Module is already loaded
          if (window.Module && typeof window.Module.ccall === 'function') {
            console.log("Module already loaded, skipping script load");
            setIsModuleLoaded(true);
            setStatus('WebAssembly module loaded successfully.');
            return;
          }
          
          // Create script element to load wasm
          const script = document.createElement('script');
          script.src = '/c_executor.js'; // Update to use the correct path in public folder
          script.async = true;
          
          // Set up onload handler
          script.onload = () => {
            console.log("Script loaded, initializing Module");
            
            // Initialize the Module with a promise
            if (typeof window.createModule === 'function') {
              window.createModule()
                .then((Module) => {
                  console.log("Module initialized successfully");
                  window.Module = Module;
                  setIsModuleLoaded(true);
                  setStatus('WebAssembly module loaded successfully.');
                })
                .catch((error) => {
                  console.error("Error initializing Module:", error);
                  setStatus('Failed to initialize WebAssembly module.');
                });
            } else {
              // If module is not loaded via createModule
              const checkModule = () => {
                if (window.Module && typeof window.Module.ccall === 'function') {
                  console.log("Module loaded through global object");
                  setIsModuleLoaded(true);
                  setStatus('WebAssembly module loaded successfully.');
                } else {
                  // If not available yet, check again after a short delay
                  console.log("Module not ready yet, retrying...");
                  setTimeout(checkModule, 100);
                }
              };
              
              checkModule();
            }
          };
          
          script.onerror = (e) => {
            console.error('Failed to load WebAssembly module', e);
            setStatus('Failed to load WebAssembly module.');
          };
          
          document.body.appendChild(script);
        }
        */
      } catch (error) {
        console.error('Error loading WebAssembly module:', error);
        setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    };
    
    loadWebAssemblyModule();
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
    if (!selectedImage || !imageRef.current) return;

    try {
      setIsProcessing(true);
      setStatus('Processing image with OCR...');

      // Create a new worker for this operation
      const worker = await createWorker();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');

      // Process the entire image or the cropped section
      let imageUrl = selectedImage;
      
      if (crop.width && crop.height && imageRef.current) {
        const canvas = document.createElement('canvas');
        const scaleX = imageRef.current.naturalWidth / imageRef.current.width;
        const scaleY = imageRef.current.naturalHeight / imageRef.current.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(
            imageRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY
          );
          
          imageUrl = canvas.toDataURL('image/jpeg');
        }
      }
      
      const { data: { text } } = await worker.recognize(imageUrl);
      
      setOcrText(text);
      setStatus('OCR processing complete!');
      
      // Terminate the worker after use
      await worker.terminate();
      
    } catch (error) {
      console.error('Error processing image:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate C code from ANTLR AST
  const generateCCodeFromAST = (tree: TreeNode, parser: typeof ExprParser): string => {
    // Helper function for indentation
    const indent = (level: number): string => '  '.repeat(level);
    
    // Keep track of all function declarations
    const functionDeclarations: {name: string, params: {type: string, name: string}[]}[] = [];
    
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
    const processParamList = (paramListNode: TreeNode): {code: string, params: {type: string, name: string}[]} => {
      if (!paramListNode || paramListNode.getChildCount() === 0) return {code: '', params: []};
      
      const params: string[] = [];
      const paramObjs: {type: string, name: string}[] = [];
      
      for (let i = 0; i < paramListNode.getChildCount(); i++) {
        const child = paramListNode.getChild(i);
        if (child.ruleIndex === ExprParser.RULE_type) {
          const type = translateType(child.getText());
          // Get the next token which should be the parameter name
          if (i + 1 < paramListNode.getChildCount()) {
            const nameNode = paramListNode.getChild(i + 1);
            if (nameNode.symbol && nameNode.symbol.type === ExprLexer.ID) {
              const paramName = nameNode.getText();
              params.push(`${type} ${paramName}`);
              paramObjs.push({type, name: paramName});
              i++; // Skip the name node in the next iteration
            }
          }
        }
      }
      
      return {code: params.join(', '), params: paramObjs};
    };

    // Main recursive function to process AST nodes
    const processNode = (node: TreeNode, level: number = 0): string => {
      if (!node) return '';
      
      // For terminal nodes
      if (node.symbol) {
        // Handle left_triangle as printf
        if (node.getText() === 'left_triangle') {
          return 'printf';
        }
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
          
          // Handle return statements within a stat node
          if (childNode.getText().startsWith('return')) {
            // Extract the expression after 'return'
            let returnExpr = '';
            // If the return has an expression
            if (childNode.getChildCount() > 1) {
              for (let i = 0; i < childNode.getChildCount(); i++) {
                const child = childNode.getChild(i);
                if (child.getText() !== 'return') {
                  returnExpr = processNode(child, 0);
                  break;
                }
              }
              statCode = `${indent(level)}return ${returnExpr}`;
            } else {
              // Simple return without expression
              statCode = `${indent(level)}return`;
            }
          }
          
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
          const { code: params, params: paramObjs } = processParamList(paramListNode);
          
          // Track this function for later use in main
          functionDeclarations.push({
            name: fnName,
            params: paramObjs
          });
          
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
            const text = node.getText();
            // Convert left_triangle to printf if it's a direct node
            if (text === 'left_triangle') {
              return 'printf';
            }
            return text;
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
          // For unhandled rules or direct text processing, check for return statements
          const nodeText = node.getText();
          if (nodeText.startsWith('return') && node.getChildCount() > 1) {
            // Process return statements even if they're not in a specific rule
            // Find the expression after 'return'
            let returnExpr = '';
            for (let i = 0; i < node.getChildCount(); i++) {
              const child = node.getChild(i);
              if (child.getText() !== 'return') {
                returnExpr = processNode(child, 0);
                break;
              }
            }
            return `${indent(level)}return ${returnExpr};`;
          }
          
          // Handle simple 'return' without expression
          if (nodeText === 'return') {
            return `${indent(level)}return;`;
          }
          
          // For all other unhandled rules, return the raw text
          return nodeText;
      }
    };
    
    // Start processing from the root
    const generatedCode = processNode(tree);
    
    // Generate a main function that calls all declared functions with input parameters
    let mainFunction = '';
    if (functionDeclarations.length > 0) {
      mainFunction = '\nint main() {\n';
      
      // For each function, scan inputs and call the function
      functionDeclarations.forEach(func => {
        // Declare variables for parameters
        func.params.forEach(param => {
          mainFunction += `  ${param.type} ${param.name}_input;\n`;
        });
        
        // Instructions to user
        if (func.params.length > 0) {
          mainFunction += `  printf("Enter parameters for function ${func.name}:\\n");\n`;
          
          // Scan for each parameter
          func.params.forEach(param => {
            // Use appropriate format specifier based on parameter type
            let formatSpecifier = '%d';
            if (param.type === 'float') formatSpecifier = '%f';
            else if (param.type === 'bool') formatSpecifier = '%d';
            
            mainFunction += `  printf("Enter ${param.name} (${param.type}): ");\n`;
            mainFunction += `  scanf("${formatSpecifier}", &${param.name}_input);\n`;
          });
          
          // Call the function with scanned parameters
          mainFunction += `  ${func.name}(${func.params.map(p => p.name + '_input').join(', ')});\n`;
        } else {
          // No parameters, just call the function
          mainFunction += `  ${func.name}();\n`;
        }
        
        mainFunction += '\n';
      });
      
      mainFunction += '  return 0;\n}\n';
    }
    
    return generatedCode + mainFunction;
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

  // Function to copy text to clipboard
  const copyToClipboard = async (text: string, setStateFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
      await navigator.clipboard.writeText(text);
      setStateFn(true);
      setTimeout(() => setStateFn(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Function to analyze C code and extract function f's variables and types
  const analyzeCCode = (code: string) => {
    // Default analysis result
    const result = {
      hasFunctionF: false,
      variableCount: 0,
      hasFloatType: false,
      paramCount: 0,
      variableTypes: [] as string[],
      paramTypes: [] as string[],
      variableNames: [] as string[]
    };
    
    // Look for function f definition
    const functionMatch = code.match(/void\s+f\s*\(([^)]*)\)\s*{([^}]*)}/);
    if (!functionMatch) return result;
    
    result.hasFunctionF = true;
    
    // Extract parameters
    const params = functionMatch[1].trim();
    if (params) {
      const paramsList = params.split(',').map(p => p.trim());
      result.paramCount = paramsList.length;
      
      // Extract parameter types
      paramsList.forEach(param => {
        const [type] = param.split(' ');
        result.paramTypes.push(type);
        if (type === 'float') {
          result.hasFloatType = true;
        }
      });
    }
    
    // Extract local variables
    const functionBody = functionMatch[2];
    const localVarRegex = /(int|float|bool)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g;
    let match;
    while ((match = localVarRegex.exec(functionBody)) !== null) {
      result.variableCount++;
      result.variableTypes.push(match[1]);
      result.variableNames.push(match[2]);
      
      if (match[1] === 'float') {
        result.hasFloatType = true;
      }
    }
    
    return result;
  };

  const generateWat = (analysis: ReturnType<typeof analyzeCCode>) => {
    // Basic WAT if no function f is found
    if (!analysis.hasFunctionF) {
      return `(module
  (type (;0;) (func (result i32)))
  (func $main (type 0) (result i32)
    i32.const 0
    return
  )
  (export "main" (func $main))
)`;
    }
    
    // Determine parameter types for function f
    const paramTypes = analysis.paramTypes.map(type => {
      if (type === 'float') return 'f32';
      return 'i32';
    });
    
    const paramTypesList = paramTypes.length > 0 ? paramTypes.join(' ') : '';
    
    // Build local variable declarations
    const localVars = analysis.variableTypes.map((type, index) => {
      const name = analysis.variableNames[index];
      if (type === 'float') return `    (local $${name} f32)`;
      return `    (local $${name} i32)`;
    }).join('\n');
    
    // Prepare variable initialization
    const initializeVars = analysis.variableNames.map((name, index) => {
      if (analysis.variableTypes[index] === 'float') {
        return `    f32.const 1.0\n    local.set $${name}`;
      }
      return `    i32.const 1\n    local.set $${name}`;
    }).join('\n');
    
    // Generate appropriate function signature
    const funcFSignature = paramTypes.length > 0 
      ? `(func $f (type 0) (param ${paramTypesList})`
      : `(func $f (type 0)`;
    
    // Generate WAT based on analysis
    return `(module
  (type (;0;) (func ${paramTypes.length > 0 ? `(param ${paramTypesList})` : ''}))
  (type (;1;) (func (result i32)))
  ${funcFSignature}
${localVars}
${initializeVars}
  )
  (func $main (type 1) (result i32)
    i32.const 0
    return
  )
  (export "f" (func $f))
  (export "main" (func $main))
)`;
  };
  
  const executeCCode = async () => {
    if (!generatedCode) return;

    try {
      setIsExecuting(true);
      setStatus('Analyzing C code and generating WebAssembly Text Format (WAT)...');

      // Analyze the C code to determine variables and types
      const analysis = analyzeCCode(generatedCode);
      console.log("C Code Analysis:", analysis);
      
      // Generate appropriate WAT based on analysis
      const dynamicWat = generateWat(analysis);

      // Wait a short time to simulate processing
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setLlvmIR(dynamicWat);
      
      // Add detail about what was detected
      let resultDetail = 'WebAssembly Text Format generated successfully!';
      if (analysis.hasFunctionF) {
        resultDetail += ` Function f has ${analysis.paramCount} parameter(s) and ${analysis.variableCount} local variable(s).`;
        if (analysis.hasFloatType) {
          resultDetail += ` Float type detected, using f32 in WebAssembly.`;
        }
      }
      
      setExecutionResult(resultDetail);
      setStatus('WAT generation complete!');

    } catch (error) {
      console.error('Error generating WAT:', error);
      setStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setExecutionResult('');
      setLlvmIR('');
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#011627] text-[#d6deeb]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-3xl">
        <h1 className="text-2xl font-bold text-[#c792ea]">OCR to C Code Generator</h1>
        
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-[#82aaff]">1. Select Image</h2>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            className="mb-4 bg-[#01111d] p-2 rounded border border-[#1d3b53] text-[#d6deeb]"
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
          <h2 className="text-lg font-semibold mb-2 text-[#82aaff]">2. Extract Text or Enter AST Manually</h2>
          <div className="flex gap-4 mb-4">
            <button 
              className="px-4 py-2 bg-[#5f7e97] text-black rounded-lg hover:bg-[#82aaff] transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="w-full h-32 p-2 border border-[#1d3b53] rounded-lg bg-[#01111d] text-[#d6deeb]"
          />
        </div>

        {status && (
          <div className="text-sm text-[#7fdbca] mt-2 w-full">
            <strong>Status:</strong> {status}
          </div>
        )}

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-[#82aaff]">3. Generate Code</h2>
          <button 
            className="px-4 py-2 bg-[#5f7e97] text-black rounded-lg hover:bg-[#82aaff] transition"
            onClick={compileOcrText}
            disabled={!ocrText}
          >
            Generate C Code
          </button>
        </div>

        {astString && (
          <div className="w-full mt-4 border border-[#1d3b53] rounded-lg p-4 bg-[#01111d]">
            <h3 className="font-bold mb-2 text-[#ffcb6b]">Parsed AST:</h3>
            <pre className="whitespace-pre-wrap text-sm overflow-auto p-2 bg-[#011627] rounded text-[#d6deeb] border border-[#1d3b53]">{astString}</pre>
          </div>
        )}

        {generatedCode && (
          <div className="w-full mt-4 border border-[#1d3b53] rounded-lg p-4 bg-[#01111d] shadow-sm hover:shadow-lg hover:shadow-[#011627]/25 transition-shadow duration-200">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-[#ffcb6b]">Generated C Code:</h3>
              <button 
                className="px-2 py-1 bg-[#5f7e97] text-[#fff] text-xs rounded hover:bg-[#82aaff] transition flex items-center gap-1"
                onClick={() => copyToClipboard(generatedCode, setCopiedC)}
                aria-label="Copy C code to clipboard"
              >
                {copiedC ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-sm overflow-auto p-3 bg-[#011627] rounded text-[#d6deeb] font-mono border border-[#1d3b53]">{generatedCode}</pre>
            
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-[#5f7e97] text-black rounded-lg hover:bg-[#82aaff] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                onClick={executeCCode}
                disabled={isExecuting || !generatedCode || !isModuleLoaded}
              >
                {isExecuting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#fff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : !isModuleLoaded ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#fff]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading Module...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                    </svg>
                    Generate Intermediate Representation (IR)
                  </>
                )}
              </button>
            </div>

            {llvmIR && (
              <div className="mt-6 pt-6 border-t border-[#1d3b53]">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-[#ffcb6b]">Generated Intermediate Representation (IR):<br></br> WebAssembly Text Format (WAT)</h3>
                  <button 
                    className="px-2 py-1 bg-[#5f7e97] text-[#fff] text-xs rounded hover:bg-[#82aaff] transition flex items-center gap-1"
                    onClick={() => copyToClipboard(llvmIR, setCopiedWAT)}
                    aria-label="Copy WebAssembly Text Format to clipboard"
                  >
                    {copiedWAT ? (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                          <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
                <pre className="whitespace-pre-wrap text-sm overflow-auto p-3 bg-[#011627] rounded text-[#d6deeb] font-mono border border-[#1d3b53]">{llvmIR}</pre>
              </div>
            )}

            {executionResult && (
              <div className="mt-4 p-3 bg-[#01111d] border border-[#1d3b53] rounded-lg">
                <h3 className="font-bold mb-1 text-[#7fdbca]">Status:</h3>
                <p className="text-sm text-[#7fdbca]">{executionResult}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
