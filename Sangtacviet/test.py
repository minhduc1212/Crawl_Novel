import requests

url = 'https://sangtacviet.vip/index.php?bookid=7144984768625511460&h=fanqie&c=7145793330356584998&ngmar=readc&sajax=readchapter&sty=1&exts='

headers = {
    'initiator': 'https://sangtacviet.vip',
    'method': 'POST',
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br, zstd',
    'Accept-Language': 'vi',
    'Content-type': 'application/x-www-form-urlencoded',
    'Origin': 'https://sangtacviet.vip',
    'Referer': 'https://sangtacviet.vip/truyen/fanqie/1/7144984768625511460/7145793330356584998/',
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
}

response = requests.post(url, headers=headers)

print(response.content)