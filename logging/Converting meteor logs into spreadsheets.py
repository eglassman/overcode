
# coding: utf-8

# In[60]:

#Run this notebook by replacing 'test.txt' with the name of the log file from meteor'

#Assumes the log's first three items in each line are row in student answer spreadsheet, score, comment, separated by commas


# In[51]:

spreadsheetRows = {}
with open('test.txt','r') as g:
    for line in g:
        entry_array = [tok.rstrip('\n') for tok in line.split(',')]
        spreadsheetRows[entry_array[0]]=tuple(entry_array[1:])

import datetime 
with open('spreadsheet'+datetime.datetime.now().isoformat()+'.csv','a') as h:
    for row in range(int(sorted(spreadsheetRows)[-1])+1):
        key = str(row)
        if key in spreadsheetRows.keys():
            h.write(key+','+spreadsheetRows[key][0]+','+spreadsheetRows[key][1])
        else:
            h.write(key)
        h.write('\n')


# # Example output

# In[59]:

cat spreadsheet2016-02-25T14:59:44.198828.csv


# In[61]:

#this can be copied directly back into the sheet for grading


# In[ ]:



