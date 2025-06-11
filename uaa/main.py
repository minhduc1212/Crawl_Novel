from bs4 import BeautifulSoup
from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

driver = webdriver.Chrome()
url="https://www.uaa.com/novel/chapter?id=940458570099593216"
r=driver.get(url)
sleep(5)
soup = BeautifulSoup(driver.page_source, 'html.parser')
with open('test.html', 'w', encoding='utf-8') as f:
    f.write(soup.prettify())