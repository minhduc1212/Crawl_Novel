from selenium import webdriver
from selenium.webdriver.chrome.options import Options
#from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time

#service=Service(ChromeDriverManager().install())
chrome_options = Options()
#chrome_options.add_argument('--user-data-dir=C:/Users/minhd/AppData/Local/Google/Chrome/User Data')
#chrome_options.add_argument('--profile-directory=Profile 2')

driver = webdriver.Chrome(options=chrome_options)
driver.add_cookie({'name': 'domain', 'value': '.xbiquge.bz'})
driver.get("http://xbiquge.bz")  # Replace with the complete URL of the website
time.sleep(60)