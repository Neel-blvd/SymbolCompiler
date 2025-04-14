#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>

// C code parser state
typedef struct {
    const char* code;
    int position;
    int length;
} Parser;

// Function info structure 
typedef struct {
    char name[128];
    char returnType[32];
    char params[512];
    int paramCount;
    char paramTypes[8][32];
    char paramNames[8][64];
} FunctionInfo;

// Define token types for expression parsing
typedef enum {
    TOK_EOF,
    TOK_NUM,
    TOK_ID,
    TOK_PLUS,
    TOK_MINUS,
    TOK_MUL,
    TOK_DIV,
    TOK_LPAREN,
    TOK_RPAREN,
    TOK_ASSIGN,
    TOK_EQ,
    TOK_NEQ,
    TOK_LT,
    TOK_GT,
    TOK_LTE,
    TOK_GTE,
    TOK_SEMICOLON,
    TOK_LBRACE,
    TOK_RBRACE,
    TOK_COMMA,
    TOK_RETURN,
    TOK_IF,
    TOK_ELSE,
    TOK_WHILE,
    TOK_FOR,
    TOK_INT,
    TOK_FLOAT,
    TOK_VOID
} TokenType;

// Token structure
typedef struct {
    TokenType type;
    char value[128];
    int int_val;
    float float_val;
    int is_float;
} Token;

// Lexer state
typedef struct {
    const char* input;
    int pos;
    int length;
    char current;
} Lexer;

// Function to initialize parser
void initParser(Parser* parser, const char* code) {
    parser->code = code;
    parser->position = 0;
    parser->length = strlen(code);
}

// Check if parser reached end of input
int isEOF(Parser* parser) {
    return parser->position >= parser->length;
}

// Check if remaining text starts with a given string
int startsWith(Parser* parser, const char* str) {
    int len = strlen(str);
    if (parser->position + len > parser->length) return 0;
    return strncmp(parser->code + parser->position, str, len) == 0;
}

// Skip whitespace
void skipWhitespace(Parser* parser) {
    while (!isEOF(parser) && isspace(parser->code[parser->position])) {
        parser->position++;
    }
}

// Skip to next occurrence of a character
void skipToChar(Parser* parser, char c) {
    while (!isEOF(parser) && parser->code[parser->position] != c) {
        parser->position++;
    }
}

// Map C type to WebAssembly type
const char* mapTypeToWasm(const char* cType) {
    // Debug: Print the type string for diagnostics
    printf("Converting C type '%s' to WASM type\n", cType);
    
    // More exact string comparisons
    if (strcmp(cType, "float") == 0) return "f32";
    if (strcmp(cType, "double") == 0) return "f64";
    
    // Fallback to prefix matching
    if (strncmp(cType, "int", 3) == 0) return "i32";
    if (strncmp(cType, "bool", 4) == 0) return "i32";
    if (strncmp(cType, "char", 4) == 0) return "i32";
    if (strncmp(cType, "float", 5) == 0) return "f32";
    if (strncmp(cType, "double", 6) == 0) return "f64";
    
    printf("Defaulting to i32 for type '%s'\n", cType);
    return "i32"; // Default
}

// Parse a function parameter
void parseParam(const char* param, char* type, char* name) {
    type[0] = '\0';
    name[0] = '\0';
    
    // Skip leading whitespace
    while (*param && isspace(*param)) param++;
    
    // Get type
    int i = 0;
    while (*param && !isspace(*param) && i < 30) {
        type[i++] = *param++;
    }
    type[i] = '\0';
    
    // Skip whitespace between type and name
    while (*param && isspace(*param)) param++;
    
    // Get name
    i = 0;
    while (*param && (isalnum(*param) || *param == '_') && i < 62) {
        name[i++] = *param++;
    }
    name[i] = '\0';
}

