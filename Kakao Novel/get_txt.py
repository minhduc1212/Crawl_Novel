from bs4 import BeautifulSoup

with open('1.html', 'r', encoding='utf-8') as f:
    file = f.read()
soup = BeautifulSoup(file, 'html.parser')
lines = soup.find_all('p')
content = ''
for line in lines:
    content += line.text + '\n'
print(content)