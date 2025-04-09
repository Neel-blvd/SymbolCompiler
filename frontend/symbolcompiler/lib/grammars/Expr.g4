grammar Expr;

program
    : stat EOF
    ;

stat: varDecl SC
    | expr SC
    | funcDecl SC
    | ifStat SC
    | whileStat SC
    | readStat SC
    | writeStat SC
    ;
    
varDecl
    : type ID EQ expr SC
    ;
    
funcDecl
    : DEF ID LPAREN paramList RPAREN LCURLY stat* RCURLY
    ;

paramList
    : type ID (COMMA type ID)*
    |                       
    ;
    
readStat
    : ID EQ READ LPAREN RPAREN
    ;
    
writeStat
    : WRITE LPAREN (STRING*|type) RPAREN
    ;

ifStat
    : IF LPAREN expr RPAREN LCURLY stat* RCURLY ELSE stat*
    ;

whileStat : WHILE LPAREN expr RPAREN LCURLY stat* RCURLY
    ;

idops : ID PLUS PLUS 
    | ID MINUS MINUS
    | ID PLUS EQ ID
    | ID MINUS EQ ID
    ;

for : FOR LPAREN varDecl SC expr SC idops RPAREN LCURLY stat* RCURLY
    ;

type
    : INT
    | BOOL
    | FLOAT
    ;

relop
    : LESS
    | GREATER
    | EQ EQ
    | LESS EQ
    | GREATER EQ
    ;

expr: ID
    | INTEGER
    | NOT expr
    | expr AND expr
    | expr OR expr
    | expr PLUS expr
    | expr MINUS expr
    | expr DIVIDES expr
    | expr MULS expr
    | expr relop expr
    ;

func : ID '(' expr (',' expr)* ')' ;

/* LEXER RULES */
LESS : '<';
GREATER : '>';
MULS : '*' ;
DIVIDES : '/' ;
MINUS : '-';
PLUS : '+';
OR : 'or' ;
AND : 'and';
NOT : '~' ;
DEF : 'funct';
SC : ';';
EQ : '=';
COMMA : ',' ;
LPAREN : '(' ;
RPAREN : ')' ;
LCURLY : '{' ;
RCURLY : '}' ;
CONST : 'triple_equal';
FALSE : 'four_dots_around_cross';
TRUE : 'four_dots_around_add';
READ : 'left_triangle';
BREAK : 'undertie';
STRING : 'two_asterisk';
ELSE : 'left_arrow';
FOR : 'phi';
INT : 'circle';
INTEGER :[0-9]+;
RETURN : 'inverted_qmark';
WHILE : 'sigma';
FUNCTION : 'music';
COMMENT : 'triple_slash';
BOOL     : 'omega';
CHAR     : 'square';
CONTINUE : 'two_tie';
FLOAT    : 'two_vertical_plus';
IF       : 'right_arrow';
NONE     : 'theta';
VOID     : 'sleeping_eight' ;
PROGRAM  : 'pentagon';
WRITE    : 'write';
ID : [a-zA-Z_][a-zA-Z_0-9]* ;
WS : [ \t\n\r\f]+ -> skip ;
