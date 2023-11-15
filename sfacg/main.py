from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep
import re
import json
from selenium.webdriver.chrome.options import Options

service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
chrome_options = Options()
driver = webdriver.Chrome(service=service, options=chrome_options)
driver.get("https://wap.ciweimao.com/chapter/110903221")
sleep(3)

element = driver.find_element(By.CLASS_NAME, "container")
print(element.text)