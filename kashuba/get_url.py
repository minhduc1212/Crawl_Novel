import requests
from bs4 import BeautifulSoup

urls = []
url = 'http://www.kanshuba.org/49/49064/'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
div = soup.find('div', class_='listmain')
links = div.find_all('a')
for link in links:
    urls.append('http://www.kanshuba.org' + link.get('href'))
with open('urls.txt', 'w') as f:
    f.write(str(urls))  
