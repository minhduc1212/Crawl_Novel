import requests
from bs4 import BeautifulSoup


all_content = ''
urls = ['https://www.feibzw.com/html/43762/37047769.html', 'https://www.feibzw.com/html/43762/37047771.html']
for url in urls:
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    chapter_name = soup.find('p', {'class':'chaptertitle'}).text
    div_content = soup.find('div', {'id':'content'})
    content = div_content.find_all('p')

    all_content += chapter_name + '\n' + '\n'
    for p in content:
        all_content += p.text + '\n' + '\n' + '\n'
    print('Done', chapter_name)

    

with open('novel.txt', 'w', encoding='utf-8') as f:
    f.write(all_content.replace('飞速中文.com 中文域名一键直达', ''))