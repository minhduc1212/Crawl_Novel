from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from time import sleep

urls = []
url_toc = 'https://www.uuks.org/b/33758/'
chrome_options = Options()


driver = webdriver.Chrome(options=chrome_options)
main=driver.get(url_toc)
#tìm thẻ a rồi lấy href
toc = driver.find_elements(By.TAG_NAME, 'a')
for i in toc:
    if 'https://www.uuks.org/b/33758/' in i.get_attribute('href'):
        urls.append(i.get_attribute('href'))

driver.quit()

driver = webdriver.Chrome(options=chrome_options)
driver.set_page_load_timeout(30)
for index, url in enumerate(urls):
    try:
        print(f"Processing {url}...")
        driver.get(url)
        html = driver.page_source
        soup = BeautifulSoup(html, "html.parser")
        for tag in soup.find_all("script"):
            tag.decompose()
        for tag in soup.find_all("style"):
            tag.decompose()
        for tag in soup.find_all("a"):
            tag.decompose()
        for tag in soup.find_all("img"):
            tag.decompose()
        for tag in soup.find_all("iframe"):
            tag.decompose()
        with open(f"output/uuks{index}.txt", "w", encoding="utf-8") as f:
            f.write(soup.text)
            continue
    except:
        while True:
            driver.get(url)
            html = driver.page_source
            soup = BeautifulSoup(html, "html.parser")
            for tag in soup.find_all("script"):
                tag.decompose()
            for tag in soup.find_all("style"):
                tag.decompose()
            for tag in soup.find_all("a"):
                tag.decompose()
            for tag in soup.find_all("img"):
                tag.decompose()
            for tag in soup.find_all("iframe"):
                tag.decompose()
            with open(f"output/uuks{index}.txt", "w", encoding="utf-8") as f:
                f.write(soup.text)
                break