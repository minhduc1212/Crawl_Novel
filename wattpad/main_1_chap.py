import cloudscraper
from bs4 import BeautifulSoup


content_overall = ''
while True:
    for i in range(1, 8):
        try:
            url = 'https://www.wattpad.com/556703138-ng%E1%BB%A5c-th%C3%A1nh-phi%C3%AAu-l%C6%B0u-huy%E1%BB%81n-%E1%BA%A3o-quy%E1%BB%83n-4-b%C3%A0i-ca-c%C3%A1nh/page/{}'
            url = url.format(i)
            scraper = cloudscraper.create_scraper()
            r = scraper.get(url)
            soup = BeautifulSoup(r.text, 'html.parser')

            content_all = soup.find('pre').get_text(separator='\n')
            content_overall += content_all
            print(content_overall)
        except:
            break
    with open('q1.txt', 'w', encoding='utf-8') as f:
        f.write('sssssssssssssssssssss')
        f.write(content_overall)
    break