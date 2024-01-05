import requests
from bs4 import BeautifulSoup

url = 'https://www.fd80.com/190/190941/93229.html'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
"""with open('test.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
with open('test.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f.read(), 'html.parser')"""
content = soup.find('div', {'class':'articlecontent'}).find_all('p')
for p in content:
    print(p.text)