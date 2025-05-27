import requests
import json
from bs4 import BeautifulSoup

cookies = {'cf_clearance': '.gUG1sEbHGGeUyQ5hVFs1U0PSdisE1dGtYS49hWCnrg-1707788215-1-Ab8plmWCKAjlGMXEZTVjLWp32K9aEsTRfNSKAIVjAe4hu71MASsOtrKlmsaXXacGq9roPYzhJghJbOp6CNzZfmM='}

# Extract the user agent from the FlareSolverr response
user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'

print(user_agent)
print(cookies)
response = requests.get('https://www.uuks.org/b/57064/7133091.html', cookies=cookies, headers={"User-Agent": user_agent})
response.encoding = 'utf-8'
soup = BeautifulSoup(response.text, 'html.parser')

content = soup.get_text(separator='\n', strip=True)
with open('uuks1.txt', 'w', encoding='utf-8') as f:
    f.write(content)