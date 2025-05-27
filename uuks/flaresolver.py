import requests
import json
from bs4 import BeautifulSoup
 
url = "https://www.novelupdates.com"
api_url = "http://localhost:8191/v1"
headers = {"Content-Type": "application/json"}
 
data = {
    "cmd": "request.get",
    "url": url,
    "maxTimeout": 60000
}
 
response = requests.post(api_url, headers=headers, json=data)

# retrieve the entire JSON response from FlareSolverr
response_data = json.loads(response.content)
 
# Extract the cookies from the FlareSolverr response
cookies = response_data["solution"]["cookies"]
 
# Clean the cookies
cookies = {cookie["name"]: cookie["value"] for cookie in cookies}

# Extract the user agent from the FlareSolverr response
user_agent = response_data["solution"]["userAgent"]

"""print(user_agent)
print(cookies)
"""
response = requests.get('https://www.uuks.org/b/57064/7133091.html', cookies=cookies, headers={"User-Agent": user_agent})
response.encoding = 'utf-8'

print(response.status_code)

"""soup = BeautifulSoup(response.text, 'html.parser')

content = soup.get_text(separator='\n', strip=True)
with open('uuks.txt', 'w', encoding='utf-8') as f:
    f.write(content)"""
