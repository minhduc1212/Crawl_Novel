from bs4 import BeautifulSoup

links = []
with open('url.html', 'r', encoding='utf-8') as f:
    html = f.read()
soup = BeautifulSoup(html, 'html.parser')
for a in soup.find_all('a', href=True):
    links.append('https://www.feibzw.com/html/43762/' + a['href'])
with open('links.txt', 'w', encoding='utf-8') as f:
    f.write(str(links))