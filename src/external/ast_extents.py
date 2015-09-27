# Created by Philip Guo on 2013-12-07

# Adapted from code in the Py2crazy project:
#   https://github.com/pgbovine/Py2crazy/blob/master/Python-2.7.5/Lib/ast_extents.py
# originally created by Philip Guo on 2013-07-10

# Operates on the built-in AST from 'import ast', using the lineno and
# col_offset fields in AST nodes. tested on Python 2.7

# FAIL FAST with NotImplementedError so that failures aren't masked


# broken tests:
#
# - decorators
# - list/dict/set comprehensions
# - generator comprehensions
# - context managers
# - advanced exceptions
#
# weird extra trailing spaces are bad too, e.g.,:
# print x  ,


# TODO: implement a paren_adjustment function that adjusts for parens
# that are commonly used around, say, BinOp, BoolOp, or CompareOp
#
# not (x or y)
# (x + 5) * (y + z)
# (one * (two + 3))
# x = (tokens[5] == 'male')


import ast
import cStringIO
import json
import sys

__all__ = ['CodeAst']

# Limitations
# - doesn't support extents that span MULTIPLE LINES
# - BinOps involving ** and field attribute accesses interact funny
#   e.g., "self.val = self.val ** 2"
#
# see tests/known-broken-tests/ for other weirdness

'''
TODO: manually 'parse' the source code using heuristics to account for
trailing spaces, and other detailed patches
    e.g., '(x, y)' tuple vs 'x, y' naked tuple
'''

DIGITS_SET = {'0', '1', '2', '3', '4', '5', '6', '7', '8', '9'}

# NOPs
NOP_CLASSES = [ast.expr_context, ast.cmpop, ast.boolop,
               ast.unaryop, ast.operator,
               ast.Module, ast.Interactive, ast.Expression,
               ast.alias,
               ast.excepthandler,
               ast.Set, # are these 'set' literals?
               ast.arguments, # TODO: support vararg & kwarg arguments like in
                              # "def foo(x, *y, **z):"
               ast.IfExp,
               ast.Ellipsis, # a rarely-occuring bad egg; it doesn't have col_offset, ugh
               # TODO: is this still a legit comment?
               ast.Expr, # ALWAYS ignore this or else you get into bad conflicts
               ]


def copy_end_attrs(from_node, to_node):
    to_node.end_col = from_node.end_col
    to_node.end_lineno = from_node.end_lineno

def gen_children(node):
    for field, value in ast.iter_fields(node):
        if isinstance(value, list):
            for item in value:
                if isinstance(item, ast.AST):
                    yield item
        elif isinstance(value, ast.AST):
            yield value

def add_extent_attrs(node):
    if 'start_col' not in node._attributes:
        node._attributes = node._attributes + ('start_col', 'end_col', 'end_lineno')

