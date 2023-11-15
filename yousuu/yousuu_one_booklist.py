from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from bs4 import BeautifulSoup
import json

service = Service(executable_path='C:/Users/minhd/Downloads/Compressed/chromedriver-win64/chromedriver.exe')
driver = webdriver.Chrome(service=service)

booklist_link = "https://www.yousuu.com/booklist/613d59339e99ec40c49fa9e5"
datas=[]

driver.get(booklist_link)
soup = BeautifulSoup(driver.page_source, 'html.parser')

num_div = soup.find_all("div", class_="number-border-itemvalue")
all_comic_div = num_div[1]
print(all_comic_div)
all_page_num = int(all_comic_div.text) // 20 + 1

booklist_name = soup.find("a", class_="booklistName nuxt-link-exact-active nuxt-link-active")

for i in range(1, all_page_num+1):
    url = booklist_link + "?page={}".format(i)
    driver.get(url)
    soup = BeautifulSoup(driver.page_source, 'html.parser')

    book_names = []
    book_names_find = soup.find_all("a", class_="book-name")
    for book_name_find in book_names_find:
        book_names.append(book_name_find.text)

    author_names = []
    author_names_find = soup.find_all("a", class_="author-name ellipsis")
    for author_name_find in author_names_find:
        author_names.append(author_name_find.text)

    datas_one_page = [{'book_names': book_name, 'author_names': author_name} for book_name, author_name in zip(book_names, author_names)]
    datas.extend(datas_one_page)

with open('{}.json'.format(booklist_name.text), 'w', encoding="utf-8") as f:
    json.dump(datas, f, ensure_ascii=False, indent=4)


# close the webdriver
driver.quit()