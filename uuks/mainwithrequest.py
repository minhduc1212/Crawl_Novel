import requests

url = "https://www.uuks.org/b/32987/412331.html"
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'upgrade-insecure-requests': '1',
}
cookies = {'cf_clearance': 'nwAkylrfAYk2TiznYnvtM_LoRXU_Aoba43AmvPtZ6_A-1705841090-1-AWFvA/JXGdNMrOz9lq4ZkCYvsyldEwaX/eJz43JBHm8vpcWaUJvVeIPt3v3z5kaQW+hB6t4Kk86GhE52k5FJ+30='}

# Send a GET request to the specified URL with headers and cookies
response = requests.get(url, headers=headers)
with open('jv.html', 'w', encoding='utf-8') as f:
    f.write(response.text)
