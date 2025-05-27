import requests
import json

url = "https://page.kakao.com/content/56250127/viewer/56250236"
with open('cookies.json', 'r') as f:
    cookies = json.load(f)

cookies_dict = {}
for cookie in cookies:
    # Assuming cookie is your cookie dictionary
    if 'sameSite' in cookie:
        if cookie['sameSite'] not in ["Strict", "Lax", "None"]:
            cookie['sameSite'] = "None"  # or "Lax" or "Strict", depending on your needs
    cookies_dict[cookie['name']] = cookie['value']

response = requests.get(url, cookies=cookies_dict)

print(response.text)