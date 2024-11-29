import requests
from bs4 import BeautifulSoup

urls = []
for i in range (1, 28, 1):
    url = 'http://www.yqhc.org/book/74689/index_{}.html'.format(i)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    ul = soup.find_all('ul', {'class':'section-list fix'})
    links = ul[1].find_all('a')
    for link in links:
        url = 'http://www.yqhc.org' + link['href']
        urls.append(url)
        urls.append(url.replace('.html', '_2.html')) 
    print('Page {} done'.format(i))
with open('links.txt', 'w', encoding='utf-8') as f:
    f.write(str(urls))
        