from bs4 import BeautifulSoup

with open('1.html', 'r', encoding='utf-8') as f:
    file = f.read()
soup = BeautifulSoup(file, 'html.parser')
divs = soup.find_all('div')
with open('content.txt', 'w', encoding='utf-8') as f:
    for div in divs:
        f.write(div.text + '\n' + '\n')