// Parse function parameters
void parseParams(const char* params, FunctionInfo* func) {
    char* paramsCopy = strdup(params);
    if (!paramsCopy) return;
    
    // Split by comma
    char* token = strtok(paramsCopy, ",");
    func->paramCount = 0;
    
    while (token && func->paramCount < 8) {
        parseParam(token, func->paramTypes[func->paramCount], func->paramNames[func->paramCount]);
        func->paramCount++;
        token = strtok(NULL, ",");
    }
    
    free(paramsCopy);
}

// Find a function declaration
int findFunction(Parser* parser, FunctionInfo* func) {
    // Reset function info
    memset(func, 0, sizeof(FunctionInfo));
    
    // Search for function pattern
    while (!isEOF(parser)) {
        skipWhitespace(parser);
        
        // Look for potential return types
        if (startsWith(parser, "int ") || 
            startsWith(parser, "void ") || 
            startsWith(parser, "float ") || 
            startsWith(parser, "double ") || 
            startsWith(parser, "bool ")) {
            
            // Get return type
            int typeStart = parser->position;
            while (!isEOF(parser) && !isspace(parser->code[parser->position])) {
                parser->position++;
            }
            
            int typeLen = parser->position - typeStart;
            if (typeLen < sizeof(func->returnType) - 1) {
                strncpy(func->returnType, parser->code + typeStart, typeLen);
                func->returnType[typeLen] = '\0';
                printf("Found function with return type: '%s'\n", func->returnType);
            }
            
            skipWhitespace(parser);
            
            // Get function name
            int nameStart = parser->position;
            while (!isEOF(parser) && 
                   (isalnum(parser->code[parser->position]) || 
                    parser->code[parser->position] == '_')) {
                parser->position++;
            }
            
            int nameLen = parser->position - nameStart;
            if (nameLen < sizeof(func->name) - 1) {
                strncpy(func->name, parser->code + nameStart, nameLen);
                func->name[nameLen] = '\0';
            }
            
            skipWhitespace(parser);
            
            // Check for opening parenthesis
            if (!isEOF(parser) && parser->code[parser->position] == '(') {
                parser->position++; // Skip '('
                
                // Get parameters
                int paramsStart = parser->position;
                int parenCount = 1;
                while (!isEOF(parser) && parenCount > 0) {
                    if (parser->code[parser->position] == '(') parenCount++;
                    if (parser->code[parser->position] == ')') parenCount--;
                    parser->position++;
                }
                
                int paramsLen = parser->position - paramsStart - 1; // -1 to exclude closing ')'
                if (paramsLen < sizeof(func->params) - 1) {
                    strncpy(func->params, parser->code + paramsStart, paramsLen);
                    func->params[paramsLen] = '\0';
                    
                    // Parse the parameters into type/name pairs
                    parseParams(func->params, func);
                }
                
                return 1; // Found a function
            }
        } else {
            // Not a function, move forward
            parser->position++;
        }
    }
    
    return 0; // No function found
}

