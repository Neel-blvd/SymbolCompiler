// Generated from Expr.g4 by ANTLR 4.13.2

import {ParseTreeListener} from "antlr4";


import { ProgramContext } from "./ExprParser.js";
import { StatContext } from "./ExprParser.js";
import { VarDeclContext } from "./ExprParser.js";
import { FuncDeclContext } from "./ExprParser.js";
import { ParamListContext } from "./ExprParser.js";
import { ReadStatContext } from "./ExprParser.js";
import { WriteStatContext } from "./ExprParser.js";
import { IfStatContext } from "./ExprParser.js";
import { WhileStatContext } from "./ExprParser.js";
import { IdopsContext } from "./ExprParser.js";
import { ForContext } from "./ExprParser.js";
import { TypeContext } from "./ExprParser.js";
import { RelopContext } from "./ExprParser.js";
import { ExprContext } from "./ExprParser.js";
import { FuncContext } from "./ExprParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `ExprParser`.
 */
export default class ExprListener extends ParseTreeListener {
	/**
	 * Enter a parse tree produced by `ExprParser.program`.
	 * @param ctx the parse tree
	 */
	enterProgram?: (ctx: ProgramContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.program`.
	 * @param ctx the parse tree
	 */
	exitProgram?: (ctx: ProgramContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.stat`.
	 * @param ctx the parse tree
	 */
	enterStat?: (ctx: StatContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.stat`.
	 * @param ctx the parse tree
	 */
	exitStat?: (ctx: StatContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.varDecl`.
	 * @param ctx the parse tree
	 */
	enterVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.varDecl`.
	 * @param ctx the parse tree
	 */
	exitVarDecl?: (ctx: VarDeclContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	enterFuncDecl?: (ctx: FuncDeclContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.funcDecl`.
	 * @param ctx the parse tree
	 */
	exitFuncDecl?: (ctx: FuncDeclContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.paramList`.
	 * @param ctx the parse tree
	 */
	enterParamList?: (ctx: ParamListContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.paramList`.
	 * @param ctx the parse tree
	 */
	exitParamList?: (ctx: ParamListContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.readStat`.
	 * @param ctx the parse tree
	 */
	enterReadStat?: (ctx: ReadStatContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.readStat`.
	 * @param ctx the parse tree
	 */
	exitReadStat?: (ctx: ReadStatContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.writeStat`.
	 * @param ctx the parse tree
	 */
	enterWriteStat?: (ctx: WriteStatContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.writeStat`.
	 * @param ctx the parse tree
	 */
	exitWriteStat?: (ctx: WriteStatContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.ifStat`.
	 * @param ctx the parse tree
	 */
	enterIfStat?: (ctx: IfStatContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.ifStat`.
	 * @param ctx the parse tree
	 */
	exitIfStat?: (ctx: IfStatContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.whileStat`.
	 * @param ctx the parse tree
	 */
	enterWhileStat?: (ctx: WhileStatContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.whileStat`.
	 * @param ctx the parse tree
	 */
	exitWhileStat?: (ctx: WhileStatContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.idops`.
	 * @param ctx the parse tree
	 */
	enterIdops?: (ctx: IdopsContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.idops`.
	 * @param ctx the parse tree
	 */
	exitIdops?: (ctx: IdopsContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.for`.
	 * @param ctx the parse tree
	 */
	enterFor?: (ctx: ForContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.for`.
	 * @param ctx the parse tree
	 */
	exitFor?: (ctx: ForContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.type`.
	 * @param ctx the parse tree
	 */
	enterType?: (ctx: TypeContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.type`.
	 * @param ctx the parse tree
	 */
	exitType?: (ctx: TypeContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.relop`.
	 * @param ctx the parse tree
	 */
	enterRelop?: (ctx: RelopContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.relop`.
	 * @param ctx the parse tree
	 */
	exitRelop?: (ctx: RelopContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.expr`.
	 * @param ctx the parse tree
	 */
	enterExpr?: (ctx: ExprContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.expr`.
	 * @param ctx the parse tree
	 */
	exitExpr?: (ctx: ExprContext) => void;
	/**
	 * Enter a parse tree produced by `ExprParser.func`.
	 * @param ctx the parse tree
	 */
	enterFunc?: (ctx: FuncContext) => void;
	/**
	 * Exit a parse tree produced by `ExprParser.func`.
	 * @param ctx the parse tree
	 */
	exitFunc?: (ctx: FuncContext) => void;
}

