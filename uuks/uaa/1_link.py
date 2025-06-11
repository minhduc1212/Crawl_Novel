import requests
import json
from urllib.parse import urlparse, parse_qs


url_1 = 'https://www.uaa.com/novel/chapter?id=867248238330253313'
# Phân tích URL
parsed_url = urlparse(url_1)

# Lấy giá trị của tham số "id"
query_params = parse_qs(parsed_url.query)
id = query_params.get('id', [''])[0]

url="https://www.uaa.com/api/novel/app/novel/chapter?force=false&id=" + id + "&offset=0&viewId=940602923971383296"

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) '
                    'AppleWebKit/537.36 (KHTML, like Gecko) '
                    'Chrome/80.0.3987.149 Safari/537.36',
    #'Referer': 'https://www.uaa.com/novel/chapter?id=867248238330253313',
    'Token': 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6OTQwNjAyOTIzOTcxMzgzMjk2LCJ0eXBlIjoiY3VzdG9tZXIiLCJ0aW1lc3RhbXAiOjE3MTczMTQxNjY2OTcsImV4cCI6MTcxNzkxODk2Nn0.glr9oihXajRnemwWEnfRiVbfRRhg-QSA9_DXNaW20nI'
}

cookies = {
    '_hjSessionUser_3601470': 'eyJpZCI6ImJhYzc0NDE4LTBlZGItNTJiNy1iMTBiLTg4MDE4YTRlY2M3YiIsImNyZWF0ZWQiOjE3MDQ0MjM2ODQ3MTUsImV4aXN0aW5nIjp0cnVlfQ==',
    '_ga': 'GA1.1.1656912424.1704423601',
    '__stripe_mid': '1a978256-a685-434d-83a0-60f719295eb252b83d',
    '_ga_4BC3P9JVX3':'GS1.1.1704456904.5.1.1704457474.59.0.1564836478',
}
response = requests.get(url, headers=headers, cookies=cookies)
print(response.status_code, url_1)
with open('test.json', 'w', encoding='utf-8') as f:
    f.write(response.text)

"""content = ''
with open('test.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    for line in (data['model']['lines']):
        content += line + '\n'
with open('content.txt', 'a', encoding='utf-8') as f:
    f.write(data['model']['volumeTitle'] + ' ' + data['model']['title'] + '\n')
    f.write(content)
"""