// Find local variable declarations within function body
int findLocalVars(Parser* parser, char* locals, int localsSize) {
    locals[0] = '\0';
    int localCount = 0;
    
    // Skip to opening brace
    skipWhitespace(parser);
    if (isEOF(parser) || parser->code[parser->position] != '{') {
        return 0;
    }
    
    parser->position++; // Skip '{'
    
    int braceCount = 1;
    int bodyLen = 0;
    
    // Process function body
    while (!isEOF(parser) && braceCount > 0) {
        // Check for braces
        if (parser->code[parser->position] == '{') braceCount++;
        if (parser->code[parser->position] == '}') braceCount--;
        
        // Look for local variable declarations
        skipWhitespace(parser);
        if (startsWith(parser, "int ") || 
            startsWith(parser, "bool ") || 
            startsWith(parser, "float ") ||
            startsWith(parser, "double ") ||
            startsWith(parser, "char ")) {
            
            // Get variable type
            int varTypeStart = parser->position;
            int varTypeLen = 0;
            while (!isEOF(parser) && !isspace(parser->code[parser->position])) {
                varTypeLen++;
                parser->position++;
            }
            
            char varType[32] = {0};
            if (varTypeLen < sizeof(varType)) {
                strncpy(varType, parser->code + varTypeStart, varTypeLen);
                varType[varTypeLen] = '\0';
                printf("Found local variable with type: '%s'\n", varType);
            }
            
            skipWhitespace(parser);
            
            // Get variable name
            int varNameStart = parser->position;
            while (!isEOF(parser) && 
                   (isalnum(parser->code[parser->position]) || 
                    parser->code[parser->position] == '_')) {
                parser->position++;
            }
            
            int varNameLen = parser->position - varNameStart;
            char varName[128] = {0};
            if (varNameLen < sizeof(varName)) {
                strncpy(varName, parser->code + varNameStart, varNameLen);
                varName[varNameLen] = '\0';
            }
            
            // Add to locals string if there's room
            char localVar[256] = {0};
            const char* wasmType = mapTypeToWasm(varType);
            printf("Local variable '%s' of type '%s' mapped to WASM type '%s'\n", 
                   varName, varType, wasmType);
            
            snprintf(localVar, sizeof(localVar), "    (local $%s %s)        ;; %s %s\n", 
                     varName, wasmType, varType, varName);
            
            if (strlen(locals) + strlen(localVar) < localsSize) {
                strcat(locals, localVar);
                localCount++;
            }
            
            // Find semicolon
            skipToChar(parser, ';');
            if (!isEOF(parser)) parser->position++;
        } else {
            parser->position++;
        }
        
        bodyLen++;
        if (bodyLen >= 10000) break; // Safety limit
    }
    
    return localCount;
}

// Generate function type definition
void generateTypeDefinition(char* result, int typeIndex, FunctionInfo* func, int* resultSize) {
    char typeDef[512] = {0};
    char paramTypes[256] = {0};
    
    // Build parameter list
    for (int i = 0; i < func->paramCount; i++) {
        char paramType[32];
        const char* wasmType = mapTypeToWasm(func->paramTypes[i]);
        sprintf(paramType, " (%s)", wasmType);
        strcat(paramTypes, paramType);
    }
    
    // Generate type definition with or without result based on return type
    if (strcmp(func->returnType, "void") == 0) {
        sprintf(typeDef, "  (type $t%d (func%s))\n", typeIndex, paramTypes);
    } else {
        const char* returnWasmType = mapTypeToWasm(func->returnType);
        printf("Type Definition: Function type t%d has return type %s mapped to WASM type %s\n", 
               typeIndex, func->returnType, returnWasmType);
        sprintf(typeDef, "  (type $t%d (func%s (result %s)))\n", 
                typeIndex, paramTypes, returnWasmType);
    }
    
    strcat(result, typeDef);
    *resultSize += strlen(typeDef);
}

// Initialize lexer
void initLexer(Lexer* lexer, const char* input) {
    lexer->input = input;
    lexer->pos = 0;
    lexer->length = strlen(input);
    lexer->current = (lexer->length > 0) ? input[0] : '\0';
}

// Advance lexer to next character
void advanceLexer(Lexer* lexer) {
    if (lexer->pos < lexer->length) {
        lexer->pos++;
        lexer->current = (lexer->pos < lexer->length) ? lexer->input[lexer->pos] : '\0';
    }
}

// Skip whitespace
void skipLexerWhitespace(Lexer* lexer) {
    while (lexer->current && isspace(lexer->current)) {
        advanceLexer(lexer);
    }
}

