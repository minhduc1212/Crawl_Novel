import requests
from bs4 import BeautifulSoup

content = ''
for i in range(1, 3800):

    url = 'https://www.soushushu.com/plugin.php?id=mz_reader:mzreader&tid=327422&aid=1102139&page={}'.format(i)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'html.parser')
    div = soup.find('div', class_='c txt_content')
    text = div.get_text(separator='\n')
    content += text + '\n'
    print('Page {} done'.format(i))
with open('output.txt', 'w', encoding="utf-8") as f:
        f.write(content)