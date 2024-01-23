import requests
import json
 
url = "https://www.xbiquge.bz/"
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

response = requests.get('https://www.xbiquge.bz/book/54510/40010488.html', cookies=cookies, headers={"User-Agent": user_agent})
with open("response.html", "w", encoding="utf-8") as f:
    f.write(response.text)
