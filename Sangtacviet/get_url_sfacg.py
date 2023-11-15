from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep
import json

# Khởi tạo trình điều khiển Selenium và truy cập vào trang web
service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
driver = webdriver.Chrome(service=service)
url = 'https://book.sfacg.com/Novel/520263/MainIndex/'
driver.get(url)
sleep(3)

# Tìm các phần tử ul có class "clearfix" (bao gồm cả ẩn)
ul_elements = driver.find_elements(By.CSS_SELECTOR, "ul.clearfix")

# Mở các thẻ ẩn bằng cách di chuột qua từng phần tử
for ul_element in ul_elements:
    actions = ActionChains(driver)
    actions.move_to_element(ul_element).perform()
    sleep(0.5)  # Đợi một chút để thẻ ẩn hiển thị

data = []
for ul_element in ul_elements:
    # Tìm thẻ a trong từng ul và lưu trữ đường dẫn href vào tệp JSON
    a_elements = ul_element.find_elements(By.TAG_NAME, "a")
    for a_element in a_elements:
        href = a_element.get_attribute("href")
        data.append(href)

with open("url.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False)

# Đóng trình duyệt Selenium
driver.quit()