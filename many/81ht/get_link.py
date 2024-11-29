from bs4 import BeautifulSoup

urls = []
with open('main.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')
urls = ['https://www.81ht.com/' + a['href'] for a in soup.find_all('a')]
with open('urls.txt', 'w', encoding='utf-8') as f:
    f.write(str(urls))