import ast
import sys
import unparse

class RewriteAST(ast.NodeTransformer):
    def __init__(self, isAugAssign):
        if isAugAssign == 0:
            self.augAssignRewrite = False
        else:
            self.augAssignRewrite = True

    def isStrorNum(self, node):
        return isinstance(node, ast.Name) or isinstance(node, ast.Num)

    def isCommutativeOp(self, op):
        return isinstance(op, ast.Mult) or isinstance(op, ast.Add)

    def getStrValue(self, node):
        if isinstance(node,ast.Name):
            return node.id
        if isinstance(node,ast.Num):
            return str(node.n)
        assert false

    def getASTNode(self, val):
        if val.isdigit():
            return ast.Num(n=int(val))
        else:
            return ast.Name(id=val,ctx=ast.Load())
        
    def visit_BinOp(self, binop):
        if self.isCommutativeOp(binop.op) and self.isStrorNum(binop.left) and self.isStrorNum(binop.right):
            lhs = self.getStrValue(binop.left)
            rhs = self.getStrValue(binop.right)
            lhsp = self.getASTNode(min(lhs,rhs))
            rhsp = self.getASTNode(max(lhs,rhs))
            return ast.BinOp(left=lhsp,op=binop.op,right=rhsp)
        else:
            return binop
            
    def visit_AugAssign(self, augassign):
        if self.augAssignRewrite:
            return ast.Assign(targets=[augassign.target],value=self.visit(ast.BinOp(left=augassign.target,right=augassign.value,op=augassign.op)))
        else:
            return augassign

def get_ast_from_file(filename):
    with file(filename, 'r') as f:
        source = f.read()
    return ast.parse(source)

def reorderVariables(src,toggleAugmented):
    try:
        #filename = argv[0]
        isAugAssign = toggleAugmented #int(argv[1])
        #print isAugAssign
        fileAST = ast.parse(src) #get_ast_from_file(filename)
        #print fileAST
        newFileAST = RewriteAST(isAugAssign).visit(fileAST)
        #print newFileAST

        with open('temp.txt','w') as myf:
            unparse.Unparser(newFileAST,myf)
        with open('temp.txt','r') as myf:
            return myf.read()
        #print ""
    except:
        print "Usage python rewrite.py <fileName> <0 (no aug assign rewriting) or 1>"

