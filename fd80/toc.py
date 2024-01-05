import requests
from bs4 import BeautifulSoup

def scrapeChapter(chapter_link, chapter_name):
    content_all = ''
    response = requests.get(chapter_link)
    soup = BeautifulSoup(response.text, 'html.parser')
    content = soup.find('div', {'class':'articlecontent'}).get_text()
    content_new = content.strip()
    
    content_all += chapter_name + '\n' + '\n' + '\n'
    content_all += content_new + '\n' + '\n' + '\n' + '\n'
    print("Xong", chapter_name)
    with open('莫若凌霄.txt', 'a', encoding='utf-8') as f:
        f.write(content_all)

chapter_links = [] 
chapter_names = []
for i in range(10, 15):
    url_all = 'https://www.fd80.com/bookindex/201859171/{}.html'
    url = url_all.format(i)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    """with open('test.html', 'w', encoding='utf-8') as f:
        f.write(response.text)
    with open('test.html', 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f.read(), 'html.parser')"""
    chapters = soup.find('ul', {'class':'chapters'}).find_all('a')
    for chapter in chapters:
        chapter_links.append('https://www.fd80.com/' + chapter['href'])
        chapter_names.append(chapter.text)
    
while True:
    for chapter_link, chapter_name in zip(chapter_links, chapter_names):
        try:
            scrapeChapter(chapter_link, chapter_name)
            continue
        except: 
            while True:
                try:
                    scrapeChapter(chapter_link, chapter_name)
                    break
                except:
                    continue
    break
           
        