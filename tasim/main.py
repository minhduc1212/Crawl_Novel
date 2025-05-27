import requests
from bs4 import BeautifulSoup

content = ''
for i in range(1, 888):

    url = f'https://www.zsdade.com/books/142920/{i}.html'

    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    chapter_name = soup.find('h1', {'class':'wap_none'})
    div = soup.find('div', {'id':'chaptercontent'})
    chapter_text = div.get_text(separator='\n')
    chapter_text = chapter_text.replace('请收藏本站：https://www.zsdade.com。' , '')
    chapter_text = chapter_text.replace('笔趣阁手机版：https://m.zsdade.com' , '')
    content += f'{chapter_name.text}\n{chapter_text}\n\n'
    print(f'Chapter {i} is done!')

with open('content.txt', 'w', encoding="utf-8") as f:
    f.write(content)

            
                