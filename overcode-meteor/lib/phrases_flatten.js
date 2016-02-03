phrases = [
    {
        "code": "def flatten(aList):", 
        "corresponding_lines": [
            0, 
            774, 
            391, 
            8, 
            536, 
            30, 
            800, 
            291, 
            687, 
            48, 
            185, 
            572, 
            64, 
            707, 
            79, 
            720, 
            337, 
            675, 
            95, 
            483, 
            231, 
            746, 
            109, 
            238, 
            367, 
            380, 
            125, 
            638
        ], 
        "id": 1
    }, 
    {
        "code": "bList=[]", 
        "corresponding_lines": [
            1, 
            292, 
            650, 
            65, 
            392, 
            10, 
            110, 
            399, 
            785, 
            801, 
            372, 
            381, 
            126, 
            31
        ], 
        "id": 2
    }, 
    {
        "code": "def inner_flatten(aList):", 
        "corresponding_lines": [
            86
        ], 
        "id": 3
    }, 
    {
        "code": "for i in aList:", 
        "corresponding_lines": [
            2, 
            776, 
            393, 
            522, 
            651, 
            642, 
            143, 
            22, 
            151, 
            410, 
            285, 
            32, 
            803, 
            293, 
            678, 
            423, 
            680, 
            179, 
            117, 
            189, 
            575, 
            66, 
            80, 
            87, 
            484, 
            489, 
            749, 
            241, 
            501, 
            246, 
            382, 
            127
        ], 
        "id": 4
    }, 
    {
        "code": "if type(i)!=list:", 
        "corresponding_lines": [
            33, 
            131, 
            517, 
            394, 
            107, 
            652, 
            750, 
            690, 
            502, 
            120
        ], 
        "id": 5
    }, 
    {
        "code": "bList.append(i)", 
        "corresponding_lines": [
            384, 
            132, 
            6, 
            779, 
            396, 
            653, 
            782, 
            146, 
            24, 
            388, 
            26, 
            34, 
            295, 
            69, 
            71, 
            73, 
            75, 
            76, 
            88, 
            104, 
            807, 
            630, 
            503, 
            121, 
            123
        ], 
        "id": 6
    }, 
    {
        "code": "else:", 
        "corresponding_lines": [
            5
        ], 
        "id": 7
    }, 
    {
        "code": "inner_flatten(i)", 
        "corresponding_lines": [
            89
        ], 
        "id": 8
    }, 
    {
        "code": "inner_flatten(aList)", 
        "corresponding_lines": [
            90
        ], 
        "id": 9
    }, 
    {
        "code": "return bList", 
        "corresponding_lines": [
            299, 
            390, 
            7, 
            398, 
            783, 
            657, 
            149, 
            408, 
            27, 
            290, 
            808, 
            135, 
            44, 
            436, 
            184, 
            455, 
            78, 
            91, 
            105, 
            108, 
            366, 
            745, 
            378, 
            635, 
            124
        ], 
        "id": 10
    }, 
    {
        "code": "result=[]", 
        "corresponding_lines": [
            1, 
            10, 
            421, 
            399
        ], 
        "id": 11
    }, 
    {
        "code": "if type(i)==list:", 
        "corresponding_lines": [
            385, 
            3, 
            804, 
            485, 
            413, 
            81, 
            242, 
            643, 
            180, 
            118, 
            468, 
            541, 
            349, 
            190
        ], 
        "id": 12
    }, 
    {
        "code": "result.extend(flatten(i))", 
        "corresponding_lines": [
            92
        ], 
        "id": 13
    }, 
    {
        "code": "result.append(i)", 
        "corresponding_lines": [
            6
        ], 
        "id": 14
    }, 
    {
        "code": "return result", 
        "corresponding_lines": [
            514, 
            195, 
            7, 
            425, 
            202, 
            108, 
            526, 
            635, 
            408, 
            499, 
            822, 
            312, 
            27, 
            93, 
            280
        ], 
        "id": 15
    }, 
    {
        "code": "new_list=[]", 
        "corresponding_lines": [
            688, 
            1, 
            10, 
            551
        ], 
        "id": 16
    }, 
    {
        "code": "new_list.append(i)", 
        "corresponding_lines": [
            146, 
            6
        ], 
        "id": 17
    }, 
    {
        "code": "for el2 in flatten(i):", 
        "corresponding_lines": [
            162
        ], 
        "id": 18
    }, 
    {
        "code": "new_list.append(el2)", 
        "corresponding_lines": [
            163
        ], 
        "id": 19
    }, 
    {
        "code": "return new_list", 
        "corresponding_lines": [
            280, 
            115, 
            93
        ], 
        "id": 20
    }, 
    {
        "code": "list_answer=[]", 
        "corresponding_lines": [
            164
        ], 
        "id": 21
    }, 
    {
        "code": "flatten(i)", 
        "corresponding_lines": [
            681, 
            106, 
            181, 
            663
        ], 
        "id": 22
    }, 
    {
        "code": "list_answer.append(i)", 
        "corresponding_lines": [
            165
        ], 
        "id": 23
    }, 
    {
        "code": "return list_answer", 
        "corresponding_lines": [
            166
        ], 
        "id": 24
    }, 
    {
        "code": "flatList=[]", 
        "corresponding_lines": [
            167
        ], 
        "id": 25
    }, 
    {
        "code": "def flatten(aList__):", 
        "corresponding_lines": [
            257, 
            168, 
            620, 
            109, 
            527, 
            793, 
            761, 
            828
        ], 
        "id": 26
    }, 
    {
        "code": "if len(aList__)&lt;1:", 
        "corresponding_lines": [
            169
        ], 
        "id": 27
    }, 
    {
        "code": "return flatList", 
        "corresponding_lines": [
            170
        ], 
        "id": 28
    }, 
    {
        "code": "if type(aList__[0])in[int,str]:", 
        "corresponding_lines": [
            171
        ], 
        "id": 29
    }, 
    {
        "code": "flatList.append(aList__[0])", 
        "corresponding_lines": [
            172
        ], 
        "id": 30
    }, 
    {
        "code": "flatten(aList__[0])", 
        "corresponding_lines": [
            173
        ], 
        "id": 31
    }, 
    {
        "code": "return flatten(aList__[1:])", 
        "corresponding_lines": [
            174
        ], 
        "id": 32
    }, 
    {
        "code": "for i___4 in range(len(aList)):", 
        "corresponding_lines": [
            175, 
            305, 
            309, 
            569, 
            636, 
            606
        ], 
        "id": 33
    }, 
    {
        "code": "if type(aList[i___4])!=list:", 
        "corresponding_lines": [
            176, 
            306, 
            637, 
            310
        ], 
        "id": 34
    }, 
    {
        "code": "result.append(aList[i___4])", 
        "corresponding_lines": [
            177, 
            307, 
            405, 
            311
        ], 
        "id": 35
    }, 
    {
        "code": "result.extend(flatten(aList[i___4]))", 
        "corresponding_lines": [
            178
        ], 
        "id": 36
    }, 
    {
        "code": "a=flatten(i)", 
        "corresponding_lines": [
            609, 
            203, 
            780
        ], 
        "id": 37
    }, 
    {
        "code": "for i___6 in range(len(a)):", 
        "corresponding_lines": [
            204
        ], 
        "id": 38
    }, 
    {
        "code": "new_list.append(a[i___6])", 
        "corresponding_lines": [
            205
        ], 
        "id": 39
    }, 
    {
        "code": "def flatten(aList___3):", 
        "corresponding_lines": [
            158, 
            231
        ], 
        "id": 40
    }, 
    {
        "code": "if type(aList___3)!=list:", 
        "corresponding_lines": [
            232, 
            159
        ], 
        "id": 41
    }, 
    {
        "code": "return[aList___3]", 
        "corresponding_lines": [
            422, 
            206
        ], 
        "id": 42
    }, 
    {
        "code": "for i in aList___3:", 
        "corresponding_lines": [
            2, 
            423
        ], 
        "id": 43
    }, 
    {
        "code": "result+=flatten(i)", 
        "corresponding_lines": [
            424, 
            276, 
            207
        ], 
        "id": 44
    }, 
    {
        "code": "def flatten(aList___5):", 
        "corresponding_lines": [
            208
        ], 
        "id": 45
    }, 
    {
        "code": "new_list__=[]", 
        "corresponding_lines": [
            1, 
            708, 
            10, 
            110, 
            209, 
            605
        ], 
        "id": 46
    }, 
    {
        "code": "for element in aList___5:", 
        "corresponding_lines": [
            210
        ], 
        "id": 47
    }, 
    {
        "code": "if type(element)==list:", 
        "corresponding_lines": [
            216, 
            632, 
            211
        ], 
        "id": 48
    }, 
    {
        "code": "new_list__.extend(element)", 
        "corresponding_lines": [
            212
        ], 
        "id": 49
    }, 
    {
        "code": "new_list__.append(element)", 
        "corresponding_lines": [
            213
        ], 
        "id": 50
    }, 
    {
        "code": "list_element_counter=0", 
        "corresponding_lines": [
            689, 
            37, 
            214, 
            53
        ], 
        "id": 51
    }, 
    {
        "code": "for element in new_list__:", 
        "corresponding_lines": [
            215
        ], 
        "id": 52
    }, 
    {
        "code": "list_element_counter+=1", 
        "corresponding_lines": [
            217, 
            43, 
            57
        ], 
        "id": 53
    }, 
    {
        "code": "if list_element_counter&gt;0:", 
        "corresponding_lines": [
            218
        ], 
        "id": 54
    }, 
    {
        "code": "return flatten(new_list__)", 
        "corresponding_lines": [
            219
        ], 
        "id": 55
    }, 
    {
        "code": "return new_list__", 
        "corresponding_lines": [
            91, 
            613, 
            711, 
            714, 
            21, 
            27
        ], 
        "id": 56
    }, 
    {
        "code": "def flatten(aList___2):", 
        "corresponding_lines": [
            8
        ], 
        "id": 57
    }, 
    {
        "code": "list4=[]", 
        "corresponding_lines": [
            1, 
            10
        ], 
        "id": 58
    }, 
    {
        "code": "for i__ in range(len(aList___2)):", 
        "corresponding_lines": [
            100, 
            670
        ], 
        "id": 59
    }, 
    {
        "code": "if type(aList___2[i__])!=list:", 
        "corresponding_lines": [
            220
        ], 
        "id": 60
    }, 
    {
        "code": "list4.append(aList___2[i__])", 
        "corresponding_lines": [
            198
        ], 
        "id": 61
    }, 
    {
        "code": "for j__ in range(len(aList___2[i__])):", 
        "corresponding_lines": [
            221
        ], 
        "id": 62
    }, 
    {
        "code": "if type(aList___2[i__][j__])!=list:", 
        "corresponding_lines": [
            222
        ], 
        "id": 63
    }, 
    {
        "code": "list4.append(aList___2[i__][j__])", 
        "corresponding_lines": [
            223
        ], 
        "id": 64
    }, 
    {
        "code": "for k in range(len(aList___2[i__][j__])):", 
        "corresponding_lines": [
            224
        ], 
        "id": 65
    }, 
    {
        "code": "if type(aList___2[i__][j__][k])!=list:", 
        "corresponding_lines": [
            225
        ], 
        "id": 66
    }, 
    {
        "code": "list4.append(aList___2[i__][j__][k])", 
        "corresponding_lines": [
            226
        ], 
        "id": 67
    }, 
    {
        "code": "for l in range(len(aList___2[i__][j__][k])):", 
        "corresponding_lines": [
            227
        ], 
        "id": 68
    }, 
    {
        "code": "if type(aList___2[i__][j__][k][l])!=list:", 
        "corresponding_lines": [
            228
        ], 
        "id": 69
    }, 
    {
        "code": "list4.append(aList___2[i__][j__][k][l])", 
        "corresponding_lines": [
            229
        ], 
        "id": 70
    }, 
    {
        "code": "return list4", 
        "corresponding_lines": [
            91, 
            583
        ], 
        "id": 71
    }, 
    {
        "code": "newlist=[]", 
        "corresponding_lines": [
            1
        ], 
        "id": 72
    }, 
    {
        "code": "newlist.append(i)", 
        "corresponding_lines": [
            6
        ], 
        "id": 73
    }, 
    {
        "code": "newlist+=a", 
        "corresponding_lines": [
            245
        ], 
        "id": 74
    }, 
    {
        "code": "return newlist", 
        "corresponding_lines": [
            93
        ], 
        "id": 75
    }, 
    {
        "code": "for j in a:", 
        "corresponding_lines": [
            256
        ], 
        "id": 76
    }, 
    {
        "code": "new_list.append(j)", 
        "corresponding_lines": [
            163
        ], 
        "id": 77
    }, 
    {
        "code": "if len(aList__)==0:", 
        "corresponding_lines": [
            258, 
            763, 
            829
        ], 
        "id": 78
    }, 
    {
        "code": "return aList__", 
        "corresponding_lines": [
            115, 
            265, 
            259, 
            509
        ], 
        "id": 79
    }, 
    {
        "code": "count=0", 
        "corresponding_lines": [
            748, 
            260
        ], 
        "id": 80
    }, 
    {
        "code": "for el in aList__:", 
        "corresponding_lines": [
            266, 
            261
        ], 
        "id": 81
    }, 
    {
        "code": "if type(el)!=list:", 
        "corresponding_lines": [
            282, 
            262
        ], 
        "id": 82
    }, 
    {
        "code": "count+=1", 
        "corresponding_lines": [
            751, 
            263
        ], 
        "id": 83
    }, 
    {
        "code": "if count==len(aList__):", 
        "corresponding_lines": [
            264
        ], 
        "id": 84
    }, 
    {
        "code": "if type(el)==list:", 
        "corresponding_lines": [
            18, 
            267, 
            278
        ], 
        "id": 85
    }, 
    {
        "code": "index=aList__.index(el)", 
        "corresponding_lines": [
            268
        ], 
        "id": 86
    }, 
    {
        "code": "aList__.remove(el)", 
        "corresponding_lines": [
            269
        ], 
        "id": 87
    }, 
    {
        "code": "for mini_el in el:", 
        "corresponding_lines": [
            270
        ], 
        "id": 88
    }, 
    {
        "code": "aList__.insert(index+el.index(mini_el),mini_el)", 
        "corresponding_lines": [
            271
        ], 
        "id": 89
    }, 
    {
        "code": "return flatten(aList__)", 
        "corresponding_lines": [
            272
        ], 
        "id": 90
    }, 
    {
        "code": "if type(i)==type('a')or type(i)==type(1):", 
        "corresponding_lines": [
            273
        ], 
        "id": 91
    }, 
    {
        "code": "result+=[i]", 
        "corresponding_lines": [
            274
        ], 
        "id": 92
    }, 
    {
        "code": "if type(i)==type([]):", 
        "corresponding_lines": [
            576, 
            506, 
            275
        ], 
        "id": 93
    }, 
    {
        "code": "if type(i)is not list:", 
        "corresponding_lines": [
            301
        ], 
        "id": 94
    }, 
    {
        "code": "flattened=[]", 
        "corresponding_lines": [
            1, 
            334
        ], 
        "id": 95
    }, 
    {
        "code": "contains_lists=False", 
        "corresponding_lines": [
            448, 
            321, 
            644, 
            646, 
            441
        ], 
        "id": 96
    }, 
    {
        "code": "for i__ in xrange(len(aList)):", 
        "corresponding_lines": [
            328, 
            322
        ], 
        "id": 97
    }, 
    {
        "code": "if type(aList[i__])==list:", 
        "corresponding_lines": [
            449, 
            323, 
            329, 
            401, 
            419, 
            445
        ], 
        "id": 98
    }, 
    {
        "code": "contains_lists=True", 
        "corresponding_lines": [
            640, 
            442, 
            324, 
            450
        ], 
        "id": 99
    }, 
    {
        "code": "pass", 
        "corresponding_lines": [
            325
        ], 
        "id": 100
    }, 
    {
        "code": "if contains_lists==False:", 
        "corresponding_lines": [
            326
        ], 
        "id": 101
    }, 
    {
        "code": "return aList", 
        "corresponding_lines": [
            97, 
            195, 
            451, 
            739, 
            327, 
            259, 
            649, 
            714, 
            14, 
            115, 
            369, 
            339, 
            52, 
            691, 
            343, 
            280, 
            91, 
            188, 
            509, 
            255
        ], 
        "id": 102
    }, 
    {
        "code": "a=flatten(aList[i__])", 
        "corresponding_lines": [
            330
        ], 
        "id": 103
    }, 
    {
        "code": "for i___6 in xrange(len(a)):", 
        "corresponding_lines": [
            331
        ], 
        "id": 104
    }, 
    {
        "code": "flattened.append(a[i___6])", 
        "corresponding_lines": [
            205
        ], 
        "id": 105
    }, 
    {
        "code": "flattened.append(aList[i__])", 
        "corresponding_lines": [
            332
        ], 
        "id": 106
    }, 
    {
        "code": "return flattened", 
        "corresponding_lines": [
            333
        ], 
        "id": 107
    }, 
    {
        "code": "answer=[]", 
        "corresponding_lines": [
            334
        ], 
        "id": 108
    }, 
    {
        "code": "answer.extend(flatten(i))", 
        "corresponding_lines": [
            335
        ], 
        "id": 109
    }, 
    {
        "code": "return answer", 
        "corresponding_lines": [
            93
        ], 
        "id": 110
    }, 
    {
        "code": "if type(i)!=type([]):", 
        "corresponding_lines": [
            379
        ], 
        "id": 111
    }, 
    {
        "code": "if not isinstance(i,list):", 
        "corresponding_lines": [
            433
        ], 
        "id": 112
    }, 
    {
        "code": "def cool(aList):", 
        "corresponding_lines": [
            434
        ], 
        "id": 113
    }, 
    {
        "code": "cool(i)", 
        "corresponding_lines": [
            435
        ], 
        "id": 114
    }, 
    {
        "code": "return cool(aList)", 
        "corresponding_lines": [
            437
        ], 
        "id": 115
    }, 
    {
        "code": "aList=[[1,'a',['cat'],2],[[[3]],'dog'],4,5]", 
        "corresponding_lines": [
            438
        ], 
        "id": 116
    }, 
    {
        "code": "for i___2 in aList___2:", 
        "corresponding_lines": [
            22
        ], 
        "id": 117
    }, 
    {
        "code": "if type(i___2)!=list:", 
        "corresponding_lines": [
            23
        ], 
        "id": 118
    }, 
    {
        "code": "list4.append(i___2)", 
        "corresponding_lines": [
            24, 
            146
        ], 
        "id": 119
    }, 
    {
        "code": "for i___5 in i___2:", 
        "corresponding_lines": [
            25
        ], 
        "id": 120
    }, 
    {
        "code": "if type(i___5)!=list:", 
        "corresponding_lines": [
            456, 
            336, 
            374, 
            102, 
            23
        ], 
        "id": 121
    }, 
    {
        "code": "list4.append(i___5)", 
        "corresponding_lines": [
            365
        ], 
        "id": 122
    }, 
    {
        "code": "for loop3 in i___5:", 
        "corresponding_lines": [
            346
        ], 
        "id": 123
    }, 
    {
        "code": "if type(loop3)!=list:", 
        "corresponding_lines": [
            457
        ], 
        "id": 124
    }, 
    {
        "code": "list4.append(loop3)", 
        "corresponding_lines": [
            458
        ], 
        "id": 125
    }, 
    {
        "code": "for loop4 in loop3:", 
        "corresponding_lines": [
            348
        ], 
        "id": 126
    }, 
    {
        "code": "if type(loop4)!=list:", 
        "corresponding_lines": [
            459
        ], 
        "id": 127
    }, 
    {
        "code": "list4.append(loop4)", 
        "corresponding_lines": [
            460
        ], 
        "id": 128
    }, 
    {
        "code": "for j in loop4:", 
        "corresponding_lines": [
            736, 
            461
        ], 
        "id": 129
    }, 
    {
        "code": "list4.append(j)", 
        "corresponding_lines": [
            462
        ], 
        "id": 130
    }, 
    {
        "code": "if type(i___2)==int:", 
        "corresponding_lines": [
            182, 
            463
        ], 
        "id": 131
    }, 
    {
        "code": "if type(i___2)==str:", 
        "corresponding_lines": [
            464, 
            183
        ], 
        "id": 132
    }, 
    {
        "code": "if type(i___2)==list:", 
        "corresponding_lines": [
            344, 
            118
        ], 
        "id": 133
    }, 
    {
        "code": "if type(i___5)==list:", 
        "corresponding_lines": [
            344, 
            345, 
            347, 
            118
        ], 
        "id": 134
    }, 
    {
        "code": "if type(loop3)==list:", 
        "corresponding_lines": [
            347
        ], 
        "id": 135
    }, 
    {
        "code": "result=result+flatten(i)", 
        "corresponding_lines": [
            471
        ], 
        "id": 136
    }, 
    {
        "code": "newlist.extend(a)", 
        "corresponding_lines": [
            472
        ], 
        "id": 137
    }, 
    {
        "code": "def flatten(aList___6):", 
        "corresponding_lines": [
            473, 
            843
        ], 
        "id": 138
    }, 
    {
        "code": "aList___6=aList___6[:]", 
        "corresponding_lines": [
            474
        ], 
        "id": 139
    }, 
    {
        "code": "if aList___6==[]:", 
        "corresponding_lines": [
            475
        ], 
        "id": 140
    }, 
    {
        "code": "return aList___6", 
        "corresponding_lines": [
            280
        ], 
        "id": 141
    }, 
    {
        "code": "elif type(aList___6[0])==list:", 
        "corresponding_lines": [
            476, 
            854
        ], 
        "id": 142
    }, 
    {
        "code": "return flatten(aList___6[0]+aList___6[1:])", 
        "corresponding_lines": [
            477
        ], 
        "id": 143
    }, 
    {
        "code": "return[aList___6[0]]+flatten(aList___6[1:])", 
        "corresponding_lines": [
            478
        ], 
        "id": 144
    }, 
    {
        "code": "if type(aList___3)==str or type(aList___3)==int:", 
        "corresponding_lines": [
            492
        ], 
        "id": 145
    }, 
    {
        "code": "aList=aList___3[:]", 
        "corresponding_lines": [
            493
        ], 
        "id": 146
    }, 
    {
        "code": "if not type(i)==list:", 
        "corresponding_lines": [
            500
        ], 
        "id": 147
    }, 
    {
        "code": "if len(aList)==0:", 
        "corresponding_lines": [
            537, 
            194, 
            508, 
            634, 
            665
        ], 
        "id": 148
    }, 
    {
        "code": "aL=aList[:]", 
        "corresponding_lines": [
            510
        ], 
        "id": 149
    }, 
    {
        "code": "final=[]", 
        "corresponding_lines": [
            237, 
            511
        ], 
        "id": 150
    }, 
    {
        "code": "for i___4 in range(len(aL)):", 
        "corresponding_lines": [
            512
        ], 
        "id": 151
    }, 
    {
        "code": "i=aL[i___4]", 
        "corresponding_lines": [
            513
        ], 
        "id": 152
    }, 
    {
        "code": "final.append(i)", 
        "corresponding_lines": [
            244, 
            6
        ], 
        "id": 153
    }, 
    {
        "code": "final.extend(a)", 
        "corresponding_lines": [
            472
        ], 
        "id": 154
    }, 
    {
        "code": "return final", 
        "corresponding_lines": [
            240, 
            514
        ], 
        "id": 155
    }, 
    {
        "code": "if aList==[]:", 
        "corresponding_lines": [
            856, 
            521, 
            802, 
            709, 
            239
        ], 
        "id": 156
    }, 
    {
        "code": "return[]", 
        "corresponding_lines": [
            12
        ], 
        "id": 157
    }, 
    {
        "code": "newList=[]", 
        "corresponding_lines": [
            511
        ], 
        "id": 158
    }, 
    {
        "code": "newList+=flatten(i)", 
        "corresponding_lines": [
            276
        ], 
        "id": 159
    }, 
    {
        "code": "newList.append(i)", 
        "corresponding_lines": [
            6
        ], 
        "id": 160
    }, 
    {
        "code": "return newList", 
        "corresponding_lines": [
            514
        ], 
        "id": 161
    }, 
    {
        "code": "rlist=[]", 
        "corresponding_lines": [
            1
        ], 
        "id": 162
    }, 
    {
        "code": "for item in aList__:", 
        "corresponding_lines": [
            528
        ], 
        "id": 163
    }, 
    {
        "code": "if type(item)==list:", 
        "corresponding_lines": [
            529
        ], 
        "id": 164
    }, 
    {
        "code": "rlist=flatten(rlist+item)", 
        "corresponding_lines": [
            530
        ], 
        "id": 165
    }, 
    {
        "code": "elif type(item)==int or type(item)==str:", 
        "corresponding_lines": [
            531
        ], 
        "id": 166
    }, 
    {
        "code": "rlist.append(item)", 
        "corresponding_lines": [
            532
        ], 
        "id": 167
    }, 
    {
        "code": "return rlist", 
        "corresponding_lines": [
            533
        ], 
        "id": 168
    }, 
    {
        "code": "flattened_list=[]", 
        "corresponding_lines": [
            10, 
            479
        ], 
        "id": 169
    }, 
    {
        "code": "flattened_list.append(i)", 
        "corresponding_lines": [
            545, 
            481
        ], 
        "id": 170
    }, 
    {
        "code": "return flattened_list", 
        "corresponding_lines": [
            482
        ], 
        "id": 171
    }, 
    {
        "code": "if type(i)==int:", 
        "corresponding_lines": [
            546, 
            144, 
            595, 
            598, 
            152, 
            411
        ], 
        "id": 172
    }, 
    {
        "code": "if type(i)==str:", 
        "corresponding_lines": [
            547, 
            412
        ], 
        "id": 173
    }, 
    {
        "code": "blist=i", 
        "corresponding_lines": [
            402, 
            548
        ], 
        "id": 174
    }, 
    {
        "code": "a=flatten(blist)", 
        "corresponding_lines": [
            203
        ], 
        "id": 175
    }, 
    {
        "code": "bList__=[]", 
        "corresponding_lines": [
            334
        ], 
        "id": 176
    }, 
    {
        "code": "if type(aList___3)==list:", 
        "corresponding_lines": [
            555
        ], 
        "id": 177
    }, 
    {
        "code": "for obj in aList___3:", 
        "corresponding_lines": [
            2
        ], 
        "id": 178
    }, 
    {
        "code": "obj2=flatten(obj)", 
        "corresponding_lines": [
            556
        ], 
        "id": 179
    }, 
    {
        "code": "if type(obj2)==list:", 
        "corresponding_lines": [
            557
        ], 
        "id": 180
    }, 
    {
        "code": "for obj2i in obj2:", 
        "corresponding_lines": [
            558
        ], 
        "id": 181
    }, 
    {
        "code": "flattened.append(obj2i)", 
        "corresponding_lines": [
            559
        ], 
        "id": 182
    }, 
    {
        "code": "flattened=[obj2]", 
        "corresponding_lines": [
            560
        ], 
        "id": 183
    }, 
    {
        "code": "bList__.append(aList___3)", 
        "corresponding_lines": [
            34
        ], 
        "id": 184
    }, 
    {
        "code": "for obj in flattened:", 
        "corresponding_lines": [
            561
        ], 
        "id": 185
    }, 
    {
        "code": "bList__.append(obj)", 
        "corresponding_lines": [
            562
        ], 
        "id": 186
    }, 
    {
        "code": "return bList__", 
        "corresponding_lines": [
            563
        ], 
        "id": 187
    }, 
    {
        "code": "aList_copy=[]", 
        "corresponding_lines": [
            564
        ], 
        "id": 188
    }, 
    {
        "code": "aList_copy.append(i)", 
        "corresponding_lines": [
            565
        ], 
        "id": 189
    }, 
    {
        "code": "return aList_copy", 
        "corresponding_lines": [
            566
        ], 
        "id": 190
    }, 
    {
        "code": "if len(aList___6)==0:", 
        "corresponding_lines": [
            567
        ], 
        "id": 191
    }, 
    {
        "code": "if type(aList___6[0])!=list:", 
        "corresponding_lines": [
            568
        ], 
        "id": 192
    }, 
    {
        "code": "if isinstance(i,list):", 
        "corresponding_lines": [
            578
        ], 
        "id": 193
    }, 
    {
        "code": "for i__ in aList__:", 
        "corresponding_lines": [
            584
        ], 
        "id": 194
    }, 
    {
        "code": "if type(i__)==list:", 
        "corresponding_lines": [
            700, 
            585, 
            211, 
            468, 
            704
        ], 
        "id": 195
    }, 
    {
        "code": "for j__ in i__:", 
        "corresponding_lines": [
            696, 
            705, 
            586, 
            701
        ], 
        "id": 196
    }, 
    {
        "code": "new_list__.append(j__)", 
        "corresponding_lines": [
            587
        ], 
        "id": 197
    }, 
    {
        "code": "new_list__.append(i__)", 
        "corresponding_lines": [
            123
        ], 
        "id": 198
    }, 
    {
        "code": "newer_list=[]", 
        "corresponding_lines": [
            110
        ], 
        "id": 199
    }, 
    {
        "code": "for i__ in new_list__:", 
        "corresponding_lines": [
            588
        ], 
        "id": 200
    }, 
    {
        "code": "if type(i__)!=list:", 
        "corresponding_lines": [
            589
        ], 
        "id": 201
    }, 
    {
        "code": "newer_list.append(i__)", 
        "corresponding_lines": [
            590
        ], 
        "id": 202
    }, 
    {
        "code": "holder=flatten(i__)", 
        "corresponding_lines": [
            591
        ], 
        "id": 203
    }, 
    {
        "code": "for j__ in holder:", 
        "corresponding_lines": [
            592
        ], 
        "id": 204
    }, 
    {
        "code": "newer_list.append(j__)", 
        "corresponding_lines": [
            593
        ], 
        "id": 205
    }, 
    {
        "code": "return newer_list", 
        "corresponding_lines": [
            594
        ], 
        "id": 206
    }, 
    {
        "code": "if type(i___2)is list:", 
        "corresponding_lines": [
            614
        ], 
        "id": 207
    }, 
    {
        "code": "if type(i___5)is list:", 
        "corresponding_lines": [
            615
        ], 
        "id": 208
    }, 
    {
        "code": "if type(loop3)is list:", 
        "corresponding_lines": [
            616
        ], 
        "id": 209
    }, 
    {
        "code": "if type(loop4)is list:", 
        "corresponding_lines": [
            617
        ], 
        "id": 210
    }, 
    {
        "code": "for loop5 in loop4:", 
        "corresponding_lines": [
            618
        ], 
        "id": 211
    }, 
    {
        "code": "list4.append(loop5)", 
        "corresponding_lines": [
            619
        ], 
        "id": 212
    }, 
    {
        "code": "flat__=[]", 
        "corresponding_lines": [
            621
        ], 
        "id": 213
    }, 
    {
        "code": "alist=list(aList__)", 
        "corresponding_lines": [
            622
        ], 
        "id": 214
    }, 
    {
        "code": "for item in alist:", 
        "corresponding_lines": [
            623
        ], 
        "id": 215
    }, 
    {
        "code": "if type(item)!=list:", 
        "corresponding_lines": [
            624
        ], 
        "id": 216
    }, 
    {
        "code": "flat__.append(item)", 
        "corresponding_lines": [
            625
        ], 
        "id": 217
    }, 
    {
        "code": "flatten(item)", 
        "corresponding_lines": [
            626
        ], 
        "id": 218
    }, 
    {
        "code": "alist+=flatten(item)", 
        "corresponding_lines": [
            627
        ], 
        "id": 219
    }, 
    {
        "code": "return flat__", 
        "corresponding_lines": [
            628
        ], 
        "id": 220
    }, 
    {
        "code": "a__=[]", 
        "corresponding_lines": [
            209
        ], 
        "id": 221
    }, 
    {
        "code": "for i__ in aList___5:", 
        "corresponding_lines": [
            210
        ], 
        "id": 222
    }, 
    {
        "code": "for i___3 in i__:", 
        "corresponding_lines": [
            629
        ], 
        "id": 223
    }, 
    {
        "code": "a__.append(i___3)", 
        "corresponding_lines": [
            630
        ], 
        "id": 224
    }, 
    {
        "code": "a__.append(i__)", 
        "corresponding_lines": [
            213
        ], 
        "id": 225
    }, 
    {
        "code": "for element in a__:", 
        "corresponding_lines": [
            631
        ], 
        "id": 226
    }, 
    {
        "code": "return flatten(a__)", 
        "corresponding_lines": [
            219
        ], 
        "id": 227
    }, 
    {
        "code": "return a__", 
        "corresponding_lines": [
            91
        ], 
        "id": 228
    }, 
    {
        "code": "if type(i)==type([1]):", 
        "corresponding_lines": [
            633
        ], 
        "id": 229
    }, 
    {
        "code": "final_list=[]", 
        "corresponding_lines": [
            658, 
            844, 
            762
        ], 
        "id": 230
    }, 
    {
        "code": "if type(aList___3)==str:", 
        "corresponding_lines": [
            659
        ], 
        "id": 231
    }, 
    {
        "code": "final_list.append(aList___3)", 
        "corresponding_lines": [
            660, 
            662
        ], 
        "id": 232
    }, 
    {
        "code": "elif type(aList___3)==int:", 
        "corresponding_lines": [
            661
        ], 
        "id": 233
    }, 
    {
        "code": "return final_list", 
        "corresponding_lines": [
            664, 
            767
        ], 
        "id": 234
    }, 
    {
        "code": "for i__ in aList___2:", 
        "corresponding_lines": [
            22
        ], 
        "id": 235
    }, 
    {
        "code": "if type(i__)==int:", 
        "corresponding_lines": [
            463
        ], 
        "id": 236
    }, 
    {
        "code": "flattened_list.append(i__)", 
        "corresponding_lines": [
            24
        ], 
        "id": 237
    }, 
    {
        "code": "ilist=list(i__)", 
        "corresponding_lines": [
            694
        ], 
        "id": 238
    }, 
    {
        "code": "for j__ in ilist:", 
        "corresponding_lines": [
            25
        ], 
        "id": 239
    }, 
    {
        "code": "flattened_list.append(j__)", 
        "corresponding_lines": [
            26
        ], 
        "id": 240
    }, 
    {
        "code": "list2=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 241
    }, 
    {
        "code": "for i__ in flattened_list:", 
        "corresponding_lines": [
            695
        ], 
        "id": 242
    }, 
    {
        "code": "list2.append(j__)", 
        "corresponding_lines": [
            697
        ], 
        "id": 243
    }, 
    {
        "code": "list2.append(i__)", 
        "corresponding_lines": [
            698
        ], 
        "id": 244
    }, 
    {
        "code": "for i__ in list2:", 
        "corresponding_lines": [
            699
        ], 
        "id": 245
    }, 
    {
        "code": "list4.append(j__)", 
        "corresponding_lines": [
            146, 
            460
        ], 
        "id": 246
    }, 
    {
        "code": "list4.append(i__)", 
        "corresponding_lines": [
            706, 
            702
        ], 
        "id": 247
    }, 
    {
        "code": "for i__ in list4:", 
        "corresponding_lines": [
            703
        ], 
        "id": 248
    }, 
    {
        "code": "f_list=[]", 
        "corresponding_lines": [
            717
        ], 
        "id": 249
    }, 
    {
        "code": "f_list.append(i)", 
        "corresponding_lines": [
            718
        ], 
        "id": 250
    }, 
    {
        "code": "return f_list", 
        "corresponding_lines": [
            719
        ], 
        "id": 251
    }, 
    {
        "code": "def flatten(aList___4):", 
        "corresponding_lines": [
            720
        ], 
        "id": 252
    }, 
    {
        "code": "TF=True", 
        "corresponding_lines": [
            721, 
            861
        ], 
        "id": 253
    }, 
    {
        "code": "for ele in aList___4:", 
        "corresponding_lines": [
            722, 
            727
        ], 
        "id": 254
    }, 
    {
        "code": "if type(ele)==list:", 
        "corresponding_lines": [
            728, 
            723
        ], 
        "id": 255
    }, 
    {
        "code": "TF=False", 
        "corresponding_lines": [
            860, 
            724
        ], 
        "id": 256
    }, 
    {
        "code": "break", 
        "corresponding_lines": [
            130
        ], 
        "id": 257
    }, 
    {
        "code": "if TF:", 
        "corresponding_lines": [
            725, 
            862
        ], 
        "id": 258
    }, 
    {
        "code": "return aList___4", 
        "corresponding_lines": [
            91
        ], 
        "id": 259
    }, 
    {
        "code": "L=[]", 
        "corresponding_lines": [
            726
        ], 
        "id": 260
    }, 
    {
        "code": "for i___3 in ele:", 
        "corresponding_lines": [
            629
        ], 
        "id": 261
    }, 
    {
        "code": "L.append(i___3)", 
        "corresponding_lines": [
            630
        ], 
        "id": 262
    }, 
    {
        "code": "L.append(ele)", 
        "corresponding_lines": [
            729
        ], 
        "id": 263
    }, 
    {
        "code": "return flatten(L)", 
        "corresponding_lines": [
            730
        ], 
        "id": 264
    }, 
    {
        "code": "if len(aList__)==1:", 
        "corresponding_lines": [
            764
        ], 
        "id": 265
    }, 
    {
        "code": "if not type(aList__[0])==list:", 
        "corresponding_lines": [
            769, 
            765
        ], 
        "id": 266
    }, 
    {
        "code": "final_list.append(aList__[0])", 
        "corresponding_lines": [
            770, 
            766
        ], 
        "id": 267
    }, 
    {
        "code": "return flatten(aList__[0])", 
        "corresponding_lines": [
            768
        ], 
        "id": 268
    }, 
    {
        "code": "return final_list+flatten(aList__[1:])", 
        "corresponding_lines": [
            771
        ], 
        "id": 269
    }, 
    {
        "code": "if type(aList__[0])==list:", 
        "corresponding_lines": [
            772
        ], 
        "id": 270
    }, 
    {
        "code": "return flatten(aList__[0])+flatten(aList__[1:])", 
        "corresponding_lines": [
            773
        ], 
        "id": 271
    }, 
    {
        "code": "inner_lists=0", 
        "corresponding_lines": [
            784
        ], 
        "id": 272
    }, 
    {
        "code": "flat=[]", 
        "corresponding_lines": [
            785, 
            186
        ], 
        "id": 273
    }, 
    {
        "code": "for element in aList___4:", 
        "corresponding_lines": [
            786
        ], 
        "id": 274
    }, 
    {
        "code": "if type(element)==type([]):", 
        "corresponding_lines": [
            864, 
            787
        ], 
        "id": 275
    }, 
    {
        "code": "inner_lists=1", 
        "corresponding_lines": [
            788
        ], 
        "id": 276
    }, 
    {
        "code": "for i___3 in element:", 
        "corresponding_lines": [
            629
        ], 
        "id": 277
    }, 
    {
        "code": "flat.append(i___3)", 
        "corresponding_lines": [
            630
        ], 
        "id": 278
    }, 
    {
        "code": "flat.append(element)", 
        "corresponding_lines": [
            789
        ], 
        "id": 279
    }, 
    {
        "code": "if inner_lists==0:", 
        "corresponding_lines": [
            790
        ], 
        "id": 280
    }, 
    {
        "code": "return flatten(flat)", 
        "corresponding_lines": [
            730
        ], 
        "id": 281
    }, 
    {
        "code": "list_copy=[]", 
        "corresponding_lines": [
            1
        ], 
        "id": 282
    }, 
    {
        "code": "for char in aList__:", 
        "corresponding_lines": [
            794
        ], 
        "id": 283
    }, 
    {
        "code": "list_copy.append(char)", 
        "corresponding_lines": [
            795
        ], 
        "id": 284
    }, 
    {
        "code": "for i__ in range(len(list_copy)):", 
        "corresponding_lines": [
            796
        ], 
        "id": 285
    }, 
    {
        "code": "if type(aList__[i__])==list:", 
        "corresponding_lines": [
            797
        ], 
        "id": 286
    }, 
    {
        "code": "return list_copy[:i__]+flatten(list_copy[i__]+list_copy[i__+1:])", 
        "corresponding_lines": [
            798
        ], 
        "id": 287
    }, 
    {
        "code": "return list_copy", 
        "corresponding_lines": [
            799
        ], 
        "id": 288
    }, 
    {
        "code": "elif type(aList__[0])!=list:", 
        "corresponding_lines": [
            830
        ], 
        "id": 289
    }, 
    {
        "code": "lista=[aList__[0]]", 
        "corresponding_lines": [
            831
        ], 
        "id": 290
    }, 
    {
        "code": "listb=flatten([aList__[1:]])", 
        "corresponding_lines": [
            832
        ], 
        "id": 291
    }, 
    {
        "code": "lista.extend(listb)", 
        "corresponding_lines": [
            833
        ], 
        "id": 292
    }, 
    {
        "code": "return lista", 
        "corresponding_lines": [
            834
        ], 
        "id": 293
    }, 
    {
        "code": "sublist=aList__[0]", 
        "corresponding_lines": [
            835
        ], 
        "id": 294
    }, 
    {
        "code": "copy=[]", 
        "corresponding_lines": [
            836
        ], 
        "id": 295
    }, 
    {
        "code": "for element in sublist:", 
        "corresponding_lines": [
            837
        ], 
        "id": 296
    }, 
    {
        "code": "if type(element)!=list:", 
        "corresponding_lines": [
            838
        ], 
        "id": 297
    }, 
    {
        "code": "copy.append(element)", 
        "corresponding_lines": [
            839
        ], 
        "id": 298
    }, 
    {
        "code": "copy.extend(flatten(element))", 
        "corresponding_lines": [
            840
        ], 
        "id": 299
    }, 
    {
        "code": "copy.extend(flatten(aList__[1:]))", 
        "corresponding_lines": [
            841
        ], 
        "id": 300
    }, 
    {
        "code": "return copy", 
        "corresponding_lines": [
            842
        ], 
        "id": 301
    }, 
    {
        "code": "inner_lists=False", 
        "corresponding_lines": [
            860
        ], 
        "id": 302
    }, 
    {
        "code": "for i__ in range(len(aList___4)):", 
        "corresponding_lines": [
            869
        ], 
        "id": 303
    }, 
    {
        "code": "if type(aList___4[i__])==list:", 
        "corresponding_lines": [
            870
        ], 
        "id": 304
    }, 
    {
        "code": "inner_lists=True", 
        "corresponding_lines": [
            861
        ], 
        "id": 305
    }, 
    {
        "code": "for i___3 in aList___4[i__]:", 
        "corresponding_lines": [
            871
        ], 
        "id": 306
    }, 
    {
        "code": "flat.append(aList___4[i__])", 
        "corresponding_lines": [
            872
        ], 
        "id": 307
    }, 
    {
        "code": "if inner_lists==False:", 
        "corresponding_lines": [
            873
        ], 
        "id": 308
    }, 
    {
        "code": "return flat", 
        "corresponding_lines": [
            193, 
            91
        ], 
        "id": 309
    }, 
    {
        "code": "flat_list=[]", 
        "corresponding_lines": [
            881, 
            10, 
            676
        ], 
        "id": 310
    }, 
    {
        "code": "def recur_flat(item):", 
        "corresponding_lines": [
            876
        ], 
        "id": 311
    }, 
    {
        "code": "if type(item)!=type([]):", 
        "corresponding_lines": [
            379
        ], 
        "id": 312
    }, 
    {
        "code": "flat_list.append(item)", 
        "corresponding_lines": [
            877
        ], 
        "id": 313
    }, 
    {
        "code": "for each in item:", 
        "corresponding_lines": [
            878
        ], 
        "id": 314
    }, 
    {
        "code": "recur_flat(each)", 
        "corresponding_lines": [
            879
        ], 
        "id": 315
    }, 
    {
        "code": "recur_flat(i___2)", 
        "corresponding_lines": [
            880
        ], 
        "id": 316
    }, 
    {
        "code": "return flat_list", 
        "corresponding_lines": [
            883, 
            682, 
            91
        ], 
        "id": 317
    }, 
    {
        "code": "flat_list.append(i)", 
        "corresponding_lines": [
            882
        ], 
        "id": 318
    }, 
    {
        "code": "bList.append(flatten(i))", 
        "corresponding_lines": [
            122, 
            4, 
            397, 
            134
        ], 
        "id": 319
    }, 
    {
        "code": "aList___2=aList[:]", 
        "corresponding_lines": [
            9
        ], 
        "id": 320
    }, 
    {
        "code": "if aList___2==[]:", 
        "corresponding_lines": [
            11
        ], 
        "id": 321
    }, 
    {
        "code": "elif len(aList___2)==1:", 
        "corresponding_lines": [
            13
        ], 
        "id": 322
    }, 
    {
        "code": "for i in aList___2:", 
        "corresponding_lines": [
            505, 
            316, 
            15
        ], 
        "id": 323
    }, 
    {
        "code": "new_list__.append(i)", 
        "corresponding_lines": [
            16, 
            24, 
            26, 
            20, 
            6
        ], 
        "id": 324
    }, 
    {
        "code": "for el in new_list__:", 
        "corresponding_lines": [
            17
        ], 
        "id": 325
    }, 
    {
        "code": "for i in el:", 
        "corresponding_lines": [
            19
        ], 
        "id": 326
    }, 
    {
        "code": "for i___5 in aList:", 
        "corresponding_lines": [
            179, 
            101, 
            22, 
            373
        ], 
        "id": 327
    }, 
    {
        "code": "bList.append(i___5)", 
        "corresponding_lines": [
            363, 
            364, 
            365, 
            375, 
            24, 
            123
        ], 
        "id": 328
    }, 
    {
        "code": "for i in i___5:", 
        "corresponding_lines": [
            25, 
            119, 
            348, 
            103
        ], 
        "id": 329
    }, 
    {
        "code": "for elmt in aList___2:", 
        "corresponding_lines": [
            28
        ], 
        "id": 330
    }, 
    {
        "code": "return flatten(aList___2-aList___2[0])", 
        "corresponding_lines": [
            29
        ], 
        "id": 331
    }, 
    {
        "code": "for each in i:", 
        "corresponding_lines": [
            35
        ], 
        "id": 332
    }, 
    {
        "code": "bList.append(flatten([each]))", 
        "corresponding_lines": [
            36
        ], 
        "id": 333
    }, 
    {
        "code": "for i in bList:", 
        "corresponding_lines": [
            38
        ], 
        "id": 334
    }, 
    {
        "code": "if type(i)==list and len(i)==1:", 
        "corresponding_lines": [
            39
        ], 
        "id": 335
    }, 
    {
        "code": "bList.remove(i)", 
        "corresponding_lines": [
            40
        ], 
        "id": 336
    }, 
    {
        "code": "sublist=i[0]", 
        "corresponding_lines": [
            41
        ], 
        "id": 337
    }, 
    {
        "code": "bList.insert(list_element_counter,sublist)", 
        "corresponding_lines": [
            42
        ], 
        "id": 338
    }, 
    {
        "code": "for i___2 in aList:", 
        "corresponding_lines": [
            179, 
            22
        ], 
        "id": 339
    }, 
    {
        "code": "bList.append(i___2)", 
        "corresponding_lines": [
            24, 
            146, 
            123, 
            453
        ], 
        "id": 340
    }, 
    {
        "code": "bList=bList+i___2", 
        "corresponding_lines": [
            45
        ], 
        "id": 341
    }, 
    {
        "code": "while type(i___2)==list in bList:", 
        "corresponding_lines": [
            46
        ], 
        "id": 342
    }, 
    {
        "code": "flatten(bList)", 
        "corresponding_lines": [
            865, 
            47
        ], 
        "id": 343
    }, 
    {
        "code": "for i in range(len(aList)):", 
        "corresponding_lines": [
            49, 
            98, 
            341, 
            734
        ], 
        "id": 344
    }, 
    {
        "code": "if len(aList[i])&gt;1:", 
        "corresponding_lines": [
            50
        ], 
        "id": 345
    }, 
    {
        "code": "return flatten(aList[i])", 
        "corresponding_lines": [
            51
        ], 
        "id": 346
    }, 
    {
        "code": "for term in l:", 
        "corresponding_lines": [
            54
        ], 
        "id": 347
    }, 
    {
        "code": "if type(term)==list:", 
        "corresponding_lines": [
            55
        ], 
        "id": 348
    }, 
    {
        "code": "list_element_counter+=len(term)", 
        "corresponding_lines": [
            56
        ], 
        "id": 349
    }, 
    {
        "code": "done=[]", 
        "corresponding_lines": [
            58
        ], 
        "id": 350
    }, 
    {
        "code": "while len(done)&lt;list_element_counter:", 
        "corresponding_lines": [
            59
        ], 
        "id": 351
    }, 
    {
        "code": "for things in term:", 
        "corresponding_lines": [
            60
        ], 
        "id": 352
    }, 
    {
        "code": "done.append(things)", 
        "corresponding_lines": [
            61
        ], 
        "id": 353
    }, 
    {
        "code": "done.append(term)", 
        "corresponding_lines": [
            62
        ], 
        "id": 354
    }, 
    {
        "code": "return done", 
        "corresponding_lines": [
            63
        ], 
        "id": 355
    }, 
    {
        "code": "try:", 
        "corresponding_lines": [
            67
        ], 
        "id": 356
    }, 
    {
        "code": "if len(i)==0:", 
        "corresponding_lines": [
            74, 
            68
        ], 
        "id": 357
    }, 
    {
        "code": "elif len(i)==1:", 
        "corresponding_lines": [
            296, 
            70
        ], 
        "id": 358
    }, 
    {
        "code": "except TypeError:", 
        "corresponding_lines": [
            72
        ], 
        "id": 359
    }, 
    {
        "code": "return flatten(i)", 
        "corresponding_lines": [
            577, 
            243, 
            491, 
            77, 
            389
        ], 
        "id": 360
    }, 
    {
        "code": "if len(i)&lt;=1:", 
        "corresponding_lines": [
            82, 
            395
        ], 
        "id": 361
    }, 
    {
        "code": "return flatten(i[0])", 
        "corresponding_lines": [
            83
        ], 
        "id": 362
    }, 
    {
        "code": "return i", 
        "corresponding_lines": [
            153, 
            691, 
            115, 
            84, 
            85
        ], 
        "id": 363
    }, 
    {
        "code": "if type(i)==int or type(i)==str:", 
        "corresponding_lines": [
            294, 
            94
        ], 
        "id": 364
    }, 
    {
        "code": "if len(aList)&lt;=1:", 
        "corresponding_lines": [
            96, 
            677
        ], 
        "id": 365
    }, 
    {
        "code": "return flatten(aList.append((\"\").join(aList[i])))", 
        "corresponding_lines": [
            99
        ], 
        "id": 366
    }, 
    {
        "code": "for i__ in range(len(aList)):", 
        "corresponding_lines": [
            444, 
            753, 
            100, 
            447
        ], 
        "id": 367
    }, 
    {
        "code": "if aList__==[]:", 
        "corresponding_lines": [
            111
        ], 
        "id": 368
    }, 
    {
        "code": "elif type(aList__)==None:", 
        "corresponding_lines": [
            112
        ], 
        "id": 369
    }, 
    {
        "code": "return None", 
        "corresponding_lines": [
            113
        ], 
        "id": 370
    }, 
    {
        "code": "elif type(aList__)==int:", 
        "corresponding_lines": [
            114
        ], 
        "id": 371
    }, 
    {
        "code": "elif type(aList__)==str:", 
        "corresponding_lines": [
            116
        ], 
        "id": 372
    }, 
    {
        "code": "for i___5 in aList__:", 
        "corresponding_lines": [
            117
        ], 
        "id": 373
    }, 
    {
        "code": "if len(aList)==1:", 
        "corresponding_lines": [
            128, 
            538, 
            731, 
            573
        ], 
        "id": 374
    }, 
    {
        "code": "bList.append(aList[0])", 
        "corresponding_lines": [
            129
        ], 
        "id": 375
    }, 
    {
        "code": "elif type(i)==list or len(aList)==1:", 
        "corresponding_lines": [
            133
        ], 
        "id": 376
    }, 
    {
        "code": "def flat_element(i___2):", 
        "corresponding_lines": [
            136
        ], 
        "id": 377
    }, 
    {
        "code": "return i___2", 
        "corresponding_lines": [
            137
        ], 
        "id": 378
    }, 
    {
        "code": "elif type(str(i___2))!=list:", 
        "corresponding_lines": [
            138
        ], 
        "id": 379
    }, 
    {
        "code": "return str(i___2)", 
        "corresponding_lines": [
            139
        ], 
        "id": 380
    }, 
    {
        "code": "return flat_element(str(i___2))", 
        "corresponding_lines": [
            140
        ], 
        "id": 381
    }, 
    {
        "code": "aList_better=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 382
    }, 
    {
        "code": "aList_better.append(flat_element(aList___2[i__]))", 
        "corresponding_lines": [
            141
        ], 
        "id": 383
    }, 
    {
        "code": "return aList_better", 
        "corresponding_lines": [
            142
        ], 
        "id": 384
    }, 
    {
        "code": "elif type(i)==str:", 
        "corresponding_lines": [
            145, 
            154, 
            596, 
            599
        ], 
        "id": 385
    }, 
    {
        "code": "elif type(i)==list:", 
        "corresponding_lines": [
            600, 
            466, 
            147, 
            155, 
            597
        ], 
        "id": 386
    }, 
    {
        "code": "bList.append(flatten_helper(i))", 
        "corresponding_lines": [
            148
        ], 
        "id": 387
    }, 
    {
        "code": "def flatten_helper(aList):", 
        "corresponding_lines": [
            150
        ], 
        "id": 388
    }, 
    {
        "code": "for new_item in i:", 
        "corresponding_lines": [
            156
        ], 
        "id": 389
    }, 
    {
        "code": "return flatten_helper(new_item)", 
        "corresponding_lines": [
            157
        ], 
        "id": 390
    }, 
    {
        "code": "return aList___3", 
        "corresponding_lines": [
            160
        ], 
        "id": 391
    }, 
    {
        "code": "my_list=[]", 
        "corresponding_lines": [
            1
        ], 
        "id": 392
    }, 
    {
        "code": "my_list.append(flatten(i))", 
        "corresponding_lines": [
            161
        ], 
        "id": 393
    }, 
    {
        "code": "return my_list", 
        "corresponding_lines": [
            7
        ], 
        "id": 394
    }, 
    {
        "code": "for i in i___2:", 
        "corresponding_lines": [
            119
        ], 
        "id": 395
    }, 
    {
        "code": "if type(aList)!=list:", 
        "corresponding_lines": [
            368, 
            857, 
            187
        ], 
        "id": 396
    }, 
    {
        "code": "i=flatten(i)", 
        "corresponding_lines": [
            191
        ], 
        "id": 397
    }, 
    {
        "code": "flat.append(flatten(i))", 
        "corresponding_lines": [
            192
        ], 
        "id": 398
    }, 
    {
        "code": "if len(aList___2)==0:", 
        "corresponding_lines": [
            194
        ], 
        "id": 399
    }, 
    {
        "code": "for i___4 in range(len(aList___2)):", 
        "corresponding_lines": [
            196, 
            813, 
            302
        ], 
        "id": 400
    }, 
    {
        "code": "if type(aList___2[i___4])==int:", 
        "corresponding_lines": [
            197, 
            814
        ], 
        "id": 401
    }, 
    {
        "code": "result.append(aList___2[i___4])", 
        "corresponding_lines": [
            200, 
            198
        ], 
        "id": 402
    }, 
    {
        "code": "if len(aList___2[i___4])&lt;=1:", 
        "corresponding_lines": [
            199
        ], 
        "id": 403
    }, 
    {
        "code": "result(aList___2[i___4])", 
        "corresponding_lines": [
            201
        ], 
        "id": 404
    }, 
    {
        "code": "opppp=[]", 
        "corresponding_lines": [
            230
        ], 
        "id": 405
    }, 
    {
        "code": "opppp.append(aList___3)", 
        "corresponding_lines": [
            233
        ], 
        "id": 406
    }, 
    {
        "code": "return flatten(aList___3[0])", 
        "corresponding_lines": [
            234
        ], 
        "id": 407
    }, 
    {
        "code": "return opppp", 
        "corresponding_lines": [
            235
        ], 
        "id": 408
    }, 
    {
        "code": "global final", 
        "corresponding_lines": [
            236
        ], 
        "id": 409
    }, 
    {
        "code": "if i==list:", 
        "corresponding_lines": [
            247
        ], 
        "id": 410
    }, 
    {
        "code": "aList.remove(i)", 
        "corresponding_lines": [
            248, 
            488, 
            250
        ], 
        "id": 411
    }, 
    {
        "code": "aList.extend(i)", 
        "corresponding_lines": [
            249
        ], 
        "id": 412
    }, 
    {
        "code": "aList.append(i)", 
        "corresponding_lines": [
            251, 
            487
        ], 
        "id": 413
    }, 
    {
        "code": "for k in aList:", 
        "corresponding_lines": [
            252
        ], 
        "id": 414
    }, 
    {
        "code": "if k==list:", 
        "corresponding_lines": [
            253
        ], 
        "id": 415
    }, 
    {
        "code": "return flatten(aList)", 
        "corresponding_lines": [
            760, 
            243, 
            254
        ], 
        "id": 416
    }, 
    {
        "code": "for el in new_list:", 
        "corresponding_lines": [
            277
        ], 
        "id": 417
    }, 
    {
        "code": "if list_element_counter==0:", 
        "corresponding_lines": [
            279
        ], 
        "id": 418
    }, 
    {
        "code": "for el in aList___2:", 
        "corresponding_lines": [
            281
        ], 
        "id": 419
    }, 
    {
        "code": "new_list+=[el]", 
        "corresponding_lines": [
            283
        ], 
        "id": 420
    }, 
    {
        "code": "flatten(el)", 
        "corresponding_lines": [
            284
        ], 
        "id": 421
    }, 
    {
        "code": "if i==type(str)or i==type(int):", 
        "corresponding_lines": [
            286
        ], 
        "id": 422
    }, 
    {
        "code": "for j in range(len(i)):", 
        "corresponding_lines": [
            287
        ], 
        "id": 423
    }, 
    {
        "code": "new=aList.pop()", 
        "corresponding_lines": [
            288
        ], 
        "id": 424
    }, 
    {
        "code": "bList.append(new)", 
        "corresponding_lines": [
            289
        ], 
        "id": 425
    }, 
    {
        "code": "bList.append(i[0])", 
        "corresponding_lines": [
            297
        ], 
        "id": 426
    }, 
    {
        "code": "bList=bList+flatten(i)", 
        "corresponding_lines": [
            298
        ], 
        "id": 427
    }, 
    {
        "code": "flatten(aList[i___4])", 
        "corresponding_lines": [
            300
        ], 
        "id": 428
    }, 
    {
        "code": "if type(aList___2[i___4])!=list:", 
        "corresponding_lines": [
            303
        ], 
        "id": 429
    }, 
    {
        "code": "aList=aList___2[i___4]", 
        "corresponding_lines": [
            304
        ], 
        "id": 430
    }, 
    {
        "code": "aList=aList[i___4]", 
        "corresponding_lines": [
            308
        ], 
        "id": 431
    }, 
    {
        "code": "s=\"\"", 
        "corresponding_lines": [
            313
        ], 
        "id": 432
    }, 
    {
        "code": "k=\"\"", 
        "corresponding_lines": [
            313
        ], 
        "id": 433
    }, 
    {
        "code": "s=str(L)", 
        "corresponding_lines": [
            314
        ], 
        "id": 434
    }, 
    {
        "code": "newL=[]", 
        "corresponding_lines": [
            315
        ], 
        "id": 435
    }, 
    {
        "code": "for i in s:", 
        "corresponding_lines": [
            316
        ], 
        "id": 436
    }, 
    {
        "code": "if i=='[' or i==']' or i==\",\":", 
        "corresponding_lines": [
            317
        ], 
        "id": 437
    }, 
    {
        "code": "s=s.replace(i,\"\")", 
        "corresponding_lines": [
            318
        ], 
        "id": 438
    }, 
    {
        "code": "if i==' ':", 
        "corresponding_lines": [
            319
        ], 
        "id": 439
    }, 
    {
        "code": "s=s.replace(i,\",\")", 
        "corresponding_lines": [
            320
        ], 
        "id": 440
    }, 
    {
        "code": "aList___2.append(s)", 
        "corresponding_lines": [
            146
        ], 
        "id": 441
    }, 
    {
        "code": "return aList___2", 
        "corresponding_lines": [
            115, 
            516, 
            14, 
            195, 
            455
        ], 
        "id": 442
    }, 
    {
        "code": "aList=aList[:]", 
        "corresponding_lines": [
            9, 
            738, 
            747, 
            340, 
            775
        ], 
        "id": 443
    }, 
    {
        "code": "if type(aList[0])!=list:", 
        "corresponding_lines": [
            338
        ], 
        "id": 444
    }, 
    {
        "code": "aList[i]=flatten(aList[i])", 
        "corresponding_lines": [
            342
        ], 
        "id": 445
    }, 
    {
        "code": "for i___5 in aList___2:", 
        "corresponding_lines": [
            22
        ], 
        "id": 446
    }, 
    {
        "code": "for i___5 in i___5:", 
        "corresponding_lines": [
            25, 
            346
        ], 
        "id": 447
    }, 
    {
        "code": "for d in aList___2:", 
        "corresponding_lines": [
            350
        ], 
        "id": 448
    }, 
    {
        "code": "if type(d)==list:", 
        "corresponding_lines": [
            351
        ], 
        "id": 449
    }, 
    {
        "code": "for e in d:", 
        "corresponding_lines": [
            352
        ], 
        "id": 450
    }, 
    {
        "code": "if type(e)==list:", 
        "corresponding_lines": [
            353
        ], 
        "id": 451
    }, 
    {
        "code": "for f in e:", 
        "corresponding_lines": [
            354
        ], 
        "id": 452
    }, 
    {
        "code": "if type(f)==list:", 
        "corresponding_lines": [
            355
        ], 
        "id": 453
    }, 
    {
        "code": "for g in f:", 
        "corresponding_lines": [
            356
        ], 
        "id": 454
    }, 
    {
        "code": "if type(ag)==list:", 
        "corresponding_lines": [
            357
        ], 
        "id": 455
    }, 
    {
        "code": "continue", 
        "corresponding_lines": [
            358
        ], 
        "id": 456
    }, 
    {
        "code": "bList.append(g)", 
        "corresponding_lines": [
            359
        ], 
        "id": 457
    }, 
    {
        "code": "bList.append(f)", 
        "corresponding_lines": [
            360
        ], 
        "id": 458
    }, 
    {
        "code": "bList.append(e)", 
        "corresponding_lines": [
            361
        ], 
        "id": 459
    }, 
    {
        "code": "bList.append(d)", 
        "corresponding_lines": [
            362
        ], 
        "id": 460
    }, 
    {
        "code": "elif type(aList)==list and len(aList)==1:", 
        "corresponding_lines": [
            370, 
            603
        ], 
        "id": 461
    }, 
    {
        "code": "return flatten(aList[0])", 
        "corresponding_lines": [
            371
        ], 
        "id": 462
    }, 
    {
        "code": "for valueF in i___5:", 
        "corresponding_lines": [
            376
        ], 
        "id": 463
    }, 
    {
        "code": "bList.append(flatten(valueF))", 
        "corresponding_lines": [
            377
        ], 
        "id": 464
    }, 
    {
        "code": "if type(i)==str or type(i)==int:", 
        "corresponding_lines": [
            465, 
            387, 
            383
        ], 
        "id": 465
    }, 
    {
        "code": "for i in i:", 
        "corresponding_lines": [
            25, 
            386, 
            486, 
            119
        ], 
        "id": 466
    }, 
    {
        "code": "for i in xrange(len(aList)):", 
        "corresponding_lines": [
            400
        ], 
        "id": 467
    }, 
    {
        "code": "if type(aList[i])==list:", 
        "corresponding_lines": [
            401
        ], 
        "id": 468
    }, 
    {
        "code": "return flatten(aList[blist])", 
        "corresponding_lines": [
            403
        ], 
        "id": 469
    }, 
    {
        "code": "elif type(aList[i])==int:", 
        "corresponding_lines": [
            404
        ], 
        "id": 470
    }, 
    {
        "code": "result.append(aList[i])", 
        "corresponding_lines": [
            405, 
            407
        ], 
        "id": 471
    }, 
    {
        "code": "elif type(aList[i])==str:", 
        "corresponding_lines": [
            406
        ], 
        "id": 472
    }, 
    {
        "code": "aList=[]", 
        "corresponding_lines": [
            409, 
            10
        ], 
        "id": 473
    }, 
    {
        "code": "for k in i:", 
        "corresponding_lines": [
            414
        ], 
        "id": 474
    }, 
    {
        "code": "str(k)==aList[i]", 
        "corresponding_lines": [
            415
        ], 
        "id": 475
    }, 
    {
        "code": "mylist=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 476
    }, 
    {
        "code": "if isinstance(aList___2[i__],list):", 
        "corresponding_lines": [
            416
        ], 
        "id": 477
    }, 
    {
        "code": "mylist.extend(aList___2[i__])", 
        "corresponding_lines": [
            417
        ], 
        "id": 478
    }, 
    {
        "code": "return mylist", 
        "corresponding_lines": [
            418
        ], 
        "id": 479
    }, 
    {
        "code": "if type(aList___2[i__])==list:", 
        "corresponding_lines": [
            419
        ], 
        "id": 480
    }, 
    {
        "code": "for i___5 in aList___2[i__]:", 
        "corresponding_lines": [
            420
        ], 
        "id": 481
    }, 
    {
        "code": "result.append(i___5)", 
        "corresponding_lines": [
            26
        ], 
        "id": 482
    }, 
    {
        "code": "result.append(aList___2[i__])", 
        "corresponding_lines": [
            198, 
            407
        ], 
        "id": 483
    }, 
    {
        "code": "k=aList___2.copy()", 
        "corresponding_lines": [
            426
        ], 
        "id": 484
    }, 
    {
        "code": "for i in range(len(k)):", 
        "corresponding_lines": [
            427
        ], 
        "id": 485
    }, 
    {
        "code": "if i==type(str):", 
        "corresponding_lines": [
            428
        ], 
        "id": 486
    }, 
    {
        "code": "new_list+=i", 
        "corresponding_lines": [
            429
        ], 
        "id": 487
    }, 
    {
        "code": "elif i==type(int):", 
        "corresponding_lines": [
            430
        ], 
        "id": 488
    }, 
    {
        "code": "elif i==type(float):", 
        "corresponding_lines": [
            431
        ], 
        "id": 489
    }, 
    {
        "code": "elif i==type(list):", 
        "corresponding_lines": [
            432
        ], 
        "id": 490
    }, 
    {
        "code": "if aList==0:", 
        "corresponding_lines": [
            439
        ], 
        "id": 491
    }, 
    {
        "code": "elif len(aList)==1 and type(aList)!=list:", 
        "corresponding_lines": [
            440
        ], 
        "id": 492
    }, 
    {
        "code": "while contains_lists:", 
        "corresponding_lines": [
            443
        ], 
        "id": 493
    }, 
    {
        "code": "aList=aList[:i__]+aList[i__]+aList[i__+1:]", 
        "corresponding_lines": [
            446
        ], 
        "id": 494
    }, 
    {
        "code": "if type(i___2)!='list':", 
        "corresponding_lines": [
            452
        ], 
        "id": 495
    }, 
    {
        "code": "flatten(i___2[0])", 
        "corresponding_lines": [
            454
        ], 
        "id": 496
    }, 
    {
        "code": "for i in new_list__:", 
        "corresponding_lines": [
            480, 
            467
        ], 
        "id": 497
    }, 
    {
        "code": "i=int(i)", 
        "corresponding_lines": [
            469
        ], 
        "id": 498
    }, 
    {
        "code": "i=str(i)", 
        "corresponding_lines": [
            470
        ], 
        "id": 499
    }, 
    {
        "code": "while type(i)==list:", 
        "corresponding_lines": [
            490
        ], 
        "id": 500
    }, 
    {
        "code": "def flatten_inner(aList):", 
        "corresponding_lines": [
            494
        ], 
        "id": 501
    }, 
    {
        "code": "for i__ in range(0,len(aList)):", 
        "corresponding_lines": [
            495
        ], 
        "id": 502
    }, 
    {
        "code": "return flatten_inner(aList[i__])", 
        "corresponding_lines": [
            496
        ], 
        "id": 503
    }, 
    {
        "code": "result.append(aList[i__])", 
        "corresponding_lines": [
            497
        ], 
        "id": 504
    }, 
    {
        "code": "flatten_inner(aList)", 
        "corresponding_lines": [
            498
        ], 
        "id": 505
    }, 
    {
        "code": "aList=i", 
        "corresponding_lines": [
            504
        ], 
        "id": 506
    }, 
    {
        "code": "flatten(i-1)", 
        "corresponding_lines": [
            507
        ], 
        "id": 507
    }, 
    {
        "code": "elif list not in aList___2:", 
        "corresponding_lines": [
            515
        ], 
        "id": 508
    }, 
    {
        "code": "list.append(i)", 
        "corresponding_lines": [
            518
        ], 
        "id": 509
    }, 
    {
        "code": "list.append(flatten(i))", 
        "corresponding_lines": [
            519
        ], 
        "id": 510
    }, 
    {
        "code": "if type(i___2)==\"&lt;type 'list'&gt;\":", 
        "corresponding_lines": [
            520
        ], 
        "id": 511
    }, 
    {
        "code": "return flatten(i___2)", 
        "corresponding_lines": [
            254
        ], 
        "id": 512
    }, 
    {
        "code": "i=0", 
        "corresponding_lines": [
            53
        ], 
        "id": 513
    }, 
    {
        "code": "if aList___2[i]!=list:", 
        "corresponding_lines": [
            523
        ], 
        "id": 514
    }, 
    {
        "code": "result.append(aList___2[i])", 
        "corresponding_lines": [
            524
        ], 
        "id": 515
    }, 
    {
        "code": "flatten(aList___2[i+1])", 
        "corresponding_lines": [
            525
        ], 
        "id": 516
    }, 
    {
        "code": "for i___4 in xrange(len(aList)):", 
        "corresponding_lines": [
            534
        ], 
        "id": 517
    }, 
    {
        "code": "if type(aList[i___4])==int or type(aList[i___4])==str:", 
        "corresponding_lines": [
            535
        ], 
        "id": 518
    }, 
    {
        "code": "sublist=aList[0]", 
        "corresponding_lines": [
            539
        ], 
        "id": 519
    }, 
    {
        "code": "for i in sublist:", 
        "corresponding_lines": [
            540
        ], 
        "id": 520
    }, 
    {
        "code": "i=i[0]", 
        "corresponding_lines": [
            542
        ], 
        "id": 521
    }, 
    {
        "code": "return sublist", 
        "corresponding_lines": [
            543
        ], 
        "id": 522
    }, 
    {
        "code": "return flatten(aList[:-1])+flatten(aList[0])", 
        "corresponding_lines": [
            544
        ], 
        "id": 523
    }, 
    {
        "code": "if type(aList___2)==list:", 
        "corresponding_lines": [
            549
        ], 
        "id": 524
    }, 
    {
        "code": "if type(aList___2[0])==list:", 
        "corresponding_lines": [
            550
        ], 
        "id": 525
    }, 
    {
        "code": "for char in aList___2[0]:", 
        "corresponding_lines": [
            552
        ], 
        "id": 526
    }, 
    {
        "code": "new_list.append.char", 
        "corresponding_lines": [
            553
        ], 
        "id": 527
    }, 
    {
        "code": "return flatten(new_list)", 
        "corresponding_lines": [
            554
        ], 
        "id": 528
    }, 
    {
        "code": "if type(aList[i___4])is not list:", 
        "corresponding_lines": [
            570
        ], 
        "id": 529
    }, 
    {
        "code": "result.append+flatten(aList[i___4])", 
        "corresponding_lines": [
            571
        ], 
        "id": 530
    }, 
    {
        "code": "return aList.append(aList)", 
        "corresponding_lines": [
            574
        ], 
        "id": 531
    }, 
    {
        "code": "if type(aList[i___4])==list:", 
        "corresponding_lines": [
            579, 
            607
        ], 
        "id": 532
    }, 
    {
        "code": "for j__ in range(len(aList[i___4])):", 
        "corresponding_lines": [
            580
        ], 
        "id": 533
    }, 
    {
        "code": "list4.append(aList[i___4][j__])", 
        "corresponding_lines": [
            581
        ], 
        "id": 534
    }, 
    {
        "code": "elif type(aList[i___4])==int:", 
        "corresponding_lines": [
            582
        ], 
        "id": 535
    }, 
    {
        "code": "list4.append(aList[i___4])", 
        "corresponding_lines": [
            177, 
            407
        ], 
        "id": 536
    }, 
    {
        "code": "elif type(aList[i___4])==str:", 
        "corresponding_lines": [
            406
        ], 
        "id": 537
    }, 
    {
        "code": "if type(aList)!=list and len(aList)==1:", 
        "corresponding_lines": [
            601
        ], 
        "id": 538
    }, 
    {
        "code": "return[aList]", 
        "corresponding_lines": [
            602
        ], 
        "id": 539
    }, 
    {
        "code": "return[aList[0]]", 
        "corresponding_lines": [
            604
        ], 
        "id": 540
    }, 
    {
        "code": "i=aList[i___4]", 
        "corresponding_lines": [
            608
        ], 
        "id": 541
    }, 
    {
        "code": "new_list__.extend(a)", 
        "corresponding_lines": [
            610
        ], 
        "id": 542
    }, 
    {
        "code": "elif type(aList[i___4])!=list:", 
        "corresponding_lines": [
            611
        ], 
        "id": 543
    }, 
    {
        "code": "new_list__.extend([aList[i___4]])", 
        "corresponding_lines": [
            612
        ], 
        "id": 544
    }, 
    {
        "code": "return flatten(aList[i___4])", 
        "corresponding_lines": [
            403
        ], 
        "id": 545
    }, 
    {
        "code": "def isflat(aList):", 
        "corresponding_lines": [
            639
        ], 
        "id": 546
    }, 
    {
        "code": "if len(aList)!=1:", 
        "corresponding_lines": [
            641
        ], 
        "id": 547
    }, 
    {
        "code": "if type(aList[0])==list:", 
        "corresponding_lines": [
            715, 
            645
        ], 
        "id": 548
    }, 
    {
        "code": "return contains_lists", 
        "corresponding_lines": [
            647
        ], 
        "id": 549
    }, 
    {
        "code": "if isflat(aList):", 
        "corresponding_lines": [
            648
        ], 
        "id": 550
    }, 
    {
        "code": "if isflat(i):", 
        "corresponding_lines": [
            654
        ], 
        "id": 551
    }, 
    {
        "code": "bList.extend(i)", 
        "corresponding_lines": [
            655
        ], 
        "id": 552
    }, 
    {
        "code": "bList.extend(flatten(i))", 
        "corresponding_lines": [
            656
        ], 
        "id": 553
    }, 
    {
        "code": "print i", 
        "corresponding_lines": [
            666
        ], 
        "id": 554
    }, 
    {
        "code": "print 'NEWLIST',bList", 
        "corresponding_lines": [
            667
        ], 
        "id": 555
    }, 
    {
        "code": "d={}", 
        "corresponding_lines": [
            668
        ], 
        "id": 556
    }, 
    {
        "code": "d[i__]=[]", 
        "corresponding_lines": [
            669
        ], 
        "id": 557
    }, 
    {
        "code": "d[i__].append(i___5)", 
        "corresponding_lines": [
            671
        ], 
        "id": 558
    }, 
    {
        "code": "d[i__].append(aList___2[i__])", 
        "corresponding_lines": [
            672
        ], 
        "id": 559
    }, 
    {
        "code": "list_f=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 560
    }, 
    {
        "code": "for i__ in d:", 
        "corresponding_lines": [
            673
        ], 
        "id": 561
    }, 
    {
        "code": "list_f+=d[i__]", 
        "corresponding_lines": [
            674
        ], 
        "id": 562
    }, 
    {
        "code": "return list_f", 
        "corresponding_lines": [
            27
        ], 
        "id": 563
    }, 
    {
        "code": "return flat_list.append(i)", 
        "corresponding_lines": [
            679
        ], 
        "id": 564
    }, 
    {
        "code": "for i in range(len(aList___2)):", 
        "corresponding_lines": [
            683
        ], 
        "id": 565
    }, 
    {
        "code": "if type(aList___2[i])==int or type(aList___2[i])==str():", 
        "corresponding_lines": [
            684
        ], 
        "id": 566
    }, 
    {
        "code": "return aList___2[i]", 
        "corresponding_lines": [
            685
        ], 
        "id": 567
    }, 
    {
        "code": "return aList___2.join(aList___2[i])", 
        "corresponding_lines": [
            686
        ], 
        "id": 568
    }, 
    {
        "code": "return new_list.append(flatten(aList[list_element_counter]))", 
        "corresponding_lines": [
            692
        ], 
        "id": 569
    }, 
    {
        "code": "result.append(flatten(aList[i___4]))", 
        "corresponding_lines": [
            693
        ], 
        "id": 570
    }, 
    {
        "code": "new_list__.extend(aList)", 
        "corresponding_lines": [
            713, 
            710
        ], 
        "id": 571
    }, 
    {
        "code": "elif type(aList[0])!=list:", 
        "corresponding_lines": [
            712
        ], 
        "id": 572
    }, 
    {
        "code": "return new_list__+flatten(aList[1:])", 
        "corresponding_lines": [
            716
        ], 
        "id": 573
    }, 
    {
        "code": "loop4=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 574
    }, 
    {
        "code": "aList.append(aList[0])", 
        "corresponding_lines": [
            732
        ], 
        "id": 575
    }, 
    {
        "code": "elif len(aList)&gt;1:", 
        "corresponding_lines": [
            733
        ], 
        "id": 576
    }, 
    {
        "code": "aList[i]=loop4", 
        "corresponding_lines": [
            735
        ], 
        "id": 577
    }, 
    {
        "code": "(aList.append)[loop4[j]]", 
        "corresponding_lines": [
            737
        ], 
        "id": 578
    }, 
    {
        "code": "if type(i___2)is str or type(i___2)is int or type(i___2)is float or type(i___2)is bool:", 
        "corresponding_lines": [
            740
        ], 
        "id": 579
    }, 
    {
        "code": "elif type(i___2)is list:", 
        "corresponding_lines": [
            741
        ], 
        "id": 580
    }, 
    {
        "code": "if len(i___2)==1:", 
        "corresponding_lines": [
            742
        ], 
        "id": 581
    }, 
    {
        "code": "sublist=i___2[0]", 
        "corresponding_lines": [
            743
        ], 
        "id": 582
    }, 
    {
        "code": "bList.append(sublist)", 
        "corresponding_lines": [
            744
        ], 
        "id": 583
    }, 
    {
        "code": "flatten(i___2)", 
        "corresponding_lines": [
            47
        ], 
        "id": 584
    }, 
    {
        "code": "if count==len(aList):", 
        "corresponding_lines": [
            752
        ], 
        "id": 585
    }, 
    {
        "code": "k=len(aList[i__])", 
        "corresponding_lines": [
            754
        ], 
        "id": 586
    }, 
    {
        "code": "j=(aList[i__])[:]", 
        "corresponding_lines": [
            755
        ], 
        "id": 587
    }, 
    {
        "code": "j.reverse()", 
        "corresponding_lines": [
            756
        ], 
        "id": 588
    }, 
    {
        "code": "for thing in j:", 
        "corresponding_lines": [
            757
        ], 
        "id": 589
    }, 
    {
        "code": "aList.insert(i__,thing)", 
        "corresponding_lines": [
            758
        ], 
        "id": 590
    }, 
    {
        "code": "del aList[i__+k]", 
        "corresponding_lines": [
            759
        ], 
        "id": 591
    }, 
    {
        "code": "other=i.sort()", 
        "corresponding_lines": [
            777
        ], 
        "id": 592
    }, 
    {
        "code": "except AttributeError:", 
        "corresponding_lines": [
            778
        ], 
        "id": 593
    }, 
    {
        "code": "for i in a:", 
        "corresponding_lines": [
            781
        ], 
        "id": 594
    }, 
    {
        "code": "for i___2 in aList___2[:]:", 
        "corresponding_lines": [
            791
        ], 
        "id": 595
    }, 
    {
        "code": "if type!=list:", 
        "corresponding_lines": [
            792
        ], 
        "id": 596
    }, 
    {
        "code": "for i in range(len(i)):", 
        "corresponding_lines": [
            805
        ], 
        "id": 597
    }, 
    {
        "code": "flatten(i[i])", 
        "corresponding_lines": [
            806
        ], 
        "id": 598
    }, 
    {
        "code": "if type(aList___2[i__])=='str':", 
        "corresponding_lines": [
            809
        ], 
        "id": 599
    }, 
    {
        "code": "if type(aList___2[i__])=='int':", 
        "corresponding_lines": [
            810
        ], 
        "id": 600
    }, 
    {
        "code": "elif type(aList___2[i__])=='list':", 
        "corresponding_lines": [
            811
        ], 
        "id": 601
    }, 
    {
        "code": "aList___2[i__].flatten()", 
        "corresponding_lines": [
            812
        ], 
        "id": 602
    }, 
    {
        "code": "if type(aList___2[i___4])==str:", 
        "corresponding_lines": [
            815
        ], 
        "id": 603
    }, 
    {
        "code": "result+=str(aList___2[i___4])", 
        "corresponding_lines": [
            816
        ], 
        "id": 604
    }, 
    {
        "code": "if type(aList___2[i___4])==type([]):", 
        "corresponding_lines": [
            817
        ], 
        "id": 605
    }, 
    {
        "code": "ilist=aList___2[i___4]", 
        "corresponding_lines": [
            818
        ], 
        "id": 606
    }, 
    {
        "code": "for i___4 in range(len(ilist)):", 
        "corresponding_lines": [
            819
        ], 
        "id": 607
    }, 
    {
        "code": "if type(ilist[i___4])==int:", 
        "corresponding_lines": [
            820
        ], 
        "id": 608
    }, 
    {
        "code": "result.append(ilist[i___4])", 
        "corresponding_lines": [
            307, 
            407
        ], 
        "id": 609
    }, 
    {
        "code": "if type(ilist[i___4])==str:", 
        "corresponding_lines": [
            821
        ], 
        "id": 610
    }, 
    {
        "code": "myList=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 611
    }, 
    {
        "code": "return myList", 
        "corresponding_lines": [
            195
        ], 
        "id": 612
    }, 
    {
        "code": "if aList___2[0]==list:", 
        "corresponding_lines": [
            823
        ], 
        "id": 613
    }, 
    {
        "code": "mylist.append(i)", 
        "corresponding_lines": [
            824
        ], 
        "id": 614
    }, 
    {
        "code": "elif aList___2!=list:", 
        "corresponding_lines": [
            825
        ], 
        "id": 615
    }, 
    {
        "code": "myList.append(i)", 
        "corresponding_lines": [
            826
        ], 
        "id": 616
    }, 
    {
        "code": "return flatten(aList___2[1:])", 
        "corresponding_lines": [
            827
        ], 
        "id": 617
    }, 
    {
        "code": "if len(aList___6)==1:", 
        "corresponding_lines": [
            845
        ], 
        "id": 618
    }, 
    {
        "code": "if type(aList___6[0])==int or type(aList___6)==str:", 
        "corresponding_lines": [
            846
        ], 
        "id": 619
    }, 
    {
        "code": "final_list.append(aList___6[0])", 
        "corresponding_lines": [
            766
        ], 
        "id": 620
    }, 
    {
        "code": "return flatten(aList___6[0])", 
        "corresponding_lines": [
            847
        ], 
        "id": 621
    }, 
    {
        "code": "if type(aList___6[0])==str:", 
        "corresponding_lines": [
            848
        ], 
        "id": 622
    }, 
    {
        "code": "sublist=aList___6[0]", 
        "corresponding_lines": [
            849, 
            852
        ], 
        "id": 623
    }, 
    {
        "code": "final_list.append(sublist)", 
        "corresponding_lines": [
            146, 
            853
        ], 
        "id": 624
    }, 
    {
        "code": "return final_list+flatten(aList___6[1:])", 
        "corresponding_lines": [
            850, 
            771
        ], 
        "id": 625
    }, 
    {
        "code": "elif type(aList___6[0])==int:", 
        "corresponding_lines": [
            851
        ], 
        "id": 626
    }, 
    {
        "code": "return flatten(aList___6[0])+flatten(aList___6[1:])", 
        "corresponding_lines": [
            855
        ], 
        "id": 627
    }, 
    {
        "code": "for element in aList:", 
        "corresponding_lines": [
            858, 
            786, 
            863
        ], 
        "id": 628
    }, 
    {
        "code": "return flatten(element)", 
        "corresponding_lines": [
            859
        ], 
        "id": 629
    }, 
    {
        "code": "for i in element:", 
        "corresponding_lines": [
            629
        ], 
        "id": 630
    }, 
    {
        "code": "bList.append(element)", 
        "corresponding_lines": [
            729
        ], 
        "id": 631
    }, 
    {
        "code": "lists=[]", 
        "corresponding_lines": [
            10
        ], 
        "id": 632
    }, 
    {
        "code": "result.append(i___2)", 
        "corresponding_lines": [
            24, 
            146
        ], 
        "id": 633
    }, 
    {
        "code": "elif type(i___2)==str:", 
        "corresponding_lines": [
            866
        ], 
        "id": 634
    }, 
    {
        "code": "for i___4 in range(len(i___2)):", 
        "corresponding_lines": [
            867
        ], 
        "id": 635
    }, 
    {
        "code": "result.append(i___2[i___4])", 
        "corresponding_lines": [
            868
        ], 
        "id": 636
    }, 
    {
        "code": "if type(aList[0])is not list:", 
        "corresponding_lines": [
            874
        ], 
        "id": 637
    }, 
    {
        "code": "return flatten(aList[1:])+aList[0]", 
        "corresponding_lines": [
            875
        ], 
        "id": 638
    }
];
