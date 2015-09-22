defaultFinalizerResults = ({
    0: {'Line': 1, 'globals': {}, 'locals': {}},
    1: {'Line': 5, 'globals': {}, 'locals': {}},
    2: {'Line': 1, 'globals': {}, 'locals': {'a': 1, 'b': 2}},
    3: {'Line': 2, 'globals': {}, 'locals': {'a': 1, 'b': 2}},
    4: {'Line': 2, 'globals': {}, 'locals': {'__return__': 3, 'a': 1, 'b': 2}},
    5: {'Line': 5, 'globals': {}, 'locals': {}}
}, ['a', 'b'], [])

defaultMungerResults = {
    '__lineNo__': [(0, 1), (1, 5), (2, 1), (3, 2), (4, 2), (5, 5)],
    '__return__': [(0, 'myNaN'),
                   (1, 'myNaN'),
                   (2, 'myNaN'),
                   (3, 'myNaN'),
                   (4, 3),
                   (5, 'myNaN')],
    'a': [(0, 'myNaN'), (1, 'myNaN'), (2, 1), (3, 1), (4, 1), (5, 'myNaN')],
    'b': [(0, 'myNaN'), (1, 'myNaN'), (2, 2), (3, 2), (4, 2), (5, 'myNaN')]
}
