import json
import os
from bs4 import BeautifulSoup

new_data = []
contents = ''
content_path = os.path.join(os.getcwd(), 'content_1.txt')


with open('combined_responses.txt', 'r', encoding='utf-8') as f:
    data = f.read()
    
    json_data = json.loads(data)

    chapter_name = json_data['chaptername'].replace('\n', '')
    html_content = json_data['data']
    soup = BeautifulSoup(html_content, 'html.parser')
    content = soup.get_text(separator='\n')
    content = content.replace('@Bạn đang đọc bản lưu trong hệ thống', '')
    content = content.replace('Bạn đang xem văn bản gốc chưa dịch, có thể kéo xuống cuối trang để chọn bản dịch.', '')
    contents += chapter_name + '\n' + '\n' + content + '\n' + '\n'
    
with open(content_path, 'w', encoding='utf-8') as f:
    f.write(contents)