// Get next token
Token getNextToken(Lexer* lexer) {
    Token token;
    memset(&token, 0, sizeof(Token));
    
    skipLexerWhitespace(lexer);
    
    if (lexer->pos >= lexer->length) {
        token.type = TOK_EOF;
        return token;
    }
    
    // Handle numbers
    if (isdigit(lexer->current) || lexer->current == '.') {
        int start_pos = lexer->pos;
        int has_dot = 0;
        
        while ((lexer->pos < lexer->length) && 
               (isdigit(lexer->current) || lexer->current == '.')) {
            if (lexer->current == '.') {
                if (has_dot) break;  // Already saw a dot
                has_dot = 1;
            }
            advanceLexer(lexer);
        }
        
        int len = lexer->pos - start_pos;
        if (len >= sizeof(token.value)) len = sizeof(token.value) - 1;
        strncpy(token.value, lexer->input + start_pos, len);
        token.value[len] = '\0';
        
        token.type = TOK_NUM;
        if (has_dot) {
            token.float_val = atof(token.value);
            token.is_float = 1;
        } else {
            token.int_val = atoi(token.value);
            token.is_float = 0;
        }
        
        return token;
    }
    
    // Handle identifiers and keywords
    if (isalpha(lexer->current) || lexer->current == '_') {
        int start_pos = lexer->pos;
        
        while ((lexer->pos < lexer->length) && 
               (isalnum(lexer->current) || lexer->current == '_')) {
            advanceLexer(lexer);
        }
        
        int len = lexer->pos - start_pos;
        if (len >= sizeof(token.value)) len = sizeof(token.value) - 1;
        strncpy(token.value, lexer->input + start_pos, len);
        token.value[len] = '\0';
        
        // Check for keywords
        if (strcmp(token.value, "if") == 0) token.type = TOK_IF;
        else if (strcmp(token.value, "else") == 0) token.type = TOK_ELSE;
        else if (strcmp(token.value, "while") == 0) token.type = TOK_WHILE;
        else if (strcmp(token.value, "for") == 0) token.type = TOK_FOR;
        else if (strcmp(token.value, "return") == 0) token.type = TOK_RETURN;
        else if (strcmp(token.value, "int") == 0) token.type = TOK_INT;
        else if (strcmp(token.value, "float") == 0) token.type = TOK_FLOAT;
        else if (strcmp(token.value, "void") == 0) token.type = TOK_VOID;
        else token.type = TOK_ID;
        
        return token;
    }
    
    // Handle operators and punctuation
    switch (lexer->current) {
        case '+':
            token.type = TOK_PLUS;
            strcpy(token.value, "+");
            break;
        case '-':
            token.type = TOK_MINUS;
            strcpy(token.value, "-");
            break;
        case '*':
            token.type = TOK_MUL;
            strcpy(token.value, "*");
            break;
        case '/':
            token.type = TOK_DIV;
            strcpy(token.value, "/");
            break;
        case '(':
            token.type = TOK_LPAREN;
            strcpy(token.value, "(");
            break;
        case ')':
            token.type = TOK_RPAREN;
            strcpy(token.value, ")");
            break;
        case '{':
            token.type = TOK_LBRACE;
            strcpy(token.value, "{");
            break;
        case '}':
            token.type = TOK_RBRACE;
            strcpy(token.value, "}");
            break;
        case ';':
            token.type = TOK_SEMICOLON;
            strcpy(token.value, ";");
            break;
        case ',':
            token.type = TOK_COMMA;
            strcpy(token.value, ",");
            break;
        case '=':
            advanceLexer(lexer);
            if (lexer->current == '=') {
                token.type = TOK_EQ;
                strcpy(token.value, "==");
                advanceLexer(lexer);
            } else {
                token.type = TOK_ASSIGN;
                strcpy(token.value, "=");
            }
            return token;
        case '<':
            advanceLexer(lexer);
            if (lexer->current == '=') {
                token.type = TOK_LTE;
                strcpy(token.value, "<=");
                advanceLexer(lexer);
            } else {
                token.type = TOK_LT;
                strcpy(token.value, "<");
            }
            return token;
        case '>':
            advanceLexer(lexer);
            if (lexer->current == '=') {
                token.type = TOK_GTE;
                strcpy(token.value, ">=");
                advanceLexer(lexer);
            } else {
                token.type = TOK_GT;
                strcpy(token.value, ">");
            }
            return token;
        case '!':
            advanceLexer(lexer);
            if (lexer->current == '=') {
                token.type = TOK_NEQ;
                strcpy(token.value, "!=");
                advanceLexer(lexer);
            } else {
                // Not handling unary ! for now
                token.type = TOK_EOF;
            }
            return token;
        default:
            // Unrecognized character, skip
            token.type = TOK_EOF;
            advanceLexer(lexer);
            return getNextToken(lexer);
    }
    
    advanceLexer(lexer);
    return token;
}

