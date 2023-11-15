from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
from time import sleep
import json

# set up the webdriver
service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
chrome_options = Options()
#chrome_options.add_argument("--headless")
#chrome_options.add_extension("E:/LT/touchvpn.crx")
driver = webdriver.Chrome(service=service)  #options=chrome_options)

url = "https://www.yousuu.com/booklists/?type=man&screen=comprehensive&page={}"
for i in range(1, 888):
    driver.get(url.format(i))
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    #booklist = soup.find_all("a", class_="booklist-item")

    booklist_names_index = soup.find_all("a", class_="booklist-card-title ellipsis")
    for booklist_name_index in booklist_names_index:
        booklist_href = booklist_name_index.get('href')
        booklist_link = "https://www.yousuu.com" + booklist_href
        with open('booklist_href.txt', 'a', encoding="utf-8") as f:
            f.write(booklist_link + '\n')