from bs4 import BeautifulSoup


urls = []
with open('index.html', 'r', encoding='utf-8') as f:
    file_content = f.read()
soup = BeautifulSoup(file_content, 'html.parser')
a_list = soup.find_all('a')
for a in a_list:
    urls.append('http://www.txtdd.com' + a.get('href'))
with open('urls.txt', 'w', encoding='utf-8') as f:
    f.write(str(urls))