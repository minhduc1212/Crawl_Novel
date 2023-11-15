from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.action_chains import ActionChains
from time import sleep

service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
url = "https://sangtacviet.vip/truyen/sfacg/1/520263/6651866/"
driver = webdriver.Chrome(service=service)

driver.get(url)
current_window_id = driver.current_window_handle
sleep(5)

select_element = driver.find_element(By.XPATH, "/html/body/div[1]/div[4]/div[8]/select[1]")
action_chains = ActionChains(driver)
action_chains.move_to_element(select_element).perform()
action_chains.click().perform()
sleep(5)

window_handles = driver.window_handles
# Điều hướng qua các cửa sổ trình duyệt khác
for window_id in window_handles:
    if window_id != current_window_id:
        driver.switch_to.window(window_id)
        sleep(5)
        # Kiểm tra NẾU ID của trang không phải là ID của trang ban đầu
        if window_id != current_window_id:
            # Đóng tab hiện tại
            driver.close()
            # Chuyển về tab ban đầu
            driver.switch_to.window(current_window_id)
            sleep(5)    

driver.quit()