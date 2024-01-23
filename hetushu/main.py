import requests

def get_response_headers(url):
    response = requests.get(url)
    if response.status_code == 200:
        headers = response.headers
        return headers

# Gọi hàm và truyền URL của trang web cần lấy header response
response_headers = get_response_headers('https://www.hetushu.com/book/5763/r4327497.json')

# In ra header response
print(response_headers)