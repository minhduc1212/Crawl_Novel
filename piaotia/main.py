import cloudscraper
from bs4 import BeautifulSoup
import requests

scraper = cloudscraper.create_scraper()
url ='https://www.piaotia.com/html/14/14014/10830837.html'
response = requests.get(url)
response.encoding = 'gb18030'
soup = BeautifulSoup(response.text, 'html.parser')
#Delete the useless tags
for tag in soup.find_all('script'):
    tag.decompose()
for tag in soup.find_all('div'):
    tag.decompose()
for tag in soup.find_all('p'):
    tag.decompose()
for tag in soup.find_all('a'):
    tag.decompose()
for tag in soup.find_all('span'):
    tag.decompose()
content = soup.get_text(separator='\n', strip=True)
with open('test.txt', 'w', encoding='gb18030') as f:
    f.write(content)