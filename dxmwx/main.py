import requests
from bs4 import BeautifulSoup

content = ''
url = 'https://www.dxmwx.org/read/56754_49917819.html'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')

chapter_name = soup.find('h1', {'id':'ChapterTitle'}).text

div = soup.find('div', {'id':'Lab_Contents'})
for p in div.find_all('p'):
    content += p.text + '\n'
with open('content.txt', 'w', encoding='utf-8') as f:
    f.write(chapter_name + '\n')
    f.write(content)