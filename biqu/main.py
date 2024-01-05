import requests
from bs4 import BeautifulSoup

url = "http://www.biquge66.net/book/101/204087_1.html"
r = requests.get(url)
soup = BeautifulSoup(r.text, 'html.parser')
content = soup.find('div', {'id': 'booktxt'}).get_text(separator='\n')
print(content)
