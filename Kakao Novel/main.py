#use selenium to crawl website
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from time import sleep
import json

web = webdriver.Chrome()
web.get('https://page.kakao.com/')
sleep(10)
#import cookies
with open('cookies.json', 'r') as f:
    cookies = json.load(f)
for cookie in cookies:
    # Assuming cookie is your cookie dictionary
    if 'sameSite' in cookie:
        if cookie['sameSite'] not in ["Strict", "Lax", "None"]:
            cookie['sameSite'] = "None"  # or "Lax" or "Strict", depending on your needs

    web.add_cookie(cookie)
web.refresh()
sleep(10)
chapter = web.get('https://page.kakao.com/content/56250127/viewer/56250234')
sleep(10)
#in ra code của trang web
print(web.page_source)