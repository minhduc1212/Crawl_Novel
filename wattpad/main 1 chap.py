import requests
from bs4 import BeautifulSoup

url = 'https://www.wattpad.com/apiv2/?m=storytext&id=12768326&page=1'
headers = {
'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
}
r = requests.get(url, headers=headers)
soup = BeautifulSoup(r.text, 'html.parser')
content = soup.get_text()
if not content: 
    print('Non content')
else:  
    with open('test.html', 'w', encoding='utf-8') as f:
        f.write(content)
