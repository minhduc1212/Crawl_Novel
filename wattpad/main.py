import cloudscraper
from bs4 import BeautifulSoup

url = 'https://www.wattpad.com/story/144054438-ng%E1%BB%A5c-th%C3%A1nh-phi%C3%AAu-l%C6%B0u-huy%E1%BB%81n-%E1%BA%A3o-quy%E1%BB%83n-4'
scraper = cloudscraper.create_scraper(disableCloudflareV1=True)
r = scraper.get(url)
print(r.status_code)
soup = BeautifulSoup(r.text, 'html.parser')
a = soup.find('div', {'class': 'story-parts'}).find_all('a')
chap_names = soup.find_all('div', {'class': 'part__label'})
urls = []
for i, j in zip(a, chap_names):
    j = j.text
    url_one_chap = {
        'url' : [],
        'chap_name': j,
    }
    url = 'https://www.wattpad.com' + i['href'] + '/page/{}'
    for j in range(1, 10):
        url_one_chap['url'].append(url.format(j))
    urls.append(url_one_chap)

for i in urls:
    content_overall = ''
    while True:
        try:
            for url in i['url']:
                try:
                    scraper = cloudscraper.create_scraper()
                    r = scraper.get(url)
                    soup = BeautifulSoup(r.text, 'html.parser')
                    content_all = soup.find('pre').get_text(separator='\n')
                    content_overall += content_all
                    continue
                except:
                    while True:
                        try:
                            scraper = cloudscraper.create_scraper()
                            r = scraper.get(url)
                            soup = BeautifulSoup(r.text, 'html.parser')
                            content_all = soup.find('pre').get_text(separator='\n')
                            content_overall += content_all
                            break
                        except:
                            continue
        except:
            break
        with open('q1.txt', 'a', encoding='utf-8') as f:
            f.write(i['chap_name'] + '\n')
            f.write(content_overall + '\n' + '\n'  + '\n')
        break