#use selenium to get all a href in a page
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from time import sleep
from bs4 import BeautifulSoup

urls = []
website = 'https://www.uaa.com/novel/intro?id=989256316566507520'
driver = webdriver.Chrome()
driver.get(website)
sleep(5)
soup = BeautifulSoup(driver.page_source, 'html.parser')
for a in soup.find_all('a', href=True):
    if "chapter" in a['href'] and "null" not in a['href']:
        print("https://www.uaa.com" + a['href'])
        urls.append("https://www.uaa.com" + a['href'])
with open('urls.txt', 'w', encoding="utf-8") as f:
    f.write(str(urls))



