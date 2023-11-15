from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup

# set up the webdriver
service = Service()
driver = webdriver.Chrome(service=service)

# navigate to the page
url = "https://vip.chivi.app/wn?order=weight&pg=1"
driver.get(url)

# get the page source and parse it with BeautifulSoup
soup = BeautifulSoup(driver.page_source, 'html.parser')

# find all div with class="tooltip svelte-pw53l8" and get the text
divs = soup.find("div", class_="tooltip svelte-pw53l8")

# save to txt file
for div in divs:
    with open('yousuu.txt', 'w', encoding="utf-8") as f:
        f.write(div.text + '\n')

# close the webdriver
driver.quit()