# Adds start_col, end_col, and end_lineno fields to each AST node, as
# appropriate. After running, each node should have extent information
# in the form of either:
#   (lineno, start_col) to (end_lineno, end_col)
#   lineno, col_offset
#
# it's VERY IMPORTANT that this visitor does a POSTORDER traversal,
# always fully visiting each child subtree before visiting the current
# node. this way, extents will bubble up from the leaves all the way up
# to the root with just a single visit.
class AddExtentsVisitor(ast.NodeVisitor):
    def __init__(self, code_str):
        ast.NodeVisitor.__init__(self)
        # add sentinel to support one-indexing
        self.code_lines = [''] + code_str.split('\n')

    # this should NEVER be called, since all cases should be exhaustively handled
    def generic_visit(self, node):
        # exception: let these pass through unscathed, since we NOP on them
        for c in NOP_CLASSES:
            if isinstance(node, c):
                # recurse normally into children (if any)
                self.visit_children(node)
                return

        raise NotImplementedError, node.__class__

    # copied from Lib/ast.py generic_visit
    def visit_children(self, node):
        for field, value in ast.iter_fields(node):
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, ast.AST):
                        self.visit(item)
            elif isinstance(value, ast.AST):
                self.visit(value)

    def visit_ExtSlice(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_Repr(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_Assert(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_TryFinally(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_Lambda(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_Exec(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_comprehension(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_With(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_GeneratorExp(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_ListComp(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_DictComp(self, node):
        #raise NotImplementedError
        self.visit_children(node)

    def visit_SetComp(self, node):
        #raise NotImplementedError
        self.visit_children(node)


    ### stuff below is implemented ...

    # always BEGIN each visitor with a call to self.visit_children(node)
    # to do a POSTORDER traversal of your children before yourself
    # (unless you know you're a terminal node)

    def visit_ExceptHandler(self, node):
        if node.type:
            self.standard_visitor(node, node.type)
        else:
            # naked 'except'
            self.keyword_visitor(node, 'except')

    def visit_Global(self, node):
        self.visit_children(node)
        # TODO: this doesn't handle a multiline statement that uses '\'
        # operators
        add_extent_attrs(node)
        node.start_col = node.col_offset
        node.end_col = len(self.code_lines[node.lineno])
        node.end_lineno = node.lineno

    def visit_Raise(self, node):
        if node.tback:
            self.standard_visitor(node, node.tback)
        elif node.inst:
            self.standard_visitor(node, node.inst)
        elif node.type:
            self.standard_visitor(node, node.type)
        else:
            # naked 'raise'
            self.keyword_visitor(node, 'raise')

    def visit_FunctionDef(self, node):
        self.visit_func_and_class_def(node)

    def visit_ClassDef(self, node):
        self.visit_func_and_class_def(node)

    def visit_func_and_class_def(self, node):
        self.visit_children(node)
        # ok this is janky, but I think it works well in practice: just
        # scan until you find the next ':', either on this line or on a
        # subsequent line
        if not hasattr(node, 'start_col'):
            node.start_col = node.col_offset
            n = node.lineno
            while True:
                cur_line = self.code_lines[n]
                if ':' in cur_line:
                    node.end_col = cur_line.index(':')
                    node.end_lineno = n
                    break
                n += 1

    def visit_Call(self, node):
        self.visit_children(node)
        # empty case is a function call with NO arguments, keyword args,
        # starargs, or kwargs
        has_regular_args = node.args
        has_keyword_args = node.keywords
        has_starargs = node.starargs
        has_kwargs = node.kwargs

        # empty function call with NO args of any kind!
        if (not has_regular_args and
            not has_keyword_args and
            not has_starargs and
            not has_kwargs):
            if hasattr(node.func, 'start_col'):
                node.start_col = node.col_offset
                # for trailing '()'; doesn't handle blank spaces
                node.end_col = node.func.end_col + 2
                node.end_lineno = node.func.end_lineno
        # we want to give priority to kwargs since that's ALWAYS at the end ...
        elif has_kwargs:
            if hasattr(node.kwargs, 'start_col'):
                node.start_col = node.col_offset
                # for trailing ')'; doesn't handle blank spaces before ')'
                node.end_col = node.kwargs.end_col + 1
                node.end_lineno = node.kwargs.end_lineno
        # then second priority to starargs ...
        elif has_starargs:
            if hasattr(node.starargs, 'start_col'):
                node.start_col = node.col_offset
                # for trailing ')'; doesn't handle blank spaces before ')'
                node.end_col = node.starargs.end_col + 1
                node.end_lineno = node.starargs.end_lineno
        # then keyword args ...
        elif has_keyword_args:
            last_arg = node.keywords[-1]
            if hasattr(last_arg, 'start_col'):
                node.start_col = node.col_offset
                # for trailing ')'; doesn't handle blank spaces before ')'
                node.end_col = last_arg.end_col + 1
                node.end_lineno = last_arg.end_lineno
        # and finally the case with regular vanilla arguments like f(1, 2, 3)
        else:
            assert has_regular_args
            last_arg = node.args[-1]
            if hasattr(last_arg, 'start_col'):
                node.start_col = node.col_offset
                # for trailing ')'; doesn't handle blank spaces before ')'
                node.end_col = last_arg.end_col + 1
                node.end_lineno = last_arg.end_lineno

    def visit_Attribute(self, node):
        self.visit_children(node)
        if hasattr(node.value, 'start_col'):
            add_extent_attrs(node)
            node.start_col = node.col_offset
            node.end_col = len(node.attr) + 1 + node.value.end_col
            node.end_lineno = node.lineno

    def visit_Dict(self, node):
        self.visit_children(node)
        # empty case
        if len(node.values) == 0:
            node.start_col = node.col_offset
            node.end_col = node.start_col + 2 # for '{}' case; doesn't handle blank spaces
            node.end_lineno = node.lineno
        else:
            last_elt = node.values[-1]
            if hasattr(last_elt, 'start_col'):
                add_extent_attrs(node)
                node.start_col = node.col_offset
                copy_end_attrs(last_elt, node)
                node.end_col += 1 # for the extra trailing '}' character

    def visit_List(self, node):
        self.visit_children(node)
        # empty case
        if len(node.elts) == 0:
            node.start_col = node.col_offset
            node.end_col = node.start_col + 2 # for '[]' case; doesn't handle blank spaces
            node.end_lineno = node.lineno
        else:
            last_elt = node.elts[-1]
            if hasattr(last_elt, 'start_col'):
                add_extent_attrs(node)
                node.start_col = node.col_offset
                copy_end_attrs(last_elt, node)
                # TODO: if someone writes extra trailing spaces before the ']',
                # then end_col needs to be adjusted to the index of the
                # first found ']'. Example: [1,2,3    ]
                # (but let's not worry about this weird case for now)
                node.end_col += 1 # for the extra trailing ']' character

    def visit_Tuple(self, node):
        self.visit_children(node)
        # empty case
        if len(node.elts) == 0:
            node.start_col = node.col_offset
            node.end_col = node.start_col + 2 # for '()' case; doesn't handle blank spaces
            node.end_lineno = node.lineno
        else:
            last_elt = node.elts[-1]
            if hasattr(last_elt, 'start_col'):
                trailing_offset = 0
                # a singleton tuple is like '(x,)', so add 1 more for the trailing comma
                if len(node.elts) == 1:
                    trailing_offset = 1

                add_extent_attrs(node)
                node.start_col = node.col_offset
                copy_end_attrs(last_elt, node)
                node.end_col += trailing_offset

                # adjust for parens
                if node.start_col > 0:
                    if self.code_lines[node.lineno][node.start_col - 1] == '(':
                        node.start_col -= 1
                        node.end_col += 1

    # to make this more robust to parens, etc., we could simply search
    # for the next ':' character, like visit_func_and_class_def does
    def visit_If(self, node):
        self.visit_children(node)
        if hasattr(node.test, 'start_col'):
            add_extent_attrs(node)
            node.start_col = node.col_offset
            copy_end_attrs(node.test, node)

            # special case! 'elif' statements have start_col starting
            # not at the 'elif' but instead at the test condition, so
            # make an adjustment backward
            if node.start_col > 0:
                l = self.code_lines[node.lineno]
                if not l[node.start_col].startswith('if'):
                    if 'elif' in l[:node.start_col]:
                        node.start_col = l.index('elif')

    def visit_Return(self, node):
        self.visit_return_or_yield(node, 'return')

    def visit_Yield(self, node):
        self.visit_return_or_yield(node, 'yield')

    def visit_return_or_yield(self, node, keyword):
        if node.value:
            self.standard_visitor(node, node.value)
        else:
            # naked
            self.keyword_visitor(node, keyword)

    # grab end_col and end_lineno from the rightmost attribute
    def standard_visitor(self, node, rightmost_attr, end_col_adjustment=0):
        self.visit_children(node)
        if hasattr(rightmost_attr, 'start_col'):
            add_extent_attrs(node)
            node.start_col = node.col_offset
            copy_end_attrs(rightmost_attr, node)
            node.end_col += end_col_adjustment

    def keyword_visitor(self, node, keyword, end_col_adjustment=0):
        self.visit_children(node)
        add_extent_attrs(node)
        node.start_col = node.col_offset
        node.end_col = node.start_col + len(keyword) + end_col_adjustment
        node.end_lineno = node.lineno

    def visit_Subscript(self, node):
        # super-special case of an empty slice like 'foo[:]', since
        # that doesn't have end_col and end_lineno fields of its own
        if (isinstance(node.slice, ast.Slice) and
            not node.slice.lower and
            not node.slice.upper and
            not node.slice.step):
            self.standard_visitor(node, node.value, len('[:]'))
        else:
            # add 1 for trailing ']'
            self.standard_visitor(node, node.slice, 1)

    # TODO: merge together with visit_Index
    def visit_keyword(self, node):
        # keyword nodes don't have a col_offset or lineno, so STEAL
        # those from child (warning: super hacky but should work!)
        # (this doesn't work if node.value starts on a different line as node)
        node.lineno = node.value.lineno
        node.col_offset = node.value.col_offset
        node._attributes = node._attributes + ('lineno', 'col_offset')
        self.standard_visitor(node, node.value)

    def visit_Index(self, node):
        # index nodes don't have a col_offset or lineno, so STEAL
        # those from child
        # (this doesn't work if node.value starts on a different line as node)
        node.lineno = node.value.lineno
        node.col_offset = node.value.col_offset
        node._attributes = node._attributes + ('lineno', 'col_offset')
        self.standard_visitor(node, node.value)

    def visit_Slice(self, node):
        # slice nodes don't have a col_offset or lineno, so STEAL
        # those from a child.
        # if there is a lower, use that
        if node.lower:
            node.lineno = node.lower.lineno
            node.col_offset = node.lower.col_offset
            node._attributes = node._attributes + ('lineno', 'col_offset')
        # otherwise, use upper - 1, to account for ':'
        # e.g., foo[:5]
        elif node.upper:
            node.lineno = node.upper.lineno
            node.col_offset = node.upper.col_offset - 1
            node._attributes = node._attributes + ('lineno', 'col_offset')
        # otherwise use step - 2, to account for '::'
        # e.g., foo[::3]
        elif node.step:
            node.lineno = node.step.lineno
            node.col_offset = node.step.col_offset - 2
            node._attributes = node._attributes + ('lineno', 'col_offset')
        else:
            # empty case like foo[:]
            # oh carp! this doesn't have any child nodes from whom to
            # steal lineno and col_offset, so leave them empty
            pass

        # now determine which is the rightmost node to visit
        if node.step:
            self.standard_visitor(node, node.step)
        elif node.upper:
            self.standard_visitor(node, node.upper)
        elif node.lower: 
            self.standard_visitor(node, node.lower, 1) # add 1 for trailing ':'
        else:
            # empty case like foo[:]
            pass

    # to make this more robust to parens, etc., we could simply search
    # for the next ':' character, like visit_func_and_class_def does
    def visit_For(self, node):
        self.standard_visitor(node, node.iter)
    def visit_While(self, node):
        self.standard_visitor(node, node.test)

    def visit_Delete(self, node):
        self.standard_visitor(node, node.targets[-1])
    def visit_Assign(self, node):
        self.standard_visitor(node, node.value)
    def visit_AugAssign(self, node):
        self.standard_visitor(node, node.value)
    def visit_BinOp(self, node):
        self.standard_visitor(node, node.right)
    def visit_UnaryOp(self, node):
        self.standard_visitor(node, node.operand)
    def visit_BoolOp(self, node):
        self.standard_visitor(node, node.values[-1])
    def visit_Compare(self, node):
        self.standard_visitor(node, node.comparators[-1])

    def visit_Import(self, node):
        self.visit_import_hack(node)
    def visit_ImportFrom(self, node):
        self.visit_import_hack(node)

    # ugh, we can't get precise line/col info about child nodes of
    # imports, so just punt and say that they take up the entire line
    # (up to an optional semicolon, which starts the next line)
    def visit_import_hack(self, node):
        cur_line = self.code_lines[node.lineno]
        node.start_col = node.col_offset
        node.end_col = len(cur_line)
        node.end_lineno = node.lineno

        # if there's a semicolon, then truncate there:
        if ';' in cur_line:
            node.end_col = cur_line.index(';')
        

    def visit_Print(self, node):
        self.visit_children(node)
        if len(node.values):
            if hasattr(node.values[-1], 'start_col'):
                node.start_col = node.col_offset
                copy_end_attrs(node.values[-1], node)
                # adjustment for comma
                if not node.nl:
                    node.end_col += 1
        else:
            # naked print
            node.start_col = node.col_offset
            node.end_col = node.start_col + len('print')
            node.end_lineno = node.lineno
            # adjustment for comma
            if not node.nl:
                node.end_col += 1


    # terminal nodes
    TERMINAL_NODES = (ast.Name,
                      ast.Str,
                      ast.Num)
                      # maybe include these too ...
                      #ast.Pass,
                      #ast.Break,
                      #ast.Continue)


    def visit_Name(self, node):
          add_extent_attrs(node)
          node.start_col = node.col_offset
          node.end_col = node.start_col + len(node.id)
          node.end_lineno = node.lineno

    def visit_Str(self, node):
        if node.col_offset >= 0:
            # TRICKY TRICKY! don't run this more than once, ughhhhhh
            if hasattr(node, 'start_col'):
                return
            add_extent_attrs(node)
            node.start_col = node.col_offset
            # repr() will take escape characters and enclosing quotes into account!
            node.end_col = node.start_col + len(repr(node.s))
            node.end_lineno = node.lineno

            # The one exception is \' and \" characters, which repr()
            # doesn't take into account; so those offsets will be wrong.
            # TODO: fixme ... however, it's not as straightforward as it
            # first seems

            # special case for triple-quoted strings that fit on a single line
            starting_str = self.code_lines[node.lineno][node.start_col:]
            if starting_str.startswith('"""') or starting_str.startswith("'''"):
                node.end_col += 4
        else:
            # multiline strings, which come with weird -1 column offsets!
            # UGH THIS IS REALLY AGGRAVATING with tons of corner cases
            add_extent_attrs(node)
            node.end_lineno = node.lineno
            # do NOT call splitlines() since that omits the trailing '\n'
            lines = node.s.split('\n')
            n_lines = len(lines)
            node.lineno = node.end_lineno - n_lines + 1
            full_original_line = self.code_lines[node.lineno]
            first_line = lines[0]
            if first_line == '': # if it's an empty first line, ugh!
                node.col_offset = len(full_original_line) - 3 # for leading """ or '''
            else:
                first_line_loc = full_original_line.index(first_line)
                assert first_line_loc >= 3
                node.col_offset = first_line_loc - 3 # for leading """ or '''
            node.start_col = node.col_offset
            node.end_col = len(lines[-1]) + 3 # for trailing """ or '''
            # sanity checks
            sanity_check_first_substr = self.code_lines[node.lineno][node.start_col:]
            sanity_check_last_substr = self.code_lines[node.end_lineno][:node.end_col]
            assert (sanity_check_first_substr.startswith('"""') or
                    sanity_check_first_substr.startswith("'''"))
            assert (sanity_check_last_substr.endswith('"""') or
                    sanity_check_last_substr.endswith("'''"))


    def visit_Num(self, node):
        '''For starters, just handle basic DECIMAL numbers:
  3
  3.0
  3.14
  -3
  -3.14
  3.14159
  3.
  -3.
        '''
        add_extent_attrs(node)
        node.start_col = node.col_offset
        node.end_col = node.start_col + len(str(node.n))
        node.end_lineno = node.lineno
        # adjustment for negative decimal numbers
        # (ASSUMING WE ARE WRITING IN DECIMAL FORMAT!)
        if node.n < 0:
            node.start_col -= 1
            node.end_col -= 1

        # properly handle floats
        # (including '3.', '-3.', '3.0', '3.000', '3.0000000000000002')
        if type(node.n) is float:
            assert node.lineno == node.end_lineno
            substr = self.code_lines[node.lineno][node.start_col:]
            idx = substr.index('.') + 1
            while True:
                try:
                    if substr[idx] not in DIGITS_SET:
                        break
                    idx += 1
                except IndexError:
                    break
            node.end_col = node.start_col + idx


    def visit_Pass(self, node):
        self.keyword_visitor(node, 'pass')

    def visit_Break(self, node):
        self.keyword_visitor(node, 'break')

    def visit_Continue(self, node):
        self.keyword_visitor(node, 'continue')

    def visit_TryExcept(self, node):
        self.keyword_visitor(node, 'try')


# copied from ast.NodeVisitor
class DepthCountingVisitor(object):
    def __init__(self):
        self.max_depth = 0
    def visit(self, node, depth=1):
        for field, value in ast.iter_fields(node):
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, ast.AST):
                        self.visit(item, depth+1)
            elif isinstance(value, ast.AST):
                self.visit(value, depth+1)
        else:
            # terminal node
            if depth > self.max_depth:
                self.max_depth = depth



# ERGH nasty hack to get even simple cases like "d = a + b + c" working
# clean up extents by propagating the smallest start_col, lineno, and
# col_offset of each node's child to itself, if necessary
class FixupExtentsVisitor(ast.NodeVisitor):
    def __init__(self):
        ast.NodeVisitor.__init__(self)

    def visit(self, node):
        # do a POSTORDER traversal -- make sure to handle all of your
        # children first before you handle yourself
        super(FixupExtentsVisitor, self).visit(node)
        for child in gen_children(node):
            if hasattr(child, 'lineno'):
                # grab the minimum lineno and col_offset from any of
                # your children
                if not hasattr(node, 'lineno'):
                    node._attributes = node._attributes + ('lineno', 'col_offset')
                    node.lineno = child.lineno
                    node.col_offset = child.col_offset
                else:
                    # broken since we need to take the mininum of BOTH
                    # fields together ...
                    #node.lineno = min(node.lineno, child.lineno)
                    #node.col_offset = min(node.col_offset, child.col_offset)

                    # really tricky because we want to make sure that
                    # (lineno, col_offset) COMBINED are smaller, not just
                    # individually. assume that each line has < 10000
                    # columns, which is quite reasonable
                    node_ind = node.lineno * 10000 + node.col_offset
                    child_ind = child.lineno * 10000 + child.col_offset
                    if child_ind < node_ind:
                        node.lineno = child.lineno
                        node.start_col = child.col_offset


            # if BOTH you and your child have start_col, then grab the
            # smaller of the two
            if hasattr(node, 'start_col') and hasattr(child, 'start_col'):
                # VERY IMPORTANT guard condition because if we're not on
                # the same line, then this is bogus
                if node.lineno == child.lineno:
                    node.start_col = min(node.start_col, child.start_col)


# run after FixupExtentsVisitor to designate certain nodes as "placeholders"
class PlaceholderNodesVisitor(ast.NodeVisitor):
    def __init__(self):
        ast.NodeVisitor.__init__(self)

    def visit(self, node):
        # do a POSTORDER traversal -- make sure to handle all of your
        # children first before you handle yourself
        super(PlaceholderNodesVisitor, self).visit(node)

        if not hasattr(node, 'end_col'):
            node.is_placeholder = True

            node._attributes = node._attributes + ('start_col', 'end_col', 'end_lineno')
            is_first_child = True
            for child in gen_children(node):
                if is_first_child:
                    for attr in ('lineno', 'start_col', 'end_lineno', 'end_col'):
                        setattr(node, attr, getattr(child, attr))
                    is_first_child = False

                # to make weird test cases like this one work:
                # result += xxx if yyy else zzz
                if not hasattr(child, 'lineno'):
                    continue

                # make it span as far as possible across all children

                # really tricky because we want to make sure that
                # (lineno, start_col) COMBINED are smaller, not just
                # individually. assume that each line has < 10000
                # columns, which is quite reasonable
                node_ind = node.lineno * 10000 + node.start_col
                child_ind = child.lineno * 10000 + child.start_col
                if child_ind < node_ind:
                    node.lineno = child.lineno
                    node.start_col = child.start_col

                # likewise for (end_lineno, end_col)
                node_end_ind = node.end_lineno * 10000 + node.end_col
                child_end_ind = child.end_lineno * 10000 + child.end_col
                if child_end_ind > node_end_ind:
                    node.end_lineno = child.end_lineno
                    node.end_col = child.end_col

        else:
            node.is_placeholder = False
            # leave it alone


# create abs_start_index and abs_end_index attributes for nodes with
# extent information in the form of:
#   (lineno, start_col) to (end_lineno, end_col)
# if only (lineno, col_offset) exist, then just set abs_start_index = abs_end_index
# (degenerate case)
# otherwise do nothing
class AddAbsoluteExtentsVisitor(ast.NodeVisitor):
    def __init__(self, code_str):
        ast.NodeVisitor.__init__(self)
        # add sentinel to support one-indexing
        self.code_lines = [''] + code_str.split('\n')

    def visit(self, node):
        super(AddAbsoluteExtentsVisitor, self).visit(node) # POSTORDER
        node._attributes = node._attributes + ('abs_start_index', 'abs_end_index')
        if hasattr(node, 'end_col'):
            node.abs_start_index = 0
            for i in range(1, node.lineno):
                # +1 for ending newline!
                node.abs_start_index += len(self.code_lines[i]) + 1
            node.abs_start_index += node.start_col

            node.abs_end_index = 0
            for i in range(1, node.end_lineno):
                # +1 for ending newline!
                node.abs_end_index += len(self.code_lines[i]) + 1
            node.abs_end_index += node.end_col

            assert node.abs_start_index < node.abs_end_index
        elif hasattr(node, 'lineno'):
            node.abs_start_index = 0
            for i in range(1, node.lineno):
                # +1 for ending newline!
                node.abs_start_index += len(self.code_lines[i]) + 1
            node.abs_start_index += node.col_offset
            node.abs_end_index = node.abs_start_index # ugh, degenerate case


# TODO: this is pretty broken, so don't use it for now ... defeated!
#
# adjusts extents to account for extra leading and trailing parens,
# to compensate for the fact that the AST doesn't contain any paren data
#
# remember to do a POSTORDER visit so that children are always handled
# before parents!
#
# TODO: do something similar with balancing ']' and '}' for the ends of
# lists and dicts/sets with trailing spaces, e.g.,: x = [ 1 , 2 , 3 ]
#
# TODO: test on strings with embedded parens. e.g., x = (tokens[5] == ' ) ')
class BalanceParensVisitor(ast.NodeVisitor):
    def __init__(self, code_str):
        self.code_str = code_str
        ast.NodeVisitor.__init__(self)

    # SKIP STRINGS since those can have parens embedded within them,
    # which totally throws off our paren detector. e.g.,:
    #   x = (tokens[5] == ' ) ')
    def visit_Str(self, node):
        pass

    def visit(self, node):
        super(BalanceParensVisitor, self).visit(node) # POSTORDER
        if hasattr(node, 'abs_start_index'):
            # not a 'zero-sized' fake node
            if node.abs_start_index < node.abs_end_index:
                kids = get_sorted_children(node)
                if kids:
                    kids_extents = [(e.abs_start_index, e.abs_end_index)
                                    for e in kids
                                    if e.abs_start_index < e.abs_end_index]
                    # match up parens in character within your extent
                    # but NOT within one of your kids' extents
                    # (since those could themselves be strings or other
                    # stuff that throws off the paren detector)
                    paren_level = 0
                    for i in range(node.abs_start_index, node.abs_end_index + 1):
                        skip = False
                        # check whether i is in any of the extents in
                        # kids_extents
                        for x,y in kids_extents:
                            if x <= i < y:
                                skip = True
                        if skip:
                            continue

                        c = self.code_str[i]
                        if c == '(':
                            paren_level += 1
                        if c == ')':
                            paren_level -= 1
                        print '>', i, c

                    if paren_level > 0:
                        # more '(' than ')'
                        pass
                    elif paren_level < 0:
                        # more ')' than '('
                        pass
                        # TODO: adjust node.start_col and node.lineno
                        # backwards to match

                    print node.abs_start_index, node.abs_end_index
                    print `self.code_str[node.abs_start_index:node.abs_end_index]`
                    print kids_extents
                    print paren_level
                    print
                    

def extent_contains(parent, child):
    return (parent.abs_start_index <= child.abs_start_index <=
            child.abs_end_index <= parent.abs_end_index)

def extents_disjoint(parent, child):
    return ((parent.abs_end_index <= child.abs_start_index) or
            (child.abs_end_index <= parent.abs_start_index))


def extent_to_str(node):
    lab = ''
    if hasattr(node, 'end_col'):
        if node.lineno == node.end_lineno:
            lab += 'L{0}[{1}:{2}]'.format(node.lineno, node.start_col, node.end_col)
        else:
            lab += 'L{0}[{1}] - '.format(node.lineno, node.start_col)
            lab += 'L{0}[{1}]'.format(node.end_lineno, node.end_col)
    # fallback ...
    elif hasattr(node, 'lineno'):
        lab += 'L{0}[{1}]'.format(node.lineno, node.col_offset)
        lab += ' (no extents)'
    else:
        lab += '<NONE WTF>'

    return lab

def abs_indices_to_str(node):
    lab = ''
    if hasattr(node, 'abs_start_index'):
        lab += '{0}:{1}'.format(node.abs_start_index, node.abs_end_index)
    else:
        lab += '<no abs indices>'
    return lab


# sort by abs_start_index
# pre-req: run AddAbsoluteExtentsVisitor beforehand!!! ergh!
def get_sorted_children(node):
    ret = [c for c in gen_children(node) if hasattr(c, 'abs_start_index')]
    ret.sort(key=lambda e:e.abs_start_index)
    return ret


# verifies the integrity of the tree, most notably that each child's
# extent is either completely contained within the parent, or completely
# disjoint from its parent. and also that no siblings overlap
class ExtentsVerifierVisitor(ast.NodeVisitor):
    def __init__(self):
        ast.NodeVisitor.__init__(self)

    def visit(self, node):
        if hasattr(node, 'end_col'):
            assert node.lineno <= node.end_lineno
            if node.lineno == node.end_lineno:
                assert node.start_col < node.end_col
            assert node.abs_start_index < node.abs_end_index

            kids = get_sorted_children(node)

            for child in kids:
                assert (extent_contains(node, child) or
                        extents_disjoint(node, child))

            # check that neighboring siblings don't overlap
            for x, y in zip(kids, kids[1:]):
                assert extents_disjoint(x, y)

        super(ExtentsVerifierVisitor, self).visit(node)



# adapted from python_tokens.py in the python4ply project
# for Python 2.7
KEYWORDS_SET = set(['and', 'as', 'assert', 'break', 'class', 'continue', 'def',
                    'del', 'elif', 'else', 'except', 'exec', 'finally', 'for',
                    'from', 'global', 'if', 'import', 'in', 'is', 'lambda',
                    'not', 'or', 'pass', 'print', 'raise', 'return', 'try',
                    'while', 'with', 'yield'])

TOKEN_NAMES = {}

# These are sorted with 3-character tokens first, then 2-character then 1.
for line in """
LEFTSHIFTEQUAL  <<=
RIGHTSHIFTEQUAL  >>=
DOUBLESTAREQUAL  **=
DOUBLESLASHEQUAL  //=

EQEQUAL ==
NOTEQUAL !=
NOTEQUAL <>
LESSEQUAL <=
LEFTSHIFT <<
GREATEREQUAL >=
RIGHTSHIFT >>
PLUSEQUAL +=
MINEQUAL -=
DOUBLESTAR **
STAREQUAL *=
DOUBLESLASH //
SLASHEQUAL /=
VBAREQUAL |=
PERCENTEQUAL %=
AMPEREQUAL &=
CIRCUMFLEXEQUAL ^=

COLON :
COMMA ,
SEMI ;
PLUS +
MINUS -
STAR *
SLASH /
VBAR |
AMPER &
LESS <
GREATER >
EQUAL =
DOT .
PERCENT %
BACKQUOTE `
CIRCUMFLEX ^
TILDE ~
AT @

# The PLY parser replaces these with special functions
# PG: these aren't super useful for me right now ...
#LPAR (
#RPAR )
#LBRACE {
#RBRACE }
#LSQB [
#RSQB ]

BACKSLASH \\
""".splitlines():
    line = line.strip()
    if not line or line.startswith('#'):
        continue
    name, tok = line.split()
    TOKEN_NAMES[tok] = name

TOKENS_SET = set(TOKEN_NAMES.keys())


def parse_and_add_extents(code_str):
    root_node = ast.parse(code_str)

    #dcv = DepthCountingVisitor()
    #dcv.visit(root_node)
    #max_depth = dcv.max_depth

    v = AddExtentsVisitor(code_str)
    v.visit(root_node)

    v2 = FixupExtentsVisitor()
    v2.visit(root_node)

    PlaceholderNodesVisitor().visit(root_node)

    v3 = AddAbsoluteExtentsVisitor(code_str)
    v3.visit(root_node)

    # TODO: this is pretty experimental and busted right now
    BALANCE_PARENS_CHECKER = False
    if BALANCE_PARENS_CHECKER:
        v4 = BalanceParensVisitor(code_str)
        v4.visit(root_node)

    # sanity check!
    verifier = ExtentsVerifierVisitor()
    verifier.visit(root_node)

    return root_node


# get a summary of each node's relevant attributes in JSON format:
#
# a more elegant solution is to monkey-patch methods in individual ast.*
# classes, but ast.AST can't be monkey-patched, I think because it's a
# wrapper around a native C object. :(
def get_node_attr_json(node):
    # start with bare bones, and append addition attributes onto this skeleton:
    s = '"type": %s' % json.dumps(node.__class__.__name__)

    for a in ('op', 'ctx'):
        if hasattr(node, a):
            attr_node = getattr(node, a)
            if isinstance(attr_node, ast.AST):
                s += ', "%s": %s' % (a, json.dumps(attr_node.__class__.__name__))

    # these values are strings
    for a in ('arg', 'attr', 'id', 'name'):
        if hasattr(node, a):
            attr_node = getattr(node, a)
            s += ', "%s": %s' % (a, json.dumps(attr_node))

    # 'ops' is a list of ops
    if hasattr(node, 'ops'):
        ops_names = [e.__class__.__name__ for e in node.ops]
        s += ', "%s": %s' % ('ops', json.dumps(ops_names))

    # TODO: what we might also want is the attribute name of the parent
    # that brought us to this node. e.g., an ast.Dict has keys and values
    # attrs, which point to, say, identifiers, or other expressions

    return s


class CodeAst(object):
    def __init__(self, code_str):
        # UGH, we have a precondition to NOT use dos-style line endings
        # since that screws us up sometimes ...
        assert '\r' not in code_str, "DON'T USE DOS-STYLE LINE ENDINGS! Open your file in 'U' mode!"

        self.code_str = code_str

        # add sentinel to support one-indexing
        # NB: do NOT call splitlines() since that omits the trailing '\n'
        self.code_lines = [''] + code_str.split('\n')

        self.ast_root = parse_and_add_extents(code_str)
        self.all_ids = set()
        self._tid = 0 # unique token IDs accessed using self.get_tid()

    def get_ast(self):
        return self.ast_root

    def get_tid(self):
        self._tid += 1
        return self._tid

    # adapted from ast.dump
    def pretty_dump(self):
        node = self.ast_root
        # add sentinel to support one-indexing
        lines = [''] + self.code_str.split('\n')

        def _format(node, indent=0, newline=False):
            ind = ('  ' * indent)
            next_ind = ('  ' * (indent+1))

            if isinstance(node, ast.AST):
                if newline:
                    print ind + node.__class__.__name__,
                else:
                    print node.__class__.__name__,

                if hasattr(node, 'lineno'):
                    if not node.is_placeholder:
                        # common case: single line
                        if node.lineno == node.end_lineno:
                            contents = lines[node.lineno][node.start_col:node.end_col]
                            # cross-check:
                            s = self.code_str[node.abs_start_index:node.abs_end_index]
                            assert s == contents
                            print '>>', repr(contents)
                        # multiline
                        else:
                            assert node.end_lineno > node.lineno
                            contents = ''
                            for i in range(node.lineno, node.end_lineno+1):
                                l = lines[i]
                                if i == node.lineno:
                                    contents += l[node.start_col:]
                                elif i == node.end_lineno:
                                    contents += l[:node.end_col]
                                else:
                                    contents += l
                                contents += '\n'
                            # strip off final \n
                            if contents[-1] == '\n':
                                contents = contents[:-1]

                            # cross-check:
                            s = self.code_str[node.abs_start_index:node.abs_end_index]
                            assert s == contents
                            print 'ML>>', repr(contents)
                    else:
                        print
                else:
                    print

                for (fieldname, f) in ast.iter_fields(node):
                    print next_ind + fieldname + ':',
                    _format(f, indent+1)

            elif isinstance(node, list):
                print '['
                for e in node:
                    _format(e, indent+1, True)
                print ind + ']'
            else:
                print repr(node)

        if not isinstance(self.ast_root, ast.AST):
            raise TypeError('expected ast.AST, got %r' %
                            self.ast_root.__class__.__name__)
        return _format(self.ast_root, 0)


    # some crazy-ass ninja action
    # s is a string containing "leftovers" that aren't included within
    # the extents of any AST node.
    #
    # what this function will do is re-lex the string s and print to
    # self.outbuf JSON-like string nodes corresponding to elements found
    # in s.
    def relex_and_print(self, s, leading_str, node):
        # if we're in a special terminal node, then just print out s
        # literally and DON'T try to lex it. if we don't do that, then
        # we might falsely grab a '#' comment out of a string literal,
        # or a dot out of a numeric literal
        if node.__class__ in AddExtentsVisitor.TERMINAL_NODES:
            print >> self.outbuf, leading_str, json.dumps(s)
            self.gobbled_string_lst.append(s)
            return # get out!

        print >> self.outbuf, leading_str


        # 'line' is guaranteed to be a single line
        def _relex_helper(line):
            # Step 1 -- grab comments first and recurse
            try:
                # we can't possibly be within a string literal, so the
                # first '#' marks the start of a comment
                i = line.index('#') # grab the FIRST '#'
                prefix_str = line[:i]
                comment_str = line[i:]

                # recurse!
                _relex_helper(prefix_str)

                print >> self.outbuf, "," # ugh commas

                # then dump out the comment
                t = '{"type": "comment", "value": %s, "id": "tid_%d"}'
                print >> self.outbuf, t % (json.dumps(comment_str), self.get_tid())
                self.gobbled_string_lst.append(comment_str)
            except ValueError:
                # no comments, so lex away!

                # TODO: use ply for a full-on lexer solution, which
                # gives us more precision than the simple case of just
                # looking for one single token:
                # http://www.dabeaz.com/ply/ply.html#ply_nn3

                # or whaaaaaa?!? Python has a Python-based tokenizer in
                # its standard library, wha?!?
                # http://docs.python.org/2/library/tokenize.html
                # OMG this handles comments as well ... WTF?!?

                # okay, the SIMPLE case is if there's exactly ONE token
                # in the line (after stripping all whitespace)
                tok = line.strip()
                if tok in KEYWORDS_SET or tok in TOKENS_SET:
                    prefix, suffix = line.split(tok)
                    if prefix:
                        assert not prefix.strip() # should be ALL whitespace
                        _relex_helper(prefix)
                        print >> self.outbuf, "," # ugh commas
                    t = '{"type": "token", "value": %s, "id": "tid_%d"}'
                    print >> self.outbuf, t % (json.dumps(tok), self.get_tid())
                    self.gobbled_string_lst.append(tok)
                    if suffix:
                        assert not suffix.strip() # should be ALL whitespace
                        print >> self.outbuf, "," # ugh commas
                        _relex_helper(suffix)
                else:
                    # degenerate case -- let it pass through un-lexed for now
                    print >> self.outbuf, json.dumps(line)
                    self.gobbled_string_lst.append(line) # sanity checking!


        if '\n' in s:
            # multiline case

            # trivial -- multiple lines of whitespace and junk
            if s.strip() == '':
                print >> self.outbuf, json.dumps(s)
                self.gobbled_string_lst.append(s) # for sanity checking!
            else:
                # do NOT call splitlines() since that omits the trailing '\n'
                lines = s.split('\n')

                for i, line in enumerate(lines):
                    _relex_helper(line)
                    # if it's not the LAST line
                    if i < len(lines) - 1:
                        print >> self.outbuf, ',', json.dumps('\n'), ','
                        self.gobbled_string_lst.append('\n')
        else:
            # single-line case, so gobble up the entire line
            _relex_helper(s)


    # convert to a JSON format with enough information so that it's
    # directly renderable by, say, d3
    #
    # Acknowledgments: Max G. for the "max_ algorithm" of traversing the
    # AST and linearly sweeping through the code string simultaneously,
    # and Tom Lieber for suggesting to represent data as
    # abs_start_index:abs_end_index to make indexing INFINITELY SIMPLER!
    def to_renderable_json(self, compact=False, debug=False, ignore_id=False):
        if debug:
            print repr(self.code_str)
            print

        # starts at 0 and sweeps through the entirety of self.code_str
        # so that ALL CHARACTERS in self.code_str end up "printed" in
        # the JSON in some form. DON'T LEAVE OUT ANY CHARACTER!
        self.cur_index = 0 # needs to be an attr so that nested func can mutate it

        # the string that this algorithm has "gobbled up" so far
        # (verify that it matches self.code_str at the end)
        self.gobbled_string_lst = []

        self.outbuf = cStringIO.StringIO()

        print >> self.outbuf, '{"type": "ROOT_NODE", "id": "id_ROOT", '
        print >> self.outbuf, ' "contents": ['

        has_leading_text = False

        # gobble up everything until we reach the root node
        if self.cur_index < self.ast_root.abs_start_index:
            s = self.code_str[self.cur_index:self.ast_root.abs_start_index]
            if debug: print 'LEADING:', `s`
            if s:
                self.relex_and_print(s, '   ', self.ast_root)
                has_leading_text = True
            self.cur_index = self.ast_root.abs_start_index

        def _render_helper(node, indent, need_leading_comma=False):
            prematurely_done = False

            ind_str = ('    ' * indent)

            is_first_json_elt = True

            if debug:
                print ind_str + '{', node.__class__.__name__, self.cur_index
            c = ''
            if need_leading_comma:
                c = ', '

            if ignore_id:
                _id = 0
            else:
                _id = id(node)
                assert _id not in self.all_ids # make sure ids are all unique
                self.all_ids.add(_id)
 
            print >> self.outbuf, ind_str + c,
            print >> self.outbuf, '{%s, "id": "id_%d",' % (get_node_attr_json(node), _id)
            print >> self.outbuf, ind_str + ' "contents": ['

            if self.cur_index < node.abs_start_index:
                s = self.code_str[self.cur_index:node.abs_start_index]
                if debug: print ind_str, 'B:', `s`
                self.relex_and_print(s, ind_str, node)
                is_first_json_elt = False
                self.cur_index = node.abs_start_index

            # always recurse to sorted children
            kids = get_sorted_children(node) # always use node and NOT node

            for cur_kid in kids:
                # BEFORE handling each kid, gobble up everything up to
                # the abs_start_index of that kid
                # (trust me, it works better this way!)
                assert node.abs_start_index <= self.cur_index
                if self.cur_index < cur_kid.abs_start_index:
                    # kinda tricky -- for constructs like function
                    # definitions and 'if' / 'for' / 'while' blocks,
                    # node.abs_end_index <= cur_kid.abs_start_index.
                    # in that case, separate into two chunks and
                    # prematurely end this current node
                    # TODO: should this be '<' or '<='?
                    if (not prematurely_done and
                        node.abs_end_index <= cur_kid.abs_start_index):
                        s = self.code_str[self.cur_index:node.abs_end_index]
                        if debug: print ind_str, 'K (prematurely_done):', `s`

                        c = '' if is_first_json_elt else ','
                        self.relex_and_print(s, ind_str + ' ' + c, node)
                        self.cur_index = node.abs_end_index
                        prematurely_done = True

                        if debug: print ind_str, '} (prematurely_done)', self.cur_index
                        print >> self.outbuf, ind_str, ' ]'
                        print >> self.outbuf, ind_str, '}'
                        # hacky way to indicate that we've "popped up" a level
                        indent -= 1
                        is_first_json_elt = False # tricky!

                    s = self.code_str[self.cur_index:cur_kid.abs_start_index]
                    if debug: print ind_str, 'K:', `s`
                    c = '' if is_first_json_elt else ','
                    self.relex_and_print(s, ind_str + ' ' + c, node)
                    self.cur_index = cur_kid.abs_start_index
                    is_first_json_elt = False

                _render_helper(cur_kid, indent + 1, (not is_first_json_elt))
                is_first_json_elt = False

            # clean up the end
            if kids:
                assert kids[-1].abs_end_index <= self.cur_index

            if self.cur_index < node.abs_end_index:
                s = self.code_str[self.cur_index:node.abs_end_index]
                if debug:
                    print ind_str, 'A:', `s`, self.cur_index, node.abs_end_index
                c = '' if is_first_json_elt else ','
                self.relex_and_print(s, ind_str + ' ' + c, node)
                self.cur_index = node.abs_end_index
                is_first_json_elt = False

            if not prematurely_done:
                if debug: print ind_str, '}', self.cur_index
                print >> self.outbuf, ind_str, ' ]'
                print >> self.outbuf, ind_str + '}'

        if not isinstance(self.ast_root, ast.Module):
            raise TypeError('expected ast.Module, got %r' %
                            self.ast_root.__class__.__name__)

        _render_helper(self.ast_root, 1, has_leading_text)

        assert self.cur_index <= len(self.code_str), (self.cur_index, len(self.code_str))

        # gobble up everything until the end of the string

        s = self.code_str[self.cur_index:]
        if debug: print 'TRAILING:', `s`
        if s:
            self.relex_and_print(s, '    ,', self.ast_root)

        print >> self.outbuf, '  ]'
        print >> self.outbuf, '}'

        # VERY IMPORTANT sanity check that we've accounted for all
        # characters in self.code_str
        assert ''.join(self.gobbled_string_lst) == self.code_str

        if debug:
            print self.outbuf.getvalue()

        # make sure this parses as legal JSON!
        out_dat = json.loads(self.outbuf.getvalue())

        optimized_dat = optimize_output_dict(out_dat) # clean it up

        # BIG SANITY CHECK!
        assert (output_dict_to_str(out_dat) ==
                output_dict_to_str(optimized_dat)
                == self.code_str)

        indent_level = None if compact else 2
        # sort_keys hopefully leads to printing in some DETERMINISTIC order
        return json.dumps(optimized_dat, indent=indent_level, sort_keys=True)


# do some cleanups to the output dict d before encoding it as JSON:
def optimize_output_dict(d):
    # Phase 1:
    # - eliminate empty strings
    # - coalesce adjacent strings in a "contents" list into one single string
    def _opt_helper_1(obj):
        if type(obj) is dict:
            ret = {}
            for k, v in obj.iteritems():
                ret[k] = _opt_helper_1(v)
            return ret
        elif type(obj) is list:
            tmp = []
            for e in obj:
                # eliminate empty strings!
                if e == '':
                    continue
                tmp.append(_opt_helper_1(e))

            # now coalesce adjacent strings together
            ret = []
            for e in tmp:
                if not ret:
                    ret.append(e)
                elif (type(ret[-1]) in (str, unicode) and
                      type(e) in (str, unicode)):
                    ret[-1] += e
                else:
                    ret.append(e)

            return ret
        else:
            if obj:
                assert type(obj) in (str, unicode), `obj`
            return obj # verbatim

    # Phase 2:
    # - turn a singleton "contents" list with single string into a "value" node
    def _opt_helper_2(obj):
        if type(obj) is dict:
            ret = {}
            for k, v in obj.iteritems():
                if (k == "contents" and
                    type(v) is list and
                    len(v) == 1 and
                    type(v[0]) in (str, unicode)):
                    ret["value"] = v[0]
                else:
                    ret[k] = _opt_helper_2(v)
            return ret
        elif type(obj) is list:
            ret = []
            for e in obj:
                ret.append(_opt_helper_2(e))
            return ret
        else:
            if obj:
                assert type(obj) in (str, unicode), `obj`
            return obj # verbatim

    assert type(d) is dict
    t1 = _opt_helper_1(d)
    return _opt_helper_2(t1)


# walk the dict and create a string from it, for sanity checking
# optimizations and against the original code
def output_dict_to_str(d):
    output_str = []
    def _helper(obj):
        if type(obj) is dict:
            if "value" in obj:
                output_str.append(obj["value"])
            elif "contents" in obj:
                _helper(obj["contents"])
        elif type(obj) is list:
            for e in obj:
                if type(e) is dict:
                    _helper(e)
                else:
                    assert type(e) in (str, unicode)
                    output_str.append(e)
        else:
            assert False

    _helper(d)
    return ''.join(output_str)


if __name__ == "__main__":
    # always open in U mode to canonicalize all kinds of line endings to '\n'
    code_str = open(sys.argv[1], 'U').read()

    obj = CodeAst(code_str)
    #obj = parse_and_add_extents(code_str)
    
    print code_str,
    print '==='
    obj.pretty_dump()
    #print ast.dump(obj,annotate_fields=True, include_attributes=True)


    # don't print the JSON, but at least confirm that it RENDERS without
    # errors so that we can exercise the code
    print '--- JSON ---'
    print obj.to_renderable_json(ignore_id=True)
