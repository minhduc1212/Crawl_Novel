import requests
from bs4 import BeautifulSoup

urls = []
base_url = "https://www.dxmwx.org"
url = base_url + "/chapter/56754.html"
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
a_tag = soup.find_all('a')
for a in a_tag:
    if 'href' in a.attrs and 'read' in a['href']:
        url = base_url + a['href']
        if url not in urls:
            urls.append(url)

with open('urls.txt', 'w', encoding='utf-8') as f:
        f.write(str(urls))