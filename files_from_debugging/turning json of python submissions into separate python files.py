
# coding: utf-8

# In[10]:

cat data/3.py


# In[3]:

import json
from pprint import pprint

with open('data/accumulate-mistakes.json') as data_file:    
    data = json.load(data_file)

pprint(data)


# In[6]:

for d in data:
    print d['before'], d['Id']
    with open('data/'+str(d['Id'])+'.py', 'w') as f:
        f.write(d['before'])


# In[ ]:



