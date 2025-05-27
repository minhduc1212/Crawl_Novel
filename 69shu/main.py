import requests
from bs4 import BeautifulSoup

url = 'https://www.69shuba.pro/txt/39720/26952755'
response = requests.get(url)
response.encoding = 'gb18030'
with open('response.txt', 'w', encoding='utf-8') as f:
    f.write(response.text)
soup = BeautifulSoup(response.text, 'html.parser')
div = soup.find('div', class_='txtnav')
content = div.get_text(separator='\n')
with open('content.txt', 'w', encoding='utf-8') as f:
    f.write(content)