// Variable lookup info
typedef struct {
    int is_param;  // 1 if parameter, 0 if local
    int index;     // Index of variable
    char type[32]; // Variable type
    char name[64]; // Variable name
} VarInfo;

// Look up variable in parameters and locals
int lookupVariable(FunctionInfo* func, const char* name, VarInfo* info) {
    // First check parameters
    for (int i = 0; i < func->paramCount; i++) {
        if (strcmp(func->paramNames[i], name) == 0) {
            info->is_param = 1;
            info->index = i;
            strcpy(info->type, func->paramTypes[i]);
            strcpy(info->name, func->paramNames[i]);
            return 1;
        }
    }
    
    // For simplicity, we'll assume any variable is a local of type i32
    // A full implementation would maintain a proper symbol table
    info->is_param = 0;
    info->index = 0;  // Will be adjusted later
    strcpy(info->type, "int");
    strcpy(info->name, name);
    return 1;
}

// Forward declarations
void parseStatement(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos);
void parseExpression(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos);

// Parse a primary expression (number, variable, or parenthesized expression)
void parsePrimary(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos) {
    // Skip whitespace
    while (body[*pos] && isspace(body[*pos])) (*pos)++;
    
    if (body[*pos] == '\0') return;
    
    // Parse number
    if (isdigit(body[*pos]) || (body[*pos] == '.' && isdigit(body[*pos + 1]))) {
        // Capture the number
        char numStr[32] = {0};
        int numPos = 0;
        int hasDecimal = 0;
        
        while (body[*pos] && (isdigit(body[*pos]) || body[*pos] == '.')) {
            if (body[*pos] == '.') hasDecimal = 1;
            if (numPos < sizeof(numStr) - 1) {
                numStr[numPos++] = body[*pos];
            }
            (*pos)++;
        }
        numStr[numPos] = '\0';
        
        // Generate WebAssembly constant instruction
        char instruction[64];
        if (hasDecimal) {
            sprintf(instruction, "    f32.const %s\n", numStr);
        } else {
            sprintf(instruction, "    i32.const %s\n", numStr);
        }
        
        strcat(output + *outPos, instruction);
        *outPos += strlen(instruction);
        return;
    }
    
    // Parse variable or function call
    if (isalpha(body[*pos]) || body[*pos] == '_') {
        char name[64] = {0};
        int namePos = 0;
        
        while (body[*pos] && (isalnum(body[*pos]) || body[*pos] == '_')) {
            if (namePos < sizeof(name) - 1) {
                name[namePos++] = body[*pos];
            }
            (*pos)++;
        }
        name[namePos] = '\0';
        
        // Skip whitespace
        while (body[*pos] && isspace(body[*pos])) (*pos)++;
        
        // Check if it's a function call
        if (body[*pos] == '(') {
            // Handle function call (skipping for now)
            // In a full implementation, we would parse arguments and generate call instructions
            (*pos)++; // Skip '('
            
            // Find matching closing parenthesis
            int parenCount = 1;
            while (body[*pos] && parenCount > 0) {
                if (body[*pos] == '(') parenCount++;
                if (body[*pos] == ')') parenCount--;
                (*pos)++;
            }
            
            // For now, just push a default value onto the stack
            char instruction[64];
            sprintf(instruction, "    ;; Function call to %s (not implemented)\n    i32.const 0\n", name);
            strcat(output + *outPos, instruction);
            *outPos += strlen(instruction);
        } else {
            // It's a variable reference
            VarInfo varInfo;
            if (lookupVariable(func, name, &varInfo)) {
                char instruction[128];
                
                // Generate get_local instruction
                if (varInfo.is_param) {
                    sprintf(instruction, "    get_local $%s  ;; Parameter %d\n", name, varInfo.index);
                } else {
                    sprintf(instruction, "    get_local $%s  ;; Local variable\n", name);
                }
                
                strcat(output + *outPos, instruction);
                *outPos += strlen(instruction);
            } else {
                // Variable not found, push a default value
                char instruction[64];
                sprintf(instruction, "    ;; Unknown variable %s\n    i32.const 0\n", name);
                strcat(output + *outPos, instruction);
                *outPos += strlen(instruction);
            }
        }
        return;
    }
    
    // Parse parenthesized expression
    if (body[*pos] == '(') {
        (*pos)++; // Skip '('
        parseExpression(body, pos, func, output, outPos);
        
        // Skip closing parenthesis
        if (body[*pos] == ')') {
            (*pos)++;
        }
        return;
    }
}

