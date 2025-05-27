import json
from bs4 import BeautifulSoup
import re
import os

response = []
with open('combined_responses_1.txt', 'r', encoding='utf-8') as f:
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
contents = ''
with open('response.json', 'r', encoding='utf-8') as f:
    responses = json.load(f)
    for response in responses:
        content = ''
        try:
            chapter_name = response['chaptername'].replace('\n', '')
            data = response['data']
            soup = BeautifulSoup(data, 'html.parser')
            lines = soup.find_all('p')
            '''for line in lines:
                content += line.text + '\n'''
            content = soup.get_text(separator='\n')
            content = content.replace('@Bạn đang đọc bản lưu trong hệ thống', '')
            content = content.replace('Bạn đang xem văn bản gốc chưa dịch, có thể kéo xuống cuối trang để chọn bản dịch.', '')
            contents += chapter_name + '\n' + '\n' + content + '\n' + '\n'
        except:
            print('Error in', response)
            continue
content_path = os.path.join(os.getcwd(), 'content.txt')
with open(content_path, 'w', encoding='utf-8') as f:
    f.write(contents)