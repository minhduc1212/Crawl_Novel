from time import sleep
from seleniumwire import webdriver

# Khởi tạo WebDriver (ví dụ: Chrome)
driver = webdriver.Chrome()

# Mở trang web cần kiểm tra
driver.get('https://www.uaa.com/novel/chapter?id=448908')
content = driver.find_element('xpath', '/html/body/div/div[3]/div/div[2]/div[2]')
with open('test.html', 'w', encoding='utf-8') as f:
    f.write(content.get_attribute('innerHTML'))

for request in driver.requests:
    url_str = str(request.url)
    try:
        if 'chapter?force' in url_str:
            print(url_str)
            print(request.headers)
    except:
        continue
    