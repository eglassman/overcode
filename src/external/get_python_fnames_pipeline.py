import ast
import sys
import unparse
import re

class SketchTranslator(ast.NodeVisitor):
    """ Translate a python source file into a sketch file """
    fuzzEnabled = True
    fuzzFunctionInfo = 0
    loopUnrollExit = False

    def __init__(self):
        self.resultList = []
        self.NumVariables = 0 # total number of variables in the program
        self.NumFunctions = 0  # number of functions defined in the program
        self.NumLoops = 0 # total number of loops in the program
        self.NumForLoops = 0
        self.NumWhileLoops = 0
        self.NumAssignments = 0
        self.NumConditionals = 0
        self.NumIfStatements = 0
        self.NumElseStatements = 0
        self.NumListComprehensions = 0
        self.NumIndexes = 0
        self.NumSlices = 0
        self.NumBinOps = 0
        self.NumBaseNames = 0
        self.NumBaseLists = 0
        self.NumBaseTuples = 0
        self.NumBaseNums = 0
        self.NumBaseStrs = 0
        self.NumOperators = 0
        self.NumAddOperators = 0
        self.NumSubOperators = 0
        self.NumMulOperators = 0
        self.NumDivOperators = 0
        self.NumModOperators = 0
        self.NumPowOperators = 0
        self.NumLeftShiftOperators = 0
        self.NumRightShiftOperators = 0
        self.NumBitOrOperators = 0
        self.NumBitAndOperators = 0
        self.NumFloorDivOperators = 0
        self.NumNotOperators = 0
        self.NumUnaryOperators = 0
        self.NumUnarySubOperators = 0
        self.NumUnaryAddOperators = 0
        self.NumCompOperators = 0
        self.NumEqualCompOperators = 0
        self.NumNotEqualCompOperators = 0
        self.NumLessThanCompOperators = 0
        self.NumLessThanEqualCompOperators = 0
        self.NumGreaterThanCompOperators = 0
        self.NumGreaterThanEqualCompOperators = 0
        self.NumInCompOperators = 0
        self.NumNotInCompOperators = 0
        self.NumIsCompOperators = 0
        self.NumIsNotCompOperators = 0
        self.NumAndCompOperators = 0
        self.NumOrCompOperators = 0
        self.NumFunctionCalls = 0
        self.NumAppendCalls = 0
        self.NumEnumerateCalls = 0
        self.NumRangeCalls = 0
        self.NumRangeLenCalls = 0
        self.NumReturnCalls = 0
        self.NumIfBeforeLoop = 0
        self.NumLoopBeforeIf = 0


        self.varsStack = [] # variables on stack for scope purposes
        self.varsStack.append([]) # for the global scope
        self.funcInputArgsStack = [] 
        self.funcInputArgsStack.append([]) 

    def printFeatureVector(self):
        print vars()


    def insertVar(self, varName, varType):
        self.varsStack[len(self.varsStack)-1].append((varName, varType))

    def insertFuncInputVar(self, varName, varType):
        self.funcInputArgsStack[len(self.funcInputArgsStack)-1].append((varName, varType))

    def removeFuncInputVar(self, varName):
        self.funcInputArgsStack[len(self.funcInputArgsStack)-1].remove((varName, self.getType(varName)))

    def isVarDefined(self, varName):
        if varName in self.globalTypeNames:
            return True
        for (vname,vtype) in self.varsStack[len(self.varsStack)-1]:
            if vname == varName:
                return True
        for (vname,vtype) in self.funcInputArgsStack[len(self.funcInputArgsStack)-1]:
            if vname == varName:
                return True
        return False

    def getType(self, varName):
        return "MultiType"

    def visit_Module(self, module):
        s = ""
        for stmt in module.body:
            if isinstance(stmt, ast.FunctionDef):
                self.visit(stmt)
        self.src = s
        return s

    def startNewFunctionContext(self):
        self.varsStack.append([])

    def endCurrentFunctionContext(self):
        self.varsStack.pop()
        
    def visit_FunctionDef(self, functiondef):
        self.NumFunctions += 1
        self.funcInputArgsStack.append([])
        self.varsStack.append([])

        for stmt in functiondef.body:
            self.visit(stmt)

        self.NumVariables += len(self.varsStack[len(self.varsStack)-1])
        self.varsStack.pop()
        self.funcInputArgsStack.pop()

    # statements

    def visit_For(self, forstmt):
        self.resultList.append("for")
        self.NumLoops += 1
        self.NumForLoops += 1
        if self.NumIfStatements > 0:
            self.NumIfBeforeLoop += 1
        for bodystmt in forstmt.body:
            self.visit(bodystmt)
        if isinstance(forstmt.iter, ast.Call) and forstmt.iter.func.id == "enumerate":
            self.visit(forstmt.iter.args[0])
        else:
            self.visit(forstmt.iter)

    def visit_While(self, whilestmt):
        self.resultList.append("while")
        self.NumLoops += 1
        if self.NumIfStatements > 0:
            self.NumIfBeforeLoop += 1
        self.NumWhileLoops += 1
        self.visit(whilestmt.test)

        for stmt in whilestmt.body:
            self.visit(stmt)

    def visit_Expr(self, exprstmt):
        self.visit(exprstmt.value)

    def visit_Return(self, ret):
        self.NumReturnCalls += 1
        if ret.value:
            self.visit(ret.value)

    def visit_Delete(self, deletestmt):
        for target in deletestmt.targets:
            if isinstance(target, ast.Subscript):
                self.visit(target.value)
                if isinstance(target.slice, ast.Index):
                    self.visit(target.slice)
                #else:
                #    raise "Deleting over sliced arrays not supported yet"
        


    def visit_Assign(self, assign):
        self.NumAssignments += 1
        for target in assign.targets:
            self.visit(target)
            self.visit(assign.value)


    def visit_AugAssign(self, augassign):
        self.NumAssignments += 1
        self.visit(augassign.target)
        self.visit(augassign.value)
        self.visit(augassign.op)

    def visit_If(self, ifstmt):
        self.resultList.append("if")
        self.NumIfStatements += 1
        if self.NumLoops > 0:
            self.NumLoopBeforeIf += 1
        self.visit(ifstmt.test)
        for stmt in ifstmt.body:
            self.visit(stmt)
        if ifstmt.orelse:
            self.NumElseStatements += 1
            for stmt in ifstmt.orelse:
                self.visit(stmt)


    def visit_ListComp(self, listcomp):
        self.NumListComprehensions += 1
        for genidx,gen in enumerate(listcomp.generators):
            self.visit(gen.iter)
            self.visit(gen.target)

        self.visit(listcomp.elt)
        if len(gen.ifs) > 0:
            self.visit(gen.ifs[0])

    def visit_Compare(self, compare):
        self.visit(compare.left)
        self.visit(compare.comparators[0])
        self.visit(compare.ops[0])

        if(len(compare.ops)>1):
            for i in range(1,len(compare.ops)):
                self.visit(compare.comparators[i-1])
                self.visit(compare.comparators[i])
                self.visit(compare.ops[i])

    def visit_Call(self, call):
        self.NumFunctionCalls += 1
        if isinstance(call.func, ast.Name):
            self.resultList.append(call.func.id)
            if call.func.id == "range":
                if isinstance(call.args[0], ast.Call) and isinstance(call.args[0].func, ast.Name) and call.args[0].func.id == "len":
                    self.NumRangeLenCalls += 1
                else:
                    self.NumRangeCalls += 1
            if call.func.id == "enumerate":
                self.NumEnumerateCalls += 1
            if call.func.id == "append":
                self.NumAppendCalls += 1
        if isinstance(call.func, ast.Attribute):
            self.resultList.append(call.func.attr)

        for arg in call.args:
            self.visit(arg)
            
    def visit_Subscript(self, subscript):
        if isinstance(subscript.slice,ast.Index):
            self.NumIndexes += 1
            
        if isinstance(subscript.slice,ast.Slice):
            self.NumSlices += 1

    def visit_BoolOp(self, boolop):
        if(len(boolop.values) > 1):
            for i in range(0,len(boolop.values)-1):
                self.visit(boolop.values[i])
                self.visit(boolop.op)
            self.visit(boolop.values[len(boolop.values)-1])


    def visit_BinOp(self, binop):
        self.NumBinOps += 1
        self.visit(binop.left)
        self.visit(binop.right)
        self.visit(binop.op)

    def visit_UnaryOp(self, unop):
        self.NumUnaryOperators += 1
        self.visit(unop.operand)
        self.visit(unop.op)

    def visit_Index(self, ind):
        self.visit(ind.value)

    def visit_Name(self, name):
        self.NumBaseNames += 1

    def visit_List(self, lst):
        self.NumBaseLists += 1

    def visit_Tuple(self, lst):
        self.NumBaseTuples += 1

    def visit_Num(self, num):
        self.NumBaseNums += 1

    def visit_Str(self, str):
        self.NumBaseStrs += 1

    # operators

    def visit_Add(self, add):
        self.resultList.append("add")
        self.NumOperators += 1
        self.NumAddOperators += 1

    def visit_Sub(self, sub):
        self.resultList.append("sub")
        self.NumOperators += 1
        self.NumSubOperators += 1

    def visit_Mult(self, sub):
        self.resultList.append("mult")
        self.NumOperators += 1
        self.NumMulOperators += 1

    def visit_Div(self, sub):
        self.resultList.append("div")
        self.NumOperators += 1
        self.NumDivOperators += 1

    def visit_Mod(self, sub):
        self.resultList.append("mod")
        self.NumOperators += 1
        self.NumModOperators += 1

    def visit_Pow(self, sub):
        self.resultList.append("pow")
        self.NumOperators += 1
        self.NumPowOperators += 1

    def visit_LShift(self, sub):
        self.resultList.append("lshift")
        self.NumOperators += 1
        self.NumLeftShiftOperators += 1

    def visit_RShift(self, sub):
        self.resultList.append("rshift")
        self.NumOperators += 1
        self.NumRightShiftOperators += 1

    def visit_BitOr(self, sub):
        self.resultList.append("bitor")
        self.NumOperators += 1
        self.NumBitOrOperators += 1

    def visit_BitAnd(self, sub):
        self.resultList.append("bitand")
        self.NumOperators += 1
        self.NumBitAndOperators += 1

    def visit_FloorDiv(self, sub):
        self.resultList.append("floordiv")
        self.NumOperators += 1
        self.NumFloorDivOperators += 1

    def visit_Not(self, sub):
        self.resultList.append("not")
        self.NumOperators += 1
        self.NumNotOperators += 1

    def visit_USub(self, sub):
        self.resultList.append("usub")
        self.NumOperators += 1
        self.NumUnarySubOperators += 1

    def visit_UAdd(self, add):
        self.resultList.append("uadd")
        self.NumOperators += 1
        self.NumUnaryAddOperators += 1
    
    def visit_Eq(self, sub):
        self.resultList.append("eq")
        self.NumCompOperators += 1
        self.NumEqualCompOperators += 1

    def visit_NotEq(self, sub):
        self.resultList.append("noteq")
        self.NumCompOperators += 1
        self.NumNotEqualCompOperators += 1

    def visit_Lt(self, sub):
        self.resultList.append("lt")
        self.NumCompOperators += 1
        self.NumLessThanCompOperators += 1

    def visit_LtE(self, sub):
        self.resultList.append("lte")
        self.NumCompOperators += 1
        self.NumLessThanEqualCompOperators += 1

    def visit_Gt(self, sub):
        self.resultList.append("gt")
        self.NumCompOperators += 1
        self.NumGreaterThanCompOperators += 1

    def visit_GtE(self, sub):
        self.resultList.append("gte")
        self.NumCompOperators += 1
        self.NumGreaterThanEqualCompOperators += 1

    def visit_In(self, sub):
        self.resultList.append("in")
        self.NumCompOperators += 1
        self.NumInCompOperators += 1

    def visit_NotIn(self, sub):
        self.resultList.append("notin")
        self.NumCompOperators += 1
        self.NumNotInCompOperators += 1

    def visit_Is(self, isop):
        self.resultList.append("is")
        self.NumCompOperators += 1
        self.NumIsCompOperators += 1

    def visit_IsNot(self, isnot):
        self.resultList.append("isnot")
        self.NumCompOperators += 1
        self.NumIsNotCompOperators += 1

    def visit_And(self, band):
        self.resultList.append("and")
        self.NumCompOperators += 1
        self.NumAndCompOperators += 1

    def visit_Or(self, bor):
        self.resultList.append("bor")
        self.NumCompOperators += 1
        self.NumOrCompOperators += 1

    #unimplemented features
    def visit_ClassDef(self, classdef):
        pass
    def visit_With(self, withsrc):
        pass
    def visit_Raise(self, raisesrc):
        pass
    def visit_TryExcept(self, tryexcept):
        pass
    def visit_TryFinally(self, tryfinally):
        pass
    def visit_Import(self, importsrc):
        pass
    def visit_Print(self, printstmt):
        pass
    def visit_Assert(self, assertstmt):
        pass
    def visit_ImportFrom(self, iformstmt):
        pass
    def visit_Exec(self, execstmt):
        pass
    def visit_Global(self, globalstmt):
        pass
    def visit_Pass(self, passsrc):
        pass
    def visit_Break(self, breaksrc):
        pass
    def visit_Continue(self, continuesrc):
        pass
    def visit_Lambda(self, lambdasrc):
        pass
    def visit_IfExp(self, ifexp):
        pass
    def visit_Dict(self, dictexp):
        pass
    def visit_Set(self, selfexp):
        pass
    def visit_SetComp(self, dictexp):
        pass
    def visit_DictComp(self, dictexp):
        pass
    def visit_GeneratorExp(self, dictexp):
        pass
    def visit_Yield(self, dictexp):
        pass
    def visit_Repr(self, dictexp):
        pass
    def visit_Attribute(self, dictexp):
        pass

    def printFV(self):
        print self.NumLoops, ",", self.NumConditionals, ",", self.NumListComprehensions, ",", self.NumCompOperators, ",", self.NumOperators, ",", self.NumReturnCalls, ",", self.NumIfStatements, ",", self.NumElseStatements, ",", self.NumIfBeforeLoop, ",", self.NumLoopBeforeIf 

    def printFV1(self):
        print self.NumLoops, ",", self.NumConditionals, ",", self.NumListComprehensions, ",", self.NumReturnCalls, ",", self.NumIfStatements, ",", self.NumElseStatements, ",", self.NumIfBeforeLoop, ",", self.NumLoopBeforeIf 



def get_ast_from_file(filename):
    with file(filename, 'U') as f:
        source = f.read()
    return ast.parse(source)

def printFeatureVector(allvars):
    idx = 0
    listvalues = []
    for v in allvars.keys():
        if v.startswith("Num"):
            listvalues.append(str(allvars[v]))
            # print "%d: %d" % (idx,allvars[v]),
            # idx += 1
            # print "%d: %s" %(idx,v)
    print ",".join(listvalues)
    print "\n"    

def main(argv):
    target = argv #[0]
    target_ast = get_ast_from_file(target)

    translator = SketchTranslator()
    translator.visit(target_ast)
    return translator.resultList
    #printFeatureVector(vars(translator))
    #translator.printFV()
    #translator.printFV1()

if (__name__=='__main__'):
    main(sys.argv[1:])


