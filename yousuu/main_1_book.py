import requests
from bs4 import BeautifulSoup
import json

for i in range (1, 325219):
    url = 'https://yousuu.sbwsz.com/book/{}/'.format(i)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')

    h1_my_4 = soup.find_all('h1', class_='my-4')
    book_name = h1_my_4[1].text

    div_col_md_10 = soup.find('div', class_='col-md-10')
    p = div_col_md_10.find_all('p')

    author = p[0].text
    score = p[1].text
    categories = p[4].find_all('a')
    category = [i.text for i in categories]

    comments = []
    ul = soup.find('ul', class_='list-group mb-4')
    li = ul.find_all('li')
    for i in li:
        comment = i.get_text(separator='\n', strip=True)
        comments.append(comment)

    book = {

        'book_name': book_name,
        'author': author,
        'score': score,
        'category': category,
        'comment': comments
    }

    with open('output/{}.json'.format(book_name), 'w', encoding='utf-8') as f:
        json.dump(book, f, ensure_ascii=False, indent=4)