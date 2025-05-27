import requests
from bs4 import BeautifulSoup

url = 'https://www.xnunu.com/book/103746/868693.html'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
div = soup.find('div', {'id':'content'})
p_s = div.find_all('p')
for p in p_s:
    print(p.text)