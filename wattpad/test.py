import cloudscraper
from bs4 import BeautifulSoup

url = 'https://www.wattpad.com/story/144054438-ng%E1%BB%A5c-th%C3%A1nh-phi%C3%AAu-l%C6%B0u-huy%E1%BB%81n-%E1%BA%A3o-quy%E1%BB%83n-4'
scraper = cloudscraper.create_scraper(disableCloudflareV1=True)
r = scraper.get(url)
print(r.status_code)
soup = BeautifulSoup(r.text, 'html.parser')
chap_name = soup.find('div', {'class': 'part__label'})
print(chap_name.text)