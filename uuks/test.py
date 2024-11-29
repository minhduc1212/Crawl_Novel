import requests
 
url = "https://xbiquge.bz/book/7122/"
api_url = "http://localhost:8191/v1"
headers = {"Content-Type": "application/json"}
 
data = {
    "cmd": "request.get",
    "url": url,
    "maxTimeout": 60000
}
 
response = requests.post(api_url, headers=headers, json=data)
print(response.status_code)
