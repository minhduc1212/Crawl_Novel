import requests
from bs4 import BeautifulSoup

while True:
    for i in range(610, 1332):
        try:
            url = 'https://truyenhdx.com/truyen/thau-huong-cao-thu-dich-edit/chap/22871-chuong-{}'
            url = url.format(i)
            r = requests.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')
            title_all = soup.find('h1', {'class': 'text-center'}).text
            title = title_all.replace('Sửa Chương', '')
            cotent = soup.find('div', {'class': 'reading'}).get_text(separator='\n')
            with open('q1.txt', 'a', encoding='utf-8') as f:
                f.write(title + '\n' + '\n' + '\n')
                f.write(cotent + '\n' + '\n'  + '\n' + '\n')
        except:
            continue    
    break