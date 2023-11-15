from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import requests

for i in range(1, 16):
    # navigate to the page
    url = "https://vip.chivi.app/wn?genres=Phi+s%E1%BA%AFc&pg={}"
    #driver.get(url)
    response = requests.get(url.format(i))

    # get the page source and parse it with BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')

    # find all div with class="tooltip svelte-pw53l8" and get the text
    divs = soup.find_all("div", class_="tooltip svelte-pw53l8")

    for div in divs:
        with open('chivi_phi_sắc.txt', 'a', encoding="utf-8") as f:
            f.write(div.text)
            f.write('\n')
    print("Completed page {}".format(i))

    # close the webdriver
    #driver.quit()