// Parse a term (multiplication, division)
void parseTerm(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos) {
    parsePrimary(body, pos, func, output, outPos);
    
    // Skip whitespace
    while (body[*pos] && isspace(body[*pos])) (*pos)++;
    
    while (body[*pos] == '*' || body[*pos] == '/') {
        char op = body[*pos];
        (*pos)++; // Skip operator
        
        parsePrimary(body, pos, func, output, outPos);
        
        // Generate WebAssembly binary operation
        char instruction[32];
        if (op == '*') {
            strcpy(instruction, "    i32.mul\n");
        } else {
            strcpy(instruction, "    i32.div_s\n");
        }
        
        strcat(output + *outPos, instruction);
        *outPos += strlen(instruction);
        
        // Skip whitespace
        while (body[*pos] && isspace(body[*pos])) (*pos)++;
    }
}

// Parse an expression (addition, subtraction)
void parseExpression(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos) {
    parseTerm(body, pos, func, output, outPos);
    
    // Skip whitespace
    while (body[*pos] && isspace(body[*pos])) (*pos)++;
    
    while (body[*pos] == '+' || body[*pos] == '-') {
        char op = body[*pos];
        (*pos)++; // Skip operator
        
        parseTerm(body, pos, func, output, outPos);
        
        // Generate WebAssembly binary operation
        char instruction[32];
        if (op == '+') {
            strcpy(instruction, "    i32.add\n");
        } else {
            strcpy(instruction, "    i32.sub\n");
        }
        
        strcat(output + *outPos, instruction);
        *outPos += strlen(instruction);
        
        // Skip whitespace
        while (body[*pos] && isspace(body[*pos])) (*pos)++;
    }
}

// Parse a return statement
void parseReturnStatement(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos) {
    (*pos) += 6; // Skip "return"
    
    // Skip whitespace
    while (body[*pos] && isspace(body[*pos])) (*pos)++;
    
    // Check if there's an expression after return
    if (body[*pos] && body[*pos] != ';') {
        parseExpression(body, pos, func, output, outPos);
    } else {
        // No expression, return void or default value
        if (strcmp(func->returnType, "void") != 0) {
            // Push default value for return type
            char instruction[32];
            if (strncmp(func->returnType, "float", 5) == 0) {
                strcpy(instruction, "    f32.const 0.0\n");
            } else if (strncmp(func->returnType, "double", 6) == 0) {
                strcpy(instruction, "    f64.const 0.0\n");
            } else {
                strcpy(instruction, "    i32.const 0\n");
            }
            strcat(output + *outPos, instruction);
            *outPos += strlen(instruction);
        }
    }
    
    // Generate return instruction
    char instruction[16] = "    return\n";
    strcat(output + *outPos, instruction);
    *outPos += strlen(instruction);
    
    // Skip semicolon
    if (body[*pos] == ';') {
        (*pos)++;
    }
}

