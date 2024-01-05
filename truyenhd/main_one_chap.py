import requests
from bs4 import BeautifulSoup


url = 'https://truyenhdx.com/truyen/thau-huong-cao-thu-dich-edit/chap/22871-chuong-1'
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
title = soup.find('h1', {'class': 'text-center'})
print(title)
cotent = soup.find('div', {'class': 'reading'}).get_text(separator='\n')
with open('q1.txt', 'a', encoding='utf-8') as f:
    f.write(title + '\n')
    f.write(cotent + '\n' + '\n'  + '\n')