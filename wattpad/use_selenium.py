from bs4 import BeautifulSoup
from fake_useragent import UserAgent
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

ua = UserAgent()

content_overall = ''
for i in range(1, 6):
    url = 'https://www.wattpad.com/12695173-ng%E1%BB%A5c-th%C3%A1nh-phi%C3%AAu-l%C6%B0u-huy%E1%BB%81n-%E1%BA%A3o-quy%E1%BB%83n-1-ch%C6%B0%C6%A1ng-2/page/{}'
    url = url.format(i)
    options = Options()
    options.add_argument("--headless")  
    driver = webdriver.Chrome(options=options)
    driver.get(url)
    #sleep(1)  # Wait for the page to load
    content = driver.find_element(By.XPATH, '/html/body/div[4]/div/main/article/div[3]/div/div[2]/div[1]/pre')
    content_all = content.text
    content_overall += content_all
    driver.quit()  # Close the browser
with open('q2.txt', 'w', encoding='utf-8') as f :
    f.write(content_overall)

    
"""
url = 'https://www.wattpad.com/story/4350167-ng%E1%BB%A5c-th%C3%A1nh-phi%C3%AAu-l%C6%B0u-huy%E1%BB%81n-%E1%BA%A3o-quy%E1%BB%83n-1'
headers = {
    'User-Agent': ua.random,
    'authority': 'www.wattpad.com',
}

options = webdriver.ChromeOptions()
options.add_argument("--headless")  # Run Chrome in headless mode
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(options=options)
driver.get(url)
soup = BeautifulSoup(driver.page_source, 'html.parser')
driver.quit()  # Close the browser

a = soup.find('div', {'class': 'story-parts'}).find_all('a')
urls = []
for i in a:
    url_one_chap = {
        'url': []
    }
    url = 'https://www.wattpad.com' + i['href'] + '/page/{}'
    for j in range(1, 10):
        url_one_chap['url'].append(url.format(j))
    urls.append(url_one_chap)

for i in urls:
    for url in i['url']:
        content_overall = ''
        get_content(url, content_overall)
        with open('q2.txt', 'a', encoding='utf-8') as f:
            f.write(content_overall)"""