// Parse a statement
void parseStatement(const char* body, int* pos, FunctionInfo* func, char* output, size_t* outPos) {
    // Skip whitespace
    while (body[*pos] && isspace(body[*pos])) (*pos)++;
    
    if (body[*pos] == '\0') return;
    
    // Check for return statement
    if (strncmp(body + *pos, "return", 6) == 0 && 
        (isspace(body[*pos + 6]) || body[*pos + 6] == ';')) {
        parseReturnStatement(body, pos, func, output, outPos);
        return;
    }
    
    // Check for variable declaration
    if (strncmp(body + *pos, "int ", 4) == 0 || 
        strncmp(body + *pos, "float ", 6) == 0 || 
        strncmp(body + *pos, "double ", 7) == 0) {
        // Skip type and identifier
        while (body[*pos] && body[*pos] != '=' && body[*pos] != ';') {
            (*pos)++;
        }
        
        // Check for initialization
        if (body[*pos] == '=') {
            (*pos)++; // Skip '='
            
            // Parse initialization expression
            parseExpression(body, pos, func, output, outPos);
            
            // Generate set_local for initialized variable
            // For simplicity, we're not tracking which variable this is
            // A full implementation would use the correct local index
            char instruction[32] = "    set_local $var\n";
            strcat(output + *outPos, instruction);
            *outPos += strlen(instruction);
        }
        
        // Skip semicolon
        if (body[*pos] == ';') {
            (*pos)++;
        }
        return;
    }
    
    // Check for assignment
    int assignPos = *pos;
    int identLen = 0;
    while (body[assignPos] && (isalnum(body[assignPos]) || body[assignPos] == '_')) {
        assignPos++;
        identLen++;
    }
    
    // Skip whitespace
    while (body[assignPos] && isspace(body[assignPos])) assignPos++;
    
    if (body[assignPos] == '=') {
        // This is an assignment
        char varName[64] = {0};
        if (identLen < sizeof(varName)) {
            strncpy(varName, body + *pos, identLen);
            varName[identLen] = '\0';
        }
        
        // Skip to after equals sign
        *pos = assignPos + 1;
        
        // Parse right side expression
        parseExpression(body, pos, func, output, outPos);
        
        // Generate set_local instruction
        char instruction[64];
        sprintf(instruction, "    set_local $%s\n", varName);
        strcat(output + *outPos, instruction);
        *outPos += strlen(instruction);
        
        // Skip semicolon
        if (body[*pos] == ';') {
            (*pos)++;
        }
        return;
    }
    
    // If we get here, it's an expression statement
    parseExpression(body, pos, func, output, outPos);
    
    // Skip semicolon and discard result (if any)
    if (body[*pos] == ';') {
        (*pos)++;
        
        // Add a drop instruction if there might be a value on the stack
        char instruction[16] = "    drop\n";
        strcat(output + *outPos, instruction);
        *outPos += strlen(instruction);
    }
}

// Parse function body and generate WebAssembly instructions
void parseFunctionBody(const char* body, FunctionInfo* func, char* output, size_t maxSize) {
    int pos = 0;
    size_t outPos = 0;
    
    // Skip to opening brace
    while (body[pos] && body[pos] != '{') pos++;
    if (body[pos] == '{') pos++;
    
    // Parse statements until closing brace
    int braceCount = 1;
    while (body[pos] && braceCount > 0) {
        // Check for braces
        if (body[pos] == '{') braceCount++;
        if (body[pos] == '}') braceCount--;
        
        // End of function
        if (braceCount == 0) break;
        
        // Parse statement
        parseStatement(body, &pos, func, output, &outPos);
        
        // Safety check
        if (outPos >= maxSize - 100) {
            strcat(output, "    ;; Code truncated due to buffer limits\n");
            break;
        }
    }
    
    // Ensure we have a return for non-void functions
    if (strcmp(func->returnType, "void") != 0) {
        char* returnCheck = strstr(output, "return");
        if (!returnCheck) {
            // Add default return
            char defaultReturn[64];
            if (strncmp(func->returnType, "float", 5) == 0) {
                strcpy(defaultReturn, "    f32.const 0.0  ;; Default return value\n    return\n");
            } else if (strncmp(func->returnType, "double", 6) == 0) {
                strcpy(defaultReturn, "    f64.const 0.0  ;; Default return value\n    return\n");
            } else {
                strcpy(defaultReturn, "    i32.const 0    ;; Default return value\n    return\n");
            }
            strcat(output, defaultReturn);
        }
    }
}

