// Generated from Expr.g4 by ANTLR 4.13.2
// jshint ignore: start
import antlr4 from 'antlr4';
import ExprListener from './ExprListener.js';
const serializedATN = [4,1,42,233,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,
4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,
2,13,7,13,2,14,7,14,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,55,8,1,1,2,1,2,1,2,1,2,1,
2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,70,8,3,10,3,12,3,73,9,3,1,3,1,3,1,
4,1,4,1,4,1,4,1,4,1,4,5,4,83,8,4,10,4,12,4,86,9,4,1,4,3,4,89,8,4,1,5,1,5,
1,5,1,5,1,5,1,5,1,6,1,6,1,6,5,6,100,8,6,10,6,12,6,103,9,6,1,6,3,6,106,8,
6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,5,7,116,8,7,10,7,12,7,119,9,7,1,7,1,7,
1,7,5,7,124,8,7,10,7,12,7,127,9,7,1,8,1,8,1,8,1,8,1,8,1,8,5,8,135,8,8,10,
8,12,8,138,9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,
9,1,9,3,9,156,8,9,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,1,10,5,10,
168,8,10,10,10,12,10,171,9,10,1,10,1,10,1,11,1,11,1,12,1,12,1,12,1,12,1,
12,1,12,1,12,1,12,3,12,185,8,12,1,13,1,13,1,13,1,13,1,13,3,13,192,8,13,1,
13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
1,13,1,13,1,13,1,13,1,13,1,13,1,13,5,13,216,8,13,10,13,12,13,219,9,13,1,
14,1,14,1,14,1,14,1,14,5,14,226,8,14,10,14,12,14,229,9,14,1,14,1,14,1,14,
0,1,26,15,0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,0,1,3,0,26,26,32,32,35,
35,249,0,30,1,0,0,0,2,54,1,0,0,0,4,56,1,0,0,0,6,62,1,0,0,0,8,88,1,0,0,0,
10,90,1,0,0,0,12,96,1,0,0,0,14,109,1,0,0,0,16,128,1,0,0,0,18,155,1,0,0,0,
20,157,1,0,0,0,22,174,1,0,0,0,24,184,1,0,0,0,26,191,1,0,0,0,28,220,1,0,0,
0,30,31,3,2,1,0,31,32,5,0,0,1,32,1,1,0,0,0,33,34,3,4,2,0,34,35,5,11,0,0,
35,55,1,0,0,0,36,37,3,26,13,0,37,38,5,11,0,0,38,55,1,0,0,0,39,40,3,6,3,0,
40,41,5,11,0,0,41,55,1,0,0,0,42,43,3,14,7,0,43,44,5,11,0,0,44,55,1,0,0,0,
45,46,3,16,8,0,46,47,5,11,0,0,47,55,1,0,0,0,48,49,3,10,5,0,49,50,5,11,0,
0,50,55,1,0,0,0,51,52,3,12,6,0,52,53,5,11,0,0,53,55,1,0,0,0,54,33,1,0,0,
0,54,36,1,0,0,0,54,39,1,0,0,0,54,42,1,0,0,0,54,45,1,0,0,0,54,48,1,0,0,0,
54,51,1,0,0,0,55,3,1,0,0,0,56,57,3,22,11,0,57,58,5,41,0,0,58,59,5,12,0,0,
59,60,3,26,13,0,60,61,5,11,0,0,61,5,1,0,0,0,62,63,5,10,0,0,63,64,5,41,0,
0,64,65,5,14,0,0,65,66,3,8,4,0,66,67,5,15,0,0,67,71,5,16,0,0,68,70,3,2,1,
0,69,68,1,0,0,0,70,73,1,0,0,0,71,69,1,0,0,0,71,72,1,0,0,0,72,74,1,0,0,0,
73,71,1,0,0,0,74,75,5,17,0,0,75,7,1,0,0,0,76,77,3,22,11,0,77,84,5,41,0,0,
78,79,5,13,0,0,79,80,3,22,11,0,80,81,5,41,0,0,81,83,1,0,0,0,82,78,1,0,0,
0,83,86,1,0,0,0,84,82,1,0,0,0,84,85,1,0,0,0,85,89,1,0,0,0,86,84,1,0,0,0,
87,89,1,0,0,0,88,76,1,0,0,0,88,87,1,0,0,0,89,9,1,0,0,0,90,91,5,41,0,0,91,
92,5,12,0,0,92,93,5,21,0,0,93,94,5,14,0,0,94,95,5,15,0,0,95,11,1,0,0,0,96,
97,5,40,0,0,97,105,5,14,0,0,98,100,5,23,0,0,99,98,1,0,0,0,100,103,1,0,0,
0,101,99,1,0,0,0,101,102,1,0,0,0,102,106,1,0,0,0,103,101,1,0,0,0,104,106,
3,22,11,0,105,101,1,0,0,0,105,104,1,0,0,0,106,107,1,0,0,0,107,108,5,15,0,
0,108,13,1,0,0,0,109,110,5,36,0,0,110,111,5,14,0,0,111,112,3,26,13,0,112,
113,5,15,0,0,113,117,5,16,0,0,114,116,3,2,1,0,115,114,1,0,0,0,116,119,1,
0,0,0,117,115,1,0,0,0,117,118,1,0,0,0,118,120,1,0,0,0,119,117,1,0,0,0,120,
121,5,17,0,0,121,125,5,24,0,0,122,124,3,2,1,0,123,122,1,0,0,0,124,127,1,
0,0,0,125,123,1,0,0,0,125,126,1,0,0,0,126,15,1,0,0,0,127,125,1,0,0,0,128,
129,5,29,0,0,129,130,5,14,0,0,130,131,3,26,13,0,131,132,5,15,0,0,132,136,
5,16,0,0,133,135,3,2,1,0,134,133,1,0,0,0,135,138,1,0,0,0,136,134,1,0,0,0,
136,137,1,0,0,0,137,139,1,0,0,0,138,136,1,0,0,0,139,140,5,17,0,0,140,17,
1,0,0,0,141,142,5,41,0,0,142,143,5,6,0,0,143,156,5,6,0,0,144,145,5,41,0,
0,145,146,5,5,0,0,146,156,5,5,0,0,147,148,5,41,0,0,148,149,5,6,0,0,149,150,
5,12,0,0,150,156,5,41,0,0,151,152,5,41,0,0,152,153,5,5,0,0,153,154,5,12,
0,0,154,156,5,41,0,0,155,141,1,0,0,0,155,144,1,0,0,0,155,147,1,0,0,0,155,
151,1,0,0,0,156,19,1,0,0,0,157,158,5,25,0,0,158,159,5,14,0,0,159,160,3,4,
2,0,160,161,5,11,0,0,161,162,3,26,13,0,162,163,5,11,0,0,163,164,3,18,9,0,
164,165,5,15,0,0,165,169,5,16,0,0,166,168,3,2,1,0,167,166,1,0,0,0,168,171,
1,0,0,0,169,167,1,0,0,0,169,170,1,0,0,0,170,172,1,0,0,0,171,169,1,0,0,0,
172,173,5,17,0,0,173,21,1,0,0,0,174,175,7,0,0,0,175,23,1,0,0,0,176,185,5,
1,0,0,177,185,5,2,0,0,178,179,5,12,0,0,179,185,5,12,0,0,180,181,5,1,0,0,
181,185,5,12,0,0,182,183,5,2,0,0,183,185,5,12,0,0,184,176,1,0,0,0,184,177,
1,0,0,0,184,178,1,0,0,0,184,180,1,0,0,0,184,182,1,0,0,0,185,25,1,0,0,0,186,
187,6,13,-1,0,187,192,5,41,0,0,188,192,5,27,0,0,189,190,5,9,0,0,190,192,
3,26,13,8,191,186,1,0,0,0,191,188,1,0,0,0,191,189,1,0,0,0,192,217,1,0,0,
0,193,194,10,7,0,0,194,195,5,8,0,0,195,216,3,26,13,8,196,197,10,6,0,0,197,
198,5,7,0,0,198,216,3,26,13,7,199,200,10,5,0,0,200,201,5,6,0,0,201,216,3,
26,13,6,202,203,10,4,0,0,203,204,5,5,0,0,204,216,3,26,13,5,205,206,10,3,
0,0,206,207,5,4,0,0,207,216,3,26,13,4,208,209,10,2,0,0,209,210,5,3,0,0,210,
216,3,26,13,3,211,212,10,1,0,0,212,213,3,24,12,0,213,214,3,26,13,2,214,216,
1,0,0,0,215,193,1,0,0,0,215,196,1,0,0,0,215,199,1,0,0,0,215,202,1,0,0,0,
215,205,1,0,0,0,215,208,1,0,0,0,215,211,1,0,0,0,216,219,1,0,0,0,217,215,
1,0,0,0,217,218,1,0,0,0,218,27,1,0,0,0,219,217,1,0,0,0,220,221,5,41,0,0,
221,222,5,14,0,0,222,227,3,26,13,0,223,224,5,13,0,0,224,226,3,26,13,0,225,
223,1,0,0,0,226,229,1,0,0,0,227,225,1,0,0,0,227,228,1,0,0,0,228,230,1,0,
0,0,229,227,1,0,0,0,230,231,5,15,0,0,231,29,1,0,0,0,16,54,71,84,88,101,105,
117,125,136,155,169,184,191,215,217,227];


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.atn.PredictionContextCache();

