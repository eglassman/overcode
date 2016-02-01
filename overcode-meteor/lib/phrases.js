phrases = [
    {
        "code": "def is_list_permutation(L1,L2):", 
        "corresponding_lines": [
            0, 
            1177
        ], 
        "id": 1
    }, 
    {
        "code": "out=(None,None,None)", 
        "corresponding_lines": [
            51, 
            791
        ], 
        "id": 2
    }, 
    {
        "code": "if len(L1)==len(L2):", 
        "corresponding_lines": [
            801, 
            898, 
            355, 
            937, 
            943, 
            52, 
            1272, 
            1327
        ], 
        "id": 3
    }, 
    {
        "code": "for element in L1:", 
        "corresponding_lines": [
            1, 
            514, 
            107, 
            647, 
            1032, 
            143, 
            16, 
            661, 
            279, 
            231, 
            32, 
            930, 
            291, 
            1387, 
            559, 
            562, 
            1131, 
            53, 
            310, 
            1055, 
            61, 
            72, 
            462, 
            207, 
            846, 
            621, 
            224, 
            99, 
            1126, 
            103, 
            491, 
            237, 
            1134, 
            1139, 
            116, 
            886, 
            119, 
            892, 
            511
        ], 
        "id": 4
    }, 
    {
        "code": "if L1.count(element)==L2.count(element):", 
        "corresponding_lines": [
            196, 
            117, 
            54, 
            1247
        ], 
        "id": 5
    }, 
    {
        "code": "if L1.count(element)&gt;out[1]:", 
        "corresponding_lines": [
            55
        ], 
        "id": 6
    }, 
    {
        "code": "out=(element,L1.count(element),type(element))", 
        "corresponding_lines": [
            56, 
            850, 
            1034
        ], 
        "id": 7
    }, 
    {
        "code": "else:", 
        "corresponding_lines": [
            14
        ], 
        "id": 8
    }, 
    {
        "code": "return False", 
        "corresponding_lines": [
            5
        ], 
        "id": 9
    }, 
    {
        "code": "return out", 
        "corresponding_lines": [
            792, 
            57, 
            490, 
            851, 
            873
        ], 
        "id": 10
    }, 
    {
        "code": "y=0", 
        "corresponding_lines": [
            96, 
            258, 
            38, 
            71, 
            809, 
            561, 
            179, 
            1054
        ], 
        "id": 11
    }, 
    {
        "code": "e_most=None", 
        "corresponding_lines": [
            146, 
            482
        ], 
        "id": 12
    }, 
    {
        "code": "for i__ in L1:", 
        "corresponding_lines": [
            224, 
            32, 
            1316, 
            165, 
            231, 
            1153, 
            304, 
            237, 
            1037, 
            16, 
            81, 
            147, 
            116, 
            511, 
            61, 
            127
        ], 
        "id": 13
    }, 
    {
        "code": "count1=L1.count(i__)", 
        "corresponding_lines": [
            148
        ], 
        "id": 14
    }, 
    {
        "code": "count2=L2.count(i__)", 
        "corresponding_lines": [
            149
        ], 
        "id": 15
    }, 
    {
        "code": "if count1!=count2 or len(L1)!=len(L2):", 
        "corresponding_lines": [
            150
        ], 
        "id": 16
    }, 
    {
        "code": "elif count1&gt;y:", 
        "corresponding_lines": [
            151
        ], 
        "id": 17
    }, 
    {
        "code": "y=count1", 
        "corresponding_lines": [
            152, 
            497
        ], 
        "id": 18
    }, 
    {
        "code": "e_most=i__", 
        "corresponding_lines": [
            153
        ], 
        "id": 19
    }, 
    {
        "code": "if L1==[]and L2==[]:", 
        "corresponding_lines": [
            520, 
            1308, 
            154, 
            500, 
            58
        ], 
        "id": 20
    }, 
    {
        "code": "return(None,None,None)", 
        "corresponding_lines": [
            13
        ], 
        "id": 21
    }, 
    {
        "code": "if e_most==None:", 
        "corresponding_lines": [
            155
        ], 
        "id": 22
    }, 
    {
        "code": "return(e_most,y,type(e_most))", 
        "corresponding_lines": [
            284, 
            412, 
            235, 
            156
        ], 
        "id": 23
    }, 
    {
        "code": "if len(L1)!=len(L2):", 
        "corresponding_lines": [
            11, 
            709, 
            587, 
            589, 
            1326, 
            1041, 
            1178, 
            157, 
            997
        ], 
        "id": 24
    }, 
    {
        "code": "most_common_element=None", 
        "corresponding_lines": [
            158
        ], 
        "id": 25
    }, 
    {
        "code": "num_of_element=0", 
        "corresponding_lines": [
            474, 
            71
        ], 
        "id": 26
    }, 
    {
        "code": "type_of_element=None", 
        "corresponding_lines": [
            609, 
            484, 
            181, 
            475, 
            158, 
            501
        ], 
        "id": 27
    }, 
    {
        "code": "count___2=L1.count(element)", 
        "corresponding_lines": [
            544, 
            2, 
            7, 
            159
        ], 
        "id": 28
    }, 
    {
        "code": "times2=L2.count(element)", 
        "corresponding_lines": [
            160, 
            8, 
            3, 
            493
        ], 
        "id": 29
    }, 
    {
        "code": "if count___2!=times2:", 
        "corresponding_lines": [
            161, 
            4, 
            9
        ], 
        "id": 30
    }, 
    {
        "code": "if count___2&gt;num_of_element:", 
        "corresponding_lines": [
            162
        ], 
        "id": 31
    }, 
    {
        "code": "most_common_element=element", 
        "corresponding_lines": [
            153
        ], 
        "id": 32
    }, 
    {
        "code": "num_of_element=count___2", 
        "corresponding_lines": [
            152
        ], 
        "id": 33
    }, 
    {
        "code": "type_of_element=type(element)", 
        "corresponding_lines": [
            184, 
            163, 
            613, 
            213, 
            517
        ], 
        "id": 34
    }, 
    {
        "code": "return(most_common_element,num_of_element,type_of_element)", 
        "corresponding_lines": [
            164
        ], 
        "id": 35
    }, 
    {
        "code": "e_times=None", 
        "corresponding_lines": [
            609, 
            146
        ], 
        "id": 36
    }, 
    {
        "code": "elt_type=None", 
        "corresponding_lines": [
            146
        ], 
        "id": 37
    }, 
    {
        "code": "if count___2&gt;e_times:", 
        "corresponding_lines": [
            270
        ], 
        "id": 38
    }, 
    {
        "code": "e_most=element", 
        "corresponding_lines": [
            411, 
            842, 
            1136, 
            1111, 
            920, 
            153, 
            283
        ], 
        "id": 39
    }, 
    {
        "code": "e_times=count___2", 
        "corresponding_lines": [
            271
        ], 
        "id": 40
    }, 
    {
        "code": "elt_type=type(element)", 
        "corresponding_lines": [
            163
        ], 
        "id": 41
    }, 
    {
        "code": "return(e_most,e_times,elt_type)", 
        "corresponding_lines": [
            272
        ], 
        "id": 42
    }, 
    {
        "code": "if i__ not in L2:", 
        "corresponding_lines": [
            248, 
            603, 
            124, 
            1195, 
            1038
        ], 
        "id": 43
    }, 
    {
        "code": "L=[]", 
        "corresponding_lines": [
            194, 
            79
        ], 
        "id": 44
    }, 
    {
        "code": "for i in L1:", 
        "corresponding_lines": [
            32, 
            304, 
            1157, 
            91, 
            165, 
            647, 
            362, 
            999, 
            1228, 
            1328, 
            605, 
            16, 
            753, 
            1074, 
            511, 
            347, 
            1424, 
            285, 
            881
        ], 
        "id": 45
    }, 
    {
        "code": "if i not in L:", 
        "corresponding_lines": [
            197, 
            367
        ], 
        "id": 46
    }, 
    {
        "code": "L.append(i)", 
        "corresponding_lines": [
            368, 
            198
        ], 
        "id": 47
    }, 
    {
        "code": "for k in L:", 
        "corresponding_lines": [
            369
        ], 
        "id": 48
    }, 
    {
        "code": "if L1.count(k)!=L2.count(k):", 
        "corresponding_lines": [
            370
        ], 
        "id": 49
    }, 
    {
        "code": "Dict1={}", 
        "corresponding_lines": [
            134, 
            1286, 
            1386, 
            171, 
            15, 
            60, 
            31
        ], 
        "id": 50
    }, 
    {
        "code": "if i__ not in Dict1.keys():", 
        "corresponding_lines": [
            1258, 
            371
        ], 
        "id": 51
    }, 
    {
        "code": "Dict1[i__]=L1.count(i__)", 
        "corresponding_lines": [
            372
        ], 
        "id": 52
    }, 
    {
        "code": "max_count=max(Dict1.values())", 
        "corresponding_lines": [
            64, 
            1290, 
            731, 
            1245, 
            1310
        ], 
        "id": 53
    }, 
    {
        "code": "Gt=[]", 
        "corresponding_lines": [
            194, 
            37, 
            742, 
            425, 
            44, 
            79, 
            373
        ], 
        "id": 54
    }, 
    {
        "code": "for i__ in Dict1:", 
        "corresponding_lines": [
            374
        ], 
        "id": 55
    }, 
    {
        "code": "if Dict1[i__]==max_count:", 
        "corresponding_lines": [
            1312, 
            66, 
            1404
        ], 
        "id": 56
    }, 
    {
        "code": "Gt.append(i__)", 
        "corresponding_lines": [
            257, 
            1180, 
            93, 
            375
        ], 
        "id": 57
    }, 
    {
        "code": "return(Gt[0],max_count,type(Gt[0]))", 
        "corresponding_lines": [
            376
        ], 
        "id": 58
    }, 
    {
        "code": "L1_copy=L1[:]", 
        "corresponding_lines": [
            1314, 
            435
        ], 
        "id": 59
    }, 
    {
        "code": "L1_copy.sort()", 
        "corresponding_lines": [
            243
        ], 
        "id": 60
    }, 
    {
        "code": "L2___3=L2[:]", 
        "corresponding_lines": [
            436
        ], 
        "id": 61
    }, 
    {
        "code": "L2___3.sort()", 
        "corresponding_lines": [
            244
        ], 
        "id": 62
    }, 
    {
        "code": "if L1_copy!=L2___3:", 
        "corresponding_lines": [
            437
        ], 
        "id": 63
    }, 
    {
        "code": "if L1==[]:", 
        "corresponding_lines": [
            849, 
            588, 
            438
        ], 
        "id": 64
    }, 
    {
        "code": "maxitem=L1[0]", 
        "corresponding_lines": [
            1200, 
            1306, 
            1114, 
            229
        ], 
        "id": 65
    }, 
    {
        "code": "most_times=L1.count(maxitem)", 
        "corresponding_lines": [
            439
        ], 
        "id": 66
    }, 
    {
        "code": "for thing in L1:", 
        "corresponding_lines": [
            514, 
            61
        ], 
        "id": 67
    }, 
    {
        "code": "if L1.count(thing)&gt;most_times:", 
        "corresponding_lines": [
            440
        ], 
        "id": 68
    }, 
    {
        "code": "maxitem=thing", 
        "corresponding_lines": [
            441
        ], 
        "id": 69
    }, 
    {
        "code": "most_times=L1.count(thing)", 
        "corresponding_lines": [
            442
        ], 
        "id": 70
    }, 
    {
        "code": "return(maxitem,most_times,type(maxitem))", 
        "corresponding_lines": [
            235, 
            156
        ], 
        "id": 71
    }, 
    {
        "code": "for element___2 in L1:", 
        "corresponding_lines": [
            72, 
            1361, 
            237, 
            53, 
            231
        ], 
        "id": 72
    }, 
    {
        "code": "if L1.count(element___2)!=L2.count(element___2):", 
        "corresponding_lines": [
            73, 
            1364
        ], 
        "id": 73
    }, 
    {
        "code": "Type=None", 
        "corresponding_lines": [
            501
        ], 
        "id": 74
    }, 
    {
        "code": "Element=None", 
        "corresponding_lines": [
            501
        ], 
        "id": 75
    }, 
    {
        "code": "return(Element,Type,Type)", 
        "corresponding_lines": [
            502
        ], 
        "id": 76
    }, 
    {
        "code": "count=0", 
        "corresponding_lines": [
            96, 
            809, 
            1202, 
            179, 
            38
        ], 
        "id": 77
    }, 
    {
        "code": "if L1.count(element___2)&gt;count:", 
        "corresponding_lines": [
            409
        ], 
        "id": 78
    }, 
    {
        "code": "count=L1.count(element___2)", 
        "corresponding_lines": [
            410
        ], 
        "id": 79
    }, 
    {
        "code": "Element=element___2", 
        "corresponding_lines": [
            411
        ], 
        "id": 80
    }, 
    {
        "code": "Type=type(element___2)", 
        "corresponding_lines": [
            503
        ], 
        "id": 81
    }, 
    {
        "code": "return(Element,count,Type)", 
        "corresponding_lines": [
            504
        ], 
        "id": 82
    }, 
    {
        "code": "if element___2 not in L2:", 
        "corresponding_lines": [
            1362, 
            390
        ], 
        "id": 83
    }, 
    {
        "code": "element__=0", 
        "corresponding_lines": [
            179
        ], 
        "id": 84
    }, 
    {
        "code": "element__=L1.index(element___2)", 
        "corresponding_lines": [
            540
        ], 
        "id": 85
    }, 
    {
        "code": "tup=(L1[element__],count,type(L1[element__]))", 
        "corresponding_lines": [
            541
        ], 
        "id": 86
    }, 
    {
        "code": "return tup", 
        "corresponding_lines": [
            736, 
            360, 
            78, 
            977, 
            434, 
            499, 
            189, 
            702
        ], 
        "id": 87
    }, 
    {
        "code": "p=0", 
        "corresponding_lines": [
            96, 
            179, 
            38
        ], 
        "id": 88
    }, 
    {
        "code": "p=element___2", 
        "corresponding_lines": [
            566
        ], 
        "id": 89
    }, 
    {
        "code": "return(p,count,type(p))", 
        "corresponding_lines": [
            451, 
            156
        ], 
        "id": 90
    }, 
    {
        "code": "L1dict={}", 
        "corresponding_lines": [
            31
        ], 
        "id": 91
    }, 
    {
        "code": "L2_dict={}", 
        "corresponding_lines": [
            171, 
            31
        ], 
        "id": 92
    }, 
    {
        "code": "if len(L1)==0:", 
        "corresponding_lines": [
            486, 
            307, 
            1301, 
            630, 
            1434, 
            799
        ], 
        "id": 93
    }, 
    {
        "code": "if i in L1dict.keys():", 
        "corresponding_lines": [
            17
        ], 
        "id": 94
    }, 
    {
        "code": "L1dict[i]+=1", 
        "corresponding_lines": [
            18
        ], 
        "id": 95
    }, 
    {
        "code": "L1dict[i]=1", 
        "corresponding_lines": [
            19
        ], 
        "id": 96
    }, 
    {
        "code": "for char in L2:", 
        "corresponding_lines": [
            20, 
            125
        ], 
        "id": 97
    }, 
    {
        "code": "if char in L2_dict.keys():", 
        "corresponding_lines": [
            21
        ], 
        "id": 98
    }, 
    {
        "code": "L2_dict[char]+=1", 
        "corresponding_lines": [
            22
        ], 
        "id": 99
    }, 
    {
        "code": "L2_dict[char]=1", 
        "corresponding_lines": [
            23
        ], 
        "id": 100
    }, 
    {
        "code": "if not L1dict==L2_dict:", 
        "corresponding_lines": [
            676
        ], 
        "id": 101
    }, 
    {
        "code": "max_occuring_el=0", 
        "corresponding_lines": [
            179
        ], 
        "id": 102
    }, 
    {
        "code": "for key in L1dict.keys():", 
        "corresponding_lines": [
            677, 
            39
        ], 
        "id": 103
    }, 
    {
        "code": "if L1dict[key]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 104
    }, 
    {
        "code": "count=L1dict[key]", 
        "corresponding_lines": [
            41, 
            555
        ], 
        "id": 105
    }, 
    {
        "code": "max_occuring_el=key", 
        "corresponding_lines": [
            450
        ], 
        "id": 106
    }, 
    {
        "code": "return(max_occuring_el,count,type(max_occuring_el))", 
        "corresponding_lines": [
            156
        ], 
        "id": 107
    }, 
    {
        "code": "max_count__=-1", 
        "corresponding_lines": [
            748
        ], 
        "id": 108
    }, 
    {
        "code": "if L1.count(element)!=L2.count(element):", 
        "corresponding_lines": [
            225, 
            1061, 
            1062, 
            73, 
            623, 
            560, 
            1033, 
            1141, 
            311, 
            1307, 
            1173
        ], 
        "id": 109
    }, 
    {
        "code": "if L1.count(element)&gt;max_count__:", 
        "corresponding_lines": [
            749
        ], 
        "id": 110
    }, 
    {
        "code": "max_count__=L1.count(element)", 
        "corresponding_lines": [
            750
        ], 
        "id": 111
    }, 
    {
        "code": "max_tuple=(element,max_count__,type(element))", 
        "corresponding_lines": [
            751
        ], 
        "id": 112
    }, 
    {
        "code": "return max_tuple", 
        "corresponding_lines": [
            78
        ], 
        "id": 113
    }, 
    {
        "code": "def is_list_permutation(L1___2,L2___2):", 
        "corresponding_lines": [
            0
        ], 
        "id": 114
    }, 
    {
        "code": "if L1___2==[]and L2___2==[]:", 
        "corresponding_lines": [
            58
        ], 
        "id": 115
    }, 
    {
        "code": "if len(L1___2)!=len(L2___2):", 
        "corresponding_lines": [
            11, 
            157
        ], 
        "id": 116
    }, 
    {
        "code": "L1___2.sort()", 
        "corresponding_lines": [
            721
        ], 
        "id": 117
    }, 
    {
        "code": "L2___2.sort()", 
        "corresponding_lines": [
            722
        ], 
        "id": 118
    }, 
    {
        "code": "if L1___2!=L2___2:", 
        "corresponding_lines": [
            758
        ], 
        "id": 119
    }, 
    {
        "code": "for i___2 in L1___2:", 
        "corresponding_lines": [
            759
        ], 
        "id": 120
    }, 
    {
        "code": "if L1___2.count(i___2)&gt;count:", 
        "corresponding_lines": [
            760
        ], 
        "id": 121
    }, 
    {
        "code": "count=L1___2.count(i___2)", 
        "corresponding_lines": [
            761
        ], 
        "id": 122
    }, 
    {
        "code": "max_occuring_el=i___2", 
        "corresponding_lines": [
            450
        ], 
        "id": 123
    }, 
    {
        "code": "if len(L1)==0 and len(L2)==0:", 
        "corresponding_lines": [
            228, 
            460, 
            12, 
            413
        ], 
        "id": 124
    }, 
    {
        "code": "elif len(L1)!=len(L2):", 
        "corresponding_lines": [
            762, 
            788, 
            250
        ], 
        "id": 125
    }, 
    {
        "code": "times_el_occurs=L1.count(element)", 
        "corresponding_lines": [
            763
        ], 
        "id": 126
    }, 
    {
        "code": "if times_el_occurs&gt;y:", 
        "corresponding_lines": [
            162
        ], 
        "id": 127
    }, 
    {
        "code": "y=times_el_occurs", 
        "corresponding_lines": [
            152
        ], 
        "id": 128
    }, 
    {
        "code": "most_often_elem=element", 
        "corresponding_lines": [
            75
        ], 
        "id": 129
    }, 
    {
        "code": "return(most_often_elem,y,type(most_often_elem))", 
        "corresponding_lines": [
            156
        ], 
        "id": 130
    }, 
    {
        "code": "if not len(L1)==len(L2):", 
        "corresponding_lines": [
            764
        ], 
        "id": 131
    }, 
    {
        "code": "counts={}", 
        "corresponding_lines": [
            171
        ], 
        "id": 132
    }, 
    {
        "code": "if not L1.count(element)==L2.count(element):", 
        "corresponding_lines": [
            765
        ], 
        "id": 133
    }, 
    {
        "code": "counts[element]=L1.count(element)", 
        "corresponding_lines": [
            766
        ], 
        "id": 134
    }, 
    {
        "code": "if counts:", 
        "corresponding_lines": [
            767
        ], 
        "id": 135
    }, 
    {
        "code": "items=counts.items()", 
        "corresponding_lines": [
            768
        ], 
        "id": 136
    }, 
    {
        "code": "max_el=items[0][0]", 
        "corresponding_lines": [
            769
        ], 
        "id": 137
    }, 
    {
        "code": "most_times=items[0][1]", 
        "corresponding_lines": [
            770
        ], 
        "id": 138
    }, 
    {
        "code": "most_type=type(max_el)", 
        "corresponding_lines": [
            771
        ], 
        "id": 139
    }, 
    {
        "code": "for c in items:", 
        "corresponding_lines": [
            772
        ], 
        "id": 140
    }, 
    {
        "code": "if c[1]&gt;most_times:", 
        "corresponding_lines": [
            773
        ], 
        "id": 141
    }, 
    {
        "code": "max_el=c[0]", 
        "corresponding_lines": [
            774
        ], 
        "id": 142
    }, 
    {
        "code": "most_times=c[1]", 
        "corresponding_lines": [
            775
        ], 
        "id": 143
    }, 
    {
        "code": "most_type=type(c[0])", 
        "corresponding_lines": [
            776
        ], 
        "id": 144
    }, 
    {
        "code": "return(max_el,most_times,most_type)", 
        "corresponding_lines": [
            777
        ], 
        "id": 145
    }, 
    {
        "code": "mostelement=None", 
        "corresponding_lines": [
            146
        ], 
        "id": 146
    }, 
    {
        "code": "mosttimes=None", 
        "corresponding_lines": [
            146
        ], 
        "id": 147
    }, 
    {
        "code": "isperm=len(L1)==len(L2)", 
        "corresponding_lines": [
            815
        ], 
        "id": 148
    }, 
    {
        "code": "isperm=isperm and L1.count(i__)==L2.count(i__)", 
        "corresponding_lines": [
            816
        ], 
        "id": 149
    }, 
    {
        "code": "if L1.count(i__)&gt;mosttimes:", 
        "corresponding_lines": [
            817
        ], 
        "id": 150
    }, 
    {
        "code": "mostelement=i__", 
        "corresponding_lines": [
            818
        ], 
        "id": 151
    }, 
    {
        "code": "mosttimes=L1.count(i__)", 
        "corresponding_lines": [
            819
        ], 
        "id": 152
    }, 
    {
        "code": "elt_type=type(i__)", 
        "corresponding_lines": [
            820
        ], 
        "id": 153
    }, 
    {
        "code": "if isperm:", 
        "corresponding_lines": [
            821
        ], 
        "id": 154
    }, 
    {
        "code": "return(mostelement,mosttimes,elt_type)", 
        "corresponding_lines": [
            272
        ], 
        "id": 155
    }, 
    {
        "code": "elements_L1={}", 
        "corresponding_lines": [
            15
        ], 
        "id": 156
    }, 
    {
        "code": "elements_L2={}", 
        "corresponding_lines": [
            31, 
            15
        ], 
        "id": 157
    }, 
    {
        "code": "for i___3 in range(len(L1)):", 
        "corresponding_lines": [
            640, 
            1028, 
            166, 
            584, 
            45, 
            542
        ], 
        "id": 158
    }, 
    {
        "code": "if L1[i___3]not in elements_L1:", 
        "corresponding_lines": [
            903
        ], 
        "id": 159
    }, 
    {
        "code": "elements_L1[L1[i___3]]=1", 
        "corresponding_lines": [
            904
        ], 
        "id": 160
    }, 
    {
        "code": "elements_L1[L1[i___3]]+=1", 
        "corresponding_lines": [
            905
        ], 
        "id": 161
    }, 
    {
        "code": "for i___3 in range(len(L2)):", 
        "corresponding_lines": [
            906, 
            1030, 
            550, 
            879
        ], 
        "id": 162
    }, 
    {
        "code": "if L2[i___3]not in elements_L2:", 
        "corresponding_lines": [
            907
        ], 
        "id": 163
    }, 
    {
        "code": "elements_L2[L2[i___3]]=1", 
        "corresponding_lines": [
            908
        ], 
        "id": 164
    }, 
    {
        "code": "elements_L2[L2[i___3]]+=1", 
        "corresponding_lines": [
            909
        ], 
        "id": 165
    }, 
    {
        "code": "if elements_L1!=elements_L2:", 
        "corresponding_lines": [
            910
        ], 
        "id": 166
    }, 
    {
        "code": "max_key=\"\"", 
        "corresponding_lines": [
            180, 
            1197
        ], 
        "id": 167
    }, 
    {
        "code": "for key in elements_L1.keys():", 
        "corresponding_lines": [
            677
        ], 
        "id": 168
    }, 
    {
        "code": "if elements_L1[key]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 169
    }, 
    {
        "code": "count=elements_L1[key]", 
        "corresponding_lines": [
            41
        ], 
        "id": 170
    }, 
    {
        "code": "max_key=key", 
        "corresponding_lines": [
            144, 
            1249
        ], 
        "id": 171
    }, 
    {
        "code": "return(max_key,count,type(max_key))", 
        "corresponding_lines": [
            156
        ], 
        "id": 172
    }, 
    {
        "code": "num_most=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 173
    }, 
    {
        "code": "val_most=''", 
        "corresponding_lines": [
            377
        ], 
        "id": 174
    }, 
    {
        "code": "type_most=int", 
        "corresponding_lines": [
            923
        ], 
        "id": 175
    }, 
    {
        "code": "if count___2&gt;num_most:", 
        "corresponding_lines": [
            924, 
            973
        ], 
        "id": 176
    }, 
    {
        "code": "num_most=count___2", 
        "corresponding_lines": [
            925
        ], 
        "id": 177
    }, 
    {
        "code": "val_most=element", 
        "corresponding_lines": [
            926
        ], 
        "id": 178
    }, 
    {
        "code": "type_most=type(element)", 
        "corresponding_lines": [
            927
        ], 
        "id": 179
    }, 
    {
        "code": "if count___2!=L2.count(element):", 
        "corresponding_lines": [
            928
        ], 
        "id": 180
    }, 
    {
        "code": "return(val_most,num_most,type_most)", 
        "corresponding_lines": [
            929
        ], 
        "id": 181
    }, 
    {
        "code": "for i__ in range(len(L1)):", 
        "corresponding_lines": [
            1048, 
            381, 
            469, 
            591
        ], 
        "id": 182
    }, 
    {
        "code": "if L1.count(L1[i__])!=L2.count(L1[i__]):", 
        "corresponding_lines": [
            512, 
            945, 
            808, 
            471
        ], 
        "id": 183
    }, 
    {
        "code": "counts=[]", 
        "corresponding_lines": [
            44, 
            373, 
            79
        ], 
        "id": 184
    }, 
    {
        "code": "for j in range(len(L1)):", 
        "corresponding_lines": [
            711, 
            45, 
            593, 
            476, 
            669, 
            575
        ], 
        "id": 185
    }, 
    {
        "code": "counts.append(L1.count(L1[j]))", 
        "corresponding_lines": [
            48, 
            1049
        ], 
        "id": 186
    }, 
    {
        "code": "max_count=max(counts)", 
        "corresponding_lines": [
            632, 
            49, 
            1133, 
            509, 
            625
        ], 
        "id": 187
    }, 
    {
        "code": "max_element=L1[counts.index(max_count)]", 
        "corresponding_lines": [
            1050
        ], 
        "id": 188
    }, 
    {
        "code": "return(max_element,max_count,type(max_element))", 
        "corresponding_lines": [
            156
        ], 
        "id": 189
    }, 
    {
        "code": "elements1={}", 
        "corresponding_lines": [
            15
        ], 
        "id": 190
    }, 
    {
        "code": "for element___3 in L1:", 
        "corresponding_lines": [
            16, 
            32
        ], 
        "id": 191
    }, 
    {
        "code": "if element___3 not in elements1.keys():", 
        "corresponding_lines": [
            1091
        ], 
        "id": 192
    }, 
    {
        "code": "elements1[element___3]=L1.count(element___3)", 
        "corresponding_lines": [
            1092
        ], 
        "id": 193
    }, 
    {
        "code": "elements2={}", 
        "corresponding_lines": [
            15
        ], 
        "id": 194
    }, 
    {
        "code": "for element___3 in L2:", 
        "corresponding_lines": [
            34, 
            1093
        ], 
        "id": 195
    }, 
    {
        "code": "if element___3 not in elements2.keys():", 
        "corresponding_lines": [
            1094
        ], 
        "id": 196
    }, 
    {
        "code": "elements2[element___3]=L2.count(element___3)", 
        "corresponding_lines": [
            1095
        ], 
        "id": 197
    }, 
    {
        "code": "for key___2 in elements1.keys():", 
        "corresponding_lines": [
            1096, 
            1098
        ], 
        "id": 198
    }, 
    {
        "code": "if key___2 not in elements2.keys()or elements1[key___2]!=elements2[key___2]:", 
        "corresponding_lines": [
            1097
        ], 
        "id": 199
    }, 
    {
        "code": "max_key=''", 
        "corresponding_lines": [
            704, 
            377, 
            1388
        ], 
        "id": 200
    }, 
    {
        "code": "if elements1[key___2]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 201
    }, 
    {
        "code": "count=elements1[key___2]", 
        "corresponding_lines": [
            41
        ], 
        "id": 202
    }, 
    {
        "code": "max_key=key___2", 
        "corresponding_lines": [
            144
        ], 
        "id": 203
    }, 
    {
        "code": "return(max_key,elements1[max_key],type(max_key))", 
        "corresponding_lines": [
            1099
        ], 
        "id": 204
    }, 
    {
        "code": "if not L1 and not L2:", 
        "corresponding_lines": [
            1113
        ], 
        "id": 205
    }, 
    {
        "code": "most_common=L1[0]", 
        "corresponding_lines": [
            1114
        ], 
        "id": 206
    }, 
    {
        "code": "most_common_count=L1.count(L1[0])", 
        "corresponding_lines": [
            401, 
            1115
        ], 
        "id": 207
    }, 
    {
        "code": "if count___2&gt;most_common_count:", 
        "corresponding_lines": [
            1116
        ], 
        "id": 208
    }, 
    {
        "code": "most_common=element", 
        "corresponding_lines": [
            441
        ], 
        "id": 209
    }, 
    {
        "code": "most_common_count=count___2", 
        "corresponding_lines": [
            1117
        ], 
        "id": 210
    }, 
    {
        "code": "return(most_common,most_common_count,type(most_common))", 
        "corresponding_lines": [
            156
        ], 
        "id": 211
    }, 
    {
        "code": "elif len(L1)==0:", 
        "corresponding_lines": [
            785, 
            178, 
            1435, 
            389
        ], 
        "id": 212
    }, 
    {
        "code": "if not element in L2 or L1.count(element)!=L2.count(element):", 
        "corresponding_lines": [
            1142
        ], 
        "id": 213
    }, 
    {
        "code": "if L1.count(element)&gt;L1.count(most_common):", 
        "corresponding_lines": [
            1143
        ], 
        "id": 214
    }, 
    {
        "code": "return(most_common,L1.count(most_common),type(most_common))", 
        "corresponding_lines": [
            1067
        ], 
        "id": 215
    }, 
    {
        "code": "if sorted(L1)!=sorted(L2):", 
        "corresponding_lines": [
            1165
        ], 
        "id": 216
    }, 
    {
        "code": "d1={}", 
        "corresponding_lines": [
            60
        ], 
        "id": 217
    }, 
    {
        "code": "if thing in d1:", 
        "corresponding_lines": [
            1166
        ], 
        "id": 218
    }, 
    {
        "code": "d1[thing]+=1", 
        "corresponding_lines": [
            1167
        ], 
        "id": 219
    }, 
    {
        "code": "d1[thing]=1", 
        "corresponding_lines": [
            1168
        ], 
        "id": 220
    }, 
    {
        "code": "output=(None,0,None)", 
        "corresponding_lines": [
            1169
        ], 
        "id": 221
    }, 
    {
        "code": "for key in d1:", 
        "corresponding_lines": [
            65
        ], 
        "id": 222
    }, 
    {
        "code": "if d1[key]&gt;output[1]:", 
        "corresponding_lines": [
            1170
        ], 
        "id": 223
    }, 
    {
        "code": "output=(key,d1[key],type(key))", 
        "corresponding_lines": [
            1171
        ], 
        "id": 224
    }, 
    {
        "code": "return output", 
        "corresponding_lines": [
            78
        ], 
        "id": 225
    }, 
    {
        "code": "if len(L1___2)==len(L2___2)==0:", 
        "corresponding_lines": [
            1144
        ], 
        "id": 226
    }, 
    {
        "code": "uniques1=[]", 
        "corresponding_lines": [
            194
        ], 
        "id": 227
    }, 
    {
        "code": "counts1=[]", 
        "corresponding_lines": [
            194, 
            37
        ], 
        "id": 228
    }, 
    {
        "code": "for i__ in L1___2:", 
        "corresponding_lines": [
            1186
        ], 
        "id": 229
    }, 
    {
        "code": "if i__ not in uniques1:", 
        "corresponding_lines": [
            1187, 
            1191
        ], 
        "id": 230
    }, 
    {
        "code": "uniques1.append(i__)", 
        "corresponding_lines": [
            1188
        ], 
        "id": 231
    }, 
    {
        "code": "counts1.append(L1___2.count(i__))", 
        "corresponding_lines": [
            1189
        ], 
        "id": 232
    }, 
    {
        "code": "counts2=[]", 
        "corresponding_lines": [
            194
        ], 
        "id": 233
    }, 
    {
        "code": "for i__ in L2___2:", 
        "corresponding_lines": [
            1190
        ], 
        "id": 234
    }, 
    {
        "code": "counts2.append(L2___2.count(i__))", 
        "corresponding_lines": [
            1192
        ], 
        "id": 235
    }, 
    {
        "code": "if uniques1!=uniques1 or counts1!=counts2:", 
        "corresponding_lines": [
            1193
        ], 
        "id": 236
    }, 
    {
        "code": "return(uniques1[counts1.index(max(counts1))],max(counts1),type(uniques1[counts1.index(max(counts1))]))", 
        "corresponding_lines": [
            1194
        ], 
        "id": 237
    }, 
    {
        "code": "def is_list_permutation(L1_copy,L2___3):", 
        "corresponding_lines": [
            0
        ], 
        "id": 238
    }, 
    {
        "code": "most_repeat=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 239
    }, 
    {
        "code": "elif L1_copy==[]:", 
        "corresponding_lines": [
            1231
        ], 
        "id": 240
    }, 
    {
        "code": "if L2___3==[]:", 
        "corresponding_lines": [
            1232, 
            1340
        ], 
        "id": 241
    }, 
    {
        "code": "for i___2 in L1_copy:", 
        "corresponding_lines": [
            759
        ], 
        "id": 242
    }, 
    {
        "code": "repeated=L1_copy.count(i___2)", 
        "corresponding_lines": [
            1233
        ], 
        "id": 243
    }, 
    {
        "code": "if repeated&gt;most_repeat:", 
        "corresponding_lines": [
            1234
        ], 
        "id": 244
    }, 
    {
        "code": "most_repeat=repeated", 
        "corresponding_lines": [
            706
        ], 
        "id": 245
    }, 
    {
        "code": "max_el=i___2", 
        "corresponding_lines": [
            1235
        ], 
        "id": 246
    }, 
    {
        "code": "what_type=type(i___2)", 
        "corresponding_lines": [
            1236
        ], 
        "id": 247
    }, 
    {
        "code": "return(max_el,most_repeat,what_type)", 
        "corresponding_lines": [
            1237
        ], 
        "id": 248
    }, 
    {
        "code": "counts=None", 
        "corresponding_lines": [
            146
        ], 
        "id": 249
    }, 
    {
        "code": "elt=None", 
        "corresponding_lines": [
            146
        ], 
        "id": 250
    }, 
    {
        "code": "if element___3 not in L1dict.keys():", 
        "corresponding_lines": [
            1258
        ], 
        "id": 251
    }, 
    {
        "code": "L1dict[element___3]=1", 
        "corresponding_lines": [
            19
        ], 
        "id": 252
    }, 
    {
        "code": "elif element___3 in L1dict.keys():", 
        "corresponding_lines": [
            1259
        ], 
        "id": 253
    }, 
    {
        "code": "L1dict[element___3]+=1", 
        "corresponding_lines": [
            18
        ], 
        "id": 254
    }, 
    {
        "code": "if element___3 not in L2_dict.keys():", 
        "corresponding_lines": [
            1260
        ], 
        "id": 255
    }, 
    {
        "code": "L2_dict[element___3]=1", 
        "corresponding_lines": [
            23
        ], 
        "id": 256
    }, 
    {
        "code": "elif element___3 in L2_dict.keys():", 
        "corresponding_lines": [
            1261
        ], 
        "id": 257
    }, 
    {
        "code": "L2_dict[element___3]+=1", 
        "corresponding_lines": [
            22
        ], 
        "id": 258
    }, 
    {
        "code": "for key___2 in L1dict.keys():", 
        "corresponding_lines": [
            1264, 
            1262
        ], 
        "id": 259
    }, 
    {
        "code": "if L1dict[key___2]!=L2_dict[key___2]:", 
        "corresponding_lines": [
            1263
        ], 
        "id": 260
    }, 
    {
        "code": "if L1dict[key___2]&gt;counts:", 
        "corresponding_lines": [
            1265
        ], 
        "id": 261
    }, 
    {
        "code": "counts=L1dict[key___2]", 
        "corresponding_lines": [
            1266
        ], 
        "id": 262
    }, 
    {
        "code": "elt_type=type(key___2)", 
        "corresponding_lines": [
            613
        ], 
        "id": 263
    }, 
    {
        "code": "elt=key___2", 
        "corresponding_lines": [
            612
        ], 
        "id": 264
    }, 
    {
        "code": "return(elt,counts,elt_type)", 
        "corresponding_lines": [
            272
        ], 
        "id": 265
    }, 
    {
        "code": "x=0", 
        "corresponding_lines": [
            96, 
            897, 
            258, 
            294, 
            71, 
            424, 
            715, 
            712, 
            179
        ], 
        "id": 266
    }, 
    {
        "code": "elif L1==[]and L2==[]:", 
        "corresponding_lines": [
            80, 
            747, 
            350
        ], 
        "id": 267
    }, 
    {
        "code": "if i in L2:", 
        "corresponding_lines": [
            259, 
            1425, 
            363, 
            1229, 
            305, 
            754, 
            195, 
            1022
        ], 
        "id": 268
    }, 
    {
        "code": "if L1.count(i)==L2.count(i):", 
        "corresponding_lines": [
            1330, 
            196
        ], 
        "id": 269
    }, 
    {
        "code": "x+=1", 
        "corresponding_lines": [
            717, 
            547, 
            900, 
            805, 
            648, 
            169, 
            650, 
            428, 
            365, 
            714, 
            399, 
            464, 
            787, 
            276, 
            1102, 
            1401, 
            729, 
            794, 
            719, 
            349
        ], 
        "id": 270
    }, 
    {
        "code": "if L1.count(i)&gt;y:", 
        "corresponding_lines": [
            357, 
            199
        ], 
        "id": 271
    }, 
    {
        "code": "y=L1.count(i)", 
        "corresponding_lines": [
            1274, 
            76, 
            358
        ], 
        "id": 272
    }, 
    {
        "code": "most_often_elem=i", 
        "corresponding_lines": [
            75
        ], 
        "id": 273
    }, 
    {
        "code": "if x==len(L1):", 
        "corresponding_lines": [
            960, 
            170, 
            1230, 
            882, 
            1271, 
            795, 
            1086
        ], 
        "id": 274
    }, 
    {
        "code": "return(most_often_elem,L1.count(most_often_elem),type(most_often_elem))", 
        "corresponding_lines": [
            1067
        ], 
        "id": 275
    }, 
    {
        "code": "def signature(L):", 
        "corresponding_lines": [
            1342
        ], 
        "id": 276
    }, 
    {
        "code": "s={}", 
        "corresponding_lines": [
            1343
        ], 
        "id": 277
    }, 
    {
        "code": "for e in L:", 
        "corresponding_lines": [
            1344
        ], 
        "id": 278
    }, 
    {
        "code": "s[e]=s.get(e,0)+1", 
        "corresponding_lines": [
            1345
        ], 
        "id": 279
    }, 
    {
        "code": "return s", 
        "corresponding_lines": [
            1346
        ], 
        "id": 280
    }, 
    {
        "code": "sig1=signature(L1)", 
        "corresponding_lines": [
            1347
        ], 
        "id": 281
    }, 
    {
        "code": "for e in L2:", 
        "corresponding_lines": [
            84, 
            1348
        ], 
        "id": 282
    }, 
    {
        "code": "if sig1.get(e,0)==0:", 
        "corresponding_lines": [
            1349
        ], 
        "id": 283
    }, 
    {
        "code": "sig1[e]-=1", 
        "corresponding_lines": [
            1350
        ], 
        "id": 284
    }, 
    {
        "code": "sig=signature(L1)", 
        "corresponding_lines": [
            1351
        ], 
        "id": 285
    }, 
    {
        "code": "max_el=None", 
        "corresponding_lines": [
            181
        ], 
        "id": 286
    }, 
    {
        "code": "for key in sig.keys():", 
        "corresponding_lines": [
            677
        ], 
        "id": 287
    }, 
    {
        "code": "if sig[key]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 288
    }, 
    {
        "code": "count=sig[key]", 
        "corresponding_lines": [
            41
        ], 
        "id": 289
    }, 
    {
        "code": "max_el=key", 
        "corresponding_lines": [
            1241, 
            612
        ], 
        "id": 290
    }, 
    {
        "code": "return(max_el,count,type(max_el))", 
        "corresponding_lines": [
            156
        ], 
        "id": 291
    }, 
    {
        "code": "if len(L2)&gt;len(L1):", 
        "corresponding_lines": [
            1352
        ], 
        "id": 292
    }, 
    {
        "code": "longest=L2", 
        "corresponding_lines": [
            1353
        ], 
        "id": 293
    }, 
    {
        "code": "longest=L1", 
        "corresponding_lines": [
            1354
        ], 
        "id": 294
    }, 
    {
        "code": "if len(L2)==0 and len(L1)==0:", 
        "corresponding_lines": [
            1355
        ], 
        "id": 295
    }, 
    {
        "code": "if all(L1.count(i__)==L2.count(i__)for i__ in longest):", 
        "corresponding_lines": [
            1356
        ], 
        "id": 296
    }, 
    {
        "code": "if L1.count(i__)&gt;L1.count(maxitem):", 
        "corresponding_lines": [
            1357
        ], 
        "id": 297
    }, 
    {
        "code": "maxitem=i__", 
        "corresponding_lines": [
            441
        ], 
        "id": 298
    }, 
    {
        "code": "return(maxitem,L1.count(maxitem),type(maxitem))", 
        "corresponding_lines": [
            1073, 
            1067, 
            1045
        ], 
        "id": 299
    }, 
    {
        "code": "c=L1.count(element___2)", 
        "corresponding_lines": [
            62
        ], 
        "id": 300
    }, 
    {
        "code": "if c&gt;count:", 
        "corresponding_lines": [
            705
        ], 
        "id": 301
    }, 
    {
        "code": "count=c", 
        "corresponding_lines": [
            706
        ], 
        "id": 302
    }, 
    {
        "code": "count_list=[]", 
        "corresponding_lines": [
            194, 
            44
        ], 
        "id": 303
    }, 
    {
        "code": "count_list.append(count___2)", 
        "corresponding_lines": [
            215
        ], 
        "id": 304
    }, 
    {
        "code": "max_count=max(count_list)", 
        "corresponding_lines": [
            632, 
            216
        ], 
        "id": 305
    }, 
    {
        "code": "want_index=count_list.index(max_count)", 
        "corresponding_lines": [
            217
        ], 
        "id": 306
    }, 
    {
        "code": "max_element=L1[want_index]", 
        "corresponding_lines": [
            218
        ], 
        "id": 307
    }, 
    {
        "code": "if len(L1___2)==0:", 
        "corresponding_lines": [
            486
        ], 
        "id": 308
    }, 
    {
        "code": "for i__ in xrange(len(L1___2)):", 
        "corresponding_lines": [
            1417
        ], 
        "id": 309
    }, 
    {
        "code": "if L1___2[i__]!=L2___2[i__]:", 
        "corresponding_lines": [
            726
        ], 
        "id": 310
    }, 
    {
        "code": "d={}", 
        "corresponding_lines": [
            60, 
            31
        ], 
        "id": 311
    }, 
    {
        "code": "for el in L1___2:", 
        "corresponding_lines": [
            759
        ], 
        "id": 312
    }, 
    {
        "code": "if el in d:", 
        "corresponding_lines": [
            447
        ], 
        "id": 313
    }, 
    {
        "code": "d[el]+=1", 
        "corresponding_lines": [
            448
        ], 
        "id": 314
    }, 
    {
        "code": "d[el]=1", 
        "corresponding_lines": [
            449
        ], 
        "id": 315
    }, 
    {
        "code": "for el in d:", 
        "corresponding_lines": [
            1418
        ], 
        "id": 316
    }, 
    {
        "code": "if count&lt;d[el]:", 
        "corresponding_lines": [
            1419
        ], 
        "id": 317
    }, 
    {
        "code": "max_el=el", 
        "corresponding_lines": [
            612
        ], 
        "id": 318
    }, 
    {
        "code": "count=d[el]", 
        "corresponding_lines": [
            41
        ], 
        "id": 319
    }, 
    {
        "code": "char_freq={}", 
        "corresponding_lines": [
            171, 
            445
        ], 
        "id": 320
    }, 
    {
        "code": "for char in L1:", 
        "corresponding_lines": [
            53
        ], 
        "id": 321
    }, 
    {
        "code": "if L1.count(char)!=L2.count(char):", 
        "corresponding_lines": [
            73
        ], 
        "id": 322
    }, 
    {
        "code": "if char in char_freq:", 
        "corresponding_lines": [
            1420
        ], 
        "id": 323
    }, 
    {
        "code": "char_freq[char]+=1", 
        "corresponding_lines": [
            1167
        ], 
        "id": 324
    }, 
    {
        "code": "char_freq[char]=1", 
        "corresponding_lines": [
            1421
        ], 
        "id": 325
    }, 
    {
        "code": "count__=0", 
        "corresponding_lines": [
            96, 
            38
        ], 
        "id": 326
    }, 
    {
        "code": "char_most=''", 
        "corresponding_lines": [
            142
        ], 
        "id": 327
    }, 
    {
        "code": "for char in char_freq:", 
        "corresponding_lines": [
            1422
        ], 
        "id": 328
    }, 
    {
        "code": "if char_freq[char]&gt;count__:", 
        "corresponding_lines": [
            40
        ], 
        "id": 329
    }, 
    {
        "code": "count__=char_freq[char]", 
        "corresponding_lines": [
            41
        ], 
        "id": 330
    }, 
    {
        "code": "char_most=char", 
        "corresponding_lines": [
            144
        ], 
        "id": 331
    }, 
    {
        "code": "if count__==0:", 
        "corresponding_lines": [
            1371, 
            1423
        ], 
        "id": 332
    }, 
    {
        "code": "tup=(char_most,count__,type(char_most))", 
        "corresponding_lines": [
            77
        ], 
        "id": 333
    }, 
    {
        "code": "for element in L2:", 
        "corresponding_lines": [
            34, 
            867, 
            1093, 
            6, 
            1288, 
            649, 
            1393, 
            884, 
            536, 
            1332, 
            446, 
            383
        ], 
        "id": 334
    }, 
    {
        "code": "return True", 
        "corresponding_lines": [
            10
        ], 
        "id": 335
    }, 
    {
        "code": "if i in elements_L1.keys():", 
        "corresponding_lines": [
            17
        ], 
        "id": 336
    }, 
    {
        "code": "elements_L1[i]+=1", 
        "corresponding_lines": [
            18
        ], 
        "id": 337
    }, 
    {
        "code": "elements_L1[i]=1", 
        "corresponding_lines": [
            19
        ], 
        "id": 338
    }, 
    {
        "code": "for i in L2:", 
        "corresponding_lines": [
            32, 
            34, 
            1159, 
            649, 
            20, 
            825, 
            756, 
            91, 
            1021
        ], 
        "id": 339
    }, 
    {
        "code": "if i in elements_L2.keys():", 
        "corresponding_lines": [
            21
        ], 
        "id": 340
    }, 
    {
        "code": "elements_L2[i]+=1", 
        "corresponding_lines": [
            22
        ], 
        "id": 341
    }, 
    {
        "code": "elements_L2[i]=1", 
        "corresponding_lines": [
            23
        ], 
        "id": 342
    }, 
    {
        "code": "for i__ in elements_L1:", 
        "corresponding_lines": [
            24
        ], 
        "id": 343
    }, 
    {
        "code": "if i__ not in elements_L2.keys():", 
        "corresponding_lines": [
            25
        ], 
        "id": 344
    }, 
    {
        "code": "elif elements_L2[i__]!=elements_L1[i__]:", 
        "corresponding_lines": [
            26
        ], 
        "id": 345
    }, 
    {
        "code": "most_frequent=max(elements_L2,key=elements_L2.get)", 
        "corresponding_lines": [
            27
        ], 
        "id": 346
    }, 
    {
        "code": "max_count=elements_L2[most_frequent]", 
        "corresponding_lines": [
            28
        ], 
        "id": 347
    }, 
    {
        "code": "most_frequent_type=type(most_frequent)", 
        "corresponding_lines": [
            29
        ], 
        "id": 348
    }, 
    {
        "code": "return(most_frequent,max_count,most_frequent_type)", 
        "corresponding_lines": [
            30
        ], 
        "id": 349
    }, 
    {
        "code": "if i not in L1dict:", 
        "corresponding_lines": [
            33
        ], 
        "id": 350
    }, 
    {
        "code": "if i not in L2_dict:", 
        "corresponding_lines": [
            35
        ], 
        "id": 351
    }, 
    {
        "code": "L2_dict[i]=1", 
        "corresponding_lines": [
            23
        ], 
        "id": 352
    }, 
    {
        "code": "L2_dict[i]+=1", 
        "corresponding_lines": [
            22, 
            807
        ], 
        "id": 353
    }, 
    {
        "code": "if L1dict==L2_dict:", 
        "corresponding_lines": [
            36
        ], 
        "id": 354
    }, 
    {
        "code": "if L1dict[key]&gt;count__:", 
        "corresponding_lines": [
            40
        ], 
        "id": 355
    }, 
    {
        "code": "count__=L1dict[key]", 
        "corresponding_lines": [
            41
        ], 
        "id": 356
    }, 
    {
        "code": "Gt.append(key)", 
        "corresponding_lines": [
            42
        ], 
        "id": 357
    }, 
    {
        "code": "return(Gt[-1],count__,type(Gt[-1]))", 
        "corresponding_lines": [
            43
        ], 
        "id": 358
    }, 
    {
        "code": "if L1[j]in L2:", 
        "corresponding_lines": [
            46
        ], 
        "id": 359
    }, 
    {
        "code": "L2.remove(L1[j])", 
        "corresponding_lines": [
            47
        ], 
        "id": 360
    }, 
    {
        "code": "return(L1[counts.index(max_count)],max_count,type(L1[counts.index(max_count)]))", 
        "corresponding_lines": [
            50
        ], 
        "id": 361
    }, 
    {
        "code": "if not sorted(L1)==sorted(L2):", 
        "corresponding_lines": [
            59
        ], 
        "id": 362
    }, 
    {
        "code": "c=L1.count(thing)", 
        "corresponding_lines": [
            62
        ], 
        "id": 363
    }, 
    {
        "code": "Dict1[thing]=c", 
        "corresponding_lines": [
            63
        ], 
        "id": 364
    }, 
    {
        "code": "for key in Dict1:", 
        "corresponding_lines": [
            65, 
            732, 
            1389
        ], 
        "id": 365
    }, 
    {
        "code": "if Dict1[key]==max_count:", 
        "corresponding_lines": [
            66, 
            733
        ], 
        "id": 366
    }, 
    {
        "code": "e_most=key", 
        "corresponding_lines": [
            67
        ], 
        "id": 367
    }, 
    {
        "code": "return(e_most,max_count,type(e_most))", 
        "corresponding_lines": [
            1138, 
            68
        ], 
        "id": 368
    }, 
    {
        "code": "elif L1==[]:", 
        "corresponding_lines": [
            69
        ], 
        "id": 369
    }, 
    {
        "code": "return None", 
        "corresponding_lines": [
            70
        ], 
        "id": 370
    }, 
    {
        "code": "if L1.count(element)&gt;num_of_element:", 
        "corresponding_lines": [
            74
        ], 
        "id": 371
    }, 
    {
        "code": "num_of_element=L1.count(element)", 
        "corresponding_lines": [
            76
        ], 
        "id": 372
    }, 
    {
        "code": "tup=(most_often_elem,num_of_element,type(most_often_elem))", 
        "corresponding_lines": [
            77
        ], 
        "id": 373
    }, 
    {
        "code": "sumL1=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 374
    }, 
    {
        "code": "sumL2=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 375
    }, 
    {
        "code": "x1=sum(i__)", 
        "corresponding_lines": [
            82
        ], 
        "id": 376
    }, 
    {
        "code": "sumL1.append(x1)", 
        "corresponding_lines": [
            83
        ], 
        "id": 377
    }, 
    {
        "code": "x2=sum(e)", 
        "corresponding_lines": [
            85
        ], 
        "id": 378
    }, 
    {
        "code": "sumeL2.append(x2)", 
        "corresponding_lines": [
            86
        ], 
        "id": 379
    }, 
    {
        "code": "for n in sumL1:", 
        "corresponding_lines": [
            87
        ], 
        "id": 380
    }, 
    {
        "code": "if n in sumL2:", 
        "corresponding_lines": [
            88
        ], 
        "id": 381
    }, 
    {
        "code": "for m in sumL2:", 
        "corresponding_lines": [
            89
        ], 
        "id": 382
    }, 
    {
        "code": "if m in sumL1:", 
        "corresponding_lines": [
            90
        ], 
        "id": 383
    }, 
    {
        "code": "for i__ in L2:", 
        "corresponding_lines": [
            34, 
            521, 
            1039, 
            505, 
            91, 
            125, 
            862
        ], 
        "id": 384
    }, 
    {
        "code": "if i__==e:", 
        "corresponding_lines": [
            92
        ], 
        "id": 385
    }, 
    {
        "code": "c=max(i__)", 
        "corresponding_lines": [
            94
        ], 
        "id": 386
    }, 
    {
        "code": "return(c,type(c))", 
        "corresponding_lines": [
            95
        ], 
        "id": 387
    }, 
    {
        "code": "L1=L1", 
        "corresponding_lines": [
            97
        ], 
        "id": 388
    }, 
    {
        "code": "L2_alias=L2", 
        "corresponding_lines": [
            98
        ], 
        "id": 389
    }, 
    {
        "code": "L1_types=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 390
    }, 
    {
        "code": "L2_alias.remove(element)", 
        "corresponding_lines": [
            100
        ], 
        "id": 391
    }, 
    {
        "code": "L1.remove(element)", 
        "corresponding_lines": [
            101
        ], 
        "id": 392
    }, 
    {
        "code": "if len(L1)!=len(L2_alias):", 
        "corresponding_lines": [
            102
        ], 
        "id": 393
    }, 
    {
        "code": "if L1.count(element)&gt;y:", 
        "corresponding_lines": [
            1056, 
            1248, 
            391, 
            104, 
            74, 
            463, 
            563, 
            789, 
            120, 
            409, 
            847
        ], 
        "id": 394
    }, 
    {
        "code": "y=L1.count(element)", 
        "corresponding_lines": [
            1057, 
            1250, 
            518, 
            392, 
            105, 
            76, 
            465, 
            1298, 
            919, 
            121, 
            410
        ], 
        "id": 395
    }, 
    {
        "code": "ele_most=element", 
        "corresponding_lines": [
            106
        ], 
        "id": 396
    }, 
    {
        "code": "if type(element)==str:", 
        "corresponding_lines": [
            108
        ], 
        "id": 397
    }, 
    {
        "code": "y+=1", 
        "corresponding_lines": [
            1426, 
            787, 
            109, 
            111
        ], 
        "id": 398
    }, 
    {
        "code": "elif type(element)==int:", 
        "corresponding_lines": [
            110
        ], 
        "id": 399
    }, 
    {
        "code": "if y&gt;y:", 
        "corresponding_lines": [
            112, 
            114
        ], 
        "id": 400
    }, 
    {
        "code": "return(ele_most,y,'integer')", 
        "corresponding_lines": [
            113
        ], 
        "id": 401
    }, 
    {
        "code": "return(ele_most,y,'string')", 
        "corresponding_lines": [
            115
        ], 
        "id": 402
    }, 
    {
        "code": "y=L1.count(0)", 
        "corresponding_lines": [
            461, 
            118
        ], 
        "id": 403
    }, 
    {
        "code": "z=element", 
        "corresponding_lines": [
            122
        ], 
        "id": 404
    }, 
    {
        "code": "return(y,z)", 
        "corresponding_lines": [
            123
        ], 
        "id": 405
    }, 
    {
        "code": "if i__ not in L1:", 
        "corresponding_lines": [
            1040, 
            1196, 
            126
        ], 
        "id": 406
    }, 
    {
        "code": "counts.append(L1.count(i__))", 
        "corresponding_lines": [
            128
        ], 
        "id": 407
    }, 
    {
        "code": "most_common_count=max(counts)", 
        "corresponding_lines": [
            129
        ], 
        "id": 408
    }, 
    {
        "code": "place=counts.index(most_common_count)", 
        "corresponding_lines": [
            130
        ], 
        "id": 409
    }, 
    {
        "code": "ans=(L1[place],most_common_count,type(place))", 
        "corresponding_lines": [
            131
        ], 
        "id": 410
    }, 
    {
        "code": "return ans", 
        "corresponding_lines": [
            132, 
            637, 
            206
        ], 
        "id": 411
    }, 
    {
        "code": "def get_frequency(List):", 
        "corresponding_lines": [
            133
        ], 
        "id": 412
    }, 
    {
        "code": "for element in List:", 
        "corresponding_lines": [
            135
        ], 
        "id": 413
    }, 
    {
        "code": "if element not in Dict1.keys():", 
        "corresponding_lines": [
            136
        ], 
        "id": 414
    }, 
    {
        "code": "Dict1[element]=1", 
        "corresponding_lines": [
            137, 
            19
        ], 
        "id": 415
    }, 
    {
        "code": "Dict1[element]+=1", 
        "corresponding_lines": [
            138, 
            18
        ], 
        "id": 416
    }, 
    {
        "code": "return Dict1", 
        "corresponding_lines": [
            139
        ], 
        "id": 417
    }, 
    {
        "code": "L1=get_frequency(L1)", 
        "corresponding_lines": [
            140
        ], 
        "id": 418
    }, 
    {
        "code": "frequency_L2=get_frequency(L2)", 
        "corresponding_lines": [
            141
        ], 
        "id": 419
    }, 
    {
        "code": "if L1==frequency_L2:", 
        "corresponding_lines": [
            36
        ], 
        "id": 420
    }, 
    {
        "code": "if L1[element]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 421
    }, 
    {
        "code": "count=L1[element]", 
        "corresponding_lines": [
            41
        ], 
        "id": 422
    }, 
    {
        "code": "char_most=element", 
        "corresponding_lines": [
            144, 
            871
        ], 
        "id": 423
    }, 
    {
        "code": "return(char_most,count,type(element))", 
        "corresponding_lines": [
            145
        ], 
        "id": 424
    }, 
    {
        "code": "for j in range(len(L2)):", 
        "corresponding_lines": [
            456, 
            571, 
            963, 
            167
        ], 
        "id": 425
    }, 
    {
        "code": "if L1[i___3]==L2[j]:", 
        "corresponding_lines": [
            168
        ], 
        "id": 426
    }, 
    {
        "code": "L1Keys=Dict1.keys()", 
        "corresponding_lines": [
            172, 
            173
        ], 
        "id": 427
    }, 
    {
        "code": "L2Keys=L2_dict.keys()", 
        "corresponding_lines": [
            172, 
            175
        ], 
        "id": 428
    }, 
    {
        "code": "if element in L1Keys:", 
        "corresponding_lines": [
            174
        ], 
        "id": 429
    }, 
    {
        "code": "if element in L2Keys:", 
        "corresponding_lines": [
            176
        ], 
        "id": 430
    }, 
    {
        "code": "L2_dict[element]+=1", 
        "corresponding_lines": [
            22
        ], 
        "id": 431
    }, 
    {
        "code": "L2_dict[element]=1", 
        "corresponding_lines": [
            23
        ], 
        "id": 432
    }, 
    {
        "code": "if L2_dict!=Dict1:", 
        "corresponding_lines": [
            177
        ], 
        "id": 433
    }, 
    {
        "code": "for element in Dict1:", 
        "corresponding_lines": [
            1291, 
            182
        ], 
        "id": 434
    }, 
    {
        "code": "if Dict1[element]&gt;count:", 
        "corresponding_lines": [
            183
        ], 
        "id": 435
    }, 
    {
        "code": "max_key=str(element)", 
        "corresponding_lines": [
            185
        ], 
        "id": 436
    }, 
    {
        "code": "count+=Dict1[element]", 
        "corresponding_lines": [
            186
        ], 
        "id": 437
    }, 
    {
        "code": "max_key=type_of_element(max_key)", 
        "corresponding_lines": [
            187
        ], 
        "id": 438
    }, 
    {
        "code": "tup=(max_key,count,type(max_key))", 
        "corresponding_lines": [
            188
        ], 
        "id": 439
    }, 
    {
        "code": "ans=True", 
        "corresponding_lines": [
            190
        ], 
        "id": 440
    }, 
    {
        "code": "ans=False", 
        "corresponding_lines": [
            202, 
            203, 
            191
        ], 
        "id": 441
    }, 
    {
        "code": "elif L1==L2==[]:", 
        "corresponding_lines": [
            192
        ], 
        "id": 442
    }, 
    {
        "code": "ans=None", 
        "corresponding_lines": [
            193
        ], 
        "id": 443
    }, 
    {
        "code": "if L1.count(i)&gt;num_of_element:", 
        "corresponding_lines": [
            199
        ], 
        "id": 444
    }, 
    {
        "code": "num_of_element=L1.count(i)", 
        "corresponding_lines": [
            76
        ], 
        "id": 445
    }, 
    {
        "code": "Gt=[i]", 
        "corresponding_lines": [
            200
        ], 
        "id": 446
    }, 
    {
        "code": "elif L1.count(i)!=L2.count(i):", 
        "corresponding_lines": [
            201
        ], 
        "id": 447
    }, 
    {
        "code": "if ans==True:", 
        "corresponding_lines": [
            204
        ], 
        "id": 448
    }, 
    {
        "code": "return(Gt[0],num_of_element,type(Gt[0]))", 
        "corresponding_lines": [
            205
        ], 
        "id": 449
    }, 
    {
        "code": "type_of_element=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 450
    }, 
    {
        "code": "if len(L1)==len(L2)and L1.count(element)==L2.count(element):", 
        "corresponding_lines": [
            208
        ], 
        "id": 451
    }, 
    {
        "code": "if len(L1)==0 or len(L2)==0:", 
        "corresponding_lines": [
            209
        ], 
        "id": 452
    }, 
    {
        "code": "elif L1.count(element)&gt;=L1.count(element-1):", 
        "corresponding_lines": [
            210
        ], 
        "id": 453
    }, 
    {
        "code": "y=element", 
        "corresponding_lines": [
            1058, 
            211, 
            796
        ], 
        "id": 454
    }, 
    {
        "code": "count=L1.count(element)", 
        "corresponding_lines": [
            410, 
            212, 
            663
        ], 
        "id": 455
    }, 
    {
        "code": "return(y,count,type_of_element)", 
        "corresponding_lines": [
            214
        ], 
        "id": 456
    }, 
    {
        "code": "elt_type=type(max_element)", 
        "corresponding_lines": [
            219
        ], 
        "id": 457
    }, 
    {
        "code": "return(max_element,max_count,elt_type)", 
        "corresponding_lines": [
            220
        ], 
        "id": 458
    }, 
    {
        "code": "same_terms=True", 
        "corresponding_lines": [
            221
        ], 
        "id": 459
    }, 
    {
        "code": "same_terms=False", 
        "corresponding_lines": [
            203
        ], 
        "id": 460
    }, 
    {
        "code": "if same_terms==False:", 
        "corresponding_lines": [
            222
        ], 
        "id": 461
    }, 
    {
        "code": "answer=True", 
        "corresponding_lines": [
            190
        ], 
        "id": 462
    }, 
    {
        "code": "answer=False", 
        "corresponding_lines": [
            226, 
            223
        ], 
        "id": 463
    }, 
    {
        "code": "if answer==False:", 
        "corresponding_lines": [
            227
        ], 
        "id": 464
    }, 
    {
        "code": "most_times=L1.count(L1[0])", 
        "corresponding_lines": [
            230
        ], 
        "id": 465
    }, 
    {
        "code": "if L1.count(element)&gt;=most_times:", 
        "corresponding_lines": [
            232
        ], 
        "id": 466
    }, 
    {
        "code": "maxitem=element", 
        "corresponding_lines": [
            233, 
            411, 
            441, 
            1241
        ], 
        "id": 467
    }, 
    {
        "code": "most_times=L1.count(element)", 
        "corresponding_lines": [
            234
        ], 
        "id": 468
    }, 
    {
        "code": "a=[0,0,0]", 
        "corresponding_lines": [
            236
        ], 
        "id": 469
    }, 
    {
        "code": "if L1.count(element___2)&gt;=a[1]:", 
        "corresponding_lines": [
            238
        ], 
        "id": 470
    }, 
    {
        "code": "a[0]=element___2", 
        "corresponding_lines": [
            239
        ], 
        "id": 471
    }, 
    {
        "code": "a[1]=L1.count(element___2)", 
        "corresponding_lines": [
            240
        ], 
        "id": 472
    }, 
    {
        "code": "a[2]=type(element___2)", 
        "corresponding_lines": [
            241
        ], 
        "id": 473
    }, 
    {
        "code": "return a", 
        "corresponding_lines": [
            242
        ], 
        "id": 474
    }, 
    {
        "code": "if L1_copy==L2___3:", 
        "corresponding_lines": [
            245
        ], 
        "id": 475
    }, 
    {
        "code": "return 'The two lists are permutations.'", 
        "corresponding_lines": [
            246
        ], 
        "id": 476
    }, 
    {
        "code": "Lcount=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 477
    }, 
    {
        "code": "t=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 478
    }, 
    {
        "code": "elif L1.count(i__)!=L2.count(i__):", 
        "corresponding_lines": [
            249
        ], 
        "id": 479
    }, 
    {
        "code": "elif L1==[]or L2==[]:", 
        "corresponding_lines": [
            251
        ], 
        "id": 480
    }, 
    {
        "code": "return 'None'", 
        "corresponding_lines": [
            252
        ], 
        "id": 481
    }, 
    {
        "code": "y=[i__,L1.count(i__),type(i__)]", 
        "corresponding_lines": [
            253
        ], 
        "id": 482
    }, 
    {
        "code": "Lcount.extend(y)", 
        "corresponding_lines": [
            254
        ], 
        "id": 483
    }, 
    {
        "code": "t=Lcount", 
        "corresponding_lines": [
            255
        ], 
        "id": 484
    }, 
    {
        "code": "return t", 
        "corresponding_lines": [
            256, 
            977, 
            531, 
            1164
        ], 
        "id": 485
    }, 
    {
        "code": "tup=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 486
    }, 
    {
        "code": "L2=[]", 
        "corresponding_lines": [
            1285, 
            79
        ], 
        "id": 487
    }, 
    {
        "code": "double=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 488
    }, 
    {
        "code": "L2.append(i)", 
        "corresponding_lines": [
            257, 
            1331
        ], 
        "id": 489
    }, 
    {
        "code": "count___2=0", 
        "corresponding_lines": [
            264, 
            258
        ], 
        "id": 490
    }, 
    {
        "code": "count___2+=1", 
        "corresponding_lines": [
            260
        ], 
        "id": 491
    }, 
    {
        "code": "if count___2&gt;y:", 
        "corresponding_lines": [
            705, 
            973, 
            1155, 
            261, 
            869
        ], 
        "id": 492
    }, 
    {
        "code": "y=count___2", 
        "corresponding_lines": [
            706, 
            870, 
            262, 
            925
        ], 
        "id": 493
    }, 
    {
        "code": "y=i", 
        "corresponding_lines": [
            577, 
            1275, 
            263
        ], 
        "id": 494
    }, 
    {
        "code": "return(y,y,type(i))", 
        "corresponding_lines": [
            265
        ], 
        "id": 495
    }, 
    {
        "code": "for i__ in xrange(len(L1)):", 
        "corresponding_lines": [
            266, 
            1254
        ], 
        "id": 496
    }, 
    {
        "code": "if L1.count(i__)==L2.count(i__):", 
        "corresponding_lines": [
            267
        ], 
        "id": 497
    }, 
    {
        "code": "return(i__,L1.count(i__),type(i__))", 
        "corresponding_lines": [
            268
        ], 
        "id": 498
    }, 
    {
        "code": "return false", 
        "corresponding_lines": [
            269
        ], 
        "id": 499
    }, 
    {
        "code": "for x in range(len(L1)):", 
        "corresponding_lines": [
            400, 
            273
        ], 
        "id": 500
    }, 
    {
        "code": "for a in L1:", 
        "corresponding_lines": [
            274
        ], 
        "id": 501
    }, 
    {
        "code": "if a in L2[x]:", 
        "corresponding_lines": [
            275
        ], 
        "id": 502
    }, 
    {
        "code": "x+=0", 
        "corresponding_lines": [
            277
        ], 
        "id": 503
    }, 
    {
        "code": "y=None", 
        "corresponding_lines": [
            609, 
            146, 
            483
        ], 
        "id": 504
    }, 
    {
        "code": "if L1==L1==[]:", 
        "corresponding_lines": [
            278
        ], 
        "id": 505
    }, 
    {
        "code": "if L2.count(element)!=L1.count(element):", 
        "corresponding_lines": [
            280, 
            659, 
            629, 
            885
        ], 
        "id": 506
    }, 
    {
        "code": "if L2.count(element)&gt;=y:", 
        "corresponding_lines": [
            281
        ], 
        "id": 507
    }, 
    {
        "code": "y=L2.count(element)", 
        "corresponding_lines": [
            385, 
            282, 
            611, 
            538
        ], 
        "id": 508
    }, 
    {
        "code": "a=i.count", 
        "corresponding_lines": [
            286
        ], 
        "id": 509
    }, 
    {
        "code": "for n in L2:", 
        "corresponding_lines": [
            931, 
            287
        ], 
        "id": 510
    }, 
    {
        "code": "b=n.count", 
        "corresponding_lines": [
            288
        ], 
        "id": 511
    }, 
    {
        "code": "if a!=b:", 
        "corresponding_lines": [
            289
        ], 
        "id": 512
    }, 
    {
        "code": "b=[]", 
        "corresponding_lines": [
            290
        ], 
        "id": 513
    }, 
    {
        "code": "a=element.count", 
        "corresponding_lines": [
            292
        ], 
        "id": 514
    }, 
    {
        "code": "b.append(a)", 
        "corresponding_lines": [
            293
        ], 
        "id": 515
    }, 
    {
        "code": "n=0", 
        "corresponding_lines": [
            264, 
            294, 
            71
        ], 
        "id": 516
    }, 
    {
        "code": "while n&lt;len(L1)-1:", 
        "corresponding_lines": [
            295
        ], 
        "id": 517
    }, 
    {
        "code": "n=n+1", 
        "corresponding_lines": [
            296, 
            876
        ], 
        "id": 518
    }, 
    {
        "code": "c=L1[n]", 
        "corresponding_lines": [
            297
        ], 
        "id": 519
    }, 
    {
        "code": "if c.count&gt;L1[n-1].count:", 
        "corresponding_lines": [
            298
        ], 
        "id": 520
    }, 
    {
        "code": "continue", 
        "corresponding_lines": [
            299
        ], 
        "id": 521
    }, 
    {
        "code": "c=L1[n-1]", 
        "corresponding_lines": [
            300
        ], 
        "id": 522
    }, 
    {
        "code": "d=c.count", 
        "corresponding_lines": [
            301
        ], 
        "id": 523
    }, 
    {
        "code": "answer=(c,d,type(c))", 
        "corresponding_lines": [
            302
        ], 
        "id": 524
    }, 
    {
        "code": "return answer", 
        "corresponding_lines": [
            628, 
            303
        ], 
        "id": 525
    }, 
    {
        "code": "L2.replace(i,\"\")", 
        "corresponding_lines": [
            306
        ], 
        "id": 526
    }, 
    {
        "code": "x=L1.count(i)", 
        "corresponding_lines": [
            308
        ], 
        "id": 527
    }, 
    {
        "code": "False", 
        "corresponding_lines": [
            309
        ], 
        "id": 528
    }, 
    {
        "code": "for j in L1:", 
        "corresponding_lines": [
            312
        ], 
        "id": 529
    }, 
    {
        "code": "max(L1.count(j))", 
        "corresponding_lines": [
            313
        ], 
        "id": 530
    }, 
    {
        "code": "return(j,max(L1.count(j)),'&lt;type',type(j),'&gt;')", 
        "corresponding_lines": [
            314
        ], 
        "id": 531
    }, 
    {
        "code": "for item in L1:", 
        "corresponding_lines": [
            315, 
            1325
        ], 
        "id": 532
    }, 
    {
        "code": "for items in L2:", 
        "corresponding_lines": [
            316
        ], 
        "id": 533
    }, 
    {
        "code": "if item==items and L1.count(item)==L2.count(items):", 
        "corresponding_lines": [
            317
        ], 
        "id": 534
    }, 
    {
        "code": "arethey=True", 
        "corresponding_lines": [
            190
        ], 
        "id": 535
    }, 
    {
        "code": "seen=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 536
    }, 
    {
        "code": "arethey=False", 
        "corresponding_lines": [
            203, 
            223
        ], 
        "id": 537
    }, 
    {
        "code": "if L1[i___3]in L2:", 
        "corresponding_lines": [
            1267, 
            318
        ], 
        "id": 538
    }, 
    {
        "code": "elif L1[i___3]not in L2:", 
        "corresponding_lines": [
            319
        ], 
        "id": 539
    }, 
    {
        "code": "break", 
        "corresponding_lines": [
            320
        ], 
        "id": 540
    }, 
    {
        "code": "if arethey==False:", 
        "corresponding_lines": [
            321
        ], 
        "id": 541
    }, 
    {
        "code": "return arethey", 
        "corresponding_lines": [
            322
        ], 
        "id": 542
    }, 
    {
        "code": "i=0", 
        "corresponding_lines": [
            96, 
            258
        ], 
        "id": 543
    }, 
    {
        "code": "j=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 544
    }, 
    {
        "code": "L1_match=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 545
    }, 
    {
        "code": "L2_match=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 546
    }, 
    {
        "code": "List1={}", 
        "corresponding_lines": [
            31
        ], 
        "id": 547
    }, 
    {
        "code": "List2={}", 
        "corresponding_lines": [
            31
        ], 
        "id": 548
    }, 
    {
        "code": "equality=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 549
    }, 
    {
        "code": "maximum=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 550
    }, 
    {
        "code": "while i&lt;len(L1):", 
        "corresponding_lines": [
            323
        ], 
        "id": 551
    }, 
    {
        "code": "if L1[i]in L2:", 
        "corresponding_lines": [
            348, 
            324
        ], 
        "id": 552
    }, 
    {
        "code": "if not L1[i]in L1_match:", 
        "corresponding_lines": [
            325
        ], 
        "id": 553
    }, 
    {
        "code": "L1_match.append(L1[i])", 
        "corresponding_lines": [
            326
        ], 
        "id": 554
    }, 
    {
        "code": "List1[L1[i]]=L1.count(L1[i])", 
        "corresponding_lines": [
            327
        ], 
        "id": 555
    }, 
    {
        "code": "i=i+1", 
        "corresponding_lines": [
            328
        ], 
        "id": 556
    }, 
    {
        "code": "while j&lt;len(L2):", 
        "corresponding_lines": [
            329
        ], 
        "id": 557
    }, 
    {
        "code": "if L2[j]in L1:", 
        "corresponding_lines": [
            330
        ], 
        "id": 558
    }, 
    {
        "code": "if not L2[j]in L2_match:", 
        "corresponding_lines": [
            331
        ], 
        "id": 559
    }, 
    {
        "code": "L2_match.append(L2[j])", 
        "corresponding_lines": [
            332
        ], 
        "id": 560
    }, 
    {
        "code": "List2[L2[j]]=L2.count(L2[j])", 
        "corresponding_lines": [
            333
        ], 
        "id": 561
    }, 
    {
        "code": "j=j+1", 
        "corresponding_lines": [
            334
        ], 
        "id": 562
    }, 
    {
        "code": "if len(List1.keys())==len(List2.keys()):", 
        "corresponding_lines": [
            335
        ], 
        "id": 563
    }, 
    {
        "code": "for counter in range(len(List1)):", 
        "corresponding_lines": [
            336
        ], 
        "id": 564
    }, 
    {
        "code": "print counter", 
        "corresponding_lines": [
            337
        ], 
        "id": 565
    }, 
    {
        "code": "keys=List1.keys()", 
        "corresponding_lines": [
            338
        ], 
        "id": 566
    }, 
    {
        "code": "equality=equality+abs(List1[keys[counter]]-List2[keys[counter]])", 
        "corresponding_lines": [
            339
        ], 
        "id": 567
    }, 
    {
        "code": "if len(List1.keys())==len(List2.keys())and equality==0:", 
        "corresponding_lines": [
            340
        ], 
        "id": 568
    }, 
    {
        "code": "for n in range(len(List1)):", 
        "corresponding_lines": [
            341
        ], 
        "id": 569
    }, 
    {
        "code": "new_key=List1.keys()", 
        "corresponding_lines": [
            342
        ], 
        "id": 570
    }, 
    {
        "code": "if new_key[n]==max(List1.values()):", 
        "corresponding_lines": [
            343
        ], 
        "id": 571
    }, 
    {
        "code": "(maximum.append)[new_key[n]]", 
        "corresponding_lines": [
            344
        ], 
        "id": 572
    }, 
    {
        "code": "print new_key[n]", 
        "corresponding_lines": [
            345
        ], 
        "id": 573
    }, 
    {
        "code": "print(maximum,List1[maximum],type(maximum))", 
        "corresponding_lines": [
            346
        ], 
        "id": 574
    }, 
    {
        "code": "tuple=()", 
        "corresponding_lines": [
            1014, 
            247
        ], 
        "id": 575
    }, 
    {
        "code": "return tuple", 
        "corresponding_lines": [
            351
        ], 
        "id": 576
    }, 
    {
        "code": "def list_match(L1,L2):", 
        "corresponding_lines": [
            352
        ], 
        "id": 577
    }, 
    {
        "code": "if element not in L2 and L1.count(element)!=L2.count(element):", 
        "corresponding_lines": [
            353
        ], 
        "id": 578
    }, 
    {
        "code": "if L1==[]and L1==[]:", 
        "corresponding_lines": [
            354
        ], 
        "id": 579
    }, 
    {
        "code": "if list_match(L1,L2)==True:", 
        "corresponding_lines": [
            356
        ], 
        "id": 580
    }, 
    {
        "code": "if L1.count(element)&gt;num_most:", 
        "corresponding_lines": [
            357
        ], 
        "id": 581
    }, 
    {
        "code": "num_most=L1.count(element)", 
        "corresponding_lines": [
            358
        ], 
        "id": 582
    }, 
    {
        "code": "tup=(element,num_most,type(element))", 
        "corresponding_lines": [
            359
        ], 
        "id": 583
    }, 
    {
        "code": "similar=' '", 
        "corresponding_lines": [
            361
        ], 
        "id": 584
    }, 
    {
        "code": "similar+=i", 
        "corresponding_lines": [
            364
        ], 
        "id": 585
    }, 
    {
        "code": "print similar", 
        "corresponding_lines": [
            366
        ], 
        "id": 586
    }, 
    {
        "code": "elif len(L1)==len(L2):", 
        "corresponding_lines": [
            378, 
            1338, 
            855
        ], 
        "id": 587
    }, 
    {
        "code": "L2=sorted(L1)", 
        "corresponding_lines": [
            379
        ], 
        "id": 588
    }, 
    {
        "code": "stdL2=sorted(L2)", 
        "corresponding_lines": [
            380
        ], 
        "id": 589
    }, 
    {
        "code": "for i in range(len(L1)):", 
        "corresponding_lines": [
            1379, 
            452, 
            711, 
            616, 
            874, 
            45, 
            414, 
            570, 
            667, 
            381, 
            574
        ], 
        "id": 590
    }, 
    {
        "code": "if L2[i]==stdL2[i]:", 
        "corresponding_lines": [
            382
        ], 
        "id": 591
    }, 
    {
        "code": "if L2.count(element)&gt;y:", 
        "corresponding_lines": [
            384, 
            537, 
            610
        ], 
        "id": 592
    }, 
    {
        "code": "max_key=element", 
        "corresponding_lines": [
            1249, 
            386, 
            926
        ], 
        "id": 593
    }, 
    {
        "code": "return(max_key,y,type(max_key))", 
        "corresponding_lines": [
            387, 
            156, 
            1198, 
            1251
        ], 
        "id": 594
    }, 
    {
        "code": "y=1", 
        "corresponding_lines": [
            388, 
            495
        ], 
        "id": 595
    }, 
    {
        "code": "if element not in L2:", 
        "corresponding_lines": [
            124, 
            603, 
            492, 
            622, 
            390
        ], 
        "id": 596
    }, 
    {
        "code": "most_freq_char=element", 
        "corresponding_lines": [
            393
        ], 
        "id": 597
    }, 
    {
        "code": "index_of_most_freq=L1.index(element)", 
        "corresponding_lines": [
            394
        ], 
        "id": 598
    }, 
    {
        "code": "return(most_freq_char,y,type(L1[index_of_most_freq]))", 
        "corresponding_lines": [
            395
        ], 
        "id": 599
    }, 
    {
        "code": "for x in range(0,len(L1)):", 
        "corresponding_lines": [
            778, 
            396, 
            1118
        ], 
        "id": 600
    }, 
    {
        "code": "if L1[x]in L2:", 
        "corresponding_lines": [
            397, 
            318
        ], 
        "id": 601
    }, 
    {
        "code": "element=L1[x]", 
        "corresponding_lines": [
            398
        ], 
        "id": 602
    }, 
    {
        "code": "if L1.count(L1[x])&gt;most_common_count:", 
        "corresponding_lines": [
            402
        ], 
        "id": 603
    }, 
    {
        "code": "most_common_count=L1[x]", 
        "corresponding_lines": [
            403
        ], 
        "id": 604
    }, 
    {
        "code": "if len(L1)&gt;0:", 
        "corresponding_lines": [
            408, 
            404
        ], 
        "id": 605
    }, 
    {
        "code": "return(L1[x],L1.count(L1[x]),type(most_common_count))", 
        "corresponding_lines": [
            405
        ], 
        "id": 606
    }, 
    {
        "code": "checker=True", 
        "corresponding_lines": [
            406, 
            190
        ], 
        "id": 607
    }, 
    {
        "code": "if checker:", 
        "corresponding_lines": [
            407
        ], 
        "id": 608
    }, 
    {
        "code": "frequency=0", 
        "corresponding_lines": [
            415
        ], 
        "id": 609
    }, 
    {
        "code": "common=L2[0]", 
        "corresponding_lines": [
            416
        ], 
        "id": 610
    }, 
    {
        "code": "if L2[i]in L1[0:len(L1)]:", 
        "corresponding_lines": [
            417
        ], 
        "id": 611
    }, 
    {
        "code": "L1=L1.remove(L1[i])", 
        "corresponding_lines": [
            418
        ], 
        "id": 612
    }, 
    {
        "code": "if L2.count(L2[i])&gt;frequency:", 
        "corresponding_lines": [
            419
        ], 
        "id": 613
    }, 
    {
        "code": "frequency=L2.count(L2[i])", 
        "corresponding_lines": [
            420
        ], 
        "id": 614
    }, 
    {
        "code": "common=L2[i]", 
        "corresponding_lines": [
            421
        ], 
        "id": 615
    }, 
    {
        "code": "return tuple(common,frequency,type(common))", 
        "corresponding_lines": [
            422
        ], 
        "id": 616
    }, 
    {
        "code": "def count_times(i,List2):", 
        "corresponding_lines": [
            423
        ], 
        "id": 617
    }, 
    {
        "code": "for p in List2:", 
        "corresponding_lines": [
            426
        ], 
        "id": 618
    }, 
    {
        "code": "if p==i:", 
        "corresponding_lines": [
            427
        ], 
        "id": 619
    }, 
    {
        "code": "Gt.append(x)", 
        "corresponding_lines": [
            429
        ], 
        "id": 620
    }, 
    {
        "code": "return Gt", 
        "corresponding_lines": [
            430
        ], 
        "id": 621
    }, 
    {
        "code": "if i not in L2:", 
        "corresponding_lines": [
            1329, 
            124
        ], 
        "id": 622
    }, 
    {
        "code": "count_times(i,L2)", 
        "corresponding_lines": [
            431
        ], 
        "id": 623
    }, 
    {
        "code": "char=max(count_times(i,L2))", 
        "corresponding_lines": [
            432
        ], 
        "id": 624
    }, 
    {
        "code": "tup=char", 
        "corresponding_lines": [
            433
        ], 
        "id": 625
    }, 
    {
        "code": "if len(L1_copy)!=len(L2___3):", 
        "corresponding_lines": [
            443
        ], 
        "id": 626
    }, 
    {
        "code": "elif L1_copy!=L2___3:", 
        "corresponding_lines": [
            444
        ], 
        "id": 627
    }, 
    {
        "code": "for i in L1_copy:", 
        "corresponding_lines": [
            446
        ], 
        "id": 628
    }, 
    {
        "code": "if i in char_freq:", 
        "corresponding_lines": [
            447
        ], 
        "id": 629
    }, 
    {
        "code": "char_freq[i]+=1", 
        "corresponding_lines": [
            448
        ], 
        "id": 630
    }, 
    {
        "code": "char_freq[i]=1", 
        "corresponding_lines": [
            449
        ], 
        "id": 631
    }, 
    {
        "code": "for key in char_freq:", 
        "corresponding_lines": [
            143
        ], 
        "id": 632
    }, 
    {
        "code": "if char_freq[key]&gt;count:", 
        "corresponding_lines": [
            40
        ], 
        "id": 633
    }, 
    {
        "code": "count=char_freq[key]", 
        "corresponding_lines": [
            41
        ], 
        "id": 634
    }, 
    {
        "code": "p=key", 
        "corresponding_lines": [
            450
        ], 
        "id": 635
    }, 
    {
        "code": "copy1=L1[:]", 
        "corresponding_lines": [
            435
        ], 
        "id": 636
    }, 
    {
        "code": "copy2=L2[:]", 
        "corresponding_lines": [
            436
        ], 
        "id": 637
    }, 
    {
        "code": "if L1[i]in copy2:", 
        "corresponding_lines": [
            453
        ], 
        "id": 638
    }, 
    {
        "code": "copy1.remove(L1[i])", 
        "corresponding_lines": [
            454
        ], 
        "id": 639
    }, 
    {
        "code": "copy2.remove(L1[i])", 
        "corresponding_lines": [
            455
        ], 
        "id": 640
    }, 
    {
        "code": "rep=[]", 
        "corresponding_lines": [
            457
        ], 
        "id": 641
    }, 
    {
        "code": "rep.append((L2.count(L2[j]),L2[j]))", 
        "corresponding_lines": [
            458
        ], 
        "id": 642
    }, 
    {
        "code": "return(max(rep)[1],max(rep)[0],type(max(rep)[1]))", 
        "corresponding_lines": [
            459
        ], 
        "id": 643
    }, 
    {
        "code": "return(y,L1.count(x),type(L1[x]))", 
        "corresponding_lines": [
            466
        ], 
        "id": 644
    }, 
    {
        "code": "if element in L2:", 
        "corresponding_lines": [
            467, 
            1100, 
            195, 
            1127
        ], 
        "id": 645
    }, 
    {
        "code": "pass", 
        "corresponding_lines": [
            468
        ], 
        "id": 646
    }, 
    {
        "code": "if L1[1]not in L2:", 
        "corresponding_lines": [
            470
        ], 
        "id": 647
    }, 
    {
        "code": "return \"FAS\"", 
        "corresponding_lines": [
            472
        ], 
        "id": 648
    }, 
    {
        "code": "e_most='asdfgh'", 
        "corresponding_lines": [
            473
        ], 
        "id": 649
    }, 
    {
        "code": "if L1.count(L1[j])&gt;num_of_element:", 
        "corresponding_lines": [
            477
        ], 
        "id": 650
    }, 
    {
        "code": "num_of_element=int(L1.count(L1[j]))", 
        "corresponding_lines": [
            478
        ], 
        "id": 651
    }, 
    {
        "code": "e_most=L1[j]", 
        "corresponding_lines": [
            479
        ], 
        "id": 652
    }, 
    {
        "code": "type_of_element=type(e_most)", 
        "corresponding_lines": [
            480
        ], 
        "id": 653
    }, 
    {
        "code": "if e_most=='asdfgh':", 
        "corresponding_lines": [
            481
        ], 
        "id": 654
    }, 
    {
        "code": "num_of_element=None", 
        "corresponding_lines": [
            483
        ], 
        "id": 655
    }, 
    {
        "code": "return(e_most,num_of_element,type_of_element)", 
        "corresponding_lines": [
            485
        ], 
        "id": 656
    }, 
    {
        "code": "if set(L1)==set(L2):", 
        "corresponding_lines": [
            487
        ], 
        "id": 657
    }, 
    {
        "code": "new_tuple=()", 
        "corresponding_lines": [
            488
        ], 
        "id": 658
    }, 
    {
        "code": "new_tuple=new_tuple+(i,)+(L1.count(i),)+(type(i),)", 
        "corresponding_lines": [
            489
        ], 
        "id": 659
    }, 
    {
        "code": "return new_tuple", 
        "corresponding_lines": [
            490
        ], 
        "id": 660
    }, 
    {
        "code": "count1=L1.count(element)", 
        "corresponding_lines": [
            2
        ], 
        "id": 661
    }, 
    {
        "code": "if count1!=times2:", 
        "corresponding_lines": [
            494
        ], 
        "id": 662
    }, 
    {
        "code": "if count1&gt;y:", 
        "corresponding_lines": [
            496
        ], 
        "id": 663
    }, 
    {
        "code": "tup=(element,count1,type(element))", 
        "corresponding_lines": [
            498
        ], 
        "id": 664
    }, 
    {
        "code": "element_count={}", 
        "corresponding_lines": [
            171
        ], 
        "id": 665
    }, 
    {
        "code": "for j in L2:", 
        "corresponding_lines": [
            505, 
            834, 
            1207
        ], 
        "id": 666
    }, 
    {
        "code": "if L1.count(i)==L2.count(j):", 
        "corresponding_lines": [
            1209, 
            506
        ], 
        "id": 667
    }, 
    {
        "code": "element_count[L1.count(i)]=i", 
        "corresponding_lines": [
            507
        ], 
        "id": 668
    }, 
    {
        "code": "counts.append(L1.count(i))", 
        "corresponding_lines": [
            508
        ], 
        "id": 669
    }, 
    {
        "code": "return(element_count[max_count],max_count,str(type(element_count[max_count])))", 
        "corresponding_lines": [
            510
        ], 
        "id": 670
    }, 
    {
        "code": "return(L1[1],L1.count(L1[1]),'type '+type(L1[1]))", 
        "corresponding_lines": [
            513
        ], 
        "id": 671
    }, 
    {
        "code": "element=0", 
        "corresponding_lines": [
            96, 
            258
        ], 
        "id": 672
    }, 
    {
        "code": "if L1.count(element)&gt;count__:", 
        "corresponding_lines": [
            409
        ], 
        "id": 673
    }, 
    {
        "code": "count__=L1.count(element)", 
        "corresponding_lines": [
            410
        ], 
        "id": 674
    }, 
    {
        "code": "if L1.count(thing)==count__:", 
        "corresponding_lines": [
            515
        ], 
        "id": 675
    }, 
    {
        "code": "element=thing", 
        "corresponding_lines": [
            516
        ], 
        "id": 676
    }, 
    {
        "code": "element=None", 
        "corresponding_lines": [
            483
        ], 
        "id": 677
    }, 
    {
        "code": "return(element,y,type_of_element)", 
        "corresponding_lines": [
            519
        ], 
        "id": 678
    }, 
    {
        "code": "value=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 679
    }, 
    {
        "code": "maxi=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 680
    }, 
    {
        "code": "if i__ not in L1dict:", 
        "corresponding_lines": [
            33
        ], 
        "id": 681
    }, 
    {
        "code": "L1dict[i__]=1", 
        "corresponding_lines": [
            19
        ], 
        "id": 682
    }, 
    {
        "code": "L1dict[i__]+=1", 
        "corresponding_lines": [
            18
        ], 
        "id": 683
    }, 
    {
        "code": "if i__ not in L2_dict:", 
        "corresponding_lines": [
            522
        ], 
        "id": 684
    }, 
    {
        "code": "L2_dict[i__]=1", 
        "corresponding_lines": [
            19, 
            523, 
            23
        ], 
        "id": 685
    }, 
    {
        "code": "L2_dict+=1", 
        "corresponding_lines": [
            524
        ], 
        "id": 686
    }, 
    {
        "code": "for k in L1dict.keys():", 
        "corresponding_lines": [
            525
        ], 
        "id": 687
    }, 
    {
        "code": "if k not in L2_dict or L2_dict[k]!=L1dict[k]:", 
        "corresponding_lines": [
            526
        ], 
        "id": 688
    }, 
    {
        "code": "for i__ in L1dict.keys():", 
        "corresponding_lines": [
            527
        ], 
        "id": 689
    }, 
    {
        "code": "if L1dict.get(i__)&gt;maxi:", 
        "corresponding_lines": [
            528
        ], 
        "id": 690
    }, 
    {
        "code": "maxi=L1dict.get(i__)", 
        "corresponding_lines": [
            529
        ], 
        "id": 691
    }, 
    {
        "code": "t=(i__,max,type(i__))", 
        "corresponding_lines": [
            530
        ], 
        "id": 692
    }, 
    {
        "code": "def is_list_permutation(L2,L2):", 
        "corresponding_lines": [
            0
        ], 
        "id": 693
    }, 
    {
        "code": "if len(L2)!=len(L2):", 
        "corresponding_lines": [
            11, 
            1020
        ], 
        "id": 694
    }, 
    {
        "code": "if L2==L2:", 
        "corresponding_lines": [
            532, 
            535
        ], 
        "id": 695
    }, 
    {
        "code": "L2.sort()", 
        "corresponding_lines": [
            533, 
            534
        ], 
        "id": 696
    }, 
    {
        "code": "return(element,y,type(element))", 
        "corresponding_lines": [
            539
        ], 
        "id": 697
    }, 
    {
        "code": "i=L1[i___3]", 
        "corresponding_lines": [
            543
        ], 
        "id": 698
    }, 
    {
        "code": "countL1=L1.count(i)", 
        "corresponding_lines": [
            544
        ], 
        "id": 699
    }, 
    {
        "code": "countL2=L2.count(i)", 
        "corresponding_lines": [
            545
        ], 
        "id": 700
    }, 
    {
        "code": "if countL2==countL1:", 
        "corresponding_lines": [
            546
        ], 
        "id": 701
    }, 
    {
        "code": "if x==0:", 
        "corresponding_lines": [
            548
        ], 
        "id": 702
    }, 
    {
        "code": "output=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 703
    }, 
    {
        "code": "L1dict[L1[i___3]]=L1.count(L1[i___3])", 
        "corresponding_lines": [
            549
        ], 
        "id": 704
    }, 
    {
        "code": "elements_L2[L2[i___3]]=L2.count(L2[i___3])", 
        "corresponding_lines": [
            551
        ], 
        "id": 705
    }, 
    {
        "code": "if L1dict!=elements_L2:", 
        "corresponding_lines": [
            552
        ], 
        "id": 706
    }, 
    {
        "code": "if len(L1dict.keys())==0:", 
        "corresponding_lines": [
            553
        ], 
        "id": 707
    }, 
    {
        "code": "for key in L1dict.keys()[:]:", 
        "corresponding_lines": [
            554
        ], 
        "id": 708
    }, 
    {
        "code": "output=(key,L1dict[key],type(key))", 
        "corresponding_lines": [
            556
        ], 
        "id": 709
    }, 
    {
        "code": "if count==max(L1dict.values()):", 
        "corresponding_lines": [
            557
        ], 
        "id": 710
    }, 
    {
        "code": "if L1==L2==[]:", 
        "corresponding_lines": [
            558
        ], 
        "id": 711
    }, 
    {
        "code": "winning_element=element", 
        "corresponding_lines": [
            564
        ], 
        "id": 712
    }, 
    {
        "code": "return(winning_element,y,type(element))", 
        "corresponding_lines": [
            565
        ], 
        "id": 713
    }, 
    {
        "code": "same_len=False", 
        "corresponding_lines": [
            567
        ], 
        "id": 714
    }, 
    {
        "code": "is_perm=False", 
        "corresponding_lines": [
            569, 
            567
        ], 
        "id": 715
    }, 
    {
        "code": "same_len=True", 
        "corresponding_lines": [
            568
        ], 
        "id": 716
    }, 
    {
        "code": "if L1[i]==L2[j]and same_len:", 
        "corresponding_lines": [
            572
        ], 
        "id": 717
    }, 
    {
        "code": "is_perm=True", 
        "corresponding_lines": [
            1218, 
            573, 
            190
        ], 
        "id": 718
    }, 
    {
        "code": "if L1.count(i)&gt;=L1.count(j):", 
        "corresponding_lines": [
            576
        ], 
        "id": 719
    }, 
    {
        "code": "num_most_com=L1.count(y)", 
        "corresponding_lines": [
            578
        ], 
        "id": 720
    }, 
    {
        "code": "type_most_com=type(y)", 
        "corresponding_lines": [
            579
        ], 
        "id": 721
    }, 
    {
        "code": "inf=(y,num_most_com,type_most_com)", 
        "corresponding_lines": [
            580
        ], 
        "id": 722
    }, 
    {
        "code": "if is_perm:", 
        "corresponding_lines": [
            581
        ], 
        "id": 723
    }, 
    {
        "code": "return inf", 
        "corresponding_lines": [
            582
        ], 
        "id": 724
    }, 
    {
        "code": "elif len(L1)==len(L2)==0:", 
        "corresponding_lines": [
            1337, 
            583
        ], 
        "id": 725
    }, 
    {
        "code": "return is_perm", 
        "corresponding_lines": [
            322
        ], 
        "id": 726
    }, 
    {
        "code": "if L1[i___3]not in L2:", 
        "corresponding_lines": [
            585, 
            1029
        ], 
        "id": 727
    }, 
    {
        "code": "list.count", 
        "corresponding_lines": [
            586
        ], 
        "id": 728
    }, 
    {
        "code": "return 'False'", 
        "corresponding_lines": [
            590
        ], 
        "id": 729
    }, 
    {
        "code": "if L1.count(L2[i__])!=L2.count(L2[i__]):", 
        "corresponding_lines": [
            592
        ], 
        "id": 730
    }, 
    {
        "code": "if L1.count(L2[j])&gt;y:", 
        "corresponding_lines": [
            594
        ], 
        "id": 731
    }, 
    {
        "code": "y=L1.count(L2[j])", 
        "corresponding_lines": [
            595
        ], 
        "id": 732
    }, 
    {
        "code": "max_element=L2[j]", 
        "corresponding_lines": [
            596
        ], 
        "id": 733
    }, 
    {
        "code": "return(max_element,y,type(max_element))", 
        "corresponding_lines": [
            68
        ], 
        "id": 734
    }, 
    {
        "code": "my_dict={}", 
        "corresponding_lines": [
            171
        ], 
        "id": 735
    }, 
    {
        "code": "if L1.count(L1[i___3])==L2.count(L1[i___3]):", 
        "corresponding_lines": [
            597
        ], 
        "id": 736
    }, 
    {
        "code": "my_dict[L1[i___3]]=L1.count(L1[i___3])", 
        "corresponding_lines": [
            598
        ], 
        "id": 737
    }, 
    {
        "code": "values=my_dict.values()", 
        "corresponding_lines": [
            599
        ], 
        "id": 738
    }, 
    {
        "code": "placeholder=values.index(max(values))", 
        "corresponding_lines": [
            600
        ], 
        "id": 739
    }, 
    {
        "code": "the_type=type(my_dict.keys()[placeholder])", 
        "corresponding_lines": [
            601
        ], 
        "id": 740
    }, 
    {
        "code": "return(my_dict.keys()[placeholder],max(values),the_type)", 
        "corresponding_lines": [
            602
        ], 
        "id": 741
    }, 
    {
        "code": "number=[]", 
        "corresponding_lines": [
            194
        ], 
        "id": 742
    }, 
    {
        "code": "max_occur=max(number)", 
        "corresponding_lines": [
            604
        ], 
        "id": 743
    }, 
    {
        "code": "L1.count(i)", 
        "corresponding_lines": [
            1206, 
            606
        ], 
        "id": 744
    }, 
    {
        "code": "tuple_L=max_occur", 
        "corresponding_lines": [
            607
        ], 
        "id": 745
    }, 
    {
        "code": "def return_max(L2):", 
        "corresponding_lines": [
            608
        ], 
        "id": 746
    }, 
    {
        "code": "e_times=element", 
        "corresponding_lines": [
            612
        ], 
        "id": 747
    }, 
    {
        "code": "return(y,e_times,type_of_element)", 
        "corresponding_lines": [
            614
        ], 
        "id": 748
    }, 
    {
        "code": "return return_max(L1_copy)", 
        "corresponding_lines": [
            615
        ], 
        "id": 749
    }, 
    {
        "code": "result=False", 
        "corresponding_lines": [
            617
        ], 
        "id": 750
    }, 
    {
        "code": "if range(len(L1))==range(len(L2))and L1.count(L1[i])==L2.count(L1[i]):", 
        "corresponding_lines": [
            618
        ], 
        "id": 751
    }, 
    {
        "code": "result=True", 
        "corresponding_lines": [
            619
        ], 
        "id": 752
    }, 
    {
        "code": "if result==True:", 
        "corresponding_lines": [
            620
        ], 
        "id": 753
    }, 
    {
        "code": "counts.append(L1.count(element))", 
        "corresponding_lines": [
            624, 
            1132
        ], 
        "id": 754
    }, 
    {
        "code": "maxer=L1.index(max(counts))", 
        "corresponding_lines": [
            626
        ], 
        "id": 755
    }, 
    {
        "code": "answer=(L1[maxer],max_count,type(maxer))", 
        "corresponding_lines": [
            627
        ], 
        "id": 756
    }, 
    {
        "code": "counts.append(L1.count(thing))", 
        "corresponding_lines": [
            631
        ], 
        "id": 757
    }, 
    {
        "code": "freq_dict={}", 
        "corresponding_lines": [
            60
        ], 
        "id": 758
    }, 
    {
        "code": "for j in range(0,len(L1)):", 
        "corresponding_lines": [
            633
        ], 
        "id": 759
    }, 
    {
        "code": "freq_dict[counts[j]]=L1[j]", 
        "corresponding_lines": [
            634
        ], 
        "id": 760
    }, 
    {
        "code": "the_type=type(freq_dict[max_count])", 
        "corresponding_lines": [
            635
        ], 
        "id": 761
    }, 
    {
        "code": "tup_ans=(freq_dict[max_count],max_count,the_type)", 
        "corresponding_lines": [
            636
        ], 
        "id": 762
    }, 
    {
        "code": "return tup_ans", 
        "corresponding_lines": [
            637
        ], 
        "id": 763
    }, 
    {
        "code": "if L1.count(i___3)!=L2.count(i___3):", 
        "corresponding_lines": [
            638
        ], 
        "id": 764
    }, 
    {
        "code": "permutation=[L1[0],L1.count(L1[0]),type(L1[0])]", 
        "corresponding_lines": [
            639
        ], 
        "id": 765
    }, 
    {
        "code": "if L1.count(i___3)&gt;permutation[2]:", 
        "corresponding_lines": [
            641
        ], 
        "id": 766
    }, 
    {
        "code": "permutation[0]=L1[i___3]", 
        "corresponding_lines": [
            642
        ], 
        "id": 767
    }, 
    {
        "code": "permutation[1]=L1.count(i___3)", 
        "corresponding_lines": [
            643
        ], 
        "id": 768
    }, 
    {
        "code": "permutation[2]=type(L1[i___3])", 
        "corresponding_lines": [
            644
        ], 
        "id": 769
    }, 
    {
        "code": "permutation_new=tuple(permutation)", 
        "corresponding_lines": [
            645
        ], 
        "id": 770
    }, 
    {
        "code": "return permutation_new", 
        "corresponding_lines": [
            646
        ], 
        "id": 771
    }, 
    {
        "code": "if x!=x:", 
        "corresponding_lines": [
            651, 
            718
        ], 
        "id": 772
    }, 
    {
        "code": "print \"False\"", 
        "corresponding_lines": [
            652
        ], 
        "id": 773
    }, 
    {
        "code": "elif x==x:", 
        "corresponding_lines": [
            653
        ], 
        "id": 774
    }, 
    {
        "code": "if L1[x-2]in L2:", 
        "corresponding_lines": [
            654
        ], 
        "id": 775
    }, 
    {
        "code": "print \"True\"", 
        "corresponding_lines": [
            655
        ], 
        "id": 776
    }, 
    {
        "code": "'''Permutation if: the lists have the same number of elements", 
        "corresponding_lines": [
            656
        ], 
        "id": 777
    }, 
    {
        "code": "list elements appear the same number of times in both lists'''", 
        "corresponding_lines": [
            657
        ], 
        "id": 778
    }, 
    {
        "code": "for element in L1 and L2:", 
        "corresponding_lines": [
            658
        ], 
        "id": 779
    }, 
    {
        "code": "if L1 and L2!=[]:", 
        "corresponding_lines": [
            660
        ], 
        "id": 780
    }, 
    {
        "code": "if L1.count(element)&gt;=count:", 
        "corresponding_lines": [
            662
        ], 
        "id": 781
    }, 
    {
        "code": "word=element", 
        "corresponding_lines": [
            664
        ], 
        "id": 782
    }, 
    {
        "code": "ans=tuple([word,count,type(word)])", 
        "corresponding_lines": [
            665
        ], 
        "id": 783
    }, 
    {
        "code": "return tuple([None,None,None])", 
        "corresponding_lines": [
            666
        ], 
        "id": 784
    }, 
    {
        "code": "if L1.count(i)==L2.count(i)!=0:", 
        "corresponding_lines": [
            668
        ], 
        "id": 785
    }, 
    {
        "code": "m=max(L1.count(j),L1.count(j+1))", 
        "corresponding_lines": [
            670
        ], 
        "id": 786
    }, 
    {
        "code": "if L1.count(j)&gt;L1.count(j+1):", 
        "corresponding_lines": [
            671
        ], 
        "id": 787
    }, 
    {
        "code": "e_most=j", 
        "corresponding_lines": [
            672
        ], 
        "id": 788
    }, 
    {
        "code": "e_most=j+1", 
        "corresponding_lines": [
            673
        ], 
        "id": 789
    }, 
    {
        "code": "return(e_most,m,type(e_most))", 
        "corresponding_lines": [
            674
        ], 
        "id": 790
    }, 
    {
        "code": "((L1.count)[i],(L2.count)[i])", 
        "corresponding_lines": [
            675
        ], 
        "id": 791
    }, 
    {
        "code": "element_most=''", 
        "corresponding_lines": [
            377
        ], 
        "id": 792
    }, 
    {
        "code": "element_type=''", 
        "corresponding_lines": [
            377
        ], 
        "id": 793
    }, 
    {
        "code": "if len(L_1)!=len(L_2):", 
        "corresponding_lines": [
            678
        ], 
        "id": 794
    }, 
    {
        "code": "print 'False'", 
        "corresponding_lines": [
            679
        ], 
        "id": 795
    }, 
    {
        "code": "answer=''", 
        "corresponding_lines": [
            680
        ], 
        "id": 796
    }, 
    {
        "code": "elif L_1==[]and L_2==[]:", 
        "corresponding_lines": [
            681
        ], 
        "id": 797
    }, 
    {
        "code": "answer=('None','None','None')", 
        "corresponding_lines": [
            682
        ], 
        "id": 798
    }, 
    {
        "code": "for index in range(0,len(L_1)):", 
        "corresponding_lines": [
            683
        ], 
        "id": 799
    }, 
    {
        "code": "if L_1[index]not in L_2:", 
        "corresponding_lines": [
            684
        ], 
        "id": 800
    }, 
    {
        "code": "if L_1.count(L_1[index])!=L_2.count(L_2[index]):", 
        "corresponding_lines": [
            685
        ], 
        "id": 801
    }, 
    {
        "code": "if L_1.count(L_1[index])&gt;num_most:", 
        "corresponding_lines": [
            686
        ], 
        "id": 802
    }, 
    {
        "code": "element_most=element_most+str(L_1[index])", 
        "corresponding_lines": [
            687
        ], 
        "id": 803
    }, 
    {
        "code": "num_most=num_most+L_1.count(L_1[index])", 
        "corresponding_lines": [
            688
        ], 
        "id": 804
    }, 
    {
        "code": "element_type=element_type+str(type(L_1[index]))", 
        "corresponding_lines": [
            689
        ], 
        "id": 805
    }, 
    {
        "code": "answer=(L_1[index],L_1.count(L_1[index]),type(L_1[index]))", 
        "corresponding_lines": [
            690
        ], 
        "id": 806
    }, 
    {
        "code": "print answer", 
        "corresponding_lines": [
            691
        ], 
        "id": 807
    }, 
    {
        "code": "if len(L1_copy)==len(L2___3)and L1_copy==L2___3:", 
        "corresponding_lines": [
            692
        ], 
        "id": 808
    }, 
    {
        "code": "for j in range(0,len(L1_copy)):", 
        "corresponding_lines": [
            693
        ], 
        "id": 809
    }, 
    {
        "code": "i___2=L1_copy[j]", 
        "corresponding_lines": [
            694
        ], 
        "id": 810
    }, 
    {
        "code": "y=L1_copy.count(i___2)", 
        "corresponding_lines": [
            695
        ], 
        "id": 811
    }, 
    {
        "code": "if y&gt;y and y&gt;y and y&gt;y and y&gt;y:", 
        "corresponding_lines": [
            696
        ], 
        "id": 812
    }, 
    {
        "code": "tup=(L1_copy[j],y,type(L1_copy[j]))", 
        "corresponding_lines": [
            697
        ], 
        "id": 813
    }, 
    {
        "code": "y=y", 
        "corresponding_lines": [
            698, 
            699, 
            700, 
            701
        ], 
        "id": 814
    }, 
    {
        "code": "if element___2 in L2 and L1.count(element___2)==L2.count(element___2):", 
        "corresponding_lines": [
            703
        ], 
        "id": 815
    }, 
    {
        "code": "count___2=L1.count(element___2)", 
        "corresponding_lines": [
            62
        ], 
        "id": 816
    }, 
    {
        "code": "max_key=element___2", 
        "corresponding_lines": [
            707
        ], 
        "id": 817
    }, 
    {
        "code": "while x&lt;len(L1):", 
        "corresponding_lines": [
            1084, 
            708
        ], 
        "id": 818
    }, 
    {
        "code": "elif L1[x]in L2:", 
        "corresponding_lines": [
            710
        ], 
        "id": 819
    }, 
    {
        "code": "if L1[x]==L2[i]:", 
        "corresponding_lines": [
            713
        ], 
        "id": 820
    }, 
    {
        "code": "if L1[x]==L1[j]:", 
        "corresponding_lines": [
            716
        ], 
        "id": 821
    }, 
    {
        "code": "if L1___2==[]:", 
        "corresponding_lines": [
            720
        ], 
        "id": 822
    }, 
    {
        "code": "for i__ in range(len(L1___2)):", 
        "corresponding_lines": [
            723
        ], 
        "id": 823
    }, 
    {
        "code": "x=1", 
        "corresponding_lines": [
            803, 
            724
        ], 
        "id": 824
    }, 
    {
        "code": "if L1___2[i__]not in L2___2:", 
        "corresponding_lines": [
            725
        ], 
        "id": 825
    }, 
    {
        "code": "if len(L1___2)&gt;i__+1:", 
        "corresponding_lines": [
            727
        ], 
        "id": 826
    }, 
    {
        "code": "if L1___2[i__]==L1___2[i__+1]:", 
        "corresponding_lines": [
            728
        ], 
        "id": 827
    }, 
    {
        "code": "Dict1[L1___2[i__]]=x", 
        "corresponding_lines": [
            730
        ], 
        "id": 828
    }, 
    {
        "code": "key=key", 
        "corresponding_lines": [
            734
        ], 
        "id": 829
    }, 
    {
        "code": "tup=(key,max_count,type(key))", 
        "corresponding_lines": [
            735
        ], 
        "id": 830
    }, 
    {
        "code": "tup=''", 
        "corresponding_lines": [
            377
        ], 
        "id": 831
    }, 
    {
        "code": "while e&gt;0:", 
        "corresponding_lines": [
            737
        ], 
        "id": 832
    }, 
    {
        "code": "if len(L1)==len(L2)and L1[e]==L2[e]:", 
        "corresponding_lines": [
            738
        ], 
        "id": 833
    }, 
    {
        "code": "if len(L1)!=len(L2)and L1[e]!=L2[e]:", 
        "corresponding_lines": [
            739
        ], 
        "id": 834
    }, 
    {
        "code": "tup+=e", 
        "corresponding_lines": [
            740
        ], 
        "id": 835
    }, 
    {
        "code": "return(L1.count(e),e,type(e))", 
        "corresponding_lines": [
            741
        ], 
        "id": 836
    }, 
    {
        "code": "if char in Gt:", 
        "corresponding_lines": [
            743
        ], 
        "id": 837
    }, 
    {
        "code": "Gt.remove(char)", 
        "corresponding_lines": [
            744
        ], 
        "id": 838
    }, 
    {
        "code": "if len(L1)==len(L2)and Gt==[]:", 
        "corresponding_lines": [
            745
        ], 
        "id": 839
    }, 
    {
        "code": "counts1.append(L1.count(i__))", 
        "corresponding_lines": [
            631
        ], 
        "id": 840
    }, 
    {
        "code": "return(L1[counts1.index(max(counts1))],max(counts1),type(L1[counts1.index(max(counts1))]))", 
        "corresponding_lines": [
            746
        ], 
        "id": 841
    }, 
    {
        "code": "if L1!=L2:", 
        "corresponding_lines": [
            752
        ], 
        "id": 842
    }, 
    {
        "code": "Gt.append(i)", 
        "corresponding_lines": [
            755, 
            1023
        ], 
        "id": 843
    }, 
    {
        "code": "if i in L1:", 
        "corresponding_lines": [
            754
        ], 
        "id": 844
    }, 
    {
        "code": "if Gt==Gt:", 
        "corresponding_lines": [
            757
        ], 
        "id": 845
    }, 
    {
        "code": "z=[]", 
        "corresponding_lines": [
            44
        ], 
        "id": 846
    }, 
    {
        "code": "zz=[]", 
        "corresponding_lines": [
            44
        ], 
        "id": 847
    }, 
    {
        "code": "zzz=[]", 
        "corresponding_lines": [
            44
        ], 
        "id": 848
    }, 
    {
        "code": "z.append(L1[x])", 
        "corresponding_lines": [
            779
        ], 
        "id": 849
    }, 
    {
        "code": "for x in range(0,len(L2)):", 
        "corresponding_lines": [
            780
        ], 
        "id": 850
    }, 
    {
        "code": "if L2[x]in L1:", 
        "corresponding_lines": [
            781
        ], 
        "id": 851
    }, 
    {
        "code": "zz.append(L2[x])", 
        "corresponding_lines": [
            782
        ], 
        "id": 852
    }, 
    {
        "code": "if len(z)!=len(L1):", 
        "corresponding_lines": [
            783
        ], 
        "id": 853
    }, 
    {
        "code": "if len(zz)!=len(L1):", 
        "corresponding_lines": [
            784
        ], 
        "id": 854
    }, 
    {
        "code": "elif i not in L2:", 
        "corresponding_lines": [
            786
        ], 
        "id": 855
    }, 
    {
        "code": "i=element", 
        "corresponding_lines": [
            790
        ], 
        "id": 856
    }, 
    {
        "code": "out=(i,L1.count(i),type(i))", 
        "corresponding_lines": [
            793
        ], 
        "id": 857
    }, 
    {
        "code": "final_tuple=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 858
    }, 
    {
        "code": "if L1.count(element)&gt;=most_repeat:", 
        "corresponding_lines": [
            662
        ], 
        "id": 859
    }, 
    {
        "code": "most_repeat=L1.count(element)", 
        "corresponding_lines": [
            663
        ], 
        "id": 860
    }, 
    {
        "code": "type_aux=type(element)", 
        "corresponding_lines": [
            797
        ], 
        "id": 861
    }, 
    {
        "code": "final_tuple=(y,)+(most_repeat,)+(type_aux,)", 
        "corresponding_lines": [
            798
        ], 
        "id": 862
    }, 
    {
        "code": "return final_tuple", 
        "corresponding_lines": [
            637
        ], 
        "id": 863
    }, 
    {
        "code": "if len(L2)==0:", 
        "corresponding_lines": [
            800, 
            1257
        ], 
        "id": 864
    }, 
    {
        "code": "if i==j:", 
        "corresponding_lines": [
            802
        ], 
        "id": 865
    }, 
    {
        "code": "L2_dict[i]=x", 
        "corresponding_lines": [
            804
        ], 
        "id": 866
    }, 
    {
        "code": "if i in L2_dict:", 
        "corresponding_lines": [
            806
        ], 
        "id": 867
    }, 
    {
        "code": "num_most_element=0", 
        "corresponding_lines": [
            809
        ], 
        "id": 868
    }, 
    {
        "code": "for n in range(len(L1)):", 
        "corresponding_lines": [
            810
        ], 
        "id": 869
    }, 
    {
        "code": "if L1.count(L1[n])&gt;num_most_element:", 
        "corresponding_lines": [
            811
        ], 
        "id": 870
    }, 
    {
        "code": "num_most_element=L1.count(L1[n])", 
        "corresponding_lines": [
            812
        ], 
        "id": 871
    }, 
    {
        "code": "index_most_element=n", 
        "corresponding_lines": [
            813
        ], 
        "id": 872
    }, 
    {
        "code": "return(L1[index_most_element],num_most_element,type(L1[index_most_element]))", 
        "corresponding_lines": [
            814
        ], 
        "id": 873
    }, 
    {
        "code": "if L1==[]and L2!=[]:", 
        "corresponding_lines": [
            822
        ], 
        "id": 874
    }, 
    {
        "code": "if L1!=[]and L2==[]:", 
        "corresponding_lines": [
            823
        ], 
        "id": 875
    }, 
    {
        "code": "def corrElts(L1,L2):", 
        "corresponding_lines": [
            824
        ], 
        "id": 876
    }, 
    {
        "code": "if not i in L1:", 
        "corresponding_lines": [
            826
        ], 
        "id": 877
    }, 
    {
        "code": "return corrElts(L1,L2)", 
        "corresponding_lines": [
            827
        ], 
        "id": 878
    }, 
    {
        "code": "def permuted(L1,L2):", 
        "corresponding_lines": [
            828
        ], 
        "id": 879
    }, 
    {
        "code": "a=[]", 
        "corresponding_lines": [
            829
        ], 
        "id": 880
    }, 
    {
        "code": "a.append(i)", 
        "corresponding_lines": [
            830
        ], 
        "id": 881
    }, 
    {
        "code": "if not i in a:", 
        "corresponding_lines": [
            831
        ], 
        "id": 882
    }, 
    {
        "code": "a.remove(i)", 
        "corresponding_lines": [
            832
        ], 
        "id": 883
    }, 
    {
        "code": "return permuted(L1,L2)", 
        "corresponding_lines": [
            833
        ], 
        "id": 884
    }, 
    {
        "code": "if i!=j and L1.count(i)&lt;L1.count(j):", 
        "corresponding_lines": [
            835
        ], 
        "id": 885
    }, 
    {
        "code": "L1.remove(i)", 
        "corresponding_lines": [
            836
        ], 
        "id": 886
    }, 
    {
        "code": "return(L1[0],L1.count(L1[0]),type(L1[0]))", 
        "corresponding_lines": [
            837
        ], 
        "id": 887
    }, 
    {
        "code": "Dict1[element]=L1.count(element)", 
        "corresponding_lines": [
            1026, 
            1244, 
            1309, 
            766
        ], 
        "id": 888
    }, 
    {
        "code": "for key in Dict1.keys():", 
        "corresponding_lines": [
            677
        ], 
        "id": 889
    }, 
    {
        "code": "max_count=Dict1[key]", 
        "corresponding_lines": [
            838
        ], 
        "id": 890
    }, 
    {
        "code": "return(max_count,max_count,type(max_count))", 
        "corresponding_lines": [
            839
        ], 
        "id": 891
    }, 
    {
        "code": "if L1_copy==[]:", 
        "corresponding_lines": [
            840
        ], 
        "id": 892
    }, 
    {
        "code": "e_most='Nothing'", 
        "corresponding_lines": [
            841
        ], 
        "id": 893
    }, 
    {
        "code": "for element in L1_copy:", 
        "corresponding_lines": [
            1186, 
            759
        ], 
        "id": 894
    }, 
    {
        "code": "if L1_copy.count(element)&gt;y:", 
        "corresponding_lines": [
            760
        ], 
        "id": 895
    }, 
    {
        "code": "y=L1_copy.count(element)", 
        "corresponding_lines": [
            761
        ], 
        "id": 896
    }, 
    {
        "code": "notperm=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 897
    }, 
    {
        "code": "notperm=1", 
        "corresponding_lines": [
            843, 
            844
        ], 
        "id": 898
    }, 
    {
        "code": "if notperm==1:", 
        "corresponding_lines": [
            845
        ], 
        "id": 899
    }, 
    {
        "code": "element=L1[element]", 
        "corresponding_lines": [
            848
        ], 
        "id": 900
    }, 
    {
        "code": "L1=L1.sort()", 
        "corresponding_lines": [
            852
        ], 
        "id": 901
    }, 
    {
        "code": "L2=L2.sort()", 
        "corresponding_lines": [
            853
        ], 
        "id": 902
    }, 
    {
        "code": "numcount=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 903
    }, 
    {
        "code": "if L1==[None]and L2==[None]:", 
        "corresponding_lines": [
            854
        ], 
        "id": 904
    }, 
    {
        "code": "for num in L1:", 
        "corresponding_lines": [
            856
        ], 
        "id": 905
    }, 
    {
        "code": "if num in L2:", 
        "corresponding_lines": [
            857
        ], 
        "id": 906
    }, 
    {
        "code": "numcount=L1.count(num)", 
        "corresponding_lines": [
            858
        ], 
        "id": 907
    }, 
    {
        "code": "return(num,numcount,type(num))", 
        "corresponding_lines": [
            859
        ], 
        "id": 908
    }, 
    {
        "code": "char_most=[[]]", 
        "corresponding_lines": [
            860
        ], 
        "id": 909
    }, 
    {
        "code": "if len(L1)is not len(L2):", 
        "corresponding_lines": [
            861
        ], 
        "id": 910
    }, 
    {
        "code": "if i__ in L1:", 
        "corresponding_lines": [
            863
        ], 
        "id": 911
    }, 
    {
        "code": "L2.append(i__)", 
        "corresponding_lines": [
            864
        ], 
        "id": 912
    }, 
    {
        "code": "L1.remove(i__)", 
        "corresponding_lines": [
            865
        ], 
        "id": 913
    }, 
    {
        "code": "if len(L2)==0 and len(L2)==0:", 
        "corresponding_lines": [
            866
        ], 
        "id": 914
    }, 
    {
        "code": "count___2=L2.count(element)", 
        "corresponding_lines": [
            160, 
            868, 
            1333
        ], 
        "id": 915
    }, 
    {
        "code": "out=(char_most,y,type(char_most))", 
        "corresponding_lines": [
            872
        ], 
        "id": 916
    }, 
    {
        "code": "L1=[]", 
        "corresponding_lines": [
            1304, 
            79
        ], 
        "id": 917
    }, 
    {
        "code": "if L1[i]==L1[i___3]:", 
        "corresponding_lines": [
            880, 
            875
        ], 
        "id": 918
    }, 
    {
        "code": "L1(n)", 
        "corresponding_lines": [
            877
        ], 
        "id": 919
    }, 
    {
        "code": "for i in range(len(L2)):", 
        "corresponding_lines": [
            878
        ], 
        "id": 920
    }, 
    {
        "code": "Gt.append(n)", 
        "corresponding_lines": [
            93
        ], 
        "id": 921
    }, 
    {
        "code": "if L1[i]==Gt[i]:", 
        "corresponding_lines": [
            880
        ], 
        "id": 922
    }, 
    {
        "code": "x=x+1", 
        "corresponding_lines": [
            296
        ], 
        "id": 923
    }, 
    {
        "code": "return true", 
        "corresponding_lines": [
            883
        ], 
        "id": 924
    }, 
    {
        "code": "condition=False", 
        "corresponding_lines": [
            567
        ], 
        "id": 925
    }, 
    {
        "code": "if element in L2 and L1.count(element)==L2.count(element):", 
        "corresponding_lines": [
            887
        ], 
        "id": 926
    }, 
    {
        "code": "condition=True", 
        "corresponding_lines": [
            888, 
            890
        ], 
        "id": 927
    }, 
    {
        "code": "if element in L1 and L2.count(element)==L1.count(element):", 
        "corresponding_lines": [
            889
        ], 
        "id": 928
    }, 
    {
        "code": "if condition==True:", 
        "corresponding_lines": [
            891
        ], 
        "id": 929
    }, 
    {
        "code": "if L1.count(element)&gt;L1.count(element-1):", 
        "corresponding_lines": [
            893
        ], 
        "id": 930
    }, 
    {
        "code": "item=L1.count(element)", 
        "corresponding_lines": [
            894
        ], 
        "id": 931
    }, 
    {
        "code": "return(item,L1.count(item),type(element))", 
        "corresponding_lines": [
            895
        ], 
        "id": 932
    }, 
    {
        "code": "for n in L1:", 
        "corresponding_lines": [
            896
        ], 
        "id": 933
    }, 
    {
        "code": "if L1[n]in L2:", 
        "corresponding_lines": [
            899
        ], 
        "id": 934
    }, 
    {
        "code": "if x==len(L2):", 
        "corresponding_lines": [
            901
        ], 
        "id": 935
    }, 
    {
        "code": "return", 
        "corresponding_lines": [
            902
        ], 
        "id": 936
    }, 
    {
        "code": "perm=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 937
    }, 
    {
        "code": "if L1.count(i)!=L2.count(i):", 
        "corresponding_lines": [
            911
        ], 
        "id": 938
    }, 
    {
        "code": "int=var1", 
        "corresponding_lines": [
            912
        ], 
        "id": 939
    }, 
    {
        "code": "str=var2", 
        "corresponding_lines": [
            913
        ], 
        "id": 940
    }, 
    {
        "code": "if int.count(i)&gt;str.count(i):", 
        "corresponding_lines": [
            914
        ], 
        "id": 941
    }, 
    {
        "code": "L1.append(var1.count(i),L1.count(i),type(i))", 
        "corresponding_lines": [
            915
        ], 
        "id": 942
    }, 
    {
        "code": "L1.append(var2.count(i),L1.count(i),type(i))", 
        "corresponding_lines": [
            916
        ], 
        "id": 943
    }, 
    {
        "code": "return perm", 
        "corresponding_lines": [
            917
        ], 
        "id": 944
    }, 
    {
        "code": "if L1.count(element)&gt;=y:", 
        "corresponding_lines": [
            918
        ], 
        "id": 945
    }, 
    {
        "code": "winner=element", 
        "corresponding_lines": [
            920
        ], 
        "id": 946
    }, 
    {
        "code": "type_of_winner=type(winner)", 
        "corresponding_lines": [
            921
        ], 
        "id": 947
    }, 
    {
        "code": "return(winner,y,type_of_winner)", 
        "corresponding_lines": [
            922
        ], 
        "id": 948
    }, 
    {
        "code": "most=''", 
        "corresponding_lines": [
            377
        ], 
        "id": 949
    }, 
    {
        "code": "if L1[element]!=L2[n]:", 
        "corresponding_lines": [
            932
        ], 
        "id": 950
    }, 
    {
        "code": "if L1.count(element)&gt;L2.count(n):", 
        "corresponding_lines": [
            933
        ], 
        "id": 951
    }, 
    {
        "code": "most=L1[element]", 
        "corresponding_lines": [
            934
        ], 
        "id": 952
    }, 
    {
        "code": "x=most.count(L1[element])", 
        "corresponding_lines": [
            935
        ], 
        "id": 953
    }, 
    {
        "code": "return(most,x)", 
        "corresponding_lines": [
            936
        ], 
        "id": 954
    }, 
    {
        "code": "if len(L1___2)==len(L2___2):", 
        "corresponding_lines": [
            937
        ], 
        "id": 955
    }, 
    {
        "code": "if L1___2.sort()==L2___2.sort():", 
        "corresponding_lines": [
            938
        ], 
        "id": 956
    }, 
    {
        "code": "while i&lt;len(L1___2):", 
        "corresponding_lines": [
            939
        ], 
        "id": 957
    }, 
    {
        "code": "elem=L1___2[i]", 
        "corresponding_lines": [
            940
        ], 
        "id": 958
    }, 
    {
        "code": "(L1___2.count)[elem]", 
        "corresponding_lines": [
            941
        ], 
        "id": 959
    }, 
    {
        "code": "print(L1___2[i],(L1___2.count)[L1___2[i]],type(L1___2[i]))", 
        "corresponding_lines": [
            942
        ], 
        "id": 960
    }, 
    {
        "code": "for i__ in range(0,len(L1)):", 
        "corresponding_lines": [
            944
        ], 
        "id": 961
    }, 
    {
        "code": "isPermutation=True", 
        "corresponding_lines": [
            190
        ], 
        "id": 962
    }, 
    {
        "code": "checkedLetters=[]", 
        "corresponding_lines": [
            956, 
            79
        ], 
        "id": 963
    }, 
    {
        "code": "print \"test\"", 
        "corresponding_lines": [
            946
        ], 
        "id": 964
    }, 
    {
        "code": "print \"false\"", 
        "corresponding_lines": [
            947
        ], 
        "id": 965
    }, 
    {
        "code": "print \"test2\"", 
        "corresponding_lines": [
            948
        ], 
        "id": 966
    }, 
    {
        "code": "if L1.count(i)!=L2.count(j):", 
        "corresponding_lines": [
            949
        ], 
        "id": 967
    }, 
    {
        "code": "isCheckedLetter=False", 
        "corresponding_lines": [
            950
        ], 
        "id": 968
    }, 
    {
        "code": "for k in checkedLetters:", 
        "corresponding_lines": [
            951
        ], 
        "id": 969
    }, 
    {
        "code": "if i==k:", 
        "corresponding_lines": [
            952
        ], 
        "id": 970
    }, 
    {
        "code": "isCheckedLetter=True", 
        "corresponding_lines": [
            953
        ], 
        "id": 971
    }, 
    {
        "code": "if isCheckedLetter==False:", 
        "corresponding_lines": [
            954
        ], 
        "id": 972
    }, 
    {
        "code": "isPermutation=False", 
        "corresponding_lines": [
            955
        ], 
        "id": 973
    }, 
    {
        "code": "x+=L1.count(i)", 
        "corresponding_lines": [
            957
        ], 
        "id": 974
    }, 
    {
        "code": "print \"test3\"", 
        "corresponding_lines": [
            958
        ], 
        "id": 975
    }, 
    {
        "code": "if isPermutation==True:", 
        "corresponding_lines": [
            959
        ], 
        "id": 976
    }, 
    {
        "code": "print \"true\"", 
        "corresponding_lines": [
            961
        ], 
        "id": 977
    }, 
    {
        "code": "c1=[]", 
        "corresponding_lines": [
            194
        ], 
        "id": 978
    }, 
    {
        "code": "c1[i]=L1.count(L1[i])", 
        "corresponding_lines": [
            962
        ], 
        "id": 979
    }, 
    {
        "code": "c2=[]", 
        "corresponding_lines": [
            964
        ], 
        "id": 980
    }, 
    {
        "code": "c2[i]=L2.count(L2[i])", 
        "corresponding_lines": [
            965
        ], 
        "id": 981
    }, 
    {
        "code": "mode=c1", 
        "corresponding_lines": [
            966
        ], 
        "id": 982
    }, 
    {
        "code": "frequency=max(c1)", 
        "corresponding_lines": [
            967
        ], 
        "id": 983
    }, 
    {
        "code": "return(mode,frequency,str(type(mode)))", 
        "corresponding_lines": [
            968
        ], 
        "id": 984
    }, 
    {
        "code": "for indexx in range(len(L2)):", 
        "corresponding_lines": [
            969
        ], 
        "id": 985
    }, 
    {
        "code": "if L1[i___3]==L2[indexx]:", 
        "corresponding_lines": [
            970
        ], 
        "id": 986
    }, 
    {
        "code": "count___2=L1.count(L1[i___3])", 
        "corresponding_lines": [
            971
        ], 
        "id": 987
    }, 
    {
        "code": "count2=L2.count(L2[indexx])", 
        "corresponding_lines": [
            972
        ], 
        "id": 988
    }, 
    {
        "code": "count=L1[i___3]", 
        "corresponding_lines": [
            974
        ], 
        "id": 989
    }, 
    {
        "code": "if count___2==count2:", 
        "corresponding_lines": [
            975
        ], 
        "id": 990
    }, 
    {
        "code": "tup=(count,num_most,type(count))", 
        "corresponding_lines": [
            976
        ], 
        "id": 991
    }, 
    {
        "code": "def repeatmost():", 
        "corresponding_lines": [
            978
        ], 
        "id": 992
    }, 
    {
        "code": "L3=L1+L2", 
        "corresponding_lines": [
            979
        ], 
        "id": 993
    }, 
    {
        "code": "maxvalue=0", 
        "corresponding_lines": [
            980
        ], 
        "id": 994
    }, 
    {
        "code": "corresponding_key=\"\"", 
        "corresponding_lines": [
            981
        ], 
        "id": 995
    }, 
    {
        "code": "DictL3={}", 
        "corresponding_lines": [
            982
        ], 
        "id": 996
    }, 
    {
        "code": "for i in L3:", 
        "corresponding_lines": [
            983
        ], 
        "id": 997
    }, 
    {
        "code": "if i not in DictL3:", 
        "corresponding_lines": [
            984
        ], 
        "id": 998
    }, 
    {
        "code": "DictL3[i]=1", 
        "corresponding_lines": [
            985
        ], 
        "id": 999
    }, 
    {
        "code": "DictL3[i]=DictL3[i]+1", 
        "corresponding_lines": [
            986
        ], 
        "id": 1000
    }, 
    {
        "code": "for key in DictL3:", 
        "corresponding_lines": [
            987
        ], 
        "id": 1001
    }, 
    {
        "code": "if DictL3[key]&gt;maxvalue:", 
        "corresponding_lines": [
            988
        ], 
        "id": 1002
    }, 
    {
        "code": "maxvalue=DictL3[key]", 
        "corresponding_lines": [
            989
        ], 
        "id": 1003
    }, 
    {
        "code": "corresponding_key=key", 
        "corresponding_lines": [
            990
        ], 
        "id": 1004
    }, 
    {
        "code": "return corresponding_key", 
        "corresponding_lines": [
            991
        ], 
        "id": 1005
    }, 
    {
        "code": "ans2=repeatmost()", 
        "corresponding_lines": [
            992
        ], 
        "id": 1006
    }, 
    {
        "code": "print ans2", 
        "corresponding_lines": [
            993
        ], 
        "id": 1007
    }, 
    {
        "code": "print corresponding_key", 
        "corresponding_lines": [
            994
        ], 
        "id": 1008
    }, 
    {
        "code": "print type(corresponding_key)", 
        "corresponding_lines": [
            995
        ], 
        "id": 1009
    }, 
    {
        "code": "def permutation_function():", 
        "corresponding_lines": [
            996
        ], 
        "id": 1010
    }, 
    {
        "code": "DictL1={}", 
        "corresponding_lines": [
            998
        ], 
        "id": 1011
    }, 
    {
        "code": "if i not in DictL1:", 
        "corresponding_lines": [
            1000
        ], 
        "id": 1012
    }, 
    {
        "code": "DictL1[i]=1", 
        "corresponding_lines": [
            1001
        ], 
        "id": 1013
    }, 
    {
        "code": "DictL1[i]=DictL1[i]+1", 
        "corresponding_lines": [
            1002
        ], 
        "id": 1014
    }, 
    {
        "code": "DictL2={}", 
        "corresponding_lines": [
            1003
        ], 
        "id": 1015
    }, 
    {
        "code": "for i in DictL2:", 
        "corresponding_lines": [
            1004
        ], 
        "id": 1016
    }, 
    {
        "code": "if i not in DictL2:", 
        "corresponding_lines": [
            1005
        ], 
        "id": 1017
    }, 
    {
        "code": "DictL2[i]=1", 
        "corresponding_lines": [
            1006
        ], 
        "id": 1018
    }, 
    {
        "code": "DictL2[i]=DictL2[i]+1", 
        "corresponding_lines": [
            1007
        ], 
        "id": 1019
    }, 
    {
        "code": "for key in DictL1:", 
        "corresponding_lines": [
            1008
        ], 
        "id": 1020
    }, 
    {
        "code": "if key in DictL2:", 
        "corresponding_lines": [
            1009
        ], 
        "id": 1021
    }, 
    {
        "code": "if DictL1[key]!=DictL2[key]:", 
        "corresponding_lines": [
            1010
        ], 
        "id": 1022
    }, 
    {
        "code": "if DictL2[i]==0 and DictL1[i]==0:", 
        "corresponding_lines": [
            1011
        ], 
        "id": 1023
    }, 
    {
        "code": "ans=permutation_function()", 
        "corresponding_lines": [
            1012
        ], 
        "id": 1024
    }, 
    {
        "code": "def creating_tuple_of_results():", 
        "corresponding_lines": [
            1013
        ], 
        "id": 1025
    }, 
    {
        "code": "tuple.append(ans2)", 
        "corresponding_lines": [
            1015
        ], 
        "id": 1026
    }, 
    {
        "code": "tuple.append(corresponding_key)", 
        "corresponding_lines": [
            1016
        ], 
        "id": 1027
    }, 
    {
        "code": "tuple.append(type(corresponding_key))", 
        "corresponding_lines": [
            1017
        ], 
        "id": 1028
    }, 
    {
        "code": "L2=set(L1)", 
        "corresponding_lines": [
            1018
        ], 
        "id": 1029
    }, 
    {
        "code": "L2=set(L2)", 
        "corresponding_lines": [
            1019
        ], 
        "id": 1030
    }, 
    {
        "code": "if len(Gt)!=len(L2):", 
        "corresponding_lines": [
            1024
        ], 
        "id": 1031
    }, 
    {
        "code": "if len(L1)==len(L2)and len(L1)&gt;0:", 
        "corresponding_lines": [
            1025
        ], 
        "id": 1032
    }, 
    {
        "code": "return(Dict1.keys()[-1],Dict1.values()[-1],type(Dict1.keys()[-1]))", 
        "corresponding_lines": [
            1027
        ], 
        "id": 1033
    }, 
    {
        "code": "if L2[i___3]not in L1:", 
        "corresponding_lines": [
            1031
        ], 
        "id": 1034
    }, 
    {
        "code": "Gt.append(out)", 
        "corresponding_lines": [
            1035
        ], 
        "id": 1035
    }, 
    {
        "code": "return Gt[max(Gt)]", 
        "corresponding_lines": [
            1036
        ], 
        "id": 1036
    }, 
    {
        "code": "if L1.count(i)&gt;=num_most:", 
        "corresponding_lines": [
            1042
        ], 
        "id": 1037
    }, 
    {
        "code": "num_most=L1.count(i)", 
        "corresponding_lines": [
            1043
        ], 
        "id": 1038
    }, 
    {
        "code": "maxitem=i", 
        "corresponding_lines": [
            1044
        ], 
        "id": 1039
    }, 
    {
        "code": "if L1.count(element)&gt;count:", 
        "corresponding_lines": [
            409
        ], 
        "id": 1040
    }, 
    {
        "code": "tup=(maxitem,count,type(maxitem))", 
        "corresponding_lines": [
            77
        ], 
        "id": 1041
    }, 
    {
        "code": "if count___2!=count___2:", 
        "corresponding_lines": [
            1046
        ], 
        "id": 1042
    }, 
    {
        "code": "return(count___2,element,type(element))", 
        "corresponding_lines": [
            1047
        ], 
        "id": 1043
    }, 
    {
        "code": "while element&lt;len(L1):", 
        "corresponding_lines": [
            1051
        ], 
        "id": 1044
    }, 
    {
        "code": "if L1.count(L1[element])==L2.count(L2[element])and L1[element]in L2:", 
        "corresponding_lines": [
            1052
        ], 
        "id": 1045
    }, 
    {
        "code": "element+=1", 
        "corresponding_lines": [
            1053
        ], 
        "id": 1046
    }, 
    {
        "code": "typ=0", 
        "corresponding_lines": [
            1054
        ], 
        "id": 1047
    }, 
    {
        "code": "typ=type(element)", 
        "corresponding_lines": [
            1059
        ], 
        "id": 1048
    }, 
    {
        "code": "return(y,y,type)", 
        "corresponding_lines": [
            1060
        ], 
        "id": 1049
    }, 
    {
        "code": "for otherelement in L1:", 
        "corresponding_lines": [
            1063
        ], 
        "id": 1050
    }, 
    {
        "code": "if L1.count(element)&lt;L1.count(otherelement):", 
        "corresponding_lines": [
            1064
        ], 
        "id": 1051
    }, 
    {
        "code": "element=element", 
        "corresponding_lines": [
            1065
        ], 
        "id": 1052
    }, 
    {
        "code": "if L1.count(element)&gt;L1.count(p):", 
        "corresponding_lines": [
            1066
        ], 
        "id": 1053
    }, 
    {
        "code": "p=element", 
        "corresponding_lines": [
            1299, 
            566
        ], 
        "id": 1054
    }, 
    {
        "code": "return(p,L1.count(p),type(p))", 
        "corresponding_lines": [
            1067
        ], 
        "id": 1055
    }, 
    {
        "code": "if len(L1)==len(L2)==0:", 
        "corresponding_lines": [
            1144, 
            1176, 
            1068
        ], 
        "id": 1056
    }, 
    {
        "code": "Gt.append(element___2)", 
        "corresponding_lines": [
            1252, 
            1069
        ], 
        "id": 1057
    }, 
    {
        "code": "counter=1", 
        "corresponding_lines": [
            1070
        ], 
        "id": 1058
    }, 
    {
        "code": "if L1.count(element___2)&gt;=counter:", 
        "corresponding_lines": [
            1071
        ], 
        "id": 1059
    }, 
    {
        "code": "counter=L1.count(element___2)", 
        "corresponding_lines": [
            1072
        ], 
        "id": 1060
    }, 
    {
        "code": "maxitem=element___2", 
        "corresponding_lines": [
            664, 
            441
        ], 
        "id": 1061
    }, 
    {
        "code": "if(L1.count)[i]==(L2.count)[i]:", 
        "corresponding_lines": [
            1075
        ], 
        "id": 1062
    }, 
    {
        "code": "return(i,(L1.count)[i],type(i))", 
        "corresponding_lines": [
            1076
        ], 
        "id": 1063
    }, 
    {
        "code": "if i not in L1 or i not in L2:", 
        "corresponding_lines": [
            1077
        ], 
        "id": 1064
    }, 
    {
        "code": "if L1.sort==L2.sort:", 
        "corresponding_lines": [
            1078
        ], 
        "id": 1065
    }, 
    {
        "code": "counter=0", 
        "corresponding_lines": [
            1079
        ], 
        "id": 1066
    }, 
    {
        "code": "counter+=len(L1[i])", 
        "corresponding_lines": [
            1080
        ], 
        "id": 1067
    }, 
    {
        "code": "\"\"\"one again, this section between the comment is supposed to do it, but", 
        "corresponding_lines": [
            1081
        ], 
        "id": 1068
    }, 
    {
        "code": "I programmed it wrong\"\"\"", 
        "corresponding_lines": [
            1082
        ], 
        "id": 1069
    }, 
    {
        "code": "print(counter,L1.count(counter),type(counter))", 
        "corresponding_lines": [
            1083
        ], 
        "id": 1070
    }, 
    {
        "code": "if L1.count(L1[x])==L2.count(L1[x]):", 
        "corresponding_lines": [
            1085
        ], 
        "id": 1071
    }, 
    {
        "code": "a=element", 
        "corresponding_lines": [
            920
        ], 
        "id": 1072
    }, 
    {
        "code": "max_count=int(y)", 
        "corresponding_lines": [
            1087
        ], 
        "id": 1073
    }, 
    {
        "code": "c=type(element)", 
        "corresponding_lines": [
            1088
        ], 
        "id": 1074
    }, 
    {
        "code": "L3=[a,max_count,c]", 
        "corresponding_lines": [
            1089
        ], 
        "id": 1075
    }, 
    {
        "code": "return tuple(L3)", 
        "corresponding_lines": [
            1090
        ], 
        "id": 1076
    }, 
    {
        "code": "L2.remove(element)", 
        "corresponding_lines": [
            1129, 
            1101
        ], 
        "id": 1077
    }, 
    {
        "code": "if len(L2)==0 and x==0:", 
        "corresponding_lines": [
            1103
        ], 
        "id": 1078
    }, 
    {
        "code": "perm_list=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1079
    }, 
    {
        "code": "for i in range(len(L1___2)):", 
        "corresponding_lines": [
            1104
        ], 
        "id": 1080
    }, 
    {
        "code": "for i in range(len(L2___2)):", 
        "corresponding_lines": [
            1105
        ], 
        "id": 1081
    }, 
    {
        "code": "if L1___2[i]==L2___2[i]:", 
        "corresponding_lines": [
            1106
        ], 
        "id": 1082
    }, 
    {
        "code": "L.append([L1___2[i],L1___2.count(L1___2[i]),type(L1___2[i])])", 
        "corresponding_lines": [
            1107
        ], 
        "id": 1083
    }, 
    {
        "code": "for element in L:", 
        "corresponding_lines": [
            1108
        ], 
        "id": 1084
    }, 
    {
        "code": "if element[1]&gt;most_repeat:", 
        "corresponding_lines": [
            1109
        ], 
        "id": 1085
    }, 
    {
        "code": "most_repeat=element[1]", 
        "corresponding_lines": [
            1110
        ], 
        "id": 1086
    }, 
    {
        "code": "return e_most", 
        "corresponding_lines": [
            1112
        ], 
        "id": 1087
    }, 
    {
        "code": "max_list=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1088
    }, 
    {
        "code": "type_list=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1089
    }, 
    {
        "code": "if len(L1)!=len(L2)or L1.count([x])!=L2.count(L1[x]):", 
        "corresponding_lines": [
            1119
        ], 
        "id": 1090
    }, 
    {
        "code": "elif L1.count(L1[x])==L2.count(L1[x]):", 
        "corresponding_lines": [
            1120
        ], 
        "id": 1091
    }, 
    {
        "code": "max_list.append(int(L1.count(L1[x])))", 
        "corresponding_lines": [
            1121
        ], 
        "id": 1092
    }, 
    {
        "code": "type_list.append(L1[x])", 
        "corresponding_lines": [
            1122
        ], 
        "id": 1093
    }, 
    {
        "code": "t1=(type_list[0],max(max_list),type(type_list[0]))", 
        "corresponding_lines": [
            1123
        ], 
        "id": 1094
    }, 
    {
        "code": "match=True", 
        "corresponding_lines": [
            1128, 
            190
        ], 
        "id": 1095
    }, 
    {
        "code": "match==False", 
        "corresponding_lines": [
            1124
        ], 
        "id": 1096
    }, 
    {
        "code": "if match==True:", 
        "corresponding_lines": [
            1137, 
            1125
        ], 
        "id": 1097
    }, 
    {
        "code": "match=False", 
        "corresponding_lines": [
            1130
        ], 
        "id": 1098
    }, 
    {
        "code": "if L1.count(element)==max(counts):", 
        "corresponding_lines": [
            1135
        ], 
        "id": 1099
    }, 
    {
        "code": "if L1.count(element)&gt;=2:", 
        "corresponding_lines": [
            1140
        ], 
        "id": 1100
    }, 
    {
        "code": "if element not in elements1:", 
        "corresponding_lines": [
            1145
        ], 
        "id": 1101
    }, 
    {
        "code": "elements1[element]=L1.count(element)", 
        "corresponding_lines": [
            1092
        ], 
        "id": 1102
    }, 
    {
        "code": "if element not in elements2:", 
        "corresponding_lines": [
            1146
        ], 
        "id": 1103
    }, 
    {
        "code": "elements2[element]=L2.count(element)", 
        "corresponding_lines": [
            1095
        ], 
        "id": 1104
    }, 
    {
        "code": "for element in elements1:", 
        "corresponding_lines": [
            1147, 
            1150
        ], 
        "id": 1105
    }, 
    {
        "code": "if element not in elements2 or elements1[element]!=elements2[element]:", 
        "corresponding_lines": [
            1148
        ], 
        "id": 1106
    }, 
    {
        "code": "max_count=max(elements1.values())", 
        "corresponding_lines": [
            1149
        ], 
        "id": 1107
    }, 
    {
        "code": "if elements1[element]==max_count:", 
        "corresponding_lines": [
            1151
        ], 
        "id": 1108
    }, 
    {
        "code": "return(element,max_count,type(element))", 
        "corresponding_lines": [
            1152
        ], 
        "id": 1109
    }, 
    {
        "code": "if i__ in L2_dict.keys():", 
        "corresponding_lines": [
            17
        ], 
        "id": 1110
    }, 
    {
        "code": "L2_dict[i__]+=1", 
        "corresponding_lines": [
            18, 
            22
        ], 
        "id": 1111
    }, 
    {
        "code": "for count___2 in L2_dict.values():", 
        "corresponding_lines": [
            1154
        ], 
        "id": 1112
    }, 
    {
        "code": "return(i__,y,type(i__))", 
        "corresponding_lines": [
            1156
        ], 
        "id": 1113
    }, 
    {
        "code": "newL1=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1114
    }, 
    {
        "code": "newL2=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1115
    }, 
    {
        "code": "newL1+=i", 
        "corresponding_lines": [
            1158
        ], 
        "id": 1116
    }, 
    {
        "code": "if i in newL1:", 
        "corresponding_lines": [
            1160
        ], 
        "id": 1117
    }, 
    {
        "code": "newL2+=i", 
        "corresponding_lines": [
            1161
        ], 
        "id": 1118
    }, 
    {
        "code": "if newL1==newL2:", 
        "corresponding_lines": [
            1162
        ], 
        "id": 1119
    }, 
    {
        "code": "t=(newL1.count(),newL1.sum(newL1.count()),type())", 
        "corresponding_lines": [
            1163
        ], 
        "id": 1120
    }, 
    {
        "code": "check=''", 
        "corresponding_lines": [
            1172
        ], 
        "id": 1121
    }, 
    {
        "code": "check+='f'", 
        "corresponding_lines": [
            1174
        ], 
        "id": 1122
    }, 
    {
        "code": "if 'f' in check:", 
        "corresponding_lines": [
            1175
        ], 
        "id": 1123
    }, 
    {
        "code": "if i__ in L2 and len(L2)&gt;=0:", 
        "corresponding_lines": [
            1179
        ], 
        "id": 1124
    }, 
    {
        "code": "return is_list_permutation(L1.remove(i__),L2.remove(i__))", 
        "corresponding_lines": [
            1181
        ], 
        "id": 1125
    }, 
    {
        "code": "list2=[]", 
        "corresponding_lines": [
            1182
        ], 
        "id": 1126
    }, 
    {
        "code": "for i in Gt:", 
        "corresponding_lines": [
            605
        ], 
        "id": 1127
    }, 
    {
        "code": "list2.append(Gt.count(i))", 
        "corresponding_lines": [
            1183
        ], 
        "id": 1128
    }, 
    {
        "code": "result=(i,max(list2),type(i))", 
        "corresponding_lines": [
            1184
        ], 
        "id": 1129
    }, 
    {
        "code": "print result", 
        "corresponding_lines": [
            1185
        ], 
        "id": 1130
    }, 
    {
        "code": "count1=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 1131
    }, 
    {
        "code": "count1=count1+1", 
        "corresponding_lines": [
            328
        ], 
        "id": 1132
    }, 
    {
        "code": "count2=0", 
        "corresponding_lines": [
            96
        ], 
        "id": 1133
    }, 
    {
        "code": "count2=count2+1", 
        "corresponding_lines": [
            334
        ], 
        "id": 1134
    }, 
    {
        "code": "if count1!=count2:", 
        "corresponding_lines": [
            651
        ], 
        "id": 1135
    }, 
    {
        "code": "return((most_common,L1.count(most_common),type(most_common)),L1)", 
        "corresponding_lines": [
            1199
        ], 
        "id": 1136
    }, 
    {
        "code": "if L1.count(maxitem)&lt;L1.count(element___2):", 
        "corresponding_lines": [
            1201
        ], 
        "id": 1137
    }, 
    {
        "code": "return i", 
        "corresponding_lines": [
            1203
        ], 
        "id": 1138
    }, 
    {
        "code": "count+=i", 
        "corresponding_lines": [
            1204
        ], 
        "id": 1139
    }, 
    {
        "code": "return is_list_permutation(L1,L2)", 
        "corresponding_lines": [
            1205
        ], 
        "id": 1140
    }, 
    {
        "code": "L2.count(j)", 
        "corresponding_lines": [
            1208
        ], 
        "id": 1141
    }, 
    {
        "code": "if element___2 not in L2 or L1.count(element___2)!=L2.count(element___2):", 
        "corresponding_lines": [
            1210
        ], 
        "id": 1142
    }, 
    {
        "code": "out=[0,0,0]", 
        "corresponding_lines": [
            1211
        ], 
        "id": 1143
    }, 
    {
        "code": "if L1.count(element___2)&gt;out[1]:", 
        "corresponding_lines": [
            1212
        ], 
        "id": 1144
    }, 
    {
        "code": "out[1]=L1.count(element___2)", 
        "corresponding_lines": [
            1213
        ], 
        "id": 1145
    }, 
    {
        "code": "out[0]=element___2", 
        "corresponding_lines": [
            1214
        ], 
        "id": 1146
    }, 
    {
        "code": "out[2]=type(element___2)", 
        "corresponding_lines": [
            1215
        ], 
        "id": 1147
    }, 
    {
        "code": "tup=(out[0],out[1],out[2])", 
        "corresponding_lines": [
            1216
        ], 
        "id": 1148
    }, 
    {
        "code": "t1=()", 
        "corresponding_lines": [
            247
        ], 
        "id": 1149
    }, 
    {
        "code": "elements=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1150
    }, 
    {
        "code": "if L1[i___3]in L2 and L2[i___3]in L1:", 
        "corresponding_lines": [
            1217
        ], 
        "id": 1151
    }, 
    {
        "code": "elements.append(L1[i___3])", 
        "corresponding_lines": [
            779
        ], 
        "id": 1152
    }, 
    {
        "code": "for j in range(len(elements)-1):", 
        "corresponding_lines": [
            1219
        ], 
        "id": 1153
    }, 
    {
        "code": "k=j+1", 
        "corresponding_lines": [
            1220
        ], 
        "id": 1154
    }, 
    {
        "code": "most_Occuring=elements[j]", 
        "corresponding_lines": [
            1221
        ], 
        "id": 1155
    }, 
    {
        "code": "if elements.count(elements[k])&gt;elements.count(elements[j]):", 
        "corresponding_lines": [
            1222
        ], 
        "id": 1156
    }, 
    {
        "code": "most_Occuring=elements[k]", 
        "corresponding_lines": [
            1223
        ], 
        "id": 1157
    }, 
    {
        "code": "t1=(most_Occuring,elements.count(elements[k]),type(elements[k]))", 
        "corresponding_lines": [
            1224
        ], 
        "id": 1158
    }, 
    {
        "code": "if is_perm==True:", 
        "corresponding_lines": [
            1225
        ], 
        "id": 1159
    }, 
    {
        "code": "return t1", 
        "corresponding_lines": [
            1226
        ], 
        "id": 1160
    }, 
    {
        "code": "L2=('').join(L2)", 
        "corresponding_lines": [
            1227
        ], 
        "id": 1161
    }, 
    {
        "code": "if len(L1_copy)==0:", 
        "corresponding_lines": [
            1238
        ], 
        "id": 1162
    }, 
    {
        "code": "maxitem=L1_copy[0]", 
        "corresponding_lines": [
            1239
        ], 
        "id": 1163
    }, 
    {
        "code": "if L1_copy.count(element)&gt;L1_copy.count(maxitem):", 
        "corresponding_lines": [
            1240
        ], 
        "id": 1164
    }, 
    {
        "code": "return(maxitem,L1_copy.count(maxitem),type(maxitem))", 
        "corresponding_lines": [
            1242
        ], 
        "id": 1165
    }, 
    {
        "code": "truefalse=True", 
        "corresponding_lines": [
            190
        ], 
        "id": 1166
    }, 
    {
        "code": "truefalse=False", 
        "corresponding_lines": [
            203, 
            223
        ], 
        "id": 1167
    }, 
    {
        "code": "return truefalse", 
        "corresponding_lines": [
            322, 
            917
        ], 
        "id": 1168
    }, 
    {
        "code": "if truefalse==True:", 
        "corresponding_lines": [
            1243
        ], 
        "id": 1169
    }, 
    {
        "code": "return max_count", 
        "corresponding_lines": [
            1246
        ], 
        "id": 1170
    }, 
    {
        "code": "if L1.count(element___2)&gt;count__:", 
        "corresponding_lines": [
            409
        ], 
        "id": 1171
    }, 
    {
        "code": "count__=L1.count(element___2)", 
        "corresponding_lines": [
            410
        ], 
        "id": 1172
    }, 
    {
        "code": "max_element=Gt[len(Gt)-1]", 
        "corresponding_lines": [
            1253
        ], 
        "id": 1173
    }, 
    {
        "code": "tup=(max_element,count__,type(max_element))", 
        "corresponding_lines": [
            77
        ], 
        "id": 1174
    }, 
    {
        "code": "if L1[i__]in L2:", 
        "corresponding_lines": [
            1255
        ], 
        "id": 1175
    }, 
    {
        "code": "L2.remove(L1[i__])", 
        "corresponding_lines": [
            1256
        ], 
        "id": 1176
    }, 
    {
        "code": "L2.remove(L1[i___3])", 
        "corresponding_lines": [
            1268
        ], 
        "id": 1177
    }, 
    {
        "code": "if L2==[]:", 
        "corresponding_lines": [
            1269
        ], 
        "id": 1178
    }, 
    {
        "code": "return(L1[counts.index(max(counts))],max(counts),type(counts.index(max(counts))))", 
        "corresponding_lines": [
            1270
        ], 
        "id": 1179
    }, 
    {
        "code": "if L1.count(i)&gt;=y:", 
        "corresponding_lines": [
            1273
        ], 
        "id": 1180
    }, 
    {
        "code": "if y&gt;0:", 
        "corresponding_lines": [
            1276
        ], 
        "id": 1181
    }, 
    {
        "code": "return(y,y,type(y))", 
        "corresponding_lines": [
            235
        ], 
        "id": 1182
    }, 
    {
        "code": "Dict1[i__]=1", 
        "corresponding_lines": [
            19
        ], 
        "id": 1183
    }, 
    {
        "code": "Dict1[i__]+=1", 
        "corresponding_lines": [
            18
        ], 
        "id": 1184
    }, 
    {
        "code": "if i__ not in L2_dict.keys():", 
        "corresponding_lines": [
            1260
        ], 
        "id": 1185
    }, 
    {
        "code": "for key___2 in Dict1.keys():", 
        "corresponding_lines": [
            1262
        ], 
        "id": 1186
    }, 
    {
        "code": "if Dict1[key___2]!=L2_dict[key___2]:", 
        "corresponding_lines": [
            1263
        ], 
        "id": 1187
    }, 
    {
        "code": "keys=Dict1.keys()", 
        "corresponding_lines": [
            1277
        ], 
        "id": 1188
    }, 
    {
        "code": "max_el=keys[0]", 
        "corresponding_lines": [
            1278
        ], 
        "id": 1189
    }, 
    {
        "code": "if Dict1[key]&gt;Dict1[max_el]:", 
        "corresponding_lines": [
            1279
        ], 
        "id": 1190
    }, 
    {
        "code": "return(max_el,Dict1[max_el],type(max_el))", 
        "corresponding_lines": [
            1099
        ], 
        "id": 1191
    }, 
    {
        "code": "if L1[i___3]!=L2[L2.index(L1[i___3])]:", 
        "corresponding_lines": [
            1280
        ], 
        "id": 1192
    }, 
    {
        "code": "repeat=0", 
        "corresponding_lines": [
            71
        ], 
        "id": 1193
    }, 
    {
        "code": "if L1.count(L1[i___3])&gt;repeat:", 
        "corresponding_lines": [
            1281
        ], 
        "id": 1194
    }, 
    {
        "code": "y=i___3", 
        "corresponding_lines": [
            1282
        ], 
        "id": 1195
    }, 
    {
        "code": "repeat=L1.count(L1[i___3])", 
        "corresponding_lines": [
            1283
        ], 
        "id": 1196
    }, 
    {
        "code": "return(L1[y],repeat,type(L1[y]))", 
        "corresponding_lines": [
            1284
        ], 
        "id": 1197
    }, 
    {
        "code": "L2.append(element)", 
        "corresponding_lines": [
            1287
        ], 
        "id": 1198
    }, 
    {
        "code": "Dict1[element]=L2.count(element)", 
        "corresponding_lines": [
            1289
        ], 
        "id": 1199
    }, 
    {
        "code": "if Dict1[element]==max_count:", 
        "corresponding_lines": [
            1292
        ], 
        "id": 1200
    }, 
    {
        "code": "return(element,L1.count(element),type(element))", 
        "corresponding_lines": [
            1293
        ], 
        "id": 1201
    }, 
    {
        "code": "for i in range(0,len(L1)):", 
        "corresponding_lines": [
            1294
        ], 
        "id": 1202
    }, 
    {
        "code": "for j in range(0,len(L2)):", 
        "corresponding_lines": [
            1295
        ], 
        "id": 1203
    }, 
    {
        "code": "if L1[i]!=L2[j]:", 
        "corresponding_lines": [
            1296
        ], 
        "id": 1204
    }, 
    {
        "code": "elif L1.count(element)&gt;=y:", 
        "corresponding_lines": [
            1297
        ], 
        "id": 1205
    }, 
    {
        "code": "return(p,y,type(p))", 
        "corresponding_lines": [
            1300
        ], 
        "id": 1206
    }, 
    {
        "code": "L1.append(element)", 
        "corresponding_lines": [
            1305, 
            1302
        ], 
        "id": 1207
    }, 
    {
        "code": "elif L1.count(element)&gt;L1.count(L1[0]):", 
        "corresponding_lines": [
            1303
        ], 
        "id": 1208
    }, 
    {
        "code": "for i__ in Dict1.keys():", 
        "corresponding_lines": [
            1403, 
            1311
        ], 
        "id": 1209
    }, 
    {
        "code": "return(i__,Dict1[i__],type(i__))", 
        "corresponding_lines": [
            1313
        ], 
        "id": 1210
    }, 
    {
        "code": "L2_copy=L2[:]", 
        "corresponding_lines": [
            1315
        ], 
        "id": 1211
    }, 
    {
        "code": "if i__ not in L2_copy:", 
        "corresponding_lines": [
            1317
        ], 
        "id": 1212
    }, 
    {
        "code": "L1_copy.remove(i__)", 
        "corresponding_lines": [
            1318
        ], 
        "id": 1213
    }, 
    {
        "code": "L2_copy.remove(i__)", 
        "corresponding_lines": [
            1319
        ], 
        "id": 1214
    }, 
    {
        "code": "Gt=['']", 
        "corresponding_lines": [
            1320
        ], 
        "id": 1215
    }, 
    {
        "code": "if thing not in Gt:", 
        "corresponding_lines": [
            1321
        ], 
        "id": 1216
    }, 
    {
        "code": "count___2=L1.count(thing)", 
        "corresponding_lines": [
            1322
        ], 
        "id": 1217
    }, 
    {
        "code": "if count___2&gt;count:", 
        "corresponding_lines": [
            1323
        ], 
        "id": 1218
    }, 
    {
        "code": "count=count___2", 
        "corresponding_lines": [
            706
        ], 
        "id": 1219
    }, 
    {
        "code": "Gt[0]=thing", 
        "corresponding_lines": [
            1324
        ], 
        "id": 1220
    }, 
    {
        "code": "return(Gt[0],count,type(Gt[0]))", 
        "corresponding_lines": [
            205
        ], 
        "id": 1221
    }, 
    {
        "code": "permutations_type=[]", 
        "corresponding_lines": [
            79
        ], 
        "id": 1222
    }, 
    {
        "code": "Gt.append(count___2)", 
        "corresponding_lines": [
            1334
        ], 
        "id": 1223
    }, 
    {
        "code": "permutations_type.append(type(element))", 
        "corresponding_lines": [
            1335
        ], 
        "id": 1224
    }, 
    {
        "code": "return(L2,Gt,permutations_type)", 
        "corresponding_lines": [
            1336
        ], 
        "id": 1225
    }, 
    {
        "code": "L2___3=L1[:]", 
        "corresponding_lines": [
            1314
        ], 
        "id": 1226
    }, 
    {
        "code": "L2___3.remove(i)", 
        "corresponding_lines": [
            1339
        ], 
        "id": 1227
    }, 
    {
        "code": "return(i,L1.count(i),type(i))", 
        "corresponding_lines": [
            1341
        ], 
        "id": 1228
    }, 
    {
        "code": "if L1.count(element)&gt;L1.count(maxitem):", 
        "corresponding_lines": [
            1143
        ], 
        "id": 1229
    }, 
    {
        "code": "if L1!=[]or L2!=[]:", 
        "corresponding_lines": [
            1358
        ], 
        "id": 1230
    }, 
    {
        "code": "if L1==[]or L2==[]:", 
        "corresponding_lines": [
            1359
        ], 
        "id": 1231
    }, 
    {
        "code": "count__=1", 
        "corresponding_lines": [
            1360, 
            1363, 
            1365
        ], 
        "id": 1232
    }, 
    {
        "code": "if L1.count(element___2)&gt;y:", 
        "corresponding_lines": [
            1366
        ], 
        "id": 1233
    }, 
    {
        "code": "y=L1.count(element___2)", 
        "corresponding_lines": [
            1367
        ], 
        "id": 1234
    }, 
    {
        "code": "e_most=element___2", 
        "corresponding_lines": [
            1368
        ], 
        "id": 1235
    }, 
    {
        "code": "elt_type=type(element___2)", 
        "corresponding_lines": [
            1369
        ], 
        "id": 1236
    }, 
    {
        "code": "if count__==1:", 
        "corresponding_lines": [
            1370
        ], 
        "id": 1237
    }, 
    {
        "code": "tupl=(e_most,y,elt_type)", 
        "corresponding_lines": [
            1372
        ], 
        "id": 1238
    }, 
    {
        "code": "return tupl", 
        "corresponding_lines": [
            1373
        ], 
        "id": 1239
    }, 
    {
        "code": "for i in range(len(L1)-1):", 
        "corresponding_lines": [
            1374
        ], 
        "id": 1240
    }, 
    {
        "code": "for j in range(len(L2)-1):", 
        "corresponding_lines": [
            1375
        ], 
        "id": 1241
    }, 
    {
        "code": "if L1[i]==L2[j]:", 
        "corresponding_lines": [
            1376
        ], 
        "id": 1242
    }, 
    {
        "code": "if L1.count(L1[i])!=L2.count(L2[j]):", 
        "corresponding_lines": [
            1377
        ], 
        "id": 1243
    }, 
    {
        "code": "return none", 
        "corresponding_lines": [
            1378
        ], 
        "id": 1244
    }, 
    {
        "code": "element_occuring_most=''", 
        "corresponding_lines": [
            704
        ], 
        "id": 1245
    }, 
    {
        "code": "how_many_times=0", 
        "corresponding_lines": [
            179
        ], 
        "id": 1246
    }, 
    {
        "code": "how_many_times=max(L1.count(L1[i]),L1.count(L1[i]))", 
        "corresponding_lines": [
            1380
        ], 
        "id": 1247
    }, 
    {
        "code": "element_occuring_most=L1[i]", 
        "corresponding_lines": [
            1381
        ], 
        "id": 1248
    }, 
    {
        "code": "its_type=type(L1[i])", 
        "corresponding_lines": [
            1382
        ], 
        "id": 1249
    }, 
    {
        "code": "return(element_occuring_most,how_many_times,its_type)", 
        "corresponding_lines": [
            1383
        ], 
        "id": 1250
    }, 
    {
        "code": "index=[]", 
        "corresponding_lines": [
            44
        ], 
        "id": 1251
    }, 
    {
        "code": "if L1[i]in L2[i]:", 
        "corresponding_lines": [
            1384
        ], 
        "id": 1252
    }, 
    {
        "code": "index.append(L1[i],(L1.count)[i])", 
        "corresponding_lines": [
            1385
        ], 
        "id": 1253
    }, 
    {
        "code": "if Dict1[key]&gt;count:", 
        "corresponding_lines": [
            1390
        ], 
        "id": 1254
    }, 
    {
        "code": "return(max_key,Dict1[max_key],type(max_key))", 
        "corresponding_lines": [
            1313
        ], 
        "id": 1255
    }, 
    {
        "code": "L1_elt_counter=L1.count(i__)", 
        "corresponding_lines": [
            1391
        ], 
        "id": 1256
    }, 
    {
        "code": "Dict1[i__]=L1_elt_counter", 
        "corresponding_lines": [
            1392
        ], 
        "id": 1257
    }, 
    {
        "code": "L2_elt_counter=L2.count(element)", 
        "corresponding_lines": [
            1394
        ], 
        "id": 1258
    }, 
    {
        "code": "L1dict[element]=L2_elt_counter", 
        "corresponding_lines": [
            1395
        ], 
        "id": 1259
    }, 
    {
        "code": "if sum(Dict1.values())==sum(L1dict.values()):", 
        "corresponding_lines": [
            1396
        ], 
        "id": 1260
    }, 
    {
        "code": "for k in Dict1.keys():", 
        "corresponding_lines": [
            1397
        ], 
        "id": 1261
    }, 
    {
        "code": "for m in L1dict.keys():", 
        "corresponding_lines": [
            1398
        ], 
        "id": 1262
    }, 
    {
        "code": "if k==m:", 
        "corresponding_lines": [
            1399
        ], 
        "id": 1263
    }, 
    {
        "code": "if Dict1[k]==L1dict[m]:", 
        "corresponding_lines": [
            1400
        ], 
        "id": 1264
    }, 
    {
        "code": "if x==len(Dict1.keys()):", 
        "corresponding_lines": [
            1402
        ], 
        "id": 1265
    }, 
    {
        "code": "tup=(i__,max_count,type(i__))", 
        "corresponding_lines": [
            77
        ], 
        "id": 1266
    }, 
    {
        "code": "for l in L2:", 
        "corresponding_lines": [
            1405
        ], 
        "id": 1267
    }, 
    {
        "code": "if x==x:", 
        "corresponding_lines": [
            1406
        ], 
        "id": 1268
    }, 
    {
        "code": "count___2=int(L1.count(element))", 
        "corresponding_lines": [
            1407
        ], 
        "id": 1269
    }, 
    {
        "code": "if count___2&gt;=y:", 
        "corresponding_lines": [
            1408
        ], 
        "id": 1270
    }, 
    {
        "code": "x_copy=element", 
        "corresponding_lines": [
            1409
        ], 
        "id": 1271
    }, 
    {
        "code": "times_el_occurs=y+L1.count(element)", 
        "corresponding_lines": [
            1410
        ], 
        "id": 1272
    }, 
    {
        "code": "z_copy=str(type(element))", 
        "corresponding_lines": [
            1411
        ], 
        "id": 1273
    }, 
    {
        "code": "t12=(x_copy,times_el_occurs,z_copy)", 
        "corresponding_lines": [
            1412
        ], 
        "id": 1274
    }, 
    {
        "code": "return t12", 
        "corresponding_lines": [
            1413
        ], 
        "id": 1275
    }, 
    {
        "code": "dex=L1.index(element)", 
        "corresponding_lines": [
            1414
        ], 
        "id": 1276
    }, 
    {
        "code": "y=dex", 
        "corresponding_lines": [
            1415
        ], 
        "id": 1277
    }, 
    {
        "code": "tup=(L1[y],y,type(L1[y]))", 
        "corresponding_lines": [
            1416
        ], 
        "id": 1278
    }, 
    {
        "code": "return(i,y,type(i))", 
        "corresponding_lines": [
            1427
        ], 
        "id": 1279
    }, 
    {
        "code": "recurring_elements=[0]", 
        "corresponding_lines": [
            1428
        ], 
        "id": 1280
    }, 
    {
        "code": "what_number=[0]", 
        "corresponding_lines": [
            1428
        ], 
        "id": 1281
    }, 
    {
        "code": "if L1.count(element)&gt;recurring_elements[0]:", 
        "corresponding_lines": [
            1429
        ], 
        "id": 1282
    }, 
    {
        "code": "what_number[0]=element", 
        "corresponding_lines": [
            1430
        ], 
        "id": 1283
    }, 
    {
        "code": "recurring_elements[0]=L1.count(element)", 
        "corresponding_lines": [
            1431
        ], 
        "id": 1284
    }, 
    {
        "code": "t=(what_number[0],recurring_elements[0],type(what_number[0]))", 
        "corresponding_lines": [
            1432
        ], 
        "id": 1285
    }, 
    {
        "code": "def is_list_permutation(L1,L1):", 
        "corresponding_lines": [
            1433
        ], 
        "id": 1286
    }, 
    {
        "code": "elif L1[0]==L1[0]:", 
        "corresponding_lines": [
            1436
        ], 
        "id": 1287
    }, 
    {
        "code": "return is_list_permutation(L1[1:],L1[1:])", 
        "corresponding_lines": [
            1437
        ], 
        "id": 1288
    }, 
    {
        "code": "return is_list_permutation(L1,L1[1:])", 
        "corresponding_lines": [
            1438
        ], 
        "id": 1289
    }
];
