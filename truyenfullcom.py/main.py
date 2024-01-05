import requests
from bs4 import BeautifulSoup

for i in range(1198, 1219):
    url = 'https://truyenfull.com/thau-huong-cao-thu-cai-bien/chuong-{}.html'
    url = url.format(i)
    r = requests.get(url)
    soup = BeautifulSoup(r.text, 'html.parser')
    content = soup.find('div', {'id': 'chapter-c'}).get_text(separator='\n')
    title = soup.find('h2').text
    with open('q1.txt', 'a', encoding='utf-8') as f:
        f.write(title + '\n' + '\n' )
        f.write(content + '\n' + '\n'  + '\n' + '\n')