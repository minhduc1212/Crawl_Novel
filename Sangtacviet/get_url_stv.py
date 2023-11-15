from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep
import json
from selenium.webdriver.chrome.options import Options
import clipboard

# Khởi tạo trình điều khiển Selenium và truy cập vào trang web
chrome_options = Options()
chrome_options.add_argument("--headless=new")
service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
driver = webdriver.Chrome(service=service, options=chrome_options)
url = 'http://14.225.254.182/truyen/sfacg/1/520263/'
driver.get(url)
sleep(10)


elements = driver.find_elements(By.CLASS_NAME, "col-md-4")
url = []
for element in elements :
    actions = ActionChains(driver)
    actions.context_click(element).perform()
    element1 = driver.find_element(By.XPATH, "/html/body/div[1]/div[4]/div[3]/div/div[4]")
    actions1 = ActionChains(driver)
    actions1.click(element1).perform()
    url.append(clipboard.paste())
    print(clipboard.paste())
driver.quit()

