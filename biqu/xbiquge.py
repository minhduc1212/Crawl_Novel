import undetected_chromedriver as uc
from time import sleep

driver = uc.Chrome(headless=True,use_subprocess=False)
url = "https://www.xbiquge.bz/book/7122/40584373.html"
driver.get(url)
driver.save_screenshot('test.png')
sleep(5)