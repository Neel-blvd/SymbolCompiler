// Generated from Expr.g4 by ANTLR 4.13.2
// noinspection ES6UnusedImports,JSUnusedGlobalSymbols,JSUnusedLocalSymbols

import {
	ATN,
	ATNDeserializer, DecisionState, DFA, FailedPredicateException,
	RecognitionException, NoViableAltException, BailErrorStrategy,
	Parser, ParserATNSimulator,
	RuleContext, ParserRuleContext, PredictionMode, PredictionContextCache,
	TerminalNode, RuleNode,
	Token, TokenStream,
	Interval, IntervalSet
} from 'antlr4';
import ExprListener from "./ExprListener.js";
// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;

export default class ExprParser extends Parser {
	public static readonly LESS = 1;
	public static readonly GREATER = 2;
	public static readonly MULS = 3;
	public static readonly DIVIDES = 4;
	public static readonly MINUS = 5;
	public static readonly PLUS = 6;
	public static readonly OR = 7;
	public static readonly AND = 8;
	public static readonly NOT = 9;
	public static readonly DEF = 10;
	public static readonly SC = 11;
	public static readonly EQ = 12;
	public static readonly COMMA = 13;
	public static readonly LPAREN = 14;
	public static readonly RPAREN = 15;
	public static readonly LCURLY = 16;
	public static readonly RCURLY = 17;
	public static readonly CONST = 18;
	public static readonly FALSE = 19;
	public static readonly TRUE = 20;
	public static readonly READ = 21;
	public static readonly BREAK = 22;
	public static readonly STRING = 23;
	public static readonly ELSE = 24;
	public static readonly FOR = 25;
	public static readonly INT = 26;
	public static readonly INTEGER = 27;
	public static readonly RETURN = 28;
	public static readonly WHILE = 29;
	public static readonly FUNCTION = 30;
	public static readonly COMMENT = 31;
	public static readonly BOOL = 32;
	public static readonly CHAR = 33;
	public static readonly CONTINUE = 34;
	public static readonly FLOAT = 35;
	public static readonly IF = 36;
	public static readonly NONE = 37;
	public static readonly VOID = 38;
	public static readonly PROGRAM = 39;
	public static readonly WRITE = 40;
	public static readonly ID = 41;
	public static readonly WS = 42;
	public static override readonly EOF = Token.EOF;
	public static readonly RULE_program = 0;
	public static readonly RULE_stat = 1;
	public static readonly RULE_varDecl = 2;
	public static readonly RULE_funcDecl = 3;
	public static readonly RULE_paramList = 4;
	public static readonly RULE_readStat = 5;
	public static readonly RULE_writeStat = 6;
	public static readonly RULE_ifStat = 7;
	public static readonly RULE_whileStat = 8;
	public static readonly RULE_idops = 9;
	public static readonly RULE_for = 10;
	public static readonly RULE_type = 11;
	public static readonly RULE_relop = 12;
	public static readonly RULE_expr = 13;
	public static readonly RULE_func = 14;
	public static readonly literalNames: (string | null)[] = [ null, "'<'", 
                                                            "'>'", "'*'", 
                                                            "'/'", "'-'", 
                                                            "'+'", "'or'", 
                                                            "'and'", "'~'", 
                                                            "'funct'", "';'", 
                                                            "'='", "','", 
                                                            "'('", "')'", 
                                                            "'{'", "'}'", 
                                                            "'triple_equal'", 
                                                            "'four_dots_around_cross'", 
                                                            "'four_dots_around_add'", 
                                                            "'left_triangle'", 
                                                            "'undertie'", 
                                                            "'two_asterisk'", 
                                                            "'left_arrow'", 
                                                            "'phi'", "'circle'", 
                                                            null, "'inverted_qmark'", 
                                                            "'sigma'", "'music'", 
                                                            "'triple_slash'", 
                                                            "'omega'", "'square'", 
                                                            "'two_tie'", 
                                                            "'two_vertical_plus'", 
                                                            "'right_arrow'", 
                                                            "'theta'", "'sleeping_eight'", 
                                                            "'pentagon'", 
                                                            "'write'" ];
	public static readonly symbolicNames: (string | null)[] = [ null, "LESS", 
                                                             "GREATER", 
                                                             "MULS", "DIVIDES", 
                                                             "MINUS", "PLUS", 
                                                             "OR", "AND", 
                                                             "NOT", "DEF", 
                                                             "SC", "EQ", 
                                                             "COMMA", "LPAREN", 
                                                             "RPAREN", "LCURLY", 
                                                             "RCURLY", "CONST", 
                                                             "FALSE", "TRUE", 
                                                             "READ", "BREAK", 
                                                             "STRING", "ELSE", 
                                                             "FOR", "INT", 
                                                             "INTEGER", 
                                                             "RETURN", "WHILE", 
                                                             "FUNCTION", 
                                                             "COMMENT", 
                                                             "BOOL", "CHAR", 
                                                             "CONTINUE", 
                                                             "FLOAT", "IF", 
                                                             "NONE", "VOID", 
                                                             "PROGRAM", 
                                                             "WRITE", "ID", 
                                                             "WS" ];
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"program", "stat", "varDecl", "funcDecl", "paramList", "readStat", "writeStat", 
		"ifStat", "whileStat", "idops", "for", "type", "relop", "expr", "func",
	];
	public get grammarFileName(): string { return "Expr.g4"; }
	public get literalNames(): (string | null)[] { return ExprParser.literalNames; }
	public get symbolicNames(): (string | null)[] { return ExprParser.symbolicNames; }
	public get ruleNames(): string[] { return ExprParser.ruleNames; }
	public get serializedATN(): number[] { return ExprParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(this, ExprParser._ATN, ExprParser.DecisionsToDFA, new PredictionContextCache());
	}
	// @RuleVersion(0)
	public program(): ProgramContext {
		let localctx: ProgramContext = new ProgramContext(this, this._ctx, this.state);
		this.enterRule(localctx, 0, ExprParser.RULE_program);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 30;
			this.stat();
			this.state = 31;
			this.match(ExprParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public stat(): StatContext {
		let localctx: StatContext = new StatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 2, ExprParser.RULE_stat);
		try {
			this.state = 54;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 33;
				this.varDecl();
				this.state = 34;
				this.match(ExprParser.SC);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 36;
				this.expr(0);
				this.state = 37;
				this.match(ExprParser.SC);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 39;
				this.funcDecl();
				this.state = 40;
				this.match(ExprParser.SC);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 42;
				this.ifStat();
				this.state = 43;
				this.match(ExprParser.SC);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 45;
				this.whileStat();
				this.state = 46;
				this.match(ExprParser.SC);
				}
				break;
			case 6:
				this.enterOuterAlt(localctx, 6);
				{
				this.state = 48;
				this.readStat();
				this.state = 49;
				this.match(ExprParser.SC);
				}
				break;
			case 7:
				this.enterOuterAlt(localctx, 7);
				{
				this.state = 51;
				this.writeStat();
				this.state = 52;
				this.match(ExprParser.SC);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public varDecl(): VarDeclContext {
		let localctx: VarDeclContext = new VarDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 4, ExprParser.RULE_varDecl);
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 56;
			this.type_();
			this.state = 57;
			this.match(ExprParser.ID);
			this.state = 58;
			this.match(ExprParser.EQ);
			this.state = 59;
			this.expr(0);
			this.state = 60;
			this.match(ExprParser.SC);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public funcDecl(): FuncDeclContext {
		let localctx: FuncDeclContext = new FuncDeclContext(this, this._ctx, this.state);
		this.enterRule(localctx, 6, ExprParser.RULE_funcDecl);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
				{
				{
				this.state = 68;
				this.stat();
				}
				}
				this.state = 73;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 74;
			this.match(ExprParser.RCURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public paramList(): ParamListContext {
		let localctx: ParamListContext = new ParamListContext(this, this._ctx, this.state);
		this.enterRule(localctx, 8, ExprParser.RULE_paramList);
		let _la: number;
		try {
			this.state = 88;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 26:
			case 32:
			case 35:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 76;
				this.type_();
				this.state = 77;
				this.match(ExprParser.ID);
				this.state = 84;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===13) {
					{
					{
					this.state = 78;
					this.match(ExprParser.COMMA);
					this.state = 79;
					this.type_();
					this.state = 80;
					this.match(ExprParser.ID);
					}
					}
					this.state = 86;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 15:
				this.enterOuterAlt(localctx, 2);
				// tslint:disable-next-line:no-empty
				{
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public readStat(): ReadStatContext {
		let localctx: ReadStatContext = new ReadStatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 10, ExprParser.RULE_readStat);
		try {
			this.enterOuterAlt(localctx, 1);
			{
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
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public writeStat(): WriteStatContext {
		let localctx: WriteStatContext = new WriteStatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 12, ExprParser.RULE_writeStat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 96;
			this.match(ExprParser.WRITE);
			this.state = 97;
			this.match(ExprParser.LPAREN);
			this.state = 105;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 15:
			case 23:
				{
				this.state = 101;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la===23) {
					{
					{
					this.state = 98;
					this.match(ExprParser.STRING);
					}
					}
					this.state = 103;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			case 26:
			case 32:
			case 35:
				{
				this.state = 104;
				this.type_();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 107;
			this.match(ExprParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public ifStat(): IfStatContext {
		let localctx: IfStatContext = new IfStatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 14, ExprParser.RULE_ifStat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
				{
				{
				this.state = 114;
				this.stat();
				}
				}
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
				{
				{
				this.state = 122;
				this.stat();
				}
				}
				this.state = 127;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public whileStat(): WhileStatContext {
		let localctx: WhileStatContext = new WhileStatContext(this, this._ctx, this.state);
		this.enterRule(localctx, 16, ExprParser.RULE_whileStat);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
				{
				{
				this.state = 133;
				this.stat();
				}
				}
				this.state = 138;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 139;
			this.match(ExprParser.RCURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public idops(): IdopsContext {
		let localctx: IdopsContext = new IdopsContext(this, this._ctx, this.state);
		this.enterRule(localctx, 18, ExprParser.RULE_idops);
		try {
			this.state = 155;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 9, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 141;
				this.match(ExprParser.ID);
				this.state = 142;
				this.match(ExprParser.PLUS);
				this.state = 143;
				this.match(ExprParser.PLUS);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 144;
				this.match(ExprParser.ID);
				this.state = 145;
				this.match(ExprParser.MINUS);
				this.state = 146;
				this.match(ExprParser.MINUS);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 147;
				this.match(ExprParser.ID);
				this.state = 148;
				this.match(ExprParser.PLUS);
				this.state = 149;
				this.match(ExprParser.EQ);
				this.state = 150;
				this.match(ExprParser.ID);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 151;
				this.match(ExprParser.ID);
				this.state = 152;
				this.match(ExprParser.MINUS);
				this.state = 153;
				this.match(ExprParser.EQ);
				this.state = 154;
				this.match(ExprParser.ID);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public for_(): ForContext {
		let localctx: ForContext = new ForContext(this, this._ctx, this.state);
		this.enterRule(localctx, 20, ExprParser.RULE_for);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
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
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 738199040) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & 793) !== 0)) {
				{
				{
				this.state = 166;
				this.stat();
				}
				}
				this.state = 171;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 172;
			this.match(ExprParser.RCURLY);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public type_(): TypeContext {
		let localctx: TypeContext = new TypeContext(this, this._ctx, this.state);
		this.enterRule(localctx, 22, ExprParser.RULE_type);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 174;
			_la = this._input.LA(1);
			if(!(((((_la - 26)) & ~0x1F) === 0 && ((1 << (_la - 26)) & 577) !== 0))) {
			this._errHandler.recoverInline(this);
			}
			else {
				this._errHandler.reportMatch(this);
			    this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}
	// @RuleVersion(0)
	public relop(): RelopContext {
		let localctx: RelopContext = new RelopContext(this, this._ctx, this.state);
		this.enterRule(localctx, 24, ExprParser.RULE_relop);
		try {
			this.state = 184;
			this._errHandler.sync(this);
			switch ( this._interp.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				this.enterOuterAlt(localctx, 1);
				{
				this.state = 176;
				this.match(ExprParser.LESS);
				}
				break;
			case 2:
				this.enterOuterAlt(localctx, 2);
				{
				this.state = 177;
				this.match(ExprParser.GREATER);
				}
				break;
			case 3:
				this.enterOuterAlt(localctx, 3);
				{
				this.state = 178;
				this.match(ExprParser.EQ);
				this.state = 179;
				this.match(ExprParser.EQ);
				}
				break;
			case 4:
				this.enterOuterAlt(localctx, 4);
				{
				this.state = 180;
				this.match(ExprParser.LESS);
				this.state = 181;
				this.match(ExprParser.EQ);
				}
				break;
			case 5:
				this.enterOuterAlt(localctx, 5);
				{
				this.state = 182;
				this.match(ExprParser.GREATER);
				this.state = 183;
				this.match(ExprParser.EQ);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public expr(): ExprContext;
	public expr(_p: number): ExprContext;
	// @RuleVersion(0)
	public expr(_p?: number): ExprContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let localctx: ExprContext = new ExprContext(this, this._ctx, _parentState);
		let _prevctx: ExprContext = localctx;
		let _startState: number = 26;
		this.enterRecursionRule(localctx, 26, ExprParser.RULE_expr, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 191;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case 41:
				{
				this.state = 187;
				this.match(ExprParser.ID);
				}
				break;
			case 27:
				{
				this.state = 188;
				this.match(ExprParser.INTEGER);
				}
				break;
			case 9:
				{
				this.state = 189;
				this.match(ExprParser.NOT);
				this.state = 190;
				this.expr(8);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx.stop = this._input.LT(-1);
			this.state = 217;
			this._errHandler.sync(this);
			_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = localctx;
					{
					this.state = 215;
					this._errHandler.sync(this);
					switch ( this._interp.adaptivePredict(this._input, 13, this._ctx) ) {
					case 1:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 193;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 194;
						this.match(ExprParser.AND);
						this.state = 195;
						this.expr(8);
						}
						break;
					case 2:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 196;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 197;
						this.match(ExprParser.OR);
						this.state = 198;
						this.expr(7);
						}
						break;
					case 3:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 199;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 200;
						this.match(ExprParser.PLUS);
						this.state = 201;
						this.expr(6);
						}
						break;
					case 4:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 202;
						if (!(this.precpred(this._ctx, 4))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 4)");
						}
						this.state = 203;
						this.match(ExprParser.MINUS);
						this.state = 204;
						this.expr(5);
						}
						break;
					case 5:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 205;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 206;
						this.match(ExprParser.DIVIDES);
						this.state = 207;
						this.expr(4);
						}
						break;
					case 6:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 208;
						if (!(this.precpred(this._ctx, 2))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 2)");
						}
						this.state = 209;
						this.match(ExprParser.MULS);
						this.state = 210;
						this.expr(3);
						}
						break;
					case 7:
						{
						localctx = new ExprContext(this, _parentctx, _parentState);
						this.pushNewRecursionContext(localctx, _startState, ExprParser.RULE_expr);
						this.state = 211;
						if (!(this.precpred(this._ctx, 1))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 1)");
						}
						this.state = 212;
						this.relop();
						this.state = 213;
						this.expr(2);
						}
						break;
					}
					}
				}
				this.state = 219;
				this._errHandler.sync(this);
				_alt = this._interp.adaptivePredict(this._input, 14, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return localctx;
	}
	// @RuleVersion(0)
	public func(): FuncContext {
		let localctx: FuncContext = new FuncContext(this, this._ctx, this.state);
		this.enterRule(localctx, 28, ExprParser.RULE_func);
		let _la: number;
		try {
			this.enterOuterAlt(localctx, 1);
			{
			this.state = 220;
			this.match(ExprParser.ID);
			this.state = 221;
			this.match(ExprParser.LPAREN);
			this.state = 222;
			this.expr(0);
			this.state = 227;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la===13) {
				{
				{
				this.state = 223;
				this.match(ExprParser.COMMA);
				this.state = 224;
				this.expr(0);
				}
				}
				this.state = 229;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 230;
			this.match(ExprParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return localctx;
	}

	public sempred(localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 13:
			return this.expr_sempred(localctx as ExprContext, predIndex);
		}
		return true;
	}
	private expr_sempred(localctx: ExprContext, predIndex: number): boolean {
		switch (predIndex) {
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
		}
		return true;
	}

	public static readonly _serializedATN: number[] = [4,1,42,233,2,0,7,0,2,
	1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,
	10,7,10,2,11,7,11,2,12,7,12,2,13,7,13,2,14,7,14,1,0,1,0,1,0,1,1,1,1,1,1,
	1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
	3,1,55,8,1,1,2,1,2,1,2,1,2,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,5,3,70,8,
	3,10,3,12,3,73,9,3,1,3,1,3,1,4,1,4,1,4,1,4,1,4,1,4,5,4,83,8,4,10,4,12,4,
	86,9,4,1,4,3,4,89,8,4,1,5,1,5,1,5,1,5,1,5,1,5,1,6,1,6,1,6,5,6,100,8,6,10,
	6,12,6,103,9,6,1,6,3,6,106,8,6,1,6,1,6,1,7,1,7,1,7,1,7,1,7,1,7,5,7,116,
	8,7,10,7,12,7,119,9,7,1,7,1,7,1,7,5,7,124,8,7,10,7,12,7,127,9,7,1,8,1,8,
	1,8,1,8,1,8,1,8,5,8,135,8,8,10,8,12,8,138,9,8,1,8,1,8,1,9,1,9,1,9,1,9,1,
	9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,3,9,156,8,9,1,10,1,10,1,10,1,10,1,
	10,1,10,1,10,1,10,1,10,1,10,5,10,168,8,10,10,10,12,10,171,9,10,1,10,1,10,
	1,11,1,11,1,12,1,12,1,12,1,12,1,12,1,12,1,12,1,12,3,12,185,8,12,1,13,1,
	13,1,13,1,13,1,13,3,13,192,8,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,
	1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,1,13,5,
	13,216,8,13,10,13,12,13,219,9,13,1,14,1,14,1,14,1,14,1,14,5,14,226,8,14,
	10,14,12,14,229,9,14,1,14,1,14,1,14,0,1,26,15,0,2,4,6,8,10,12,14,16,18,
	20,22,24,26,28,0,1,3,0,26,26,32,32,35,35,249,0,30,1,0,0,0,2,54,1,0,0,0,
	4,56,1,0,0,0,6,62,1,0,0,0,8,88,1,0,0,0,10,90,1,0,0,0,12,96,1,0,0,0,14,109,
	1,0,0,0,16,128,1,0,0,0,18,155,1,0,0,0,20,157,1,0,0,0,22,174,1,0,0,0,24,
	184,1,0,0,0,26,191,1,0,0,0,28,220,1,0,0,0,30,31,3,2,1,0,31,32,5,0,0,1,32,
	1,1,0,0,0,33,34,3,4,2,0,34,35,5,11,0,0,35,55,1,0,0,0,36,37,3,26,13,0,37,
	38,5,11,0,0,38,55,1,0,0,0,39,40,3,6,3,0,40,41,5,11,0,0,41,55,1,0,0,0,42,
	43,3,14,7,0,43,44,5,11,0,0,44,55,1,0,0,0,45,46,3,16,8,0,46,47,5,11,0,0,
	47,55,1,0,0,0,48,49,3,10,5,0,49,50,5,11,0,0,50,55,1,0,0,0,51,52,3,12,6,
	0,52,53,5,11,0,0,53,55,1,0,0,0,54,33,1,0,0,0,54,36,1,0,0,0,54,39,1,0,0,
	0,54,42,1,0,0,0,54,45,1,0,0,0,54,48,1,0,0,0,54,51,1,0,0,0,55,3,1,0,0,0,
	56,57,3,22,11,0,57,58,5,41,0,0,58,59,5,12,0,0,59,60,3,26,13,0,60,61,5,11,
	0,0,61,5,1,0,0,0,62,63,5,10,0,0,63,64,5,41,0,0,64,65,5,14,0,0,65,66,3,8,
	4,0,66,67,5,15,0,0,67,71,5,16,0,0,68,70,3,2,1,0,69,68,1,0,0,0,70,73,1,0,
	0,0,71,69,1,0,0,0,71,72,1,0,0,0,72,74,1,0,0,0,73,71,1,0,0,0,74,75,5,17,
	0,0,75,7,1,0,0,0,76,77,3,22,11,0,77,84,5,41,0,0,78,79,5,13,0,0,79,80,3,
	22,11,0,80,81,5,41,0,0,81,83,1,0,0,0,82,78,1,0,0,0,83,86,1,0,0,0,84,82,
	1,0,0,0,84,85,1,0,0,0,85,89,1,0,0,0,86,84,1,0,0,0,87,89,1,0,0,0,88,76,1,
	0,0,0,88,87,1,0,0,0,89,9,1,0,0,0,90,91,5,41,0,0,91,92,5,12,0,0,92,93,5,
	21,0,0,93,94,5,14,0,0,94,95,5,15,0,0,95,11,1,0,0,0,96,97,5,40,0,0,97,105,
	5,14,0,0,98,100,5,23,0,0,99,98,1,0,0,0,100,103,1,0,0,0,101,99,1,0,0,0,101,
	102,1,0,0,0,102,106,1,0,0,0,103,101,1,0,0,0,104,106,3,22,11,0,105,101,1,
	0,0,0,105,104,1,0,0,0,106,107,1,0,0,0,107,108,5,15,0,0,108,13,1,0,0,0,109,
	110,5,36,0,0,110,111,5,14,0,0,111,112,3,26,13,0,112,113,5,15,0,0,113,117,
	5,16,0,0,114,116,3,2,1,0,115,114,1,0,0,0,116,119,1,0,0,0,117,115,1,0,0,
	0,117,118,1,0,0,0,118,120,1,0,0,0,119,117,1,0,0,0,120,121,5,17,0,0,121,
	125,5,24,0,0,122,124,3,2,1,0,123,122,1,0,0,0,124,127,1,0,0,0,125,123,1,
	0,0,0,125,126,1,0,0,0,126,15,1,0,0,0,127,125,1,0,0,0,128,129,5,29,0,0,129,
	130,5,14,0,0,130,131,3,26,13,0,131,132,5,15,0,0,132,136,5,16,0,0,133,135,
	3,2,1,0,134,133,1,0,0,0,135,138,1,0,0,0,136,134,1,0,0,0,136,137,1,0,0,0,
	137,139,1,0,0,0,138,136,1,0,0,0,139,140,5,17,0,0,140,17,1,0,0,0,141,142,
	5,41,0,0,142,143,5,6,0,0,143,156,5,6,0,0,144,145,5,41,0,0,145,146,5,5,0,
	0,146,156,5,5,0,0,147,148,5,41,0,0,148,149,5,6,0,0,149,150,5,12,0,0,150,
	156,5,41,0,0,151,152,5,41,0,0,152,153,5,5,0,0,153,154,5,12,0,0,154,156,
	5,41,0,0,155,141,1,0,0,0,155,144,1,0,0,0,155,147,1,0,0,0,155,151,1,0,0,
	0,156,19,1,0,0,0,157,158,5,25,0,0,158,159,5,14,0,0,159,160,3,4,2,0,160,
	161,5,11,0,0,161,162,3,26,13,0,162,163,5,11,0,0,163,164,3,18,9,0,164,165,
	5,15,0,0,165,169,5,16,0,0,166,168,3,2,1,0,167,166,1,0,0,0,168,171,1,0,0,
	0,169,167,1,0,0,0,169,170,1,0,0,0,170,172,1,0,0,0,171,169,1,0,0,0,172,173,
	5,17,0,0,173,21,1,0,0,0,174,175,7,0,0,0,175,23,1,0,0,0,176,185,5,1,0,0,
	177,185,5,2,0,0,178,179,5,12,0,0,179,185,5,12,0,0,180,181,5,1,0,0,181,185,
	5,12,0,0,182,183,5,2,0,0,183,185,5,12,0,0,184,176,1,0,0,0,184,177,1,0,0,
	0,184,178,1,0,0,0,184,180,1,0,0,0,184,182,1,0,0,0,185,25,1,0,0,0,186,187,
	6,13,-1,0,187,192,5,41,0,0,188,192,5,27,0,0,189,190,5,9,0,0,190,192,3,26,
	13,8,191,186,1,0,0,0,191,188,1,0,0,0,191,189,1,0,0,0,192,217,1,0,0,0,193,
	194,10,7,0,0,194,195,5,8,0,0,195,216,3,26,13,8,196,197,10,6,0,0,197,198,
	5,7,0,0,198,216,3,26,13,7,199,200,10,5,0,0,200,201,5,6,0,0,201,216,3,26,
	13,6,202,203,10,4,0,0,203,204,5,5,0,0,204,216,3,26,13,5,205,206,10,3,0,
	0,206,207,5,4,0,0,207,216,3,26,13,4,208,209,10,2,0,0,209,210,5,3,0,0,210,
	216,3,26,13,3,211,212,10,1,0,0,212,213,3,24,12,0,213,214,3,26,13,2,214,
	216,1,0,0,0,215,193,1,0,0,0,215,196,1,0,0,0,215,199,1,0,0,0,215,202,1,0,
	0,0,215,205,1,0,0,0,215,208,1,0,0,0,215,211,1,0,0,0,216,219,1,0,0,0,217,
	215,1,0,0,0,217,218,1,0,0,0,218,27,1,0,0,0,219,217,1,0,0,0,220,221,5,41,
	0,0,221,222,5,14,0,0,222,227,3,26,13,0,223,224,5,13,0,0,224,226,3,26,13,
	0,225,223,1,0,0,0,226,229,1,0,0,0,227,225,1,0,0,0,227,228,1,0,0,0,228,230,
	1,0,0,0,229,227,1,0,0,0,230,231,5,15,0,0,231,29,1,0,0,0,16,54,71,84,88,
	101,105,117,125,136,155,169,184,191,215,217,227];

	private static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ExprParser.__ATN) {
			ExprParser.__ATN = new ATNDeserializer().deserialize(ExprParser._serializedATN);
		}

		return ExprParser.__ATN;
	}


	static DecisionsToDFA = ExprParser._ATN.decisionToState.map( (ds: DecisionState, index: number) => new DFA(ds, index) );

}

export class ProgramContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public stat(): StatContext {
		return this.getTypedRuleContext(StatContext, 0) as StatContext;
	}
	public EOF(): TerminalNode {
		return this.getToken(ExprParser.EOF, 0);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_program;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterProgram) {
	 		listener.enterProgram(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitProgram) {
	 		listener.exitProgram(this);
		}
	}
}


export class StatContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public varDecl(): VarDeclContext {
		return this.getTypedRuleContext(VarDeclContext, 0) as VarDeclContext;
	}
	public SC(): TerminalNode {
		return this.getToken(ExprParser.SC, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public funcDecl(): FuncDeclContext {
		return this.getTypedRuleContext(FuncDeclContext, 0) as FuncDeclContext;
	}
	public ifStat(): IfStatContext {
		return this.getTypedRuleContext(IfStatContext, 0) as IfStatContext;
	}
	public whileStat(): WhileStatContext {
		return this.getTypedRuleContext(WhileStatContext, 0) as WhileStatContext;
	}
	public readStat(): ReadStatContext {
		return this.getTypedRuleContext(ReadStatContext, 0) as ReadStatContext;
	}
	public writeStat(): WriteStatContext {
		return this.getTypedRuleContext(WriteStatContext, 0) as WriteStatContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_stat;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterStat) {
	 		listener.enterStat(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitStat) {
	 		listener.exitStat(this);
		}
	}
}


export class VarDeclContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public ID(): TerminalNode {
		return this.getToken(ExprParser.ID, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(ExprParser.EQ, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public SC(): TerminalNode {
		return this.getToken(ExprParser.SC, 0);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_varDecl;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterVarDecl) {
	 		listener.enterVarDecl(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitVarDecl) {
	 		listener.exitVarDecl(this);
		}
	}
}


export class FuncDeclContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public DEF(): TerminalNode {
		return this.getToken(ExprParser.DEF, 0);
	}
	public ID(): TerminalNode {
		return this.getToken(ExprParser.ID, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public paramList(): ParamListContext {
		return this.getTypedRuleContext(ParamListContext, 0) as ParamListContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public LCURLY(): TerminalNode {
		return this.getToken(ExprParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(ExprParser.RCURLY, 0);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_funcDecl;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterFuncDecl) {
	 		listener.enterFuncDecl(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitFuncDecl) {
	 		listener.exitFuncDecl(this);
		}
	}
}


export class ParamListContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public type__list(): TypeContext[] {
		return this.getTypedRuleContexts(TypeContext) as TypeContext[];
	}
	public type_(i: number): TypeContext {
		return this.getTypedRuleContext(TypeContext, i) as TypeContext;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(ExprParser.ID, i);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExprParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_paramList;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterParamList) {
	 		listener.enterParamList(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitParamList) {
	 		listener.exitParamList(this);
		}
	}
}


export class ReadStatContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(ExprParser.ID, 0);
	}
	public EQ(): TerminalNode {
		return this.getToken(ExprParser.EQ, 0);
	}
	public READ(): TerminalNode {
		return this.getToken(ExprParser.READ, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_readStat;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterReadStat) {
	 		listener.enterReadStat(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitReadStat) {
	 		listener.exitReadStat(this);
		}
	}
}


export class WriteStatContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WRITE(): TerminalNode {
		return this.getToken(ExprParser.WRITE, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public type_(): TypeContext {
		return this.getTypedRuleContext(TypeContext, 0) as TypeContext;
	}
	public STRING_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.STRING);
	}
	public STRING(i: number): TerminalNode {
		return this.getToken(ExprParser.STRING, i);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_writeStat;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterWriteStat) {
	 		listener.enterWriteStat(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitWriteStat) {
	 		listener.exitWriteStat(this);
		}
	}
}


export class IfStatContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public IF(): TerminalNode {
		return this.getToken(ExprParser.IF, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public LCURLY(): TerminalNode {
		return this.getToken(ExprParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(ExprParser.RCURLY, 0);
	}
	public ELSE(): TerminalNode {
		return this.getToken(ExprParser.ELSE, 0);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_ifStat;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterIfStat) {
	 		listener.enterIfStat(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitIfStat) {
	 		listener.exitIfStat(this);
		}
	}
}


export class WhileStatContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public WHILE(): TerminalNode {
		return this.getToken(ExprParser.WHILE, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public LCURLY(): TerminalNode {
		return this.getToken(ExprParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(ExprParser.RCURLY, 0);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_whileStat;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterWhileStat) {
	 		listener.enterWhileStat(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitWhileStat) {
	 		listener.exitWhileStat(this);
		}
	}
}


export class IdopsContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.ID);
	}
	public ID(i: number): TerminalNode {
		return this.getToken(ExprParser.ID, i);
	}
	public PLUS_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.PLUS);
	}
	public PLUS(i: number): TerminalNode {
		return this.getToken(ExprParser.PLUS, i);
	}
	public MINUS_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.MINUS);
	}
	public MINUS(i: number): TerminalNode {
		return this.getToken(ExprParser.MINUS, i);
	}
	public EQ(): TerminalNode {
		return this.getToken(ExprParser.EQ, 0);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_idops;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterIdops) {
	 		listener.enterIdops(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitIdops) {
	 		listener.exitIdops(this);
		}
	}
}


export class ForContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public FOR(): TerminalNode {
		return this.getToken(ExprParser.FOR, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public varDecl(): VarDeclContext {
		return this.getTypedRuleContext(VarDeclContext, 0) as VarDeclContext;
	}
	public SC_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.SC);
	}
	public SC(i: number): TerminalNode {
		return this.getToken(ExprParser.SC, i);
	}
	public expr(): ExprContext {
		return this.getTypedRuleContext(ExprContext, 0) as ExprContext;
	}
	public idops(): IdopsContext {
		return this.getTypedRuleContext(IdopsContext, 0) as IdopsContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public LCURLY(): TerminalNode {
		return this.getToken(ExprParser.LCURLY, 0);
	}
	public RCURLY(): TerminalNode {
		return this.getToken(ExprParser.RCURLY, 0);
	}
	public stat_list(): StatContext[] {
		return this.getTypedRuleContexts(StatContext) as StatContext[];
	}
	public stat(i: number): StatContext {
		return this.getTypedRuleContext(StatContext, i) as StatContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_for;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterFor) {
	 		listener.enterFor(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitFor) {
	 		listener.exitFor(this);
		}
	}
}


export class TypeContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public INT(): TerminalNode {
		return this.getToken(ExprParser.INT, 0);
	}
	public BOOL(): TerminalNode {
		return this.getToken(ExprParser.BOOL, 0);
	}
	public FLOAT(): TerminalNode {
		return this.getToken(ExprParser.FLOAT, 0);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_type;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterType) {
	 		listener.enterType(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitType) {
	 		listener.exitType(this);
		}
	}
}


export class RelopContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public LESS(): TerminalNode {
		return this.getToken(ExprParser.LESS, 0);
	}
	public GREATER(): TerminalNode {
		return this.getToken(ExprParser.GREATER, 0);
	}
	public EQ_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.EQ);
	}
	public EQ(i: number): TerminalNode {
		return this.getToken(ExprParser.EQ, i);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_relop;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterRelop) {
	 		listener.enterRelop(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitRelop) {
	 		listener.exitRelop(this);
		}
	}
}


export class ExprContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(ExprParser.ID, 0);
	}
	public INTEGER(): TerminalNode {
		return this.getToken(ExprParser.INTEGER, 0);
	}
	public NOT(): TerminalNode {
		return this.getToken(ExprParser.NOT, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public AND(): TerminalNode {
		return this.getToken(ExprParser.AND, 0);
	}
	public OR(): TerminalNode {
		return this.getToken(ExprParser.OR, 0);
	}
	public PLUS(): TerminalNode {
		return this.getToken(ExprParser.PLUS, 0);
	}
	public MINUS(): TerminalNode {
		return this.getToken(ExprParser.MINUS, 0);
	}
	public DIVIDES(): TerminalNode {
		return this.getToken(ExprParser.DIVIDES, 0);
	}
	public MULS(): TerminalNode {
		return this.getToken(ExprParser.MULS, 0);
	}
	public relop(): RelopContext {
		return this.getTypedRuleContext(RelopContext, 0) as RelopContext;
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_expr;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterExpr) {
	 		listener.enterExpr(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitExpr) {
	 		listener.exitExpr(this);
		}
	}
}


export class FuncContext extends ParserRuleContext {
	constructor(parser?: ExprParser, parent?: ParserRuleContext, invokingState?: number) {
		super(parent, invokingState);
    	this.parser = parser;
	}
	public ID(): TerminalNode {
		return this.getToken(ExprParser.ID, 0);
	}
	public LPAREN(): TerminalNode {
		return this.getToken(ExprParser.LPAREN, 0);
	}
	public expr_list(): ExprContext[] {
		return this.getTypedRuleContexts(ExprContext) as ExprContext[];
	}
	public expr(i: number): ExprContext {
		return this.getTypedRuleContext(ExprContext, i) as ExprContext;
	}
	public RPAREN(): TerminalNode {
		return this.getToken(ExprParser.RPAREN, 0);
	}
	public COMMA_list(): TerminalNode[] {
	    	return this.getTokens(ExprParser.COMMA);
	}
	public COMMA(i: number): TerminalNode {
		return this.getToken(ExprParser.COMMA, i);
	}
    public get ruleIndex(): number {
    	return ExprParser.RULE_func;
	}
	public enterRule(listener: ExprListener): void {
	    if(listener.enterFunc) {
	 		listener.enterFunc(this);
		}
	}
	public exitRule(listener: ExprListener): void {
	    if(listener.exitFunc) {
	 		listener.exitFunc(this);
		}
	}
}
