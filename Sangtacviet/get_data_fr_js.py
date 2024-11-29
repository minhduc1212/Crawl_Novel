import json
from bs4 import BeautifulSoup
import re

response = []
with open('combined_responses.txt', 'r', encoding='utf-8') as f:
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
with open('response.json', 'r', encoding='utf-8') as f:
    responses = json.load(f)
    for response in responses:
        content = ''
        try:
            chapter_name = response['chaptername'].replace('\n', '')
            chapter_name = re.sub(r'[\\/:*?"<>|]', ' ', chapter_name)
            data = response['data']
            soup = BeautifulSoup(data, 'html.parser')
            lines = soup.find_all('p')
            for line in lines:
                content += line.text + '\n'
            """content = soup.get_text(separator='\n')"""
            with open(f'E:/LT/Crawl Truyện Chữ(Python)/Sangtacviet/Content/{chapter_name}.txt', 'w', encoding='utf-8') as f:
                content = content.replace('@Bạn đang đọc bản lưu trong hệ thống', '')
                content = content.replace('Bạn đang xem văn bản gốc chưa dịch, có thể kéo xuống cuối trang để chọn bản dịch.', '')
                f.write(content)
        except:
            print('Error in', response)
            continue