export default class ExprParser extends antlr4.Parser {

    static grammarFileName = "Expr.g4";
    static literalNames = [ null, "'<'", "'>'", "'*'", "'/'", "'-'", "'+'", 
                            "'or'", "'and'", "'~'", "'funct'", "';'", "'='", 
                            "','", "'('", "')'", "'{'", "'}'", "'triple_equal'", 
                            "'four_dots_around_cross'", "'four_dots_around_add'", 
                            "'left_triangle'", "'undertie'", "'two_asterisk'", 
                            "'left_arrow'", "'phi'", "'circle'", null, "'inverted_qmark'", 
                            "'sigma'", "'music'", "'triple_slash'", "'omega'", 
                            "'square'", "'two_tie'", "'two_vertical_plus'", 
                            "'right_arrow'", "'theta'", "'sleeping_eight'", 
                            "'pentagon'", "'write'" ];
    static symbolicNames = [ null, "LESS", "GREATER", "MULS", "DIVIDES", 
                             "MINUS", "PLUS", "OR", "AND", "NOT", "DEF", 
                             "SC", "EQ", "COMMA", "LPAREN", "RPAREN", "LCURLY", 
                             "RCURLY", "CONST", "FALSE", "TRUE", "READ", 
                             "BREAK", "STRING", "ELSE", "FOR", "INT", "INTEGER", 
                             "RETURN", "WHILE", "FUNCTION", "COMMENT", "BOOL", 
                             "CHAR", "CONTINUE", "FLOAT", "IF", "NONE", 
                             "VOID", "PROGRAM", "WRITE", "ID", "WS" ];
    static ruleNames = [ "program", "stat", "varDecl", "funcDecl", "paramList", 
                         "readStat", "writeStat", "ifStat", "whileStat", 
                         "idops", "for", "type", "relop", "expr", "func" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = ExprParser.ruleNames;
        this.literalNames = ExprParser.literalNames;
        this.symbolicNames = ExprParser.symbolicNames;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 13:
    	    		return this.expr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 7);
    		case 1:
    			return this.precpred(this._ctx, 6);
    		case 2:
    			return this.precpred(this._ctx, 5);
    		case 3:
    			return this.precpred(this._ctx, 4);
    		case 4:
    			return this.precpred(this._ctx, 3);
    		case 5:
    			return this.precpred(this._ctx, 2);
    		case 6:
    			return this.precpred(this._ctx, 1);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, ExprParser.RULE_program);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 30;
	        this.stat();
	        this.state = 31;
	        this.match(ExprParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	stat() {
	    let localctx = new StatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, ExprParser.RULE_stat);
	    try {
	        this.state = 54;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,0,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 33;
	            this.varDecl();
	            this.state = 34;
	            this.match(ExprParser.SC);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 36;
	            this.expr(0);
	            this.state = 37;
	            this.match(ExprParser.SC);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 39;
	            this.funcDecl();
	            this.state = 40;
	            this.match(ExprParser.SC);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 42;
	            this.ifStat();
	            this.state = 43;
	            this.match(ExprParser.SC);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 45;
	            this.whileStat();
	            this.state = 46;
	            this.match(ExprParser.SC);
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 48;
	            this.readStat();
	            this.state = 49;
	            this.match(ExprParser.SC);
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 51;
	            this.writeStat();
	            this.state = 52;
	            this.match(ExprParser.SC);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varDecl() {
	    let localctx = new VarDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, ExprParser.RULE_varDecl);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 56;
	        this.type();
	        this.state = 57;
	        this.match(ExprParser.ID);
	        this.state = 58;
	        this.match(ExprParser.EQ);
	        this.state = 59;
	        this.expr(0);
	        this.state = 60;
	        this.match(ExprParser.SC);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	funcDecl() {
	    let localctx = new FuncDeclContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, ExprParser.RULE_funcDecl);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 62;
	        this.match(ExprParser.DEF);
	        this.state = 63;
	        this.match(ExprParser.ID);
	        this.state = 64;
	        this.match(ExprParser.LPAREN);
	        this.state = 65;
	        this.paramList();
	        this.state = 66;
	        this.match(ExprParser.RPAREN);
	        this.state = 67;
	        this.match(ExprParser.LCURLY);
	        this.state = 71;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
	            this.state = 68;
	            this.stat();
	            this.state = 73;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 74;
	        this.match(ExprParser.RCURLY);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	paramList() {
	    let localctx = new ParamListContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, ExprParser.RULE_paramList);
	    var _la = 0;
	    try {
	        this.state = 88;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 26:
	        case 32:
	        case 35:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 76;
	            this.type();
	            this.state = 77;
	            this.match(ExprParser.ID);
	            this.state = 84;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===13) {
	                this.state = 78;
	                this.match(ExprParser.COMMA);
	                this.state = 79;
	                this.type();
	                this.state = 80;
	                this.match(ExprParser.ID);
	                this.state = 86;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        case 15:
	            this.enterOuterAlt(localctx, 2);

	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	readStat() {
	    let localctx = new ReadStatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, ExprParser.RULE_readStat);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 90;
	        this.match(ExprParser.ID);
	        this.state = 91;
	        this.match(ExprParser.EQ);
	        this.state = 92;
	        this.match(ExprParser.READ);
	        this.state = 93;
	        this.match(ExprParser.LPAREN);
	        this.state = 94;
	        this.match(ExprParser.RPAREN);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	writeStat() {
	    let localctx = new WriteStatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, ExprParser.RULE_writeStat);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 96;
	        this.match(ExprParser.WRITE);
	        this.state = 97;
	        this.match(ExprParser.LPAREN);
	        this.state = 105;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 15:
	        case 23:
	            this.state = 101;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	            while(_la===23) {
	                this.state = 98;
	                this.match(ExprParser.STRING);
	                this.state = 103;
	                this._errHandler.sync(this);
	                _la = this._input.LA(1);
	            }
	            break;
	        case 26:
	        case 32:
	        case 35:
	            this.state = 104;
	            this.type();
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this.state = 107;
	        this.match(ExprParser.RPAREN);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ifStat() {
	    let localctx = new IfStatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, ExprParser.RULE_ifStat);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 109;
	        this.match(ExprParser.IF);
	        this.state = 110;
	        this.match(ExprParser.LPAREN);
	        this.state = 111;
	        this.expr(0);
	        this.state = 112;
	        this.match(ExprParser.RPAREN);
	        this.state = 113;
	        this.match(ExprParser.LCURLY);
	        this.state = 117;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
	            this.state = 114;
	            this.stat();
	            this.state = 119;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 120;
	        this.match(ExprParser.RCURLY);
	        this.state = 121;
	        this.match(ExprParser.ELSE);
	        this.state = 125;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
	            this.state = 122;
	            this.stat();
	            this.state = 127;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	whileStat() {
	    let localctx = new WhileStatContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, ExprParser.RULE_whileStat);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 128;
	        this.match(ExprParser.WHILE);
	        this.state = 129;
	        this.match(ExprParser.LPAREN);
	        this.state = 130;
	        this.expr(0);
	        this.state = 131;
	        this.match(ExprParser.RPAREN);
	        this.state = 132;
	        this.match(ExprParser.LCURLY);
	        this.state = 136;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
	            this.state = 133;
	            this.stat();
	            this.state = 138;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 139;
	        this.match(ExprParser.RCURLY);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	idops() {
	    let localctx = new IdopsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, ExprParser.RULE_idops);
	    try {
	        this.state = 155;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 141;
	            this.match(ExprParser.ID);
	            this.state = 142;
	            this.match(ExprParser.PLUS);
	            this.state = 143;
	            this.match(ExprParser.PLUS);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 144;
	            this.match(ExprParser.ID);
	            this.state = 145;
	            this.match(ExprParser.MINUS);
	            this.state = 146;
	            this.match(ExprParser.MINUS);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 147;
	            this.match(ExprParser.ID);
	            this.state = 148;
	            this.match(ExprParser.PLUS);
	            this.state = 149;
	            this.match(ExprParser.EQ);
	            this.state = 150;
	            this.match(ExprParser.ID);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 151;
	            this.match(ExprParser.ID);
	            this.state = 152;
	            this.match(ExprParser.MINUS);
	            this.state = 153;
	            this.match(ExprParser.EQ);
	            this.state = 154;
	            this.match(ExprParser.ID);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	for_() {
	    let localctx = new ForContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, ExprParser.RULE_for);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 157;
	        this.match(ExprParser.FOR);
	        this.state = 158;
	        this.match(ExprParser.LPAREN);
	        this.state = 159;
	        this.varDecl();
	        this.state = 160;
	        this.match(ExprParser.SC);
	        this.state = 161;
	        this.expr(0);
	        this.state = 162;
	        this.match(ExprParser.SC);
	        this.state = 163;
	        this.idops();
	        this.state = 164;
	        this.match(ExprParser.RPAREN);
	        this.state = 165;
	        this.match(ExprParser.LCURLY);
	        this.state = 169;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1f) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
	            this.state = 166;
	            this.stat();
	            this.state = 171;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 172;
	        this.match(ExprParser.RCURLY);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	type() {
	    let localctx = new TypeContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, ExprParser.RULE_type);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        _la = this._input.LA(1);
	        if(!(((((_la - 26)) & ~0x1f) === 0 && ((1 << (_la - 26)) & 577) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	relop() {
	    let localctx = new RelopContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, ExprParser.RULE_relop);
	    try {
	        this.state = 184;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,11,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 176;
	            this.match(ExprParser.LESS);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 177;
	            this.match(ExprParser.GREATER);
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 178;
	            this.match(ExprParser.EQ);
	            this.state = 179;
	            this.match(ExprParser.EQ);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 180;
	            this.match(ExprParser.LESS);
	            this.state = 181;
	            this.match(ExprParser.EQ);
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 182;
	            this.match(ExprParser.GREATER);
	            this.state = 183;
	            this.match(ExprParser.EQ);
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 26;
	    this.enterRecursionRule(localctx, 26, ExprParser.RULE_expr, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 191;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case 41:
	            this.state = 187;
	            this.match(ExprParser.ID);
	            break;
	        case 27:
	            this.state = 188;
	            this.match(ExprParser.INTEGER);
	            break;
	        case 9:
	            this.state = 189;
	            this.match(ExprParser.NOT);
	            this.state = 190;
	            this.expr(8);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 217;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,14,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 215;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,13,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 193;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 194;
	                    this.match(ExprParser.AND);
	                    this.state = 195;
	                    this.expr(8);
	                    break;

	                case 2:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 196;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 197;
	                    this.match(ExprParser.OR);
	                    this.state = 198;
	                    this.expr(7);
	                    break;

	                case 3:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 199;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 200;
	                    this.match(ExprParser.PLUS);
	                    this.state = 201;
	                    this.expr(6);
	                    break;

	                case 4:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 202;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 203;
	                    this.match(ExprParser.MINUS);
	                    this.state = 204;
	                    this.expr(5);
	                    break;

	                case 5:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 205;
	                    if (!( this.precpred(this._ctx, 3))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 3)");
	                    }
	                    this.state = 206;
	                    this.match(ExprParser.DIVIDES);
	                    this.state = 207;
	                    this.expr(4);
	                    break;

	                case 6:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 208;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 209;
	                    this.match(ExprParser.MULS);
	                    this.state = 210;
	                    this.expr(3);
	                    break;

	                case 7:
	                    localctx = new ExprContext(this, _parentctx, _parentState);
	                    this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
	                    this.state = 211;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 212;
	                    this.relop();
	                    this.state = 213;
	                    this.expr(2);
	                    break;

	                } 
	            }
	            this.state = 219;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,14,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	func() {
	    let localctx = new FuncContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, ExprParser.RULE_func);
	    var _la = 0;
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 220;
	        this.match(ExprParser.ID);
	        this.state = 221;
	        this.match(ExprParser.LPAREN);
	        this.state = 222;
	        this.expr(0);
	        this.state = 227;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===13) {
	            this.state = 223;
	            this.match(ExprParser.COMMA);
	            this.state = 224;
	            this.expr(0);
	            this.state = 229;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 230;
	        this.match(ExprParser.RPAREN);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

ExprParser.EOF = antlr4.Token.EOF;
ExprParser.LESS = 1;
ExprParser.GREATER = 2;
ExprParser.MULS = 3;
ExprParser.DIVIDES = 4;
ExprParser.MINUS = 5;
ExprParser.PLUS = 6;
ExprParser.OR = 7;
ExprParser.AND = 8;
ExprParser.NOT = 9;
ExprParser.DEF = 10;
ExprParser.SC = 11;
ExprParser.EQ = 12;
ExprParser.COMMA = 13;
ExprParser.LPAREN = 14;
ExprParser.RPAREN = 15;
ExprParser.LCURLY = 16;
ExprParser.RCURLY = 17;
ExprParser.CONST = 18;
ExprParser.FALSE = 19;
ExprParser.TRUE = 20;
ExprParser.READ = 21;
ExprParser.BREAK = 22;
ExprParser.STRING = 23;
ExprParser.ELSE = 24;
ExprParser.FOR = 25;
ExprParser.INT = 26;
ExprParser.INTEGER = 27;
ExprParser.RETURN = 28;
ExprParser.WHILE = 29;
ExprParser.FUNCTION = 30;
ExprParser.COMMENT = 31;
ExprParser.BOOL = 32;
ExprParser.CHAR = 33;
ExprParser.CONTINUE = 34;
ExprParser.FLOAT = 35;
ExprParser.IF = 36;
ExprParser.NONE = 37;
ExprParser.VOID = 38;
ExprParser.PROGRAM = 39;
ExprParser.WRITE = 40;
ExprParser.ID = 41;
ExprParser.WS = 42;

ExprParser.RULE_program = 0;
ExprParser.RULE_stat = 1;
ExprParser.RULE_varDecl = 2;
ExprParser.RULE_funcDecl = 3;
ExprParser.RULE_paramList = 4;
ExprParser.RULE_readStat = 5;
ExprParser.RULE_writeStat = 6;
ExprParser.RULE_ifStat = 7;
ExprParser.RULE_whileStat = 8;
ExprParser.RULE_idops = 9;
ExprParser.RULE_for = 10;
ExprParser.RULE_type = 11;
ExprParser.RULE_relop = 12;
ExprParser.RULE_expr = 13;
ExprParser.RULE_func = 14;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_program;
    }

	stat() {
	    return this.getTypedRuleContext(StatContext,0);
	};

	EOF() {
	    return this.getToken(ExprParser.EOF, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitProgram(this);
		}
	}


}



class StatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_stat;
    }

	varDecl() {
	    return this.getTypedRuleContext(VarDeclContext,0);
	};

	SC() {
	    return this.getToken(ExprParser.SC, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	funcDecl() {
	    return this.getTypedRuleContext(FuncDeclContext,0);
	};

	ifStat() {
	    return this.getTypedRuleContext(IfStatContext,0);
	};

	whileStat() {
	    return this.getTypedRuleContext(WhileStatContext,0);
	};

	readStat() {
	    return this.getTypedRuleContext(ReadStatContext,0);
	};

	writeStat() {
	    return this.getTypedRuleContext(WriteStatContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitStat(this);
		}
	}


}



class VarDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_varDecl;
    }

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	ID() {
	    return this.getToken(ExprParser.ID, 0);
	};

	EQ() {
	    return this.getToken(ExprParser.EQ, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	SC() {
	    return this.getToken(ExprParser.SC, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterVarDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitVarDecl(this);
		}
	}


}



class FuncDeclContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_funcDecl;
    }

	DEF() {
	    return this.getToken(ExprParser.DEF, 0);
	};

	ID() {
	    return this.getToken(ExprParser.ID, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	paramList() {
	    return this.getTypedRuleContext(ParamListContext,0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	LCURLY() {
	    return this.getToken(ExprParser.LCURLY, 0);
	};

	RCURLY() {
	    return this.getToken(ExprParser.RCURLY, 0);
	};

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterFuncDecl(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitFuncDecl(this);
		}
	}


}



class ParamListContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_paramList;
    }

	type = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TypeContext);
	    } else {
	        return this.getTypedRuleContext(TypeContext,i);
	    }
	};

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.ID);
	    } else {
	        return this.getToken(ExprParser.ID, i);
	    }
	};


	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.COMMA);
	    } else {
	        return this.getToken(ExprParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterParamList(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitParamList(this);
		}
	}


}



class ReadStatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_readStat;
    }

	ID() {
	    return this.getToken(ExprParser.ID, 0);
	};

	EQ() {
	    return this.getToken(ExprParser.EQ, 0);
	};

	READ() {
	    return this.getToken(ExprParser.READ, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterReadStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitReadStat(this);
		}
	}


}



class WriteStatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_writeStat;
    }

	WRITE() {
	    return this.getToken(ExprParser.WRITE, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	type() {
	    return this.getTypedRuleContext(TypeContext,0);
	};

	STRING = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.STRING);
	    } else {
	        return this.getToken(ExprParser.STRING, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterWriteStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitWriteStat(this);
		}
	}


}



class IfStatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_ifStat;
    }

	IF() {
	    return this.getToken(ExprParser.IF, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	LCURLY() {
	    return this.getToken(ExprParser.LCURLY, 0);
	};

	RCURLY() {
	    return this.getToken(ExprParser.RCURLY, 0);
	};

	ELSE() {
	    return this.getToken(ExprParser.ELSE, 0);
	};

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterIfStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitIfStat(this);
		}
	}


}



class WhileStatContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_whileStat;
    }

	WHILE() {
	    return this.getToken(ExprParser.WHILE, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	LCURLY() {
	    return this.getToken(ExprParser.LCURLY, 0);
	};

	RCURLY() {
	    return this.getToken(ExprParser.RCURLY, 0);
	};

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterWhileStat(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitWhileStat(this);
		}
	}


}



class IdopsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_idops;
    }

	ID = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.ID);
	    } else {
	        return this.getToken(ExprParser.ID, i);
	    }
	};


	PLUS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.PLUS);
	    } else {
	        return this.getToken(ExprParser.PLUS, i);
	    }
	};


	MINUS = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.MINUS);
	    } else {
	        return this.getToken(ExprParser.MINUS, i);
	    }
	};


	EQ() {
	    return this.getToken(ExprParser.EQ, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterIdops(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitIdops(this);
		}
	}


}



class ForContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_for;
    }

	FOR() {
	    return this.getToken(ExprParser.FOR, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	varDecl() {
	    return this.getTypedRuleContext(VarDeclContext,0);
	};

	SC = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.SC);
	    } else {
	        return this.getToken(ExprParser.SC, i);
	    }
	};


	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	idops() {
	    return this.getTypedRuleContext(IdopsContext,0);
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	LCURLY() {
	    return this.getToken(ExprParser.LCURLY, 0);
	};

	RCURLY() {
	    return this.getToken(ExprParser.RCURLY, 0);
	};

	stat = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatContext);
	    } else {
	        return this.getTypedRuleContext(StatContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterFor(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitFor(this);
		}
	}


}



class TypeContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_type;
    }

	INT() {
	    return this.getToken(ExprParser.INT, 0);
	};

	BOOL() {
	    return this.getToken(ExprParser.BOOL, 0);
	};

	FLOAT() {
	    return this.getToken(ExprParser.FLOAT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterType(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitType(this);
		}
	}


}



class RelopContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_relop;
    }

	LESS() {
	    return this.getToken(ExprParser.LESS, 0);
	};

	GREATER() {
	    return this.getToken(ExprParser.GREATER, 0);
	};

	EQ = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.EQ);
	    } else {
	        return this.getToken(ExprParser.EQ, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterRelop(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitRelop(this);
		}
	}


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_expr;
    }

	ID() {
	    return this.getToken(ExprParser.ID, 0);
	};

	INTEGER() {
	    return this.getToken(ExprParser.INTEGER, 0);
	};

	NOT() {
	    return this.getToken(ExprParser.NOT, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	AND() {
	    return this.getToken(ExprParser.AND, 0);
	};

	OR() {
	    return this.getToken(ExprParser.OR, 0);
	};

	PLUS() {
	    return this.getToken(ExprParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(ExprParser.MINUS, 0);
	};

	DIVIDES() {
	    return this.getToken(ExprParser.DIVIDES, 0);
	};

	MULS() {
	    return this.getToken(ExprParser.MULS, 0);
	};

	relop() {
	    return this.getTypedRuleContext(RelopContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitExpr(this);
		}
	}


}



class FuncContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = ExprParser.RULE_func;
    }

	ID() {
	    return this.getToken(ExprParser.ID, 0);
	};

	LPAREN() {
	    return this.getToken(ExprParser.LPAREN, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	RPAREN() {
	    return this.getToken(ExprParser.RPAREN, 0);
	};

	COMMA = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(ExprParser.COMMA);
	    } else {
	        return this.getToken(ExprParser.COMMA, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.enterFunc(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof ExprListener ) {
	        listener.exitFunc(this);
		}
	}


}




ExprParser.ProgramContext = ProgramContext; 
ExprParser.StatContext = StatContext; 
ExprParser.VarDeclContext = VarDeclContext; 
ExprParser.FuncDeclContext = FuncDeclContext; 
ExprParser.ParamListContext = ParamListContext; 
ExprParser.ReadStatContext = ReadStatContext; 
ExprParser.WriteStatContext = WriteStatContext; 
ExprParser.IfStatContext = IfStatContext; 
ExprParser.WhileStatContext = WhileStatContext; 
ExprParser.IdopsContext = IdopsContext; 
ExprParser.ForContext = ForContext; 
ExprParser.TypeContext = TypeContext; 
ExprParser.RelopContext = RelopContext; 
ExprParser.ExprContext = ExprContext; 
ExprParser.FuncContext = FuncContext; 
