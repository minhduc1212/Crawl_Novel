import requests
from bs4 import BeautifulSoup

url = 'https://metruyencv.com/truyen/ta-chi-muon-an-tinh-lam-cau-dao-ben-trong-nguoi/chuong-347'
response = requests.get(url)
soup = BeautifulSoup(response.text, 'html.parser')
div = soup.find('div', class_='c-c')
content = div.get_text(separator='\n')
print(content)