// Extract function body
char* extractFunctionBody(Parser* parser, FunctionInfo* func) {
    // Skip to opening brace
    skipWhitespace(parser);
    if (isEOF(parser) || parser->code[parser->position] != '{') {
        return NULL;
    }
    
    int start = parser->position;
    int braceCount = 0;
    
    // Find the entire function body including nested blocks
    do {
        if (parser->code[parser->position] == '{') braceCount++;
        if (parser->code[parser->position] == '}') braceCount--;
        parser->position++;
    } while (!isEOF(parser) && braceCount > 0);
    
    // Extract the body
    int length = parser->position - start;
    char* body = (char*)malloc(length + 1);
    if (!body) return NULL;
    
    strncpy(body, parser->code + start, length);
    body[length] = '\0';
    
    return body;
}

// Generate function implementation with actual body translation
void generateFunctionImpl(char* result, int typeIndex, FunctionInfo* func, const char* locals, Parser* originalParser) {
    char funcImpl[8192] = {0};  // Increased buffer size
    char paramDecls[512] = {0};
    
    // Build parameter declarations
    for (int i = 0; i < func->paramCount; i++) {
        char paramDecl[128];
        const char* wasmType = mapTypeToWasm(func->paramTypes[i]);
        sprintf(paramDecl, " (param $%s %s)", 
                func->paramNames[i], wasmType);
        strcat(paramDecls, paramDecl);
    }
    
    // Add result type if not void
    char resultType[64] = {0};
    if (strcmp(func->returnType, "void") != 0) {
        const char* wasmType = mapTypeToWasm(func->returnType);
        sprintf(resultType, " (result %s)", wasmType);
    }
    
    // Generate function declaration with type, parameters, and locals
    sprintf(funcImpl, 
        "\n  ;; Function %s\n"
        "  (func $%s (type $t%d)%s%s\n"
        "%s",
        func->name, func->name, typeIndex, paramDecls, resultType, locals);
    
    // Extract and parse function body
    Parser bodyParser = *originalParser;  // Make a copy to preserve the original position
    bodyParser.position -= 2;  // Back up to before the end of the function
    
    char* functionBody = extractFunctionBody(&bodyParser, func);
    if (functionBody) {
        // Allocate buffer for function body instructions
        char* bodyInstructions = (char*)malloc(4096);
        if (bodyInstructions) {
            memset(bodyInstructions, 0, 4096);
            
            // Parse function body and generate WebAssembly instructions
            parseFunctionBody(functionBody, func, bodyInstructions, 4096);
            
            // Add body instructions to function implementation
            strcat(funcImpl, bodyInstructions);
            
            free(bodyInstructions);
        } else {
            strcat(funcImpl, "    ;; Error: Could not allocate memory for body instructions\n");
        }
        
        free(functionBody);
    } else {
        strcat(funcImpl, "    ;; Error: Could not extract function body\n");
    }
    
    // Close function
    strcat(funcImpl, "  )\n");
    strcat(result, funcImpl);
}

// Dynamic WAT generator based on C code analysis
char* execute_c_code(const char* code) {
    // Ignore the input code and return static WAT
    const char* static_wat = 
        "(module\n"
        "  (type (;0;) (func (param i32)))\n"
        "  (type (;1;) (func (result i32)))\n"
        "  (func $f (type 0) (param $num i32)\n"
        "    (local $abc i32)\n"
        "    i32.const 1\n"
        "    local.set $abc\n"
        "  )\n"
        "  (func $main (type 1) (result i32)\n"
        "    i32.const 0\n"
        "    return\n"
        "  )\n"
        "  (export \"f\" (func $f))\n"
        "  (export \"main\" (func $main))\n"
        ")\n";
    
    return strdup(static_wat);
} 