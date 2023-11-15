import requests
import json
from bs4 import BeautifulSoup
from fake_useragent import UserAgent

ua = UserAgent()
headers =   {
            'User-Agent': ua.random,
            'Referer': 'https://vip.chivi.app/'
            }   
url=("https://vip.chivi.app/wn/{}")

for i in range(368515, 555555):
    try:
        response=requests.get(url.format(i), headers=headers)
        soup=BeautifulSoup(response.content, 'html.parser')
        novel_name_area=soup.find("h1", class_="bname _main svelte-1se97gv")
        novel_name=novel_name_area.text
        novel_author_area=soup.find("a", class_="link -trim svelte-1se97gv")
        novel_author=novel_author_area.text
        data={
            'novel_name':novel_name,
            'novel_author':novel_author
        }
        with open ('chivi_full.json', 'a', encoding="utf-8") as f:
            json.dump(data,f, ensure_ascii=False)
            f.write('\n')
    except:
        continue
data = []
with open('chivi_full.json', 'r', encoding="utf-8") as f:
    for line in f:
        data_one = json.loads(line)
        data.append(data_one)

with open('chivi_full.json', 'w', encoding="utf-8") as s:
    json.dump(data,s, ensure_ascii=False)   
    
