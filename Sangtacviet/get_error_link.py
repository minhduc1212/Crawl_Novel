import json
from bs4 import BeautifulSoup
import re

response = []
with open('combined_responses (1).txt', 'r', encoding='utf-8') as f:
    data = f.read()
    #đọc từng dòng trong file rồi đưa vào response
    for index, line in enumerate(data.split('\n')):
        if line == '':
            continue
        elif line:
            try:
                response.append(json.loads(line))
            except:
                print('Error in', index)

with open('response.json', 'w', encoding='utf-8') as f:
    json.dump(response, f, ensure_ascii=False, indent=4)
#Đọc file response.json
links = ''
with open('response.json', 'r', encoding='utf-8') as f:
    responses = json.load(f)
    for response in responses:
        if response['code'] == '1':
            links += response['err'] + '\n'
        elif response['code'] == '0':
            links += response['origin'] + '\n'

with open('links.txt', 'w', encoding='utf-8') as f:
    f.write(links)
