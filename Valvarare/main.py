import requests
from bs4 import BeautifulSoup

url ="https://web.archive.org/web/20171010114013/http://valvrareteam.com/story/highschool-dxd-tap-1-life-1"
response = requests.get(url)
soup = BeautifulSoup(response.text, "html.parser")
with open("test.html", "w", encoding="utf-8") as f:
    f.write(soup.prettify())