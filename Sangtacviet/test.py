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
chrome_options.add_argument("--headless=new")

def change_tab(window_handles):
    for window_id in window_handles:
        if window_id != current_window_id:
            driver.switch_to.window(window_id)
            sleep(1)
            # Kiểm tra NẾU ID của trang không phải là ID của trang ban đầu
            if window_id != current_window_id:
                # Đóng tab hiện tại
                driver.close()
                # Chuyển về tab ban đầu
                driver.switch_to.window(current_window_id)
                sleep(2)

def click_xpath_ActionChains(xpath):
    element = driver.find_element(By.XPATH, xpath)
    action_chains = ActionChains(driver)
    action_chains.move_to_element(element).perform()
    action_chains.click().perform()

with open ("new_url.json", "r", encoding="utf-8") as f:
    urls = json.load(f)

for url in urls:
    driver = webdriver.Chrome(service=service, options=chrome_options)
    driver.get(url)
    sleep(3)
    click_xpath_ActionChains("/html/body/div[1]/div[4]/div[8]/select[1]")
    sleep(1)

    # Nếu soát có 2 tab thì chuyển qua tab mới
    current_window_id = driver.current_window_handle
    window_handles = driver.window_handles
    change_tab(window_handles)

    click_xpath_ActionChains("/html/body/div[1]/div[4]/div[8]/select[1]")
    sleep(1)

    option = driver.find_element(By.XPATH, "/html/body/div[1]/div[4]/div[8]/select[1]/option[8]")
    option.click()
    sleep(1)
    driver.refresh()
    sleep(1)

    chap_name_area= driver.find_element(By.XPATH, "/html/body/div[1]/div[4]/center")
    # Delete special characters in the name of the chapter
    chap_name_area_text= re.sub(r'[^\w]', ' ', chap_name_area.text)

    content = driver.find_element(By.XPATH, "/html/body/div[1]/div[4]/div[6]/div")
    with open(f"E:/LT/Crawl Truyện Chữ(Python)/Các Nàng Đều Muốn Làm Nữ Chính Của Ta/{chap_name_area_text}.txt", "w", encoding="utf-8") as f:
        f.write(content.text)
        sleep(1)

    driver.close()
driver.quit()