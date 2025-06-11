from time import sleep
from seleniumwire import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

options = Options()
options.add_argument('--headless')
options.add_argument('--disable-gpu')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = webdriver.Chrome(options=options)
driver.get('https://www.uaa.com/novel/chapter?id=448908')
sleep(5)
enough_age = driver.find_element(By.XPATH, '/html/body/div/div[4]/div/div/dl[6]/a')
enough_age.click()  
sleep(5)
login_place = driver.find_element(By.XPATH, '/html/body/div/div[1]/div/div[2]/div[1]')
login_place.click()
sleep(5)
username = driver.find_element(By.XPATH, '/html/body/div/section/div[3]/dl[2]/input')
username.send_keys('minhduc6e12@gmail.com')
sleep(5)
password = driver.find_element(By.XPATH, '/html/body/div/section/div[3]/dl[3]/input')
password.send_keys('minhduc1q2w3e')
sleep(5)
login = driver.find_element(By.XPATH, '/html/body/div/section/div[3]/dl[5]/a')
login.click()
sleep(5)
for request in driver.requests:
    url_str = str(request.url)
    try:
        if 'chapter?force' in url_str:
            print(url_str)
            print(request.headers)
    except:
        continue