import requests
from bs4 import BeautifulSoup

url = 'https://bachngocsach.net.vn/_next/static/media/1c57ca6f5208a29b-s.p.woff2'
response = requests.get(url)
print(response.status_code)
with open('font.woff2', 'wb') as f:
    f.write(response.content)